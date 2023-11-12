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
    world;
    speed = 5;
    idleTimeout = 0;
    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    }

    walking_sound = new Audio('audio/running.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
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
    }

    characterMove() {
        setStoppableInterval(() => {
            this.walking_sound.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.walkingCharacter();
            this.characterJump();
            this.characterDead();
            this.characterHurt();
            //this.characterIdle();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 30);
    }


    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walking_sound.play();
            this.otherDirection = false;
        }
    }

    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.walking_sound.play();
            this.otherDirection = true;
        }
    }

    characterJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.jumping();
        }
    }

    characterIdle() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idleTimeout += 150;
            console.log(this.idleTimeout);
            if (this.idleTimeout >= 5000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        }
    }

    walkingCharacter() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    characterDead() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD)
        }
    }

    characterHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    jumping() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    };


    jump() {
        this.speedY = 30;
    }
}