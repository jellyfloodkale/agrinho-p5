let arvores = [];
let imgArvore;
let distanciaMinima = 10;

let larguraCidade = 0;
let velocidadeCidade = 4;
let jogoAtivo = true;
let totalArvoresNecessarias = 20;

let predios = [];

let fimDeJogo = false;
let mensagemFinal = "";
let tempoDeFim = 0;
let podeReiniciar = false;

// Sons
let somIntro, somVitoria, somDerrota;

function preload() {
  imgArvore = loadImage("arvoreee.png");

  // Carrega os sons
  somIntro = loadSound("intro1.wav");
  somVitoria = loadSound("vitoria.wav");
  somDerrota = loadSound("gameover.wav");
}

function setup() {
  createCanvas(800, 600);
  arvores.push({ x: 200, y: height - 100 });

  // Alturas variadas de prédios
  for (let i = 0; i < 20; i++) {
    let altura = random([80, 100, 120, 150]);
    predios.push({ altura });
  }

  // Toca som de introdução
  somIntro.play();
}

function draw() {
  desenharCenario();

  if (jogoAtivo) {
    crescerCidade();

    for (let a of arvores) {
      imageMode(CENTER);
      image(imgArvore, a.x, a.y - 40, 100, 100);
    }

    fill(0);
    textSize(18);
    textAlign(CENTER);
    text("Clique no chão para plantar árvores!", width / 2, 30);
    text(`Árvores plantadas: ${arvores.length}`, width / 2, 55);

    verificarFimDeJogo();
  } else if (fimDeJogo) {
    exibirMensagemFinal();
  }
}

function mousePressed() {
  if (!jogoAtivo && podeReiniciar) {
    reiniciarJogo();
    return;
  }

  if (jogoAtivo && mouseY > height - 130 && mouseX < width - larguraCidade) {
    let podePlantar = true;
    for (let a of arvores) {
      if (dist(mouseX, height - 100, a.x, a.y) < distanciaMinima) {
        podePlantar = false;
        break;
      }
    }
    if (podePlantar) {
      arvores.push({ x: mouseX, y: height - 100 });
      larguraCidade -= 45;
      if (larguraCidade < 0) larguraCidade = 0;
    }
  }
}

function desenharCenario() {
  background(135, 206, 250);

  // Grama
  fill(50, 205, 50);
  rect(0, height - 100, width, 100);

  // Montanha
  fill(34, 139, 34);
  triangle(50, height - 100, 150, height - 250, 250, height - 100);

  // Cidade
  desenharPredios();

  // Sol
  fill(255, 255, 0);
  ellipse(80, 80, 60, 60);
}

function desenharPredios() {
  let baseX = width - larguraCidade;
  let x = width;
  let i = 0;
  while (x > baseX && i < predios.length) {
    let h = predios[i].altura;
    fill(100);
    rect(x, height - 100 - h, 40, h);

    fill(255, 255, 100);
    for (let wy = height - 100 - h + 10; wy < height - 100; wy += 20) {
      rect(x + 10, wy, 5, 10);
      rect(x + 25, wy, 5, 10);
    }

    x -= 45;
    i++;
  }
}

function crescerCidade() {
  larguraCidade += velocidadeCidade;
}

function verificarFimDeJogo() {
  if (larguraCidade >= width) {
    mensagemFinal = "🏙️ A cidade tomou tudo! GAME OVER!";
    somDerrota.play();
    encerrarJogo();
  } else if (arvores.length >= totalArvoresNecessarias) {
    mensagemFinal = "🌳 Você salvou a natureza! VITÓRIA!";
    somVitoria.play();
    encerrarJogo();
  }
}

function encerrarJogo() {
  jogoAtivo = false;
  fimDeJogo = true;
  tempoDeFim = millis();
  podeReiniciar = false;
}

function exibirMensagemFinal() {
  fill(0, 200);
  rect(0, 0, width, height);

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(mensagemFinal, width / 2, height / 2);

  if (millis() - tempoDeFim > 3000) {
    textSize(20);
    text("Clique para jogar novamente", width / 2, height / 2 + 40);
    podeReiniciar = true;
  }
}

function reiniciarJogo() {
  arvores = [{ x: 200, y: height - 100 }];
  larguraCidade = 0;
  jogoAtivo = true;
  fimDeJogo = false;
  podeReiniciar = false;

  // Reinicia sons
  somIntro.play();
}
