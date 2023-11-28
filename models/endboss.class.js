class Endboss extends MovableObject {
    y = 50;
    height = 400;
    width = 300;
    hadFirstContact = false;
    energy = 80;

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

    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_WALKING[0]);
        this.x = 2000 + Math.random() * 500;
        this.speed = 1 + Math.random() * 0.25;
        this.loadAllImages();
        this.animate();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
    }

    animate() {
        this.EndbossAnimate();
    }

    EndbossAnimate() {
        setStoppableInterval(() => {
            this.EndbossMoveLeft();
            this.EndbossDead();
            this.EndbossHurt();
        }, 1000 / 10);
    }

    EndbossMoveLeft() {
        this.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
    }

    EndbossDead() {
        if (this.isDead()) {
            setStoppableInterval(() => {
                this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
            }, 1000 / 60)
            setTimeout(() => {
                stopGame();
                document.getElementById('endScreen').style.display = '';
            }, 6000 / 60);
        }
    }

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