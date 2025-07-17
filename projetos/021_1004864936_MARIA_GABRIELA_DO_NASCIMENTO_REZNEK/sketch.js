let choice = null;
let fieldImproved = false;
let cityImproved = false;
let sustainabilityPoints = 0;
let timer = 0;
let treeGrowth = 0;
let pollutionReduction = 0;

function setup() {
  createCanvas(800, 600);
  textSize(24);
  frameRate(30);
}

function draw() {
  background(255);

  if (fieldImproved) {
    fill(100, 200, 100);
    rect(0, 0, width / 2, height);
    fill(34, 139, 34);
    for (let i = 0; i < treeGrowth; i++) {
      ellipse(100 + i * 50, 350, 50, 50);
    }
  } else {
    fill(150, 200, 100);
    rect(0, 0, width / 2, height);
    fill(34, 139, 34);
    ellipse(150, 350, 50, 50);
    ellipse(250, 450, 50, 50);
  }

  if (cityImproved) {
    fill(200, 100, 100);
    rect(width / 2, 0, width / 2, height);
    fill(50, 50, 255);
    ellipse(width - 100, 100, 100, 100);
  } else {
    fill(200, 150, 100);
    rect(width / 2, 0, width / 2, height);
    fill(100, 100, 100);
    ellipse(width - 100, 100, 80, 80);
  }

  fill(0);
  text("Escolha uma ação para melhorar o ambiente", 20, 50);

  if (choice === "campo") {
    text("Você escolheu o campo! Plantando mais árvores.", 20, 100);
  } else if (choice === "cidade") {
    text("Você escolheu a cidade! Reduzindo a poluição.", 20, 100);
  }

  text("Pontos de Sustentabilidade: " + sustainabilityPoints, 20, 150);
  text("Tempo restante: " + (30 - timer), 20, height - 50);

  if (frameCount % 60 === 0 && timer < 30) {
    timer++;
  }

  if (timer === 30) {
    textSize(36);
    text("Fim do Jogo! Pontuação final: " + sustainabilityPoints, width / 2 - 200, height / 2);
    noLoop();
  }

  if (treeGrowth > 10) {
    fill(0, 255, 0);
    rect(0, height / 2, width / 2, height / 2);
  }

  if (pollutionReduction > 10) {
    fill(50, 150, 255);
    rect(width / 2, 0, width / 2, height);
  }
}

function keyPressed() {
  if (key === 'C' || key === 'c') {
    choice = "campo";
    fieldImproved = true;
    cityImproved = false;
    treeGrowth += 2;
    sustainabilityPoints += 5;
  } else if (key === 'S' || key === 's') {
    choice = "cidade";
    cityImproved = true;
    fieldImproved = false;
    pollutionReduction += 2;
    sustainabilityPoints += 5;
  }

  if (choice === "campo") {
    playSound("planting_tree");
  } else if (choice === "cidade") {
    playSound("reducing_pollution");
  }
}

function playSound(action) {
  if (action === "planting_tree") {
    console.log("Som: Árvores sendo plantadas");
  } else if (action === "reducing_pollution") {
    console.log("Som: Poluição diminuindo");
  }
}

let trees = [];
let animals = [];
let oxygenLevel = 0;
let cityWidth;
let fieldColor;
let cityColor;
let houses = [];

function setup() {
  createCanvas(800, 400);
  cityWidth = width / 2;
  fieldColor = color(34, 139, 34);
  cityColor = color(135, 206, 235);

  for (let i = 0; i < 5; i++) {
    animals.push(new Animal(random(50, cityWidth - 50), random(50, height - 50)));
  }

  for (let i = 0; i < 4; i++) {
    let houseX = cityWidth + random(50, width - 50);
    let houseY = random(100, height - 100);
    houses.push({x: houseX, y: houseY});
  }
}

function draw() {
  background(220);

  stroke(0);
  line(cityWidth, 0, cityWidth, height);

  fill(fieldColor);
  rect(0, 0, cityWidth, height);

  fill(cityColor);
  rect(cityWidth, 0, width - cityWidth, height);

  for (let i = 0; i < trees.length; i++) {
    trees[i].show();
  }

  for (let i = 0; i < animals.length; i++) {
    animals[i].show();
  }

  oxygenLevel = min(trees.length * 5, 100);

  drawCityElements();

  textSize(24);
  fill(0);
  textAlign(CENTER, TOP);
  text("Campo", cityWidth / 2, 10);
  text("Cidade", cityWidth + (width - cityWidth) / 2, 10);

  textSize(32);
  fill(0);
  textAlign(RIGHT, TOP);
  text(`Oxigênio: ${oxygenLevel}%`, width - 20, 20);

  textSize(20);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Melhoria do Oxigênio`, width - cityWidth / 2, height / 2 - 20);
  text(`${oxygenLevel}%`, width - cityWidth / 2, height / 2 + 20);

  fill(0);
  textSize(16);
  textAlign(LEFT, BOTTOM);
  text(" Animais estão no campo, ajudando a natureza!", 10, height - 10);
}

function mousePressed() {
  if (mouseX < cityWidth) {
    let tree = new Tree(mouseX, mouseY);
    trees.push(tree);
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  show() {
    fill(34, 139, 34);
    ellipse(this.x, this.y, this.size);
  }
}

class Animal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.type = random(["cow", "bird"]);
  }

  show() {
    if (this.type === "cow") {
      fill(150, 75, 0);
      ellipse(this.x, this.y, this.size, this.size * 0.75);
    } else if (this.type === "bird") {
      fill(255, 223, 0);
      triangle(this.x - 7, this.y - 5, this.x + 7, this.y - 5, this.x, this.y - 15);
      ellipse(this.x, this.y, this.size, this.size * 0.6);
    }
  }
}

function drawCityElements() {
  for (let i = 0; i < houses.length; i++) {
    let house = houses[i];
    fill(200, 100, 100);
    rect(house.x, house.y, 40, 40);
    fill(150, 75, 0);
    triangle(house.x, house.y, house.x + 40, house.y, house.x + 20, house.y - 20);
  }

  stroke(0);
  line(cityWidth + 50, height - 50, width - 50, height - 50);
  line(cityWidth + 50, height - 100, width - 50, height - 100);
  noStroke();
}
