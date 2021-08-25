const game = new Game;
let backgroundMusic;
let startMusic;
let startSound;
let laserSound;
let destroyedSound;
let playerDiedSound;
let muteBtn;
let pauseBtn;
let startBtn;
let musicPlay = true;


function preload() {
    // all sounds are preload
    backgroundMusic = loadSound('../assets/sounds/POL-waving-grass-short.wav');
    laserSound = loadSound('../assets/sounds/laser1.ogg')
    destroyedSound = loadSound('../assets/sounds/destroyed.wav')
    playerDiedSound = loadSound('../assets/sounds/plyerdestroyed.wav')
    startMusic = loadSound('../assets/sounds/POL-air-sharks-short.wav')
    startSound = loadSound('../assets/sounds/engine_start_up_01.wav')
    game.preload()
}

function setup() {
    const canvas = createCanvas(600, 600)
    canvas.parent('canvas');
    game.setup()
    startMusic.setVolume(0.5);
    startMusic.play();
    startMusic.loop();
    // Btn setups
    muteBtn = createButton('Mute');
    muteBtn.parent('mute');
    muteBtn.mousePressed(muteBG).addClass('btn mute-btn');
    startBtn = createButton('Start');
    startBtn.parent('start-pause').addClass('btn pause-btn');
    startBtn.mousePressed(game.gameStart)
    pauseBtn = createButton('Restart').addClass('btn');
    pauseBtn.parent('restart');
    pauseBtn.mouseClicked(game.gameRestart);
}

function draw() {
    if (gameStart){
        setTimeout(function(){game.draw()}, 1000);
    // player move
        if (keyIsDown(37)) {
            game.player.moveLeft();
        }
        if (keyIsDown(38)) {
            game.player.moveUp();
        }
        if (keyIsDown(39)) {
            game.player.moveRight();
        }
        if (keyIsDown(40)) {
            game.player.moveDown();
        }
        if (frameCount % 25 === 0) {
            if (keyIsDown(32)) {
                    game.player.fierLaser();
            }
        }
    }   

    if (gameOver) {
        backgroundMusic.stop()
        clear()
        noLoop()
        let gameoverText = createDiv('Game Over');
        gameoverText.parent('container').id('gameover')
        
    }
}

function keyPressed() {
    if (gameStart) {
        if (keyCode === 32) {
        game.player.fierLaser()
        }
    }
}

function muteBG() {
    musicPlay = !musicPlay;
    if (gameStart) {
        if (musicPlay) {
            backgroundMusic.play();
            document.querySelector('.mute-btn').innerText = 'Mute'
        } else {
            
            backgroundMusic.stop();
            document.querySelector('.mute-btn').innerText = 'Unmute'
        }

    } else {
        if (musicPlay) {
            startMusic.play();
            document.querySelector('.mute-btn').innerText = 'Mute'
        } else {
            startMusic.stop();
            document.querySelector('.mute-btn').innerText = 'Unmute'
        }
    }
    
}