class Wall extends GameObject {
    /**
     * Creates wall object
     * @param {number} x Wall x position 
     * @param {number} y Wall y position
     * @param {number} width Wall width
     * @param {number} height Wall height
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.setRectangle(this.getWidth(), this.getHeight());
    }
}