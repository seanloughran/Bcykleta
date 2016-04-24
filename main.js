
var menuIcon = document.getElementById("menuIcon");
menuIcon.addEventListener("click", function() {
  var dropMenu = document.getElementById("dropMenu");
  if (dropMenu.style.display == "none") {
    dropMenu.style.display="block";
  } else {
    dropMenu.style.display="none";
  }
});
