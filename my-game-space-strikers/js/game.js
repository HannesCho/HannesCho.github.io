let gameStart = false;
let gamePause = false;
let gameOver = false;


class Game {

    constructor () {
        this.backgroundImages = [];
        this.playerImage = [];
        this.enemyImage = [];
        this.enemydestroyedImage = [];
        this.enemies = [];
        this.laserImages = [];
        this.lasers = [];
    }

    setup () {
        this.background = new Background;
        this.player = new Player;
    }

    preload () {
        //preload all the images
        this.backgroundImages = [
        {src : loadImage('../assets/backgrounds/background-1.png'), y: 0, speed: 1}
        ];
        this.playerImage = [loadImage('../assets/player/playerShip1_blue.png'),
                            loadImage('../assets/player/image43.png'),
                            loadImage('../assets/player/image44.png'),
                            loadImage('../assets/player/image45.png'),
                            loadImage('../assets/player/image46.png'),
                            loadImage('../assets/player/image47.png'),
        ];
        this.enemyImage =[
            {src : loadImage('../assets/enemies/enemyBlack1.png'),
            level:1},
            {src : loadImage('../assets/enemies/enemyBlue2.png'),
            level:2},
            {src : loadImage('../assets/enemies/enemyGreen3.png'),
            level:3},
            {src : loadImage('../assets/enemies/enemyRed4.png'),
            level:4},
        ];
        this.enemydestroyedImage = [
            {src : loadImage('../assets/enemies/image96.png')},
            {src : loadImage('../assets/enemies/image99.png')},
            {src : loadImage('../assets/enemies/image100.png')},
        ];

        this.laserImages = [
            {src : loadImage('../assets/laser/laserBlue03.png')}
        ];
    }

    draw() {
        this.background.draw()
        this.player.draw()

        this.drawenemies()        
        this.enemies.forEach((enemy) => {
            enemy.draw();
        })
        //enemy will disappear when it reaches to the bottom
        this.enemies = this.enemies.filter((enemy) => {
            if (enemy.y > height + enemy.height) {
                return false
            } else {
                return true
            }
        })

        // when missile hit the enemy both will disappear
        this.player.lasers.forEach((laser) => {
            this.enemies.forEach((enemy) => {
                if (enemy.destroyed(laser) === true) {
                    this.player.score += 10
                    document.querySelector('.score').innerText = this.player.score;
                    this.enemies = this.enemies.filter((el) => {
                        return el != enemy
                    })
                    this.player.lasers = this.player.lasers.filter((el) => {
                        return el != laser
                    })
                }
            })
        })
        
        
    }

    drawenemies () { // add more enemies
        if (frameCount % 200 === 0) {
            this.enemies.push(new Enemy(this.enemyImage[0].src, this.enemyImage[0].level))
        }
        if (frameCount > 500) {
            if (frameCount % 360 === 0) {
                this.enemies.push(new Enemy(this.enemyImage[1].src, this.enemyImage[1].level))
            }
        }
        if (frameCount > 1000) {
            if (frameCount % 470 === 0) {
            this.enemies.push(new Enemy(this.enemyImage[2].src, this.enemyImage[2].level))
            }
        }
        if (frameCount > 2000) {
            if (frameCount % 580 === 0) {
            this.enemies.push(new Enemy(this.enemyImage[3].src, this.enemyImage[3].level))
            }
        }
        if (frameCount > 4000) {
            if (frameCount % 100 === 0) {
                this.enemies.push(new Enemy(this.enemyImage[0].src, this.enemyImage[0].level))
            if (frameCount % 110 === 0){
                this.enemies.push(new Enemy(this.enemyImage[1].src, this.enemyImage[1].level))
            }   
            if (frameCount % 150 === 0) {
                this.enemies.push(new Enemy(this.enemyImage[2].src, this.enemyImage[2].level))
            } 
            if (frameCount % 200 === 0) {
                this.enemies.push(new Enemy(this.enemyImage[3].src, this.enemyImage[3].level))
            }
        }
    }
}

    gameStart () {
        document.querySelector('.pause-btn').innerText = 'Pause'
        startBtn.mousePressed(game.gamePause);
        startMusic.stop();
        document.querySelector('#title').style.visibility = 'hidden'; 
        startSound.play()
        setTimeout(function(){game.backgroundMusic()}, 2000)
        return gameStart = true;
    }

    backgroundMusic() {
        backgroundMusic.setVolume(0.3);
        backgroundMusic.play();
        backgroundMusic.loop();
    }

    gamePause () {
        gamePause = !gamePause;
        if (!gameOver){
            if (gamePause) {
                document.querySelector('.pause-btn').innerText = 'Continue'
                noLoop();
                backgroundMusic.stop();
            } else {
                document.querySelector('.pause-btn').innerText = 'Pause'
                loop();
                backgroundMusic.play()
            }
        } 
    }

    gameRestart () {
        location.reload();
    }

    gameOver () {
        this.enemies.forEach((enemy) => {
            if (this.player.collision(enemy) === true) {
                this.enemies = this.enemies.filter((el) => {
                    return el != enemy
                })
                this.player.playerImage = this.playerImage[1]
                gameStart = false; 
                return gameOver = true
            } 
        })
    }
}