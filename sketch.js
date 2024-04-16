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

class Player extends GameObject {
    #speed;

    constructor(x, y, speed) {
        super(x, y);
        this.#speed = speed;
        
    }

    draw() {
        strokeWeight(2);
        stroke(0);
        fill(242, 213, 177);
        circle(this.getX(), this.getY(), 30)
    }

    action() {
        if (keyIsDown(87)) {
            this.setY(this.getY() - this.#speed);
        }
        if (keyIsDown(83)) {
            this.setY(this.getY() + this.#speed);
        }
        if (keyIsDown(65)) {
            this.setX(this.getX() - this.#speed);
        }
        if (keyIsDown(68)) {
            this.setX(this.getX() + this.#speed);
        }

        if (mouseIsPressed) {
            let bullet = new Bullet(this.getX(), this.getY(), mouseX, mouseY);
            bullet.draw();
            bullet.move();
        }
    }
}

class Bullet extends GameObject {
    #mx;
    #my;

    constructor(x, y, mx, my) {
        super(x, y);
        this.#mx = mx;
        this.#my = my;
    }

    draw() {
        strokeWeight(1);
        stroke(0);
        fill(252, 210, 71);
        circle(this.getX(), this.getY(), 8)
    }

    move() {
        //this.setX(this.getX() + 5);
        this.setY(this.getY() + 5);
    }
}

let player;

function setup() {
    createCanvas(600, 450);

    player = new Player(width / 2, height / 2, 2);
}

function draw() {
    background(149, 199, 113);

    cursor(CROSS);

    player.draw();
    player.action();
}