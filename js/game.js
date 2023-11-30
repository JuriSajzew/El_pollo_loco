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
    hideLoader();
    world.background_sound.play();
    mobileTouchStart();
    mobileTouchStop();
    window.onload = checkCanvasHeight();
    window.addEventListener('resize', checkCanvasHeight());
}

function startAnimations() {
    animateItems(world.character);
    animateArray(world.level.endboss);
    animateArray(world.level.coins);
    animateArray(world.level.enemies);
    animateArray(world.level.clouds);
    animateArray(world.level.bottles);
}

function animateItems(item) {
    item.animate();
}

function animateArray(array) {
    array.forEach(item => {
        animateItems(item);
    });
}

function StartGame() {
    document.getElementById('startScreen').style.display = 'none';
    showLoader();
    setTimeout(() => {
        initLevel();
        init();
    }, 4000);
}

function showLoader() {
    document.getElementById("loader-wrapper").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader-wrapper").style.display = "none";
}


function stopGame() {
    intervalIds.forEach(clearInterval);
    world.mute();
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

function settingsButton() {
    stopGame();
    document.getElementById('infoContain').style.display = 'block';
    textInfoContain();
}

function textInfoContain() {
    document.getElementById('infoContain').innerHTML = `
        <div class="infoContain1">
            <div class="infoContain2">
                <img class="closeButton" onclick="closeDetailContain()" src="img/icons/x.svg">
            </div>
            <h5>Welcome to Hühnerhausen, adventurer!<br> 
                Control Pepe, the brave coin collector, with the arrow keys. Press the left arrow key to go left and the right arrow key to go right. If you want to jump over the cheeky hens and cute chicks, press the up arrow key.<br> 
                <br>
                Collect the shiny coins as you make your way through the colorful world to earn points and become the hero of Hühnerhausen. But watch out! The mighty rooster is waiting for you at the end.<br>
                <br>
                To defeat the rooster, throw the collected salsa bottles with the "D" button. These sharp salsa powers will drive the rooster away and bring you victory!<br>
                <br>
                Prove your skills, collect coins, defeat the chickens and face the challenge against the rooster. Good luck, Pepe the coin collector!
            </h5>
        </div>
`;
}

function closeDetailContain() {
    document.getElementById('infoContain').style.display = 'none';
    startAnimations();
    world.run();
    world.unmute();
}

function fullscreenButton() {
    document.getElementById('fullscreenButton').style.display = 'none';
    document.getElementById('normalScreenButton').style.display = 'block';
    let fullscreen = document.getElementById('fullScreen');
    enterFullscreen(fullscreen);
}

function normalScreenButton() {
    document.getElementById('fullscreenButton').style.display = 'block';
    document.getElementById('normalScreenButton').style.display = 'none';
    exitFullscreen();
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
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

function mobileTouchStart() {
    document.getElementById('mobileButtonRight').addEventListener('touchstart', (ev) => {
        keyboard.RIGHT = true;
        ev.preventDefault();
    }); document.getElementById('mobileButtonLeft').addEventListener('touchstart', (ev) => {
        keyboard.LEFT = true;
        ev.preventDefault();
    }); document.getElementById('mobileButtonThrow').addEventListener('touchstart', (ev) => {
        keyboard.D = true;
        ev.preventDefault();
    }); document.getElementById('mobileButtonJump').addEventListener('touchstart', (ev) => {
        keyboard.UP = true;
        ev.preventDefault();
    });
}

function mobileTouchStop() {
    document.getElementById('mobileButtonRight').addEventListener('touchend', (ev) => {
        keyboard.RIGHT = false;
        ev.preventDefault();
    });
    document.getElementById('mobileButtonLeft').addEventListener('touchend', (ev) => {
        keyboard.LEFT = false;
        ev.preventDefault();
    });
    document.getElementById('mobileButtonThrow').addEventListener('touchend', (ev) => {
        keyboard.D = false;
        ev.preventDefault();
    });
    document.getElementById('mobileButtonJump').addEventListener('touchend', (ev) => {
        keyboard.UP = false;
        ev.preventDefault();
    });
}

function checkCanvasHeight() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        const canvasHeight = canvas.height;
        if (canvasHeight < 490) {
            document.querySelector('.mobileButtonContain').style.display = 'flex';
        } else {
            document.querySelector('.mobileButtonContain').style.display = 'none';
        }
    }
}