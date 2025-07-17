function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let xJogador = [0, 0, 0];
let yJogador = [100, 200, 300];
let jogador = ["🌽", "🍓", "🍅"];
let tempoPausa = [0, 0, 0];

// Variáveis para os "carros"
let xCarro = [400, 400];
let yCarro = [0, 0];
let velocidadeCarro = [-5, -7];

// Variáveis para as "pragas"
let xPraga = [400, 400];
let yPraga = [0, 0];
let velocidadePraga = [-3, -4];

let jogoIniciado = false; // Nova variável para controlar o início do jogo

function setup() {
  createCanvas(400, 400);
  // Inicializa as posições Y dos carros e pragas para corresponder às linhas dos jogadores
  yCarro[0] = yJogador[0];
  yCarro[1] = yJogador[1];

  yPraga[0] = yJogador[0];
  yPraga[1] = yJogador[2];
}

function draw() {
  AtivarJogo();
  DesenharJogadores();
  DesenharLinhaDeChegada();

  // Só move, desenha e verifica colisões se o jogo já tiver começado
  if (jogoIniciado) {
    // Movimento, desenho e colisão dos carros
    MoverCarros();
    DesenharCarros();
    VerificarColisaoCarro();

    // Movimento, desenho e colisão das pragas
    MoverPragas();
    DesenharPragas();
    VerificarColisaoPraga();
  } else {
    // Exibe uma mensagem para o jogador iniciar
    fill('white');
    textSize(20);
    text("Pressione P, A ou B para começar!", 50, 50);
  }

  VerificarGanhador();
}

function keyReleased() {
  // Se qualquer jogador se mover, o jogo inicia
  if (key == 'p') {
    if (tempoPausa[0] == 0) xJogador[0] += random(20);
    jogoIniciado = true;
  }
  if (key == 'a') {
    if (tempoPausa[1] == 0) xJogador[1] += random(20);
    jogoIniciado = true;
  }
  if (key == 'b') {
    if (tempoPausa[2] == 0) xJogador[2] += random(20);
    jogoIniciado = true;
  }
}

function AtivarJogo() {
  if (focused) {
    background('green');
  } else {
    background('red');
  }
}

function DesenharJogadores() {
  textSize(40);
  for (let i = 0; i < jogador.length; i++) {
    if (tempoPausa[i] > 0) {
      tempoPausa[i]--;
    }
    text(jogador[i], xJogador[i], yJogador[i]);
  }
}

function DesenharLinhaDeChegada() {
  fill('white');
  rect(350, 0, 10, 400);
  fill('Black');
  for (let yAtual = 0; yAtual < 400; yAtual += 20) {
    rect(350, yAtual, 10, 10);
  }
}

function VerificarGanhador() {
  for (let i = 0; i < 3; i++) {
    if (xJogador[i] > 350) {
      text(jogador[i] + " venceu!", 50, 200);
      noLoop();
    }
  }
}

// --- Funções para Carros ---

function MoverCarros() {
  for (let i = 0; i < xCarro.length; i++) {
    xCarro[i] += velocidadeCarro[i];
    if (xCarro[i] < -50) {
      xCarro[i] = 450;
      // Define a linha Y do carro para uma das linhas dos jogadores de forma cíclica
      yCarro[i] = yJogador[floor(random(yJogador.length))]; // Randomiza a linha
    }
  }
}

function DesenharCarros() {
  textSize(40);
  fill('blue');
  for (let i = 0; i < xCarro.length; i++) {
    text("🚗", xCarro[i], yCarro[i]);
  }
}

function VerificarColisaoCarro() {
  for (let i = 0; i < jogador.length; i++) {
    for (let j = 0; j < xCarro.length; j++) {
      let distancia = dist(xJogador[i], yJogador[i], xCarro[j], yCarro[j]);

      if (distancia < 30) {
        xJogador[i] = 0;
      }
    }
  }
}

// --- Funções para Pragas ---

function MoverPragas() {
  for (let i = 0; i < xPraga.length; i++) {
    xPraga[i] += velocidadePraga[i];
    if (xPraga[i] < -50) {
      xPraga[i] = 450;
      // Define a linha Y da praga para uma das linhas dos jogadores de forma cíclica
      yPraga[i] = yJogador[floor(random(yJogador.length))]; // Randomiza a linha
    }
  }
}

function DesenharPragas() {
  textSize(40);
  fill('brown');
  for (let i = 0; i < xPraga.length; i++) {
    text("🐛", xPraga[i], yPraga[i]);
  }
}

function VerificarColisaoPraga() {
  for (let i = 0; i < jogador.length; i++) {
    for (let j = 0; j < xPraga.length; j++) {
      let distancia = dist(xJogador[i], yJogador[i], xPraga[j], yPraga[j]);

      if (distancia < 30) {
        xJogador[i] -= 20;
        tempoPausa[i] = 60;
        if (xJogador[i] < 0) {
          xJogador[i] = 0;
        }
      }
    }
  }
}