let terreno = [];
let sementesTomate = 10;
let sementesAlface = 0;
let sementesCenoura = 0;
let sementesMorango = 0; // Nova planta morango
let dinheiro = 0;
let deposito = { tomate: 0, alface: 0, cenoura: 0, morango: 0 };

const gridLinhas = 5;
const gridColunas = 5;

// Posição do agricultor no grid (linha, coluna)
let agricultor = { linha: 0, coluna: 0 };

// Controle da exibição da ajuda
let mostrandoAjuda = false;

function setup() {
  createCanvas(900, 600);
  for (let i = 0; i < gridColunas; i++) {
    for (let j = 0; j < gridLinhas; j++) {
      terreno.push(new Terreno(i * 100 + 150, j * 100 + 100, i, j));
    }
  }
}

function draw() {
  background(34, 139, 34);
  drawStatusBar();

  for (let i = 0; i < terreno.length; i++) {
    terreno[i].mostrar();
  }

  drawAgricultor();
  drawDeposito();
  drawCidade();
  drawLoja();
  drawHelpButton();

  if (mostrandoAjuda) {
    drawHelpBox();
  }

  for (let i = 0; i < terreno.length; i++) {
    terreno[i].atualizar();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    agricultor.coluna = max(0, agricultor.coluna - 1);
  } else if (keyCode === RIGHT_ARROW) {
    agricultor.coluna = min(gridColunas - 1, agricultor.coluna + 1);
  } else if (keyCode === UP_ARROW) {
    agricultor.linha = max(0, agricultor.linha - 1);
  } else if (keyCode === DOWN_ARROW) {
    agricultor.linha = min(gridLinhas - 1, agricultor.linha + 1);
  }
}

function mousePressed() {
  // Botão ajuda
  let helpX = width - 50;
  let helpY = 10;
  let helpSize = 30;
  if (
    mouseX > helpX &&
    mouseX < helpX + helpSize &&
    mouseY > helpY &&
    mouseY < helpY + helpSize
  ) {
    mostrandoAjuda = !mostrandoAjuda; // Alterna mostrar/esconder ajuda
    return;
  }

  if (mostrandoAjuda) {
    // Se a ajuda está aberta e o clique foi fora da caixinha, fecha ela
    let boxX = width / 2 - 250;
    let boxY = height / 2 - 150;
    let boxW = 500;
    let boxH = 300;
    if (
      mouseX < boxX ||
      mouseX > boxX + boxW ||
      mouseY < boxY ||
      mouseY > boxY + boxH
    ) {
      mostrandoAjuda = false;
    }
    return;
  }

  // Botão vender tudo
  if (mouseX > 30 && mouseX < 120 && mouseY > 240 && mouseY < 280) {
    let totalPlantas = deposito.tomate + deposito.alface + deposito.cenoura + deposito.morango;
    if (totalPlantas > 0) {
      let ganho =
        deposito.tomate * 10 +
        deposito.alface * 7 +
        deposito.cenoura * 8 +
        deposito.morango * 12; // preço do morango
      dinheiro += ganho;
      deposito.tomate = 0;
      deposito.alface = 0;
      deposito.cenoura = 0;
      deposito.morango = 0;
      console.log(`Você vendeu ${totalPlantas} plantas por $${ganho}!`);
    } else {
      console.log("Depósito vazio para vender.");
    }
    return;
  }

  // Cidade: coletar plantas maduras
  if (mouseX > 700 && mouseX < 850 && mouseY > 80 && mouseY < 280) {
    let plantasColetadas = 0;
    for (let i = 0; i < terreno.length; i++) {
      if (terreno[i].plantada && terreno[i].faseCrescimento === 2) {
        deposito[terreno[i].tipoPlanta]++;
        terreno[i].plantada = false;
        terreno[i].faseCrescimento = 0;
        terreno[i].tempoCrescimento = 0;
        terreno[i].tipoPlanta = "";
        terreno[i].tamanhoAtual = 0;
        plantasColetadas++;
      }
    }
    if (plantasColetadas > 0) {
      console.log(`Você coletou ${plantasColetadas} plantas para o depósito.`);
    } else {
      console.log("Nenhuma planta madura para coletar.");
    }
    return;
  }

  // Loja de sementes
  if (mouseX > 710 && mouseX < 840 && mouseY > 370 && mouseY < 400) {
    if (dinheiro >= 5) {
      sementesTomate++;
      dinheiro -= 5;
      console.log("Comprou uma semente de tomate!");
    } else {
      console.log("Dinheiro insuficiente para comprar tomate.");
    }
    return;
  }
  if (mouseX > 710 && mouseX < 840 && mouseY > 410 && mouseY < 440) {
    if (dinheiro >= 3) {
      sementesAlface++;
      dinheiro -= 3;
      console.log("Comprou uma semente de alface!");
    } else {
      console.log("Dinheiro insuficiente para comprar alface.");
    }
    return;
  }
  if (mouseX > 710 && mouseX < 840 && mouseY > 450 && mouseY < 480) {
    if (dinheiro >= 4) {
      sementesCenoura++;
      dinheiro -= 4;
      console.log("Comprou uma semente de cenoura!");
    } else {
      console.log("Dinheiro insuficiente para comprar cenoura.");
    }
    return;
  }
  if (mouseX > 710 && mouseX < 840 && mouseY > 490 && mouseY < 520) {
    if (dinheiro >= 6) {
      sementesMorango++;
      dinheiro -= 6;
      console.log("Comprou uma semente de morango!");
    } else {
      console.log("Dinheiro insuficiente para comprar morango.");
    }
    return;
  }

  // Plantar na posição do agricultor, se tiver sementes e terreno livre
  let index = agricultor.coluna * gridLinhas + agricultor.linha;
  let terrenoSelecionado = terreno[index];

  if (!terrenoSelecionado.plantada) {
    if (sementesTomate > 0) {
      terrenoSelecionado.plantar("tomate");
      sementesTomate--;
    } else if (sementesAlface > 0) {
      terrenoSelecionado.plantar("alface");
      sementesAlface--;
    } else if (sementesCenoura > 0) {
      terrenoSelecionado.plantar("cenoura");
      sementesCenoura--;
    } else if (sementesMorango > 0) {
      terrenoSelecionado.plantar("morango");
      sementesMorango--;
    } else {
      console.log("Sem sementes para plantar!");
    }
  } else {
    console.log("Terreno já está plantado!");
  }
}

function drawButton(x, y, w, h, label) {
  fill(70, 130, 180);
  stroke(0);
  strokeWeight(3);
  rect(x, y, w, h, 5);
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function drawStatusBar() {
  fill(255);
  rect(0, 0, width, 60);
  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text(
    `Sementes Tomate: ${sementesTomate} | Sementes Alface: ${sementesAlface} | Sementes Cenoura: ${sementesCenoura} | Sementes Morango: ${sementesMorango}`,
    10,
    30
  );
  text(`💲: $${dinheiro}`, 700, 30);
  text(`🍅 no Depósito: ${deposito.tomate}`, 10, 50);
  text(`🥬 no Depósito: ${deposito.alface}`, 200, 50);
  text(`🥕 no Depósito: ${deposito.cenoura}`, 400, 50);
  text(`🍓 no Depósito: ${deposito.morango}`, 600, 50);
}

function drawDeposito() {
  stroke("black");
  strokeWeight(3);
  fill("rgb(216,144,91)");
  rect(20, 100, 110, 200, 10);
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text("Depósito\n(planta madura)", 75, 110);
  textSize(14);
  textAlign(LEFT, TOP);
  text(`Tomate: ${deposito.tomate}`, 35, 160);
  text(`Alface: ${deposito.alface}`, 35, 180);
  text(`Cenoura: ${deposito.cenoura}`, 35, 200);
  text(`Morango: ${deposito.morango}`, 35, 220);

  // Botão Vender Tudo com borda
  stroke(0);
  strokeWeight(3);
  fill(150, 0, 0);
  rect(30, 240, 90, 40, 8);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text("Vender Tudo", 75, 260);
}

function drawCidade() {
  stroke("black");
  strokeWeight(3);
  fill(100, 150, 255);
  rect(700, 80, 150, 200, 10);
  noStroke();
  fill(255);
  textSize(18);
  textAlign(CENTER, TOP);
  text("Cidade\n(Venda Plantas)", 775, 90);
}

function drawLoja() {
  stroke("black");
  strokeWeight(3);
  fill(50, 200, 150);
  rect(700, 320, 150, 230, 10);
  noStroke();
  fill(255);
  textSize(18);
  textAlign(CENTER, TOP);
  text("Loja de Sementes", 775, 330);

  drawButton(710, 370, 130, 30, "Comprar 🍅 ($5)");
  drawButton(710, 410, 130, 30, "Comprar 🥬 ($3)");
  drawButton(710, 450, 130, 30, "Comprar 🥕 ($4)");
  drawButton(710, 490, 130, 30, "Comprar 🍓 ($6)");
}

function drawAgricultor() {
  let index = agricultor.coluna * gridLinhas + agricultor.linha;
  let pos = terreno[index];
  textSize(44); // um pouco maior
  textAlign(CENTER, CENTER);
  fill(0);
  text("🧑‍🌾", pos.x + 40, pos.y + 40);
}

function drawHelpButton() {
  let x = width - 50;
  let y = 10;
  let size = 30;
  fill(70, 130, 180);
  stroke(0);
  strokeWeight(3);
  rect(x, y, size, size, 5);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text("?", x + size / 2, y + size / 2);
}

function drawHelpBox() {
  let boxX = width / 2 - 250;
  let boxY = height / 2 - 150;
  let boxW = 500;
  let boxH = 300;

  fill(255, 250);
  stroke(0);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 15);

  fill(0);
  noStroke();
  textSize(18);
  textAlign(LEFT, TOP);
  let textoAjuda = 
    "Ajuda do Jogo:\n\n" +
    "- Use as setas do teclado para mover o agricultor.\n" +
    "- Clique no terreno para plantar sementes (se você tiver).\n" +
    "- Clique na cidade para coletar plantas maduras.\n" +
    "- Clique na loja para comprar sementes com dinheiro.\n" +
    "- Use o depósito para armazenar plantas colhidas.\n" +
    "- Clique em 'Vender Tudo' para vender todas as plantas do depósito.\n" +
    "- Clique no botão '?' para abrir/fechar esta ajuda.";

  text(textoAjuda, boxX + 20, boxY + 20, boxW - 40, boxH - 40);
}

class Terreno {
  constructor(x, y, col, lin) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.lin = lin;
    this.plantada = false;
    this.faseCrescimento = 0;
    this.tempoCrescimento = 0;
    this.tipoPlanta = "";
    this.tamanhoAtual = 0;
  }

  atualizar() {
    if (this.plantada && this.faseCrescimento < 2) {
      this.tempoCrescimento++;
      if (this.tempoCrescimento >= 100) {
        this.faseCrescimento++;
        this.tempoCrescimento = 0;
      }
      this.tamanhoAtual = map(this.faseCrescimento, 0, 2, 0, 40); // plantas menores que o agricultor
    }
  }

  mostrar() {
    // Bordas marrom escuro no terreno
    stroke(101, 67, 33); // marrom escuro
    strokeWeight(3);
    fill(150, 100, 50);  // marrom claro do terreno
    rect(this.x, this.y, 80, 80, 8);

    if (this.plantada) {
      noStroke();
      fill(0, 0, 0, 50);
      ellipse(this.x + 50, this.y + 50, this.tamanhoAtual + 10, 10);

      let emoji = "";
      if (this.tipoPlanta === "tomate") {
        emoji = "🍅";
      } else if (this.tipoPlanta === "alface") {
        emoji = "🥬";
      } else if (this.tipoPlanta === "cenoura") {
        emoji = "🥕";
      } else if (this.tipoPlanta === "morango") {
        emoji = "🍓";
      }
      textSize(this.tamanhoAtual);
      textAlign(CENTER, CENTER);
      fill(0);
      text(emoji, this.x + 40, this.y + 40);
    }
  }

  plantar(tipo) {
    this.plantada = true;
    this.faseCrescimento = 0;
    this.tempoCrescimento = 0;
    this.tipoPlanta = tipo;
    this.tamanhoAtual = 0;
  }
}
