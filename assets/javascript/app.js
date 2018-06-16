// Database call
var config = {
    apiKey: "AIzaSyDULXE3UXv1NcpSs9OvrKoH5Ua-sjv7-qs",
    authDomain: "emplyee-database-801e9.firebaseapp.com",
    databaseURL: "https://emplyee-database-801e9.firebaseio.com",
    projectId: "emplyee-database-801e9",
    storageBucket: "emplyee-database-801e9.appspot.com",
    messagingSenderId: "257280799648"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-user").on("click", function(event) {
   // event.preventDefault();
    console.log("hello")
    // Display the info to the HTML
    employeeName = $("#name-input").val().trim();
    employeeRole = $("#role-input").val().trim();
    employeeStartDate = $("#start-date-input").val().trim();
    employeeMonthlyRate = $("#monthly-rate-input").val().trim();

    // Pushing new data to the database
    database.ref().push({
        employeeName : employeeName,
        employeeRole : employeeRole,
        employeeStartDate :employeeStartDate,
        employeeMonthlyRate :employeeMonthlyRate,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });



    

    // Clear the input values
    // $(".form-control").empty();
});

// Create new P element to append the information to
// var newP = $("<p>");
// newP = employeeName;
// $("#nameDisplay").append(newP);

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val())
    $("#nameDisplay").append("<p>" + snapshot.val().employeeName + "</p>");
    $("#roleDisplay").append("<p>" + snapshot.val().employeeRole + "</p>");
    $("#startDateDisplay").append("<p>" + snapshot.val().employeeStartDate + "</p>");
    $("#monthlyRateDisplay").append("<p>" + snapshot.val().employeeMonthlyRate + "</p>")
    });