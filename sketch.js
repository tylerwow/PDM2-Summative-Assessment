//TODO: Add collision rectangles and hit function
class GameObject {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }
}

class Character extends GameObject {
    #hp;
    #speed;

    constructor(x, y, hp, speed) {
        super(x, y);
        this.#hp = hp;
        this.#speed = speed;
    }

    getSpeed() {
        return this.#speed;
    }

    getHp() {
        return this.#hp;
    }
}

//TODO: Add HP to player and HP depletion for collision with enemies
class Player extends Character {
    constructor(x, y, hp, speed) {
        super(x, y, hp, speed);
    }

    draw() {
        strokeWeight(2);
        stroke(0);
        fill(242, 213, 177);
        circle(this.getX(), this.getY(), 30);
    }

    move() {
        if (keyIsDown(87)) {
            this.setY(this.getY() - this.getSpeed());
        }
        if (keyIsDown(83)) {
            this.setY(this.getY() + this.getSpeed());
        }
        if (keyIsDown(65)) {
            this.setX(this.getX() - this.getSpeed());
        }
        if (keyIsDown(68)) {
            this.setX(this.getX() + this.getSpeed());
        }
    }
}

//TODO: Deplete HP once bullet hits
class Zombie extends Character {
        constructor(x, y, hp, speed) {
        super(x, y, hp, speed);
    }

    draw() {
        strokeWeight(2);
        stroke(0);
        fill(34, 125, 14);
        circle(this.getX(), this.getY(), 30);

        noStroke();
        fill(0);
        rect(this.getX() - 15, this.getY() - 25, 30, 5);

        fill(235, 64, 52);
        rect(this.getX() - 15, this.getY() - 25, this.getHp() / 2, 5);
    }

    move(playerX, playerY) {
        if (this.getX() < playerX) {
            this.setX(this.getX() + this.getSpeed());
        }
        if (this.getX() > playerX) {
            this.setX(this.getX() - this.getSpeed());
        }
        if (this.getY() < playerY) {
            this.setY(this.getY() + this.getSpeed());
        }
        if (this.getY() > playerY) {
            this.setY(this.getY() - this.getSpeed());
        }
    }
}

//TODO: Fix issue with bullet speed
class Bullet extends GameObject {
    #mx;
    #my;
    #yDif;
    #xDif;
    #isActive;

    constructor(x, y, mx, my) {
        super(x, y);
        this.#mx = mx;
        this.#my = my;

        this.#xDif = this.#mx - this.getX();
        this.#yDif = this.#my - this.getY();

        console.log(this.#xDif, this.#yDif)

        if (this.#xDif >= this.#yDif && this.#xDif > 0) {
            this.#yDif = this.#yDif / this.#xDif * 5;
            this.#xDif = 5;
        }
        if (this.#yDif >= this.#xDif && this.#yDif > 0) {
            this.#xDif = this.#xDif / this.#yDif * 5;
            this.#yDif = 5;
        }
        if (this.#xDif <= this.#yDif && this.#xDif < 0) {
            this.#yDif = this.#yDif / this.#xDif * -5;
            this.#xDif = -5;
        }
        if (this.#yDif <= this.#xDif && this.#yDif < 0) {
            this.#xDif = this.#xDif / this.#yDif * -5;
            this.#yDif = -5;
        }

        console.log(this.#xDif, this.#yDif);

        this.#isActive = true;
    }

    draw() {
        if (this.#isActive) {
            strokeWeight(1);
            stroke(0);
            fill(252, 210, 71);
            circle(this.getX(), this.getY(), 8);
        }
    }

    move() {
        this.setX(this.getX() + this.#xDif);
        this.setY(this.getY() + this.#yDif);
    }
}

let player;
let zombie;
let bullets = [];

function setup() {
    createCanvas(600, 450);

    player = new Player(width / 2, height / 2, 100, 2);
    zombie = new Zombie(width / 2 + 100, height / 2, 60, 1);
}

function draw() {
    background(149, 199, 113);

    cursor(CROSS);

    player.draw();
    player.move();

    zombie.draw();
    zombie.move(player.getX(), player.getY());

    for (bullet of bullets) {
        bullet.draw();
        bullet.move();
    }
}

function mousePressed() {
    bullets.push(new Bullet(player.getX(), player.getY(), mouseX, mouseY))
}