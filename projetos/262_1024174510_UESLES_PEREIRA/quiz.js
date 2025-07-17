const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const timeoutMsg = document.getElementById('timeout-msg');

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 14;

const questions = [
  {
    question: "O que representa a conexão campo-cidade?",
    options: [
      "A relação econômica, social e cultural entre áreas rurais e urbanas.",
      "A separação completa entre campo e cidade.",
      "Um tipo de cultivo agrícola específico.",
      "A urbanização exclusiva de áreas rurais.",
      "A imigração para países estrangeiros.",
      "Um método de construção civil."
    ],
    answer: 0
  },
  {
    question: "Qual o papel da agricultura para as cidades?",
    options: [
      "Fornecer alimentos frescos e garantir a segurança alimentar.",
      "Criar áreas industriais.",
      "Reduzir a população urbana.",
      "Aumentar a poluição do ar.",
      "Incentivar o comércio exterior.",
      "Desenvolver tecnologias espaciais."
    ],
    answer: 0
  },
  {
    question: "Como a cidade influencia o campo?",
    options: [
      "Oferece mercados para os produtos rurais.",
      "Diminui a produção agrícola.",
      "Proíbe a agricultura sustentável.",
      "Causa desmatamento nas cidades.",
      "Promove o isolamento rural.",
      "Limita o acesso à internet no campo."
    ],
    answer: 0
  },
  {
    question: "O que é o êxodo rural?",
    options: [
      "Movimento de pessoas do campo para a cidade.",
      "Retorno dos habitantes urbanos ao campo.",
      "Crescimento das áreas rurais.",
      "Exportação de produtos agrícolas.",
      "Construção de novas cidades no campo.",
      "Aumento da produção agrícola."
    ],
    answer: 0
  },
  {
    question: "Por que a conexão campo-cidade é importante?",
    options: [
      "Porque promove o desenvolvimento econômico e social integrado.",
      "Porque elimina o campo.",
      "Porque impede a urbanização.",
      "Porque reduz a agricultura familiar.",
      "Porque promove o isolamento do campo.",
      "Porque aumenta o desemprego na cidade."
    ],
    answer: 0
  },
  {
    question: "Quais produtos do campo são essenciais para as cidades?",
    options: [
      "Alimentos como frutas, legumes e grãos.",
      "Equipamentos eletrônicos.",
      "Produtos manufaturados.",
      "Automóveis.",
      "Tecnologia da informação.",
      "Roupas de marca."
    ],
    answer: 0
  },
  {
    question: "Como o transporte influencia a conexão campo-cidade?",
    options: [
      "Facilita a circulação de pessoas e mercadorias entre os dois locais.",
      "Dificulta o comércio entre campo e cidade.",
      "Aumenta os preços dos alimentos.",
      "Isola as áreas rurais.",
      "Impedem a agricultura sustentável.",
      "Diminuem a produção industrial."
    ],
    answer: 0
  },
  {
    question: "O que são áreas periurbanas?",
    options: [
      "Zonas de transição entre o campo e a cidade.",
      "Grandes centros urbanos.",
      "Regiões exclusivamente rurais.",
      "Áreas totalmente industrializadas.",
      "Locais sem relação com o campo.",
      "Regiões agrícolas isoladas."
    ],
    answer: 0
  },
  {
    question: "Qual o impacto da urbanização no campo?",
    options: [
      "Redução de áreas agrícolas devido à expansão urbana.",
      "Aumento da produção agrícola.",
      "Desenvolvimento exclusivo do campo.",
      "Isolamento das cidades.",
      "Melhoria da qualidade do ar no campo.",
      "Aumento do turismo rural."
    ],
    answer: 0
  },
  {
    question: "Como a tecnologia afeta a conexão campo-cidade?",
    options: [
      "Melhora a comunicação e produção agrícola.",
      "Isola ainda mais o campo.",
      "Substitui completamente a agricultura.",
      "Impede o transporte de produtos.",
      "Diminui a qualidade dos alimentos.",
      "Elimina a necessidade da cidade."
    ],
    answer: 0
  },
  {
    question: "O que é agricultura familiar?",
    options: [
      "Produção agrícola feita por famílias, geralmente de forma sustentável.",
      "Grandes fazendas industriais.",
      "Agricultura feita somente para exportação.",
      "Produção agrícola urbana.",
      "Agricultura exclusiva para consumo da cidade.",
      "Produção sem uso de tecnologia."
    ],
    answer: 0
  },
  {
    question: "Qual a relação entre a indústria e o campo?",
    options: [
      "A indústria transforma produtos agrícolas para consumo urbano.",
      "A indústria impede a produção rural.",
      "Não há relação entre eles.",
      "A indústria é feita só na zona rural.",
      "A indústria substitui a agricultura.",
      "A indústria produz alimentos no campo."
    ],
    answer: 0
  },
  {
    question: "Qual a importância da sustentabilidade na conexão campo-cidade?",
    options: [
      "Garantir que o desenvolvimento preserve os recursos naturais.",
      "Aumentar o uso de agrotóxicos.",
      "Expandir as cidades sem planejamento.",
      "Eliminar a agricultura familiar.",
      "Construir fábricas no campo.",
      "Impulsionar a poluição urbana."
    ],
    answer: 0
  },
  {
    question: "Como o turismo rural contribui para a conexão campo-cidade?",
    options: [
      "Aumenta a renda e valoriza a cultura local.",
      "Diminui a produção agrícola.",
      "Isola as áreas urbanas.",
      "Desenvolve somente a indústria urbana.",
      "Reduz a população no campo.",
      "Afeta negativamente o meio ambiente urbano."
    ],
    answer: 0
  },
  {
    question: "O que é a migração reversa?",
    options: [
      "Movimento de pessoas da cidade para o campo.",
      "Deslocamento das pessoas para o exterior.",
      "Êxodo rural tradicional.",
      "Aumento da urbanização.",
      "Isolamento das áreas rurais.",
      "Migração entre cidades grandes."
    ],
    answer: 0
  },
  {
    question: "Como a educação pode fortalecer a conexão campo-cidade?",
    options: [
      "Capacitando produtores rurais e promovendo conhecimento nas cidades.",
      "Incentivando o abandono do campo.",
      "Diminuição da escolarização nas cidades.",
      "Separando escolas rurais e urbanas.",
      "Reduzindo investimentos em educação.",
      "Focando só na indústria urbana."
    ],
    answer: 0
  },
  {
    question: "Qual o papel dos mercados locais na conexão campo-cidade?",
    options: [
      "Facilitar a venda direta dos produtos rurais para os consumidores urbanos.",
      "Inibir a comercialização de produtos rurais.",
      "Concentrar vendas apenas em grandes cidades.",
      "Diminuir o consumo de alimentos naturais.",
      "Estimular a importação de alimentos.",
      "Reduzir a variedade de produtos disponíveis."
    ],
    answer: 0
  },
  {
    question: "Por que é importante a infraestrutura nas regiões rurais?",
    options: [
      "Para melhorar o transporte, comunicação e qualidade de vida.",
      "Para limitar o acesso à cidade.",
      "Para aumentar o isolamento rural.",
      "Para impedir a produção agrícola.",
      "Para focar só no desenvolvimento urbano.",
      "Para reduzir o uso da terra."
    ],
    answer: 0
  },
  {
    question: "Qual o impacto da industrialização nas áreas rurais?",
    options: [
      "Pode gerar empregos e estimular a economia local.",
      "Sempre destrói o campo.",
      "Não tem impacto algum.",
      "Diminui a produção de alimentos.",
      "Faz desaparecer as cidades.",
      "Reduz o comércio entre campo e cidade."
    ],
    answer: 0
  },
  {
    question: "O que significa desenvolvimento integrado na conexão campo-cidade?",
    options: [
      "Planejamento que considera o crescimento conjunto das áreas rurais e urbanas.",
      "Separação total entre campo e cidade.",
      "Expansão só da zona urbana.",
      "Foco exclusivo na agricultura industrial.",
      "Isolamento das comunidades rurais.",
      "Concentração da população nas cidades."
    ],
    answer: 0
  }
];

// Funções de embaralhar, iniciar quiz, mostrar perguntas, timer e outros

function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let questionsShuffled = [];

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  startBtn.style.display = 'none';
  quizContainer.classList.remove('hidden');
  score = 0;
  currentQuestionIndex = 0;
  scoreEl.textContent = `Pontuação: ${score}`;
  timeoutMsg.textContent = '';
  quizContainer.style.backgroundColor = 'white';

  questionsShuffled = [...questions];
  shuffleArray(questionsShuffled);
  questionsShuffled = questionsShuffled.slice(0, 20);

  showQuestion();
}

function showQuestion() {
  clearTimeout(timerInterval);
  timeoutMsg.textContent = '';
  timeLeft = 14;
  timerEl.textContent = `Tempo: ${timeLeft}`;

  const current = questionsShuffled[currentQuestionIndex];
  questionEl.textContent = current.question;

  // Embaralhar opções
  let optionsShuffled = current.options.map((opt, i) => ({opt, index: i}));
  shuffleArray(optionsShuffled);

  optionsEl.innerHTML = '';
  optionsShuffled.forEach(({opt, index}) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = opt;
    btn.dataset.index = index;
    btn.addEventListener('click', selectOption);
    optionsEl.appendChild(btn);
  });

  resetBackground();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Tempo: ${timeLeft}`;
    if(timeLeft <= 0){
      clearInterval(timerInterval);
      timeoutMsg.textContent = 'TEMPO ESGOTADO!!!';
      score = Math.max(0, score - 3);
      scoreEl.textContent = `Pontuação: ${score}`;
      disableOptions();
      setTimeout(() => {
        timeoutMsg.textContent = '';
        nextQuestion();
      }, 1500);
    }
  }, 1000);
}

function disableOptions() {
  [...optionsEl.children].forEach(btn => btn.disabled = true);
}

function selectOption(e) {
  clearInterval(timerInterval);
  disableOptions();

  const selectedBtn = e.target;
  const selectedIndex = parseInt(selectedBtn.dataset.index);
  const current = questionsShuffled[currentQuestionIndex];

  if(selectedIndex === current.answer){
    selectedBtn.classList.add('correct');
    quizContainer.style.backgroundColor = '#4caf50';
    if(timeLeft >= 7){
      score += 6;
    } else {
      score = Math.max(0, score - 3);
    }
  } else {
    selectedBtn.classList.add('incorrect');
    quizContainer.style.backgroundColor = '#e63946';
    showCorrectAnswer();
    score = Math.max(0, score - 3);
  }

  scoreEl.textContent = `Pontuação: ${score}`;
  timeoutMsg.textContent = '';

  setTimeout(() => {
    quizContainer.style.backgroundColor = 'white';
    nextQuestion();
  }, 1500);
}

function showCorrectAnswer() {
  const current = questionsShuffled[currentQuestionIndex];
  [...optionsEl.children].forEach(btn => {
    if(parseInt(btn.dataset.index) === current.answer){
      btn.classList.add('correct');
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questionsShuffled.length){
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionEl.textContent = `Fim do Quiz! Sua pontuação final é: ${score}`;
  optionsEl.innerHTML = '';
  timerEl.textContent = '';
  timeoutMsg.textContent = '';
  startBtn.style.display = 'inline-block';
  startBtn.textContent = 'Reiniciar Quiz';
  quizContainer.classList.add('hidden');
  quizContainer.style.backgroundColor = 'white';
}

function resetBackground() {
  quizContainer.style.backgroundColor = 'white';
}
