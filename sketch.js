class GameObject {
    #x;
    #y;
    #width;
    #height;
    #isActive;

    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#isActive = true;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getActive() {
        return this.#isActive;
    }

    setX(newX) {
        this.#x = newX;
    }

    setY(newY) {
        this.#y = newY;
    }

    deactivate() {
        this.#isActive = false;
    }

    setRectangle(newWidth, newHeight) {
        this.#width = newWidth;
        this.#height = newHeight;
    }

    hit(other) {
        if (this.#x + this.#width >= other.getX()
            && this.#x <= other.getX() + other.getWidth()
            && this.#y + this.#height >= other.getY()
            && this.#y <= other.getY() + other.getHeight()) {
                return true;
            }
        return false;
    }

    drawRect() {
        strokeWeight(2);
        stroke(204, 0, 204);
        noFill();
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
    }
}

class Wall extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw() {
        noStroke();
        fill(40, 40, 40);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }
}

class Character extends GameObject {
    #hp;
    #speed;

    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height);
        this.#hp = hp;
        this.#speed = speed;
    }

    getSpeed() {
        return this.#speed;
    }

    getHp() {
        return this.#hp;
    }

    removeHp(amount) {
        this.#hp -= amount;
        if (this.#hp <= 0) {
            this.#hp = 0;
            this.deactivate();
        }
    }
}

class Player extends Character {
    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height, hp, speed);

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    draw() {
        //this.drawRect();
        
        ellipse(CORNER)
        strokeWeight(2);
        stroke(0);
        fill(242, 213, 177);
        circle(this.getX(), this.getY(), 30);

        stroke(204, 0, 204);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight)
    }

    move() {
        if(this.getActive()) {
            if (keyIsDown(87)) { // W
                this.setY(this.getY() - this.getSpeed());
            }
            if (keyIsDown(83)) { // S
                this.setY(this.getY() + this.getSpeed());
            }
            if (keyIsDown(65)) { // A
                this.setX(this.getX() - this.getSpeed());
            }
            if (keyIsDown(68)) { // D
                this.setX(this.getX() + this.getSpeed());
            }
        }
    }
}

class Zombie extends Character {
    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height, hp, speed);

        this.setRectangle(this.getWidth(), this.getHeight())
    }

    draw() {
        //this.drawRect();

        if (this.getActive()) {
            ellipseMode(CORNER)

            strokeWeight(2);
            stroke(0);
            fill(34, 125, 14);
            circle(this.getX(), this.getY(), 30);

            noStroke();
            fill(0);
            rect(this.getX(), this.getY() - 10, 30, 5);

            fill(235, 64, 52);
            rect(this.getX(), this.getY() - 10, this.getHp() / 2, 5);

            // stroke(176, 66, 245);
            // noFill();
            // rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
        }
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

    constructor(x, y, width, height, mx, my) {
        super(x, y, width, height);
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

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    draw() {
        //this.drawRect();

        if (this.getActive()) {
            ellipseMode(CORNER);
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

class GUI {
    constructor() {}

    draw(hp) {
        strokeWeight(2);
        fill(50, 50, 50);
        stroke(50, 50, 50);
        rect(10, height - 40, 200, 30);

        fill(138, 212, 42);
        stroke(50, 50, 50);
        rect(10, height - 40, hp * 2, 30);

        fill(255)
        noStroke();
        textSize(20);
        text(hp + " / 100", 18, height - 18);
    }
}

let player;
const zombies = new Set();
const bullets = new Set();

let gui;
let wall;

function setup() {
    createCanvas(600, 450);

    player = new Player(width / 2, height / 2, 30, 30, 100, 2);
    zombies.add(new Zombie(width / 2 + 100, height / 2, 30, 30, 60, 1));
    zombies.add(new Zombie(width / 2 + 100, height / 2 + 100, 30, 30, 60, 1));
    
    wall = new Wall(50, 50, width - 100, 50);
    gui = new GUI();
}

function draw() {
    background(149, 199, 113);

    cursor(CROSS);

    player.draw();
    player.move();

    wall.draw();

    //TODO: Implement player collision with wall
    if (player.hit(wall)) {
        
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

    gui.draw(player.getHp());
}

function mousePressed() {
    if (player.getActive()) {
        bullets.add(new Bullet(player.getX() + 15, player.getY() + 15, 8, 8, mouseX, mouseY))

    }
}