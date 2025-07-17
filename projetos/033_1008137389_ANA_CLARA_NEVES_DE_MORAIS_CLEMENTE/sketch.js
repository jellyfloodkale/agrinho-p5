function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let gridSize = 6;
let cellSize = 80;
let grid = [];
let tipos = ["🍎", "🍌", "🍇", "🍓", "🍍", "🍑", "🥝"];
let selected = null;

let movimentosRestantes = 20;
let frutasColetadas = 0;
let objetivo = 15;
let jogoFinalizado = false;
let venceu = false;

function setup() {
  createCanvas(gridSize * cellSize, gridSize * cellSize + 60);
  gerarGrid();
}

function gerarGrid() {
  for (let y = 0; y < gridSize; y++) {
    grid[y] = [];
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = tipos[int(random(tipos.length))];
    }
  }
}

function draw() {
  background(240);
  textAlign(CENTER, CENTER);
  textSize(32);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      fill(255);
      stroke(180);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      if (grid[y][x]) {
        text(grid[y][x], x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      }
    }
  }

  if (selected) {
    noFill();
    stroke(0, 200, 0);
    strokeWeight(3);
    rect(selected.x * cellSize, selected.y * cellSize, cellSize, cellSize);
    strokeWeight(1);
  }

  // Barra de info
  fill(50);
  textSize(20);
  textAlign(LEFT);
  text(`🎯 Objetivo: ${frutasColetadas}/${objetivo}`, 10, gridSize * cellSize + 20);
  text(`🕹️ Movimentos: ${movimentosRestantes}`, 10, gridSize * cellSize + 45);

  // Fim de jogo
  if (jogoFinalizado) {
    fill(venceu ? "green" : "red");
    textSize(28);
    textAlign(CENTER, CENTER);
    text(venceu ? "Parabéns! Você venceu! 🎉" : "Fim de jogo! 😢", width / 2, height / 2);
  }
}

function mousePressed() {
  if (jogoFinalizado) return;

  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    if (grid[y][x]) {
      selected = createVector(x, y);
    }
  }
}

function keyPressed() {
  if (!selected || jogoFinalizado) return;

  let x = selected.x;
  let y = selected.y;
  let dx = 0;
  let dy = 0;

  if (keyCode === LEFT_ARROW) dx = -1;
  if (keyCode === RIGHT_ARROW) dx = 1;
  if (keyCode === UP_ARROW) dy = -1;
  if (keyCode === DOWN_ARROW) dy = 1;

  if (dx === 0 && dy === 0) return;

  let fruta = grid[y][x];
  let nx = x + dx;
  let ny = y + dy;

  if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) return;

  let houveTroca = false;

  if (grid[ny][nx] !== null) {
    let temp = grid[ny][nx];
    grid[ny][nx] = fruta;
    grid[y][x] = temp;
    houveTroca = true;
  } else {
    grid[y][x] = null;
    while (true) {
      let nextX = x + dx;
      let nextY = y + dy;
      if (nextX < 0 || nextX >= gridSize || nextY < 0 || nextY >= gridSize) break;
      if (grid[nextY][nextX] !== null) break;
      x = nextX;
      y = nextY;
    }
    grid[y][x] = fruta;
    houveTroca = true;
  }

  selected = null;
  if (houveTroca) checarMatch(true);
}

function checarMatch(contaMovimento = false) {
  let marcados = new Set();

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize - 2; x++) {
      let a = grid[y][x];
      let b = grid[y][x + 1];
      let c = grid[y][x + 2];
      if (a && a === b && a === c) {
        marcados.add(`${x},${y}`);
        marcados.add(`${x + 1},${y}`);
        marcados.add(`${x + 2},${y}`);
      }
    }
  }

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize - 2; y++) {
      let a = grid[y][x];
      let b = grid[y + 1][x];
      let c = grid[y + 2][x];
      if (a && a === b && a === c) {
        marcados.add(`${x},${y}`);
        marcados.add(`${x},${y + 1}`);
        marcados.add(`${x},${y + 2}`);
      }
    }
  }

  if (marcados.size > 0) {
    if (contaMovimento) {
      movimentosRestantes--;
    }

    frutasColetadas += marcados.size;

    for (let pos of marcados) {
      let [x, y] = pos.split(',').map(Number);
      grid[y][x] = null;
    }

    setTimeout(() => {
      descerFrutas();
      checarMatch(false);
      verificarFim();
    }, 200);
  } else {
    if (contaMovimento) {
      movimentosRestantes--;
      verificarFim();
    }
  }
}

function descerFrutas() {
  for (let x = 0; x < gridSize; x++) {
    let coluna = [];
    for (let y = 0; y < gridSize; y++) {
      if (grid[y][x] !== null) {
        coluna.push(grid[y][x]);
      }
    }

    for (let y = gridSize - 1; y >= 0; y--) {
      if (coluna.length > 0) {
        grid[y][x] = coluna.pop();
      } else {
        grid[y][x] = tipos[int(random(tipos.length))];
      }
    }
  }
}

function verificarFim() {
  if (frutasColetadas >= objetivo) {
    jogoFinalizado = true;
    venceu = true;
  } else if (movimentosRestantes <= 0) {
    jogoFinalizado = true;
    venceu = false;
  }
}
