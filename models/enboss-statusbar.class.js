class EndbossStatusBar extends DrawableObject {
    IMAGES_ENDBOSSSTATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 80;

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSSTATUSBAR);
        this.x = 30;
        this.y = 130;
        this.width = 180;
        this.height = 50;
        this.setpercentTage(100);
    }

    percent() {
        let percent = this.EndBoss.energy / this.percentage;
        this.setpercentTage(percent);
    }

    setpercentTage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSSTATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}