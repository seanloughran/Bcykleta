window.addEventListener("load", function() {
  if (localStorage.getItem('volunteerInfo') === null) {
    volunteerArray = [];
  }
  else {
    pullVolData();
  }
})

var Volunteer = function(firstName, lastName, volunteerID, volunteerPassword, email, daysAvailable, shifts) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.volunteerID = volunteerID;
  this.volunteerPassword = volunteerPassword;
  this.email = email;
  this.daysAvailable = daysAvailable;
  this.shifts = shifts;
  this.hours = 0;
}

var volunteerArray = [];

function volunteerSubmit(formSubmitted) {
  var formValid = true;

  if (formSubmitted.volfirstName.value == "") {
    formValid = false;
  }
  if (formSubmitted.vollastName.value == "") {
    formValid = false;
  }
  if (formSubmitted.volId.value == "") {
    formValid = false;
  }
  if (formSubmitted.volEmail.value == "") {
    formValid = false;
  }
  if (formSubmitted.volPassword.value == "") {
    formValid = false;
  }

  if (formValid) {
    console.log("Submitted");
    firstName = formSubmitted.volfirstName.value;
    lastName = formSubmitted.vollastName.value;
    volId = formSubmitted.volId.value;
    volPassword = formSubmitted.volPassword.value;
    volEmail = formSubmitted.volEmail.value;
    daysCheckAvailable = [];

    var checkDays = ["checkMon", "checkTues", "checkWed", "checkThur", "checkFri", "checkSat", "checkSun"];

    //Checks which days are checked in the form.
    for (cDi=0; cDi<checkDays.length; cDi++) {
      var curDay = document.getElementById(checkDays[cDi]);
      if (curDay.checked == true) {
        daysCheckAvailable.push(curDay.value);
      }
    }

    var shiftsAvailable = [];

    //Checks which shifts are checked. Sends the info into shiftsAvailable.
    for (shifti = 0; shifti<daysCheckAvailable.length; shifti++) {
      var currentDay = daysCheckAvailable[shifti];
      var mornCheck = document.getElementById('mornMon').checked;
      var afterCheck = document.getElementById('afterMon').checked;
      shiftsAvailable.push([currentDay, mornCheck, afterCheck])
    }

    var newVolunteer = new Volunteer(firstName, lastName, volId, volPassword, volEmail, daysCheckAvailable, shiftsAvailable)

    if (localStorage.getItem('volunteerInfo') === null) {
      volunteerArray.push(newVolunteer);
      localStorage.setItem('volunteerInfo', JSON.stringify(volunteerArray));
    }
    else {
      pullVolData();
      volunteerArray.push(newVolunteer);
      localStorage.setItem('volunteerInfo', JSON.stringify(volunteerArray));
    }

    formSubmitted.volfirstName.value = "";
    formSubmitted.vollastName.value = "";
    formSubmitted.volId.value = "";
    formSubmitted.volEmail.value = "";

    var shiftClass = document.getElementsByClassName('shiftCheckbox');

    for (shiftunchecki=0; shiftunchecki<shiftClass.length; shiftunchecki++) {
      shiftClass[shiftunchecki].checked = false;
    }

    var dayCheckboxes = document.getElementsByClassName('dayCheckbox');

    for (dayunchecki=0; dayunchecki<dayCheckboxes.length; dayunchecki++) {
      dayCheckboxes[dayunchecki].checked = false;
    }

    //document.getElementById('volForm').style.display = "none";
    document.getElementById('volForm').style.display = "none";

    displayThanks(newVolunteer)
  }
}

function displayThanks(volunteer) {
  document.getElementById('volNamePara').innerHTML = volunteer.firstName;
  document.getElementById('acknowledgeID').innerHTML = volunteer.volunteerID;
}

function pullVolData() {
  volunteerArray = JSON.parse(localStorage.getItem('volunteerInfo'));
}

document.getElementById('updateHoursBtn').addEventListener("click", function(){
  document.getElementById('updateHoursForm').style.display = "block";
})

//Updates hours attribute of specified volunteer.
function updateVolunteerHours(updateForm) {
  var hoursSubmitted = false;
  var foundId = false;

  for (updateI = 0; updateI<volunteerArray.length; updateI++) {
    var cVolunteer = volunteerArray[updateI];
    if (cVolunteer.volunteerID == updateForm.enterVolId.value) {
      foundId = true;
      if (cVolunteer.volunteerPassword == updateForm.enterPassword.value) {
        cVolunteer.hours += parseInt(updateForm.enterHours.value);
        localStorage.setItem('volunteerInfo', JSON.stringify(volunteerArray));
        hoursSubmitted = true;
      }
      else {
        alert("That password did not match.")
      }
    }
  }

  if (foundId == false) {
    alert("We did not find a matching ID. Please try again.");
  }

  if (hoursSubmitted) {
    updateForm.enterVolId.value = "";
    updateForm.enterPassword.value = "";
    updateForm.enterHours.value = 0;
    document.getElementById('updateHoursForm').style.display = "none";
  }
}

function showAvailability(volunteerForm) {
  var matchedVolunteer = null;
  for (gI=0; gI<volunteerArray.length; gI++) {
    if (volunteerArray[gI].volunteerID == volunteerForm.enterVolId.value) {
      matchedVolunteer = volunteerArray[gI];
      break;
    }
  }

  chartData(matchedVolunteer);

  //availablityChartRender(matchedVolunteer);
}

function chartData(volunteer) {
  var inputArray = [];
  for (dayI=0; dayI<volunteer.shifts.length; dayI++) {
    var combine = null;
    var day = null;
    var hours = null;
    switch (volunteer.shifts[dayI][0]) {
      case "monday":
        day = "x: new Date(2016,05,05)";
        break;
      case "tuesday":
        day = "x: new Date(2016,05,06)";
        break;
      case "wednesday":
        day = "x: new Date(2016,05,07)";
        break;
      case "thursday":
        day = "x: new Date(2016,05,08)";
        break;
      case "friday":
        day = "x: new Date(2016,05,09)";
        break;
      case "saturday":
        day = "x: new Date(2016,05,10)";
        break;
      case "sunday":
        day = "x: new Date(2016,05,11)";
        break;
      default:
        alert("Day was not found");
    }

    if ((volunteer.shifts[dayI][1] == true) && (volunteer.shifts[dayI][2] == true)) {
      hours = "y: [8, 18]";
    } else if ((volunteer.shifts[dayI][1] == true) && (volunteer.shifts[dayI][2] == false)) {
      hours = "y: [8, 13]";
    } else if ((volunteer.shifts[dayI][1] == false) && (volunteer.shifts[dayI][2] == true)) {
      hours = "y: [13, 18]";
    } else {
      alert("Neither morning or afternoon selected.")
    }

    combine = { day, hours};

    inputArray.push(combine);
  }

  return inputArray;
}

// function availablityChartRender(volunteer) {
//     var chart = new
//     CanvasJS.Chart("chartContainer",
//   {
//     title: {
//       text: "Volunteer Availablity"
//     },
//     axisY: {
//       includeZero: false,
//       interval: 2,
//       minimum: 8,
//       maximum: 17,
//       title: "Hours"
//     },
//     axisX: {
//       interval: 1,
//       intervalType: "day",
//       valueFormatString: "DDDD"
//       },
//     data: [
//     {
//       type: "rangeColumn",
//       color: "#369EAD",
//       dataPoints: [
//         { x: new Date(2016,05,05), y: [8, 12] },
//         { x: new Date(2016,05,06), y: [8, 17] },
//         { x: new Date(2016,05,07), y: [13, 17] },
//         { x: new Date(2016,05,08), y: [12, 12] },
//         { x: new Date(2016,05,09), y: [8, 17] },
//         { x: new Date(2016,05,10), y: [12, 12] },
//         { x: new Date(2016,05,11), y: [13, 17] },
//       ]
//     }
//     ]
//   });
//   chart.render();
// }

//document.getElementById('volSubmit').addEventListener("click", volunteerSubmit(this.form));

// document.getElementById("daybutton").addEventListener("click", function() {
//   var x = document.getElementById('checkMonday');
//   if (x.checked == true) {
//     console.log("Checked");
//   }
// })
