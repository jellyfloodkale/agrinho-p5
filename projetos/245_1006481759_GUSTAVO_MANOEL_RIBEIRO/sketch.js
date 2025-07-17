let player;
let goal;
let obstacles = [];
let started = false;
let gameOver = false;

function setup() {
  createCanvas(940, 400);
  resetGame();
}

function resetGame() {
  player = createVector(50, height / 2);
  goal = createVector(width - 100, height / 2);
  obstacles = [];
  gameOver = false;
  started = false;

  for (let i = 0; i < 5; i++) {
    obstacles.push({
      pos: createVector(random(200, width - 200), random(40 + 30, height - 30)),
      speed: random(1, 2),
      dir: random() < 0.5 ? 1 : -1,
      size: 30
    });
  }
  noLoop();
}

function draw() {
  background(100, 200, 100); // campo verde

  // Painel de informações (caixa superior)
  fill(0);
  rect(0, 0, width, 40);
  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Jogo: Atravessando o Campo | Use as setas para se mover | Evite os obstáculos e chegue à quadra de vôlei", 10, 20);

  if (!started) {
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("CLIQUE NA TELA OU PRESSIONE ESPAÇO PARA COMEÇAR", width / 2, height / 2);
    return;
  }

  // Desenhar ponto de partida (lado esquerdo)
  fill(0, 100, 0);
  noStroke();
  rect(0, 40, 40, height - 40);

  // Desenhar quadra de vôlei (objetivo)
  fill(220, 200, 150);
  rect(goal.x, goal.y - 50, 80, 100);
  stroke(255);
  line(goal.x + 40, goal.y - 50, goal.x + 40, goal.y + 50); // rede

  // Desenhar jogador
  fill("rgb(206,9,206)");
  ellipse(player.x, player.y, 30, 30);

  // Desenhar obstáculos
  fill(150);
  for (let obs of obstacles) {
    ellipse(obs.pos.x, obs.pos.y, obs.size);
    obs.pos.y += obs.speed * obs.dir;

    // Limitar obstáculos dentro da área útil (não encostar na caixa de texto superior)
    if (obs.pos.y < 40 + obs.size / 2 || obs.pos.y > height - obs.size / 2) {
      obs.dir *= -1;
    }
  }

  if (gameOver) return;

  // Verificar colisão com obstáculos
  for (let obs of obstacles) {
    if (dist(player.x, player.y, obs.pos.x, obs.pos.y) < (obs.size / 2 + 15)) {
      fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER);
      text("Você perdeu! Pressione R para reiniciar", width / 2, height / 2);
      gameOver = true;
      noLoop();
      return;
    }
  }

  // Verificar vitória
  if (dist(player.x, player.y, goal.x, goal.y) < 50) {
    fill(0, 255, 0);
    textSize(32);
    textAlign(CENTER);
    text("Você venceu! Pressione R para jogar novamente", width / 2, height / 2);
    gameOver = true;
    noLoop();
    return;
  }

  // Limitar jogador dentro da área útil (sem entrar na caixa de texto)
  player.x = constrain(player.x, 15, width - 15);
  player.y = constrain(player.y, 40 + 15, height - 15);
}

function keyPressed() {
  if (key === ' ' && !started) {
    started = true;
    loop();
  }

  if (key === 'r' || key === 'R') {
    resetGame();
    loop();
    return;
  }

  if (!started || gameOver) return;

  if (keyCode === LEFT_ARROW) player.x -= 10;
  if (keyCode === RIGHT_ARROW) player.x += 10;
  if (keyCode === UP_ARROW) player.y -= 10;
  if (keyCode === DOWN_ARROW) player.y += 10;
}

function mousePressed() {
  if (!started) {
    started = true;
    loop();
  }
}
