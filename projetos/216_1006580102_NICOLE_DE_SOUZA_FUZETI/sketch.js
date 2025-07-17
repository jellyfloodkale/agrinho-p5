let fundo;
let fundo1;

function preload(){
 fundo = loadImage('fundo.png');
 fundo1 = loadImage('fundo1.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  
}
let xJogador = [0, 0, 0, 0];
let yJogador = [100, 200, 300, 390];

function draw() {
  ativaJogo();
  desenhaJogadores();
  desenhaLinhaDeChegada();
  verificaVencedor();
}

function ativaJogo() {
  image( fundo1, 0, 0, width, height);
  if (focused == true) {
  } else {
  image( fundo, 0, 0, width, height);
  }
}

function desenhaJogadores() {
  textSize(40);
  text("🐮", xJogador[0], yJogador[0]);
  text("🐥", xJogador[1], yJogador[1]);
  text("🐷", xJogador[2], yJogador[2]);

}

function desenhaLinhaDeChegada() {
  fill("white");
  rect(350, 0, 10, 400);
  fill("black");
  for (let yAtual = 0; yAtual < 400; yAtual += 20) {
    rect(350, yAtual, 10, 10);
  }
}

function verificaVencedor() {
  if (xJogador[0] > 350) {
    text("Jogador 1 venceu!", 50, 200);
    noLoop();
  }
  if (xJogador[1] > 350) {
    text("Jogador 2 venceu!", 50, 200);
    noLoop();
  }
  if (xJogador[2] > 350) {
    text("Jogador 3 venceu!", 50, 200);
    noLoop();
  }

}

function keyReleased() {
  if (key == "b") {
    xJogador[0] += random(20);
  }
  if (key == "n") {
    xJogador[1] += random(20);
  }
  if (key == "m") {
    xJogador[2] += random(20);
  }
}
