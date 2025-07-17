let xJogador = [150, 0, 0, 0];
let yJogador = [325, 150, 225, 300];
let yMonstro = [50, 0, 0, 0];
let xMonstro = [140, 150, 225, 300];
let jogador = ["🧑‍🌾"];
let monstro = ["🐺"]; // Ou "🦹‍♂️" se preferir assaltante
let velocidade = 5;
let quantidade = jogador.length;
let gameOver = false;
let win = false;
let startTime;
let jogoIniciado = false; // Controle para início do jogo
let dificuldade = "fácil"; // Dificuldade inicial
let monstrosAdicionados = 0; // Quantidade de monstros baseados na dificuldade

function setup() {
  createCanvas(400, 400);
  textFont('Segoe UI Emoji'); // Garante que emojis aparecem bonitinhos
}

function draw() {
  if (!jogoIniciado) {
    telaInicial();
  } else if (!gameOver && !win) {
    ativaJogo();
    movimentaJogador();
    moveMonstro();
    desenhaJogadores();
    desenhaMonstro();
    verificaColisao();
    verificaVitoria();
    mostraTempoRestante();
  } else {
    mostraTelaFinal();
  }
}

function keyPressed() {
  if (!jogoIniciado) {
    if (key == '1') {
      dificuldade = "fácil";
      monstrosAdicionados = 1;
      quantidade = 1; // Jogador
      jogoIniciado = true;
      startTime = millis();
    } else if (key == '2') {
      dificuldade = "médio";
      monstrosAdicionados = 3;
      quantidade = 1; // Jogador
      jogoIniciado = true;
      startTime = millis();
    } else if (key == '3') {
      dificuldade = "difícil";
      monstrosAdicionados = 5;
      quantidade = 1; // Jogador
      jogoIniciado = true;
      startTime = millis();
    }
  }
}

function movimentaJogador() {
  if (!jogoIniciado) return; // Não mover jogador antes do início
  
  if (keyIsDown(65)) xJogador[0] -= velocidade; // A
  if (keyIsDown(68)) xJogador[0] += velocidade; // D
  if (keyIsDown(87)) yJogador[0] -= velocidade; // W
  if (keyIsDown(83)) yJogador[0] += velocidade; // S

  // Manter dentro da tela
  xJogador[0] = constrain(xJogador[0], 0, width - 40);
  yJogador[0] = constrain(yJogador[0], 0, height - 40);
}

function desenhaJogadores() {
  textSize(40);
  for (let i = 0; i < quantidade; i++) {
    text(jogador[i], xJogador[i], yJogador[i]);
  }
}

function desenhaMonstro() {
  textSize(40);
  for (let i = 0; i < monstrosAdicionados; i++) {
    text(monstro[i % monstro.length], xMonstro[i], yMonstro[i]);
  }
}

function ativaJogo() {
  desenhaCampo();
}

function moveMonstro() {
  if (!jogoIniciado) return; // Não mover monstro antes do início
  
  let vel = 2; // Velocidade fixa para os monstros

  for (let i = 0; i < monstrosAdicionados; i++) {
    // Movimento constante dos monstros em direção ao jogador
    if (xMonstro[i] < xJogador[0]) {
      xMonstro[i] += vel;
    } else if (xMonstro[i] > xJogador[0]) {
      xMonstro[i] -= vel;
    }

    if (yMonstro[i] < yJogador[0]) {
      yMonstro[i] += vel;
    } else if (yMonstro[i] > yJogador[0]) {
      yMonstro[i] -= vel;
    }
  }
}

function verificaColisao() {
  if (!jogoIniciado) return; // Não verifica colisão antes do início

  for (let i = 0; i < monstrosAdicionados; i++) {
    let distancia = dist(xJogador[0], yJogador[0], xMonstro[i], yMonstro[i]);
    if (distancia < 30) {
      gameOver = true;
    }
  }
}

function verificaVitoria() {
  if (!jogoIniciado) return; // Não verifica vitória antes do início

  let tempoAtual = millis();
  let tempoMaximo = 60000; // 60 segundos de tempo máximo para a vitória
  if (tempoAtual - startTime > tempoMaximo) { // Condição de vitória após o tempo máximo
    win = true;
  }
}

function mostraTelaFinal() {
  background(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  if (gameOver) {
    text("💀 GAME OVER 💀", width / 2, height / 2);
  } else if (win) {
    text("🌽 VOCÊ VENCEU! 🌽", width / 2, height / 2);
  }
}

function mostraTempoRestante() {
  let tempoAtual = millis();
  let tempoRestante = 60000 - (tempoAtual - startTime); // 60s - tempo decorrido
  let segundos = ceil(tempoRestante / 1000);

  if (segundos < 0) segundos = 0;

  // Altera a cor do texto com base no tempo restante
  if (segundos < 10) {
    fill(255, 0, 0); // Vermelho quando está prestes a acabar
  } else {
    fill(255); // Branco para o resto
  }

  textSize(20);
  textAlign(LEFT, TOP);
  text("⏳ Tempo restante: " + segundos + "s", 10, 10);
}

function telaInicial() {
  desenhaCampo();
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text("Escolha a dificuldade:", width / 2, height / 2 - 50);
  text("Pressione 1 (Fácil), 2 (Médio), 3 (Difícil)", width / 2, height / 2 + 50);
}

function desenhaCampo() {
  // Céu azul claro
  background('#87CEEB');
  
  // Sol amarelo no canto superior direito
  noStroke();
  fill('#FFD93B');
  ellipse(width - 60, 60, 80, 80);
  
  // Grama: fundo verde escuro
  fill('#1F5310');
  rect(0, height / 2, width, height / 2);
  
  // Caminho marrom
  fill('#8B5A2B');
  beginShape();
  vertex(width / 2 - 40, height);
  vertex(width / 2 + 40, height);
  vertex(width / 2 + 20, height / 2);
  vertex(width / 2 - 20, height / 2);
  endShape(CLOSE);
  
  // Linhas finas para grama
  stroke('#2F7D18');
  for (let y = height / 2; y < height; y += 6) {
    for (let x = 0; x < width; x += 20) {
      line(x, y, x + 10, y - 5); // Desenha linha de grama
    }
  }
}
