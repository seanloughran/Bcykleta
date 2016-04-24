//window.addEventListener("load", pullVolunteerData)

var Volunteer = function(firstName, lastName, volunteerID, email, daysAvailable, shifts) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.volunteerID = volunteerID;
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
  if (formSubmitted.volastName.value == "") {
    formValid = false;
  }
  if (formSubmitted.volId.value == "") {
    formValid = false;
  }
  if (formSubmitted.volEmail.value == "") {
    formValid = false;
  }

  if (formValid) {
    console.log("Submitted");
    firstName = formSubmitted.volfirstName.value;
    lastName = formSubmitted.vollastName.value;
    volId = formSubmitted.volId.value;
    volEmail = formSubmitted.volEmail.value;
    daysCheckAvailable = [];

    var checkDays = ["checkMon", "checkTues", "checkWed", "checkThur", "checkFri", "checkSat", "checkSun"];

    //Checks which days are check in the form.
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

    var newVolunteer = new Volunteer(firstName, lastName, volId, volEmail, daysCheckAvailable, shiftsAvailable)

    if (localStorage.getItem('volunteerInfo') === null) {
      volunteerArray.push(newVolunteer);
      localStorage.setItem('volunteerInfo', JSON.stringify(volunteerArray));
    }
    else {
      volunteerArray = JSON.parse(localStorage.getItem('volunteerInfo'));
      volunteerArray.push(newVolunteer);
      localStorage.setItem('volunteerInfo', JSON.stringify(volunteerArray));
    }

    formSubmitted.volfirstName.value = "";
    lastName = formSubmitted.vollastName.value = "";
    volId = formSubmitted.volId.value = "";
    volEmail = formSubmitted.volEmail.value = "";

    var shiftClass = document.getElementsByClassName('shiftCheckbox');

    for (shiftunchecki=0; shiftunchecki<shiftClass.length; shiftunchecki++) {
      shiftClass[shiftunchecki].checked = false;
    }

    var dayCheckboxes = document.getElementsByClassName('dayCheckbox');

    for (dayunchecki=0; dayunchecki<dayCheckboxes.length; dayunchecki++) {
      dayCheckboxes[dayunchecki].checked = false;
    }

    document.getElementById('volForm').style.display = "none";

    displayThanks(newVolunteer)
  }  
}

function displayThanks(volunteer) {
  document.getElementById('volNamePara').innerHTML = volunteer.firstName;
  document.getElementById('acknowledgeID').innerHTML = volunteer.volunteerID;
}

//document.getElementById('volSubmit').addEventListener("click", volunteerSubmit(this.form));

// document.getElementById("daybutton").addEventListener("click", function() {
//   var x = document.getElementById('checkMonday');
//   if (x.checked == true) {
//     console.log("Checked");
//   }
// })
