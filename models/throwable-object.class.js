class ThrowableObject extends MovableObject {

    IMAGE_FLIGHTBOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_FLIGHTBOTTLE);
        this.height = 60;
        this.width = 40;
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setStoppableInterval(() => {
            this.x += 10;
        }, 25);

        setStoppableInterval(() => {
            this.playAnimation(this.IMAGE_FLIGHTBOTTLE);
        }, 125);
    }
}