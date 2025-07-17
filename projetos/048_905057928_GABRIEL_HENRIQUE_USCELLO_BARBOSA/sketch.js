// Imagens
let caminhaoImg;
let carroInimigoImg;
let supermercadoImg;
let vitoriaImg;

// Variáveis do caminhão
let caminhaoX;
let caminhaoY;
let velocidade = 5;
let linhaY = 0;

// Configurações da estrada
let estradaLargura = 400;
let faixaBorda = 10;

// Elementos de cenário
let arvores = [];
let buracos = [];
let carrosInimigos = [];
let elementosLaterais = [];
let pedras = [];

const qtdPedras = 40;

// Estado do jogo
let jogoAtivo = true;
let tempoInicio;
let carrosApareceram = false;
let noiteAtiva = false;
let gotasDeChuva = [];
let particulasPoeira = [];

let supermercadoApareceu = false;
let supermercadoY = -300;
let jogoVencido = false;

// Efeitos e física
let velocidadeLateralAtual = 5;
let velocidadeLateralAlvo = 5;
let ultimoUpdateVel = 0;
let deslizando = 0;
let estradaDeTerra = true;
let transicaoChuva = 0;
let asfaltoDescendo = false;
let asfaltoY = -600;

// Botão para reiniciar o jogo
let botaoReiniciar;

function preload() {
  caminhaoImg = loadImage("caminhão.png");
  carroInimigoImg = loadImage("carro.png");
  supermercadoImg = loadImage("supermercado.png");
  vitoriaImg = loadImage("vitoria.png");
}

function setup() {
  createCanvas(700, 600);
  caminhaoX = width / 2;
  caminhaoY = height - 100;
  imageMode(CENTER);
  tempoInicio = millis();

  // Criação do botão de reiniciar
  botaoReiniciar = createButton("Recomeçar");
  botaoReiniciar.position(width / 2 - 50, height / 2 + 50);
  botaoReiniciar.size(100, 40);
  botaoReiniciar.style("font-size", "16px");
  botaoReiniciar.hide(); // botão inicia escondido
  botaoReiniciar.mousePressed(reiniciarJogo);

  // Elementos iniciais
  for (let i = 0; i < 6; i++) {
    let lado = random() < 0.5 ? "esquerda" : "direita";
    let x = lado === "esquerda"
      ? random(20, (width - estradaLargura) / 2 - 20)
      : random((width + estradaLargura) / 2 + 20, width - 20);
    let y = random(-600, 0);
    elementosLaterais.push({ x, y, tipo: "arvore" });
  }

  for (let i = 0; i < 2; i++) {
    let x = random((width - estradaLargura) / 2 + 20, (width + estradaLargura) / 2 - 60);
    let y = -i * 300;
    let larguraBuraco = random(40, 80);
    let alturaBuraco = random(20, 40);
    buracos.push({ x, y, largura: larguraBuraco, altura: alturaBuraco });
  }

  for (let i = 0; i < qtdPedras; i++) {
    let x = random((width - estradaLargura) / 2 + 10, (width + estradaLargura) / 2 - 10);
    let y = random(height);
    let tamanho = random(4, 8);
    pedras.push({ x, y, tamanho });
  }
}

function draw() {
  let tempoDecorrido = millis() - tempoInicio;

  if (!supermercadoApareceu && tempoDecorrido > 120000) {
    supermercadoApareceu = true;
  }

  if (estradaDeTerra && tempoDecorrido > 60000) {
    asfaltoDescendo = true;
  }

  if (asfaltoDescendo) {
    asfaltoY += 5;
    if (asfaltoY >= 0) {
      estradaDeTerra = false;
      asfaltoDescendo = false;
      asfaltoY = 0;
    }
  }

  background(noiteAtiva ? color(20, 100, 20) : color(30, 150, 30));
  let estradaX = (width - estradaLargura) / 2;

  // Estrada de terra
  if (estradaDeTerra || asfaltoDescendo) {
    let corSeca = color("#7f3e21");
    let corMolhada = color("#421702");
    if (noiteAtiva && transicaoChuva < 1) {
      transicaoChuva += 0.002;
      transicaoChuva = constrain(transicaoChuva, 0, 1);
    }
    let corTransicao = lerpColor(corSeca, corMolhada, transicaoChuva);
    noStroke();
    fill(corTransicao);
    rect(estradaX, 0, estradaLargura, height);
  }

  // Estrada de asfalto
  if (!estradaDeTerra || asfaltoDescendo) {
    fill(noiteAtiva ? 50 : 60);
    noStroke();
    rect(estradaX, asfaltoY, estradaLargura, height);

    stroke(255);
    strokeWeight(faixaBorda);
    line(estradaX, asfaltoY, estradaX, asfaltoY + height);
    line(estradaX + estradaLargura, asfaltoY, estradaX + estradaLargura, asfaltoY + height);

    stroke(255);
    strokeWeight(4);
    let espaco = 40;
    let alturaLinha = 30;
    for (let y = linhaY; y < height; y += espaco + alturaLinha) {
      let yDeslocado = y + asfaltoY;
      if (yDeslocado > 0 && yDeslocado < height) {
        line(width / 2, yDeslocado, width / 2, yDeslocado + alturaLinha);
      }
    }

    if (jogoAtivo && !asfaltoDescendo) {
      linhaY += velocidade;
      if (linhaY > espaco + alturaLinha) linhaY = 0;
    }
  }

  // Obstáculos e cenário (terra)
  if (estradaDeTerra) {
    for (let b of buracos) {
      noStroke();
      fill(noiteAtiva ? color(100, 70, 50) : color(60, 30, 10));
      ellipse(b.x + b.largura / 2, b.y + b.altura / 2, b.largura, b.altura);

      b.y += velocidade;
      if (b.y > height) {
        b.y = 0;
        b.x = random(estradaX + 20, estradaX + estradaLargura - 60);
      }

      if (colidiuComCaminhao(b.x, b.y, b.largura, b.altura)) {
        jogoAtivo = false;
      }
    }

    noStroke();
    for (let p of pedras) {
      fill(80);
      ellipse(p.x, p.y, p.tamanho);
      if (jogoAtivo) {
        p.y += velocidade;
        if (p.y > height) {
          p.y = -random(200, 600);
          p.x = random(estradaX + 10, estradaX + estradaLargura - 10);
        }
      }
    }
  }

  // Adiciona carros inimigos na estrada de asfalto
  if (!estradaDeTerra && jogoAtivo && carrosInimigos.length < 2 && frameCount % 200 === 0) {
    let x = random(estradaX + 50, estradaX + estradaLargura - 50);
    let y = random(-800, -200);
    carrosInimigos.push({ x, y });
  }

  // Noite ativa e chuva
  if (!noiteAtiva && tempoDecorrido > 30000) {
    noiteAtiva = true;
    for (let i = 0; i < 100; i++) {
      gotasDeChuva.push({
        x: random(width),
        y: random(-height, 0),
        comprimento: random(10, 20),
        velocidade: random(6, 10)
      });
    }
  }

  for (let c of carrosInimigos) {
    let w = 80;
    let h = 100;
    image(carroInimigoImg, c.x, c.y, w, h);

    if (jogoAtivo) {
      c.y += velocidade;
      if (c.y > height) {
        c.y = -random(400, 800);
        c.x = random(estradaX + 50, estradaX + estradaLargura - 50);
      }

      if (colidiuComCaminhao(c.x - w / 2, c.y - h / 2, w, h)) {
        jogoAtivo = false;
      }
    }
  }

  // Elementos laterais: árvores
  for (let obj of elementosLaterais) {
    if (obj.tipo === "arvore") {
      noStroke();
      fill(101, 67, 33);
      rect(obj.x - 7, obj.y + 30, 14, 30);
      fill(noiteAtiva ? color(10, 60, 10) : color(20, 80, 20));
      rect(obj.x - 20, obj.y - 10, 40, 40);
      if (jogoAtivo) {
        obj.y += velocidade;
        if (obj.y > height) obj.y = -random(300, 600);
      }
    }
  }

  // Desenho da chuva
  if (noiteAtiva) {
    strokeWeight(1);
    stroke(200);
    for (let gota of gotasDeChuva) {
      line(gota.x, gota.y, gota.x, gota.y + gota.comprimento);
      gota.y += gota.velocidade;
      if (gota.y > height) {
        gota.y = random(-200, 0);
        gota.x = random(width);
      }
    }
  }

  // Partículas de poeira
  if (estradaDeTerra && jogoAtivo && !noiteAtiva && transicaoChuva < 0.01) {
    for (let i = 0; i < 3; i++) {
      particulasPoeira.push({
        x: caminhaoX + random(-30, 30),
        y: caminhaoY + 80 + random(0, 10),
        alpha: 150,
        tamanho: random(4, 10),
        velocidadeY: random(-0.5, -1.5)
      });
    }
  }

  for (let i = particulasPoeira.length - 1; i >= 0; i--) {
    let p = particulasPoeira[i];
    noStroke();
    fill(139, 69, 19, p.alpha);
    ellipse(p.x, p.y, p.tamanho);
    p.y += p.velocidadeY;
    p.alpha -= 2;
    if (p.alpha <= 0) particulasPoeira.splice(i, 1);
  }

  // SUPERMERCADO
  if (supermercadoApareceu) {
    image(supermercadoImg, width / 2, supermercadoY, 250, 120);
    if (!jogoVencido) {
      if (caminhaoY > height / 2) {
        caminhaoY -= 2;
      } else {
        jogoAtivo = false;
        jogoVencido = true;
      }
    }
  }

  image(caminhaoImg, caminhaoX, caminhaoY, 130, 175);

  // Finais do jogo: Vitória e Derrota
  if (jogoAtivo) {
    moverCaminhao();
  } else if (jogoVencido) {
    image(vitoriaImg, width / 2, height / 2, width, height);
    botaoReiniciar.show(); // mostra o botão na vitória
    noLoop(); // para o loop do draw
  } else {
    background(0); // tela preta na derrota
    textAlign(CENTER, CENTER);
    textSize(64);
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(4);
    text("VOCÊ PERDEU!", width / 2, height / 2);
    botaoReiniciar.show(); // mostra o botão na derrota
    noLoop(); // interrompe o draw
  }
}

function moverCaminhao() {
  let agora = millis();
  if (noiteAtiva && agora - ultimoUpdateVel > 500) {
    velocidadeLateralAlvo = random(5, 10);
    ultimoUpdateVel = agora;
  }

  velocidadeLateralAtual = noiteAtiva
    ? lerp(velocidadeLateralAtual, velocidadeLateralAlvo, 0.05)
    : 5;

  if (noiteAtiva && estradaDeTerra) {
    if (keyIsDown(LEFT_ARROW)) deslizando -= velocidadeLateralAtual * 0.2;
    else if (keyIsDown(RIGHT_ARROW)) deslizando += velocidadeLateralAtual * 0.2;
    else deslizando *= 0.85;

    deslizando = constrain(deslizando, -velocidadeLateralAtual * 2, velocidadeLateralAtual * 2);
    caminhaoX += deslizando;
    caminhaoX += sin(frameCount * 0.3) * 0.4;
  } else {
    if (keyIsDown(LEFT_ARROW)) caminhaoX -= velocidadeLateralAtual * 1.4;
    if (keyIsDown(RIGHT_ARROW)) caminhaoX += velocidadeLateralAtual * 1.4;
    deslizando = 0;
  }

  let esquerda = (width - estradaLargura) / 2 + 40;
  let direita = (width + estradaLargura) / 2 - 40;
  caminhaoX = constrain(caminhaoX, esquerda, direita);
}

function colidiuComCaminhao(x, y, largura, altura) {
  let margem = 20;
  let carroLeft = x + margem;
  let carroRight = x + largura - margem;
  let carroTop = y + margem;
  let carroBottom = y + altura - margem;

  let caminhaoLeft = caminhaoX - 60;
  let caminhaoRight = caminhaoX + 60;
  let caminhaoTop = caminhaoY - 85;
  let caminhaoBottom = caminhaoY + 150;

  return (
    caminhaoRight > carroLeft &&
    caminhaoLeft < carroRight &&
    caminhaoBottom > carroTop &&
    caminhaoTop < carroBottom
  );
}

function reiniciarJogo() {
  // Resetar variáveis principais do jogo
  caminhaoX = width / 2;
  caminhaoY = height - 100;
  jogoAtivo = true;
  jogoVencido = false;
  supermercadoApareceu = false;
  supermercadoY = -300;
  asfaltoY = -600;
  estradaDeTerra = true;
  asfaltoDescendo = false;
  noiteAtiva = false;
  transicaoChuva = 0;
  linhaY = 0;
  tempoInicio = millis();
  gotasDeChuva = [];
  particulasPoeira = [];
  carrosInimigos = [];
  pedras = [];
  buracos = [];

  // Recriar pedras
  for (let i = 0; i < qtdPedras; i++) {
    let x = random((width - estradaLargura) / 2 + 10, (width + estradaLargura) / 2 - 10);
    let y = random(height);
    let tamanho = random(4, 8);
    pedras.push({ x, y, tamanho });
  }

  // Recriar buracos
  for (let i = 0; i < 2; i++) {
    let x = random((width - estradaLargura) / 2 + 20, (width + estradaLargura) / 2 - 60);
    let y = -i * 300;
    let larguraBuraco = random(40, 80);
    let alturaBuraco = random(20, 40);
    buracos.push({ x, y, largura: larguraBuraco, altura: alturaBuraco });
  }

  botaoReiniciar.hide();
  loop(); // reinicia o loop do draw
}
