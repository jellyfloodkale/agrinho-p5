function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

let trator;
let plantas = [];
let entregues = 0;
let evolucaoTrator = 1;
let nuvens = [];

function setup() {
  createCanvas(900, 500);
  angleMode(DEGREES);

  trator = {
    x: 100,
    y: 350,
    colhidas: 0,
  };

  criarPlantas();

  // Nuvens
  for (let i = 0; i < 5; i++) {
    nuvens.push({ x: random(width), y: random(40, 150), speed: random(0.5, 1.2) });
  }
}

function draw() {
  desenharCenario();

  // Atualiza e desenha plantações
  for (let planta of plantas) {
    planta.brilho = 180 + sin(frameCount + planta.x) * 40;

    if (!planta.colhida) {
      fill(0, planta.brilho, 0);
      ellipse(planta.x, planta.y, planta.tamanho);
    } else {
      planta.timer++;
      if (planta.timer > 180) {
        planta.colhida = false;
        planta.evolucao = min(planta.evolucao + 1, 3);
        planta.tamanho = 15 + planta.evolucao * 2;
        planta.timer = 0;
      }
    }
  }

  // Trator
  moverTrator();
  desenharTrator(trator.x, trator.y, evolucaoTrator);

  // Colher plantas
  for (let planta of plantas) {
    if (!planta.colhida && dist(trator.x, trator.y, planta.x, planta.y) < 30) {
      planta.colhida = true;
      trator.colhidas++;
    }
  }

  // Entregar
  if (trator.x > 500 && trator.colhidas > 0) {
    entregues += trator.colhidas;
    trator.colhidas = 0;

    // Evoluir trator a cada 5 entregas (até nível 13)
    evolucaoTrator = min(1 + floor(entregues / 5), 13);
  }

  // UI
  fill(0);
  textSize(18);
  text(`🌱 Colhidas: ${trator.colhidas}`, 20, 30);
  text(`🚚 Entregues: ${entregues}`, 20, 55);
  text(`🔧 Trator nível: ${evolucaoTrator}`, 20, 80);
}

function criarPlantas() {
  plantas = [];
  for (let i = 0; i < 10; i++) {
    plantas.push({
      x: random(80, 380),
      y: random(270, 430),
      colhida: false,
      brilho: random(100, 255),
      tamanho: 20,
      timer: 0,
      evolucao: 1
    });
  }
}

function desenharCenario() {
  // Tempo do dia baseado no frameCount (ciclo de ~30 segundos)
  let ciclo = (frameCount % (60 * 30)) / (60 * 30); // 0 → 1
  let horaDoDia = ciclo * 24;

  let corCeu;
  if (horaDoDia < 6 || horaDoDia >= 20) {
    corCeu = color(20, 24, 55);
  } else if (horaDoDia < 10) {
    corCeu = lerpColor(color(255, 150, 100), color(135, 206, 235), (horaDoDia - 6) / 4);
  } else if (horaDoDia < 18) {
    corCeu = color(135, 206, 235);
  } else {
    corCeu = lerpColor(color(135, 206, 235), color(255, 100, 100), (horaDoDia - 18) / 2);
  }

  background(corCeu);

  if (horaDoDia >= 6 && horaDoDia <= 18) {
    for (let i = 0; i < 200; i++) {
      noStroke();
      fill(255, 255, 255, random(5, 15));
      ellipse(random(width), random(200), random(30, 100), random(10, 30));
    }
  }

  // Nuvens
  for (let n of nuvens) {
    fill(255);
    ellipse(n.x, n.y, 60, 40);
    ellipse(n.x + 20, n.y + 10, 50, 30);
    n.x += n.speed;
    if (n.x > width + 60) n.x = -60;
  }

  // Campo com textura
  fill(85, 170, 85);
  rect(0, 250, 450, height - 250);
  for (let i = 0; i < 400; i++) {
    stroke(60, 140, 60, 100);
    strokeWeight(1);
    let x = random(0, 450);
    let y = random(250, height);
    line(x, y, x + random(-2, 2), y + random(4, 8));
  }
  noStroke();
  fill(0);
  text("🌾 Campo", 20, 270);

  // Cidade com textura
  fill(200);
  rect(450, 250, width - 450, height - 250);
  for (let i = 0; i < 300; i++) {
    let cx = random(450, width);
    let cy = random(250, height);
    fill(180 + random(-10, 10));
    rect(cx, cy, random(2, 4), random(6, 10));
  }

  // Prédios
  for (let i = 0; i < 5; i++) {
    fill(120);
    rect(500 + i * 60, 220 - i * 15, 40, 150 + i * 15);
    if (horaDoDia < 6 || horaDoDia >= 20) {
      fill(255, 255, 100);
      for (let w = 0; w < 3; w++) {
        rect(505 + i * 60, 230 - i * 15 + w * 20, 10, 10);
      }
    }
  }

  fill(0);
  text("🏙️ Cidade", 720, 270);

  // Luzes do trator à noite
  if ((horaDoDia < 6 || horaDoDia >= 20) && evolucaoTrator >= 5) {
    fill(255, 255, 200, 120);
    ellipse(trator.x + 50, trator.y + 10, 30, 20);
    ellipse(trator.x + 50, trator.y + 25, 30, 20);
  }
}

function desenharTrator(x, y, nivel) {
  let cores = [
    [255, 0, 0], [255, 140, 0], [0, 100, 255],
    [0, 180, 255], [0, 255, 180], [0, 255, 0],
    [180, 255, 0], [255, 255, 0], [255, 200, 0],
    [255, 150, 0], [255, 100, 0], [200, 0, 255], [150, 0, 255]
  ];
  let cor = cores[nivel - 1] || [100, 100, 100];

  fill(cor);
  rect(x, y, 50, 30, 5);
  fill(0, 0, 80 + nivel * 10);
  rect(x + 5, y - 20, 30, 20, 5);

  if (nivel >= 2) {
    fill(255);
    ellipse(x + 25, y - 10, 5);
  }
  if (nivel >= 3) {
    fill(0);
    triangle(x + 10, y - 25, x + 15, y - 40, x + 20, y - 25);
  }

  if (nivel >= 6) {
    fill(150);
    rect(x - 5, y + 5, 5, 10);
  }
  if (nivel >= 10) {
    fill(255, 255, 0);
    ellipse(x + 10, y - 20, 6);
  }

  fill(0);
  ellipse(x + 10, y + 30, 20);
  ellipse(x + 40, y + 30, 20);
}

function moverTrator() {
  if (keyIsDown(87)) trator.y -= 2;
  if (keyIsDown(83)) trator.y += 2;
  if (keyIsDown(65)) trator.x -= 2;
  if (keyIsDown(68)) trator.x += 2;

  trator.x = constrain(trator.x, 0, width - 40);
  trator.y = constrain(trator.y, 230, height - 40);
}

