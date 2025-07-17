let imagensCenario = [];
let imagemCaminhao;
let imagemBatata;
let caminhaoX = 400;
let caminhaoY = 250;
let fase = 0;
let totalFases = 3;
let entregue = false;
let caminhando = true;
let jogoIniciado = false;
let batatas = [];

function preload() {
  imagensCenario[0] = loadImage('fazenda.png');
  imagensCenario[1] = loadImage('caminho.png');
  imagensCenario[2] = loadImage('mercado.png');
  imagemCaminhao = loadImage('caminhao.png');
  imagemBatata = loadImage('batata.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (!jogoIniciado) {
    telaDeInicio();
    return;
  }

  background(220);

  if (fase < totalFases) {
    image(imagensCenario[fase], 0, 0, width, height);
    image(imagemCaminhao, caminhaoX, caminhaoY, 150, 190);

    if (keyIsDown(LEFT_ARROW) && caminhando) {
      caminhaoX -= 2;
    }

    if (caminhaoX < -150 && fase < totalFases - 1) {
      fase++;
      caminhaoX = width;
    }

    if (fase === totalFases - 1 && caminhaoX < width / 2 && !entregue) {
      entregue = true;
      caminhando = false;
    }
  }

  if (entregue) {
    // Criar batatas saltando
    if (batatas.length < 50 && frameCount % 4 === 0) {
      for (let i = 0; i < 2; i++) {
        batatas.push(new Batata(caminhaoX + 60, caminhaoY + 60));
      }
    }

    for (let b of batatas) {
      b.update();
      b.show();
    }

    // Mensagem principal
    fill(0);
    rect(50, 170, 300, 60, 15);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Comida entregue!", width / 2, 200);

    // Balão de fala do caminhão
    drawBalao(caminhaoX + 70, caminhaoY - 20, "Missão cumprida,\ncomida entregue\ncom sucesso!");
  }
}

function telaDeInicio() {
  background(30, 50, 80);
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("🚛 Missão Campo-Cidade", width / 2, 120);

  textSize(18);
  text("Natália Endo – 1ºA", width / 2, 160);

  textSize(14);
  text("Use a seta ← para mover o caminhão\nA cada cenário, avance até o mercado\n\nPressione [ESPAÇO] para começar", width / 2, 230);
}

function keyPressed() {
  if (!jogoIniciado && key === ' ') {
    jogoIniciado = true;
  }
}

function drawBalao(x, y, msg) {
  fill(255);
  stroke(0);
  rect(x, y, 150, 60, 10);
  triangle(x + 20, y + 60, x + 40, y + 60, x + 30, y + 75);
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text(msg, x + 10, y + 10);
}

class Batata {
  constructor(x, y) {
    this.x = x + random(-10, 10);
    this.y = y;
    this.vy = random(-5, -2);
    this.ay = 0.2;
    this.tamanho = 20;
  }

  update() {
    this.vy += this.ay;
    this.y += this.vy;

    if (this.y > 370) {
      this.y = 370;
      this.vy = 0;
    }
  }

  show() {
    image(imagemBatata, this.x, this.y, this.tamanho, this.tamanho);
  }
}
