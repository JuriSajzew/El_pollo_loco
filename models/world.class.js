class World {
    level = level1;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    isDeadChicken = false;
    camera_x = 0;

    StatusBarHealth = new StatusBarHealth();
    StatusBarBottle = new BottleStatusBar();
    StatusBarCoin = new CoinStatusBar();
    StatusBarEndboss = new EndbossStatusBar();

    deadChickenSound = new Audio('audio/chicken_dead.mp3');
    coin_sound = new Audio('audio/coin_sound.mp3');
    bottle_sound = new Audio('audio/bottle_sound.mp3');
    hurt_character_sound = new Audio('audio/hurt_character.mp3');
    background_sound = new Audio('audio/background_sound.mp3');
    hurt_endboss_sound = new Audio('audio/endboss_sound.mp3');
    win_sound = new Audio('audio/win.mp3');

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
    /**
     * Different intervals that are called
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisionsObject();
        }, 1000 / 60);
        setStoppableInterval(() => {
            this.checkThrowObject();
            this.checkCollisions();
        }, 200);
    }
    /**
     * Check whether the 'D' button has been pressed and whether the character has collected bottles
     * if Character has not collected any bottles then the 'D' button is not executed
     */
    checkThrowObject() {
        if (this.keyboard.D && this.character.bottle > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableobjects.push(bottle);
            this.character.throwBottle();
            this.character. handleKeyPress();
            this.StatusBarBottle.setpercentTage(this.character.bottle);
            if (this.character.bottle === 0) {
                this.canThrowBottle = false;
            }
        }
    }
    /**
     * if jumpingOfChicken = true then the following function is executed, otherwise it is skipped
     */
    checkCollisionsObject() {
        if (this.character.jumpingOfChicken === true) {
            this.checkCollisionsJumpOfChicken();
        }
    }
    /**
     * Check whether the collision with chicken has taken place from above
     */
    checkCollisionsJumpOfChicken() {
        this.level.enemies.forEach((enemy, indexOfEnemies) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.character.jumpingOfChicken = true;
                this.checkJumpOfEnemy(enemy, indexOfEnemies);
                setTimeout(() => {
                    this.deadEnemy.splice(this.enemy);
                    this.character.jumpingOfChicken = false;
                }, 100);
            }
        })
    }
    /**
     * 
     */
    checkJumpOfEnemy(enemy, indexOfEnemies) {
        let deadEnemy;
        if (enemy instanceof Chicken) {
            deadEnemy = new DeadChicken(enemy.x, enemy.y);
            this.deadChickenSound.play();
        } else {
            deadEnemy = new DeadSmallChicken(enemy.x, enemy.y);
            this.deadChickenSound.play();
        }
        this.deadEnemy.push(deadEnemy);
        this.level.enemies.splice(indexOfEnemies, 1);
    }
    /**
     * main function that executes the individual functions
     */
    checkCollisions() {
        this.checkCollisionsEndboss();
        this.checkCollisionsBottleEndboss();
        this.checkCollisionsBottleChicken();
        this.checkCollisionsCharacterBottle();
        this.checkCollisionsCharacterCoin();
        this.checkCollisionsChicken();
    }
    /**
     * Check whether the character has collided with Endboss
     */
    checkCollisionsEndboss() {
        setTimeout(() => {
            this.level.endboss.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.hurt_character_sound.play();
                    this.character.hit();
                    this.StatusBarHealth.setpercentTage(this.character.energy);
                };
            });
        }, 200);
    }
    /**
     * Check whether the bottle has hit the enboss
     */
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

    /**
     * if a chicken is hit with a bottle then the chicken disappears
     */
    checkCollisionsBottleChicken() {
        this.throwableobjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, indexOfEnemies) => {
                if (bottle.isColliding(enemy)) {
                    this.checkJumpOfEnemy(enemy, indexOfEnemies);
                }
            })
        })
    }
    /**
     * Check whether the character has collided with bottle
     */
    checkCollisionsCharacterBottle() {
        this.level.bottles.forEach((BottleObject, indexOfbottle) => {
            if (this.character.isColliding(BottleObject)) {
                this.bottle_sound.play();
                this.level.bottles.splice(indexOfbottle, 1);
                this.character.collectBottle();
                this.StatusBarBottle.setpercentTage(this.character.bottle);
            }
        });
    }
    /**
     * Check whether the character has collided with coins
     */
    checkCollisionsCharacterCoin() {
        this.level.coins.forEach((CoinObjekt, indexOfcoins) => {
            if (this.character.isColliding(CoinObjekt)) {
                this.coin_sound.play();
                this.coinObject.push(CoinObjekt);
                this.level.coins.splice(indexOfcoins, 1);
                this.character.collectCoin();
                this.StatusBarCoin.setpercentTage(this.character.coin);
            }
        })
    }
    /**
     * Check whether the character has collided with chicken
     */
    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.hurt_character_sound.play();
                this.character.hit();
                this.StatusBarHealth.setpercentTage(this.character.energy);
            };
        });
    }
    /**
     * function to display all objects in the game
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.loadObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.loadStatusBar();
        this.ctx.translate(this.camera_x, 0);
        this.moveObjects();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.selfFunction();
    }
    /**
     * loading the moving objects
     */
    loadObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
    }
    /**
     * load fixed objects
     */
    loadStatusBar() {
        this.addToMap(this.StatusBarHealth);
        this.addToMap(this.StatusBarBottle);
        this.addToMap(this.StatusBarCoin);
        this.addToMap(this.StatusBarEndboss);
    }
    /**
     * Display of moving objects 
     */
    moveObjects() {
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableobjects);
    }
    /**
     * 
     */
    selfFunction() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    /**
     * Display objects on the map
     */
    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }
    /**
     * Display objects on the map
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

    }
    /**
     * function when the object moves to the left
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    /**
     * function when the object moves to the left
     * @param {*} mo The value of the character is transferred here  
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    /**
     * Mute the sound
     */
    mute() {
        this.deadChickenSound.muted = true;
        this.bottle_sound.muted = true;
        this.coin_sound.muted = true;
        this.hurt_endboss_sound.muted = true;
        this.background_sound.muted = true;
        this.win_sound.muted = true;
        this.muteCharacterSound();
    }
    /**
     * Mute the sound from the character
     */
    muteCharacterSound() {
        this.character.snoring_charcter_sound.muted = true;
        this.character.game_over_sound.muted = true;
        this.character.jump_sound.muted = true;
        this.hurt_character_sound.muted = true;
        this.character.walking_sound.muted = true;
        this.character.walking_sound.muted = true;
    }
    /**
     * Activating the sound
     */
    unmute() {
        this.deadChickenSound.muted = false;
        this.bottle_sound.muted = false;
        this.coin_sound.muted = false;
        this.hurt_endboss_sound.muted = false;
        this.background_sound.muted = false;
        this.win_sound.muted = false;
        this.unmuteCharacterSound();
    }
    /**
     * Activating the sound the character
     */
    unmuteCharacterSound() {
        this.character.walking_sound.muted = false;
        this.character.snoring_charcter_sound.muted = false;
        this.character.game_over_sound.muted = false;
        this.character.jump_sound.muted = false;
        this.hurt_character_sound.muted = false;
    }
}