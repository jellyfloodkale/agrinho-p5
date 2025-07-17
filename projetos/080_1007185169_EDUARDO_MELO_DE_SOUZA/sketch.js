// ================== VARIÁVEIS ===================
let estado = 'menu';
let botaoSelecionado = 0;
let faqSelecionado = 0;
let tutorialSelecionado = 0;

let guardiao;
let arvores = [];
let fogos = [];
let aguas = [];
let poluicoes = [];
let nuvens = [];

let tempoTotal = 0;
let intervaloFogo = 240;

let missaoAlvo = 0;
let fogosApagadosMissao = 0;
let tempoMissaoAnterior = 0;

let eventoAtual = null;
let tempoEvento = 0;
let proximoEvento = 1800;
let mensagemEvento = '';

let recargaRajada = 0;
let cooldownPlantar = 0;

// ================== FAQ e Tutorial ===================
let categoriasFAQ = [
  { titulo: "Descrição do jogo", texto: "ECOGENESIS é um jogo sobre equilíbrio ambiental.\nVocê é um Guardião do Clima.\nApague incêndios, plante árvores e evite que a poluição destrua o planeta.", aberto: false },
  { titulo: "Objetivo", texto: "Evite que 10 poluições alcancem o céu.\nPlante árvores, apague incêndios e use habilidades.", aberto: false },
  { titulo: "Controles", texto: "Setas: mover\nX: plantar árvore (30s cooldown)\nZ: rajada de vento (água cheia, 20s cooldown)\nEspaço: voltar ou reiniciar", aberto: false },
  { titulo: "Como jogar", texto: "Colete 💧 para apagar 🔥.\nApague fogos para completar missões.\nUse rajada para limpar fogos e plante árvores para reduzir poluição.", aberto: false },
  { titulo: "Autoria", texto: "Desenvolvedor: Eduardo Melo de Souza\nEscola: Colégio Cívico Militar Professora Joana Torres Pereira\nProfessora: Cassiana Ribas", aberto: false }
];

let categoriasTutorial = [
  { titulo: "Movimentação", texto: "Use as setas ↑ ↓ ← → para se mover pelo mapa.", aberto: false },
  { titulo: "Apagar Fogos", texto: "Colete 💧 e toque no 🔥 para apagá-lo.\nCada fogo apagado conta para missões.", aberto: false },
  { titulo: "Plantar Árvores", texto: "Pressione X para plantar.\nCada árvore plantada reduz 1 poluição no céu.\nCooldown de 30 segundos.", aberto: false },
  { titulo: "Rajada de Vento", texto: "Pressione Z com 💧 cheio (4/4) para apagar todos os fogos do mapa.\nCooldown de 20 segundos.", aberto: false },
  { titulo: "Missões", texto: "Apague de 2 a 4 fogos por missão.\nNovas missões aparecem a cada 10 segundos após completar.", aberto: false },
  { titulo: "Eventos Climáticos", texto: "🌧️ Chuva: apaga todos os fogos automaticamente.\n🔥 Calor: mais fogos surgem rapidamente.\nOcorrem a cada 30 segundos.", aberto: false },
  { titulo: "Voltar", texto: "Pressione espaço para voltar ao menu.", aberto: false }
];

// ================== SETUP ===================
function setup() {
  createCanvas(windowWidth, windowHeight);
  guardiao = new Guardiao();
  for (let i = 0; i < 6; i++) arvores.push(new Arvore());
  for (let i = 0; i < 8; i++) nuvens.push(new Nuvem());
}

// ================== DRAW ===================
function draw() {
  if (estado === 'menu') telaMenu();
  else if (estado === 'jogando') {
    fundoGrama();
    telaJogo();
  }
  else if (estado === 'fim') telaFim();
  else if (estado === 'uniao') telaVitoria();
  else if (estado === 'faq') telaFAQ();
  else if (estado === 'tutorial') telaTutorial();

  if (recargaRajada > 0) recargaRajada--;
  if (cooldownPlantar > 0) cooldownPlantar--;
}

// ================== HUD ===================
function exibirHUD() {
  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);

  let min = floor(tempoTotal / 3600);
  let sec = floor((tempoTotal % 3600) / 60);
  let tempoFormatado = nf(min, 2) + ':' + nf(sec, 2);

  text(`💨 Poluição: ${poluicoes.length}/10`, 20, 20);
  text(`⏱️ Tempo: ${tempoFormatado}`, 20, 45);
  text(`🧯 Missão: ${fogosApagadosMissao}/${missaoAlvo}`, 20, 70);
  text(`🌪️ Rajada: ${recargaRajada > 0 ? 'Recarga' : 'Pronto'}`, 20, 95);
  text(`🌳 Cooldown Árvores: ${cooldownPlantar > 0 ? ceil(cooldownPlantar / 60) + 's' : 'Pronto'}`, 20, 120);

  for (let i = 0; i < 4; i++) {
    fill(i < guardiao.inventarioAgua ? '#00f' : '#eee');
    ellipse(25 + i * 25, 160, 18);
  }
}
// ================== MISSÕES ===================
function atualizarMissoes() {
  if (missaoAlvo === 0 && tempoTotal - tempoMissaoAnterior > 600) {
    missaoAlvo = floor(random(2, 5));
    fogosApagadosMissao = 0;
  }

  if (fogosApagadosMissao >= missaoAlvo && missaoAlvo > 0) {
    tempoMissaoAnterior = tempoTotal;
    missaoAlvo = 0;
  }
}

// ================== EVENTOS CLIMÁTICOS ===================
function iniciarEvento() {
  let sorteio = random();
  if (sorteio < 0.5) {
    eventoAtual = 'chuva';
    mensagemEvento = '🌧️ Evento: CHUVA';
    fogos = [];
  } else {
    eventoAtual = 'calor';
    mensagemEvento = '🔥 Evento: CALOR';
  }
  tempoEvento = 600;
}

function atualizarEvento() {
  if (eventoAtual === null && tempoTotal >= proximoEvento) {
    iniciarEvento();
  }

  if (eventoAtual !== null) {
    tempoEvento--;
    if (tempoEvento <= 0) {
      eventoAtual = null;
      mensagemEvento = '';
      proximoEvento = tempoTotal + 1800;
    }
  }
}

// ================== GAMEPLAY ===================
function telaJogo() {
  tempoTotal++;

  let dificuldade = floor(tempoTotal / (60 * 10));
  let fatorCalor = eventoAtual === 'calor' ? 0.5 : 1;
  intervaloFogo = max(90, (240 - dificuldade * 10) * fatorCalor);

  if (frameCount % 120 === 0) arvores.push(new Arvore());
  if (frameCount % int(intervaloFogo) === 0 && arvores.length > 0) fogos.push(new Fogo(random(arvores)));
  if (aguas.length < 7 && frameCount % (guardiao.inventarioAgua === 0 ? 60 : 120) === 0) aguas.push(new Agua());

  atualizarEvento();
  atualizarMissoes();

  nuvens.forEach(n => n.mostrar());

  for (let a of arvores) a.mostrar();
  for (let f of fogos) f.atualizar();
  for (let a of aguas) a.mostrar();
  for (let p of poluicoes) p.atualizar();

  guardiao.mostrar();
  exibirHUD();

  if (tempoTotal > 10800) estado = 'uniao';
  if (poluicoes.length >= 10) estado = 'fim';
}

// ================== MENU ===================
function telaMenu() {
  background(100, 200, 255);
  nuvens.forEach(n => n.mostrar());

  fill(255, 230);
  rect(width / 2 - 250, height / 2 - 200, 500, 400, 20);
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text('🌍 ECOGENESIS 🌍', width / 2, height / 2 - 130);

  let opcoes = ["Jogar", "Tutorial", "FAQ"];
  for (let i = 0; i < opcoes.length; i++) {
    let y = height / 2 - 30 + i * 70;
    fill(i === botaoSelecionado ? 'red' : 'gray');
    rect(width / 2 - 150, y - 25, 300, 50, 10);
    fill(255);
    textSize(24);
    text(opcoes[i], width / 2, y);
  }
}

// ================== FAQ ===================
function telaFAQ() {
  background(200, 230, 255);
  textAlign(CENTER, TOP);
  textSize(28);
  fill(0);
  text("ℹ️ FAQ", width / 2, 50);

  let yAtual = 100;
  for (let i = 0; i < categoriasFAQ.length; i++) {
    let cat = categoriasFAQ[i];
    fill(i === faqSelecionado ? 'red' : 'gray');
    rect(width / 2 - 250, yAtual, 500, 40, 10);
    fill(255);
    textSize(20);
    text(cat.titulo, width / 2, yAtual + 10);
    yAtual += 50;

    if (cat.aberto) {
      fill(0);
      textSize(16);
      text(cat.texto, width / 2, yAtual);
      yAtual += textHeight(cat.texto) + 20;
    }
  }

  fill(0);
  textSize(16);
  text('Pressione espaço para voltar', width / 2, height - 30);
}

// ================== TUTORIAL ===================
function telaTutorial() {
  background(200, 230, 255);
  textAlign(CENTER, TOP);
  textSize(28);
  fill(0);
  text("📖 TUTORIAL", width / 2, 50);

  let yAtual = 100;
  for (let i = 0; i < categoriasTutorial.length; i++) {
    let cat = categoriasTutorial[i];
    fill(i === tutorialSelecionado ? 'red' : 'gray');
    rect(width / 2 - 250, yAtual, 500, 40, 10);
    fill(255);
    textSize(20);
    text(cat.titulo, width / 2, yAtual + 10);
    yAtual += 50;

    if (cat.aberto) {
      fill(0);
      textSize(16);
      text(cat.texto, width / 2, yAtual);
      yAtual += textHeight(cat.texto) + 20;
    }
  }

  fill(0);
  textSize(16);
  text('Pressione espaço para voltar', width / 2, height - 30);
}

// ================== ALTURA DO TEXTO ===================
function textHeight(txt) {
  return txt.split('\n').length * 20;
}
// ================== CLASSES ===================

class Guardiao {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.vel = 5;
    this.inventarioAgua = 0;
  }

  mostrar() {
    this.vel = 5 + floor(tempoTotal / 1800);
    textSize(36);
    text('👼', this.x, this.y);
    this.movimentar();
    this.checarColisoes();
  }

  movimentar() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.vel;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.vel;
    if (keyIsDown(UP_ARROW)) this.y -= this.vel;
    if (keyIsDown(DOWN_ARROW)) this.y += this.vel;

    this.x = constrain(this.x, 20, width - 20);
    this.y = constrain(this.y, 20, height - 20);
  }

  checarColisoes() {
    for (let i = aguas.length - 1; i >= 0; i--) {
      if (this.inventarioAgua < 4 && dist(this.x, this.y, aguas[i].x, aguas[i].y) < 30) {
        this.inventarioAgua++;
        aguas.splice(i, 1);
      }
    }

    for (let i = fogos.length - 1; i >= 0; i--) {
      if (this.inventarioAgua > 0 && dist(this.x, this.y, fogos[i].x, fogos[i].y) < 30) {
        this.inventarioAgua--;
        fogos[i].arvore.viva = false;
        fogos.splice(i, 1);
        if (missaoAlvo > 0) fogosApagadosMissao++;
      }
    }
  }
}

class Arvore {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    this.viva = true;
  }

  mostrar() {
    if (this.viva) {
      textSize(32);
      text('🌳', this.x, this.y);
    }
  }
}

class Fogo {
  constructor(arvore) {
    this.arvore = arvore;
    arvore.viva = false;
    this.x = arvore.x;
    this.y = arvore.y;
    this.tempo = 420;
  }

  atualizar() {
    this.tempo--;
    let transparencia = map(this.tempo, 0, 420, 80, 255);
    push();
    translate(this.x, this.y);
    if (this.tempo < 120) {
      translate(random(-2, 2), random(-2, 2));
    }
    fill(0, 0, 0, transparencia);
    textSize(32);
    text('🔥', 0, 0);
    pop();

    if (this.tempo <= 0) {
      poluicoes.push(new Poluicao(this.x, this.y));
      let index = fogos.indexOf(this);
      if (index > -1) fogos.splice(index, 1);
    }
  }
}

class Agua {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    this.osc = random(TWO_PI);
  }

  mostrar() {
    this.osc += 0.1;
    textSize(28 + sin(this.osc) * 2);
    text('💧', this.x, this.y);
  }
}

class Poluicao {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.osc = random(TWO_PI);
    this.escala = 1;
  }

  atualizar() {
    this.y -= 0.5;
    this.osc += 0.05;
    this.escala = constrain(this.escala + 0.01, 1, 2);
    textSize(24 * this.escala);
    text('💨', this.x + sin(this.osc) * 2, this.y);
  }
}

class Nuvem {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2);
    this.vel = random(0.2, 0.5);
    this.tam = random(80, 150);
  }

  mostrar() {
    noStroke();
    fill(255, 200);
    ellipse(this.x, this.y, this.tam, this.tam * 0.6);
    ellipse(this.x + 40, this.y + 10, this.tam * 0.7, this.tam * 0.5);
    ellipse(this.x - 40, this.y + 15, this.tam * 0.6, this.tam * 0.4);
    this.x += this.vel;
    if (this.x > width + 100) {
      this.x = -100;
      this.y = random(height / 2);
    }
  }
}
function fundoGrama() {
  background(120, 180, 100); // Base verde

  // 🚶‍♂️ Caminho central
  fill(160, 130, 100, 150);
  rect(width / 2 - 50, 0, 100, height);
}
// ================== CONTROLES ===================
function keyPressed() {
  // Navegação do Menu
  if (estado === 'menu') {
    if (keyCode === UP_ARROW) {
      botaoSelecionado = (botaoSelecionado - 1 + 3) % 3;
    }
    if (keyCode === DOWN_ARROW) {
      botaoSelecionado = (botaoSelecionado + 1) % 3;
    }
    if (keyCode === ENTER) {
      if (botaoSelecionado === 0) estado = 'jogando';
      if (botaoSelecionado === 1) estado = 'tutorial';
      if (botaoSelecionado === 2) estado = 'faq';
    }
  }

  // Navegação no FAQ
  if (estado === 'faq') {
    if (keyCode === UP_ARROW) {
      faqSelecionado = (faqSelecionado - 1 + categoriasFAQ.length) % categoriasFAQ.length;
    }
    if (keyCode === DOWN_ARROW) {
      faqSelecionado = (faqSelecionado + 1) % categoriasFAQ.length;
    }
    if (keyCode === ENTER) {
      categoriasFAQ[faqSelecionado].aberto = !categoriasFAQ[faqSelecionado].aberto;
    }
    if (key === ' ') {
      estado = 'menu';
    }
  }

  // Navegação no Tutorial
  if (estado === 'tutorial') {
    if (keyCode === UP_ARROW) {
      tutorialSelecionado = (tutorialSelecionado - 1 + categoriasTutorial.length) % categoriasTutorial.length;
    }
    if (keyCode === DOWN_ARROW) {
      tutorialSelecionado = (tutorialSelecionado + 1) % categoriasTutorial.length;
    }
    if (keyCode === ENTER) {
      categoriasTutorial[tutorialSelecionado].aberto = !categoriasTutorial[tutorialSelecionado].aberto;
    }
    if (key === ' ') {
      estado = 'menu';
    }
  }

  // Voltar após derrota ou vitória
  if ((estado === 'fim' || estado === 'uniao') && key === ' ') {
    reiniciarJogo();
  }

  // Gameplay — Rajada e Plantio
  if (estado === 'jogando') {
    if (key === 'z' && guardiao.inventarioAgua === 4 && recargaRajada === 0) {
      fogos = [];
      recargaRajada = 1200;
    }
    if (key === 'x' && cooldownPlantar === 0) {
      arvores.push(new Arvore());
      cooldownPlantar = 1800;
      if (poluicoes.length > 0) poluicoes.splice(0, 1);
    }
  }
}

// ================== REINICIAR ===================
function reiniciarJogo() {
  estado = 'menu';
  botaoSelecionado = 0;
  faqSelecionado = 0;
  tutorialSelecionado = 0;
  tempoTotal = 0;
  missaoAlvo = 0;
  fogosApagadosMissao = 0;
  tempoMissaoAnterior = 0;
  intervaloFogo = 240;
  eventoAtual = null;
  tempoEvento = 0;
  proximoEvento = 1800;
  mensagemEvento = '';
  recargaRajada = 0;
  cooldownPlantar = 0;

  arvores = [];
  fogos = [];
  aguas = [];
  poluicoes = [];
  guardiao = new Guardiao();
  for (let i = 0; i < 6; i++) arvores.push(new Arvore());
}

// ================== TELAS DE FIM E VITÓRIA ===================
function telaFim() {
  fill(0, 180);
  rect(0, 0, width, height);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("☠️ A poluição tomou conta do planeta!\nPressione espaço para reiniciar", width / 2, height / 2);
}

function telaVitoria() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("🌟 Parabéns, você manteve o equilíbrio!\nPressione espaço para reiniciar", width / 2, height / 2);
}
