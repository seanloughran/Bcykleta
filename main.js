
var menuIcon = document.getElementById("menuIcon");
menuIcon.addEventListener("click", function() {
  var dropMenu = document.getElementById("dropMenu");
  var menuList = document.getElementById("menuList");

  if (dropMenu.style.display == "none") {
    dropMenu.style.display="block";

  } else {
    dropMenu.style.display = "none";

  }
});
