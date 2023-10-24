class Level {
    enemies;
    clouds;
    backgroundObjects;
    chicken_small;
    level_end_x = 2250;
    constructor(enemies, clouds, backgroundObjects, chicken_small) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.chicken_small = chicken_small;
    }
}