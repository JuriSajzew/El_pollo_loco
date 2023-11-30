class DeadChicken extends MovableObject {
    height = 250;
    width = 250;

    constructor(x, y) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead');
        this.x = x;
        this.y = y;
    }
}