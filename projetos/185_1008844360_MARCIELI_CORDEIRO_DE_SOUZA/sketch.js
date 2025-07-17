let firefighter;
let fires = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  firefighter = new Firefighter();
}

function draw() {
  background(0, 150, 0); // Cor de fundo representando a floresta
  firefighter.show();
  firefighter.move();
  
  // Desenhar e gerenciar o fogo
  for (let i = fires.length - 1; i >= 0; i--) {
    fires[i].show();
    if (fires[i].isExtinguished(firefighter)) {
      score++;
      fires.splice(i, 1); // Remove o fogo apagado
    }
  }
  
  // Adicionar lógica para gerar fogo aleatoriamente
  if (frameCount % 60 === 0) { // A cada 60 frames
    fires.push(new Fire(random(width), random(height)));
  }
  
  // Exibir pontuação
  fill(255);
  textSize(24);
  text("Pontos: " + score, 10, 30);
}

class Firefighter {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }
  
  show() {
    fill("#03A9F4"); // Cor do bombeiro
    ellipse(this.x, this.y, 30, 30); // Representação simples do bombeiro
  }
  
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }
}

class Fire {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }
  
  show() {
    fill(255, 100, 0); // Cor do fogo
    ellipse(this.x, this.y, this.size, this.size); // Representação simples do fogo
  }
  
  isExtinguished(firefighter) {
    let d = dist(this.x, this.y, firefighter.x, firefighter.y);
    return d < (this.size / 2 + 15); // Verifica se o bombeiro está perto o suficiente para apagar o fogo
  }
}