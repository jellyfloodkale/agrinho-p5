let ezequiel;
let ovos = [];
let agua = [];
let galpoes = [];
let pontuacao = 0;
let tempoLimite = 60;
let tempoRestante;
let inicioTempo;
let jogoIniciado = false;
let jogoEncerrado = false;

function setup() {
  createCanvas(600, 400);
  ezequiel = new Ezequiel();
  for (let i = 0; i < 5; i++) {
    ovos.push(new Ovo());
    agua.push(new Gota());
  }
  galpoes.push(new Galpao(80));
  galpoes.push(new Galpao(260));
  galpoes.push(new Galpao(440));
  tempoRestante = tempoLimite;
}

function draw() {
  background(255, 248, 220); // cor de palha

  if (!jogoIniciado) {
    telaInicial();
    return;
  }

  atualizarTempo();
  mostrarInformacoes();
  ezequiel.mover();
  ezequiel.mostrar();

  for (let g of galpoes) {
    g.mostrar();
  }

  for (let i = ovos.length - 1; i >= 0; i--) {
    ovos[i].mostrar();
    if (dist(ezequiel.x, ezequiel.y, ovos[i].x, ovos[i].y) < 30) {
      ovos.splice(i, 1);
      pontuacao += 2;
      ovos.push(new Ovo());
    }
  }

  for (let i = agua.length - 1; i >= 0; i--) {
    agua[i].mostrar();
    agua[i].cair();
    if (agua[i].y > height) {
      agua.splice(i, 1);
      pontuacao -= 1;
      agua.push(new Gota());
    } else if (dist(ezequiel.x, ezequiel.y, agua[i].x, agua[i].y) < 30) {
      agua.splice(i, 1);
      pontuacao += 1;
      agua.push(new Gota());
    }
  }

  if (pontuacao >= 20 && !jogoEncerrado) {
    jogoEncerrado = true;
    textSize(20);
    fill(0);
    text("🐔 Parabéns, Ezequiel! Sua granja está equilibrada!", 100, height / 2);
    noLoop();
  }

  if (tempoRestante <= 0 && !jogoEncerrado) {
    jogoEncerrado = true;
    textSize(20);
    fill(0);
    text("⏰ O tempo acabou! Tente novamente, Ezequiel!", 100, height / 2);
    noLoop();
  }
}

function telaInicial() {
  background(240, 220, 200);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(26);
  text("🐣 Granja Sustentável 🐣", width / 2, height / 2 - 90);
  textSize(16);
  text("Você é Ezequiel, responsável por uma granja com 3 barracões.", width / 2, height / 2 - 50);
  text("Seu objetivo é coletar ovos 🥚 e economizar água 💧", width / 2, height / 2 - 25);
  text("Use as setas do teclado para se mover 🧑‍🌾", width / 2, height / 2);
  text("Ganhe pontos coletando os recursos corretamente.", width / 2, height / 2 + 25);
  text("Cuidado com o desperdício de água!", width / 2, height / 2 + 50);
  text("Clique com o mouse para começar o jogo.", width / 2, height / 2 + 85);
  textAlign(LEFT);
}

function mousePressed() {
  if (!jogoIniciado) {
    inicioTempo = millis();
    jogoIniciado = true;
    loop();
  }
}

function atualizarTempo() {
  tempoRestante = tempoLimite - int((millis() - inicioTempo) / 1000);
  tempoRestante = max(0, tempoRestante);
}

function mostrarInformacoes() {
  fill(0);
  textSize(14);
  text("Pontos: " + pontuacao, 10, 20);
  text("Tempo restante: " + tempoRestante + "s", 10, 40);
}

class Ezequiel {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.vel = 3;
    this.emoji = '🧑‍🌾';
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.vel;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.vel;
    if (keyIsDown(UP_ARROW)) this.y -= this.vel;
    if (keyIsDown(DOWN_ARROW)) this.y += this.vel;
    this.x = constrain(this.x, 0, width - 20);
    this.y = constrain(this.y, 0, height - 20);
  }

  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}

class Ovo {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(100, height - 100);
    this.emoji = "🥚";
  }

  mostrar() {
    textSize(28);
    text(this.emoji, this.x, this.y);
  }
}

class Gota {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 0;
    this.vel = random(1, 2);
    this.emoji = "💧";
  }

  cair() {
    this.y += this.vel;
  }

  mostrar() {
    textSize(24);
    text(this.emoji, this.x, this.y);
  }
}

class Galpao {
  constructor(x) {
    this.x = x;
    this.y = 100;
  }

  mostrar() {
    fill(200, 180, 100);
    rect(this.x, this.y, 80, 60);
    fill(0);
    textSize(12);
    text("Galpão", this.x + 10, this.y + 35);
  }
}
