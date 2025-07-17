let sunY = 100;
let tractorX = 0;
let cowX = 300;
let waveOffset = 0;

function setup() {
  let canvas = createCanvas(800, 300);
  let container = document.getElementById('p5-container');
  if (container) {
    canvas.parent(container);
  } else {
    canvas.parent(document.body);
  }
}

function draw() {
  background('#87CEEB'); // céu azul
  fill('yellow');
  noStroke();
  ellipse(700, sunY, 80, 80);
  fill('#A9DFBF');
  triangle(0, 200, 150, 50, 300, 200);
  triangle(200, 200, 350, 70, 500, 200);
  triangle(400, 200, 550, 90, 700, 200);
  fill('#228B22');
  rect(0, 200, width, 100);
  stroke('#006400');
  for (let x = 0; x < width; x += 10) {
    let y = 200 + sin(x * 0.1 + waveOffset) * 5;
    line(x, y, x, y + 15);
  }
  waveOffset += 0.05;
  fill('#FF5733');
  rect(tractorX, 180, 40, 20);
  fill('black');
  ellipse(tractorX + 10, 200, 10, 10);
  ellipse(tractorX + 30, 200, 10, 10);
  tractorX += 1;
  if (tractorX > width) tractorX = -40;
  fill('white');
  rect(cowX, 180, 30, 20);
  fill('black');
  ellipse(cowX + 5, 185, 5, 5);
  ellipse(cowX + 20, 190, 5, 5);
  cowX -= 0.5;
  if (cowX < -30) cowX = width + 30;
}
