let player;
let obstacles = [];
let fruits = [];
let city;
let pedras = [];
let vidas = 1;
let gameOver = false;
let win = false;
let invencivel = false;
let tempoInvencivel = 0;
let velocidade = 1;
let gameOverTime = 0;

let gameState = "menu";
let playButton = { x: 20, y: 20, w: 120, h: 50 };

// Novo: sistema de tempo e recorde
let tempoInicio = 0;
let tempoFinal = 0;
let melhorTempo = null; // Recorde (menor tempo)

function setup() {
  createCanvas(600, 600);
  textFont('Arial');
}

function draw() {
  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "jogo") {
    drawGame();
  }
}

function drawMenu() {
  background(100, 150, 250);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(48);
  text("Agrinho 2025", width / 2, height / 4);

  // Emojis fazenda e cidade abaixo do título
  textSize(48);
  text("🏡 🏙️", width / 2, height / 3 + 60);

  // Botão Play
  fill(0, 200, 0);
  rect(playButton.x, playButton.y, playButton.w, playButton.h, 10);
  fill(255);
  textSize(24);
  text("Play", playButton.x + playButton.w / 2, playButton.y + playButton.h / 2);

  // Mostrar recorde atual
  if (melhorTempo !== null) {
    fill(255);
    textSize(20);
    text("Recorde: " + nf(melhorTempo / 1000, 1, 2) + "s", width / 2, height / 2);
  }
}

function mousePressed() {
  if (gameState === "menu") {
    if (
      mouseX > playButton.x &&
      mouseX < playButton.x + playButton.w &&
      mouseY > playButton.y &&
      mouseY < playButton.y + playButton.h
    ) {
      iniciarJogo();
    }
  }
}

function iniciarJogo() {
  gameState = "jogo";
  vidas = 1;
  obstacles = [];
  fruits = [];
  pedras = [];
  gameOver = false;
  win = false;

  tempoInicio = millis(); // Marca início do tempo
  loop(); // Garantir que draw esteja rodando

  player = { x: 50, y: 50, emoji: "🏃" };

  for (let i = 0; i < 50; i++) {
    let pos = gerarPosicaoValida();
    obstacles.push({ x: pos.x, y: pos.y, emoji: "🌳" });
  }
  for (let i = 0; i < 10; i++) {
    let pos = gerarPosicaoValida();
    pedras.push({ x: pos.x, y: pos.y, emoji: "🪨" });
  }
  for (let i = 0; i < 6; i++) {
    let pos = gerarPosicaoValida();
    fruits.push({ x: pos.x, y: pos.y, emoji: random(["🍎", "🍓", "🍑", "🍊", "🍉"]) });
  }
  city = { x: 585, y: 587, emoji: "🏙️" };
}

function drawGame() {
  background(139, 69, 19);

  desenharElementos(obstacles);
  desenharElementos(pedras);
  desenharElementos(fruits);
  desenharElemento(city);

  if (!invencivel || (millis() % 300 > 150)) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(player.emoji, player.x, player.y);
  }

  if (invencivel && millis() - tempoInvencivel > 1500) {
    invencivel = false;
  }

  if (!invencivel) {
    for (let i = 0; i < obstacles.length; i++) {
      if (dist(player.x, player.y, obstacles[i].x, obstacles[i].y) < 20) {
        vidas--;
        invencivel = true;
        tempoInvencivel = millis();
        if (vidas <= 0) {
          gameOver = true;
          gameOverTime = millis();
        }
        break;
      }
    }
  }

  if (!invencivel) {
    for (let i = 0; i < pedras.length; i++) {
      if (dist(player.x, player.y, pedras[i].x, pedras[i].y) < 20) {
        vidas -= 2;
        invencivel = true;
        tempoInvencivel = millis();
        if (vidas <= 0) {
          gameOver = true;
          gameOverTime = millis();
        }
        break;
      }
    }
  }

  for (let i = fruits.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, fruits[i].x, fruits[i].y) < 20) {
      fruits.splice(i, 1);
      vidas++;
    }
  }

  if (dist(player.x, player.y, city.x, city.y) < 20) {
    win = true;
    tempoFinal = millis() - tempoInicio;

    if (melhorTempo === null || tempoFinal < melhorTempo) {
      melhorTempo = tempoFinal;
    }
  }

  if (gameOver) {
    background(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    if (millis() - gameOverTime > 2000) {
      gameState = "menu";
    }
    return;
  }

  if (win) {
    background(0, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Você ganhou!", width / 2, height / 2 + 20);

    textSize(24);
    text("Tempo: " + nf(tempoFinal / 1000, 1, 2) + " segundos", width / 2, height / 2 + 60);

    if (tempoFinal === melhorTempo) {
      fill(255, 255, 0);
      text("🏅 Parabéns! 🏅", width / 2, height / 2 + 100);
    }

    noLoop();
    return;
  }

  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Vidas: " + vidas, 10, 10);

  // Exibir tempo e recorde no canto superior direito
  textAlign(RIGHT, TOP);
  let tempoAtual = millis() - tempoInicio;
  text("Tempo: " + nf(tempoAtual / 1000, 1, 2) + "s", width - 10, 10);
  if (melhorTempo !== null) {
    text("Recorde: " + nf(melhorTempo / 1000, 1, 2) + "s", width - 10, 40);
  }
}

function mouseMoved() {
  if (gameState === "jogo" && player) {
    player.x = mouseX;
    player.y = mouseY;
  }
}

function desenharElementos(lista) {
  for (let i = 0; i < lista.length; i++) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(lista[i].emoji, lista[i].x, lista[i].y);
  }
}

function desenharElemento(obj) {
  textSize(32);
  textAlign(CENTER, CENTER);
  text(obj.emoji, obj.x, obj.y);
}

function gerarPosicaoValida() {
  let x, y;
  let overlap = true;
  while (overlap) {
    x = random(20, 580);
    y = random(20, 580);
    overlap = false;

    for (let j = 0; j < obstacles.length; j++) {
      if (dist(x, y, obstacles[j].x, obstacles[j].y) < 40) {
        overlap = true;
        break;
      }
    }
    for (let j = 0; j < pedras.length; j++) {
      if (dist(x, y, pedras[j].x, pedras[j].y) < 40) {
        overlap = true;
        break;
      }
    }
    for (let j = 0; j < fruits.length; j++) {
      if (dist(x, y, fruits[j].x, fruits[j].y) < 40) {
        overlap = true;
        break;
      }
    }
    if (dist(x, y, 50, 50) < 50) {
      overlap = true;
    }
  }
  return { x: x, y: y };
}