let fireX, fireY; // Posições do fogo
let waterX, waterY; // Posições da água
let fireOn = true; // Estado do fogo

function setup() {
  createCanvas(400, 400);
  fireX = width / 2; // Posição inicial do fogo
  fireY = height / 2;
  waterX = 50; // Posição inicial da água
  waterY = height - 50;
  textSize(32); // Tamanho do texto para os emojis
}

function draw() {
  background(200); // Fundo claro

  // Desenha o fogo se estiver ligado
  if (fireOn) {
    text('🔥', fireX - 16, fireY + 10); // Desenha o emoji de fogo
  }

  // Desenha a água
  text('💧', waterX - 16, waterY + 10); // Desenha o emoji de água

  // Verifica se a água está sobre o fogo
  if (fireOn && dist(waterX, waterY, fireX, fireY) < 40) {
    fireOn = false; // Apaga o fogo
  }
}

// Função para controlar a água com as setas do teclado
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    waterX -= 5; // Move a água para a esquerda
  } else if (keyCode === RIGHT_ARROW) {
    waterX += 5; // Move a água para a direita
  } else if (keyCode === UP_ARROW) {
    waterY -= 5; // Move a água para cima
  } else if (keyCode === DOWN_ARROW) {
    waterY += 5; // Move a água para baixo
  }
}