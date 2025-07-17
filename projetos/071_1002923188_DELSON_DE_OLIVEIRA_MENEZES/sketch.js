// Variáveis principais
let caminhaoX = 150;
let velocidade = 3;
let produtoSelecionado = "";
let produtoNaEsteira = false;
let carregado = false;
let produtoNoCaminhao = "";
let etapa = "paradoCampo";
let pontuacao = 0;

// Mensagem de feedback da pontuação
let mensagemPonto = "";
let tempoMensagem = 0;

const galpaoX = 700;
const galpaoY = 230;
const galpaoW = 80;
const galpaoH = 80;

const produtosCampo = ["Frutas", "Legumes", "Leite"];
const produtosCidade = ["Ferramentas", "Tecnologia", "Sementes", "Racao", "Maquinas"];

let entregasCampo = {
  "Ferramentas": 0,
  "Tecnologia": 0,
  "Sementes": 0,
  "Racao": 0,
  "Maquinas": 0
};

let entregasCidade = {
  "Frutas": 0,
  "Legumes": 0,
  "Leite": 0
};

let botoesProdutos = [];

function setup() {
  createCanvas(1000, 650);
  textFont('Arial');

  const todosProdutos = [...produtosCampo, ...produtosCidade];
  todosProdutos.forEach((p, i) => {
    let btn = createButton(p);
    btn.position(20 + i * 110, 130);
    btn.style('font-size', '16px');
    btn.mousePressed(() => {
      if (etapa !== "paradoCampo" && etapa !== "paradoCidade") return;
      produtoSelecionado = p;
      if (etapa === "paradoCampo") {
        if (produtosCampo.includes(p)) {
          produtoNaEsteira = true;
        } else {
          pontuacao = max(0, pontuacao - 1);
          mostraMensagem("-1 ponto por erro!");
        }
      } else if (etapa === "paradoCidade") {
        if (!produtosCidade.includes(p)) {
          pontuacao = max(0, pontuacao - 1);
          mostraMensagem("-1 ponto por erro!");
        }
      }
    });
    botoesProdutos.push(btn);
  });
}

function draw() {
  background(30, 30, 70);
  drawInstrucoes();
  drawCampo();
  drawCidade();
  drawEstrada();
  drawEsteira();
  drawCaminhao();
  drawGalpao();
  drawTabela();

  if (produtoNaEsteira) {
    fill(255, 255, 0);
    rect(35, 245, 20, 10);
    fill(0);
    textSize(12);
    text(produtoSelecionado, 60, 250);
  }

  if (carregado) {
    fill(0, 255, 0);
    rect(caminhaoX + 20, 190, 40, 20);
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(produtoNoCaminhao, caminhaoX + 40, 200);
  }

  if (etapa === "indoCidade") {
    caminhaoX += velocidade;
    if (caminhaoX >= galpaoX - 80) {
      caminhaoX = galpaoX - 80;
      etapa = "paradoCidade";
      entregasCidade[produtoNoCaminhao]++;
      pontuacao += 2;
      mostraMensagem("+2 pontos por entrega correta!");
      carregado = false;
      produtoNoCaminhao = "";
      produtoSelecionado = "";
    }
  } else if (etapa === "voltando") {
    caminhaoX -= velocidade;
    if (caminhaoX <= 150) {
      caminhaoX = 150;
      etapa = "paradoCampo";
      entregasCampo[produtoNoCaminhao]++;
      pontuacao += 2;
      mostraMensagem("+2 pontos por entrega correta!");
      carregado = false;
      produtoNoCaminhao = "";
      produtoSelecionado = "";
      produtoNaEsteira = false;
    }
  }

  if (tempoMensagem > 0) {
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(mensagemPonto, width / 2, 50);
    tempoMensagem--;
  }
}

function mostraMensagem(texto) {
  mensagemPonto = texto;
  tempoMensagem = 120;
}

function mousePressed() {
  if (
    mouseX > galpaoX &&
    mouseX < galpaoX + galpaoW &&
    mouseY > galpaoY &&
    mouseY < galpaoY + galpaoH
  ) {
    if (etapa === "paradoCampo" && produtoNaEsteira && produtoSelecionado !== "") {
      produtoNoCaminhao = produtoSelecionado;
      carregado = true;
      produtoNaEsteira = false;
      etapa = "indoCidade";
    } else if (etapa === "paradoCidade" && produtoSelecionado !== "") {
      if (produtosCidade.includes(produtoSelecionado)) {
        produtoNoCaminhao = produtoSelecionado;
        carregado = true;
        etapa = "voltando";
      } else {
        pontuacao = max(0, pontuacao - 1);
        mostraMensagem("-1 ponto por erro!");
      }
    }
  }
}

function drawInstrucoes() {
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Produtos nascem no campo (frutas, legumes, leite)", 20, 20);
  text("Vão por uma esteira até o caminhão e são levados à cidade", 20, 40);
  text("Produtos da cidade (tecnologia, ferramentas...) voltam ao campo", 20, 60);
  text("Clique no galpão para carregar ou descarregar", 20, 80);
  text("Pontuação: +2 por entrega certa, -1 por erro", 20, 100);
}

function drawEstrada() {
  fill(60);
  rect(0, 260, width, 40);
}

function drawEsteira() {
  fill(100);
  rect(30, 240, 100, 20);
}

function drawGalpao() {
  fill(255, 140, 0);
  rect(galpaoX, galpaoY, galpaoW, galpaoH);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("GALPÃO", galpaoX + galpaoW / 2, galpaoY - 10);
}

function drawCaminhao() {
  fill(255, 0, 0);
  rect(caminhaoX, 220, 80, 40);
  fill(0, 100, 200);
  rect(caminhaoX + 55, 225, 20, 15);
  fill(0);
  ellipse(caminhaoX + 15, 260, 20);
  ellipse(caminhaoX + 65, 260, 20);
}

function drawCampo() {
  fill(34, 139, 34);
  rect(0, 300, width / 2, 350);
  drawArvore(80, 380);
  drawArvore(150, 400);
  drawArvore(230, 390);
  drawVaca(340, 400);
  drawCavalo(420, 420);
  drawGalinha(500, 430);
  drawTrator(150, 450);

  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("CAMPO", 170, 320);
}

function drawCidade() {
  fill(120, 120, 150);
  rect(width / 2, 300, width / 2, 350);
  for (let x = width / 2 + 30; x < width; x += 90) {
    let h = random(60, 100);
    fill(100, 100, 130);
    rect(x, 300 - h, 60, h);
    fill(255, 255, 100, 180);
    for (let wy = 300 - h + 10; wy < 300; wy += 20) {
      for (let wx = x + 10; wx < x + 50; wx += 20) {
        rect(wx, wy, 10, 10);
      }
    }
  }
  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("CIDADE", 680, 320);
}

function drawTabela() {
  let tabX = 740;
  let tabY = 370;
  let tabW = 230;
  let tabH = 280;

  fill(240);
  stroke(0);
  rect(tabX, tabY, tabW, tabH, 8);

  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text("Entregas", tabX + tabW / 2, tabY + 10);

  textSize(13);
  textAlign(LEFT, TOP);
  let y = tabY + 40;

  text("Campo → Cidade:", tabX + 10, y);
  y += 18;
  for (let p of Object.keys(entregasCidade)) {
    text(`${p}: ${entregasCidade[p]}`, tabX + 15, y);
    y += 18;
  }

  y += 10;
  text("Cidade → Campo:", tabX + 10, y);
  y += 18;
  for (let p of Object.keys(entregasCampo)) {
    text(`${p}: ${entregasCampo[p]}`, tabX + 15, y);
    y += 18;
  }

  y += 20;
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text(`Pontuação: ${pontuacao}`, tabX + tabW / 2, y);
}

function drawArvore(x, y) {
  fill(101, 67, 33);
  rect(x - 5, y, 10, 30);
  fill(34, 139, 34);
  ellipse(x, y, 40, 40);
  ellipse(x - 15, y - 15, 35, 35);
  ellipse(x + 15, y - 15, 35, 35);
}

function drawVaca(x, y) {
  fill(255);
  rect(x, y, 50, 30, 5);
  fill(0);
  ellipse(x + 10, y + 10, 10);
  ellipse(x + 35, y + 10, 10);
  fill(255, 100, 100);
  rect(x + 20, y + 5, 10, 10);
}

function drawCavalo(x, y) {
  fill(139, 69, 19);
  rect(x, y, 60, 30, 5);
  fill(160, 82, 45);
  rect(x + 10, y - 15, 15, 15);

  fill(255);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text("cavalo", x + 30, y - 5);
}

function drawGalinha(x, y) {
  fill(255);
  ellipse(x, y, 20, 20);
  fill(255, 0, 0);
  triangle(x + 5, y, x + 10, y - 5, x + 10, y + 5);

  fill(255);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text("galinha", x, y - 10);
}

function drawTrator(x, y) {
  fill(255, 69, 0);
  rect(x, y, 60, 30, 3);
  fill(0);
  ellipse(x + 10, y + 30, 20);
  ellipse(x + 45, y + 30, 20);
  fill(0, 100, 200);
  rect(x + 10, y - 15, 30, 15);
}
