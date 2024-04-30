//TODO: Fix issue with bullet speed
class Bullet extends GameObject {
    #mx;
    #my;
    #yDif;
    #xDif;

    constructor(x, y, width, height, mx, my) {
        super(x, y, width, height);
        this.#mx = mx;
        this.#my = my;

        this.#xDif = this.#mx - this.getX();
        this.#yDif = this.#my - this.getY();

        console.log(this.#xDif, this.#yDif)

        if (this.#xDif >= this.#yDif && this.#xDif > 0) {
            this.#yDif = this.#yDif / this.#xDif * 5;
            this.#xDif = 5;
        }
        if (this.#yDif >= this.#xDif && this.#yDif > 0) {
            this.#xDif = this.#xDif / this.#yDif * 5;
            this.#yDif = 5;
        }
        if (this.#xDif <= this.#yDif && this.#xDif < 0) {
            this.#yDif = this.#yDif / this.#xDif * -5;
            this.#xDif = -5;
        }
        if (this.#yDif <= this.#xDif && this.#yDif < 0) {
            this.#xDif = this.#xDif / this.#yDif * -5;
            this.#yDif = -5;
        }

        console.log(this.#xDif, this.#yDif);

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    draw() {
        //this.drawRect();

        if (this.getActive()) {
            ellipseMode(CORNER);
            strokeWeight(1);
            stroke(0);
            fill(252, 210, 71);
            circle(this.getX(), this.getY(), 8);
        }
    }

    move() {
        this.setX(this.getX() + this.#xDif);
        this.setY(this.getY() + this.#yDif);
    }
}