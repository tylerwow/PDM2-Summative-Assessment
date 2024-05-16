class GameObject {
    #x;
    #y;
    #width;
    #height;
    #isActive;

    /**
     * Creates new game object
     * @param {number} x X position of the game object
     * @param {number} y Y position of the game object
     * @param {number} width Width of the game object
     * @param {number} height Height of the game object
     */
    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#isActive = true;
    }

    /**
     * Returns x coordinate
     * @returns {number} 
     */
    getX() {
        return this.#x;
    }

    /**
     * Returns y coordinate
     * @returns {number}
     */
    getY() {
        return this.#y;
    }

    /**
     * Returns width
     * @returns {number}
     */
    getWidth() {
        return this.#width;
    }

    /**
     * Returns height
     * @returns {number}
     */
    getHeight() {
        return this.#height;
    }

    /**
     * Returns if game object is active
     * @returns {boolean}
     */
    getActive() {
        return this.#isActive;
    }

    /**
     * Sets new x position
     * @param {number} newX 
     */
    setX(newX) {
        this.#x = newX;
    }

    /**
     * Sets new y position
     * @param {number} newY 
     */
    setY(newY) {
        this.#y = newY;
    }

    /**
     * Activates game object
     */
    activate() {
        this.#isActive = true;
    }

    /**
     * Deactivates game object
     */
    deactivate() {
        this.#isActive = false;
    }

    /**
     * Sets collision rectangle
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    setRectangle(newWidth, newHeight) {
        this.#width = newWidth;
        this.#height = newHeight;
    }

    /**
     * Checks if two objects are hitting
     * @param {object} other Object that is being checked
     * @returns {boolean} True if objects are hitting, false if they are not
     */
    hit(other) {
        if (this.#x + this.#width >= other.getX()
            && this.#x <= other.getX() + other.getWidth()
            && this.#y + this.#height >= other.getY()
            && this.#y <= other.getY() + other.getHeight()) {
                return true;
            }
        return false;
    }

    /**
     * Causes two objects to collide
     * @param {object} other Object that is being checked 
     */
    collide(other) {
        if (other.getX() < this.getX() && this.hit(other)) {
            other.setX(other.getX() - other.getSpeed());
        }
        if (other.getX() > this.getX() + this.getWidth() - 2 && this.hit(other)) {
            other.setX(other.getX() + other.getSpeed());
        }
        if (other.getY() < this.getY() && this.hit(other)) {
            other.setY(other.getY() - other.getSpeed());
        }
        if (other.getY() > this.getY() + this.getHeight() - 2 && this.hit(other)) {
            other.setY(other.getY() + other.getSpeed());
        }
    }

    /**
     * Draws the collision rect
     */
    drawRect() {
        strokeWeight(2);
        stroke(204, 0, 204);
        noFill();
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
    }
}