// VARIÁVEIS GERAIS
let caminhao;
let conectividades = [];
let obstaculos = [];
let pontos = 0;
let estadoJogo = "menu"; // "menu", "jogando", "fim"
let faseAtual = "campo"; // "campo" ou "cidade"

// IMAGENS E SONS
let imgCaminhao, imgWifi, imgObstaculo;
let somColeta, somMotor, somBatida;

// MENSAGEM FINAL
let mensagemFinal = "";

function preload() {
  imgCaminhao = loadImage('caminhao.png');
  imgWifi = loadImage('wifi.png');
  imgObstaculo = loadImage('obstaculo.png');

  somColeta = loadSound('coleta.mp3');
  somMotor = loadSound('motor.mp3');
  somBatida = loadSound('batida.mp3');
}

function setup() {
  createCanvas(800, 400);
  iniciarJogo();
  somMotor.setLoop(true);
}

function draw() {
  if (estadoJogo === "menu") {
    mostrarMenu();
  } else if (estadoJogo === "jogando") {
    jogar();
  } else if (estadoJogo === "fim") {
    mostrarFim();
  }
}

// FUNÇÃO DE JOGO
function iniciarJogo() {
  caminhao = createVector(100, height / 2);
  conectividades = [];
  obstaculos = [];
  pontos = 0;
  faseAtual = "campo";

  for (let i = 0; i < 4; i++) {
    conectividades.push(createVector(random(800, 1600), random(50, 350)));
    obstaculos.push(createVector(random(800, 1600), random(50, 350)));
  }
}

function mostrarMenu() {
  background(50, 150, 50);
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("Conexões Rurais- AGRINHO", width / 2, height / 2 - 40);
  textSize(20);
  text("Ajude caminhão a coletar os sinais de conexão do campo à cidade!", width / 2, height / 2);

  fill(255, 200, 0);
  rect(width / 2 - 75, height / 2 + 30, 150, 40, 10);
  fill(0);
  text("Iniciar", width / 2, height / 2 + 58);
}

function jogar() {
  // Fim de jogo por vitória ou derrota
  if (pontos >= 100) {
    estadoJogo = "fim";
    mensagemFinal = "Você venceu! 🌟";
    somMotor.stop();
  }
  if (pontos <= -50) {
    estadoJogo = "fim";
    mensagemFinal = "Game Over 😢";
    somMotor.stop();
  }

  if (faseAtual === "campo") {
    background(180, 200, 180);
  } else {
    background(200);
    desenharPredios();
  }

  if (!somMotor.isPlaying()) {
    somMotor.play();
  }

  // Fase cidade
  if (pontos >= 100 && faseAtual === "campo") {
    faseAtual = "cidade";
  }

  // Estrada
  fill(100);
  rect(0, height / 2 - 40, width, 80);

  // Caminhão
  image(imgCaminhao, caminhao.x, caminhao.y, 60, 40);

  // Conectividade
  for (let i = 0; i < conectividades.length; i++) {
    let c = conectividades[i];
    image(imgWifi, c.x, c.y, 30, 30);
    c.x -= faseAtual === "cidade" ? 6 : 4;

    if (dist(caminhao.x, caminhao.y, c.x, c.y) < 30) {
      pontos += 10;
      somColeta.play();
      c.x = random(800, 1600);
      c.y = random(50, 350);
    }
  }

  // Obstáculos
  for (let i = 0; i < obstaculos.length; i++) {
    let o = obstaculos[i];
    image(imgObstaculo, o.x, o.y, 30, 30);
    o.x -= faseAtual === "cidade" ? 6 : 4;

    if (dist(caminhao.x, caminhao.y, o.x, o.y) < 30) {
      pontos -= 20;
      somBatida.play();
      o.x = random(800, 1600);
      o.y = random(50, 350);
    }
  }

  fill(0);
  textSize(20);
  text("Pontos: " + pontos, 10, 30);
  text("Fase: " + faseAtual.toUpperCase(), 10, 55);
}

function desenharPredios() {
  for (let i = 0; i < width; i += 80) {
    let altura = random(80, 180);
    fill(random(100, 180));
    rect(i, height - 120 - altura, 60, altura);
  }
}

function mostrarFim() {
  background(20);
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text(mensagemFinal, width / 2, height / 2 - 40);

  textSize(20);
  text("Pontos finais: " + pontos, width / 2, height / 2);

  fill(255, 200, 0);
  rect(width / 2 - 75, height / 2 + 30, 150, 40, 10);
  fill(0);
  text("Reiniciar", width / 2, height / 2 + 58);
}

function keyPressed() {
  if (estadoJogo === "jogando") {
    if (keyCode === UP_ARROW) caminhao.y -= 20;
    if (keyCode === DOWN_ARROW) caminhao.y += 20;
  }
}

function mousePressed() {
  if (estadoJogo === "menu") {
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 + 30 &&
      mouseY < height / 2 + 70
    ) {
      estadoJogo = "jogando";
    }
  }

  if (estadoJogo === "fim") {
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 + 30 &&
      mouseY < height / 2 + 70
    ) {
      iniciarJogo(); // Zera tudo
      estadoJogo = "menu"; // Volta ao menu
    }
  }
}
