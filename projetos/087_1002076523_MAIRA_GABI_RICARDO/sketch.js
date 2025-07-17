
let questoes = [
  {
    pergunta: "Quala principal proteína encontrada no ovo?",
    opcoes: ["Albumina", "Caseína", "Colágeno", "Fibra"],
    correta: 0
  },
  {
    pergunta: "De onde surge os avos que comemos no dia a dia?",
    opcoes: [" Ganso", "Galinha", "Pato", "Codorna"],
    correta: 1
  },
  {
    pergunta: "Qual a parte do ovo que contém a mais vitaminas e minerais??",
    opcoes: ["Clara", "Gema", "Casca", " Membrana"],
    correta: 0
  },
  {
    pergunta: "O que determina a cor da casca do ovo?" ,
    opcoes: ["A alimentação da galinha", "O tipo de criação da galinha", "A idade da galinha ", "A linhagem da galinha"],
    correta: 0
  },
  {
    pergunta: "Qual a função da câmara de ar no ovo?",
    opcoes: ["Facilitar a respiração do embrião", "Manter o ovo fresco", "Evitar a entrada de microrganismos ", "Proteger a gema"],
    correta: 0
  },
  {
    pergunta: "O que acontece com o ovo à medida que envelhece?" ,
    opcoes: ["A gema fica mais consistente e a clara mais líquida ", "A casca fica mais dura", "A câmara de ar diminui ", "A clara fica mais consistente e a gema mais líquida"],
    correta: 0
  },
  {
    pergunta: "O que estimula a produção de ovos nas galinhas? ",
    opcoes: ["A) Comida quente ", "B) Exposição à luz", "C) Exercício diário","D) Água fria", ],
    correta: 1
  },
  {
    pergunta: " Qual o tempo de armazenamento ideal para um ovo?",
    opcoes: ["60 dias", "30 dias", "90 dias", "120 dias"],
    correta: 1
  },
  {
    pergunta: "Nos ovos heterolécitos, ocorre a formação do polo vegetativo e do polo animal. Sobre esse ovo, marque a alternativa incorreta.",
    opcoes: [
      "Anfíbios apresentam ovos heterolécitos.",
      "Ovos heterolécitos também são chamados de mesolécitos.",
      "No polo animal, encontra-se uma maior quantidade de vitelo que no polo vegetativo.",
      "No ovo heterolécito, observa-se uma distribuição desigual do vitelo.",
    ],
    correta: 2
  },
  {
    pergunta: "Como saber se um ovo está fresco? ",
    opcoes: ["Colocando-o em água", "Observando a cor da casca", "Aferindo o seu peso ", "Tocando-o para ver se está duro"],
    correta: 0
  }
];

let questaoAtual = 0;
let pontuacao = 0;
let resultado = "";
let quizFinalizado = false;

function setup() {
  createCanvas(700, 500);
  textSize(20);
}

function draw() {
  background(230);
  fill(0);

  if (quizFinalizado) {
    text("🎉 Quiz Finalizado!", 50, 50);
    text("Pontuação: " + pontuacao + " de " + questoes.length, 50, 100);
    text("Obrigado por participar!", 50, 150);
   
    textSize(16);
    fill(50);
    text("Fontes utilizadas como apoio:", 50, 220);
    text("- ChatGPT (Inteligência Artificial)", 50, 250);
    text("- Enciclopédia Humanidades (enciclopediahumanidades.org)", 50, 310);
    return;
  }

  let q = questoes[questaoAtual];
  text("Pergunta " + (questaoAtual + 1) + ": " + q.pergunta, 50, 50);

  for (let i = 0; i < q.opcoes.length; i++) {
    fill(200);
    rect(50, 100 + i * 60, 600, 50, 10);
    fill(0);
    text(q.opcoes[i], 60, 130 + i * 60);
  }

  fill(0);
  text(resultado, 50, 450);
}

function mousePressed() {
  if (quizFinalizado) return;

  let q = questoes[questaoAtual];
  for (let i = 0; i < q.opcoes.length; i++) {
    let x = 50;
    let y = 100 + i * 60;
    let w = 600;
    let h = 50;
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      if (i === q.correta) {
        pontuacao++;
        resultado = "✅ Correto!";
      } else {
        resultado = "❌ Errado. Resposta correta: " + q.opcoes[q.correta];
      }

      setTimeout(() => {
        resultado = "";
        questaoAtual++;
        if (questaoAtual >= questoes.length) {
          quizFinalizado = true;
        }
      }, 1000);
    }
  }
}