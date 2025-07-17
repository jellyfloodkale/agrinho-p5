// Variáveis para controlar a posição dos elementos animados (menos o trator)
let solX;
let solY;
let velocidadeSol = 0.2; // Velocidade que o sol se move um pouco mais lento

let nuvem1X;
let nuvem2X;
let velocidadeNuvem = 0.4; // Velocidade que as nuvens se movem

// Não precisamos mais da variável tratorX para o movimento automático

function setup() {
  createCanvas(800, 600); // Tamanho da área de desenho
  // Definimos a posição inicial dos elementos animados
  solX = 100;
  solY = 100;

  nuvem1X = -150; // Começa fora da tela à esquerda
  nuvem2X = 150;

  // Configurações iniciais de desenho
  noStroke(); // Geralmente desenhamos sem contorno a menos que especificado
}

function draw() {
  // -- O CHÃO E O CÉU --
  // Céu (muda um pouco de cor dependendo da posição do sol para simular o dia)
  let rCeu = map(solX, 0, width, 100, 50);
  let gCeu = map(solX, 0, width, 150, 100);
  let bCeu = map(solX, 0, width, 255, 150);
  background(rCeu, gCeu, bCeu); // Usa as cores calculadas para o fundo

  // Desenha o chão (grama com um pouco de variação)
  fill(90, 140, 40); // Cor de grama principal
  rect(0, 450, width, 150);
  fill(95, 145, 45); // Uma cor de grama um pouco diferente
  rect(0, 470, width, 130);


  // -- ELEMENTOS DA FAZENDA (Estáticos ou semi-estáticos) --

  // Desenha um celeiro mais detalhado
  fill(180, 40, 40); // Vermelho para o celeiro
  rect(550, 300, 220, 200); // Corpo principal do celeiro
  fill(130, 0, 0); // Vermelho mais escuro para o telhado
  triangle(530, 300, 790, 300, 660, 180); // Telhado do celeiro

  // Detalhes do telhado (opcional, para dar ideia de telhas)
  stroke(100, 0, 0);
  strokeWeight(2);
  line(550, 300, 770, 300);
  line(540, 280, 780, 280);
  line(550, 300, 660, 180);
  line(770, 300, 660, 180);
  noStroke();

  // Desenha uma porta dupla no celeiro
  fill(80, 40, 0); // Cor de madeira para as portas
  rect(600, 380, 50, 120);
  rect(660, 380, 50, 120);

  // Desenha janelas no celeiro
  fill(150, 200, 255); // Azul claro para as janelas
  rect(570, 320, 30, 30);
  rect(710, 320, 30, 30);

  // Desenha um silo mais detalhado
  fill(160); // Cor cinza para o silo
  rect(420, 250, 80, 250); // Corpo principal do silo
  fill(140); // Cinza mais escuro para o topo
  ellipse(460, 250, 85, 50); // Topo do silo (parte arredondada)
  fill(100); // Cor mais escura para a base do topo
  arc(460, 250, 85, 50, PI, TWO_PI); // Arco para a base do topo

  // Desenha uma cerca um pouco mais robusta
  stroke(100, 50, 0); // Cor marrom para a cerca
  strokeWeight(6); // Espessura da linha da cerca
  line(50, 450, 400, 450); // Linha horizontal superior
  strokeWeight(5);
  line(50, 470, 400, 470); // Linha horizontal inferior

  // Postes da cerca (retângulos finos para parecer mais tridimensional)
  fill(100, 50, 0);
  noStroke();
  rect(47, 450, 8, 40);
  rect(147, 450, 8, 40);
  rect(247, 450, 8, 40);
  rect(347, 450, 8, 40);
  stroke(100, 50, 0); // Volta o contorno para as linhas
  strokeWeight(5);


  // Desenha algumas árvores com formas mais orgânicas
  noStroke();
  fill(0, 70, 0); // Verde mais escuro para algumas folhas
  ellipse(80, 430, 60, 80);
  ellipse(120, 420, 70, 90);
  ellipse(160, 440, 60, 70);

  fill(0, 90, 0); // Verde mais claro para outras folhas
  ellipse(90, 410, 50, 60);
  ellipse(130, 400, 60, 70);
  ellipse(170, 420, 50, 50);


  fill(100, 50, 0); // Marrom para os troncos
  rect(75, 450, 10, 40);
  rect(115, 450, 10, 40);
  rect(155, 450, 10, 40);


  // -- A PLANTAÇÃO --

  // Área da plantação (terra)
  fill(130, 80, 40); // Cor de terra
  rect(50, 500, 350, 80); // Posição e tamanho da plantação

  // Desenha as plantinhas usando loops
  fill(40, 120, 0); // Cor verde para as plantinhas
  let inicioXPlantacao = 60;
  let inicioYPlantacao = 510;
  let espacoEntrePlantas = 15;
  let numeroDeFileiras = 4;
  let plantasPorFileira = 20;

  // Loop para as fileiras
  for (let j = 0; j < numeroDeFileiras; j++) {
    // Loop para as plantinhas em cada fileira
    for (let i = 0; i < plantasPorFileira; i++) {
      // Desenha uma plantinha (um pequeno retângulo verde)
      rect(inicioXPlantacao + i * espacoEntrePlantas, inicioYPlantacao + j * 20, 5, 15);
    }
  }


  // -- ELEMENTOS ANIMADOS NO CÉU --

  // Desenha o sol com alguns "raios" simples
  fill(255, 200, 0); // Laranja mais claro para o sol
  ellipse(solX, solY, 120, 120); // Sol um pouco maior
  // Raios simples (linhas)
  stroke(255, 200, 0);
  strokeWeight(3);
  line(solX, solY - 70, solX, solY - 90);
  line(solX, solY + 70, solX, solY + 90);
  line(solX - 70, solY, solX - 90, solY);
  line(solX + 70, solY, solX + 90, solY);
  // Raios diagonais
  line(solX - 50, solY - 50, solX - 70, solY - 70);
  line(solX + 50, solY - 50, solX + 70, solY - 70);
  line(solX - 50, solY + 50, solX - 70, solY + 70);
  line(solX + 50, solY + 50, solX + 70, solY + 70);
  noStroke(); // Volta a remover o contorno


  // Move o sol automaticamente
  solX += velocidadeSol;
  // Se o sol sair da tela pela direita, ele volta para a esquerda
  if (solX > width + 60) {
    solX = -60;
  }

  // Desenha as nuvens com formas mais suaves
  fill(230, 230, 230); // Branco um pouco acinzentado para as nuvens
  // Nuvem 1
  ellipse(nuvem1X, 90, 90, 60);
  ellipse(nuvem1X + 40, 90, 80, 50);
  ellipse(nuvem1X + 20, 70, 80, 60);

  // Nuvem 2
  ellipse(nuvem2X, 120, 100, 70);
  ellipse(nuvem2X + 40, 120, 90, 60);
  ellipse(nuvem2X + 20, 100, 90, 70);

  // Move as nuvens automaticamente
  nuvem1X += velocidadeNuvem;
  nuvem2X += velocidadeNuvem;

  // Se a nuvem sair da tela, ela volta para o começo
  if (nuvem1X > width + 80) {
    nuvem1X = -150;
  }
  if (nuvem2X > width + 100) {
    nuvem2X = -180;
  }


  // -- O TRATOR (Controlado pelo Mouse e mais detalhado) --

  // A posição horizontal do trator continua sendo mouseX!
  let tratorXMouse = mouseX;

  // Corpo principal do trator
  fill(0, 50, 200); // Azul um pouco mais escuro para o corpo
  rect(tratorXMouse, 380, 120, 50); // Corpo maior

  // Parte da frente do trator (onde fica o motor)
  fill(0, 0, 150); // Azul mais escuro
  rect(tratorXMouse + 100, 390, 30, 40);

  // Cabine do trator
  fill(0, 50, 200);
  rect(tratorXMouse + 40, 350, 60, 30);

  // Janela da cabine
  fill(150, 200, 255); // Azul claro para a janela
  rect(tratorXMouse + 45, 355, 25, 20);

  // Chaminé do trator
  fill(50); // Cinza escuro para a chaminé
  rect(tratorXMouse + 110, 340, 15, 25);

  // Rodas do trator (agora com um pequeno aro no meio)
  fill(30); // Cinza bem escuro para o pneu
  ellipse(tratorXMouse + 40, 435, 45, 45); // Roda dianteira
  ellipse(tratorXMouse + 110, 435, 60, 60); // Roda traseira

  fill(80); // Cinza mais claro para o aro
  ellipse(tratorXMouse + 40, 435, 20, 20);
  ellipse(tratorXMouse + 110, 435, 30, 30);

  // Eixo das rodas (linha fina)
  stroke(50);
  strokeWeight(3);
  line(tratorXMouse + 40, 435, tratorXMouse + 110, 435);
  noStroke();


  // -- DETALHES EXTRAS --

  // Algumas flores simples na grama (mantivemos as flores)
  fill(255, 0, 255); // Cor rosa
  ellipse(200, 460, 10, 10);
  ellipse(215, 470, 10, 10);
  ellipse(185, 470, 10, 10);
  fill(255, 255, 0); // Centro amarelo
  ellipse(200, 470, 5, 5);

  fill(255, 100, 0); // Cor laranja
  ellipse(300, 480, 12, 12);
  ellipse(318, 485, 12, 12);
  ellipse(282, 485, 12, 12);
  fill(255, 0, 0); // Centro vermelho
  ellipse(300, 485, 6, 6);
}