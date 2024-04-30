class Character extends GameObject {
    #hp;
    #maxHp;
    #speed;

    constructor(x, y, width, height, maxHp, speed) {
        super(x, y, width, height);
        this.#maxHp = maxHp;
        this.#hp = maxHp;
        this.#speed = speed;
    }

    getSpeed() {
        return this.#speed;
    }

    getHp() {
        return this.#hp;
    }

    setSpeed(newSpeed) {
        this.#speed = newSpeed;
    }

    restoreHp() {
        this.#hp = this.#maxHp;
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

            //Boundary Collision
            if (this.getX() < 0) {
                this.setX(this.getX() + this.getSpeed());
            }
            if (this.getX() > width - this.getWidth()) {
                this.setX(this.getX() - this.getSpeed());
            }
            if (this.getY() < 0) {
                this.setY(this.getY() + this.getSpeed());
            }
            if (this.getY() > height - this.getWidth()) {
                this.setY(this.getY() - this.getSpeed());
            }
        }
    }
}

class Zombie extends Character {
    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height, hp, speed);

        this.setRectangle(this.getWidth(), this.getHeight());
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