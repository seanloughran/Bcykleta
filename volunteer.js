window.addEventListener("load", function() {
  if (localStorage.getItem('volunteerInfo') === null) {
    volunteerArray = [];
  }
  else {
    pullVolData();
  }

  volunteerList();
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

// var ariellefoldoe = new Volunteer("Arielle", "Foldoe", "ariellefoldoe", "password", "ariellefoldoe@gmail.com", ["tuesday", "friday", "saturday"], [["tuesday", false, true], ["friday", true, false], ["saturday", true, true]]);
// ariellefoldoe.hours = 45;
//
// var johnnybicycle = new Volunteer("Johnny", "Bicycle", "johnnybicycle", "password", "johhnyb@gmail.com", ["monday", "tuesday", "wednesday", "thursday", "friday"], [["monday", true, true], ["tuesday", true, true], ["wednesday", true, true], ["thursday", true, true], ["friday", true, true]]);
// johnnybicycle.hours = 200;
//
// var vancelarmstrong = new Volunteer("Vance", "Larmstrong", "vancelarmstrong", "password", "vlarmstrong@gmail.com", ["tuesday", "thursday", "sunday"], [["tuesday", true, false], ["thursday", false, true], ["sunday", true, true]]);
// vancelarmstrong.hours = 32;
//
// var aminasenge = new Volunteer("Amina", "Senge", "aminasenge", "password", "aminasenge@gmail.com", ["wednesday", "thursday", "saturday"], [["wednesday", true, true], ["thursday", false, true], ["saturday", true, true]]);
// aminasenge.hours = 59;


var dayArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

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
      switch (currentDay) {
        case "monday":
          var mornCheck = document.getElementById('mornMon').checked;
          var afterCheck = document.getElementById('afterMon').checked;
          break;
        case "tuesday":
          var mornCheck = document.getElementById('mornTues').checked;
          var afterCheck = document.getElementById('afterTues').checked;
          break;
        case "wednesday":
          var mornCheck = document.getElementById('mornWed').checked;
          var afterCheck = document.getElementById('afterWed').checked;
          break;
        case "thursday":
          var mornCheck = document.getElementById('mornThur').checked;
          var afterCheck = document.getElementById('afterThur').checked;
          break;
        case "friday":
          var mornCheck = document.getElementById('mornFri').checked;
          var afterCheck = document.getElementById('afterFri').checked;
          break;
        case "saturday":
          var mornCheck = document.getElementById('mornSat').checked;
          var afterCheck = document.getElementById('afterSat').checked;
          break;
        case "sunday":
          var mornCheck = document.getElementById('mornSun').checked;
          var afterCheck = document.getElementById('afterSun').checked;
          break;
        default:
          alert("Day was not found");
      }
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
    document.getElementById('volFormDiv').style.display = "none";

    displayThanks(newVolunteer)
    volunteerList();
  } else {
    alert("All information has not been filled.");
  }
}

function displayThanks(volunteer) {
  document.getElementById('volThank').style.display = "block";
  document.getElementById('volNamePara').innerHTML = volunteer.firstName;
  document.getElementById('acknowledgeID').innerHTML = volunteer.volunteerID;
}

function pullVolData() {
  volunteerArray = JSON.parse(localStorage.getItem('volunteerInfo'));
}

document.getElementById('updateHoursBtn').addEventListener("click", function(){
  if (document.getElementById('updateHoursDiv').style.display == "none") {
    document.getElementById('updateHoursDiv').style.display = "block";
    document.getElementById('updateHoursForm').style.display = "block";
  } else {
    document.getElementById('updateHoursDiv').style.display = "none";
    document.getElementById('updateHoursForm').style.display = "none";
  }
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

  document.getElementById('chartContainer').style.display = "block";
  availablityChartRender(chartData(matchedVolunteer));

  //availablityChartRender(matchedVolunteer);
}

function chartData(volunteer) {
  var dayHoursData = [
          { x: new Date(2016,05,05), y: [13, 13] },
          { x: new Date(2016,05,06), y: [13, 13] },
          { x: new Date(2016,05,07), y: [13, 13] },
          { x: new Date(2016,05,08), y: [13, 13] },
          { x: new Date(2016,05,09), y: [13, 13] },
          { x: new Date(2016,05,10), y: [13, 13] },
          { x: new Date(2016,05,11), y: [13, 13] },
        ];

  for (i=0; i<volunteer.shifts.length;i++) {
    var shift = volunteer.shifts[i];
    //console.log(shift);
    var chartIndex = dayArray.indexOf(shift[0]);
    //console.log("chartindex = " + chartIndex)
    var dayData = dayHoursData[chartIndex];
    //console.log(dayData);
    dayData.y[0] += shift[1] ? -5 : 0;
    dayData.y[1] += shift[2] ? 5 : 0;
  }

  return dayHoursData;
}

function availablityChartRender(volunteerData) {
    var chart = new
    CanvasJS.Chart("chartContainer",
  {
    title: {
      text: "Volunteer Availablity"
    },
    axisY: {
      includeZero: false,
      interval: 2,
      minimum: 8,
      maximum: 20,
      title: "Hours"
    },
    axisX: {
      interval: 1,
      intervalType: "day",
      valueFormatString: "DDDD"
      },
    data: [
    {
      type: "rangeColumn",
      color: "#369EAD",
      dataPoints: volunteerData

    }
    ]
  });
  chart.render();
}

document.getElementById("showShiftsButton").addEventListener("click", function() {
  var checkDays2 = ["checkMon", "checkTues", "checkWed", "checkThur", "checkFri", "checkSat", "checkSun"];

  //Checks which days are checked in the form.
  for (cDi2=0; cDi2<checkDays2.length; cDi2++) {
    var curDay2 = document.getElementById(checkDays2[cDi2]);
    if (curDay2.checked == true) {
      switch (checkDays2[cDi2]) {
        case "checkMon":
          document.getElementById('mondayShiftDiv').style.display = "block";
          break;
        case "checkTues":
          document.getElementById('tuesdayShiftDiv').style.display = "block";
          break;
        case "checkWed":
          document.getElementById('wednesdayShiftDiv').style.display = "block";
          break;
        case "checkThur":
          document.getElementById('thursdayShiftDiv').style.display = "block";
          break;
        case "checkFri":
          document.getElementById('fridayShiftDiv').style.display = "block";
          break;
        case "checkSat":
          document.getElementById('saturdayShiftDiv').style.display = "block";
          break;
        case "checkSun":
          document.getElementById('sundayShiftDiv').style.display = "block";
          break;
        default:
          alert("Please select at least one day.");
      }
    }
  }

  document.getElementById('shiftAvail').style.display = "block";
  document.getElementById('volSubmit').style.display = "block";
});

function volunteerList() {
  if (volunteerArray.length == 0) {
    document.getElementById('volunteerListDiv').innerHTML = "<p>No Volunteers Yet!</p>";
  } else {
    for (vi = 0; vi<volunteerArray.length; vi++) {
      var curVltr = volunteerArray[vi];
      var firstNameList = curVltr.firstName;
      var lastNameList = curVltr.lastName;
      var hoursList = curVltr.hours;
      document.getElementById('volunteerListDiv').innerHTML += "<div id='volList"+vi+"' class='volListDiv'><p>"+firstNameList+" "+lastNameList+"</p><p>Hours Volunteered: "+hoursList+"</p></div>";
      // if ((vi==0) || (vi%2==0)) {
      //   document.getElementById("volList"+vi).style.backgroundColor = "blue";
      // } else {
      //   document.getElementById("volList"+vi).style.backgroundColor = "red";
      // }
    }
  }
}

//document.getElementById('volSubmit').addEventListener("click", volunteerSubmit(this.form));

// document.getElementById("daybutton").addEventListener("click", function() {
//   var x = document.getElementById('checkMonday');
//   if (x.checked == true) {
//     console.log("Checked");
//   }
// })
