let isCity = false; // Define se está na cidade ou no campo

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (isCity) {
    drawCity();
  } else {
    drawField();
  }
}

function drawField() {
  background(135, 206, 235); // Céu azul claro
  fill(34, 139, 34); // Verde para o campo
  rect(0, height - 50, width, 50); // Grama

  let groundLevel = height - 50; // Nível do chão verde

  // Árvores aprimoradas e AGORA NO CHÃO!
  drawTree(100, groundLevel, 60, 100);
  drawTree(300, groundLevel, 80, 120);
  drawTree(500, groundLevel, 70, 110);

  // Sol
  fill(255, 223, 0);
  ellipse(100, 100, 80, 80);

  // Pássaros aprimorados
  drawBird(250, 150);
  drawBird(350, 170);
  drawBird(280, 130);

  // Arbustos e flores
  drawBush(50, groundLevel);
  drawBush(200, groundLevel);
  drawBush(400, groundLevel);
  drawBush(550, groundLevel);
  drawBush(150, groundLevel - 10);
  drawBush(350, groundLevel - 5);
  drawFlower(70, groundLevel);
  drawFlower(220, groundLevel);
  drawFlower(420, groundLevel);
  drawFlower(530, groundLevel);
  drawFlower(180, groundLevel - 2);
  drawFlower(380, groundLevel - 8);

  // Texto sobre o Campo
  fill(0, 0, 0);
  textSize(16);
  textAlign(LEFT, TOP);
  let campoText = "O campo vai muito além de um lugar; é um modo de vida essencial, moldado pela vida rural, agricultura e pecuária.Ele nutre as cidades, fornecendo alimentos e matérias-primas vitais para o dia a dia urbano.";
  text(campoText, 20, 20, width - 40, height - 100);
}

function drawCity() {
  background(169, 169, 169); // Cor do fundo de cidade cinza

  let streetLevel = height - 30;

  // Estruturas da cidade
  drawBuilding(50, streetLevel, 100, 50, 20);
  drawBuilding(150, streetLevel, 120, 60, 25);
  drawBuilding(250, streetLevel, 80, 45, 15);
  drawBuilding(350, streetLevel, 150, 70, 30);
  drawBuilding(450, streetLevel, 90, 55, 18);

  // Rua
  fill(50);
  rect(0, streetLevel, width, 30);

  // Carros aprimorados
  drawCar(80, height - 50);
  drawCar(200, height - 50);
  drawCar(400, height - 50);

  // Texto sobre a Cidade
  fill(255, 255, 255);
  textSize(16);
  textAlign(LEFT, TOP);
  let cityText = "A cidade é um centro dinâmico de inovação e diversidade, onde o ritmo acelerado e a energia vibrante moldam o cotidiano.";
  text(cityText, 20, 20, width - 40, height - 100);
}

// FUNÇÕES DE DESENHO APRIMORADAS

function drawTree(x, yBase, foliageWidth, trunkHeight) {
  // Tronco
  fill(139, 69, 19); // Marrom
  rect(x - (foliageWidth / 8), yBase - trunkHeight, foliageWidth / 4, trunkHeight);

  // Folhagem com mais forma
  fill(34, 139, 34); // Verde escuro
  ellipse(x, yBase - trunkHeight - (foliageWidth / 4), foliageWidth, foliageWidth * 0.8);
  fill(50, 205, 50); // Verde médio
  ellipse(x - (foliageWidth / 6), yBase - trunkHeight - (foliageWidth / 2.5), foliageWidth * 0.7, foliageWidth * 0.7);
  fill(60, 179, 113); // Verde claro
  ellipse(x + (foliageWidth / 6), yBase - trunkHeight - (foliageWidth / 2.5), foliageWidth * 0.6, foliageWidth * 0.6);
}

// Desenha um arbusto
function drawBush(x, yBase) {
  fill(60, 179, 113); // Verde claro
  noStroke();
  ellipse(x, yBase, 40, 30);
  ellipse(x + 15, yBase - 10, 30, 25);
  ellipse(x - 10, yBase - 8, 35, 28);
  stroke(0);
}

// Desenha uma flor
function drawFlower(x, yBase) {
  fill(0, 128, 0); // Caule verde escuro
  rect(x, yBase - 10, 2, 10);
  fill(255, 99, 71); // Pétalas vermelhas
  ellipse(x, yBase - 15, 8, 8);
  fill(255, 200, 0); // Miolo amarelo
  ellipse(x, yBase - 15, 3, 3);
}

function drawBird(x, y) {
  fill(0); // Pássaro preto
  line(x - 10, y, x, y - 5);
  line(x, y - 5, x + 10, y);
}

// FUNÇÕES DE CARROS E PRÉDIOS MELHORADAS

function drawCar(x, y) {
  fill(255, 0, 0); // Corpo do carro vermelho
  rect(x, y - 10, 40, 20, 5); // Corpo com bordas arredondadas

  fill(255); // Janelas brancas
  rect(x + 10, y - 17, 20, 8, 2); // Janela principal
  
  fill(0); // Preto para as rodas
  ellipse(x + 10, y + 10, 18, 18); // Roda 1
  ellipse(x + 30, y + 10, 18, 18); // Roda 2
  
  fill(169, 169, 169); // Detalhes para o para-choque
  rect(x, y + 10, 40, 5);
}

function drawBuilding(x, yBase, height, widthBuilding, numFloors) {
  // Corpo do prédio
  fill(169, 169, 169); // Cinza claro
  rect(x, yBase - height, widthBuilding, height);

  // Telhado
  fill(100); // Cinza escuro para o telhado
  triangle(x, yBase - height, x + widthBuilding, yBase - height, x + widthBuilding / 2, yBase - height - (widthBuilding / 4));

  // Janelas com mais detalhes
  let windowWidth = widthBuilding / 3;
  let windowHeight = (height - (widthBuilding / 4)) / numFloors - 5;

  for (let i = 0; i < numFloors; i++) {
    fill(255); // Janelas acesas
    rect(x + (widthBuilding / 6), yBase - height + (i * (height / numFloors)) + 10, windowWidth, windowHeight);
    
    fill(200); // Janelas apagadas
    rect(x + (widthBuilding / 6) * 3, yBase - height + (i * (height / numFloors)) + 10, windowWidth, windowHeight);
  }

  // Detalhes na fachada
  stroke(50);
  for (let i = 0; i < numFloors; i++) {
    line(x + windowWidth + 5, yBase - height + (i * (height / numFloors)), x + windowWidth + 5, yBase - height + ((i + 1) * (height / numFloors)));
  }
}

function mousePressed() {
  isCity = !isCity;
}
