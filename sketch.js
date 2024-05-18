let player;

//Game object sets
const zombies = new Set();
const bullets = new Set();
const walls = new Set();
const exits = new Set();

let gun;
let key;
let medkit;

let gui;

let npc;

let npcDialogue = []

//Background images
let imgRoom1;
let imgRoom2;
let imgRoom3;
let imgRoom4;
let imgRoom5;
let imgRoom6;
let imgRoom7;
let imgRoom8;
let imgRoom9;
let imgRoom10;
let imgRoom11;
let imgRoom12;
let imgRoom13;
let imgRoom14;
let imgRoom15;
let imgRoom16;
let imgRoom17;
let imgRoom18;
let imgTitleScreen;
let imgDeathScreen;
let imgEndScreen;

//Sounds
let soundGunshot;
let soundReload;
let soundKey;
let soundBandage;
let soundUnlock;

//Game state to show rooms
let gameState;

let sceneSetup;

let hasKey1;
let hasKey2;
let hasKey3;

let killCount;
let saveCount;

let bulletCooldown;
let isReloading;
let bulletCount;
let currentFrame;

function preload() {
    imgRoom1 = loadImage('assets/Room1.png');
    imgRoom2 = loadImage('assets/Room2.png');
    imgRoom3 = loadImage('assets/Room3.png');
    imgRoom4 = loadImage('assets/Room4.png');
    imgRoom5 = loadImage('assets/Room5.png');
    imgRoom6 = loadImage('assets/Room6.png');
    imgRoom7 = loadImage('assets/Room7.png');
    imgRoom8 = loadImage('assets/Room8.png');
    imgRoom9 = loadImage('assets/Room9.png');
    imgRoom10 = loadImage('assets/Room10.png');
    imgRoom11 = loadImage('assets/Room11.png');
    imgRoom12 = loadImage('assets/Room12.png');
    imgRoom13 = loadImage('assets/Room13.png');
    imgRoom14 = loadImage('assets/Room14.png');
    imgRoom15 = loadImage('assets/Room15.png');
    imgRoom16 = loadImage('assets/Room16.png');
    imgRoom17 = loadImage('assets/Room17.png');
    imgRoom18 = loadImage('assets/Room18.png');
    imgTitleScreen = loadImage('assets/Title.png');
    imgDeathScreen = loadImage('assets/Death.png');
    imgEndScreen = loadImage('assets/End.png');

    soundGunshot = loadSound('assets/gunshot.mp3');
    soundReload = loadSound('assets/reload.mp3'); 
    soundKey = loadSound('assets/key.mp3');
    soundBandage = loadSound('assets/bandage.mp3');
    soundUnlock = loadSound('assets/unlock.mp3');
}

function setup() {
    createCanvas(600, 450);
    
    player = new Player(width / 2 - 30, height / 2 - 15, 30, 30, 100, 2);

    player.deactivate();

    gun = new Gun();
    key = new Key();
    medkit = new Medkit();

    npc = new NPC();

    gui = new GUI();

    gameState = 0;

    killCount = 0;
    saveCount = 0;

    sceneSetup = false;

    bulletCount = 8;
    isReloading = false;

    hasKey1 = false;
    hasKey2 = false;
    hasKey3 = false;

    soundGunshot.setVolume(0.1);
    soundReload.setVolume(0.1);
    soundKey.setVolume(0.5);
    soundBandage.setVolume(0.1);
    soundUnlock.setVolume(0.7);
}

function draw() {
    manageGameState();

    managePlayer();
    
    manageZombies();
    
    manageGun();

    manageWalls();

    manageExits();

    manageGUI();
}

/**
 * Uses a finite state machine to manage the game's state
 */
function manageGameState() {
    switch (gameState) {
        case 0:
            //Title Screen
            background(imgTitleScreen);

            if (keyIsDown(32)) {
                gameState = 1;
            }
            
            break;
        case 1:
            //Room 1
            background(imgRoom1);

            if (!sceneSetup) {
                player.activate();
                exits.add(new Exit(width - 5, 0, 5, height, 2, true));
                walls.add(new Wall(76, 68, 111, 110));
                walls.add(new Wall(396, 16, 111, 110));
                walls.add(new Wall(42, 267, 111, 110));
                walls.add(new Wall(295, 319, 111, 110))
                npc = new NPC(470, 185, 30, 30, 0);

                npcDialogue = [
                    "Please... [E]",
                    "Take my gun... [E]",
                    "And save people from the zombies [E]",
                    "..."
                ]

                if (!player.getHasGun()) {
                    gun = new Gun(400, width / 2 - 100);
                }
                sceneSetup = true;
            }

            gun.draw();

            if (gun.collect(player)) {
                cursor(CROSS);
                player.hasGun();

                soundReload.play();
            }
            

            npc.draw();
            npc.speak(player, npcDialogue);

            if (player.getHasGun()) {
                if (bulletCount > 0) {
                    gui.drawGunTutorial();
                }
            }
            else {
                gui.drawMovementTutorial();
            }

            break;
        case 2:
            //Room 2
            background(imgRoom2);
            
            if (!sceneSetup) {
                exits.add(new Exit(0, 0, 5, height, 1, true));
                exits.add(new Exit(width - 5, 0, 5, height, 3, true));
                walls.add(new Wall(52, 47, 111, 110));
                walls.add(new Wall(324, 22, 111, 110));
                walls.add(new Wall(158, 300, 111, 110));
                walls.add(new Wall(430, 317, 111, 110));
                zombies.add(new Zombie(width / 2, height / 2 - 15, 30, 30, 60, 1));
                sceneSetup = true;
            }

            break;
        case 3:
            //Room 3
            background(imgRoom3);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, 5, height, 2, true));
                exits.add(new Exit(width - 5, 0, 5, height, 5, true));
                exits.add(new Door(413, 151, 50, 20, 4, width / 2 - 15, height / 2 - 15 + 150, true));
                walls.add(new Wall(346, 15, 185, 135));
                walls.add(new Wall(98, 40, 111, 110));
                walls.add(new Wall(45, 319, 111, 110));
                walls.add(new Wall(330, 302, 111, 110));
                zombies.add(new Zombie(width / 2, height / 2 - 15, 30, 30, 60, 1));
                medkit = new Medkit(218, 350);
                sceneSetup = true;
            }

            medkit.draw();

            if (medkit.collect(player)) {
                player.restoreHp();

                soundBandage.play();
            }

            break;
        case 4:
            //Room 4
            background(imgRoom4);

            if (!sceneSetup) {
                exits.add(new Door(250, 405, 100, 30, 3, 423, 180, false));
                walls.add(new Wall(0, 0, width, 45, true));
                walls.add(new Wall(0, 0, 65, height, true))
                walls.add(new Wall(width - 65, 0, 65, height, true));
                walls.add(new Wall(65, height - 45, 190, 45, true));
                walls.add(new Wall(345, height - 45, 190, 45, true));
                walls.add(new Wall(65, 243, 42, 162, true));
                walls.add(new Wall(65, 370, 155, 35, true));
                walls.add(new Wall(65, 93, 155, 120, true));
                walls.add(new Wall(85, 107, 33, 30, true));
                walls.add(new Wall(85, 168, 33, 30, true));
                walls.add(new Wall(157, 57, 30, 32, true));
                walls.add(new Wall(420, 60, 96, 120, true));
                walls.add(new Wall(490, 276, 30, 105, true));
                walls.add(new Wall(375, 283, 20, 95, true));
                walls.add(new Wall(375, 283, 61, 10, true));
                walls.add(new Wall(375, 368, 61, 10, true));
                walls.add(new Wall(370, 60, 37, 37, true));
                zombies.add(new Zombie(155, 300, 30, 30, 60, 1));
                zombies.add(new Zombie(275, 100, 30, 30, 60, 1));

                npc = new NPC(445, 190, 30, 30, 0);

                npcDialogue = [
                    "Thanks for saving me! [E]",
                    "There are more people who need saving! [E]",
                    "Take this key, you might find it useful. [E]",
                    "Please, stay safe!"
                ]

                key = new Key(275, 250);

                if (!hasKey1) {
                    saveCount += 1;
                }

                sceneSetup = true;
            }

            npc.draw();

            if (zombies.size === 0) {
                npc.speak(player, npcDialogue);
            }

            if (npcDialogue.length < 2) {
                key.draw();

                if (key.collect(player)) {
                    player.hasKey();
                    hasKey1 = true;

                    soundKey.play();
                }
            }

            break;
        case 5:
            //Room 5
            background(imgRoom5);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, 5, height, 3, true));
                exits.add(new Exit(0, height - 5, width, 5, 6, false));
                exits.add(new Exit(0, 0, width, 5, 7, false));
                walls.add(new Wall(128, 41, 111, 110));
                walls.add(new Wall(34, 300, 111, 110));
                zombies.add(new Zombie(width / 2 + 100, height / 2 - 15 + 100, 30, 30, 60, 1));
                zombies.add(new Zombie(width / 2 + 100, height / 2 - 15 - 100, 30, 30, 60, 1));
                sceneSetup = true;
            }

            break;
        case 6:
            //Room 6
            background(imgRoom6);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 5, false));
                zombies.add(new Zombie(width / 2 + 100, height / 2 - 15 + 100, 30, 30, 60, 1));
                walls.add(new Wall(345, 425, 50, 10));
                walls.add(new Wall(450, 425, 50, 10));
                walls.add(new Wall(34, 25, 111, 110));
                walls.add(new Wall(141, 315, 111, 110));
                key = new Key(85, height / 2 - 25)
                sceneSetup = true;
            }

            if (!hasKey2) {
                key.draw();
            }

            if (key.collect(player)) {
                player.hasKey();
                hasKey2 = true;

                soundKey.play();
            }

            break;
        case 7:
            //Room 7
            background(imgRoom7);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 8, false));
                exits.add(new Exit(0, height - 5, width, 5, 5, false));
                walls.add(new Wall(84, 260, 111, 110));
                walls.add(new Wall(119, 41, 111, 110));
                zombies.add(new Zombie(width / 2 + 100, 50 + 100, 30, 30, 60, 1));
                sceneSetup = true;
            }

            break;
        case 8:
            //Room 8
            background(imgRoom8);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 12, false));
                exits.add(new Exit(0, height - 5, width, 5, 7, false));
                exits.add(new Exit(0, 0, 5, height, 9, true));
                zombies.add(new Zombie(width / 2 + 100, 50 + 100, 30, 30, 60, 1));
                zombies.add(new Zombie(width / 2 - 150, 210, 30, 30, 60, 1));

                sceneSetup = true;
            }

            break;
        case 9:
            //Room 9
            background(imgRoom9);

            if (!sceneSetup) {
                exits.add(new Exit(width - 5, 0, 5, height, 8, true));
                exits.add(new Exit(0, height - 5, width, 5, 10, false));
                walls.add(new Wall(57, 0, 112, 55, true));
                walls.add(new Wall(445, 395, 112, 55, true));
                walls.add(new Wall(30, 148, 10, 50, true));
                walls.add(new Wall(30, 250, 10, 50, true));
                zombies.add(new Zombie(width / 2 - 200, 210, 30, 30, 60, 1));
                sceneSetup = true;
            }

            break;
        case 10:
            //Room 10
            background(imgRoom10);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 9, false));
                exits.add(new Door(275, 150, 50, 20, 11, width / 2 - 15, height / 2 - 15 + 150, true));
                walls.add(new Wall(45, 40, 111, 110));
                walls.add(new Wall(65, 295, 111, 110));
                walls.add(new Wall(458, 295, 111, 110));
                walls.add(new Wall(445, 0, 111, 55));
                walls.add(new Wall(207, 168, 185, 135));

                sceneSetup = true;
            }

            break;
        case 11:
            //Room 11
            background(imgRoom11);

            if (!sceneSetup) {
                exits.add(new Door(250, 405, 100, 30, 10, 285, 100, false));
                walls.add(new Wall(0, 0, width, 45, true));
                walls.add(new Wall(0, 0, 65, height, true))
                walls.add(new Wall(width - 65, 0, 65, height, true));
                walls.add(new Wall(65, height - 45, 190, 45, true));
                walls.add(new Wall(345, height - 45, 190, 45, true));
                walls.add(new Wall(65, 243, 42, 162, true));
                walls.add(new Wall(65, 370, 155, 35, true));
                walls.add(new Wall(65, 93, 155, 120, true));
                walls.add(new Wall(85, 107, 33, 30, true));
                walls.add(new Wall(85, 168, 33, 30, true));
                walls.add(new Wall(157, 57, 30, 32, true));
                walls.add(new Wall(420, 60, 96, 120, true));
                walls.add(new Wall(490, 276, 30, 105, true));
                walls.add(new Wall(375, 283, 20, 95, true));
                walls.add(new Wall(375, 283, 61, 10, true));
                walls.add(new Wall(375, 368, 61, 10, true));
                walls.add(new Wall(370, 60, 37, 37, true));
                zombies.add(new Zombie(275, 100, 30, 30, 60, 1));
                zombies.add(new Zombie(155, 300, 30, 30, 60, 1));


                npc = new NPC(445, 190, 30, 30, 0);

                npcDialogue = [
                    "Thank you so much! [E]",
                    "Please try and save more people! [E]",
                    "This key will help you [E]",
                    "Thank you!"
                ]

                key = new Key(275, 250);

                saveCount += 1;
                
                sceneSetup = true;
            }

            npc.draw();

            if (zombies.size === 0) {
                npc.speak(player, npcDialogue);
            }

            if (npcDialogue.length < 2) {
                if (!hasKey3) {
                    key.draw();
                }

                if (key.collect(player)) {
                    player.hasKey();
                    hasKey3 = true;

                    soundKey.play();
                }
            }

            break;
        case 12:
            //Room 12
            background(imgRoom12);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 13, false));
                exits.add(new Exit(0, height - 5, width, 5, 8, false));
                walls.add(new Wall(42, 18, 111, 110));
                walls.add(new Wall(142, 170, 111, 110));
                walls.add(new Wall(42, 323, 111, 110));

                npc = new NPC(382, 150, 30, 30, 0);

                npcDialogue = [
                    "Quick! [E]",
                    "Take this medkit and run for the beach! [E]",
                    "The boat is your only chance to escape! [E]",
                    "Be careful!"
                ]

                medkit = new Medkit(396, 250);

                sceneSetup = true;
            }

            npc.draw();
            npc.speak(player, npcDialogue);

            if (npcDialogue.length < 3) {
                medkit.draw();

                if (medkit.collect(player)) {
                    player.restoreHp();
    
                    soundBandage.play();
                }
            }
            
            break;
        case 13:
            //Room 13
            background(imgRoom13);
            
            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 16, false));
                exits.add(new Exit(0, height - 5, width, 5, 12, false));
                exits.add(new Exit(0, 0, 5, height, 14, true));
                walls.add(new Wall(42, 18, 111, 110));
                walls.add(new Wall(42, 323, 111, 110));
                walls.add(new Wall(345, 170, 50, 10));
                walls.add(new Wall(447, 170, 50, 10));
                zombies.add(new LargeZombie(width / 2 - 100, 210, 35, 35, 100, 1));
                zombies.add(new Zombie(400, 50, 30, 30, 60, 1));

                sceneSetup = true;
            }

            break;
        case 14:
            //Room 14
            background(imgRoom14);

            if (!sceneSetup) {
                exits.add(new Exit(width - 5, 0, 5, height, 13, true));
                exits.add(new Door(185, 200, 20, 50, 15, width / 2 - 15, height / 2 - 15 + 150, true));
                walls.add(new Wall(218, 16, 111, 110));
                walls.add(new Wall(434, 43, 111, 110));
                walls.add(new Wall(235, 311, 111, 110));
                walls.add(new Wall(433, 285, 111, 110));
                walls.add(new Wall(50, 130, 135, 190));
                zombies.add(new LargeZombie(width / 2 + 100, 210, 35, 35, 100, 1));

                sceneSetup = true;
            }

            break;
        case 15:
            //Room 15
            background(imgRoom15);

            if (!sceneSetup) {
                exits.add(new Door(250, 405, 100, 30, 14, 225, 210, false));
                walls.add(new Wall(0, 0, width, 45, true));
                walls.add(new Wall(0, 0, 65, height, true))
                walls.add(new Wall(width - 65, 0, 65, height, true));
                walls.add(new Wall(65, height - 45, 190, 45, true));
                walls.add(new Wall(345, height - 45, 190, 45, true));
                walls.add(new Wall(65, 243, 42, 162, true));
                walls.add(new Wall(65, 370, 155, 35, true));
                walls.add(new Wall(65, 93, 155, 120, true));
                walls.add(new Wall(85, 107, 33, 30, true));
                walls.add(new Wall(85, 168, 33, 30, true));
                walls.add(new Wall(157, 57, 30, 32, true));
                walls.add(new Wall(420, 60, 96, 120, true));
                walls.add(new Wall(490, 276, 30, 105, true));
                walls.add(new Wall(375, 283, 20, 95, true));
                walls.add(new Wall(375, 283, 61, 10, true));
                walls.add(new Wall(375, 368, 61, 10, true));
                walls.add(new Wall(370, 60, 37, 37, true));
                zombies.add(new LargeZombie(275, 100, 35, 35, 100, 1));
                zombies.add(new Zombie(155, 300, 30, 30, 60, 1));

                
                npc = new NPC(445, 190, 30, 30, 0);

                medkit = new Medkit(275, 250);

                npcDialogue = [
                    "Thank you! [E]",
                    "Take this medkit, you look hurt. [E]",
                    "Good luck!"
                ]

                saveCount += 1;
                
                sceneSetup = true;
            }

            npc.draw();

            if (zombies.size === 0) {
                npc.speak(player, npcDialogue);
            }

            if (npcDialogue.length < 2) {
                medkit.draw();
                
                if (medkit.collect(player)) {
                    player.restoreHp();

                    soundBandage.play();
                }
            }
            

            break;
        case 16:
            //Room 16
            background(imgRoom16);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 17, false));
                exits.add(new Exit(0, height - 5, width, 5, 13, false));
                walls.add(new Wall(42, 323, 111, 110));
                walls.add(new Wall(230, 271, 111, 110));
                zombies.add(new LargeZombie(width / 2 - 150, 100, 35, 35, 100, 1));
                zombies.add(new LargeZombie(width / 2 + 150, 100, 35, 35, 100, 1));

                sceneSetup = true;
            }

            break;
        case 17:
            //Room 17
            background(imgRoom17);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 18, false));
                exits.add(new Exit(0, height - 5, width, 5, 16, false));
                zombies.add(new LargeZombie(width / 2 - 200, 100, 35, 35, 100, 1));
                zombies.add(new LargeZombie(width / 2 + 200, 100, 35, 35, 100, 1));
                zombies.add(new LargeZombie(width / 2, 100, 35, 35, 100, 1));
                
                sceneSetup = true;
            }

            break;
        case 18:
            //Room 18
            background(imgRoom18);
            if (!sceneSetup) {
                walls.add(new Wall(0, 0, width, 132));
                walls.add(new Wall(0, 132, 320, 132));
                walls.add(new Wall(420, 132, 179, 132));
                exits.add(new Exit(320, 132, 100, 50, 20, false));
                exits.add(new Exit(0, height - 5, width, 5, 17, false));

                npc = new NPC(250, 280, 30, 30, 0);
                
                npcDialogue = [
                    "Come on! [E]",
                    "Get on the boat!"
                ]

                sceneSetup = true;
            }

            npc.draw();
            npc.speak(player, npcDialogue);

            break;
        case 19:
            //Death Screen
            background(imgDeathScreen);

            if (!sceneSetup) {
                player.restoreHp();
                player.hasNoGun();
                player.hasNoKey();
                bulletCount = 8;

                sceneSetup = true;
            }

            if (keyIsDown(32)) {
                gameState = 1;

                player.setX(width / 2 - 30);
                player.setY(height / 2 - 15);

                killCount = 0;
                saveCount = 0;
                
                sceneSetup = false;
            }

            break;
        case 20:
            //End Screen
            background(imgEndScreen);

            noStroke();
            fill(255);
            textSize(20);
            textAlign(CENTER);

            text('ZOMBIES KILLED: ' + killCount, width / 2, 320);
            text('SURVIVORS SAVED: ' + saveCount + '/3', width / 2, 345);
            
            textAlign(LEFT)

            if (!sceneSetup) {
                player.deactivate();
                player.restoreHp();
                player.hasNoGun();
                player.hasNoKey();
                bulletCount = 8;
            }

            if (keyIsDown(32)) {
                gameState = 1;

                player.setX(width / 2 - 30);
                player.setY(height / 2 - 15);

                killCount = 0;
                saveCount = 0;

                sceneSetup = false;
            }

            break;
    }
}

/**
 * Manages player object
 */
function managePlayer() {
    player.draw();
    player.move();

    if (!player.getActive() && gameState > 1 && gameState < 20) {
        gameState = 19;
        sceneSetup = false;
        clearSets();
    }
}

/**
 * Manages zombie object in set
 */
function manageZombies() {
    for (let zombie of zombies) {
        zombie.draw();
        zombie.move(player);
        
        if (!zombie.getActive()) {
            killCount += 1;
            zombies.delete(zombie);
        }

        if (player.hit(zombie)) {
            player.removeHp(1);
        }

        for (let wall of walls) {
            wall.collide(zombie);
        }

        for(let zombie2 of zombies) {
            zombie.collide(zombie2);
        }
    }
}

/**
 * Manages gun and bullet objects
 */
function manageGun() {
    for (let bullet of bullets) {
        bullet.draw();
        bullet.move();

        for (let zombie of zombies) {
            if (bullet.hit(zombie)) {
                bullets.delete(bullet);
                zombie.removeHp(20);
            }
        }

        for (let wall of walls) {
            if (bullet.hit(wall)) {
                bullets.delete(bullet);
            }
        }
    }

    //Handles gun cooldown and reloading
    if (player.getHasGun()) {
        if (!bulletCooldown && !isReloading && mouseIsPressed) {
            currentFrame = frameCount;
            bulletCooldown = true;
        }
        if (!isReloading) {
            if (keyIsDown(82)) {
                currentFrame = frameCount;
                isReloading = true;

                soundReload.play();
            }
        }
    }

    if (frameCount > currentFrame + 15) {
        bulletCooldown = false;
    }
    if (frameCount > currentFrame + 60 && isReloading) {
        bulletCount = 8;
        bulletCooldown = false;
        isReloading = false;
    }

    if (isReloading) {
        gui.drawReloading(frameCount - currentFrame);
    }

    if (bulletCount < 1 && gameState > 1 && gameState < 19) {
        gui.drawReloadTutorial()
    }
}

/**
 * Manages collisions will wall and player
 */
function manageWalls() {
    for (let wall of walls) {
        wall.collide(player);
    }
}

/**
 * Manages exits for the player
 */
function manageExits() {
    for (let exit of exits) {
        if (exit.getIsDoor()) {
            if (exit.open(player)) {
                gameState = exit.getDestination();
                player.setX(exit.getTpX());
                player.setY(exit.getTpY());

                clearSets();
                sceneSetup = false;

                soundUnlock.play();
            }
        }
        else if (player.hit(exit)) {
            gameState = exit.getDestination();
            
            if (exit.getIsHorizontal()) {
                if (player.getX() < exit.getX()) {
                    player.setX(10);
                }
                if (player.getX() > exit.getX()) {
                    player.setX(width - player.getWidth() - 10);
                }
            }
            else {
                if (player.getY() < exit.getY()) {
                    player.setY(10);
                }
                if (player.getY() > exit.getY()) {
                    player.setY(height - player.getHeight() - 10);
                }
            }
            
            clearSets();
            sceneSetup = false;
        }
    }
}

/**
 * Manages on screen GUI
 */
function manageGUI() {
    if (gameState > 0 && gameState < 19) {
        gui.draw(player, bulletCount);
    }
}

/**
 * Clears sets with objects
 */
function clearSets() {
    zombies.clear();
    bullets.clear();
    walls.clear();
    exits.clear();
}

function mousePressed() {
    if (player.getActive() && player.getHasGun() && !bulletCooldown && !isReloading && bulletCount > 0) {
        bulletCount -= 1;

        if (bulletCount < 0) {
            bulletCount = 0;
        }

        bullets.add(new Bullet(player.getX() + 15, player.getY() + 15, 8, 8, mouseX, mouseY)); 
    
        soundGunshot.play();
    }
}

function keyPressed() {
    if (player.hit(npc) && keyCode === 69) {
        npcDialogue.shift();
    }
}