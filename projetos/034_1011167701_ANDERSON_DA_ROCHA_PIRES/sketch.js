//Projeto Agrinho
//Nome do Projeto - Ligue o Produtor ao Produto
//Colégio Estadual Colégio José de Alencar - EM PROF
//Estudante: Anderson da Rocha Pires

let produtores = ["🐄", "🐔", "🐝", "🐑"];
let produtos = ["🥛", "🥚", "🍯", "🧶"];
let pares = {
  "🐄": "🥛",
  "🐔": "🥚",
  "🐝": "🍯",
  "🐑": "🧶"
};

let pontosProdutores = [];
let pontosProdutos = [];
let linhas = [];
let selecionado = null;
let acertos = 0;

let tela = "inicio"; // inicio, jogo, fim
let corFundo1, corFundo2;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(32);

  corFundo1 = color(random(255), random(255), random(255));
  corFundo2 = color(random(255), random(255), random(255));

  // Posiciona produtores
  for (let i = 0; i < produtores.length; i++) {
    pontosProdutores.push({
      emoji: produtores[i],
      x: 100,
      y: map(i, 0, produtores.length - 1, 100, height - 50),
      usado: false
    });
  }

  // Posiciona produtos embaralhados
  let produtosMisturados = shuffle(produtos);
  for (let i = 0; i < produtosMisturados.length; i++) {
    pontosProdutos.push({
      emoji: produtosMisturados[i],
      x: width - 100,
      y: map(i, 0, produtosMisturados.length - 1, 100, height - 50),
      usado: false
    });
  }
}

function draw() {
  desenharFundoColorido();

  if (tela === "inicio") {
    fill(255);
    textSize(28);
    text("🌾 Bem-vindo ao Desafio Agrinho! 🌾", width / 2, 80);
    textSize(18);
    text("Ligue o produtor ao produto correto!", width / 2, 130);
    text("🐄 ➜ 🥛   🐔 ➜ 🥚   🐝 ➜ 🍯   🐑 ➜ 🧶", width / 2, 170);
    text("Clique para começar", width / 2, height - 60);
  }

  else if (tela === "jogo") {
    // Mostrar produtores
    for (let p of pontosProdutores) {
      fill(255, 255, 200, 180);
      ellipse(p.x, p.y, 80);
      fill(0);
      text(p.emoji, p.x, p.y);
    }

    // Mostrar produtos
    for (let p of pontosProdutos) {
      fill(200, 255, 255, 180);
      ellipse(p.x, p.y, 80);
      fill(0);
      text(p.emoji, p.x, p.y);
    }

    // Linhas corretas
    stroke(50);
    strokeWeight(3);
    for (let l of linhas) {
      line(l.x1, l.y1, l.x2, l.y2);
    }

    // Linha sendo arrastada
    if (selecionado) {
      stroke(100);
      line(selecionado.x, selecionado.y, mouseX, mouseY);
    }

    // Pontuação
    noStroke();
    fill(0);
    textSize(18);
    text("Acertos: " + acertos, width / 2, 30);

    // Fim
    if (acertos === produtores.length) {
      tela = "fim";
    }
  }

  else if (tela === "fim") {
    fill(255);
    textSize(28);
    text("🎉 Parabéns! Você completou todos os pares! 🎉", width / 2, height / 2 - 20);
    textSize(18);
    text("Clique para jogar novamente", width / 2, height / 2 + 30);
  }
}

function mousePressed() {
  if (tela === "inicio") {
    tela = "jogo";
  }
  else if (tela === "fim") {
    reiniciarJogo();
  }
  else if (tela === "jogo") {
    for (let p of pontosProdutores) {
      if (!p.usado && dist(mouseX, mouseY, p.x, p.y) < 40) {
        selecionado = p;
        break;
      }
    }
  }
}

function mouseReleased() {
  if (tela === "jogo" && selecionado) {
    for (let p of pontosProdutos) {
      if (!p.usado && dist(mouseX, mouseY, p.x, p.y) < 40) {
        if (pares[selecionado.emoji] === p.emoji) {
          linhas.push({
            x1: selecionado.x,
            y1: selecionado.y,
            x2: p.x,
            y2: p.y
          });
          selecionado.usado = true;
          p.usado = true;
          acertos++;
        }
      }
    }
    selecionado = null;
  }
}

function reiniciarJogo() {
  acertos = 0;
  linhas = [];
  pontosProdutores = [];
  pontosProdutos = [];

  for (let i = 0; i < produtores.length; i++) {
    pontosProdutores.push({
      emoji: produtores[i],
      x: 100,
      y: map(i, 0, produtores.length - 1, 100, height - 50),
      usado: false
    });
  }

  let produtosMisturados = shuffle(produtos);
  for (let i = 0; i < produtosMisturados.length; i++) {
    pontosProdutos.push({
      emoji: produtosMisturados[i],
      x: width - 100,
      y: map(i, 0, produtosMisturados.length - 1, 100, height - 50),
      usado: false
    });
  }

  tela = "inicio";
}

// Fundo gradiente animado
function desenharFundoColorido() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(corFundo1, corFundo2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Muda levemente com o tempo
  corFundo1 = lerpColor(corFundo1, color(random(255), random(255), random(255)), 0.001);
  corFundo2 = lerpColor(corFundo2, color(random(255), random(255), random(255)), 0.001);
}
