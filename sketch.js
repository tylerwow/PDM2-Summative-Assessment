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

let imgRoom1;
let imgRoom2;
let imgRoom3;

let gameState;

let sceneSetup = false;

function preload() {
    imgRoom1 = loadImage('assets/Room1.png');
    imgRoom2 = loadImage('assets/Room2.png');
    imgRoom3 = loadImage('assets/Room3.png');
}

function setup() {
    createCanvas(600, 450);
    
    player = new Player(width / 2 - 30, height / 2 - 15, 30, 30, 100, 2);
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
                exits.add(new Exit(width - 5, 0, 5, height, 2));

                if (!player.getHasGun()) {
                    gun = new Gun(400, width / 2 - 100);
                }
                sceneSetup = true;
            }

            if (gun.collect(player)) {
                player.hasGun();
            }

            gun.draw();

            break;
        case 2:
            //Room 2
            background(imgRoom2);
            
            if (!sceneSetup) {
                exits.add(new Exit(0, 0, 5, height, 1), new Exit(width - 5, 0, 5, height, 1));
                zombies.add(new Zombie(400, height / 2, 30, 30, 60));
                sceneSetup = true;
            }

            break;
    }

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
    }

    for (let exit of exits) {
        if (player.hit(exit)) {
            gameState = exit.getDestination();
            
            if (player.getX() < exit.getX()) {
                player.setX(10);
            }
            else if (player.getX() > exit.getX()) {
                player.setX(width - player.getWidth() - 10);
            }
            else if (player.getY() < exit.getY()) {
                player.setY(10);
            }
            else if (player.getY() > exit.getY()) {
                player.setY(height - player.getHeight() - 10);
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