// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.action === "updateIcon") {
//     // if (msg.value) {
//     // chrome.browserAction.setIcon({ path: "/icons/green.png" });
//     // } else {
//     //     chrome.browserAction.setIcon({path: "/assets/cross.png"});
//     // }
//   }
// });
// chrome.webNavigation.onBeforeNavigate.addListener(function () {
//   chrome.browserAction.setIcon({ path: "/icons/red.png" });
// });

chrome.webNavigation.onCompleted.addListener(function (details) {
  for (let i = 0; i < siteData.length; i++) {
    if (details.url.includes(siteData[i].host)) {
      chrome.browserAction.setIcon({ path: "/icons/green.png" });
      console.log("greeeeeeeeen");
      break;
    } else {
      chrome.browserAction.setIcon({ path: "/icons/red.png" });
      console.log("reeeeeeeeeeeeeeeeed");
    }
  }
  console.log("details...................", details);
});
