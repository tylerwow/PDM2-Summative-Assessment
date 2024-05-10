class Collectable extends GameObject {
    constructor(x, y) {
        super(x, y, width, height);
        this.setRectangle(50, 50);
    }

    collect(other) {
        if (this.hit(other) && this.getActive()) {
            noStroke();
            textSize(15);
            fill(255);
            text('Take (E)', this.getX() - 3, this.getY() - 5);
            if (keyIsDown(69)) {
                this.deactivate();
                return true;
            }
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

    collect(other) {
        if (this.hit(other) && this.getActive()) {
            noStroke();
            textSize(15);
            fill(255);
            text('Heal (E)', this.getX() - 3, this.getY() - 5);
            if (keyIsDown(69)) {
                this.deactivate();
                return true;
            }
        }
        return false;
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

// GUN ICON FROM:
// https://iconduck.com/emojis/141685/gun


class Gun extends Collectable {
    #img;

    constructor(x, y) {
        super(x, y, width, height);
        this.#img = loadImage('assets/Gun.png');
    }
    
    draw() {
        //this.drawRect();
        if (this.getActive()) {
            image(this.#img, this.getX() + 7, this.getY() + 7, this.getWidth() - 15, this.getHeight() - 15);
        }
    }
}