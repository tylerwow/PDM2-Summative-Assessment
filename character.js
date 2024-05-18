class Character extends GameObject {
    #hp;
    #maxHp;
    #speed;

    /**
     * Creates new character object
     * @param {number} x X position of the character
     * @param {number} y Y position of the character
     * @param {number} width Width of the character
     * @param {number} height Height of the character
     * @param {number} maxHp Maximum health points of the character
     * @param {number} speed Speed of the character
     */
    constructor(x, y, width, height, maxHp, speed) {
        super(x, y, width, height);
        this.#maxHp = maxHp;
        this.#hp = maxHp;
        this.#speed = speed;
    }

    /**
     * Returns character speed
     * @returns {number}
     */
    getSpeed() {
        return this.#speed;
    }

    /**
     * Returns character's HP
     * @returns {number}
     */
    getHp() {
        return this.#hp;
    }

    /**
     * Sets speed of the character
     * @param {number} newSpeed New speed of the character
     */
    setSpeed(newSpeed) {
        this.#speed = newSpeed;
    }

    /**
     * Restores HP to maximum
     */
    restoreHp() {
        this.#hp = this.#maxHp;
    }

    /**
     * Removes HP from total
     * @param {number} amount Amount to remove HP by
     */
    removeHp(amount) {
        this.#hp -= amount;
        if (this.#hp <= 0) {
            this.#hp = 0;
            this.deactivate();
        }
    }
}

class Player extends Character {
    #hasGun;
    #hasKey;

    /**
     * Creates new character object
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} hp 
     * @param {number} speed 
     */
    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height, hp, speed);

        this.setRectangle(this.getWidth(), this.getHeight());

        this.#hasGun = false;
        this.#hasKey = false;
    }

    /**
     * Draws character object on canvas
     */
    draw() {
        if (this.getActive()) {
            ellipseMode(CORNER)
            strokeWeight(2);
            stroke(0);
            fill(242, 213, 177);
            circle(this.getX(), this.getY(), 30);
    
            stroke(204, 0, 204);
            rect(this.getX(), this.getY(), this.getWidth(), this.getHeight)    
        }
    }

    /**
     * Moves character used WASD and stops player from going out of bounds
     */
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

    /**
     * Sets hasGun to true
     */
    hasGun() {
        this.#hasGun = true;
    }

    /**
     * Sets hasGun to false
     */
    hasNoGun() {
        this.#hasGun = false;
    }

    /**
     * Returns hasGun
     * @returns {boolean}
     */
    getHasGun() {
        return this.#hasGun;
    }

    /**
     * Sets hasKey to true
     */
    hasKey() {
        this.#hasKey = true;
    }
    
    /**
     * Sets hasKey to false
     */
    hasNoKey() {
        this.#hasKey = false;
    }

    /**
     * Returns hasKey
     * @returns {boolean}
     */
    getHasKey() {
        return this.#hasKey;
    }
}

class Zombie extends Character {
    /**
     * Creates new Zombie object
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} hp 
     * @param {number} speed 
     */
    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height, hp, speed);

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    /**
     * Draws zombie object on canvas
     */
    draw() {
        if (this.getActive()) {
            ellipseMode(CORNER)

            strokeWeight(2);
            stroke(0);
            fill(34, 125, 14);
            circle(this.getX(), this.getY(), this.getWidth());

            noStroke();
            fill(0);
            rect(this.getX(), this.getY() - 10, 30, 5);

            fill(235, 64, 52);
            rect(this.getX(), this.getY() - 10, this.getHp() / 2, 5);
        }
    }

    /**
     * Moves zombie towards player position
     * @param {object} player Player object to get position
     */
    move(player) {
        if (this.getX() < player.getX()) {
            this.setX(this.getX() + this.getSpeed());
        }
        if (this.getX() > player.getX()) {
            this.setX(this.getX() - this.getSpeed());
        }
        if (this.getY() < player.getY()) {
            this.setY(this.getY() + this.getSpeed());
        }
        if (this.getY() > player.getY()) {
            this.setY(this.getY() - this.getSpeed());
        }
    }
}

class LargeZombie extends Zombie {
    /**
     * Creates large zombie object
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} hp 
     * @param {number} speed 
     */
    constructor(x, y, width, height, hp, speed) {
        super(x, y, width, height, hp, speed);

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    /**
     * Draws large zombie object on canvas
     */
    draw() {
        if (this.getActive()) {
            ellipseMode(CORNER)

            strokeWeight(2);
            stroke(0);
            fill(34, 125, 14);
            circle(this.getX(), this.getY(), this.getWidth());

            noStroke();
            fill(0);
            rect(this.getX() + 2, this.getY() - 10, 30, 5);

            fill(235, 64, 52);
            rect(this.getX() + 2, this.getY() - 10, this.getHp() / 3.3, 5);
        }
    }
}

class NPC extends Character {
    /**
     * Creates NPC object
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} speed 
     */
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)

        this.setRectangle(80, 80);
    }

    /**
     * Draws NPC object on canvas
     */
    draw() {
        ellipseMode(CORNER)
        strokeWeight(2);
        stroke(0);
        fill(242, 213, 177);
        circle(this.getX() + 25, this.getY() + 25, 30);

        stroke(204, 0, 204);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight)
    }

    /**
     * Initiates dialogue between player
     * @param {object} player 
     * @param {array} dialogue 
     */
    speak(player, dialogue) {
        if (this.hit(player)) {
            textAlign(CENTER, BOTTOM);
            noStroke();
            textSize(15);
            fill(255);
            text(dialogue[0], this.getX() - 60, this.getY() - 80, 200, 100);
            textAlign(LEFT, BASELINE);
        }
    }
}