let vegetables = [];
let cityWidth;
let fieldColor;
let cityColor;
let collectedVegetables = 0;
let cityQuality = 0;
let button;
let lastVegetableTime = 0;
let vegetableInterval = 1000;

function setup() {
  createCanvas(800, 400);
  cityWidth = width / 2;
  fieldColor = color(34, 139, 34);
  cityColor = color(135, 206, 235);

  button = createButton('Entregar Verduras');
  button.position(cityWidth + 20, height - 40);
  button.mousePressed(deliverVegetables);
}

function draw() {
  background(220);

  stroke(0);
  line(cityWidth, 0, cityWidth, height);

  fill(fieldColor);
  rect(0, 0, cityWidth, height);

  fill(cityColor);
  rect(cityWidth, 0, width - cityWidth, height);

  for (let i = 0; i < vegetables.length; i++) {
    vegetables[i].show();
  }

  textSize(24);
  fill(0);
  textAlign(CENTER, TOP);
  text(`Verduras Coletadas: ${collectedVegetables}`, 10, 10);

  textSize(24);
  fill(0);
  textAlign(CENTER, TOP);
  text(`Qualidade de Vida na Cidade: ${cityQuality}%`, width - 10, 10);

  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Entrega de Verduras para a Cidade`, width - cityWidth / 2, height / 2 - 40);
  text(`Qualidade: ${cityQuality}%`, width - cityWidth / 2, height / 2);

  if (millis() - lastVegetableTime > vegetableInterval) {
    lastVegetableTime = millis();
    addVegetable();
  }
}

function mousePressed() {
  if (mouseX < cityWidth) {
    for (let i = vegetables.length - 1; i >= 0; i--) {
      let veg = vegetables[i];
      if (dist(mouseX, mouseY, veg.x, veg.y) < veg.size / 2) {
        vegetables.splice(i, 1);
        collectedVegetables++;
        break;
      }
    }
  }
}

function deliverVegetables() {
  if (collectedVegetables > 0) {
    cityQuality = min(collectedVegetables * 2, 100);
    collectedVegetables = 0;
  }
}

function addVegetable() {
  let x = random(50, cityWidth - 50);
  let y = random(50, height - 50);
  vegetables.push(new Vegetable(x, y));
}

class Vegetable {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = color(random(255), random(255), random(255));
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}