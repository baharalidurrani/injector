const siteData = [
  { host: "www.google.com", tours: ["rws.t1", "rws.t1", "rws.t1"] },
  { host: "example.com", tours: ["rws.t1", "rws.t1"] },
  { host: "127.0.0.1:5500", tours: ["rws.t1", "rws.t1"] },
  { host: "localhost:5500", tours: ["rws.t1", "rws.t1"] },
  {
    host: "baharalidurrani.me",
    tours: ["rws.t1", "rws.t1", "rws.t1", "rws.t1"]
  }
];

// Step 1
function getHost() {
  var host = document.location.host;
  return host;
}
// chrome.webNavigation.onCompleted.addListener(function () {
window.onload = function () {
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
      const tog = document.getElementById("myToggle");
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
      } else {
        tog.disabled = true;
        menu.disabled = true;
      }
    }
  );
  // });
  // :Step 1
  function at() {
    var mytour = document.createElement("script");
    // s.src = chrome.extension.getURL("driver.js");
    mytour.src =
      "https://baharalidurrani.gitlab.io/resume/assets/dep/js/tours/bootTour.js";
    (document.head || document.documentElement).appendChild(mytour);
  }
  // window.onload = function () {
  var mySelect = document.getElementById("mySelect");
  mySelect.addEventListener("change", () => {
    chrome.tabs.executeScript({
      code: "(" + at + ")();"
    });
    const selectOption = mySelect.options[mySelect.selectedIndex];
    console.log("selectOption", selectOption);
    console.log("Value", selectOption.value);
    console.log("innerText", selectOption.innerText);
  });

  var myToggle = document.getElementById("myToggle");
  myToggle.addEventListener("click", () => {
    const toggleValue = myToggle.checked;
    console.log("toggleValue", toggleValue);
  });
};
