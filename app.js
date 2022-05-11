//initialize variables
var context;
var lives;
var shape;
//monsters
var num_monsters;
var counter_monsters;
var monsters_array;
var cherries;

//boards
var board;
var monster_board;
var cherries_board;

var score;
var pac_color;
var start_time;
var time_elapsed;
var x;

//intervals
//var interval;
//var cherries_interval;
//var monsters_interval;
var intervals = [];

//setting var
var food_num;
var color5;
var color15;
var color25;

//food typs
var food_25;
var food_5;
var food_15;
var timer = 60;

//flags
var not_move_cherries;
var ate_cherries;
var failure_flag;
var gameInProgress = false;
//images
// const cherries_img = new Image();
// cherries_img.src = '/images/cherries.png';

var monster1;
var monster2;
var monster3;
var monster4;
var cherries_img;
cherries_img = new Image();
cherries_img.src = '/images/cherries.png';
monster1 = new Image();
monster1.src = '/images/monster1.png';
monster2 = new Image();
monster2.src = '/images/monster2.png'
monster3 = new Image();
monster3.src = '/images/monster3.png'
monster4 = new Image();
monster4.src = '/images/monster5.png'

var registerBtn;
var loginBtn;
var welocmeDiv;
var registerDiv;
var loginDiv;
var users = {};
var pass;
function clear_intervals() {
	while (intervals.length > 0) {
		clearInterval(intervals.pop());
	}

}

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


//TODO:: in the display remember to hide all divs as we progress
function displayRegisterDiv() {

    clear_intervals();     

    $("#welcomeDiv").hide();
    $("#loginDiv").hide();
    $("#gameDiv").hide();
    $("#settingGame").hide();

    $("#registerDiv").show();
}

function displayLoginDiv() {
        clear_intervals();

    $("#welcomeDiv").hide();
    $("#registerDiv").hide();
    $("#gameDiv").hide();
    $("#settingGame").hide();

    $("#loginDiv").show();
}

function displayWelcomeDiv() {

    clear_intervals();

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




$(document).ready(function () {
	context = canvas.getContext("2d");
	//images

	//settingDiv
	lstartGameBtn = document.getElementById('submitSetting');
	lstartGameBtn.onclick = StartGame;
	newGameBtn = document.getElementById('newGameBtn');
	newGameBtn.onclick = startNewGame;
	randomSetBtn = document.getElementById('randomSetting');
	randomSetBtn.onclick = randomSetting;
	//document.getElementById('randomSetting').addEventListener('click', randomSetting);

	//keys input
	upKey = document.getElementById('keyUp');
	downKey = document.getElementById('keyDown');
	leftKey = document.getElementById('keyLeft');
	rightKey = document.getElementById('keyRight');
	upKey.addEventListener('keyup', displayKeyPressed);
	downKey.addEventListener('keyup', displayKeyPressed);
	leftKey.addEventListener('keyup', displayKeyPressed);
	rightKey.addEventListener('keyup', displayKeyPressed);

	function randomSetting(){
		clear_intervals();
		let form = event.target.form;
		let random_food_num = getRandomInt(50,91);
		let random_mons_num = getRandomInt(1,5);
		let random_timer = getRandomInt(60,121);
        form.elements.foodnum.value = random_food_num;
		form.elements.monstersnum.value = random_mons_num;
		form.elements.gametime.value = random_timer;
		form.elements.upkey.value = 38;
		form.elements.downkey.value = 40;
		form.elements.rightkey.value = 39;
		form.elements.leftkey.value = 37;
		form.elements.color5.value = generateRandomColor();
		form.elements.color15.value = generateRandomColor();
		form.elements.color25.value = generateRandomColor();
	}


	function displayKeyPressed() {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		event.target.value = keyCode;
		
		// return keyCode;

	}

	function generateRandomColor(){
		let maxVal = 0xFFFFFF; // 16777215
		let randomNumber = Math.random() * maxVal; 
		randomNumber = Math.floor(randomNumber);
		randomNumber = randomNumber.toString(16);
		let randColor = randomNumber.padStart(6, 0);   
		return `#${randColor.toUpperCase()}`
	}
	
	
	
	

	function startNewGame() {

			clear_intervals();

		document.getElementById('gameDiv').style.display = "none";

		document.getElementById('settingGame').style.display = "block";;

	}

	//start game func
	function StartGame() {
		clear_intervals();
		$("#welcomeDiv").hide();
		$("#loginDiv").hide();
		$("#registerDiv").hide();


		if ($("#settingForm").valid()) {
			$("#settingGame").hide();
			$("#gameDiv").show();
			let form = event.target.form;
        	food_num  = form.elements.foodnum.value;
			num_monsters = form.elements.monstersnum.value;
			timer = form.elements.gametime.value;
			color5 = form.elements.color5.value;
			color15 = form.elements.color15.value;
			color25 = form.elements.color25.value;
			Start();
		}
	}


	function Start() {
		//initial board
		clear_intervals();
		gameInProgress = true;
		board = new Array();
		shape = new Object();
		shape.i = 0;
		shape.j = 0;
		monster_board = new Array();
		cherries_board = new Array();
		monsters_array = new Array();
		score = 0;
		lives = 5;
		cherries = new Object();
		not_move_cherries = true;
		ate_cherries = false;
		// x=4;
		pac_color = "yellow";
		var cnt = 100;
		var food_remain = food_num;
		food_25 = parseInt(0.1*food_remain);
		food_15 = parseInt(0.3*food_remain);
		food_5 = food_remain - food_25 - food_15;
		var pacman_remain = 1;
		//initial monsters
		for (let k = 0; k < num_monsters; k++) {
			monsters_array[k] = new Object();
		}
		start_time = new Date();
		for (var i = 0; i < 15; i++) {
			board[i] = new Array();
			monster_board[i] = new Array();
			cherries_board[i] = new Array();
			//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
			for (var j = 0; j < 15; j++) {
				if (
					(i == 3 && j == 3) ||
					(i == 3 && j == 4) ||
					(i == 3 && j == 5) ||
					(i == 6 && j == 1) ||
					(i == 6 && j == 2)
				) {
					board[i][j] = 4;//wall
					monster_board[i][j] = 0
					cherries_board[i][j] = 0
				}
				else if (i == 7 && j == 7) {
					cherries.i = i;
					cherries.j = j;
					cherries_board[i][j] = 5;//cherries
					board[i][j] = 0;
					monster_board[i][j] = 0;
				}
				else if (i == 0 && j == 0) {
					monsters_array[0].i = i;
					monsters_array[0].j = j;
					monster_board[i][j] = 3;//monster
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
				else if (num_monsters > 1 && i == 0 && j == 14) {
					monsters_array[1].i = i;
					monsters_array[1].j = j;
					monster_board[i][j] = 3;//monster 2
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
				else if (num_monsters > 2 && i == 14 && j == 0) {
					monsters_array[2].i = i;
					monsters_array[2].j = j;
					monster_board[i][j] = 3;//monster 3
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
				else if (num_monsters > 3 && i == 14 && j == 14) {
					monsters_array[3].i = i;
					monsters_array[3].j = j;
					monster_board[i][j] = 3;//monster 4
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
			 else {
						board[i][j] = 0; //empty
						monster_board[i][j] = 0;
						cherries_board[i][j] = 0;

					}
					
				}
			}
		//makes random food
		if(pacman_remain > 0 ){
			let emptyCell_pacman = findRandomEmptyCell(board);
			board[emptyCell_pacman[0]][emptyCell_pacman[1]] = 2;
			shape.i = emptyCell_pacman[0];
			shape.j = emptyCell_pacman[1];
			pacman_remain--;
		}
		while (food_5 > 0) {
			let emptyCell_5 = findRandomEmptyCell(board);
			board[emptyCell_5[0]][emptyCell_5[1]] = 1;
			food_5--;
			food_remain--;
		}
		while (food_15 > 0) {
			let emptyCell_15 = findRandomEmptyCell(board);
			board[emptyCell_15[0]][emptyCell_15[1]] = 6;
			food_15--;
			food_remain--;
		}
		while (food_25 > 0) {
			let emptyCell_25 = findRandomEmptyCell(board);
			board[emptyCell_25[0]][emptyCell_25[1]] = 7;
			food_25--;
			food_remain--;
		}
		keysDown = {};
		addEventListener(
			"keydown",
			function (e) {
				keysDown[e.keyCode] = true;
			},
			false
		);
		addEventListener(
			"keyup",
			function (e) {
				keysDown[e.keyCode] = false;
			},
			false
		);
		intervals.push(setInterval(updateCherriesPosition, 500));
		intervals.push(setInterval(updateMonsterPosition, 500));
		intervals.push(setInterval(UpdatePosition, 145));


	}//end start

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
	}

	function findRandomEmptyCell(board) {
		var i = Math.floor(Math.random() * 14 + 1);
		var j = Math.floor(Math.random() * 14 + 1);
		while (board[i][j] != 0 || monster_board[i][j] != 0 || cherries_board[i][j] != 0) {
			i = Math.floor(Math.random() * 14 + 1);
			j = Math.floor(Math.random() * 14 + 1);
		}
		return [i, j];
	}

	function GetKeyPressed() {
		if (keysDown[upKey.value]) {//up
			return 1;
		}
		if (keysDown[downKey.value]) {//down
			return 2;
		}
		if (keysDown[leftKey.value]) {//left
			return 3;
		}
		if (keysDown[rightKey.value]) {//right
			return 4;
		}
		else {
			return x;
		}
	}

	function Draw() {//draw canvas
		canvas.width = canvas.width; //clean board
		counter_monsters = num_monsters;
		lblScore.value = score;
		lblTime.value = time_elapsed;
		lblLives.value = lives;
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				var center = new Object();
				center.x = i * 40 + 20;
				center.y = j * 40 + 20;
				//draw cherries
				if (cherries_board[i][j] == 5) {
					context.drawImage(cherries_img, center.x - 20, center.y - 20, cherries_img.width / 19, cherries_img.height / 19);
				}
				//draw monsters
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters && counter_monsters > 0) {
					context.drawImage(monster1, center.x - 20, center.y - 20, monster1.width / 13, monster1.height / 13);
					counter_monsters--;
				}
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters - 1 && counter_monsters > 0) {
					context.drawImage(monster2, center.x - 20, center.y - 20, monster2.width / 13, monster2.height / 13);
					counter_monsters--;
				}
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters - 2 && counter_monsters > 0) {
					context.drawImage(monster3, center.x - 20, center.y - 20, monster3.width / 13, monster3.height / 13);
					counter_monsters--;
				}
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters - 3 && counter_monsters > 0) {
					context.drawImage(monster4, center.x - 20, center.y - 20, monster4.width / 13, monster4.height / 13);
					counter_monsters--;
				}
				else if (board[i][j] == 2) {//packman draw
					context.beginPath();
					if (x == 1) {
						context.arc(center.x, center.y, 20, 1.65 * Math.PI, 3.35 * Math.PI);
					}
					else if (x == 2) {
						context.arc(center.x, center.y, 20, 0.65 * Math.PI, 0.35 * Math.PI);
					}
					else if (x == 3) {
						context.arc(center.x, center.y, 20, 1.15 * Math.PI, 2.85 * Math.PI);
					}
					else {
						context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI);

					}

					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					if (x == 1 || x == 2) {
						context.arc(center.x + 12.5, center.y, 3, 0, 2 * Math.PI);

					}
					else {
						context.arc(center.x + 5, center.y - 12.5, 3, 0, 2 * Math.PI);

					}
					context.fillStyle = "black"; //color
					context.fill();

				} else if (board[i][j] == 1) {//food draw
					context.beginPath();
					context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
					context.fillStyle = color5; //color
					context.fill();
					context.fillStyle = "white"; //color
                	context.font = "bold 10px Arial";
                	context.fillText("5", center.x-3, center.y+3);
				}
					else if (board[i][j] == 6) {//food draw
						context.beginPath();
						context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
						context.fillStyle = color15; //color
						context.fill();
						context.fillStyle = "white"; //color
						context.font = "bold 10px Arial";
						context.fillText("15", center.x-5.5, center.y+3);
					}
					else if (board[i][j] == 7) {//food draw
						context.beginPath();
						context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
						context.fillStyle = color25; //color
						context.fill();
						context.fillStyle = "white"; //color
						context.font = "bold 10px Arial";
						context.fillText("25", center.x-5.5, center.y+3);
				} else if (board[i][j] == 4) {//wal draw
					context.beginPath();
					context.rect(center.x - 20, center.y - 20, 40, 40);
					context.fillStyle = "grey"; //color
					context.fill();
				}
			}
		}

	}


	function set_intervals() {
		// interval = setInterval(UpdatePosition, 145);
		// monsters_interval = setInterval(updateMonsterPosition, 500);
		// if (!ate_cherries) {
		// 	cherries_interval = setInterval(updateCherriesPosition, 500);
		// }
		intervals.push(setInterval(updateCherriesPosition, 500));
		intervals.push(setInterval(updateMonsterPosition, 500));
		intervals.push(setInterval(UpdatePosition, 145));
	}

	function UpdatePosition() {
		failure_flag = false;


		board[shape.i][shape.j] = 0;
		x = GetKeyPressed();
		if (x == 1) {
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
				shape.j--;
			}
		}
		if (x == 2) {
			if (shape.j < 14 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == 3) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == 4) {
			if (shape.i < 14 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}
		//ate food
		if (board[shape.i][shape.j] == 1) {
			score = score+5;
		}
		if (board[shape.i][shape.j] == 6) {
			score = score+15;
		}
		if (board[shape.i][shape.j] == 7) {
			score = score+25;
		}
		//ate cherries
		if (cherries_board[shape.i][shape.j] == 5) {
			//window.clearInterval(cherries_interval);
			ate_cherries = true;
			cherries_board[cherries.i][cherries.j] = 0;
			score += 50;

		}
		//ate monster
		if (monster_board[shape.i][shape.j] == 3) {
			clear_intervals();
			//failure_flag = true;
			setTimeout(failure, 1500)


		}
		board[shape.i][shape.j] = 2;//update packman position
		var currentTime = new Date();
		time_elapsed = parseInt((currentTime - start_time) / 1000);
		time_elapsed = timer - time_elapsed;

		if (lives == 0) {
			Draw();
			clear_intervals();
			gameInProgress = false;
			window.alert("Loser!");
		}
		else if(time_elapsed==0){
			Draw();
			clear_intervals();
			if(score < 100){
				window.alert("You are better than "+score+" points!");
			}
			else{
				window.alert("Winner!!!");
			}
		}
		else if (score >= 300) {
			Draw();
			clear_intervals();
			gameInProgress = false;
			window.alert("Game completed");
		}
		else {
			Draw();
		}
	}


	function failure() {
		board[shape.i][shape.j] = 0;
		score -= 10;
		let empty_cell = findRandomEmptyCell(board)
		monster_board[shape.i][shape.j] = 0;
		shape.i = empty_cell[0];
		shape.j = empty_cell[1];
		clear_monsters();
		lives--;
		set_intervals();

	}


	function updateCherriesPosition() {
		//not_move_cherries = true;
		//while (not_move_cherries) {
		if (ate_cherries) {
			return;
		}
		cherries_position = getRandomInt(1, 5)
		if (cherries_position == 1) {
			if (cherries.j > 0 && board[cherries.i][cherries.j - 1] != 4 && monster_board[cherries.i][cherries.j - 1] != 3) {
				cherries_board[cherries.i][cherries.j] = 0;
				cherries.j--;
				not_move_cherries = false;

			}
		}
		else if (cherries_position == 2) {
			if (cherries.j < 14 && board[cherries.i][cherries.j + 1] != 4 && monster_board[cherries.i][cherries.j + 1] != 3) {
				cherries_board[cherries.i][cherries.j] = 0;
				cherries.j++;
				not_move_cherries = false;
			}
		}
		else if (cherries_position == 3) {
			if (cherries.i > 0 && board[cherries.i - 1][cherries.j] != 4 && monster_board[cherries.i - 1][cherries.j] != 3) {
				cherries_board[cherries.i][cherries.j] = 0;
				cherries.i--;
				not_move_cherries = false;
			}
		}
		else if (cherries_position == 4) {
			if (cherries.i < 14 && board[cherries.i + 1][cherries.j] != 4 && monster_board[cherries.i + 1][cherries.j] != 3) {
				cherries_board[cherries.i][cherries.j] = 0;
				cherries.i++;
				not_move_cherries = false;
			}
		}
		//}
		cherries_board[cherries.i][cherries.j] = 5;//update cherries position
	}

	function updateMonsterPosition() {
		for (let monster = 0; monster < monsters_array.length; monster++) {
			//let not_move_monster = true;
			//while (not_move_monster) {
			monster_board[monsters_array[monster].i][monsters_array[monster].j] = 0;
			let monster_direction = getRandomInt(1, 3);
			if (monster_direction == 1) {
				if (shape.j - monsters_array[monster].j <= 0) {
					if (monsters_array[monster].j > 0 && board[monsters_array[monster].i][monsters_array[monster].j - 1] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
						monsters_array[monster].j--;
						not_move_monster = false;
					}
				}
				else {
					if (monsters_array[monster].j < 14 && board[monsters_array[monster].i][monsters_array[monster].j + 1] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
						monsters_array[monster].j++;
						not_move_monster = false;
					}
				}
			}
			else {
				if (shape.i - monsters_array[monster].i <= 0) {
					if (monsters_array[monster].i > 0 && board[monsters_array[monster].i - 1][monsters_array[monster].j] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
						monsters_array[monster].i--;
						not_move_monster = false;
					}
				}
				else {
					if (monsters_array[monster].i < 14 && board[monsters_array[monster].i + 1][monsters_array[monster].j] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
						monsters_array[monster].i++;
						not_move_monster = false;
					}
				}
			}
			//}
			monster_board[monsters_array[monster].i][monsters_array[monster].j] = 3;
		}

	}
	function clear_monsters() {
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 15; j++) {
				if (i == 0 && j == 0) {
					monsters_array[0].i = 0;
					monsters_array[0].j = 0;
					monster_board[monsters_array[0].i][monsters_array[0].j] = 3;
				}
				else if (num_monsters > 1 && (i == 0 && j == 14)) {
					monsters_array[1].i = 0;
					monsters_array[1].j = 14;
					monster_board[monsters_array[1].i][monsters_array[1].j] = 3;
				}
				else if (num_monsters > 2 && (i == 14 && j == 0)) {
					monsters_array[2].i = 14;
					monsters_array[2].j = 0;
					monster_board[monsters_array[2].i][monsters_array[2].j] = 3;
				}
				else if (num_monsters > 3 && (i == 14 && j == 14)) {
					monsters_array[3].i = 14;
					monsters_array[3].j = 14;
					monster_board[monsters_array[3].i][monsters_array[3].j] = 3;
				}
				else {
					monster_board[i][j] = 0;
				}
			}

		}

	}
});
