let personagem;
let fogo = [];
let numFogo = 20; // Número de emojis de fogo
let tempo = 20; // Tempo em segundos
let startTime;
let jogoFinalizado = false;
let sucesso = false;

function setup() {
  createCanvas(600, 400);
  
  // Carrega os emojis como texto
  personagem = {
    x: width / 2,
    y: height - 50,
    size: 50
  };
  
  // Cria emojis de fogo espalhados
  for (let i = 0; i < numFogo; i++) {
    fogo.push({
      x: random(20, width - 20),
      y: random(20, height - 120),
      size: 30,
      apagado: false
    });
  }
  
  startTime = millis();
}

function draw() {
  background("green");
  
  // Calcula o tempo restante
  let elapsed = (millis() - startTime) / 1000;
  let tempoRestante = max(0, tempo - elapsed);
  
  // Se o tempo acabou, termina o jogo
  if (tempoRestante <= 0 && !jogoFinalizado) {
    jogoFinalizado = true;
    // Verifica se apagou todos os fogos
    sucesso = fogo.every(f => f.apagado);
  }
  
  // Se o jogo terminou, mostra mensagem
  if (jogoFinalizado) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    if (sucesso) {
      text("Parabéns! Você conteu o fogo!", width / 2, height / 2);
    } else {
      text("Oh não! o fogo se espalhou", width / 2, height / 2);
    }
    noLoop(); // Para parar o draw
    return;
  }
  
  // Mostra o tempo restante
  textSize(20);
  fill(0);
  textAlign(LEFT, TOP);
  text(`Tempo: ${ceil(tempoRestante)}s`, 10, 10);
  
  // Desenha o personagem
  fill(0, 0, 255); // azul
  textSize(personagem.size);
  textAlign(CENTER, CENTER);
  text("👨‍🦱", personagem.x, personagem.y);
  
  // Desenha os estintores
  fill(255, 0, 0);
  textSize(40);
  text("🧯", personagem.x, personagem.y + personagem.size);
  
  // Desenha os fogos
  for (let f of fogo) {
    if (!f.apagado) {
      fill(255, 69, 0); // fogo
      textSize(f.size);
      text("🔥", f.x, f.y);
    }
  }
  
  // Checa colisões com fogo
  for (let f of fogo) {
    if (!f.apagado && dist(personagem.x, personagem.y, f.x, f.y) < (personagem.size / 2 + f.size / 2)) {
      f.apagado = true;
    }
  }
}

function keyPressed() {
  if (jogoFinalizado) return; // Não move após o jogo terminar
  
  const step = 10;
  if (keyCode === LEFT_ARROW) {
    personagem.x -= step;
  } else if (keyCode === RIGHT_ARROW) {
    personagem.x += step;
  } else if (keyCode === UP_ARROW) {
    personagem.y -= step;
  } else if (keyCode === DOWN_ARROW) {
    personagem.y += step;
  }
  
  // Manter dentro da tela
  personagem.x = constrain(personagem.x, 0 + personagem.size / 2, width);
  personagem.y = constrain(personagem.y, 0 + personagem.size / 2, height);
}
