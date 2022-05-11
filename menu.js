var registerBtn;
var loginBtn;
var welocmeDiv;
var registerDiv;
var loginDiv;
var users = {};
var pass;

$(document).ready(function () {
    // menu buttons
    loginMenuBtn = document.getElementById('menuLoginBtn');
    welocmeMenuBtn = document.getElementById('menuWelcomeBtn');
    registerMenuBtn = document.getElementById('menuRegisterBtn');


    registerMenuBtn.onclick = displayRegisterDiv;
    loginMenuBtn.onclick = displayLoginDiv;
    welocmeMenuBtn.onclick = displayWelcomeDiv;

    //welcome buttons
    registerBtn = document.getElementById('registerBtn');
    loginBtn = document.getElementById('loginBtn');
    registerBtn.onclick = displayRegisterDiv;
    loginBtn.onclick = displayLoginDiv;

    //welcome window
    welocmeDiv = document.getElementById('welcomeDiv');

    //registeration window
    registerDiv = document.getElementById('registerDiv');
    // document.getElementById('registerForm').addEventListener('submit',handleRegister);
    document.getElementById('submitRegister').addEventListener('click', handleRegister);

    // sessionStorage.setItem("k","k"); //initial user
    users["k"] = "k";

    //login window
    loginDiv = document.getElementById('loginDiv');
    // document.getElementById('loginForm').addEventListener('submit',handleLogin);
    document.getElementById('submitLogin').addEventListener('click', handleLogin);



});

function clear_intervals() {
    while (intervals.length > 0) {
        clearInterval(intervals.pop());
    }

}

//TODO:: in the display remember to hide all divs as we progress
function displayRegisterDiv() {

    if(gameInProgress){
        clear_intervals();     
        gameInProgress = false;
    }
    $("#welcomeDiv").hide();
    $("#loginDiv").hide();
    $("#gameDiv").hide();
    $("#settingGame").hide();

    $("#registerDiv").show();
}

function displayLoginDiv() {
    if(gameInProgress){
        clear_intervals();
        gameInProgress = false;
    }
    $("#welcomeDiv").hide();
    $("#registerDiv").hide();
    $("#gameDiv").hide();
    $("#settingGame").hide();

    $("#loginDiv").show();
}

function displayWelcomeDiv() {
    if(gameInProgress){
        clear_intervals();
        gameInProgress = false;
    }
    $("#registerDiv").hide();
    $("#loginDiv").hide();
    $("#gameDiv").hide();
    $("#AboutDiv").hide();
    $("#settingGame").hide();

    $("#welcomeDiv").show();
}
function handleRegister(event) {
    if ($("#registerForm").valid()) {
        let form = event.target.form;
        let user = form.elements.userName.value;
        let pass = form.elements.password.value;
        if (users[user] != null) {
            alert("Username already exists in the system");
        }
        else {
            users[user] = pass;
            $("#registerDiv").hide();
            $("#loginDiv").show();
        }
    }

}


function handleLogin(event) {

    if ($("#loginForm").valid()) {

        let form = event.target.form;

        let user = form.elements.userName.value;
        let pass = form.elements.password.value;
        // passInStorage = sessionStorage.getItem(user);
        if (user in users) {
            if (users[user] == pass) {
                window.alert("yaayyyyyy")
                $("#loginDiv").hide();
                $("#settingGame").show();
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