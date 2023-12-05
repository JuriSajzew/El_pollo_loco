class CoinStatusBar extends DrawableObject {
    IMAGES_COINSTATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSTATUSBAR);
        this.x = 30;
        this.y = 50;
        this.width = 180;
        this.height = 50;
        this.setpercentTage(0);
    }

    percent() {
        let percent = this.character.energy / this.percentage;
        this.setpercentTage(percent);
    }

    setpercentTage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINSTATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}