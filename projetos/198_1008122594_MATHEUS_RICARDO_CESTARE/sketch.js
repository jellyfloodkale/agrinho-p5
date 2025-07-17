let drone, energia, pontuacao, entregasFeitas;
let campoBase, cidadeBase;
let caixaNoDrone = false;
let nuvens = [], passaros = [], carros = [];
let tempoInicial;
let tempoLimite = 120;
let jogoIniciado = false;
let produtoAtual = null;

let listaProdutos = [
  { nome: "Milho 🌽", valor: 10 },
  { nome: "Tomate 🍅", valor: 15 },
  { nome: "Semente 🌱", valor: 5 },
  { nome: "Cenoura 🥕", valor: 12 },
  { nome: "Feijão 🫘", valor: 20 }
];

function setup() {
  createCanvas(800, 400);
  drone = createVector(100, 100);
  campoBase = createVector(100, 300);
  cidadeBase = createVector(700, 100);
  energia = 100;
  pontuacao = 0;
  entregasFeitas = 0;

  for (let i = 0; i < 6; i++) {
    nuvens.push(createVector(random(width), random(30, 120)));
    passaros.push(createVector(random(width, width + 800), random(80, 250)));
  }

  for (let i = 0; i < 3; i++) {
    carros.push(createVector(random(600, 900), 360));
  }
}

function draw() {
  background(135, 206, 235);
  desenharCenario();

  mostrarMensagemEducativa();

  if (!jogoIniciado) {
    mostrarInstrucoes();
    return;
  }

  moverDrone();
  moverNuvens();
  moverPassaros();
  moverCarros();
  verificarEntrega();
  desenharDrone();
  desenharHUD();

  if (millis() - tempoInicial > tempoLimite * 1000 || entregasFeitas >= 5) {
    fimDeJogo();
    noLoop();
  }
}

function mousePressed() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    tempoInicial = millis();
  }
}

function mostrarInstrucoes() {
  fill(0, 0, 0, 180);
  rect(100, 80, 600, 240, 20);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text("🛸 JOGO: CONEXÃO CAMPO E CIDADE 🏙️", width / 2, 110);
  textSize(14);
  text("Use as SETAS do teclado para mover o drone", width / 2, 150);
  text("Clique na tela para começar o jogo", width / 2, 175);
  text("Pegue produtos na Base Rural (campo)", width / 2, 200);
  text("Entregue na Base da Cidade, evite obstáculos", width / 2, 225);
  text("Produtor faça sua entrega com segurança e conecte o campo a cidade!", width / 2, 250);
}

function mostrarMensagemEducativa() {
  fill(0);
  textSize(13);
  textAlign(CENTER);

  let produtosTexto = listaProdutos.slice(0, listaProdutos.length - 1).map(p => p.nome).join(", ") + " e " + listaProdutos[listaProdutos.length - 1].nome;

  text("🛸 Drone entrega mercadoria do campo na cidade, como:", width / 2, height - 50);
  text(produtosTexto, width / 2, height - 35);
  text("As pessoas retiram na base da cidade com energia solar. 🏙️", width / 2, height - 20);
}

function desenharCenario() {
  fill(100, 200, 100); // Campo
  rect(0, 300, width, 100);
  fill(180); // Cidade
  rect(600, 150, 150, 250);

  // Janelas da cidade
  fill(255, 255, 0);
  for (let y = 160; y < 380; y += 20) {
    rect(610, y, 15, 15);
    rect(635, y, 15, 15);
  }

  // Árvores longe da base
  for (let i = 0; i < 5; i++) {
    let x = 200 + i * 40;
    fill(139, 69, 19);
    rect(x, 280, 10, 30);
    fill(34, 139, 34);
    ellipse(x + 5, 270, 35 + random(-5, 5));
  }

  // Vaca
  fill(255);
  ellipse(150, 320, 30, 20);
  fill(0);
  ellipse(145, 315, 5, 5);

  // Carros
  for (let carro of carros) {
    fill(255, 0, 0);
    rect(carro.x, carro.y, 30, 15);
    fill(0);
    ellipse(carro.x + 5, carro.y + 15, 8);
    ellipse(carro.x + 25, carro.y + 15, 8);
  }

  // Bases com nome
  fill(255, 255, 0);
  rect(campoBase.x - 20, campoBase.y, 40, 10);
  fill(0);
  textSize(11);
  textAlign(CENTER);
  text("Base Rural 🌾", campoBase.x, campoBase.y - 20);
  text("Energia Solar", campoBase.x, campoBase.y - 8);

  fill(0, 255, 255);
  rect(cidadeBase.x - 20, cidadeBase.y + 20, 40, 10);
  fill(0);
  text("Base Cidade 🏙️", cidadeBase.x, cidadeBase.y + 45);
  text("Energia Solar", cidadeBase.x, cidadeBase.y + 57);
}

function desenharDrone() {
  fill(220);
  ellipse(drone.x, drone.y, 30, 15); // Corpo
  fill(0); // Hélices
  ellipse(drone.x - 15, drone.y - 8, 10, 5);
  ellipse(drone.x + 15, drone.y - 8, 10, 5);
  ellipse(drone.x - 15, drone.y + 8, 10, 5);
  ellipse(drone.x + 15, drone.y + 8, 10, 5);

  if (caixaNoDrone) {
    fill(139, 69, 19);
    rect(drone.x - 5, drone.y + 10, 10, 10);
  }
}

function moverDrone() {
  let velocidade = 5;

  if (keyIsDown(LEFT_ARROW)) drone.x -= velocidade;
  if (keyIsDown(RIGHT_ARROW)) drone.x += velocidade;
  if (keyIsDown(UP_ARROW)) drone.y -= velocidade;
  if (keyIsDown(DOWN_ARROW)) drone.y += velocidade;

  energia -= 0.07;
  energia = constrain(energia, 0, 100);

  if (dist(drone.x, drone.y, campoBase.x, campoBase.y) < 30) {
    energia += 0.2;
    if (!caixaNoDrone) {
      caixaNoDrone = true;
      produtoAtual = random(listaProdutos);
    }
  }

  if (dist(drone.x, drone.y, cidadeBase.x, cidadeBase.y) < 25) {
    energia += 0.2;
  }
}

function moverNuvens() {
  fill(255);
  for (let i = 0; i < nuvens.length; i++) {
    ellipse(nuvens[i].x, nuvens[i].y, 40, 20);
    nuvens[i].x -= 1.5;
    if (nuvens[i].x < -50) nuvens[i].x = width + 50;

    if (dist(drone.x, drone.y, nuvens[i].x, nuvens[i].y) < 20) {
      pontuacao -= 7;
      drone = campoBase.copy();
      caixaNoDrone = false;
      produtoAtual = null;
    }
  }
}

function moverPassaros() {
  for (let i = 0; i < passaros.length; i++) {
    let p = passaros[i];
    // Corpo
    fill(200);
    ellipse(p.x, p.y, 25, 15);
    // Asas
    fill(150);
    triangle(p.x - 10, p.y, p.x - 20, p.y - 10, p.x - 20, p.y + 10);
    // Bico
    fill(255, 150, 0);
    triangle(p.x + 10, p.y, p.x + 15, p.y - 3, p.x + 15, p.y + 3);

    p.x -= 2.5;
    if (p.x < -50) {
      p.x = random(width, width + 800);
      p.y = random(80, 250);
    }

    if (dist(drone.x, drone.y, p.x, p.y) < 22) {
      pontuacao -= 15;
      drone = campoBase.copy();
      caixaNoDrone = false;
      produtoAtual = null;
    }
  }
}

function moverCarros() {
  for (let carro of carros) {
    carro.x -= 1.5;
    if (carro.x < 600) carro.x = random(800, 900);
  }
}

function verificarEntrega() {
  if (caixaNoDrone && dist(drone.x, drone.y, cidadeBase.x, cidadeBase.y) < 25) {
    caixaNoDrone = false;
    pontuacao += produtoAtual.valor;
    entregasFeitas++;
    produtoAtual = null;
  }
}

function desenharHUD() {
  // Fundo HUD
  fill(255, 255, 255, 220);
  rect(width - 210, 0, 210, 90, 10);

  // Barra de energia
  fill(255, 0, 0);
  rect(width - 200, 40, 180, 20, 5);
  fill(0, 255, 0);
  let larguraEnergia = map(energia, 0, 100, 0, 180);
  rect(width - 200, 40, larguraEnergia, 20, 5);

  // Textos
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Energia", width - 200, 35);

  text("Pontos: " + pontuacao, width - 200, 70);
  let tempoRestante = tempoLimite - int((millis() - tempoInicial) / 1000);
  text("Tempo: " + tempoRestante + "s", width - 200, 90);

  // Aviso energia baixa
  if (energia < 20) {
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(18);
    text("Cuidado! Energia baixa!", width - 100, 15);
  }

  // Produto atual
  if (caixaNoDrone && produtoAtual) {
    textAlign(CENTER);
    fill(0, 100, 0);
    textSize(16);
    text("Produto: " + produtoAtual.nome, width / 2, 30);
  }
}

function fimDeJogo() {
  background(0, 0, 0, 220);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  if (entregasFeitas >= 5) {
    text("Parabéns! Todas as entregas feitas!", width / 2, height / 2 - 20);
  } else {
    text("Tempo esgotado! Nem tudo foi entregue.", width / 2, height / 2 - 20);
  }
  text("Pontuação final: " + pontuacao, width / 2, height / 2 + 20);
}
