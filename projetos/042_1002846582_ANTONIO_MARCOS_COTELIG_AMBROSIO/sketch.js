// Controle de estados do jogo
let gameState = "menu"; // menu, instructions, playing, victory
// Variáveis do jogo
let player;
let items = [];
let inventory = {};
let carrying = null;
let score = 0;
let gameWon = false;
let currentOrder;
let allItemTypes = ["milho", "maca", "cenoura"];
let obstacles = [];
let level = 1;
let maxLevels = 5;
let deliveryFeedback = "";
let feedbackTimer = 0;
// Variáveis do menu
let menuButtons = {
  start: { x: 300, y: 250, w: 250, h: 60, hover: false },
  instructions: { x: 300, y: 330, w: 250, h: 50, hover: false }
};
// Variáveis de animação
let titlePulse = 0;
let particleSystem;
let sunAngle = 0;

function setup() {
  createCanvas(800, 400);
  noSmooth();
  textAlign(CENTER, CENTER);
  // Inicializa sistema de partículas
  particleSystem = new ParticleSystem();
}

function draw() {
  if (gameState === "menu") {
    drawFancyMenu();
  } else if (gameState === "instructions") {
    drawInstructions();
  } else if (gameState === "victory") {
    showVictoryScreen();
  } else if (gameState === "playing") {
    background(220);
    // Campo
    fill(100, 200, 100);
    rect(0, 0, width / 2, height);
    // Cidade
    fill(180, 180, 250);
    rect(width / 2, 0, width / 2, height);
    // Rótulos CAMPO e CIDADE
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    // Faixas atrás dos textos
    fill(34, 139, 34, 180);
    rect(width / 4 - 60, 5, 120, 30, 10);
    fill(70, 130, 180, 180);
    rect(3 * width / 4 - 60, 5, 120, 30, 10);
    // Textos com sombra
    fill(0, 0, 0, 150);
    text("CAMPO 🌾", width / 4 + 2, 12 + 2);
    text("CIDADE 🏙️", 3 * width / 4 + 2, 12 + 2);
    fill(255);
    text("CAMPO 🌾", width / 4, 12);
    text("CIDADE 🏙️", 3 * width / 4, 12);
    // Área de entrega
    fill(255, 215, 0);
    rect(700, 170, 60, 60);
    fill(0);
    textAlign(CENTER);
    text("ENTREGA", 729, 140);
    // Obstáculos
    stroke(0);
    strokeWeight(2);
    fill(100);
    for (let obs of obstacles) {
      rect(obs.x, obs.y, obs.w, obs.h, 5);
    }
    noStroke();
    // Itens
    for (let item of items) {
      if (!item.collected) {
        fill(getItemColor(item.type));
        ellipse(item.x, item.y, 20);
      }
    }
    // Jogador
    fill(0);
    ellipse(player.x, player.y, player.size);
    // Item carregado
    if (carrying) {
      fill(getItemColor(carrying));
      ellipse(player.x, player.y - 25, 10);
    }

    movePlayer();

    // Coletar item
    for (let item of items) {
      if (
        !item.collected &&
        dist(player.x, player.y, item.x, item.y) < 25 &&
        !carrying
      ) {
        carrying = item.type;
        item.collected = true;
      }
    }

    // Entregar item
    if (
      carrying &&
      player.x > 700 &&
      player.x < 760 &&
      player.y > 170 &&
      player.y < 230
    ) {
      let deliveredItem = carrying;
      if (!inventory[deliveredItem]) inventory[deliveredItem] = 0;
      inventory[deliveredItem]++;
      carrying = null;
      deliveryFeedback = "✅ Entregue: " + deliveredItem;
      feedbackTimer = 90;
      if (checkOrderCompleted()) {
        score += 20;
        deliveryFeedback = "🎉 Pedido concluído!";
        feedbackTimer = 120;
        if (score >= 100 || level >= maxLevels) {
          gameWon = true;
          gameState = "victory";
        } else {
          level++;
          generateNewOrder();
          generateObstacles();
          spawnItems();
          inventory = {};
        }
      }
    }

    showHUD();
  }

  // Atualiza variáveis de animação
  titlePulse = (titlePulse + 0.05) % TWO_PI;
  sunAngle += 0.005;
  particleSystem.run();
}

function mousePressed() {
  if (gameState === "menu") {
    if (mouseInRect(menuButtons.start)) {
      gameState = "playing";
      initializeGame();
    } else if (mouseInRect(menuButtons.instructions)) {
      gameState = "instructions";
    }
  } else if (gameState === "instructions") {
    if (mouseInRect({x: width/2 - 70, y: height - 70, w: 140, h: 50})) {
      gameState = "menu";
    }
  } else if (gameState === "victory") {
    let buttonX = width / 2 - 90;
    let buttonY = height / 2 + 80;
    let buttonW = 180;
    let buttonH = 50;
    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonW &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonH
    ) {
      resetGame();
      gameState = "menu";
    }
  }
}

function keyPressed() {
  if (gameState === "menu" && keyCode === ENTER) {
    gameState = "playing";
    initializeGame();
  }
}

function mouseMoved() {
  if (gameState === "menu") {
    menuButtons.start.hover = mouseInRect(menuButtons.start);
    menuButtons.instructions.hover = mouseInRect(menuButtons.instructions);
  }
}

// --- Funções do jogo ---
function initializeGame() {
  player = {
    x: 100,
    y: 200,
    size: 30,
    speed: 3
  };
  generateNewOrder();
  generateObstacles();
  spawnItems();
}

function movePlayer() {
  let dx = 0;
  let dy = 0;
  if (keyIsDown(LEFT_ARROW)) dx -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) dx += player.speed;
  if (keyIsDown(UP_ARROW)) dy -= player.speed;
  if (keyIsDown(DOWN_ARROW)) dy += player.speed;
  let futureX = player.x + dx;
  let futureY = player.y + dy;
  if (!collidesWithObstacle(futureX, futureY)) {
    player.x = constrain(futureX, 0, width);
    player.y = constrain(futureY, 0, height);
  }
}

function collidesWithObstacle(x, y) {
  let padding = player.size / 2;
  for (let obs of obstacles) {
    if (
      x > obs.x - padding &&
      x < obs.x + obs.w + padding &&
      y > obs.y - padding &&
      y < obs.y + obs.h + padding
    ) {
      return true;
    }
  }
  return false;
}

function placePlayerSafe() {
  let safe = false;
  let attempts = 0;
  const maxTries = 200; // Mais tentativas
  const safeMargin = player.size * 1.5; // Margem extra

  while (!safe && attempts < maxTries) {
    safe = true;
    player.x = random(100, width / 2 - 100);
    player.y = random(100, height - 100);

    for (let obs of obstacles) {
      let distance = dist(player.x, player.y, obs.x + obs.w / 2, obs.y + obs.h / 2);
      if (distance < safeMargin) {
        safe = false;
        break;
      }
    }
    attempts++;
  }

  if (attempts >= maxTries) {
    player.x = 100;
    player.y = 100;
  }
}

function createItem(type, x, y) {
  return {
    type,
    x,
    y,
    collected: false
  };
}

function spawnItems() {
  items = [];
  for (let type of Object.keys(currentOrder)) {
    for (let i = 0; i < currentOrder[type]; i++) {
      let newItem;
      do {
        newItem = createItem(type, random(50, 350), random(50, 350));
      } while (collidesWithObstacle(newItem.x, newItem.y));
      items.push(newItem);
    }
  }
}

function generateObstacles() {
  obstacles = [];
  let baseObstacles = 2;
  let extraPerLevel = 1;
  let totalObs = baseObstacles + (level - 1) * extraPerLevel;
  totalObs = min(totalObs, 10); // Limite máximo
  let attempts = 0;
  const maxAttempts = 300;
  const minDistBetweenObs = 80;
  while (obstacles.length < totalObs && attempts < maxAttempts) {
    attempts++;
    let isVertical = random() > 0.5;
    let obs = {
      x: random(60, width / 2 - 60),
      y: random(60, height - 60),
      w: isVertical ? 30 : random(60, 100),
      h: isVertical ? random(60, 100) : 30
    };
    let tooClose = false;
    for (let other of obstacles) {
      let distance = dist(
        obs.x + obs.w / 2,
        obs.y + obs.h / 2,
        other.x + other.w / 2,
        other.y + other.h / 2
      );
      if (distance < minDistBetweenObs) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose) {
      obstacles.push(obs);
    }
  }
  placePlayerSafe(); // Garante posição válida do jogador
}

function getItemColor(type) {
  if (type === "milho") return "yellow";
  if (type === "maca") return "red";
  if (type === "cenoura") return "orange";
  return "gray";
}

function generateNewOrder() {
  currentOrder = {};
  let itemCount = 1 + floor(random(level));
  shuffle(allItemTypes, true);
  for (let i = 0; i < itemCount; i++) {
    currentOrder[allItemTypes[i]] = 1 + floor(random(level / 2 + 1));
  }
}

function checkOrderCompleted() {
  for (let type in currentOrder) {
    if ((inventory[type] || 0) < currentOrder[type]) return false;
  }
  return true;
}

function showHUD() {
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Nível: " + level, 15, 30);
  text("Pontuação: " + score + " / 100", 15, 50);
  text("Pedido atual:", 15, 80);
  let y = 100;
  for (let type in currentOrder) {
    if (allItemTypes.includes(type)) {
      text("- " + currentOrder[type] + " " + type + "(s)", 15, y);
      y += 20;
    }
  }
  if (feedbackTimer > 0) {
    fill(100, 100, 255, 150);
    textSize(20);
    textAlign(CENTER);
    text(deliveryFeedback, width / 2 + 1, height - 30 + 1);
    fill(255);
    text(deliveryFeedback, width / 2, height - 30);
    feedbackTimer--;
  }
}

function resetGame() {
  level = 1;
  score = 0;
  inventory = {};
  carrying = null;
  items = [];
  obstacles = [];
  currentOrder = {};
  gameWon = false;
}

// --- Telas do jogo ---
function drawFancyMenu() {
  let skyColor = lerpColor(color(135, 206, 250), color(255, 255, 224), map(sin(sunAngle), -1, 1, 0, 1));
  let groundColor = lerpColor(color(100, 200, 100), color(139, 69, 19), map(sin(sunAngle), -1, 1, 0, 1));
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(skyColor, groundColor, inter);
    stroke(c);
    line(0, i, width, i);
  }
  let sunX = width / 2 + cos(sunAngle) * width * 0.7;
  let sunY = height / 2 + sin(sunAngle) * height * 0.7;
  noStroke();
  fill(255, 255, 0, 100);
  ellipse(sunX, sunY, 150);
  particleSystem.addParticles(2);
  push();
  translate(width / 2, 100);
  rotate(sin(titlePulse) * 0.05);
  textSize(56);
  fill(0, 100);
  text("Jogo da Colheita", 0, 0);
  fill(255, 215, 0);
  stroke(0);
  strokeWeight(2);
  text("Jogo da Colheita", 0, 0);
  pop();
  drawFancyButton(menuButtons.start, "INICIAR JOGO");
  drawFancyButton(menuButtons.instructions, "COMO JOGAR");
  if (menuButtons.start.hover) drawGlowEffect(menuButtons.start);
  if (menuButtons.instructions.hover) drawGlowEffect(menuButtons.instructions);
}

function drawFancyButton(button, textLabel) {
  fill(0, 100);
  ellipse(button.x + button.w / 2, button.y + button.h + 5, button.w * 0.8, 15);
  noStroke();
  if (button.hover) {
    fill(255, 230, 0);
    rect(button.x, button.y, button.w, button.h, 15);
    fill(255, 200, 0);
    rect(button.x, button.y, button.w, button.h / 2, 15);
  } else {
    fill(255, 215, 0);
    rect(button.x, button.y, button.w, button.h, 15);
    fill(255, 190, 0);
    rect(button.x, button.y, button.w, button.h / 2, 15);
  }
  fill(0);
  textSize(22);
  text(textLabel, button.x + button.w / 2, button.y + button.h / 2 + 4);
  fill(255);
  text(textLabel, button.x + button.w / 2, button.y + button.h / 2);
}

function drawGlowEffect(button) {
  let glowSize = 30 + sin(frameCount * 0.1) * 10;
  fill(255, 215, 0, 100);
  ellipse(button.x + button.w / 2, button.y + button.h / 2, button.w + glowSize, button.h + glowSize);
}

function drawInstructions() {
  background(245, 245, 220);
  fill(255, 255, 200);
  rect(0, 0, width, 80);
  fill(0);
  textSize(36);
  text("Como Jogar", width / 2, 40);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  let lines = [
    "Movimentação: Setas do teclado",
    "Colete os itens no campo (lado esquerdo)",
    "Leve os itens até a área de entrega na cidade (lado direito)",
    "Cada nível tem um pedido específico a ser completado",
    "Você só pode carregar um item por vez",
    "Complete todos os pedidos para vencer o jogo!"
  ];
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, 120 + i * 30);
  }
  fill(255, 255, 200);
  rect(width / 2 - 70, height - 70, 140, 50, 15);
  fill(0);
  textSize(20);
  text("VOLTAR AO MENU", width / 2, height - 45);
}

function showVictoryScreen() {
  let topColor = color(0, 180, 0);
  let bottomColor = color(0, 100, 0);
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, i, width, i);
  }
  particleSystem.addParticles(3);

  // Título fixo
  push();
  textSize(48);
  fill(255, 255, 0);
  text("🎉 Parabéns!", width / 2, height / 2 - 60);
  fill(255);
  text("🎉 Parabéns!", width / 2, height / 2 - 60);
  pop();

  textSize(28);
  fill(255);
  text("Você completou todas as entregas!", width / 2, height / 2 - 10);
  textSize(22);
  fill(255, 255, 255, 200);
  text("Pontuação final: 100 | Nível alcançado: " + level, width / 2, height / 2 + 40);

  // Botão Reiniciar
  let buttonX = width / 2 - 90;
  let buttonY = height / 2 + 80;
  let buttonW = 180;
  let buttonH = 50;
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH
  ) {
    fill(255, 200, 0);
    rect(buttonX, buttonY, buttonW, buttonH, 10);
    fill(0);
  } else {
    fill(255, 255, 100);
    rect(buttonX, buttonY, buttonW, buttonH, 10);
    fill(0);
  }
  textSize(20);
  textAlign(CENTER, CENTER);
  text("🔁 REINICIAR JOGO", width / 2, buttonY + buttonH / 2);
}

// --- Classes de partículas ---
class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D().mult(0.5);
    this.lifespan = 255;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }
  display() {
    noStroke();
    fill(255, 255, 200, this.lifespan);
    ellipse(this.position.x, this.position.y, 5);
  }
  isDead() {
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  addParticles(n) {
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle());
    }
  }
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

// --- Função auxiliar ---
function mouseInRect(rect) {
  return (
    mouseX > rect.x &&
    mouseX < rect.x + rect.w &&
    mouseY > rect.y &&
    mouseY < rect.y + rect.h
  );
}