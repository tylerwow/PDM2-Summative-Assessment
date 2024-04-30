class GameObject {
    #x;
    #y;
    #width;
    #height;
    #isActive;

    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#isActive = true;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getActive() {
        return this.#isActive;
    }

    setX(newX) {
        this.#x = newX;
    }

    setY(newY) {
        this.#y = newY;
    }

    deactivate() {
        this.#isActive = false;
    }

    setRectangle(newWidth, newHeight) {
        this.#width = newWidth;
        this.#height = newHeight;
    }

    hit(other) {
        if (this.#x + this.#width >= other.getX()
            && this.#x <= other.getX() + other.getWidth()
            && this.#y + this.#height >= other.getY()
            && this.#y <= other.getY() + other.getHeight()) {
                return true;
            }
        return false;
    }

    drawRect() {
        strokeWeight(2);
        stroke(204, 0, 204);
        noFill();
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
    }
}