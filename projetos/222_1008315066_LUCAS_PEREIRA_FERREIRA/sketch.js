let fase = 0;
let culturaEscolhida = "";
let agua = 0;
let pontuacao = 0;
let transporteX = 50;
let mercadoEscolhido = "";
let perguntaAtual = 0;

let perguntas = [
  {
    pergunta: "O que é sustentabilidade?",
    opcoes: ["Preservar recursos para o futuro", "Plantar sem colher", "Gastar tudo o que puder"],
    resposta: 0
  },
  {
    pergunta: "Qual dessas ações ajuda o meio ambiente?",
    opcoes: ["Queimar lixo", "Economizar água", "Desperdiçar comida"],
    resposta: 1
  }
];

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER, CENTER);
  textSize(22);
}

function draw() {
  background(240);
  switch (fase) {
    case 0: telaInicio(); break;
    case 1: escolherCultura(); break;
    case 2: preparoSolo(); break;
    case 3: fasePlantio(); break;
    case 4: faseCrescimento(); break;
    case 5: faseColheita(); break;
    case 6: faseTransporte(); break;
    case 7: faseMercado(); break;
    case 8: faseConsumo(); break;
    case 9: faseQuiz(); break;
    case 10: faseRevisao(); break;
  }
}

function mousePressed() {
  if (fase === 0) {
    fase = 1;
  } else if (fase === 1) {
    escolhaCultura(mouseX, mouseY);
  } else if (fase === 2) {
    fase = 3;
  } else if (fase === 3) {
    fase = 4;
  } else if (fase === 4) {
    if (agua < 5 && dist(mouseX, mouseY, width / 2, height / 2) < 50) {
      agua++;
    }
    if (agua >= 5) {
      fase = 5;
    }
  } else if (fase === 5) {
    fase = 6;
  } else if (fase === 7) {
    escolhaMercado(mouseX, mouseY);
  } else if (fase === 8) {
    fase = 9;
  } else if (fase === 9) {
    checarResposta(mouseX, mouseY);
  } else if (fase === 10) {
    // Reiniciar
    fase = 0;
    culturaEscolhida = "";
    agua = 0;
    pontuacao = 0;
    transporteX = 50;
    mercadoEscolhido = "";
    perguntaAtual = 0;
  }
}

function telaInicio() {
  fill(0);
  textSize(28);
  text("🌾 Jornada do Alimento: Do Campo à Mesa", width / 2, 150);
  textSize(18);
  text("Clique para começar", width / 2, 200);
}

function escolherCultura() {
  background(210, 255, 200);
  fill(0);
  text("Escolha o alimento que deseja plantar:", width / 2, 80);
  fill(100, 200, 100);
  rect(200, 200, 150, 60);
  rect(375, 200, 150, 60);
  rect(550, 200, 150, 60);
  fill(0);
  text("Tomate", 275, 230);
  text("Alface", 450, 230);
  text("Milho", 625, 230);
}

function escolhaCultura(mx, my) {
  if (mx > 200 && mx < 350 && my > 200 && my < 260) culturaEscolhida = "Tomate";
  else if (mx > 375 && mx < 525 && my > 200 && my < 260) culturaEscolhida = "Alface";
  else if (mx > 550 && mx < 700 && my > 200 && my < 260) culturaEscolhida = "Milho";

  if (culturaEscolhida !== "") fase = 2;
}

function preparoSolo() {
  background(180, 120, 60);
  fill(255);
  text("Solo preparado! Clique para plantar.", width / 2, height / 2);
}

function fasePlantio() {
  background(139, 69, 19);
  fill(255);
  text("Plantando " + culturaEscolhida + "... Clique para cuidar.", width / 2, 100);
  fill(0, 200, 0);
  rect(width / 2 - 50, height / 2, 100, 30);
}

function faseCrescimento() {
  background(200, 255, 200);
  fill(0);
  text("Clique na planta para regar 💧 (" + agua + "/5)", width / 2, 50);
  fill(34, 139, 34);
  ellipse(width / 2, height / 2, 80);
  if (agua >= 5) {
    fill(0);
    text("A planta cresceu! Clique novamente para colher.", width / 2, 400);
  }
}

function faseColheita() {
  background(220, 250, 200);
  fill(0);
  text("Colhendo os alimentos... Pronto para transportar? Clique!", width / 2, height / 2);
}

function faseTransporte() {
  background(200);
  fill(0);
  text("Transportando os alimentos pela estrada...", width / 2, 50);
  drawCaminhao(transporteX, height - 100);
  transporteX += 3;
  if (transporteX > width) {
    transporteX = 50;
    fase = 7;
  }
}

function drawCaminhao(x, y) {
  fill(180, 0, 0);
  rect(x, y, 100, 40);     // Corpo
  rect(x + 70, y - 20, 30, 20); // Cabine
  fill(0);
  ellipse(x + 20, y + 40, 20); // Roda 1
  ellipse(x + 80, y + 40, 20); // Roda 2
}

function faseMercado() {
  background(240, 230, 200);
  fill(0);
  text("Escolha onde vender:", width / 2, 100);
  fill(200, 200, 100);
  rect(250, 200, 150, 60);
  rect(500, 200, 150, 60);
  fill(0);
  text("Mercado local", 325, 230);
  text("Atacado grande", 575, 230);
}

function escolhaMercado(mx, my) {
  if (mx > 250 && mx < 400 && my > 200 && my < 260) mercadoEscolhido = "Local";
  else if (mx > 500 && mx < 650 && my > 200 && my < 260) mercadoEscolhido = "Grande";

  if (mercadoEscolhido !== "") fase = 8;
}

function faseConsumo() {
  background(255);
  fill(0);
  text("Na cidade, os alimentos chegam à mesa!", width / 2, height / 2 - 50);
  text("Clique para responder perguntas.", width / 2, height / 2 + 10);
}

function faseQuiz() {
  let q = perguntas[perguntaAtual];
  background(230);
  fill(0);
  text(q.pergunta, width / 2, 100);
  for (let i = 0; i < q.opcoes.length; i++) {
    fill(200);
    rect(250, 180 + i * 80, 400, 50);
    fill(0);
    text(q.opcoes[i], 450, 205 + i * 80);
  }
}

function checarResposta(mx, my) {
  let i = floor((my - 180) / 80);
  if (i >= 0 && i < perguntas[perguntaAtual].opcoes.length) {
    if (i === perguntas[perguntaAtual].resposta) pontuacao++;
    perguntaAtual++;
    if (perguntaAtual >= perguntas.length) fase = 10;
  }
}

function faseRevisao() {
  background(240);
  fill(0);
  textSize(20);
  text("Revisão - Sustentabilidade e Meio Ambiente", width / 2, 60);
  textSize(16);
  textAlign(LEFT);
  let texto = "\nSustentabilidade é o uso consciente dos recursos naturais, garantindo que as futuras gerações também possam usá-los.\n\nIsso envolve: economizar água, evitar desperdício de alimentos, preservar florestas, cuidar do solo e fazer escolhas conscientes como consumir produtos locais e orgânicos.\n\nO meio ambiente é nosso bem mais precioso. Proteger o caminho dos alimentos é proteger também o planeta.\n\nParabéns por completar a jornada do alimento!";
  text(texto, 50, 100, 800, 400);
  textAlign(CENTER);
  text("Clique para jogar novamente", width / 2, 550);
}
