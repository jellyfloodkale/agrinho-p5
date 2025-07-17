/**
 * SEÇÃO 1: DECLARAÇÕES DE VARIÁVEIS GLOBAIS
 * =========================================================================
 */

// --- Assets gráficos ---
let imgMorgana, imgCarro, imgQuadro, imgArvore1, imgArvore2, imgArvore3;
let imgNpc1, imgNpc2, imgNpc3;
let imgGatoRight, imgGatoLeft;
let imgCarroLeft;

// --- Estados do jogo ---
let estadoJogo = 'menu';
let missoesVistasNaCidade = false;
let missaoAtivaId = null;
let todasMissoesCompletas = false;
let finalChallengeCompleted = false;
let movimentoBloqueado = false;
let cutsceneStep = 0;
let cutsceneCarroPos = { x: 0, y: 0 };
let interactionCooldown = 0;
let retornoCutsceneStep = 0; 
let cenaDaCutscene = '';

// --- Variáveis do ciclo de dia e noite e estrelas ---
let tempoDoDia = 0; 
const CICLO_DURACAO = 60 * 60 * 4;
let estrelas = [];

// --- Entidades do jogo ---
let morgana = { 
  x: 300, y: 350, w: 80, h: 120, 
  vel: 5, visivel: true, direcao: 'right'
};
let carro = { 
  x: 500, y: 350, emMovimento: false, 
  velocidade: 3, posFinal: 1400 
};
let gato = { 
  x: 0, y: 0, visivel: false, 
  direcao: 'right', estado: '' 
};

// Arrays de elementos do cenário
let vegetacao = [], npcs = [], passaros = [];
let predios = [], predios2 = [], arvores = [], areasOcupadas = [];
let nuvens = [];

// --- Sistemas de minigames ---
let minigameAtivo = false, minigameTrigger = '';
let minigameObjetoAssociado = null, minigameEstado = 'esperando';
let minigameTempoMensagem = 0, minigameMensagem = "";
let minigameAcertos = 0, minigameTentativas = 0;
let minigamePosicaoSucesso = 0, minigameNivel = 1;
let minigameVelocidade = 5, minigameTamanhoZona = 50;
let minigameLinhaX;
let minigameOsuAtivo = false, osuIntroAtivo = false;
let osuCountdownFimFrame = 0, osuAlvos = [], osuPontuacao = 0;
let osuMensagem = { texto: "", cor: [255, 255, 255], tempo: 0 };
let osuProximoAlvoFrame = 0, osuTempoTotal = 20;
let osuTempoRestanteFrame = 0, osuPontuacaoMeta = 1500;
let osuResultado = { mostrando: false, mensagem: "", cor: [255, 255, 255] };
let minigameGuitarHeroAtivo = false, guitarHeroEstado = 'instruções';
let guitarHeroPontos = 0, guitarHeroTempoInicio = 0;
let guitarHeroDuracao = 30, guitarHeroSetas = [];
let guitarHeroLinhaY, guitarHeroZonaAltura = 50;
let guitarHeroProxSetaFrame = 0, guitarHeroResultadoMsg = "";
let guitarHeroButtons = [], guitarHeroCallbackFinal = null;
let guitarHeroMensagem = { texto: "", cor: [255,255,255], tempo: 0 };
let guitarHeroMostrandoAjuda = false;
let guitarHeroHelpButton, guitarHeroHelpVoltarButton;

// --- Sistema de diálogos e interações ---
let interacoesPossiveis = [];
let interacaoAtivaE = null, interacaoAtivaR = null;
let dialogoAtivo = false, dialogoNPC = null;
let dialogoIndex = 0, dialogoAtual = [];
let mensagens = [];
let missoesBoundingBoxes = [];
let desafioPedroPendente = true;

/**
 * =========================================================================
 * SEÇÃO 2: CONSTANTES E CONFIGURAÇÕES
 * =========================================================================
 */
const GROUND_LEVEL = 420;
const NPC_WIDTH = 50, NPC_HEIGHT = 50;
const placaMissaoCidade = { x: 950, y: GROUND_LEVEL - 100, w: 80, h: 100 };
const placaMissaoRural = { x: 70, y: GROUND_LEVEL - 100, w: 80, h: 100 };

const CORES = {
  ceuManhaTopo: [252, 194, 158],
  ceuManhaBase: [255, 153, 153],
  ceuDiaTopo: [173, 216, 230],
  ceuDiaBase: [135, 206, 250],
  ceuTardeTopo: [255, 140, 90],
  ceuTardeBase: [218, 93, 123],
  ceuNoiteTopo: [10, 20, 40],
  ceuNoiteBase: [40, 60, 90],
  rua: [100, 100, 100],
  calcada: [180, 180, 180],
  dialogo: [240, 240, 240, 235],
  botaoJogo: [60, 179, 113],
  botaoCreditos: [100, 149, 237],
  botaoGuia: [255, 190, 0]
};

const missoes = [ { id: 'falar_joao', titulo: "Ajudar João com um desafio", completa: false, scene: 'cidade' }, { id: 'falar_mario', titulo: "Passar no teste de Mário", completa: false, scene: 'cidade' }, { id: 'resgatar_gato', titulo: "Encontrar um amigo felino (Opcional)", completa: false, scene: 'jogando' } ];
const dialogos = { joao: { conversas: [[ { speaker: 'joao', text: "Opa! Cuidado pra não tropeçar. Você é nova por aqui, certo?" }, { speaker: 'morgana', text: "Sou sim, moço. Prazer, sou a Morgana. É que... tem tanta coisa pra ver!" }, { speaker: 'joao', text: "Haha, bem-vinda! Eu sou João. A cidade assusta um pouco no começo, mas você pega o jeito." }, { speaker: 'morgana', text: "Tomara. No campo, a única pressa é a da chuva chegando." }, { speaker: 'joao', text: "Entendo. Que tal um pequeno desafio pra acelerar sua adaptação? Testar os reflexos é o nosso esporte aqui." } ]], posMissao: ["E aí, Morgana!", "Continue explorando!", "Se virando bem?"] }, mario: { conversas: [[ { speaker: 'mario', text: "Ei. Cuidado onde pisa. Essa calçada não é pista de corrida." }, { speaker: 'morgana', text: "Oh! Desculpe, moço. Sou a Morgana, é meu primeiro dia aqui." }, { speaker: 'mario', text: "Percebe-se. Meu nome é Mário. E um conselho: não peça desculpas, acelere o passo." }, { speaker: 'morgana', text: "Vou me acostumar. No campo a gente aprende a ter agilidade pra outras coisas." }, { speaker: 'mario', text: "Agilidade, é? Gosto de ver. Palavras são fáceis. Mostre-me do que é capaz com um pequeno teste." } ]], posMissao: ["Olha só. Sobreviveu.", "Continue assim e talvez você dure uma semana.", "Não baixe a guarda."] }, pedro: { desafio: [[ { speaker: 'pedro', text: "Olá! Você não me parece familiar. Bem-vinda a esta parte da cidade!" }, { speaker: 'morgana', text: "Obrigada! Meu nome é Morgana, acabei de chegar." }, { speaker: 'pedro', text: "Notei seu olhar... você parece ter o espírito para desafios. Para realmente entender este lugar, você precisa sentir o pulso dele." }, { speaker: 'pedro', text: "Proponho uma última prova. Um teste de ritmo. Mostre-me que você consegue acompanhar a batida da cidade!" }, { speaker: 'morgana', text: "Uma prova final? Certo, eu topo o desafio!" } ]], derrota: [[ { speaker: 'pedro', text: "Quase... você tem a garra, mas o ritmo ainda lhe escapa. Não se preocupe." }, { speaker: 'pedro', text: "A cidade tem sua própria canção, leva tempo para aprendê-la. Fale comigo quando quiser tentar de novo." }, { speaker: 'morgana', text: "(Preciso me concentrar mais...)"} ]], vitoria: [[ { speaker: 'pedro', text: "Incrível! Essa precisão... esse ritmo... você não está apenas de passagem, está?" }, { speaker: 'pedro', text: "Você realmente entendeu a alma deste lugar. Sinta-se em casa, Morgana." }, { speaker: 'morgana', text: "(Seja no campo ou na cidade... o importante é encontrar meu próprio ritmo. E acho que... eu encontrei.)"} ]], posMissao: ["E aí, Morgana! Orgulhoso do seu progresso.", "Continue explorando nosso bairro!"] } };

const dialogoDespedida = [
  { speaker: 'morgana_pensando', text: "Consegui... Eu realmente consegui entender este lugar." },
  { speaker: 'morgana_pensando', text: "João, Mário, Pedro... até meu amigo gato. Todos me ensinaram algo sobre a cidade. E eu acho que também mostrei a eles um pouco do campo." },
  { speaker: 'morgana_pensando', text: "Não é sobre um ser melhor que o outro. É sobre como eles se completam. A calma e a pressa, a natureza e o concreto... tudo faz parte de um ritmo maior." },
  { speaker: 'morgana_pensando', text: "Festejar essa conexão... é isso que importa. Acho que está na hora de levar o que aprendi de volta para casa."},
];

const dialogoFimComGato = [
    { speaker: 'morgana', text: "Estamos em casa, pequeno explorador. O que achou do mundo de concreto e luzes?" },
    { speaker: 'gato', text: "Meow... prrr... meow?" },
    { speaker: 'morgana', text: "Eu sei. É barulhento, apressado... mas tem sua própria música. E pessoas com corações bons, mesmo que escondidos." },
    { speaker: 'gato', text: "Meeeeow!" },
    { speaker: 'morgana', text: "Sim, mas nada como o cheiro de grama molhada. Mostramos a eles um pouco da nossa calma, e eles nos mostraram a energia deles. Acho que é um bom equilíbrio. A aventura agora é aqui." }
];

const dialogoFimSemGato = [
    { speaker: 'morgana_pensando', text: "De volta ao lar. O ar aqui é tão... diferente. Tão quieto." },
    { speaker: 'morgana_pensando', text: "Foi uma jornada e tanto. Aprendi a dançar no ritmo deles, a encontrar meu espaço na multidão." },
    { speaker: 'morgana_pensando', text: "Mas este aqui... este é o meu ritmo de verdade. O da terra, do vento nas folhas." },
    { speaker: 'morgana_pensando', text: "Acho que o segredo não é escolher um ou outro. É carregar um pouco de cada um dentro de si. Levei o campo para a cidade, e trouxe a cidade para o meu coração. Agora, é hora de descansar." }
];

const cutsceneDialogo = [ { speaker: 'morgana_pensando', text: "Ufa... consegui! No começo achei que não daria conta." }, { speaker: 'morgana_pensando', text: "As pessoas aqui parecem tão sérias e apressadas, mas no fundo... são só pessoas." }, { speaker: 'morgana', text: "Acho que fiz alguns amigos. E aprendi bastante! Talvez... talvez eu possa continuar explorando." }, { speaker: 'morgana', text: "É hora de seguir em frente. Ver o que mais esse mundo tem a oferecer!" }, ];
let menuButtons = [], creditosButtons = [], historiaButtons = [];
let objetivoButtons = [], missoesButtons = [], dialogoButtons = [];
let guiaButtons = [], osuResultadoButtons = [], decisaoButtons = [];
let btnProxCidade = null;

/**
 * =========================================================================
 * SEÇÃO 3: CLASSES DO JOGO
 * =========================================================================
 */
class OsuAlvo { constructor(x, y) { this.x = x; this.y = y; this.raio = 50; this.raioAproximacao = this.raio * 3; this.criacaoFrame = frameCount; this.tempoVidaFrames = 100; this.clicado = false; this.expirado = false; this.cor = color(random(100,255), random(100,255), random(100,255)); } update() { this.raioAproximacao = lerp(this.raioAproximacao, this.raio, 0.06); if(frameCount > this.criacaoFrame + this.tempoVidaFrames) { this.expirado = true; } } draw() { push(); translate(this.x, this.y); noFill(); stroke(255, 255, 255, 150); strokeWeight(5); ellipse(0, 0, this.raioAproximacao * 2); noStroke(); fill(this.cor); ellipse(0, 0, this.raio * 2); pop(); } verificarClique(px, py) { if(dist(px, py, this.x, this.y) < this.raio) { this.clicado = true; let p = abs(this.raioAproximacao - this.raio); if(p < 10) return 'perfeito'; if(p < 25) return 'medio'; return 'bom'; } return null; } }
class Button { constructor(x, y, w, h, texto, corBase, onClick) { this.x = x; this.y = y; this.w = w; this.h = h; this.texto = texto; this.corBase = color(corBase); this.corHover = color( min(255, red(this.corBase) + 30), min(255, green(this.corBase) + 30), min(255, blue(this.corBase) + 30) ); this.corClick = color( max(0, red(this.corBase) - 25), max(0, green(this.corBase) - 25), max(0, blue(this.corBase) - 25) ); this.onClick = onClick; this.scale = 1; this.yOffset = 0; } isHovering() { return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h; } draw() { let cor = this.corBase; let s = 1; let yOff = 0; let shY = 4; let shB = 10; if(this.isHovering()) { cor = this.corHover; s = 1.05; shY = 6; shB = 15; if(mouseIsPressed && mouseButton === LEFT) { cor = this.corClick; s = 0.95; yOff = 4; shY = 2; shB = 5; } } this.scale = lerp(this.scale, s, 0.2); this.yOffset = lerp(this.yOffset, yOff, 0.2); push(); translate(this.x + this.w/2, this.y + this.h/2 + this.yOffset); drawingContext.shadowBlur = shB; drawingContext.shadowColor = 'rgba(0,0,0,0.35)'; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = shY / this.scale; scale(this.scale); noStroke(); fill(cor); rectMode(CENTER); rect(0, 0, this.w, this.h, 15); drawingContext.shadowBlur = 0; drawingContext.shadowOffsetY = 0; fill(255); textSize(this.h * 0.4); textAlign(CENTER, CENTER); textStyle(BOLD); text(this.texto, 0, -2); textStyle(NORMAL); pop(); } handleMousePressed() { if(this.isHovering()) { this.onClick(); } } }
class Seta { constructor(direcao, velocidade) { this.direcao = direcao; this.w = 50; this.h = 50; this.y = -this.h; this.velocidade = velocidade; this.ativa = true; const colunasX = { 'left': width/2 - 150, 'down': width/2 - 50, 'up': width/2 + 50, 'right': width/2 + 150, }; this.x = colunasX[direcao]; } update() { this.y += this.velocidade; if(this.y > guitarHeroLinhaY + guitarHeroZonaAltura) { this.ativa = false; } } draw() { push(); translate(this.x, this.y); stroke(20); strokeWeight(3); let arrowColor; switch(this.direcao) { case 'left': arrowColor = color(0, 150, 255); break; case 'down': arrowColor = color(0, 200, 0); break; case 'up': arrowColor = color(255, 200, 0); break; case 'right': arrowColor = color(255, 0, 0); break; } fill(arrowColor); rectMode(CENTER); const headSize = this.w * 0.5; const stemW = this.w * 0.4; const stemH = this.h * 0.6; switch(this.direcao) { case 'up': rect(0, headSize/2, stemW, stemH); triangle(0, -headSize, -headSize, 0, headSize, 0); break; case 'down': rect(0, -headSize/2, stemW, stemH); triangle(0, headSize, -headSize, 0, headSize, 0); break; case 'left': rect(headSize/2, 0, stemH, stemW); triangle(-headSize, 0, 0, -headSize, 0, headSize); break; case 'right': rect(-headSize/2, 0, stemH, stemW); triangle(headSize, 0, 0, -headSize, 0, headSize); break; } pop(); } }
class Passaro { constructor() { this.x = random(width); this.y = random(50, 150); this.velX = random(1, 3); this.asaAngle = random(TWO_PI); } mover() { this.x += this.velX; if(this.x > width + 20) { this.x = -20; this.y = random(50, 150); } this.asaAngle += 0.1; } desenhar() { push(); translate(this.x, this.y); fill(100); ellipse(0, 0, 15, 10); let a = sin(this.asaAngle) * 5; fill(80); triangle(-5, a, -15, a - 5, -15, a + 5); triangle(5, a, 15, a - 5, 15, a + 5); fill(255, 165, 0); triangle(7, 0, 12, -2, 12, 2); pop(); } }
class Nuvem {
  constructor() {
    this.x = random(-200, width);
    this.y = random(50, 200);
    this.velocidade = random(0.2, 1.0);
    this.escala = random(0.8, 1.5);
    this.podeSerPoluida = random() < 0.6;
    let tomCinza = random(60, 120);
    this.corPoluida = color(tomCinza, tomCinza, tomCinza, 220);
    let tomBranco = random(240, 255);
    this.corLimpa = color(tomBranco, tomBranco, tomBranco, 230);
  }
  mover() {
    this.x += this.velocidade;
    if (this.x > width + 200 * this.escala) {
      this.x = -200 * this.escala;
      this.y = random(50, 200);
    }
  }
  desenhar() {
    let corFinal;
    const naCidade = (estadoJogo === 'cidade' || estadoJogo === 'cidade_2');
    const noQuadroVindoDaCidade = (estadoJogo === 'missoes' && interacaoAtivaE && (interacaoAtivaE.cenaOrigem === 'cidade' || interacaoAtivaE.cenaOrigem === 'cidade_2'));
    
    if ((naCidade || noQuadroVindoDaCidade) && this.podeSerPoluida) {
      corFinal = this.corPoluida;
    } else {
      corFinal = this.corLimpa;
    }
    push();
    noStroke();
    fill(corFinal);
    translate(this.x, this.y);
    scale(this.escala);
    ellipse(0, 0, 140, 70);
    ellipse(60, 0, 120, 60);
    ellipse(30, -20, 100, 50);
    pop();
  }
}

/**
 * =========================================================================
 * SEÇÃO 4: FUNÇÕES PRINCIPAIS DO P5.JS
 * =========================================================================
 */
function preload() {
  imgMorgana = loadImage('https://i.imgur.com/LZBQtei.png');
  imgCarro = loadImage('https://i.imgur.com/jbnfU70.png');
  imgQuadro = loadImage('https://i.imgur.com/Za11PmV.png');
  imgArvore1 = loadImage('https://i.imgur.com/MoSlnMZ.png');
  imgArvore2 = loadImage('https://i.imgur.com/CWcFin3.png');
  imgArvore3 = loadImage('https://i.imgur.com/xAyG6bW.png');
  imgNpc1 = loadImage('https://i.imgur.com/n4c8a8e.png');
  imgNpc2 = loadImage('https://i.imgur.com/5GpM0Wt.png');
  imgNpc3 = loadImage('https://i.imgur.com/tMIGKwT.png');
  imgGatoRight = loadImage('https://i.imgur.com/eXE13VR.png');
  imgGatoLeft = loadImage('https://i.imgur.com/z4jg26J.png');
}

function setup() {
  createCanvas(1400, 600);

  imgCarroLeft = createGraphics(imgCarro.width, imgCarro.height);
  imgCarroLeft.push();
  imgCarroLeft.translate(imgCarro.width, 0);
  imgCarroLeft.scale(-1, 1);
  imgCarroLeft.image(imgCarro, 0, 0);
  imgCarroLeft.pop();

  minigameLinhaX = width / 2;
  guitarHeroLinhaY = height - 100;
  inicializarCenas();
  inicializarBotoes();
  inicializarEstrelas();
  textFont('Helvetica');
}

function draw() {
  if (!['menu', 'creditos', 'guia', 'fim_de_jogo'].includes(estadoJogo)) {
    tempoDoDia = (tempoDoDia + 1) % CICLO_DURACAO;
  }

  if (interactionCooldown > 0) interactionCooldown--;
  gerenciarCursor();

  if (minigameGuitarHeroAtivo) { desenharMinigameGuitarHero(); return; }
  if (osuResultado.mostrando) { desenharOsuResultado(); return; }
  if (osuIntroAtivo) { desenharMinigameOsuIntro(); return; }
  if (minigameOsuAtivo) { desenharMinigameOsu(); return; }

  switch (estadoJogo) {
    case 'menu': desenharMenu(); break;
    case 'jogando': desenharCenaRural(); break;
    case 'creditos': desenharCreditos(); creditosButtons.forEach(b => b.draw()); break;
    case 'cidade': desenharCenaUrbana(); break;
    case 'cidade_2': desenharCenaUrbana2(); break;
    case 'historia': desenharHistoria(); historiaButtons.forEach(b => b.draw()); break;
    case 'objetivo': desenharObjetivo(); objetivoButtons.forEach(b => b.draw()); break;
    case 'missoes':
      let cenaOrigem = interacaoAtivaE ? interacaoAtivaE.cenaOrigem : 'cidade';
      if (cenaOrigem === 'cidade') desenharCenaUrbana();
      else if (cenaOrigem === 'cidade_2') desenharCenaUrbana2();
      else desenharCenaRural();
      desenharMenuMissoes();
      missoesButtons.forEach(b => b.draw());
      break;
    case 'guia': desenharGuiaCompleto(); break;
    case 'cutscene_final': desenharCutsceneFinal(); break;
    case 'cutscene_retorno_campo': desenharCutsceneRetorno(); break;
    case 'decisao_final': desenharTelaDecisao(); break;
    case 'fim_de_jogo': desenharFimDeJogo(); break;
  }

  if (!dialogoAtivo && !['cutscene_final', 'cutscene_retorno_campo', 'decisao_final', 'menu', 'guia', 'creditos', 'fim_de_jogo'].includes(estadoJogo)) {
    if (['jogando', 'cidade', 'cidade_2'].includes(estadoJogo)) {
      if (!minigameAtivo) gerenciarPromptsDeInteracao();
      desenharMissaoAtivaHUD();
      if(estadoJogo === 'cidade') desenharAvisoQuadroMissao(); // --- MELHORIA ---
      if (todasMissoesCompletas && !finalChallengeCompleted && btnProxCidade) { btnProxCidade.draw(); }
    }
  }

  if (minigameAtivo) desenharMinigame();
  if (dialogoAtivo && estadoJogo !== 'fim_de_jogo') desenharDialogo(); 
  desenharMensagens();
}

/**
 * =========================================================================
 * SEÇÃO 5: GERENCIAMENTO DE ENTRADAS
 * =========================================================================
 */
function mousePressed() { if (minigameGuitarHeroAtivo) { if(guitarHeroMostrandoAjuda) { guitarHeroHelpVoltarButton.handleMousePressed(); } else { guitarHeroButtons.forEach(b => b.handleMousePressed()); guitarHeroHelpButton.handleMousePressed(); } return; } if (minigameOsuAtivo) { for (let i = osuAlvos.length - 1; i >= 0; i--) { let r = osuAlvos[i].verificarClique(mouseX, mouseY); if (r) { if (r === 'perfeito') { osuPontuacao += 300; osuMensagem = { texto: "Perfeito", cor: color(173, 216, 230), tempo: 45 }; } else if (r === 'medio') { osuPontuacao += 100; osuMensagem = { texto: "Médio", cor: color(100, 255, 100), tempo: 45 }; } else { osuPontuacao += 50; osuMensagem = { texto: "Bom", cor: color(255, 255, 100), tempo: 45 }; } osuAlvos.splice(i, 1); return; } } return; } if (osuResultado.mostrando) { osuResultadoButtons.forEach(b => b.handleMousePressed()); return; } if (dialogoAtivo) { dialogoButtons.forEach(b => b.handleMousePressed()); return; } switch (estadoJogo) { case 'menu': menuButtons.forEach(b => b.handleMousePressed()); break; case 'creditos': creditosButtons.forEach(b => b.handleMousePressed()); break; case 'historia': historiaButtons.forEach(b => b.handleMousePressed()); break; case 'objetivo': objetivoButtons.forEach(b => b.handleMousePressed()); break; case 'guia': guiaButtons.forEach(b => b.handleMousePressed()); break; case 'decisao_final': decisaoButtons.forEach(b => b.handleMousePressed()); break; case 'missoes': missoesButtons.forEach(b => b.handleMousePressed()); for (const box of missoesBoundingBoxes) { if (mouseX > box.x && mouseX < box.x + box.w && mouseY > box.y && mouseY < box.y + box.h) { const missao = missoes.find(m => m.id === box.id); if (missao && !missao.completa) { missaoAtivaId = (missaoAtivaId === box.id) ? null : box.id; } break; } } break; } if (todasMissoesCompletas && btnProxCidade && btnProxCidade.isHovering()) { btnProxCidade.handleMousePressed(); } }
function keyPressed() { if (minigameGuitarHeroAtivo && guitarHeroEstado === 'jogando') { let keyDir = null; if (keyCode === LEFT_ARROW) keyDir = 'left'; else if (keyCode === RIGHT_ARROW) keyDir = 'right'; else if (keyCode === UP_ARROW) keyDir = 'up'; else if (keyCode === DOWN_ARROW) keyDir = 'down'; if (keyDir) { verificarAcertoGuitarHero(keyDir); return false; } } if (dialogoAtivo) { if (key === 'e' || key === 'E') avancarDialogo(); return false; } if (minigameAtivo) { if (key === ' ') verificarAcertoMinigame(); } else if (!['cutscene_final', 'cutscene_retorno_campo', 'decisao_final'].includes(estadoJogo)) { if (key === 'e' || key === 'E') executarInteracao(interacaoAtivaE); if (key === 'r' || key === 'R') executarInteracao(interacaoAtivaR); } if (['historia', 'objetivo', 'missoes', 'guia'].includes(estadoJogo) && keyCode === ESCAPE) { let prox = (estadoJogo === 'guia') ? 'menu' : 'jogando'; if (estadoJogo === 'missoes') { prox = interacaoAtivaE ? interacaoAtivaE.cenaOrigem : 'cidade'; } estadoJogo = prox; } return false; }

/**
 * =========================================================================
 * SEÇÃO 6: INICIALIZAÇÃO
 * =========================================================================
 */
function inicializarBotoes() { menuButtons.push(new Button(width/2 - 175, 250, 350, 70, "Jogar", CORES.botaoJogo, () => estadoJogo = 'jogando')); menuButtons.push(new Button(width/2 - 175, 340, 350, 55, "Guia de Como Jogar", CORES.botaoGuia, () => estadoJogo = 'guia')); menuButtons.push(new Button(width/2 - 125, 415, 250, 50, "Créditos", CORES.botaoCreditos, () => estadoJogo = 'creditos')); creditosButtons.push(new Button(width/2 - 100, 500, 200, 60, "Voltar", [100, 200, 100], () => estadoJogo = 'menu')); historiaButtons.push(new Button(width/2 - 210, 450, 200, 60, "Objetivo", [180, 80, 80], () => estadoJogo = 'objetivo')); historiaButtons.push(new Button(width/2 + 10, 450, 200, 60, "Voltar", [80, 130, 200], () => estadoJogo = 'jogando')); objetivoButtons.push(new Button(width/2 - 100, 450, 200, 60, "Voltar", [80, 130, 200], () => estadoJogo = 'historia')); dialogoButtons.push(new Button(180, 525, 120, 40, "Pular", [200, 100, 100], pularDialogo)); missoesButtons.push(new Button(width/2 - 100, height - 80, 200, 50, "Fechar", [100, 100, 100], () => { estadoJogo = interacaoAtivaE ? interacaoAtivaE.cenaOrigem : 'cidade'; })); guiaButtons.push(new Button(width - 220, 30, 180, 50, "Voltar ao Menu", [98, 79, 148], () => estadoJogo = 'menu')); decisaoButtons.push(new Button(width/2 - 220, 350, 200, 60, "Sim", [60, 179, 113], iniciarCutsceneFinal)); decisaoButtons.push(new Button(width/2 + 20, 350, 200, 60, "Não", [220, 80, 80], () => { estadoJogo = 'cidade'; btnProxCidade = new Button(width - 250, height - 80, 220, 50, "Próxima Cidade", CORES.botaoGuia, iniciarCutsceneFinal); })); guitarHeroHelpVoltarButton = new Button(width/2 - 100, 480, 200, 50, "Voltar", CORES.botaoCreditos, () => { guitarHeroMostrandoAjuda = false; }); }
function inicializarNpcs() { npcs = []; const npcsACriar = [{ id: 'joao', img: imgNpc1, tipo: 'joao', scene: 'cidade' }, { id: 'mario', img: imgNpc2, tipo: 'mario', scene: 'cidade' }, { id: 'pedro', img: imgNpc3, tipo: 'pedro', scene: 'cidade_2', estado: 'parado', speed: 3.5 }]; let posicoesOcupadas = { 'cidade': [], 'cidade_2': [] }; npcsACriar.forEach(data => { let posX, pValida = false; let minX, maxX; if (data.tipo === 'pedro') { minX = width + 100; maxX = width + 200; } else { minX = (data.scene === 'cidade') ? 250 : 100; maxX = (data.scene === 'cidade') ? width - 150 - NPC_WIDTH : width - 100 - NPC_WIDTH; } while (!pValida) { posX = random(minX, maxX); pValida = true; for (const pos of posicoesOcupadas[data.scene]) { if (abs(posX - pos) < 150) { pValida = false; break; } } } posicoesOcupadas[data.scene].push(posX); npcs.push({ ...data, x: posX, y: random(380, 450), w: NPC_WIDTH, h: NPC_HEIGHT, direcao: 'left', direcaoY: random(['up', 'down']), tempoMudanca: floor(random(120, 300)), speed: data.speed || random(1.5, 2.5) }); }); }
function inicializarCenas() { criarCidade(); criarCidade2(); criarArvoresFixas(); criarVegetacao(); inicializarNpcs(); inicializarPassaros(); inicializarNuvens(); }
function inicializarNuvens() { nuvens = []; for (let i = 0; i < 10; i++) { nuvens.push(new Nuvem()); } }
function inicializarPassaros() { passaros = []; for (let i = 0; i < 5; i++) { passaros.push(new Passaro()); } }
function inicializarEstrelas() {
  for (let i = 0; i < 200; i++) {
    estrelas.push({
      x: random(width),
      y: random(height * 0.6),
      size: random(1, 3)
    });
  }
}

/**
 * =========================================================================
 * SEÇÃO 7: ATUALIZAÇÃO E LÓGICA
 * =========================================================================
 */
function atualizarMovimento() { if (dialogoAtivo || movimentoBloqueado) return; if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { morgana.x = constrain(morgana.x - morgana.vel, 0, width - morgana.w); morgana.direcao = 'left'; } if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { morgana.x = constrain(morgana.x + morgana.vel, 0, width - morgana.w); morgana.direcao = 'right'; } morgana.y = lerp(morgana.y, 350, 0.1); }
function atualizarMovimentoUrbano() { if (dialogoAtivo || movimentoBloqueado) return; if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { if (estadoJogo === 'cidade_2' && finalChallengeCompleted && morgana.x <= 1) { } else if (estadoJogo === 'cidade' && todasMissoesCompletas && morgana.x <= 201) { } else { morgana.x -= morgana.vel; morgana.direcao = 'left'; } } if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { morgana.x += morgana.vel; morgana.direcao = 'right'; } if (keyIsDown(87) || keyIsDown(UP_ARROW)) { morgana.y = constrain(morgana.y - morgana.vel, 350, 500); } if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { morgana.y = constrain(morgana.y + morgana.vel, 350, 500); } if (estadoJogo === 'cidade') { morgana.x = constrain(morgana.x, 200, width - morgana.w); if (morgana.x >= width - morgana.w - 1 && todasMissoesCompletas && !finalChallengeCompleted) { iniciarCutsceneFinal(); } } else if (estadoJogo === 'cidade_2') { morgana.x = constrain(morgana.x, 0, width - morgana.w); } }
function atualizarNpcs() { npcs.forEach(npc => { if (npc.tipo === 'pedro' && npc.estado === 'indo_para_morgana') { let alvoX = morgana.x + morgana.w + 20; let dx = alvoX - npc.x; if (abs(dx) > npc.speed) { npc.x += dx > 0 ? npc.speed : -npc.speed; } else { npc.x = alvoX; npc.estado = 'parado'; npc.direcao = 'left'; iniciarDialogo(npc, 'desafio'); } return; } if (npc.scene !== estadoJogo || dialogoAtivo || movimentoBloqueado) return; if (dist(morgana.x + morgana.w / 2, morgana.y + morgana.h / 2, npc.x + npc.w / 2, npc.y + npc.h / 2) < 100) return; let nX = npc.x + (npc.direcao === 'left' ? -npc.speed / 2 : npc.speed / 2); const minX = (npc.scene === 'cidade') ? 200 : 50; const maxX = width - npc.w - 50; if (nX < minX || nX > maxX) { npc.direcao = (npc.direcao === 'left' ? 'right' : 'left'); } else { npc.x = nX; } let nY = npc.y + (npc.direcaoY === 'up' ? -npc.speed * 0.25 : npc.speed * 0.25); const minY = 380; const maxY = 450; if (nY < minY || nY > maxY) { npc.direcaoY = (npc.direcaoY === 'up' ? 'down' : 'up'); } else { npc.y = nY; } npc.tempoMudanca--; if (npc.tempoMudanca <= 0) { npc.direcao = random(['left', 'right']); npc.direcaoY = random(['up', 'down']); npc.tempoMudanca = floor(random(120, 300)); } }); }
function atualizarGato() { if (gato.visivel) { if (gato.estado === 'seguindo') { let alvoX = morgana.x - 40; let alvoY = morgana.y + 60; let d = dist(gato.x, gato.y, alvoX, alvoY); if (d > 20) { gato.x = lerp(gato.x, alvoX, 0.04); gato.y = lerp(gato.y, alvoY, 0.04); } gato.direcao = morgana.direcao; } else if (gato.estado === 'fugindo') { gato.x += 5; if (gato.x > width) gato.visivel = false; } } }


/**
 * =========================================================================
 * SEÇÃO 8: RENDERIZAÇÃO
 * =========================================================================
 */
function isNoite() { 
    const faseDuracao = CICLO_DURACAO / 4;
    return tempoDoDia > faseDuracao * 2.5 || tempoDoDia < faseDuracao * 0.5;
}

function desenharFundoCenaRural() { desenharCeuDinamico(); desenharChaoVerde(); vegetacao.forEach(veg => desenharFlor(veg.x, veg.y)); arvores.forEach(arv => image(arv.img, arv.x, arv.y)); fill(210, 180, 140); rect(200, GROUND_LEVEL - 70, 150, 100); fill(139, 69, 19); triangle(200, GROUND_LEVEL - 70, 350, GROUND_LEVEL - 70, 275, GROUND_LEVEL - 120); image(imgQuadro, 260, GROUND_LEVEL - 50, 60, 80); }
function desenharFundoCenaUrbana() { desenharCeuDinamico(); desenharRuaECalcada(); predios.forEach(desenharPredio); }
function desenharFundoCenaUrbana2() { desenharCeuDinamico(); desenharRuaECalcada2(); predios2.forEach(desenharPredio); }

function desenharMenu() { 
  desenharCeuDinamico(); 
  desenharChaoVerde(); 
  desenharTituloElegante("Aventura de Morgana"); 
  image(imgMorgana, 50, height - 180 - 20 + sin(frameCount * 0.04) * 8, 120, 180); 
  menuButtons.forEach(b => b.draw()); 
}
function desenharCenaRural() { 
  desenharFundoCenaRural(); 
  desenharPassaros(); 
  desenharPlacaMissao(placaMissaoRural); 
  if (carro.emMovimento) { 
    carro.x += carro.velocidade; 
    if (carro.x > carro.posFinal) { 
      estadoJogo = 'cidade'; 
      prepararTransicao(); 
    } 
  } 
  image(imgCarro, carro.x, carro.y, 350, 175); 
  if (morgana.visivel) { 
    desenharMorgana(); 
    if(!movimentoBloqueado) atualizarMovimento(); 
    atualizarGato(); 
    desenharGato(); 
  } 
}
function desenharCenaUrbana() { 
  desenharFundoCenaUrbana(); 
  desenharPassaros(); 
  desenharPlacaMissao(placaMissaoCidade); 
  npcs.filter(n => n.scene === 'cidade').forEach(n => { 
    image(n.img, n.x, n.y, n.w, n.h); 
    desenharIndicadorMissaoNPC(n); 
  }); 
  desenharMorgana(); 
  atualizarGato(); 
  desenharGato(); 
  if (estadoJogo !== 'cutscene_final' && estadoJogo !== 'cutscene_retorno_campo') { 
    atualizarNpcs(); 
    atualizarMovimentoUrbano(); 
  } 
}
function desenharCenaUrbana2() { 
  desenharFundoCenaUrbana2(); 
  desenharPassaros(); 
  npcs.filter(n => n.scene === 'cidade_2').forEach(n => { 
    image(n.img, n.x, n.y, n.w, n.h); 
    desenharIndicadorMissaoNPC(n); 
  }); 
  desenharMorgana(); 
  atualizarGato(); 
  desenharGato(); 
  if (estadoJogo !== 'cutscene_final' && estadoJogo !== 'cutscene_retorno_campo') { 
    atualizarNpcs(); 
    atualizarMovimentoUrbano(); 
  } 
}
function desenharGuiaCompleto() { background(45, 48, 71); guiaButtons[0].draw(); textAlign(CENTER, TOP); fill(255); textSize(48); textStyle(BOLD); text("Guia de Como Jogar", width / 2, 40); textStyle(NORMAL); textAlign(LEFT, TOP); let sX = 150, cW = width - (sX * 2), cY = 100, lH = 24, pS = 20; textLeading(lH); fill(220, 220, 240); textSize(24); text("Bem-vinda à Aventura de Morgana!", sX, cY); cY += 35; fill(230); textSize(16); text("Morgana é uma jovem do campo que decidiu explorar o mundo urbano. Seu objetivo é conectar suas raízes rurais com o desenvolvimento da cidade, provando que campo e cidade podem coexistir em harmonia. Ajude-a a completar missões, interagir com os moradores e explorar os diferentes ambientes!", sX, cY, cW); cY += 100; fill(220, 220, 240); textSize(24); text("Controles Básicos:", sX, cY); cY += 35; fill(230); textSize(16); text("• Use as teclas [A] e [D] ou as SETAS para mover Morgana.\n• Na cidade, Morgana se move pela calçada.\n• Aproxime-se de pessoas ou objetos e pressione [E] ou [R] para interagir.\n• Pressione [ESC] para voltar de telas informativas ou do quadro de missões.", sX, cY); cY += 120; fill(220, 220, 240); textSize(24); text("Minigames:", sX, cY); cY += 35; fill(230); textSize(16); text("• Minigame de Reflexo (Missões de Nível 1 e Resgate do Gato):", sX, cY); cY += pS + 5; text("Uma barra se moverá da esquerda para a direita. Pressione [ESPAÇO] quando a barra estiver sobre a área verde. Você tem 3 tentativas para acertar 3 vezes.", sX + 15, cY, cW - 15); cY += 60; text("• Minigame de Ritmo (Missões de Nível 2+):", sX, cY); cY += pS + 5; text("Círculos aparecerão na tela com um anel de aproximação. Clique no círculo quando o anel estiver o mais próximo possível do contorno do círculo. Mire na pontuação alvo dentro do tempo limite!", sX + 15, cY, cW - 15); textAlign(CENTER, BOTTOM); textSize(18); fill(141, 229, 161); text("Explore, converse e divirta-se conectando os mundos!", width / 2, height - 20); textLeading(0); }
function desenharHistoria() { background(210, 180, 140); fill(0); textSize(32); textAlign(CENTER, CENTER); text("História da Morgana", width / 2, 100); textSize(24); const h = [ "Morgana cresceu numa fazenda isolada,", "onde a vida simples era sua única realidade.", "Criada por seus avós após perder os pais cedo,", "ela nunca teve acesso à educação ou à cidade.", "", "Sua jornada começa quando decide explorar", "o mundo urbano para unir suas raízes rurais", "com o desenvolvimento da cidade." ]; h.forEach((l, i) => text(l, width / 2, 180 + i * 30)); }
function desenharObjetivo() { background(210, 180, 140); fill(0); textSize(32); textAlign(CENTER, CENTER); text("Objetivo da Morgana", width / 2, 100); textSize(24); const o = [ "Morgana quer provar que campo e cidade", "podem coexistir em harmonia!", "", "Seu objetivo é:", "- Criar pontes entre as comunidades", "- Promover trocas sustentáveis", "- Mostrar que o progresso urbano", "  não precisa apagar as raízes rurais" ]; o.forEach((l, i) => text(l, width / 2, 180 + i * 30)); }
function desenharCreditos() { background(50); fill(255); textSize(32); textAlign(CENTER, CENTER); text("Créditos", width / 2, 100); textSize(24); const c = [ "Feito por Lucas Matheus", "Todas as artes feitas por mim", "Professor: Leandro", "Feito para participar do agrinho2025" ]; c.forEach((l, i) => text(l, width / 2, 180 + i * 30)); }
// --- MELHORIA: Texto mais claro no quadro de missões ---
function desenharMenuMissoes() {
  fill(0, 0, 0, 180);
  rectMode(CORNER);
  rect(0, 0, width, height);
  let pX = width / 2 - 300, pY = 80, pW = 600, pH = height - 180;
  fill(139, 69, 19, 230);
  stroke(90, 45, 10);
  strokeWeight(5);
  rect(pX, pY, pW, pH, 20);
  noStroke();
  fill(255, 250, 220);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Quadro de Missões", width / 2, pY + 45);

  fill(255, 230, 180);
  textAlign(CENTER, TOP);
  textSize(16);
  text("Aqui você aceita e conclui suas tarefas.", width / 2, pY + 85);
  
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("1. Clique para marcar um objetivo.", pX + 40, pY + 110);
  text("2. Após completar a tarefa, volte aqui para receber sua recompensa!", pX + 40, pY + 130);
  textStyle(NORMAL);
  
  missoesBoundingBoxes = [];
  textAlign(LEFT, TOP);
  textSize(24);
  let yOffset = 0;
  for (let i = 0; i < missoes.length; i++) {
    const m = missoes[i];
    if (m.scene !== estadoJogo && m.scene !== interacaoAtivaE ?.cenaOrigem) continue;
    let yPos = pY + 170 + yOffset * 50;
    let txt = m.titulo;
    if (m.completa) {
      fill(120, 255, 120);
      txt += " (Concluído)";
    } else {
      fill(255, 220, 80);
    }
    if (m.id === missaoAtivaId) {
      fill(255, 255, 255, 50);
      noStroke();
      rect(pX + 20, yPos - 5, pW - 40, 35, 10);
      if (m.completa) {
        fill(120, 255, 120);
      } else {
        fill(255, 220, 80);
      }
    }
    text(txt, pX + 30, yPos);
    missoesBoundingBoxes.push({
      id: m.id,
      x: pX + 30,
      y: yPos,
      w: textWidth(txt),
      h: 24
    });
    yOffset++;
  }
}
function desenharCeuGradiente(cT, cB, h) { for (let i = 0; i < h; i++) { stroke(lerpColor(color(cT), color(cB), i / h)); line(0, i, width, i); } noStroke(); }
function desenharChaoVerde() { fill(34, 139, 34); rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL); }
function desenharFlor(x, y) { let s = sin(frameCount * 0.02 + x / 10) * 2; fill(255, 105, 180); noStroke(); for (let i = 0; i < 5; i++) { push(); translate(x + s, y); rotate(TWO_PI * i / 5); ellipse(0, -10, 10, 15); pop(); } fill(255, 255, 0); ellipse(x + s, y, 8, 8); }
function desenharMorgana() { if (morgana.visivel) { image(imgMorgana, morgana.x, morgana.y, morgana.w, morgana.h); } }
function desenharTituloElegante(t) { textAlign(CENTER, CENTER); textSize(80); drawingContext.shadowBlur = 15; drawingContext.shadowColor = 'rgba(0,0,0,0.4)'; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = 5; fill(255, 250, 240); text(t, width / 2, 130); drawingContext.shadowBlur = 0; drawingContext.shadowOffsetY = 0; }
function desenharPlacaMissao(p) { push(); translate(p.x, p.y); fill(87, 58, 46); noStroke(); rect(p.w / 2 - 10, 0, 20, p.h, 5); fill(139, 90, 43); stroke(87, 58, 46); strokeWeight(4); rect(0, 5, p.w, p.h * 0.6, 8); if (missoes.some(m => !m.completa && m.scene === estadoJogo)) { let pulso = sin(frameCount * 0.1) * 5 + 10; fill(255, 255, 0, 200 + pulso * 4); noStroke(); textSize(40 + pulso); textAlign(CENTER, CENTER); text("!", p.w / 2, p.h / 2 - 25); } pop(); }
function desenharIndicadorMissaoNPC(npc) { if (movimentoBloqueado) return; if (npc.tipo === 'pedro' && desafioPedroPendente) { push(); translate(npc.x + npc.w / 2, npc.y - 10); let p = sin(frameCount * 0.1) * 3 + 5; fill(255, 255, 0, 200 + p * 8); noStroke(); textSize(30 + p); textAlign(CENTER, CENTER); text("!", 0, 0); pop(); return; } if (missaoAtivaId && npc.tipo === missaoAtivaId.replace('falar_', '')) { let arrowPulse = sin(frameCount * 0.2) * 4; push(); fill(255, 220, 0); noStroke(); translate(npc.x + npc.w / 2, npc.y - 25 - arrowPulse); beginShape(); vertex(0, 0); vertex(-10, -15); vertex(10, -15); endShape(CLOSE); pop(); } else if (!missaoAtivaId) { const missao = missoes.find(m => m.id === 'falar_' + npc.tipo); if (missao && !missao.completa && missoesVistasNaCidade) { push(); translate(npc.x + npc.w / 2, npc.y - 10); let p = sin(frameCount * 0.1) * 3 + 5; fill(255, 255, 0, 200 + p * 8); noStroke(); textSize(30 + p); textAlign(CENTER, CENTER); text("!", 0, 0); pop(); } } }
function desenharRuaECalcada() { rectMode(CORNER); fill(...CORES.rua); rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL); fill(...CORES.calcada); rect(0, GROUND_LEVEL - 20, width, 20); rect(0, GROUND_LEVEL + 50, width, 20); for (let i = 600; i < width; i += 200) { fill(50); rect(i, GROUND_LEVEL - 50, 10, 100); ellipse(i + 5, GROUND_LEVEL - 50, 20, 20); if (isNoite()) { push(); drawingContext.shadowBlur = 25; drawingContext.shadowColor = 'rgba(255, 255, 100, 0.8)'; fill(255, 255, 180, 220); noStroke(); ellipse(i + 5, GROUND_LEVEL - 55, 25, 25); pop(); } } }
function desenharRuaECalcada2() { rectMode(CORNER); fill(130, 130, 130); rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL); for (let i = 0; i < width; i += 40) { for (let j = GROUND_LEVEL; j < height; j += 40) { fill(((i / 40 + j / 40) % 2 === 0) ? color(120) : color(140)); rect(i, j, 40, 40); } } fill(...CORES.calcada); rect(0, GROUND_LEVEL - 15, width, 15); }
function desenharPredio(p) { fill(p.cor); rect(p.x, p.y, p.largura, p.altura); fill(139, 69, 19); triangle( p.x, p.y, p.x + p.largura, p.y, p.x + p.largura / 2, p.y - p.telhado ); if (p.tipo !== 'casa') { desenharJanelas(p); } }
function desenharJanelas(p) { fill(200, 200, 200); const c = floor(p.largura / 35), l = floor(p.altura / 50); for (let i = 0; i < c; i++) { for (let j = 0; j < l; j++) { rect(p.x + 15 + i * 35, p.y + 20 + j * 50, 25, 25); } } }
function desenharPassaros() { passaros.forEach(p => { p.mover(); p.desenhar(); }); }
function desenharGato() { if (gato.visivel) { image( gato.direcao === 'left' ? imgGatoLeft : imgGatoRight, gato.x, gato.y, 50, 50 ); } }
function desenharMissaoAtivaHUD() { if (!missaoAtivaId) return; const missao = missoes.find(m => m.id === missaoAtivaId); if (!missao || missao.completa || missao.scene !== estadoJogo) { missaoAtivaId = null; return; } textSize(18); textAlign(RIGHT, TOP); let textoW = textWidth(missao.titulo); fill(0, 0, 0, 150); noStroke(); rectMode(CORNER); rect(width - textoW - 40, 20, textoW + 30, 50, 10); fill(255, 220, 100); text(missao.titulo, width - 25, 35); }

// --- MELHORIA: Nova função para guiar o jogador ---
function desenharAvisoQuadroMissao() {
    if (missoesVistasNaCidade) {
        return; // Não mostra o aviso se o jogador já visitou o quadro
    }

    let texto = "Visite o Quadro de Missões para começar! →";
    let textoW = textWidth(texto);
    let x = width / 2;
    let y = 30;
    
    // Animação de pulso
    let alpha = 150 + sin(frameCount * 0.1) * 50;

    push();
    textAlign(CENTER, CENTER);
    fill(0, 0, 0, alpha * 0.7);
    noStroke();
    rectMode(CENTER);
    rect(x, y, textoW + 30, 40, 20);
    
    fill(255, 255, 220, alpha + 50);
    textSize(20);
    textStyle(BOLD);
    text(texto, x, y);
    pop();
}

function desenharNuvens() { 
  for (let nuvem of nuvens) { 
    nuvem.mover(); 
    nuvem.desenhar(); 
  } 
}

function desenharCeuDinamico() {
  const anguloTempo = map(tempoDoDia, 0, CICLO_DURACAO, 0, TWO_PI);
  const faseDuracao = CICLO_DURACAO / 4;

  let corCeuTopo, corCeuBase;

  if (tempoDoDia < faseDuracao) {
    let fator = tempoDoDia / faseDuracao;
    corCeuTopo = lerpColor(color(CORES.ceuNoiteTopo), color(CORES.ceuManhaTopo), fator);
    corCeuBase = lerpColor(color(CORES.ceuNoiteBase), color(CORES.ceuManhaBase), fator);
  } 
  else if (tempoDoDia < faseDuracao * 2) {
    let fator = (tempoDoDia - faseDuracao) / faseDuracao;
    corCeuTopo = lerpColor(color(CORES.ceuManhaTopo), color(CORES.ceuDiaTopo), fator);
    corCeuBase = lerpColor(color(CORES.ceuManhaBase), color(CORES.ceuDiaBase), fator);
  }
  else if (tempoDoDia < faseDuracao * 3) {
    let fator = (tempoDoDia - faseDuracao * 2) / faseDuracao;
    corCeuTopo = lerpColor(color(CORES.ceuDiaTopo), color(CORES.ceuTardeTopo), fator);
    corCeuBase = lerpColor(color(CORES.ceuDiaBase), color(CORES.ceuTardeBase), fator);
  }
  else {
    let fator = (tempoDoDia - faseDuracao * 3) / faseDuracao;
    corCeuTopo = lerpColor(color(CORES.ceuTardeTopo), color(CORES.ceuNoiteTopo), fator);
    corCeuBase = lerpColor(color(CORES.ceuTardeBase), color(CORES.ceuNoiteBase), fator);
  }
  
  desenharCeuGradiente(corCeuTopo, corCeuBase, height);

  const fatorNoite = (sin(anguloTempo - HALF_PI) + 1) / 2;
  desenharEstrelas(fatorNoite);
  desenharSolELua(anguloTempo);
  desenharNuvens();
}

function desenharSolELua(angulo) {
  const solX = width / 2 + cos(angulo) * (width / 2 + 50);
  const solY = height - 50 - sin(angulo) * (height - 100);
  
  const luaX = width / 2 - cos(angulo) * (width / 2 + 50);
  const luaY = height - 50 + sin(angulo) * (height - 100);

  if (sin(angulo) > 0) {
    push();
    translate(solX, solY);
    fill(255, 223, 0, 200);
    noStroke();
    ellipse(0, 0, 110, 110);
    fill(255, 255, 100);
    ellipse(0, 0, 90, 90);
    pop();
  }

  if (sin(angulo) < 0) {
    push();
    translate(luaX, luaY);
    fill(245, 245, 250);
    noStroke();
    ellipse(0, 0, 80, 80);
    fill(lerpColor(color(CORES.ceuTardeBase), color(CORES.ceuNoiteTopo), 0.5));
    ellipse(15, -10, 70, 70);
    pop();
  }
}

function desenharEstrelas(fatorNoite) {
  if (fatorNoite < 0.1) return;
  
  push();
  noStroke();
  fill(255, 255, 255, fatorNoite * 200);
  for(let estrela of estrelas) {
    ellipse(estrela.x, estrela.y, estrela.size + sin(frameCount * 0.05 + estrela.x) * 0.5);
  }
  pop();
}

/**
 * =========================================================================
 * SEÇÃO 9: CRIAÇÃO DE CENAS
 * =========================================================================
 */
function criarArvoresFixas() { arvores = []; const a = [imgArvore1, imgArvore2, imgArvore3]; for (let i = 0; i < 6; i++) { let x = random(50, width - 200); if (x > 100 && x < 250) x += 150; let y = GROUND_LEVEL - random(a).height + random(10, 20); arvores.push({ x: x, y: y, img: random(a), temGato: false }); } random(arvores).temGato = true; }
function criarVegetacao() { vegetacao = []; for (let i = 0; i < 150; i++) { vegetacao.push({ tipo: 'flor', x: random(width), y: random(GROUND_LEVEL, height - 10) }); } }
function estaSobreposta(x, y, w, h) { for (let a of areasOcupadas) { if (x < a.x + a.largura && x + w > a.x && y < a.y + a.altura && y + h > a.y) { return true; } } return false; }
function criarCidade() { predios = []; areasOcupadas = []; for (let i = 600; i < width; i += 200) { areasOcupadas.push({ x: i - 40, y: 0, largura: 80, altura: height }); } let pX = 200; for (let i = 0; i < 12; i++) { let w = random(80, 160), h = random(100, 200); if (!estaSobreposta(pX, GROUND_LEVEL - h, w, h)) { let p = { x: pX, y: GROUND_LEVEL - h, largura: w, altura: h, telhado: random(20, 40), cor: [random(100, 200), random(100, 200), random(100, 200)] }; predios.push(p); areasOcupadas.push({ x: p.x, y: p.y, largura: w, altura: h }); } pX += w + random(20, 60); } for (let i = 0; i < 15; i++) { let t = 0; while (t < 50) { let w = random(50, 100), h = random(50, 120); let x = random(200, width - w); let y = GROUND_LEVEL - h; if (!estaSobreposta(x, y, w, h)) { let c = { x: x, y: y, largura: w, altura: h, telhado: random(10, 20), cor: [210, 180, 140], tipo: 'casa' }; predios.push(c); areasOcupadas.push({ x: x, y: y, largura: w, altura: h }); break; } t++; } } }
function criarCidade2() { predios2 = []; let pX = 50; for (let i = 0; i < 8; i++) { let w = random(100, 180), h = random(80, 150); let c = [random(180, 220), random(140, 180), random(100, 140)]; let p = { x: pX, y: GROUND_LEVEL - h, largura: w, altura: h, telhado: random(15, 30), cor: c, tipo: 'casa' }; predios2.push(p); pX += w + random(30, 80); } }

/**
 * =========================================================================
 * SEÇÃO 10: INTERAÇÕES E DIÁLOGOS
 * =========================================================================
 */
function buscarInteracoes() { if (dialogoAtivo || movimentoBloqueado || frameCount < interactionCooldown) { interacoesPossiveis = []; return; } interacoesPossiveis = []; if (estadoJogo === 'jogando') { if (dist( morgana.x + morgana.w/2, morgana.y + morgana.h/2, placaMissaoRural.x + placaMissaoRural.w/2, placaMissaoRural.y + placaMissaoRural.h/2 ) < 100) { interacoesPossiveis.push({ tipo: 'placa', objeto: placaMissaoRural, dist: dist(morgana.x, morgana.y, placaMissaoRural.x, placaMissaoRural.y), cenaOrigem: 'jogando' }); } if (dist( morgana.x, morgana.y, carro.x + 175, carro.y + 87 ) < 100 && !carro.emMovimento) { interacoesPossiveis.push({ tipo: 'carro', objeto: carro, dist: dist(morgana.x, morgana.y, carro.x + 175, carro.y + 87) }); } if (dist(morgana.x, morgana.y, 275, 370) < 80) { interacoesPossiveis.push({ tipo: 'quadro', objeto: null, dist: dist(morgana.x, morgana.y, 275, 370) }); } let arvore = arvores.find(arv => arv.temGato && dist( morgana.x, morgana.y, arv.x + arv.img.width / 2, arv.y + arv.img.height / 2 ) < 100 ); if (arvore) { interacoesPossiveis.push({ tipo: 'gato', objeto: arvore, dist: dist(morgana.x, morgana.y, arvore.x, arvore.y) }); } } else if (['cidade', 'cidade_2'].includes(estadoJogo)) { if (estadoJogo === 'cidade' && dist( morgana.x + morgana.w/2, morgana.y + morgana.h/2, placaMissaoCidade.x + placaMissaoCidade.w/2, placaMissaoCidade.y + placaMissaoCidade.h/2 ) < 80) { interacoesPossiveis.push({ tipo: 'placa', objeto: placaMissaoCidade, dist: dist(morgana.x, morgana.y, placaMissaoCidade.x, placaMissaoCidade.y), cenaOrigem: 'cidade' }); } verificarProximidadeNPCs().forEach(npc => { let tipoInteracao; if (npc.tipo === 'pedro' && finalChallengeCompleted) { tipoInteracao = 'pedro_final'; } else if (npc.tipo === 'pedro' && desafioPedroPendente) { tipoInteracao = 'npc_desafio'; } else if (['joao', 'mario'].includes(npc.tipo)) { const missao = missoes.find(m => m.id === 'falar_' + npc.tipo); if (missao && !missao.completa) { tipoInteracao = 'npc_missao'; } else { tipoInteracao = 'npc_conversa'; } } else { tipoInteracao = 'npc_conversa'; } interacoesPossiveis.push({ tipo: tipoInteracao, objeto: npc, dist: dist(morgana.x, morgana.y, npc.x, npc.y) }); }); } interacoesPossiveis.sort((a, b) => a.dist - b.dist); }
function gerenciarPromptsDeInteracao() { buscarInteracoes(); interacaoAtivaE = interacoesPossiveis[0] || null; interacaoAtivaR = interacoesPossiveis[1] || null; if (interacaoAtivaE) exibirMensagem(`[E] ${getInteractionText(interacaoAtivaE)}`, 80); if (interacaoAtivaR) exibirMensagem(`[R] ${getInteractionText(interacaoAtivaR)}`, 120); }
function getInteractionText(i) { if (!i) return ''; const n = i.objeto ? (i.objeto.tipo || '').charAt(0).toUpperCase() + (i.objeto.tipo || '').slice(1) : ''; switch (i.tipo) { case 'carro': return 'Ir para a cidade'; case 'quadro': return 'Ver o quadro'; case 'gato': return 'Procurar por perto'; case 'placa': return 'Ver Quadro de Missões'; case 'npc_missao': return `Iniciar missão com ${n}`; case 'npc_desafio': return `Encarar o desafio de ${n}`; case 'npc_conversa': return `Conversar com ${n}`; case 'pedro_final': return 'Se despedir e voltar para casa'; default: return 'Interagir'; } }
function executarInteracao(i) { if (!i) return; switch (i.tipo) { case 'carro': carro.emMovimento = true; morgana.visivel = false; break; case 'quadro': estadoJogo = 'historia'; break; case 'gato': minigameTrigger = 'gato'; minigameObjetoAssociado = i.objeto; iniciarMinigame(); break; case 'placa': interacaoAtivaE = {cenaOrigem: i.cenaOrigem}; if (i.cenaOrigem === 'cidade') missoesVistasNaCidade = true; estadoJogo = 'missoes'; break; case 'npc_missao': iniciarDialogo(i.objeto, 'missao'); break; case 'npc_desafio': let pedro = i.objeto; pedro.estado = 'indo_para_morgana'; movimentoBloqueado = true; break; case 'npc_conversa': iniciarDialogo(i.objeto); break; case 'pedro_final': estadoJogo = 'cutscene_retorno_campo'; retornoCutsceneStep = 0; cenaDaCutscene = 'cidade_2'; movimentoBloqueado = true; dialogoAtivo = true; dialogoNPC = { tipo: 'morgana_pensando', img: imgMorgana }; dialogoAtual = dialogoDespedida; dialogoIndex = 0; break; } }
function iniciarDialogo(npc, tipo = 'conversa') { if (dialogoAtivo) return; dialogoAtivo = true; dialogoNPC = npc; dialogoIndex = 0; if (tipo === 'desafio' && dialogos[npc.tipo].desafio) { dialogoAtual = dialogos[npc.tipo].desafio[0]; } else if (tipo === 'vitoria' && dialogos[npc.tipo].vitoria) { dialogoAtual = dialogos[npc.tipo].vitoria[0]; } else if (tipo === 'derrota' && dialogos[npc.tipo].derrota) { dialogoAtual = dialogos[npc.tipo].derrota[0]; } else if (tipo === 'missao' && dialogos[npc.tipo] && dialogos[npc.tipo].conversas) { dialogoAtual = random(dialogos[npc.tipo].conversas); } else { dialogoAtual = [{ speaker: npc.tipo, text: random(dialogos[npc.tipo].posMissao) }]; } }
function avancarDialogo() { if(estadoJogo === 'cutscene_final' && dialogoIndex >= dialogoAtual.length-1) { finalizarDialogo(); return; } dialogoIndex++; if (!dialogoAtual || dialogoIndex >= dialogoAtual.length) { finalizarDialogo(); } }
function pularDialogo() { finalizarDialogo(); }
function finalizarDialogo() { let eraDesafioPedro = (dialogoNPC && dialogoNPC.tipo === 'pedro' && dialogoAtual === dialogos.pedro.desafio[0]); let eraMissao = (dialogoNPC && (dialogoNPC.tipo === 'joao' || dialogoNPC.tipo === 'mario') && dialogos[dialogoNPC.tipo].conversas.includes(dialogoAtual)); let eraVitoriaPedro = (dialogoNPC && dialogoNPC.tipo === 'pedro' && dialogoAtual === dialogos.pedro.vitoria[0]); let eraDespedida = (dialogoNPC && dialogoNPC.tipo === 'morgana_pensando' && dialogoAtual === dialogoDespedida); dialogoAtivo = false; let npcTemp = dialogoNPC; dialogoAtual = []; dialogoNPC = null; movimentoBloqueado = false; if (eraVitoriaPedro) { return; } if (eraDespedida) { retornoCutsceneStep = 1; cutsceneCarroPos.x = width + 200; cutsceneCarroPos.y = carro.y; movimentoBloqueado = true; return; } if (eraDesafioPedro) { iniciarMinigameGuitarHero(() => { let pedro = npcs.find(n => n.tipo === 'pedro'); if (guitarHeroResultadoMsg === 'Vitória!') { desafioPedroPendente = false; finalChallengeCompleted = true; iniciarDialogo(pedro, 'vitoria'); } else { iniciarDialogo(pedro, 'derrota'); } }); } else if (eraMissao) { minigameTrigger = 'npc'; minigameObjetoAssociado = npcTemp; if (minigameNivel >= 2) { iniciarMinigameOsu(); } else { iniciarMinigame(); } } }
function desenharDialogo() {
    if (!dialogoAtivo) return;
    const l = dialogoAtual[dialogoIndex];
    if (!l) {
        finalizarDialogo();
        return;
    }

    let p, n;
    if (l.speaker === 'morgana' || l.speaker === 'morgana_pensando') {
        p = imgMorgana;
        n = (l.speaker === 'morgana_pensando') ? "Morgana (pensando...)" : "Morgana";
    } else if (l.speaker === 'gato') {
        p = imgGatoRight; 
        n = "Gato";
    } else {
        p = dialogoNPC.img;
        n = dialogoNPC.tipo.charAt(0).toUpperCase() + dialogoNPC.tipo.slice(1);
    }
    
    let portraitX = 180;
    rectMode(CORNER);
    fill(CORES.dialogo);
    noStroke();
    rect(100, 390, width - 200, 150, 20);
    fill(50, 50, 80);
    ellipse(portraitX, 465, 110, 110);
    imageMode(CENTER);
    image(p, portraitX, 465, 100, 100);
    imageMode(CORNER);
    fill(0);
    textSize(22);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(n, 250, 405);
    textStyle(NORMAL);
    textLeading(30);
    text(l.text, 250, 440, width - 480, 100);
    textLeading(0);
    fill(100);
    textSize(18);
    textAlign(RIGHT, CENTER);
    text("Pressione [E] para continuar", width - 130, 525);
    dialogoButtons.forEach(b => b.draw());
}


/**
 * =========================================================================
 * SEÇÃO 11: MINIGAMES
 * =========================================================================
 */
function iniciarMinigame() { dialogoAtivo = false; minigameOsuAtivo = false; minigameGuitarHeroAtivo = false; minigameAtivo = true; minigameEstado = 'jogando'; minigameMensagem = ""; minigameAcertos = 0; minigameTentativas = 0; let bW = 600, bX = (width - bW) / 2; minigamePosicaoSucesso = random(bX + 10, bX + bW - minigameTamanhoZona); minigameLinhaX = bX; }
function verificarAcertoMinigame() { if (minigameEstado !== 'jogando') return; let tZ = max(10, minigameTamanhoZona - (minigameNivel * 2)); let bW = 600, bX = (width - bW) / 2; if (minigameLinhaX > minigamePosicaoSucesso && minigameLinhaX < minigamePosicaoSucesso + tZ) { minigameAcertos++; minigameMensagem = (minigameAcertos >= 3) ? "Sucesso!" : "Bom!"; if (minigameAcertos >= 3) minigameEstado = 'vitoria'; } else { minigameTentativas++; minigameMensagem = (minigameTentativas >= 3) ? "Falhou!" : "Tente novamente!"; if (minigameTentativas >= 3) minigameEstado = 'derrota'; } minigamePosicaoSucesso = random(bX + 10, bX + bW - tZ); minigameTempoMensagem = 60; }
function desenharMinigame() { textAlign(CENTER, CENTER); noStroke(); fill(0, 180); rectMode(CORNER); rect(0, 0, width, height); let bW = 600, bH = 30, bX = (width - bW) / 2, bY = height / 2 - bH / 2; fill(50); rect(bX, bY, bW, bH, 10); let tZ = max(10, minigameTamanhoZona - (minigameNivel * 2)); fill(0, 200, 0); rect(minigamePosicaoSucesso, bY, tZ, bH, 5); stroke(255); strokeWeight(3); line(minigameLinhaX, bY, minigameLinhaX, bY + bH); minigameLinhaX += minigameVelocidade + minigameNivel; if (minigameLinhaX > bX + bW) minigameLinhaX = bX; noStroke(); fill(255); textSize(24); if (minigameEstado === 'jogando') { text(`Aperte ESPAÇO! Tentativas: ${3 - minigameTentativas}/3`, width / 2, bY - 50); } if (minigameMensagem) { textSize(36); text(minigameMensagem, width / 2, bY - 150); minigameTempoMensagem--; if (minigameTempoMensagem <= 0) { minigameMensagem = ""; if (['vitoria', 'derrota'].includes(minigameEstado)) { minigameAtivo = false; interactionCooldown = frameCount + 30; if (minigameTrigger === 'gato' && minigameObjetoAssociado) { const a = minigameObjetoAssociado; if (minigameEstado === 'vitoria') { gato.visivel = true; gato.estado = 'seguindo'; gato.x = morgana.x + 50; gato.y = morgana.y + 60; let m = missoes.find(m => m.id === 'resgatar_gato'); if (m) m.completa = true; } else { gato.visivel = true; gato.estado = 'fugindo'; gato.x = a.x + a.img.width / 2; gato.y = a.y + a.img.height; } a.temGato = false; } else if (minigameTrigger === 'npc') { if (minigameEstado === 'vitoria' && missoesVistasNaCidade) { minigameNivel++; const n = minigameObjetoAssociado; if (n) { const m = missoes.find(m => m.id === 'falar_' + n.tipo); if (m) m.completa = true; } } else if (missoesVistasNaCidade) { minigameNivel = max(1, minigameNivel - 1); } } minigameObjetoAssociado = null; verificarFimDeJogo(); } } } }
function iniciarMinigameOsu() { dialogoAtivo = false; minigameAtivo = false; minigameGuitarHeroAtivo = false; osuIntroAtivo = true; osuCountdownFimFrame = frameCount + 180; osuAlvos = []; osuPontuacao = 0; osuMensagem.tempo = 0; }
function desenharMinigameOsuIntro() { fill(0, 0, 0, 220); rect(0, 0, width, height); textAlign(CENTER, CENTER); fill(255); textSize(64); text("Prepare-se!", width / 2, height / 2 - 80); let s = ceil((osuCountdownFimFrame - frameCount) / 60); textSize(128); text(s, width / 2, height / 2 + 50); if (frameCount >= osuCountdownFimFrame) { osuIntroAtivo = false; minigameOsuAtivo = true; osuTempoRestanteFrame = frameCount + osuTempoTotal * 60; osuProximoAlvoFrame = frameCount + 30; } }
function desenharMinigameOsu() { fill(0, 0, 0, 180); rect(0, 0, width, height); let t = (osuTempoRestanteFrame - frameCount) / 60; if (osuPontuacao >= osuPontuacaoMeta) { finalizarMinigameOsu(true); return; } if (t <= 0) { finalizarMinigameOsu(false); return; } if (frameCount >= osuProximoAlvoFrame) { osuAlvos.push(new OsuAlvo(random(100, width - 100), random(100, height - 100))); osuProximoAlvoFrame = frameCount + random(30, 70); } for (let i = osuAlvos.length - 1; i >= 0; i--) { let a = osuAlvos[i]; a.update(); a.draw(); if (a.expirado) { osuAlvos.splice(i, 1); osuMensagem = { texto: "Falhou", cor: color(255, 100, 100), tempo: 45 }; osuPontuacao -= 50; } } textAlign(CENTER, CENTER); textSize(32); fill(255); text(`Pontos: ${osuPontuacao} / ${osuPontuacaoMeta}`, width / 2, 50); textAlign(RIGHT, TOP); text(`Tempo: ${ceil(t)}`, width - 150, 50); if (osuMensagem.tempo > 0) { fill(osuMensagem.cor); textSize(48); textAlign(CENTER, CENTER); text(osuMensagem.texto, width / 2, height / 2); osuMensagem.tempo--; } }
function finalizarMinigameOsu(v) { minigameOsuAtivo = false; osuResultado.mostrando = true; interactionCooldown = frameCount + 30; osuResultadoButtons = [ new Button(width/2 - 125, height/2 + 100, 250, 60, "Continuar", [100, 100, 100], () => { osuResultado.mostrando = false; verificarFimDeJogo(); }) ]; osuResultado.mensagem = v ? "Vitória!" : "Derrota!"; osuResultado.cor = v ? color(144, 238, 144) : color(255, 102, 102); if (minigameTrigger === 'npc' && missoesVistasNaCidade) { if (v) { minigameNivel++; const n = minigameObjetoAssociado; if (n) { const m = missoes.find(m => m.id === 'falar_' + n.tipo); if (m) m.completa = true; } } else { minigameNivel = max(1, minigameNivel - 1); } } minigameObjetoAssociado = null; }
function desenharOsuResultado() { fill(0, 0, 0, 180); rect(0, 0, width, height); textAlign(CENTER, CENTER); textSize(80); fill(osuResultado.cor); text(osuResultado.mensagem, width / 2, height / 2 - 50); osuResultadoButtons.forEach(b => b.draw()); }
function iniciarMinigameGuitarHero(callback) { dialogoAtivo = false; minigameAtivo = false; minigameOsuAtivo = false; minigameGuitarHeroAtivo = true; guitarHeroEstado = 'instrucoes'; guitarHeroPontos = 0; guitarHeroSetas = []; guitarHeroCallbackFinal = callback || null; guitarHeroMensagem.tempo = 0; guitarHeroMostrandoAjuda = false; guitarHeroHelpButton = new Button( width/2 - 220, height/2 + 100, 200, 60, "Como Jogar", CORES.botaoGuia, () => { guitarHeroMostrandoAjuda = true; } ); guitarHeroButtons = [ new Button( width/2 + 20, height/2 + 100, 200, 60, "Começar", CORES.botaoJogo, () => { guitarHeroEstado = 'jogando'; guitarHeroTempoInicio = millis(); guitarHeroProxSetaFrame = frameCount + 60; guitarHeroButtons = []; } ) ]; }
function desenharMinigameGuitarHero() { background(50, 40, 80); if (guitarHeroMostrandoAjuda) { desenharGuitarHeroAjuda(); return; } switch (guitarHeroEstado) { case 'instrucoes': desenharGuitarHeroInstrucoes(); break; case 'jogando': desenharGuitarHeroJogando(); break; case 'resultado': desenharGuitarHeroResultado(); break; } }
function desenharGuitarHeroInstrucoes() { textAlign(CENTER, CENTER); fill(255); textSize(48); text("Desafio de Ritmo", width / 2, height / 2 - 120); textSize(22); textLeading(30); text( "Use as TECLAS DE SETA para acertar as notas que caem.\nAcerte para ganhar pontos, mas cuidado para não errar ou deixar passar!", width / 2, height / 2 - 40 ); text("Alcance 700 pontos para vencer!", width / 2, height / 2 + 50); textLeading(0); guitarHeroButtons.forEach(b => b.draw()); guitarHeroHelpButton.draw(); }
function desenharGuitarHeroAjuda() { fill(0, 0, 0, 200); rect(0, 0, width, height); fill(255); textAlign(CENTER, CENTER); textSize(32); text("Como Jogar", width / 2, 150); textSize(20); textLeading(32); textAlign(LEFT, TOP); let ajudaTexto = "• Pressione a TECLA DE SETA correspondente quando a seta passar pela linha.\n\n• ACERTO: Pressionar a tecla certa perto da linha -> +100 Pontos\n\n• ERRO: Deixar uma seta passar da linha -> -75 Pontos\n\n• ERRO: Pressionar a tecla errada -> -50 Pontos"; text(ajudaTexto, width/2 - 300, 220, 600, 300); textLeading(0); guitarHeroHelpVoltarButton.draw(); if(mouseIsPressed) guitarHeroHelpVoltarButton.handleMousePressed(); }
function desenharGuitarHeroJogando() { fill(0, 0, 0, 100); rect(width/2 - 220, 0, 440, height); noFill(); stroke(255, 255, 255, 50); strokeWeight(guitarHeroZonaAltura); line(width/2 - 220, guitarHeroLinhaY, width/2 + 220, guitarHeroLinhaY); stroke(255); strokeWeight(2); line(width/2 - 220, guitarHeroLinhaY, width/2 + 220, guitarHeroLinhaY); let tempoDecorrido = (millis() - guitarHeroTempoInicio) / 1000; let tempoRestante = guitarHeroDuracao - tempoDecorrido; if (tempoRestante <= 0 || guitarHeroPontos >= 700) { finalizarMinigameGuitarHero(); return; } if (frameCount > guitarHeroProxSetaFrame) { let direcoes = ['left', 'down', 'up', 'right']; let direcao = random(direcoes); let velocidade = random(3.5, 5.5); guitarHeroSetas.push(new Seta(direcao, velocidade)); guitarHeroProxSetaFrame = frameCount + random(45, 75); } for (let i = guitarHeroSetas.length - 1; i >= 0; i--) { let seta = guitarHeroSetas[i]; seta.update(); seta.draw(); if (!seta.ativa) { guitarHeroPontos = max(0, guitarHeroPontos - 75); guitarHeroMensagem = { texto: "Perdeu!", cor: color(255, 180, 180), tempo: 30 }; guitarHeroSetas.splice(i, 1); } } fill(255); textSize(32); textAlign(LEFT, TOP); text(`Pontos: ${guitarHeroPontos}`, 20, 20); textAlign(RIGHT, TOP); text(`Tempo: ${ceil(tempoRestante)}`, width - 20, 20); if (guitarHeroMensagem.tempo > 0) { fill(guitarHeroMensagem.cor); textSize(48); textAlign(CENTER, CENTER); text(guitarHeroMensagem.texto, width/2, height/2); guitarHeroMensagem.tempo--; } }
function verificarAcertoGuitarHero(direcaoPressionada) { let acertou = false; for (let i = guitarHeroSetas.length - 1; i >= 0; i--) { let seta = guitarHeroSetas[i]; if (seta.direcao === direcaoPressionada) { if (seta.y > guitarHeroLinhaY - (guitarHeroZonaAltura * 2) && seta.y < guitarHeroLinhaY + guitarHeroZonaAltura) { guitarHeroPontos += 100; guitarHeroMensagem = { texto: "Bom!", cor: color(180, 255, 180), tempo: 30 }; guitarHeroSetas.splice(i, 1); acertou = true; break; } } } if (!acertou) { guitarHeroPontos = max(0, guitarHeroPontos - 50); guitarHeroMensagem = { texto: "Seta Errada!", cor: color(255, 100, 100), tempo: 30 }; } }
function finalizarMinigameGuitarHero() { guitarHeroEstado = 'resultado'; if (guitarHeroPontos >= 700) { guitarHeroResultadoMsg = "Vitória!"; } else { guitarHeroResultadoMsg = "Tente Novamente!"; } guitarHeroButtons = [ new Button( width/2 - 100, height/2 + 100, 200, 60, "Continuar", [100, 100, 100], () => { minigameGuitarHeroAtivo = false; interactionCooldown = frameCount + 30; if (guitarHeroCallbackFinal) { guitarHeroCallbackFinal(); } } ) ]; }
function desenharGuitarHeroResultado() { textAlign(CENTER, CENTER); fill(255); textSize(64); text(guitarHeroResultadoMsg, width / 2, height / 2 - 80); textSize(32); text(`Pontuação Final: ${guitarHeroPontos}`, width / 2, height / 2); guitarHeroButtons.forEach(b => b.draw()); }

/**
 * =========================================================================
 * SEÇÃO 12: FUNÇÕES UTILITÁRIAS E DE CENA FINAL
 * =========================================================================
 */
function verificarFimDeJogo() { if (todasMissoesCompletas) return; const missoesObrigatorias = missoes.filter(m => !m.titulo.includes("Opcional")); const completas = missoesObrigatorias.every(m => m.completa); if (completas) { todasMissoesCompletas = true; estadoJogo = 'decisao_final'; } }
function iniciarCutsceneFinal() { estadoJogo = 'cutscene_final'; cutsceneStep = 0; dialogoAtivo = true; dialogoNPC = { tipo: 'morgana_pensando', img: imgMorgana }; dialogoAtual = cutsceneDialogo; dialogoIndex = 0; btnProxCidade = null; morgana.visivel = true; cutsceneCarroPos.x = morgana.x + 200; cutsceneCarroPos.y = carro.y; }
function desenharTelaDecisao() { desenharCeuDinamico(); fill(0, 0, 0, 180); rect(0, 0, width, height); fill(255); textSize(48); textAlign(CENTER, CENTER); text("Próxima Cidade?", width / 2, height / 2 - 50); decisaoButtons.forEach(b => b.draw()); }
function desenharCutsceneFinal() { switch(cutsceneStep) { case 0: desenharCenaUrbana(); atualizarGato(); if (dialogoAtivo) { desenharDialogo(); } else { cutsceneStep++; } break; case 1: desenharCenaUrbana(); atualizarGato(); let alvoCarroX = morgana.x + 50; cutsceneCarroPos.x = lerp(cutsceneCarroPos.x, alvoCarroX, 0.05); image(imgCarro, cutsceneCarroPos.x, cutsceneCarroPos.y, 350, 175); if (abs(cutsceneCarroPos.x - alvoCarroX) < 2) { cutsceneStep++; } break; case 2: desenharCenaUrbana(); image(imgCarro, cutsceneCarroPos.x, cutsceneCarroPos.y, 350, 175); let alvoMorganaX = cutsceneCarroPos.x + 40; morgana.x = lerp(morgana.x, alvoMorganaX, 0.05); if(gato.visivel && gato.estado === 'seguindo') { gato.x = morgana.x - 40; gato.y = morgana.y + 60; } morgana.direcao = 'right'; if (abs(morgana.x - alvoMorganaX) < 2) { morgana.visivel = false; if(gato.visivel) gato.visivel = false; cutsceneStep++; } break; case 3: desenharCenaUrbana(); cutsceneCarroPos.x += 8; image(imgCarro, cutsceneCarroPos.x, cutsceneCarroPos.y, 350, 175); if (cutsceneCarroPos.x > width + 50) { estadoJogo = 'cidade_2'; morgana.x = 80; morgana.y = 400; morgana.visivel = true; if(gato.estado === 'seguindo') { gato.visivel = true; gato.x = morgana.x - 40; gato.y = morgana.y + 60; } let pedro = npcs.find(n => n.tipo === 'pedro'); pedro.x = width + 50; pedro.estado = 'indo_para_morgana'; movimentoBloqueado = true; } break; } }
function desenharCutsceneRetorno() { if (cenaDaCutscene === 'cidade_2') { desenharFundoCenaUrbana2(); } else if (cenaDaCutscene === 'cidade') { desenharFundoCenaUrbana(); } else if (cenaDaCutscene === 'jogando') { desenharFundoCenaRural(); } switch(retornoCutsceneStep) { case 0: desenharMorgana(); if (!dialogoAtivo) { retornoCutsceneStep++; } break; case 1: let alvoCarroX = morgana.x - 200; cutsceneCarroPos.x = lerp(cutsceneCarroPos.x, alvoCarroX, 0.05); image(imgCarroLeft, cutsceneCarroPos.x, carro.y, 350, 175); desenharMorgana(); if (abs(cutsceneCarroPos.x - alvoCarroX) < 2) { retornoCutsceneStep++; } break; case 2: image(imgCarroLeft, cutsceneCarroPos.x, carro.y, 350, 175); let alvoMorganaX = cutsceneCarroPos.x + 150; morgana.x = lerp(morgana.x, alvoMorganaX, 0.05); desenharMorgana(); if (abs(morgana.x - alvoMorganaX) < 2) { morgana.visivel = false; if(gato.visivel) gato.visivel = false; retornoCutsceneStep++; } break; case 3: cutsceneCarroPos.x -= 8; image(imgCarroLeft, cutsceneCarroPos.x, carro.y, 350, 175); if (cutsceneCarroPos.x < -350) { cenaDaCutscene = 'cidade'; cutsceneCarroPos.x = width; retornoCutsceneStep++; } break; case 4: cutsceneCarroPos.x -= 8; image(imgCarroLeft, cutsceneCarroPos.x, carro.y, 350, 175); if (cutsceneCarroPos.x < -350) { cenaDaCutscene = 'jogando'; cutsceneCarroPos.x = width; retornoCutsceneStep++; } break; case 5: let posFinalCampo = 500; cutsceneCarroPos.x = lerp(cutsceneCarroPos.x, posFinalCampo, 0.05); image(imgCarroLeft, cutsceneCarroPos.x, carro.y, 350, 175); if (abs(cutsceneCarroPos.x - posFinalCampo) < 2) { morgana.x = posFinalCampo + 150; morgana.y = 350; morgana.visivel = true; if(gato.estado === 'seguindo') { gato.visivel = true; gato.x = morgana.x - 40; gato.y = morgana.y + 60; } retornoCutsceneStep++; } break; case 6: estadoJogo = 'fim_de_jogo'; movimentoBloqueado = true; iniciarDialogoFinal(); break; } }

function iniciarDialogoFinal() {
    dialogoAtivo = true;
    dialogoIndex = 0;
    
    const gatoResgatado = missoes.find(m => m.id === 'resgatar_gato').completa;

    if (gatoResgatado) {
        dialogoAtual = dialogoFimComGato;
        dialogoNPC = { tipo: 'morgana', img: imgMorgana };
    } else {
        dialogoAtual = dialogoFimSemGato;
        dialogoNPC = { tipo: 'morgana_pensando', img: imgMorgana };
    }
}

function desenharFimDeJogo() {
    desenharFundoCenaRural();
    image(imgCarroLeft, 500, carro.y, 350, 175);
    desenharMorgana();
    if (gato.visivel) {
      desenharGato();
    }

    if (dialogoAtivo) {
        desenharDialogo();
    } 
    else {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(80);
        text("Fim", width / 2, height / 2 - 40);
        textSize(32);
        text("Obrigado por jogar!", width / 2, height / 2 + 40);
    }
}

function prepararTransicao() { morgana.visivel = true; morgana.x = 220; morgana.y = 400; }
function verificarProximidadeNPCs() { return npcs.filter(n => n.scene === estadoJogo && dist( morgana.x + morgana.w / 2, morgana.y + morgana.h / 2, n.x + n.w / 2, n.y + n.h / 2 ) < 80 ); }
function exibirMensagem(t, y) { mensagens.push({ txt: t, y: y }); }
function desenharMensagens() { let yOff = 0; mensagens.forEach(m => { fill(0, 180); noStroke(); rectMode(CORNER); let w = textWidth(m.txt) + 20; rect(width/2 - w/2, m.y + yOff - 15, w, 30, 10); fill(255); textSize(20); textAlign(CENTER, CENTER); text(m.txt, width/2, m.y + yOff); yOff += 40; }); mensagens = []; }
function gerenciarCursor() { if (dialogoAtivo || minigameOsuAtivo || osuIntroAtivo) { cursor(ARROW); return; } let hoverButton = false; const buttonLists = [ menuButtons, creditosButtons, historiaButtons, objetivoButtons, missoesButtons, guiaButtons, osuResultadoButtons, dialogoButtons, decisaoButtons, guitarHeroButtons ]; if(guitarHeroMostrandoAjuda && guitarHeroHelpButton) { buttonLists.push([guitarHeroHelpButton]); } if (btnProxCidade) buttonLists.push([btnProxCidade]); for (const btnList of buttonLists) { if (btnList.some(b => b.isHovering())) { hoverButton = true; break; } } if (hoverButton) { cursor(HAND); return; } if (estadoJogo === 'missoes') { for (const box of missoesBoundingBoxes) { const m = missoes.find(mi => mi.id === box.id); if (m && !m.completa && mouseX > box.x && mouseX < box.x + box.w && mouseY > box.y && mouseY < box.y + box.h) { cursor(HAND); return; } } } }