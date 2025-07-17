

const niveis = 
      [
  [ {
    question: "O que o campo mais exporta para a cidade?",
    answers: [
      
      { option: "roupa", correct: false },
      { option: "petroleo", correct: false },
      { option: "alimentos", correct: true }
    ]
  },
   {
    question: "O campo é importante pra cidade?",
    answers: [
      { option: "sim", correct: true },
      { option: "não", correct: false },
      { option: "talvez", correct: false }
    ]
  },
    {
    question: "Qual festa surgiu no campo e foi urbanizada?",
    answers: [
      
      { option: "Balada", correct: false },
      { option: "Festa Junina", correct: true },
      { option: "Rave", correct: false }
    ]
  },
   {
    question: "O que é o êxodo rural?",
    answers: [
      { option: "Uma coisa doida", correct: false },
      {
        option:
          "Migração do campo para a cidade por melhores condições de vida",
        correct: true
      },
      { option: "Migração para outro país", correct: false },
      { option: "Venda para um vizinho", correct: false }
    ]
  },
    {
  question: "Qual profissão é mais comum no campo?",
  answers: [
    
    
    { option: "Programador", correct: false },
    { option: "Piloto", correct: false },
    { option: "Agricultor", correct: true }
  ]
}    /* fase 1 - 5 perguntas */ ],
    
        
  [  {
  question: "O que a cidade fornece para o campo?",
  answers: [
    { option: "Tecnologia e serviços", correct: true },
    { option: "Grãos e leite", correct: false },
    { option: "Animais de fazenda", correct: false }
  ]
},
  {
  question: "O que é agricultura familiar?",
  answers: [
    { option: "Produção feita por famílias no campo", correct: true },
     { option: "Tipo de comida servida na cidade", correct: false },
    { option: "Festa com a família no campo", correct: false }
   
  ]
},
   

{
  question: "Qual é um exemplo de produto típico do campo?",
  answers: [
    { option: "Leite", correct: true },
    { option: "Computador", correct: false },
    { option: "Ônibus", correct: false }
  ]
},
{
  question: "Qual é uma vantagem de morar no campo?",
  answers: [
    
    { option: "Trânsito intenso", correct: false },
    { option: "Contato com a natureza", correct: true },
    { option: "Prédios altos", correct: false }
  ]
},
{
  question: "O que as pessoas do campo compram da cidade?",
  answers: [
    
    { option: "Árvores e bois", correct: false },
    { option: "Sementes naturais", correct: false },
    { option: "Medicamentos e ferramentas", correct: true }
  ]
},  /* fase 2 - 5 perguntas */ ],
  [ 
    {
  question: "Como o transporte ajuda na ligação entre campo e cidade?",
  answers: [
    { option: "Leva os produtos do campo para a cidade", correct: true },
    { option: "Serve apenas para passear", correct: false },
    { option: "Ajuda a construir prédios altos", correct: false }
  ]
},
{
  question: "Qual é um desafio enfrentado por quem vive no campo?",
  answers: [
    
    { option: "Falta de natureza", correct: false },
    { option: "Acesso a escolas e hospitais", correct: true },
    { option: "Excesso de barulho", correct: false }
  ]
},
{
  question: "O que significa sustentabilidade no campo?",
  answers: [
    { option: "Produzir sem prejudicar a natureza", correct: true },
    { option: "Produzir o máximo possível", correct: false },
    { option: "Usar veneno em todas as plantações", correct: false }
  ]
},
{
  question: "Por que a Festa Junina é importante para o campo?",
  answers: [
   
    { option: "É a única festa do ano", correct: false },
    { option: "Só tem na cidade", correct: false },
     { option: "Valoriza tradições e cultura rural", correct: true }
  ]
},
{
  question: "Qual dessas profissões depende da produção do campo?",
  answers: [
    
    { option: "Piloto de avião", correct: false },
    { option: "Astronauta", correct: false },
    { option: "Cozinheiro", correct: true }
  ]
},
{
  question: "Como podemos valorizar o campo mesmo morando na cidade?",
  answers: [
   
    { option: "Jogando lixo no chão", correct: false },
     { option: "Consumindo alimentos locais e respeitando o meio ambiente", correct: true },
    { option: "Evitando visitar o campo", correct: false }
  ]
},
  
  {
    question: "Qual é a relação entre campo e cidade?",
    answers: [
      {
        option:
          "São interdependentes: o campo fornece alimentos e a cidade serviços",
        correct: true
      },
      {
        option: "Eles não se ajudam e vivem separados",
        correct: false
      }
    ]
  }  /* fase 3 - 7 perguntas */ 
  ]
];
      

let somAcerto, somErro, somGanhou, somGameOver, intro, vitoria_final;
  let currentIndex = 0;
let questionsCorrect = 0;
let imgTelaIntro;
let opacidadeIntro = 255;
let estado = "intro";
let titulo, finishText, btnRestart, btnComecar;
let nivelAtual = 0;
let questions = [];
let imagemTrofeu;

function preload(){
  
  somAcerto = loadSound('acerto.mp3');
  somErro = loadSound('erro.mp3');
  somGanhou = loadSound('finish.mp3'); // som de vitória
  somGameOver = loadSound('game_over.mp3'); // som de derrota
  somIntro = loadSound ('intro.mp3'); //som de introdução
  imagemIntro = loadImage ('tela_intro.png');//imagem de introdução
  somVitoriaFinal = loadSound ('vitoria_final.mp3');
  imagemTrofeu = loadImage('trofeu.png'); 
}

function setup() {
  noCanvas();
   
  
   // Espera o primeiro clique para liberar o som (exigência do navegador)
  userStartAudio().then(() => {
    somIntro.play();
  });
  
  imgTelaIntro = createImg('tela_intro.png', 'Imagem de introdução');
  imgTelaIntro.size(windowWidth * 0.9, windowHeight * 0.9);
  imgTelaIntro.position(windowWidth * 0.05, windowHeight * 0.05);
  imgTelaIntro.style('z-index', '-1');
  imgTelaIntro.style('opacity', '1');
  
 btnComecar = createButton("COMEÇAR");
 btnComecar.position(windowWidth / 2 - 100, windowHeight - 130);
 btnComecar.size(200, 60); // botão maior
 btnComecar.mousePressed(iniciarQuiz);

 btnComecar.style("font-size", "24px");
 btnComecar.style("font-weight", "bold");
 btnComecar.style("padding", "12px 24px");
 btnComecar.style("background-color", "#ffffff");
 btnComecar.style("border", "3px solid #004466");
 btnComecar.style("border-radius", "16px");
 btnComecar.style("cursor", "pointer");
 btnComecar.style("box-shadow", "0px 4px 12px rgba(0,0,0,0.3)");
 btnComecar.style("z-index", "10");
  
  }


function iniciarQuiz() {
  estado = "fadeout";

  // inicia o fade da imagem de fundo
  let fadeInterval = setInterval(() => {
    opacidadeIntro -= 10;
    imgTelaIntro.style('opacity', opacidadeIntro / 255);

    if (opacidadeIntro <= 0) {
      clearInterval(fadeInterval);
      imgTelaIntro.remove(); // remove do DOM
      somIntro.stop();
      btnComecar.remove();
      comecarQuiz();
    }
  }, 40); // mais rápido = transição mais fluida
}

function loadQuestion() {
  
  
  clearElements();

  createP(`${currentIndex + 1}/${questions.length}`).id("progress");

  const container = createDiv().id("question-container");

  const pergunta = createElement("h3", questions[currentIndex].question);
  pergunta.parent(container);

  questions[currentIndex].answers.forEach((ans) => {
    const btn = createButton(ans.option);
    btn.class("answer");
    btn.attribute("data-correct", ans.correct);
    btn.mousePressed(function () {
  handleAnswer(this, ans.correct);
      });
    btn.parent(container);
  });
}

function handleAnswer(botaoClicado, correct) {
  selectAll(".answer").forEach((btn) => {
    btn.attribute("disabled", true);
  });

  if (correct) {
    questionsCorrect++;
    somAcerto.play();
    botaoClicado.style("background-color", "#c8f7c5");
    botaoClicado.style("border-color", "#27ae60");
    mostrarEfeitoFlutuante("✔️", "#27ae60");
    
  } else {
    somErro.play();
    botaoClicado.style("background-color", "#f7c5c5");
    botaoClicado.style("border-color", "#e74c3c");
    mostrarEfeitoFlutuante("❌", "#e74c3c");

    selectAll(".answer").forEach((btn) => {
      if (btn.elt.getAttribute("data-correct") === "true") {
        btn.style("background-color", "#c8f7c5");
        btn.style("border-color", "#27ae60");
      }
    });
  }

  setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  clearElements();

  const resultado = `Você acertou ${questionsCorrect} de ${questions.length} perguntas!`;
  finishText.html(resultado);
  finishText.show();

  setTimeout(() => {
    if (questionsCorrect >= 3) {
      if (nivelAtual < niveis.length - 1) {
        // 🟢 Vitória intermediária - sobe de nível
        nivelAtual++;
        questions = niveis[nivelAtual];
        currentIndex = 0;
        questionsCorrect = 0;
        finishText.html("🎉 Subindo de nível!").style("color", "#006600");
        somGanhou.play(); // apenas o som normal de vitória
        setTimeout(() => {
          finishText.hide();
          loadQuestion();
        }, 2000);
      } else {
        // 🏆 Vitória final
        finishText.html("🏆 Parabéns, você venceu todos os níveis!");
        efeitoVitoria();
        somVitoriaFinal.play(); // som exclusivo para o final
        btnRestart.show();
      }
    } else {
      // ❌ Derrota
      finishText.html("😢 Você não atingiu a pontuação mínima.");
      efeitoDerrota();
      somGameOver.play();
      btnRestart.show();
    }
  }, 2000);
}

function showLevelUp(callback) {
  const aviso = createDiv("🌟 Subindo de Nível! 🌟");
  aviso.style('position', 'absolute');
  aviso.style('top', '50%');
  aviso.style('left', '50%');
  aviso.style('transform', 'translate(-50%, -50%)');
  aviso.style('font-size', '48px');
  aviso.style('color', '#004466');
  aviso.style('background', '#ffffff');
  aviso.style('padding', '20px 40px');
  aviso.style('border-radius', '20px');
  aviso.style('box-shadow', '0 0 20px rgba(0,0,0,0.4)');
  aviso.style('z-index', '1000');

  setTimeout(() => {
    aviso.remove();
    if (callback) callback(); // chama a próxima ação
  }, 2000);
}

function mostrarTroféuFinal() {
  const telaFinal = createDiv("Parabéns! Você venceu todos os níveis!");
  telaFinal.style('position', 'absolute');
  telaFinal.style('top', '30%');
  telaFinal.style('left', '50%');
  telaFinal.style('transform', 'translateX(-50%)');
  telaFinal.style('font-size', '36px');
  telaFinal.style('color', '#004466');
  telaFinal.style('background', '#fff');
  telaFinal.style('padding', '20px 40px');
  telaFinal.style('border-radius', '20px');
  telaFinal.style('box-shadow', '0 0 20px rgba(0,0,0,0.4)');
  telaFinal.style('z-index', '1000');
  telaFinal.style('text-align', 'center');

  const trofeu = createImg('trofeu.png', 'Troféu');
  trofeu.size(150, 150);
  trofeu.position(windowWidth / 2 - 75, windowHeight / 2 - 50);
  trofeu.style('z-index', '1000');
  trofeu.style('transition', 'transform 0.5s');
  trofeu.style('transform', 'scale(0.1)');

  setTimeout(() => {
    trofeu.style('transform', 'scale(1)');
  }, 100);

  somVitoriaFinal.play();

  btnRestart.show();
}

function restartQuiz() {
  nivelAtual = 0;
  questions = niveis[nivelAtual];
  currentIndex = 0;
  questionsCorrect = 0;
  finishText.hide();
  btnRestart.hide();
  loadQuestion();
}

function clearElements() {
  selectAll("p").forEach((el) => el.remove());
  selectAll("h3").forEach((el) => el.remove());
  selectAll(".answer").forEach((el) => el.remove());
   selectAll("#question-container").forEach((el) => el.remove()); 
}

function comecarQuiz() {
  titulo = createElement("h1", "Quiz: Campo e Cidade");
  titulo.id("titulo");

  finishText = createElement("h2", "");
  finishText.id("finishText");
  finishText.hide();

  btnRestart = createButton("Reiniciar");
  btnRestart.mousePressed(restartQuiz);
  btnRestart.hide();
  
  questions = niveis[nivelAtual];

  loadQuestion();
}

function mostrarEfeitoFlutuante(simbolo, cor) {
  const efeito = createDiv(simbolo);
  efeito.style('position', 'absolute');
  efeito.style('font-size', '48px');
  efeito.style('color', cor);
  efeito.style('z-index', '1000');
  efeito.position(windowWidth / 2 - 20, windowHeight / 2);

  let y = windowHeight / 2;
  let opacidade = 255;

  const animacao = setInterval(() => {
    y -= 2;
    opacidade -= 10;
    efeito.position(windowWidth / 2 - 20, y);
    efeito.style('opacity', opacidade / 255);

    if (opacidade <= 0) {
      clearInterval(animacao);
      efeito.remove();
    }
  }, 30);
}

function efeitoVitoria() {
  for (let i = 0; i < 20; i++) {
    const estrela = createDiv("⭐");
    estrela.style('position', 'absolute');
    estrela.style('font-size', '32px');
    estrela.style('z-index', '999');
    estrela.position(random(windowWidth), -30);

    let y = -30;
    const velocidade = random(2, 5);

    const animar = setInterval(() => {
      y += velocidade;
      estrela.position(estrela.x, y);
      if (y > windowHeight) {
        clearInterval(animar);
        estrela.remove();
      }
    }, 30);
  }
}
function efeitoDerrota() {
  for (let i = 0; i < 15; i++) {
    const tristeza = createDiv("💧");
    tristeza.style('position', 'absolute');
    tristeza.style('font-size', '32px');
    tristeza.style('z-index', '999');
    tristeza.position(random(windowWidth), -30);

    let y = -30;
    let x = tristeza.x;
    let tempo = 0;

    const animar = setInterval(() => {
      tempo += 0.1;
      y += 3;
      const xOffset = sin(tempo) * 10;
      tristeza.position(x + xOffset, y);
      if (y > windowHeight) {
        clearInterval(animar);
        tristeza.remove();
      }
    }, 30);
  }
}
