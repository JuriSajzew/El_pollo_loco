class DrawableObject {
    x = 190;
    y = 90;
    img;
    width = 100;
    height = 250;
    imageCache = {};
    currentImage = 0;

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chickensmall || this instanceof Endboss || this instanceof CoinObjekt || this instanceof ThrowableObject || this instanceof BottleObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, (this.x + this.width - this.offset.right) -
                (this.x + this.offset.left), (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
        if (this instanceof Character || this instanceof Chicken || this instanceof Chickensmall || this instanceof Endboss || this instanceof CoinObjekt || this instanceof ThrowableObject || this instanceof BottleObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Cloud not load image,', this.img.src);
        }
    }
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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