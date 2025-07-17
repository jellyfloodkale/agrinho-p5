// Variáveis de imagens
let imgFundoCampo, imgFundoCidade, imgFundoGeral;
let imgAgricultor, imgCidadao, imgCaminhao;

// Variáveis do caminhão
let estadoCaminhao;
let posicaoCaminhaoX;
let posicaoCaminhaoY;

// Mensagem atual e temporizador
let mensagem = "";
let contadorFase = 0;
let indiceFrase = 0; // Para alternar frases

// Arrays de frases por fase
let frasesCampo = [
  "Cultivar o campo é alimentar a cidade!",
  "A tecnologia da cidade ajuda o campo a produzir mais!",
  "O campo se fortalece com conhecimento e inovação.",
];

let frasesCidade = [
  "A cidade depende do campo todos os dias!",
  "Do campo vem o que abastece a vida na cidade!",
  "Sem o campo, a cidade para.",
];

let frasesIntro = [
  "A cidade depende do campo para se alimentar.",
  "O campo precisa da tecnologia da cidade para produzir mais.",
  "Do campo vem a vida, da cidade vem o progresso.",
  "Juntos, cidade e campo constroem o futuro.",
  "Se há alimentos na mesa,há trabalho no campo e apoio da cidade.",
];

let fraseRetorno =
  "Se a cidade depende do alimento do campo,\no campo precisa da tecnologia que vem da cidade.";

function preload() {
  imgFundoCampo = loadImage("campo.png");
  imgFundoCidade = loadImage("cidade1.png");
  imgFundoGeral = loadImage("campocidade1.png");
  imgAgricultor = loadImage("agricultor1.png");
  imgCidadao = loadImage("caradacidade1.png");
  imgCaminhao = loadImage("caminhao2.png");
}

function setup() {
  createCanvas(850, 600);
  estadoCaminhao = "intro";
  posicaoCaminhaoX = -70;
  posicaoCaminhaoY = height - 110;
}

function draw() {
  if (estadoCaminhao === "intro") {
    image(imgFundoGeral, 0, 0, width, height);
  } else if (
    estadoCaminhao === "carregando" ||
    estadoCaminhao === "retornando"
  ) {
    image(imgFundoCampo, 0, 0, width, height);
  } else {
    image(imgFundoCidade, 0, 0, width, height);
  }

  if (estadoCaminhao === "intro") faseIntro();
  else if (estadoCaminhao === "carregando") faseCarregando();
  else if (estadoCaminhao === "transportando") faseTransportando();
  else if (estadoCaminhao === "descarregando") faseDescarregando();
  else if (estadoCaminhao === "retornando") faseRetornando();

  if (estadoCaminhao !== "intro") {
    desenharCaminhao();
    mostrarPersonagens();
  }

  exibirMensagem();
}

function faseIntro() {
  mensagem = "";
  contadorFase++;
  let tempoPorFrase = 180; // 3 segundos por frase
  let indexAtual = floor(contadorFase / tempoPorFrase);
  if (indexAtual < frasesIntro.length) {
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(26);
    textAlign(CENTER);
    text(frasesIntro[indexAtual], width / 2, height / 2);
  } else if (contadorFase > frasesIntro.length * tempoPorFrase + 60) {
    estadoCaminhao = "carregando";
    contadorFase = 0;
  }
}

function faseCarregando() {
  mensagem = "Os alimentos estão sendo colhidos na fazenda...";
  contadorFase++;
  if (contadorFase > 240) {
    estadoCaminhao = "transportando";
    contadorFase = 0;
  }
}

function faseTransportando() {
  mensagem = "O caminhão está levando alimentos para a cidade...";

  // Mostra orientação apenas nos primeiros 3 segundos (180 frames)
  if (contadorFase < 180) {
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(22);
    textAlign(CENTER);
    text("Clique na tela e use as setas para mover o caminhão →", width / 2, height - 150);
  }

  contadorFase++;

  if (keyIsDown(RIGHT_ARROW)) {
    posicaoCaminhaoX += 3;
  }

  if (posicaoCaminhaoX > (width * 2) / 3 - 50) {
    estadoCaminhao = "descarregando";
    contadorFase = 0;
  }
}

/*function faseTransportando() {
  mensagem = "O caminhão está levando alimentos para a cidade...";
  if (keyIsDown(RIGHT_ARROW)) {
    posicaoCaminhaoX += 3;
  }
  if (posicaoCaminhaoX > (width * 2) / 3 - 50) {
    estadoCaminhao = "descarregando";
    contadorFase = 0;
  }
}*/

function faseDescarregando() {
  mensagem = "Os alimentos estão sendo descarregados no mercado...";
  contadorFase++;
  if (contadorFase > 240) {
    estadoCaminhao = "retornando";
    contadorFase = 0;
  }
}

function faseRetornando() {
  mensagem = "O caminhão está voltando para o campo para buscar mais...";
  if (keyIsDown(LEFT_ARROW)) {
    posicaoCaminhaoX -= 3;
  }
  if (posicaoCaminhaoX < -70) {
    estadoCaminhao = "carregando";
    posicaoCaminhaoX = -70;
    contadorFase = 0;
    indiceFrase = (indiceFrase + 1) % frasesCampo.length;
  }
}

function desenharCaminhao() {
  push();
  translate(posicaoCaminhaoX, posicaoCaminhaoY);
  if (estadoCaminhao === "retornando") {
    scale(-1, 1);
    image(imgCaminhao, -350, -51, 300, 200);
  } else {
    image(imgCaminhao, 45, -51, 300, 200);
  }
  pop();
}

function exibirMensagem() {
  /*fill(0);
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER);*/
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(26);
  text(mensagem, width / 2, 30);
}

function mostrarPersonagens() {
  if (estadoCaminhao === "carregando") {
    image(imgAgricultor, 100, 300, 200, 200);
    fill(255);
    textSize(30);
    text(frasesCampo[indiceFrase], width - 400, 300);
  } else if (estadoCaminhao === "descarregando") {
    image(imgCidadao, width - 150, 230, 200, 200);
    /*fill(0);
    textSize(30);
    textStyle(BOLD);*/
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(26);
    text(frasesCidade[indiceFrase], width - 330, 350);
  } else if (estadoCaminhao === "retornando") {
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(26);
    text(fraseRetorno, width / 2, 400);
  }
}
