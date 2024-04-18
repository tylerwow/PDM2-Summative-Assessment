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
    }
}

class Bullet extends GameObject {
    #mx;
    #my;
    #yDif;
    #xDif;

    constructor(x, y, mx, my) {
        super(x, y);
        this.#mx = mx;
        this.#my = my;

        this.#xDif = this.#mx - this.getX();
        this.#yDif = this.#my - this.getY();

        if (this.#xDif > this.#yDif && this.#xDif > 0) {
            this.#yDif = floor(this.#yDif / this.#xDif * 5);
            this.#xDif = 5;
        }
        else if (this.#yDif > this.#xDif && this.#yDif > 0) {
            this.#xDif = floor(this.#xDif / this.#yDif * 5);
            this.#yDif = 5;
        }
        else if (this.#xDif < this.#yDif && this.#xDif < 0) {
            this.#xDif = this.#xDif * -1;
            this.#yDif = this.#yDif * -1;

            this.#yDif = floor(this.#yDif / this.#xDif * -5);
            this.#xDif = -5;
        }
        else if (this.#yDif < this.#xDif && this.#yDif < 0) {
            this.#xDif = this.#xDif * -1;
            this.#yDif = this.#yDif * -1;

            this.#xDif = floor(this.#xDif / this.#yDif * -5);
            this.#yDif = -5;
        }

        console.log(this.#mx, this.#my)
        console.log(this.#xDif, this.#yDif)
    }

    draw() {
        strokeWeight(1);
        stroke(0);
        fill(252, 210, 71);
        circle(this.getX(), this.getY(), 8)
    }

    move() {
        this.setX(this.getX() + this.#xDif);
        this.setY(this.getY() + this.#yDif);

        //this.setX(this.getX() + 5);
        //this.setY(this.getY() + 5);
    }
}

let player;
let bullets = [];

function setup() {
    createCanvas(600, 450);

    player = new Player(width / 2, height / 2, 2);
}

function draw() {
    background(149, 199, 113);

    cursor(CROSS);

    player.draw();
    player.action();

    for (bullet of bullets) {
        bullet.draw();
        bullet.move();
    }
}

function mousePressed() {
    console.log("Mouse Pressed")
    
    bullets.push(new Bullet(player.getX(), player.getY(), mouseX, mouseY))
}