function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let truck;
let veggies = [];
let stones = [];
let score = 0;
let lives = 3;
let gameState = "start"; // "start", "playing", "gameover", "win"
let spawnTimer = 0; // contador para criação de objetos
let roadY;

function setup() {
  createCanvas(600, 400);
  roadY = height * 0.6; // A estrada começa em 60% da altura da tela
  truck = new Truck();
  textFont("sans-serif");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "win") {
    drawWin();
  }
}

function playGame() {
  // A dificuldade aumenta suavemente conforme o placar
  let difficulty = 1 + score / 200;
  
  drawBackground();
  spawnTimer++;  
  spawnObjects();
  
  truck.update();
  truck.display();
  
  updateAndDisplayVeggies(difficulty);
  updateAndDisplayStones(difficulty);
  
  displayScore();
  
  // Condição de vitória
  if (score >= 100) {
    gameState = "win";
  }
}

function drawBackground() {
  // Céu
  background(135, 206, 235);
  // Estrada
  fill(50);
  rect(0, roadY, width, height - roadY);
  
  // Linha central com efeito de movimento
  stroke(255);
  strokeWeight(4);
  let dashLength = 20;
  let gap = 20;
  let offset = spawnTimer % (dashLength + gap);
  for (let y = roadY - offset; y < height; y += dashLength + gap) {
    line(width / 2, y, width / 2, y + dashLength);
  }
  noStroke();
}

function spawnObjects() {
  // Verduras: a cada 60 frames, gerar uma verdura
  if (spawnTimer % 60 === 0) {
    // 5% de chance de ser uma verdura dourada
    let isGolden = random(1) < 0.05;
    veggies.push(new Vegetable(random(30, width - 30), roadY - 40, isGolden));
  }
  // Pedras: a cada 90 frames, gerar uma pedra
  if (spawnTimer % 90 === 0) {
    stones.push(new Stone(random(30, width - 30), roadY - 40));
  }
}

function updateAndDisplayVeggies(difficulty) {
  for (let i = veggies.length - 1; i >= 0; i--) {
    veggies[i].update(difficulty);
    veggies[i].display();
    // Remove se saiu da tela
    if (veggies[i].isOffScreen()) {
      veggies.splice(i, 1);
      continue;
    }
    // Se colidir com o caminhão, aumenta o placar conforme o valor da verdura
    if (collides(truck.x, truck.y, truck.width, truck.height, veggies[i].x, veggies[i].y, veggies[i].r)) {
      score += veggies[i].value;
      veggies.splice(i, 1);
    }
  }
}

function updateAndDisplayStones(difficulty) {
  for (let i = stones.length - 1; i >= 0; i--) {
    stones[i].update(difficulty);
    stones[i].display();
    if (stones[i].isOffScreen()) {
      stones.splice(i, 1);
      continue;
    }
    // Em colisão com uma pedra: perde uma vida e a pedra é removida
    if (collides(truck.x, truck.y, truck.width, truck.height, stones[i].x, stones[i].y, stones[i].r)) {
      lives--;
      stones.splice(i, 1);
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Verduras: " + score, 10, 10);
  text("Vidas: " + lives, 10, 35);
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jogo do Caminhão", width / 2, height / 2 - 50);
  textSize(18);
  text("Use as setas Esquerda e Direita para mover o caminhão", width / 2, height / 2);
  text("Colete 100 verduras para ganhar", width / 2, height / 2 + 30);
  text("Desvie das pedras – você tem 3 vidas!", width / 2, height / 2 + 60);
  text("Pressione ENTER para começar", width / 2, height / 2 + 120);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function drawWin() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Parabéns! Você ganhou!", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if ((gameState === "gameover" || gameState === "win") && (key === "r" || key === "R")) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  spawnTimer = 0;
  veggies = [];
  stones = [];
  truck = new Truck();
}

// Classe do caminhão
class Truck {
  constructor() {
    this.width = 60;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = roadY + (height - roadY) - this.height - 10;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  display() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    // Desenhando rodas
    fill(50);
    let wheelRadius = 8;
    ellipse(this.x + 15, this.y + this.height, wheelRadius * 2);
    ellipse(this.x + this.width - 15, this.y + this.height, wheelRadius * 2);
  }
}

// Classe das verduras (com ou sem o efeito dourado)
class Vegetable {
  constructor(x, y, isGolden = false) {
    this.x = x;
    this.y = y;
    this.isGolden = isGolden;
    if (isGolden) {
      this.r = 20;
      this.value = 5;
    } else {let truck;
let veggies = [];
let stones = [];
let score = 0;
let lives = 3;
let gameState = "start"; // "start", "playing", "gameover", "win"
let spawnTimer = 0; // contador para criação de objetos
let roadY;

function setup() {
  createCanvas(600, 400);
  roadY = height * 0.6; // A estrada começa em 60% da altura da tela
  truck = new Truck();
  textFont("sans-serif");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "win") {
    drawWin();
  }
}

function playGame() {
  // A dificuldade aumenta suavemente conforme o placar
  let difficulty = 1 + score / 200;
  
  drawBackground();
  spawnTimer++;  
  spawnObjects();
  
  truck.update();
  truck.display();
  
  updateAndDisplayVeggies(difficulty);
  updateAndDisplayStones(difficulty);
  
  displayScore();
  
  // Condição de vitória
  if (score >= 100) {
    gameState = "win";
  }
}

function drawBackground() {
  // Céu
  background(135, 206, 235);
  // Estrada
  fill(50);
  rect(0, roadY, width, height - roadY);
  
  // Linha central com efeito de movimento
  stroke(255);
  strokeWeight(4);
  let dashLength = 20;
  let gap = 20;
  let offset = spawnTimer % (dashLength + gap);
  for (let y = roadY - offset; y < height; y += dashLength + gap) {
    line(width / 2, y, width / 2, y + dashLength);
  }
  noStroke();
}

function spawnObjects() {
  // Verduras: a cada 60 frames, gerar uma verdura
  if (spawnTimer % 60 === 0) {
    // 5% de chance de ser uma verdura dourada
    let isGolden = random(1) < 0.05;
    veggies.push(new Vegetable(random(30, width - 30), roadY - 40, isGolden));
  }
  // Pedras: a cada 90 frames, gerar uma pedra
  if (spawnTimer % 90 === 0) {
    stones.push(new Stone(random(30, width - 30), roadY - 40));
  }
}

function updateAndDisplayVeggies(difficulty) {
  for (let i = veggies.length - 1; i >= 0; i--) {
    veggies[i].update(difficulty);
    veggies[i].display();
    // Remove se saiu da tela
    if (veggies[i].isOffScreen()) {
      veggies.splice(i, 1);
      continue;
    }
    // Se colidir com o caminhão, aumenta o placar conforme o valor da verdura
    if (collides(truck.x, truck.y, truck.width, truck.height, veggies[i].x, veggies[i].y, veggies[i].r)) {
      score += veggies[i].value;
      veggies.splice(i, 1);
    }
  }
}

function updateAndDisplayStones(difficulty) {
  for (let i = stones.length - 1; i >= 0; i--) {
    stones[i].update(difficulty);
    stones[i].display();
    if (stones[i].isOffScreen()) {
      stones.splice(i, 1);
      continue;
    }
    // Em colisão com uma pedra: perde uma vida e a pedra é removida
    if (collides(truck.x, truck.y, truck.width, truck.height, stones[i].x, stones[i].y, stones[i].r)) {
      lives--;
      stones.splice(i, 1);
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Verduras: " + score, 10, 10);
  text("Vidas: " + lives, 10, 35);
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jogo do Caminhão", width / 2, height / 2 - 50);
  textSize(18);
  text("Use as setas Esquerda e Direita para mover o caminhão", width / 2, height / 2);
  text("Colete 100 verduras para ganhar", width / 2, height / 2 + 30);
  text("Desvie das pedras – você tem 3 vidas!", width / 2, height / 2 + 60);
  text("Pressione ENTER para começar", width / 2, height / 2 + 120);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function drawWin() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Parabéns! Você ganhou!", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if ((gameState === "gameover" || gameState === "win") && (key === "r" || key === "R")) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  spawnTimer = 0;
  veggies = [];
  stones = [];
  truck = new Truck();
}

// Classe do caminhão
class Truck {
  constructor() {
    this.width = 60;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = roadY + (height - roadY) - this.height - 10;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  display() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    // Desenhando rodas
    fill(50);
    let wheelRadius = 8;
    ellipse(this.x + 15, this.y + this.height, wheelRadius * 2);
    ellipse(this.x + this.width - 15, this.y + this.height, wheelRadius * 2);
  }
}

// Classe das verduras (com ou sem o efeito dourado)
class Vegetable {
  constructor(x, y, isGolden = false) {
    this.x = x;
    this.y = y;
    this.isGolden = isGolden;
    if (isGolden) {
      this.r = 20;
      this.value = 5;
    } else {
      this.r = 15;
      this.value = 1;
    }let truck;
let veggies = [];
let stones = [];
let score = 0;
let lives = 3;
let gameState = "start"; // "start", "playing", "gameover", "win"
let spawnTimer = 0; // contador para criação de objetos
let roadY;

function setup() {
  createCanvas(600, 400);
  roadY = height * 0.6; // A estrada começa em 60% da altura da tela
  truck = new Truck();
  textFont("sans-serif");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "win") {
    drawWin();
  }
}

function playGame() {
  // A dificuldade aumenta suavemente conforme o placar
  let difficulty = 1 + score / 200;
  
  drawBackground();
  spawnTimer++;  
  spawnObjects();
  
  truck.update();
  truck.display();
  
  updateAndDisplayVeggies(difficulty);
  updateAndDisplayStones(difficulty);
  
  displayScore();
  
  // Condição de vitória
  if (score >= 100) {
    gameState = "win";
  }
}

function drawBackground() {
  // Céu
  background(135, 206, 235);
  // Estrada
  fill(50);
  rect(0, roadY, width, height - roadY);
  
  // Linha central com efeito de movimento
  stroke(255);
  strokeWeight(4);
  let dashLength = 20;
  let gap = 20;
  let offset = spawnTimer % (dashLength + gap);
  for (let y = roadY - offset; y < height; y += dashLength + gap) {
    line(width / 2, y, width / 2, y + dashLength);
  }
  noStroke();
}

function spawnObjects() {
  // Verduras: a cada 60 frames, gerar uma verdura
  if (spawnTimer % 60 === 0) {
    // 5% de chance de ser uma verdura dourada
    let isGolden = random(1) < 0.05;
    veggies.push(new Vegetable(random(30, width - 30), roadY - 40, isGolden));
  }
  // Pedras: a cada 90 frames, gerar uma pedra
  if (spawnTimer % 90 === 0) {
    stones.push(new Stone(random(30, width - 30), roadY - 40));
  }
}

function updateAndDisplayVeggies(difficulty) {
  for (let i = veggies.length - 1; i >= 0; i--) {
    veggies[i].update(difficulty);
    veggies[i].display();
    // Remove se saiu da tela
    if (veggies[i].isOffScreen()) {
      veggies.splice(i, 1);
      continue;
    }
    // Se colidir com o caminhão, aumenta o placar conforme o valor da verdura
    if (collides(truck.x, truck.y, truck.width, truck.height, veggies[i].x, veggies[i].y, veggies[i].r)) {
      score += veggies[i].value;
      veggies.splice(i, 1);
    }
  }
}

function updateAndDisplayStones(difficulty) {
  for (let i = stones.length - 1; i >= 0; i--) {
    stones[i].update(difficulty);
    stones[i].display();
    if (stones[i].isOffScreen()) {
      stones.splice(i, 1);
      continue;
    }
    // Em colisão com uma pedra: perde uma vida e a pedra é removida
    if (collides(truck.x, truck.y, truck.width, truck.height, stones[i].x, stones[i].y, stones[i].r)) {
      lives--;
      stones.splice(i, 1);
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Verduras: " + score, 10, 10);
  text("Vidas: " + lives, 10, 35);
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jogo do Caminhão", width / 2, height / 2 - 50);
  textSize(18);
  text("Use as setas Esquerda e Direita para mover o caminhão", width / 2, height / 2);
  text("Colete 100 verduras para ganhar", width / 2, height / 2 + 30);
  text("Desvie das pedras – você tem 3 vidas!", width / 2, height / 2 + 60);
  text("Pressione ENTER para começar", width / 2, height / 2 + 120);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function drawWin() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Parabéns! Você ganhou!", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if ((gameState === "gameover" || gameState === "win") && (key === "r" || key === "R")) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  spawnTimer = 0;
  veggies = [];
  stones = [];
  truck = new Truck();
}

// Classe do caminhão
class Truck {
  constructor() {
    this.width = 60;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = roadY + (height - roadY) - this.height - 10;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  display() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    // Desenhando rodas
    fill(50);
    let wheelRadius = 8;
    ellipse(this.x + 15, this.y + this.height, wheelRadius * 2);
    ellipse(this.x + this.width - 15, this.y + this.height, wheelRadius * 2);
  }
}

// Classe das verduras (com ou sem o efeito dourado)
class Vegetable {
  constructor(x, y, isGolden = false) {
    this.x = x;
    this.y = y;
    this.isGolden = isGolden;
    if (isGolden) {
      this.r = 20;
      this.value = 5;
    } else {
      this.r = 15;
      this.value = 1;
    }
    this.baseSpeed = 3;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    if (this.isGolden) {
      fill(255, 215, 0); // Cor douradalet truck;
let veggies = [];
let stones = [];
let score = 0;
let lives = 3;
let gameState = "start"; // "start", "playing", "gameover", "win"
let spawnTimer = 0; // contador para criação de objetos
let roadY;

function setup() {
  createCanvas(600, 400);
  roadY = height * 0.6; // A estrada começa em 60% da altura da tela
  truck = new Truck();
  textFont("sans-serif");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "win") {
    drawWin();
  }
}

function playGame() {
  // A dificuldade aumenta suavemente conforme o placar
  let difficulty = 1 + score / 200;
  
  drawBackground();
  spawnTimer++;  
  spawnObjects();
  
  truck.update();
  truck.display();
  
  updateAndDisplayVeggies(difficulty);
  updateAndDisplayStones(difficulty);
  
  displayScore();
  
  // Condição de vitória
  if (score >= 100) {
    gameState = "win";
  }
}

function drawBackground() {
  // Céu
  background(135, 206, 235);
  // Estrada
  fill(50);
  rect(0, roadY, width, height - roadY);
  
  // Linha central com efeito de movimento
  stroke(255);
  strokeWeight(4);
  let dashLength = 20;
  let gap = 20;
  let offset = spawnTimer % (dashLength + gap);
  for (let y = roadY - offset; y < height; y += dashLength + gap) {
    line(width / 2, y, width / 2, y + dashLength);
  }
  noStroke();
}

function spawnObjects() {
  // Verduras: a cada 60 frames, gerar uma verdura
  if (spawnTimer % 60 === 0) {
    // 5% de chance de ser uma verdura dourada
    let isGolden = random(1) < 0.05;
    veggies.push(new Vegetable(random(30, width - 30), roadY - 40, isGolden));
  }
  // Pedras: a cada 90 frames, gerar uma pedra
  if (spawnTimer % 90 === 0) {
    stones.push(new Stone(random(30, width - 30), roadY - 40));
  }
}

function updateAndDisplayVeggies(difficulty) {
  for (let i = veggies.length - 1; i >= 0; i--) {
    veggies[i].update(difficulty);
    veggies[i].display();
    // Remove se saiu da tela
    if (veggies[i].isOffScreen()) {
      veggies.splice(i, 1);
      continue;
    }
    // Se colidir com o caminhão, aumenta o placar conforme o valor da verdura
    if (collides(truck.x, truck.y, truck.width, truck.height, veggies[i].x, veggies[i].y, veggies[i].r)) {
      score += veggies[i].value;
      veggies.splice(i, 1);
    }
  }
}

function updateAndDisplayStones(difficulty) {
  for (let i = stones.length - 1; i >= 0; i--) {
    stones[i].update(difficulty);
    stones[i].display();
    if (stones[i].isOffScreen()) {
      stones.splice(i, 1);
      continue;
    }
    // Em colisão com uma pedra: perde uma vida e a pedra é removida
    if (collides(truck.x, truck.y, truck.width, truck.height, stones[i].x, stones[i].y, stones[i].r)) {
      lives--;
      stones.splice(i, 1);
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Verduras: " + score, 10, 10);
  text("Vidas: " + lives, 10, 35);
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jogo do Caminhão", width / 2, height / 2 - 50);
  textSize(18);
  text("Use as setas Esquerda e Direita para mover o caminhão", width / 2, height / 2);
  text("Colete 100 verduras para ganhar", width / 2, height / 2 + 30);
  text("Desvie das pedras – você tem 3 vidas!", width / 2, height / 2 + 60);
  text("Pressione ENTER para começar", width / 2, height / 2 + 120);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function drawWin() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Parabéns! Você ganhou!", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if ((gameState === "gameover" || gameState === "win") && (key === "r" || key === "R")) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  spawnTimer = 0;
  veggies = [];
  stones = [];
  truck = new Truck();
}

// Classe do caminhão
class Truck {
  constructor() {
    this.width = 60;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = roadY + (height - roadY) - this.height - 10;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  display() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    // Desenhando rodas
    fill(50);
    let wheelRadius = 8;
    ellipse(this.x + 15, this.y + this.height, wheelRadius * 2);
    ellipse(this.x + this.width - 15, this.y + this.height, wheelRadius * 2);
  }
}

// Classe das verduras (com ou sem o efeito dourado)
class Vegetable {
  constructor(x, y, isGolden = false) {
    this.x = x;
    this.y = y;
    this.isGolden = isGolden;
    if (isGolden) {
      this.r = 20;
      this.value = 5;
    } else {
      this.r = 15;
      this.value = 1;
    }
    this.baseSpeed = 3;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    if (this.isGolden) {
      fill(255, 215, 0); // Cor douradalet truck;
let veggies = [];
let stones = [];
let score = 0;
let lives = 3;
let gameState = "start"; // "start", "playing", "gameover", "win"
let spawnTimer = 0; // contador para criação de objetos
let roadY;

function setup() {
  createCanvas(600, 400);
  roadY = height * 0.6; // A estrada começa em 60% da altura da tela
  truck = new Truck();
  textFont("sans-serif");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "win") {
    drawWin();
  }
}

function playGame() {
  // A dificuldade aumenta suavemente conforme o placar
  let difficulty = 1 + score / 200;
  
  drawBackground();
  spawnTimer++;  
  spawnObjects();
  
  truck.update();
  truck.display();
  
  updateAndDisplayVeggies(difficulty);
  updateAndDisplayStones(difficulty);
  
  displayScore();
  
  // Condição de vitória
  if (score >= 100) {
    gameState = "win";
  }
}

function drawBackground() {
  // Céu
  background(135, 206, 235);
  // Estrada
  fill(50);
  rect(0, roadY, width, height - roadY);
  
  // Linha central com efeito de movimento
  stroke(255);
  strokeWeight(4);
  let dashLength = 20;
  let gap = 20;
  let offset = spawnTimer % (dashLength + gap);
  for (let y = roadY - offset; y < height; y += dashLength + gap) {
    line(width / 2, y, width / 2, y + dashLength);
  }
  noStroke();
}

function spawnObjects() {
  // Verduras: a cada 60 frames, gerar uma verdura
  if (spawnTimer % 60 === 0) {
    // 5% de chance de ser uma verdura dourada
    let isGolden = random(1) < 0.05;
    veggies.push(new Vegetable(random(30, width - 30), roadY - 40, isGolden));
  }
  // Pedras: a cada 90 frames, gerar uma pedra
  if (spawnTimer % 90 === 0) {
    stones.push(new Stone(random(30, width - 30), roadY - 40));
  }
}

function updateAndDisplayVeggies(difficulty) {
  for (let i = veggies.length - 1; i >= 0; i--) {
    veggies[i].update(difficulty);
    veggies[i].display();
    // Remove se saiu da tela
    if (veggies[i].isOffScreen()) {
      veggies.splice(i, 1);
      continue;
    }
    // Se colidir com o caminhão, aumenta o placar conforme o valor da verdura
    if (collides(truck.x, truck.y, truck.width, truck.height, veggies[i].x, veggies[i].y, veggies[i].r)) {
      score += veggies[i].value;
      veggies.splice(i, 1);
    }
  }
}

function updateAndDisplayStones(difficulty) {
  for (let i = stones.length - 1; i >= 0; i--) {
    stones[i].update(difficulty);
    stones[i].display();
    if (stones[i].isOffScreen()) {
      stones.splice(i, 1);
      continue;
    }
    // Em colisão com uma pedra: perde uma vida e a pedra é removida
    if (collides(truck.x, truck.y, truck.width, truck.height, stones[i].x, stones[i].y, stones[i].r)) {
      lives--;
      stones.splice(i, 1);
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Verduras: " + score, 10, 10);
  text("Vidas: " + lives, 10, 35);
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jogo do Caminhão", width / 2, height / 2 - 50);
  textSize(18);
  text("Use as setas Esquerda e Direita para mover o caminhão", width / 2, height / 2);
  text("Colete 100 verduras para ganhar", width / 2, height / 2 + 30);
  text("Desvie das pedras – você tem 3 vidas!", width / 2, height / 2 + 60);
  text("Pressione ENTER para começar", width / 2, height / 2 + 120);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function drawWin() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Parabéns! Você ganhou!", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if ((gameState === "gameover" || gameState === "win") && (key === "r" || key === "R")) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  spawnTimer = 0;
  veggies = [];
  stones = [];
  truck = new Truck();
}

// Classe do caminhão
class Truck {
  constructor() {
    this.width = 60;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = roadY + (height - roadY) - this.height - 10;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  display() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    // Desenhando rodas
    fill(50);
    let wheelRadius = 8;
    ellipse(this.x + 15, this.y + this.height, wheelRadius * 2);
    ellipse(this.x + this.width - 15, this.y + this.height, wheelRadius * 2);
  }
}

// Classe das verduras (com ou sem o efeito dourado)
class Vegetable {
  constructor(x, y, isGolden = false) {
    this.x = x;
    this.y = y;
    this.isGolden = isGolden;
    if (isGolden) {
      this.r = 20;
      this.value = 5;
    } else {
      this.r = 15;
      this.value = 1;
    }
    this.baseSpeed = 3;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    if (this.isGolden) {
      fill(255, 215, 0); // Cor dourada
    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Classe das pedras
class Stone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.baseSpeed = 4;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    fill(120);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Função para detectar colisões entre um retângulo (caminhão) e um círculo (objeto)
function collides(rx, ry, rw, rh, cx, cy, cr) {
  let testX = cx;
  let testY = cy;
  
  if (cx < rx) {
    testX = rx;
  } else if (cx > rx + rw) {
    testX = rx + rw;
  }
  let truck;
let veggies = [];
let stones = [];
let score = 0;
let lives = 3;
let gameState = "start"; // "start", "playing", "gameover", "win"
let spawnTimer = 0; // contador para criação de objetos
let roadY;

function setup() {
  createCanvas(600, 400);
  roadY = height * 0.6; // A estrada começa em 60% da altura da tela
  truck = new Truck();
  textFont("sans-serif");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "win") {
    drawWin();
  }
}

function playGame() {
  // A dificuldade aumenta suavemente conforme o placar
  let difficulty = 1 + score / 200;
  
  drawBackground();
  spawnTimer++;  
  spawnObjects();
  
  truck.update();
  truck.display();
  
  updateAndDisplayVeggies(difficulty);
  updateAndDisplayStones(difficulty);
  
  displayScore();
  
  // Condição de vitória
  if (score >= 100) {
    gameState = "win";
  }
}

function drawBackground() {
  // Céu
  background(135, 206, 235);
  // Estrada
  fill(50);
  rect(0, roadY, width, height - roadY);
  
  // Linha central com efeito de movimento
  stroke(255);
  strokeWeight(4);
  let dashLength = 20;
  let gap = 20;
  let offset = spawnTimer % (dashLength + gap);
  for (let y = roadY - offset; y < height; y += dashLength + gap) {
    line(width / 2, y, width / 2, y + dashLength);
  }
  noStroke();
}

function spawnObjects() {
  // Verduras: a cada 60 frames, gerar uma verdura
  if (spawnTimer % 60 === 0) {
    // 5% de chance de ser uma verdura dourada
    let isGolden = random(1) < 0.05;
    veggies.push(new Vegetable(random(30, width - 30), roadY - 40, isGolden));
  }
  // Pedras: a cada 90 frames, gerar uma pedra
  if (spawnTimer % 90 === 0) {
    stones.push(new Stone(random(30, width - 30), roadY - 40));
  }
}

function updateAndDisplayVeggies(difficulty) {
  for (let i = veggies.length - 1; i >= 0; i--) {
    veggies[i].update(difficulty);
    veggies[i].display();
    // Remove se saiu da tela
    if (veggies[i].isOffScreen()) {
      veggies.splice(i, 1);
      continue;
    }
    // Se colidir com o caminhão, aumenta o placar conforme o valor da verdura
    if (collides(truck.x, truck.y, truck.width, truck.height, veggies[i].x, veggies[i].y, veggies[i].r)) {
      score += veggies[i].value;
      veggies.splice(i, 1);
    }
  }
}

function updateAndDisplayStones(difficulty) {
  for (let i = stones.length - 1; i >= 0; i--) {
    stones[i].update(difficulty);
    stones[i].display();
    if (stones[i].isOffScreen()) {
      stones.splice(i, 1);
      continue;
    }
    // Em colisão com uma pedra: perde uma vida e a pedra é removida
    if (collides(truck.x, truck.y, truck.width, truck.height, stones[i].x, stones[i].y, stones[i].r)) {
      lives--;
      stones.splice(i, 1);
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Verduras: " + score, 10, 10);
  text("Vidas: " + lives, 10, 35);
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jogo do Caminhão", width / 2, height / 2 - 50);
  textSize(18);
  text("Use as setas Esquerda e Direita para mover o caminhão", width / 2, height / 2);
  text("Colete 100 verduras para ganhar", width / 2, height / 2 + 30);
  text("Desvie das pedras – você tem 3 vidas!", width / 2, height / 2 + 60);
  text("Pressione ENTER para começar", width / 2, height / 2 + 120);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function drawWin() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Parabéns! Você ganhou!", width / 2, height / 2 - 20);
  textSize(20);
  text("Você coletou " + score + " verduras", width / 2, height / 2 + 20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if ((gameState === "gameover" || gameState === "win") && (key === "r" || key === "R")) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  spawnTimer = 0;
  veggies = [];
  stones = [];
  truck = new Truck();
}

// Classe do caminhão
class Truck {
  constructor() {
    this.width = 60;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = roadY + (height - roadY) - this.height - 10;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  display() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    // Desenhando rodas
    fill(50);
    let wheelRadius = 8;
    ellipse(this.x + 15, this.y + this.height, wheelRadius * 2);
    ellipse(this.x + this.width - 15, this.y + this.height, wheelRadius * 2);
  }
}

// Classe das verduras (com ou sem o efeito dourado)
class Vegetable {
  constructor(x, y, isGolden = false) {
    this.x = x;
    this.y = y;
    this.isGolden = isGolden;
    if (isGolden) {
      this.r = 20;
      this.value = 5;
    } else {
      this.r = 15;
      this.value = 1;
    }
    this.baseSpeed = 3;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    if (this.isGolden) {
      fill(255, 215, 0); // Cor dourada
    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Classe das pedras
class Stone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.baseSpeed = 4;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    fill(120);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Função para detectar colisões entre um retângulo (caminhão) e um círculo (objeto)
function collides(rx, ry, rw, rh, cx, cy, cr) {
  let testX = cx;
  let testY = cy;
  
  if (cx < rx) {
    testX = rx;
  } else if (cx > rx + rw) {
    testX = rx + rw;
  }
  
  if (cy < ry) {
    testY = ry;
  } else if (cy > ry + rh) {
    testY = ry + rh;
  }
  
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);
  
  return (distance <= cr);
}

  if (cy < ry) {
    testY = ry;
  } else if (cy > ry + rh) {
    testY = ry + rh;
  }
  
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);
  
  return (distance <= cr);
}

    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Classe das pedras
class Stone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.baseSpeed = 4;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    fill(120);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Função para detectar colisões entre um retângulo (caminhão) e um círculo (objeto)
function collides(rx, ry, rw, rh, cx, cy, cr) {
  let testX = cx;
  let testY = cy;
  
  if (cx < rx) {
    testX = rx;
  } else if (cx > rx + rw) {
    testX = rx + rw;
  }
  
  if (cy < ry) {
    testY = ry;
  } else if (cy > ry + rh) {
    testY = ry + rh;
  }
  
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);
  
  return (distance <= cr);
}

    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Classe das pedras
class Stone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.baseSpeed = 4;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    fill(120);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Função para detectar colisões entre um retângulo (caminhão) e um círculo (objeto)
function collides(rx, ry, rw, rh, cx, cy, cr) {
  let testX = cx;
  let testY = cy;
  
  if (cx < rx) {
    testX = rx;
  } else if (cx > rx + rw) {
    testX = rx + rw;
  }
  
  if (cy < ry) {
    testY = ry;
  } else if (cy > ry + rh) {
    testY = ry + rh;
  }
  
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);
  
  return (distance <= cr);
}

    this.baseSpeed = 3;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    if (this.isGolden) {
      fill(255, 215, 0); // Cor dourada
    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Classe das pedras
class Stone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.baseSpeed = 4;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    fill(120);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Função para detectar colisões entre um retângulo (caminhão) e um círculo (objeto)
function collides(rx, ry, rw, rh, cx, cy, cr) {
  let testX = cx;
  let testY = cy;
  
  if (cx < rx) {
    testX = rx;
  } else if (cx > rx + rw) {
    testX = rx + rw;
  }
  
  if (cy < ry) {
    testY = ry;
  } else if (cy > ry + rh) {
    testY = ry + rh;
  }
  
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);
  
  return (distance <= cr);
}

      this.r = 15;
      this.value = 1;
    }
    this.baseSpeed = 3;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    if (this.isGolden) {
      fill(255, 215, 0); // Cor dourada
    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Classe das pedras
class Stone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.baseSpeed = 4;
  }
  
  update(difficulty) {
    this.y += this.baseSpeed * difficulty;
  }
  
  display() {
    fill(120);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  isOffScreen() {
    return this.y - this.r > height;
  }
}

// Função para detectar colisões entre um retângulo (caminhão) e um círculo (objeto)
function collides(rx, ry, rw, rh, cx, cy, cr) {
  let testX = cx;
  let testY = cy;
  
  if (cx < rx) {
    testX = rx;
  } else if (cx > rx + rw) {
    testX = rx + rw;
  }
  
  if (cy < ry) {
    testY = ry;
  } else if (cy > ry + rh) {
    testY = ry + rh;
  }
  
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);
  
  return (distance <= cr);
}
