let ventos = [];
let energia = 50;
let tempo = 10;
let jogoAtivo = false;
let vitorioso = false;
let heliceAngle = 0;
let estadoDoJogo = "instrucoes";

function setup() {
  createCanvas(800, 440); // Espaço extra para não cortar textos
  frameRate(60);
}

function draw() {
  background(135, 206, 250); // Céu azul claro

  if (estadoDoJogo === "instrucoes") {
    mostrarInstrucoes();
  } else if (estadoDoJogo === "jogo") {
    desenharAmbiente();
    mostrarStatus();

    if (!jogoAtivo) return;

    for (let i = ventos.length - 1; i >= 0; i--) {
      ventos[i].move();
      ventos[i].show();

      if (ventos[i].hits(mouseX, mouseY)) {
        energia += 5;
        energia = constrain(energia, 0, 100);
        ventos.splice(i, 1);
      } else if (ventos[i].x > width) {
        ventos.splice(i, 1);
      }
    }

    if (random(1) < 0.02) {
      ventos.push(new Vento());
    }

    drawCatavento(mouseX, mouseY);
  } else if (estadoDoJogo === "fim") {
    mostrarFim();
  }
}

function mousePressed() {
  if (estadoDoJogo === "instrucoes") {
    iniciarJogo();
  }
}

function iniciarJogo() {
  jogoAtivo = true;
  estadoDoJogo = "jogo";

  setInterval(() => {
    if (jogoAtivo) {
      energia -= 1;
      tempo -= 1;
      checarEstadoJogo();
    }
  }, 1000);
}

function mostrarInstrucoes() {
  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("💨 Energia do Vento – Salve o Campo e a Cidade!", width / 2, 60);

  textSize(15);
  text("A energia eólica é limpa, renovável e essencial para todos.", width / 2, 110);
  text("Ela evita apagões, reduz a poluição e é sustentável.", width / 2, 135);

  text("🎮 COMO JOGAR:", width / 2, 180);
  text("→ Mova o catavento com o mouse.", width / 2, 205);
  text("→ Capture os ventos (bolas brancas) para gerar energia.", width / 2, 225);
  text("→ Mantenha a energia acima de 80 até o tempo acabar para vencer.", width / 2, 245);

  textSize(16);
  text("Clique em qualquer lugar para começar!", width / 2, 310);
}

function desenharAmbiente() {
  fill(60, 179, 113);
  rect(0, height - 80, width / 2, 80);
  fill(0);
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text("Campo", 40, height - 10);

  fill(169, 169, 169);
  rect(width / 2, height - 80, width / 2, 80);
  fill(0);
  text("Cidade", width / 2 + 40, height - 10);

  fill(100);
  rect(600, height - 210, 40, 80);
  rect(650, height - 230, 30, 100);
  rect(700, height - 190, 35, 60);

  drawArvore(100, height - 160);
  drawArvore(160, height - 150);
}

function drawArvore(x, y) {
  fill(139, 69, 19);
  rect(x, y, 10, 40);
  fill(34, 139, 34);
  ellipse(x + 5, y, 30, 30);
}

class Vento {
  constructor() {
    this.x = 0;
    this.y = random(50, height - 120);
    this.r = 20;
    this.speed = random(2, 4);
  }

  move() {
    this.x += this.speed;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  hits(px, py) {
    return dist(this.x, this.y, px, py) < this.r + 20;
  }
}

function drawCatavento(x, y) {
  push();
  translate(x, y);
  stroke(0);
  strokeWeight(2);
  line(0, 0, 0, 40);

  heliceAngle += 0.2;
  rotate(heliceAngle);

  fill(255, 0, 0);
  for (let i = 0; i < 4; i++) {
    triangle(0, 0, 15, 5, 5, 15);
    rotate(HALF_PI);
  }
  pop();
}

function mostrarStatus() {
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP); // Alinhamento à esquerda e topo
  text("Energia: " + energia + " ⚡", 40, 40); // margem maior da esquerda
  text("Tempo restante: " + tempo + "s", 40, 65);
}

function checarEstadoJogo() {
  if (energia <= 0) {
    jogoAtivo = false;
    estadoDoJogo = "fim";
    vitorioso = false;
  } else if (tempo <= 0 && energia >= 80) {
    jogoAtivo = false;
    estadoDoJogo = "fim";
    vitorioso = true;
  } else if (tempo <= 0) {
    jogoAtivo = false;
    estadoDoJogo = "fim";
    vitorioso = false;
  }
}

function mostrarFim() {
  fill(0, 150);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);

  if (vitorioso) {
    text("🎉 Parabéns! Você gerou energia limpa suficiente!", width / 2, height / 2 - 40);
    textSize(16);
    text("O campo e a cidade estão abastecidos com energia eólica.", width / 2, height / 2);
  } else {
    text("⚠️ Fim de jogo!", width / 2, height / 2 - 40);
    textSize(16);
    text("Você não conseguiu gerar energia suficiente...", width / 2, height / 2);
    text("O campo e a cidade ficaram sem energia!", width / 2, height / 2 + 30);
  }
}
