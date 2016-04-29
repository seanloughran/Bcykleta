var volunteer = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.daysAvailable = [];
}

var firstName = "";

function volunteerSubmit(formSubmitted) {
  var firstName = formSubmitted.volfirstName.value;
}

document.getElementById('volSubmit').addEventListener("click", volunteerSubmit(this.form));

document.getElementById("daybutton").addEventListener("click", function() {
  var x = document.getElementById('checkMonday');
  if (x.checked == true) {
    console.log("Checked");
  }
})
