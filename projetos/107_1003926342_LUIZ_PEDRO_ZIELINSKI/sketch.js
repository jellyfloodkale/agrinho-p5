
let flores = [];

function setup() {
    createCanvas(800, 600);
    background(135, 206, 250); // Céu azul
}

function draw() {
    drawCampo();
    for (let i = 0; i < flores.length; i++) {
        drawFlor(flores[i].x, flores[i].y);
    }
}

function mousePressed() {
    flores.push({ x: mouseX, y: mouseY });
}

function drawCampo() {
    fill(34, 139, 34); // Cor do campo
    rect(0, height - 100, width, 100); // Campo
}

function drawFlor(x, y) {
    fill(255, 0, 255); // Cor da flor
    ellipse(x, y, 20, 20); // Cabeça da flor
    fill(139, 69, 19); // Cor do caule
    rect(x - 2, y + 10, 4, 30); // Caule
}