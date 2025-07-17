// Variáveis globais para controlar a cena atual, posição e velocidade do Bilu (carro)
let cena = "campo";      // Cena inicial: campo
let xBilu = 50;          // Posição horizontal inicial do carro com Bilu
let velocidade = 2;      // Velocidade do carro/Bilu

function setup() {
  createCanvas(800, 400); // Cria tela de 800x400 pixels
}

function draw() {
  background(220); // Fundo neutro para limpar o frame

  // Desenha o cenário conforme a cena atual
  if (cena === "campo") {
    desenharCampo();
  } else if (cena === "estrada") {
    desenharEstrada();
  } else if (cena === "cidade") {
    desenharCidade();
  }

  // Desenha o carro com o Bilu dentro, movendo-se pela tela
  desenharCarroComBilu();

  // Atualiza a posição horizontal do carro
  xBilu += velocidade;

  // Controle para transição de cenas quando o carro sai da tela
  if (cena === "campo" && xBilu > width) {
    xBilu = 0;
    cena = "estrada";
  } else if (cena === "estrada" && xBilu > width) {
    xBilu = 0;
    cena = "cidade";
  }
}

// Função para desenhar o sol no canto superior direito (em todos os cenários)
function desenharSol() {
  fill(255, 255, 0);       // Cor amarela do sol
  noStroke();
  ellipse(700, 50, 60, 60); // Sol grande no céu
}

// Função que desenha o cenário do campo com árvores e árvore grande substituindo o celeiro
function desenharCampo() {
  background(120, 200, 100); // Fundo verde claro representando campo

  // Texto indicativo da cena
  fill(255);
  textSize(24);
  text("Bilu está no campo 🐄🌾", 20, 30);

  // Desenha o sol
  desenharSol();

  // Árvore grande substituindo o celeiro
  drawBigTree(100, 230);

  // Outras árvores espalhadas no cenário
  drawTree(200, 280);
  drawTree(300, 260);
  drawTree(400, 290);
  drawTree(550, 270);

  // Chão marrom
  fill(139, 69, 19);
  rect(0, 350, width, 50);
}

// Função que desenha o cenário da estrada, agora só com estrada e sol (sem árvores)
function desenharEstrada() {
  background(180); // Fundo cinza representando asfalto

  // Texto indicativo da cena
  fill(255);
  textSize(24);
  text("Bilu está na estrada 🚗", 20, 30);

  // Desenha o sol
  desenharSol();

  // Estrada escura (retângulo)
  fill(100);
  rect(0, 300, width, 100);

  // Faixas brancas tracejadas na estrada
  for (let i = 0; i < width; i += 40) {
    fill(255);
    rect(i, 345, 20, 10);
  }
}

// Função que desenha o cenário da cidade, agora com sol
function desenharCidade() {
  background(180, 220, 255); // Céu azul claro da cidade

  // Texto indicativo da cena
  fill(255);
  textSize(24);
  text("Bilu chegou à cidade 🏙️", 20, 30);

  // Desenha o sol
  desenharSol();

  // Prédios em cinza escuro
  fill(100);
  rect(100, 200, 80, 200);
  rect(220, 150, 100, 250);
  rect(350, 180, 60, 220);

  // Chão da cidade (asfalto/calcada)
  fill(50);
  rect(0, 350, width, 50);
}

// Função para desenhar uma árvore pequena (tronco + copa)
function drawTree(x, y) {
  // Tronco marrom
  fill(101, 67, 33);
  rect(x, y, 20, 50);

  // Copa verde com círculos sobrepostos
  fill(34, 139, 34);
  ellipse(x + 10, y, 60, 60);
  ellipse(x + 25, y + 10, 50, 50);
  ellipse(x - 10, y + 10, 50, 50);
}

// Função para desenhar uma árvore maior (tronco + copa maior) - substitui o celeiro
function drawBigTree(x, y) {
  // Tronco maior e mais largo
  fill(101, 67, 33);
  rect(x, y, 40, 80);

  // Copa grande com mais círculos para aparência mais cheia
  fill(0, 128, 0);
  ellipse(x + 20, y - 20, 100, 100);
  ellipse(x + 50, y + 10, 80, 80);
  ellipse(x - 10, y + 10, 80, 80);
  ellipse(x + 10, y + 40, 70, 70);
}

// Função que desenha o carro com o Bilu dentro, mais próximo do chão
function desenharCarroComBilu() {
  push();
  translate(xBilu, 350); // Posiciona o carro um pouco acima do chão para ficar "no chão"

  // Corpo do carro vermelho com cantos arredondados
  fill(255, 0, 0);
  rect(-40, -20, 100, 30, 10);

  // Teto do carro, tom mais escuro de vermelho
  fill(200, 0, 0);
  rect(-20, -40, 60, 20, 5);

  // Rodas pretas, posicionadas para combinar com a altura do carro
  fill(0);
  ellipse(-20, 15, 20, 20);
  ellipse(40, 15, 20, 20);

  // Cabeça do Bilu saindo do teto, como se estivesse dirigindo
  fill(160, 82, 45);
  ellipse(10, -50, 25, 25);

  // Olhos brancos do Bilu
  fill(255);
  ellipse(5, -52, 8, 8);
  ellipse(15, -52, 8, 8);

  // Pupilas pretas
  fill(0);
  ellipse(5, -52, 4, 4);
  ellipse(15, -52, 4, 4);

  // Brilho nos olhos (pequenos círculos brancos)
  fill(255);
  ellipse(4, -53, 2, 2);
  ellipse(14, -53, 2, 2);

  // Boca sorridente do Bilu (arco)
  stroke(0);
  noFill();
  arc(10, -45, 10, 5, 0, PI);

  // Antenas do Bilu acima da cabeça
  stroke(0);
  line(5, -62, 0, -70);  // Antena esquerda
  line(15, -62, 20, -70); // Antena direita

  // Pontas pretas das antenas
  fill(0);
  ellipse(0, -70, 4, 4);
  ellipse(20, -70, 4, 4);

  pop();
}
