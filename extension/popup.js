/* =========================================================
   SHiESTY TOKEN RELAY — Popup UI Logic
   ========================================================= */

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", async () => {
  const tokenPreview = $("tokenPreview");
  const timestamp = $("timestamp");
  const statusDot = $("statusDot");
  const autoRelay = $("autoRelay");
  const backendUrl = $("backendUrl");
  const relayBtn = $("relayBtn");
  const clearBtn = $("clearBtn");

  // Load current state
  chrome.runtime.sendMessage({ type: "GET_TOKEN_STATUS" }, (res) => {
    if (chrome.runtime.lastError) {
      tokenPreview.textContent = "Extension error: " + chrome.runtime.lastError.message;
      return;
    }

    if (res.hasToken) {
      tokenPreview.textContent = res.tokenPreview;
      timestamp.textContent = new Date(res.lastCapture).toLocaleTimeString();
      statusDot.classList.add("active");
    } else {
      tokenPreview.textContent = "Waiting for ARC Raiders...";
      timestamp.textContent = "—";
      statusDot.classList.remove("active");
    }

    autoRelay.checked = res.autoRelay;
  });

  // Load settings and endpoint info
  chrome.storage.local.get(["shiestyBackend", "autoRelay", "tokenPath", "lastDiscoveredEndpoint", "lastDiscoveryTime"], (res) => {
    if (res.shiestyBackend) backendUrl.value = res.shiestyBackend;
    if (res.autoRelay !== undefined) autoRelay.checked = res.autoRelay;
    if (res.tokenPath) {
      const endpointInfo = $("endpointInfo");
      const endpointPath = $("endpointPath");
      if (endpointInfo && endpointPath) {
        endpointInfo.style.display = "block";
        endpointPath.textContent = res.tokenPath;
      }
    }
    if (res.lastDiscoveredEndpoint) {
      const discoveryInfo = $("discoveryInfo");
      const discoveryPath = $("discoveryPath");
      if (discoveryInfo && discoveryPath) {
        discoveryInfo.style.display = "block";
        discoveryPath.textContent = res.lastDiscoveredEndpoint;
      }
    }
  });

  // Auto-relay toggle
  autoRelay.addEventListener("change", () => {
    chrome.runtime.sendMessage({
      type: "UPDATE_SETTINGS",
      settings: { autoRelay: autoRelay.checked, backendUrl: backendUrl.value },
    });
  });

  // Backend URL change
  backendUrl.addEventListener("change", () => {
    chrome.runtime.sendMessage({
      type: "UPDATE_SETTINGS",
      settings: { backendUrl: backendUrl.value },
    });
  });

  // Manual relay
  relayBtn.addEventListener("click", () => {
    relayBtn.disabled = true;
    relayBtn.textContent = "Relaying...";

    chrome.runtime.sendMessage({ type: "MANUAL_RELAY" }, (res) => {
      relayBtn.disabled = false;
      relayBtn.textContent = "Relay Now";

      if (res.status === "relayed") {
        relayBtn.textContent = "Relayed ✓";
        setTimeout(() => (relayBtn.textContent = "Relay Now"), 2000);
      } else {
        tokenPreview.textContent = res.error || "Relay failed";
      }
    });
  });

  // Clear token
  clearBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["lastToken", "lastTokenTime", "tokenSource", "lastDiscoveredEndpoint"]);
    tokenPreview.textContent = "Waiting for ARC Raiders...";
    timestamp.textContent = "—";
    statusDot.classList.remove("active");
    const discoveryInfo = $("discoveryInfo");
    if (discoveryInfo) discoveryInfo.style.display = "none";
  });
});

// Listen for real-time updates from background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOKEN_CAPTURED") {
    $("tokenPreview").textContent = msg.tokenPreview;
    $("timestamp").textContent = new Date(msg.timestamp).toLocaleTimeString();
    $("statusDot").classList.add("active");
    // Also update endpoint path if available
    chrome.storage.local.get(["tokenPath", "lastDiscoveredEndpoint"], (res) => {
      if (res.tokenPath) {
        const endpointInfo = $("endpointInfo");
        const endpointPath = $("endpointPath");
        if (endpointInfo && endpointPath) {
          endpointInfo.style.display = "block";
          endpointPath.textContent = res.tokenPath;
        }
      }
      if (res.lastDiscoveredEndpoint) {
        const discoveryInfo = $("discoveryInfo");
        const discoveryPath = $("discoveryPath");
        if (discoveryInfo && discoveryPath) {
          discoveryInfo.style.display = "block";
          discoveryPath.textContent = res.lastDiscoveredEndpoint;
        }
      }
    });
  }
});
