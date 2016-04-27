var valueArray = [];//creates an empty array to put input values for the donation form
var donation = document.getElementById("donationtableDiv");
donation.style.display="none";

function Bike(firstname, lastname, make, model, email, serial, condition) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.make = make;
  this.model = model;
  this.email = email;
  this.serial = serial;
  this.condition = condition;
}

function showDonation(bike) {
  var table = document.createElement("table");
  table.setAttribute("id", "donationTable");
  donation.style.display="block";
  donation.appendChild(table);
  for(var key in bike) {
    var value = bike[key];
    valueArray.push(value);
  }
  var properties = Object.keys(bike);
  for(i = 0; i < properties.length; i++) {
    var tableRow = document.createElement("tr");
    table.appendChild(tableRow);
    var cell1 = document.createElement("td");
    cell1.setAttribute("class", "donationtd");
    tableRow.appendChild(cell1);
    cell1.innerHTML= properties[i];
    var cell2 = document.createElement("td");
    cell2.setAttribute("class", "donationtd");
    tableRow.appendChild(cell2);
    cell2.innerHTML = valueArray[i];
  }
  var button = document.createElement("button");
  table.appendChild(button);
  button.innerHTML = "Confirm";
  button.addEventListener("click", function() {
    table.style.display="none";
    var messageDiv = document.createElement("div");
    donation.appendChild(messageDiv);
    var message = document.createElement("p");
    messageDiv.appendChild(message);
    message.innerHTML = "Thank you so much for your donation! With your help we will be able to provide access to resouces and skills to all members in the community."
  });
}

function newBike(submittedForm) {
  var firstname = submittedForm.firstname.value;
  var lastname = submittedForm.lastname.value;
  var make = submittedForm.make.value;
  var model = submittedForm.model.value;
  var email = submittedForm.email.value;
  var serial = submittedForm.serial.value;
  var condition = submittedForm.condition.value;
  var bike = new Bike(firstname, lastname, make, model, email, serial, condition);
  console.log(bike);
  showDonation(bike);
};

function popup(url, bikeinfo) {
	var div = document.getElementById("clickedBike");
  div.style.display="block";
  var button = document.createElement("button");
  button.setAttribute("id", "close");
  button.addEventListener("click", closePopUp);
  button.innerHTML = "x";
  var img = document.getElementById("img");
  img.setAttribute("src", url);
  img.setAttribute("class", "showbike");
  div.appendChild(button);
  var bikeDescription = document.createElement("p");
  bikeDescription.setAttribute("id", "bikeinfop");
  bikeDescription.innerHTML = bikeinfo;
  div.appendChild(bikeDescription);
}
function closePopUp() {
  var div = document.getElementById("clickedBike");
  var img = document.getElementById("img");
  var bikeDescription = document.getElementById("bikeinfop");
  bikeDescription.innerHTML = "";
  bikeDescription.setAttribute("id", "used");
  div.setAttribute("src", "");
  div.style.display="none";

}
