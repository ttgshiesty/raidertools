/* =========================================================
   SHiESTY TOKEN RELAY — Content Script
   Injected into GeForce NOW / ARC Raiders pages to intercept
   fetch() and XMLHttpRequest calls at the JavaScript level
   ========================================================= */

(() => {
  "use strict";

  const API_DOMAINS = [
    "api.embark.games",
  ];

  const DASHBOARD_DOMAINS = [
    "id.embark.games",
  ];

  function isApiUrl(url) {
    try {
      const hostname = new URL(url).hostname;
      return API_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`));
    } catch {
      return false;
    }
  }

  function isDashboardUrl(url) {
    try {
      const hostname = new URL(url).hostname;
      return DASHBOARD_DOMAINS.some((d) => hostname.includes(d));
    } catch {
      return false;
    }
  }

  function extractToken(headers) {
    if (!headers) return null;
    if (typeof headers.get === "function") {
      return headers.get("Authorization") || headers.get("authorization");
    }
    if (typeof headers === "object") {
      const key = Object.keys(headers).find(
        (k) => k.toLowerCase() === "authorization",
      );
      return key ? headers[key] : null;
    }
    return null;
  }

  // Intercept fetch()
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const [url, options = {}] = args;

    if (isApiUrl(url)) {
      const token = extractToken(options.headers);
      if (token) {
        chrome.runtime
          .sendMessage({
            type: "TOKEN_FROM_FETCH",
            token,
            url,
            path: new URL(url).pathname,
            host: new URL(url).hostname,
          })
          .catch(() => {});
      }
    }
    // Silently ignore dashboard requests to avoid capturing wrong tokens

    return originalFetch.apply(this, args);
  };

  // Intercept XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this._shiestyUrl = url;
    return originalOpen.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
    if (
      header.toLowerCase() === "authorization" &&
      isApiUrl(this._shiestyUrl)
    ) {
      chrome.runtime
        .sendMessage({
          type: "TOKEN_FROM_FETCH",
          token: value,
          url: this._shiestyUrl,
          path: new URL(this._shiestyUrl).pathname,
          host: new URL(this._shiestyUrl).hostname,
        })
        .catch(() => {});
    }
    return originalSetRequestHeader.call(this, header, value);
  };

  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.source !== "shiestyraider-web") return;
    if (event.data.type === "PING") {
      window.postMessage({
        source: "shiestyraider-extension",
        type: "PONG",
        data: { version: chrome.runtime.getManifest().version },
      }, "*");
      return;
    }
    if (event.data.type === "TRIGGER_SYNC_NOW") {
      chrome.runtime.sendMessage({ type: "SYNC_STATS_NOW" }, (result) => {
        window.postMessage({
          source: "shiestyraider-extension",
          type: "SYNC_NOW_RESULT",
          data: result ?? { success: false, error: chrome.runtime.lastError?.message },
        }, "*");
      });
    }
  });

  console.log(
    "[SHiESTY] Content script injected. Monitoring fetch/XHR for api.embark.games tokens.",
  );
})();
