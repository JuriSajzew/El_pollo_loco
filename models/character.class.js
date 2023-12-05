class Character extends MovableObject {
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    y = 160;
    world;
    speed = 8;
    speedY = 2;
    idleTimeout = 0;
    offset = {
        top: 120,
        bottom: 10,
        left: 10,
        right: 25
    }

    jumpingOfChicken = false;
    walking_sound = new Audio('audio/running.mp3');
    snoring_charcter_sound = new Audio('audio/snoring.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    game_over_sound = new Audio('audio/game_over.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.animationInterval = null;
        this.applyGravity();
        this.loadAllImages();
        this.animate();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }

    animate() {
        this.characterMove();
        this.characterAnimate();
    }

    characterMove() {
        setStoppableInterval(() => {
            this.walking_sound.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 25);
    }
    /**
     * Use the right arrow key to move the character to the right
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walking_sound.play();
            this.otherDirection = false;
        }
    }

    /**
     * Use the left arrow key to move the character to the left
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.walking_sound.play();
            this.otherDirection = true;
        }
    }

    /**
     * in the function, the animations are played in an interval 
     */
    characterAnimate() {
        setStoppableInterval(() => {
            this.characterSleep();
            this.walkingCharacter();
            this.characterJump();
            this.characterDead();
            this.characterHurt();
        }, 150);
    }

    /**
        * when the character jumps off the ground:
            * the time is reset
            * the images are played and the sound
        * when the up arrow key is pressed: 
            * the variable jumpOfChicken is set to true
            * the idleTimout is set to 0
            * the jump() function is executed
     */
    characterJump() {
        if (this.isAboveGround()) {
            this.handleKeyPress();
            this.playAnimation(this.IMAGES_JUMPING);
            this.jump_sound.play();
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jumpingOfChicken = true;
            this.handleKeyPress();
            this.jump();
        }
    }

    jump() {
        this.speedY = 30;
    }

    /**
     * Checking how long the character stands still
     */
    characterSleep() {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleTimeout += 100;
        if (this.idleTimeout >= 5000) {
            this.snoringAnimation();
        }
    }
    /**
     * playback of the animation and a sound
     */
    snoringAnimation() {
        this.snoring_charcter_sound.play();
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }

    /**
     * Function for resetting the idle timeout
     */
    handleKeyPress() {
        this.idleTimeout = 0;
        this.snoring_charcter_sound.pause();
    }

    /**
     * as soon as the right or left arrow keys are pressed, the animation starts to run
     */
    walkingCharacter() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.handleKeyPress();
        }
    }

    /**
     * Charcter is dead
     */
    characterDead() {
        if (this.isDead()) {
            this.deadAnimation();
            this.gameOver();
        }
    }

    deadAnimation() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            this.walking_sound.pause();
            this.game_over_sound.play();
        }, 1000 / 20);
    }

    /**
     * Function to end the game and stop all intervals
     */
    gameOver() {
        setTimeout(() => {
            stopGame();
            document.getElementById('endScreen').style.display = '';
        }, 1250);
    }

    /**
     * Character is injured
     */
    characterHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.handleKeyPress();
        }
    }
}