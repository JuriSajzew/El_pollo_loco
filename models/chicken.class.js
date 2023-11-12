class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEADCHICKEN = [
        'img/3_enemies_chicken/chicken_normal/2_dead'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 600 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

    }

    
}