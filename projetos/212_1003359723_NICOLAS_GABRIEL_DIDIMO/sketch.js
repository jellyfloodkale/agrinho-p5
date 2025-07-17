let tempo = 0;
let tratorX;
let plantas = [];
let historia = "Era uma vez uma fazenda onde tudo começava com o plantio...";
let tratorVisivel = true;
let todasColhidas = false;
let cidadeVisivel = false;
let fase = 0;
let fumaça = [];
let produtos = [];
let carros = [];
let fazendeiroFala = "";
let chuva = false;
let acelerado = false;

function setup() {
  createCanvas(800, 400);
  tratorX = width;
  textSize(25);

  for (let i = 0; i < width; i += 30) {
    plantas.push({ x: i, y: 320, fase: "plantada" });
  }
}

function draw() {
  background(135, 206, 250);

  fill(0);
  textSize(20);
  text(historia, 20, 30);
  text(fazendeiroFala, 20, 60);

  if (!cidadeVisivel) {
    desenharFazenda();
  } else {
    desenharCidade();
  }
}

function desenharFazenda() {
  textSize(50);
  text("☀️", 700, 80);

  fill(139, 69, 19);
  rect(0, 300, width, 100);

  if (frameCount % 500 == 0) {
    chuva = !chuva;
    fazendeiroFala = chuva ? "A chuva chegou! As plantas vão crescer mais rápido! ☔" : "O tempo está seco novamente!";
  }

  if (chuva) {
    textSize(30);
    text("💧💧💧", random(width), random(200, 300));
  }

  tempo += acelerado ? 5 : 1;

  if (tempo > 300 && fase == 0) {
    fase = 1;
    historia = "As sementes começaram a brotar e a fazenda se encheu de vida!";
    fazendeiroFala = "Olhem só como estão crescendo! 🌱";
    for (let p of plantas) p.fase = "crescendo";
  }

  if (tempo > 600 && fase == 1) {
    fase = 2;
    historia = "O trigo está maduro e pronto para ser colhido!";
    fazendeiroFala = "Hora da colheita! 🚜";
    for (let p of plantas) p.fase = "maduro";
  }

  if (tempo > 900 && fase == 2) {
    fase = 3;
    historia = "O trator começa a colheita!";
  }

  textSize(25);
  todasColhidas = true;
  for (let p of plantas) {
    if (p.fase == "plantada") text("🌱", p.x, p.y);
    if (p.fase == "crescendo") text("🌿", p.x, p.y);
    if (p.fase == "maduro") {
      text("🌾", p.x, p.y);
      todasColhidas = false;
    }
  }

  if (fase >= 3 && tratorVisivel) {
    textSize(80);
    text("🚜", tratorX, 280);
    tratorX -= acelerado ? 4 : 2;

    for (let p of plantas) {
      if (tratorX - 40 < p.x && tratorX + 40 > p.x) {
        p.fase = "colhido";
      }
    }

    if (todasColhidas) {
      tratorVisivel = false;
      cidadeVisivel = true;
      historia = "O trigo chegou à cidade para ser processado!";
    }
  }
}

function desenharCidade() {
  background(200);

  textSize(60);
  text("🏢🏬🏥🏦", 50, 80);
  text("🏡🏡🏡", 400, 100);

  textSize(50);
  text("🌳🌳🌳", 100, 250);
  text("🌳🌳", 500, 250);

  fill(50);
  rect(0, 320, width, 50);

  textSize(120);
  text("🏭", 300, 180);

  if (frameCount % 10 == 0) {
    fumaça.push({ x: 380, y: 150, alpha: 255 });
  }

  for (let f of fumaça) {
    fill(150, f.alpha);
    ellipse(f.x, f.y, 25, 25);
    f.y -= 1;
    f.alpha -= 5;
  }

  if (frameCount % 30 == 0) {
    produtos.push({ x: 400, y: 250 });
  }

  textSize(60);
  for (let p of produtos) {
    text("🍞", p.x, p.y);
    p.x += acelerado ? 4 : 2;
  }

  if (frameCount % 50 == 0) {
    carros.push({ x: width, y: 340 });
  }

  textSize(50);
  for (let c of carros) {
    text("🚗", c.x, c.y);
    c.x -= acelerado ? 6 : 3;
  }

  if (fase < 5) {
    fase = 5;
    historia = "O trigo está sendo transformado em pão!";
  }

  if (tempo > 1800 && fase == 5) {
    fase = 6;
    historia = "O pão está pronto para ser vendido na cidade!";
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    acelerado = true;
  }
}

function keyReleased() {
  acelerado = false;
}
function desenharCidade() {
  background(200);

  // Criar um chão para os prédios
  fill(120, 70, 50); // Cor de terra
  rect(0, 270, width, 50);

  textSize(60);
  text("🏢🏬🏥🏦", 50, 220); // Prédios comerciais e hospital posicionados corretamente
  text("🏡🏡🏡", 400, 220); // Casas alinhadas sobre o chão

  // Ajustando as árvores para ficarem corretamente no chão
  textSize(50);
  text("🌳🌳🌳", 100, 270); // Árvores alinhadas com a base
  text("🌳🌳", 500, 270); // Mais árvores posicionadas corretamente

  // Rua asfaltada 🛣️
  fill(50);
  rect(0, 320, width, 50);

  textSize(120);
  text("🏭", 300, 180); // Fábrica

  if (frameCount % 10 == 0) {
    fumaça.push({ x: 380, y: 150, alpha: 255 });
  }

  for (let f of fumaça) {
    fill(150, f.alpha);
    ellipse(f.x, f.y, 25, 25);
    f.y -= 1;
    f.alpha -= 5;
  }

  if (frameCount % 30 == 0) {
    produtos.push({ x: 400, y: 250 });
  }

  textSize(60);
  for (let p of produtos) {
    text("🍞", p.x, p.y);
    p.x += acelerado ? 4 : 2;
  }

  if (frameCount % 50 == 0) {
    carros.push({ x: width, y: 340 });
  }

  textSize(50);
  for (let c of carros) {
    text("🚗", c.x, c.y);
    c.x -= acelerado ? 6 : 3;
  }

  if (fase < 5) {
    fase = 5;
    historia = "O trigo está sendo transformado em pão!";
  }

  if (tempo > 1800 && fase == 5) {
    fase = 6;
    historia = "O pão está pronto para ser vendido na cidade!";
  }
}
function desenharCidade() {
  background(200);

  // Criar um chão para os prédios e fábrica
  fill(120, 70, 50); // Cor de terra
  rect(0, 270, width, 50); // Base para os prédios e fábrica

  textSize(60);
  text("🏢🏬🏥🏦", 50, 220); // Prédios comerciais e hospital alinhados corretamente
  text("🏡🏡🏡", 400, 220); // Casas alinhadas sobre o chão

  // Ajustando as árvores para ficarem corretamente no chão
  textSize(50);
  text("🌳🌳🌳", 100, 270); // Árvores alinhadas com a base
  text("🌳🌳", 500, 270);   // Mais árvores posicionadas corretamente

  // Rua asfaltada 🛣️
  fill(50);
  rect(0, 320, width, 50);

  // Ajustando a fábrica para ficar sobre um chão sólido
  textSize(120);
  text("🏭", 300, 220); // Fábrica posicionada corretamente sobre a base

  if (frameCount % 10 == 0) {
    fumaça.push({ x: 380, y: 150, alpha: 255 });
  }

  for (let f of fumaça) {
    fill(150, f.alpha);
    ellipse(f.x, f.y, 25, 25);
    f.y -= 1;
    f.alpha -= 5;
  }

  if (frameCount % 30 == 0) {
    produtos.push({ x: 400, y: 250 });
  }

  textSize(60);
  for (let p of produtos) {
    text("🍞", p.x, p.y);
    p.x += acelerado ? 4 : 2;
  }

  if (frameCount % 50 == 0) {
    carros.push({ x: width, y: 340 });
  }

  textSize(50);
  for (let c of carros) {
    text("🚗", c.x, c.y);
    c.x -= acelerado ? 6 : 3;
  }

  if (fase < 5) {
    fase = 5;
    historia = "O trigo está sendo transformado em pão!";
  }

  if (tempo > 1800 && fase == 5) {
    fase = 6;
    historia = "O pão está pronto para ser vendido na cidade!";
  }
}
