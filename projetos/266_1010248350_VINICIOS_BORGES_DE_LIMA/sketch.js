let carroX = 800;
let nuvemX = 0;
let milhoAnimFrame = 0;
let carroSpeed = 3; // Velocidade do carro

function setup() {
  createCanvas(800, 400);
  frameRate(30);
}

function draw() {
  background(220);
  drawCeu();
  drawDivisao();

  // Campo e cidade
  drawCampo(0, 0, width / 2, height);
  drawCidade(width / 2, 0, width / 2, height);

  // Carro animado
  drawCarro(carroX, height / 2 + 100);  // Posição ajustada para a rua
  carroX -= carroSpeed; // Movimento do carro

  // Quando o carro sair da tela, volta para o lado direito
  if (carroX < -70) {
    carroX = width; // Resetando a posição do carro
  }

  // Nuvens animadas
  drawNuvem(nuvemX, 60);
  drawNuvem(nuvemX + 200, 90);
  nuvemX += 0.5;
  if (nuvemX > width + 100) nuvemX = -100;

  // Animação da plantação de milho (balanço)
  milhoAnimFrame += 0.05;
}

function drawCeu() {
  noStroke();
  fill(135, 206, 235); // céu azul
  rect(0, 0, width, height / 2);
}

function drawDivisao() {
  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height); // Divisão entre campo e cidade
}

function drawCampo(x, y, w, h) {
  // Grama
  fill(34, 139, 34);
  rect(x, h / 2, w, h / 2);

  // Sol com raios
  fill(255, 204, 0);
  ellipse(x + w - 60, y + 60, 80, 80);
  stroke(255, 204, 0);
  for (let i = 0; i < 360; i += 45) {
    let angle = radians(i);
    let sx = x + w - 60 + cos(angle) * 50;
    let sy = y + 60 + sin(angle) * 50;
    line(x + w - 60, y + 60, sx, sy);
  }
  noStroke();

  // Árvore
  fill(139, 69, 19);
  rect(x + 60, h / 2 - 60, 15, 60);
  fill(34, 139, 34);
  ellipse(x + 67, h / 2 - 70, 50, 50);

  // Plantações de milho (animadas), mas agora limitadas
  for (let i = x + 15; i < w - 20; i += 35) {
    for (let j = h / 2 + 10; j < h - 140; j += 30) {  // Alterado para limitar as fileiras de milho
      drawMilho(i, j, sin(milhoAnimFrame + i * 0.1 + j * 0.1));
    }
  }

  // Adicionar a rua no campo (deslocando para baixo mais)
  drawRua(x, y + h / 2 + 63, w, 60);  // Deslocado 1 cm (aproximadamente 37.8px para cima)
}

function drawMilho(x, y, sway) {
  push();
  translate(x, y);
  rotate(radians(sway * 10)); // balança levemente

  // caule
  stroke(0, 100, 0);
  strokeWeight(3);
  line(0, 0, 0, -30);

  // folhas
  noStroke();
  fill(34, 139, 34);
  ellipse(-8, -15, 12, 25);
  ellipse(8, -10, 12, 20);

  // espiga de milho
  fill(255, 223, 0);
  stroke(255, 215, 0);
  strokeWeight(1);
  ellipse(0, -35, 15, 25);

  // grãos da espiga (círculos pequenos)
  fill(255, 255, 102);
  noStroke();
  for (let i = -7; i <= 7; i += 5) {
    for (let j = -45; j <= -25; j += 6) {
      ellipse(i, j, 4, 4);
    }
  }
  pop();
}

function drawCidade(x, y, w, h) {
  // Estrada
  drawEstrada(x, y + h / 2 + 70, w, 60);

  // Prédios detalhados com variações
  let buildingColors = [
    color(80, 80, 80),
    color(120, 120, 130),
    color(90, 90, 110),
    color(110, 110, 140),
  ];

  let buildingHeights = [200, 170, 220, 180];
  let startX = x + 20;

  for (let i = 0; i < 6; i++) {
    let bx = startX + i * 60;
    let bh = buildingHeights[i % buildingHeights.length];
    fill(buildingColors[i % buildingColors.length]);
    rect(bx, y + h / 2 + 50 - bh, 50, bh);

    // sombra lateral para profundidade
    fill(0, 0, 0, 60);
    rect(bx + 45, y + h / 2 + 50 - bh, 5, bh);

    // janelas detalhadas
    fill(255, 255, 150);
    let janelaW = 8;
    let janelaH = 10;
    let gapX = 12;
    let gapY = 20;

    for (let wx = bx + 5; wx < bx + 50 - janelaW; wx += gapX) {
      for (let wy = y + h / 2 + 55 - bh + 10; wy < y + h / 2 + 45; wy += gapY) {
        rect(wx, wy, janelaW, janelaH, 2);
      }
    }
  }
}

function drawEstrada(x, y, w, h) {
  fill(50);
  rect(x, y, w, h); // Desenha a estrada (a mesma largura da tela)

  stroke(255);
  strokeWeight(4);
  for (let i = x + 10; i < x + w; i += 40) {
    line(i, y + h / 2, i + 20, y + h / 2);  // Linha pontilhada da estrada
  }
  noStroke();
}

function drawRua(x, y, w, h) {
  fill(100, 100, 100);  // Cor da rua
  rect(x, y, w, h);  // Desenha a rua

  // Linhas da rua
  stroke(255);
  strokeWeight(4);
  for (let i = x + 10; i < x + w; i += 40) {
    line(i, y + h / 2, i + 20, y + h / 2);  // Linha pontilhada da rua
  }
  noStroke();
}

function drawCarro(x, y) {
  push();
  translate(x, y);

  // Corpo do carro
  fill(200, 0, 0);
  rect(0, -20, 70, 25, 10);

  // Capô e teto
  fill(180, 0, 0);
  beginShape();
  vertex(10, -20);
  vertex(20, -40);
  vertex(50, -40);
  vertex(60, -20);
  endShape(CLOSE);

  // Janelas
  fill(135, 206, 235, 200);
  rect(22, -38, 30, 18, 5);

  // Rodas
  fill(30);
  ellipse(15, 5, 20, 20);
  ellipse(55, 5, 20, 20);

  // Centro das rodas
  fill(150);
  ellipse(15, 5, 8, 8);
  ellipse(55, 5, 8, 8);

  // Faróis
  fill(255, 255, 150);
  ellipse(65, -10, 10, 10);

  pop();
}

function drawNuvem(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 50, 30);
  ellipse(x + 20, y + 10, 60, 40);
  ellipse(x + 40, y, 50, 30);
}
