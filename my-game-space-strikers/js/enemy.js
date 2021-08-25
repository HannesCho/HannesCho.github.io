class Enemy {
    constructor(enemyImage, level) {
        this.width = 50;
        this.height = 50;
        this.x = Math.floor((Math.random() * (width - this.width)));
        this.y = 0;
        this.speed = 1;
        this.enemyImage = enemyImage;
        this.level = level;
    }

    draw () {
        if (this.level ===1) {
            this.y += this.level
        image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 2){
            this.y += this.level
            if (this.x > 300) {
                this.x -= 1
            }
            if (this.x < 300) {
                this.x += 1
            }
            image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 3) {
            this.y += this.level
            image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 4) {
            this.y += this.level
            if (this.x > 300) {
                this.x -= 2
            }
            if (this.x < 300) {
                this.x += 2
            }
            image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
       
    }

    destroyed (laserInfo) {
        //get distance btw laser and enemy
        let laserX = laserInfo.x + laserInfo.width / 2;
        let laserY = laserInfo.y + laserInfo.height / 2;

        let enemyX = this.x + this.width / 2;
        let enemyY = this.y - this.height / 2;
       
        if (dist(laserX, laserY, enemyX, enemyY) > 25) {
			return false
		} else {
			// here we have a collision
            destroyedSound.play()
            image(game.enemydestroyedImage[2].src, enemyX-2, this.y-this.height)
            image(game.enemydestroyedImage[1].src, enemyX-10, this.y-this.height)
            image(game.enemydestroyedImage[0].src, this.x, this.y-this.height)
			return true;
		}
    }

}