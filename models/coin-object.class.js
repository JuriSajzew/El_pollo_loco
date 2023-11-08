class CoinObjekt extends MovableObject {
    width = 150;
    height = 150;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 100 + Math.random() * 2000;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400)
    }
}