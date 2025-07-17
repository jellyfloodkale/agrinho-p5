let player;                // O personagem principal
let platforms = [];        // Lista das plataformas
let obstacles = [];        // Lista dos obstáculos
let gravity = 0.6;         // Gravidade
let jumpPower = -12;       // Força do pulo
let score = 0;             // Pontuação do jogador
let gameOver = false;      //  de fim de jogo
let platformSpeed = 2;     // Velocidade do movimento das plataformas
let groundHeight = 40;     // Altura do chão

function setup() {
  createCanvas(800, 400);
  player = new Player(width / 2, height - groundHeight - 50);  // Posição inicial do personagem
  platforms.push(new Platform(0, height - groundHeight, width, groundHeight)); // Chão
}

function draw() {
  background(135, 206, 250); // Céu azul

  // Desenhar o personagem
  player.update();
  player.display();

  // Desenhar e mover plataformas
  for (let i = platforms.length - 1; i >= 0; i--) {
    platforms[i].update();
    platforms[i].display();

    if (platforms[i].x + platforms[i].w < 0) {
      platforms.splice(i, 1);
      score++;
    }
  }

  // Desenhar os obstáculos
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    if (obstacles[i].y > height) {
      obstacles.splice(i, 1); // Remove obstáculos fora da tela
    }

    // Verifica se o jogador colidiu com um obstáculo
    if (obstacles[i].collidesWithPlayer(player)) {
      gameOver = true;
    }
  }

  // Gera novas plataformas (mapeamento infinito)
  if (frameCount % 60 === 0) {
    let platformHeight = random(20, 40);
    let platformY = random(height - groundHeight - 150, height - groundHeight - 50);
    platforms.push(new Platform(width, platformY, random(50, 100), platformHeight));
  }

  // Gera novos obstáculos (mapeamento infinito)
  if (frameCount % 120 === 0) {
    obstacles.push(new Obstacle(width, random(50, height - groundHeight - 100))); // Obstáculo
  }

  // Verifica se o jogador caiu
  if (player.y > height - groundHeight) {
    gameOver = true;
  }

  // Fim de jogo
  if (gameOver) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Fim de Jogo!", width / 2, height / 2 - 20);
    textSize(24);
    text("Pontuação Final: " + score, width / 2, height / 2 + 40);
    noLoop(); // Para o loop do jogo
  }

  // Exibir a pontuação
  fill(0);
  textSize(24);
  text("Pontuação: " + score, 20, 30);
}

// Função que verifica a colisão do jogador com plataformas
function checkCollision(platform) {
  if (player.y + player.size / 2 >= platform.y && player.y + player.size / 2 <= platform.y + platform.h && player.x + player.size / 2 > platform.x && player.x - player.size / 2 < platform.x + platform.w) {
    return true;
  }
  return false;
}

// Classe do jogador (emoji)
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40; // Tamanho do emoji
    this.velocityY = 0; // Velocidade no eixo Y (para simular a gravidade)
    this.emoji = "🌱"; // Emoji do personagem (Mario)
  }

  update() {
    // Verifica se o jogador pressionou as teclas de direção
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }

    // Gravidade
    this.velocityY += gravity;
    this.y += this.velocityY;

    // Impede que o jogador saia da tela lateralmente
    this.x = constrain(this.x, 0, width);

    // Verifica se o jogador está no chão ou em uma plataforma
    let onGround = false;
    for (let platform of platforms) {
      if (this.checkCollision(platform)) {
        onGround = true;
        this.velocityY = 0;
        this.y = platform.y - this.size / 2; // Coloca o jogador sobre a plataforma
      }
    }

    if (!onGround && this.y < height - groundHeight) {
      this.velocityY = constrain(this.velocityY, -20, 20); // Impede que o jogador caia muito rápido
    }
  }

  // Exibe o personagem
  display() {
    textSize(this.size);
    text(this.emoji, this.x - this.size / 4, this.y + this.size / 4);
  }

  // Função de pulo
  jump() {
    this.velocityY = jumpPower;
  }

  // Função de verificação de colisão com a plataforma
  checkCollision(platform) {
    if (
      this.y + this.size / 2 >= platform.y &&
      this.y + this.size / 2 <= platform.y + platform.h &&
      this.x + this.size / 2 > platform.x &&
      this.x - this.size / 2 < platform.x + platform.w
    ) {
      return true;
    }
    return false;
  }
}

// Classe da plataforma
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // Atualiza a posição da plataforma
  update() {
    this.x -= platformSpeed; // Move as plataformas para a esquerda
  }

  // Exibe a plataforma
  display() {
    fill('brown'); // Cor da plataforma (verde)
    rect(this.x, this.y, this.w, this.h);
  }
}

// Classe do obstáculo
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speed = 5; // Velocidade de queda do obstáculo
    this.emoji = "☢️"; // Emoji de obstáculo (símbolo de alerta)
  }

  // Atualiza a posição do obstáculo
  update() {
    this.x -= platformSpeed; // Move os obstáculos para a esquerda
  }

  // Exibe o obstáculo
  display() {
    textSize(this.size);
    text(this.emoji, this.x - this.size / 4, this.y + this.size / 4);
  }

  // Verifica se o obstáculo colidiu com o jogador
  collidesWithPlayer(player) {
    return (
      this.x > player.x - player.size / 2 &&
      this.x < player.x + player.size / 2 &&
      this.y > player.y - player.size / 2 &&
      this.y < player.y + player.size / 2
    );
  }
}

// Teclas de controle
function keyPressed() {
  if (keyCode === 32) { // Tecla "Space" para pular
    player.jump();
  }
}
