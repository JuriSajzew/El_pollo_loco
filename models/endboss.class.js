class Endboss extends MovableObject {
    IMAGES_ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    y = 50;
    height = 400;
    width = 300;
    throwBottleEndboss = false;
    energy = 80;
    offset = {
        top: 150,
        bottom: 100,
        left: 50,
        right: 40,

    }

    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_WALKING[0]);
        this.x = 1990 + Math.random() * 500;
        this.speed = 1 + Math.random() * 0.25;
        this.loadAllImages();
        this.animate();
    }

    /**
     * loading all images
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
    }

    /**
     * start the animation
     */
    animate() {
        this.EndbossAnimate();
    }
    
    /**
     * start the intervals move left
     * start animate dead endboss
     * start animate hurt endboss
     */
    EndbossAnimate() {
        setStoppableInterval(() => {
            this.EndbossMoveLeft();
            this.EndbossDead();
            this.EndbossHurt();
        }, 1000 / 10);
    }

    /**
     * function to move the endboss zo the left
     */
    EndbossMoveLeft() {
        this.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
    }

    /**
     * Check whether the end boss is dead
     * 
     */
    EndbossDead() {
        if (this.isDead()) {
            this.deadEndbossAnimation();
            this.gameOver();
        }
    }

    /**
     * Start the animation when the end boss is dead
     */
    deadEndbossAnimation() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
            world.win_sound.play();
        }, 3000 / 20)
    }

    /**
     * function to show endscreen and end the interval
     */
    gameOver() {
        setTimeout(() => {
            stopGame();
            document.getElementById('endScreen').style.display = '';
        }, 2050);
    }

    /**
     * check if endboss has been injured
     */
    EndbossHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_ENDBOSS_HURT);
            world.hurt_endboss_sound.play();
        }
    }

    distanceCharacterEndboss() {
        return this.x - this.world.character.x;
    }
}