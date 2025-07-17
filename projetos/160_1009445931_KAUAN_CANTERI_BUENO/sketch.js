let perguntas = [
  {
    pergunta: "Qual é o principal cereal cultivado no mundo?",
    opcoes: ["Milho", "Trigo", "Arroz", "Cevada"],
    resposta: 0
  },
  {
    pergunta: "Qual parte da planta realiza fotossíntese?",
    opcoes: ["Raiz", "Flor", "Folha", "Caule"],
    resposta: 2
  },
  {
    pergunta: "Qual nutriente é essencial para o crescimento das plantas?",
    opcoes: ["Cálcio", "Nitrogênio", "Magnésio", "Enxofre"],
    resposta: 1
  },
  {
    pergunta: "O que é agricultura orgânica?",
    opcoes: [
      "Uso de pesticidas sintéticos",
      "Uso de sementes modificadas",
      "Produção sem químicos sintéticos",
      "Plantio só em estufas"
    ],
    resposta: 2
  },
  {
    pergunta: "Qual animal é ruminante?",
    opcoes: ["Cavalo", "Porco", "Vaca", "Galinha"],
    resposta: 2
  },
  {
    pergunta: "O que o solo argiloso retém mais?",
    opcoes: ["Água", "Luz", "Vento", "Insetos"],
    resposta: 0
  },
  {
    pergunta: "O que é uma horta?",
    opcoes: [
      "Campo de criação de animais",
      "Cultivo de frutas e legumes",
      "Estufa com flores ornamentais",
      "Área para pesca"
    ],
    resposta: 1
  },
  {
    pergunta: "Qual dessas práticas ajuda a conservar o solo?",
    opcoes: [
      "Desmatamento",
      "Queimada",
      "Rotação de culturas",
      "Uso contínuo de agrotóxicos"
    ],
    resposta: 2
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let opcaoSelecionada = -1;
let mostrarFeedback = false;
let personagemX = 500;
let olhoOffset = 0;
let animTimer = 0;
let acertou = false;

function setup() {
  createCanvas(720, 480);
  textAlign(LEFT, TOP);
  textSize(16);
  frameRate(30);
}

function draw() {
  // Fundo animado com variação de cor
  let corBase = map(sin(frameCount * 0.01), -1, 1, 230, 255);
  background(corBase, 250, 240);
  
  desenharPersonagem();

  if (perguntaAtual < perguntas.length) {
    let p = perguntas[perguntaAtual];
    fill(50);
    text(`Pergunta ${perguntaAtual + 1}: ${p.pergunta}`, 20, 20);
    
    for (let i = 0; i < p.opcoes.length; i++) {
      let y = 70 + i * 50;
      let cor = i === opcaoSelecionada ? color(180, 220, 255) : color(255);
      fill(cor);
      stroke(0);
      rect(20, y, 660, 40, 12);
      fill(0);
      noStroke();
      text(p.opcoes[i], 30, y + 10);
    }
    
    if (mostrarFeedback) {
      textSize(18 + sin(frameCount * 0.2) * 2); // animação pulsante
      fill(acertou ? "green" : "red");
      text(acertou ? "🎉 Resposta correta!" : "❌ Resposta errada.", 20, 300);
      textSize(16);
      fill(80);
      text("Clique para continuar...", 20, 340);
    }
  } else {
    // Fim do quiz
    textSize(22);
    fill(30, 150, 30);
    text("Fim do quiz! 🌾", 20, 50);
    fill(0);
    textSize(18);
    text(`Você acertou ${pontuacao} de ${perguntas.length} perguntas.`, 20, 100);
  }
}

function desenharPersonagem() {
  // Corpo
  fill(255, 200, 150);
  ellipse(personagemX, 140, 100, 100);

  // Olhos
  fill(255);
  ellipse(personagemX - 20, 130, 20, 20);
  ellipse(personagemX + 20, 130, 20, 20);
  
  // Pupilas animadas
  olhoOffset = map(mouseX, 0, width, -5, 5);
  fill(0);
  ellipse(personagemX - 20 + olhoOffset, 130, 8, 8);
  ellipse(personagemX + 20 + olhoOffset, 130, 8, 8);
  
  // Boca animada
  noFill();
  stroke(0);
  strokeWeight(2);
  if (mostrarFeedback) {
    if (acertou) {
      arc(personagemX, 155, 40, 20, 0, PI); // sorriso
    } else {
      arc(personagemX, 165, 40, 20, PI, 0); // triste
    }
  } else {
    line(personagemX - 10, 160, personagemX + 10, 160); // neutro
  }
}

function mousePressed() {
  if (mostrarFeedback) {
    mostrarFeedback = false;
    opcaoSelecionada = -1;
    perguntaAtual++;
    return;
  }

  if (perguntaAtual < perguntas.length) {
    let p = perguntas[perguntaAtual];
    for (let i = 0; i < p.opcoes.length; i++) {
      let y = 70 + i * 50;
      if (mouseX > 20 && mouseX < 680 && mouseY > y && mouseY < y + 40) {
        opcaoSelecionada = i;
        acertou = i === p.resposta;
        if (acertou) pontuacao++;
        mostrarFeedback = true;
        break;
      }
    }
  }
}
