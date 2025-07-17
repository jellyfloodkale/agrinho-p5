// "RITMOS EMPOEIRADOS", um jogo sobre a atmosfera rural, onde o trator deve passar pelos obstáculos das estradas para chegar a cidade e abastecer a loja de conveniência com seus produtos colhidos naturalmente. O jogador deve jogar com as setas do computador.

// --- fontes e sons ---
let fonte, fonte2; // Declara variáveis para armazenar fontes
let snd, som; // Declara variáveis para armazenar sons

// --- telas ---
let tela = 0; // 0 = menu, 1 = jogo
let fase = 1; // Inicializa a fase do jogo como 1
let gameOver = false; // Inicializa a variável gameOver como false
let quaseLa = false; // Inicializa a variável quaseLa como false

//--- fases ---
let mostrarFase2 = false; // Inicializa a variável para mostrar a fase 2 como false
let fase2AnimacaoConcluida = false; // Inicializa a variável para animação da fase 2 como false
let animFase2Y = -50; // Inicializa a posição Y da animação da fase 2
let mostrarFase3 = false; // Inicializa a variável para mostrar a fase 3 como false
let fase3AnimacaoConcluida = false; // Inicializa a variável para animação da fase 3 como false
let animFase3Y = -50; // Inicializa a posição Y da animação da fase 3
let fimDaFase3 = false; // Inicializa a variável para o fim da fase 3 como false

//--- mostrar os itens do menu ---
let mostrarEmoji = true; // Inicializa a variável para mostrar emoji no menu como true
let mostrarBotao = true; // Inicializa a variável para mostrar o botão no menu como true
let fundo = true; // Inicializa a variável para mostrar o fundo no menu como true
let sol = true; // Inicializa a variável para mostrar o sol no menu como true
let botaoPressionado = false; // Inicializa a variável para verificar se o botão foi pressionado como false

//--- parar música do menu ---
let musicaFase1Tocando = false; // Inicializa a variável para verificar se a música da fase 1 está tocando como false

// --- trator ---
let velocidade = 3; // Define a velocidade do trator
let x = 300, y = 200; // Inicializa as coordenadas do trator
let caminhao = { x: 370, y: 150, w: 50, h: 50 }; // Cria um objeto para o caminhão com suas coordenadas e dimensões
let obstaculos = []; // Inicializa um array para armazenar obstáculos
let caminhaoFinalX = 450; // Inicializa a posição final do caminhão
let caminhaoVelFinal = -1.5; // Define a velocidade do caminhão final
let verdurasVisiveisFinal = false; // Inicializa a variável para verificar se as verduras são visíveis como false
let fadeAtivo = false; // Inicializa a variável para verificar se o fade está ativo como false
let fadeOpacity = 0; // Inicializa a opacidade do fade como 0

// --- sons e fontes ---
function preload() { // Função chamada antes do setup para carregar recursos
  soundFormats('mp3'); // Define o formato de som como mp3
  snd = loadSound("gaming-music-8-bit-console-play-background-intro-theme-342069.mp3"); // Carrega o som de fundo
  som = loadSound('level-iv-339695.mp3'); // Carrega o som da fase
  fonte = loadFont('04B_30__.TTF'); // Carrega a primeira fonte
  fonte2 = loadFont('VCR_OSD_MONO_1.001.ttf'); // Carrega a segunda fonte
}

function setup() { // Função chamada uma vez para configurar o ambiente
  createCanvas(400, 300); // Cria uma tela de 400x300 pixels
  textAlign(CENTER, CENTER); // Alinha o texto ao centro
  textSize(32); // Define o tamanho do texto como 32
  snd.play(); //música
  resetJogo(); // Chama a função para reiniciar o jogo
}

// --- fases ---
function draw() { // Função chamada repetidamente para desenhar na tela
  background('#AAE5FF'); // Define a cor de fundo
  
  if (tela === 0) { // Se a tela for 0 (menu)
    desenhaMenu(); // Chama a função para desenhar o menu
//--- música da fase 1 ---
  } else if (tela === 1) { // Se a tela for 1 (jogo)
    if (!musicaFase1Tocando) {
      som.play(); // Toca a música da fase 1
      musicaFase1Tocando = true; // Define que a música da fase 1 está tocando
    }

    if (mostrarFase2) {
      animacaoFase2(); // Chama a função para animar a fase 2
    } else if (mostrarFase3) { // Se a fase 3 deve ser mostrada
      animacaoFase3(); // Chama a função para animar a fase 3
    } else {
     desenhaJogo(); // Chama a função para desenhar o jogo
      verificaTransicao(); // Chama a função para verificar transições de fase
    }
 } else if (tela === 2) { // Se a tela for 2 (final)
    desenhaFinal(); // Chama a função para desenhar o final
  }
}

// --- menu ---
function desenhaMenu() { // Função para desenhar o menu
  if (fundo) { 
    fill('rgb(36,198,36)'); // Define a cor de preenchimento
    noStroke(); // Remove o contorno
    rect(0, 200, width, 100); // Desenha um retângulo para o fundo do menu
    textSize(34); 
    text('🐖', 100, 187); // Desenha um emoji de porco
    textSize(50); 
    text('🐄', 200, 183);
    text('🌽', 310, 183);
    text('🌽', 320, 183);
    text('🌽', 330, 183);
    text('🌽', 340, 183);
    text('🌽', 350, 183);
    text('🌽', 360, 183);
    text('🌽', 370, 183);
    text('🌽', 380, 183);
    text('🌽', 390, 183);
    text('🌽', 400, 183);
    text('🌽', 410, 183);
  }

//--- sol que se move no menu ---
  if (sol) {
    push(); // Salva o estado atual
    translate(60, 60); // Move a origem para (60, 60)
    rotate(frameCount * 0.05); // Rotaciona o sol com base no tempo
    textSize(100);
    text('☀️', 0, 0);
    pop(); // Restaura o estado anterior
  }

  push();
  fill('#03A9F4');
  stroke('darkblue');
  strokeWeight(5);
  textSize(25); //tamanho do texto
  textFont(fonte); //fonte usada
  text("Ritmos Empoeirados", width / 2, 50);
  pop();

  if (mostrarEmoji) {
    textSize(84); //tamanho do trator
    text("🚜", x, y - 30);
    x = (x < -32) ? width + 32 : x - 2; // Move o trator para a esquerda ou reinicia sua posição
  }

  // --- botão jogar ---
  if (mostrarBotao) {
    push();
    stroke('black');
    strokeWeight(2);
    let dentro = mouseX > 150 && mouseX < 250 && mouseY > 220 && mouseY < 260; // Verifica se o mouse está dentro do botão
//--- se o botão for clicado, muda de cor ---
    fill(botaoPressionado && dentro ? color(50, 150, 50) : color(100, 200, 100));
    rect(150, 220, 100, 40, 10);
    fill('white');
    textSize(24); //tamanho do texto
    textFont(fonte2); //fonte usada
    text("Jogar", width / 2, 240);
    pop();
  }
}

// --- jogo em si ---
function desenhaJogo() {
  background('#C2FA81'); //fundo do jogo
  fill('gray');
  rect(0, 85, width, 150);//estrada

  fill("white");
  for (let xAtual = 0; xAtual < width; xAtual += 20) {
    rect(xAtual, 150, 10, 8);
  }

  for (let obs of obstaculos) {
    textSize(32);
    text(obs.emoji, obs.x, obs.y);
  }

  textSize(48);
  textFont('arial');
  text("🚜", caminhao.x, caminhao.y);
//--- setas para mover o trator ---
  if (!gameOver && !quaseLa) {
    if (keyIsDown(LEFT_ARROW)) caminhao.x -= velocidade;
    if (keyIsDown(UP_ARROW) && caminhao.y > 90) caminhao.y -= 60;
    if (keyIsDown(DOWN_ARROW) && caminhao.y < 210) caminhao.y += 60;
  }

  verificaColisoes();
//--- texto game over ---
  if (gameOver) {
    desenhaMensagem("GAME OVER", 'red');
    setTimeout(resetJogo, 1500);
//--- texto quase lá ---
  } else if (quaseLa) {
    desenhaMensagem("QUASE LÁ", 'orange');
} else if (fase === 3 && caminhao.x <= 10 && !fimDaFase3) {
  fimDaFase3 = true;
// --- texto fim da fase ---
  desenhaMensagem("FIM DA FASE 3!", 'blue');
  setTimeout(() => {
    tela = 2;
  }, 1500);
  }
}

function desenhaMensagem(txt, cor) {
  fill(cor);
  textFont(fonte2); //fonte usada
  textSize(36); //tamanho do texto
  text(txt, width / 2, height / 2);
}

//--- colisões com obstáculos ---
function verificaColisoes() {
  for (let obs of obstaculos) { // Loop para cada obstáculo
    if (
      caminhao.x < obs.x + obs.w &&
      caminhao.x + caminhao.w > obs.x &&
      caminhao.y < obs.y + obs.h &&
      caminhao.y + caminhao.h > obs.y
    ) {
      gameOver = true; // Define que o jogo acabou
      break; // Sai do loop
    }
  }
}

//--- fases ---
function verificaTransicao() {
  if (fase === 1 && caminhao.x <= 10 && !quaseLa) { // Se está na fase 1 e o caminhão chegou ao final
    quaseLa = true; // Define que está quase lá
    setTimeout(() => { // Após 1.2 segundos
      quaseLa = false; // Reseta a variável quaseLa
// --- fase 2 ---
      mostrarFase2 = true;
      animFase2Y = -50;
    }, 1200);
  } else if (fase === 2 && caminhao.x <= 10 && !quaseLa) {
    quaseLa = true;
    setTimeout(() => {
      quaseLa = false;
// --- fase 3 ---
      mostrarFase3 = true;
      animFase3Y = -50;
    }, 1200);
  }
}

// --- animação da fase 2 ---
function animacaoFase2() {
  background('#E91E63');
  fill('black');
  textFont(fonte);
  textSize(60);
  text("FASE 2", width / 2, animFase2Y);
  animFase2Y += 5;

  if (animFase2Y >= height / 2 && !fase2AnimacaoConcluida) {
    fase2AnimacaoConcluida = true;
    setTimeout(() => {
// --- se a animação acabar, mostra a fase 2 ---
      mostrarFase2 = false;
      fase = 2;
      resetJogo();
      fase2AnimacaoConcluida = false;
    }, 1000);
  }
}

// --- animação fase 3 ---
function animacaoFase3() {
  background('#9C27B0');
  fill('white');
  textFont(fonte);
  textSize(60);
  text("FASE 3", width / 2, animFase3Y);
  animFase3Y += 5;

  if (animFase3Y >= height / 2 && !fase3AnimacaoConcluida) {
    fase3AnimacaoConcluida = true;
    setTimeout(() => {
// --- se a animação acabar, mostra a fase 3 ---
      mostrarFase3 = false;
      fase = 3;
      resetJogo();
      fase3AnimacaoConcluida = false;
    }, 1000);
  }
}


function mousePressed() {
  if (tela === 0 && mostrarBotao &&
    mouseX > 150 && mouseX < 250 &&
    mouseY > 220 && mouseY < 260) {
    botaoPressionado = true;
  }
}

function mouseReleased() {
// --- se apertar no botão, começa o jogo ---
  if (tela === 0 && botaoPressionado &&
    mouseX > 150 && mouseX < 250 &&
    mouseY > 220 && mouseY < 260) {
    tela = 1;
    snd.stop(); //parar música do menu
 
  }
  if (tela === 2) {
    tela = 0;
    fase = 1;
    musicaFase1Tocando = false;
    snd.play();
    resetJogo();
  }

  botaoPressionado = false;
}

function resetJogo() {
  caminhao = { x: 370, y: 150, w: 50, h: 50 };

  // --- obstáculos ---
  if (fase === 1) {
    obstaculos = [
      { x: 250, y: 90, emoji: '🕳️', w: 40, h: 40 },
      { x: 180, y: 210, emoji: '🚧', w: 40, h: 40 },
      { x: 120, y: 150, emoji: '🪧', w: 40, h: 40 }
    ];
// --- obstáculos fase 2 ---
  } else if (fase === 2) {
    obstaculos = [
      { x: 300, y: 210, emoji: '🪝', w: 40, h: 40 },
      { x: 200, y: 90, emoji: '🚧', w: 40, h: 40 },
      { x: 100, y: 150, emoji: '🕳️', w: 40, h: 40 }
    ];
// --- obstáculos fase 3 ---
  } else if (fase === 3) {
    obstaculos = [
      { x: 250, y: 90, emoji: '🧱', w: 40, h: 40 },
      { x: 180, y: 210, emoji: '⚠️', w: 40, h: 40 },
      { x: 100, y: 150, emoji: '🧨', w: 40, h: 40 }
    ];
  }

  gameOver = false;
  quaseLa = false;
}

// --- final do jogo ---
function desenhaFinal() {
  background('#03A9F4');
  fill('gray');
  rect(0, 200, width, 100);
  
push();
fill(103, 58, 183)
stroke(0, 0, 139)
strokeWeight(5);
// --- tamanho do texto ---
textSize(25);
// --- fonte usada ---
textFont(fonte);
textAlign(CENTER, CENTER);
text("FIM", width / 2, 50, fadeOpacity);
pop();

  //--- mercadinho ---
  textSize(130);
  text('🏪', 180, 160);

// --- para as verudras aparecerem quando o trator passar ---
 if (caminhaoFinalX < 250 && caminhaoFinalX > 150) {
  verdurasVisiveisFinal = true;
}

//--- verduras ---
if (verdurasVisiveisFinal) {
  textSize(30);
  text('🥦', 180, 200);
  text('🥕', 200, 200);
  text('🥬', 210, 200);
}

  //--- trator ---
  textSize(70);
  text('🚜', caminhaoFinalX, 200);

  caminhaoFinalX += caminhaoVelFinal;

  if (caminhaoFinalX < -100) {
    fadeAtivo = true;
  }

  //--- fade ---
  if (fadeAtivo) {
    fadeOpacity += 3;
    fill(0, fadeOpacity);
    rect(0, 0, width, height);
  }
}