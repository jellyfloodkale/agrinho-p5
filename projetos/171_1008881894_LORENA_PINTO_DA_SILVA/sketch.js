let cars = [];
let cloudX = 0;
let birdX = 0;

let isDay = true;

function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);

  // Inicializa carros com posições e cores variadas
  for (let i = 0; i < 3; i++) {
    cars.push({
      x: random(-500, -300), // Mudando a posição inicial para espaçar mais os carros
      color: color(random(100, 255), random(100, 255), random(100, 255)),
      speed: random(1.5, 3),
      size: random(30, 50),
      // Adiciona a carreta
      cart: {
        xOffset: random(50, 100), // posição relativa da carreta
        size: random(30, 50), // tamanho da carreta
      }
    });
  }
}

function draw() {
  // Alternância entre dia e noite
  let cycle = frameCount % 1200; // 0–1199
  isDay = cycle < 600;

  // Fundo
  if (isDay) {
    background(135, 206, 235); // céu azul
  } else {
    background(25, 25, 112); // céu noturno
  }

  drawSkyObjects(cycle);
  drawNuvem(cloudX, 60);
  drawNuvem(cloudX + 200, 100);
  drawNuvem(cloudX + 400, 70);

  drawCampo();
  drawCidade();
  drawEstrada();

  // Carros e suas carretas
  for (let car of cars) {
    drawCar(car.x, car.color, car.size);
    drawCart(car.x + car.cart.xOffset, car.cart.size);  // Desenha a carreta

    // Adiciona frutas/legumes à carreta
    drawFruits(car.x + car.cart.xOffset, car.cart.size);

    car.x += car.speed;
    if (car.x > width + 50) car.x = -random(100, 300);
  }

  drawBird(birdX, 150);
  birdX += 1.2;
  if (birdX > width + 20) birdX = -30;

  cloudX += 0.5;
  if (cloudX > width + 100) cloudX = -200;
}

// 🌤️ Sol e Lua se movendo
function drawSkyObjects(cycle) {
  let angle = map(cycle, 0, 1200, 0, 360);
  let x = map(angle, 0, 360, 0, width);
  let y = 100 - 50 * sin(angle);

  if (isDay) {
    fill(255, 204, 0);
    noStroke();
    ellipse(x, y, 60, 60); // Sol
  } else {
    fill(255, 255, 224);
    noStroke();
    ellipse(x, y, 40, 40); // Lua
  }
}

// ☁️ Nuvem
function drawNuvem(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 40, 40);
  ellipse(x + 20, y + 10, 50, 50);
  ellipse(x + 40, y, 40, 40);
}

// 🚗 Carro estilizado
function drawCar(x, c, size) {
  fill(c);
  rect(x, 290, size, 20);
  fill(0);
  ellipse(x + 10, 310, 10);
  ellipse(x + size - 10, 310, 10);
}

// 🚚 Carreta (com fruta desenhada)
function drawCart(x, size) {
  fill(150, 75, 0); // cor da carreta (marrom)
  rect(x, 290, size, 20);
  fill(0);
  ellipse(x + 10, 310, 10);
  ellipse(x + size - 10, 310, 10);
}

// 🍎 Fruta desenhada na carreta (maçã)
function drawFruits(x, cartSize) {
  // Maçã
  drawApple(x + 10, 290);

  // Cenoura
  drawCarrot(x + cartSize - 30, 290);

  // Banana
  drawBanana(x + 20, 290);
}

// 🍏 Maçã desenhada
function drawApple(x, y) {
  fill(255, 0, 0); // Cor da maçã
  ellipse(x, y - 10, 20, 20); // Corpo da maçã
  fill(0, 255, 0); // Cor da folha
  triangle(x - 5, y - 20, x + 5, y - 20, x, y - 25); // Folha
}

// 🥕 Cenoura desenhada
function drawCarrot(x, y) {
  fill(255, 165, 0); // Cor da cenoura
  triangle(x, y, x - 5, y + 20, x + 5, y + 20); // Corpo da cenoura
  fill(0, 255, 0); // Cor das folhas
  rect(x - 3, y - 10, 6, 10); // Folhas
}

// 🍌 Banana desenhada
function drawBanana(x, y) {
  fill(255, 255, 0); // Cor da banana
  beginShape();
  vertex(x, y);
  bezierVertex(x + 10, y - 10, x + 20, y - 10, x + 30, y); // Forma da banana
  bezierVertex(x + 20, y + 10, x + 10, y + 10, x, y); 
  endShape(CLOSE);
}

// 🐦 Pássaro
function drawBird(x, y) {
  fill(0);
  ellipse(x, y, 10, 6);
  triangle(x - 5, y, x - 15, y - 5, x - 5, y - 2);
}

// 🌳 Campo
function drawCampo() {
  fill(34, 139, 34);
  rect(0, 250, width / 2, 150);

  fill(60, 179, 113);
  ellipse(100, 300, 200, 100);
  ellipse(250, 300, 300, 120);

  for (let i = 50; i < 350; i += 100) {
    drawArvore(i, 230);
  }
}

function drawArvore(x, y) {
  fill(139, 69, 19);
  rect(x, y, 10, 30);
  fill(34, 139, 34);
  ellipse(x + 5, y - 10, 40, 40);
}

// 🏙️ Cidade
function drawCidade() {
  fill(200);
  rect(width / 2, 250, width / 2, 150);

  for (let i = 420; i < width; i += 60) {
    let h = 140 + sin(frameCount * 0.01 + i) * 20;
    fill(100);
    rect(i, 250 - h, 40, h);
    if (isDay) {
      fill(255, 255, 0); // luzes apagadas
    } else {
      fill(255, 255, 150); // luzes acesas
    }
    for (let y = 250 - h + 10; y < 250; y += 20) {
      rect(i + 10, y, 5, 10);
      rect(i + 25, y, 5, 10);
    }
  }
}

// 🛣️ Estrada
function drawEstrada() {
  noStroke();
  fill(50);
  beginShape();
  vertex(0, 300);
  bezierVertex(200, 320, 600, 280, width, 300);
  vertex(width, 320);
  bezierVertex(600, 300, 200, 340, 0, 320);
  endShape(CLOSE);

  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < width; i += 20) {
    let y = bezierPoint(300, 320, 280, 300, i / width);
    line(i, y, i + 10, y);
  }
}
