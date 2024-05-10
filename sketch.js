/*
TODO:
- Implement Mutant Zombie
= Zombie / NPC collisions
- Design rooms in Photoshop
- Import door to new rooms
- Implement rooms
- ...and more
*/

let player;
const zombies = new Set();
const bullets = new Set();

let gui;
let gun;

let exits = new Set();

let imgRoom1;
let imgRoom2;
let imgRoom3;

let gameState;

function preload() {
    imgRoom1 = loadImage('assets/Room1.png');
    imgRoom2 = loadImage('assets/Room2.png');
    imgRoom3 = loadImage('assets/Room3.png');
}

function setup() {
    createCanvas(600, 450);
    
    player = new Player(width / 2 - 30, height / 2 - 15, 30, 30, 100, 2);
    gui = new GUI();

    gun = new Gun(400, width / 2 - 100);

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

            exits.add(new Exit(width - 5, 0, 5, height, 2));
            break;
        case 2:
            //Room 2
            background(imgRoom2);
            break;
    }

    cursor(CROSS);

    gun.draw();
    if (gun.collect(player)) {
        player.hasGun();
    }

    player.draw();
    player.move();

    for (let bullet of bullets) {
        bullet.draw();
        bullet.move();

        for (let zombie of zombies) {
            if (bullet.hit(zombie)) {
                console.log('hit')
                bullets.delete(bullet);
                zombie.removeHp(20);
            }
        }
    }

    for (let exit of exits) {
        if (player.hit(exit)) {
            gameState = exit.getDestination();
        }
    }

    gui.draw(player.getHp(), player.getHasGun(), player.getHasKey());
}

function mousePressed() {
    if (player.getActive() && player.getHasGun()) {
        bullets.add(new Bullet(player.getX() + 15, player.getY() + 15, 8, 8, mouseX, mouseY))
    }
}