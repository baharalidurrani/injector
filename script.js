const siteData = [
  { host: "www.google.com", tours: ["rws.t1", "rws.t1", "rws.t1"] },
  {
    host: "example.com",
    tours: ["rws.t1", "http://rswdigital.com/_/serving/js/tours/exampleTour.js"]
  },
  {
    host: "baharalidurrani.me",
    tours: ["rws.t1", "rws.t1", "rws.t1", "rws.t1"]
  }
];

// chrome.webNavigation.onCompleted.addListener(function () {})
window.onload = function () {
  // Step Toggle Functionality
  function startTour() {
    localStorage.removeItem("tour_end");
    localStorage.setItem("tour_current_step", "0");
    // Start the tour
    // tour.start();
  }
  function endTour() {
    localStorage.setItem("tour_end", "yes");
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
    var host = document.location.host;
    return host;
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
      const menu = document.getElementById("mySelect");
      menu.innerHTML = "";
      if (site) {
        for (let i = 0; i < site.tours.length; i++) {
          let o = document.createElement("option");
          o.label = i + 1;
          o.value = i + 1;
          o.innerText = site.host;
          menu.appendChild(o);
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
        myToggle.disabled = true;
        menu.disabled = true;
      }
      // :Step 2
    }
  );
  // :Step 1

  var mySelect = document.getElementById("mySelect");
  mySelect.addEventListener("change", () => {
    const selectOption = mySelect.options[mySelect.selectedIndex];
    var currentHost = selectOption.innerText;
    var currentIndex = selectOption.value - 1;
    console.log("index", currentIndex);
    console.log("host", currentHost);
    let hostObj = siteData.find(function (w) {
      return w.host === currentHost;
    });
    var applyTour = hostObj.tours[currentIndex];
    console.log("hostObj.tours[currentIndex]", applyTour);
    function injectTour() {
      // var link = document.createElement("meta");
      // link.setAttribute("http-equiv", "Content-Security-Policy");
      // link.content = "upgrade-insecure-requests";
      // document.getElementsByTagName("head")[0].appendChild(link);

      var tourTag = document.createElement("script");
      // tour.src = chrome.extension.getURL("exampleTour.js");
      tourTag.id = "myTour";
      tourTag.src = "http://rswdigital.com/_/serving/js/tours/exampleTour.js";
      (document.head || document.documentElement).appendChild(tourTag);
      // Start the tour
      // tour.start();
    }
    chrome.tabs.executeScript({
      code: "(" + injectTour + ")();"
    });
  });
};
