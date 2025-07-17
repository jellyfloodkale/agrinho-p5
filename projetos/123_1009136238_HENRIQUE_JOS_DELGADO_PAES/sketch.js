let trator;
let obstaculos = [];
let itens = [];
let pontos = 0;
let cidadeNivel = 1;
let jogoRodando = true;

function setup() {
  createCanvas(1000, 600);
  trator = new Trator();
}

function draw() {
  background(135, 206, 235);
  desenharChao();
  desenharCampo();
  desenharCidade();

  if (jogoRodando) {
    trator.mostrar();
    trator.mover();
    trator.aplicarFisica();

    // Obstáculos
    if (frameCount % 90 === 0) {
      obstaculos.push(new Obstaculo());
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
      obstaculos[i].mostrar();
      obstaculos[i].mover();

      if (trator.colidiu(obstaculos[i])) {
        jogoRodando = false;
      }

      if (obstaculos[i].x < -50) obstaculos.splice(i, 1);
    }

    // Itens
    if (frameCount % 180 === 0) {
      itens.push(new Item());
    }

    for (let i = itens.length - 1; i >= 0; i--) {
      itens[i].mostrar();
      itens[i].mover();

      if (trator.coletou(itens[i])) {
        pontos += 10;
        itens.splice(i, 1);
        if (pontos % 50 === 0) cidadeNivel++;
      }

      if (itens[i] && itens[i].x < -50) itens.splice(i, 1);
    }

    // Entrega bem-sucedida
    if (trator.x > width - 100) {
      pontos += 20;
      cidadeNivel++;
      trator.x = 50;
    }

    mostrarHUD();
  } else {
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("Fim de Jogo! Pontuação: " + pontos, width / 2, height / 2);
    text("Clique para jogar novamente", width / 2, height / 2 + 40);
  }
}

function mousePressed() {
  if (!jogoRodando) {
    pontos = 0;
    cidadeNivel = 1;
    trator = new Trator();
    obstaculos = [];
    itens = [];
    jogoRodando = true;
  }
}

function keyPressed() {
  if (key === ' ' || key === 'Spacebar') {
    trator.pular();
  }
}

function desenharChao() {
  fill(34, 139, 34);
  rect(0, height - 100, width, 100);
}

function desenharCampo() {
  fill(255, 223, 0);
  ellipse(80, 100, 80, 80);
  textSize(18);
  fill(0);
  text("🌾 Campo", 40, height - 110);
}

function desenharCidade() {
  fill(200);
  for (let i = 0; i < cidadeNivel; i++) {
    let h = 100 + i * 5;
    rect(width - 100 - i * 30, height - 100 - h, 30, h);
  }
  fill(0);
  text("🏙️ Cidade", width - 120, height - 110);
}

function mostrarHUD() {
  fill(0);
  textSize(20);
  text("Pontos: " + pontos, 20, 30);
  text("Nível da Cidade: " + cidadeNivel, 20, 60);
}

// === COLISÃO RECT x RECT ===
function colisaoRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2
  );
}

// === CLASSES ===

class Trator {
  constructor() {
    this.x = 50;
    this.y = height - 130;
    this.largura = 60;
    this.altura = 30;
    this.velocidadeY = 0;
    this.gravidade = 1.2;
    this.forcaPulo = -18;
    this.noChao = true;
  }

  mostrar() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.largura, this.altura);
    rect(this.x + 15, this.y - 20, 30, 20);
    fill(0);
    ellipse(this.x + 10, this.y + this.altura, 20, 20);
    ellipse(this.x + 50, this.y + this.altura, 20, 20);
  }

  mover() {
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    this.x = constrain(this.x, 0, width);
  }

  aplicarFisica() {
    this.y += this.velocidadeY;
    this.velocidadeY += this.gravidade;

    if (this.y >= height - 130) {
      this.y = height - 130;
      this.velocidadeY = 0;
      this.noChao = true;
    }
  }

  pular() {
    if (this.noChao) {
      this.velocidadeY = this.forcaPulo;
      this.noChao = false;
    }
  }

  colidiu(obs) {
    return colisaoRectRect(this.x, this.y, this.largura, this.altura, obs.x, obs.y, obs.largura, obs.altura);
  }

  coletou(item) {
    return colisaoRectRect(this.x, this.y, this.largura, this.altura, item.x, item.y, 30, 30);
  }
}

class Obstaculo {
  constructor() {
    this.x = width;
    this.y = height - 120;
    this.largura = 30;
    this.altura = 30;
  }

  mostrar() {
    fill(100);
    rect(this.x, this.y, this.largura, this.altura);
  }

  mover() {
    this.x -= 4;
  }
}

class Item {
  constructor() {
    this.x = width;
    this.y = height - 140;
    this.tipo = random(['livro', 'chip']);
  }

  mostrar() {
    if (this.tipo === 'livro') {
      fill(0, 0, 255);
      rect(this.x, this.y, 30, 30);
    } else {
      fill(0, 255, 255);
      ellipse(this.x + 15, this.y + 15, 25, 25);
    }
  }

  mover() {
    this.x -= 3;
  }
}

