var registerBtn
var loginBtn
var welocmeDiv
var registerDiv
var loginDiv
$(document).ready(function () {
    registerBtn = document.getElementById('registerBtn');
    loginBtn = document.getElementById('loginBtn');
    welocmeDiv = document.getElementById('welcomeDiv');
    registerDiv = document.getElementById('registerDiv');
    loginDiv = document.getElementById('loginDiv');

    registerBtn.onclick = displayRegisterDiv;
    registerBtn.onclick = displayLoginDiv;
});
function displayRegisterDiv() {
    if (welocmeDiv.style.display !== "none") {
        welocmeDiv.style.display = "none";
    }
    registerDiv.style.display = "block";
}
function displayLoginDiv() {
    if (welocmeDiv.style.display !== "none") {
        welocmeDiv.style.display = "none";
    }
    loginDiv.style.display = "block";
}