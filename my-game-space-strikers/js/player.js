class Player {
    constructor() {
		this.width = 60;
		this.height = 50;
		this.x = (width - this.width) / 2; // set x in the middle of the canvas
		this.y = height - this.height;
        this.speed = 3;
        this.lasers = [];
        this.playerImage = null;
        this.score = 0;
	}

    preload () {
        this.lasers = new Laser;
    }

    draw () {
        // prevent player go outside of canvas
        if (this.y >= height - this.height) {
			this.y = height - this.height;
		}
        this.playerImage = image(game.playerImage[0], this.x, this.y, this.width, this.height);
        // draw all the laser in the array
        this.lasers.forEach(function (laser) {
            laser.draw();
        })
        game.gameOver();    
        
    }
    //movement of the player
    moveLeft () {
        this.x -= this.speed;
        // keep player inside the canvas
        if (this.x <= 0){
            this.x = 0;
        } 
        if (this.x >= width - this.width) {
            this.x = width - this.width
        }  
    }

    moveRight () {
        this.x += this.speed;
        if (this.x <= 0){
            this.x = 0;
        } 
        if (this.x >= width - this.width) {
            this.x = width - this.width
        }  
    }   
    moveUp () {
        this.y -= this.speed;
        if (this.y <= 0){
            this.y = 0;
        } 
        if (this.y >= height - this.height) {
            this.y = height - this.height
        } 
    }
    moveDown () {
        this.y += this.speed;
        if (this.y <= 0){
            this.y = 0;
        } 
        if (this.y >= height - this.height) {
            this.y = height - this.height
        } 
    }

    fierLaser () {
        // have to preload all the image before draw!!
        //add new laser when space bar pushed down
       
            if (this.lasers.length <= 5) {
                this.lasers.push(new Laser(this.x + (this.width - 9)/ 2, this.y - 37));
                this.lasers.forEach((laser) => {
                    laser.draw();
                    laserSound.setVolume(0.3);
                    laserSound.play();
                    
                })
            }
        // remove laser outside of the screen
        this.lasers = this.lasers.filter((laser) => {
			if (laser.y < 0) {
				return false
			} else { 
				return true
			}
        })
    
    }

    collision (enemyInfo){
        let playerX = this.x + this.width / 2;
        let playerY = this.y + this.height / 2;

        let enemyX = enemyInfo.x + enemyInfo.width / 2;
        let enemyY = enemyInfo.y - enemyInfo.height / 2;
       
        if (dist(playerX, playerY, enemyX, enemyY) > 50) {
			return false
		} else {
			// here we have a collision
            playerDiedSound.play()
			return true;
		}
    }
}