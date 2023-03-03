const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const spanLifes = document.querySelector('#lifes');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


let canvasSize;
let elementSize;
let level = 0;
let lifes = 3;

let timeStart;
let timePlayer;
let timeInterval;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let playerPosition = {
	x: undefined,
	y: undefined
};

const giftPosition = {
	x: undefined,
	y: undefined
};

let bombsPosition = [];

// PINTAR MAPA //

function setCanvasSize() {
	if(window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.8;
	} else {
		canvasSize = window.innerHeight * 0.8;
	}
	console.log(canvasSize);
	canvas.setAttribute('width', canvasSize)
	canvas.setAttribute('height', canvasSize)
	playerPosition = {
		x: undefined,
		y: undefined
	}

	elementSize = canvasSize / 10.3;
	console.log(elementSize);
	startGame();
};

function startGame() {
	game.font = `${elementSize}px Verdana`;
	game.textAlign = 'end';

	const map = maps[level];

	

	if(!map) {
		gameWin();
		return
	}

	if(!timeStart) {
		timeStart = Date.now();
		timeInterval = setInterval(showTime, 50);
		showRecord();
	}
	
	showLifes();

	const mapRows = map.trim().split('\n');
	const mapColums = mapRows.map(column => column.trim().split(''));

	bombsPosition = [];

	game.clearRect(0, 0, canvasSize, canvasSize)
	mapColums.forEach((row, rowI) => {
		row.forEach((col, colI) => {
			const emoji = emojis[col];
			const posX = (elementSize * (colI + 1)) + (elementSize / 3);
			const posY = elementSize * (rowI +1);
			game.fillText(emoji, posX, posY)

			if(col == 'O') {
				if(!playerPosition.x && !playerPosition.y) {
					playerPosition.x = posX;
					playerPosition.y = posY;
				};
			} else if(col == 'I') {
				giftPosition.x = posX;
				giftPosition.y = posY;
			} else if(col == 'X') {
				bombsPosition.push({
					x: posX,
					y: posY
				});	
			};
		});
	});
	movePlayer();
};

// MOVER JUGADOR // 

function movePlayer() {
	const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
	const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
	const giftCollision = giftCollisionX && giftCollisionY;
	
	if(giftCollision) {
		passLevel();
	}

	const bombsCollision = bombsPosition.find(bomb => {
		const bombsCollisionX = bomb.x.toFixed(2) == playerPosition.x.toFixed(2);
		const bombsCollisionY = bomb.y.toFixed(2) == playerPosition.y.toFixed(2);
		return bombsCollisionX && bombsCollisionY;
		
	});
	
	if(bombsCollision) {
		loseLevel();
	}
 
	game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
};

function passLevel() {
	console.log('ganaste');
	level++;
	startGame();
};

function gameWin() {
	console.log('Terminaste el juego');
	clearInterval(timeInterval);
	const timeRecord = localStorage.getItem('record')
	if(!timeRecord || timePlayer < timeRecord) {
		console.log('superaste el record');
		localStorage.setItem('record', timePlayer);
		
	};
};

function loseLevel() {
	lifes --
	console.log(`Chocaste una bomba, vuelve a empezar te quedan ${lifes} vidas.`);

	if(lifes <= 0) {
		lifes = 3;
		level = 0;
		timeStart = undefined;
	};
	
	playerPosition.x = undefined
	playerPosition.y = undefined
	startGame();
}; 

function showLifes() {
	const heartArray = Array(lifes).fill(emojis['HEART']);
	spanLifes.innerHTML = heartArray.join('')
};

function showTime() {
	timePlayer = ((Date.now() - timeStart) / 1000).toFixed(2)
	spanTime.innerHTML = timePlayer
};

function showRecord() {
	spanRecord.innerHTML = localStorage.getItem('record');
}


window,addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

function moveByKeys(event) {
	switch (event.key) {
		case 'ArrowUp':
			moveUp();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case 'ArrowRight':
			moveRight();
			break;
		case 'ArrowLeft':
			moveLeft();
			break;
	};
};
function moveUp() {
	if(playerPosition.y - 1 > elementSize) {
		playerPosition.y -= elementSize;
		startGame();
	};
};
function moveDown() {
	if(playerPosition.y < canvasSize - elementSize) {
		playerPosition.y += elementSize;
		startGame();
	};
};
function moveRight() {
	if(playerPosition.x < canvasSize) {
		playerPosition.x += elementSize;
		startGame();
	};
};
function moveLeft() {
	if(playerPosition.x > elementSize * 2) {
		playerPosition.x -= elementSize;
		startGame();
	};
};