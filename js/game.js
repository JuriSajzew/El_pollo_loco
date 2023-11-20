let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function StartGame() {
    document.getElementById('startScreen').style.display = 'none';
    initLevel();
    init()
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}

function mutteButton() {
    document.getElementById('muteButton').style.display = 'none';
    document.getElementById('tonButton').style.display = 'block';
    world.mute();
}

function soundButton() {
    document.getElementById('tonButton').style.display = 'none';
    document.getElementById('muteButton').style.display = 'block';
    world.unmute();
}

function restartButton() {
    document.getElementById('endScreen').style.display = 'none';
    StartGame();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});