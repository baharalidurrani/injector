const siteData = [
  {
    host: "www.google.com",
    tours: [
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/googleBoot.js",
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/googleBoot2.js",
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/googleBoot3.js"
    ]
  },
  {
    host: "rswdigital.com",
    tours: [
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/rswBoot.js",
      "rws.t1",
      "rws.t1"
    ]
  },
  {
    host: "127.0.0.1:5500",
    tours: [
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/bootTour.js",
      "rws.t1",
      "rws.t1"
    ]
  },
  {
    host: "example.com",
    tours: [
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/exampleTour2.js",
      "http://rswdigital.com/_/serving/js/tours/exampleTour.js"
    ]
  },
  {
    host: "baharalidurrani.me",
    tours: [
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/baharBoot.js",
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/baharBoot2.js",
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/baharBoot3.js"
    ]
  }
];

// chrome.webNavigation.onCompleted.addListener(function (details) {
// var link = document.createElement("meta");
// link.setAttribute("http-equiv", "Content-Security-Policy");
// link.content = "upgrade-insecure-requests";
// document.getElementsByTagName("head")[0].appendChild(link);
// var head = document.getElementsByTagName("HEAD")[0];
// var link = document.createElement("link");
// link.rel = "stylesheet";
// link.type = "text/css";
// link.href = "dep/css/bootstrap-tour-standalone.min.css";
// head.appendChild(link);
// chrome.tabs.insertCSS({
//   file: "./dep/css/bootstrap-tour-standalone.min.css"
// });
// var jq = document.createElement("script");
// // s.src = chrome.extension.getURL("driver.js");
// jq.src = "dep/js/jquery-3.5.1.min.js"(
//   document.head || document.documentElement
// ).appendChild(jq);
// jq.onload = function () {};
// chrome.tabs.executeScript({ file: "./dep/js/jquery-3.5.1.min.js" });
// var boot = document.createElement("script");
// // s.src = chrome.extension.getURL("driver.js");
// boot.src = "dep/js/bootstrap-tour-standalone.min.js";
// (document.head || document.documentElement).appendChild(boot);
// boot.onload = function () {};
// chrome.tabs.executeScript({
//   file: "./dep/js/bootstrap-tour-standalone.min.js"
// });
// chrome.tabs.executeScript({
//   file: "./dep/js/my.js"
// });
// });

window.onload = function () {
  // Step Toggle Functionality
  function startTour() {
    localStorage.removeItem("tour_end");
    // localStorage.setItem("tour_current_step", "0");
    // Start the tour
    // tour.start();
    let startScript = document.createElement("script");
    startScript.innerText = "tour.start();";
    (document.head || document.documentElement).appendChild(startScript);
  }
  function endTour() {
    // localStorage.setItem("tour_end", "yes");
    let startScript = document.createElement("script");
    startScript.innerText = "tour.end();";
    (document.head || document.documentElement).appendChild(startScript);
  }
  var myToggle = document.getElementById("myToggle");
  myToggle.addEventListener("click", () => {
    const toggleValue = myToggle.checked;
    console.log("toggleValue", toggleValue);
    myToggle.checked
      ? chrome.tabs.executeScript({
          code: "(" + startTour + ")();"
        })
      : chrome.tabs.executeScript({
          code: "(" + endTour + ")();"
        });
  });
  chrome.tabs.executeScript(
    {
      code: 'localStorage.getItem("tour_end");'
    },
    (tourEnd) => {
      console.log("getting tour end from storage", tourEnd);
      tourEnd[0] === "yes"
        ? (myToggle.checked = false)
        : (myToggle.checked = true);
    }
  );
  // :Step Toggle Functionality

  // Step 1
  function getHost() {
    return document.location.host;
  }
  chrome.tabs.executeScript(
    {
      code: "(" + getHost + ")();" //argument here is a string but function.toString() returns function's code
    },
    (result) => {
      console.log("Host retrived:", result[0]);
      // Step 2
      // build <select>
      var site = siteData.find(function (w) {
        return w.host === result[0];
      });
      let menu = document.getElementById("toursDiv");
      menu.innerHTML = "";
      if (site) {
        for (let i = 0; i < site.tours.length; i++) {
          let anchorTour = document.createElement("a");
          anchorTour.setAttribute("href", "#");
          anchorTour.setAttribute("class", "atag");
          anchorTour.setAttribute("id", i);
          anchorTour.setAttribute("style", "display: block");
          anchorTour.innerText = site.tours[i];
          menu.appendChild(anchorTour);
        }
        // function securityPolicy() {
        //   var link = document.createElement("meta");
        //   link.setAttribute("http-equiv", "Content-Security-Policy");
        //   link.content = "upgrade-insecure-requests";
        //   document.getElementsByTagName("head")[0].appendChild(link);
        // }
        // chrome.tabs.executeScript({
        //   code: "(" + securityPolicy + ")();"
        // });
      } else {
        menu.innerText = "Sorry This Website is not supported yet!";
        myToggle.disabled = true;
        menu.disabled = true;
      }
      // :Step 2
    }
  );
  // :Step 1

  setTimeout(() => {
    var atags = document.getElementsByClassName("atag");
    // var atags = document.querySelectorAll(".atag");
    console.log("atags", atags);

    for (let i = 0; i < atags.length; i++) {
      // var atag = atags[i];
      atags[i].addEventListener(
        "click",
        () => {
          console.log("Click event fired on:", atags[i]);
          // const selectOption = mySelect.options[mySelect.selectedIndex];
          // var currentHost = selectOption.innerText;
          // var currentIndex = selectOption.value - 1;
          // console.log("index", currentIndex);
          // console.log("host", currentHost);
          // let hostObj = siteData.find(function (w) {
          //   return w.host === currentHost;
          // });
          // var applyTour = hostObj.tours[currentIndex];
          let applyTour = atags[i].innerText;
          // var applyTour =
          //   "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/bootTour.js";
          console.log("Tour selected:", applyTour);
          chrome.tabs.executeScript({
            code: `localStorage.removeItem("applyTour");localStorage.setItem("applyTour", "${applyTour}");`
          });
          function injectTour() {
            // var link = document.createElement("meta");
            // link.setAttribute("http-equiv", "Content-Security-Policy");
            // link.content = "upgrade-insecure-requests";
            // document.getElementsByTagName("head")[0].appendChild(link);
            try {
              document.getElementById("myTour").remove();
            } catch (error) {
              console.log("No old tour found");
            }
            var tourTag = document.createElement("script");
            tourTag.id = "myTour";
            tourTag.src = localStorage.getItem("applyTour");
            (document.head || document.documentElement).appendChild(tourTag);
          }
          chrome.tabs.executeScript({
            code: "(" + injectTour + ")();"
          });
        },
        false
      );
    }
  }, 0);
};
