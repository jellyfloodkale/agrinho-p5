let jogadorX, jogadorY;
let tamanhoJogador = 20;
let velocidadeJogador = 20;

let localAtualElementoX, localAtualElementoY; // Posição do item a ser coletado/entregue
let tamanhoElemento = 25;
let tipoElemento = 0; // 0: ciclo do trigo (fazenda -> cidade), 1: ciclo do tijolo (cidade -> fazenda)
let itemCarregado = -1; // -1: nenhum, 0: trigo, 1: tijolo

let cidadeX, cidadeY; // Posições da cidade
let fazendaX, fazendaY; // Posições da fazenda

let pontuacao = 0;
let mensagemJogo = "";
let jogoIniciado = false;
let gameOver = false;
let tempoRestante = 30;
let intervaloTempo;
let startJogoButton;
let resetButton;

let trigoX, trigoY;
let trigoPoints = []; // Para desenhar os pontos de trigo espalhados

let jogadorComElemento = false; // Indica se o jogador está carregando algo

function setup() {
  createCanvas(800, 600); // Define o tamanho da tela do jogo
  colorMode(HSB, 360, 100, 100); // Usa o modo de cor HSB para facilitar a definição de cores
  textAlign(CENTER, TOP); // Alinha o texto no centro e no topo
  rectMode(CENTER); // Desenha retângulos a partir do centro
  ellipseMode(CENTER); // Desenha elipses a partir do centro

  // Define as posições estáticas da cidade e da fazenda
  cidadeX = width * 0.1;
  cidadeY = height * 0.1;
  fazendaX = width * 0.7;
  fazendaY = height * 0.7;

  // Cria o botão de iniciar jogo
  startJogoButton = createButton('Iniciar Jogo');
  startJogoButton.position(width / 2 - 60, height + 20); // Posiciona o botão abaixo da tela
  startJogoButton.mousePressed(inicializarJogo); // Associa a função inicializarJogo ao clique

  // Cria o botão de resetar jogo
  resetButton = createButton('Resetar Jogo');
  resetButton.position(width / 2 + 20, height + 20); // Posiciona o botão ao lado do botão de iniciar
  resetButton.mousePressed(resetarJogo); // Associa a função resetarJogo ao clique

  inicializarJogo(); // Chama a função para configurar o estado inicial do jogo
}

function inicializarJogo() {
  jogadorX = width / 2;
  jogadorY = height - tamanhoJogador - 10;

  itemCarregado = -1; // Jogador não está carregando nada no início
  jogadorComElemento = false;
  tipoElemento = 0; // Começa o ciclo com trigo (coletar na fazenda, entregar na cidade)

  // O primeiro elemento (trigo) começa na fazenda
  localAtualElementoX = fazendaX;
  localAtualElementoY = fazendaY;

  pontuacao = 0;
  mensagemJogo = "Colete o trigo na fazenda e leve para a cidade!"; // Mensagem inicial clara
  gameOver = false;
  tempoRestante = 30;
  jogoIniciado = true;

  if (intervaloTempo) {
    clearInterval(intervaloTempo);
  }
  intervaloTempo = setInterval(atualizarTempo, 1000);
  if (startJogoButton) {
    startJogoButton.textContent = "Iniciar Jogo";
  }

  // Inicializa os pontos de trigo na posição inicial (fazenda)
  trigoX = localAtualElementoX;
  trigoY = localAtualElementoY;
  trigoPoints = [];
  for (let i = 0; i < 5; i++) {
    trigoPoints.push({
      x: trigoX + random(-5, 5),
      y: trigoY + random(-5, 5),
    });
  }
  loop(); // Garante que o loop de desenho esteja ativo
}

function resetarJogo() {
  inicializarJogo();
}

function desenharJogador() {
  fill(30, 80, 50); // Cor do jogador
  rect(jogadorX, jogadorY, tamanhoJogador, tamanhoJogador); // Desenha o jogador

  if (jogadorComElemento) { // Se o jogador estiver carregando algo
    if (itemCarregado === 0) { // Se for trigo
      fill(55, 80, 50); // Cor do trigo
      rect(jogadorX, jogadorY - tamanhoJogador / 2, tamanhoJogador / 2, tamanhoJogador / 2); // Desenha o trigo acima do jogador
    } else if (itemCarregado === 1) { // Se for tijolo
      fill(15, 90, 60); // Cor do tijolo
      rect(jogadorX, jogadorY - tamanhoJogador / 2, tamanhoJogador / 2, tamanhoJogador / 2); // Desenha o tijolo acima do jogador
    }
  }
}

function desenharElemento() {
  // Desenha o item no chão apenas se o jogador NÃO estiver carregando nada
  // e se o tipo de elemento atual corresponder ao que deve estar no chão
  if (!jogadorComElemento) {
    if (tipoElemento === 0) { // Se o ciclo atual for de trigo (precisa ser coletado na fazenda)
      fill(55, 80, 50); // Cor do trigo
      for (let i = 0; i < 5; i++) {
        ellipse(trigoPoints[i].x, trigoPoints[i].y, 8, 8); // Desenha os pontos de trigo
      }
    } else if (tipoElemento === 1) { // Se o ciclo atual for de tijolo (precisa ser coletado na cidade)
      fill(15, 90, 60); // Cor do tijolo
      rect(localAtualElementoX, localAtualElementoY, tamanhoElemento, tamanhoElemento, 5, 5, 3, 3); // Desenha o tijolo
    }
  }
}

function desenharCidade() {
  fill(200, 20, 50); // Cor do prédio da cidade
  rect(cidadeX, cidadeY, 80, 60); // Desenha o prédio da cidade
  fill(200, 10, 90); // Cor das janelas
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      rect(cidadeX - 25 + i * 25, cidadeY - 15 + j * 25, 10, 15); // Desenha as janelas
    }
  }
  textSize(12);
  fill(0); // Cor do texto
  text("Cidade", cidadeX, cidadeY + 50); // Desenha o texto "Cidade" centralizado
}

function desenharFazenda() {
  fill(100, 40, 60); // Cor do celeiro
  rect(fazendaX, fazendaY, 80, 60); // Desenha o celeiro
  fill(50, 80, 40); // Cor do telhado
  // Telhado centralizado acima do celeiro
  triangle(fazendaX - 40, fazendaY - 30, // Canto inferior esquerdo do telhado
    fazendaX + 40, fazendaY - 30, // Canto inferior direito do telhado
    fazendaX, fazendaY - 30 - 20); // Pico do telhado
  fill(50, 10, 100); // Cor das portas/janelas da fazenda
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      rect(fazendaX - 30 + i * 20, fazendaY - 15 + j * 15, 10, 10); // Desenha portas/janelas
    }
  }
  textSize(12);
  fill(0); // Cor do texto
  text("Fazenda", fazendaX, fazendaY + 50); // Desenha o texto "Fazenda" centralizado
}

function verificarColeta() {
  let distanciaAoAlvo = dist(jogadorX, jogadorY, localAtualElementoX, localAtualElementoY);
  let raioInteracao = 50; // Raio de proximidade para coletar/entregar

  // Lógica para coletar um item (jogador não está carregando nada)
  if (!jogadorComElemento && distanciaAoAlvo < raioInteracao) {
    if (tipoElemento === 0) { // Se o ciclo atual é de trigo (pegar trigo na fazenda)
      itemCarregado = 0; // Jogador agora carrega trigo
      jogadorComElemento = true;
      mensagemJogo = "Trigo coletado! Leve para a cidade.";
      // O próximo local alvo para interação é a cidade (para entrega)
      localAtualElementoX = cidadeX;
      localAtualElementoY = cidadeY;
    } else if (tipoElemento === 1) { // Se o ciclo atual é de tijolo (pegar tijolo na cidade)
      itemCarregado = 1; // Jogador agora carrega tijolo
      jogadorComElemento = true;
      mensagemJogo = "Tijolo coletado! Leve para a fazenda.";
      // O próximo local alvo para interação é a fazenda (para entrega)
      localAtualElementoX = fazendaX;
      localAtualElementoY = fazendaY;
    }
  }
  // Lógica para entregar um item (jogador está carregando algo)
  else if (jogadorComElemento && distanciaAoAlvo < raioInteracao) {
    // Jogador carregando trigo e tentando entregar na cidade
    if (itemCarregado === 0 && localAtualElementoX === cidadeX && localAtualElementoY === cidadeY) {
      mensagemJogo = "Trigo entregue na cidade! +10 pontos! Pegue o tijolo na cidade.";
      pontuacao += 10;
      itemCarregado = -1; // Jogador não carrega mais nada
      jogadorComElemento = false;
      tipoElemento = 1; // Próximo ciclo: tijolo (coletar na cidade, entregar na fazenda)
      // O tijolo já "nasceu" na cidade, então o localAtualElemento já é cidadeX/Y
      // Não precisa mudar localAtualElementoX/Y aqui.
    }
    // Jogador carregando tijolo e tentando entregar na fazenda
    else if (itemCarregado === 1 && localAtualElementoX === fazendaX && localAtualElementoY === fazendaY) {
      mensagemJogo = "Tijolo entregue na fazenda! +10 pontos! Pegue o trigo na fazenda.";
      pontuacao += 10;
      itemCarregado = -1; // Jogador não carrega mais nada
      jogadorComElemento = false;
      tipoElemento = 0; // Próximo ciclo: trigo (coletar na fazenda, entregar na cidade)
      // O trigo já "nasceu" na fazenda, então o localAtualElemento já é fazendaX/Y
      // Não precisa mudar localAtualElementoX/Y aqui.
      // Re-inicializa os pontos de trigo na fazenda para a próxima coleta
      trigoX = localAtualElementoX;
      trigoY = localAtualElementoY;
      trigoPoints = [];
      for (let i = 0; i < 5; i++) {
        trigoPoints.push({
          x: trigoX + random(-5, 5),
          y: trigoY + random(-5, 5),
        });
      }
    }
  }
}

function verificarGameOver() {
  if (tempoRestante <= 0) {
    gameOver = true;
    jogoIniciado = false;
    mensagemJogo = "Tempo esgotado! Pontuação final: " + pontuacao;
    noLoop(); // Para o loop de desenho
    clearInterval(intervaloTempo); // Para o contador de tempo
    if (startJogoButton) {
      startJogoButton.textContent = "Jogar novamente"; // Altera o texto do botão para reiniciar
    }
  }
}

function atualizarTempo() {
  if (jogoIniciado) {
    tempoRestante--;
    verificarGameOver();
  }
}

function desenharTempo() {
  textSize(20);
  fill(220, 20, 80); // Cor do texto do tempo
  text("Tempo: " + tempoRestante + "s", width / 2, 30);
}

function desenharPontuacao() {
  textSize(20);
  fill(220, 20, 80); // Cor do texto da pontuação
  text("Pontuação: " + pontuacao, width / 2, 60);
}

function desenharEstrada() {
  fill(100, 20, 20); // Cor de asfalto mais escura
  rect(width / 2, height / 2, width, 100); // Desenha a estrada centralizada
  for (let i = 0; i < width; i += 50) {
    stroke(200, 0, 100); // Cor das linhas tracejadas
    strokeWeight(3); // Espessura das linhas
    line(i + 10, height / 2, i + 40, height / 2); // Desenha linhas tracejadas
    noStroke(); // Remove o contorno para os próximos desenhos
  }
}

function desenharCenario() {
  // Desenha árvores
  for (let i = 0; i < 5; i++) {
    let x = width * 0.2 + i * width * 0.15;
    let y = height * 0.3;
    fill(30, 80, 50); // Corrigido: adicionado os valores e o parêntese de fechamento
    rect(x, y + 15, 10, 30); // Tronco
    fill(60, 100, 20);
    ellipse(x, y - 15, 30, 30); // Folhagem
  }
  // Desenha postes de luz
  for (let i = 0; i < 3; i++) {
    let x = width * 0.3 + i * width * 0.2;
    let y = height * 0.1;
    fill(0, 0, 80);
    rect(x, y + 40, 5, 80); // Poste
    fill(50, 80, 90);
    ellipse(x, y, 15, 15); // Luz
  }
  // Desenha arbustos
  for (let i = 0; i < 4; i++) {
    let x = width * 0.1 + i * width * 0.25;
    let y = height * 0.8;
    fill(80, 90, 40);
    ellipse(x, y, 20, 20);
  }
}

function draw() {
  clear(); // Limpa a tela a cada frame
  desenharCenario();
  desenharEstrada();
  desenharCidade();
  desenharFazenda();
  desenharJogador();
  desenharElemento();
  desenharTempo();
  desenharPontuacao();
  verificarColeta();
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(220, 20, 80);
  text(mensagemJogo, width / 2, height * 0.95);
}

function keyPressed() {
  if (jogoIniciado) {
    if (keyCode === LEFT_ARROW) {
      jogadorX -= velocidadeJogador;
    } else if (keyCode === RIGHT_ARROW) {
      jogadorX += velocidadeJogador;
    } else if (keyCode === UP_ARROW) {
      jogadorY -= velocidadeJogador;
    } else if (keyCode === DOWN_ARROW) {
      jogadorY += velocidadeJogador;
    }
    // Garante que o jogador não saia da tela
    jogadorX = constrain(jogadorX, tamanhoJogador / 2, width - tamanhoJogador / 2);
    jogadorY = constrain(jogadorY, tamanhoJogador / 2, height - tamanhoJogador / 2);
  }
}

