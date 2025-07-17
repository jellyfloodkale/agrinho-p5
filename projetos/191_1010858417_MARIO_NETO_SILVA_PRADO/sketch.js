let perguntas = [
  {
    pergunta: "Onde é mais comum encontrar plantações de soja?",
    opA: "Cidade",
    opB: "Campo",
    correta: "B"
  },
  {
    pergunta: "Onde geralmente se localizam os grandes prédios comerciais?",
    opA: "Campo",
    opB: "Cidade",
    correta: "B"
  },
  {
    pergunta: "Qual ambiente é mais associado ao ar puro e tranquilidade?",
    opA: "Campo",
    opB: "Cidade",
    correta: "A"
  },
  {
    pergunta: "Onde é mais fácil encontrar transporte público, como ônibus e metrô?",
    opA: "Campo",
    opB: "Cidade",
    correta: "B"
  },
  {
    pergunta: "Em qual local é mais comum encontrar criações de gado?",
    opA: "Campo",
    opB: "Cidade",
    correta: "A"
  },
  {
    pergunta: "Onde há mais hospitais especializados e centros de saúde de alta tecnologia?",
    opA: "Campo",
    opB: "Cidade",
    correta: "B"
  },
  {
    pergunta: "Qual ambiente tem maior densidade populacional (mais pessoas por área)?",
    opA: "Campo",
    opB: "Cidade",
    correta: "B"
  },
  {
    pergunta: "Onde é mais comum haver feiras agrícolas e produção artesanal?",
    opA: "Campo",
    opB: "Cidade",
    correta: "A"
  },
  {
    pergunta: "Onde geralmente há mais oportunidades de emprego em indústrias e serviços?",
    opA: "Campo",
    opB: "Cidade",
    correta: "B"
  },
  {
    pergunta: "Qual ambiente costuma ter mais áreas verdes naturais, como florestas e matas?",
    opA: "Campo",
    opB: "Cidade",
    correta: "A"
  }
];

let indexPergunta = 0;
let estado = "jogando"; // "jogando", "errado", "vitoria", "gameover"
let mensagemErroTimer = 0;
let erros = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(220);

  if (estado === "jogando") {
    mostrarPergunta();
    mostrarErros();
  } else if (estado === "errado") {
    fill(255, 0, 0);
    textSize(32);
    text("Resposta errada!", width/2, height/2 - 30);
    textSize(20);
    text("Reiniciando as perguntas...", width/2, height/2 + 10);
    mostrarErros();

    mensagemErroTimer++;
    if (mensagemErroTimer > 120) { // 2 segundos
      indexPergunta = 0;
      estado = "jogando";
      mensagemErroTimer = 0;
    }
  } else if (estado === "vitoria") {
    fill(0, 150, 0);
    textSize(32);
    text("Parabéns! Você acertou tudo!", width/2, height/2 - 20);
    textSize(20);
    text("Obrigado por jogar!", width/2, height/2 + 20);
  } else if (estado === "gameover") {
    fill(150, 0, 0);
    textSize(32);
    text("Você perdeu!", width/2, height/2 - 20);
    textSize(20);
    text("Erros máximos atingidos: 6", width/2, height/2 + 20);
    text("Recarregue a página para tentar novamente.", width/2, height/2 + 60);
  }
}

function mostrarPergunta() {
  fill(0);
  textSize(22);
  text("Pergunta " + (indexPergunta + 1) + " de " + perguntas.length, width/2, 50);

  textSize(24);
  text(perguntas[indexPergunta].pergunta, width/2, height/2 - 60);

  textSize(20);
  fill(50);
  text("A) " + perguntas[indexPergunta].opA, width/2, height/2);
  text("B) " + perguntas[indexPergunta].opB, width/2, height/2 + 40);

  fill(100);
  textSize(16);
  text("Pressione A ou B para responder", width/2, height - 50);
}

function mostrarErros() {
  fill(150, 0, 0);
  textSize(18);
  text("Erros: " + erros + " / 6", width - 100, 30);
}

function keyPressed() {
  if (estado !== "jogando") return;

  let resposta = null;
  if (key === 'A' || key === 'a') {
    resposta = "A";
  } else if (key === 'B' || key === 'b') {
    resposta = "B";
  }

  if (resposta) {
    if (resposta === perguntas[indexPergunta].correta) {
      indexPergunta++;
      if (indexPergunta >= perguntas.length) {
        estado = "vitoria";
      }
    } else {
      erros++;
      if (erros >= 6) {
        estado = "gameover";
      } else if (erros >= 4) {
        estado = "errado";
        mensagemErroTimer = 0;
      } else {
        // Errou menos que 4 vezes, só continua normalmente (sem reiniciar perguntas)
        indexPergunta++;
        if (indexPergunta >= perguntas.length) {
          estado = "vitoria";
        }
      }
    }
  }
}