let milhos = [];
let minhocas = [];
let pontos = 0;
let homem = { x: 300, y: 500, tamanho: 40 };
let jogoIniciado = false;
let vidas = 3;
let tempoRestante = 30;
let tempoInicial;
let jogoFinalizado = false;
let tempoDeFim;

function setup() {
  createCanvas(700, 600);
  iniciarJogo();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(155, 206, 235); // céu
  desenharCenario();

  // Desenha os milhos que ainda não foram colhidos nem comidos
  textSize(30);
  for (let milho of milhos) {
    if (!milho.colhido && !milho.comido) {
      text("🌾", milho.x, milho.y);
    }
  }

  if (!jogoIniciado) {
    telaInicial();
    return;
  }

  if (!jogoFinalizado) {
    moverHomem();

    // Desenha o homem
    textSize(40);
    text("👨", homem.x, homem.y);

    // Gerar minhocas aleatoriamente
    if (frameCount % 120 === 0 && minhocas.length < milhos.length) {
      let candidatos = milhos.filter(m => !m.colhido && !m.comido && !m.alvo);
      if (candidatos.length > 0) {
        let alvo = random(candidatos);
        alvo.alvo = true;
        minhocas.push({
          x: random(width),
          y: random(300, height),
          alvo: alvo
        });
      }
    }

    // Desenha e move minhocas
    textSize(25);
    for (let minhoca of minhocas) {
      text("🪱", minhoca.x, minhoca.y);
      let dx = minhoca.alvo.x - minhoca.x;
      let dy = minhoca.alvo.y - minhoca.y;
      let distMinhoca = dist(minhoca.x, minhoca.y, minhoca.alvo.x, minhoca.alvo.y);
      if (distMinhoca > 1) {
        minhoca.x += dx * 0.01;
        minhoca.y += dy * 0.01;
      } else {
        if (!minhoca.alvo.comido) {
          minhoca.alvo.comido = true;
          vidas--;
        }
      }
    }

    // Colheita dos milhos pelo homem
    for (let milho of milhos) {
      if (!milho.colhido && !milho.comido) {
        let d = dist(homem.x, homem.y, milho.x, milho.y);
        if (d < 30) {
          milho.colhido = true;
          pontos++;
        }
      }
    }

    // Atualiza tempo restante
    let tempoPassado = int((millis() - tempoInicial) / 1000);
    tempoRestante = max(0, 30 - tempoPassado);

    // Verifica fim de jogo
    if (vidas <= 0 || tempoRestante <= 0 || milhos.every(m => m.colhido || m.comido)) {
      jogoFinalizado = true;
      tempoDeFim = millis();
    }
  }

  // HUD (pontuação, vidas, tempo)
  fill(255, 255, 255, 200);
  rect(0, 0, width, 40);
  fill(0);
  textSize(18);
  textAlign(LEFT, CENTER);
  text("Pontuação: " + pontos, 10, 20);
  text("Vidas: " + vidas, 170, 20);
  text("Tempo: " + tempoRestante + "s", 290, 20);
  textAlign(CENTER, CENTER);

  // Mensagem fim de jogo
  if (jogoFinalizado) {
    textSize(40);
    if (milhos.every(m => m.colhido)) {
      fill("green");
      text("PARABÉNS! VOCÊ GANHOU!", width / 2, height / 2);
    } else {
      fill("red");
      text("FIM DE JOGO! VOCÊ PERDEU!", width / 2, height / 2);
    }

    // Reinicia automaticamente após 3 segundos
    if (millis() - tempoDeFim > 3000) {
      iniciarJogo();
    }
  }
}

function moverHomem() {
  if (!jogoIniciado) return;

  if (keyIsDown(LEFT_ARROW)) homem.x -= 4;
  if (keyIsDown(RIGHT_ARROW)) homem.x += 4;
  if (keyIsDown(UP_ARROW)) homem.y -= 4;
  if (keyIsDown(DOWN_ARROW)) homem.y += 4;

  homem.x = constrain(homem.x, 0, width - 30);
  homem.y = constrain(homem.y, 200, height - 40);
}

function keyPressed() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    tempoInicial = millis();
    loop();
  }
}

function mousePressed() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    tempoInicial = millis();
    loop();
  }
}

function iniciarJogo() {
  milhos = [];
  minhocas = [];
  pontos = 0;
  vidas = 3;
  tempoRestante = 30;
  homem = { x: 300, y: 500, tamanho: 40 };
  jogoIniciado = false;
  jogoFinalizado = false;

  for (let i = 0; i < 9; i++) {
    let xAleatorio = random(50, width - 50);
    let yAleatorio = random(420, 470);
    milhos.push({ x: xAleatorio, y: yAleatorio, colhido: false, comido: false, alvo: false });
  }

  noLoop(); // aguarda início do jogo
}

function desenharCenario() {
  fill("yellow");
  circle(550, 50, 100); // sol

  fill("#4C9C4F");
  rect(0, 200, 700, 400); // grama

  textSize(89);
  text("🌳", 600, 350);
  text("🌳", 478, 250);
  text("🌳", 470, 394);

  textSize(71);
  text("🏡", 579, 228);
  text("🌳", 470, 257);
  text("🌳", 570, 370);
  text("🌳", 641, 243);

  textSize(120);
  text("⛰️", 0, 200);
  text("⛰️", 120, 209);

  textSize(30);
  text("🌲", 0, 235);
  text("🌲", 118, 236);
  text("🌲", 100, 228);
  text("🪨", 240, 240);
  text("🌲", 230, 240);
  text("🪴", 644, 248);
  text("🚜", 138, 318);
}

function telaInicial() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("🌽 Colha os milhos antes das minhocas! 🪱", width / 2, height / 2 - 30);
  textSize(20);
  text("Você tem 30s e 3 vidas", width / 2, height / 2);
  text("Use as setas para mover 👨", width / 2, height / 2 + 25);
  text("Clique com o mouse para começar", width / 2, height / 2 + 50);
}

