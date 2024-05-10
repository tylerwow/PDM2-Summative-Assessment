class Exit extends GameObject {
    #destination;
    
    constructor(x, y, width, height, destination) {
        super(x, y, width, height);
        this.#destination = destination;
    }

    getDestination() {
        return this.#destination;
    }
}