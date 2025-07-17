// sketch.js - Jogo da Memória Campo-Cidade com níveis 

let estado = "telaInicial"; // estados: telaInicial, jogando, fim
let nivel = 1;
let maxNivel = 5;

let cartas = [];
let cartasViradas = [];

const larguraCarta = 80;
const alturaCarta = 80;
const espacamento = 20;

let produtos = [
  { emoji: "🌽", nome: "Milho" },
  { emoji: "🍅", nome: "Tomate" },
  { emoji: "🍞", nome: "Pão" },
  { emoji: "🐄", nome: "Leite" },
  { emoji: "🥚", nome: "Ovo" },
  { emoji: "🍎", nome: "Maçã" },
  { emoji: "🍖", nome: "Carne" },
  { emoji: "🥕", nome: "Cenoura" },
  { emoji: "🍇", nome: "Uva" },
  { emoji: "🧀", nome: "Queijo" },
];

// Variáveis para controle do tempo
let tempoInicio;
let tempoLimite = 60 * 1000; // 60 segundos para cada nível

function setup() {
  createCanvas(600, 600);
  textFont('Arial', 18);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  preparaNivel(nivel);
}

function draw() {
  background(220);

  if (estado === "telaInicial") {
    telaInicial();
  } else if (estado === "jogando") {
    jogando();
  } else if (estado === "fim") {
    telaFim();
  }
}

function telaInicial() {
  background(100, 200, 150);
  fill(255);
  textSize(26);
  // Aqui texto centralizado com box para alinhar verticalmente
  text("Jogo da Memória Festejando a Conexão do Campo-Cidade", width / 2, 100, width, 60);
  
  textSize(17);
  text(
    "Bem-vindo! Neste jogo, você vai exercitar sua memória ao combinar pares de produtos do campo e da cidade.\n\n" +
    "O objetivo é mostrar como a conexão entre campo e cidade é importante para nossa alimentação e economia.\n\n" +
    "Clique para começar e boa sorte!",
    width / 2, 200, width - 100, 300
  );
}

function mousePressed() {
  if (estado === "telaInicial") {
    estado = "jogando";
    tempoInicio = millis();
  } else if (estado === "jogando") {
    verificaClique(mouseX, mouseY);
  } else if (estado === "fim") {
    estado = "telaInicial";
    nivel = 1;
    preparaNivel(nivel);
  }
}

function preparaNivel(n) {
  cartas = [];
  cartasViradas = [];

  // Quantidade de pares aumenta com o nível, mínimo 3 até max 10
  let pares = min(3 + n, produtos.length);

  // Selecionar aleatoriamente os produtos para o nível
  let selecionados = shuffle(produtos).slice(0, pares);

  // Criar duas cartas para cada produto (par)
  let deck = [];
  for (let p of selecionados) {
    deck.push({ ...p, visivel: false, encontrada: false });
    deck.push({ ...p, visivel: false, encontrada: false });
  }

  deck = shuffle(deck);

  // Organizar cartas em grid 4 colunas (ajustar linhas conforme quantidade)
  let colunas = 4;
  let linhas = ceil(deck.length / colunas);
  let margemX = (width - (larguraCarta * colunas + espacamento * (colunas - 1))) / 2;
  let margemY = 150;

  for (let i = 0; i < deck.length; i++) {
    let col = i % colunas;
    let lin = floor(i / colunas);
    deck[i].x = margemX + col * (larguraCarta + espacamento) + larguraCarta / 2;
    deck[i].y = margemY + lin * (alturaCarta + espacamento) + alturaCarta / 2;
  }

  cartas = deck;
}

function jogando() {
  // Verifica tempo restante
  let tempoPassado = millis() - tempoInicio;
  let tempoRestante = max(0, floor((tempoLimite - tempoPassado) / 1000));

  background(180, 220, 200);

  fill(0);
  textSize(20);
  text("Nível " + nivel, width / 2, 40);
  text("Tempo restante: " + tempoRestante + "s", width / 2, 70);

  // Desenhar cartas
  for (let carta of cartas) {
    desenhaCarta(carta);
  }

  // Verificar se tempo acabou
  if (tempoRestante <= 0) {
    estado = "fim";
  }

  // Verificar se todas as cartas foram encontradas
  if (cartas.every(c => c.encontrada)) {
    nivel++;
    if (nivel > maxNivel) {
      estado = "fim";
    } else {
      preparaNivel(nivel);
      tempoInicio = millis();
    }
  }
}

function desenhaCarta(carta) {
  push();
  translate(carta.x, carta.y);

  if (carta.visivel || carta.encontrada) {
    fill(255);
    stroke(0);
    rect(0, 0, larguraCarta, alturaCarta, 10);

    textSize(40);
    fill(0);
    textAlign(CENTER, CENTER);
    text(carta.emoji, 0, 0);
  } else {
    fill(100, 150, 200);
    stroke(0);
    rect(0, 0, larguraCarta, alturaCarta, 10);
  }
  pop();
}

function verificaClique(mx, my) {
  if (cartasViradas.length < 2) {
    for (let carta of cartas) {
      if (
        !carta.visivel &&
        !carta.encontrada &&
        mx > carta.x - larguraCarta / 2 &&
        mx < carta.x + larguraCarta / 2 &&
        my > carta.y - alturaCarta / 2 &&
        my < carta.y + alturaCarta / 2
      ) {
        carta.visivel = true;
        cartasViradas.push(carta);
        break;
      }
    }
  }

  if (cartasViradas.length === 2) {
    noLoop();

    setTimeout(() => {
      checaPar();
      cartasViradas = [];
      loop();
    }, 1000);
  }
}

function checaPar() {
  if (
    cartasViradas[0].emoji === cartasViradas[1].emoji
  ) {
    // Par encontrado
    cartasViradas[0].encontrada = true;
    cartasViradas[1].encontrada = true;
    piscaCarta(cartasViradas[0], color(0, 255, 0));
    piscaCarta(cartasViradas[1], color(0, 255, 0));
  } else {
    // Errou, desvira
    cartasViradas[0].visivel = false;
    cartasViradas[1].visivel = false;
    piscaCarta(cartasViradas[0], color(255, 0, 0));
    piscaCarta(cartasViradas[1], color(255, 0, 0));
  }
}

function piscaCarta(carta, cor) {
  // Simples efeito visual: pinta a carta rapidamente
  push();
  noStroke();
  fill(cor);
  rect(carta.x, carta.y, larguraCarta, alturaCarta, 10);
  pop();
}

function telaFim() {
  background(150, 180, 250);
  fill(0);
  textSize(20);
  text(
    "Você terminou o Jogo! Ele nos fez refletir sobre a importância da conexão entre o campo e a cidade.\n\n" +
    "Os alimentos que consumimos na cidade vêm diretamente do campo, " +
    "onde são cultivados e produzidos. Valorizar essa relação fortalece a economia, " +
    "preserva o meio ambiente e garante nossa alimentação saudável.\n\n" +
    "Obrigado por jogar!",
    width / 2,
    250,
    width - 100,
    300
  );

  textSize(18);
  text("Clique para voltar à tela inicial.", width / 2, height - 50, width, 30);
}
