let carro;
let obstaculos = [];
let velocidade = 5;
let pontos = 0;
let desafioAtivo = false;
let teclaDesafio;
let tempoDesafio = 0;

function setup() {
  createCanvas(600, 400);
  carro = new Carro();
  
  for (let i = 0; i < 5; i++) {
    obstaculos.push(new Obstaculo());
  }
}

function draw() {
  background(30, 150, 30); // Fundo verde simples (como grama)

  carro.mostrar();
  carro.mover();

  for (let obs of obstaculos) {
    obs.mover();
    obs.mostrar();
    
    if (carro.colide(obs)) {
      noLoop();
      textSize(40);
      fill(255, 0, 0);
      text('GAME OVER', width / 2 - 100, height / 2);
    }
  }

  if (!desafioAtivo && frameCount % 300 === 0) { 
    desafioAtivo = true;
    teclaDesafio = String.fromCharCode(65 + floor(random(0, 26))); 
    tempoDesafio = millis();
  }

  if (desafioAtivo) {
    textSize(20);
    fill(255);
    text('Pressione: ' + teclaDesafio, width / 2 - 70, 30);
    
    if (millis() - tempoDesafio > 3000) { 
      desafioAtivo = false;
    }
  }

  fill(255);
  textSize(16);
  text('Pontos: ' + pontos, 10, 20);
}

function keyPressed() {
  if (desafioAtivo && key.toUpperCase() === teclaDesafio) {
    pontos += 10;
    velocidade += 0.5;
    desafioAtivo = false;
  }

  if (keyCode === LEFT_ARROW) {
    carro.dir = -1;
  } else if (keyCode === RIGHT_ARROW) {
    carro.dir = 1;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    carro.dir = 0;
  }
}

class Carro {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.w = 40;
    this.h = 60;
    this.dir = 0;
  }

  mostrar() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  mover() {
    this.x += this.dir * 5;
    this.x = constrain(this.x, 0, width - this.w);
  }

  colide(obs) {
    return !(this.x + this.w < obs.x || this.x > obs.x + obs.w || this.y + this.h < obs.y || this.y > obs.y + obs.h);
  }
}

class Obstaculo {
  constructor() {
    this.x = random(width);
    this.y = random(-400, -50);
    this.w = 40;
    this.h = 40;
  }

  mostrar() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }

  mover() {
    this.y += velocidade;
    if (this.y > height) {
      this.y = random(-200, -50);
      this.x = random(width);
      pontos++;
    }
  }
}
