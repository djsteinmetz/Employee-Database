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

    // Create new P element to append the information to
    // var newP = $("<p>");
    // newP = employeeName;
    // $("#nameDisplay").append(newP);
    database.ref().push({
        employeeName : employeeName,
        emplyoeeRole : employeeRole,
        employeeStartDate :employeeStartDate,
        employeeMonthlyRate :employeeMonthlyRate
    });



    

    // Clear the input values
    // $(".form-control").empty();
});

database.ref().on("value", function(snapshot) {
    $("#nameDisplay").append(snapshot.val().employeeName);
    console.log(snapshot.val()'is snapshot val')
    $("#roleDisplay").append(snapshot.val().employeeRole);
    $("#startDateDisplay").append(snapshot.val().employeeStartDate);
    $("#monthlyRateDisplay").append(snapshot.val().employeeMonthlyRate)
    });