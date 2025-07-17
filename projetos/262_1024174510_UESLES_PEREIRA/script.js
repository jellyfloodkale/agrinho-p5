const quizContainer = document.getElementById('quizContainer');
const timerScore = document.getElementById('timerScore');
const scoreDisplay = document.getElementById('scoreDisplay');
const startBtn = document.getElementById('startBtn');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 14;
let timerInterval;

const questions = [
  {
    question: "Por que a agricultura familiar é importante para a cidade?",
    options: [
      "Porque ela gera poluição", 
      "Porque depende de tecnologia urbana", 
      "Porque abastece os centros urbanos com alimentos frescos", 
      "Porque só exporta produtos", 
      "Porque ocupa grandes áreas", 
      "Porque usa agrotóxicos"
    ],
    answer: 2
  },
  {
    question: "Qual é a principal relação entre o campo e a cidade?",
    options: [
      "Competição por espaço", 
      "Troca de recursos e produtos", 
      "Rivalidade econômica", 
      "Independência total", 
      "Isolamento cultural", 
      "Desconexão produtiva"
    ],
    answer: 1
  },
  {
    question: "O que a cidade oferece ao campo?",
    options: [
      "Alimentos", 
      "Tecnologia, serviços e mercado consumidor", 
      "Pecuária", 
      "Espaço para cultivo", 
      "Fertilizantes naturais", 
      "Ar puro"
    ],
    answer: 1
  },
  {
    question: "O que pode fortalecer a conexão entre campo e cidade?",
    options: [
      "Desmatamento", 
      "Importação de alimentos", 
      "Investimentos em infraestrutura rural", 
      "Fechamento de estradas", 
      "Conflitos entre produtores", 
      "Poluição do ar"
    ],
    answer: 2
  },
  {
    question: "Qual é uma consequência da falta de conexão entre campo e cidade?",
    options: [
      "Melhora no transporte público", 
      "Aumento da produção agrícola", 
      "Desabastecimento e desigualdades", 
      "Preservação do meio ambiente", 
      "Acesso facilitado à saúde", 
      "Promoção da justiça social"
    ],
    answer: 2
  },
  {
    question: "Qual desses é um produto típico da zona rural consumido na cidade?",
    options: [
      "Software", 
      "Combustível", 
      "Leite", 
      "Celular", 
      "Notebook", 
      "Internet"
    ],
    answer: 2
  },
  {
    question: "Como a produção rural afeta a vida urbana?",
    options: [
      "Produz entretenimento", 
      "Abastece a cidade com alimentos e matérias-primas", 
      "Promove turismo internacional", 
      "Depende da internet urbana", 
      "Influencia na moda", 
      "Impede o transporte público"
    ],
    answer: 1
  },
  {
    question: "Qual setor urbano mais depende do campo?",
    options: [
      "Moda", 
      "Educação", 
      "Alimentação", 
      "Tecnologia", 
      "Construção civil", 
      "Turismo"
    ],
    answer: 2
  },
  {
    question: "O que facilita o escoamento da produção agrícola?",
    options: [
      "Falta de estradas", 
      "Péssima logística", 
      "Infraestrutura de transporte eficiente", 
      "Uso de carroças", 
      "Acesso restrito ao campo", 
      "Alta tributação"
    ],
    answer: 2
  },
  {
    question: "Por que é importante valorizar o trabalhador rural?",
    options: [
      "Para aumentar impostos", 
      "Para reduzir a produção", 
      "Porque ele garante o alimento diário na cidade", 
      "Para diminuir o consumo", 
      "Para ocupar mais áreas urbanas", 
      "Para evitar o uso de máquinas"
    ],
    answer: 2
  },
  {
    question: "O que é agricultura sustentável?",
    options: [
      "Uso excessivo de veneno", 
      "Produção voltada para exportação", 
      "Prática que respeita o meio ambiente e a sociedade", 
      "Queimada de florestas", 
      "Uso exclusivo de máquinas", 
      "Produção sem mão de obra"
    ],
    answer: 2
  },
  {
    question: "Qual o papel das feiras livres na conexão campo-cidade?",
    options: [
      "Vendam apenas produtos importados", 
      "Substituem os supermercados", 
      "Aproximam produtores e consumidores", 
      "São ilegais", 
      "Desvalorizam o campo", 
      "Criam conflito entre produtores"
    ],
    answer: 2
  },
  {
    question: "Como o campo contribui para a segurança alimentar nas cidades?",
    options: [
      "Com produtos industrializados", 
      "Com comida enlatada", 
      "Com produção local de alimentos saudáveis", 
      "Com transporte público", 
      "Com softwares agrícolas", 
      "Com mecanização total"
    ],
    answer: 2
  },
  {
    question: "Qual dessas atitudes fortalece a conexão campo-cidade?",
    options: [
      "Ignorar o pequeno agricultor", 
      "Valorizar produtos locais e regionais", 
      "Fechar estradas vicinais", 
      "Importar todo alimento", 
      "Centralizar produção nas capitais", 
      "Diminuir acesso à zona rural"
    ],
    answer: 1
  },
  {
    question: "O que pode prejudicar a relação entre campo e cidade?",
    options: [
      "Feiras locais", 
      "Alimentos orgânicos", 
      "Falta de políticas públicas para o campo", 
      "Agricultura familiar", 
      "Mercados municipais", 
      "Apoio técnico ao produtor"
    ],
    answer: 2
  },
  {
    question: "O que significa êxodo rural?",
    options: [
      "Urbanização das fazendas", 
      "Fuga de animais", 
      "Migração do campo para a cidade", 
      "Criação de cidades no campo", 
      "Turismo rural", 
      "Plantação em áreas urbanas"
    ],
    answer: 2
  },
  {
    question: "Qual a importância do transporte para a conexão campo-cidade?",
    options: [
      "Impede o acesso urbano", 
      "Gera desemprego rural", 
      "Facilita o escoamento da produção e acesso a serviços", 
      "Substitui a produção agrícola", 
      "Incentiva o desmatamento", 
      "Não tem relevância"
    ],
    answer: 2
  },
  {
    question: "Como as cidades podem ajudar o desenvolvimento do campo?",
    options: [
      "Fechando mercados locais", 
      "Criando zonas de exclusão", 
      "Investindo em educação e saúde rural", 
      "Impedindo a venda direta", 
      "Importando alimentos", 
      "Diminuindo o uso da terra"
    ],
    answer: 2
  },
  {
    question: "O que é o agroturismo?",
    options: [
      "Viagem urbana", 
      "Turismo feito exclusivamente nas capitais", 
      "Atividade turística realizada em áreas rurais", 
      "Viagem para centros industriais", 
      "Trabalho em indústrias", 
      "Turismo internacional"
    ],
    answer: 2
  },
  {
    question: "Qual dessas alternativas representa um produto da agricultura familiar?",
    options: [
      "Smartphone", 
      "Petróleo", 
      "Queijo artesanal", 
      "Roupas importadas", 
      "Gasolina", 
      "Computadores"
    ],
    answer: 2
  }
];

function shuffle(array) {
  for(let i = array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 14;
  scoreDisplay.textContent = `Pontuação: ${score}`;
  
  // Mostrar pontuação e timer ao iniciar
  scoreDisplay.classList.remove('hidden');
  timerScore.classList.remove('hidden');

  startBtn.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  shuffle(questions);
  showQuestion();
  startTimer();
}

function showQuestion() {
  clearInterval(timerInterval);
  timeLeft = 14;
  updateTimer();

  const q = questions[currentQuestionIndex];
  quizContainer.innerHTML = `<h3>${q.question}</h3>`;

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    quizContainer.appendChild(btn);
  });
}

function updateTimer() {
  timerScore.textContent = `Tempo: ${timeLeft}s`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if(timeLeft <= 0){
      clearInterval(timerInterval);
      timerScore.textContent = `TEMPO ESGOTADO!!!`;
      markWrong();
      setTimeout(nextQuestion, 1500);
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval);
  const q = questions[currentQuestionIndex];

  if(selectedIndex === q.answer){
    markCorrect();
    if(timeLeft >= 7){
      score += 6;
    }
  } else {
    markWrong();
    score -= 3;
    if(score < 0) score = 0;
  }

  scoreDisplay.textContent = `Pontuação: ${score}`;
  setTimeout(nextQuestion, 1000);
}

function markCorrect() {
  document.body.classList.add('correto');
  setTimeout(() => {
    document.body.classList.remove('correto');
  }, 1000);
}

function markWrong() {
  document.body.classList.add('errado');
  setTimeout(() => {
    document.body.classList.remove('errado');
  }, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if(currentQuestionIndex >= questions.length){
    endQuiz();
  } else {
    showQuestion();
    startTimer();
  }
}

function endQuiz() {
  quizContainer.innerHTML = `
    <h3>Quiz finalizado!</h3>
    <p>Sua pontuação final foi: <strong>${score}</strong></p>
    <button id="startBtn">Reiniciar Quiz</button>
  `;
  scoreDisplay.textContent = `Pontuação: ${score}`;
  document.getElementById('startBtn').addEventListener('click', startQuiz);
}

startBtn.addEventListener('click', startQuiz);
