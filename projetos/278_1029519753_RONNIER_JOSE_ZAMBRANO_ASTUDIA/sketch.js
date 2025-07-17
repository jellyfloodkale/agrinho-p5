let truckX = 50;
let truckY = 300;
let movingRight = true;
let productDelivered = false;

function setup() {
  createCanvas(600, 400);
  textSize(18);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240);

  // Desenho do campo à esquerda
  fill(34, 139, 34);  // Cor do campo
  rect(0, 0, width / 2, height);

  // Desenho da cidade à direita
  fill(169, 169, 169);  // Cor da cidade (edifícios)
  rect(width / 2, 0, width / 2, height);

  // Desenhando o caminhão
  fill(255, 0, 0); // Cor do caminhão
  rect(truckX, truckY, 60, 30);

  // Desenho de texto explicativo
  fill(0);
  text("Agrinho 2025: Conexão Campo-Cidade", width / 2, 30);
  text("Caminhão transportando produtos do campo para a cidade", width / 2, 350);

  // Movimento do caminhão
  if (movingRight) {
    truckX += 2;
  } else {
    truckX -= 2;
  }

  // Quando o caminhão chega ao centro da tela
  if (truckX >= width / 2 - 60 && !productDelivered) {
    productDelivered = true;
    textSize(20);
    text("Produto entregue na cidade!", width / 2, height / 2);
  }

  // Alterando a direção do caminhão
  if (truckX >= width - 60 || truckX <= 50) {
    movingRight = !movingRight;
  }
}
