let plantacaoX; // Posição X da plantação (para o caminhão)
let caminhãoCor; // Cor do caminhão
let velocidade = 2; // Velocidade do caminhão

function setup() {
  createCanvas(800, 400); // Cria uma tela de 800 por 400 pixels
  plantacaoX = 0; // Começa a plantação (caminhão) no canto esquerdo (campo)
  caminhãoCor = color(100, 70, 40); // Cor marrom para o caminhão
}

function draw() {
  // Cenário do Campo (lado esquerdo)
  background(135, 206, 235); // Céu azul claro
  fill(124, 252, 0); // Verde grama
  rect(0, height / 2, width / 2, height / 2); // Chão do campo

  // Árvores no Campo
  fill(139, 69, 19); // Tronco marrom
  rect(width * 0.39, height * 0.3, 20, 70);
  rect(width * 0.15, height * 0.3, 20, 80);
  fill(34, 139, 34); // Folhas verde escuro
  ellipse(width * 0.16, height * 0.35, 70, 60);
  ellipse(width * 0.40, height * 0.3, 60, 50);

  // Celeiro no Campo
  fill(178, 37, 34); // Vermelho celeiro
  rect(width * 0.22, height * 0.36, 80, 70);
  fill(139, 69, 19); // Telhado marrom
  triangle(width * 0.20, height * 0.38, width * 0.26, height * 0.3, width * 0.34, height * 0.38);

  // Cenário da Cidade (lado direito)
  fill(150); // Cinza para o asfalto da rua
  rect(width / 2, height / 2, width / 2, height / 2);

  // Prédios na Cidade
  fill(100); // Cinza escuro para os prédios
  rect(width * 0.6, height * 0.1, 80, 180); // Prédio 1
  rect(width * 0.75, height * 0.13, 60, 150); // Prédio 2
  rect(width * 0.9, height * 0.15, 50, 160); // Prédio 3

  fill(255, 255, 150); // Amarelo claro para as janelas
  rect(width * 0.62, height * 0.25, 15, 20);
  rect(width * 0.65, height * 0.25, 15, 20);
  rect(width * 0.62, height * 0.3, 15, 20);
  rect(width * 0.65, height * 0.3, 15, 20);
  rect(width * 0.77, height * 0.25, 15, 20);
  rect(width * 0.79, height * 0.25, 15, 20);
  rect(width * 0.77, height * 0.3, 15, 20);
  rect(width * 0.79, height * 0.3, 15, 20);
  rect(width * 0.91, height * 0.25, 15, 20);
  rect(width * 0.93, height * 0.25, 15, 20);
  rect(width * 0.91, height * 0.3, 15, 20);
  rect(width * 0.93, height * 0.3, 15, 20);
  // Adicione mais janelas se quiser!

  // Estrada (separando campo e cidade)
  fill(80); // Cinza escuro para a estrada
  rect(0, height / 2 - 20, width, 40); // Uma faixa de estrada

  // Caminhão com plantação
  fill(caminhãoCor); // Cor do caminhão
  rect(plantacaoX, height / 2 - 40, 60, 30); // Corpo do caminhão
  fill(0); // Rodas pretas
  ellipse(plantacaoX + 15, height / 2 - 10, 20, 20);
  ellipse(plantacaoX + 45, height / 2 - 10, 20, 20);
  
  // "Plantação" no caminhão (simplesmente uma caixa verde)
  fill(0, 150, 0); // Verde para a plantação
  rect(plantacaoX + 10, height / 2 - 55, 40, 15);

  // Movimento do caminhão
  plantacaoX += velocidade;

  // Reinicia o caminhão quando ele sai da tela
  if (plantacaoX > width) {
    plantacaoX = -60; // Volta para antes do início da tela
  }
}