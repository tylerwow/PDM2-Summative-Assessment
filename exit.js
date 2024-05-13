class Exit extends GameObject {
    #destination;
    #isHorizontal;
    
    constructor(x, y, width, height, destination, isHorizontal) {
        super(x, y, width, height);
        this.#destination = destination;
        this.#isHorizontal = isHorizontal;
    }

    getDestination() {
        return this.#destination;
    }

    getIsHorizontal() {
        return this.#isHorizontal;
    }

    getIsDoor() {
        return false;
    }
}

class Door extends Exit {
    #isLocked;
    #tpX;
    #tpY;
    
    constructor(x, y, width, height, destination, tpX, tpY, isLocked) {
        super(x, y, width, height, destination);
        this.#tpX = tpX;
        this.#tpY = tpY;
        this.#isLocked = isLocked;
    }

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

    getIsDoor() {
        return true;
    }

    unlockDoor() {
        this.#isLocked = false;
    }

    getIsLocked() {
        return this.#isLocked;
    }

    getTpX() {
        return this.#tpX;
    }

    getTpY() {
        return this.#tpY;
    }
}