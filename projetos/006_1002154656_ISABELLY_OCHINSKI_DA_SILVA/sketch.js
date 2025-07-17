let cenaAtual = "campo"; // Controle da cena: 'campo' ou 'cidade'
let tempoDeTransicao = 0;
let solX = 200;
let solY = 100;
let movimentoSol = 1;
let solSize = 60;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(135, 206, 235); // Cor do céu (azul claro)
  
  if (cenaAtual === "campo") {
    cenaCampo();
  } else if (cenaAtual === "cidade") {
    cenaCidade();
  }
  
  // Mover o sol
  solX += movimentoSol;
  
  // Sol se movendo para a direita e para a esquerda
  if (solX > width - solSize / 2 || solX < solSize / 2) {
    movimentoSol *= -1; // Inverte a direção do movimento
  }
  
  // Se a transição estiver acontecendo, aumentamos o tempo de transição
  if (tempoDeTransicao > 0) {
    tempoDeTransicao--;
  }
}

function cenaCampo() {
  // Desenho do campo
  fill(34, 139, 34); // Cor do campo (verde)
  rect(0, height / 2, width, height / 2); // Solo do campo

  // Desenho das árvores
  fill(139, 69, 19); // Tronco das árvores
  rect(100, height / 2 - 50, 20, 50); // Árvore 1
  fill(34, 139, 34); // Folhas
  ellipse(110, height / 2 - 70, 40, 40); // Copa da árvore 1
  
  fill(139, 69, 19); // Tronco da árvore 2
  rect(300, height / 2 - 70, 20, 60); // Árvore 2
  fill(34, 139, 34); // Folhas
  ellipse(310, height / 2 - 90, 50, 50); // Copa da árvore 2

  // Sol
  fill(255, 223, 0); // Cor do sol
  ellipse(solX, solY, solSize, solSize); // Desenha o sol
  
  // Texto na tela
  fill(0);
  textSize(32);
  text("Bem-vindo ao Campo", width / 2, height / 4);
  textSize(16);
  text("Pressione C para ir à cidade", width / 2, height * 0.9);
}

function cenaCidade() {
  // Cor do céu no final da tarde
  background(255, 165, 0); // Céu alaranjado ao pôr do sol
  
  // Desenho dos prédios
  fill(169, 169, 169); // Cor dos prédios (cinza)
  rect(50, height / 2 - 150, 80, 150); // Prédio 1
  rect(150, height / 2 - 200, 100, 200); // Prédio 2
  rect(300, height / 2 - 120, 70, 120); // Prédio 3
  rect(450, height / 2 - 180, 90, 180); // Prédio 4
  
  // Carros
  fill(255, 0, 0); // Cor do carro 1
  rect(100, height - 70, 50, 30); // Carro 1
  fill(0, 0, 255); // Cor do carro 2
  rect(250, height - 70, 50, 30); // Carro 2
  
  // Sol se pondo atrás dos prédios
  fill(255, 223, 0); // Cor do sol
  ellipse(solX, height / 2 + 50, solSize, solSize); // Sol
  
  // Texto na tela
  fill(0);
  textSize(32);
  text("Bem-vindo à Cidade", width / 2, height / 4);
  textSize(16);
  text("Pressione C para ir ao campo", width / 2, height * 0.9);
}

// Função de troca de cena
function keyPressed() {
  if (key === 'C' || key === 'c') {
    if (cenaAtual === "campo" && tempoDeTransicao === 0) {
      tempoDeTransicao = 50; // Inicia a transição para a cidade
      cenaAtual = "cidade"; // Muda para cidade
    } else if (cenaAtual === "cidade" && tempoDeTransicao === 0) {
      tempoDeTransicao = 50; // Inicia a transição para o campo
      cenaAtual = "campo"; // Muda para campo
    }
  }
}
