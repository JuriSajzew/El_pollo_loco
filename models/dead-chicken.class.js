class DeadChicken extends MovableObject {
    height = 30;
    width = 50;

    constructor(x, y) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead');
        this.posX = x;
        this.posY = y;
    }


}