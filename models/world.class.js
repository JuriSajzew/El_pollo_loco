class World {
    level = level1;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    StatusBarHealth = new StatusBarHealth();
    StatusBarBottle = new BottleStatusBar();
    StatusBarCoin = new CoinStatusBar();
    throwableobjects = [];
    canThrowBottle = true;
    coinObject = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsCharacterBottle();
            this.checkCollisionsCharacterCoin();
            this.checkThrowObject();
        }, 200);
    }

    checkThrowObject() {
        if (this.keyboard.D && this.character.bottle > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableobjects.push(bottle);
            this.character.throwBottle();
            this.StatusBarBottle.setpercentTage(this.character.bottle);
            console.log(this.throwableobjects);

            if (this.character.bottle === 0) {
                this.canThrowBottle = false;
            }
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.StatusBarHealth.setpercentTage(this.character.energy);
            };
        });
    }

    checkCollisionsCharacterBottle() {
        this.level.bottles.forEach((BottleObject, indexOfbottle) => {
            if (this.character.isColliding(BottleObject)) {
                this.level.bottles.splice(indexOfbottle, 1);
                this.throwableobjects.push(BottleObject);
                this.character.collectBottle();
                this.StatusBarBottle.setpercentTage(this.character.bottle);
            }

        });
    }

    checkCollisionsCharacterCoin() {
        this.level.coins.forEach((CoinObjekt, indexOfcoins) => {
            if (this.character.isColliding(CoinObjekt)) {
                this.coinObject.push(CoinObjekt);
                this.level.coins.splice(indexOfcoins, 1);
                this.character.collectCoin();
                this.StatusBarCoin.setpercentTage(this.character.coin);
            }
        }, 20)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.StatusBarHealth);
        this.addToMap(this.StatusBarBottle);
        this.addToMap(this.StatusBarCoin);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableobjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}