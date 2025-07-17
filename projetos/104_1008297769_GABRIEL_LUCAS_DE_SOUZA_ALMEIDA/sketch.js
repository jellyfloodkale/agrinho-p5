// Tema: Festejando a Conexão Campo-Cidade

// Variáveis do jogo
let produtos = [];
let trator;
let cidade;
let entregaPos;
let entregues = 0;
let tempoRestante = 60;
let jogoAtivo = false;
let inicio;
let acabou = false;
let emojis = {}
let produtosEntregues = [];
let mouseSobreProduto = -1;
let estadoTrator = "esperando"; // Estados possíveis: esperando, indo, indoEntrega, voltando
let produtoSelecionado = null;
let produtoSelecionadoId  = -1;

// Variáveis visuais
let nuvens = [];
let arvores = [];// Array para armazenar as árvores

function preload() {
  emojis.trator = "🚜";// Trator
  emojis.produtos = ["🌽", "🍎", "🍞", "🥕", "☕", "🧀", "🍓", "🥚"];// Produtos
  emojis.casaEntrega = "🏪";// Supermercado
}

function setup() {
  createCanvas(800, 500);
  cidade = createVector(width - 150, height / 2);
  entregaPos = createVector(width - 120, height / 2 + 30);
  trator = new Trator(createVector(100, height / 2));
  trator.direcao = -1;
  criarProdutos();
  criarNuvens();
  criarArvores();// Cria as árvores animadas
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  // Céu
  drawSky();
  
  // Atualiza e desenha as nuvens
  atualizarNuvens();
  
  // Desenha o cenário
  desenhaCampo();
  desenhaCidade();
  
  // Desenha o trator
  trator.mostrar();
  
  // Desenha os produtos
  for (let i = 0; i < produtos.length; i++) {
    if (!produtosEntregues[i]) {
      produtos[i].mostrar();
    }
  }
  
  // Destaca os produtos sob o mouse
  if (mouseSobreProduto >= 0 && !produtosEntregues[mouseSobreProduto] && estadoTrator === "esperando"){
    produtos[mouseSobreProduto].destacar();
  }
  
  // Lógica do trator
  if (jogoAtivo) {
    if (estadoTrator === "indo") {
      let chegouProduto = trator.moverPara(produtoSelecionado.pos.x, produtoSelecionado.pos.y);
      if (chegouProduto) {
        trator.carregarProdutos(produtoSelecionado, produtoSelecionadoId);
        estadoTrator = "indoEntrega";
      }
    }
    else if (estadoTrator === "indoEntrega") {
      let chegouEntrega = trator.moverPara(entregaPos.x, entregaPos.y);
      if (chegouEntrega) {
        trator.descarregar();
        estadoTrator = "voltando";
      }
    }
    else if (estadoTrator === "voltando") {
      let chegouInicio = trator.moverPara(100, height / 2);
      if (chegouInicio) {
        estadoTrator = "esperando";
        produtoSelecionado = null;
        produtoSelecionadoId = -1;
        trator.direcao = -1;
      }
    }
  }
  
  // Área de interação
  if (jogoAtivo) {
    let tempo = int((millis() - inicio) / 1000);
    tempoRestante = max (0, 60 - tempo);
    fill(0)
    textSize(16);
    text("⏱️ Tempo: " + tempoRestante + "s", width / 2, height - 40);
    text("📦 Entregas: " + entregues + "/8", width / 2, height - 20);
    
    if (tempoRestante === 0 && !acabou) {
      acabou = true;
      jogoAtivo = false;
      trator.pos.x = 100;
      trator.pos.y = height / 2;
      trator.direcao = -1;
      trator.produtoCarregando = null;
      estadoTrator = "esperando";
      mostrarResultado();
    }
    
    if (estadoTrator === "esperando") {
      fill(0);
      textSize(16);
      text("Clique em um produto para o trator buscar", width / 2, 50);
    } else if (estadoTrator === "indo") {
      fill(0);
      textSize(16);
      text("Trator indo buscar o produto...", width / 2, 50);
    } else if (estadoTrator === "indoEntraga") {
      fill(0);
      textSize(16);
      text("Trator levando para a cidade...", width / 2, 50);
    } else if (estadoTrator === "voltando") {
      fill(0);
      textSize(16);
      text("Trator voltando para o campo...", width / 2, 50);
    }
  } else if (acabou) {
    mostrarResultado();
  } else {
    textSize(24);
    fill(0);
    text("Dê um clique na tela para iniciar!", width / 2, height / 2 - 25);
    textSize(17);
    text("Instruções:", width / 2, height / 4)
    text("Clique produto por produto, para que o trator possa buscar.", width / 2, height / 3 - 10);
    text("O trator realiza o percurso de forma automática. Faça isso antes do tempo acabar!", width / 2, height / 3 + 10);
  }
}

function criarNuvens() {
  nuvens = [
    { x: 200, y: 80, size: 60, speed: 0.3 },
    { x: 300, y: 120, size: 80, speed: 0.4 },
    { x: 150, y: 150, size: 50, speed: 0.2 },
    { x: 500, y: 100, size: 70, speed: 0.35 },
    { x: 650, y: 130, size: 60, speed: 0.25 },
    { x: 550, y: 80, size: 50, speed: 0.15 }
  ];
}

function atualizarNuvens() {
  fill(255, 255, 255, 180);
  noStroke();
  
  for (let i = 0; i < nuvens.length; i++) {
    let n= nuvens[i];
    n.x += n.speed;
    
    if (n.x - n.size > width) {
      n.x = -n.size;
    }
    
    drawCloud(n.x, n.y, n.size);
  }
}

function criarArvores() {
  arvores = [
    { x: 150, y: height/2 + 70, troncoY: height/2 + 80, largura: 50, altura: 60, fase: random(TWO_PI) },
    { x: 250, y: height/2 + 50, troncoY: height/2 + 60, largura: 60, altura: 70, fase: random(TWO_PI) }
  ]; 
}

function desenharArvores() {
  // Desenha os troncos
  fill(139, 69, 19);
  for (let arvore of arvores) {
    rect(arvore.x - 7.5, arvore.troncoY, 15, 40);
  }
  
  // Desenha as copas das árvores com animação
  fill(0, 100, 0);
  noStroke();
  for (let arvore of arvores) {
    
    // Utiliza o seno para criar movimento oscilatório
    let offset = sin(frameCount * 0.05 + arvore.fase) * 3;
    ellipse(arvore.x + offset, arvore.y, arvore.largura, arvore.altura);
  }
}

function drawSky() {
  let skyTop = color(173, 216, 230);
  let skyBottom = color(100, 149, 237);
  
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(skyTop, skyBottom, inter);
    stroke(c);
    line(0, y, width, y);
  }
  
  fill(255, 255, 0);
  noStroke();
  ellipse(100, 100, 60, 60);
}

function drawCloud(x, y, size) {
  ellipse(x, y, size, size);
  ellipse(x + size*0.6, y, size*0.8, size*0.8);
  ellipse(x + size*0.3, y - size*0.2, size*0.7, size*0.7);
  ellipse(x - size*0.3, y, size*0.5, size*0.5);
}

function desenhaCampo() {
  fill(34, 139, 34);
  rect(0, height / 2, width / 2, height / 2);
  
  // Desenha árvores animadas
  desenharArvores();
  
  fill(255);
  textSize(20);
  text("🌱 Campo", width / 4, height - 30);
}

function mousePressed() {
  if (!jogoAtivo && !acabou) {
    iniciarJogo();
    return;
  }
  
  if (jogoAtivo && estadoTrator === "esperando") {
    for (let i = 0; i < produtos.length; i++) {
      if (! produtosEntregues[i] && dist(mouseX, mouseY, produtos[i].pos.x, produtos[i].pos.y)< produtos[i].tam/2) {
        produtoSelecionado = produtos[i];
        produtosSeledionadoId = i;
        estadoTrator = "indo";
        break;
      }
    }
  }
}

function mouseMoved() {
  mouseSobreProduto = -1;
  if (jogoAtivo && estadoTrator === "esperando") {
    for (let i = 0; i < produtos.length; i++) {
      if (!produtosEntregues[i] && dist(mouseX, mouseY, produtos[i].pos.x, produtos[i].pos.y) < produtos[i].tam/2) {
        mouseSobreProduto = i;
        break;
      }
    }
  }
}

function criarProdutos() {
  produtos = [];
  produtosEntregues = Array(8).fill(false);
  
  // Posições pré-definidas para cada produto
  const posicoes = [
    createVector(40, height * 0.65), // Milho
    createVector(200, height * 0.7),// Maçã
    createVector(325, height * 0.75),// Pão
    createVector(110, height * 0.8),// Cenora
    createVector(280, height * 0.9),// Xícara de café
    createVector(80, height * 0.9),// queijo
    createVector(250, height * 0.80),// morango
    createVector(170, height * 0.85) // Ovo
  ];
  
  for (let i = 0; i < 8; i++) {
    let p = new Produto(posicoes[i], emojis.produtos[i]);
    p.id = i;
    produtos.push(p);
  }
}

function iniciarJogo() {
  entregues = 0;
  criarProdutos();
  trator = new Trator(createVector(100, height / 2));
  trator.direcao = -1;
  inicio = millis();
  tempoRestante = 60;
  jogoAtivo = true;
  acabou = false;
  mouseSobreProduto = -1;
  estadoTrator = "esperando";
  produtoSelecionado = null;
  produtoSelecionadoId = -1;
}

function mostrarResultado() {
  fill(0);
  textSize(24);
  
  if (entregues === 8) {
    text("🎉 Festa completa! Todos os 8 produtos entregues!", width / 2, height / 2);
    text("🏆 Agricultor exemplar!", width / 2, height / 2 + 40);
  } else if (entregues >= 5) {
    text("😊 Boa! " + entregues + " produtos entregues.", width / 2, height / 2);
    text("Quase consequiu todos!", width / 2, height / 2 + 40);
  } else {
    text("😢 Apenas " + entregues + " produtos...", width / 2, height / 2);
    text("A cidade precisa de mais!", width / 2, height / 2 + 40);
  }
  
}

function desenhaCidade() {
  fill(150, 150, 150);
  rect(width / 2, height / 2, width / 2, height / 2);
  
  textSize(40);
  let startX = width - 250;
  let yPos = height / 2 + 70;
  
  text("🏠", startX + 30, yPos - 40);
  text("🏠", startX + 150, yPos - 40);
  
  textSize(50);
  fill(255, 255, 0);
  strokeWeight(2);
  text(emojis.casaEntrega, startX + 90, yPos - 45);
  noStroke();
  
  fill(255, 215, 0);
  textSize(30);
  text("⬇️", startX + 90, yPos - 100);
  
  textSize(40);
  text("🏥", startX, yPos + 30);// Hospital
  text("🏦", startX + 60, yPos + 30);// Banco
  text("🏢", startX + 120, yPos + 30);// Predio residencial
  text("🏢", startX + 180, yPos + 30);// Predio residencial
  text("🏛️", startX + 90, yPos + 90);// Prefeitura
  
  fill(0);
  textSize(18);
  text("🏙️ Cidade", width - 150, height - 30);
}

class Produto {
  constructor(pos, emoji) {
    this.pos = pos.copy();
    this.tam = 40;
    this. carregando = false;
    this.emoji = emoji;
    this.id = -1;
  }
  
  // Desenha produto na tela
  mostrar() {
    if (!this.carregando && !produtosEntregues[this.id]) {
      textSize(32);
      text(this. emoji, this.pos.x, this.pos.y);
  }
}
  
  // Destaca o produto quando o mouse está sobre ele 
  destacar() {
    noFill();
    stroke(255, 255, 0);// Contorno amarelo
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.tam + 10);
    noStroke();
  }
}

// classe que representa o trator
class Trator {
  constructor(pos) {
    this.pos = pos.copy();
    this.velocidade = 3;
    this.produtoCarregando = null;
    this.idProduto = -1;
    this.direcao = -1; // -1 = esquerda, 1 = direita (animação)
  }
  
  // Desenha o trator na tela
  mostrar() {
    push(); 
    translate(this.pos.x, this.pos.y);
    
    // Espelha o trator se estiver indo para a direita
    if (this.direcao > 0) {
      scale(-1, 1);
    }
    
    // Desenha o trator
    textSize(40);
    text(emojis.trator, 0, 0);
    
    if (this.produtoCarregado) {
      textSize(28);
      text(this.produtoCarregando.emoji, 20, -30); 
    }
    
    // Efeito de fumaça (alterna a cada 10 frames)
    if (jogoAtivo && (estadoTrator === "indo" || estadoTrator === "indoEntrega" || estadoTrator === "voltando") && frameCount % 10 < 5) {
      textSize(20);
      text("💨", (this.direcao > 0 ? 40 : 40), 10);
    }
    pop();// Restaura configurações gráficas
  }
  
  // Move o trator na direção do alvo
  moverPara(destinoX, destinoY) {
    let dx = destinoX - this.pos.x;
    let dy = destinoY - this.pos.y;
    this.direcao = dx > 0 ? 1 : -1;//atualiza a direção
    
    // Se estiver muito perto, considera que chegou
    let distancia = dist(this.pos.x, this.pos.y, destinoX, destinoY);
    if (distancia < this.velocidade) {
      this.pos.x = destinoX;
      this.pos.y = destinoY;
      return true;
    }
    
    // Move na direção do alvo
    let vx = (dx / distancia) * this.velocidade;
    let vy = (dy / distancia) * this.velocidade;
    this.pos.x += vx;
    this.pos.y += vy;
    
    return false;
  }
  
  // Carrega um produto no trator
  carregarProdutos(produto, id) {
    if (!this.produtoCarregando) {
      this.produtoCarregando = produto;
      produto.carregando = true;
      this.idProduto = id;
      mouseSobreProduto = -1;
    }
  }
  
  // Descarrega o produto na cidade
  descarregar() {
    if (this.produtoCarregando) {
      produtosEntregues[this.idProduto] = true;
      this.produtoCarregando = null;
      entregues++;
      this.idProduto = 1;
    }
  }
}