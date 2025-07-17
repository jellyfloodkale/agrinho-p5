// Configurações do jogo
const larguraCampo = 800;
const alturaCampo = 600;
const tamanhoCelula = 40;

// Objetos do jogo
let trator = {
  x: 100,
  y: 300,
  largura: 80,
  altura: 50,
  velocidade: 10,
  direcao: 1,
  rodaRotacao: 0
};

let colheitadeira = {
  x: -100,
  y: 300,
  largura: 100,
  altura: 60,
  velocidade: 8,
  direcao: 1,
  rodaRotacao: 0
};

let caminhao = {
  x: -200,
  y: 300,
  largura: 120,
  altura: 60,
  velocidade: 8,
  direcao: 1,
  rodaRotacao: 0,
  carregado: false,
  esteiraAtiva: false
};

let cidade = {
  x: 900,
  y: 300,
  largura: 150,
  altura: 100
};

let drone = {
  x: -100,
  y: 100,
  largura: 80,
  altura: 30,
  velocidade: 15
};

let sol = {
  x: 100,
  y: 100,
  tamanho: 80
};

let nuvens = [];
let campo = [];
let estadoJogo = 'plantando';
let droneDirecao = 1;
let timerTransicao = 180;
let sacasColhidas = 0;
let sacasNoCaminhao = 0;
let particulasDescarga = [];

// Sistema de visão do caminhão
let visaoCaminhao = {
  ativa: false,
  offsetX: 0,
  volante: {
    x: larguraCampo/2,
    y: alturaCampo - 100,
    tamanho: 150,
    angulo: 0
  }
};

// Ambiente urbano
let predios = [];
let fabrica = {
  x: 3000,
  y: alturaCampo - 160,
  largura: 200,
  altura: 120,
  chegou: false
};

function desenharSol() {
  fill(255, 255, 0);
  noStroke();
  ellipse(sol.x, sol.y, sol.tamanho);
  
  for (let i = 0; i < 12; i++) {
    let angle = TWO_PI / 12 * i;
    let x1 = sol.x + cos(angle) * sol.tamanho/2;
    let y1 = sol.y + sin(angle) * sol.tamanho/2;
    let x2 = sol.x + cos(angle) * (sol.tamanho/2 + 20);
    let y2 = sol.y + sin(angle) * (sol.tamanho/2 + 20);
    stroke(255, 255, 0, 150);
    strokeWeight(3);
    line(x1, y1, x2, y2);
  }
  noStroke();
}

function desenharNuvens() {
  for (let nuvem of nuvens) {
    fill(255, nuvem.opacidade);
    noStroke();
    ellipse(nuvem.x, nuvem.y, nuvem.largura, nuvem.largura/2);
    ellipse(nuvem.x - nuvem.largura/4, nuvem.y, nuvem.largura/2, nuvem.largura/3);
    ellipse(nuvem.x + nuvem.largura/4, nuvem.y, nuvem.largura/2, nuvem.largura/3);
    
    nuvem.x += nuvem.velocidade;
    if (nuvem.x > width + nuvem.largura) {
      nuvem.x = -nuvem.largura;
    }
  }
}

function desenharAsfalto() {
  const estradaY = alturaCampo - 100;
  const estradaAltura = 60;
  
  fill(50);
  noStroke();
  rect(0, estradaY, larguraCampo, estradaAltura);
  
  fill(255, 255, 0);
  for (let x = 0; x < larguraCampo; x += 60) {
    rect(x, estradaY + estradaAltura/2 - 5, 40, 10);
  }
  
  fill(139, 137, 112);
  rect(0, estradaY - 10, larguraCampo, 10);
  rect(0, estradaY + estradaAltura, larguraCampo, 10);
}

function desenharTrator() {
  push();
  translate(trator.x, trator.y);
  scale(trator.direcao, 1);
  
  trator.rodaRotacao += 0.1;
  
  fill(210, 180, 40);
  rect(10, 5, 60, 30, 5);
  
  fill(70, 130, 180);
  rect(45, -15, 25, 20, 3);
  fill(200, 230, 255, 150);
  rect(50, -10, 15, 10);
  
  fill(80);
  rect(5, 0, 5, 10);
  
  fill(40);
  ellipse(20, 35, 30, 30);
  fill(80);
  ellipse(20, 35, 20, 20);
  ellipse(60, 35, 40, 40);
  fill(80);
  ellipse(60, 35, 30, 30);
  
  fill(255, 255, 150);
  ellipse(75, 15, 10, 10);
  pop();
}

function desenharColheitadeira() {
  push();
  translate(colheitadeira.x, colheitadeira.y);
  scale(colheitadeira.direcao, 1);
  
  colheitadeira.rodaRotacao += 0.1;
  
  fill(200, 50, 50);
  rect(10, 5, 80, 40, 5);
  
  fill(70, 130, 180);
  rect(60, -15, 30, 20, 3);
  fill(200, 230, 255, 150);
  rect(65, -10, 20, 10);
  
  fill(255, 100, 100);
  rect(5, 10, 5, 5);
  
  fill(40);
  ellipse(25, 45, 35, 35);
  fill(80);
  ellipse(25, 45, 25, 25);
  ellipse(75, 45, 45, 45);
  fill(80);
  ellipse(75, 45, 35, 35);
  
  fill(255, 255, 150);
  ellipse(90, 15, 12, 12);
  
  fill(100);
  rect(15, -10, 70, 10);
  for (let i = 0; i < 7; i++) {
    fill(60);
    rect(15 + i * 10, -10, 5, 10);
  }
  pop();
}

function desenharCaminhao() {
  push();
  translate(caminhao.x, caminhao.y);
  scale(caminhao.direcao, 1);
  
  caminhao.rodaRotacao += 0.1;
  
  fill(70, 130, 180);
  rect(10, 5, 50, 40, 5);
  
  fill(200, 50, 50);
  rect(60, 5, 50, 40);
  
  fill(200, 230, 255, 150);
  rect(20, 10, 30, 15);
  
  fill(40);
  ellipse(25, 55, 40, 40);
  fill(80);
  ellipse(25, 55, 30, 30);
  ellipse(85, 55, 45, 45);
  fill(80);
  ellipse(85, 55, 35, 35);
  
  fill(255, 255, 150);
  ellipse(100, 15, 15, 15);
  
  if (caminhao.esteiraAtiva) {
    fill(200, 150, 50);
    rect(60, 45, 50, 5);
    fill(255, 215, 0);
    for (let i = 0; i < 5; i++) {
      rect(60 + i * 10 + (frameCount % 10), 45, 5, 5);
    }
  }
  
  if (caminhao.carregado) {
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(`${sacasNoCaminhao} sacas`, 85, 25);
    textAlign(LEFT);
  }
  pop();
}

function desenharCidade() {
  push();
  translate(cidade.x, cidade.y);
  
  fill(180);
  rect(0, 40, cidade.largura, cidade.altura - 40);
  
  fill(100);
  rect(10, 10, 30, 30);
  rect(50, 0, 40, 40);
  rect(100, 20, 35, 20);
  
  fill(255, 255, 150);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rect(15 + i * 10, 15 + j * 10, 5, 5);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      rect(55 + i * 10, 5 + j * 10, 5, 5);
    }
  }
  for (let i = 0; i < 3; i++) {
    rect(105 + i * 10, 25, 5, 5);
    rect(105 + i * 10, 30, 5, 5);
  }
  
  fill(150, 100, 50);
  rect(70, 70, 30, 20);
  fill(200, 150, 100);
  rect(80, 80, 10, 10);
  
  pop();
}

function desenharDrone() {
  push();
  translate(drone.x, drone.y);
  scale(droneDirecao, 1);
  
  fill(50);
  ellipse(0, 0, drone.largura, drone.altura);
  
  fill(30);
  ellipse(0, 5, 20, 15);
  fill(0);
  ellipse(0, 5, 10, 8);
  
  fill(200);
  rect(-drone.largura/2 - 10, -8, 20, 5);
  rect(drone.largura/2 - 10, -8, 20, 5);
  rect(-8, -drone.altura/2 - 10, 5, 20);
  rect(-8, drone.altura/2 - 10, 5, 20);
  
  fill(255, 0, 0);
  ellipse(-15, -5, 5, 5);
  fill(0, 255, 0);
  ellipse(15, -5, 5, 5);
  
  if (frameCount % 5 === 0 && random() > 0.7) {
    fill(150, 255, 150, 150);
    ellipse(
      random(-drone.largura/2, drone.largura/2),
      drone.altura/2 + 5,
      random(5, 10),
      random(5, 10)
    );
  }
  pop();
}

function desenharMilho(celula) {
  celula.tempo += 0.01;
  celula.crescimento = min(celula.tempo, 1);
  
  fill(50, 150, 50);
  noStroke();
  rect(celula.x, celula.y, tamanhoCelula, tamanhoCelula);
  
  if (celula.crescimento < 0.3) {
    fill(0, 100, 0);
    rect(celula.x + tamanhoCelula/2 - 2, celula.y, 4, -10 * celula.crescimento/0.3);
  } 
  else if (celula.crescimento < 0.6) {
    fill(0, 100, 0);
    rect(celula.x + tamanhoCelula/2 - 2, celula.y, 4, -20);
    
    fill(50, 200, 50);
    triangle(
      celula.x + tamanhoCelula/2, celula.y - 15,
      celula.x + tamanhoCelula/2 - 15, celula.y - 5,
      celula.x + tamanhoCelula/2, celula.y
    );
    triangle(
      celula.x + tamanhoCelula/2, celula.y - 15,
      celula.x + tamanhoCelula/2 + 15, celula.y - 5,
      celula.x + tamanhoCelula/2, celula.y
    );
  } 
  else {
    fill(0, 100, 0);
    rect(celula.x + tamanhoCelula/2 - 2, celula.y, 4, -40);
    
    fill(50, 200, 50);
    triangle(
      celula.x + tamanhoCelula/2, celula.y - 25,
      celula.x + tamanhoCelula/2 - 20, celula.y - 10,
      celula.x + tamanhoCelula/2, celula.y - 5
    );
    triangle(
      celula.x + tamanhoCelula/2, celula.y - 25,
      celula.x + tamanhoCelula/2 + 20, celula.y - 10,
      celula.x + tamanhoCelula/2, celula.y - 5
    );
    
    if (celula.crescimento > 0.8) {
      if (random() > 0.9 && celula.tempo > 0.8) {
        fill(255, 215, 0, 150);
        ellipse(celula.x + tamanhoCelula/2, celula.y - 35, 25, 35);
      }
      fill(255, 215, 0);
      ellipse(celula.x + tamanhoCelula/2, celula.y - 35, 15, 25);
      
      fill(200, 150, 0);
      for (let i = 0; i < 4; i++) {
        line(
          celula.x + tamanhoCelula/2 - 7,
          celula.y - 40 + i*6,
          celula.x + tamanhoCelula/2 + 7,
          celula.y - 40 + i*6
        );
      }
    }
  }

  if (celula.fertilizada) {
    fill(255, 255, 0, 100);
    ellipse(celula.x + tamanhoCelula/2, celula.y - 45, 30, 40);
  }
}

function desenharParticulasDescarga() {
  for (let i = particulasDescarga.length - 1; i >= 0; i--) {
    let p = particulasDescarga[i];
    fill(255, 215, 0, p.opacidade);
    noStroke();
    ellipse(p.x, p.y, p.tamanho);
    
    p.y += 2;
    p.opacidade -= 3;
    
    if (p.opacidade <= 0) {
      particulasDescarga.splice(i, 1);
    }
  }
}

function desenharVolante() {
  push();
  translate(visaoCaminhao.volante.x, visaoCaminhao.volante.y);
  rotate(visaoCaminhao.volante.angulo);
  
  fill(100);
  ellipse(0, 0, visaoCaminhao.volante.tamanho, visaoCaminhao.volante.tamanho);
  
  fill(70);
  for (let i = 0; i < 4; i++) {
    let angle = HALF_PI * i;
    let x = cos(angle) * visaoCaminhao.volante.tamanho/3;
    let y = sin(angle) * visaoCaminhao.volante.tamanho/3;
    line(0, 0, x, y);
  }
  
  fill(50);
  ellipse(0, 0, visaoCaminhao.volante.tamanho/4, visaoCaminhao.volante.tamanho/4);
  
  noFill();
  stroke(80);
  strokeWeight(2);
  ellipse(0, 0, visaoCaminhao.volante.tamanho * 0.9, visaoCaminhao.volante.tamanho * 0.9);
  ellipse(0, 0, visaoCaminhao.volante.tamanho * 0.8, visaoCaminhao.volante.tamanho * 0.8);
  
  pop();
}

function desenharPredios() {
  for (let predio of predios) {
    push();
    translate(predio.x - visaoCaminhao.offsetX, predio.y);
    
    fill(predio.cor);
    rect(0, 0, predio.largura, predio.altura);
    
    fill(255, 255, 150);
    for (let i = 0; i < predio.altura / 20; i++) {
      for (let j = 0; j < predio.largura / 15; j++) {
        if (random() > 0.3) {
          rect(10 + j * 15, 10 + i * 20, 10, 10);
        }
      }
    }
    
    fill(100);
    rect(0, 0, predio.largura, 5);
    if (predio.temAntena) {
      rect(predio.largura/2 - 2, -20, 4, 20);
      fill(255, 255, 0);
      ellipse(predio.largura/2, -20, 8, 8);
    }
    
    pop();
  }
}

function desenharFabrica() {
  push();
  translate(fabrica.x - visaoCaminhao.offsetX, fabrica.y);
  
  fill(120, 120, 120);
  rect(0, 0, fabrica.largura, fabrica.altura);
  
  fill(80);
  rect(30, -40, 20, 40);
  rect(150, -30, 15, 30);
  
  if (frameCount % 10 === 0) {
    fill(200, 200, 200, 150);
    noStroke();
    ellipse(40, -50 + sin(frameCount * 0.1) * 5, 30, 20);
    ellipse(157, -40 + cos(frameCount * 0.1) * 5, 25, 15);
  }
  
  fill(100, 70, 50);
  rect(70, fabrica.altura - 30, 60, 30);
  
  fill(255, 255, 0);
  textSize(24);
  textAlign(CENTER);
  text("FÁBRICA", fabrica.largura/2, fabrica.altura/2);
  
  pop();
}

function mouseDragged() {
  if (visaoCaminhao.ativa) {
    let dx = mouseX - visaoCaminhao.volante.x;
    let dy = mouseY - visaoCaminhao.volante.y;
    let distancia = dist(mouseX, mouseY, visaoCaminhao.volante.x, visaoCaminhao.volante.y);
    
    if (distancia < visaoCaminhao.volante.tamanho/2) {
      visaoCaminhao.volante.angulo = atan2(dy, dx) + HALF_PI;
      
      caminhao.x += caminhao.velocidade * sin(visaoCaminhao.volante.angulo);
      visaoCaminhao.offsetX += caminhao.velocidade * sin(visaoCaminhao.volante.angulo);
      
      if (caminhao.x + caminhao.largura > fabrica.x && !fabrica.chegou) {
        fabrica.chegou = true;
        estadoJogo = 'descarga';
        caminhao.esteiraAtiva = true;
        timerTransicao = 120;
      }
    }
  }
  return false;
}

function inicializarCampo() {
  campo = [];
  const inicioY = alturaCampo - (alturaCampo / 3);
  
  for (let x = 0; x < larguraCampo; x += tamanhoCelula) {
    for (let y = inicioY; y < alturaCampo; y += tamanhoCelula) {
      campo.push({
        x: x,
        y: y,
        tipo: 'terra',
        crescimento: 0,
        tempo: 0,
        fertilizada: false
      });
    }
  }
  
  nuvens = [];
  for (let i = 0; i < 5; i++) {
    nuvens.push({
      x: random(width),
      y: random(50, 150),
      largura: random(80, 150),
      velocidade: random(0.5, 1.5),
      opacidade: random(200, 255)
    });
  }
  
  predios = [];
  for (let i = 0; i < 20; i++) {
    predios.push({
      x: 1000 + i * 400 + random(-100, 100),
      y: alturaCampo - 160 - random(0, 50),
      largura: 80 + random(-20, 40),
      altura: 160 + random(-40, 60),
      cor: color(80 + random(-20, 20), 80 + random(-20, 20), 80 + random(-20, 20)),
      temAntena: random() > 0.7
    });
  }
  
  trator.x = 100;
  trator.y = inicioY - trator.altura;
  estadoJogo = 'plantando';
  drone.x = -100;
  drone.y = 100;
  droneDirecao = 1;
  colheitadeira.x = -200;
  caminhao.x = -200;
  caminhao.y = alturaCampo - 140;
  caminhao.carregado = false;
  caminhao.esteiraAtiva = false;
  sacasNoCaminhao = 0;
  cidade.x = 900;
  timerTransicao = 180;
  sacasColhidas = 0;
  particulasDescarga = [];
  visaoCaminhao.ativa = false;
  visaoCaminhao.offsetX = 0;
  fabrica.x = 3000;
  fabrica.chegou = false;
}

function campoCompleto() {
  for (let celula of campo) {
    if (celula.tipo === 'terra') {
      return false;
    }
  }
  return true;
}

function fertilizarMilho() {
  for (let celula of campo) {
    if (celula.tipo === 'milho' &&
        drone.x + drone.largura/2 > celula.x &&
        drone.x - drone.largura/2 < celula.x + tamanhoCelula &&
        drone.y + drone.altura/2 > celula.y &&
        drone.y - drone.altura/2 < celula.y + tamanhoCelula &&
        !celula.fertilizada) {
      
      celula.tempo = 1;
      celula.crescimento = 1;
      celula.fertilizada = true;
      
      for (let i = 0; i < 10; i++) {
        fill(150, 255, 150, 150);
        noStroke();
        ellipse(
          celula.x + tamanhoCelula/2 + random(-20, 20),
          celula.y - 30 + random(-10, 10),
          random(15, 25),
          random(15, 25)
        );
      }
    }
  }
}

function plantarMilho() {
  for (let celula of campo) {
    if (
      trator.x + trator.largura > celula.x &&
      trator.x < celula.x + tamanhoCelula &&
      trator.y + trator.altura > celula.y &&
      trator.y < celula.y + tamanhoCelula
    ) {
      if (celula.tipo === 'terra') {
        celula.tipo = 'milho';
        celula.crescimento = 0;
        celula.tempo = 0;
        celula.fertilizada = false;
      }
    }
  }
}

function colherMilho() {
  for (let celula of campo) {
    if (
      colheitadeira.x + colheitadeira.largura > celula.x &&
      colheitadeira.x < celula.x + tamanhoCelula &&
      colheitadeira.y + colheitadeira.altura > celula.y &&
      colheitadeira.y < celula.y + tamanhoCelula &&
      celula.tipo === 'milho'
    ) {
      celula.tipo = 'terra';
      celula.crescimento = 0;
      celula.fertilizada = false;
      sacasColhidas++;
    }
  }
}

function keyPressed() {
  if (estadoJogo === 'plantando') {
    if (keyCode === LEFT_ARROW || key === 'a') {
      trator.x -= trator.velocidade;
      trator.direcao = -1;
    } else if (keyCode === RIGHT_ARROW || key === 'd') {
      trator.x += trator.velocidade;
      trator.direcao = 1;
    } else if (keyCode === UP_ARROW || key === 'w') {
      trator.y -= trator.velocidade;
    } else if (keyCode === DOWN_ARROW || key === 's') {
      trator.y += trator.velocidade;
    } else if (key === ' ') {
      plantarMilho();
    }
    
    const inicioY = height - (height / 3);
    trator.x = constrain(trator.x, 0, width - trator.largura);
    trator.y = constrain(trator.y, inicioY - trator.altura, height - trator.altura);
  } 
  else if (estadoJogo === 'drone') {
    if (keyCode === LEFT_ARROW || key === 'a') {
      drone.x -= drone.velocidade;
      droneDirecao = -1;
    } else if (keyCode === RIGHT_ARROW || key === 'd') {
      drone.x += drone.velocidade;
      droneDirecao = 1;
    } else if (keyCode === UP_ARROW || key === 'w') {
      drone.y -= drone.velocidade;
    } else if (keyCode === DOWN_ARROW || key === 's') {
      drone.y += drone.velocidade;
    }
    
    drone.x = constrain(drone.x, -drone.largura, width + drone.largura);
    drone.y = constrain(drone.y, -drone.altura, height + drone.altura);
  }
  else if (estadoJogo === 'colhendo') {
    if (keyCode === LEFT_ARROW || key === 'a') {
      colheitadeira.x -= colheitadeira.velocidade;
      colheitadeira.direcao = -1;
    } else if (keyCode === RIGHT_ARROW || key === 'd') {
      colheitadeira.x += colheitadeira.velocidade;
      colheitadeira.direcao = 1;
    } else if (keyCode === UP_ARROW || key === 'w') {
      colheitadeira.y -= colheitadeira.velocidade;
    } else if (keyCode === DOWN_ARROW || key === 's') {
      colheitadeira.y += colheitadeira.velocidade;
    } else if (key === ' ') {
      colherMilho();
    }
    
    const inicioY = height - (height / 3);
    colheitadeira.x = constrain(colheitadeira.x, 0, width - colheitadeira.largura);
    colheitadeira.y = constrain(colheitadeira.y, inicioY - colheitadeira.altura, height - colheitadeira.altura);
  }
  return false;
}

function setup() {
  let canvas = createCanvas(larguraCampo, alturaCampo);
  canvas.parent('canvas-container');
  
  let botaoReset = createButton('Reiniciar Campo');
  botaoReset.parent('controls');
  botaoReset.mousePressed(inicializarCampo);
  
  inicializarCampo();
}

function draw() {
  background(135, 206, 235);
  
  if (!visaoCaminhao.ativa) {
    desenharSol();
    desenharNuvens();
    desenharAsfalto();
    
    const inicioY = alturaCampo - (alturaCampo / 3);
    fill(139, 69, 19);
    noStroke();
    rect(0, inicioY, larguraCampo, alturaCampo / 3);
    
    for (let celula of campo) {
      if (celula.tipo === 'milho') {
        desenharMilho(celula);
      }
    }
    
    if (estadoJogo === 'plantando') {
      desenharTrator();
      if (campoCompleto()) {
        estadoJogo = 'saindoTrator';
      }
    } 
    else if (estadoJogo === 'saindoTrator') {
      trator.x += trator.velocidade * 1.5;
      desenharTrator();
      
      if (--timerTransicao <= 0 || trator.x > width + 100) {
        estadoJogo = 'drone';
        drone.x = -drone.largura;
      }
    } 
    else if (estadoJogo === 'drone') {
      desenharDrone();
      fertilizarMilho();
      
      let tudoFertilizado = true;
      for (let celula of campo) {
        if (celula.tipo === 'milho' && !celula.fertilizada) {
          tudoFertilizado = false;
          break;
        }
      }
      
      if (tudoFertilizado) {
        estadoJogo = 'saindoDrone';
        timerTransicao = 120;
      }
    } 
    else if (estadoJogo === 'saindoDrone') {
      drone.x += drone.velocidade * 2;
      desenharDrone();
      
      if (--timerTransicao <= 0 || drone.x > width + 100) {
        estadoJogo = 'colhendo';
        colheitadeira.x = 100;
        colheitadeira.y = inicioY - colheitadeira.altura;
      }
    } 
    else if (estadoJogo === 'colhendo') {
      desenharColheitadeira();
      
      let tudoColhido = true;
      for (let celula of campo) {
        if (celula.tipo === 'milho') {
          tudoColhido = false;
          break;
        }
      }
      
      if (tudoColhido) {
        estadoJogo = 'carregando';
        timerTransicao = 120;
      }
    }
    else if (estadoJogo === 'carregando') {
      desenharColheitadeira();
      
      if (timerTransicao > 0) {
        timerTransicao--;
        if (frameCount % 10 === 0 && sacasNoCaminhao < sacasColhidas) {
          sacasNoCaminhao++;
        }
      } else {
        estadoJogo = 'transporte';
        caminhao.x = 100;
        caminhao.carregado = true;
        visaoCaminhao.ativa = true;
      }
    }
    
    fill(0);
    textSize(16);
    text("CONTROLES: WASD ou SETAS para mover | ESPAÇO para plantar/colher", 20, 30);
    text(`Sacas colhidas: ${sacasColhidas}`, 20, 60);
    
    if (estadoJogo === 'drone') {
      textSize(24);
      textAlign(CENTER);
      text("DRONE ATIVO: Passe sobre o milho para fertilizar!", width/2, 70);
      textAlign(LEFT);
    } 
    else if (estadoJogo === 'colhendo') {
      textSize(24);
      textAlign(CENTER);
      fill(200, 50, 50);
      text("COLHEITA: Mova a colheitadeira e pressione ESPAÇO para colher!", width/2, 70);
      textAlign(LEFT);
      fill(0);
    }
  } else {
    // Modo visão do caminhão
    desenharAsfalto();
    desenharPredios();
    desenharFabrica();
    
    // Painel do caminhão
    fill(50, 50, 80);
    rect(0, alturaCampo - 50, larguraCampo, 50);
    
    // Desenha o volante
    desenharVolante();
    
    // Mostra informações
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(`Velocidade: ${abs(floor(caminhao.velocidade * visaoCaminhao.volante.angulo * 2))} km/h`, larguraCampo/2, alturaCampo - 20);
    text(`Distância: ${floor((fabrica.x - caminhao.x - visaoCaminhao.offsetX)/10)} m`, larguraCampo/2 + 200, alturaCampo - 20);
    text(`Carga: ${sacasNoCaminhao} sacas`, larguraCampo/2 - 200, alturaCampo - 20);
    
    if (estadoJogo === 'descarga') {
      desenharParticulasDescarga();
      
      if (timerTransicao > 0) {
        timerTransicao--;
        if (frameCount % 5 === 0 && sacasNoCaminhao > 0) {
          sacasNoCaminhao--;
          
          for (let i = 0; i < 3; i++) {
            particulasDescarga.push({
              x: fabrica.x - visaoCaminhao.offsetX + 100 + random(-10, 10),
              y: fabrica.y + 90,
              tamanho: random(5, 10),
              opacidade: 255
            });
          }
        }
      } else {
        estadoJogo = 'retorno';
        caminhao.carregado = false;
        caminhao.esteiraAtiva = false;
        visaoCaminhao.ativa = false;
      }
    }
  }
}