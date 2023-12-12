class ThrowableObject extends MovableObject {

    IMAGE_FLIGHTBOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGE_SPLASHBOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    }

    speedY = 30;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadAllImages();
        this.height = 60;
        this.width = 40;
        this.x = x;
        this.y = y;
        this.animate();
    }


    loadAllImages() {
        this.loadImages(this.IMAGE_FLIGHTBOTTLE);
        this.loadImages(this.IMAGE_SPLASHBOTTLE);
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGE_FLIGHTBOTTLE);
            if (world.level.endboss[0].throwBottleEndboss || !this.isAboveGround()) {
                this.speed = 0;
                this.playAnimation(this.IMAGE_SPLASHBOTTLE);
            }
        }, 50);
    }

    throw() {
        this.applyGravity();
        if (!world.bottleThrow) {
            setStoppableInterval(() => {
                if (this.speed == 0) {
                    this.x += 0;
                } else {
                    this.x += 10;
                }
            }, 1000 / 25);
        }
    }
}
