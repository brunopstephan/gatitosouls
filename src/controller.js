addEventListener("keydown", (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'k':
                if (!start) {
                    upgrade = true;
                }
                break;
            case 'j':
                timerTrigger();
                if (!start) {
                    killCounter = 0;
                    enemies = [];
                    enemiesNum = 5;
                    spawnMoreEnemies = false;
                    enemyid = 0;
                    round = 0;
                    enemiesNumAdd = 0;
                    upgrade = false;
                }
                start = true;
                break;
            case 'w':
                player.velocity.y = -player.speed;
                break;
            case 's':
                player.velocity.y = +player.speed;
                break;
            case 'a':
                player.velocity.x = -player.speed;
                player.spritex = 178;
                playerRight = false;
                playerLeft = true;
                break;
            case 'd':
                player.velocity.x = +player.speed;
                player.spritex = 94;
                playerRight = true;
                playerLeft = false;
                break;


            case 'K':
                if (!start) {
                    upgrade = true;
                }
                break;
            case 'J':
                timerTrigger();
                if (!start) {
                    killCounter = 0;
                    enemies = [];
                    enemiesNum = 5;
                    spawnMoreEnemies = false;
                    enemyid = 0;
                    round = 0;
                    enemiesNumAdd = 0;
                    upgrade = false;
                }
                start = true;
                break;
            case 'W':
                player.velocity.y = -player.speed;
                break;
            case 'S':
                player.velocity.y = +player.speed;
                break;
            case 'A':
                player.spritex = 178;
                playerLeft = true;
                player.velocity.x = -player.speed;
                break;
            case 'D':
                player.spritex = 94;
                playerLeft = false;
                player.velocity.x = +player.speed;
                break;
            case ' ':
                if (!canShoot) {
                    if (playerLeft) {
                        shoots.push(new Shoot({
                            position: {
                                x: player.position.x - player.width + 30,
                                y: player.position.y - (player.width / 2)
                            }
                        }, spritesheet, 262, 10, 32, 32, shoot));
                    } else {
                        shoots.push(new Shoot({
                            position: {
                                x: player.position.x,
                                y: player.position.y - (player.width / 2)
                            }
                        }, spritesheet, 262, 10, 32, 32, shoot));
                    }
                    canShoot = true;
                }
                break;

            case '1':
                if (upgrade) {
                    if (player.coins >= powerCost) {
                        if (powerLvl < 20) {
                            buystats.pause();
                            buystats.currentTime = 0;
                            buystats.play();
                            player.coins -= powerCost;
                            powerLvl++;
                            powerCost += 50;
                            player.power += 2.5;
                        }
                    }
                }
                break;

            case '2':
                if (upgrade) {
                    if (player.coins >= speedCost) {
                        if (speedLvl < 10) {
                            buystats.pause();
                            buystats.currentTime = 0;
                            buystats.play();
                            player.coins -= speedCost;
                            speedLvl++;
                            speedCost += 30;
                            player.speed += 0.4;
                        }
                    }
                }
                break;

            case '3':
                if (upgrade) {
                    if (player.coins >= secondsCost) {
                        if (secondsLevel < 1) {
                            buystats.pause();
                            buystats.currentTime = 0;
                            buystats.play();
                            player.coins -= secondsCost;
                            secondsLevel++;
                            initialSeconds += 15;
                            seconds += 15;
                        }
                    }
                }
                break;

            case 'Escape':
                upgrade = false;
                break;

        }
    } else {
        switch (e.key) {
            case 'Enter':
                player.reset();
                gameOver = false;
                start = false;
                break;
        }
    }
})


addEventListener("keyup", (e) => {
    if (!gameOver) {


        switch (e.key) {
            case 'w':
                player.velocity.y = 0;
                break;
            case 's':
                player.velocity.y = 0;
                break;
            case 'a':
                player.velocity.x = 0;
                break;
            case 'd':
                player.velocity.x = 0;
                break;
            case 'W':
                player.velocity.y = 0;
                break;
            case 'S':
                player.velocity.y = 0;
                break;
            case 'A':
                player.velocity.x = 0;
                break;
            case 'D':
                player.velocity.x = 0;
                break;
            case ' ':
                canShoot = false;
                break;
        }
    }
})
