let fruits = [];
let collectedCount = 0;
let allCollected = false;
let truckX = 30;
let truckY = 390;
let transported = false;

function setup() {
  createCanvas(800, 600);
  textSize(32);
  noStroke();

  // Criar frutas na árvore
  for (let i = 0; i < 20; i++) {
    fruits.push({
      emoji: random(["🍎", "🍒", "🍇", "🍊", "🍐"]),
      x: random(280, 520),
      y: random(130, 270),
      collected: false,
    });
  }
}

function draw() {
  background("#87CEEB"); // Céu azul

  // Terra
  fill("#8B4513");
  rect(0, height - 100, width, 100);

  // Árvore
  textAlign(CENTER, CENTER);
  textSize(500);
  text("🌳", 400, 320);

  // Frutas na árvore
  textSize(40);
  for (let fruit of fruits) {
    if (!fruit.collected) {
      text(fruit.emoji, fruit.x, fruit.y);
    }
  }

  // Agricultor e cesta
  textSize(110);
  text("👨‍🌾", 650, 390);
  text("🧺", 650, 450);

  // Fala do agricultor
  textSize(20);
  fill(0);
  if (allCollected) {
    text("Você colheu tudo, obrigado. 🙏", 650, 290);
    text(" Agora transporte a cidade.", 650, 310);
    text(" CIDADE 🏙️➡️", 700, 200);
  } else {
    text("Clique nas frutas para colher!", width / 2, 80);
    text("Após transporte elas á cidade.", width / 2, 110);
  }

  // Contador
  textSize(24);
  text(`Frutas colhidas: ${collectedCount}`, width / 2, 50);

  // Caminhão
  textAlign(LEFT, TOP);
  textSize(200);
  text("🚘", truckX, truckY);

  // Verifica transporte final
  if (allCollected && truckX >= width - 60 && !transported) {
    transported = true;
  }

  // Mensagem final do caminhão
  if (transported) {
    textSize(40);
    fill(0);
    text("🚘 Parabéns, você transportou as frutas!",  width / 18,  height - 60);
    text("VOCÊ CONCLUIU A MISSÃO!!!!",width/5, height -90);
  }

  textAlign(CENTER, CENTER); // Restaura alinhamento
}

function mousePressed() {
  for (let fruit of fruits) {
    let d = dist(mouseX, mouseY, fruit.x, fruit.y);
    if (d < 30 && !fruit.collected) {
      fruit.collected = true;
      collectedCount++;
    }
  }

  if (collectedCount === fruits.length) {
    allCollected = true;
  }
}

function keyPressed() {
  // Movimento do caminhão com limites
  if (keyCode === LEFT_ARROW && truckX > 0) {
    truckX -= 10;
  } else if (keyCode === RIGHT_ARROW && truckX < width - 50) {
    truckX += 10;
  } else if (keyCode === UP_ARROW && truckY > 0) {
    truckY -= 10;
  } else if (keyCode === DOWN_ARROW && truckY < height - 50) {
    truckY += 10;
  }
}
