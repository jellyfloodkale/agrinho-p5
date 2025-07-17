let tree;
let nuts = [];
let co2s = [];
let score = 0;
let lives = 3;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  tree = new Tree(width / 2, height - 50);
}

function draw() {
  drawMountainBackground(); 
  
  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(200, 0, 0);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    fill(0);
    text("Pontuação: " + score, width / 2, height / 2 + 40);
    return;
  }

  tree.updatePosition(mouseX);
  tree.show();

  for (let i = nuts.length - 1; i >= 0; i--) {
    nuts[i].move();
    nuts[i].show();
    if (nuts[i].offscreen()) nuts.splice(i, 1);
  }

  for (let i = co2s.length - 1; i >= 0; i--) {
    co2s[i].move();
    co2s[i].show();

    if (co2s[i].offscreen()) {
      co2s.splice(i, 1);
      lives--;
      if (lives <= 0) gameOver = true;
    }

    for (let j = nuts.length - 1; j >= 0; j--) {
      if (co2s[i] && co2s[i].collidesWith(nuts[j])) {
        co2s.splice(i, 1);
        nuts.splice(j, 1);
        score++;
        break;
      }
    }
  }

  if (random(1) < 0.015) co2s.push(new CO2());

  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Pontos: " + score, 10, 10);
  text("Vidas: " + lives, 10, 30);
}

function drawMountainBackground() {
  let skyTop = color(100, 150, 255);
  let skyBottom = color(170, 210, 255);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(skyTop, skyBottom, inter);
    stroke(c);
    line(0, y, width, y);
  }

  drawRealisticClouds();

  drawImprovedForest();
}

function drawRealisticClouds() {
  noStroke();
  fill(255, 255, 255, 220);
  
  ellipse(100, 80, 120, 40);
  ellipse(150, 70, 150, 50);
  ellipse(220, 90, 100, 30);
  
  ellipse(300, 60, 180, 50);
  ellipse(380, 70, 200, 60);
  ellipse(450, 50, 150, 40);
  ellipse(550, 80, 160, 45);

  fill(255, 255, 255, 180);
  ellipse(320, 50, 60, 30);
  ellipse(400, 40, 80, 35);
}


function drawImprovedForest() {
  
  drawTreeRow(0.6, 40, 60, color(30, 70, 30), 100);
  
  drawTreeRow(0.7, 50, 80, color(40, 90, 40), 80);

  drawTreeRow(0.8, 60, 100, color(50, 110, 50), 60);
  
  fill(40, 100, 40);
  rect(0, height - 40, width, 40);
  
  fill(60, 80, 50);
  beginShape();
  vertex(0, height - 40);
  for (let x = 0; x <= width; x += 5) {
    let y = height - 40 + sin(x * 0.1) * 5 - noise(x * 0.05) * 8;
    vertex(x, y);
  }
  vertex(width, height - 40);
  endShape(CLOSE);
}

function drawTreeRow(yPos, minSize, maxSize, col, spacing) {
  for (let x = -spacing/2; x < width + spacing; x += spacing) {
    let treeX = x + noise(x * 0.1) * 20;
    let treeY = height * yPos;
    let treeSize = map(noise(x * 0.2), 0, 1, minSize, maxSize);
    
    fill(60, 40, 30);
    let trunkWidth = treeSize * 0.4;
    let trunkHeight = treeSize * 0.6;
    beginShape();
    vertex(treeX - trunkWidth/2, treeY);
    vertex(treeX - trunkWidth/3, treeY + trunkHeight);
    vertex(treeX + trunkWidth/3, treeY + trunkHeight);
    vertex(treeX + trunkWidth/2, treeY);
    endShape(CLOSE);
    
    fill(col);
    ellipse(treeX, treeY - treeSize * 0.3, treeSize * 0.9, treeSize * 1.2);
    ellipse(treeX - treeSize * 0.2, treeY - treeSize * 0.5, treeSize * 0.7, treeSize);
    ellipse(treeX + treeSize * 0.2, treeY - treeSize * 0.5, treeSize * 0.7, treeSize);
  
    fill(red(col) + 30, green(col) + 30, blue(col) + 20, 150);
    ellipse(treeX - treeSize * 0.15, treeY - treeSize * 0.4, treeSize * 0.5, treeSize * 0.8);
  }
}

function mousePressed() {
  if (mouseButton === LEFT && !gameOver) {
    nuts.push(new Nut(tree.x, tree.y));
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.trunkWidth = 20;
    this.trunkHeight = 30;
  }

  updatePosition(mouseX) {
    this.x = constrain(mouseX, this.size / 2, width - this.size / 2);
  }

  show() {
    fill(139, 69, 19);
    rect(this.x - this.trunkWidth / 2, this.y + 10, this.trunkWidth, this.trunkHeight);
    fill(34, 139, 34);
    ellipse(this.x, this.y - 20, this.size, this.size * 1.5);
    fill(0, 128, 0, 150);  
    ellipse(this.x - 10, this.y - 30, this.size * 1.2, this.size * 1.5);
  }
}

class Nut {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.speed = 7;
    this.color = color(139, 69, 19);
  }

  move() {
    this.y -= this.speed;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  offscreen() {
    return this.y < 0;
  }
}

class CO2 {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = 25;
    this.speed = 2;
    this.color = color(1,1,1);
  }

  move() {
    this.y += this.speed;
  }

  show() {
    fill(this.color);
    noStroke();
    textSize(25);
    textAlign(CENTER, CENTER);
    text("CO₂", this.x, this.y);
  }

  offscreen() {
    return this.y > height;
  }

  collidesWith(nut) {
    let d = dist(this.x, this.y, nut.x, nut.y);
    return d < this.size / 2 + nut.r;
  }
}