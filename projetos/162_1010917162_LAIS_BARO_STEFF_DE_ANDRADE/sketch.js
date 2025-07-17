let cols, rows; // Número de colunas e linhas do labirinto
let w = 40; // Tamanho de cada célula
let maze = []; // Matriz para armazenar as células do labirinto
let entrance, exit; // Posições de entrada e saída
let player; // Posição do jogador
let gameStarted = false; // Controla se o jogo começou
let hasReachedExit = false; // Flag para saber se o jogador venceu
let showEndScreen = false; // Controla se deve mostrar a tela final

function setup() {
  createCanvas(800, 600); // Cria a tela
  initializeGame(); // Inicializa o labirinto e o jogo
}

function initializeGame() {
  // Calcula o número de colunas e linhas
  cols = floor(width / w);
  rows = floor(height / w);
  maze = [];

  // Cria todas as células do labirinto
  for (let i = 0; i < cols; i++) {
    maze[i] = [];
    for (let j = 0; j < rows; j++) {
      maze[i][j] = new Cell(i, j);
    }
  }

  // Define entrada e saída
  entrance = maze[0][0];
  entrance.visited = true;
  exit = maze[cols - 1][rows - 1];

  // Geração do labirinto usando algoritmo DFS (backtracking)
  let current = entrance;
  let stack = [current];

  while (stack.length > 0) {
    let next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      current.removeWalls(next);
      current = next;
    } else {
      current = stack.pop();
    }
  }

  // Posição inicial do jogador
  player = createVector(0, 0);
  hasReachedExit = false;
  showEndScreen = false;
}

function draw() {
  background(51); // Cor de fundo

  // Se o jogo não começou, mostra a tela inicial
  if (!gameStarted) {
    showStartScreen();
  }
  // Se o jogador terminou, mostra a tela final
  else if (showEndScreen) {
    showGameOverScreen();
  }
  // Caso contrário, desenha o labirinto e o jogador
  else {
    // Desenha todas as células do labirinto
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        maze[i][j].show();
      }
    }

    // Mostra a entrada e a saída
    showEntranceExit();

    // Desenha o jogador
    drawPlayer();

    // Verifica se o jogador chegou na saída
    if (!hasReachedExit && player.x === exit.i && player.y === exit.j) {
      hasReachedExit = true;
    }

    // Se sim, ativa a tela final
    if (hasReachedExit) {
      showEndScreen = true;
    }
  }
}

// Mostra a tela e botão

function showStartScreen() {
  background(51); 
  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(
    "Ajude seu Chico a levar este alimento até a cidade!",
    width / 2,
    height / 2 - 100
  );

  // 2 texto
  fill(255, 204, 0);
  textSize(20);
  textStyle(ITALIC);
  text("(Mova-se utilizando as teclas do teclado)", width / 2, height / 2 - 60);
  textStyle(NORMAL);

  fill(0, 200, 0);
  rect(width / 2 - 75, height / 2, 150, 50, 10);

  fill(255);
  textSize(24);
  text("Iniciar", width / 2, height / 2 + 25);
}
// Mostra a tela final com mensagem e botão para jogar de novo
function showGameOverScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Muito obrigado!", width / 2, height / 2 - 50);
  text("Gostaria de jogar novamente?", width / 2, height / 2);

  fill(0, 200, 0);
  rect(width / 2 - 100, height / 2 + 50, 200, 50, 10);

  fill(255);
  textSize(24);
  text("Jogar novamente", width / 2, height / 2 + 75);
}

// Detecta cliques do mouse nos botões das telas
function mousePressed() {
  // Clique no botão "Iniciar"
  if (!gameStarted) {
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 50
    ) {
      gameStarted = true;
    }
  }
  // Clique no botão "Jogar novamente"
  else if (showEndScreen) {
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 50 &&
      mouseY < height / 2 + 100
    ) {
      gameStarted = false;
      initializeGame();
    }
  }
}

// Classe que define cada célula do labirinto
class Cell {
  constructor(i, j) {
    this.i = i; // coluna
    this.j = j; // linha
    this.walls = [true, true, true, true]; // paredes: topo, direita, baixo, esquerda
    this.visited = false; // se já foi visitada
  }

  // Checa vizinhos não visitados
  checkNeighbors() {
    let neighbors = [];
    let top = this.j > 0 ? maze[this.i][this.j - 1] : undefined;
    let right = this.i < cols - 1 ? maze[this.i + 1][this.j] : undefined;
    let bottom = this.j < rows - 1 ? maze[this.i][this.j + 1] : undefined;
    let left = this.i > 0 ? maze[this.i - 1][this.j] : undefined;

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
      let r = floor(random(neighbors.length));
      return neighbors[r];
    }
    return undefined;
  }

  // Remove as paredes entre a célula atual e a vizinha
  removeWalls(next) {
    let x = this.i - next.i;
    if (x === 1) {
      this.walls[3] = false;
      next.walls[1] = false;
    } else if (x === -1) {
      this.walls[1] = false;
      next.walls[3] = false;
    }

    let y = this.j - next.j;
    if (y === 1) {
      this.walls[0] = false;
      next.walls[2] = false;
    } else if (y === -1) {
      this.walls[2] = false;
      next.walls[0] = false;
    }
  }

  // Desenha as paredes e marcação da célula
  show() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    if (this.walls[0]) line(x, y, x + w, y);
    if (this.walls[1]) line(x + w, y, x + w, y + w);
    if (this.walls[2]) line(x, y + w, x + w, y + w);
    if (this.walls[3]) line(x, y, x, y + w);

    if (this.visited) {
      noStroke();
      fill(200, 100, 100, 150);
      rect(x, y, w, w);
    }
  }
}

// Desenha a entrada e a saída com emojis
function showEntranceExit() {
  textSize(w * 0.8);
  textAlign(CENTER, CENTER);
  text("🏕️", entrance.i * w + w / 2, entrance.j * w + w / 2); // emoji de inicio
  text("🏙️", exit.i * w + w / 2, exit.j * w + w / 2); // emoji de chegada
}

// Desenha o jogador com emoji
function drawPlayer() {
  textSize(w * 0.8);
  textAlign(CENTER, CENTER);
  text("👨🏻‍🌾", player.x * w + w / 2, player.y * w + w / 2); // emoji principal
}

// Movimenta o jogador com as setas
function keyPressed() {
  if (!gameStarted || showEndScreen) return; // Ignora se não estiver jogando

  let x = player.x;
  let y = player.y;

  if (keyCode === UP_ARROW && !maze[x][y].walls[0]) player.y--;
  else if (keyCode === RIGHT_ARROW && !maze[x][y].walls[1]) player.x++;
  else if (keyCode === DOWN_ARROW && !maze[x][y].walls[2]) player.y++;
  else if (keyCode === LEFT_ARROW && !maze[x][y].walls[3]) player.x--;
}
