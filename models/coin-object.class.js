class CoinObjekt extends MovableObject {
    width = 150;
    height = 150;
    offset = {
        top: 50,
        bottom: 50,
        left: 55,
        right: 55
    }


    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 180 + Math.random() * 2000;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400)
    }
}