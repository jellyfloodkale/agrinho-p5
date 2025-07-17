// Variáveis globais
let campo; // personagem do campo
let cidade; // personagem da cidade
let environment; // ambiente
let gameState = 'menu'; // estados do jogo: menu, jogando, finalizado
let message = '';

let obstacles = [];
let particles = [];

function preload() {
  // Aqui você pode carregar imagens, sons, etc.
  // Exemplo: loadImage('caminho/para/imagem.png');
  // Para simplicidade, usaremos formas básicas
}

function setup() {
  createCanvas(1000, 600);
  frameRate(60);
  // Inicializar personagens
  campo = new Character(150, height - 100, 'Campo', color(34, 139, 34));
  cidade = new Character(width - 150, height - 100, 'Cidade', color(70, 70, 70));
  environment = new Environment();

  // Criar obstáculos
  for (let i = 0; i < 10; i++) {
    obstacles.push(new Obstacle(random(width), random(height - 150), 40, 20));
  }

  // Criar partículas
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height), 2));
  }
}

function draw() {
  background(200, 225, 255); // céu

  if (gameState === 'menu') {
    drawMenu();
  } else if (gameState === 'jogando') {
    drawGame();
  } else if (gameState === 'final') {
    drawFinal();
  }
}

// Menu do jogo
function drawMenu() {
  fill(50);
  textSize(48);
  textAlign(CENTER);
  text('Festejando Conexão: Campo & Cidade', width / 2, height / 3);
  textSize(24);
  text('Pressione ENTER para Começar', width / 2, height / 2);
}

// Tela final
function drawFinal() {
  fill(50);
  textSize(48);
  textAlign(CENTER);
  text('Conexão Realizada!', width / 2, height / 3);
  textSize(24);
  text('Pressione R para Reiniciar', width / 2, height / 2);
  // Animação de celebração
  fill(255, 215, 0);
  ellipse(width / 2, height / 2 + 50, 100 + sin(frameCount * 0.1) * 20);
}

// Jogo principal
function drawGame() {
  // Desenhar ambiente
  environment.update();
  environment.display();

  // Atualizar e desenhar obstáculos
  for (let obs of obstacles) {
    obs.display();
    obs.checkCollision(campo);
    obs.checkCollision(cidade);
  }

  // Atualizar partículas
  for (let p of particles) {
    p.update();
    p.display();
  }

  // Atualizar personagens
  campo.update();
  campo.display();

  cidade.update();
  cidade.display();

  // Movimento realista: aplicar gravidade e fricção
  campo.applyPhysics();
  cidade.applyPhysics();

  // Verificar conexão
  if (campo.isNear(cidade, 50)) {
    gameState = 'final';
    message = 'Vocês se encontraram! Conexão estabelecida!';
  }

  // Instruções
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text('Use SETAS para mover o Campo', 20, 30);
  text('Use WASD para mover a Cidade', 20, 50);
  text('Conecte-se!', 20, 70);
}

// Detectar teclas para movimento
function keyPressed() {
  if (gameState === 'menu') {
    if (keyCode === ENTER) {
      gameState = 'jogando';
    }
  } else if (gameState === 'final') {
    if (key === 'r' || key === 'R') {
      resetGame();
    }
  } else if (gameState === 'jogando') {
    campo.handleKeyPress(keyCode);
    cidade.handleKeyPress(key);
  }
}

function keyReleased() {
  if (gameState === 'jogando') {
    campo.handleKeyRelease(keyCode);
    cidade.handleKeyRelease(key);
  }
}

function resetGame() {
  // Reset personagens
  campo = new Character(150, height - 100, 'Campo', color(34, 139, 34));
  cidade = new Character(width - 150, height - 100, 'Cidade', color(70, 70, 70));
  gameState = 'jogando';
}

// Classes

class Character {
  constructor(x, y, label, col) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = 40;
    this.label = label;
    this.color = col;
    this.speed = 0.5;
    this.maxSpeed = 3;
    this.friction = 0.9;
    this.gravity = 0.3;
    this.onGround = false;
    this.moveFlags = {up:false, down:false, left:false, right:false};
  }

  handleKeyPress(key) {
    if (this.label === 'Campo') {
      if (key === UP_ARROW) this.moveFlags.up = true;
      if (key === DOWN_ARROW) this.moveFlags.down = true;
      if (key === LEFT_ARROW) this.moveFlags.left = true;
      if (key === RIGHT_ARROW) this.moveFlags.right = true;
    } else if (this.label === 'Cidade') {
      if (key === 'w' || key === 'W') this.moveFlags.up = true;
      if (key === 's' || key === 'S') this.moveFlags.down = true;
      if (key === 'a' || key === 'A') this.moveFlags.left = true;
      if (key === 'd' || key === 'D') this.moveFlags.right = true;
    }
  }

  handleKeyRelease(key) {
    if (this.label === 'Campo') {
      if (key === UP_ARROW) this.moveFlags.up = false;
      if (key === DOWN_ARROW) this.moveFlags.down = false;
      if (key === LEFT_ARROW) this.moveFlags.left = false;
      if (key === RIGHT_ARROW) this.moveFlags.right = false;
    } else if (this.label === 'Cidade') {
      if (key === 'w' || key === 'W') this.moveFlags.up = false;
      if (key === 's' || key === 'S') this.moveFlags.down = false;
      if (key === 'a' || key === 'A') this.moveFlags.left = false;
      if (key === 'd' || key === 'D') this.moveFlags.right = false;
    }
  }

  update() {
    // Movimento com aceleração
    if (this.moveFlags.up) this.acc.y -= this.speed;
    if (this.moveFlags.down) this.acc.y += this.speed;
    if (this.moveFlags.left) this.acc.x -= this.speed;
    if (this.moveFlags.right) this.acc.x += this.speed;

    // Aplicar física
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    // Resetar aceleração
    this.acc.mult(0);

    // Aplicar fricção
    this.vel.mult(this.friction);

    // Limites do cenário
    this.pos.x = constrain(this.pos.x, this.size/2, width - this.size/2);
    this.pos.y = constrain(this.pos.y, this.size/2, height - this.size/2 - 50);
  }

  applyPhysics() {
    // Gravidade
    this.acc.y += this.gravity;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.color);
    ellipse(0, 0, this.size, this.size);
    // Cabeça
    fill(255);
    ellipse(0, -this.size/4, this.size/2, this.size/2);
    // Olhos
    fill(0);
    ellipse(-this.size/8, -this.size/4, 5, 5);
    ellipse(this.size/8, -this.size/4, 5, 5);
    // Boca
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, this.size/8, this.size/4, this.size/4, 0, PI);
    pop();

    // Nome
    fill(0);
    textSize(14);
    textAlign(CENTER);
    text(this.label, this.pos.x, this.pos.y + this.size);
  }

  isNear(other, distance) {
    return this.pos.dist(other.pos) < distance;
  }
}

class Environment {
  constructor() {
    this.trees = [];
    this.buildings = [];
    this.createEnvironment();
  }

  createEnvironment() {
    // Árvores no campo
    for (let i = 0; i < 20; i++) {
      this.trees.push(new Tree(random(50, width/2 - 50), random(height - 150, height - 50)));
    }
    // Prédios na cidade
    for (let i = 0; i < 10; i++) {
      this.buildings.push(new Building(600 + i*50, height - 100 - random(0, 50), random(30,50), random(80,150)));
    }
  }

  update() {
    // Pode adicionar animações ou mudanças dinâmicas
  }

  display() {
    // Desenhar árvores
    for (let t of this.trees) {
      t.display();
    }
    // Desenhar prédios
    for (let b of this.buildings) {
      b.display();
    }
    // Desenhar estrada
    fill(100);
    rect(0, height - 50, width, 50);
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40);
  }

  display() {
    fill(139,69,19);
    rect(this.x, this.y, 4, this.size);
    fill(34,139,34);
    ellipse(this.x + 2, this.y - this.size/2, this.size, this.size);
  }
}

class Building {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display() {
    fill(70);
    rect(this.x, this.y, this.width, this.height);
    // Janelas
    fill(255, 255, 0);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        rect(this.x + 5 + i*10, this.y + 5 + j*15, 8, 8);
      }
    }
  }
}

class Obstacle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  display() {
    fill(150, 0, 0);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  checkCollision(character) {
    if (
      character.pos.x + character.size/2 > this.pos.x &&
      character.pos.x - character.size/2 < this.pos.x + this.w &&
      character.pos.y + character.size/2 > this.pos.y &&
      character.pos.y - character.size/2 < this.pos.y + this.h
    ) {
      // Reação à colisão: empurrar personagem para trás
      // ou fazer com que ele pare
      // Aqui, uma simples reação: força de empurrar
      if (character.label === 'Campo') {
        if (character.pos.x < this.pos.x) {
          character.pos.x = this.pos.x - character.size/2;
        } else {
          character.pos.x = this.pos.x + this.w + character.size/2;
        }
        character.vel.x *= -0.5;
      } else {
        if (character.pos.x < this.pos.x) {
          character.pos.x = this.pos.x - character.size/2;
        } else {
          character.pos.x = this.pos.x + this.w + character.size/2;
        }
        character.vel.x *= -0.5;
      }
    }
  }
}

class Particle {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(0.5);
    this.size = size;
    this.alpha = 255;
  }

  update() {
    this.pos.add(this.vel);
    this.alpha -= 2;
    if (this.alpha <= 0) {
      this.pos = createVector(random(width), random(height));
      this.alpha = 255;
    }
  }

  display() {
    noStroke();
    fill(255, 215, 0, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}