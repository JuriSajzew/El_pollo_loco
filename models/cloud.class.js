class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 300;

    IMAGES_CLOUD = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png',
    ];

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUD);

        this.x = 50 + Math.random() * 500;
        this.x = 150 + Math.random() * 1000;
        this.x = 250 + Math.random() * 1500;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}
