// =============================================================================
// Variáveis Globais
// =============================================================================

// Jogo (Campo)
let jogador;
let plantacoes = [];
let plantacoesNoSaco = [];
let plantacoesAnimando = []; // Plantações em transição para o saco
let arvores = [];
let caminhao; // Caminhão no cenário da fazenda
let todasPlantacoesColetadas = false;
let velocidadeJogador = 5;

// Jogo (Cidade - Fuga)
let caminhaoFuga; // Caminhão na cena de fuga
let obstaculos = [];
let cenaFugaPredios = []; // Prédios de fundo na cena de fuga
let velocidadeObstaculoAtual; // Velocidade atual dos obstáculos na fuga
let caminhaoFugaVelocidadeAtual; // Velocidade atual do caminhão na fuga
let distanciaFuga = 0; // Distância percorrida na fuga

// Pontuação
let pontuacaoFazenda = 0;
let pontuacaoFuga = 0;
let pontuacaoTotal = 0;

// Estados do Jogo e do Caminhão
let estadoJogo = 'menu'; // 'menu', 'jogando', 'instrucoes', 'caminhaoFuga', 'vitoria', 'derrota', 'creditos', 'mensagemCampoCidade'
let estadoCaminhaoCampo = 'paradoFora'; // 'paradoFora', 'chegando', 'paradoCentro', 'saindo'

// Menu Dinâmico
let menuPredios = [];
let menuMontanhas = [];
let menuNuvens = [];
let menuChaoX = 0; // Posição X para rolagem do chão
let caminhaoMenuOffsetY = 0; // Offset Y para animação do caminhão no menu
let caminhaoMenuDir = 1; // Direção da animação do caminhão no menu
let smokeParticles = []; // Partículas de fumaça do caminhão no menu

// Constantes de Jogo
const NUM_INICIAL_PLACOES = 10;
const NUM_ARVORES = 15;
const PORCENTAGEM_COLETA_CAMINHAO = 0.7; // 70% das plantações para o caminhão aparecer
const PONTUACAO_VITORIA = 10000; // Pontuação para vencer o jogo

// Emojis e Dimensões Padrão
const EMOJI_JOGADOR = "🤠";
const EMOJI_CAMINHAO = "🚚"; // Usado para menu e campo
const EMOJI_CAMINHAO_FUGA = "🚚"; // Usado para cena de fuga
const EMOJIS_PLANTACOES = ["🍎", "🥦", "🥕", "🍓", "🍇", "🌽", "🥔", "🍄", "🥑", "🍆", "🥝", "🌱", "🌿", "🌾", "🌶️", "🍋", "🍊", "🍑", "🍐", "🍉", "🍒", "🥬", "🧅"];
const EMOJIS_ARVORES = ["🌲", "🌳"];
const EMOJIS_OBSTACULOS_FUGA = ["🚗", "🚕", "🚓", "🚑", "🚒", "🚐", "🚜", "🚲", "🛵"];

const JOGADOR_TAMANHO = 40;
const CAMINHAO_CAMPO_TAMANHO = 100;
const SACO_LARGURA = 200;
const SACO_ALTURA = 150;
const SACO_COR = [139, 69, 19];

const CAMINHAO_FUGA_LARGURA = 150;
const CAMINHAO_FUGA_ALTURA = 80;
const CAMINHAO_FUGA_Y_POS_PERCENTUAL = 0.7; // Posição Y da "rua" na cena de fuga (0.7 = 70% da tela para baixo)

// Velocidades de Elementos de Fundo/Animação
const VELOCIDADE_MENU_FUNDO = 4;
const VELOCIDADE_MONTANHAS_MENU = 1;
const VELOCIDADE_NUVENS_MENU = 0.5;
const VELOCIDADE_CAMINHAO_FUGA_BASE = 5;
const VELOCIDADE_OBSTACULO_FUGA_BASE = 8;
const ACELERACAO_FUGA = 0.008; // Aceleração gradual na cena de fuga
const VELOCIDADE_MAXIMA_FUGA = 30; // Limite máximo de velocidade na fuga
const VELOCIDADE_PREDIOS_FUGA = 2; // Velocidade dos prédios no fundo da fuga


// =============================================================================
// Configuração Inicial e Reset
// =============================================================================

function setup() {
  createCanvas(windowWidth, windowHeight);
  inicializarObjetosJogo();
  inicializarElementosMenu();
  reiniciarCenaFuga(); // Prepara a cena de fuga no início
}

// Inicializa propriedades dos objetos principais do jogo
function inicializarObjetosJogo() {
  jogador = {
    x: width / 2,
    y: height / 2,
    tamanho: JOGADOR_TAMANHO,
    largura: JOGADOR_TAMANHO,
    altura: JOGADOR_TAMANHO
  };
  caminhao = {
    x: -CAMINHAO_CAMPO_TAMANHO,
    y: height / 2,
    tamanho: CAMINHAO_CAMPO_TAMANHO,
    largura: CAMINHAO_CAMPO_TAMANHO,
    altura: CAMINHAO_CAMPO_TAMANHO
  };
  caminhaoFuga = {
    x: width / 4,
    y: height * CAMINHAO_FUGA_Y_POS_PERCENTUAL - CAMINHAO_FUGA_ALTURA / 2,
    largura: CAMINHAO_FUGA_LARGURA,
    altura: CAMINHAO_FUGA_ALTURA
  };
}

// Preenche os arrays iniciais para a rolagem do menu
function inicializarElementosMenu() {
  for (let i = 0; i < 10; i++) novaPredioMenu(i * (width / 6) - width);
  for (let i = 0; i < 6; i++) novaMontanhaMenu(i * (width / 3) - width);
  for (let i = 0; i < 5; i++) novaNuvemMenu(i * (width / 4) - width);
}

// Reseta todas as variáveis e elementos do jogo para um novo início
function reiniciarJogoCompleto() {
  plantacoes = [];
  plantacoesNoSaco = [];
  plantacoesAnimando = [];
  pontuacaoFazenda = 0;
  pontuacaoFuga = 0;
  pontuacaoTotal = 0;
  arvores = [];
  todasPlantacoesColetadas = false;
  estadoCaminhaoCampo = 'paradoFora';
  caminhao.x = width + caminhao.tamanho * 2; // Garante que o caminhão está fora da tela
  smokeParticles = []; // Limpa partículas de fumaça do menu
  reiniciarCenaFuga(); // Reseta elementos específicos da cena de fuga
}

// Reseta elementos específicos da cena de fuga para um novo início
function reiniciarCenaFuga() {
  caminhaoFuga.x = width / 4;
  caminhaoFuga.y = height * CAMINHAO_FUGA_Y_POS_PERCENTUAL - CAMINHAO_FUGA_ALTURA / 2;
  obstaculos = [];
  distanciaFuga = 0;
  cenaFugaPredios = [];
  velocidadeObstaculoAtual = VELOCIDADE_OBSTACULO_FUGA_BASE;
  caminhaoFugaVelocidadeAtual = VELOCIDADE_CAMINHAO_FUGA_BASE;

  for (let i = 0; i < 5; i++) {
    novaPredioFuga(width + i * random(200, 400));
  }
}

// =============================================================================
// Loop Principal do Jogo (draw)
// =============================================================================

function draw() {
  switch (estadoJogo) {
    case 'menu':
      drawMenu();
      break;
    case 'jogando':
      drawJogo();
      break;
    case 'instrucoes':
      drawInstrucoes();
      break;
    case 'caminhaoFuga':
      drawCaminhaoFuga();
      break;
    case 'vitoria':
      drawVitoria();
      break;
    case 'derrota':
      drawDerrota();
      break;
    case 'creditos':
      drawCreditos();
      break;
    case 'mensagemCampoCidade':
      drawMensagemCampoCidade();
      break;
  }
}


// =============================================================================
// Funções de Renderização de Estados
// =============================================================================

function drawMenu() {
  background(100, 180, 255); // Céu azul

  // Desenha e move elementos de fundo com parallax
  moverDesenharElementosFundoMenu(menuNuvens, VELOCIDADE_NUVENS_MENU, novaNuvemMenu, desenharNuvem);
  moverDesenharElementosFundoMenu(menuMontanhas, VELOCIDADE_MONTANHAS_MENU, novaMontanhaMenu, desenharMontanha);
  moverDesenharElementosFundoMenu(menuPredios, VELOCIDADE_MENU_FUNDO, novaPredioMenu, desenharPredioMenu);

  // Desenha a rua com faixas animadas
  menuChaoX += VELOCIDADE_MENU_FUNDO;
  fill(30, 30, 30);
  rect(0, height * 0.7, width, height * 0.3);
  drawFaixasRuaMenu(menuChaoX);

  // Desenha e anima o caminhão do menu
  let caminhaoMenuX = width / 2;
  let caminhaoMenuY = height * 0.7 + caminhaoMenuOffsetY;
  animarCaminhaoMenu(caminhaoMenuX, caminhaoMenuY);
  gerarDesenharFumacaCaminhaoMenu(caminhaoMenuX + (CAMINHAO_CAMPO_TAMANHO * 1.5) / 2, caminhaoMenuY + CAMINHAO_CAMPO_TAMANHO / 4);

  // Título do jogo
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("Colheita Feliz!", width / 2, height / 4);

  // Botões do menu principal
  let yInicialBotoes = height / 2 + 30;
  drawBotao("Iniciar Jogo", width / 2, yInicialBotoes, 250, 70, [80, 80, 80, 200], 32);
  drawBotao("Campo e Cidade", width / 2, yInicialBotoes + 90, 250, 70, [50, 150, 50, 200], 32);
  drawBotao("Instruções", width / 2, yInicialBotoes + 180, 250, 70, [50, 100, 150, 200], 32);
  drawBotao("Créditos", width / 2, yInicialBotoes + 270, 250, 70, [150, 50, 100, 200], 32);

  rectMode(CORNER); // Reseta para o modo de canto padrão
}

function drawJogo() {
  background(50, 200, 50); // Cena da fazenda (verde)

  let oldX = jogador.x; // Guarda a posição antiga para colisões
  let oldY = jogador.y;

  // Movimento do jogador
  moverJogador();
  // Colisão do jogador com árvores (restaura posição se houver colisão)
  checarColisaoJogadorArvores(oldX, oldY);

  // Desenha todas as árvores
  arvores.forEach(arvore => desenharEmoji(arvore.emoji, arvore.x, arvore.y, arvore.tamanho));

  // Gerencia (desenha, coleta, anima) as plantações
  gerenciarPlantacoes();

  // Desenha o saco de coleta e seu conteúdo
  drawSacoColeta();

  // Gerencia o aparecimento e movimento do caminhão no campo
  gerenciarCaminhaoCampo();

  // Desenha o jogador (SOMENTE SE NÃO ESTIVER SAINDO DA TELA)
  if (estadoCaminhaoCampo !== 'saindo') {
      desenharEmoji(EMOJI_JOGADOR, jogador.x, jogador.y, jogador.tamanho);
  } else {
      // Se estiver saindo, anima o jogador saindo junto com o caminhão
      jogador.x -= 15; // Velocidade igual à do caminhão saindo
      desenharEmoji(EMOJI_JOGADOR, jogador.x, jogador.y, jogador.tamanho);
  }

  // Exibe a pontuação da fazenda
  fill(255);
  textSize(30);
  textAlign(CENTER, TOP);
  text("Pontuação Fazenda: " + pontuacaoFazenda, width / 2, 30);
}

function drawCaminhaoFuga() {
  background(100, 180, 255); // Céu azul (cidade)

  // Aumenta a velocidade do jogo conforme o tempo passa
  acelerarCenaFuga();

  // Move e desenha os prédios de fundo com parallax
  moverDesenharPrediosFuga();

  // Desenha a rua e as faixas animadas
  drawRuaFuga();

  // Lógica de movimento do caminhão do jogador e detecção de colisões
  moverCaminhaoFuga();
  gerarDesenharObstaculosFuga(); // Inclui a verificação de colisão aqui

  // Desenha o caminhão de fuga do jogador
  desenharEmoji(EMOJI_CAMINHAO_FUGA, caminhaoFuga.x + caminhaoFuga.largura / 2, caminhaoFuga.y + caminhaoFuga.altura / 2, CAMINHAO_FUGA_LARGURA * 0.8);

  // Atualiza e exibe a pontuação e distância
  distanciaFuga += velocidadeObstaculoAtual;
  pontuacaoFuga = floor(distanciaFuga / 10);
  pontuacaoTotal = pontuacaoFazenda + pontuacaoFuga;

  fill(255);
  textSize(30);
  textAlign(LEFT, TOP);
  text("Distância: " + floor(distanciaFuga), 20, 20);
  text("Pontuação Total: " + pontuacaoTotal, 20, 60);

  // Verifica a condição de vitória
  if (distanciaFuga >= PONTUACAO_VITORIA) {
    estadoJogo = 'vitoria';
  }
}

function drawVitoria() {
  background(50, 200, 50); // Fundo verde

  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("VITÓRIA!", width / 2, height / 2 - 100);

  textSize(150);
  text("🏆", width / 2, height / 2 + 20);

  textSize(40);
  text("Pontuação Final: " + pontuacaoTotal, width / 2, height / 2 + 150);

  drawBotao("Voltar ao Menu", width / 2, height - 60, 250, 70, [50, 150, 50], 32);
}

function drawDerrota() {
  background(150, 50, 50); // Fundo vermelho

  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("DERROTA!", width / 2, height / 2 - 100);

  textSize(40);
  text("Sua pontuação: " + pontuacaoTotal, width / 2, height / 2 + 50);

  drawBotao("Voltar ao Menu", width / 2, height - 100, 250, 70, [50, 150, 50], 32);
}

function drawInstrucoes() {
  background(100, 180, 255);

  fill(255);
  textSize(50);
  textAlign(CENTER, TOP);
  text("Instruções", width / 2, 50);

  textSize(24);
  textAlign(LEFT, TOP);
  let instrucoesTexto = `
  Bem-vindo(a) à Colheita Feliz!

  Objetivo: Coletar o máximo de plantações possível e entregar na cidade!

  Controles:
  - Use as setas do teclado (↑ ← ↓ →) para mover o fazendeiro.
  - Na cidade, use as setas cima e baixo (↑ ↓) para desviar dos obstáculos com o caminhão.

  Jornada:
  - Comece a aventura coletando plantações no **Campo** e depois dirija o caminhão até a **Cidade**!

  Jogo no Campo:
  - Colete as plantações espalhadas pelo campo para aumentar sua pontuação.
  - Árvores são obstáculos: você não pode passar por elas.
  - O caminhão aparecerá quando você coletar ${floor(PORCENTAGEM_COLETA_CAMINHAO * 100)}% das plantações.
  - Encoste no caminhão para iniciar a viagem pela cidade.

  Jogo na Cidade:
  - Desvie dos carros para ir o mais longe possível.
  - **Atingir ${PONTUACAO_VITORIA} de distância** na cidade te dará a vitória!
  - Colidir com um obstáculo na cidade resultará em derrota.

  Divirta-se!
  `;
  text(instrucoesTexto, 50, 80, width - 100, height - 180);

  drawBotao("Voltar", width / 2, height - 80, 150, 60, [150, 50, 50], 28);
}

function drawCreditos() {
  background(50, 70, 90);

  fill(255);
  textSize(50);
  textAlign(CENTER, TOP);
  text("Créditos", width / 2, 50);

  textSize(30);
  textAlign(CENTER, TOP);
  text("Jogo desenvolvido por:", width / 2, 150);

  textSize(40);
  text("Samuel Haeussler Castilho", width / 2, 220);

  textSize(24);
  text("Agradecimentos especiais a:", width / 2, 300);
  text("- p5.js por facilitar o desenvolvimento", width / 2, 350);
  text("- OpenMoji e outras fontes de emojis livres", width / 2, 380);
  text("- Todos que jogaram e deram feedback!", width / 2, 410);

  drawBotao("Voltar", width / 2, height - 80, 150, 60, [150, 50, 50], 28);
}

function drawMensagemCampoCidade() {
  background(150, 200, 255);

  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);
  let mensagem = "Campo e Cidade: A força que alimenta o Brasil\n\n";
  mensagem += "O agronegócio é o motor que une o campo e a cidade. O produtor rural cultiva a terra, e a cidade, com sua tecnologia, comércio e serviços, dá o suporte necessário. Um depende do outro para crescer!\n\n";
  mensagem += "Celebrar essa conexão é reconhecer cada etapa que leva o alimento do solo à nossa mesa, fortalecendo a economia e a vida de milhões de brasileiros.";

  text(mensagem, 50, 50, width * 0.8, height * 0.6);

  drawBotao("Voltar ao Menu", width / 2, height - 100, 200, 60, [150, 50, 50], 28);
}


// =============================================================================
// Lógica de Jogo (Campo)
// =============================================================================

function moverJogador() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) jogador.x -= velocidadeJogador;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) jogador.x += velocidadeJogador;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) jogador.y -= velocidadeJogador;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) jogador.y += velocidadeJogador;

  jogador.x = constrain(jogador.x, 0, width);
  jogador.y = constrain(jogador.y, 0, height);
}

function checarColisaoJogadorArvores(oldX, oldY) {
  let jogadorRect = {
    x: jogador.x - jogador.largura / 2,
    y: jogador.y - jogador.altura / 2,
    largura: jogador.largura,
    altura: jogador.altura
  };

  for (let arvore of arvores) {
    let arvoreRect = {
      x: arvore.x - arvore.largura / 2,
      y: arvore.y - arvore.altura / 2,
      largura: arvore.largura,
      altura: arvore.altura
    };
    if (checarColisaoAABB(jogadorRect, arvoreRect)) {
      jogador.x = oldX;
      jogador.y = oldY;
      break;
    }
  }
}

function gerenciarPlantacoes() {
  for (let i = plantacoes.length - 1; i >= 0; i--) {
    let p = plantacoes[i];
    desenharEmoji(p.emoji, p.x, p.y, p.tamanho);

    let jogadorRect = {
      x: jogador.x - jogador.largura / 2,
      y: jogador.y - jogador.altura / 2,
      largura: jogador.largura,
      altura: jogador.altura
    };
    let plantacaoRect = {
      x: p.x - p.largura / 2,
      y: p.y - p.altura / 2,
      largura: p.largura,
      altura: p.altura
    };

    if (checarColisaoAABB(jogadorRect, plantacaoRect)) {
      pontuacaoFazenda += 25;
      p.destinoX = width - SACO_LARGURA / 2 - 20; // Posição central do saco
      p.destinoY = height - SACO_ALTURA / 2 - 20;
      p.velocidadeAnimacao = 15;
      plantacoesAnimando.push(p);
      plantacoes.splice(i, 1);
      break;
    }
  }

  // Animação de plantações voando para o saco
  for (let i = plantacoesAnimando.length - 1; i >= 0; i--) {
    let pAnimando = plantacoesAnimando[i];
    pAnimando.x = lerp(pAnimando.x, pAnimando.destinoX, pAnimando.velocidadeAnimacao * 0.01);
    pAnimando.y = lerp(pAnimando.y, pAnimando.destinoY, pAnimando.velocidadeAnimacao * 0.01);

    desenharEmoji(pAnimando.emoji, pAnimando.x, pAnimando.y, pAnimando.tamanho);

    if (dist(pAnimando.x, pAnimando.y, pAnimando.destinoX, pAnimando.destinoY) < 10) {
      plantacoesNoSaco.push(pAnimando);
      plantacoesAnimando.splice(i, 1);
    }
  }
}

function drawSacoColeta() {
  const sacoX = width - SACO_LARGURA - 20;
  const sacoY = height - SACO_ALTURA - 20;

  fill(SACO_COR[0], SACO_COR[1], SACO_COR[2]);
  rect(sacoX, sacoY, SACO_LARGURA, SACO_ALTURA, 10);
  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Saco de Coleta", sacoX + SACO_LARGURA / 2, sacoY + 10);

  let col = 0;
  let row = 0;
  const espacamentoEmoji = 30;
  const margemSacoX = 15;
  const margemSacoY = 40;

  for (let i = 0; i < plantacoesNoSaco.length; i++) {
    let p = plantacoesNoSaco[i];
    let emojiPosX = sacoX + margemSacoX + col * espacamentoEmoji;
    let emojiPosY = sacoY + margemSacoY + row * espacamentoEmoji;
    desenharEmoji(p.emoji, emojiPosX, emojiPosY, p.tamanho * 0.7);

    col++;
    if (emojiPosX + espacamentoEmoji > sacoX + SACO_LARGURA - margemSacoX - p.tamanho) {
      col = 0;
      row++;
    }
  }
}

function gerenciarCaminhaoCampo() {
  let porcentagemColetada = (plantacoesNoSaco.length / NUM_INICIAL_PLACOES);

  if (!todasPlantacoesColetadas && porcentagemColetada >= PORCENTAGEM_COLETA_CAMINHAO) {
    todasPlantacoesColetadas = true;
    estadoCaminhaoCampo = 'chegando';
  }

  if (estadoCaminhaoCampo === 'chegando') {
    caminhao.x = lerp(caminhao.x, width / 2, 0.03);
    if (abs(caminhao.x - width / 2) < 5) {
      caminhao.x = width / 2;
      estadoCaminhaoCampo = 'paradoCentro';
    }
  } else if (estadoCaminhaoCampo === 'saindo') {
    caminhao.x -= 15;
    // O jogador já está sendo animado para sair em drawJogo()
    if (caminhao.x < -caminhao.tamanho * 2) {
      estadoJogo = 'caminhaoFuga';
      reiniciarCenaFuga();
    }
  }

  if (estadoCaminhaoCampo !== 'paradoFora') { // Sempre desenha o caminhão se não estiver "fora"
    desenharEmoji(EMOJI_CAMINHAO, caminhao.x, caminhao.y, caminhao.tamanho);

    if (estadoCaminhaoCampo === 'paradoCentro') {
      fill(255);
      textSize(40);
      text("Plantações suficientes coletadas!", width / 2, height / 2 - 150);
      textSize(30);
      text("Encoste no caminhão para entregar!", width / 2, height / 2 + 150);

      let jogadorRect = {
        x: jogador.x - jogador.largura / 2,
        y: jogador.y - jogador.altura / 2,
        largura: jogador.largura,
        altura: jogador.altura
      };
      let caminhaoRect = {
        x: caminhao.x - caminhao.largura / 2,
        y: caminhao.y - caminhao.altura / 2,
        largura: caminhao.largura,
        altura: caminhao.altura
      };

      if (checarColisaoAABB(jogadorRect, caminhaoRect)) {
        estadoCaminhaoCampo = 'saindo';
      }
    }
  }
}


// =============================================================================
// Lógica de Jogo (Cidade - Fuga)
// =============================================================================

function acelerarCenaFuga() {
  velocidadeObstaculoAtual = min(velocidadeObstaculoAtual + ACELERACAO_FUGA, VELOCIDADE_MAXIMA_FUGA);
  caminhaoFugaVelocidadeAtual = min(caminhaoFugaVelocidadeAtual + ACELERACAO_FUGA, VELOCIDADE_MAXIMA_FUGA);
}

function moverDesenharPrediosFuga() {
  for (let i = cenaFugaPredios.length - 1; i >= 0; i--) {
    let p = cenaFugaPredios[i];
    p.x -= VELOCIDADE_PREDIOS_FUGA;
    desenharPredioFugaLateral(p);
    if (p.x + p.largura < 0) {
      cenaFugaPredios.splice(i, 1);
      novaPredioFuga(width);
    }
  }
}

function drawRuaFuga() {
  fill(30, 30, 30);
  rect(0, height * CAMINHAO_FUGA_Y_POS_PERCENTUAL, width, height * (1 - CAMINHAO_FUGA_Y_POS_PERCENTUAL));

  fill(255, 200, 0);
  let faixaLargura = 40;
  let faixaEspacamento = 80;
  let faixaY = height * CAMINHAO_FUGA_Y_POS_PERCENTUAL + (height * (1 - CAMINHAO_FUGA_Y_POS_PERCENTUAL)) / 2;

  for (let i = 0; i < width / (faixaLargura + faixaEspacamento) + 2; i++) {
    rect((distanciaFuga % (faixaLargura + faixaEspacamento)) - (faixaLargura + faixaEspacamento) + i * (faixaLargura + faixaEspacamento), faixaY - 5, faixaLargura, 10);
  }
}

function moverCaminhaoFuga() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) caminhaoFuga.y -= caminhaoFugaVelocidadeAtual * 0.5;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) caminhaoFuga.y += caminhaoFugaVelocidadeAtual * 0.5;

  caminhaoFuga.y = constrain(caminhaoFuga.y,
    height * CAMINHAO_FUGA_Y_POS_PERCENTUAL - CAMINHAO_FUGA_ALTURA / 2,
    height - CAMINHAO_FUGA_ALTURA / 2 - 10);
}

function gerarDesenharObstaculosFuga() {
  if (frameCount % 60 === 0) novaObstaculo();

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let o = obstaculos[i];
    o.x -= velocidadeObstaculoAtual;
    desenharEmoji(o.emoji, o.x, o.y, o.tamanho);

    // Colisão do caminhão de fuga com obstáculos
    let caminhaoFugaRect = {
      x: caminhaoFuga.x,
      y: caminhaoFuga.y,
      largura: caminhaoFuga.largura,
      altura: caminhaoFuga.altura
    };
    const obstaculoColisaoMargem = 0.3; // Reduz a caixa de colisão do emoji
    let obstaculoRect = {
      x: o.x - (o.largura * (1 - obstaculoColisaoMargem)) / 2,
      y: o.y - (o.altura * (1 - obstaculoColisaoMargem)) / 2,
      largura: o.largura * (1 - obstaculoColisaoMargem),
      altura: o.altura * (1 - obstaculoColisaoMargem)
    };

    if (checarColisaoAABB(caminhaoFugaRect, obstaculoRect)) {
      estadoJogo = 'derrota';
      return;
    }
    if (o.x < -o.tamanho) obstaculos.splice(i, 1);
  }
}


// =============================================================================
// Funções de Criação de Elementos (Geradores)
// =============================================================================

function novaPlantacao() {
  const tamanho = 30;
  const largura = tamanho;
  const altura = tamanho;
  const emoji = random(EMOJIS_PLANTACOES);
  const novaPlantacaoObj = gerarPosicaoElemento({
    tamanho,
    largura,
    altura,
    emoji
  });
  if (novaPlantacaoObj) {
    plantacoes.push(novaPlantacaoObj);
  }
}

function novaArvore() {
  const tamanho = 80;
  const largura = tamanho;
  const altura = tamanho;
  const emoji = random(EMOJIS_ARVORES);
  const novaArvoreObj = gerarPosicaoElemento({
    tamanho,
    largura,
    altura,
    emoji
  });
  if (novaArvoreObj) {
    arvores.push(novaArvoreObj);
  }
}

// Tenta gerar uma posição aleatória para um novo elemento sem sobreposição
function gerarPosicaoElemento(elemento) {
  let x, y, sobreposto;
  let tentativas = 0;
  const maxTentativas = 100;

  do {
    x = random(elemento.largura / 2, width - elemento.largura / 2);
    y = random(elemento.altura / 2, height - elemento.altura / 2);
    sobreposto = false;

    let elementoRect = {
      x: x - elemento.largura / 2,
      y: y - elemento.altura / 2,
      largura: elemento.largura,
      altura: elemento.altura
    };

    // Define as áreas que não podem ser sobrepostas
    const areasRestritas = [
      ...arvores,
      ...plantacoes,
      { x: jogador.x, y: jogador.y, largura: jogador.largura, altura: jogador.altura, isEmoji: true },
      { x: width - SACO_LARGURA - 20, y: height - SACO_ALTURA - 20, largura: SACO_LARGURA, altura: SACO_ALTURA },
      { x: width / 2, y: height / 2, largura: caminhao.largura, altura: caminhao.altura, isEmoji: true }
    ];

    for (let area of areasRestritas) {
      let areaRect;
      if (area.isEmoji) { // Ajuste para elementos que são emojis (desenhados pelo centro)
        areaRect = {
          x: area.x - area.largura / 2,
          y: area.y - area.altura / 2,
          largura: area.largura,
          altura: area.altura
        };
      } else { // Para retângulos padrão (desenhados pelo canto superior esquerdo)
        areaRect = {
          x: area.x,
          y: area.y,
          largura: area.largura,
          altura: area.altura
        };
      }

      if (checarColisaoAABB(elementoRect, areaRect)) {
        sobreposto = true;
        break;
      }
    }
    tentativas++;
    if (tentativas > maxTentativas) {
      console.warn("Não foi possível encontrar um lugar para o elemento após muitas tentativas.");
      return null;
    }
  } while (sobreposto);

  return {
    x: x,
    y: y,
    tamanho: elemento.tamanho,
    largura: elemento.largura,
    altura: elemento.altura,
    emoji: elemento.emoji
  };
}

// Cria um novo prédio para o cenário de menu
function novaPredioMenu(xPosInicial) {
  let predioAltura = random(height * 0.4, height * 0.7);
  let predioLargura = random(80, 150);
  menuPredios.push({
    x: xPosInicial || random(-predioLargura, -predioLargura - width / 2),
    y: height - predioAltura,
    largura: predioLargura,
    altura: predioAltura,
    cor: [random(60, 120), random(60, 120), random(60, 120)]
  });
}

// Cria uma nova montanha para o cenário de menu
function novaMontanhaMenu(xPosInicial) {
  let montanhaAltura = random(height * 0.2, height * 0.4);
  let montanhaLargura = random(width * 0.3, width * 0.5);
  let corBase = random(80, 120);
  menuMontanhas.push({
    x: xPosInicial || random(-montanhaLargura, -montanhaLargura - width / 2),
    y: height - montanhaAltura - (height * 0.3),
    largura: montanhaLargura,
    altura: montanhaAltura,
    cor: [corBase + random(-10, 10), corBase + random(-10, 10) + 20, corBase + random(-10, 10)]
  });
}

// Cria uma nova nuvem para o cenário de menu
function novaNuvemMenu(xPosInicial) {
  let nuvemTamanho = random(60, 150);
  menuNuvens.push({
    x: xPosInicial || random(-nuvemTamanho, -nuvemTamanho - width / 2),
    y: random(height * 0.1, height * 0.4),
    tamanho: nuvemTamanho,
    cor: [255, 255, 255, random(150, 220)]
  });
}

// Cria uma nova partícula de fumaça para a animação do caminhão
function novaParticulaFumaca(x, y) {
  return {
    x: x,
    y: y,
    tamanho: random(25, 50),
    velocidadeX: random(0.5, 2),
    velocidadeY: random(-2, -5),
    alfa: 255,
    cor: [128, 128, 128]
  };
}

// Cria um novo obstáculo para a cena de fuga
function novaObstaculo() {
  const tamanho = random(70, 100);
  const largura = tamanho;
  const altura = tamanho;
  const emoji = random(EMOJIS_OBSTACULOS_FUGA);

  let x = width + largura + random(50, 200); // Começa fora da tela à direita
  let y = random(height * CAMINHAO_FUGA_Y_POS_PERCENTUAL + altura / 2, height - altura / 2 - 10);

  let novaObstaculoRect = {
    x: x - largura / 2,
    y: y - altura / 2,
    largura: largura,
    altura: altura
  };

  let sobreposto = false;
  for (let o of obstaculos) {
    let oRect = {
      x: o.x - o.largura / 2,
      y: o.y - o.altura / 2,
      largura: o.largura,
      altura: o.altura
    };
    // Verifica sobreposição com margem para evitar obstáculos muito próximos
    if (checarColisaoAABB(novaObstaculoRect, oRect) && abs(novaObstaculoRect.x - oRect.x) < novaObstaculoRect.largura + 100) {
      sobreposto = true;
      break;
    }
  }
  if (!sobreposto) {
    obstaculos.push({
      x: x,
      y: y,
      tamanho: tamanho,
      largura: largura,
      altura: altura,
      emoji: emoji
    });
  }
}

// Cria um novo prédio para o cenário da cena de fuga
function novaPredioFuga(xPos) {
  let predioAltura = random(height * 0.4, height * 0.7);
  let predioLargura = random(80, 180);
  cenaFugaPredios.push({
    x: xPos,
    y: height - predioAltura - 10,
    largura: predioLargura,
    altura: predioAltura,
    cor: [random(80, 150), random(80, 150), random(80, 150)],
    tipoJanela: floor(random(3)) // Tipo de padrão de janela
  });
}


// =============================================================================
// Funções de Desenho Auxiliares
// =============================================================================

// Desenha um emoji na tela, centralizado nas coordenadas (x, y)
function desenharEmoji(emoji, x, y, tamanho) {
  textSize(tamanho);
  textAlign(CENTER, CENTER);
  fill(255);
  text(emoji, x, y);
}

// Desenha um botão retangular com texto centralizado
function drawBotao(texto, x, y, largura, altura, cor, tamanhoFonte) {
  fill(cor[0], cor[1], cor[2], cor[3] || 255);
  rectMode(CENTER);
  rect(x, y, largura, altura, 10);
  fill(255);
  textSize(tamanhoFonte);
  textAlign(CENTER, CENTER);
  text(texto, x, y + 5);
  rectMode(CORNER);
}

// Desenha uma nuvem circular
function desenharNuvem(n) {
  fill(n.cor[0], n.cor[1], n.cor[2], n.cor[3]);
  ellipse(n.x, n.y, n.tamanho, n.tamanho * 0.7);
  ellipse(n.x + n.tamanho * 0.3, n.y - n.tamanho * 0.2, n.tamanho * 0.6, n.tamanho * 0.5);
  ellipse(n.x - n.tamanho * 0.3, n.y - n.tamanho * 0.1, n.tamanho * 0.5, n.tamanho * 0.4);
}

// Desenha uma montanha triangular
function desenharMontanha(m) {
  fill(m.cor[0], m.cor[1], m.cor[2]);
  triangle(m.x, m.y + m.altura, m.x + m.largura / 2, m.y, m.x + m.largura, m.y + m.altura);
}

// Desenha um prédio no menu com janelas
function desenharPredioMenu(p) {
  fill(p.cor[0], p.cor[1], p.cor[2]);
  rect(p.x, p.y, p.largura, p.altura);
  fill(200, 200, 0, 150);
  const janelaLargura = p.largura * 0.2;
  const janelaAltura = p.altura * 0.08;
  const espacoJanela = p.largura * 0.1;
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 2; k++) {
      rect(p.x + espacoJanela + k * (janelaLargura + espacoJanela),
        p.y + espacoJanela + j * (janelaAltura + espacoJanela * 2),
        janelaLargura, janelaAltura);
    }
  }
}

// Desenha as faixas amarelas da rua no menu
function drawFaixasRuaMenu(chaoX) {
  fill(255, 200, 0);
  let faixaLargura = 40;
  let faixaEspacamento = 80;
  let faixaY = height * 0.85;

  for (let i = 0; i < width / (faixaLargura + faixaEspacamento) + 2; i++) {
    rect((chaoX % (faixaLargura + faixaEspacamento)) - (faixaLargura + faixaEspacamento) + i * (faixaLargura + faixaEspacamento), faixaY - 5, faixaLargura, 10);
  }
}

// Anima o caminhão no menu (movimento vertical suave)
function animarCaminhaoMenu(x, y) {
  caminhaoMenuOffsetY += caminhaoMenuDir * 0.5;
  if (caminhaoMenuOffsetY > 5 || caminhaoMenuOffsetY < -5) {
    caminhaoMenuDir *= -1;
  }
  desenharEmoji(EMOJI_CAMINHAO, x, y, CAMINHAO_CAMPO_TAMANHO * 1.5);
}

// Gera e desenha partículas de fumaça para o caminhão no menu
function gerarDesenharFumacaCaminhaoMenu(x, y) {
  if (frameCount % 5 === 0) {
    smokeParticles.push(novaParticulaFumaca(x, y));
  }
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    let p = smokeParticles[i];
    p.x += p.velocidadeX;
    p.y += p.velocidadeY;
    p.alfa -= 3;
    p.tamanho *= 0.98;

    fill(p.cor[0], p.cor[1], p.cor[2], p.alfa);
    noStroke();
    ellipse(p.x, p.y, p.tamanho);

    if (p.alfa <= 0 || p.tamanho <= 1) {
      smokeParticles.splice(i, 1);
    }
  }
}

// Desenha um prédio na cena de fuga (vista lateral) com diferentes padrões de janela
function desenharPredioFugaLateral(p) {
  fill(p.cor[0], p.cor[1], p.cor[2]);
  rect(p.x, p.y, p.largura, p.altura);

  fill(200, 200, 0, 180);
  let janelaLargura, janelaAltura, espacoHorizontal, espacoVertical;

  switch (p.tipoJanela) {
    case 0: // Janelas simples em colunas
      janelaLargura = p.largura * 0.2;
      janelaAltura = p.altura * 0.08;
      espacoHorizontal = p.largura * 0.15;
      espacoVertical = p.altura * 0.08;
      for (let j = 0; j < floor(p.altura / (janelaAltura + espacoVertical * 1.5)); j++) {
        rect(p.x + espacoHorizontal, p.y + espacoVertical + j * (janelaAltura + espacoVertical), janelaLargura, janelaAltura);
        if (p.largura > janelaLargura * 2 + espacoHorizontal * 2) {
          rect(p.x + p.largura - espacoHorizontal - janelaLargura, p.y + espacoVertical + j * (janelaAltura + espacoVertical), janelaLargura, janelaAltura);
        }
      }
      break;
    case 1: // Janelas em linhas e colunas (mais denso)
      janelaLargura = p.largura * 0.2;
      janelaAltura = p.altura * 0.08;
      espacoHorizontal = p.largura * 0.15;
      espacoVertical = p.altura * 0.08;
      let numCols = floor(p.largura / (janelaLargura + espacoHorizontal));
      let numRows = floor(p.altura / (janelaAltura + espacoVertical));
      if (numCols < 2) numCols = 2;
      if (numRows < 2) numRows = 2;

      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          rect(p.x + espacoHorizontal / 2 + c * (janelaLargura + espacoHorizontal),
            p.y + espacoVertical / 2 + r * (janelaAltura + espacoVertical),
            janelaLargura, janelaAltura);
        }
      }
      break;
    case 2: // Janelas maiores, menos numerosas
      janelaLargura = p.largura * 0.4;
      janelaAltura = p.altura * 0.15;
      espacoVertical = p.altura * 0.08;
      for (let j = 0; j < floor(p.altura / (janelaAltura + espacoVertical * 2)); j++) {
        rect(p.x + (p.largura - janelaLargura) / 2, p.y + espacoVertical * 2 + j * (janelaAltura + espacoVertical * 2), janelaLargura, janelaAltura);
      }
      break;
  }
}

// Move e redesenha elementos de fundo do menu, recriando-os se saírem da tela
function moverDesenharElementosFundoMenu(elementosArray, velocidade, novaFuncao, desenhaFuncao) {
  for (let i = elementosArray.length - 1; i >= 0; i--) {
    let el = elementosArray[i];
    el.x += velocidade;
    desenhaFuncao(el);
    if (el.x > width + (el.tamanho || el.largura)) { // Usa tamanho ou largura para verificar se saiu da tela
      elementosArray.splice(i, 1);
      // Passa a posição x para a nova função para que ele apareça do lado esquerdo da tela
      // Assumindo que novaFuncao aceita um argumento para a posição inicial X.
      // Se a nova função não aceita, você pode precisar ajustar a lógica dela ou a forma como ela é chamada.
      novaFuncao(-(el.tamanho || el.largura)); 
    }
  }
}


// =============================================================================
// Funções de Interação (Mouse/Teclado)
// =============================================================================

function mousePressed() {
  // Lógica para os botões do menu principal
  if (estadoJogo === 'menu') {
    let yInicialBotoes = height / 2 + 30;

    if (isMouseOverButton(width / 2, yInicialBotoes, 250, 70)) {
      estadoJogo = 'jogando';
      reiniciarJogoCompleto();
      for (let i = 0; i < NUM_ARVORES; i++) novaArvore();
      for (let i = 0; i < NUM_INICIAL_PLACOES; i++) novaPlantacao();
      estadoCaminhaoCampo = 'paradoFora';
      return;
    }
    if (isMouseOverButton(width / 2, yInicialBotoes + 90, 250, 70)) {
      estadoJogo = 'mensagemCampoCidade';
      return;
    }
    if (isMouseOverButton(width / 2, yInicialBotoes + 180, 250, 70)) {
      estadoJogo = 'instrucoes';
      return;
    }
    if (isMouseOverButton(width / 2, yInicialBotoes + 270, 250, 70)) {
      estadoJogo = 'creditos';
      return;
    }
  }
  // Lógica para o botão "Voltar" em telas de informação/fim de jogo
  else if (estadoJogo === 'mensagemCampoCidade' || estadoJogo === 'instrucoes' || estadoJogo === 'vitoria' || estadoJogo === 'derrota' || estadoJogo === 'creditos') {
    let botaoX, botaoY, botaoLargura, botaoAltura;

    switch (estadoJogo) {
      case 'mensagemCampoCidade':
        [botaoX, botaoY, botaoLargura, botaoAltura] = [width / 2, height - 100, 200, 60];
        break;
      case 'instrucoes':
      case 'creditos':
        [botaoX, botaoY, botaoLargura, botaoAltura] = [width / 2, height - 80, 150, 60];
        break;
      case 'vitoria':
        [botaoX, botaoY, botaoLargura, botaoAltura] = [width / 2, height - 60, 250, 70];
        break;
      case 'derrota':
        [botaoX, botaoY, botaoLargura, botaoAltura] = [width / 2, height - 100, 250, 70];
        break;
    }

    if (isMouseOverButton(botaoX, botaoY, botaoLargura, botaoAltura)) {
      estadoJogo = 'menu';
      reiniciarJogoCompleto();
    }
  }
}


// =============================================================================
// Funções de Utilitários
// =============================================================================

// Checa colisão entre dois retângulos (Axis-Aligned Bounding Box)
function checarColisaoAABB(rect1, rect2) {
  return rect1.x < rect2.x + rect2.largura &&
    rect1.x + rect1.largura > rect2.x &&
    rect1.y < rect2.y + rect2.altura &&
    rect1.y + rect1.altura > rect2.y;
}

// Verifica se o mouse está sobre uma área de botão
function isMouseOverButton(centerX, centerY, largura, altura) {
  return mouseX > centerX - largura / 2 && mouseX < centerX + largura / 2 &&
    mouseY > centerY - altura / 2 && mouseY < centerY + altura / 2;
}

// Função chamada quando a janela do navegador é redimensionada
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Reajusta posições de elementos fixos ou dependentes do tamanho da tela
  const sacoX = width - SACO_LARGURA - 20;
  const sacoY = height - SACO_ALTURA - 20;

  if (estadoCaminhaoCampo === 'paradoFora') {
    caminhao.x = width + caminhao.tamanho * 2;
  } else if (estadoCaminhaoCampo === 'paradoCentro' || estadoCaminhaoCampo === 'chegando') {
    caminhao.x = width / 2;
  }
  caminhaoFuga.y = height * CAMINHAO_FUGA_Y_POS_PERCENTUAL - CAMINHAO_FUGA_ALTURA / 2;

  // Re-inicializa elementos de fundo do menu para se adaptarem ao novo tamanho
  if (estadoJogo === 'menu') {
    menuPredios = [];
    menuMontanhas = [];
    menuNuvens = [];
    inicializarElementosMenu();
    smokeParticles = [];
  }
}