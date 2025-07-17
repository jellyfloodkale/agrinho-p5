let morangos = 0;
let uvas = 0;
let sucos = 0;
let vendidos = 0;
let precoPorSuco = 5.0;
let totalVendas = 0;
let fase = "campo";
let botaoCidade;
let morangueiros = [];

function setup() {
  createCanvas(700, 400);
  textAlign(CENTER);
  textSize(16);

  // Criar morangueiros
  for (let i = 0; i < 4; i++) {
    let x = 120 + i * 130;
    let y = 220;
    morangueiros.push({ x, y });
  }

  // Botão para ir à cidade
  botaoCidade = createButton("Ir para a Cidade 🏙️");
  botaoCidade.position(280, 360);
  botaoCidade.mousePressed(() => {
    fase = "cidade";
    botaoCidade.hide();
  });
}

function draw() {
  background(240);
  if (fase === "campo") {
    drawCampo();
  } else {
    drawCidade();
  }
}

function drawCampo() {
  background(200, 255, 200);

  for (let m of morangueiros) {
    drawMorangueiro(m.x, m.y);
  }

  fill(0);
  text("Clique nos morangueiros para colher 🍓", width / 2, 30);
  text("Clique na plantação para colher uvas 🍇", width / 2, 50);
  text(`Morangos: ${morangos}   |   Uvas: ${uvas}   |   Sucos: ${sucos}`, width / 2, 80);

  // Plantação de uvas
  fill(139, 69, 19);
  rect(500, 250, 120, 100, 20);
  fill(255);
  text("🍇 🍇 🍇", 560, 310);
  text("🍇 🍇 🍇", 580, 320);

  // Botão para suco
  if (uvas >= 1 && morangos >= 1) {
    fill(255);
    rect(250, 300, 200, 50, 10);
    fill(0);
    text("Fazer 1 Suco 🍇🍓🥤", 350, 330);
  }
}

function drawCidade() {
  background(200, 220, 255);
  drawPredios();

  fill(0);
  text("Venda de Sucos 🍇🍓🥤", width / 2, 30);
  text("Disponíveis: " + (sucos - vendidos), width / 2, 70);
  text("Preço por unidade: R$" + precoPorSuco.toFixed(2), width / 2, 100);
  text("Total vendido: R$" + totalVendas.toFixed(2), width / 2, 130);

  fill(255);
  rect(270, 250, 160, 50, 10);
  fill(0);
  text("Vender 1 Suco 🍇🥤", 350, 275);
}

function drawMorangueiro(x, y) {
  fill(255);
  textSize(32);
  text("🍓", x, y);
  textSize(16);
}

function drawPredios() {
  let cores = [
    [255, 100, 100],
    [100, 150, 255],
    [120, 255, 120],
    [200, 150, 255],
    [255, 255, 120],
    [180, 180, 180]
  ];

  for (let i = 0; i < 6; i++) {
    fill(cores[i]);
    let x = 80 + i * 100;
    rect(x, 180, 60, 180);
    fill(255);
    for (let j = 0; j < 5; j++) {
      rect(x + 10, 190 + j * 30, 15, 15);
      rect(x + 30, 190 + j * 30, 15, 15);
    }
  }
}

function mousePressed() {
  if (fase === "campo") {
    for (let m of morangueiros) {
      if (dist(mouseX, mouseY, m.x, m.y) < 30) {
        morangos++;
        break;
      }
    }

    if (mouseX > 500 && mouseX < 620 && mouseY > 250 && mouseY < 350) {
      uvas++;
    }

    if (
      mouseX > 250 &&
      mouseX < 450 &&
      mouseY > 300 &&
      mouseY < 350 &&
      uvas >= 1 &&
      morangos >= 1
    ) {
      uvas--;
      morangos--;
      sucos++;
    }
  } else {
    if (
      mouseX > 270 &&
      mouseX < 430 &&
      mouseY > 250 &&
      mouseY < 300 &&
      sucos - vendidos > 0
    ) {
      vendidos++;
      totalVendas += precoPorSuco;
    }
  }
}
