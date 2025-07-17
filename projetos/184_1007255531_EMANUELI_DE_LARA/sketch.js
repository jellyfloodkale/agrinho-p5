function setup() {
  createCanvas(800, 400);
}

function draw() {
  let divider = map(mouseX, 0, width, 100, width - 100);

  background(135, 206, 235); // Céu azul

  // ----- Campo -----
  drawField(0, divider);

  // ----- Cidade -----
  drawCity(divider, width);

  // Linha divisória
  stroke(0);
  strokeWeight(4);
  line(divider, 0, divider, height);
}

function drawField(xStart, xEnd) {
  // Céu e chão
  noStroke();
  fill(34, 139, 34);
  rect(xStart, height / 2, xEnd - xStart, height / 2);

  // Árvores
  for (let x = xStart + 50; x < xEnd; x += 100) {
    drawTree(x, height / 2 - 20);
  }

  // Sol
  fill(255, 204, 0);
  ellipse(xStart + 80, 80, 60, 60);

  // Pássaros
  fill(0);
  for (let i = 0; i < 3; i++) {
    let bx = xStart + 150 + i * 60;
    let by = 100 + sin(frameCount * 0.05 + i) * 10;
    arc(bx, by, 20, 10, PI, 0);
    arc(bx + 20, by, 20, 10, PI, 0);
  }
}

function drawTree(x, y) {
  // Tronco
  fill(101, 67, 33);
  rect(x - 5, y, 10, 40);

  // Copa
  fill(34, 139, 34);
  ellipse(x, y, 40, 40);
}

function drawCity(xStart, xEnd) {
  // Céu e chão
  noStroke();
  fill(169, 169, 169);
  rect(xStart, height / 2, xEnd - xStart, height / 2);

  // Prédios
  for (let x = xStart + 20; x < xEnd; x += 60) {
    let buildingHeight = random(100, 180);
    fill(80);
    rect(x, height / 2 - buildingHeight, 50, buildingHeight);

    // Janelas
    for (let wx = x + 5; wx < x + 45; wx += 15) {
      for (let wy = height / 2 - buildingHeight + 10; wy < height / 2; wy += 20) {
        fill(255, 255, 0);
        rect(wx, wy, 8, 10);
      }
    }
  }

  // Carros
  let carY = height / 2 + 30;
  for (let i = 0; i < 3; i++) {
    let carX = (frameCount * (2 + i)) % (xEnd - xStart) + xStart;
    drawCar(carX, carY + i * 40);
  }

  // Poluição (nuvens de fumaça)
  fill(120, 120, 120, 150);
  ellipse(xStart + 100 + sin(frameCount * 0.02) * 10, 80, 60, 40);
  ellipse(xStart + 200 + cos(frameCount * 0.02) * 10, 60, 70, 50);
}

function drawCar(x, y) {
  fill(255, 0, 0);
  rect(x, y, 40, 20);
  fill(0);
  ellipse(x + 8, y + 20, 10, 10);
  ellipse(x + 32, y + 20, 10, 10);
}
