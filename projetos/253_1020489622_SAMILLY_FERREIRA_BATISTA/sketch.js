let people = [];
let emojis = ['🎉', '🎈', '🪩', '🎊', '🎶'];
let emojiObjects = [];
let clouds = [];

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textSize(20);

  for (let i = 0; i < 10; i++) {
    people.push(new Person(random(550, 770), random(310, 370)));
  }

  for (let i = 0; i < 10; i++) {
    emojiObjects.push({
      emoji: random(emojis),
      x: random(550, 750),
      y: random(250, 300),
      speed: random(0.3, 1)
    });
  }

  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(50, 120),
      speed: random(0.2, 0.5)
    });
  }
}

function draw() {
  drawSky();
  drawSun();
  drawClouds();
  drawCity();
  drawHouses();
  drawField();
  drawTrees();
  drawFlowers();
  drawFarm();
  drawAnimals();
  drawParty();
}

function drawSky() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(100, 180, 255), color(220, 240, 255), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawSun() {
  fill(255, 204, 0);
  ellipse(100 + sin(frameCount * 0.01) * 20, 80, 60, 60);
}

function drawClouds() {
  noStroke();
  fill(255);
  for (let c of clouds) {
    ellipse(c.x, c.y, 50, 30);
    ellipse(c.x + 20, c.y + 10, 40, 25);
    ellipse(c.x - 20, c.y + 10, 40, 25);
    c.x += c.speed;
    if (c.x > width + 50) c.x = -50;
  }
}

function drawCity() {
  for (let i = 0; i < 5; i++) {
    let x = i * 60 + 60;
    fill(50);
    rect(x, 160 - i * 10, 50, 240);
    fill(255, 255, 100);
    for (let y = 170 - i * 10; y < 400; y += 20) {
      rect(x + 10, y, 10, 10);
      rect(x + 30, y, 10, 10);
    }
  }
}

function drawHouses() {
  for (let i = 0; i < 3; i++) {
    let x = 10 + i * 40;
    fill(200, 100, 50);
    rect(x, 290, 30, 30);
    fill(150, 50, 30);
    triangle(x, 290, x + 15, 270, x + 30, 290);
    fill(0);
    rect(x + 10, 305, 10, 15);
  }
}

function drawField() {
  noStroke();
  fill(60, 180, 75);
  rect(0, 250, width, 150);
}

function drawTrees() {
  for (let i = 0; i < 5; i++) {
    drawTree(250 + i * 90, 230);
  }
}

function drawTree(x, y) {
  fill(100, 50, 0);
  rect(x, y, 10, 40);
  fill(30, 160, 30);
  ellipse(x + 5, y, 50, 50);
}

function drawFlowers() {
  for (let i = 0; i < 20; i++) {
    let x = random(250, 750);
    let y = random(280, 390);
    fill(random(255), random(255), random(255));
    ellipse(x, y, 4, 4);
  }
}

function drawFarm() {
  // Celeiro
  fill(150, 0, 0);
  rect(100, 260, 60, 60);
  fill(255);
  triangle(100, 260, 130, 230, 160, 260);
  rect(120, 290, 20, 30); // porta

  // Cerca
  stroke(139, 69, 19);
  for (let i = 0; i < 6; i++) {
    line(180 + i * 15, 320, 180 + i * 15, 350);
  }
  for (let i = 0; i < 2; i++) {
    line(180, 325 + i * 10, 250, 325 + i * 10);
  }

  // Plantação
  noStroke();
  fill(200, 150, 50);
  for (let i = 0; i < 4; i++) {
    rect(180 + i * 20, 360, 10, 20);
  }
}

function drawAnimals() {
  // Vaca
  fill(255);
  ellipse(190, 320, 20, 15); // corpo
  ellipse(190, 310, 10, 10); // cabeça
  fill(0);
  ellipse(188, 318, 3); // mancha

  // Ovelha
  fill(255);
  ellipse(215, 320, 18, 14);
  ellipse(215, 312, 12, 10);
  fill(0);
  ellipse(212, 319, 3);

  // Galinha
  fill(255);
  ellipse(240, 320, 10, 10);
  fill(255, 0, 0);
  triangle(245, 320, 250, 318, 245, 322); // bico
}
  
function drawParty() {
  fill(255, 255, 200, 80);
  ellipse(650, 330, 250, 120);

  for (let e of emojiObjects) {
    fill(0);
    text(e.emoji, e.x, e.y);
    e.y -= e.speed;
    if (e.y < 240) {
      e.y = random(280, 310);
    }
  }

  for (let i = 0; i < 20; i++) {
    fill(random(255), random(255), random(255));
    ellipse(540 + i * 10, 280 + sin(frameCount * 0.1 + i) * 5, 5);
  }

  for (let p of people) {
    p.dance();
    p.show();
  }
}

class Person {
  constructor(x, y) {
    this.x = x;
    this.baseY = y;
  }

  dance() {
    this.y = this.baseY + sin(frameCount * 0.1 + this.x * 0.01) * 5;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y - 20, 15);
    rect(this.x - 5, this.y - 20, 10, 20);
  }
}
