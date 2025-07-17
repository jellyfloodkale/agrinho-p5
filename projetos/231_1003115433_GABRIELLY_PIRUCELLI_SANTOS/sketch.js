function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let perguntas = [
  {
    pergunta: "Qual é a principal atividade econômica desenvolvida no meio rural?",
    opcoes: [
      "Indústria têxtil",
      "Agricultura e pecuária",
      "Comércio varejista",
      "Serviços financeiros"
    ],
    resposta: 1
  },
  {
    pergunta: "Qual o papel da cidade na conexão com o campo?",
    opcoes: [
      "Apenas fornecer trabalho para o campo",
      "Centro de comércio e serviços para o meio rural",
      "Não tem relação com o campo",
      "Substituir o campo completamente"
    ],
    resposta: 1
  },
  {
    pergunta: "Qual a importância da agricultura familiar para o meio rural?",
    opcoes: [
      "Produzir alimentos para consumo local e mercado",
      "Produzir apenas para exportação",
      "Não tem importância",
      "Substituir a pecuária"
    ],
    resposta: 0
  },
  {
    pergunta: "Quais são os principais desafios enfrentados pelo meio rural hoje?",
    opcoes: [
      "Falta de internet e infraestrutura",
      "Excesso de tecnologia",
      "Muitos centros comerciais",
      "Poluição sonora"
    ],
    resposta: 0
  },
  {
    pergunta: "Como a cidade pode contribuir para o desenvolvimento do campo?",
    opcoes: [
      "Investindo em tecnologia e infraestrutura rural",
      "Ignorando o campo",
      "Substituindo as áreas rurais por indústrias",
      "Incentivando o êxodo rural"
    ],
    resposta: 0
  },
  {
    pergunta: "O que é o êxodo rural?",
    opcoes: [
      "Migração de pessoas do campo para a cidade",
      "Migração da cidade para o campo",
      "Plantio em larga escala",
      "Desenvolvimento urbano"
    ],
    resposta: 0
  },
  {
    pergunta: "Qual a importância da educação no meio rural?",
    opcoes: [
      "Desenvolver conhecimento e melhorar a qualidade de vida",
      "Não tem importância",
      "Só serve para a cidade",
      "Deixar o campo abandonado"
    ],
    resposta: 0
  },
  {
    pergunta: "Como as tecnologias podem ajudar a agricultura?",
    opcoes: [
      "Aumentando a produtividade e eficiência",
      "Diminuindo a produção",
      "Destruir o meio ambiente",
      "Eliminar o trabalho humano"
    ],
    resposta: 0
  },
  {
    pergunta: "Quais são os benefícios da convivência entre campo e cidade?",
    opcoes: [
      "Troca de produtos, cultura e conhecimento",
      "Isolamento das comunidades",
      "Conflitos constantes",
      "Diminuição da produção agrícola"
    ],
    resposta: 0
  },
  {
    pergunta: "Por que é importante celebrar a conexão entre campo e cidade?",
    opcoes: [
      "Para reforçar a dependência econômica entre eles",
      "Para incentivar o isolamento das comunidades rurais",
      "Para substituir o campo pela cidade",
      "Para evitar o desenvolvimento tecnológico"
    ],
    resposta: 0
  },
  // Novas perguntas adicionadas abaixo:
  {
    pergunta: "Qual recurso natural é fundamental para a agricultura no campo?",
    opcoes: [
      "Água",
      "Petróleo",
      "Carvão",
      "Minério de ferro"
    ],
    resposta: 0
  },
  {
    pergunta: "O que a agricultura sustentável busca preservar?",
    opcoes: [
      "O meio ambiente e os recursos naturais",
      "A poluição e desmatamento",
      "A urbanização acelerada",
      "A industrialização do campo"
    ],
    resposta: 0
  },
  {
    pergunta: "Como o transporte influencia a conexão entre campo e cidade?",
    opcoes: [
      "Facilitando o escoamento dos produtos agrícolas",
      "Impedindo o comércio",
      "Aumentando o isolamento rural",
      "Reduzindo a circulação de pessoas"
    ],
    resposta: 0
  },
  {
    pergunta: "Qual produto típico da cidade pode depender do campo para sua produção?",
    opcoes: [
      "Alimentos frescos e industrializados",
      "Tecnologia de celulares",
      "Serviços bancários",
      "Construção de edifícios"
    ],
    resposta: 0
  },
  {
    pergunta: "O que caracteriza a vida urbana em relação ao campo?",
    opcoes: [
      "Alta densidade populacional e serviços variados",
      "Atividades agrícolas intensas",
      "Pouca infraestrutura",
      "Poucos centros comerciais"
    ],
    resposta: 0
  },
  {
    pergunta: "Quais setores econômicos predominam na cidade?",
    opcoes: [
      "Comércio, indústria e serviços",
      "Agricultura e pecuária",
      "Extrativismo vegetal",
      "Pesca artesanal"
    ],
    resposta: 0
  },
  {
    pergunta: "Qual é o papel das cooperativas no meio rural?",
    opcoes: [
      "Unir produtores para fortalecer a economia local",
      "Dividir os agricultores",
      "Substituir a agricultura familiar",
      "Concentrar terras nas mãos de poucos"
    ],
    resposta: 0
  },
  {
    pergunta: "Como o turismo pode beneficiar o campo?",
    opcoes: [
      "Gerando renda e valorizando a cultura local",
      "Destruindo o ambiente natural",
      "Incentivando a urbanização",
      "Aumentando a poluição"
    ],
    resposta: 0
  },
  {
    pergunta: "Por que a diversificação das culturas é importante no campo?",
    opcoes: [
      "Reduz riscos e melhora a sustentabilidade",
      "Diminui a produção",
      "Aumenta a dependência externa",
      "Faz o solo perder nutrientes rapidamente"
    ],
    resposta: 0
  },
  {
    pergunta: "Como as feiras livres ajudam a conexão campo-cidade?",
    opcoes: [
      "Promovendo a venda direta de produtos rurais para a população urbana",
      "Impedindo o comércio",
      "Concentrando a produção nas cidades",
      "Aumentando o preço dos alimentos"
    ],
    resposta: 0
  }
];

let indiceAtual = 0;
let pontuacao = 0;
let recorde = 0;
let tempoPorPergunta = 15; // segundos
let tempoRestante;
let estado = "telaInicial"; // pode ser "telaInicial", "instrucoes", "jogando", "feedback", "resultado"
let feedback = "";
let feedbackTimer = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(18);
  tempoRestante = tempoPorPergunta;
  
  let r = localStorage.getItem("recordeQuiz");
  if (r != null) recorde = parseInt(r);
  frameRate(30);
}

function draw() {
  background(30, 110, 70);
  fill(255);
  
  if (estado === "telaInicial") {
    mostrarTelaInicial();
  } else if (estado === "instrucoes") {
    mostrarInstrucoes();
  } else if (estado === "jogando") {
    mostrarPergunta();
    mostrarTimer();
    contarTempo();
  } else if (estado === "feedback") {
    mostrarFeedback();
  } else if (estado === "resultado") {
    mostrarResultado();
  }
}

function mostrarTelaInicial() {
  textSize(36);
  text("Quiz: Conexão Campo e Cidade", width/2, height/3);
  
  fill(255, 180, 0);
  rect(width/2 - 80, height/2, 160, 50, 10);
  
  fill(30);
  textSize(24);
  text("Play", width/2, height/2 + 25);
}

function mostrarInstrucoes() {
  textSize(24);
  text("Como funciona o jogo", width/2, 60);
  
  textSize(16);
  text("Responda 20 perguntas sobre o campo e a cidade.\nCada pergunta tem um tempo de 15 segundos.\nPontue acertando as perguntas.\nTente bater o recorde!\n\nBoa sorte!", width/2, height/2 - 20);
  
  fill(255, 180, 0);
  rect(width/2 - 100, height - 80, 200, 50, 10);
  
  fill(30);
  textSize(20);
  text("Começar", width/2, height - 55);
}

function mousePressed() {
  if (estado === "telaInicial") {
    if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
        mouseY > height/2 && mouseY < height/2 + 50) {
      estado = "instrucoes";
    }
  } else if (estado === "instrucoes") {
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height - 80 && mouseY < height - 30) {
      estado = "jogando";
      tempoRestante = tempoPorPergunta;
    }
  } else if (estado === "jogando") {
    let p = perguntas[indiceAtual];
    for (let i = 0; i < p.opcoes.length; i++) {
      let y = 150 + i * 40;
      if (mouseX > 100 && mouseX < 500 && mouseY > y - 20 && mouseY < y + 15) {
        let acertou = (i === p.resposta);
        if (acertou) {
          pontuacao++;
          feedback = "Resposta correta!";
        } else {
          feedback = "Resposta errada!";
        }
        estado = "feedback";
        feedbackTimer = 60; // 2 segundos
        proximaPergunta(acertou);
      }
    }
  } else if (estado === "resultado") {
    if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
        mouseY > height - 100 && mouseY < height - 60) {
      reiniciarQuiz();
    }
  }
}

function mostrarPergunta() {
  let p = perguntas[indiceAtual];
  fill(255);
  textSize(22);
  text("Pergunta " + (indiceAtual + 1) + " de " + perguntas.length, width/2, 40);
  
  textSize(20);
  text(p.pergunta, width/2, 90);
  
  textSize(18);
  for (let i = 0; i < p.opcoes.length; i++) {
    let y = 150 + i * 40;
    fill(200);
    rect(100, y - 20, 400, 35, 10);
    fill(30);
    text(p.opcoes[i], width/2, y);
  }
}

function mostrarTimer() {
  fill(255);
  textSize(18);
  text("Tempo: " + tempoRestante + "s", width/2, height - 40);
  
  let barraLargura = map(tempoRestante, 0, tempoPorPergunta, 0, 400);
  fill(255, 150, 0);
  rect(width/2 - 200, height - 30, barraLargura, 15, 5);
}

function contarTempo() {
  if (frameCount % 30 === 0) {
    tempoRestante--;
    if (tempoRestante <= 0) {
      feedback = "Tempo esgotado!";
      estado = "feedback";
      feedbackTimer = 60;
      proximaPergunta(false);
    }
  }
}

function mostrarFeedback() {
  background(20);
  fill(255);
  textSize(28);
  text(feedback, width/2, height/2);
  
  feedbackTimer--;
  if (feedbackTimer <= 0) {
    if (indiceAtual >= perguntas.length) {
      estado = "resultado";
    } else {
      estado = "jogando";
      tempoRestante = tempoPorPergunta;
    }
  }
}

function proximaPergunta(acertou) {
  indiceAtual++;
  if (indiceAtual >= perguntas.length) {
    estado = "resultado";
    if (pontuacao > recorde) {
      recorde = pontuacao;
      localStorage.setItem("recordeQuiz", recorde);
    }
  }
}

function mostrarResultado() {
  background(30, 110, 70);
  fill(255);
  textSize(28);
  text("Quiz Finalizado!", width/2, 80);
  
  textSize(22);
  text("Sua pontuação: " + pontuacao + " de " + perguntas.length, width/2, 140);
  
  textSize(20);
  text("Recorde: " + recorde, width/2, 190);
  
  fill(255, 180, 0);
  rect(width/2 - 80, height - 100, 160, 40, 10);
  fill(30);
  textSize(20);
  text("Jogar Novamente", width/2, height - 80);
}

function reiniciarQuiz() {
  indiceAtual = 0;
  pontuacao = 0;
  tempoRestante = tempoPorPergunta;
  estado = "telaInicial";
}
