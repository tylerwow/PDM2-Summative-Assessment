class GUI {
    constructor() {}

    draw(hp) {
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
    }
}