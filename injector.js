chrome.runtime.sendMessage({
  action: "updateIcon",
  value: true
});

var link = document.createElement("meta");
link.setAttribute("http-equiv", "Content-Security-Policy");
link.content = "upgrade-insecure-requests";
document.getElementsByTagName("head")[0].appendChild(link);

// document.querySelector("body > div > h1").id = "mee";

var head = document.getElementsByTagName("HEAD")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
// link.href =
//   "https://baharalidurrani.gitlab.io/resume/assets/dep/css/introjs.min.css";
link.href = chrome.extension.getURL(
  "dep/css/bootstrap-tour-standalone.min.css"
);
head.appendChild(link);
link.onload = function () {
  var jq = document.createElement("script");
  // s.src = chrome.extension.getURL("driver.js");
  jq.src = chrome.extension.getURL("dep/js/jquery-3.5.1.min.js");
  (document.head || document.documentElement).appendChild(jq);
  jq.onload = function () {
    var boot = document.createElement("script");
    // s.src = chrome.extension.getURL("driver.js");
    boot.src = chrome.extension.getURL(
      "dep/js/bootstrap-tour-standalone.min.js"
    );
    (document.head || document.documentElement).appendChild(boot);
    boot.onload = function () {
      // var mytour = document.createElement("script");
      // // mytour.src = chrome.extension.getURL("dep/js/test.js");
      // mytour.src =
      //   "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/bootTour.js";
      // (document.head || document.documentElement).appendChild(mytour);
      // mytour.onload = function () {};
    };
  };
};

// var boot = document.createElement("script");
// // s.src = chrome.extension.getURL("driver.js");
// boot.src = "http://rswdigital.com/_/serving/js/bootstrap-tour-standalone.js";
// (document.head || document.documentElement).appendChild(boot);
// // boot.onload = function () {};

// var tour = document.createElement("script");
// // tour.src = chrome.extension.getURL("exampleTour.js");
// tour.src = "http://rswdigital.com/_/serving/js/tours/exampleTour.js";
// (document.head || document.documentElement).appendChild(tour);

console.log("Hello from injector script");
