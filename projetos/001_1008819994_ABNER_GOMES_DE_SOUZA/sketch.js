let cenaAtual = 0;

let arvores = [];

let animais = [];

let montanhas = [];

let predios = [];

let carros = [];

let postes = [];

let carroPrincipal;

let arvoresUrbanas = [];

let lixeiras = [];

let grades = [];

let moedas = [];

let pontos = 0;

let tempoLimite = 60;

let tempoInicial;

let fogos = [];

let placarMaximo = 0;

let carroVelocidade = 1;

let ultimoAumento = 0;

// Controle teclado

let esquerda = false;

let direita = false;

let cima = false;

let baixo = false;

// Controle touch (botões virtuais)

let botaoEsq, botaoDir, botaoCima, botaoBaixo;

function setup() {

  createCanvas(800, 600);

  textAlign(CENTER, CENTER);

  carroPrincipal = new Carro(0, 515);

  // Inicializar elementos do campo

  for (let i = 0; i < 6; i++) {

    arvores.push(new Arvore(80 * i + 50, 480));

    animais.push(new Animal(random(width), 480));

  }

  animais.push(new CavaloEmoji(100, 460));

  for (let i = 0; i < 3; i++) {

    montanhas.push(new Montanha(250 * i + 100, 400));

  }

  // Elementos da cidade

  for (let i = 0; i < 8; i++) {

    predios.push(new Predio(i * 100 + 20, 500));

    postes.push(new Poste(i * 100 + 50, 470));

  }

  for (let i = 0; i < 3; i++) {

    carros.push(new Carro(random(width), 515));

  }

  for (let i = 0; i < 5; i++) {

    arvoresUrbanas.push(new ArvoreUrbana(i * 150 + 50, 490));

    lixeiras.push(new Lixeira(i * 160 + 80, 495));

    grades.push(new Grade(i * 160 + 10, 490));

  }

  for (let i = 0; i < 6; i++) {

    moedas.push(new Moeda(random(100, width - 100), random(500, 550)));

  }

  // Botões touch (área e cor)

  botaoEsq = { x: 20, y: height - 70, w: 50, h: 50 };

  botaoDir = { x: 90, y: height - 70, w: 50, h: 50 };

  botaoCima = { x: width - 140, y: height - 120, w: 50, h: 50 };

  botaoBaixo = { x: width - 140, y: height - 50, w: 50, h: 50 };

  // Começar no menu

  cenaAtual = 0;

}

function draw() {

  background(135, 206, 250);

  if (cenaAtual === 0) {

    // Menu inicial

    background(0, 150, 255);

    fill(255);

    textSize(40);

    text("🏞️ Mini Game Campo & Cidade", width / 2, 200);

    textSize(24);

    text("Clique para jogar", width / 2, 300);

    // Botão Jogar

    fill(255);

    rect(width / 2 - 70, height / 2 + 50, 140, 50, 10);

    fill(0);

    textSize(24);

    text("Jogar", width / 2, height / 2 + 75);

  } else if (cenaAtual === 1) {

    // Jogo rodando

    let tempoRestante = tempoLimite - int((millis() - tempoInicial) / 1000);

    if (tempoRestante <= 0) {

      cenaAtual = 3; // tempo esgotado

    }

    desenharCampo();

    controleJogador();

    carroPrincipal.show();

    carroPrincipal.move(carroVelocidade);

    for (let i = moedas.length - 1; i >= 0; i--) {

      moedas[i].show();

      if (colisaoRect(carroPrincipal, 32, 32, moedas[i], 15, 15)) {

        pontos += 10;

        moedas.splice(i, 1);

      }

    }

    for (let c of carros) {

      c.show();

      c.move(carroVelocidade * 0.8);

      if (colisaoRect(carroPrincipal, 32, 32, c, 32, 32)) {

        cenaAtual = 4; // colisão = game over

      }

    }

    if (carroPrincipal.x > width - 50) {

      cenaAtual = 2;

      carroPrincipal.x = 0;

    }

    let tempoDecorrido = int((millis() - tempoInicial) / 1000);

    if (tempoDecorrido - ultimoAumento >= 20 && carroVelocidade <= 3) {

      carroVelocidade += 0.1;

      ultimoAumento = tempoDecorrido;

    }

    fill(0, 180, 180, 180);

    rect(0, 0, width, 40);

    fill(255);

    textSize(18);

    text("Pontos: " + pontos, 100, 20);

    text("Tempo: " + tempoRestante + "s", 700, 20);

    text("Moedas restantes: " + moedas.length, width / 2, 20);

    desenharBotoesTouch();

  } else if (cenaAtual === 2) {

    desenharCidade();

    carroPrincipal.show();

    carroPrincipal.move(carroVelocidade);

    fill(255);

    textSize(32);

    text("🎉 Você venceu! 🏁", width / 2, 60);

    textSize(24);

    text("Pontos: " + pontos, width / 2, 100);

    if (frameCount % 10 === 0) {

      fogos.push(new Fogo(random(width), random(height / 2)));

    }

    for (let i = fogos.length - 1; i >= 0; i--) {

      fogos[i].atualizar();

      fogos[i].mostrar();

      if (fogos[i].fim()) fogos.splice(i, 1);

    }

    if (pontos > placarMaximo) {

      placarMaximo = pontos;

    }

    textSize(20);

    text("Recorde: " + placarMaximo, width / 2, 140);

    drawBotaoReiniciar();

  } else if (cenaAtual === 3) {

    background(30);

    fill(255, 0, 0);

    textSize(36);

    text("⏱️ Tempo Esgotado!", width / 2, 250);

    fill(255);

    textSize(24);

    text("Pontos: " + pontos, width / 2, 300);

    drawBotaoReiniciar();

  } else if (cenaAtual === 4) {

    background(80, 0, 0);

    fill(255, 100, 100);

    textSize(36);

    text("💥 Você bateu! Game Over!", width / 2, 250);

    fill(255);

    textSize(24);

    text("Pontos: " + pontos, width / 2, 300);

    drawBotaoReiniciar();

  }

}

function controleJogador() {

  if (esquerda) carroPrincipal.x = max(0, carroPrincipal.x - 5);

  if (direita) carroPrincipal.x = min(width - 32, carroPrincipal.x + 5);

  if (cima) carroPrincipal.y = max(0, carroPrincipal.y - 5);

  if (baixo) carroPrincipal.y = min(height - 32, carroPrincipal.y + 5);

}

function keyPressed() {

  if (cenaAtual === 0) {

    cenaAtual = 1;

    tempoInicial = millis();

    return;

  }

  if (keyCode === LEFT_ARROW) esquerda = true;

  if (keyCode === RIGHT_ARROW) direita = true;

  if (keyCode === UP_ARROW) cima = true;

  if (keyCode === DOWN_ARROW) baixo = true;

}

function keyReleased() {

  if (keyCode === LEFT_ARROW) esquerda = false;

  if (keyCode === RIGHT_ARROW) direita = false;

  if (keyCode === UP_ARROW) cima = false;

  if (keyCode === DOWN_ARROW) baixo = false;

}

function mousePressed() {

  if (cenaAtual === 0) {

    let x = width / 2 - 70;

    let y = height / 2 + 50;

    let largura = 140;

    let altura = 50;

    if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {

      cenaAtual = 1;

      tempoInicial = millis();

      pontos = 0;

      carroVelocidade = 1;

      ultimoAumento = 0;

      moedas = [];

      for (let i = 0; i < 6; i++) {

        moedas.push(new Moeda(random(100, width - 100), random(500, 550)));

      }

      fogos = [];

    }

  }

  if (cenaAtual === 2 || cenaAtual === 3 || cenaAtual === 4) {

    let x = width / 2 - 70;

    let y = height / 2 + 50;

    let largura = 140;

    let altura = 40;

    if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {

      resetarJogo();

      cenaAtual = 1;

      tempoInicial = millis();

      fogos = [];

    }

  }

}

function resetarJogo() {

  carroPrincipal.x = 0;

  carroPrincipal.y = 515;

  pontos = 0;

  carroVelocidade = 1;

  ultimoAumento = 0;

  moedas = [];

  for (let i = 0; i < 6; i++) {

    moedas.push(new Moeda(random(100, width - 100), random(500, 550)));

  }

}

// Colisão retangular simples

function colisaoRect(a, aw, ah, b, bw, bh) {

  return !(a.x > b.x + bw ||

           a.x + aw < b.x ||

           a.y > b.y + bh ||

           a.y + ah < b.y);

}

function desenharCampo() {

  background(135, 206, 250);

  fill(100, 155, 100);

  triangle(100, 500, 300, 250, 500, 500);

  triangle(400, 500, 600, 220, 800, 500);

  triangle(0, 500, 150, 300, 300, 500);

  for (let i = 0; i < width; i += 60) {

    fill(25, 120, 25);

    ellipse(i, 460, 30, 30);

    fill(100, 50, 20);

    rect(i - 3, 470, 6, 20);

  }

  fill(210, 180, 140);

  rect(0, 500, width, 100);

  for (let m of montanhas) m.show();

  for (let a of arvores) a.show();

  for (let an of animais) an.show();

  fill(222, 184, 135, 80);

  ellipse(carroPrincipal.x + 10, carroPrincipal.y + 15, 30, 10);

}

function desenharCidade() {

  background(20);

  fill(50);

  rect(0, 500, width, 100);

  stroke(255);

  strokeWeight(3);

  for (let i = 0; i < width; i += 40) {

    line(i, 550, i + 20, 550);

  }

  noStroke();

  fill(255, 255, 100, 100);

  triangle(carroPrincipal.x + 40, carroPrincipal.y + 5,

    carroPrincipal.x + 100, carroPrincipal.y - 10,

    carroPrincipal.x + 100, carroPrincipal.y + 30);

  for (let p of predios) p.show();

  for (let po of postes) po.show();

  for (let a of arvoresUrbanas) a.show();

  for (let l of lixeiras) l.show();

  for (let g of grades) g.show();

}

function desenharBotoesTouch() {

  noStroke();

  fill(0, 0, 255, 150);

  rect(botaoEsq.x, botaoEsq.y, botaoEsq.w, botaoEsq.h, 10);

  rect(botaoDir.x, botaoDir.y, botaoDir.w, botaoDir.h, 10);

  rect(botaoCima.x, botaoCima.y, botaoCima.w, botaoCima.h, 10);

  rect(botaoBaixo.x, botaoBaixo.y, botaoBaixo.w, botaoBaixo.h, 10);

  fill(255);

  textSize(24);

  text("←", botaoEsq.x + botaoEsq.w / 2, botaoEsq.y + botaoEsq.h / 2);

  text("→", botaoDir.x + botaoDir.w / 2, botaoDir.y + botaoDir.h / 2);

  text("↑", botaoCima.x + botaoCima.w / 2, botaoCima.y + botaoCima.h / 2);

  text("↓", botaoBaixo.x + botaoBaixo.w / 2, botaoBaixo.y + botaoBaixo.h / 2);

}

function drawBotaoReiniciar() {

  fill(255);

  rect(width / 2 - 70, height / 2 + 50, 140, 40, 10);

  fill(0);

  textSize(20);

  text("Reiniciar", width / 2, height / 2 + 70);

}

class Arvore {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    fill(34, 139, 34);

    ellipse(this.x, this.y - 30, 40, 40);

    fill(139, 69, 19);

    rect(this.x - 5, this.y - 10, 10, 30);

  }

}

class Animal {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    textSize(24);

    text("🐄", this.x, this.y);

  }

}

class CavaloEmoji {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    textSize(24);

    text("🐎", this.x, this.y);

  }

}

class Montanha {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    fill(100);

    triangle(this.x, this.y, this.x + 60, this.y - 100, this.x + 120, this.y);

  }

}

class Predio {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    fill(150);

    rect(this.x, this.y - 100, 60, 100);

  }

}

class Poste {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    fill(200);

    rect(this.x, this.y - 40, 5, 40);

    fill(255, 255, 0);

    ellipse(this.x + 2.5, this.y - 45, 10, 10);

  }

}

class Carro {

  constructor(x, y) {

    this.x = x;

    this.y = y;

  }

  show() {

    push();

    translate(this.x + 20, this.y + 15);

    scale(-1, 1); // espelha horizontalmente para virar o carro para direita

    textSize(32);

    text("🚗", 0, 0);

    pop();

  }

  move(vel) {

    this.x += vel;

    if (this.x > width) this.x = -40;

  }

}

class ArvoreUrbana extends Arvore { }

class Lixeira {

  constructor(x, y) { this.x = x; this.y = y; }

  show() { fill(0, 100, 0); rect(this.x, this.y - 10, 15, 20); }

}

class Grade {

  constructor(x, y) { this.x = x; this.y = y; }

  show() { fill(169); rect(this.x, this.y, 30, 10); }

}

class Moeda {

  constructor(x, y) { this.x = x; this.y = y; }

  show() {

    fill(255, 215, 0);

    ellipse(this.x, this.y, 15);

    fill(0);

    textSize(10);

    text("¢", this.x, this.y - 1);

  }

}

class Fogo {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.size = random(5, 12);

    this.life = 255;

    this.r = random(255);

    this.g = random(255);

    this.b = random(255);

  }

  atualizar() {

    this.life -= 5;

  }

  mostrar() {

    noStroke();

    fill(this.r, this.g, this.b, this.life);

    ellipse(this.x, this.y, this.size);

  }

  fim() {

    return this.life <= 0;

  }

}