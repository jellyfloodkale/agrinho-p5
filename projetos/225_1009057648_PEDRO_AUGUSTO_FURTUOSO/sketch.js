// --- DADOS E CONFIGURAÇÕES GLOBAIS ---

// Banco de dados com as informações de cada cultura.
const CROPS = {
  morango: { nome: 'Morango 🍓', custo: 15, tempoCrescimento: 4, rendimentoBase: 10, valor: 4, cor: '#E91E63' },
  alface: { nome: 'Alface 🥬', custo: 10, tempoCrescimento: 3, rendimentoBase: 15, valor: 2, cor: '#8BC34A' },
  tomate: { nome: 'Tomate 🍅', custo: 20, tempoCrescimento: 5, rendimentoBase: 20, valor: 3, cor: '#F44336' },
  maca: { nome: 'Maçã 🍎', custo: 30, tempoCrescimento: 8, rendimentoBase: 25, valor: 5, cor: '#FFC107' },
};

// Paleta de cores centralizada para a interface.
const COLORS = {
  background: '#F1F8E9',
  text: '#3E2723',
  primary: '#4CAF50',
  secondary: '#FF9800',
  accent: '#03A9F4',
  emptyPlot: '#D7CCC8',
  growingPlot: '#A5D6A7',
  readyPlot: '#FFF59D',
  modalBg: 'rgba(0, 0, 0, 0.7)',
  white: '#FFFFFF',
};

// --- VARIÁVEIS DE ESTADO ---

let gameState; // **FUNDAMENTAL**: Armazena TODO o estado atual do jogo (dinheiro, dia, lotes, etc.).
let uiAreas;   // Guarda as coordenadas e dimensões dos painéis da UI.
const TITLE_BAR_HEIGHT = 40;


/**
 * Roda UMA VEZ no início para configurar o canvas e o layout.
 */
function setup() {
  createCanvas(1200, 750);
  textFont('Segoe UI');
  // Define as áreas para cada painel da interface.
  uiAreas = {
    header: { x: 10, y: 10, w: width - 20, h: 60 },
    farm: { x: 10, y: 80, w: 780, h: 350 },
    warehouse: { x: 10, y: 440, w: 780, h: 300 },
    actions: { x: 800, y: 80, w: 390, h: 350 }, 
    log: { x: 800, y: 440, w: 390, h: 300 },
  };
  initializeGame();
}

/**
 * Reseta o jogo para o estado inicial, definindo todos os valores padrão.
 */
function initializeGame() {
  gameState = {
    telaAtual: 'jogando', // Controla qual tela é exibida: 'jogando' ou 'telaFinal'.
    dia: 1,
    diaDoFestival: 40,
    dinheiro: 200,
    lotes: [],
    armazem: { morango: 0, alface: 0, tomate: 0, maca: 0 },
    log: ['Bem-vindo! O Festival da Colheita é em 40 dias.'],
    culturaSelecionada: null, // Guarda a cultura que o jogador pretende plantar.
    modal: { ativo: false, titulo: '', texto: '', botoes: [] },
    confetes: [], 
  };

  // Cria e posiciona os 6 lotes de terra na área da fazenda.
  const numLotes = 6;
  const espaco = 20;
  const plotAreaH = uiAreas.farm.h - TITLE_BAR_HEIGHT;
  const loteW = (uiAreas.farm.w - (espaco * 4)) / 3;
  const loteH = (plotAreaH - (espaco * 3)) / 2;
  for (let i = 0; i < numLotes; i++) {
    const col = i % 3;
    const row = floor(i / 3);
    gameState.lotes.push({
      status: 'vazio', cultura: null, diasRestantes: 0, tempoTotal: 0,
      x: uiAreas.farm.x + espaco + col * (loteW + espaco),
      y: uiAreas.farm.y + TITLE_BAR_HEIGHT + espaco + row * (loteH + espaco),
      w: loteW, h: loteH,
    });
  }
}

/**
 * Loop principal de desenho (60x/s). Funciona como um gerenciador de telas.
 */
function draw() {
  if (gameState.telaAtual === 'jogando') {
    background(COLORS.background);
    drawHeader();
    drawFarmPlots();
    drawWarehouse();
    drawActions();
    drawLog();
    if (gameState.modal.ativo) {
      drawModal(); // Desenha o pop-up por cima de tudo.
    }
  } else if (gameState.telaAtual === 'telaFinal') {
    drawTelaFinal();
  }
}

/**
 * Desenha a tela de fim de jogo com pontuação e animação.
 */
function drawTelaFinal() {
  background(COLORS.primary);

  // Animação de confetes
  for (const confete of gameState.confetes) {
    confete.y += confete.vy;
    confete.x += confete.vx;
    fill(confete.color);
    noStroke();
    rect(confete.x, confete.y, confete.w, confete.h);

    if (confete.y > height) {
      confete.y = random(-100, -10);
      confete.x = random(width);
    }
  }

  // Caixa de diálogo final
  fill(COLORS.modalBg);
  rect(width / 2 - 300, height / 2 - 150, 600, 300, 20);

  fill(COLORS.white);
  textAlign(CENTER, CENTER);
  
  textSize(48);
  text("Festival foi um Sucesso!", width / 2, height / 2 - 90);
  
  textSize(22);
  text("Graças ao seu trabalho e dedicação,\na cidade e o campo celebraram juntos!\n\nObrigado por jogar!", width / 2, height / 2 - 15);
  
  textSize(26);
  text(`Sua cooperativa arrecadou: R$ ${gameState.dinheiro}`, width / 2, height / 2 + 60);
  
  // Botão para jogar novamente
  uiAreas.telaFinal = {
    jogarNovamenteBtn: { x: width / 2 - 125, y: height / 2 + 110, w: 250, h: 50 }
  };
  drawButton("Jogar Novamente", uiAreas.telaFinal.jogarNovamenteBtn, true);
}

/**
 * Desenha o cabeçalho com Dia e Dinheiro.
 */
function drawHeader() {
  const area = uiAreas.header;
  fill(COLORS.text);
  textSize(28);
  textAlign(CENTER, CENTER);
  text('Festival da Colheita: A Cooperativa', area.x + area.w / 2, area.y + 20);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(`Dia: ${gameState.dia} / ${gameState.diaDoFestival}`, area.x + 20, area.y + 45);
  textAlign(RIGHT, CENTER);
  text(`Dinheiro: R$ ${gameState.dinheiro}`, area.x + area.w - 20, area.y + 45);
}

/**
 * Desenha os lotes de terra, mudando a aparência com base no seu status (vazio, crescendo, pronto).
 */
function drawFarmPlots() {
  const area = uiAreas.farm;
  drawSectionTitle('Nossas Áreas Agrícolas', area);
  gameState.lotes.forEach(lote => {
    let corBorda = COLORS.emptyPlot;
    let corFundo = '#EFEBE9';
    if (lote.status === 'crescendo') {
      corBorda = corFundo = COLORS.growingPlot;
    } else if (lote.status === 'pronto') {
      corBorda = corFundo = COLORS.readyPlot;
    }
    stroke(corBorda);
    strokeWeight(isMouseInRect(lote.x, lote.y, lote.w, lote.h) ? 4 : 2);
    fill(corFundo);
    rect(lote.x, lote.y, lote.w, lote.h, 10);
    noStroke();
    fill(COLORS.text);
    textAlign(CENTER, CENTER);
    if (lote.status === 'vazio') {
      textSize(20);
      text('Vazio', lote.x + lote.w / 2, lote.y + lote.h / 2);
      if (gameState.culturaSelecionada) {
        textSize(14);
        text('Clique para plantar', lote.x + lote.w / 2, lote.y + lote.h / 2 + 25);
      }
    } else {
      const cultura = CROPS[lote.cultura];
      textSize(24);
      text(cultura.nome, lote.x + lote.w / 2, lote.y + lote.h / 2 - 20);
      textSize(16);
      if (lote.status === 'crescendo') {
        text(`${lote.diasRestantes} dias restantes`, lote.x + lote.w / 2, lote.y + lote.h / 2 + 10);
        const progresso = (lote.tempoTotal - lote.diasRestantes) / lote.tempoTotal;
        fill(cultura.cor);
        rect(lote.x + 10, lote.y + lote.h - 25, (lote.w - 20) * progresso, 15, 5);
      } else {
        text('Pronto para Colher!', lote.x + lote.w / 2, lote.y + lote.h / 2 + 20);
      }
    }
  });
}

/**
 * Mostra os itens no armazém e o botão de entrega.
 */
function drawWarehouse() {
  const area = uiAreas.warehouse;
  drawSectionTitle('Armazém', area);
  textAlign(LEFT, TOP);
  textSize(20);
  let yPos = area.y + TITLE_BAR_HEIGHT + 15;
  for (const culturaId in gameState.armazem) {
    const quantidade = gameState.armazem[culturaId];
    if (quantidade > 0) {
      fill(CROPS[culturaId].cor);
      text(`${CROPS[culturaId].nome}:`, area.x + 20, yPos);
      fill(COLORS.text);
      textAlign(RIGHT, TOP);
      text(quantidade, area.x + 200, yPos);
      textAlign(LEFT, TOP);
      yPos += 30;
    }
  }
  const totalItens = Object.values(gameState.armazem).reduce((a, b) => a + b, 0);
  uiAreas.warehouse.deliverButton = {
    x: area.x + 20,
    y: area.y + area.h - 70,
    w: area.w - 40,
    h: 50,
  };
  drawButton("Fazer Entrega para a Cidade", uiAreas.warehouse.deliverButton, totalItens > 0);
}

/**
 * Desenha os botões de plantar e de avançar o dia.
 */
function drawActions() {
  const area = uiAreas.actions;
  drawSectionTitle('Ações', area);
  let yPos = area.y + TITLE_BAR_HEIGHT + 15;
  uiAreas.actions.plantButtons = [];
  for (const culturaId in CROPS) {
    const cultura = CROPS[culturaId];
    const btn = { x: area.x + 20, y: yPos, w: area.w - 40, h: 55 };
    const podePagar = gameState.dinheiro >= cultura.custo;
    uiAreas.actions.plantButtons.push({ ...btn, id: culturaId });
    let cor = gameState.culturaSelecionada === culturaId ? COLORS.secondary : COLORS.accent;
    fill(podePagar ? cor : '#9E9E9E');
    noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, 8);
    fill(COLORS.white);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(cultura.nome, btn.x + btn.w / 2, btn.y + btn.h / 2 - 10);
    textSize(12);
    text(`Custo: R$${cultura.custo} | Tempo: ${cultura.tempoCrescimento} dias`, btn.x + btn.w / 2, btn.y + btn.h / 2 + 12);
    yPos += 65;
  }
  const margin = 10;
  uiAreas.actions.nextDayButton = {
    x: area.x + 20,
    y: yPos + margin,
    w: area.w - 40,
    h: 50,
  };
  drawButton("Avançar para o Próximo Dia", uiAreas.actions.nextDayButton, true);
}

/**
 * Exibe o histórico de atividades para o jogador.
 */
function drawLog() {
  const area = uiAreas.log;
  drawSectionTitle('Registro de Atividades', area);
  textAlign(LEFT, TOP);
  textSize(14);
  let yPos = area.y + TITLE_BAR_HEIGHT + 15;
  for (let i = 0; i < gameState.log.length && yPos < area.y + area.h - 10; i++) {
    const msg = gameState.log[i];
    fill(i === 0 ? COLORS.text : '#757575');
    text(msg, area.x + 20, yPos, area.w - 40);
    yPos += textAscent() + textDescent() + 10;
  }
}

/**
 * Desenha uma janela pop-up que pausa o jogo para uma decisão.
 */
function drawModal() {
  fill(COLORS.modalBg);
  noStroke();
  rect(0, 0, width, height);
  const w = 500;
  const h = 300;
  const x = (width - w) / 2;
  const y = (height - h) / 2;
  fill(COLORS.white);
  rect(x, y, w, h, 15);
  fill(COLORS.text);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(gameState.modal.titulo, x + w / 2, y + 40);
  textSize(16);
  text(gameState.modal.texto, x + 20, y + 60, w - 40, 150);
  const numBotoes = gameState.modal.botoes.length;
  const btnW = 180;
  const btnH = 50;
  const totalW = numBotoes * btnW + (numBotoes - 1) * 10;
  let startX = x + (w - totalW) / 2;
  gameState.modal.botoes.forEach((btn, i) => {
    btn.area = {
      x: startX + i * (btnW + 10),
      y: y + h - 70,
      w: btnW,
      h: btnH
    };
    drawButton(btn.label, btn.area, true);
  });
}

/**
 * Avança um dia, atualiza o crescimento das plantas e pode disparar eventos aleatórios.
 */
function passarDia() {
  if (gameState.dia >= gameState.diaDoFestival) return;
  gameState.dia++;
  gameState.lotes.forEach(lote => {
    if (lote.status === 'crescendo') {
      lote.diasRestantes--;
      if (lote.diasRestantes <= 0) {
        lote.status = 'pronto';
        adicionarLog(`Sua plantação de ${CROPS[lote.cultura].nome} está pronta!`);
      }
    }
  });
  if (Math.random() < 0.25) { // 25% de chance de um evento aleatório.
      acionarEventoAleatorio();
  } else {
      adicionarLog(`Um dia tranquilo no campo.`);
  }
  verificarFimDeJogo();
}

/**
 * Planta a cultura selecionada em um lote, gastando dinheiro.
 */
function plantar(loteIndex) {
  const culturaId = gameState.culturaSelecionada;
  const cultura = CROPS[culturaId];
  if (gameState.dinheiro >= cultura.custo) {
    gameState.dinheiro -= cultura.custo;
    const lote = gameState.lotes[loteIndex];
    lote.status = 'crescendo';
    lote.cultura = culturaId;
    lote.diasRestantes = cultura.tempoCrescimento;
    lote.tempoTotal = cultura.tempoCrescimento;
    adicionarLog(`Você plantou ${cultura.nome} no lote ${loteIndex + 1}.`);
    gameState.culturaSelecionada = null;
  } else {
    adicionarLog(`Dinheiro insuficiente para plantar ${cultura.nome}.`);
  }
}

/**
 * Colhe uma cultura pronta, movendo o rendimento para o armazém.
 */
function colher(loteIndex) {
  const lote = gameState.lotes[loteIndex];
  const cultura = CROPS[lote.cultura];
  const rendimento = floor(cultura.rendimentoBase * (random(0.8, 1.2)));
  gameState.armazem[lote.cultura] += rendimento;
  lote.status = 'vazio';
  lote.cultura = null;
  adicionarLog(`Você colheu ${rendimento} de ${cultura.nome} do lote ${loteIndex + 1}.`);
}

/**
 * Inicia a venda, que avança um dia e pode ter um obstáculo.
 */
function iniciarEntrega() {
  const totalItens = Object.values(gameState.armazem).reduce((a, b) => a + b, 0);
  if (totalItens === 0) {
    adicionarLog('Seu armazém está vazio.');
    return;
  }
  passarDia();
  if (random() < 0.4) {
    mostrarModalObstaculo();
  } else {
    entregaBemSucedida();
  }
}

/**
 * Vende os itens do armazém e adiciona o valor ao dinheiro.
 */
function entregaBemSucedida() {
  let valorTotal = 0;
  for (const culturaId in gameState.armazem) {
    valorTotal += gameState.armazem[culturaId] * CROPS[culturaId].valor;
    gameState.armazem[culturaId] = 0; // Esvazia o armazém
  }
  gameState.dinheiro += valorTotal;
  adicionarLog(`Entrega realizada com sucesso! Você ganhou R$ ${valorTotal}.`);
}

/**
 * Sorteia e aplica um evento (clima, mercado, etc.) que altera o jogo.
 */
function acionarEventoAleatorio() {
    const eventos = [
        { tipo: 'clima', desc: "Chuva forte! O tempo de crescimento de todas as culturas diminuiu em 1 dia.", efeito: () => gameState.lotes.forEach(lote => { if(lote.status === 'crescendo' && lote.diasRestantes > 1) lote.diasRestantes-- }) },
        { tipo: 'mercado', desc: "Pedido especial! A cidade está pagando o dobro por Tomates 🍅 na próxima entrega!", efeito: () => { CROPS.tomate.valor *= 2; adicionarLog("O preço do tomate dobrou temporariamente!"); setTimeout(() => { CROPS.tomate.valor /= 2; adicionarLog('A demanda por tomates voltou ao normal.'); }, 5000); }},
        { tipo: 'crise', desc: "Falta de mão de obra! O dia de hoje foi perdido reorganizando os trabalhadores.", efeito: () => { adicionarLog("Nenhum crescimento hoje devido à falta de mão de obra."); }}
    ];
    const evento = random(eventos);
    adicionarLog(`EVENTO: ${evento.desc}`);
    evento.efeito();
}

/**
 * Verifica se a condição de fim de jogo foi atingida (chegou ao dia do festival).
 */
function verificarFimDeJogo() {
  if (gameState.dia >= gameState.diaDoFestival && gameState.telaAtual !== 'telaFinal') {
    gameState.telaAtual = 'telaFinal';
    criarConfetes();
  }
}

/**
 * Gerencia TODAS as interações de clique do mouse.
 * Identifica em qual elemento da UI o jogador clicou e chama a função correspondente.
 */
function mousePressed() {
  // A lógica de clique depende do contexto (tela atual, modal ativo, etc.).
  if (gameState.telaAtual === 'telaFinal') {
    const btn = uiAreas.telaFinal.jogarNovamenteBtn;
    if (isMouseInRect(btn.x, btn.y, btn.w, btn.h)) {
      initializeGame(); // Reseta o jogo.
    }
    return;
  }

  // Se o modal está ativo, apenas os cliques nos botões dele são válidos.
  if (gameState.modal.ativo) {
    gameState.modal.botoes.forEach(btn => {
      if (isMouseInRect(btn.area.x, btn.area.y, btn.area.w, btn.area.h)) {
        btn.acao();
      }
    });
    return;
  }

  // Lógica de clique na tela principal do jogo.
  gameState.lotes.forEach((lote, index) => {
    if (isMouseInRect(lote.x, lote.y, lote.w, lote.h)) {
      if (lote.status === 'vazio' && gameState.culturaSelecionada) {
        plantar(index);
      } else if (lote.status === 'pronto') {
        colher(index);
      }
    }
  });

  uiAreas.actions.plantButtons.forEach(btn => {
    if (isMouseInRect(btn.x, btn.y, btn.w, btn.h)) {
       const podePagar = gameState.dinheiro >= CROPS[btn.id].custo;
       if (podePagar) {
         gameState.culturaSelecionada = btn.id;
         adicionarLog(`Selecionado: ${CROPS[btn.id].nome}. Clique em um lote vazio.`);
       } else {
         adicionarLog(`Dinheiro insuficiente para ${CROPS[btn.id].nome}.`)
       }
    }
  });
  
  const btnDia = uiAreas.actions.nextDayButton;
  if (isMouseInRect(btnDia.x, btnDia.y, btnDia.w, btnDia.h)) {
    passarDia();
  }

  const btnEntrega = uiAreas.warehouse.deliverButton;
  const totalItens = Object.values(gameState.armazem).reduce((a, b) => a + b, 0);
  if (totalItens > 0 && isMouseInRect(btnEntrega.x, btnEntrega.y, btnEntrega.w, btnEntrega.h)) {
    iniciarEntrega();
  }
}

// --- FUNÇÕES AUXILIARES / UTILITÁRIAS ---

// Prepara a animação de confetes para a tela final.
function criarConfetes() {
  gameState.confetes = [];
  const coresFestivas = Object.values(CROPS).map(c => c.cor);
  for (let i = 0; i < 200; i++) {
    gameState.confetes.push({
      x: random(width), y: random(-height, 0),
      w: random(5, 15), h: random(10, 20),
      color: random(coresFestivas),
      vy: random(2, 5), vx: random(-1, 1),
    });
  }
}

// Adiciona uma nova mensagem ao topo do log.
function adicionarLog(mensagem) {
  gameState.log.unshift(`Dia ${gameState.dia}: ${mensagem}`);
  if (gameState.log.length > 20) {
    gameState.log.pop();
  }
}

// Verifica se o mouse está sobre uma área retangular.
function isMouseInRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

// Desenha um título padronizado para um painel.
function drawSectionTitle(titulo, area) {
  fill(COLORS.primary);
  noStroke();
  rect(area.x, area.y, area.w, TITLE_BAR_HEIGHT, 8, 8, 0, 0);
  fill(COLORS.white);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(titulo, area.x + 15, area.y + TITLE_BAR_HEIGHT / 2);
}

// Desenha um botão padrão, com estado ativo/inativo e efeito de hover.
function drawButton(label, area, enabled) {
  let cor = enabled ? COLORS.primary : '#BDBDBD';
  if (isMouseInRect(area.x, area.y, area.w, area.h) && enabled) {
    cor = '#388E3C'; // Cor de hover
  }
  fill(cor);
  noStroke();
  rect(area.x, area.y, area.w, area.h, 8);
  fill(COLORS.white);
  textAlign(CENTER, CENTER);
  textSize(18);
  text(label, area.x + area.w / 2, area.y + area.h / 2);
}

// Fecha o modal.
function closeModal() {
    gameState.modal.ativo = false;
}

// Configura e exibe o pop-up de decisão do obstáculo.
function mostrarModalObstaculo() {
  const custoReparo = floor(gameState.dinheiro * 0.1) + 20;
  gameState.modal = {
    ativo: true,
    titulo: 'Puzzle de Logística!',
    texto: `Uma árvore caiu na estrada! O que você faz?\n\nPagar R$ ${custoReparo} para removê-la e entregar a tempo.\nOu usar uma rota longa, perdendo 1 dia extra e 30% da carga.`,
    botoes: [
      {
        label: `Pagar R$ ${custoReparo}`,
        acao: () => {
          closeModal();
          if (gameState.dinheiro >= custoReparo) {
            gameState.dinheiro -= custoReparo;
            adicionarLog(`Você pagou ${custoReparo} para remover a árvore.`);
            entregaBemSucedida();
          } else {
            adicionarLog('Dinheiro insuficiente! Você foi forçado a desviar.');
            rotaLonga();
          }
        }
      },
      {
        label: 'Usar Rota Longa',
        acao: () => {
          closeModal();
          rotaLonga();
        }
      }
    ]
  };
}

// Aplica as penalidades da escolha "rota longa".
function rotaLonga() {
  adicionarLog(`Você usou a rota longa, perdendo um dia extra.`);
  passarDia();
  let valorTotal = 0;
  for (const culturaId in gameState.armazem) {
    const perda = floor(gameState.armazem[culturaId] * 0.3);
    const restante = gameState.armazem[culturaId] - perda;
    valorTotal += restante * CROPS[culturaId].valor;
    if (perda > 0) adicionarLog(`${perda} de ${CROPS[culturaId].nome} estragaram.`);
    gameState.armazem[culturaId] = 0;
  }
  gameState.dinheiro += valorTotal;
  adicionarLog(`Entrega parcial concluída! Você ganhou R$ ${valorTotal}.`);
}