let truck;
let obstacles = [];
let bgX = 0;
let score = 0;
let gameState = "start";
let retryButton, startButton, newDeliveryButton;
let upButton, downButton;
let bgSpeed = 3;
let countdown = 3;
let countdownActive = false;

function setup() {
  createCanvas(800, 400);
  truck = new Truck();

  startButton = createButton("Iniciar");
  startButton.position(width / 2 - 60, height / 2);
  startButton.mousePressed(startCountdown);

  retryButton = createButton("Tentar novamente");
  retryButton.position(width / 2 - 60, height / 2 + 40);
  retryButton.mousePressed(() => {
    resetGame();
    startCountdown();
  });
  retryButton.hide();

  newDeliveryButton = createButton("Fazer nova entrega");
  newDeliveryButton.position(width / 2 - 80, height / 2 + 50);
  newDeliveryButton.mousePressed(startNewDelivery);
  newDeliveryButton.hide();

  upButton = createButton("↑");
  upButton.position(700, 300);
  upButton.mousePressed(() => truck.moveUp());
  upButton.hide();

  downButton = createButton("↓");
  downButton.position(700, 340);
  downButton.mousePressed(() => truck.moveDown());
  downButton.hide();
}

function draw() {
  background(135, 206, 250);
  drawBackground();

  if (gameState === "start") {
    drawStartMessage();
    return;
  }

  if (countdownActive) {
    drawCountdown();
    return;
  }

  if (gameState === "play") {
    truck.update();
    truck.show();

    if (frameCount % 150 === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].move();
      obstacles[i].show();

      if (obstacles[i].hits(truck)) {
        gameState = "gameover";
        retryButton.show();
        upButton.hide();
        downButton.hide();
      } else if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    bgX -= bgSpeed;
    if (bgX <= -2400) {
      gameState = "delivered";
      retryButton.hide();
      upButton.hide();
      downButton.hide();
      newDeliveryButton.show();
    }
  }

  drawHUD();

  if (gameState === "gameover") {
    showGameOverMessage();
  } else if (gameState === "delivered") {
    showDeliveredMessage();
  }
}

function startCountdown() {
  countdown = 3;
  countdownActive = true;
  startButton.hide();

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownActive = false;
      gameState = "play";
      upButton.show();
      downButton.show();
    }
  }, 1000);
}

function drawCountdown() {
  fill(0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text(countdown, width / 2, height / 2);
}

function drawStartMessage() {
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Bem-vindo ao jogo!", width / 2, height / 2 - 40);
}

function drawHUD() {
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text(`Entregas concluídas: ${score}`, 10, 25);
  if (gameState === "play") {
    text("Use os botões ou ↑ ↓ para dirigir. Leve o leite até a cidade!", 10, 45);
  }
}

function showDeliveredMessage() {
  fill(0, 200, 0);
  textSize(32);
  textAlign(CENTER);
  text("Entrega concluída! Cidade abastecida!", width / 2, height / 2);
}

function showGameOverMessage() {
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER);
  text("Você bateu! Tente novamente!", width / 2, height / 2);
}

function resetGame() {
  truck = new Truck();
  obstacles = [];
  bgX = 0;
  gameState = "start";
  retryButton.hide();
  upButton.hide();
  downButton.hide();
  newDeliveryButton.hide();
}

function startNewDelivery() {
  truck = new Truck();
  obstacles = [];
  bgX = 0;
  score++;
  gameState = "play";
  newDeliveryButton.hide();
  upButton.show();
  downButton.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) truck.moveUp();
  if (keyCode === DOWN_ARROW) truck.moveDown();
  if (key === 'r') {
    resetGame();
    startCountdown();
  }
}

class Truck {
  constructor() {
    this.x = 100;
    this.y = 320;
    this.w = 60;
    this.h = 30;
  }

  update() {
    this.y = constrain(this.y, 250, 380 - this.h);
  }

  moveUp() {
    this.y -= 5;
  }

  moveDown() {
    this.y += 5;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    ellipse(this.x + 10, this.y + this.h, 15, 15);
    ellipse(this.x + this.w - 10, this.y + this.h, 15, 15);
    fill(255);
    for (let i = 0; i < 3; i++) {
      rect(this.x + 5 + i * 18, this.y - 15, 12, 15, 3);
    }
    fill(0);
    textSize(10);
    textAlign(CENTER);
    text("300L", this.x + this.w / 2, this.y - 20);
  }
}

class Obstacle {
  constructor() {
    this.x = width;
    this.y = random(290, 370);
    this.w = 30;
    this.h = 15;
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x -= 4;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    ellipse(this.x + 5, this.y + this.h, 8, 8);
    ellipse(this.x + this.w - 5, this.y + this.h, 8, 8);
  }

  hits(truck) {
    let hit = !(this.x + this.w < truck.x || this.x > truck.x + truck.w || this.y + this.h < truck.y || this.y > truck.y + truck.h);
    return hit;
  }

  offscreen() {
    return this.x + this.w < 0;
  }
}

function drawBackground() {
  push();
  translate(bgX, 0);
  drawFarm(0);
  for (let i = 0; i < 4; i++) drawRoad(i * 800);
  drawCity(2400);
  pop();
}

function drawFarm(x) {
  fill(34, 139, 34);
  rect(x, 300, 800, 100);

  // Celeiro realista
  fill(178, 34, 34);
  rect(x + 60, 180, 100, 120);
  fill(139, 0, 0);
  triangle(x + 60, 180, x + 110, 120, x + 160, 180);

  fill(255);
  rect(x + 95, 240, 30, 60);
  line(x + 95, 270, x + 125, 270);
  line(x + 110, 240, x + 110, 300);

  fill(255);
  rect(x + 75, 200, 20, 20);
  rect(x + 125, 200, 20, 20);
  stroke(0);
  line(x + 75, 210, x + 95, 210);
  line(x + 85, 200, x + 85, 220);
  line(x + 125, 210, x + 145, 210);
  line(x + 135, 200, x + 135, 220);
  noStroke();

  fill(139, 69, 19);
  for (let i = 0; i < 200; i += 20) {
    rect(x + 200 + i, 260, 5, 40);
  }
  rect(x + 200, 275, 200, 5);
  rect(x + 200, 290, 200, 5);

  for (let i = 0; i < 3; i++) {
    let vx = x + 210 + i * 50;
    let vy = 270;
    fill(255);
    ellipse(vx, vy, 30, 20);
    ellipse(vx - 15, vy - 5, 15, 15);
    fill(0);
    ellipse(vx - 5, vy, 5, 5);
    ellipse(vx + 5, vy - 3, 4, 4);
  }

  fill(255);
  ellipse(x + 150, 330, 30, 20);
}

function drawRoad(x) {
  fill(169, 169, 169);
  rect(x, 300, 800, 100);
  fill(255);
  for (let i = 0; i < 800; i += 40) {
    rect(x + i, 345, 20, 5);
  }
}

function drawCity(x) {
  let buildings = [
    { x: 50, y: 200, w: 60, h: 100 },
    { x: 130, y: 180, w: 50, h: 120 },
    { x: 210, y: 220, w: 40, h: 80 },
    { x: 300, y: 180, w: 80, h: 120 },
    { x: 400, y: 210, w: 50, h: 90 },
    { x: 470, y: 190, w: 60, h: 110 },
    { x: 550, y: 200, w: 45, h: 100 },
    { x: 610, y: 170, w: 70, h: 130 },
    { x: 700, y: 190, w: 50, h: 110 }
  ];

  for (let b of buildings) {
    fill(100);
    rect(x + b.x - 2, b.y - 2, b.w + 4, b.h + 4);

    fill(150);
    rect(x + b.x, b.y, b.w, b.h);

    fill(255, 255, 0);
    for (let i = 10; i < b.w - 10; i += 20) {
      for (let j = 10; j < b.h - 10; j += 20) {
        rect(x + b.x + i, b.y + j, 10, 10);
      }
    }
  }
}