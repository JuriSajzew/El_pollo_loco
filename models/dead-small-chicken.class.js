class DeadSmallChicken extends MovableObject {
    height = 90;
    width = 90;

    constructor(x, y) {
        super().loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.x = x;
        this.y = y;
    }
}