class Level {
    endboss;
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2250;


    /**
     * creation of all objects in the game
     */
    constructor(endboss, enemies, clouds, backgroundObjects, coins, bottles) {
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}