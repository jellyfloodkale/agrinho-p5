let plantas = [];
let clima;
let tempo = 0;
let pingos = []; // Array para armazenar os pingos de chuva

function setup() {
  createCanvas(600, 400);
  clima = "sol"; // Começamos com sol
  frameRate(30); // Controla a velocidade do jogo
}

function draw() {
  background(220);

  // Desenha o fundo do campo
  desenharFundo();

  mostrarClima();
  mostrarPlantas();
  verificarCrescimento();
  mostrarTempo();

  // Se o clima for "chuva", desenha os pingos de chuva
  if (clima === "chuva") {
    criarPingosDeChuva();
    atualizarPingos();
    mostrarPingos();
  }
}

function mousePressed() {
  // Se o jogador clicar no solo, ele planta uma semente
  if (mouseY > 200) {
    let novaPlanta = new Planta(mouseX, mouseY);
    plantas.push(novaPlanta);
  }
}

function keyPressed() {
  // Se o jogador pressionar 'r', ele rega as plantas
  if (key === 'r') {
    regarPlantas();
  }
  // Se pressionar 's', ele dá sol às plantas
  if (key === 's') {
    darSol();
  }
}

function mostrarClima() {
  // Mostrar o clima atual na tela
  textSize(20);
  fill(0);
  textAlign(CENTER);
  text("Clima: " + clima, width / 2, 30);
}

function mostrarPlantas() {
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].mostrar();
  }
}

function regarPlantas() {
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].regar();
  }
}

function darSol() {
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].darSol();
  }
}

function verificarCrescimento() {
  // Mudança de clima a cada 5 segundos (simulando sol ou chuva)
  tempo++;
  if (tempo > 150) { // 5 segundos de tempo real
    tempo = 0;
    clima = random() > 0.5 ? "sol" : "chuva"; // Alterna entre sol e chuva
  }

  // A cada ciclo de clima, a planta cresce de acordo com o clima
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].crescer(clima);
  }
}

function mostrarTempo() {
  // Exibe o tempo do jogo
  textSize(15);
  fill(0);
  textAlign(CENTER);
  text("Clique para plantar, 'r' para regar, 's' para dar sol.", width / 2, height - 30);
}

// Função para desenhar o fundo (campo)
function desenharFundo() {
  // Céu
  fill(135, 206, 235); // Cor do céu
  noStroke();
  rect(0, 0, width, height / 2); // Céu ocupa a metade superior da tela

  // Campo (agora marrom em vez de verde)
  fill(139, 69, 19); // Cor marrom para o campo
  rect(0, height / 2, width, height / 2); // Campo ocupa a metade inferior

  // Montanhas ao fundo (simples formas triangulares)
  fill(100, 100, 100); // Cor das montanhas (cinza)
  triangle(0, height / 2, 150, 100, 300, height / 2); // Montanha 1
  triangle(150, height / 2, 300, 50, 450, height / 2); // Montanha 2
  triangle(300, height / 2, 450, 120, 600, height / 2); // Montanha 3
}

// Classe para as plantas
class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 0;
    this.saude = 100; // 100 é saudável, 0 é morrendo
    this.regada = false;
    this.comSol = false;
    this.diasDeCrescimento = 0;
  }

  mostrar() {
    // Se a planta estiver muito pequena, mostre apenas uma semente
    if (this.altura < 10) {
      fill(34, 139, 34); // Cor da semente
      ellipse(this.x, this.y, 10, 10); // Representa a semente
    } else {
      fill(34, 139, 34); // Cor do caule
      rect(this.x - 5, this.y - this.altura, 10, this.altura); // Caule da planta
    }

    // Mostrar a saúde da planta como uma barra
    fill(255, 0, 0);
    rect(this.x - 5, this.y - this.altura - 10, this.saude / 10, 5);
  }

  regar() {
    this.regada = true;
  }

  darSol() {
    this.comSol = true;
  }

  crescer(clima) {
    // Se estiver regada e com sol, a planta cresce mais rápido
    if (this.regada && this.comSol && clima === "sol") {
      this.altura += 1;
      this.saude += 2;
    }
    // Se estiver regada e com chuva, a planta cresce lentamente
    else if (this.regada && clima === "chuva") {
      this.altura += 0.5;
      this.saude += 1;
    }
    // Se não tiver cuidado, a planta perde saúde
    else {
      this.saude -= 0.5;
      if (this.saude < 0) this.saude = 0; // A saúde não pode ser negativa
    }

    // Se a planta crescer o suficiente, ela pode ser colhida
    if (this.altura > 50) {
      this.altura = 50; // Limita o tamanho máximo da planta
      fill(0);
      text("Planta madura, clique para colher!", this.x, this.y - 10);
    }

    // Resetando o estado de rega e sol após cada ciclo
    this.regada = false;
    this.comSol = false;
  }
}

// Função para criar os pingos de chuva
function criarPingosDeChuva() {
  if (random() < 0.1) { // Probabilidade de criar um pingo
    let pingo = new Pingo(random(width), 0); // Novo pingo que nasce no topo da tela
    pingos.push(pingo);
  }
}

// Função para atualizar o movimento dos pingos
function atualizarPingos() {
  for (let i = pingos.length - 1; i >= 0; i--) {
    pingos[i].mover();
    // Remove o pingo se ele alcançar o fundo da tela
    if (pingos[i].y > height) {
      pingos.splice(i, 1);
    }
  }
}

// Função para desenhar os pingos
function mostrarPingos() {
  for (let i = 0; i < pingos.length; i++) {
    pingos[i].mostrar();
  }
}

// Classe para representar os pingos de chuva
class Pingo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = random(2, 5); // Velocidade de queda do pingo
  }

  mover() {
    this.y += this.velocidade; // Movimento para baixo
  }

  mostrar() {
    fill(0, 0, 255); // Cor do pingo (azul)
    noStroke();
    ellipse(this.x, this.y, 5, 10); // Desenha o pingo
  }
}