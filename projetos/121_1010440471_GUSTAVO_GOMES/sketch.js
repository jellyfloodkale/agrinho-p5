// ==========================================================
// Variáveis Globais do Jogo
// ==========================================================
let player;
let zombies = [];
let bullets = [];
let particles = []; // Para explosões ou efeitos visuais

let score = 0;
let currentPhase = 0;
let phaseActive = false; // Controla se a fase está rolando ou em transição
let gameOver = false;
let gameStarted = false; // Tela inicial

// Variáveis de Fundo
let backgroundX = 0;
let backgroundSpeed = 1; // Velocidade de rolagem do cenário
let groundY; // Nível do chão

// Configurações das Fases (você pode adicionar mais aqui!)
const phases = [
  { name: "Campos - Início", type: "field", zombieSpawnRate: 60, maxZombies: 10, zombieSpeedMultiplier: 1, bossPhase: false, duration: 600 }, // Duração em frames (10 segundos)
  { name: "Campos - Aumento", type: "field", zombieSpawnRate: 45, maxZombies: 15, zombieSpeedMultiplier: 1.2, bossPhase: false, duration: 900 },
  { name: "Chefe dos Campos", type: "field", zombieSpawnRate: 0, maxZombies: 1, zombieSpeedMultiplier: 0, bossPhase: true, bossName: "Goliath do Campo" },
  { name: "Cidade - Início", type: "city", zombieSpawnRate: 50, maxZombies: 12, zombieSpeedMultiplier: 1.5, bossPhase: false, duration: 900 },
  { name: "Cidade - Perigo", type: "city", zombieSpawnRate: 35, maxZombies: 20, zombieSpeedMultiplier: 1.8, bossPhase: false, duration: 1200 },
  { name: "Chefe da Cidade", type: "city", zombieSpawnRate: 0, maxZombies: 1, zombieSpeedMultiplier: 0, bossPhase: true, bossName: "Megalith Urbano" }
];

let currentBoss = null; // Objeto do chefão atual
let phaseTimer = 0; // Contador para a duração da fase

// ==========================================================
// Setup
// ==========================================================
function setup() {
  createCanvas(900, 600); // Um pouco mais largo para ver mais cenário
  groundY = height - 80; // Posição do chão
  player = new Player();
  textAlign(CENTER, CENTER);
  rectMode(CORNER); // Para facilitar o desenho de retângulos
}

// ==========================================================
// Draw Loop
// ==========================================================
function draw() {
  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  if (gameOver) {
    drawGameOverScreen();
    return;
  }

  // Atualiza e desenha o fundo
  backgroundX -= backgroundSpeed;
  // Fundo infinito
  if (backgroundX < -width) {
    backgroundX = 0;
  }

  drawBackground(phases[currentPhase].type); // Desenha o fundo com base no tipo de fase

  // Lógica da Fase
  if (phaseActive) {
    phaseTimer--;
    if (phaseTimer <= 0 && !phases[currentPhase].bossPhase) {
        endPhase(); // Termina a fase se o tempo acabar e não for fase de chefão
    }

    // --- Lógica do Jogo Principal ---
    player.update();
    player.show();

    // Spawn de Zumbis (se não for fase de chefão)
    if (!phases[currentPhase].bossPhase) {
      if (frameCount % phases[currentPhase].zombieSpawnRate === 0 && zombies.length < phases[currentPhase].maxZombies) {
        zombies.push(new Zombie(phases[currentPhase].zombieSpeedMultiplier));
      }
    } else {
      // Lógica para o Chefão
      if (currentBoss === null) {
        currentBoss = new Boss(phases[currentPhase].bossName);
      }
      currentBoss.update();
      currentBoss.show();
      if (currentBoss.isDead()) {
        score += 1000; // Bônus por matar o chefão
        currentBoss = null; // Chefão derrotado
        endPhase(); // Vai para a próxima fase
      }
    }

    // Atualiza e desenha zumbis
    for (let i = zombies.length - 1; i >= 0; i--) {
      zombies[i].update();
      zombies[i].show();

      // Colisão Zumbi-Jogador
      let d = dist(player.x, player.y, zombies[i].x, zombies[i].y);
      if (d < (player.size / 2 + zombies[i].size / 2)) {
        player.takeDamage(zombies[i].damage);
        zombies.splice(i, 1); // Zumbi desaparece ao colidir (pode ser ajustado)
        if (player.health <= 0) {
          gameOver = true;
        }
        continue; // Pula para o próximo zumbi
      }

      // Remove zumbis que saíram da tela
      if (zombies[i].x < -50) {
        zombies.splice(i, 1);
        score -= 5; // Penalidade por zumbi que escapa
      }
    }

    // Atualiza e desenha balas
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();

      // Colisão Bala-Zumbi
      let hitZombie = false;
      for (let j = zombies.length - 1; j >= 0; j--) {
        if (bullets[i].hits(zombies[j])) {
          if (zombies[j].takeDamage(bullets[i].damage)) {
            score += 10; // Zumbi derrotado
            zombies.splice(j, 1);
            // TODO: Adicionar efeito de partícula ou som de morte de zumbi
          }
          hitZombie = true;
          break; // Bala atingiu um zumbi, pode parar de verificar
        }
      }
      // Colisão Bala-Chefão
      if (currentBoss && bullets[i].hits(currentBoss)) {
        if (currentBoss.takeDamage(bullets[i].damage)) {
          // Chefão morreu, tratado acima
        }
        hitZombie = true;
      }

      if (hitZombie || bullets[i].offscreen()) {
        bullets.splice(i, 1); // Remove a bala se atingiu algo ou saiu da tela
      }
    }

    // Atualiza e desenha partículas (ex: fumaça do tiro, explosões)
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].isFinished()) {
        particles.splice(i, 1);
      }
    }

  } else {
    // Lógica de transição de fase
    drawPhaseTransition();
  }

  drawHUD(); // Desenha a interface do usuário
}

// ==========================================================
// Funções de Controle de Jogo
// ==========================================================
function startGame() {
  gameStarted = true;
  gameOver = false;
  score = 0;
  currentPhase = 0;
  player = new Player(); // Reseta o jogador
  zombies = [];
  bullets = [];
  particles = [];
  startPhase(currentPhase);
}

function startPhase(phaseIndex) {
  if (phaseIndex >= phases.length) {
    // TODO: Adicionar tela de "Jogo Concluído!"
    console.log("Parabéns! Você completou todas as fases!");
    gameOver = true; // Por enquanto, finaliza o jogo
    return;
  }

  currentPhase = phaseIndex;
  zombies = []; // Limpa zumbis da fase anterior
  bullets = []; // Limpa balas
  currentBoss = null; // Garante que não há chefão antigo

  // Resetar ou reabastecer jogador na nova fase (opcional)
  player.health = 100;
  player.ammo = 100; // Ou o que for padrão
  player.x = 100; // Reposiciona o jogador

  phaseTimer = phases[currentPhase].duration; // Define a duração da fase

  // Iniciar temporizador ou contagem regressiva para a fase
  // Por simplicidade, inicia a fase imediatamente após um pequeno atraso visual
  setTimeout(() => {
    phaseActive = true;
    console.log("Iniciando Fase: " + phases[currentPhase].name);
  }, 1000); // 1 segundo de transição
}

function endPhase() {
  phaseActive = false;
  // TODO: Adicionar bônus de fase, tela de resumo, etc.
  console.log("Fase Concluída: " + phases[currentPhase].name);
  score += 500; // Bônus por completar a fase
  startPhase(currentPhase + 1); // Passa para a próxima fase
}

// ==========================================================
// Funções de Desenho de Cenas
// ==========================================================
function drawStartScreen() {
  background(50, 50, 100);
  fill(255);
  textSize(60);
  text("ATAQUE ZUMBI", width / 2, height / 2 - 80);
  textSize(30);
  text("Campos & Cidade", width / 2, height / 2 - 30);
  textSize(22);
  text("Pressione ENTER para Iniciar", width / 2, height / 2 + 50);
  textSize(16);
  text("Controles: Setas Esquerda/Direita para Mover, Barra de Espaço para Atirar", width / 2, height / 2 + 100);
}

function drawGameOverScreen() {
  background(0, 0, 0, 180);
  fill(255, 0, 0);
  textSize(70);
  text("GAME OVER", width / 2, height / 2 - 50);
  fill(255);
  textSize(40);
  text("Pontuação Final: " + score, width / 2, height / 2 + 20);
  textSize(25);
  text("Pressione ENTER para Jogar Novamente", width / 2, height / 2 + 80);
}

function drawPhaseTransition() {
  background(0, 0, 0, 200); // Fundo escuro semitransparente
  fill(255);
  textSize(50);
  text("Fase " + (currentPhase + 1) + ": " + phases[currentPhase].name, width / 2, height / 2 - 30);
  textSize(30);
  text("Prepare-se...", width / 2, height / 2 + 30);
}

function drawHUD() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Pontuação: " + score, 10, 10);
  text("Vida: " + player.health, 10, 40);
  text("Munição: " + player.ammo, 10, 70);
  text("Fase: " + (currentPhase + 1) + " - " + phases[currentPhase].name, width - 200, 10);

  // Barra de Vida do Jogador
  noStroke();
  fill(200, 0, 0);
  rect(10, 100, 100, 15);
  fill(0, 200, 0);
  rect(10, 100, player.health, 15);
  stroke(0);
  noFill();
  rect(10, 100, 100, 15); // Borda

  // Barra de Vida do Chefão (se houver)
  if (currentBoss) {
    fill(255);
    textSize(24);
    textAlign(CENTER, TOP);
    text(currentBoss.name, width / 2, 10);
    noStroke();
    fill(200, 0, 0);
    rect(width / 2 - 150, 40, 300, 20);
    fill(0, 0, 200);
    rect(width / 2 - 150, 40, map(currentBoss.health, 0, currentBoss.maxHealth, 0, 300), 20);
    stroke(0);
    noFill();
    rect(width / 2 - 150, 40, 300, 20); // Borda
  }

  // Timer da fase (se não for fase de chefão)
  if (!phases[currentPhase].bossPhase && phaseActive) {
    let timeLeft = ceil(phaseTimer / 60); // Converte frames para segundos
    fill(255);
    textSize(20);
    textAlign(RIGHT, TOP);
    text("Tempo: " + timeLeft, width - 10, 40);
  }
}

// ==========================================================
// Desenho de Fundo (Campos e Cidade)
// ==========================================================
function drawBackground(type) {
  // Céu
  background(135, 206, 235); // Azul claro

  if (type === "field") {
    // Fundo de Campos
    fill(100, 180, 50); // Verde campo
    rect(backgroundX, 0, width * 2, height);

    // Árvores e Elementos de Campo
    drawTree(backgroundX + 150, groundY);
    drawTree(backgroundX + 500, groundY - 20);
    drawBush(backgroundX + 300, groundY);
    drawBush(backgroundX + 700, groundY - 10);

  } else if (type === "city") {
    // Fundo de Cidade
    fill(80, 80, 80); // Cinza da cidade
    rect(backgroundX, 0, width * 2, height); // Base para os edifícios

    // Edifícios (detalhes variam)
    drawBuilding(backgroundX + 100, groundY, 150);
    drawBuilding(backgroundX + 300, groundY, 200);
    drawBuilding(backgroundX + 550, groundY, 120);
    drawBuilding(backgroundX + 750, groundY, 180);

    // Ruas (se for uma vista mais de cima, ou carros na rua)
    fill(50, 50, 50);
    rect(backgroundX, groundY, width * 2, height - groundY);
  }

  // Chão (visível em ambos)
  fill(100, 100, 100); // Asfalto ou terra
  rect(0, groundY, width, height - groundY);
}

// Funções Auxiliares de Desenho de Elementos
function drawTree(x, y) {
  push();
  translate(x, y);
  fill(100, 50, 0); // Tronco
  rect(-10, -80, 20, 80);
  fill(0, 120, 0); // Folhas
  ellipse(0, -100, 80, 80);
  pop();
}

function drawBush(x, y) {
  push();
  translate(x, y);
  fill(0, 80, 0); // Arbusto
  ellipse(0, -20, 70, 40);
  pop();
}

function drawBuilding(x, y, h) {
  push();
  translate(x, y);
  fill(90, 90, 90);
  rect(0, -h, 80, h); // Prédio base

  // Janelas
  fill(255, 255, 100);
  for (let i = 10; i < h - 20; i += 30) {
    rect(10, -h + i, 20, 20);
    rect(50, -h + i, 20, 20);
  }
  pop();
}


// ==========================================================
// Input do Usuário
// ==========================================================
function keyPressed() {
  if (!gameStarted && keyCode === ENTER) {
    startGame();
  } else if (gameOver && keyCode === ENTER) {
    startGame();
  }

  if (phaseActive && !gameOver) {
    if (keyCode === 32) { // Barra de Espaço para Atirar
      player.shoot();
    }
  }
}

// ==========================================================
// Classes do Jogo
// ==========================================================

// Classe do Jogador
class Player {
  constructor() {
    this.x = 100;
    this.y = groundY - 25;
    this.size = 50;
    this.speed = 5;
    this.health = 100;
    this.maxHealth = 100;
    this.ammo = 100;
    this.fireRate = 15; // Intervalo entre tiros em frames
    this.lastShot = 0;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.size);
  }

  show() {
    fill(0, 0, 255); // Azul
    rect(this.x, this.y, this.size, this.size);
    // Desenho de uma arma simples
    fill(100, 100, 100);
    rect(this.x + this.size / 2, this.y + this.size / 4, 20, 10);
  }

  takeDamage(amount) {
    this.health -= amount;
    this.health = max(0, this.health);
    // TODO: Adicionar som de dano ou efeito visual
  }

  shoot() {
    if (this.ammo > 0 && frameCount - this.lastShot > this.fireRate) {
      bullets.push(new Bullet(this.x + this.size, this.y + this.size / 2));
      this.ammo--;
      this.lastShot = frameCount;
      // TODO: Adicionar som de tiro
      particles.push(new Particle(this.x + this.size + 10, this.y + this.size / 2, color(255, 150, 0), 5, 15)); // Efeito de fogo da arma
    }
  }
}

// Classe da Bala
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5; // Raio
    this.speed = 10;
    this.damage = 20;
  }

  update() {
    this.x += this.speed;
  }

  show() {
    fill(255, 200, 0); // Amarelo/Laranja
    ellipse(this.x, this.y, this.r * 2);
  }

  hits(target) {
    let d = dist(this.x, this.y, target.x, target.y);
    // Verificar se o target tem 'size' ou 'r' (para zumbis/chefes vs balas)
    let targetRadius = target.size ? target.size / 2 : target.r;
    return d < (this.r + targetRadius);
  }

  offscreen() {
    return this.x > width + this.r;
  }
}

// Classe do Zumbi
class Zombie {
  constructor(speedMultiplier = 1) {
    this.x = width;
    this.y = groundY - 25;
    this.size = 50;
    this.speed = random(1, 3) * speedMultiplier;
    this.health = 50;
    this.maxHealth = 50;
    this.damage = 10; // Dano ao jogador
    this.type = "normal"; // Pode ter tipos diferentes (rápido, tanque)
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(0, 150, 0); // Verde Zumbi
    rect(this.x, this.y, this.size, this.size);
    // Olhos vermelhos
    fill(255, 0, 0);
    ellipse(this.x + this.size * 0.3, this.y + this.size * 0.3, 5);
    ellipse(this.x + this.size * 0.7, this.y + this.size * 0.3, 5);
  }

  takeDamage(amount) {
    this.health -= amount;
    this.health = max(0, this.health);
    if (this.health <= 0) {
      // TODO: Adicionar efeito de morte, som de morte
      particles.push(new Particle(this.x + this.size/2, this.y + this.size/2, color(255, 0, 0), 10, 30)); // Partículas de sangue
      return true; // Zumbi morreu
    }
    return false; // Zumbi ainda vivo
  }
}

// Classe do Chefão (Exemplo)
class Boss {
  constructor(name) {
    this.name = name;
    this.x = width - 100;
    this.y = groundY - 75; // Maior que zumbi normal
    this.size = 150;
    this.speed = 0.5; // Lento, mas perigoso
    this.health = 500;
    this.maxHealth = 500;
    this.damage = 30;
    this.attackCooldown = 90; // Ataca a cada 1.5 segundos
    this.lastAttack = 0;
    this.minX = width - 200; // Limite de movimento do chefão
    this.maxX = width - 50;
  }

  update() {
    // Movimento simples do chefão
    this.x += this.speed;
    if (this.x < this.minX || this.x > this.maxX) {
      this.speed *= -1; // Inverte direção
    }

    // Ataque do chefão (pode ser um projétil, um ataque corpo a corpo, etc.)
    if (frameCount - this.lastAttack > this.attackCooldown) {
      // TODO: Implementar ataque do chefão (ex: spawnar zumbis menores, atirar projétil)
      if (dist(this.x, this.y, player.x, player.y) < 200) { // Ataca se o jogador estiver perto
        player.takeDamage(this.damage); // Dano direto por proximidade, ou um projétil
        // bullets.push(new BossBullet(this.x - this.size / 2, this.y + this.size / 2)); // Exemplo de projétil
        // console.log("Chefão atacou!");
      }
      this.lastAttack = frameCount;
    }
  }

  show() {
    fill(150, 0, 0); // Vermelho escuro
    rect(this.x, this.y, this.size, this.size * 1.5); // Chefão alto
    // Olhos e boca assustadores
    fill(255, 255, 0);
    ellipse(this.x + this.size * 0.3, this.y + this.size * 0.3, 15);
    ellipse(this.x + this.size * 0.7, this.y + this.size * 0.3, 15);
    fill(50, 0, 0);
    rect(this.x + this.size * 0.2, this.y + this.size * 0.6, this.size * 0.6, 10);
  }

  takeDamage(amount) {
    this.health -= amount;
    this.health = max(0, this.health);
    // TODO: Adicionar som de dano no chefão
    // console.log("Chefão health: " + this.health);
    return this.health <= 0;
  }

  isDead() {
    return this.health <= 0;
  }
}

// Classe de Partículas (Para efeitos visuais como fumaça, sangue, etc.)
class Particle {
  constructor(x, y, col, r, life) {
    this.x = x;
    this.y = y;
    this.color = col;
    this.r = r;
    this.life = life; // Tempo de vida da partícula
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.alpha = map(this.life, 0, 30, 0, 255); // Fade out
  }

  show() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.x, this.y, this.r * 2);
  }

  isFinished() {
    return this.life < 0;
  }
}