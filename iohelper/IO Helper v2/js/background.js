chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      sendResponse({ status: localStorage.applyMod });
  }
);
 