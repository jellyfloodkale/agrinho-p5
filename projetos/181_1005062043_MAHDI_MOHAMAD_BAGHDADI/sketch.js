let gotas = [];
let solY = 80;
let fase = "evaporando";
let nuvemX = 0;
let corSol = [255, 204, 0];

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER);
  textSize(16);
}

function draw() {
  background(180, 230, 255); // Céu

  desenhaSol(mouseX, solY);
  nuvemX += 0.2;
  if (nuvemX > width) nuvemX = -120;
  desenhaNuvem(nuvemX, 100);

  desenhaTerreno();
  desenhaCampo();
  desenhaCidade();

  if (fase === "evaporando") {
    evaporarAgua();
  } else if (fase === "condensando") {
    condensarAgua();
  } else if (fase === "precipitando") {
    precipitarAgua();
  }

  desenhaInfo();

  if (frameCount % 300 === 0) {
    if (fase === "evaporando") fase = "condensando";
    else if (fase === "condensando") fase = "precipitando";
    else if (fase === "precipitando") fase = "evaporando";
  }
}
// função para desenhar o sol
function desenhaSol(x, y) {
  fill(corSol);
  noStroke();
  ellipse(x, y, 60, 60);
}
// funçao para desenhar a nuvem
function desenhaNuvem(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 80, 60);
  ellipse(x + 30, y - 10, 70, 50);
  ellipse(x - 30, y - 10, 70, 50);
}
// funçao para desenhar o terreno
function desenhaTerreno() {
  // Divisão horizontal
  fill(34, 139, 34); // gramado
  rect(0, height - 100, width / 2, 100); // campo

  fill(180); // concreto
  rect(width / 2, height - 100, width / 2, 100); // cidade
}
// funçao para desenhar o campo
function desenhaCampo() {
  // Árvores
  for (let i = 50; i <= width / 2 - 50; i += 80) {
    fill(139, 69, 19); // tronco
    rect(i + 10, height - 140, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 15, height - 150, 40, 40);
  }

  // Casas
  desenhaCasa(80, height - 140);
  desenhaCasa(180, height - 140);
  desenhaCasa(280, height - 140);
}
// funçao para desenhar casa
function desenhaCasa(x, y) {
  fill(200, 150, 100);
  rect(x, y, 50, 40);
  fill(150, 50, 50);
  triangle(x, y, x + 25, y - 25, x + 50, y);
}
// funçao pra desenhar a cidade 
function desenhaCidade() {
  // Prédios
  for (let i = width / 2 + 30; i < width - 60; i += 70) {
    fill(100);
    rect(i, height - 180, 50, 80);
    fill(255);
    for (let j = 0; j < 3; j++) {
      rect(i + 10, height - 170 + j * 20, 30, 10); // janelas
    }
  }
}
// funçao para desenhar a evaporaçao da agua 
function evaporarAgua() {
  fill(0);
  text("Evaporação: o Sol aquece a água e a transforma em vapor", width / 2, 30);
  noFill();
  stroke(200);
  for (let i = 0; i < 5; i++) {
    let x = random(100, width - 100);
    let y = random(height - 80, height - 60);
    line(x, y, x, y - 20);
  }
}
// funçao para desenhar a condensaçao da agua
function condensarAgua() {
  fill(0);
  text("Condensação: o vapor se transforma em gotas de água", width / 2, 30);

  if (frameCount % 10 === 0) {
    gotas.push(new Gota(random(width / 2 - 50, width / 2 + 50), 120));
  }

  for (let i = gotas.length - 1; i >= 0; i--) {
    let g = gotas[i];
    g.update();
    g.show();
    if (g.y > height - 100) {
      gotas.splice(i, 1);
    }
  }
}
// funçao para desenhar precipitar agua
function precipitarAgua() {
  fill(0);
  text("Precipitação: a água cai em gotas pela tela", width / 2, 30);

  if (frameCount % 5 === 0) {
    gotas.push(new Gota(random(width / 4, width * 3 / 4), 120));
  }

  for (let i = gotas.length - 1; i >= 0; i--) {
    let g = gotas[i];
    g.update();
    g.show();
    if (g.y > height - 100) {
      gotas.splice(i, 1);
    }
  }
}
// funçao para desenhar Info
function desenhaInfo() {
  noStroke();
  fill(0);
  text("Fase do Ciclo da Água: " + fase, width / 2, height - 20);
  text("Clique para interagir com o ciclo!", width / 2, height - 50);

  fill(0, 100, 0);
  textSize(20);
  text("💧 Cuidar da água é dever de todos – no campo e na cidade!", width / 2, height - 5);
  textSize(16);
}

class Gota {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = random(2, 4);
  }

  update() {
    this.y += this.vel;
  }

  show() {
    noStroke();
    fill(0, 100, 255);
    ellipse(this.x, this.y, 5, 10);
  }
}
// funçao para desenhar mouse Pressed 
function mousePressed() {
  if (fase === "evaporando") fase = "condensando";
  else if (fase === "condensando") fase = "precipitando";
  else if (fase === "precipitando") fase = "evaporando";
}
