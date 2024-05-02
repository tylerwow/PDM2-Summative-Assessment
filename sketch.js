/*
TODO:
- Design collectable sprites
- Implement collectables
- Implement Mutant Zombie
- Design rooms in Photoshop
- Import door to new rooms
- Implement rooms
- ...and more
*/

let player;
const zombies = new Set();
const bullets = new Set();

let gui;
let wall;

let medkit;
let key;

function setup() {
    createCanvas(600, 450);

    player = new Player(width / 2, height / 2, 30, 30, 100, 2);
    zombies.add(new Zombie(width / 2 + 100, height / 2, 30, 30, 60, 1));
    zombies.add(new Zombie(width / 2 + 100, height / 2 + 100, 30, 30, 60, 1));
    
    wall = new Wall(50, 50, width - 100, 50, true);
    gui = new GUI();
    medkit = new Medkit(width / 2 - 25, 400);
    key = new Key(width / 2 + 30, 400)
}

function draw() {
    background(149, 199, 113);

    cursor(CROSS);

    player.draw();
    player.move();

    wall.draw();
    wall.collide(player);

    medkit.draw();
    if (medkit.collect(player)) {
        player.restoreHp();
    }

    key.draw();
    if (key.collect(player)) {
        player.hasKey();
    }

    for (let zombie of zombies) {
        zombie.draw();
        zombie.move(player.getX(), player.getY());

        if (!zombie.getActive()) {
            zombies.delete(zombie);
        }

        if (player.hit(zombie)) {
            player.removeHp(1);
        }

        wall.collide(zombie);
    }

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

        if (bullet.hit(wall)) {
            bullets.delete(bullet);
        }
    }

    gui.draw(player.getHp(), player.getHasGun(), player.getHasKey());
}

function mousePressed() {
    if (player.getActive()) {
        bullets.add(new Bullet(player.getX() + 15, player.getY() + 15, 8, 8, mouseX, mouseY))
    }
}