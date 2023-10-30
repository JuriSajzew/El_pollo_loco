class BottleObject extends DrawableObject {
    y = 350;
    height = 50;
    width = 50;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);


        this.x = 200 + Math.random() * 2000;

    }


}