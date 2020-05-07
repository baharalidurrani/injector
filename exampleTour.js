console.log("boottour  loaded....");
setTimeout(() => {
  console.log("Timeout after 2000ms");
  // Instance the tour
  var tour = new Tour({
    steps: [
      {
        element: "#div1",
        title: "Title of my step 1",
        content: "Content of my step 1",
        placement: "auto"
      },
      {
        element: "#div2",
        title: "Title of my step 2",
        content: "Content of my step 2",
        placement: "auto"
      }
      // {
      //   element: "#myDiv > h3",
      //   title: "Title of my step 3",
      //   content: "Content of my step 3",
      //   placement: "auto"
      // }
    ]
  });

  // Initialize the tour
  tour.init();

  // Start the tour
  tour.start();
}, 2000);
