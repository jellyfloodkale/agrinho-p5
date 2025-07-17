let jogador;
let lixo;
let lixeiraOrganica, lixeiraReciclavel;
let pontos = 0;
let tipoLixo;
let carregando = false;
let jogoEncerrado = false;

let tempoMaximo = 50; // segundos ajustáveis
let tempoRestante;
let tempoIniciado = false;
let inicioContagem = 0;
let jogoIniciado = false;

function setup() {
  createCanvas(600, 400);
  jogador = new Jogador();
  novoLixo();
  lixeiraOrganica = createVector(100, height - 50);
  lixeiraReciclavel = createVector(width - 100, height - 50);
  tempoRestante = tempoMaximo;
}

function draw() {
  background(200, 240, 200);

  if (!jogoIniciado) {
    telaInicial();
    return;
  }

  if (tempoIniciado && !jogoEncerrado) {
    tempoRestante = tempoMaximo - int((millis() - inicioContagem) / 1000);
    if (tempoRestante <= 0) {
      tempoRestante = 0;
      jogoEncerrado = true;
    }
  }

  mostrarInstrucoes();
  jogador.mover();
  jogador.mostrar();
  mostrarLixeiras();

  if (!jogoEncerrado) {
    if (!carregando) {
      if (dist(jogador.x, jogador.y, lixo.x, lixo.y) < 30) {
        carregando = true;
      } else {
        textSize(32);
        text(lixo.emoji, lixo.x, lixo.y);
      }
    } else {
      verificarEntrega();
      if (!jogoEncerrado) {
        textSize(32);
        text(lixo.emoji, jogador.x + 20, jogador.y);
      }
    }
  }

  if (jogoEncerrado) {
    fill(0);
    textSize(20);
    if (pontos >= 10) {
      text("🎉 Parabéns! Você separou corretamente 10 lixos!", 80, height / 2);
    } else {
      text("⏰ Tempo esgotado! Você fez " + pontos + " ponto(s).", 120, height / 2);
    }
    noLoop();
  }
}

function telaInicial() {
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("🗑️ Jogo da Lixeira Certa", width / 2, height / 2 - 40);
  textSize(16);
  text("Separe corretamente 10 lixos antes que o tempo acabe!", width / 2, height / 2);
  text("Clique para começar", width / 2, height / 2 + 40);
  textAlign(LEFT);
}

function mousePressed() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    inicioContagem = millis();
    tempoIniciado = true;
    loop();
  }
}

function mostrarInstrucoes() {
  fill(0);
  textSize(14);
  text("Use as setas para mover", 10, 20);
  text("Leve o lixo para a lixeira correta", 10, 40);
  text("Pontos: " + pontos, 10, 60);
  text("Tempo restante: " + tempoRestante + "s", 10, 80);
}

function mostrarLixeiras() {
  textSize(28);
  text("🗑️ Orgânico", lixeiraOrganica.x - 40, lixeiraOrganica.y);
  text("🗑️ Reciclável", lixeiraReciclavel.x - 110, lixeiraReciclavel.y);
}

function verificarEntrega() {
  if (tipoLixo === "organico" && dist(jogador.x, jogador.y, lixeiraOrganica.x, lixeiraOrganica.y) < 50) {
    pontos++;
    novoLixo();
  } else if (tipoLixo === "reciclavel" && dist(jogador.x, jogador.y, lixeiraReciclavel.x, lixeiraReciclavel.y) < 50) {
    pontos++;
    novoLixo();
  }

  if (pontos >= 10) {
    jogoEncerrado = true;
  }
}

function novoLixo() {
  let opcoes = [
    { emoji: '🍎', tipo: 'organico' },
    { emoji: '🍌', tipo: 'organico' },
    { emoji: '📄', tipo: 'reciclavel' },
    { emoji: '🧃', tipo: 'reciclavel' },
    { emoji: '🥦', tipo: 'organico' },
    { emoji: '🥕', tipo: 'organico' },
    { emoji: '🥡', tipo: 'reciclavel' },
    { emoji: '🥫', tipo: 'reciclavel' },
  ];
  let escolhido = random(opcoes);
  lixo = {
    emoji: escolhido.emoji,
    tipo: escolhido.tipo,
    x: random(50, width - 50),
    y: random(100, height - 100)
  };
  tipoLixo = escolhido.tipo;
  carregando = false;
}

class Jogador {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.velocidade = 3;
    this.emoji = '🚶';
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
    if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
    if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;

    this.x = constrain(this.x, 0, width - 20);
    this.y = constrain(this.y, 0, height - 20);
  }

  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}
