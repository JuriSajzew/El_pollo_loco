class BottleStatusBar extends DrawableObject {
    IMAGES_BOTTLESTATUSBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESTATUSBAR);
        this.x = 30;
        this.y = 90;
        this.width = 180;
        this.height = 50;
        this.setpercentTage(0);
    }

    percent() {
        let percent = this.character.bottle / this.percentage;
        this.setpercentTage(percent);
    }

    setpercentTage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLESTATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}