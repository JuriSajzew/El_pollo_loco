class World {
    level = level1;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    isDeadChicken = false;
    camera_x = 0;
    /**
     * StatusBars
     */
    StatusBarHealth = new StatusBarHealth();
    StatusBarBottle = new BottleStatusBar();
    StatusBarCoin = new CoinStatusBar();
    StatusBarEndboss = new EndbossStatusBar();
    /**
     * Audio Game
     */
    deadChickenSound = new Audio('audio/chicken_dead.mp3');
    coin_sound = new Audio('audio/coin_sound.mp3');
    bottle_sound = new Audio('audio/bottle_sound.mp3');
    hurt_character_sound = new Audio('audio/hurt_character.mp3');
    background_sound = new Audio('audio/background_sound.mp3');
    hurt_endboss_sound = new Audio('audio/endboss_sound.mp3');

    /**
     * leere Arrays
     */
    throwableobjects = [];
    canThrowBottle = true;
    coinObject = [];
    deadEnemy = [];
    jumpingOfChicken = [];


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
        setStoppableInterval(() => {
            this.checkCollisionsCharacterBottle();
            this.checkCollisionsCharacterCoin();
            this.checkCollisionsObject();
            this.checkThrowObject();
            this.checkCollisionsBottleEndboss();
        }, 200);
    }

    checkThrowObject() {
        if (this.keyboard.D && this.character.bottle > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableobjects.push(bottle);
            this.character.throwBottle();
            this.StatusBarBottle.setpercentTage(this.character.bottle);
            if (this.character.bottle === 0) {
                this.canThrowBottle = false;
            }
        }
    }

    checkCollisionsCharacterBottle() {
        this.level.bottles.forEach((BottleObject, indexOfbottle) => {
            if (this.character.isColliding(BottleObject)) {
                this.bottle_sound.play();
                this.level.bottles.splice(indexOfbottle, 1);
                this.character.collectBottle();
                this.StatusBarBottle.setpercentTage(this.character.bottle);
            }
        }, 10);
    }

    checkCollisionsObject() {
        if (this.character.jumpingOfChicken === true) {
            this.checkCollisionsChicken();
        } else {
            this.checkCollisions();
            this.checkCollisionsEndboss();
        }
    }

    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy, indexOfEnemies) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround && this.character.speedY < 0) {
                this.checkKindOfEnemy(enemy, indexOfEnemies);
                setTimeout(() => {
                    this.deadEnemy.splice(this.enemy);
                    this.character.jumpingOfChicken = false;
                }, 500);
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.hurt_character_sound.play();
                this.character.hit();
                this.StatusBarHealth.setpercentTage(this.character.energy);
            };
        });
    }

    checkCollisionsBottleEndboss() {
        this.throwableobjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    endboss.hit();
                    this.StatusBarEndboss.setpercentTage(endboss.energy);
                }
            })
        })
    }

    checkCollisionsEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.hurt_character_sound.play();
                this.character.hitEndboss();
                this.StatusBarHealth.setpercentTage(this.character.energy);
            };
        });
    }

    checkKindOfEnemy(enemy, indexOfEnemies) {
        let deadEnemy;
        if (enemy instanceof Chicken) {
            deadEnemy = new DeadChicken();
            this.deadChickenSound.play();
        } else {
            deadEnemy = new DeadSmallChicken();
            this.deadChickenSound.play();
        }
        this.deadEnemy.push(deadEnemy);
        this.level.enemies.splice(indexOfEnemies, 1);
    }

    checkCollisionsCharacterCoin() {
        this.level.coins.forEach((CoinObjekt, indexOfcoins) => {
            if (this.character.isColliding(CoinObjekt)) {
                this.coin_sound.play();
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
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.StatusBarHealth);
        this.addToMap(this.StatusBarBottle);
        this.addToMap(this.StatusBarCoin);
        this.addToMap(this.StatusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.endboss);
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

    mute() {
        this.deadChickenSound.muted = true;
        this.bottle_sound.muted = true;
        this.coin_sound.muted = true;
        this.hurt_character_sound.muted = true;
        this.character.walking_sound.muted = true;
        this.hurt_endboss_sound.muted = true;
        this.background_sound.muted = true;
    }

    unmute() {
        this.deadChickenSound.muted = false;
        this.bottle_sound.muted = false;
        this.coin_sound.muted = false;
        this.hurt_character_sound.mute = false;
        this.character.walking_sound.muted = false;
        this.hurt_endboss_sound.muted = false;
        this.background_sound.muted = false;
    }
}