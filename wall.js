class Wall extends GameObject {

    constructor(x, y, width, height, isHittable) {
        super(x, y, width, height);

        this.setRectangle(this.getWidth(), this.getHeight());
    }

    //Wall collision (needs some work still)
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
}