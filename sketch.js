/*
TODO:
- Implement Mutant Zombie
= Zombie / NPC collisions
- Design rooms in Photoshop
- Import door to new rooms
- Implement rooms
- ...and more
*/

let gui;

let player;

const zombies = new Set();
const bullets = new Set();
const walls = new Set();
const exits = new Set();

let gun;
let key;
let medkit;

let npc;

let npcDialogue = []

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

let gameState;

let sceneSetup = false;

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
}

function setup() {
    createCanvas(600, 450);
    
    player = new Player(width / 2 - 30, height / 2 - 15, 30, 30, 100, 2);
    
    gun = new Gun();
    key = new Key();
    medkit = new Medkit();
    
    gui = new GUI();

    gameState = 13;
}

function draw() {
    switch (gameState) {
        case 0:
            //Title Screen
            break;
        case 1:
            //Room 1
            background(imgRoom1);

            if (!sceneSetup) {
                exits.add(new Exit(width - 5, 0, 5, height, 2, true));
                walls.add(new Wall(76, 68, 111, 110));
                walls.add(new Wall(396, 16, 111, 110));
                walls.add(new Wall(42, 267, 111, 110));
                walls.add(new Wall(295, 319, 111, 110))

                if (!player.getHasGun()) {
                    gun = new Gun(400, width / 2 - 100);
                }
                sceneSetup = true;
            }

            gun.draw();

            if (gun.collect(player)) {
                player.hasGun();
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
            }

            break;
        case 4:
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
                zombies.add(new Zombie(275, 100, 30, 30, 60, 1));
                zombies.add(new Zombie(155, 300, 30, 30, 60, 1));

                npc = new NPC(445, 190, 30, 30, 0);

                npcDialogue = [
                    "Thanks for saving me! (E)",
                    "There are more people who need saving! (E)",
                    "Take this key, you might find it useful. (E)",
                    "Please, stay safe!"
                ]

                key = new Key(275, 250);

                sceneSetup = true;
            }

            npc.draw();

            if (zombies.size === 0) {
                npc.speak(player, npcDialogue);
            }

            if (npcDialogue.length < 2) {
                if (!player.getHasKey()) {
                    key.draw();
                }

                if (key.collect(player)) {
                    player.hasKey();
                }
            }

            break;
        case 5:
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

            if (!player.getHasKey()) {
                key.draw();
            }

            if (key.collect(player)) {
                player.hasKey();
            }

            break;
        case 7:
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
            background(imgRoom9);

            if (!sceneSetup) {
                exits.add(new Exit(width - 5, 0, 5, height, 8, true));
                exits.add(new Exit(0, height - 5, width, 5, 10, false));
                walls.add(new Wall(57, 0, 112, 55, true));
                walls.add(new Wall(445, 395, 112, 55, true));
                walls.add(new Wall(30, 148, 10, 50, true));
                walls.add(new Wall(30, 250, 10, 50, true));

                sceneSetup = true;
            }

            break;
        case 10:
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
            background(imgRoom11);

            if (!sceneSetup) {
                exits.add(new Door(250, 405, 100, 30, 10, 285, 100, false));

                sceneSetup = true;
            }

            break;
        case 12:
            background(imgRoom12);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 13, false));
                exits.add(new Exit(0, height - 5, width, 5, 8, false));
                walls.add(new Wall(42, 18, 111, 110));
                walls.add(new Wall(142, 170, 111, 110));
                walls.add(new Wall(42, 323, 111, 110));

                sceneSetup = true;
            }

            break;
        case 13:
            background(imgRoom13);
            
            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 16, false));
                exits.add(new Exit(0, height - 5, width, 5, 12, false));
                exits.add(new Exit(0, 0, 5, height, 14, true));
                

                sceneSetup = true;
            }

            break;
        case 14:
            background(imgRoom14);

            if (!sceneSetup) {
                exits.add(new Exit(width - 5, 0, 5, height, 13, true));
                exits.add(new Door(185, 200, 20, 50, 15, width / 2 - 15, height / 2 - 15 + 150, true));
                sceneSetup = true;
            }

            break;
        case 15:
            background(imgRoom15);

            if (!sceneSetup) {
                exits.add(new Door(250, 405, 100, 30, 14, 225, 210, false));
                sceneSetup = true;
            }

            break;
        case 16:
            background(imgRoom16);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 17, false));
                exits.add(new Exit(0, height - 5, width, 5, 13, false));
                sceneSetup = true;
            }

            break;
        case 17:
            background(imgRoom17);

            if (!sceneSetup) {
                exits.add(new Exit(0, 0, width, 5, 18, false));
                exits.add(new Exit(0, height - 5, width, 5, 16, false));
                sceneSetup = true;
            }

            break;
        case 18:
            background(imgRoom18);
            if (!sceneSetup) {

                sceneSetup = true;
            }

            break;
    }

    //TODO: Look at putting code in functions / classes
    cursor(CROSS);

    player.draw();
    player.move();
    
    for (let zombie of zombies) {
        zombie.draw();
        zombie.move(player.getX(), player.getY());
        
        if (!zombie.getActive()) {
            zombies.delete(zombie);
        }
        if (player.hit(zombie)) {
            player.removeHp(1);
        }

        for (let wall of walls) {
            wall.collide(zombie);
        }
    }
    
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

    for (let wall of walls) {
        wall.collide(player);
        wall.drawRect();
    }

    for (let exit of exits) {
        exit.drawRect();

        if (exit.getIsDoor()) {
            if (exit.open(player)) {
                gameState = exit.getDestination();
                player.setX(exit.getTpX());
                player.setY(exit.getTpY());

                clearSets();
                sceneSetup = false;
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

    gui.draw(player.getHp(), player.getHasGun(), player.getHasKey());
}

function clearSets() {
    zombies.clear();
    bullets.clear();
    walls.clear();
    exits.clear();
}

function mousePressed() {
    if (player.getActive() && player.getHasGun()) {
        bullets.add(new Bullet(player.getX() + 15, player.getY() + 15, 8, 8, mouseX, mouseY))
    }
}

function keyPressed() {
    if (player.hit(npc) && keyCode === 69) {
        npcDialogue.shift();
    }
}