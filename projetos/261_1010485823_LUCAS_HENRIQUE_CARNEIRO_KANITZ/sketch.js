let trator;
let milhos = [];
let cidadeCelebrando = false;
let drones = [];
let musica;

function preload() {
  // Carregar a música
  musica = loadSound('festejando.mp3');
}

function setup() {
  createCanvas(800, 400);

  // Criar milho
  for (let x = 40; x < width / 2 - 40; x += 30) {
    for (let y = height / 2 + 20; y < height - 40; y += 30) {
      milhos.push(new Milho(x, y));
    }
  }

  trator = new TratorColheita();

  for (let i = 0; i < 5; i++) {
    drones.push(new Drone(random(width), random(20, 100)));
  }
}

function draw() {
  background(135, 206, 235); // céu

  // Desenho do campo
  fill(100, 200, 100);
  rect(0, height / 2, width / 2, height / 2);

  // Cidade
  desenharCidade();

  // Milhos
  for (let m of milhos) {
    m.display();
  }

  // Trator
  trator.update();
  trator.display();

  // Checar se todos os milhos foram colhidos
  if (!cidadeCelebrando && !milhos.some(m => !m.colhido)) {
    cidadeCelebrando = true;
    if (!musica.isPlaying()) {
      musica.loop(); // Reproduz a música em loop
    }
  }

  // Festa na cidade
  if (cidadeCelebrando) {
    desenharFesta();
  }

  // Drones
  for (let d of drones) {
    d.update();
    d.display();
  }

  // Sol
  desenharSol();
}

// ----------------------------
// Classes e funções auxiliares
// ----------------------------

class Milho {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colhido = false;
  }

  display() {
    if (!this.colhido) {
      fill(255, 223, 0); // Amarelo milho
      ellipse(this.x, this.y, 10, 20);
      stroke(0, 128, 0);
      line(this.x, this.y, this.x, this.y - 10); // Talo
      noStroke();
    }
  }
}

class TratorColheita {
  constructor() {
    this.x = 0;
    this.y = height / 2 + 60;
    this.speed = 5;
  }

  update() {
    // Definir a posição do trator com base no mouse
    this.x = constrain(mouseX, 0, width / 2 - 40); // Restringe ao campo
    this.y = constrain(mouseY, height / 2 + 20, height - 40); // Restringe ao campo de milho

    // Colhe milho ao passar
    for (let m of milhos) {
      if (!m.colhido && dist(this.x, this.y, m.x, m.y) < 25) {
        m.colhido = true;
      }
    }
  }

  display() {
    // Corpo do trator
    fill(255, 0, 0);
    rect(this.x, this.y, 40, 20);
    
    // Cabine
    fill(200);
    rect(this.x + 10, this.y - 10, 20, 10);
    
    // Rodas
    fill(0);
    ellipse(this.x + 10, this.y + 20, 12, 12);
    ellipse(this.x + 30, this.y + 20, 12, 12);
  }
}

class Drone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = random() > 0.5 ? 1 : -1;
    this.speed = random(1, 2);
  }

  update() {
    this.x += this.speed * this.dir;
    if (this.x < 0 || this.x > width) this.dir *= -1;
  }

  display() {
    fill(50);
    rect(this.x, this.y, 20, 5);
    fill(100);
    ellipse(this.x - 5, this.y, 5, 5);
    ellipse(this.x + 25, this.y, 5, 5);

    // Pulverização visual
    fill(0, 255, 0, 100);
    ellipse(this.x + 10, this.y + 10, 5, 5);  // Partículas de pulverização
  }
}

function desenharCidade() {
  fill(180);
  rect(width / 2, height / 2, width / 2, height / 2);

  // Rua
  fill(50);
  rect(width / 2, height - 40, width / 2, 40);
  stroke(255);
  for (let i = width / 2 + 10; i < width; i += 40) {
    line(i, height - 20, i + 20, height - 20);
  }

  // Prédios
  noStroke();
  let baseX = width / 2 + 20;
  for (let i = 0; i < 4; i++) {
    let px = baseX + i * 60;
    let ph = random(160, 160);  // Altura variada para os prédios
    fill(80);
    rect(px, height - 40 - ph, 40, ph);
    fill(255, 255, 100);
    for (let y = height - 50; y > height - 40 - ph + 20; y -= 20) {
      rect(px + 5, y, 10, 10);
      rect(px + 25, y, 10, 10);
    }
  }

  // Árvores
  for (let i = 0; i < 3; i++) {
    let tx = width / 2 + 30 + i * 80;
    fill(139, 69, 19);
    rect(tx, height - 60, 10, 20);
    fill(34, 139, 34);
    ellipse(tx + 5, height - 65, 30, 30);
  }
}

function desenharFesta() {
  for (let i = 0; i < 10; i++) {
    stroke(random(255), random(255), random(255)); // Cores aleatórias
    strokeWeight(2); // Tamanho da linha
    line(
      width / 2 + random(200), // Posição aleatória no eixo X
      height / 2 + random(100), // Posição aleatória no eixo Y
      width / 2 + random(200), // Posição final aleatória no eixo X
      height / 2 + random(100) // Posição final aleatória no eixo Y
    );
  }
}

function desenharSol() {
  fill(255, 223, 0);
  ellipse(700, 100, 80, 80); // Sol no céu
}
