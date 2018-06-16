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

  function calculateMonthsWorked(startDay) {
    var monthsWorked = moment(moment(), 'months').diff(startDay, "months");
    // Ternary statement to filter out the NAN values.  They are expressions, they evaluate to a value.
    // Not an if-then statement, it is an evaluation.
    return isNaN(monthsWorked) ? 0 : monthsWorked;
}

function calculateTotalBilled(monthsWorked, employeeMonthlyRate) {
    var totalBilled = (monthsWorked * employeeMonthlyRate);
    return totalBilled;
}

$("#add-user").on("click", function(event) {
   event.preventDefault();
    console.log("hello")
    // Display the info to the HTML
    employeeName = $("#name-input").val().trim();
    employeeRole = $("#role-input").val().trim();
    employeeStartDate = $("#start-date-input").val().trim();
    employeeMonthlyRate = $("#monthly-rate-input").val().trim();

    // var startDay = moment(employeeStartDate).diff(moment(), "months");
    // console.log(startDay);
    // var monthsWorked = moment(startDay);
    // console.log(monthsWorked);
    // var monthsWorked = calculateMonthsWorked(startDay);

    // Pushing new data to the database
    database.ref().push({
        employeeName : employeeName,
        employeeRole : employeeRole,
        employeeStartDate : employeeStartDate,
        employeeMonthlyRate : employeeMonthlyRate,
        dataAdded : firebase.database.ServerValue.TIMESTAMP
    });
    // Clear the input values
    // $(".form-control").empty();
});

// Create new P element to append the information to
// var newP = $("<p>");
// newP = employeeName;
// $("#nameDisplay").append(newP);

database.ref().on("child_added", function(snapshot) {
    var monthsWorked = calculateMonthsWorked(snapshot.val().employeeStartDate);
    console.log("about to append to the DOM")

    var totalBilled = calculateTotalBilled(monthsWorked, snapshot.val().employeeMonthlyRate)
    console.log(totalBilled);
    // console.log(snapshot.val())
    $("#nameDisplay").append("<p>" + snapshot.val().employeeName + "</p>");
    $("#roleDisplay").append("<p>" + snapshot.val().employeeRole + "</p>");
    $("#startDateDisplay").append("<p>" + snapshot.val().employeeStartDate + "</p>");
    $("#monthlyRateDisplay").append("<p>" + snapshot.val().employeeMonthlyRate + "</p>");
    $("#monthsWorkedDisplay").append("<p>" + monthsWorked + " months" + "</p>");
    $("#totalBilledDisplay").append("<p>" + "$" + totalBilled); 
    });