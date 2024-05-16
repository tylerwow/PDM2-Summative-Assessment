class Collectable extends GameObject {
    /**
     * Creates collectable object
     * @param {number} x Collectable x position
     * @param {number} y Collectable y position
     */
    constructor(x, y) {
        super(x, y, width, height);
        this.setRectangle(50, 50);
    }

    /**
     * Displays text when player object hits collectable, deactivates collectable when E is pressed
     * @param {object} player Player object to check position
     * @returns {boolean} True when object is collected, false when it is not
     */
    collect(player) {
        if (this.hit(player) && this.getActive()) {
            noStroke();
            textSize(15);
            fill(255);
            text('Take (E)', this.getX() - 3, this.getY() - 5);
            if (keyIsDown(69)) {
                this.deactivate();
                return true;
            }
        }
        return false;
    }
}

class Medkit extends Collectable {
    #img;
    
    /**
     * Creates medkit object
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(x, y, width, height);
        this.#img = loadImage('assets/Medkit.png');
    }

    /**
     * Displays text when player object hits collectable, deactivates collectable when E is pressed
     * @param {object} player Player object to check position
     * @returns {boolean} True when object is collected, false when it is not
     */
    collect(player) {
        if (this.hit(player) && this.getActive()) {
            noStroke();
            textSize(15);
            fill(255);
            text('Heal (E)', this.getX() - 3, this.getY() - 5);
            if (keyIsDown(69)) {
                this.deactivate();
                return true;
            }
        }
        return false;
    }
    
    /**
     * Draws medkit object on canvas
     */
    draw() {
        if (this.getActive()) {
            image(this.#img, this.getX() + 5, this.getY() + 5, this.getWidth() - 10, this.getHeight() - 15);
        }
    }
}

class Key extends Collectable {
    #img;
    
    /**
     * Creates key object
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(x, y, width, height);
        this.#img = loadImage('assets/Key.png');
    }
    
    /**
     * Draws key object on canvas
     */
    draw() {
        if (this.getActive()) {
            image(this.#img, this.getX() + 7, this.getY() + 7, this.getWidth() - 15, this.getHeight() - 15);
        }
    }
}

class Gun extends Collectable {
    #img;

    /**
     * Creates gun object
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(x, y, width, height);
        this.#img = loadImage('assets/Gun.png');
    }
    
    /**
     * Draws medkit object on canvas
     */
    draw() {
        if (this.getActive()) {
            image(this.#img, this.getX() + 7, this.getY() + 7, this.getWidth() - 15, this.getHeight() - 15);
        }
    }
}