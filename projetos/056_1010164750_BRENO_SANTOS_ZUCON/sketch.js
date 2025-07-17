// --- Variáveis Globais ---
let truck;                // Caminhão controlado pelo jogador
let fruits = [];          // Array para frutas normais que caem
let badItems = [];        // Array para itens ruins (bombas)
let score = 0;            // Pontuação atual
let gameOver = false;     // Estado de fim de jogo

let phase = 1;            // Fase atual do jogo
let immunity = false;     // Indica se o jogador está imune (efeito especial)
let immunityTimer = 0;    // Controle do tempo de imunidade
let specialFruits = [];   // Array para frutas especiais (que dão imunidade/double points)

let doublePoints = false; // Indicador de pontos em dobro
let gameStarted = false;  // Controle se o jogo já começou
let startButton;          // Botão para iniciar o jogo

const fruitEmojis = ["🍏", "🍌", "🍇", "🍓", "🍊"];  // Emojis das frutas normais
const specialEmoji = "🍍";                          // Emoji da fruta especial

const fruitsToPassPhase = [50, 70, 100, 130, 150];  // Pontuação para passar de fase

let blinkTimer = 0;         // Timer para piscar o texto secreto

// --- Definição da Classe Truck (Caminhão) ---
class Truck {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.width = 60;
    this.height = 40;
    this.speed = 7;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }

  display() {
    textSize(48);
    text("🚛", this.x + this.width / 2, this.y + this.height / 2);
  }
}

// --- Definição da Classe Fruit (Frutas comuns) ---
class Fruit {
  constructor(x, phase, emoji) {
    this.x = x;
    this.y = 0;
    this.size = 30;
    this.emoji = emoji;
    this.speed = random(2 + phase * 1.5, 5 + phase * 2);
  }

  fall() {
    this.y += this.speed;
  }

  display() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }

  offScreen() {
    return this.y > height;
  }

  hits(truck) {
    return (
      this.x > truck.x &&
      this.x < truck.x + truck.width &&
      this.y > truck.y &&
      this.y < truck.y + truck.height
    );
  }
}

// --- Definição da Classe BadItem (Itens ruins, bombas) ---
class BadItem {
  constructor(x, phase) {
    this.x = x;
    this.y = 0;
    this.size = 30;
    this.speed = random(3 + phase * 1.5, 6 + phase * 2);
  }

  fall() {
    this.y += this.speed;
  }

  display() {
    textSize(32);
    text("💣", this.x, this.y);
  }

  offScreen() {
    return this.y > height;
  }

  hits(truck) {
    return (
      this.x > truck.x &&
      this.x < truck.x + truck.width &&
      this.y > truck.y &&
      this.y < truck.y + truck.height
    );
  }
}

// --- Definição da Classe SpecialFruit (Fruta especial) ---
class SpecialFruit {
  constructor(x, phase) {
    this.x = x;
    this.y = 0;
    this.size = 30;
    this.emoji = specialEmoji;
    this.speed = random(3 + phase * 1.5, 6 + phase * 2);
  }

  fall() {
    this.y += this.speed;
  }

  display() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }

  offScreen() {
    return this.y > height;
  }

  hits(truck) {
    return (
      this.x > truck.x &&
      this.x < truck.x + truck.width &&
      this.y > truck.y &&
      this.y < truck.y + truck.height
    );
  }
}

// --- Setup Inicial do Jogo ---
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(32);
  truck = new Truck();

  startButton = createButton("🎮 Iniciar Jogo");
  startButton.position(width / 2 - 70, height / 2 + 20);
  startButton.size(140, 50);
  startButton.style("font-size", "18px");
  startButton.mousePressed(() => {
    gameStarted = true;
    startButton.hide();
  });
}

// --- Loop Principal do Jogo ---
function draw() {
  // Tela inicial (antes do jogo começar)
  if (!gameStarted) {
    background(180, 220, 180);
    fill(0);
    textSize(42);
    text("🍉 Caminhão das Frutas 🍉", width / 2, height / 2 - 60);
    textSize(20);
    text("Pegue frutas e desvie das bombas!", width / 2, height / 2 - 20);
    return;
  }

  // Tela de vitória (quando passar da última fase)
  if (phase > 5) {
    background(50, 180, 50);
    fill(255);
    textSize(36);
    text("🎉 Parabéns Você ganhou!!!! 🎉", width / 2, height / 2 - 60);
    textSize(24);
    text("🍎 Você pegou frutas suficientes para alimentar as pessoas.", width / 2, height / 2);
    text("Pressione espaço para tentar de novo.", width / 2, height / 2 + 50);
    return;
  }

  // Fundo do jogo conforme a fase
  switch (phase) {
    case 1: background(100, 200, 100); break;
    case 2: background(150, 150, 255); break;
    case 3: background(100, 100, 100); break;
    case 4: background(200, 180, 100); break;
    case 5: background(180, 100, 150); break;
    default: background(50, 50, 50);
  }

  if (!gameOver) {
    // Atualiza e mostra o caminhão
    truck.update();
    truck.display();

    // Probabilidades de aparecer frutas, itens ruins e especiais, aumentam conforme a fase
    let fruitChance = 0.02 + 0.005 * (phase - 1);
    let badChance = 0.01 + 0.01 * (phase - 1);
    let specialChance = 0.002;

    if (random(1) < fruitChance) {
      let emoji = random(fruitEmojis);
      fruits.push(new Fruit(random(width), phase, emoji));
    }

    if (random(1) < badChance) {
      badItems.push(new BadItem(random(width), phase));
    }

    if (random(1) < specialChance) {
      specialFruits.push(new SpecialFruit(random(width), phase));
    }

    // Atualiza frutas, verifica colisão e remove fora da tela
    for (let i = fruits.length - 1; i >= 0; i--) {
      fruits[i].fall();
      fruits[i].display();

      if (fruits[i].hits(truck)) {
        score += doublePoints ? 4 : 2;
        fruits.splice(i, 1);

        if (score >= fruitsToPassPhase[phase - 1]) {
          phase++;
          score = 0;
          fruits = [];
          badItems = [];
          specialFruits = [];
        }
      } else if (fruits[i].offScreen()) {
        fruits.splice(i, 1);
      }
    }

    // Atualiza itens ruins, verifica colisão e remove fora da tela
    for (let i = badItems.length - 1; i >= 0; i--) {
      badItems[i].fall();
      badItems[i].display();

      if (badItems[i].hits(truck)) {
        if (!immunity) {
          gameOver = true;
        } else {
          badItems.splice(i, 1);
        }
      } else if (badItems[i].offScreen()) {
        badItems.splice(i, 1);
      }
    }

    // Atualiza frutas especiais, verifica colisão e remove fora da tela
    for (let i = specialFruits.length - 1; i >= 0; i--) {
      specialFruits[i].fall();
      specialFruits[i].display();

      if (specialFruits[i].hits(truck)) {
        immunity = true;
        doublePoints = true;
        immunityTimer = millis();
        specialFruits.splice(i, 1);
      } else if (specialFruits[i].offScreen()) {
        specialFruits.splice(i, 1);
      }
    }

    // Tempo limite da imunidade e pontos em dobro (10 segundos)
    if (immunity && millis() - immunityTimer > 10000) {
      immunity = false;
      doublePoints = false;
    }

    // Barra de progresso da fase
    let barWidth = 300;
    let barHeight = 20;
    let barX = width / 2 - barWidth / 2;
    let barY = 10;

    fill(200);
    rect(barX, barY, barWidth, barHeight);

    let progress = constrain(score / fruitsToPassPhase[phase - 1], 0, 1);
    fill(50, 200, 50);
    rect(barX, barY, barWidth * progress, barHeight);

    // Texto percentual da fase
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(`${floor(progress * 100)}% da fase ${phase}`, barX + barWidth / 2, barY + barHeight / 2);

    // Pontuação à esquerda
    fill(0);
    textSize(24);
    textAlign(LEFT, CENTER);
    text(`Pontos: ${score}`, 20, 30);

    // Fase atual à direita
    textAlign(RIGHT, CENTER);
    text(`Fase: ${phase}`, width - 20, 30);

    // Tempo restante de imunidade no canto inferior direito
    if (immunity) {
      let remaining = 10 - floor((millis() - immunityTimer) / 1000);
      fill(255, 215, 0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Imune: ${remaining}s`, width - 80, height - 30);
    }

    // Texto secreto "BRENO LINDO" piscando quando Shift + B são pressionados
    if (keyIsDown(66) && (keyIsDown(SHIFT))) {
      blinkTimer++;
      if (frameCount % 30 < 15) { // pisca a cada meio segundo
        fill(255, 0, 150);
        textSize(36);
        textAlign(CENTER, CENTER);
        text("BRENO LINDO", width / 2, height / 2);
      }
    }
  } else {
    // Tela de game over
    background(150, 50, 50);
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("💥 GAME OVER 💥", width / 2, height / 2 - 40);
    textSize(24);
    text("Pressione espaço para reiniciar", width / 2, height / 2 + 20);
  }
}

// Reinicia o jogo ao pressionar espaço após game over ou vitória
function keyPressed() {
  if ((gameOver || phase > 5) && key === ' ') {
    score = 0;
    phase = 1;
    gameOver = false;
    fruits = [];
    badItems = [];
    specialFruits = [];
    immunity = false;
    doublePoints = false;
    gameStarted = true;
  }
}
