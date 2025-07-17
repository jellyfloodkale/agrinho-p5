let modoCena = 'inicio'; // O jogo começa no modo 'inicio'
// Pode ser 'inicio', 'campo', 'cidade' ou 'gameover' ou 'ganhou'

// Variáveis do Trator
let tratorX;
let tratorY;
const TRATOR_LARGURA = 60;
const TRATOR_ALTURA = 30;
const TRATOR_VELOCIDADE = 5; // Velocidade normal do trator no campo
const TRATOR_VELOCIDADE_CIDADE = 2; // Velocidade do trator na cidade (mais lento)
let tratorEmCena = false; // Controla se o trator está na cena da cidade
let tratorDestinoX; // Posição X alvo para o trator na cidade

// Variáveis dos Carros
let carros = [];
const NUM_CARROS = 5; // Constante para o número de carros

// Variáveis da Fumaça das Fábricas
let particulasFumaca = [];

// Variáveis do Pôr do Sol e Céu
let solY;
const SOL_VELOCIDADE = 0.3; // Velocidade em que o sol desce
let ceuCorInicio;    // Azul claro (dia)
let ceuCorFim;       // Laranja avermelhado (pôr do sol)
let ceuCorNoite;     // Azul escuro (noite)
let ceuCorAtual;     // Cor atual do céu

// Variáveis da Lua
let luaY;
const LUA_VELOCIDADE = 0.05; // Velocidade da lua subindo
const LUA_DIAMETRO = 80;

// Variáveis das Estrelas
let estrelas = [];
const NUM_ESTRELAS = 100; // Quantidade de estrelas no céu noturno

// Variáveis do Jogo (Milho e Feijão)
let milhos = [];
let feijoes = []; // Array para armazenar os feijões
let score = 0;
let lastCornTime = 0;
let lastBeanTime = 0; // Tempo da última geração de feijão
const CORN_INTERVAL = 800; // milissegundos
const BEAN_INTERVAL = 1500; // Intervalo para geração de feijão (mais raro que milho)
const MIN_ALIMENTOS_PARA_ENTREGAR = 8; // Mínimo de alimentos para ir para a cidade

// Variável para controlar a mensagem da noite
let mostrarMensagemNoite = false;

// --- Setup: Inicialização do Canvas e Elementos ---
function setup() {
  createCanvas(800, 500);
  rectMode(CORNER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER); // Garante que o texto (emoji) seja centralizado no ponto

  // Inicializa o trator no centro do campo
  tratorX = width / 2;
  tratorY = height * 0.75;

  // Inicializa os carros
  for (let i = 0; i < NUM_CARROS; i++) {
    carros.push(new Carro(random(width), height - 60, random(1.5, 3.5), color(random(255), random(255), random(255))));
  }

  // Inicializa a posição do sol e as cores do céu
  solY = 80; // Começa alto
  luaY = height + LUA_DIAMETRO / 2; // Lua começa escondida abaixo

  ceuCorInicio = color(135, 206, 235);      // Azul claro (dia)
  ceuCorFim = color(255, 100, 0);          // Laranja avermelhado (pôr do sol)
  ceuCorNoite = color(25, 25, 112);         // Azul escuro (noite)
  ceuCorAtual = ceuCorInicio;               // Inicializa a cor atual do céu

  // Inicializa as estrelas
  for (let i = 0; i < NUM_ESTRELAS; i++) {
    estrelas.push({
      x: random(width),
      y: random(height * 0.7), // Estrelas aparecem na parte superior do céu
      tamanho: random(1, 3),
      brilho: random(150, 255)
    });
  }
}

// --- Draw: Loop Principal do Jogo/Cena ---
function draw() {
  if (modoCena === 'inicio') {
    desenharCapa();
  } else if (modoCena === 'gameover') {
    desenharGameOver();
  } else if (modoCena === 'ganhou') {
    desenharGanhou();
  }
  else {
    // Atualiza a posição do sol
    solY += SOL_VELOCIDADE;

    // Atualiza a posição da lua
    if (solY > height / 3) { // Lua começa a subir um pouco mais cedo
      luaY -= LUA_VELOCIDADE;
      luaY = constrain(luaY, LUA_DIAMETRO / 2 + 20, height + LUA_DIAMETRO / 2); // Garante que a lua não suba demais
    }

    // Calcula a cor do céu baseada na posição do sol
    let mapearSolDiaPorDoSol = map(solY, 80, height * 0.7, 0, 1); // Transição dia para pôr do sol
    let corTransicaoDiaPorDoSol = lerpColor(ceuCorInicio, ceuCorFim, mapearSolDiaPorDoSol);

    // Segunda transição: do pôr do sol para a noite escura
    // O valor de 'height * 1.0' pode ser ajustado para fazer a noite chegar mais rápido ou mais devagar
    let mapearSolPorDoSolNoite = map(solY, height * 0.6, height * 1.0, 0, 1);
    ceuCorAtual = lerpColor(corTransicaoDiaPorDoSol, ceuCorNoite, mapearSolPorDoSolNoite);


    // Lógica para mostrar a mensagem da noite
    if (modoCena === 'campo' && solY > height * 0.7) {
      mostrarMensagemNoite = true;
      // Se anoiteceu e o jogador não atingiu a pontuação, vai para Game Over
      if (score < MIN_ALIMENTOS_PARA_ENTREGAR && solY > height * 1.1) { // Só game over se já estiver bem tarde
        modoCena = 'gameover';
      }
    } else {
      mostrarMensagemNoite = false;
    }

    // Renderiza a cena apropriada
    if (modoCena === 'campo') {
      desenharCampo();
      jogoCampo();
      if (mostrarMensagemNoite && score >= MIN_ALIMENTOS_PARA_ENTREGAR) {
        exibirMensagemProntoParaCidade();
      } else if (mostrarMensagemNoite && score < MIN_ALIMENTOS_PARA_ENTREGAR) {
        exibirMensagemColetarMais();
      }
    } else { // modoCena === 'cidade'
      desenharCidade();
      if (tratorEmCena) {
        animarTratorNaCidade();
      }
    }

    // Exibe a pontuação em ambos os modos, exceto nas telas de início/fim/cidade
    if (modoCena !== 'inicio' && modoCena !== 'gameover' && modoCena !== 'ganhou' && modoCena !== 'cidade') {
      fill(0);
      textSize(20);
      text(`Alimentos Coletados: ${score}`, width - 250, 30);
    }
  }
}

// --- Funções da Capa e Mensagens ---
function desenharCapa() {
  background(50, 150, 200); // Um azul agradável para a capa

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("AVENTURA NA FAZENDA!", width / 2, height / 4);

  textSize(24);
  text("VOCÊ DEVE COLETAR MILHO 🌽 E FEIJÃO 🫘", width / 2, height / 2 - 40);
  text("VOCÊ DEVE TER MAIS DE 8 ALIMENTOS PARA IR PARA A CIDADE.", width / 2, height / 2);
  textSize(20); // Tamanho um pouco menor para a nova frase
  text("CLIQUE NA TELA E APERTE ESPAÇO PARA COMEÇAR", width / 2, height / 2 + 80);

  textSize(18);
  fill(200);
  text("Controles: Setas Esquerda/Direita para mover o trator", width / 2, height - 50);
}

function desenharGameOver() {
  background(50, 0, 0); // Fundo vermelho escuro para game over
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("JÁ ANOITECEU...", width / 2, height / 2 - 40);
  fill(255, 50, 50); // Cor mais vibrante para a parte principal
  text("E VOCÊ PERDEU!", width / 2, height / 2 + 20);
  fill(200);
  textSize(20);
  text("CLIQUE NA TELA PARA RECOMEÇAR", width / 2, height / 2 + 80);
}

function desenharGanhou() {
  background(50, 200, 50); // Fundo verde para vitória
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("PARABÉNS!", width / 2, height / 2 - 40);
  fill(255, 255, 0); // Cor amarela vibrante
  text("VOCÊ GANHOU!", width / 2, height / 2 + 20);
  fill(200);
  textSize(20);
  text("CLIQUE NA TELA PARA JOGAR NOVAMENTE", width / 2, height / 2 + 80);
}

function exibirMensagemProntoParaCidade() {
    push();
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255);
    text("Já anoiteceu, vamos levar", width / 2, height / 2);
    textSize(24);
    text("o milho e feijão para a cidade!", width / 2, height / 2 + 30);
    textSize(18);
    fill(200, 255, 200); // Um verde claro para o texto de clique
    text("(Clique para ir)", width / 2, height / 2 + 60);
    pop();
}

function exibirMensagemColetarMais() {
    push();
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255, 100, 100); // Vermelho para a mensagem de alerta
    text("Está anoitecendo...", width / 2, height / 2 - 20);
    textSize(24);
    fill(255);
    text(`Colete mais alimentos! (${score}/${MIN_ALIMENTOS_PARA_ENTREGAR})`, width / 2, height / 2 + 20);
    pop();
}

// --- Funções do Campo ---
function desenharCampo() {
  background(ceuCorAtual);

  // Desenha as estrelas se estiver de noite (solY alto)
  if (solY >= height * 0.7) { // Estrelas aparecem quando o sol está se pondo ou já se pôs
    desenharEstrelas();
  }

  if (solY < height * 0.7) { // Desenha o sol enquanto ele estiver acima de certa altura
    fill(255, 255, 0);
    noStroke();
    ellipse(width - 80, solY, 100, 100);
  }

  if (luaY < height + LUA_DIAMETRO / 2) {
    desenharLua(width - 80, luaY, LUA_DIAMETRO);
  }

  fill(139, 69, 19);
  noStroke();
  ellipse(width * 0.25, height * 0.55, width * 0.6, height * 0.6);
  ellipse(width * 0.6, height * 0.5, width * 0.7, height * 0.7);
  ellipse(width * 0.85, height * 0.58, width * 0.5, height * 0.5);

  fill(107, 142, 35);
  rect(0, height * 0.5, width, height * 0.5);

  fill(85, 107, 47);
  for (let i = 0; i < width; i += 30) {
    rect(i, height * 0.55, 10, height * 0.3);
  }

  fill(0);
  textSize(100);
  text('🏠', 115, height * 0.50);
  textSize(12);

  desenharCerca(350, height * 0.75, 100, 70);

  fill(0);
  textSize(40);
  text('🐄', 350 + 5, height * 0.73);
  text('🐑', 350 + 60, height * 0.70);
  textSize(12);

  desenharTrator(tratorX, tratorY);
}

function desenharCerca(xInicio, yBase, largura, altura) {
  const numPostes = 3;
  const espacamentoPostes = largura / (numPostes - 1);

  stroke(101, 67, 33);
  strokeWeight(5);
  for (let i = 0; i < numPostes; i++) {
    let xPoste = xInicio + i * espacamentoPostes;
    line(xPoste, yBase, xPoste, yBase - altura);
    line(xPoste, yBase, xPoste - 5, yBase + 10);
    line(xPoste, yBase, xPoste + 5, yBase + 10);
  }

  stroke(120, 80, 40);
  strokeWeight(3);
  line(xInicio, yBase - altura * 0.3, xInicio + largura, yBase - altura * 0.3);
  line(xInicio, yBase - altura * 0.6, xInicio + largura, yBase - altura * 0.6);
  line(xInicio, yBase - altura * 0.9, xInicio + largura, yBase - altura * 0.9);
  noStroke();
}

function desenharTrator(x, y) {
  push();
  translate(x, y);

  fill(255, 0, 0);
  rect(0, 0, TRATOR_LARGURA, TRATOR_ALTURA);

  fill(150, 75, 0);
  rect(TRATOR_LARGURA * 0.6, -TRATOR_ALTURA * 0.7, TRATOR_LARGURA * 0.4, TRATOR_ALTURA * 0.7);

  fill(50);
  ellipse(TRATOR_LARGURA * 0.2, TRATOR_ALTURA * 0.8, TRATOR_LARGURA * 0.4, TRATOR_LARGURA * 0.4);
  ellipse(TRATOR_LARGURA * 0.8, TRATOR_ALTURA * 0.8, TRATOR_LARGURA * 0.5, TRATOR_LARGURA * 0.5);

  pop();
}

// --- Funções do Jogo (Campo) ---
function jogoCampo() {
  // Movimento do trator (só permite movimento se não estiver mostrando a mensagem da noite E não atingiu a meta)
  if (!mostrarMensagemNoite || score < MIN_ALIMENTOS_PARA_ENTREGAR) {
    if (keyIsDown(LEFT_ARROW)) {
      tratorX -= TRATOR_VELOCIDADE;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      tratorX += TRATOR_VELOCIDADE;
    }
    tratorX = constrain(tratorX, 0, width - TRATOR_LARGURA);
  }

  // Gera milho (só gera se não estiver mostrando a mensagem da noite E não atingiu a meta)
  if ((!mostrarMensagemNoite || score < MIN_ALIMENTOS_PARA_ENTREGAR) && millis() - lastCornTime > CORN_INTERVAL) {
    milhos.push(new Milho(random(width), 0, 20, random(2, 4)));
    lastCornTime = millis();
  }

  // Gera feijão (só gera se não estiver mostrando a mensagem da noite E não atingiu a meta)
  if ((!mostrarMensagemNoite || score < MIN_ALIMENTOS_PARA_ENTREGAR) && millis() - lastBeanTime > BEAN_INTERVAL) {
    feijoes.push(new Feijao(random(width), 0, 18, random(1.5, 3.5))); // Feijão um pouco menor e mais lento
    lastBeanTime = millis();
  }


  // Atualiza e desenha milho
  for (let i = milhos.length - 1; i >= 0; i--) {
    let milho = milhos[i];
    milho.atualizar();
    milho.desenhar();

    // Verifica colisão com o trator
    let d = dist(milho.x, milho.y, tratorX + TRATOR_LARGURA / 2, tratorY + TRATOR_ALTURA / 2);
    if (d < milho.tamanhoEmoji / 2 + TRATOR_LARGURA / 2) { // Usa o tamanho do emoji para colisão
      score++;
      milhos.splice(i, 1); // Remove o milho coletado
    }

    // Remove milho que saiu da tela
    if (milho.y > height + 50) {
      milhos.splice(i, 1);
    }
  }

  // Atualiza e desenha feijão
  for (let i = feijoes.length - 1; i >= 0; i--) {
    let feijao = feijoes[i];
    feijao.atualizar();
    feijao.desenhar();

    // Verifica colisão com o trator
    let d = dist(feijao.x, feijao.y, tratorX + TRATOR_LARGURA / 2, tratorY + TRATOR_ALTURA / 2);
    if (d < feijao.tamanhoEmoji / 2 + TRATOR_LARGURA / 2) { // Usa o tamanho do emoji para colisão
      score++;
      feijoes.splice(i, 1); // Remove o feijão coletado
    }

    // Remove feijão que saiu da tela
    if (feijao.y > height + 50) {
      feijoes.splice(i, 1);
    }
  }
}

// Classe para o Milho
class Milho {
  constructor(x, y, diametro, velocidade) {
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;
    this.tamanhoEmoji = 25; // Tamanho do emoji para fins de exibição e colisão
  }

  atualizar() {
    this.y += this.velocidade;
  }

  desenhar() {
    textSize(this.tamanhoEmoji);
    text('🌽', this.x, this.y);
  }
}

// Classe para o Feijão
class Feijao {
    constructor(x, y, diametro, velocidade) {
        this.x = x;
        this.y = y;
        this.velocidade = velocidade;
        this.tamanhoEmoji = 22; // Tamanho do emoji para fins de exibição e colisão
    }

    atualizar() {
        this.y += this.velocidade;
    }

    desenhar() {
        textSize(this.tamanhoEmoji);
        text('🫘', this.x, this.y);
    }
}

// --- Funções da Cidade ---
function desenharCidade() {
  background(ceuCorAtual);

  // Desenha as estrelas se estiver de noite (solY alto)
  if (solY >= height * 0.7) {
    desenharEstrelas();
  }

  if (solY < height * 0.7) {
    fill(255, 255, 0);
    noStroke();
    ellipse(width - 80, solY, 100, 100);
  }

  if (luaY < height + LUA_DIAMETRO / 2) {
    desenharLua(width - 80, luaY, LUA_DIAMETRO);
  }

  fill(80);
  rect(0, height - 80, width, 80);

  stroke(255, 255, 0);
  strokeWeight(3);
  for (let i = 0; i < width; i += 40) {
    line(i, height - 40, i + 20, height - 40);
  }
  noStroke();

  desenharFabrica(width / 2 - 300, height - 80, 200, 180);

  desenharLojaRoupas(width / 2 - 80, height - 80, 180, 120);

  desenharMercado(width / 2 + 120, height - 80, 250, 150);

  for (let i = particulasFumaca.length - 1; i >= 0; i--) {
    particulasFumaca[i].atualizar();
    particulasFumaca[i].desenhar();
    if (particulasFumaca[i].isFinished()) {
      particulasFumaca.splice(i, 1);
    }
  }

  for (let i = 0; i < carros.length; i++) {
    carros[i].atualizar();
    carros[i].desenhar();
  }

  if (tratorEmCena) {
      desenharTrator(tratorX, tratorY);
  }
}

function animarTratorNaCidade() {
    if (abs(tratorX - tratorDestinoX) > TRATOR_VELOCIDADE_CIDADE) {
        if (tratorX < tratorDestinoX) {
            tratorX += TRATOR_VELOCIDADE_CIDADE;
        } else {
            tratorX -= TRATOR_VELOCIDADE_CIDADE;
        }
    } else {
        tratorX = tratorDestinoX;
        // Quando o trator chega ao destino (mercado), ele "entra no mercado"
        tratorEmCena = false; // Isso fará com que o trator pare de ser desenhado
        modoCena = 'ganhou'; // Mudar para o modo de vitória
    }
}

// --- Funções Auxiliares de Desenho ---
function desenharLua(x, y, diametro) {
  fill(240, 240, 240);
  noStroke();
  ellipse(x, y, diametro, diametro);

  fill(200, 200, 200);
  ellipse(x - diametro * 0.15, y - diametro * 0.1, diametro * 0.2);
  ellipse(x + diametro * 0.2, y + diametro * 0.15, diametro * 0.15);
  ellipse(x, y - diametro * 0.2, diametro * 0.1);
}

function desenharEstrelas() {
  for (let i = 0; i < estrelas.length; i++) {
    let estrela = estrelas[i];
    fill(255, 255, 255, estrela.brilho);
    noStroke();
    ellipse(estrela.x, estrela.y, estrela.tamanho, estrela.tamanho);

    // Pequena variação no brilho para simular cintilação
    estrela.brilho += random(-5, 5);
    estrela.brilho = constrain(estrela.brilho, 100, 255); // Limita o brilho
  }
}

function desenharFabrica(x, yBase, largura, altura) {
  push();
  translate(x, yBase - altura);

  fill(90, 90, 90);
  rect(0, 0, largura, altura);

  fill(70, 70, 70);
  rect(0, altura - 10, largura, 10);

  fill(60, 60, 60);
  beginShape();
  vertex(0, 0);
  vertex(largura * 0.2, -30);
  vertex(largura * 0.8, -30);
  vertex(largura, 0);
  endShape(CLOSE);
  rect(0, 0, largura, 10);

  fill(50, 50, 50);
  rect(largura * 0.25, -45, 20, 15);
  rect(largura * 0.75, -45, 20, 15);

  fill(70, 70, 70);
  let chamine1X = largura * 0.2;
  let chamine2X = largura * 0.7;

  rect(chamine1X, -50, 30, 70);
  rect(chamine2X, -60, 40, 80);

  fill(50, 50, 50);
  rect(chamine1X - 5, -55, 40, 5);
  rect(chamine2X - 5, -65, 50, 5);

  if (frameCount % 5 === 0) {
    particulasFumaca.push(new ParticulaFumaca(x + chamine1X + 15, yBase - altura - 50));
    particulasFumaca.push(new ParticulaFumaca(x + chamine2X + 20, yBase - altura - 60));
  }

  let luzesAcesas = (solY >= height * 0.6);

  for (let j = 0; j < altura - 40; j += 40) {
    for (let k = 0; k < largura - 40; k += 40) {
      if (luzesAcesas) {
        fill(255, 220, 100, 200);
      } else {
        fill(40, 40, 50);
      }
      rect(20 + k, 20 + j, 20, 15);
      stroke(20);
      strokeWeight(1);
      noFill();
      rect(20 + k, 20 + j, 20, 15);
      noStroke();
    }
  }

  fill(50, 50, 50);
  rect(largura / 2 - 30, altura - 70, 60, 70);
  fill(150, 150, 150);
  ellipse(largura / 2 + 20, altura - 40, 5, 5);

  pop();
}

function desenharMercado(x, yBase, largura, altura) {
  push();
  translate(x, yBase - altura);

  fill(180, 220, 255);
  rect(0, 0, largura, altura);

  fill(150, 180, 200);
  beginShape();
  vertex(0, 0);
  vertex(largura * 0.1, -20);
  vertex(largura * 0.9, -20);
  vertex(largura, 0);
  endShape(CLOSE);

  let luzesAcesas = (solY >= height * 0.6);

  for (let j = 0; j < altura - 60; j += 40) {
    for (let k = 0; k < largura - 60; k += 60) {
      if (luzesAcesas) {
        fill(255, 255, 150, 200);
      } else {
        fill(100, 100, 120);
      }
      rect(30 + k, 30 + j, 40, 30);
      stroke(50);
      strokeWeight(1);
      noFill();
      rect(30 + k, 30 + j, 40, 30);
      noStroke();
    }
  }

  fill(100, 50, 0);
  rect(largura / 2 - 25, altura - 60, 50, 60);
  fill(200, 200, 200);
  ellipse(largura / 2 + 20, altura - 30, 5, 5);

  fill(255);
  rect(largura / 2 - 60, -40, 120, 30);
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("MERCADO", largura / 2, -25);
  textSize(12);
  textAlign(LEFT, BASELINE);

  pop();
}

function desenharLojaRoupas(x, yBase, largura, altura) {
  push();
  translate(x, yBase - altura);

  fill(255, 150, 180);
  rect(0, 0, largura, altura);

  fill(200, 100, 130);
  rect(0, 0, largura, 10);

  let luzesAcesas = (solY >= height * 0.6);

  if (luzesAcesas) {
    fill(255, 255, 200, 200);
  } else {
    fill(100, 100, 150, 150);
  }
  rect(largura * 0.1, altura * 0.2, largura * 0.8, altura * 0.5);
  stroke(50);
  strokeWeight(2);
  noFill();
  rect(largura * 0.1, altura * 0.2, largura * 0.8, altura * 0.5);
  noStroke();

  if (luzesAcesas) {
    fill(0);
    textSize(30);
    text('👚', largura * 0.15, altura * 0.6);
    text('👖', largura * 0.4, altura * 0.6);
    text('👗', largura * 0.65, altura * 0.6);
    textSize(12);
  }

  fill(120, 70, 0);
  rect(largura * 0.4, altura * 0.7, largura * 0.2, altura * 0.3);
  fill(200, 200, 200);
  ellipse(largura * 0.4 + 5, altura * 0.85, 5, 5);

  fill(255);
  rect(largura / 2 - 50, -25, 100, 20);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("ROUPAS", largura / 2, -15);
  textSize(12);
  textAlign(LEFT, BASELINE);

  pop();
}

class ParticulaFumaca {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidadeY = random(-0.5, -2);
    this.diametro = random(5, 15);
    this.alpha = 200;
  }

  atualizar() {
    this.y += this.velocidadeY;
    this.x += random(-0.5, 0.5);
    this.alpha -= 2;
    this.diametro += 0.1;
  }

  desenhar() {
    noStroke();
    fill(180, 180, 180, this.alpha);
    ellipse(this.x, this.y, this.diametro, this.diametro);
  }

  isFinished() {
    return this.alpha < 0;
  }
}

class Carro {
  constructor(x, y, velocidade, cor) {
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;
    this.cor = cor;
    this.largura = 50;
    this.altura = 20;
  }

  atualizar() {
    this.x += this.velocidade;
    if (this.x > width + 50) {
      this.x = -50;
      this.velocidade = random(1.5, 3.5);
      this.cor = color(random(255), random(255), random(255));
    }
  }

  desenhar() {
    push();
    translate(this.x, this.y);

    fill(this.cor);
    rect(0, -this.altura, this.largura, this.altura);

    rect(this.largura * 0.2, -this.altura - 15, this.largura * 0.6, 15);

    fill(173, 216, 230, 150);
    rect(this.largura * 0.24, -this.altura - 12, this.largura * 0.2, 10);
    rect(this.largura * 0.56, -this.altura - 12, this.largura * 0.2, 10);

    fill(30);
    ellipse(this.largura * 0.2, 0, 18, 18);
    ellipse(this.largura * 0.8, 0, 18, 18);

    fill(255, 255, 0);
    ellipse(this.largura - 2, -this.altura * 0.75, 5, 5);
    fill(255);
    ellipse(2, -this.altura * 0.75, 5, 5);

    pop();
  }
}

// --- Interatividade (Mouse e Teclado) ---
function mousePressed() {
  if (modoCena === 'gameover' || modoCena === 'ganhou') {
    // Se estiver em Game Over ou Ganhou, qualquer clique reinicia o jogo
    modoCena = 'inicio'; // Volta para a tela inicial
    resetGame(); // Reseta todas as variáveis do jogo
  }
  // Só permite mudar para a cidade se estiver no campo, for noite E a pontuação for suficiente
  else if (modoCena === 'campo' && mostrarMensagemNoite && score >= MIN_ALIMENTOS_PARA_ENTREGAR) {
    modoCena = 'cidade';
    score = 0; // Zera a pontuação ao ir para a cidade
    milhos = []; // Limpa milhos e feijões restantes
    feijoes = [];
    solY = height * 0.8; // Define o sol para uma posição de "noite" na cidade
    luaY = height * 0.2; // Garante que a lua esteja visível na cidade
    ceuCorAtual = ceuCorNoite; // Define o céu para noite escura imediatamente

    tratorEmCena = true;
    tratorX = -TRATOR_LARGURA; // Começa o trator fora da tela, à esquerda
    tratorY = height - 80 - TRATOR_ALTURA / 2; // Posição na rua da cidade
    // Calcula a posição X alvo para o trator (em frente ao mercado)
    tratorDestinoX = (width / 2 + 120) + (250 * 0.3) - TRATOR_LARGURA / 2;
  } else if (modoCena === 'cidade' && !tratorEmCena) { // Permite voltar para o campo da cidade a qualquer momento (somente se o trator não estiver animando)
    modoCena = 'campo';
    score = 0; // Zera a pontuação ao voltar para o campo
    solY = 80;
    luaY = height + LUA_DIAMETRO / 2;
    tratorEmCena = false;
    tratorX = width / 2;
    tratorY = height * 0.75;
  }
  // Se for o modo 'inicio', o clique do mouse não faz nada, pois a tecla 'ESPAÇO' é usada
}

function keyPressed() {
  if (modoCena === 'inicio' && key === ' ') { // Se estiver no início e apertar espaço
    modoCena = 'campo'; // Inicia o jogo no campo
    resetGame(); // Reseta todas as variáveis do jogo
  }
}

// Função para resetar o estado do jogo
function resetGame() {
    solY = 80; // Reinicia o sol para o ciclo do dia
    luaY = height + LUA_DIAMETRO / 2; // Esconde a lua
    tratorX = width / 2; // Posiciona o trator no campo
    tratorY = height * 0.75;
    score = 0; // Zera a pontuação
    milhos = []; // Limpa milhos
    feijoes = []; // Limpa feijões
    mostrarMensagemNoite = false; // Garante que a mensagem da noite não apareça imediatamente
    tratorEmCena = false; // Garante que o trator não comece na cidade
}