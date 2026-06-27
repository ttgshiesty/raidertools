chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  const isPing = message === "ping" || message?.type === "ping";
  if (!isPing) {
    return;
  }

  let sourceHost = null;
  if (sender?.url) {
    try {
      sourceHost = new URL(sender.url).hostname;
    } catch (_error) {
      sourceHost = null;
    }
  }

  sendResponse({
    installed: true,
    version: chrome.runtime.getManifest().version,
    sourceHost
  });

  return true;
});
