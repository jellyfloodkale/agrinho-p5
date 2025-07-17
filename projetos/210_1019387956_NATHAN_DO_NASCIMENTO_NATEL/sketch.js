let img;
let imgAgradecimento;
let tela = "inicio";
let inputResposta;
let pergunta;
let botaoFinalizar;
let botaoEnviar;

function preload() {
  // Certifique-se de que os caminhos das imagens estão corretos
  img = loadImage("p5js.png", () => console.log("Imagem inicial carregada!"), (err) => console.error("Erro ao carregar imagem:", err));
  imgAgradecimento = loadImage("obrigado.png", () => console.log("Imagem de agradecimento carregada!"), (err) => console.error("Erro ao carregar imagem de agradecimento:", err));
}

function setup() {
  createCanvas(600, 400);

  // Campo de resposta (escondido no início)
  inputResposta = createInput();
  inputResposta.position(100, 220);
  inputResposta.size(400);
  inputResposta.hide();

  // Pergunta (escondida no início)
  pergunta = createElement('h4', 'O que você entendeu sobre troca saudável?');
  pergunta.position(100, 170);
  pergunta.style('font-family', 'sans-serif');
  pergunta.hide();

  // Botão "Finalizar"
  botaoFinalizar = createButton("Finalizar");
  botaoFinalizar.position(500, 360);
  botaoFinalizar.mousePressed(() => {
    tela = "final";
    botaoFinalizar.hide();
    inputResposta.show();
    pergunta.show();
    botaoEnviar.show();
  });
  botaoFinalizar.hide();

  // Botão "Enviar"
  botaoEnviar = createButton("Enviar");
  botaoEnviar.position(250, 260);
  botaoEnviar.mousePressed(() => {
    tela = "agradecimento";
    inputResposta.hide();
    pergunta.hide();
    botaoEnviar.hide();
  });
  botaoEnviar.hide();
}

function draw() {
  if (tela === "inicio") {
    telaInicio();
  } else if (tela === "principal") {
    telaPrincipal();
  } else if (tela === "final") {
    telaFinal();
  } else if (tela === "agradecimento") {
    telaAgradecimento();
  }
}

function telaInicio() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Bem-vindo ao Projeto\nTroca Saudável!", width / 2, height / 2 - 40);

  textSize(20);
  fill(50);
  text("Clique para começar", width / 2, height / 2 + 40);

  inputResposta.hide();
  pergunta.hide();
  botaoFinalizar.hide();
  botaoEnviar.hide();
}

function mousePressed() {
  if (tela === "inicio") {
    tela = "principal";
    botaoFinalizar.show();
  }
}

function telaPrincipal() {
  background(img);

  textAlign(CENTER, CENTER);
  textSize(35);
  text("Troca Saudável:", 300, 75);

  textSize(20);
  text("Roupas velhas \n Desnecessário", 100, 200);
  text("Objetos sem \n Utilidades", 290, 200);
  text("Dinheiro", 480, 200);

  fill(255);
  rect(100, 260, 400, 75);

  textSize(40);
  text("♻️", mouseX, mouseY);
  textSize(16);
  fill(0);

  if (mouseX > 60 && mouseX < 140 && mouseY > 150 && mouseY < 250) {
    text("Troca = Verduras ou legumes \n🍎🥕🥬🫚", 300, 300);
  } else if (mouseX > 300 && mouseX < 400 && mouseY > 150 && mouseY < 250) {
    text("Água ou Alimentos Líquidos\n🧃🍶", 300, 300);
  } else if (mouseX > 450 && mouseX < 550 && mouseY > 150 && mouseY < 250) {
    text("Troca = Carne ou alimentos \n Industrializados\n🥩🍪🧂🧈", 300, 300);
  } else if (mouseX > 60 && mouseX < 300 && mouseY > 75 && mouseY < 150) {
    text("Quando você troca itens que não usa mais, como objetos \n desnecessários, por alimentos frescos e saudáveis, \n como frutas, legumes e verduras.", 300, 300);
  }

  inputResposta.hide();
  pergunta.hide();
  botaoEnviar.hide();
}

function telaFinal() {
  background(240);
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(0);
  text("Obrigado por participar!", width / 2, 100);
}

function telaAgradecimento() {
  background(255);
  image(imgAgradecimento, 150, 50, 300, 200); // Imagem de agradecimento

  textAlign(CENTER);
  textSize(20);
  fill(0);
  text("Toda troca saudável é um passo para um mundo melhor! 🌱", width / 2, 300);
}
