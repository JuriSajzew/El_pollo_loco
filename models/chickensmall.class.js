class Chickensmall extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    height = 70;
    width = 50;
    y = 360;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 850 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * start the animation to run the smallChickens
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

    }
}