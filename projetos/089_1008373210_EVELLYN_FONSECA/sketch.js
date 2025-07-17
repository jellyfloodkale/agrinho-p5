function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let player;
let products = [];
let score = 0;
let cityZone, ruralZone, roadZone;
let productImg, playerImg;

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

function preload() {
  playerImg = loadImage('https://cdn-icons-png.flaticon.com/512/252/252025.png');
  productImg = loadImage('https://cdn-icons-png.flaticon.com/512/590/590685.png');
}

function setup() {
  createCanvas(800, 400);

  ruralZone = 0;
  roadZone = width / 2 - 50;
  cityZone = width / 2 + 50;

  player = {
    x: 100,
    y: height / 2,
    size: 40,
    inventory: 0
  };

  for (let i = 0; i < 5; i++) {
    spawnProduct();
  }
}

function draw() {
  background(200);

  drawZones();
  drawPlayer();
  drawProducts();
  displayScore();
  movePlayer();
}

function drawZones() {
  fill(100, 200, 100);
  rect(0, 0, roadZone, height);
  fill(0);
  textSize(16);
  text("ZONA RURAL", 20, 20);

  fill(120);
  rect(roadZone, 0, 100, height);
  fill(255);
  text("LOGÍSTICA", roadZone + 10, 20);

  fill(150, 150, 255);
  rect(cityZone, 0, width - cityZone, height);
  fill(0);
  text("ZONA URBANA", cityZone + 10, 20);
}

function drawPlayer() {
  image(playerImg, player.x, player.y, player.size, player.size);
}

function drawProducts() {
  for (let i = products.length - 1; i >= 0; i--) {
    let p = products[i];
    image(productImg, p.x, p.y, 30, 30);

    if (dist(player.x, player.y, p.x, p.y) < 30) {
      products.splice(i, 1);
      player.inventory += 1;
    }
  }

  if (player.inventory > 0 && player.x > cityZone) {
    score += player.inventory;
    player.inventory = 0;
    for (let i = 0; i < 3; i++) {
      spawnProduct();
    }
  }
}

function displayScore() {
  fill(0);
  textSize(20);
  text(`Produtos coletados: ${player.inventory}`, 10, height - 40);
  text(`Produtos vendidos: ${score}`, 10, height - 20);
}

function spawnProduct() {
  let px = random(20, roadZone - 40);
  let py = random(40, height - 40);
  products.push({ x: px, y: py });
}

// Movimento contínuo
function keyPressed() {
  if (keyCode === UP_ARROW) moveUp = true;
  if (keyCode === DOWN_ARROW) moveDown = true;
  if (keyCode === LEFT_ARROW) moveLeft = true;
  if (keyCode === RIGHT_ARROW) moveRight = true;
}

function keyReleased() {
  if (keyCode === UP_ARROW) moveUp = false;
  if (keyCode === DOWN_ARROW) moveDown = false;
  if (keyCode === LEFT_ARROW) moveLeft = false;
  if (keyCode === RIGHT_ARROW) moveRight = false;
}

function movePlayer() {
  let speed = 3;
  if (moveUp) player.y -= speed;
  if (moveDown) player.y += speed;
  if (moveLeft) player.x -= speed;
  if (moveRight) player.x += speed;

  // Limites da tela
  player.x = constrain(player.x, 0, width - player.size);
  player.y = constrain(player.y, 0, height - player.size);
}