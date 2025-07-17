// 🌾 Quiz Agrinho: Celebrando a conexão Campo e Cidade

// Desenvolvido com p5.js

function Question(text, options, answer) {

  this.text = text;

  this.options = options;

  this.answer = answer;

  this.selected = -1;

}

Question.prototype.display = function() {

  textSize(22);

  fill('#1b5e20');

  text(this.text, 50, 80);

  this.options.forEach((opt, i) => {

    let x = 50;

    let y = 120 + i * 70;

    let w = width - 100;

    let h = 50;

    fill(this.selected === i ? '#a5d6a7' : '#ffffff');

    stroke('#2e7d32');

    strokeWeight(2);

    rect(x, y, w, h, 12);

    fill('#1b5e20');

    noStroke();

    textSize(18);

    textAlign(LEFT, CENTER);

    text(opt, x + 20, y + h / 2);

  });

};

Question.prototype.check = function(idx) {

  this.selected = idx;

  return this.options[idx] === this.answer;

};

let questions = [];

let current = 0, score = 0;

let screen = 'intro';

let feedback = '', feedbackTime = 0;

function setup() {

  createCanvas(800, 600);

  textFont('Arial');

  questions = [

    new Question("O que permite que os alimentos do campo cheguem à cidade?",

      ["Caminhões e logística", "Plantio manual, o homem do campo", "Somente mercados locais"], "Caminhões e logística"),

    new Question("Como o cidadão urbano pode apoiar o campo?",

      ["Ignorando a produção rural, foco na urbana", "Consumindo produtos locais mantendo o mercado ativo", "Evitando contato com o campo"], "Consumindo produtos locais mantendo o mercado ativo"),

    new Question("Qual é a importância da agroindústria?",

      ["Dificultar a produção", "Valorizar apenas a produção urbana", "Transformar e agregar valor aos produtos"], "Transformar e agregar valor aos produtos"),

    new Question("O que é fundamental para a integração entre campo e cidade?",

      ["Isolamento", "Comunicação e parceria", "Conflito de interesses"], "Comunicação e parceria"),

    new Question("Qual setor mais fornece alimentos à cidade?",

      ["Indústria pesada, outros países", "Produtores rurais", "Instituições de ensino"], "Produtores rurais"),

    new Question("Por que devemos valorizar o produtor rural?",

      ["Por ser base da alimentação", "Porque mora longe", "Porque não gosta da cidade"], "Por ser base da alimentação"),

    new Question("Como a cidade influencia positivamente o campo?",

      ["Fornecendo tecnologia e recursos", "Com fotos e videos de animais", "Reduzindo sua produção"], "Fornecendo tecnologia e recursos"),

    new Question("O que representa a união campo-cidade?",

      ["Desigualdade social", "Progresso conjunto e sustentável", "Concorrência desleal"], "Progresso conjunto e sustentável")

  ];

}

function draw() {

  background('#f1f8e9');

  if (screen === 'intro') {

    fill('#33691e');

    textSize(32);

    textAlign(CENTER, CENTER);

    text("🌱 Quiz Agrinho\nCelebrando a Conexão Campo e Cidade", width/2, height/2 - 40);

    textSize(20);

    text("Clique para começar", width/2, height/2 + 40);

  } 

  else if (screen === 'quiz') {

    questions[current].display();

    if (feedback !== '') {

      fill(feedback === 'Correto!' ? '#2e7d32' : '#c62828');

      textSize(20);

      textAlign(CENTER);

      text(feedback, width / 2, height - 40);

    }

    if (millis() > feedbackTime && feedback !== '') {

      feedback = '';

      current++;

      if (current >= questions.length) {

        screen = 'end';

      }

    }

  } 

  else if (screen === 'end') {

    fill('#33691e');

    textSize(28);

    textAlign(CENTER, CENTER);

    let total = questions.length;

    let percent = (score / total) * 100;

    text("🎉 Quiz Finalizado!", width / 2, height / 2 - 80);

    text(`Você acertou ${score} de ${total} questões.`, width / 2, height / 2 - 30);

    if (percent >= 90) {

      textSize(22);

      fill('#2e7d32');

      text("Excelente! Você entende a importância do agro\nna conexão entre campo e cidade! 🌾", width / 2, height / 2 + 30);

    } 

    else if (percent <= 10) {

      textSize(22);

      fill('#c62828');

      text("Você precisa estudar mais sobre a relação\nentre o campo e a cidade. O agro é essencial! 📚", width / 2, height / 2 + 30);

    } 

    else {

      textSize(22);

      fill('#ef6c00');

      text("Bom esforço! Continue aprendendo sobre a conexão\ncampo-cidade para valorizar o agro! 💡", width / 2, height / 2 + 30);

    }

  }

}

function mousePressed() {

  if (screen === 'intro') {

    screen = 'quiz';

  } else if (screen === 'quiz') {

    questions[current].options.forEach((opt, i) => {

      let x = 50;

      let y = 120 + i * 70;

      let w = width - 100;

      let h = 50;

      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {

        let correct = questions[current].check(i);

        if (correct) {

          feedback = 'Correto!';

          score++;

        } else {

          feedback = 'Incorreto!';

        }

        feedbackTime = millis() + 1000;

      }

    });

  }

}