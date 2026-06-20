import argparse
import base64
import hashlib
import json
import os
import time
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib import error, parse, request
 
USER_AGENT = "EmbarkGameBoot/1.0 (Windows; 10.0.26200.1.256.64bit)"
AUTH_URL = "https://auth.embark.net/oauth2/authorize"
TOKEN_URL = "https://auth.embark.net/oauth2/token?skip_link=false"
AUDIENCE = "https://pioneer.embark.net"
TENANCY = "pioneer-live"
CLIENT_ID = "embark-pioneer"
LEGACY_CLIENT_SECRET = "+GoAQg2vzgcohjnW0PKtfiMjLfvSTfcjsyJ8YqH3DuE="
OAUTH_CALLBACK_URL = "http://127.0.0.1:49172"
OAUTH_SCOPE = "pioneer openid offline"
STEAM_DLL_NAME = "steam_api64.dll"
STEAM_APP_ID = "1808500"
 
 
def get_client_secret():
    # Keep original behavior: works out-of-the-box with embedded secret.
    # Environment variable can override when needed.
    secret = os.environ.get("ARC_CLIENT_SECRET", "").strip()
    if secret:
        return secret
    return LEGACY_CLIENT_SECRET
 
 
def request_access_token(form_data, request_headers, error_prefix):
    encoded_form = parse.urlencode(form_data).encode("utf-8")
    token_request = request.Request(url=TOKEN_URL, data=encoded_form, method="POST", headers=request_headers)
    try:
        with request.urlopen(token_request, timeout=30) as token_response:
            response_text = token_response.read().decode("utf-8", errors="replace")
        token_data = json.loads(response_text)
        return str(token_data["access_token"])
    except error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"{error_prefix}: HTTP {exc.code} {error_body}") from exc
 
 
def _to_base64url(raw_bytes):
    return base64.urlsafe_b64encode(raw_bytes).decode("ascii").rstrip("=")
 
 
def _create_pkce_pair():
    code_verifier = _to_base64url(os.urandom(32))
    code_challenge = _to_base64url(hashlib.sha256(code_verifier.encode("ascii")).digest())
    return code_verifier, code_challenge
 
 
def _decode_jwt_payload(token):
    try:
        parts = token.split(".")
        if len(parts) < 2:
            return {}
        payload_part = parts[1]
        payload_part += "=" * (-len(payload_part) % 4)
        payload_raw = base64.urlsafe_b64decode(payload_part.encode("ascii"))
        payload = json.loads(payload_raw.decode("utf-8", errors="replace"))
        if isinstance(payload, dict):
            return payload
    except Exception:
        pass
    return {}
 
 
def token_is_expired(token, skew_seconds=30):
    payload = _decode_jwt_payload(token)
    exp = payload.get("exp")
    if not isinstance(exp, (int, float)):
        return True
    return time.time() >= (float(exp) - float(skew_seconds))
 
 
def load_saved_bearer_token(path="token.txt"):
    try:
        with open(path, "r", encoding="utf-8") as token_file:
            raw = token_file.read().strip()
    except OSError:
        return ""
 
    if not raw:
        return ""
 
    # Accept both "Bearer <token>" and raw token formats.
    token = raw[len("Bearer ") :].strip() if raw.lower().startswith("bearer ") else raw
    if token_is_expired(token):
        return ""
    return token
 
 
def auth_steam_local():
    client_secret = get_client_secret()
    import ctypes as C
    from pathlib import Path
    import uuid
    import winreg
 
    print("[Steam] Discovering steam_api64.dll...")
    with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Software\\Valve\\Steam") as key:
        steam_path = Path(winreg.QueryValueEx(key, "SteamPath")[0])
 
    library_paths = [steam_path]
    library_vdf = steam_path / "steamapps" / "libraryfolders.vdf"
    if library_vdf.exists():
        for line in library_vdf.read_text(encoding="utf-8", errors="ignore").splitlines():
            parts = line.strip().split('"')
            if len(parts) >= 6 and parts[1].isdigit():
                library_paths.append(Path(parts[3].replace("\\\\", "\\")))
 
    dll_path = None
    for lib in library_paths:
        manifest = lib / "steamapps" / f"appmanifest_{STEAM_APP_ID}.acf"
        dll = lib / "steamapps" / "common" / "Arc Raiders" / STEAM_DLL_NAME
        if manifest.exists() and dll.exists():
            dll_path = str(dll)
            break
 
    if not dll_path:
        raise FileNotFoundError("Could not find Arc Raiders steam_api64.dll - is the game installed?")
 
    print(f"[Steam] Found DLL: {dll_path}")
    print("[Steam] Initializing Steam API...")
 
    os.environ["SteamAppId"] = STEAM_APP_ID
    os.environ["SteamGameId"] = STEAM_APP_ID
 
    steam_dll = C.WinDLL(dll_path)
    steam_dll.SteamAPI_Init.restype = C.c_bool
    steam_dll.SteamAPI_Shutdown.restype = None
    steam_dll.SteamAPI_SteamUser_v021.restype = C.c_void_p
    steam_dll.SteamAPI_ISteamUser_GetAuthSessionTicket.argtypes = [
        C.c_void_p,
        C.c_int,
        C.POINTER(C.c_uint32),
        C.c_void_p,
    ]
    steam_dll.SteamAPI_ISteamUser_GetAuthSessionTicket.restype = C.c_uint32
    steam_dll.SteamAPI_ISteamUser_CancelAuthTicket.argtypes = [C.c_void_p, C.c_uint32]
    steam_dll.SteamAPI_ISteamUser_CancelAuthTicket.restype = None
 
    steam_dll.SteamAPI_Init()
    steam_user = C.c_void_p(steam_dll.SteamAPI_SteamUser_v021())
    ticket_buffer = (C.c_ubyte * 8192)()
    ticket_length = C.c_uint32(0)
    ticket_handle = steam_dll.SteamAPI_ISteamUser_GetAuthSessionTicket(
        steam_user,
        C.byref(ticket_buffer),
        len(ticket_buffer),
        C.byref(ticket_length),
        C.c_void_p(0),
    )
 
    auth_token = bytes(ticket_buffer[: ticket_length.value]).hex().upper()
    print(f"[Steam] Got auth ticket ({len(auth_token)} chars)")
    print("[Steam] Exchanging ticket for bearer token...")
 
    form_data = {
        "grant_type": "client_credentials",
        "external_provider_name": "steam",
        "external_provider_token": auth_token,
        "audience": AUDIENCE,
        "app_id": STEAM_APP_ID,
        "tenancy": TENANCY,
        "client_id": CLIENT_ID,
        "client_secret": client_secret,
    }
    request_headers = {
        "Connection": "Keep-Alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
        "x-embark-telemetry-uuid": uuid.uuid4().hex,
        "x-embark-telemetry-client-platform": "3",
        "Accept-Encoding": "gzip",
    }
 
    try:
        token = request_access_token(form_data, request_headers, "Steam token exchange failed")
    finally:
        steam_dll.SteamAPI_ISteamUser_CancelAuthTicket(steam_user, C.c_uint32(ticket_handle))
        steam_dll.SteamAPI_Shutdown()
 
    return token
 
 
def auth_browser(provider_name):
    client_secret = get_client_secret()
    import uuid
    import webbrowser
 
    state = uuid.uuid4().hex
    code_verifier, code_challenge = _create_pkce_pair()
 
    auth_query = {
        "skip_link": "false",
        "client_id": CLIENT_ID,
        "response_type": "code",
        "redirect_uri": OAUTH_CALLBACK_URL,
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
        "state": state,
        "audience": AUDIENCE,
        "scope": OAUTH_SCOPE,
        "tenancy": TENANCY,
        "external_provider_name": provider_name,
    }
    authorize_url = f"{AUTH_URL}?{parse.urlencode(auth_query)}"
 
    print(f"[{provider_name}] Opening browser for authentication...")
    print(f"[{provider_name}] Waiting for callback on {OAUTH_CALLBACK_URL} ...")
    webbrowser.open(authorize_url)
 
    parsed_cb = parse.urlparse(OAUTH_CALLBACK_URL)
    host = parsed_cb.hostname or "127.0.0.1"
    port = parsed_cb.port or 49172
    cb_path = parsed_cb.path or "/"
 
    callback_payload = {}
    callback_received = threading.Event()
 
    class OAuthCallbackHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            request_path = parse.urlparse(self.path)
            if request_path.path != cb_path:
                self.send_response(404)
                self.end_headers()
                return
 
            query_params = parse.parse_qs(request_path.query)
            callback_payload["code"] = query_params.get("code", [""])[0]
            callback_payload["state"] = query_params.get("state", [""])[0]
            callback_payload["error"] = query_params.get("error", [""])[0]
 
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Login complete. You can close this tab.")
            callback_received.set()
 
        def log_message(self, *args):
            return
 
    callback_server = HTTPServer((host, port), OAuthCallbackHandler)
    callback_thread = threading.Thread(target=callback_server.serve_forever, daemon=True)
    callback_thread.start()
 
    if not callback_received.wait(180):
        callback_server.shutdown()
        raise TimeoutError("Timed out waiting for OAuth callback (3 minutes)")
    callback_server.shutdown()
 
    if callback_payload.get("error"):
        raise ValueError(f"OAuth failed: {callback_payload['error']}")
    if not callback_payload.get("code"):
        raise ValueError("No authorization code received")
    if callback_payload.get("state") != state:
        raise ValueError("State mismatch")
 
    print(f"[{provider_name}] Got authorization code, exchanging for token...")
    form_data = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": client_secret,
        "code": callback_payload["code"],
        "redirect_uri": OAUTH_CALLBACK_URL,
        "code_verifier": code_verifier,
    }
    request_headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
    }
    return request_access_token(form_data, request_headers, f"{provider_name} code exchange failed")
 
 
PLATFORMS = [
    ("1", "Steam (Local Auth)", "steam_local"),
    ("2", "Steam (Browser Auth)", "steam"),
    ("3", "Epic Games", "epic"),
    ("4", "Xbox", "xbox"),
    ("5", "PlayStation", "playstation"),
]
 
 
def main():
    parser = argparse.ArgumentParser(description="Arc Raiders auth helper")
    parser.add_argument("--copy", action="store_true", help="Copy bearer token to clipboard with Bearer prefix")
    parser.add_argument("--reuse", action="store_true", help="Reuse non-expired token from token.txt when available")
    args = parser.parse_args()
 
    print()
    print("==================================================")
    print("  Arc Raiders - Auth Tool")
    print("==================================================")
    print()
    for platform_number, platform_name, _ in PLATFORMS:
        print(f"  [{platform_number}] {platform_name}")
    print("  [0] Exit")
    print()
 
    choice = input("  Select platform: ").strip()
    selected = None
    for platform_number, platform_name, platform_id in PLATFORMS:
        if choice == platform_number:
            selected = (platform_name, platform_id)
            break
 
    if not selected or choice == "0":
        print("  Bye.")
        return
 
    name, pid = selected
    print()
    print(f"  Authenticating via {name}...")
    print("--------------------------------------------------")
 
    try:
        saved_token = load_saved_bearer_token() if args.reuse else ""
        if saved_token:
            print("  Reusing non-expired token from token.txt (--reuse)")
            token = saved_token
        elif pid == "steam_local":
            token = auth_steam_local()
        else:
            token = auth_browser(pid)
    except Exception as e:
        print(f"\n  ERROR: {e}")
        input("\n  Press Enter to exit...")
        return
 
    print()
    print("==================================================")
    print("  BEARER TOKEN:")
    print("==================================================")
    print()
    print(f"  {token}")
    print()
    print(f"  Length: {len(token)} chars")
    print("==================================================")
 
    try:
        with open("token.txt", "w", encoding="utf-8") as token_file:
            token_file.write(f"Bearer {token}")
        print("  Saved token.txt")
    except Exception as e:
        print(f"  File save failed: {e}")
 
    if args.copy:
        try:
            import subprocess
 
            proc = subprocess.Popen(["clip.exe"], stdin=subprocess.PIPE)
            proc.communicate(f"Bearer {token}".encode())
            print("  (Copied to clipboard with 'Bearer ' prefix)")
        except Exception:
            print("  Clipboard copy failed.")
 
    print()
    input("  Press Enter to exit...")
 
 
if __name__ == "__main__":
    main()