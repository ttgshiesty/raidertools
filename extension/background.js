/* =========================================================
   SHiESTY TOKEN RELAY — Background Service Worker (MV3)
   Captures Authorization headers from ARC Raiders API calls
   ========================================================= */

const EMBARK_PATTERNS = [
  "*://api.embark.games/*",
  "*://*.embark.games/*",
  "*://*.arcraiders.com/*",
  "*://*.xboxlive.com/*",
  "*://login.live.com/*",
  "*://api.raidtheory.com/*",
];

const SHIESTY_BACKEND = "https://shiesty.me";
const STATS_ENDPOINTS = {
  summary: "https://arctracker.io/api/embark/stats/summary",
  weaponKills: "https://arctracker.io/api/embark/stats/weapon-kills",
  enemyKills: "https://arctracker.io/api/embark/stats/enemy-kills",
  mapPerformance: "https://arctracker.io/api/embark/stats/map-performance",
};
let lastToken = null;
let lastTokenTime = 0;
let userSettings = { backendUrl: SHIESTY_BACKEND, autoRelay: true };

// Load settings on startup
chrome.storage.local.get(
  ["shiestyBackend", "autoRelay", "lastToken"],
  (res) => {
    if (res.shiestyBackend) userSettings.backendUrl = res.shiestyBackend;
    if (res.autoRelay !== undefined) userSettings.autoRelay = res.autoRelay;
    if (res.lastToken) {
      lastToken = res.lastToken;
      lastTokenTime = Date.now();
      chrome.action.setBadgeText({ text: "✓" });
      chrome.action.setBadgeBackgroundColor({ color: "#39FF14" });
    }
    console.log(
      "[SHiESTY] Extension loaded. Backend:",
      userSettings.backendUrl,
    );
  },
);

// Inject content script into all matching tabs on startup
async function injectIntoMatchingTabs() {
  const patterns = [
    "*://*.embark.games/*",
    "*://*.arcraiders.com/*",
    "*://*.geforcenow.com/*",
    "*://play.geforcenow.com/*",
  ];
  
  try {
    const tabs = await chrome.tabs.query({ url: patterns });
    for (const tab of tabs) {
      if (!tab.id) continue;
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id, allFrames: true },
          files: ["content.js"],
        });
        console.log(`[SHiESTY] Injected into tab ${tab.id}: ${tab.url}`);
      } catch (err) {
        console.warn(`[SHiESTY] Failed to inject into tab ${tab.id}:`, err.message);
      }
    }
  } catch (err) {
    console.warn("[SHiESTY] Tab injection error:", err.message);
  }
}

// Inject on startup
injectIntoMatchingTabs();

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("shiesty-stats-sync", { periodInMinutes: 15 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "shiesty-stats-sync") syncBrowserStats().catch(() => {});
});

// Also inject when tabs are updated to matching URLs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const isMatch = [
      "embark.games",
      "arcraiders.com",
      "geforcenow.com",
      "play.geforcenow.com",
    ].some(domain => tab.url.includes(domain));
    
    if (isMatch) {
      chrome.scripting.executeScript({
        target: { tabId, allFrames: true },
        files: ["content.js"],
      }).catch(() => {});
    }
  }
});

// Determine if a URL is from the actual API (not web dashboard)
function isApiDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname === "api.embark.games" || hostname.endsWith(".api.embark.games");
  } catch {
    return false;
  }
}

function isDashboardDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname === "id.embark.games";
  } catch {
    return false;
  }
}

// Listen for web requests to capture Authorization headers
chrome.webRequest.onSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders?.find(
      (h) => h.name.toLowerCase() === "authorization",
    );

    if (!authHeader || !authHeader.value) return;

    const token = authHeader.value;
    const now = Date.now();

    // Skip tokens from the web dashboard — they cause 404s when used as API bases
    if (isDashboardDomain(details.url)) {
      console.log("[SHiESTY] Ignored token from web dashboard:", details.url);
      return;
    }

    // Debounce: only process if token changed or 30s passed
    if (token === lastToken && now - lastTokenTime < 30000) return;

    lastToken = token;
    lastTokenTime = now;

    console.log("[SHiESTY] Token captured from:", details.url);

    // Update badge to show token captured
    chrome.action.setBadgeText({ text: "✓" });
    chrome.action.setBadgeBackgroundColor({ color: "#39FF14" });

    // Store locally with full URL path for endpoint discovery
    const urlObj = new URL(details.url);
    chrome.storage.local.set({
      lastToken: token,
      lastTokenTime: now,
      tokenSource: details.url,
      tokenPath: urlObj.pathname,
      tokenHost: urlObj.hostname,
    });

    // Relay to backend if enabled
    if (userSettings.autoRelay) {
      relayToken(token, details.url);
    }

    // Notify popup if open
    chrome.runtime
      .sendMessage({
        type: "TOKEN_CAPTURED",
        tokenPreview: token.slice(0, 20) + "...",
        source: new URL(details.url).hostname,
        timestamp: now,
      })
      .catch(() => {});
  },
  {
    urls: EMBARK_PATTERNS,
  },
  // extraHeaders helps expose Authorization on stricter/CORS-protected requests.
  ["requestHeaders", "extraHeaders"],
);

// Also listen for fetch/XHR interception from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOKEN_FROM_FETCH") {
    const { token, url } = message;
    const now = Date.now();

    // Skip dashboard tokens
    if (isDashboardDomain(url)) {
      sendResponse({ status: "ignored", reason: "dashboard_domain" });
      return true;
    }

    if (token === lastToken && now - lastTokenTime < 30000) {
      sendResponse({ status: "duplicate" });
      return true;
    }

    lastToken = token;
    lastTokenTime = now;

    chrome.storage.local.set({
      lastToken: token,
      lastTokenTime: now,
      tokenSource: url,
    });

    if (userSettings.autoRelay) {
      relayToken(token, url);
    }

    sendResponse({ status: "captured" });
    return true;
  }

  if (message.type === "GET_TOKEN_STATUS") {
    sendResponse({
      hasToken: !!lastToken,
      tokenPreview: lastToken ? lastToken.slice(0, 20) + "..." : null,
      lastCapture: lastTokenTime,
      autoRelay: userSettings.autoRelay,
    });
    return true;
  }

  if (message.type === "UPDATE_SETTINGS") {
    userSettings = { ...userSettings, ...message.settings };
    chrome.storage.local.set({
      shiestyBackend: userSettings.backendUrl,
      autoRelay: userSettings.autoRelay,
    });
    sendResponse({ status: "saved" });
    return true;
  }

  if (message.type === "MANUAL_RELAY") {
    if (!lastToken) {
      sendResponse({ status: "error", error: "No token captured yet" });
      return true;
    }
    relayToken(lastToken, "manual")
      .then(() => sendResponse({ status: "relayed" }))
      .catch((err) => sendResponse({ status: "error", error: err.message }));
    return true;
  }

  if (message.type === "SYNC_STATS_NOW") {
    syncBrowserStats()
      .then((result) => sendResponse({ success: true, ...result }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

async function fetchBrowserStat(url) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`${new URL(url).pathname} returned ${response.status}`);
  return response.json();
}

async function syncBrowserStats() {
  const [summary, weaponKills, enemyKills, mapPerformance] = await Promise.all([
    fetchBrowserStat(STATS_ENDPOINTS.summary),
    fetchBrowserStat(STATS_ENDPOINTS.weaponKills),
    fetchBrowserStat(STATS_ENDPOINTS.enemyKills),
    fetchBrowserStat(STATS_ENDPOINTS.mapPerformance),
  ]);
  const syncedAt = new Date().toISOString();
  const response = await fetch(`${userSettings.backendUrl}/api/stats/extension`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Extension-Version": "1.1.0" },
    body: JSON.stringify({ summary, weaponKills, enemyKills, mapPerformance, syncedAt }),
  });
  if (!response.ok) throw new Error(`Stats server returned ${response.status}`);
  await chrome.storage.local.set({ lastStatsSyncAt: syncedAt });
  return { syncedAt, endpoints: Object.values(STATS_ENDPOINTS) };
}

// Relay token to SHiESTY backend with CORS error handling
async function relayToken(token, sourceUrl) {
  const url = `${userSettings.backendUrl}/api/extension/token`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Extension-Version": "1.1.0",
      },
      body: JSON.stringify({
        token,
        source: sourceUrl,
        capturedAt: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "extension-mv3",
        path: typeof sourceUrl === 'string' ? new URL(sourceUrl).pathname : undefined,
        host: typeof sourceUrl === 'string' ? new URL(sourceUrl).hostname : undefined,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend returned ${response.status}: ${text.slice(0, 200)}`);
    }

    const data = await response.json();
    console.log("[SHiESTY] Token relayed successfully:", data);
    
    // Store discovery result
    if (data.discoveredEndpoint) {
      chrome.storage.local.set({
        lastDiscoveredEndpoint: data.discoveredEndpoint,
        lastDiscoveryTime: Date.now(),
      });
    }
  } catch (err) {
    console.error("[SHiESTY] Token relay failed:", err.message);
    
    // If CORS error, try with no-cors mode as fallback (opaque response)
    if (err.message.includes('CORS') || err.message.includes('Failed to fetch')) {
      console.log("[SHiESTY] Retrying with no-cors mode...");
      try {
        await fetch(url, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            source: sourceUrl,
            capturedAt: new Date().toISOString(),
          }),
        });
        console.log("[SHiESTY] Token sent via no-cors mode (opaque response)");
      } catch (fallbackErr) {
        console.error("[SHiESTY] Fallback also failed:", fallbackErr.message);
      }
    }
  }
}
