let campoRecursos = 10;
let cidadeRecursos = 10;
let dinheiro = 5;
let plantas = [];
let pragas = [];
let predios = [];
let eventoAtual = "Nenhum evento";
let solX = 100;
let solY = 80;
let tratorX = 50;
let carroX = 750;
let nuvens = [];
let irrigando = false;

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  setInterval(gerarEvento, 10000); // Evento a cada 10 segundos
  setInterval(gerarPraga, 8000); // Pragas aparecem a cada 8 segundos

  // Criar nuvens iniciais
  for (let i = 0; i < 5; i++) {
    nuvens.push(new Nuvem(random(width), random(50, 150)));
  }
}

function draw() {
  background(135, 206, 250); // Céu azul

  // Sol animado
  fill(255, 204, 0);
  ellipse(solX, solY, 50, 50);
  solX += 0.3;
  if (solX > width) solX = 0;

  // Nuvens animadas
  for (let nuvem of nuvens) {
    nuvem.show();
    nuvem.move();
  }

  // Campo
  fill(34, 139, 34);
  rect(0, 250, 400, 150);

  // Cidade
  fill(169, 169, 169);
  rect(400, 250, 400, 150);

  // Trator animado
  fill(255, 0, 0);
  rect(tratorX, 300, 40, 20);
  tratorX += 1;
  if (tratorX > 350) tratorX = 50;

  // Carro animado na cidade
  fill(0, 0, 255);
  rect(carroX, 300, 40, 20);
  carroX -= 1;
  if (carroX < 450) carroX = 750;

  // Exibir plantas
  for (let planta of plantas) {
    planta.show();
  }

  // Exibir pragas
  for (let praga of pragas) {
    praga.show();
  }

  // Exibir prédios dinâmicos
  for (let predio of predios) {
    predio.show();
  }

  // Exibir recursos com ícones
  fill(255);
  textSize(20);
  text(`🌾 Campo: ${campoRecursos} alimentos`, 200, 30);
  text(`🏙️ Cidade: ${cidadeRecursos} tecnologia`, 600, 30);
  text(`💰 Dinheiro: ${dinheiro}`, 200, 60);
  text(`⚠️ Evento: ${eventoAtual}`, 600, 60);

  // Exibir status de irrigação
  if (irrigando) {
    fill(0, 0, 255, 100);
    rect(0, 250, 400, 150); // Efeito de água no campo
    text("💦 Irrigação Ativa!", 200, 90);
  }

  // Verificar fim de jogo
  if (campoRecursos <= 0 || cidadeRecursos <= 0) {
    textSize(40);
    fill(255, 0, 0);
    text("Game Over! Equilíbrio perdido!", width / 2, height / 2);
    noLoop();
  }
}

// Classe para representar plantas com animação
class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 20;
  }

  show() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, 20, this.altura);
    this.altura = min(this.altura + 0.1, 40); // Crescimento gradual
  }
}

// Classe para representar pragas
class Praga {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(139, 69, 19);
    ellipse(this.x, this.y, 15, 15);
  }
}

// Classe para representar prédios dinâmicos
class Predio {
  constructor(x, h) {
    this.x = x;
    this.h = h;
  }

  show() {
    fill(100);
    rect(this.x, 250 - this.h, 50, this.h);
  }
}

// Classe para representar nuvens
class Nuvem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 40, 20);
    ellipse(this.x + 20, this.y, 50, 30);
    ellipse(this.x - 20, this.y, 50, 30);
  }

  move() {
    this.x += 0.5;
    if (this.x > width) {
      this.x = -50;
    }
  }
}

// Interação do jogador
function mousePressed() {
  if (mouseX < 400) {
    // Plantar no campo
    if (dinheiro > 0) {
      plantas.push(new Planta(mouseX, random(250, 350)));
      dinheiro--;
      campoRecursos++;
    }
  } else if (mouseX > 400 && mouseX < 600) {
    // Ativar irrigação
    irrigando = !irrigando;
    if (irrigando) {
      campoRecursos += 3;
    }
  } else {
    // Vender alimentos e comprar tecnologia
    if (campoRecursos > 0) {
      dinheiro += 2;
      campoRecursos--;
      cidadeRecursos++;
      predios.push(new Predio(random(450, 750), random(50, 150))); // Construir prédios
    }
  }

  // Remover pragas ao clicar nelas
  for (let i = pragas.length - 1; i >= 0; i--) {
    if (dist(mouseX, mouseY, pragas[i].x, pragas[i].y) < 15) {
      pragas.splice(i, 1);
      campoRecursos += 2; // Recuperar produção ao eliminar pragas
    }
  }
}

// Eventos aleatórios
function gerarEvento() {
  let eventos = ["Seca", "Enchente", "Crise Tecnológica", "Bônus de Produção"];
  eventoAtual = random(eventos);

  if (eventoAtual === "Seca") {
    campoRecursos = max(0, campoRecursos - 3);
  } else if (eventoAtual === "Enchente") {
    campoRecursos += 2;
  } else if (eventoAtual === "Crise Tecnológica") {
    cidadeRecursos = max(0, cidadeRecursos - 3);
  } else if (eventoAtual === "Bônus de Produção") {
    campoRecursos += 3;
    cidadeRecursos += 2;
  }
}

// Gerar pragas aleatoriamente
function gerarPraga() {
  pragas.push(new Praga(random(50, 350), random(250, 350)));
}
