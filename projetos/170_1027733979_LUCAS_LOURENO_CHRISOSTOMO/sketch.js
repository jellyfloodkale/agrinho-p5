let carros = [];

let nuvens = [];

let pessoas = [];

let predios = [];

let arvores = [];

let maxArvores = 60;

let solX;

let estrelaPisca = [];

let tempoUltimaArvore = 0;

let graminhas = [];

function setup() {

  createCanvas(800, 400);

  solX = 80;

  for (let i = 0; i < 7; i++) {

    nuvens.push(new Nuvem(random(width), random(50, 150), random(40, 80)));

  }

  for (let i = 0; i < 8; i++) {

    pessoas.push(new Pessoa(random(width / 2 + 30, width - 40), random(height * 0.75 - 40, height * 0.75 - 10)));

  }

  let baseX = 420;

  for (let i = 0; i < 10; i++) {

    let w = random(50, 65);

    let h = random(140, 220);

    let x = baseX + i * 60;

    let y = height * 0.75 - h;

    predios.push({ x, y, w, h, luzes: [] });

    for (let xi = x + 5; xi < x + w - 10; xi += 15) {

      for (let yi = y + 10; yi < y + h - 10; yi += 20) {

        predios[i].luzes.push({ x: xi, y: yi, acesa: random() > 0.6 });

      }

    }

  }

  for (let i = 0; i < maxArvores; i++) {

    let x = 20 + i * 13;

    if (x < width / 2 - 30) {

      let altura = random(40, 70);

      arvores.push(new Arvore(x, altura));

    }

  }

  for (let i = 0; i < 100; i++) {

    estrelaPisca.push({

      x: random(width),

      y: random(0, height * 0.5),

      brilho: random(100, 255),

      delta: random(0.5, 1.5),

    });

  }

  for (let i = 0; i < 150; i++) {

    let x = random(0, width / 2);

    let y = random(height * 0.75, height);

    graminhas.push({ x, y });

  }

}

function draw() {

  let cidadeNoite = solX > width / 2;

  if (!cidadeNoite) clear();

  if (cidadeNoite) {

    background(10, 10, 40); // azul escuro para toda a tela

  } else {

    for (let y = 0; y < height * 0.75; y++) {

      let inter = lerpColor(color(135, 206, 235), color(60, 180, 240), y / (height * 0.75));

      stroke(inter);

      line(0, y, width, y);

    }

  }

  if (cidadeNoite) {

    noStroke();

    fill(0, 0, 0, 120);

    rect(width / 2, 0, width / 2, height);

  }

  for (let nuvem of nuvens) {

    nuvem.mover();

    nuvem.mostrar();

  }

  if (!cidadeNoite) {

    fill(34, 139, 34);

    rect(0, height * 0.75, width / 2, height * 0.25);

    drawGraminhas();

  } else {

    fill(25, 45, 30);

    rect(0, height * 0.75, width / 2, height * 0.25);

  }

  fill(70);

  rect(width / 2, height * 0.75, width / 2, height * 0.25);

  drawCampo();

  drawCidade(cidadeNoite);

  drawSolOuLua(cidadeNoite);

  stroke(0);

  strokeWeight(4);

  line(width / 2, 0, width / 2, height);

  noStroke();

  for (let p of pessoas) {

    p.mover();

    p.mostrar();

  }

  for (let v of carros) {

    v.mover();

    v.mostrar(cidadeNoite);

  }

  if (cidadeNoite) {

    noStroke();

    for (let e of estrelaPisca) {

      fill(255, 255, 255, e.brilho);

      ellipse(e.x, e.y, 2, 2);

      e.brilho += e.delta;

      if (e.brilho > 255 || e.brilho < 100) e.delta *= -1;

    }

  }

  // Árvores reaparecendo a cada 2 segundos

  if (millis() - tempoUltimaArvore > 2000) {

    if (arvores.length < maxArvores) {

      let i = arvores.length;

      let x = 20 + i * 13;

      if (x < width / 2 - 30) {

        let altura = random(40, 70);

        arvores.push(new Arvore(x, altura));

        tempoUltimaArvore = millis();

      }

    }

  }

  solX += 0.4;

  if (solX > width + 60) solX = -60;

}

function drawCampo() {

  for (let arv of arvores) {

    arv.mostrar();

  }

}

function drawGraminhas() {

  stroke(20, 100, 20);

  strokeWeight(1);

  for (let g of graminhas) {

    line(g.x, g.y, g.x, g.y - 8);

  }

  noStroke();

}

function drawCidade(estaNoite) {

  for (let pr of predios) {

    fill(90);

    rect(pr.x, pr.y, pr.w, pr.h, 5);

    for (let l of pr.luzes) {

      if (estaNoite) {

        fill(l.acesa ? color(255, 255, 100) : color(40, 40, 50));

      } else {

        fill(200);

      }

      rect(l.x, l.y, 12, 14, 3);

    }

  }

}

function drawSolOuLua(estaNoite) {

  push();

  translate(solX, 80);

  if (estaNoite) {

    noStroke();

    fill(255, 255, 220, 220);

    ellipse(0, 0, 50, 50);

    fill(20, 20, 40);

    ellipse(8, 0, 45, 45); // lua minguante

  } else {

    fill(255, 255, 0);

    ellipse(0, 0, 60, 60);

  }

  pop();

}

function mousePressed() {

  let y = random(height * 0.75 + 5, height - 40);

  let tipo = random() < 0.5 ? "carro" : "caminhao";

  carros.push(new Veiculo(0, y, tipo));

  if (arvores.length > 0) {

    arvores.pop();

  }

}

class Arvore {

  constructor(x, altura) {

    this.x = x;

    this.altura = altura;

  }

  mostrar() {

    fill(100, 55, 15);

    rect(this.x + 10, height * 0.75 - this.altura, 12, this.altura);

    fill(34, 139, 34);

    ellipse(this.x + 16, height * 0.75 - this.altura - 10, 50, 50);

    fill(40, 180, 40);

    ellipse(this.x + 16, height * 0.75 - this.altura - 30, 40, 40);

    fill(30, 100, 30);

    ellipse(this.x + 16, height * 0.75 - this.altura - 50, 30, 30);

  }

}

class Veiculo {

  constructor(x, y, tipo) {

    this.x = x;

    this.y = y;

    this.vel = tipo === "carro" ? random(2, 4) : random(1.5, 2.5);

    this.cor = tipo === "carro" ? color(random(50, 255), random(50, 255), random(50, 255)) : color(120, 120, 120);

    this.tipo = tipo;

  }

  mover() {

    this.x += this.vel;

  }

  mostrar(cidadeNoite) {

    push();

    translate(this.x, this.y);

    if (this.tipo === "carro") {

      fill(this.cor);

      rect(0, 0, 70, 30, 10);

      fill(230);

      rect(15, -18, 40, 20, 8);

      fill(180, 220, 255, 200);

      rect(20, -15, 15, 15, 6);

      rect(40, -15, 15, 15, 6);

      fill(20);

      ellipse(15, 30, 20);

      ellipse(55, 30, 20);

      fill(180);

      ellipse(15, 30, 10);

      ellipse(55, 30, 10);

      fill(255, 255, 150);

      ellipse(70, 10, 10);

      fill(255, 80, 80);

      ellipse(0, 10, 10);

      if (cidadeNoite) {

        fill(255, 255, 150, 90);

        triangle(70, 10, 110, 0, 110, 20);

      }

    } else {

      fill(this.cor);

      rect(0, 0, 80, 35, 8);

      fill(180, 220, 255);

      rect(15, -12, 25, 18, 6);

      fill(139, 69, 19);

      rect(85, 7, 70, 25, 6);

      for (let i = 0; i < 6; i++) {

        rect(85 + i * 12, -7, 10, 20);

      }

      fill(20);

      ellipse(20, 40, 24);

      ellipse(65, 40, 24);

      ellipse(110, 40, 24);

      fill(180);

      ellipse(20, 40, 12);

      ellipse(65, 40, 12);

      ellipse(110, 40, 12);

      fill(255, 255, 150);

      ellipse(80, 15, 12);

      fill(255, 80, 80);

      ellipse(0, 15, 12);

      if (cidadeNoite) {

        fill(255, 255, 150, 120);

        triangle(80, 15, 130, 5, 130, 30);

      }

    }

    pop();

  }

}

class Pessoa {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.dir = random([-1, 1]);

    this.speed = random(0.3, 0.7);

    this.osc = random(0, TWO_PI);

    this.corRoupa = color(random(50, 255), random(50, 255), random(50, 255));

  }

  mover() {

    this.x += this.dir * this.speed;

    if (this.x > width - 20 || this.x < width / 2 + 10) this.dir *= -1;

    this.osc += 0.05;

  }

  mostrar() {

    push();

    translate(this.x, this.y);

    fill(0);

    ellipse(0, 0, 12);

    let offset = sin(this.osc) * 3;

    fill(this.corRoupa);

    rect(-6, 6 + offset, 12, 20, 5);

    pop();

  }

}

class Nuvem {

  constructor(x, y, size) {

    this.x = x;

    this.y = y;

    this.size = size;

    this.vel = random(0.2, 0.8);

  }

  mover() {

    this.x += this.vel;

    if (this.x > width + this.size * 2) this.x = -this.size * 2;

  }

  mostrar() {

    noStroke();

    fill(255, 255, 255, 220);

    ellipse(this.x, this.y, this.size * 0.8, this.size * 0.5);

    ellipse(this.x + this.size * 0.4, this.y + this.size * 0.1, this.size * 0.7, this.size * 0.5);

    ellipse(this.x - this.size * 0.4, this.y + this.size * 0.1, this.size * 0.7, this.size * 0.5);

    ellipse(this.x, this.y + this.size * 0.3, this.size, this.size * 0.6);

  }

}