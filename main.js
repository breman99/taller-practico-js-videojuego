const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let playerPosition = {
	x: undefined,
	y: undefined
}



function setCanvasSize() {
	if(window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.8;
	} else {
		canvasSize = window.innerHeight * 0.8;
	}
	console.log(canvasSize);
	canvas.setAttribute('width', canvasSize)
	canvas.setAttribute('height', canvasSize)

	elementSize = canvasSize / 10.3;
	console.log(elementSize);

	startGame();
};

function startGame() {
	game.font = `${elementSize}px Verdana`;
	game.textAlign = 'end';

	const map = maps[3];
	const mapRows = map.trim().split('\n');
	const mapColums = mapRows.map(column => column.trim().split(''));

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
			};
		});
	});
	movePlayer();
};

function movePlayer() {
	game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
};

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
	
	if(playerPosition.y > (elementSize+1)) {
		playerPosition.y -= elementSize;
		startGame();
		
	}
};
function moveDown() {
	if(playerPosition.y < canvasSize - elementSize) {
		playerPosition.y += elementSize;
		startGame();
		
	}
};
function moveRight() {
	if(playerPosition.x < canvasSize) {
		playerPosition.x += elementSize;
		startGame();
		
	}
};
function moveLeft() {
	if(playerPosition.x > elementSize + elementSize) {
		playerPosition.x -= elementSize;
		startGame();
		console.log(playerPosition.x);
	}
};