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

let npcDialogue1 = [
    "Thanks for saving me! (E)",
    "There are more people who need saving! (E)",
    "Take this key, you might find it useful. (E)",
    "Please, stay safe!"
]

let imgRoom1;
let imgRoom2;
let imgRoom3;
let imgRoom4;
let imgRoom5;
let imgRoom6;
let imgRoom7;

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
}

function setup() {
    createCanvas(600, 450);
    
    player = new Player(width / 2 - 30, height / 2 - 15, 30, 30, 100, 2);
    
    gun = new Gun();
    key = new Key();
    medkit = new Medkit();
    
    gui = new GUI();

    gameState = 1;
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

                key = new Key(275, 310);

                sceneSetup = true;
            }

            npc.draw();

            if (zombies.size === 0) {
                npc.speak(player, npcDialogue1);
            }

            if (npcDialogue1.length < 2) {
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
                exits.add(new Exit(0, height - 5, width, 5, 5, false));
                walls.add(new Wall(84, 260, 111, 110));
                walls.add(new Wall(119, 41, 111, 110));
                zombies.add(new Zombie(width / 2 + 100, 50 + 100, 30, 30, 60, 1));
                sceneSetup = true;
            }
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
        //wall.drawRect();
    }

    for (let exit of exits) {
        //exit.drawRect();

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
        npcDialogue1.shift();
    }
}