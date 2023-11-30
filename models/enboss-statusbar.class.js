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
        let percent = this.character.energy / this.percentage;
        this.setpercentTage(percent);
    }

    setpercentTage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSSTATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}