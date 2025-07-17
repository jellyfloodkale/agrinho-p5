let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  ball.update();
  ball.show();

  leftPaddle.update();
  leftPaddle.show();

  rightPaddle.update();
  rightPaddle.show();

  // Desenhar a linha do meio
  stroke(255);
  strokeWeight(4);
  line(width / 2, 0, width / 2, height);

  // Exibir pontuação
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, width * 3 / 4, 50);
  
  // Verificar se a bola saiu da tela
  if (ball.x < 0) {
    rightScore++;
    ball.reset();
  }
  if (ball.x > width) {
    leftScore++;
    ball.reset();
  }
}

// Bola
class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 12;
    this.speedX = random(2, 4) * (random() < 0.5 ? 1 : -1); // Bola começa em direções aleatórias
    this.speedY = random(2, 4) * (random() < 0.5 ? 1 : -1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote da bola nas bordas superior e inferior
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.speedY *= -1;
    }

    // Verifica colisão com as raquetes
    if (this.x - this.radius < leftPaddle.x + leftPaddle.width && this.y > leftPaddle.y && this.y < leftPaddle.y + leftPaddle.height) {
      this.speedX *= -1;
    }
    if (this.x + this.radius > rightPaddle.x && this.y > rightPaddle.y && this.y < rightPaddle.y + rightPaddle.height) {
      this.speedX *= -1;
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}

// Raquete
class Paddle {
  constructor(isLeft) {
    this.isLeft = isLeft;
    this.width = 12;
    this.height = 100;
    if (isLeft) {
      this.x = 0;
    } else {
      this.x = width - this.width;
    }
    this.y = height / 2 - this.height / 2;
    this.speed = 6;
  }

  update() {
    // Controle da raquete do jogador
    if (this.isLeft) {
      if (keyIsDown(87)) { // 'W' para cima
        this.y -= this.speed;
      }
      if (keyIsDown(83)) { // 'S' para baixo
        this.y += this.speed;
      }
    } 
    // Raquete do computador (simples AI)
    else {
      if (this.y + this.height / 2 < ball.y) {
        this.y += this.speed;
      } else if (this.y + this.height / 2 > ball.y) {
        this.y -= this.speed;
      }
    }

    // Limite de movimento da raquete
    this.y = constrain(this.y, 0, height - this.height);
  }

  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}
