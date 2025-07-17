// Tela atual: "inicio", "pergunta" ou "resultado"
let tela = "inicio";

// Pergunta que está aparecendo
let perguntaAtual = 0;

// Quantidade de acertos e erros
let acertos = 0;
let erros = 0;

// Lista com as perguntas
let perguntas = [
  "O que significa a conexão entre campo e cidade?",
  "Qual produto geralmente vem do campo para a cidade?",
  "Como a cidade pode ajudar o campo?",
  "Qual é um benefício de valorizar os produtores rurais?",
  "O que o campo precisa da cidade para produzir melhor?",
  "Por que é importante respeitar o meio ambiente no campo e na cidade?",
];

// Lista com as alternativas para cada pergunta
let alternativas = [
  [
    "Troca de saberes e produtos",
    "Separar os dois espaços",
    "Construir muros",
    "Ignorar o outro",
  ],
  ["Leite", "Computador", "Carro", "Roupas"],
  [
    "Com tecnologia e serviços",
    "Com muros e limites",
    "Com isolamento",
    "Com conflitos",
  ],
  [
    "Mais alimentos de qualidade",
    "Menos comida",
    "Preços altos",
    "Desvalorização",
  ],
  [
    "Acesso à educação e internet",
    "Ficar isolado",
    "Menos recursos",
    "Só trabalho manual",
  ],
  [
    "Porque tudo está conectado",
    "Porque só o campo importa",
    "Porque a cidade é maior",
    "Porque é moda",
  ],
];

// Número da alternativa correta para cada pergunta
let corretas = [0, 0, 0, 0, 0, 0];

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);

  if (tela === "inicio") {
    // Mostra a tela inicial com título e instruções
    textSize(28);
    text("🤖 Quiz Agrinho 2025 🤖", width / 2, 100);
    textSize(20);
    text("Tema: Festejando a conexão campo-cidade", width / 2, 150);
    text("Clique para começar", width / 2, 250);
  } else if (tela === "pergunta") {
    mostrarPergunta(); // Mostra pergunta e alternativas
  } else if (tela === "resultado") {
    mostrarResultado(); // Mostra o resultado final
  }
}

// Agora todo controle de clique fica aqui
function mouseClicked() {
  if (tela === "inicio") {
    // Começa o quiz
    perguntaAtual = 0;
    acertos = 0;
    erros = 0;
    tela = "pergunta";
  } else if (tela === "pergunta") {
    // Verifica se clicou em alguma alternativa
    let altY = [170, 220, 270, 320];
    for (let i = 0; i < 4; i++) {
      if (
        mouseX > 150 &&
        mouseX < 450 &&
        mouseY > altY[i] &&
        mouseY < altY[i] + 40
      ) {
        verificarResposta(i);
      }
    }
  }
}

// Verifica resposta e atualiza os pontos
function verificarResposta(escolhida) {
  if (escolhida === corretas[perguntaAtual]) {
    acertos++;
  } else {
    erros++;
  }

  perguntaAtual++;

  if (perguntaAtual >= perguntas.length) {
    tela = "resultado"; // Acabou o quiz, mostra resultado
  }
}

// Mostra a pergunta atual e as alternativas na tela
function mostrarPergunta() {
  fill(0);
  textSize(22);
  text(`Pergunta ${perguntaAtual + 1}`, width / 2, 40);
  textSize(18);
  text(perguntas[perguntaAtual], width / 2, 100);

  let altY = [170, 220, 270, 320]; // posições verticais das alternativas
  let cores = [
    color(100, 180, 255),
    color(255, 150, 150),
    color(150, 255, 150),
    color(255, 220, 100),
  ];
  let letras = ["A", "B", "C", "D"];

  for (let i = 0; i < 4; i++) {
    fill(cores[i]);
    rect(150, altY[i], 300, 40, 10); // Desenha botão da alternativa
    fill(0);
    textSize(18);
    text(
      `${letras[i]}) ${alternativas[perguntaAtual][i]}`,
      width / 2,
      altY[i] + 20
    );
  }
}

// Mostra o resultado do quiz na tela
function mostrarResultado() {
  textSize(26);
  fill(0);
  text("🎉 Quiz Finalizado! 🎉", width / 2, 80);
  textSize(20);
  text("Acertos: " + acertos, width / 2, 150);
  text("Erros: " + erros, width / 2, 190);
  textSize(16);
  text("Clique para jogar novamente", width / 2, 260);
}

// Reinicia o quiz ao clicar na tela de resultado
function mouseReleased() {
  if (tela === "resultado") {
    perguntaAtual = 0;
    acertos = 0;
    erros = 0;
    tela = "inicio";
  }
}
