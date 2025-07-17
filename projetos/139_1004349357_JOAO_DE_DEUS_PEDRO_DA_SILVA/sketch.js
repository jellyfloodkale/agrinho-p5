let semente;
let gotas = [];
let score = 0;
let cresceu = false;

function setup() {
  createCanvas(500, 600);
  semente = new Semente();
  for (let i = 0; i < 7; i++) {
    gotas.push(new Gota());
  }
}

function draw() {
  background(185, 206, 235); // céu

  // chão verdinho
  noStroke();
  fill(34, 139, 34);
  rect(0, height - 50, width, 50);

  // mostrar e mover semente
  semente.update();
  semente.show();

  // mostrar e mover gotas
  for (let g of gotas) {
    g.update();
    g.show();

    if (g.coletada(semente)) {
      g.renasce();
      score++;
    }
  }

  // marcador
  fill(90);
  textSize(20);
  text("Gotas coletadas: " + score, 10, 30);

  // transformação
  if (score >= 10 && !cresceu) {
    cresceu = true;
  }

  if (cresceu) {
    fill(10, 120, 10);
    textSize(28);
    textAlign(CENTER);
    text("Você virou uma árvore 🌳", width / 2, height / 2 - 50);
    text("Conexão com a vida completa", width / 2, height / 2 - 15);
  }
}

// controles
function keyPressed() {
  if (keyCode === LEFT_ARROW || key === 'A') {
    semente.move(-1);
  } else if (keyCode === RIGHT_ARROW || key === 'D') {
    semente.move(1);
  }
}

// classe do jogador (semente)
class Semente {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.r = 20;
    this.vel = 5;
  }

  update() {
    this.x = constrain(this.x, this.r, width - this.r);
  }

  move(dir) {
    this.x += dir * this.vel * 10;
  }

  show() {
    if (cresceu) {
      // árvore!
      fill(139, 69, 19);
      rect(this.x - 10, this.y - 60, 20, 60);
      fill(24, 199, 34);
      ellipse(this.x, this.y - 80, 80);
    } else {
      fill(165, 72, 72);
      ellipse(this.x, this.y, this.r * 2);
    }
  }
}

// classe das gotas
class Gota {
  constructor() {
    this.renasce();
  }

  renasce() {
    this.x = random(20, width - 20);
    this.y = random(-300, -50);
    this.r = 10;
    this.speed = random(2, 4);
  }

  update() {
    this.y += this.speed;
    if (this.y > height - 50) {
      this.renasce();
    }
  }

  show() {
    fill(30, 171, 255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  coletada(semente) {
    let d = dist(this.x, this.y, semente.x, semente.y);
    return d < this.r + semente.r;
  }
}