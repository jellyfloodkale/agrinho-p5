let nuvemX = 0;

let perguntas = [
  {
    pergunta: "O que geralmente encontramos mais no campo do que na cidade?",
    alternativas: ["Trânsito intenso", "Shopping centers", "Fazendas", "Prédios altos"],
    respostaCorreta: 2,
    explicacao: "No campo, as fazendas são muito comuns por conta das plantações e criação de animais."
  },
  {
    pergunta: "Qual é uma característica comum da cidade?",
    alternativas: ["Tranquilidade", "Natureza abundante", "Muitos prédios e carros", "Espaços abertos"],
    respostaCorreta: 2,
    explicacao: "As cidades são mais urbanizadas, com muitos prédios, carros e pessoas circulando."
  },
  {
    pergunta: "Qual dos serviços abaixo é mais fácil de encontrar na cidade?",
    alternativas: ["Hospitais", "Árvores frutíferas", "Riachos", "Celeiros"],
    respostaCorreta: 0,
    explicacao: "Hospitais e serviços de saúde são mais concentrados nas cidades."
  },
  {
    pergunta: "O que é mais comum no campo?",
    alternativas: ["Engarrafamentos", "Criação de animais", "Arranha-céus", "Shopping centers"],
    respostaCorreta: 1,
    explicacao: "No campo, é comum encontrar criação de vacas, galinhas, porcos e outros animais."
  },
  {
    pergunta: "Por que muitas pessoas se mudam do campo para a cidade?",
    alternativas: ["Para plantar", "Para pescar", "Para buscar emprego e estudo", "Para ficar mais perto da natureza"],
    respostaCorreta: 2,
    explicacao: "A cidade oferece mais oportunidades de trabalho e acesso à educação superior."
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let quizFinalizado = false;

let mostrarExplicacao = false;
let explicacaoAtual = "";
let tempoExplicacao = 4000;

let selecionado = -1;
let mostrarCorResposta = false;
let corResposta = null; // 'verde' ou 'vermelho'

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(28);
}

function desenharFundo() {
  background(135, 206, 250);

  // Nuvens
  fill(255);
  ellipse(nuvemX, 100, 120, 60);
  ellipse(nuvemX + 400, 80, 150, 70);
  ellipse(nuvemX + 800, 140, 130, 70);
  nuvemX += 0.1;
  if (nuvemX > width) nuvemX = -400;

  // Colinas
  fill(34, 139, 34);
  noStroke();
  ellipse(width / 4, height, width * 1.5, 400);
  ellipse((3 * width) / 4, height, width * 1.5, 400);

  // Plantações
  fill(124, 252, 0);
  for (let i = 0; i < width; i += 50) {
    rect(i, height - 150, 20, 50);
  }

  // Sol
  fill(255, 223, 0);
  ellipse(width / 2, height / 4, 150, 150);

  // Árvores
  fill(139, 69, 19);
  rect(width / 5 + 50, height - 250, 40, 100);
  fill(34, 139, 34);
  ellipse(width / 5 + 70, height - 300, 120, 120);

  fill(139, 69, 19);
  rect(width / 2 + 150, height - 220, 40, 100);
  fill(34, 139, 34);
  ellipse(width / 2 + 170, height - 270, 120, 120);

  drawMinecraftVaca(width - 180, height - 100);
}

function draw() {
  if (mostrarExplicacao) {
    mostrarExplicacaoCentralizada();
    return;
  }

  desenharFundo();

  if (quizFinalizado) {
    mostrarResultadoFinal();
  } else {
    mostrarPerguntaAtual();
  }
}

function mostrarPerguntaAtual() {
  fill(0);
  textSize(28);
  text(perguntas[perguntaAtual].pergunta, width / 2, height / 4 + 100);

  for (let i = 0; i < perguntas[perguntaAtual].alternativas.length; i++) {
    let y = height / 2 + i * 100;

    // Define a cor do retângulo da alternativa:
    if (mostrarCorResposta && i === selecionado) {
      if (corResposta === 'verde') {
        fill(0, 200, 0); // verde
      } else if (corResposta === 'vermelho') {
        fill(200, 0, 0); // vermelho
      }
    } else {
      fill(255, 165, 0); // laranja padrão
    }

    rect(width / 4, y - 40, width / 2, 80, 15);

    fill(255);
    text(perguntas[perguntaAtual].alternativas[i], width / 2, y);
  }

  textSize(20);
  fill('#8BC34A');
  text(`Pontuação: ${pontuacao}`, width / 2, height - 40);
}

function mostrarExplicacaoCentralizada() {
  desenharFundo();

  // Painel preto semi-transparente para o emoji e explicação
  let painelLargura = width * 0.75;
  let painelAltura = 260;
  rectMode(CENTER);
  fill(0, 150);  // Preto com transparência
  noStroke();
  rect(width / 2, height / 2, painelLargura, painelAltura, 20);

  // Emoji centralizado, agora mais para cima (subi para -160)
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(255); // Branco para emoji ficar visível no fundo preto
  text("👨‍🌾", width / 2, height / 2 - 160);

  // Explicação centralizada
  textSize(22);
  fill(255, 230); // Branco quase opaco para texto
  let linhas = explicacaoAtual.match(/.{1,60}(\s|$)/g);
  for (let i = 0; i < linhas.length; i++) {
    text(linhas[i].trim(), width / 2, height / 2 + i * 25);
  }

  rectMode(CORNER); // reset modo
}

function mousePressed() {
  if (quizFinalizado) {
    perguntaAtual = 0;
    pontuacao = 0;
    quizFinalizado = false;
    return;
  }

  if (mostrarExplicacao || mostrarCorResposta) return;

  for (let i = 0; i < perguntas[perguntaAtual].alternativas.length; i++) {
    let y = height / 2 + i * 100;
    if (
      mouseX > width / 4 &&
      mouseX < width / 4 + width / 2 &&
      mouseY > y - 40 &&
      mouseY < y + 40
    ) {
      selecionado = i;

      if (selecionado === perguntas[perguntaAtual].respostaCorreta) {
        pontuacao++;
        corResposta = 'verde';
      } else {
        corResposta = 'vermelho';
      }

      mostrarCorResposta = true;

      setTimeout(() => {
        mostrarCorResposta = false;
        explicacaoAtual = perguntas[perguntaAtual].explicacao;
        mostrarExplicacao = true;

        setTimeout(() => {
          perguntaAtual++;
          if (perguntaAtual === perguntas.length) {
            quizFinalizado = true;
          }
          mostrarExplicacao = false;
          selecionado = -1;
          corResposta = null;
        }, tempoExplicacao);
      }, 1500); // mostra cor por 1.5 segundos antes de explicação

      break;
    }
  }
}

function mostrarResultadoFinal() {
  let emoji;
  if (pontuacao === perguntas.length) {
    emoji = "🎉";
  } else if (pontuacao >= perguntas.length / 2) {
    emoji = "😊";
  } else {
    emoji = "😔";
  }

  textSize(72);
  fill(255);
  text(emoji, width / 2, height / 2 - 40);

  textSize(32);
  fill('#8BC34A');
  text(`Você acertou ${pontuacao} de ${perguntas.length} perguntas!`, width / 2, height / 2 + 40);
}

function drawMinecraftVaca(x, y) {
  fill(255);
  rect(x, y, 80, 40);
  rect(x + 70, y - 20, 30, 20);

  fill(139, 69, 19);
  triangle(x + 70, y - 20, x + 75, y - 35, x + 80, y - 20);
  triangle(x + 100, y - 20, x + 95, y - 35, x + 90, y - 20);

  fill(0);
  ellipse(x + 80, y - 10, 6, 6);
  ellipse(x + 90, y - 10, 6, 6);

  fill(139, 69, 19);
  rect(x + 5, y + 40, 10, 10);
  rect(x + 55, y + 40, 10, 10);
}
