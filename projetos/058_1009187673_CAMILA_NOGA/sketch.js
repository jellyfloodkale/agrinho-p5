// Jogo: Campo x Cidade

// Variáveis do jogo
let campoRecursos = 100;
let cidadeSatisfacao = 100;
let poluicao = 0;
let tempo = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 400);
  textFont('Arial');
}

function draw() {
  background(220);
  desenhaCenario();
  desenhaBarras();

  if (!gameOver) {
    tempo++;
    if (frameCount % 60 === 0) {
      atualizarJogo();
    }
  } else {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over! Pressione R para reiniciar", width / 2, height / 2);
  }
}

function desenhaCenario() {
  // Campo (esquerda)
  fill(120, 200, 120);
  rect(0, 0, width / 2, height);
  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("CAMPO", width / 4, 10);

  // Cidade (direita)
  fill(180);
  rect(width / 2, 0, width / 2, height);
  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("CIDADE", 3 * width / 4, 10);

  // Poluição visual (cidade)
  fill(100, 100, 100, map(poluicao, 0, 100, 0, 200));
  rect(width / 2, 0, width / 2, height);
}

function desenhaBarras() {
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Recursos do Campo: ${campoRecursos}`, 10, 20);
  text(`Satisfação da Cidade: ${cidadeSatisfacao}`, 10, 40);
  text(`Poluição: ${poluicao}`, 10, 60);
  text(`Tempo: ${tempo}`, 10, 80);
}

function atualizarJogo() {
  // Consumo de recursos pela cidade
  campoRecursos -= 5;
  cidadeSatisfacao -= 2;
  poluicao += 2;

  // Verifica condições de fim de jogo
  if (campoRecursos <= 0 || cidadeSatisfacao <= 0 || poluicao >= 100) {
    gameOver = true;
  }
}

function mousePressed() {
  if (gameOver) return;

  // Clique na esquerda (campo)
  if (mouseX < width / 2) {
    // Produzir comida
    campoRecursos += 10;
  } else {
    // Clique na direita (cidade): entregar comida e reduzir poluição
    if (campoRecursos >= 10) {
      campoRecursos -= 10;
      cidadeSatisfacao += 10;
      poluicao -= 5;
      if (poluicao < 0) poluicao = 0;
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarJogo();
  }
}

function reiniciarJogo() {
  campoRecursos = 100;
  cidadeSatisfacao = 100;
  poluicao = 0;
  tempo = 0;
  gameOver = false;
}