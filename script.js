window.onload = function () {
  var mySelect = document.getElementById("mySelect");
  mySelect.addEventListener("change", () => {
    const selectValue = mySelect.options[mySelect.selectedIndex].value;
    console.log("selectValue", selectValue);
  });

  var myToggle = document.getElementById("myToggle");
  myToggle.addEventListener("click", () => {
    const toggleValue = myToggle.checked;
    console.log("toggleValue", toggleValue);
  });
};
