// Variáveis principais
let agrinho;
let sementes = [];
let obstáculos = [];
let numSementes = 30;
let numObstáculos = 6;
let tempoTotal = 50; // segundos
let tempoRestante;
let pontuacao = 0;
let jogoTerminado = false;

function setup() {
  createCanvas(600, 400);
  // Agrinho (emoji de lixeira)
  agrinho = {
    x: width / 2,
    y: height - 50,
    size: 30,
    speed: 3,
    emoji: "🗑️" // Emoji de lixeira
  };
  // Sementes (emoji de garrafa/sacola)
  for (let i = 0; i < numSementes; i++) {
    sementes.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 15,
      vx: random(-2, 2),
      vy: random(-2, 2),
      coletada: false,
      emoji: "🧻🖇️"  // Emoji de garrafa/sacola
    });
  }
  // Obstáculos (emoji de animal)
  for (let i = 0; i < numObstáculos; i++) {
    obstáculos.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 40,
      vx: random(-1, 1),
      vy: random(-1, 1),
      emoji: "☢️" // Emoji do animal (gato)
    });
  }
  tempoRestante = tempoTotal;
  frameRate(60);
}

function draw() {
  background(200, 255, 200);

  if (!jogoTerminado) {
    // Atualiza o tempo
    if (frameCount % 60 == 0 && tempoRestante > 0) {
      tempoRestante--;
    }

    // Movimento do Agrinho
    if (keyIsDown(LEFT_ARROW)) {
      agrinho.x -= agrinho.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      agrinho.x += agrinho.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      agrinho.y -= agrinho.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      agrinho.y += agrinho.speed;
    }
    // Limites da tela
    agrinho.x = constrain(agrinho.x, 0, width);
    agrinho.y = constrain(agrinho.y, 0, height);

    // Desenha Agrinho (lixeira)
    textSize(32);
    text(agrinho.emoji, agrinho.x - agrinho.size / 2, agrinho.y + agrinho.size / 2);

    // Movimenta e desenha sementes (garrafas/sacolas)
    for (let s of sementes) {
      if (!s.coletada) {
        s.x += s.vx;
        s.y += s.vy;
        // Limites
        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;
        // Desenha sementes
        textSize(24);
        text(s.emoji, s.x, s.y);

        // Verifica coleta
        if (dist(agrinho.x, agrinho.y, s.x, s.y) < (agrinho.size + s.size) / 2) {
          s.coletada = true;
          pontuacao++;
        }
      }
    }

    // Movimenta e desenha obstáculos (animais)
    for (let o of obstáculos) {
      o.x += o.vx;
      o.y += o.vy;
      // Limites dos obstáculos
      if (o.x < 0 || o.x > width) o.vx *= -1;
      if (o.y < 0 || o.y > height) o.vy *= -1;

      // Desenha obstáculos (animais)
      textSize(32);
      text(o.emoji, o.x - o.size / 2, o.y + o.size / 2);

      // Verifica colisão com Agrinho
      if (dist(agrinho.x, agrinho.y, o.x, o.y) < (agrinho.size + o.size) / 2) {
        jogoTerminado = true;
      }
    }

    // Exibe pontuação e tempo restante
    fill(0);
    textSize(16);
    text("Pontuação: " + pontuacao, 10, 20);
    text("Tempo: " + tempoRestante, 10, 40);

    // Verifica se o tempo acabou
    if (tempoRestante <= 0) {
      jogoTerminado = true;
    }
  } else {
    // Tela de fim de jogo
    background(0, 0, 0, 150);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    if (pontuacao >= numSementes) {
      text("Parabéns! Você coletou todas as garrafas!", width / 2, height / 2);
    } else {
      text("Fim de jogo! Sua pontuação: " + pontuacao, width / 2, height / 2);
    }
    textSize(20);
    text("Pressione R para jogar novamente", width / 2, height / 2 + 40);
  }
}

// Reiniciar o jogo ao pressionar R
function keyPressed() {
  if (key === 'r' || key === 'R') {
    // Reinicia variáveis
    sementes = [];
    obstáculos = [];
    pontuacao = 0;
    jogoTerminado = false;
    setup();
  }
}