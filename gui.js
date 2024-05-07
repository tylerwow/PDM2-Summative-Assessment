class GUI {
    #imgGun;
    #imgKey;
    #imgAmmo;
    
    constructor() {
        this.#imgGun = loadImage("assets/Gun.png");
        this.#imgKey = loadImage("assets/Key.png");
        this.#imgAmmo = loadImage("assets/Ammo.png");
    }

    draw(hp, hasGun, hasKey) {

        //HP bar
        strokeWeight(2);
        fill(50, 50, 50);
        stroke(50, 50, 50);
        rect(10, height - 40, 200, 30);

        fill(138, 212, 42);
        stroke(50, 50, 50);
        rect(10, height - 40, hp * 2, 30);

        fill(255)
        noStroke();
        textSize(20);
        text(hp + " / 100", 18, height - 18);

        //Inventory
        noFill();
        strokeWeight(2);
        stroke(255, 200);

        //Gun
        rect(width - 60, height - 60, 50, 50);
        if (hasGun) {
            image(this.#imgGun, width - 55, height - 55, 40, 40);

            //Ammo (placeholder)
            noStroke();
            fill(255);
            textSize(20);
            text('8 / ∞', 140, height - 50);
            image(this.#imgAmmo, 190, height - 67, 20, 20);
        }

        //Key
        strokeWeight(2);
        stroke(255, 200);
        noFill();
        rect(width - 120, height - 60, 50, 50);
        if (hasKey) {
            image(this.#imgKey, width - 115, height - 55, 40, 40);
        }
    }
}