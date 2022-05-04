var registerBtn
var loginBtn
var welocmeDiv
var registerDiv
var loginDiv
var user
var pass
var users = {}

$(document).ready(function () {
    registerBtn = document.getElementById('registerBtn');
    loginBtn = document.getElementById('loginBtn');
    welocmeDiv = document.getElementById('welcomeDiv');
    registerDiv = document.getElementById('registerDiv');
    loginDiv = document.getElementById('loginDiv');
    users["k"] = "k"
    registerBtn.onclick = displayRegisterDiv;
    loginBtn.onclick = displayLoginDiv;
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
function handleRegister(event) {
    if ($("#registerForm").valid()) {
        let form = event.target;
        user = form.elements.userName.value;
        pass = form.elements.password.value;
        users[user] = pass;
        for (var key in users) {
            var value = users[key];
            window.alert(key)
            // do something with "key" and "value" variables
        }

    }
}
function handleLogin(event) {
    if ($("#loginForm").valid()) {
        let form = event.target;
        user = form.elements.userName.value;
        pass = form.elements.password.value;

        

        if (user in users) {
            if (users[user] == pass) {
                window.alert("yaayyyyyy")
            }
            else {
                window.alert("wrong password")
            }
        }
        else {
            window.alert("wrong username")

        }

    }

}