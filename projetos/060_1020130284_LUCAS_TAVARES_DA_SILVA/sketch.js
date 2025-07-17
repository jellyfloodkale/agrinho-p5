let questions = [
  {
    question: "Qual é a principal fonte de alimentos produzidos no campo?",
    options: ["Tecnologia avançada", "Agricultura e pecuária", "Indústria alimentícia", "Comércio local"],
    answer: 1
  },
  {
    question: "Qual destes problemas ambientais é mais comum nas áreas urbanas?",
    options: ["Desmatamento", "Poluição do ar", "Uso excessivo de pesticidas", "Erosão do solo"],
    answer: 1
  },
  {
    question: "O que é a agricultura urbana?",
    options: ["Agricultura feita em áreas rurais, mas com técnicas antigas", "Prática de cultivo de alimentos nas cidades, em espaços urbanos", "Agricultura apenas em grandes plantações fora das cidades", "Agricultura realizada por empresas multinacionais"],
    answer: 1
  },
  {
    question: "Qual é a principal fonte de poluição do ar nas cidades?",
    options: ["Tráfego de veículos", "Plantação de árvores", "Fontes de energia solar", "Campos agrícolas"],
    answer: 0
  },
  {
    question: "A sustentabilidade é importante para o equilíbrio entre o campo e a cidade. O que significa sustentabilidade?",
    options: ["Desenvolvimento sem considerar o impacto ambiental", "Manter um estilo de vida que dependa exclusivamente dos recursos naturais", "Uso de recursos de forma que atenda às necessidades do presente sem comprometer o futuro", "Aumentar a produção e o consumo a qualquer custo"],
    answer: 2
  },
];

let currentQuestion = 0;
let userAnswers = [];
let quizFinished = false;
let feedback = ""; // Variável para exibir feedback (correto/incorreto)
let opacity = 255; // Inicializando opacidade com valor máximo
let opacityChangeRate = 5; // Taxa de mudança da opacidade

function setup() {
  createCanvas(900, 650);
  textSize(20);
  textAlign(CENTER, TOP);
  noLoop();
}

function draw() {
  background(220);
  drawBackground();  // Função para desenhar o fundo detalhado

  // Título do quiz
  fill(0);
  textSize(32);
  text("Quiz: Conexão entre Campo e Cidade", width / 2, 50);

  // Exibe a pergunta e opções
  displayQuestion();

  // Exibe o feedback, se necessário
  if (feedback !== "") {
    textSize(24);
    fill(feedback === "correto" ? "green" : "red");
    text(feedback === "correto" ? "Resposta correta!" : "Resposta incorreta", width / 2, height - 80);
  }

  // Se o quiz estiver finalizado, exibe o resultado
  if (quizFinished) {
    displayResult();
  }

  // Transição de fade entre perguntas
  if (opacity > 0 && feedback === "") {
    opacity -= opacityChangeRate; // Diminui a opacidade gradualmente para a transição
  }
}

function drawBackground() {
  // Desenhando o fundo do campo e cidade
  noStroke();

  // Campo (lado esquerdo)
  fill(60, 179, 113); // Cor verde para o campo
  rect(0, 0, width / 2, height);  // Divisão do campo

  // Cidade (lado direito)
  fill(169, 169, 169); // Cor cinza para a cidade
  rect(width / 2, 0, width / 2, height);  // Divisão da cidade

  // Desenhando o campo (simples)
  fill(34, 139, 34);
  ellipse(100, height - 50, 200, 100); // Árvores do campo
  fill(139, 69, 19);
  rect(50, height - 50, 40, 60); // Troncos das árvores

  // Desenhando a cidade (simples)
  fill(105, 105, 105);
  rect(width - 150, height - 200, 100, 200);  // Prédio
  rect(width - 250, height - 250, 100, 250);  // Prédio maior
  fill(255);
  rect(width - 150, height - 100, 50, 50);  // Janela no prédio
  rect(width - 250, height - 200, 50, 50);  // Janela no prédio maior
}

function displayQuestion() {
  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];

    // Pergunta centralizada com transição de fade
    textSize(24);
    fill(0, 0, 0, opacity); // Aplica a opacidade nas perguntas
    text(q.question, width / 2, 150);

    // Exibe as opções centralizadas e com mais espaçamento
    for (let i = 0; i < q.options.length; i++) {
      textSize(20);
      fill(0, 0, 0, opacity); // Aplica a opacidade nas opções
      text((i + 1) + ". " + q.options[i], width / 2, 200 + (i * 60)); 
    }
  } else {
    quizFinished = true;
    redraw();
  }
}

function mousePressed() {
  if (quizFinished) {
    // Reiniciar o quiz
    currentQuestion = 0;
    userAnswers = [];
    quizFinished = false;
    feedback = "";
    opacity = 255; // Reinicia a opacidade para 255
    redraw();
  } else {
    let q = questions[currentQuestion];
    let selectedOption = Math.floor((mouseY - 200) / 60); // Ajustando a detecção da opção com o novo espaçamento

    if (selectedOption >= 0 && selectedOption < q.options.length) {
      userAnswers.push(selectedOption); // Armazena a resposta do usuário
      checkAnswer(selectedOption); // Verifica se a resposta está correta
    }
  }
}

function checkAnswer(selectedOption) {
  let q = questions[currentQuestion];
  if (selectedOption === q.answer) {
    feedback = "correto"; // Resposta correta
  } else {
    feedback = "incorreto"; // Resposta incorreta
  }

  // Avança para a próxima pergunta imediatamente
  currentQuestion++;
  opacity = 255; // Resetando a opacidade para a transição da próxima pergunta
  loop(); // Reinicia o loop para atualizar a tela e mostrar a próxima pergunta
}

function displayResult() {
  let score = 0;
  
  // Calcula a pontuação
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Exibe o resultado
  textSize(28);
  fill(0);
  text("Fim do Quiz! Sua pontuação foi: " + score + "/" + questions.length, width / 2, height / 2 - 50);

  textSize(18);
  text("Clique para reiniciar", width / 2, height / 2 + 50);
}
