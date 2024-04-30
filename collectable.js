class Collectable extends GameObject {
    constructor(x, y) {
        super(x, y, width, height);
        this.setRectangle(50, 50);
    }

    collect(other) {
        if (keyIsDown(69) && this.hit(other) && this.getActive()) {
            console.log('collected');
            this.deactivate();
            return true;
        }
        return false;
    }
}

class Medkit extends Collectable {
    #img;
    
    constructor(x, y) {
        super(x, y, width, height);
        this.#img = loadImage('assets/Medkit.png');
    }
    
    draw() {
        //this.drawRect();
        if (this.getActive()) {
            image(this.#img, this.getX() + 5, this.getY() + 5, this.getWidth() - 10, this.getHeight() - 15);
        }
    }
}

class Key extends Collectable {
    #img;
    
    constructor(x, y) {
        super(x, y, width, height);
        this.#img = loadImage('assets/Key.png');
    }
    
    draw() {
        //this.drawRect();
        if (this.getActive()) {
            image(this.#img, this.getX() + 7, this.getY() + 7, this.getWidth() - 15, this.getHeight() - 15);
        }
    }
}