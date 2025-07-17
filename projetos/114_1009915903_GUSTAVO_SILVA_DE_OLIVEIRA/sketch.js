let colheitadeira;

let plantacao = [];

let particulas = [];

let pontos = 0;

let tempo = 0;

let jogoAtivo = false;

let telaInicial = true;

let intervaloTempo;

let imgColheitadeira, imgSoja, imgTelaInicial, imgCampoColhido;

function preload() {

  imgColheitadeira = loadImage('https://i.postimg.cc/05VZ9RJk/IMG-20250622-125142.png');

  imgSoja           = loadImage('https://i.postimg.cc/8zg8HH02/file-0000000089f8622f9b5992bd952464f5.png');

  // nova imagem de tela inicial em full-screen:

  imgTelaInicial    = loadImage('https://i.postimg.cc/FsBvqHb0/IMG-20250622-131708.jpg');

  imgCampoColhido   = loadImage('https://i.postimg.cc/nV5fsZYc/file-00000000f6b461fb96d42145e5fa6cd7.png');

}

function setup() {

  createCanvas(800, 600);

  textFont('Arial');

  setupColheitadeira();

}

function setupColheitadeira() {

  colheitadeira = {

    x: width / 2,

    y: height - 50,

    tamanho: 50,

    velocidade: 5,

    direcao: -HALF_PI,

    desenhar() {

      push();

      translate(this.x, this.y);

      rotate(this.direcao);

      imageMode(CENTER);

      image(imgColheitadeira, 0, 0, this.tamanho, this.tamanho);

      pop();

    },

    mover() {

      if (!jogoAtivo) return;

      if (keyIsDown(87)) { this.y -= this.velocidade; this.direcao = -HALF_PI; }

      if (keyIsDown(83)) { this.y += this.velocidade; this.direcao = HALF_PI; }

      if (keyIsDown(65)) { this.x -= this.velocidade; this.direcao = PI; }

      if (keyIsDown(68)) { this.x += this.velocidade; this.direcao = 0; }

      this.x = constrain(this.x, 0, width);

      this.y = constrain(this.y, 0, height);

    }

  };

}

function criarPlantacao() {

  plantacao = [];

  const tile = 32;

  for (let x = tile/2; x < width; x += tile) {

    for (let y = tile/2; y < height; y += tile) {

      plantacao.push({

        x, y,

        colhida: false,

        desenhar() {

          imageMode(CENTER);

          image(this.colhida ? imgCampoColhido : imgSoja, this.x, this.y, tile, tile);

        }

      });

    }

  }

}

function iniciarJogo() {

  telaInicial = false;

  jogoAtivo   = true;

  pontos      = 0;

  tempo       = 0;

  colheitadeira.x       = width/2;

  colheitadeira.y       = height-50;

  colheitadeira.direcao = -HALF_PI;

  particulas = [];

  criarPlantacao();

  clearInterval(intervaloTempo);

  intervaloTempo = setInterval(() => {

    if (jogoAtivo) tempo++;

  }, 1000);

}

function draw() {

  if (telaInicial) {

    desenharTelaInicial();

    return;

  }

  background(144, 238, 144);

  // plantação e colheita

  for (let p of plantacao) {

    p.desenhar();

    if (jogoAtivo && !p.colhida && dist(colheitadeira.x, colheitadeira.y, p.x, p.y) < 30) {

      p.colhida = true; pontos++;

      for (let i = 0; i < 10; i++) particulas.push(criarParticula(p.x, p.y));

    }

  }

  // partículas

  for (let i = particulas.length - 1; i >= 0; i--) {

    let pt = particulas[i];

    pt.atualizar(); pt.desenhar();

    if (pt.alpha <= 0) particulas.splice(i, 1);

  }

  // colheitadeira

  colheitadeira.mover();

  colheitadeira.desenhar();

  // HUD

  fill(0); textSize(24); textAlign(RIGHT, TOP);

  text(`Pontos: ${pontos}`, width - 20, 20);

  text(`Tempo: ${tempo}s`, width - 20, 50);

  // fim de jogo

  if (plantacao.every(pl => pl.colhida)) {

    jogoAtivo = false;

    clearInterval(intervaloTempo);

    desenharGameOver();

  }

}

function desenharTelaInicial() {

  // imagem de fundo em full-screen

  imageMode(CORNER);

  image(imgTelaInicial, 0, 0, width, height);

  // botão sobreposto

  fill(50, 150, 50);

  rectMode(CENTER);

  rect(width/2, height/2 + 100, 200, 60, 10);

  fill(255);

  textAlign(CENTER, CENTER);

  textSize(32);

  text("JOGAR", width/2, height/2 + 100);

}

function desenharGameOver() {

  fill(0, 150); rect(0, 0, width, height);

  fill(255); textAlign(CENTER, CENTER);

  textSize(48); text("VOCÊ COLHEU TUDO!", width/2, height/2 - 80);

  textSize(20);

  let msg = "Esse é um exemplo que demonstra como a tecnologia\nmelhorou o trabalho no campo, a colheitadeira\naumentou a eficiência, e diminuiu o tempo de trabalho";

  text(msg, width/2, height/2);

  fill(50, 150, 50);

  rect(width/2, height/2 + 100, 220, 50, 5);

  fill(255); textSize(20); text("JOGAR NOVAMENTE", width/2, height/2 + 100);

}

function criarParticula(x, y) {

  return {

    x, y, vx: random(-1.5,1.5), vy: random(-1.5,1.5), alpha: 255,

    atualizar() { this.x += this.vx; this.y += this.vy; this.alpha -= 5; },

    desenhar() { noStroke(); fill(255,215,0,this.alpha); ellipse(this.x, this.y, 6); }

  };

}

function mouseClicked() {

  if (telaInicial) {

    let bx=width/2, by=height/2+100, bw=200, bh=60;

    if (mouseX>bx-bw/2 && mouseX<bx+bw/2 && mouseY>by-bh/2 && mouseY<by+bh/2) iniciarJogo();

  } else if (!jogoAtivo) {

    let bx=width/2, by=height/2+100, bw=220, bh=50;

    if (mouseX>bx-bw/2 && mouseX<bx+bw/2 && mouseY>by-bh/2 && mouseY<by+bh/2) iniciarJogo();

  }

}

function keyPressed() {

  if (telaInicial && (key===' '||keyCode===ENTER)) iniciarJogo();

}