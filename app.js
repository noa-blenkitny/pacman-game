//initialize variables
var context;
var lives;
var shape;
var food_remain

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
var timer;

//flags
var numPillEaten;
var not_move_cherries;
var ate_cherries;
var musicOn = false;

//imgs
var monster1;
var monster2;
var monster3;
var monster4;
var cherries_img;
var wall_img

cherries_img = new Image();
cherries_img.src = './images/cherries.png';
monster1 = new Image();
monster1.src = './images/monster1.png';
monster2 = new Image();
monster2.src = './images/monster2.png'
monster3 = new Image();
monster3.src = './images/monster3.png'
monster4 = new Image();
monster4.src = './images/monster5.png'
clock_img = new Image();
clock_img.src = './images/clock.png'
heart_img = new Image();
heart_img.src = './images/heart.png'
pill_img = new Image();
pill_img.src = './images/pill.png'


var pill;
var sound = new Audio('./sounds/theme.mp3');
sound.loop = true;
sound.autoplay = false;
var failure_sound = new Audio('./sounds/death.mp3')
var registerBtn;
var loginBtn;
var welocmeDiv;
var registerDiv;
var loginDiv;
var users = {};
var pass;
var currUser;


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

	// sound = document.getElementById('sound');
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
	document.getElementById('submitRegister').addEventListener('click', handleRegister);

	users["k"] = "k";

	//login window
	loginDiv = document.getElementById('loginDiv');
	document.getElementById('submitLogin').addEventListener('click', handleLogin);



});


//TODO:: in the display remember to hide all divs as we progress
function displayRegisterDiv() {

	clear_intervals();
	sound.pause();

	$("#welcomeDiv").hide();
	$("#loginDiv").hide();
	$("#gameAndSettings").hide();
	$("#settingGame").hide();

	$("#registerDiv").show();
}

function displayLoginDiv() {
	clear_intervals();
	sound.pause();

	$("#welcomeDiv").hide();
	$("#registerDiv").hide();
	$("#gameAndSettings").hide();
	$("#settingGame").hide();

	$("#loginDiv").show();
}

function displayWelcomeDiv() {

	clear_intervals();

	sound.pause();

	$("#registerDiv").hide();
	$("#loginDiv").hide();
	$("#gameAndSettings").hide();
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
				currUser = user;
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

	//stop/play music
	// stopMusicBtn = document.getElementById('stopMusicBtn');
	// playMusicBtn = document.getElementById('playMusicBtn');
	// stopMusicBtn.onclick = stop_music();
	// playMusicBtn.onclick = play_music();



	function randomSetting() {
		clear_intervals();
		let form = event.target.form;
		let random_food_num = getRandomInt(50, 91);
		let random_mons_num = getRandomInt(1, 5);
		let random_timer = getRandomInt(60, 121);
		form.elements.foodnum.value = random_food_num;
		form.elements.monstersnum.value = random_mons_num;
		form.elements.gametime.value = random_timer;
		form.elements.upkey.value = "ArrowUp";
		form.elements.downkey.value = "ArrowDown";
		form.elements.rightkey.value = "ArrowRight";
		form.elements.leftkey.value = "ArrowLeft";

		form.elements.color5.value = generateRandomColor();
		form.elements.color15.value = generateRandomColor();
		form.elements.color25.value = generateRandomColor();
	}


	function displayKeyPressed() {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		// event.target.value = keyCode;
		event.target.value = event.key;

		// alert(event.key)
		// return keyCode;

	}

	function generateRandomColor() {
		let maxVal = 0xFFFFFF; // 16777215
		let randomNumber = Math.random() * maxVal;
		randomNumber = Math.floor(randomNumber);
		randomNumber = randomNumber.toString(16);
		let randColor = randomNumber.padStart(6, 0);
		return `#${randColor.toUpperCase()}`
	}





	function startNewGame() {

		clear_intervals();
		sound.pause();


		document.getElementById('gameAndSettings').style.display = "none";

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
			$("#gameAndSettings").show();
			let form = event.target.form;
			//parse int round down to the nearest integer, is that ok?
			food_num = parseInt(form.elements.foodnum.value);
			num_monsters = parseInt(form.elements.monstersnum.value);
			timer = parseInt(form.elements.gametime.value);
			color5 = form.elements.color5.value;
			color15 = form.elements.color15.value;
			color25 = form.elements.color25.value;
			// document.getElementById('upP').innerHTML = form.elements.upkey.value;
			displaySettings();
			Start();
		}
	}


	function Start() {
		//initial board
		clear_intervals();
		sound.currentTime = 0;
		sound.play();
		musicOn = true;
		board = new Array();
		shape = new Object();
		shape.i = 0;
		shape.j = 0;
		pill1 = new Object();
		pill2 = new Object();
		pill_array = new Array();
		pill_array.push(pill1);
		pill_array.push(pill2);
		monster_board = new Array();
		cherries_board = new Array();
		monsters_array = new Array();
		score = 0;
		lives = 5;
		cherries = new Object();
		not_move_cherries = true;
		ate_cherries = false;
		pac_color = "yellow";
		food_remain = food_num;
		food_25 = parseInt(0.1 * food_remain);
		food_15 = parseInt(0.3 * food_remain);
		food_5 = food_remain - food_25 - food_15;
		var pacman_remain = 1;
		numPillEaten = 0;
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
					(i == 2 && j == 4) ||
					(i == 2 && j == 5) ||
					(i == 6 && j == 1) ||
					(i == 6 && j == 2) ||
					(i == 10 && j == 12) ||
					(i == 9 && j == 12) ||
					(i == 9 && j == 13) ||
					(i == 9 && j == 11) ||
					(i == 6 && j == 6) ||
					(i == 5 && j == 6) ||
					(i == 7 && j == 6) ||
					(i == 7 && j == 5) ||
					(i == 8 && j == 5) ||
					(i == 2 && j == 11) ||
					(i == 2 && j == 12) ||
					(i == 3 && j == 12) ||
					(i == 4 && j == 12) ||
					(i == 12 && j == 3) ||
					(i == 12 && j == 4) ||
					(i == 12 && j == 2) ||
					(i == 11 && j == 2) 
				
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
		if (pacman_remain > 0) {
			let emptyCell_pacman = findRandomEmptyCell(board);
			board[emptyCell_pacman[0]][emptyCell_pacman[1]] = 2;
			shape.i = emptyCell_pacman[0];
			shape.j = emptyCell_pacman[1];
			pacman_remain--;
		}
		let emptyCell_extraTime = findRandomEmptyCell(board);
		board[emptyCell_extraTime[0]][emptyCell_extraTime[1]] = 8; // time
		let emptyCell_extraLife = findRandomEmptyCell(board);
		board[emptyCell_extraLife[0]][emptyCell_extraLife[1]] = 9; // life
		for (let pillIndex = 0; pillIndex < 2; pillIndex++) {
			let emptyCell_pill = findRandomEmptyCell(board);
			board[emptyCell_pill[0]][emptyCell_pill[1]] = 10; // pill
			pill_array[pillIndex].i = emptyCell_pill[0];
			pill_array[pillIndex].j = emptyCell_pill[1];
		}
		while (food_5 > 0) {
			let emptyCell_5 = findRandomEmptyCell(board);
			board[emptyCell_5[0]][emptyCell_5[1]] = 1;
			food_5--;
		}
		while (food_15 > 0) {
			let emptyCell_15 = findRandomEmptyCell(board);
			board[emptyCell_15[0]][emptyCell_15[1]] = 6;
			food_15--;
		}
		while (food_25 > 0) {
			let emptyCell_25 = findRandomEmptyCell(board);
			board[emptyCell_25[0]][emptyCell_25[1]] = 7;
			food_25--;
		}
		keysDown = {};
		addEventListener(
			"keydown",
			function (e) {
				keysDown[e.key] = true;
			},
			false
		);
		addEventListener(
			"keyup",
			function (e) {
				keysDown[e.key] = false;
			},
			false
		);
		intervals.push(setInterval(updateCherriesPosition, 500));
		intervals.push(setInterval(updateMonsterPosition, 500));
		intervals.push(setInterval(UpdatePosition, 145));
		intervals.push(setInterval(UpdatePillPosition, 2000));


	}//end start

	function displaySettings() {
		// document.getElementById("upP").innerHTML = String.fromCharCode(parseInt(upKey.value,16))
		document.getElementById("upP").innerHTML = upKey.value;
		document.getElementById("downP").innerHTML = downKey.value;
		document.getElementById("rightP").innerHTML = rightKey.value;
		document.getElementById("leftP").innerHTML = leftKey.value;
		document.getElementById("foodP").innerHTML = food_num;
		document.getElementById("monstersP").innerHTML = num_monsters;
		document.getElementById("timeP").innerHTML = timer;
	}

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
		lblUser.value = currUser;
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
					context.fillText("5", center.x - 3, center.y + 3);
				}
				else if (board[i][j] == 6) {//food draw
					context.beginPath();
					context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
					context.fillStyle = color15; //color
					context.fill();
					context.fillStyle = "white"; //color
					context.font = "bold 10px Arial";
					context.fillText("15", center.x - 5.5, center.y + 3);
				}
				else if (board[i][j] == 7) {//food draw
					context.beginPath();
					context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
					context.fillStyle = color25; //color
					context.fill();
					context.fillStyle = "white"; //color
					context.font = "bold 10px Arial";
					context.fillText("25", center.x - 5.5, center.y + 3);
				} else if (board[i][j] == 4) {//wal draw
					context.beginPath();
					context.rect(center.x - 20, center.y - 20, 40, 40);
					context.fillStyle = "black";
					context.fill();
					context.lineWidth = 3;
					context.strokeStyle = "#1919ff";
					context.stroke();
					// context.beginPath();
					// context.moveTo(center.x - 20,center.y - 20);
					// context.lineTo(center.x + 20,center.y - 20);
					// context.strokeStyle="black";
					// context.stroke();
				}
				else if (board[i][j] == 8) {//clock draw
					context.drawImage(clock_img, center.x - 15, center.y - 15, clock_img.width / 16, clock_img.height / 16);

				}
				else if (board[i][j] == 9) {//heart draw
					context.drawImage(heart_img, center.x - 20, center.y - 20, heart_img.width / 28, heart_img.height / 28);

				}
				else if (board[i][j] == 10) {//pill draw
					context.drawImage(pill_img, center.x - 20, center.y - 20, pill_img.width / 85, pill_img.height / 85);

				}
			}
		}

	}


	function set_intervals() {
		intervals.push(setInterval(updateCherriesPosition, 500));
		intervals.push(setInterval(updateMonsterPosition, 500));
		intervals.push(setInterval(UpdatePosition, 145));
		intervals.push(setInterval(UpdatePillPosition, 2000));

	}

	function UpdatePosition() {
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
			score = score + 5;
			food_remain--;
		}
		if (board[shape.i][shape.j] == 6) {
			score = score + 15;
			food_remain--;

		}
		if (board[shape.i][shape.j] == 7) {
			score = score + 25;
			food_remain--;

		}
		if (board[shape.i][shape.j] == 8) {
			timer = timer + 10;

		}
		if (board[shape.i][shape.j] == 9) {
			lives++;

		}
		if (board[shape.i][shape.j] == 10) {
			score = score + 100;
			numPillEaten++;
		}
		//ate cherries
		if (cherries_board[shape.i][shape.j] == 5) {
			ate_cherries = true;
			cherries_board[cherries.i][cherries.j] = 0;
			score += 50;

		}
		//ate monster
		if (monster_board[shape.i][shape.j] == 3) {
			sound.pause();
			if (musicOn) {
				failure_sound.play();
			}
			clear_intervals();
			setTimeout(failure, 1500)


		}
		board[shape.i][shape.j] = 2;//update packman position
		var currentTime = new Date();
		time_elapsed = parseInt((currentTime - start_time) / 1000);
		time_elapsed = timer - time_elapsed;

		if (lives == 0) {
			Draw();
			clear_intervals();

			window.alert("Loser!");
			sound.pause();

		}
		else if (time_elapsed <= 0) {
			Draw();
			clear_intervals();
			sound.pause();
			if (score < 100) {
				window.alert("You are better than " + score + " points!");
			}
			else {
				window.alert("Winner!!!");
				// $("#title").innerHTML = "Winner!!!";
				// $("#title").show();
			}
		}
		else if (food_remain <= 0) {

			sound.pause();

			Draw();
			clear_intervals();
			window.alert("Winner!!!");
		}
		else {
			Draw();
		}
	}


	function failure() {

		board[shape.i][shape.j] = 0;
		if (score >=10)
		{
			score -= 10;
		}
		else
		{
			score = 0;
		}
		

		
		let empty_cell = findRandomEmptyCell(board)
		monster_board[shape.i][shape.j] = 0;
		shape.i = empty_cell[0];
		shape.j = empty_cell[1];
		clear_monsters();
		lives--;
		if (lives != 0 && musicOn) {
			setTimeout(play_music, 400);
		}
		set_intervals();

	}
	function UpdatePillPosition() {
		if (numPillEaten == 2) {
			return
		}
		else 
		{
			let move = getRandomInt(1, 5);
			board[pill1.i][pill1.j] = 0;
			if (move == 1) 
			{
				let cell = findRandomEmptyCell(board);
				board[cell[0]][cell[1]] = 10;
				pill1.i = cell[0];
				pill1.j = cell[1];
			}
			if (numPillEaten == 0) 
			{
				let move2 = getRandomInt(1, 5);
				board[pill2.i][pill2.j] = 0;
				if (move2 == 1) {
					let cell2 = findRandomEmptyCell(board);
					
					board[cell2[0]][cell2[1]] = 10;
					pill2.i = cell2[0];
					pill2.j = cell2[1];
				}
			}

		}

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

			monster_board[monsters_array[monster].i][monsters_array[monster].j] = 0;
			let monster_direction = getRandomInt(1, 3);
			if (monster_direction == 1) {
				if (shape.j - monsters_array[monster].j <= 0) {
					if (monsters_array[monster].j > 0 && board[monsters_array[monster].i][monsters_array[monster].j - 1] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
						monsters_array[monster].j--;
					}
				}
				else {
					if (monsters_array[monster].j < 14 && board[monsters_array[monster].i][monsters_array[monster].j + 1] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j + 1] != 3) {
						monsters_array[monster].j++;
					}
				}
			}
			else {
				if (shape.i - monsters_array[monster].i <= 0) {
					if (monsters_array[monster].i > 0 && board[monsters_array[monster].i - 1][monsters_array[monster].j] != 4 && monster_board[monsters_array[monster].i - 1][monsters_array[monster].j] != 3) {
						monsters_array[monster].i--;
					}
				}
				else {
					if (monsters_array[monster].i < 14 && board[monsters_array[monster].i + 1][monsters_array[monster].j] != 4 && monster_board[monsters_array[monster].i + 1][monsters_array[monster].j] != 3) {
						monsters_array[monster].i++;
					}
				}
			}
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
function play_music() {
	sound.play();
	musicOn = true;

}
function stop_music() {
	sound.pause();
	musicOn = false;

}