/*
TODO:
- Implement Mutant Zombie
= Zombie / NPC collisions
- Design rooms in Photoshop
- Import door to new rooms
- Implement rooms
- ...and more
*/

//IMPORTANT!!
//FIX BACKGROUND SIZE

let player;
const zombies = new Set();
const bullets = new Set();

let gui;
let gun;

let imgRoom1;

function preload() {
    imgRoom1 = loadImage('assets/Room1.png');
}

function setup() {
    createCanvas(600, 450);
    
    player = new Player(width / 2 - 30, height / 2 - 15, 30, 30, 100, 2);
    gui = new GUI();

    gun = new Gun(400, width / 2 - 100);
}

function draw() {
    background(imgRoom1);

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

    gui.draw(player.getHp(), player.getHasGun(), player.getHasKey());
}

function mousePressed() {
    if (player.getActive() && player.getHasGun()) {
        bullets.add(new Bullet(player.getX() + 15, player.getY() + 15, 8, 8, mouseX, mouseY))
    }
}