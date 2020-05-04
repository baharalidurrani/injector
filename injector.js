// var link = document.createElement("meta");
// link.setAttribute("http-equiv", "Content-Security-Policy");
// link.content = "upgrade-insecure-requests";
// document.getElementsByTagName("head")[0].appendChild(link);

document.querySelector("body > div > h1").id = "mee";

var head = document.getElementsByTagName("HEAD")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "http://rswdigital.com/_/serving/css/bootstrap-tour-standalone.css";
head.appendChild(link);

var jq = document.createElement("script");
// s.src = chrome.extension.getURL("driver.js");
jq.src = "http://rswdigital.com/_/serving/js/jquery-3.5.0.min.js";
(document.head || document.documentElement).appendChild(jq);
// jq.onload = function () {};

var boot = document.createElement("script");
// s.src = chrome.extension.getURL("driver.js");
boot.src = "http://rswdigital.com/_/serving/js/bootstrap-tour-standalone.js";
(document.head || document.documentElement).appendChild(boot);
// boot.onload = function () {};

var tour = document.createElement("script");
// tour.src = chrome.extension.getURL("exampleTour.js");
tour.src = "http://rswdigital.com/_/serving/js/tours/exampleTour.js";
(document.head || document.documentElement).appendChild(tour);

console.log("Hello from injector script");
