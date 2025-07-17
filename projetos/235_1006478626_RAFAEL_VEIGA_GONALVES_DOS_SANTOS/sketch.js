let plantas = [];
let alfacesNoCaminhao = 0;
let alfacesEntregues = 0;
let fazendeiro;
let ajudante;
let caminhao;
let nuvens = [];
let limiteCaminhao = 15;
let gameStarted = false;
let tempoLimite = 70; //segundos do jogo
let tempoInicial;
let jogoFinalizado = false;
let venceu = false;
let botaoReiniciar;

function setup() {
  createCanvas(900, 600);
  fazendeiro = new Fazendeiro(100, height - 100);
  ajudante = new Ajudante(200, height - 100);
  caminhao = new Caminhao(350, height - 100);
  botaoReiniciar = createButton("🔁 Reiniciar Jogo");
  botaoReiniciar.position(width / 2 - 70, height / 2 + 60);
  botaoReiniciar.mousePressed(reiniciarJogo);
  botaoReiniciar.hide();//escondido até o jogo terminar
  for (let i = 0; i < 5; i++) {
    nuvens.push(new Nuvem(random(width), random(50, 150), random(1, 2)));
  }
}

function draw() {
  background(135, 206, 235);
  drawAmbiente();
  drawCampo();
  drawCidade();

  //instruções do jogo
  if (!gameStarted) {
    fill(255, 255, 255, 240);
    rect(100, 100, width - 200, height - 200, 20);
    fill(0);
    textSize(18);
    textAlign(LEFT, TOP);
    text(
      "🎮 Instruções do Jogo:\n\n" +
      "- 🧑‍🌾 Fazendeiro: Planta alfaces ao se mover pelo campo. Movimenta com as teclas (WASD).\n" +
      "- 👩‍🌾 Ajudante: Colhe as alfaces prontas. Movimenta com as teclas (IJKL)\n" +
      "- 🚚 Caminhão: Transporta alfaces para o verdureiro.\n\n" +
      "- Quando o caminhão estiver cheio (15 alfaces), pressione 'E' para entregar no verdudeiro.\n" +
      "- Após a entrega, pressione 'V' para retornar.\n\n" +
      "✅ Objetivo: Plante, colha quando as alfaces mudarem de cor e entregue antes do tempo acabar!\n\n" +
      "➡️ Pressione qualquer tecla para começar...", 
      120, 120, width - 240, height - 240
    );
    if (keyIsPressed) {
      gameStarted = true;
    }
    return;
  }
  //Instruções no topo da tela
  fill(255, 255, 255, 200);
  rect(width - 290, 10, 280, 100, 10);
  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  text(
    "👨‍🌾 Fazendeiro (WASD)\n" +
    "👩‍🌾 Ajudante (IJKL)\n" +
    "🚚 Caminhão: E (Entregar), V (Voltar)\n" + 
    "Alface pronta para colheita quando mudar\n" +
    "a cor!\n\n" ,
    width - 280, 18
    
  );

  let tempoDecorrido = (millis() - tempoInicial) / 1000;
  let tempoRestante = max(0, floor(tempoLimite - tempoDecorrido));

  if (!jogoFinalizado) {
    if (tempoRestante <= 0) {
      jogoFinalizado = true;
      venceu = alfacesEntregues >= 50;
    }
  }

  fazendeiro.atualizar();
  fazendeiro.exibir();
  ajudante.atualizar();
  ajudante.exibir();
  caminhao.atualizar();
  caminhao.exibir();

  for (let planta of plantas) {
    planta.crescer();
    planta.display();
  }
  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text(`Alfaces no caminhão: ${alfacesNoCaminhao}`, 10, 10);
  text(`Alfaces entregues: ${alfacesEntregues}`, 10, 30);
  text(`Tempo restante: ${tempoRestante}s`, 10, 50);

  if (alfacesNoCaminhao >= limiteCaminhao) {
    fill(255, 0, 0);
    textSize(24);
    text("Caminhão cheio, realizar entrega (tecla 'E')", width / 2 - 200, 150);
  }
  
  function desenharCaixaEntregas() {
  let caixaX = width / 2 + 370; //frente do verdureiro
  let caixaY = height - 150;
  let caixaLargura = 80;//tamanho da caixa
  let caixaAltura = 50;
  fill(200, 180, 150);//cor da caixa
  stroke(100, 80, 50);
  strokeWeight(3);
  rect(caixaX, caixaY, caixaLargura, caixaAltura, 10);

  let tamanhoAlface = 15;
  let cols = 5;
  let maxLinhas = floor((caixaAltura - 20) / (tamanhoAlface + 5));
  let maxAlfaces = cols * maxLinhas;
  fill(50, 180, 50);
  noStroke();
  for (let i = 0; i < min(alfacesEntregues, maxAlfaces); i++) {
    let x = caixaX + 8 + (i % cols) * (tamanhoAlface + 1);
    let y = caixaY + 25 + floor(i / cols) * (tamanhoAlface + 1);
    ellipse(x, y, tamanhoAlface);
  }

  //mostra "..." indicador se a caixa estiver cheia
  if (alfacesEntregues > maxAlfaces) {
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("...", caixaX + caixaLargura / 2, caixaY + caixaAltura - 10);
  }
}
 desenharCaixaEntregas();
    if (jogoFinalizado) {
    fill(0, 200);
    rect(0, 0, width, height);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    if (venceu) {
      text("🎉 Parabéns! Você vendeu todas as alfaces!\nVamos reformar a fazenda! 🏡", width / 2, height / 2);
    } else {
      text("❌ O tempo acabou!\nTente novamente para reformar a fazenda. 🌱", width / 2, height / 2);
    }
    noLoop();
    botaoReiniciar.show();//Mostrar botão de reinício
  }
}

function drawAmbiente() {
  fill(255, 204, 0);
  ellipse(70, 70, 80);
  for (let nuvem of nuvens) {
    nuvem.mover();
    nuvem.display();
  }
  for (let i = 0; i < 20; i++) {
    let x = 100 + i * 130;
    fill(139, 69, 19);
    rect(x, height - 180, 20, 60);
    fill(34, 139, 34);
    ellipse(x + 10, height - 200, 60, 60);
  }
}
//criação do campo
function drawCampo() {
  fill(100, 180, 100);
  rect(0, height - 150, width / 2, 180);
  //casa
  let casaX = 300;
  let casaY = height - 210;
  fill(210, 105, 30);
  rect(casaX, casaY, 80, 100, 5);
  fill(150, 75, 0);
  triangle(casaX - 10, casaY, casaX + 40, casaY - 60, casaX + 90, casaY);
  fill(80);
  rect(casaX + 25, casaY + 60, 30, 40, 4);
  fill(255, 255, 100);
  rect(casaX + 5, casaY + 15, 30, 30, 3);
  rect(casaX + 45, casaY + 15, 30, 30, 3);
}
//criação da cidade
function drawCidade() {
  let cityX = width / 2;
  fill(180);
  rect(cityX, height - 150, width / 2, 150);
  fill(50);
  rect(cityX, height - 100, width / 2, 50);
  fill(255);
  let faixaY = height - 80;
  for (let i = 0; i < 10; i++) {
    rect(cityX + i * 40 + 10, faixaY, 20, 10, 3);
  }
  for (let i = 0; i < 4; i++) {
    let px = cityX + 50 + i * 150;
    stroke(100);
    strokeWeight(4);
    line(px, height - 150, px, height - 180);
    noStroke();
    fill(255, 255, 100);
    ellipse(px, height - 185, 15, 15);
  }
  fill(180, 50, 50);
  rect(cityX + 35, height - 340, 100, 190, 10);
  fill(255, 255, 100, 220);
  for (let y = height - 330; y < height - 200; y += 40) {
    for (let x = cityX + 40; x < cityX + 120; x += 30) {
      rect(x, y, 20, 30, 3);
    }
  }
  fill(80);
  rect(cityX + 80, height - 190, 30, 40, 5);//porta prédio1
  fill(150, 20, 20);
  triangle(cityX + 30, height - 340, cityX + 80, height - 380, cityX + 135, height - 340);//teclado prédio1
  fill(50, 100, 180);
  rect(cityX + 148, height - 320, 120, 170, 10);
  fill(255, 255, 100, 220);
  for (let y = height - 310; y < height - 200; y += 35) {
    for (let x = cityX + 160; x < cityX + 230; x += 30) {
      rect(x, y, 20, 30, 3);
    }
  }
  fill(80);
  rect(cityX + 200, height - 190, 30, 40, 5);//porta prédio2
  fill(40, 80, 140);
  rect(cityX + 150, height - 340, 120, 20, 10);//teclado prédio2
  fill(240);
  rect(cityX + 300, height - 320, 160, 170, 10);//verdureiro
  fill(180);
  rect(cityX + 320, height - 210, 40, 60, 8);//porta verdureiro
  fill(200, 50, 50);
  rect(cityX + 300, height - 320, 160, 40, 8);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("VERDUREIRO", cityX + 380, height - 300);
  for (let i = 0; i < 5; i++) {
    let px = cityX + 20 + i * 130;
    fill(80);
    rect(px, height - 180, 8, 60);
    fill(255, 255, 150);
    ellipse(px + 4, height - 185, 18, 18);
  }
}

function keyPressed() {
  if (!gameStarted) {
    gameStarted = true;
    tempoInicial = millis();
    return;
  }
  if (key === 'E' || key === 'e') {
    caminhao.entregar();
  }
  if (key === 'V' || key === 'v') {
    caminhao.retornar();
  }
}

function mousePressed() {
  if (mouseX > width - 140 && mouseX < width - 20 && mouseY > 40 && mouseY < 80) {
    caminhao.retornar();
  }
}
function reiniciarJogo() {
  plantas = [];
  alfacesNoCaminhao = 0;
  alfacesEntregues = 0;
  jogoFinalizado = false;
  venceu = false;
  gameStarted = false;
  tempoInicial = millis();
  fazendeiro = new Fazendeiro(100, height - 100);
  ajudante = new Ajudante(200, height - 100);
  caminhao = new Caminhao(350, height - 100);
  botaoReiniciar.hide();
  loop(); //Retorna o loop do draw
}

class Fazendeiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 3;
    this.tamanho = 30;
    this.seMoveu = false;
  }
  atualizar() {
    this.seMoveu = false;
    if (keyIsDown(65)) { this.x -= this.vel; this.seMoveu = true; }
    if (keyIsDown(68)) { this.x += this.vel; this.seMoveu = true; }
    if (keyIsDown(87)) { this.y -= this.vel; this.seMoveu = true; }
    if (keyIsDown(83)) { this.y += this.vel; this.seMoveu = true; }
    this.x = constrain(this.x, 0, width / 2 - 20);
    this.y = constrain(this.y, height - 140, height - 20);
    if (this.seMoveu && frameCount % 15 === 0) {
      plantas.push(new Alface(this.x, this.y + 10));
    }
  }
  exibir() {
    textSize(this.tamanho);
    textAlign(CENTER, CENTER);
    text('🧑‍🌾', this.x, this.y);
  }
}

class Ajudante {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 3;
    this.tamanho = 30;
  }
  atualizar() {
    if (keyIsDown(74)) { this.x -= this.vel; }
    if (keyIsDown(76)) { this.x += this.vel; }
    if (keyIsDown(73)) { this.y -= this.vel; }
    if (keyIsDown(75)) { this.y += this.vel; }
    this.x = constrain(this.x, 0, width / 2 - 20);
    this.y = constrain(this.y, height - 140, height - 20);

    for (let i = plantas.length - 1; i >= 0; i--) {
      let planta = plantas[i];
      let d = dist(this.x, this.y, planta.x, planta.y);
      if (d < 25 && planta.prontaParaColheita) {
        if (alfacesNoCaminhao < limiteCaminhao) {
          plantas.splice(i, 1);
          alfacesNoCaminhao++;
        }
        break;
      }
    }
  }
  exibir() {
    textSize(this.tamanho);
    textAlign(CENTER, CENTER);
    text('👩‍🌾', this.x, this.y);
  }
}

class Caminhao {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 4;
    this.estado = 'parado';
    this.posicaoInicial = createVector(x, y);
  }
  atualizar() {
    if (this.estado === 'indo') {
      this.x += this.vel;
      if (this.x >= width - 110) {
  this.estado = 'parado';
  alfacesEntregues += alfacesNoCaminhao;

  // Verifica vitória somente após a entrega
  if (alfacesEntregues >= 50) {
    jogoFinalizado = true;
    venceu = true;
  }
  alfacesNoCaminhao = 0;
}
    } else if (this.estado === 'voltando') {
      this.x -= this.vel;
      if (this.x <= this.posicaoInicial.x) {
        this.x = this.posicaoInicial.x;
        this.estado = 'parado';
      }
    }
  }
  entregar() {
  if (this.estado === 'parado' && alfacesNoCaminhao > 0) {
    this.estado = 'indo';
    }
}
  retornar() {
    if (this.estado === 'parado' && this.x >= width - 160) {
      this.estado = 'voltando';
    }
  }
  exibir() {
    textSize(40);
    textAlign(CENTER, CENTER);
    text('🚚', this.x, this.y);
  }
}

class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.saude = 100;
    this.crescimento = 0;
    this.prontaParaColheita = false;
  }
  crescer() {
    if (this.saude > 0) {
      this.crescimento += 0.1;
      this.crescimento = constrain(this.crescimento, 0, 100);
      this.saude -= 0.05;
      this.prontaParaColheita = this.crescimento >= 90;
    }
  }
}

class Alface extends Planta {
  constructor(x, y) {
    super(x, y);
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    if (this.prontaParaColheita) {
      fill(50, 200, 50); //verde mais vibrante para alface pronta
    } else {
      fill(150, 255, 150);//verde mais claro para crescimento
    }
    ellipse(0, 0, 20 + this.crescimento * 0.1);//cresce visualmente
    pop();
  }
}

class Nuvem {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  mover() {
    this.x += this.speed;
    if (this.x > width + 50) {
      this.x = -50;
    }
  }
  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 40, 30);
    ellipse(this.x + 15, this.y + 10, 50, 40);
    ellipse(this.x - 20, this.y + 15, 50, 40);
  }
}
