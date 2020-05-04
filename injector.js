// var link = document.createElement("meta");
// link.setAttribute("http-equiv", "Content-Security-Policy");
// link.content = "upgrade-insecure-requests";
// document.getElementsByTagName("head")[0].appendChild(link);

var s = document.createElement("script");
// s.src = chrome.extension.getURL("driver.js");
s.src = "http://rswdigital.com/_/serving/js/remoteJS.js";
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
  s.parentNode.removeChild(s);
};

var head = document.getElementsByTagName("HEAD")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "http://rswdigital.com/_/serving/css/remoteStyle.css";
head.appendChild(link);

console.log("Hello from injector script");
