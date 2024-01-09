const { getConflicts } = require("./controllers/BookingController");

getConflicts("10:15", "11:10", "09/01/2024", 1)
  .then(test => {
    console.log("WWWWWWWW");
    console.log(test);
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });