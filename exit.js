class Exit extends GameObject {
    #destination;
    #isHorizontal;
    
    /**
     * Creates exit object
     * @param {*} x Exit x position
     * @param {*} y Exit y position
     * @param {*} width Exit width
     * @param {*} height Exit height
     * @param {*} destination Room which exit leads to
     * @param {*} isHorizontal Determines if player goes through exit horizontally or vertically
     */
    constructor(x, y, width, height, destination, isHorizontal) {
        super(x, y, width, height);
        this.#destination = destination;
        this.#isHorizontal = isHorizontal;
    }

    /**
     * Gets destination
     * @returns {number}
     */
    getDestination() {
        return this.#destination;
    }

    /**
     * Gets isHorizontal
     * @returns {boolean}
     */
    getIsHorizontal() {
        return this.#isHorizontal;
    }

    /**
     * Checks if exit is door
     * @returns {boolean}
     */
    getIsDoor() {
        return false;
    }
}

class Door extends Exit {
    #isLocked;
    #tpX;
    #tpY;
    
    /**
     * Creates door object
     * @param {*} x Door x position
     * @param {*} y Door y position
     * @param {*} width Door width
     * @param {*} height Door height
     * @param {*} destination Room which door leads to
     * @param {*} tpX Sets players x position
     * @param {*} tpY Sets players y position
     * @param {*} isLocked Is door locked or not
     */
    constructor(x, y, width, height, destination, tpX, tpY, isLocked) {
        super(x, y, width, height, destination);
        this.#tpX = tpX;
        this.#tpY = tpY;
        this.#isLocked = isLocked;
    }

    /**
     * Checks players position, and displays respective text.
     * Allows the player to unlock door when they have a key.
     * @param {object} player 
     * @returns {boolean}
     */
    open(player) {
        if (this.hit(player) && this.#isLocked && !player.getHasKey()) {
            noStroke();
            textSize(15);
            fill(255);
            text('Door is locked', this.getX() - 20, this.getY() - 15);
        }
        else if (this.hit(player) && this.#isLocked && player.getHasKey()) {
            noStroke();
            textSize(15);
            fill(255);
            text('Unlock (E)', this.getX() - 8, this.getY() - 15);
            if (keyIsDown(69)) {
                player.hasNoKey();
                this.unlockDoor();
            }
        }
        else if (this.hit(player) && !this.#isLocked) {
            return true;
        }

        return false;
    }

    /**
     * Checks if door is door
     * @returns {boolean}
     */
    getIsDoor() {
        return true;
    }

    /**
     * Unlocks door
     */
    unlockDoor() {
        this.#isLocked = false;
    }

    /**
     * Returns if door is locked
     * @returns {boolean}
     */
    getIsLocked() {
        return this.#isLocked;
    }

    /**
     * Gets destination x position
     * @returns {number}
     */
    getTpX() {
        return this.#tpX;
    }

    /**
     * Gets destination y position
     * @returns {number}
     */
    getTpY() {
        return this.#tpY;
    }
}