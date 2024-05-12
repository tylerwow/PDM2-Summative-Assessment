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
}

class Door extends Exit {
    
}