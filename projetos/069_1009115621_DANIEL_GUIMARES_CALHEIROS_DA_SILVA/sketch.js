let rainDrops = [];
let plants = [];
let allGrown = false;
let farmerPos;

let selectedPlant = null;

let clouds = [
  { x: 0, y: 80, speed: 2 },
  { x: 200, y: 100, speed: -1.5 },
  { x: 400, y: 70, speed: 1 },
  { x: 600, y: 110, speed: -2.5 },
  { x: 750, y: 90, speed: 1.8 }
];

function setup() {
  createCanvas(800, 400);
  frameRate(60);
  farmerPos = createVector(mouseX, mouseY);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(34, 139, 34);

  // Céu azul claro
  fill(135, 206, 250);
  rect(0, 0, width, height / 2);

  fill(169);
  rect(10, 370, 500, 27);
  rect(500, 290, 150, 200);

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Coletor de água", 250, 380);
  text("Filtrador de água", 575, 380);

  fill(169);
  rect(650, 290, 80, 30);
  fill(0, 191, 255);
  rect(730, 300, 10, 70);

  textSize(150);
  textAlign(RIGHT, TOP);
  text("🏡", width - 10, 100);

  drawLake(750, 380);

  farmerPos.x = mouseX;
  farmerPos.y = mouseY;

  drawFarmer(farmerPos.x, farmerPos.y);

  for (let cloud of clouds) {
    cloud.x += cloud.speed;
    if (cloud.x > width + 50) cloud.x = -50;
    if (cloud.x < -50) cloud.x = width + 50;
    drawCloud(cloud.x, cloud.y);
    rain(cloud.x + 40, cloud.y + 20);
  }

  updatePlants();
  drawPlants();

  drawPlantSelection();
}

function drawPlantSelection() {
  // Configurações do menu
  const menuX = 10;
  const menuY = 10;
  const menuWidth = 260;
  const menuHeight = 80;
  const emojiY = menuY + 55;

  // Fundo branco semi-transparente do menu
  fill(255, 255, 255, 230);
  rect(menuX, menuY, menuWidth, menuHeight, 10);

  fill(0);
  textSize(18);
  textAlign(LEFT, CENTER);
  text("Escolha a planta para plantar:", menuX + 15, menuY + 25);

  let emojis = ["🌱", "🎋", "🌳"];
  let spacing = 70;
  let startX = menuX + 40;

  textSize(40);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < emojis.length; i++) {
    let x = startX + i * spacing;

    // Destaque da planta selecionada
    if (selectedPlant === emojis[i]) {
      fill(0, 150, 0, 200);
      stroke(0);
      strokeWeight(3);
      rect(x - 32, emojiY - 32, 64, 64, 12);
      noStroke();
      fill(0);
    } else {
      fill(0);
    }

    text(emojis[i], x, emojiY);
  }
}

function mouseClicked() {
  // Configurações do menu para detectar clique
  const menuX = 10;
  const menuY = 10;
  const emojiY = menuY + 55;
  let emojis = ["🌱", "🎋", "🌳"];
  let spacing = 70;
  let startX = menuX + 40;

  // Detecta clique no menu
  for (let i = 0; i < emojis.length; i++) {
    let x = startX + i * spacing;
    if (dist(mouseX, mouseY, x, emojiY) < 30) {
      selectedPlant = emojis[i];
      return;
    }
  }

  // Planta a planta selecionada no local do fazendeiro
  if (selectedPlant) {
    let found = plants.find(p => dist(p.x, p.y, farmerPos.x, farmerPos.y) < 15);
    if (!found) {
      plants.push({
        x: farmerPos.x,
        y: farmerPos.y,
        watered: 0,
        size: 25,
        lastWateredTime: 0,
        emoji: selectedPlant
      });
    }
  }
}

function doubleClicked() {
  for (let i = plants.length - 1; i >= 0; i--) {
    let p = plants[i];
    if (dist(p.x, p.y, farmerPos.x, farmerPos.y) < 15) {
      plants.splice(i, 1);
      break;
    }
  }
}

function drawLake(x, y) {
  fill(0, 191, 255);
  ellipse(x, y, 100, 40);
}

function rain(x, y) {
  if (frameCount % 2 === 0) {
    let dropX = x + random(-30, 30);
    let dropY = y + random(0, 10);
    let dropSpeed = random(4, 8);
    let dropSize = random(2, 5);
    rainDrops.push({ x: dropX, y: dropY, speed: dropSpeed, size: dropSize, alpha: 255 });
  }

  for (let i = rainDrops.length - 1; i >= 0; i--) {
    let drop = rainDrops[i];
    stroke(0, 191, 255, drop.alpha);
    strokeWeight(drop.size / 2);
    let x2 = drop.x + drop.size * 0.3;
    let y2 = drop.y + drop.size * 2;
    line(drop.x, drop.y, x2, y2);

    drop.x += 0.5 * drop.size / 3;
    drop.y += drop.speed;

    if (drop.y > height / 2) {
      drop.alpha -= 20;
      if (drop.alpha <= 0) {
        rainDrops.splice(i, 1);
      }
    }
  }

  for (let plant of plants) {
    for (let drop of rainDrops) {
      let d = dist(drop.x, drop.y, plant.x, plant.y);
      if (d < 15) {
        if (plant.watered < 2) {
          plant.watered++;
          plant.lastWateredTime = millis();
        }
      }
    }
  }
}

function updatePlants() {
  for (let plant of plants) {
    if (plant.watered === 1 && millis() - plant.lastWateredTime >= 10000) {
      if (plant.emoji === "🌳") {
        plant.size = 50;
      } else {
        plant.size = 30;
      }
    } else if (plant.watered === 2 && millis() - plant.lastWateredTime >= 10000) {
      if (plant.emoji === "🌳") {
        plant.size = 80; // Cresce até 80 para a árvore
      } else {
        plant.size = 35;
      }
    }
  }

  allGrown = plants.every(plant => {
    if (plant.emoji === "🌳") return plant.size === 80;
    else return plant.size === 35;
  });
}

function drawPlants() {
  textAlign(CENTER, CENTER);
  for (let plant of plants) {
    textSize(plant.size);
    text(plant.emoji, plant.x, plant.y);
  }
}

function drawFarmer(x, y) {
  textSize(46);
  textAlign(CENTER, CENTER);
  text("👨‍🌾", x, y);
}

function drawCloud(x, y) {
  textSize(70);
  textAlign(CENTER, CENTER);
  text("☁️", x, y);
}
