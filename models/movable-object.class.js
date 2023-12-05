class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coin = 0;
    bottle = 0;
    chickenIsDead = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * function to check whether objects such as bottles are loaded on the floor
     * check whether character is on the ground or in the air
     * @returns check whether character is on the ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * direction of movement of the objects
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * direction of movement of the objects
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Check whether objects have collided with each other
     * @param {*} mo 
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * if the character collides with a chicken or end boss, his life is reduced.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Collecting objects like bottle
     */
    collectBottle() {
        this.bottle += 20;
    }

    /**
     * if the endboss is hit with a bottle, its life is reduced and displayed in the statusbar
     */
    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * if the bottle hits the opponent, his life is reduced
     */
    throwBottle() {
        this.bottle -= 20;
        if (this.bottle < 0) {
            this.bottle = 0;
        }
    }

    /**
     * here you can check when the last collision
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
    /**
     * Collecting objects like coins
     */
    collectCoin() {
        this.coin += 20;
    }
    /**
     * Checking whether the objects are dead
     */
    isDead() {
        return this.energy === 0;
    }


}