let olhoX, olhoY;
let etapa = 0;

function preload(){
 img= loadImage("milho.png");
img3= loadImage("estrada.png");
img2= loadImage("mercado.png");}
  
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#009688"); // fundo claro

  desenhaCenario();
  desenhaRosto();

  olhoX = map(mouseX, 0, width, 130, 170);
  olhoY = map(mouseY, 0, height, 130, 170);

  // Pupilas móveis
  fill("orange");
  circle(olhoX, olhoY, 10);
  circle(olhoX + 100, olhoY, 10);

  mostraEtapa();

  if (mouseIsPressed) {
    if (mouseX < 200) etapa = 1;         // Campo
    else if (mouseX < 400) etapa = 2;    // Estrada
    else etapa = 3;                      // Cidade
  }
}

function desenhaRosto() {
  fill("#E91E63");
  circle(200, 200, 300); // cabeça
  fill("yellow");
  circle(150, 150, 60); // olho esq
  circle(250, 150, 60); // olho dir
  fill("#8BC34A");
  triangle(200, 180, 170, 220, 220, 220); // nariz
  line(150, 270, 250, 250); // boca
  triangle(50,100,350,100,200,40)
}

function desenhaCenario() {
  // Campo
  fill("#AED581");
  rect(0, 0, 200, 400);
  fill("pink");
  textSize(20);
  text("🌾 Campo", 50, 30);

  // Estrada
  fill("#009688");
  rect(200, 0, 200, 400);
  fill("black");
  text("🚚 Estrada", 230, 30);

  // Cidade
  fill("#9E9E9E");
  rect(400, 0, 200, 400);
  fill("gray");
  text("🏪 Cidade", 450, 30);
}

function mostraEtapa() {
  textSize(18);
  fill("black");

  if (etapa == 1) {
    text("etapa: plantando e colhendo coisas boas🌾.");
    image(img,0,190,120,130);
    text("🚜",200,30);
  } else if (etapa == 2) {
    text("Etapa: Transporte dos alimentos.", 200, 370);
    image(img3,195,250,180,100);
    text("🐎",203,30);
  } else if (etapa == 3) {
    text("Etapa: Chegando ao mercado e consumindo😋", 200, 370);
    image(img2,420,150,180,160);
  } else {
    
    text("Clique no cenário para explorar o caminho do alimento!", 100, 370);}
  }