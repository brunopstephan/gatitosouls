const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//images
let spritesheet = new Image();
spritesheet.src = './resources/img/spritesheet.png';

let bonfire = new Image();
bonfire.src = './resources/img/bonfire.gif';

let grass = new Image();
grass.src = './resources/img/grass.png';

//audio
let shoot = new Audio();
shoot.src = "./resources/audio/shoot2.wav"

let enemydie = new Audio();
enemydie.src = "./resources/audio/enemydie1.wav"

let moreseconds = new Audio();
moreseconds.src = "./resources/audio/moreseconds.wav"

let buystats = new Audio();
buystats.src = "./resources/audio/buystats.wav"

let pagechange = new Audio();
pagechange.src = "./resources/audio/pagechange.wav"

shoots = [];
enemies = [];

var enemyid = 0;
var enemiesNum = 5;
var enemiesNumAdd = 0;
spawnMoreEnemies = false;

var initialSeconds = 15;
var seconds = initialSeconds;
var timerverify = false;
var moreSeconds = false;
var playerLeft = false;
var gameOver = false;

var start = false;

var canShoot = false;

var round = 0;

var upgrade = false;
var speedCost = 20;
var powerCost = 50;
var secondsCost = 450;
var speedLvl = 0;
var powerLvl = 0;
var secondsLevel = 0;

var enemyLife = 10;
var enemyReward = 1;

class Player {
    constructor({ position }, image, spritex, spritey, spritew, spriteh, power, speed, coins) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.power = power;
        this.speed = speed;
        this.width = 64;
        this.height = 64;
        this.spritex = spritex;
        this.spritey = spritey;
        this.spritew = spritew;
        this.spriteh = spriteh;
        this.image = image;
        this.coins = coins;
    }

    draw() {
        c.drawImage(this.image, this.spritex, this.spritey, this.spritew, this.spriteh, this.position.x - this.width, this.position.y - this.height, this.width, this.height);
        //c.fillStyle = "black";
        //c.fillRect(this.position.x - this.width, this.position.y - this.height, this.width, this.height);
    }


    update() {
        this.draw();
        if (this.position.y + this.velocity.y - this.height > 0 && this.position.y + this.velocity.y - this.height < HEIGHT - this.height && this.position.x + this.velocity.x - this.width > 0 && this.position.x + this.velocity.x < WIDTH) {
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
        }

    }

    reset() {
        this.position.x = WIDTH / 2;
        this.position.y = HEIGHT;
    }
}

class Shoot {
    constructor({ position }, image, spritex, spritey, spritew, spriteh, audio) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 32;
        this.height = 32;
        this.audio = audio;
        this.shooted = false;
        this.spritex = spritex;
        this.spritey = spritey;
        this.spritew = spritew;
        this.spriteh = spriteh;
        this.image = image;
    };

    draw() {
        c.drawImage(this.image, this.spritex, this.spritey, this.spritew, this.spriteh, this.position.x - this.width, this.position.y - this.height, this.width, this.height);
        //c.fillStyle = "black";
        //c.fillRect(this.position.x - this.width, this.position.y - this.height, this.width, this.height);
    }

    shoot() {
        this.draw();
        this.position.y -= 13;
    }

}

class Enemy {
    constructor({ position }, id, image, spritex, spritey, spritew, spriteh, audio, life, reward) {
        this.position = position;
        this.width = 44;
        this.height = 64;
        this.id = id;
        this.audio = audio;
        this.spritex = spritex;
        this.spritey = spritey;
        this.spritew = spritew;
        this.spriteh = spriteh;
        this.image = image;
        this.life = life;
        this.reward = reward;
    }

    draw() {
        c.drawImage(this.image, this.spritex, this.spritey, this.spritew, this.spriteh, this.position.x - this.width, this.position.y - this.height, this.width, this.height);
        //c.fillStyle = "red";
        //c.fillRect(this.position.x - this.width, this.position.y - this.height, this.width, this.height);
    }

    die() {
        for (let i = 0; i < shoots.length; i++) {
            if (shoots[i].position.y + shoots[i].velocity.y < this.position.y && shoots[i].position.y + shoots[i].velocity.y > this.position.y - this.height && shoots[i].position.x - shoots[i].width < this.position.x && shoots[i].position.x > this.position.x - this.width) {
                this.life -= player.power;
                shoots.splice(i, 1);
                if (this.life <= 0) {
                    enemies.splice(this.id, 1);
                    enemyid--;
                    enemiesNum--;
                    this.audio.pause();
                    this.audio.currentTime = 0;
                    this.audio.play();
                    moreSeconds = false;
                    player.coins += this.reward;
                    for (let i = 0; i < enemies.length; i++) {
                        if (enemies[i].id > this.id) {
                            enemies[i].id--;
                        }
                    }
                }
            }
        }
    }
}

//player
const player = new Player({
    position: {
        x: WIDTH / 2,
        y: HEIGHT
    }
}, spritesheet, 64, 1, 64, 64, 10, 6, 0);

const enemyexample = new Enemy({
    position: {
        x: 0,
        y: 0
    }
}, 0, 0, 260, 1, 50, 50, 0);



function spawnEnemy() {
    posx = (Math.random() * 1000);
    posy = (Math.random() * 1000);
    if (posy - enemyexample.height < HEIGHT - 300 && posy - enemyexample.height > 0 && posx < WIDTH && posx - enemyexample.width > 0) {
        enemies.push(new Enemy({
            position: {
                x: posx,
                y: posy
            }
        }, enemyid, spritesheet, 232, 1, 50, 64, enemydie, enemyLife, enemyReward));
        enemyid++;
    }
}


function timer() {
    seconds--;
    if (seconds < 1) {
        clearInterval(cron);
        seconds = initialSeconds;
        timerverify = false;
        //start = false;
        shoots = [];
        enemyLife = 10;
        player.velocity.y = 0;
        player.velocity.x = 0;
        enemyReward = 1;    
        gameOver = true;
        //player.reset();
    }
}

function timerTrigger() {
    if (!timerverify) {
        timerverify = true;
        cron = setInterval(timer, 1000);
    }
}

function animate() {
    requestAnimationFrame(animate)
    //c.fillStyle = 'white';
    //c.fillRect(0, 0, WIDTH, HEIGHT); 

    c.drawImage(grass, 0, 0, 700, 700);

    c.fillStyle = "red";
    c.font = "40px font";
    c.fillText(seconds, 30, 50);

    c.fillStyle = "red";
    c.font = "40px font";
    c.fillText(round, WIDTH / 2, 50);

    c.fillStyle = "yellow";
    c.font = "40px font";
    c.fillText(player.coins, 600, 50);



    if (start) {
        if (enemies.length >= enemiesNum) {
            spawnMoreEnemies = true;
        }

        if (enemiesNum == 0) {
            spawnMoreEnemies = false;
            round++;
            if (round % 5 == 0) {
                enemiesNumAdd += 2;
            }
            if (round % 10 == 0) {
                moreSeconds = true;
                moreseconds.pause();
                moreseconds.currentTime = 0;
                moreseconds.play();
                seconds += 10;
                enemyLife += 10;
                enemyReward += 1;
            }
            enemiesNum = 5 + enemiesNumAdd;
            seconds += 3;
        }
        if (moreSeconds) {
            c.fillStyle = "black";
            c.font = "40px font";
            c.fillText("+10 seconds!", WIDTH / 3, HEIGHT / 3);
        }

        if (!spawnMoreEnemies) {
            spawnEnemy();
        }



        //entities
        for (let i = 0; i < shoots.length; i++) {

            if (!shoots[i].shooted) {
                shoots[i].shooted = true;
                shoots[i].audio.pause();
                shoots[i].audio.currentTime = 0;
                shoots[i].audio.play();
            }

            shoots[i].shoot();
        }

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].draw();
        }

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].die();
        }

        player.update();

    }


    if (upgrade) {
        c.fillStyle = "black";
        c.font = "50px font";
        c.fillText("Stats Upgrade.", WIDTH / 4, HEIGHT - 525);

        if (player.coins >= powerCost) {
            c.fillStyle = "black";
        } else {
            c.fillStyle = "red";
        }
        c.font = "30px font";
        c.fillText("1 - Power " + (powerLvl < 20 ? "$" + Math.floor(powerCost) : "") + " | LVL. " + (powerLvl < 20 ? powerLvl : "MAX") + " |", WIDTH / 3.6, HEIGHT - 405);

        if (player.coins >= speedCost) {
            c.fillStyle = "black";
        } else {
            c.fillStyle = "red";
        }
        c.font = "30px font";
        c.fillText("2 - Speed " + (speedLvl < 10 ? "$" + Math.floor(speedCost) : "") + " | LVL. " + (speedLvl < 10 ? speedLvl : "MAX") + " |", WIDTH / 3.6, HEIGHT - 335);

        if (player.coins >= secondsCost) {
            c.fillStyle = "black";
        } else {
            c.fillStyle = "red";
        }
        c.font = "30px font";
        c.fillText("3 - +15 Seconds " + (secondsLevel < 1 ? "$" + Math.floor(secondsCost) : "") + " | LVL. " + (secondsLevel < 1 ? secondsLevel : "MAX") + " |", WIDTH / 4.7, HEIGHT - 265);

        c.fillStyle = "black";
        c.font = "30px font";
        c.fillText("Press 'J' to start | 'Esc' to menu.", WIDTH / 5.7, HEIGHT - 125);
    }

    if (gameOver) {
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(0, 0, WIDTH, HEIGHT);
        c.fillStyle = "red";
        c.font = "60px font";
        c.fillText("GAME OVER", WIDTH / 4, 320);
        c.font = "40px font";
        c.fillText("Press 'Enter' to back menu", WIDTH / 7.5, 400);

    }

    if (!start && !upgrade) {

        c.fillStyle = "black";
        c.font = "50px font";
        c.fillText("Gatito Souls", WIDTH / 3.2, HEIGHT / 2.6);


        c.fillStyle = "black";
        c.font = "30px font";
        c.fillText("Press 'K' to stats upgrade.", WIDTH / 4, HEIGHT - 300);

        c.fillStyle = "black";
        c.font = "30px font";
        c.fillText("Press 'J' to start.", WIDTH / 3, HEIGHT - 230);
    }
}

animate();