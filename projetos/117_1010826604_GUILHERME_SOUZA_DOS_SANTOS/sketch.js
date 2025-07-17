let playerX = 0;
let playerY = 0;

let tileSize = 60;
let cols, rows;

let field = [];
let estados = []; // "" / "arar" / "plantar" / "regar" / "sol" / "pronto"
let timers = []; // tempo de cada estado em ms
let plantas = []; // nome da planta que está crescendo

let telaSelecaoCategoria = false;  // <- Alterado
let telaSelecaoItem = false;       // <- Alterado
let modoJogoAtivo = true;          // <- Alterado

let categoriaEscolhida = null;
let itemEscolhido = null;

let selecionadoIndex = 0;

const frutas = [
  { nome: "Maçã verde", emoji: "🍏", preco: "$0.50" },
  { nome: "Maçã vermelha", emoji: "🍎", preco: "$0.50" },
  { nome: "Pêra", emoji: "🍐", preco: "$0.60" },
  { nome: "Laranja", emoji: "🍊", preco: "$0.50" },
  { nome: "Limão", emoji: "🍋", preco: "$0.50" },
  { nome: "Banana", emoji: "🍌", preco: "$0.20" },
  { nome: "Melancia", emoji: "🍉", preco: "$2.50" },
  { nome: "Uvas", emoji: "🍇", preco: "$0.40" },
  { nome: "Morango", emoji: "🍓", preco: "$0.10" },
  { nome: "Abacaxi", emoji: "🍍", preco: "$3.00" },
  { nome: "Coco", emoji: "🥥", preco: "$2.00" },
  { nome: "Kiwi", emoji: "🥝", preco: "$0.70" },
];

const vegetais = [
  { nome: "Brócolis", emoji: "🥦", preco: "$2.00" },
  { nome: "Alface", emoji: "🥬", preco: "$1.50" },
  { nome: "Pepino", emoji: "🥒", preco: "$0.70" },
  { nome: "Milho", emoji: "🌽", preco: "$0.70" },
  { nome: "Cenoura", emoji: "🥕", preco: "$0.20" },
  { nome: "Alho", emoji: "🧄", preco: "$0.50" },
  { nome: "Cebola", emoji: "🧅", preco: "$0.40" },
  { nome: "Berinjela", emoji: "🍆", preco: "$1.50" },
  { nome: "Pimenta", emoji: "🌶️", preco: "$0.50" },
  { nome: "Cogumelo", emoji: "🍄", preco: "$2.50" },
  { nome: "Batata", emoji: "🥔", preco: "$0.50" },
  { nome: "Feijão", emoji: "🏉", preco: "$0.30" },
];

let acoes = ["arar", "plantar", "regar", "colher"];
let acaoIndex = 0;
let action = acoes[acaoIndex];

let pontos = 0;

function setup() {
  tileSize = 705 / 11;
  createCanvas(705, tileSize * 8);
  cols = 11;
  rows = 8;

  for (let i = 0; i < cols * rows; i++) {
    field[i] = "";
    estados[i] = "";
    timers[i] = 0;
    plantas[i] = null;
  }
  textFont('Arial');
  frameRate(30);
}

function draw() {
  background(180, 240, 180);

  if (telaSelecaoCategoria) {
    desenharTelaSelecaoCategoria();
  } else if (telaSelecaoItem) {
    desenharTelaSelecaoItem();
  } else if (modoJogoAtivo) {
    atualizarEstadoPlantas();
    desenharJogo();
  }
}

function desenharTelaSelecaoCategoria() {
  background(240);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Escolha a categoria", width / 2, 60);

  const opcoes = ["frutas", "vegetais"];
  let baseX = width / 2 - 150;
  let baseY = 120;
  let boxWidth = 120;
  let boxHeight = 120;

  for (let i = 0; i < opcoes.length; i++) {
    fill(opcoes[i] === categoriaEscolhida ? 'lightgreen' : 'lightgray');
    rect(baseX + i * (boxWidth + 50), baseY, boxWidth, boxHeight, 15);

    textSize(64);
    fill(0);
    textAlign(CENTER, CENTER);
    if (opcoes[i] === "frutas") {
      text("🍎", baseX + i * (boxWidth + 50) + boxWidth / 2, baseY + boxHeight / 2 - 20);
      textSize(20);
      text("Frutas", baseX + i * (boxWidth + 50) + boxWidth / 2, baseY + boxHeight - 30);
    } else {
      text("🥕", baseX + i * (boxWidth + 50) + boxWidth / 2, baseY + boxHeight / 2 - 20);
      textSize(20);
      text("Vegetais", baseX + i * (boxWidth + 50) + boxWidth / 2, baseY + boxHeight - 30);
    }
  }

  textSize(16);
  fill(80);
  text("Use ← → para escolher, Enter para confirmar", width / 2, height - 30);
}

function desenharTelaSelecaoItem() {
  background(245);
  textAlign(CENTER, TOP);
  textSize(28);
  fill(0);
  text("Escolha o item para plantar", width / 2, 9);

  let lista = categoriaEscolhida === "frutas" ? frutas : vegetais;

  const colsTabela = 4;
  const linhasTabela = ceil(lista.length / colsTabela);
  const boxWidth = 120;
  const boxHeight = 160;

  let baseX = width / 2 - (colsTabela * boxWidth) / 2;
  let baseY = 40;

  for (let i = 0; i < lista.length; i++) {
    let col = i % colsTabela;
    let row = floor(i / colsTabela);
    let x = baseX + col * boxWidth;
    let y = baseY + row * boxHeight;

    fill(i === selecionadoIndex ? 'lightgreen' : 'lightgray');
    rect(x, y, boxWidth - 10, boxHeight - 10, 15);

    textSize(16);
    fill(0);
    textAlign(CENTER, TOP);
    text(lista[i].nome, x + (boxWidth - 10) / 2, y + 10);

    textSize(64);
    textAlign(CENTER, CENTER);
    text(lista[i].emoji, x + (boxWidth - 10) / 2, y + boxHeight / 2);

    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(lista[i].preco, x + (boxWidth - 10) / 2, y + boxHeight - 15);
  }

  textSize(16);
  fill(80);
  text("Use ← → ↑ ↓ para navegar, Enter para escolher", width / 2, height - 30);
}

function desenharJogo() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let i = x + y * cols;
      let estado = estados[i];

      stroke(100);
      fill(150, 100, 50);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);

      if (estado !== "") {
        push();
        translate(x * tileSize + 5, y * tileSize + 5);
        noStroke();
        fill(139, 69, 19);
        rect(0, 0, tileSize - 10, tileSize - 10, 8);

        if (estado === "arar" || estado === "plantar") {
          stroke(100, 50, 20);
          strokeWeight(2);
          noFill();
          for (let l = 6; l < tileSize - 20; l += 8) {
            beginShape();
            for (let k = 0; k <= tileSize - 20; k += 8) {
              let yoff = sin(k * 0.3 + l) * 2;
              vertex(k, l + yoff);
            }
            endShape();
          }
        }

        if (estado === "regar") {
          noFill();
          stroke(0, 0, 255, 50);
          strokeWeight(3);
          for (let lineY = 10; lineY < tileSize - 10; lineY += 6) {
            line(5, lineY, tileSize - 5, lineY);
          }
        }

        pop();

        textSize(32);
        textAlign(CENTER, CENTER);
        if (estado === "plantar") {
          fill(0);
          text("🌱", x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        } else if (estado === "regar") {
          fill(0, 0, 255);
          text("💧", x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        } else if (estado === "sol") {
          fill(255, 165, 0);
          text("☀️", x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        } else if (estado === "pronto") {
          fill(0);
          textSize(40);
          text(getEmojiByName(plantas[i]), x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        }
      }

      noFill();
      stroke(0);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  textAlign(CENTER, CENTER);
  textSize(40);
  text("👨‍🌾", playerX * tileSize + tileSize / 2, playerY * tileSize + tileSize / 2);

  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Ação: " + action, 10, 10);
  text("Pontos: " + pontos, 10, 40);

  textSize(16);
  text("Use WASD para mover", 10, height - 60);
  text("Use Ç para mudar ação", 10, height - 40);
  text("Use Espaço para executar ação", 10, height - 20);
}

function getEmojiByName(name) {
  let lista = categoriaEscolhida === "frutas" ? frutas : vegetais;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nome === name) return lista[i].emoji;
  }
  return "?";
}

function atualizarEstadoPlantas() {
  let agora = millis();
  for (let i = 0; i < estados.length; i++) {
    if (estados[i] === "regar" && agora - timers[i] > 5000) {
      estados[i] = "sol";
      timers[i] = agora;
    } else if (estados[i] === "sol" && agora - timers[i] > 5000) {
      estados[i] = "pronto";
    }
  }
}

function keyPressed() {
  // NOVO BLOCO: permite apenas 'C' para abrir seleção
  if (modoJogoAtivo) {
    if (key === 'c' || key === 'C') {
      modoJogoAtivo = false;
      telaSelecaoCategoria = true;
      return;
    }
  }

  if (telaSelecaoCategoria) {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      categoriaEscolhida = categoriaEscolhida === "frutas" ? "vegetais" : "frutas";
    } else if (keyCode === ENTER || keyCode === RETURN) {
      if (categoriaEscolhida) {
        telaSelecaoCategoria = false;
        telaSelecaoItem = true;
        selecionadoIndex = 0;
      }
    }
    return;
  }

  if (telaSelecaoItem) {
    let lista = categoriaEscolhida === "frutas" ? frutas : vegetais;
    const colsTabela = 4;
    const linhasTabela = ceil(lista.length / colsTabela);
    let col = selecionadoIndex % colsTabela;
    let row = floor(selecionadoIndex / colsTabela);

    if (keyCode === LEFT_ARROW) col = (col - 1 + colsTabela) % colsTabela;
    else if (keyCode === RIGHT_ARROW) col = (col + 1) % colsTabela;
    else if (keyCode === UP_ARROW) row = (row - 1 + linhasTabela) % linhasTabela;
    else if (keyCode === DOWN_ARROW) row = (row + 1) % linhasTabela;
    else if (keyCode === ENTER || keyCode === RETURN) {
      if (selecionadoIndex < lista.length) {
        itemEscolhido = lista[selecionadoIndex].nome;
        telaSelecaoItem = false;
        modoJogoAtivo = true;
      }
    }

    let novoIndex = row * colsTabela + col;
    if (novoIndex >= lista.length) novoIndex = lista.length - 1;
    selecionadoIndex = novoIndex;
    return;
  }

  // restante só funciona com modoJogoAtivo = true e após voltar da escolha
  if (modoJogoAtivo) {
    if (key === 'w' || key === 'W') playerY = (playerY - 1 + rows) % rows;
    else if (key === 's' || key === 'S') playerY = (playerY + 1) % rows;
    else if (key === 'a' || key === 'A') playerX = (playerX - 1 + cols) % cols;
    else if (key === 'd' || key === 'D') playerX = (playerX + 1) % cols;

    if (key === 'ç' || key === 'Ç') {
      acaoIndex = (acaoIndex + 1) % acoes.length;
      action = acoes[acaoIndex];
    }

    if (key === ' ') {
      let i = playerX + playerY * cols;
      if (action === "arar" && estados[i] === "") {
        estados[i] = "arar";
        plantas[i] = null;
        timers[i] = 0;
      } else if (action === "plantar" && estados[i] === "arar") {
        estados[i] = "plantar";
        plantas[i] = itemEscolhido;
        timers[i] = 0;
      } else if (action === "regar" && estados[i] === "plantar") {
        estados[i] = "regar";
        timers[i] = millis();
      } else if (action === "colher" && estados[i] === "pronto") {
        estados[i] = "";
        plantas[i] = null;
        timers[i] = 0;
        pontos++;
      }
    }
  }
}
