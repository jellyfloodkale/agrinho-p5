let plantaTamanho = 0; // tamanho inicial da plantação
let crescendo = false; // se a plantação está crescendo ou não
let tempoInicio = 0; // para controlar o tempo de crescimento

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(135, 206, 250); // cor do céu

  // Desenhando o sol
  fill(255, 223, 0);
  noStroke();
  ellipse(500, 100, 80, 80); // Sol

  // Grama
  fill(10, 139, 34);
  rect(0, height - 50, width, 50); // Grama

  // Casa
  fill(255, 0, 0); // cor da casa
  rect(200, 200, 150, 150); // corpo da casa
  fill(139, 69, 19); // cor do telhado
  triangle(175, 200, 375, 200, 275, 120); // telhado
  fill(139, 69, 19); // porta da casa
  rect(250, 270, 50, 80); // porta
  fill(255); // janelas
  rect(230, 230, 40, 40); // janela esquerda
  rect(290, 230, 40, 40); // janela direita

  // Árvore
  fill(139, 69, 19);
  rect(100, 250, 30, 100); // tronco
  fill(0, 128, 0);
  ellipse(115, 230, 100, 100); // copa da árvore

  // Plantação no chão
  desenharPlantacao();

  // Se a planta está crescendo, aumenta o tamanho da plantação
  if (crescendo) {
    if (millis() - tempoInicio < 5000) { // Cresce por 5 segundos
      plantaTamanho += 0.8;
    } else {
      // Depois de 5 segundos, volta ao tamanho inicial
      plantaTamanho = 7;
      crescendo = 0;
    }
  }
}

// Função para desenhar a plantação
function desenharPlantacao() {
  fill(255, 255, 0 ); // cor da plantação (amarelo)

    
  let yPosicaoPlantacao = height - 75 - plantaTamanho; // a plantação começa em cima da grama

  for (let x = 378; x < width; x += 10) {
    for (let y = height - 50; y > yPosicaoPlantacao; y -= 1) {
      ellipse(x, y, 4, -2); // desenha cada planta (como círculos)
    }
  }
}

// Detecta quando a tecla espaço é apertada
function keyPressed() {
  if (key === ' ') {
    if (!crescendo) {
      tempoInicio = millis(); // armazena o tempo inicial
      crescendo = true; // começa a crescer
    }
  }
}

