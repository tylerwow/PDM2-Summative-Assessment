class Wall extends GameObject {
    #isHittable;

    constructor(x, y, width, height, isHittable) {
        super(x, y, width, height);
        this.#isHittable = isHittable;

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    draw() {
        noStroke();
        fill(40, 40, 40);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    //Wall collision (needs some work still)
    collide(other) {
        if (this.#isHittable) {
            if (other.getX() < this.getX() && this.hit(other)) {
                other.setX(other.getX() - other.getSpeed());
            }
            if (other.getX() > this.getWidth() && this.hit(other)) {
                other.setX(other.getX() + other.getSpeed());
            }
            if (other.getY() < this.getY() && this.hit(other)) {
                other.setY(other.getY() - other.getSpeed());
            }
            if (other.getY() > this.getHeight() && this.hit(other)) {
                other.setY(other.getY() + other.getSpeed());
            }
        }
    }
}