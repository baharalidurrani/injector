chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") {
    // if (msg.value) {
    chrome.browserAction.setIcon({ path: "/icons/green.png" });
    // } else {
    //     chrome.browserAction.setIcon({path: "/assets/cross.png"});
    // }
  }
});
chrome.webNavigation.onBeforeNavigate.addListener(function () {
  chrome.browserAction.setIcon({ path: "/icons/red.png" });
});
