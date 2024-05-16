class Bullet extends GameObject {
    #mx;
    #my;
    #yRatio;
    #xRatio;
    #yDif;
    #xDif;
    #xSpeed;
    #ySpeed;
    #dist;

    /**
     * Creates bullet object and sets x and y speeds
     * @param {number} x Bullet x position 
     * @param {number} y Bullet y position
     * @param {number} width Bullet width 
     * @param {number} height Bullet height 
     * @param {number} mx Mouse x position
     * @param {number} my Mouse y position
     */
    constructor(x, y, width, height, mx, my) {
        super(x, y, width, height);
        this.#mx = mx;
        this.#my = my;

        this.#xDif = this.#mx - this.getX();
        this.#yDif = this.#my - this.getY();

        /** * This code uses an example from the MDN web docs *
        * Author: Mozilla (author name unknown)
        * URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
        * Accessed: 15/05/2024 */
        this.#dist = sqrt(this.#xDif * this.#xDif + this.#yDif * this.#yDif);

        this.#xRatio = this.#xDif / this.#dist;
        this.#yRatio = this.#yDif / this.#dist;

        this.#xSpeed = this.#xRatio * 5;
        this.#ySpeed = this.#yRatio * 5;

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    /**
     * Draws bullet object on canvas
     */
    draw() {
        if (this.getActive()) {
            ellipseMode(CORNER);
            strokeWeight(1);
            stroke(0);
            fill(252, 210, 71);
            circle(this.getX(), this.getY(), 8);
        }
    }

    /**
     * Moves bullet object to mouse position
     */
    move() {
        this.setX(this.getX() + this.#xSpeed);
        this.setY(this.getY() + this.#ySpeed);
    }
}