function setup() {
  createCanvas(800, 400);
  noLoop();
}

function draw() {
  background(135, 206, 235); // Céu azul

  // --- Céu ---
  drawSun(100, 80);
  drawClouds();

  // --- Solo verde (grama) ---
  drawGrass();

  // --- Parte Rural: Fazenda ---
  drawField(0, width / 2);
  drawBarn(60, 220);
  drawTractor(150, 300);
  drawAnimals();

  // --- Parte Urbana: Prédios ---
  drawCity(width / 2, width);

  // --- Estrada ---
  drawRoad();
}

// ===== Céu =====

function drawSun(x, y) {
  fill(255, 204, 0);
  ellipse(x, y, 80, 80);
}

function drawClouds() {
  drawCloud(150, 80);
  drawCloud(400, 60);
  drawCloud(650, 100);
}

function drawCloud(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 40, 40);
  ellipse(x + 20, y - 10, 50, 50);
  ellipse(x + 40, y, 40, 40);
}

// ===== Solo =====

function drawGrass() {
  fill(34, 139, 34);
  rect(0, height / 2, width, height / 2);
}

function drawField(xStart, xEnd) {
  fill(210, 180, 140);
  for (let x = xStart; x < xEnd; x += 40) {
    rect(x, height / 2 + 50, 30, 100);
  }
}

// ===== Fazenda e Animais =====

function drawBarn(x, y) {
  fill(178, 34, 34);
  rect(x, y, 80, 60);
  fill(139, 0, 0);
  triangle(x - 10, y, x + 40, y - 40, x + 90, y);
  fill(255);
  rect(x + 30, y + 20, 20, 30);
}

function drawTractor(x, y) {
  fill(255, 0, 0);
  rect(x, y - 20, 60, 20);
  rect(x + 20, y - 40, 30, 20);
  fill(0);
  ellipse(x + 10, y, 20, 20);
  ellipse(x + 50, y, 20, 20);
}

function drawAnimals() {
  drawCow(100, 320);
  drawCow(250, 310);
  drawChicken(160, 340);
  drawChicken(280, 345);
}

function drawCow(x, y) {
  fill(255);
  ellipse(x, y, 40, 20);
  ellipse(x + 25, y - 5, 15, 15);
  fill(0);
  ellipse(x - 10, y, 8, 5);
  ellipse(x + 5, y + 5, 5, 5);
  stroke(0);
  line(x - 10, y + 10, x - 10, y + 20);
  line(x + 10, y + 10, x + 10, y + 20);
  noStroke();
}

function drawChicken(x, y) {
  fill(255);
  ellipse(x, y, 15, 15);
  ellipse(x + 8, y - 5, 8, 8);
  fill(255, 165, 0);
  triangle(x + 12, y - 5, x + 16, y - 3, x + 12, y - 1);
  stroke(255, 165, 0);
  line(x - 3, y + 8, x - 3, y + 13);
  line(x + 3, y + 8, x + 3, y + 13);
  noStroke();
}

// ===== Cidade =====

function drawCity(xStart, xEnd) {
  for (let x = xStart + 20; x < xEnd; x += 60) {
    let h = random(100, 180);
    fill(100);
    rect(x, height / 2 - h + 50, 40, h);
    fill(255, 255, 100);
    for (let wy = height / 2 - h + 60; wy < height / 2 + 40; wy += 20) {
      for (let wx = x + 5; wx < x + 35; wx += 15) {
        rect(wx, wy, 8, 10);
      }
    }
  }
}

// ===== Estrada =====

function drawRoad() {
  fill(50);
  rect(0, height - 80, width, 60);
  stroke(255);
  strokeWeight(4);
  for (let x = 0; x < width; x += 40) {
    line(x, height - 50, x + 20, height - 50);
  }
  noStroke();
}
