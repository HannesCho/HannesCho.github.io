class Enemy {
    constructor(enemyImage, level, life) {
        this.width = 50;
        this.height = 50;
        this.x = Math.floor((Math.random() * (width - this.width)));
        this.y = 0;
        this.speed = 1;
        this.enemyImage = enemyImage;
        this.level = level;
        this.life = life;
    }

    draw () {
        if (this.level ===1) {
            this.y += this.level
        image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 2){
            this.y += this.level
            this.x += 1
            image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 3) {
            this.y += this.level
            image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 4) {
            this.y += this.level
            this.x -= 2
            image(this.enemyImage, this.x, this.y - this.height, this.width, this.height)
        }
        if (this.level === 5) {
            this.x = 195
            if (this.y < 150) {
                this.y += 1;
            }
            image(this.enemyImage, this.x, this.y - 105, 210, 210)
        }
       
    }

    destroyed (laserInfo) {
        //get distance btw laser and enemy
        let laserX = laserInfo.x + laserInfo.width / 2;
        let laserY = laserInfo.y + laserInfo.height / 2;

        let enemyX = this.x + this.width / 2;
        let enemyY = this.y - this.height / 2;

        if (this.level <= 4) {
            if (dist(laserX, laserY, enemyX, enemyY) > 25) {
                return 1
            } else {
                // here we have a collision
                if (this.life > 0) {
                    this.life -= 1;
                    destroyedSound.play()
                    image(game.enemydestroyedImage[3].src, enemyX-2, this.y-this.height)
                    image(game.enemydestroyedImage[4].src, enemyX-2, this.y-this.height)
                    return 2
                } 
                if (this.life === 0) {
                destroyedSound.play()
                image(game.enemydestroyedImage[2].src, enemyX-2, this.y-this.height)
                image(game.enemydestroyedImage[1].src, enemyX-10, this.y-this.height)
                image(game.enemydestroyedImage[0].src, this.x, this.y-this.height)
                return 3
                }
            }
        } else {
            if (dist(laserX, laserY, enemyX, enemyY) > 105) {
                return 1
            } else {
                // here we have a collision
                if (this.life > 0) {
                    destroyedSound.play()
                    this.life -= 1;
                    image(game.enemydestroyedImage[5].src, laserInfo.x, laserInfo.y, 50)
                    image(game.enemydestroyedImage[6].src, laserInfo.x, laserInfo.y, 50)
                    return 2
                } 
                if (this.life === 0) {
                destroyedSound.play()
                image(game.enemydestroyedImage[7].src, enemyX, enemyY)
                image(game.enemydestroyedImage[8].src, enemyX, enemyY)
                image(game.enemydestroyedImage[9].src, enemyX, enemyY)
                image(game.enemydestroyedImage[10].src, enemyX, enemyY)
                image(game.enemydestroyedImage[10].src, enemyX, enemyY)
                image(game.enemydestroyedImage[10].src, enemyX, enemyY)
                return 4
                }
            }
        }
    }

} 