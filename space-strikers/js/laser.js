class Laser {
    constructor(x, y) {
        this.speed = 6;
        this.power = 1;
        this.x = x;
        this.y = y;
        this.width = 9;
        this.height = 37;
    }

    draw() {
        this.y -= this.speed;
        image(game.laserImages[0].src, this.x, this.y)
    }

}
