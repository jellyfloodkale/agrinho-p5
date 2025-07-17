//--------- Variáveis de sons ---------
let somGameOverTocou = false;
let somDinheiro;
let somTrator;
let somGameover;
let somFabrica;
let somConstrucao;
let somComputador;
let somAlerta;
let somFundo;
let somVitoria;

// -------- Variáveis principais --------
let camadaParticulas;
let fluxoParticulas = [];
let tempoFluxo = 0;
let recursoRural = 100;
let recursoUrbano = 100;
let fluxo = 0.3;
let investmentoLevel = 1;
let investimentoRuralLevel = 1;
let tempo = 0;
let animarFluxo = false;
let tempoAnimacao = 0;
let fluxoDirecao = "rural-para-urbano";
let gameOver = false;
let imgGameover;
let venceu = false;
let mensagemAviso = "";
let tempoAviso = 0;
let telaFinal = false;
let telaInicial = true;

let custoTecUrbana = 20;
let custoTecRural = 20;

let metaUrbano = 200;
let metaRural = 200;

let ganhoNaturalBaseRural = 0.01;
let ganhoNaturalBaseUrbano = 0.0001;

let capacidadeMaxRural = 100;
let capacidadeMaxUrbano = 100;
let custoCapacidadeUrbana = 50;
let custoCapacidadeRural = 50;
const custoMaxTecUrbana = 90;
const custoMaxTecRural = 90;
const custoMaxCapacidadeUrbana = 130;
const custoMaxCapacidadeRural = 130;

let botoes = [];
let imgTelaInicial;
let botaoPlay;
let fonteTitulo;

// -------- imagem da tela inicial e efeitos sonoros  --------
function preload() {
    fonteTitulo = loadFont('Caprasimo-Regular.ttf');
  imgTelaInicial = loadImage('ec5a39_c632426bd062486d92dab5447c6bb2cdmv2.png'); 
  somDinheiro = loadSound('cashier-quotka-chingquot-sound-effect-129698.mp3');
  somTrator = loadSound('car-doors-close-and-car-leaves-308152 (mp3cut.net).mp3');
  somGameover = loadSound('marcha-funebre-8-bits-260615.mp3');
  somFabrica = loadSound('futuristic-factory-machine-ps-024-314835 (mp3cut.net).mp3')
  somConstrucao = loadSound('construction-remodel-house-inside-29635 (mp3cut.net).mp3');
  somComputador = loadSound('clicky-keyboard-typing-361367 (mp3cut.net).mp3');
  somAlerta = loadSound('siren-alert-96052 (mp3cut.net).mp3');
  somFundo = loadSound('8bit-music-for-game-68698.mp3');
  somVitoria = loadSound('piglevelwin2mp3-14800.mp3');
  imgGameover = loadImage('cena-de-terremoto-em-estilo-de-quadrinhos.jpg');
}
  
//--------------------
function setup() {
  createCanvas(800, 600);
  criarPainelBotoes();
  esconderBotoes();
  camadaParticulas = createGraphics(width, height);
  criarBotaoPlay();
}
//-------------------------------
function draw() {
  
  //--------tela de play e final-------
  if (telaInicial) {
    mostrarTelaInicial();
    return;
  }

  if (telaFinal) {
    mostrarTelaFinal();
    return;
  }

  background(220);
  verificarGameStatus();
  verificarEventosNaturais();
  desenharPainelInvestimentos();

  //-----------codigos do game over--------
 if (gameOver) {
  background(0);

  if (imgGameover) {
    imageMode(CENTER);
    image(imgGameover, width / 2, height / 2, 800, 600);
  }

  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height - 80);
  text("Pressione F5 para tentar novamente", width / 2, height - 40);
  return;
}

  fill(240);
  stroke(180);
  rect(width - 220, 0, 220, height);

  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Ações", width - 110, 20);
  
  // --------Crescimento natural dos recursos--------
  
  let ganhoNaturalRural = ganhoNaturalBaseRural + investimentoRuralLevel * 0.005;
  let ganhoNaturalUrbano = ganhoNaturalBaseUrbano + investmentoLevel * 0.003;

  if (recursoRural < capacidadeMaxRural) {
    recursoRural += ganhoNaturalRural;
    recursoRural = min(recursoRural, capacidadeMaxRural);
  }

  if (recursoUrbano < capacidadeMaxUrbano) {
    recursoUrbano += ganhoNaturalUrbano;
    recursoUrbano = min(recursoUrbano, capacidadeMaxUrbano);
  }
  
  // ----------Fundo e barras----------
  fill(100, 100, 255);
  rect(0, 0, width / 2, height);
  fill(34, 139, 34);
  rect(width / 2, 0, width / 2, height);

  textSize(40);
  textAlign(CENTER, CENTER);
  text("🏙️", width / 4, height / 2);
  text("🌄", 3 * width / 4, height / 2);
  
  // ----------Barras de recursos--------
  fill(0, 255, 0);
  rect(10, 57, (recursoRural / capacidadeMaxRural) * 200, 20);
  fill(0);
  textSize(14);
  text("Recursos Rurais: " + nf(recursoRural, 1, 1) + " / " + capacidadeMaxRural, 100, 52);

  fill(0, 0, 255);
  rect(10, 20, (recursoUrbano / capacidadeMaxUrbano) * 200, 20);
  fill(0);
  text("Recursos Urbanos: " + nf(recursoUrbano, 1, 1) + " / " + capacidadeMaxUrbano, 105, 15);
  
  // -----------Fluxo automático--------
  tempoFluxo++;
  if (tempoFluxo >= 100 && recursoRural >= fluxo) {
    recursoRural -= fluxo;
    recursoUrbano += fluxo;
    tempoFluxo = 0;
    fluxoDirecao = "rural-para-urbano";
    iniciarFluxoVisual(fluxoDirecao, "campo");
    animarFluxo = true;
    tempoAnimacao = 100;
  }

  if (animarFluxo) {
    fluxoDesenho();
    tempoAnimacao--;
    if (tempoAnimacao <= 0) animarFluxo = false;
  }

  if (frameCount % 60 === 0) tempo++;

  fill(0);
  textSize(16);
  textAlign(LEFT);
  text(`Tempo: ${tempo} segundos`, 540, 20);

  fill(50);
  textSize(16);
  text(`Meta Rural: ${metaRural} | Meta Urbana: ${metaUrbano}`, 10, height - 500);

  if (tempoAviso > 0) {
    fill(255, 80, 0);
    noStroke();
    rect(width / 2 - 220, 70, 440, 40, 10);
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(mensagemAviso, width / 2, 90);
    tempoAviso--;
  }
}

// -------- Função interface --------
function mostrarTelaInicial() {
  background(200);
  
  image(imgTelaInicial, 0, 0, width, height);

  textFont(fonteTitulo);
  textAlign(CENTER, CENTER);
  textSize(52);
  strokeWeight(6);
  
  
  stroke(0);
  fill(34, 139, 34); 
  text("CIDADE E CAMPO", width / 2, height / 2 - 120);

  fill(30, 144, 255);
  text("EM HARMONIA!!", width / 2, height / 2 - 60);

  noStroke();
  textSize(30);
  fill('yellow');
  text("A harmonia da cidade e do campo", width / 2, height / 2 - 10);
   textFont('sans-serif');
}

 //-----------cria o botão------
function criarBotaoPlay() {
  botaoPlay = createButton("▶️ PLAY");
  botaoPlay.position(width / 2 - 50, height / 2 + 100);
  botaoPlay.style('font-size', '20px');
  botaoPlay.style('padding', '10px 20px');
  botaoPlay.style('background-color', '#28a745');
  botaoPlay.style('color', 'white');
  botaoPlay.mousePressed(() => {
    telaInicial = false;
    mostrarBotoes();
    botaoPlay.hide();
    mostrarBotoes();
    atualizarTextoDosBotoes();
    if (!somFundo.isPlaying()) {
  somFundo.setVolume(0.2); 
  somFundo.loop();        
}
  });
}
// --------função da tele que vence----------
function mostrarTelaFinal() {
  background(0, 150, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("🎉 Você conseguiu! Sua cidade prosperou com o campo 🎉", width / 2, height / 3);

  textSize(20);
  text(`Tempo total: ${tempo} segundos`, width / 2, height / 2);
  text(`Investimento Urbano: Nível ${investmentoLevel}`, width / 2, height / 2 + 30);
  text(`Investimento Rural: Nível ${investimentoRuralLevel}`, width / 2, height / 2 + 60);

  textSize(16);
  text("Pressione F5 ou recarregue a página para jogar novamente.", width / 2, height - 50);
}

// -------- Criação dos botões --------
function criarPainelBotoes() {
  let painelX = height - 590;
  let painelY = 410;
  let espacamentoY = 50;

  botoes.push(criarBotao("Investir Tecnologia Urbana (20)", painelX, painelY, investirTecUrbana, '#4CAF50', '#45a049'));
  botoes.push(criarBotao("Investir Tecnologia Rural (20)", painelX, painelY + espacamentoY, investirTecRural, '#8BC34A', '#689F38'));
  botoes.push(criarBotao("Reforçar Infraestrutura Urbana (20)", painelX, painelY + 2 * espacamentoY, infraUrbana, '#2196F3', '#0b7dda'));
  botoes.push(criarBotao("Ajudar Zona Rural (20)", painelX, painelY + 3 * espacamentoY, ajudarZonaRural, '#FF5722', '#e64a19'));
  botoes.push(criarBotao("Expandir Capacidade Urbana (50)", painelX + 255, painelY + 2 * espacamentoY, expandirCapacidadeUrbana, '#9C27B0', '#7B1FA2'));
  botoes.push(criarBotao("Expandir Capacidade Rural (50)", painelX + 180, painelY + 3 * espacamentoY, expandirCapacidadeRural, '#FFC107', '#FFA000'));
}

function esconderBotoes() {
  for (let b of botoes) {
    b.hide();
  }
}

function mostrarBotoes() {
  for (let b of botoes) {
    b.show();
  }
}
// -------- Funções botões --------
function expandirCapacidadeUrbana() {
  if (recursoUrbano >= custoCapacidadeUrbana) {
    recursoUrbano -= custoCapacidadeUrbana;
    capacidadeMaxUrbano += 20;
    somConstrucao.play();

    custoCapacidadeUrbana = min(custoCapacidadeUrbana + 50, custoMaxCapacidadeUrbana);
    atualizarTextoDosBotoes();
  }
}
function expandirCapacidadeRural() {
  if (recursoRural >= custoCapacidadeRural) {
    recursoRural -= custoCapacidadeRural;
    capacidadeMaxRural += 20;
    
    somConstrucao.play();

    custoCapacidadeRural = min(custoCapacidadeRural + 50, custoMaxCapacidadeRural);
    atualizarTextoDosBotoes();
  }
}
function investirTecUrbana() {
  if (recursoUrbano >= custoTecUrbana) {
    recursoUrbano -= custoTecUrbana;
    investmentoLevel++;
    fluxo += 0.3;
    fluxoDirecao = "urbano-para-rural";
    iniciarFluxoVisual(fluxoDirecao, "tecnologia");
    custoTecUrbana = min(custoTecUrbana + 10, custoMaxTecUrbana);
    animarFluxo = true;
    tempoAnimacao = 60;
    somComputador.play();

    custoTecUrbana = min(custoTecUrbana + 10, custoMaxTecUrbana);
    atualizarTextoDosBotoes();
  }
}

function investirTecRural() {
  if (recursoRural >= custoTecRural) {
    recursoRural -= custoTecRural;
    investimentoRuralLevel++;
    fluxo += 0.2;
    fluxoDirecao = "urbano-para-rural";
    iniciarFluxoVisual(fluxoDirecao, "trator");
    animarFluxo = true;
    tempoAnimacao = 60;
    somTrator.play();

    custoTecRural = min(custoTecRural + 10, custoMaxTecRural);
    atualizarTextoDosBotoes();
  }
}
function atualizarTextoDosBotoes() {
  botoes[0].html(`Investir Tecnologia Urbana (${custoTecUrbana})`);
  botoes[1].html(`Investir Tecnologia Rural (${custoTecRural})`);
  botoes[4].html(`Expandir Capacidade Urbana (${custoCapacidadeUrbana})`);
  botoes[5].html(`Expandir Capacidade Rural (${custoCapacidadeRural})`);
}

function ajudarZonaRural() {
  if (recursoUrbano >= 20) {
    recursoUrbano -= 20;
    recursoRural = min(recursoRural + 10, capacidadeMaxRural);
    fluxoDirecao = "urbano-para-rural";
    iniciarFluxoVisual(fluxoDirecao, "dinheiro");
    animarFluxo = true;
    tempoAnimacao = 60;
    somDinheiro.play();
  }
}

function infraUrbana() {
  if (recursoRural >= 20) {
    recursoRural -= 20;
    recursoUrbano += 5;
    fluxoDirecao = "rural-para-urbano";
    iniciarFluxoVisual(fluxoDirecao, "industria");
    animarFluxo = true;
    tempoAnimacao = 60;
    somFabrica.play();
  }
}
//---desenha os emoji se movimentando-----
function fluxoDesenho() {
  for (let i = fluxoParticulas.length - 1; i >= 0; i--) {
    let p = fluxoParticulas[i];
    p.x += p.vx;
    p.y += p.vy;

    textSize(24);
    textAlign(CENTER, CENTER);

    let emoji = "🚜";
    switch (p.tipo) {
      case "campo": emoji = "🌾"; break;
      case "tecnologia": emoji = "💻"; break;
      case "dinheiro": emoji = "💵"; break;
      case "industria": emoji = "🏭"; break;
    }

    noStroke();
    text(emoji, p.x, p.y);

    push();
    fill(0);
    translate(p.x, p.y);
    if (fluxoDirecao === "rural-para-urbano") {
      rotate(PI);
      triangle(0, -5, 0, 5, 10, 0);
    } else {
      triangle(0, -5, 10, 0, 0, 5);
    }
    pop();

    if (
      (fluxoDirecao === "rural-para-urbano" && p.x <= width * 0.25) ||
      (fluxoDirecao === "urbano-para-rural" && p.x >= width * 0.75)
    ) {
      fluxoParticulas.splice(i, 1);
    }
  }
}

// -------- Animação das partículas --------
function iniciarFluxoVisual(direcao, tipo) {
  for (let i = 0; i < fluxo; i++) {
    if (direcao === "rural-para-urbano") {
      fluxoParticulas.push({
        x: 3 * width / 4,
        y: height / 2 + random(-20, 20),
        vx: random(-1.0, -1.8),
        vy: random(-0.2, 0.2),
        tipo: tipo
      });
    } else {
      fluxoParticulas.push({
        x: width / 4,
        y: height / 2 + random(-20, 20),
        vx: random(1.0, 1.8),
        vy: random(-0.2, 0.2),
        tipo: tipo
      });
    }
  }
}

//------botoes --------
function criarBotao(texto, x, y, onClick, bgColor, hoverColor) {
  let btn = createButton(texto);
  btn.position(x, y);
  btn.mousePressed(onClick);
  btn.style('background-color', bgColor);
  btn.style('color', 'white');
  btn.style('padding', '10px 15px');
  btn.style('border', 'none');
  btn.style('border-radius', '8px');
  btn.style('box-shadow', '2px 2px 5px rgba(0,0,0,0.3)');
  btn.style('font-family', 'Arial, sans-serif');
  btn.style('font-size', '14px');
  btn.style('cursor', 'pointer');
  btn.style('transition', 'background-color 0.3s ease');
  btn.mouseOver(() => btn.style('background-color', hoverColor));
  btn.mouseOut(() => btn.style('background-color', bgColor));
  return btn;
}

// -------- painel de investimentos --------
function desenharPainelInvestimentos() {
  fill(245);
  stroke(150);
  rect(width / 2 - 140, 10, 280, 50, 10);
  noStroke();
  fill(50);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`Investimentos Zona Urbana: Nível ${investmentoLevel}`, width / 2, 25);
  text(`Investimentos Zona Rural: Nível ${investimentoRuralLevel}`, width / 2, 45);
}

// -------- Desastres naturais  --------
let ultimoDesastre = 0;

function verificarEventosNaturais() {
  if (millis() - ultimoDesastre > 20000) {
    let desastre = random();
    let perda;

    if (desastre < 0.2) {
      perda = recursoRural * random(0.1, 0.3);
      recursoRural -= perda;
      mensagemAviso = `⚠️ Desastre rural! Perda de ${nf(perda, 1, 1)} recursos.`;
    } else {
      perda = recursoUrbano * random(0.1, 0.2);
      recursoUrbano -= perda;
      mensagemAviso = `⚠️ Desastre urbano! Perda de ${nf(perda, 1, 1)} recursos.`;
    }
    somAlerta.play();
    tempoAviso = 180;
    ultimoDesastre = millis();
  }
}

// -------- Game Over e Vitória --------
function verificarGameStatus() {
  if (recursoRural <= 5 || recursoUrbano <= 5) {
  if (!gameOver) {
    gameOver = true;
    esconderBotoes();
    if (!somGameOverTocou) {
      somGameover.play();
      somGameOverTocou = true;
    }
    somFundo.stop();
  }
}


  if ((recursoUrbano >= 200 || recursoRural >= 200) && !telaFinal) {
    venceu = true;
    telaFinal = true;
    esconderBotoes();
    somFundo.stop();
    somVitoria.play(); 
  }
}
function somOver(){
    somGameover.play();
}

//------- fontes retiradas- ------
// efeitos sonoros foi retirado do site https://pixabay.com/pt/
// imagem do google e do site https://pixabay.com/pt/
//codigos que eu n sabia corrigir como o estilo dos botoes eu olhei em videos e pedi ajuda no chatgpt eu falava pode me ajudar a melhorar tal coisa no meu codiogo e ele me ajudava a fazer e corrigir.
//as fontes-size do google fonts

//--------codigos de test chets-----------
//adiciona mais recursos
function keyTyped() {
  if (key === 't' || key === 'T') {
    recursoRural += 100;
    recursoUrbano += 100;
    console.log("DEBUG: Recursos adicionados");
  }
  //deixa quase ganhando
  if (key === 'v' || key === 'V') {
    recursoRural = metaRural - 1;
    recursoUrbano = metaUrbano - 1;
    console.log("DEBUG: Quase vencendo!");
  }
  //almenta e velocidade que ganharecursos
  if (key === 'l' || key === 'L') {
    investmentoLevel += 3;
    investimentoRuralLevel += 3;
    fluxo += 0.5;
    console.log("DEBUG: Níveis aumentados");
  }
}