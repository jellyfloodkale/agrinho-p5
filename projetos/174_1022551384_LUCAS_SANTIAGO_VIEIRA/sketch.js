// Agrinho 2025 Festejando Conexão Campo e Cidade
// Aluno Lucas Santiago Vieira
// CCM Moralina Eleutério
// Pensamento Computacional FGB 1ºA
// Jogo da roleta com temas que conectam o campo e a cidade

// definição das variáveis globais
let angulo = 0;
let girando = false;
let velocidadeGiro = 0;
let rodadaAtual = 1;
let jogadorAtual = 1;
let pontuacoes = [0, 0];
let mostrarPergunta = false;
let perguntaAtual = null;
let feedback = "";
let jogoFinalizado = false;
let totalRodadas = 4;
let mostrarBotaoGirar = true;
let textoVencedor = "";
// acervo de perguntas e e alternativas
let perguntas = {
  "Agricultura": [
    { pergunta: "Qual é o principal grão exportado pelo Brasil?", opcoes: ["A) Milho", "B) Soja", "C) Arroz"], correta: "B" },
    { pergunta: "O que é agricultura familiar?", opcoes: ["A) Grandes empresas", "B) Famílias", "C) Agricultura urbana"], correta: "B" }
  ],
  "Pecuária": [
    { pergunta: "O Brasil é um dos maiores produtores de:", opcoes: ["A) Carne bovina", "B) Peixe", "C) Frango"], correta: "A" },
    { pergunta: "Qual desses é um produto da pecuária?", opcoes: ["A) Leite", "B) Soja", "C) Café"], correta: "A" }
  ],
  "Meio Ambiente": [
    { pergunta: "Uma prática para proteger o solo é:", opcoes: ["A) Queimadas", "B) Plantio direto", "C) Desmatamento"], correta: "B" },
    { pergunta: "Qual ação preserva a água?", opcoes: ["A) Jogar lixo", "B) Economizar", "C) Desperdiçar"], correta: "B" }
  ],
  "Conexão": [
    { pergunta: "Quem consome os alimentos do campo?", opcoes: ["A) Agricultores", "B) Cidades", "C) Animais"], correta: "B" },
    { pergunta: "Como os produtos chegam à cidade?", opcoes: ["A) Rodovias", "B) Aviões", "C) Satélites"], correta: "A" }
  ]
};

let temas = ["Agricultura", "Pecuária", "Meio Ambiente", "Conexão"];
let perguntasUsadas = { "Agricultura": [], "Pecuária": [], "Meio Ambiente": [], "Conexão": [] };

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  textSize(20);
  fill(0, 120, 0);
  text("Festejando Conexão", 100, 20);
  text("Campo e Cidade", 410, 20);
 

  desenharSeta();

  // Desenhar roleta
  push();
  translate(width / 2, 140);
  let total = temas.length;
  let passoAngulo = TWO_PI / total;
  for (let i = 0; i < total; i++) {
    fill(i % 2 == 0 ? color(100 + i * 30, 200, 150) : color(200, 100 + i * 30, 150));
    arc(0, 0, 200, 200, angulo + i * passoAngulo, angulo + (i + 1) * passoAngulo, PIE);

    fill(0);
    push();
    rotate(angulo + (i + 0.5) * passoAngulo);
    textSize(10);
    text(temas[i], 60, 0);
    pop();
  }

  if (girando) {
    angulo += velocidadeGiro;
    velocidadeGiro *= 0.97;
    if (velocidadeGiro < 0.01) {
      girando = false;
      selecionarPergunta();
    }
  }
  pop();

  // Placar e rodada
  fill(0);
  textSize(12);
  text("Jogador " + jogadorAtual + " - Pontos: " + pontuacoes[jogadorAtual - 1], width / 2, 250);
  text("Rodada " + rodadaAtual + " de " + totalRodadas, width / 2, 270);

  // Botão girar
  if (!girando && !mostrarPergunta && !jogoFinalizado && mostrarBotaoGirar) {
    fill(0, 150, 0);
    rect(width / 2 - 50, 290, 100, 30, 5);
    fill(255);
    textSize(12);
    text("Girar Roleta", width / 2, 305);
  }

  // Pergunta
  if (mostrarPergunta && perguntaAtual) {
    fill(255);
    rect(50, 320, 400, 120, 8);
    fill(0);
    textSize(10);
    text(perguntaAtual.pergunta, width / 2, 335);

    let posY = 355;
    for (let i = 0; i < 3; i++) {
      fill(0, 100, 200);
      rect(width / 2 - 80, posY, 160, 20, 5);
      fill(255);
      text(perguntaAtual.opcoes[i], width / 2, posY + 10);
      posY += 25;
    }
  }

  // Feedback
  if (feedback !== "" && !mostrarPergunta) {
    fill(255);
    rect(150, 430, 200, 30, 5);
    fill(0);
    textSize(12);
    text(feedback, width / 2, 445);
  }

  // Fim de jogo
  if (jogoFinalizado) {
    fill(255);
    rect(50, 300, 400, 140, 8);
    fill(0);
    textSize(12);
    text("Fim de jogo! Placar final:", width / 2, 320);
    text("Jogador 1: " + pontuacoes[0] + " pontos", width / 2, 340);
    text("Jogador 2: " + pontuacoes[1] + " pontos", width / 2, 360);
    text(textoVencedor, width / 2, 380);

    fill(0, 150, 0);
    rect(width / 2 - 50, 400, 100, 30, 5);
    fill(255);
    text("Reiniciar", width / 2, 415);
  }
}
// desenha a seta em cima da roleta
function desenharSeta() {
  fill(255, 0, 0);
  stroke(0);
  strokeWeight(2);
  triangle(width / 2 - 20, 60, width / 2 + 20, 60, width / 2, 20);
  noStroke();
}

function mousePressed() {
  if (!girando && !mostrarPergunta && !jogoFinalizado && mostrarBotaoGirar) {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > 290 && mouseY < 320) {
      velocidadeGiro = random(0.2, 0.4);
      feedback = "";
      mostrarBotaoGirar = false;
      girando = true;
    }
  }

  if (mostrarPergunta && perguntaAtual) {
    let posY = 355;
    for (let i = 0; i < 3; i++) {
      if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 &&
          mouseY > posY && mouseY < posY + 20) {
        verificarResposta(["A", "B", "C"][i]);
      }
      posY += 25;
    }
  }

  if (jogoFinalizado) {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > 400 && mouseY < 430) {
      reiniciarJogo();
    }
  }
}
// seleciona tipo de pergunta baseado no tema onde a a seta aponta na roleta
function selecionarPergunta() {
  let total = temas.length;
  let passoAngulo = TWO_PI / total;
  let indice = floor((TWO_PI - (angulo % TWO_PI)) / passoAngulo) % total;
  let tema = temas[indice];

  let perguntasDisponiveis = perguntas[tema].filter((p, idx) => !perguntasUsadas[tema].includes(idx));

  if (perguntasDisponiveis.length === 0) {
    feedback = "Todas as perguntas deste tema já foram usadas!";
    mostrarPergunta = false;
    perguntaAtual = null;
    mostrarBotaoGirar = true;
    return;
  }

  let indicePergunta;
  do {
    indicePergunta = floor(random(perguntas[tema].length));
  } while (perguntasUsadas[tema].includes(indicePergunta));

  perguntasUsadas[tema].push(indicePergunta);
  perguntaAtual = perguntas[tema][indicePergunta];
  mostrarPergunta = true;
}
// faz a verificação da resposta escolhida e alterna os jogadores
function verificarResposta(escolha) {
  if (escolha === perguntaAtual.correta) {
    pontuacoes[jogadorAtual - 1]++;
    feedback = "Resposta correta!";
  } else {
    feedback = "Resposta errada!";
  }
  mostrarPergunta = false;
  perguntaAtual = null;

  if (jogadorAtual == 1) {
    jogadorAtual = 2;
  } else {
    if (rodadaAtual < totalRodadas) {
      rodadaAtual++;
      jogadorAtual = 1;
    } else {
      verificarVencedor();
      jogoFinalizado = true;
    }
  }
  mostrarBotaoGirar = true;
}
// ao fim do jogo, faz a verificação dos pontos para ver quem ganhou (jogador 1 ou jogador 2) ou se houve empate
function verificarVencedor() {
  if (pontuacoes[0] > pontuacoes[1]) {
    textoVencedor = "Jogador 1 venceu!";
  } else if (pontuacoes[1] > pontuacoes[0]) {
    textoVencedor = "Jogador 2 venceu!";
  } else {
    textoVencedor = "Empate!";
  }
}
// reinicia as variáveis do jogo para zero ou vazio, deixando como no início do jogo
function reiniciarJogo() {
  angulo = 0;
  girando = false;
  velocidadeGiro = 0;
  jogadorAtual = 1;
  pontuacoes = [0, 0];
  rodadaAtual = 1;
  mostrarPergunta = false;
  perguntaAtual = null;
  feedback = "";
  jogoFinalizado = false;
  mostrarBotaoGirar = true;
  textoVencedor = "";
  perguntasUsadas = { "Agricultura": [], "Pecuária": [], "Meio Ambiente": [], "Conexão": [] };
}
