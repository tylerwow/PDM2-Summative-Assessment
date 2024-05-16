class GUI {
    #imgGun;
    #imgKey;
    #imgAmmo;
    
    /**
     * Creates GUI object and loads images
     */
    constructor() {
        this.#imgGun = loadImage("assets/Gun.png");
        this.#imgKey = loadImage("assets/Key.png");
        this.#imgAmmo = loadImage("assets/Ammo.png");
    }

    /**
     * Draws GUI on canvas
     * @param {object} player Player object to retrieve variables
     * @param {number} bulletCount Count of bullets in magazine
     */
    draw(player, bulletCount) {

        //HP bar
        strokeWeight(2);
        fill(50, 50, 50);
        stroke(50, 50, 50);
        rect(10, height - 40, 200, 30);

        fill(138, 212, 42);
        stroke(50, 50, 50);
        rect(10, height - 40, player.getHp() * 2, 30);

        fill(255)
        noStroke();
        textSize(20);
        text(player.getHp() + " / 100", 18, height - 18);

        //Inventory
        noFill();
        strokeWeight(2);
        stroke(255, 200);

        //Gun
        rect(width - 60, height - 60, 50, 50);
        if (player.getHasGun()) {
            image(this.#imgGun, width - 55, height - 55, 40, 40);

            //Ammo (placeholder)
            noStroke();
            fill(255);
            textSize(20);
            text(bulletCount + ' / ∞', 140, height - 50);
            image(this.#imgAmmo, 190, height - 67, 20, 20);
        }

        //Key
        strokeWeight(2);
        stroke(255, 200);
        noFill();
        rect(width - 120, height - 60, 50, 50);
        if (player.getHasKey()) {
            image(this.#imgKey, width - 115, height - 55, 40, 40);
        }
    }

    /**
     * Draws movement controls on screen
     */
    drawMovementTutorial() {
        noStroke();
        fill(255);
        textSize(20);
        textAlign(CENTER);
        text('[WASD] to move', width / 2, 50);
        textAlign(LEFT);
    }

    /**
     * Draws gun controls on screen
     */
    drawGunTutorial() {
        noStroke();
        fill(255);
        textSize(20);
        textAlign(CENTER);
        text('Aim and click to shoot', width / 2, 50);
        textAlign(LEFT);
    }

    /**
     * Draws reload controls on screen
     */
    drawReloadTutorial() {
        noStroke();
        fill(255);
        textSize(20);
        textAlign(CENTER);
        text('[R] to reload', width / 2, 50);
        textAlign(LEFT);
    }

    /**
     * Draws reload indicator under mouse position
     * @param {number} reloadTime Time that has passed reloading 
     */
    drawReloading(reloadTime) {
        noStroke();
        fill(0, 100);
        rect(mouseX - 15, mouseY + 20, 30, 5);

        fill(255);
        rect(mouseX - 15, mouseY + 20, reloadTime / 2, 5);
    }
}