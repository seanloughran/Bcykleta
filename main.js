
var menuIcon = document.getElementById("menuIcon");
menuIcon.addEventListener("click", function() {
  var dropMenu = document.getElementById("dropMenu");
  if (dropMenu.style.display == "none") {
    dropMenu.style.display="block";
  } else {
    dropMenu.style.display="none";
  }
});

function Bike(firstname, lastname, make, model, email, serial, condition) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.make = make;
  this.model = model;
  this.email = email;
  this.serial = serial;
  this.condition = condition;
}

function showDonation() {
  var table = document.createElement("table");
  var donation = document.getElementById("donation");
  donation.appendChild(table);
  var properties = Object.keys(newBike);
  for(i = 0; i < properties.length; i++) {
    var tableRow = document.createElement("tr");
    table.appendChild(tableRow);
    var cell1 = document.createElement("td");
    tableRow.appendChild(cell1);
    cell1.innerHTML= properties[i];
  }

}

function newBike(submittedForm) {
  var firstname = submittedForm.firstname.value;
  var lastname = submittedForm.lastname.value;
  var make = submittedForm.make.value;
  var model = submittedForm.model.value;
  var email = submittedForm.email.value;
  var serial = submittedForm.serial.value;
  var condition = submittedForm.condition.value;
  var newBike = new Bike(firstname, lastname, make, model, email, serial, condition);
  showDonation();
};
