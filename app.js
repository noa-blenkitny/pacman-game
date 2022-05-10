//initialize variables
var context;
var lives;
var shape;
//monsters
var num_monsters = 4;
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
var intervals;

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
// monster1.src = '/images/monster1.png';
// const monster2 = new Image();
// monster2.src = '/images/monster2.png'
// const monster3 = new Image();
// monster3.src = '/images/monster3.png'
// const monster4 = new Image();
// monster4.src = '/images/monster4.png'

$(document).ready(function () {
	context = canvas.getContext("2d");
	//images

	//settingDiv
	lstartGameBtn = document.getElementById('StartGame');
	lstartGameBtn.onclick = StartGame;
	newGameBtn = document.getElementById('newGameBtn');
	newGameBtn.onclick = startNewGame;

	//keys input
	upKey = document.getElementById('keyUp');
	downKey = document.getElementById('keyDown');
	leftKey = document.getElementById('keyLeft');
	rightKey = document.getElementById('keyRight');
	upKey.addEventListener('keyup', displayKeyPressed);
	downKey.addEventListener('keyup', displayKeyPressed);
	leftKey.addEventListener('keyup', displayKeyPressed);
	rightKey.addEventListener('keyup', displayKeyPressed);


	function displayKeyPressed() {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		event.target.value = keyCode;
		
		// return keyCode;

	}

	// });
	function startNewGame() {

		clear_intervals();

		//context.clearRect(0, 0, canvas.width, canvas.height);
		//context = canvas.getContext("2d");
		//$("#gameDiv").hide();
		document.getElementById('gameDiv').style.display = "none";

		document.getElementById('settingGame').style.display = "block";;
		//settingGame.display = block;
		//$("#settingGame").show();
		//Start();
	}

	//start game func
	function StartGame() {
		$("#welcomeDiv").hide();
		$("#loginDiv").hide();
		$("#registerDiv").hide();
		$("#settingGame").hide();
		$("#gameDiv").show();
		// clear_intervals();
		//setTimeout(start,0);
		Start();
	}


	function Start() {
		//initial board
		gameInProgress = true;
		intervals = new Array();
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
		var food_remain = 50;
		var pacman_remain = 1;
		//initial monsters
		for (let k = 0; k < num_monsters; k++) {
			monsters_array[k] = new Object();
		}
		start_time = new Date();
		for (var i = 0; i < 10; i++) {
			board[i] = new Array();
			monster_board[i] = new Array();
			cherries_board[i] = new Array();
			//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
			for (var j = 0; j < 10; j++) {
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
				else if (i == 4 && j == 4) {
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
				else if (num_monsters > 1 && i == 0 && j == 9) {
					monsters_array[1].i = i;
					monsters_array[1].j = j;
					monster_board[i][j] = 3;//monster 2
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
				else if (num_monsters > 2 && i == 9 && j == 0) {
					monsters_array[2].i = i;
					monsters_array[2].j = j;
					monster_board[i][j] = 3;//monster 3
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
				else if (num_monsters > 3 && i == 9 && j == 9) {
					monsters_array[3].i = i;
					monsters_array[3].j = j;
					monster_board[i][j] = 3;//monster 4
					board[i][j] = 0;
					cherries_board[i][j] = 0;
				}
				else {
					var randomNum = Math.random();
					if (randomNum <= (1.0 * food_remain) / cnt) {
						food_remain--;
						board[i][j] = 1;//food
						monster_board[i][j] = 0;
						cherries_board[i][j] = 0;
					} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;//packman
						monster_board[i][j] = 0;
						cherries_board[i][j] = 0;
					} else {
						board[i][j] = 0; //empty
						monster_board[i][j] = 0;
						cherries_board[i][j] = 0;

					}
					cnt--;
				}
			}
		}
		//makes random food
		while (food_remain > 0) {
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 1;
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
		// cherries_interval = setInterval(updateCherriesPosition, 500);
		// monsters_interval = setInterval(updateMonsterPosition, 500);
		// interval = setInterval(UpdatePosition, 145);


	}//end start

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
	}

	function findRandomEmptyCell(board) {
		var i = Math.floor(Math.random() * 9 + 1);
		var j = Math.floor(Math.random() * 9 + 1);
		while (board[i][j] != 0 || monster_board[i][j] != 0 || cherries_board[i][j] != 0) {
			i = Math.floor(Math.random() * 9 + 1);
			j = Math.floor(Math.random() * 9 + 1);
		}
		return [i, j];
	}

	function GetKeyPressed() {
		// if (keysDown[38]) {//up
		// 	return 1;
		// }
		// if (keysDown[40]) {//down
		// 	return 2;
		// }
		// if (keysDown[37]) {//left
		// 	return 3;
		// }
		// if (keysDown[39]) {//right
		// 	return 4;
		// }
		// else {
		// 	return x;
		// }
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
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				var center = new Object();
				center.x = i * 60 + 30;
				center.y = j * 60 + 30;
				//draw cherries
				if (cherries_board[i][j] == 5) {
					context.drawImage(cherries_img, center.x - 30, center.y - 30, cherries_img.width / 15, cherries_img.height / 15);
				}
				//draw monsters
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters && counter_monsters > 0) {
					context.drawImage(monster1, center.x - 30, center.y - 30, monster1.width / 11, monster1.height / 11);
					counter_monsters--;
				}
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters - 1 && counter_monsters > 0) {
					context.drawImage(monster2, center.x - 30, center.y - 30, monster2.width / 11, monster2.height / 11);
					counter_monsters--;
				}
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters - 2 && counter_monsters > 0) {
					context.drawImage(monster3, center.x - 30, center.y - 30, monster3.width / 11, monster3.height / 11);
					counter_monsters--;
				}
				else if (monster_board[i][j] == 3 && counter_monsters == num_monsters - 3 && counter_monsters > 0) {
					context.drawImage(monster4, center.x - 30, center.y - 30, monster4.width / 11, monster4.height / 11);
					counter_monsters--;
				}
				else if (board[i][j] == 2) {//packman draw
					context.beginPath();
					if (x == 1) {
						context.arc(center.x, center.y, 30, 1.65 * Math.PI, 3.35 * Math.PI);
					}
					else if (x == 2) {
						context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI);
					}
					else if (x == 3) {
						context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI);
					}
					else {
						context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI);

					}

					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					if (x == 1 || x == 2) {
						context.arc(center.x + 12.5, center.y, 5, 0, 2 * Math.PI);

					}
					else {
						context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);

					}
					context.fillStyle = "black"; //color
					context.fill();

				} else if (board[i][j] == 1) {//food draw
					context.beginPath();
					context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (board[i][j] == 4) {//wal draw
					context.beginPath();
					context.rect(center.x - 30, center.y - 30, 60, 60);
					context.fillStyle = "grey"; //color
					context.fill();
				}
			}
		}

	}

	function clear_intervals() {
		while (intervals.length > 0) {
			clearInterval(intervals.pop());
		}
		// clearInterval(interval);
		// clearInterval(monsters_interval);
		// if (!ate_cherries) {
		// 	clearInterval(cherries_interval);
		// }

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
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == 3) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == 4) {
			if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}
		//ate food
		if (board[shape.i][shape.j] == 1) {
			score++;
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
			failure_flag = true;
			setTimeout(failure, 1500)


		}
		board[shape.i][shape.j] = 2;//update packman position
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		if (failure_flag) {
			time_elapsed = time_elapsed + 1.5;
		}
		if (score >= 20 && time_elapsed <= 10) {
			pac_color = "green";
		}
		if (lives == 0) {
			//Draw();
			//window.clearInterval(interval);
			clear_intervals();
			gameInProgress = false;
			window.alert("Loser!");
		}
		else if (score >= 50) {
			//Draw();
			//window.clearInterval(interval);
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
			if (cherries.j < 9 && board[cherries.i][cherries.j + 1] != 4 && monster_board[cherries.i][cherries.j + 1] != 3) {
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
			if (cherries.i < 9 && board[cherries.i + 1][cherries.j] != 4 && monster_board[cherries.i + 1][cherries.j] != 3) {
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
					if (monsters_array[monster].j < 9 && board[monsters_array[monster].i][monsters_array[monster].j + 1] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
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
					if (monsters_array[monster].i < 9 && board[monsters_array[monster].i + 1][monsters_array[monster].j] != 4 && monster_board[monsters_array[monster].i][monsters_array[monster].j - 1] != 3) {
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
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (i == 0 && j == 0) {
					monsters_array[0].i = 0;
					monsters_array[0].j = 0;
					monster_board[monsters_array[0].i][monsters_array[0].j] = 3;
				}
				else if (num_monsters > 1 && (i == 0 && j == 9)) {
					monsters_array[1].i = 0;
					monsters_array[1].j = 9;
					monster_board[monsters_array[1].i][monsters_array[1].j] = 3;
				}
				else if (num_monsters > 2 && (i == 9 && j == 0)) {
					monsters_array[2].i = 9;
					monsters_array[2].j = 0;
					monster_board[monsters_array[2].i][monsters_array[2].j] = 3;
				}
				else if (num_monsters > 3 && (i == 9 && j == 9)) {
					monsters_array[3].i = 9;
					monsters_array[3].j = 9;
					monster_board[monsters_array[3].i][monsters_array[3].j] = 3;
				}
				else {
					monster_board[i][j] = 0;
				}
			}

		}

	}
});