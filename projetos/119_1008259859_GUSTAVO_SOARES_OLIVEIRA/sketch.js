function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let stage = 0; // 0: intro, 1: give gifts, 2: give life, 3: end
let children = [];
let giftsGiven = 0;
let livesGiven = 0;
let jumpscareTimer = 0;

function setup() {
  createCanvas(400, 400);
  textFont('Courier');
  textAlign(CENTER, CENTER);

  // Crianças: centro em cruz
  children = [
    { x: 200, y: 100, hasGift: false, hasLife: false },
    { x: 100, y: 200, hasGift: false, hasLife: false },
    { x: 300, y: 200, hasGift: false, hasLife: false },
    { x: 200, y: 300, hasGift: false, hasLife: false }
  ];
}

function draw() {
  background(0);

  fill(255);
  textSize(16);

  if (stage === 0) {
    text("GIVE GIFTS.", width / 2, 30);
    if (frameCount > 120) stage = 1;
  } else if (stage === 1) {
    text("GIVE GIFTS.", width / 2, 30);
    drawChildren();

    // Desenha presente se mouse por cima
    for (let c of children) {
      if (!c.hasGift && dist(mouseX, mouseY, c.x, c.y) < 20) {
        fill(0, 255, 0);
        rect(c.x - 10, c.y - 30, 20, 20);
      }
    }

  } else if (stage === 2) {
    text("GIVE LIFE.", width / 2, 30);
    drawChildren(true);

  } else if (stage === 3) {
    background(255);
    fill(255, 0, 0);
    textSize(64);
    text("👻", width / 2, height / 2);
    jumpscareTimer++;
    if (jumpscareTimer > 60) noLoop(); // trava
  }
}

function drawChildren(showMask = false) {
  for (let c of children) {
    fill(255);
    ellipse(c.x, c.y, 30);

    if (c.hasGift) {
      fill(0, 255, 0);
      rect(c.x - 10, c.y - 30, 20, 20);
    }

    if (showMask && c.hasGift) {
      if (c.hasLife) {
        fill(255, 0, 0);
        text("☺", c.x, c.y);
      } else {
        fill(255);
        text("☠", c.x, c.y);
      }
    }
  }
}

function mousePressed() {
  if (stage === 1) {
    for (let c of children) {
      if (!c.hasGift && dist(mouseX, mouseY, c.x, c.y) < 20) {
        c.hasGift = true;
        giftsGiven++;
        if (giftsGiven === 4) stage = 2;
        break;
      }
    }
  } else if (stage === 2) {
    for (let c of children) {
      if (c.hasGift && !c.hasLife && dist(mouseX, mouseY, c.x, c.y) < 20) {
        c.hasLife = true;
        livesGiven++;
        if (livesGiven === 4) stage = 3;
        break;
      }
    }
  }
}
