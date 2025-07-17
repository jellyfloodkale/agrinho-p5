function setup() {
  createCanvas(900, 400);
}

var x = 800;
var y = 312;

function draw() {
  desenhaMapa();
  desenhaJogador();
  confereVencedor();

  if (keyIsDown(LEFT_ARROW)) x = x - 3;

  if (keyIsDown(RIGHT_ARROW)) x += 1;
  
}

function desenhaMapa() {
  background("#2196F3");
  fill("rgb(0,145,0)");
  strokeWeight(0);
  rect(0, 325, 900, 75);
  fill("#FFC107");
  circle(15, 15, 150);
  fill("gray");
  rect(0, 315, 900, 15);
  fill("#613221");
  rect(710, 340, 120, 50);
  rect(550, 340, 120, 50);
  textSize(120);
  text("🏙️", -25, 304);
  textSize(20);
  text("🌾", 795, 380);
  text("🌾", 770, 380);
  text("🌾", 745, 380);
  text("🌾", 720, 380);
  text("🌾", 795, 355);
  text("🌾", 770, 355);
  text("🌾", 745, 355);
  text("🌾", 720, 355);
  text("🌽", 635, 380);
  text("🌽", 610, 380);
  text("🌽", 585, 380);
  text("🌽", 560, 380);
  text("🌽", 635, 355);
  text("🌽", 610, 355);
  text("🌽", 585, 355);
  text("🌽", 560, 355);
  textSize(55);
  text("🌳",455, 345);
  text("🌳",250,365);
  text("🌳",350,375);
  text("🌳",150,345);
  text("🌳",80,355);
}

function desenhaJogador() {
  textSize(55);
  text("🚛", x, y);
  textSize(25);
  text("🌾", x + 26, y - 3);
} 
function confereVencedor() {
  if (x < 0){
    textSize(28);
    text("Você chegou a cidade, aperte o start para recomeçar!", 150,140);
    noLoop();
  }
}
function ativaJogo() {
  if (focused == true) {
    background("#2196F3");
  } else {
    background("#03A9F4");
  }
}
