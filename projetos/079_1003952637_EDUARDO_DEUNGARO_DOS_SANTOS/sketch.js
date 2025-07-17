let truckX; // Posição inicial do caminhão
let speed = 3; // Velocidade do movimento

function setup() {
  createCanvas(600, 400);
  truckX = width; // Começa na borda direita da tela
}

function draw() {
  background(34, 139, 34); // Fundo verde para o campo

  // Criando a faixa marrom clara para a área agrícola
  fill(210, 180, 140); // Marrom claro
  rect(0, 0, width / 3, height);

  // Criando a faixa marrom central representando a estrada
  fill(139, 69, 19);
  rect(0, height / 2 - 20, width, 40);

  // Exibindo emojis de milho 🌽 na parte esquerda
  textSize(32);
  for (let i = 0; i < 4; i++) {
    text("🌽", 30 + i * 40, height / 4);
  }

  // Exibindo emojis de trigo 🌾 na parte direita
  for (let i = 0; i < 4; i++) {
    text("🌾", 30 + i * 40, (3 * height) / 4);
  }

  // Adicionando casas no lado direito, simulando a cidade
  for (let i = 0; i < 5; i++) {
    drawHouse(width - 200 + i * 50, 250);
  }

  // Exibindo o caminhão 🚛
  text("🚛", truckX, height / 2);

  // Movendo o caminhão para a esquerda
  truckX -= speed;

  // Resetando posição quando o caminhão sair da tela
  if (truckX < -40) {
    truckX = width; // Volta ao início da estrada
  }
}

// Função para desenhar uma casa simples
function drawHouse(x, y) {
  fill(200, 0, 0); // Cor vermelha para a casa
  rect(x, y, 50, 50); // Corpo da casa
  fill(150, 75, 0); // Cor marrom para o telhado
  triangle(x, y, x + 25, y - 30, x + 50, y); // Telhado
}
