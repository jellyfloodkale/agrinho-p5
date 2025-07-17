// --- Variáveis Globais ---
let estadoDoJogo = 'INTRO'; // Controla a tela atual do jogo
let comidaNaRoca = 50; // Recursos de Comida na Roça
let comidaNaCidade = 10; // Recursos de Comida na Cidade
let ferramentasNaCidade = 25; // Recursos de Ferramentas na Cidade
let ferramentasNaRoca = 5; // Recursos de Ferramentas na Roça

const QUANTIDADE_TRANSFERENCIA = 10; // Valor transferido por ação
const TAXA_PRODUCAO_BASE_COMIDA_POR_SEGUNDO = 0.5; // Produção base de Comida
const TAXA_PRODUCAO_BASE_FERRAMENTAS_POR_SEGUNDO = 0.5; // Produção base de Ferramentas
const TAXA_CONSUMO_COMIDA_CIDADE_POR_SEGUNDO = 0.5; // Consumo base de Comida na Cidade
const TAXA_CONSUMO_FERRAMENTAS_ROCA_POR_SEGUNDO = 0.5; // Consumo base de Ferramentas na Roça
const INTERVALO_PRODUCAO_MS = 100; // Frequência de atualização dos recursos (ms)

let producaoComidaPorTick; // Comida produzida por tick
let producaoFerramentasPorTick; // Ferramentas produzidas por tick
let consumoComidaCidadePorTick; // Comida consumida por tick na Cidade
let consumoFerramentasRocaPorTick; // Ferramentas consumidas por tick na Roça

let intervaloAtualizacao; // ID do setInterval para a lógica do jogo

// --- Variáveis para Eventos Aleatórios ---
let eventoAtivo = null; // Tipo de evento ativo (ex: 'GEADA')
let tempoFimEvento = 0; // Tempo de término do evento
const DURACAO_EVENTO_SIMPLES_MS = 15000; // Duração padrão de eventos
const CHANCE_EVENTO = 0.005; // Chance de um evento ocorrer
const IMPACTO_EVENTO_MULTIPLICADOR = 2.0; // Multiplicador de impacto de eventos

let mensagemEvento = ""; // Mensagem de evento a ser exibida
let tempoFimMensagem = 0; // Tempo de término da exibição da mensagem
const DURACAO_MENSAGEM_EVENTO_MS = 4000; // Duração da mensagem

// --- Variáveis do Botão de Início ---
let btnIniciarX, btnIniciarY; // Posição do botão de início
let btnIniciarLargura = 200; // Largura do botão
let btnIniciarAltura = 50; // Altura do botão

// --- Configurações Iniciais ---
function setup() {
  createCanvas(800, 400); // Cria a tela do jogo
  textAlign(CENTER, CENTER); // Alinhamento padrão do texto
  textSize(18); // Tamanho padrão do texto

  // Calcula valores de produção/consumo por tick
  producaoComidaPorTick = TAXA_PRODUCAO_BASE_COMIDA_POR_SEGUNDO * (INTERVALO_PRODUCAO_MS / 1000);
  producaoFerramentasPorTick = TAXA_PRODUCAO_BASE_FERRAMENTAS_POR_SEGUNDO * (INTERVALO_PRODUCAO_MS / 1000);
  consumoComidaCidadePorTick = TAXA_CONSUMO_COMIDA_CIDADE_POR_SEGUNDO * (INTERVALO_PRODUCAO_MS / 1000);
  consumoFerramentasRocaPorTick = TAXA_CONSUMO_FERRAMENTAS_ROCA_POR_SEGUNDO * (INTERVALO_PRODUCAO_MS / 1000);

  // Define a posição do botão de início
  btnIniciarX = width / 2;
  btnIniciarY = height - 70;
}

// --- Desenha a Tela de Introdução ---
function desenhaTelaIntro() {
  background(20); // Fundo escuro
  fill(255); textSize(36); text('O Equilíbrio das Terras', width / 2, height / 4 - 30);
  textSize(18); fill(200);
  text('Gerencie a Roça (Comida) e a Cidade (Ferramentas).', width / 2, height / 2 - 80);
  text('Transfira recursos para manter o equilíbrio.', width / 2, height / 2 - 50);
  textSize(16); fill(220);
  text('Use D para enviar COMIDA (Roça -> Cidade)', width / 2, height / 2 + 10);
  text('Use A para enviar FERRAMENTAS (Cidade -> Roça)', width / 2, height / 2 + 40);
  fill(150); text('Fique sem recursos essenciais e será Game Over!', width / 2, height / 2 + 80);

  // Botão de Iniciar
  rectMode(CENTER); fill(50, 150, 50); stroke(0); strokeWeight(2);
  rect(btnIniciarX, btnIniciarY, btnIniciarLargura, btnIniciarAltura, 10);
  fill(255); textSize(22); noStroke(); text('COMEÇAR JOGO', btnIniciarX, btnIniciarY);
  rectMode(CORNER);

  textSize(14); textAlign(RIGHT, BOTTOM); fill(100); text('Feito com auxilio do Gemini', width - 80, height - 10);
  textAlign(CENTER, CENTER);
}

// --- Desenha a Tela de Game Over ---
function desenhaTelaGameOver() {
  background(200, 0, 0); // Fundo vermelho
  fill(255); textSize(48); text('GAME OVER!', width / 2, height / 2 - 50);
  textSize(24); text('Recursos se esgotaram!', width / 2, height / 2 + 20);
  textSize(18); fill(255, 255, 0); text('Pressione QUALQUER TECLA para REINICIAR', width / 2, height - 80);
}

// --- Gerencia Eventos Aleatórios (Geada, Crise, Greve, Praga) ---
function gerenciarEvents() {
  // Esconde mensagem após tempo
  if (mensagemEvento !== "" && millis() > tempoFimMensagem) {
    mensagemEvento = "";
  }
  // Termina evento ativo após duração
  if (eventoAtivo && millis() > tempoFimEvento) {
    console.log(`Evento ${eventoAtivo} terminou!`);
    eventoAtivo = null;
    mensagemEvento = "";
  }
  // Chance de iniciar novo evento
  if (!eventoAtivo && random() < CHANCE_EVENTO) {
    const tiposDeEventoContinuo = ['GEADA', 'CRISE', 'GREVE'];
    const tiposDeEventoInstantaneo = ['PRAGA'];
    let eventoEscolhido = random(tiposDeEventoContinuo.concat(tiposDeEventoInstantaneo));
    tempoFimMensagem = millis() + DURACAO_MENSAGEM_EVENTO_MS;

    if (tiposDeEventoInstantaneo.includes(eventoEscolhido)) { // Eventos instantâneos
      if (eventoEscolhido === 'PRAGA') {
        comidaNaRoca = max(0, comidaNaRoca - 10); // Reduz comida na roça
        mensagemEvento = `PRAGA! -10 COMIDA na Roça!`;
      }
    } else { // Eventos contínuos
      eventoAtivo = eventoEscolhido;
      tempoFimEvento = millis() + DURACAO_EVENTO_SIMPLES_MS;
      // ATENÇÃO: MENSAGEM DO EVENTO GEADA ALTERADA AQUI
      if (eventoAtivo === 'GEADA') mensagemEvento = `GEADA! Produção de COMIDA ${IMPACTO_EVENTO_MULTIPLICADOR}x MENOR!`;
      else if (eventoAtivo === 'CRISE') mensagemEvento = `CRISE! Consumo de COMIDA ${IMPACTO_EVENTO_MULTIPLICADOR}x MAIOR!`;
      else if (eventoAtivo === 'GREVE') mensagemEvento = `GREVE! Produção de FERRAMENTAS ${IMPACTO_EVENTO_MULTIPLICADOR}x MENOR!`;
    }
    console.log(`NOVO EVENTO: ${eventoAtivo || eventoEscolhido}! ${mensagemEvento}`);
  }
}

// --- Atualiza os Recursos (produção e consumo) ---
function atualizarRecursos() {
  gerenciarEvents(); // Aplica efeitos de eventos

  let consumoComidaAtual = consumoComidaCidadePorTick;
  let consumoFerramentasAtual = consumoFerramentasRocaPorTick;
  let producaoComidaAtual = producaoComidaPorTick;
  let producaoFerramentasAtual = producaoFerramentasPorTick;

  // Modifica taxas se houver evento ativo
  // ATENÇÃO: LÓGICA DO EVENTO GEADA ALTERADA AQUI
  if (eventoAtivo === 'GEADA') {
    producaoComidaAtual /= IMPACTO_EVENTO_MULTIPLICADOR; // GEADA desacelera produção de comida
  } else if (eventoAtivo === 'CRISE') {
    consumoComidaAtual *= IMPACTO_EVENTO_MULTIPLICADOR;
  } else if (eventoAtivo === 'GREVE') {
    producaoFerramentasAtual /= IMPACTO_EVENTO_MULTIPLICADOR;
  }

  // Atualiza recursos
  comidaNaRoca += producaoComidaAtual;
  ferramentasNaCidade += producaoFerramentasAtual;
  comidaNaCidade = max(0, comidaNaCidade - consumoComidaAtual);
  ferramentasNaRoca = max(0, ferramentasNaRoca - consumoFerramentasAtual);

  // Verifica Game Over
  if (comidaNaCidade <= 0 || ferramentasNaRoca <= 0) {
    estadoDoJogo = 'GAME_OVER';
    clearInterval(intervaloAtualizacao); // Para o loop de atualização
    console.log("GAME OVER! Recursos esgotados.");
  }
}

// --- Loop Principal de Desenho ---
function draw() {
  if (estadoDoJogo === 'INTRO') {
    desenhaTelaIntro();
  } else if (estadoDoJogo === 'JOGANDO') {
    background(0);

    // Céu com gradiente
    for (let i = 0; i < height / 2; i++) {
      let inter = map(i, 0, height / 2, 0, 1);
      let c1 = color(135, 206, 235); let c2 = color(0, 191, 255);
      stroke(lerpColor(c1, c2, inter));
      line(0, i, width, i);
    }

    // Nuvens orgânicas (múltiplas elipses sobrepostas)
    noStroke(); fill(255, 255, 255, 200);
    ellipse(150, 50, 70, 50); ellipse(180, 40, 60, 40); ellipse(120, 45, 50, 35); ellipse(165, 35, 40, 30);
    ellipse(450, 60, 80, 55); ellipse(480, 50, 70, 45); ellipse(420, 55, 60, 40); ellipse(465, 45, 50, 35);
    // Ruído nas nuvens
    for (let i = 0; i < 5; i++) { fill(255, 255, 255, 150); ellipse(random(100, 200), random(30, 60), 5, 5); ellipse(random(400, 500), random(40, 70), 5, 5); }

    // Campo (retângulo de grama)
    fill(50, 150, 50); noStroke(); rect(0, height / 2, width, height / 2);

    // Montes no horizonte (formas irregulares usando muitos vertices)
    fill(40, 120, 40);
    beginShape();
    vertex(0, height / 2); vertex(width * 0.1, height / 2 - 25); vertex(width * 0.15, height / 2 - 10);
    vertex(width * 0.25, height / 2 - 10); vertex(width * 0.35, height / 2 - 40); vertex(width * 0.45, height / 2 - 20);
    vertex(width * 0.55, height / 2 - 15); vertex(width * 0.65, height / 2 - 30); vertex(width * 0.75, height / 2 - 15);
    vertex(width * 0.85, height / 2 - 5); vertex(width * 0.95, height / 2 - 10); vertex(width, height / 2);
    endShape(CLOSE);

    // Árvores orgânicas (tronco com shape, copa com elipses)
    fill(139, 69, 19); stroke(100, 50, 10); strokeWeight(1);
    beginShape(); vertex(250, height / 2 - 20); vertex(255, height / 2 + 10); vertex(260, height / 2 - 20); endShape(CLOSE);
    noStroke(); fill(34, 139, 34);
    ellipse(255, height / 2 - 50, 70, 60); ellipse(240, height / 2 - 60, 50, 40); ellipse(270, height / 2 - 60, 50, 40);

    fill(139, 69, 19); stroke(100, 50, 10);
    beginShape(); vertex(550, height / 2 - 10); vertex(555, height / 2 + 15); vertex(560, height / 2 - 10); endShape(CLOSE);
    noStroke(); fill(34, 139, 34);
    ellipse(555, height / 2 - 40, 60, 50); ellipse(540, height / 2 - 50, 45, 35); ellipse(570, height / 2 - 50, 45, 35);


    // --- CIDADE (Prédios Simétricos e Retos) ---
    stroke(50); strokeWeight(1);

    // Prédio 1 (retangular)
    fill(100, 100, 100); rect(50, 200, 70, 150);
    noStroke(); fill(200, 200, 0, 180); // Janelas
    for (let y = 208; y < 340; y += 22) { rect(58, y, 15, 15); rect(80, y, 15, 15); rect(102, y, 15, 15); }

    // Prédio 2 (retangular com antena)
    stroke(50); fill(150, 150, 150); rect(130, 150, 60, 200);
    noStroke(); fill(200, 200, 0, 180); // Janelas
    for (let y = 158; y < 340; y += 20) { rect(138, y, 15, 15); rect(160, y, 15, 15); }
    stroke(80); strokeWeight(2); line(160, 150, 160, 120); ellipse(160, 115, 8, 8); // Antena

    // Prédio 3 (retangular)
    stroke(50); fill(90, 90, 90); rect(200, 180, 80, 170);
    noStroke(); fill(200, 200, 0, 180); // Janelas
    for (let y = 188; y < 340; y += 20) { rect(208, y, 18, 15); rect(235, y, 18, 15); rect(262, y, 18, 15); }


    // --- ROÇA (Casa Simétrica e Reta) ---
    stroke(50); strokeWeight(1); fill(139, 69, 19); // Parede
    rect(620, 280, 100, 70);

    fill(100, 50, 0); // Telhado (triângulo)
    beginShape(); vertex(620, 280); vertex(720, 280); vertex(670, 230); endShape(CLOSE);

    fill(80, 40, 0); rect(660, 310, 25, 40); // Porta
    fill(255, 255, 0); ellipse(678, 330, 4, 4); // Maçaneta

    fill(170, 200, 255); stroke(50, 20, 0); strokeWeight(1); // Janelas
    rect(630, 295, 25, 25); rect(690, 295, 25, 25); noStroke();


    // --- Exibição de Recursos e UI ---
    fill(0); noStroke(); textAlign(CENTER, CENTER);
    text('ROÇA', 660, 80); text('Comida: ' + floor(comidaNaRoca), 660, 100); text('Ferramentas: ' + floor(ferramentasNaRoca), 660, 120);
    text('CIDADE', 100, 50); text('Comida: ' + floor(comidaNaCidade), 100, 70); text('Ferramentas: ' + floor(ferramentasNaCidade), 100, 90);

    fill(0, 0, 255); textSize(16);
    text('Pressione D para enviar COMIDA (Roça -> Cidade)', width / 2, 20);
    text('Pressione A para enviar FERRAMENTAS (Cidade -> Roça)', width / 2, 40);

    // Exibição de Eventos Ativos
    if (eventoAtivo) {
      fill(255, 0, 0); textSize(20); text(`EVENTO: ${eventoAtivo}!`, width / 2, 160);
      textSize(16); text(`DURAÇÃO: ${ceil((tempoFimEvento - millis()) / 1000)}s`, width / 2, 185);
      fill(255, 0, 255); textSize(20);
      // ATENÇÃO: MENSAGEM DO EVENTO GEADA ALTERADA AQUI
      if (eventoAtivo === 'GEADA') text(`Penalidade: Produção de COMIDA ${IMPACTO_EVENTO_MULTIPLICADOR}x MENOR!`, width / 2, 220);
      else if (eventoAtivo === 'CRISE') text(`Penalidade: Consumo de COMIDA ${IMPACTO_EVENTO_MULTIPLICADOR}x MAIOR!`, width / 2, 220);
      else if (eventoAtivo === 'GREVE') text(`Penalidade: Produção de FERRAMENTAS ${IMPACTO_EVENTO_MULTIPLICADOR}x MENOR!`, width / 2, 220);
    } else if (mensagemEvento !== "") { // Mensagem de evento instantâneo
      fill(255, 0, 255); textSize(22); text(mensagemEvento, width / 2, 160);
    }

  } else if (estadoDoJogo === 'GAME_OVER') {
    desenhaTelaGameOver();
  }
}

// --- Lida com Cliques do Mouse ---
function mousePressed() {
  if (estadoDoJogo === 'INTRO') { // Inicia jogo pelo botão
    let distanciaX = abs(mouseX - btnIniciarX);
    let distanciaY = abs(mouseY - btnIniciarY);
    if (distanciaX < btnIniciarLargura / 2 && distanciaY < btnIniciarAltura / 2) {
      estadoDoJogo = 'JOGANDO';
      if (!intervaloAtualizacao) { // Garante que setInterval só é criado uma vez
        intervaloAtualizacao = setInterval(atualizarRecursos, INTERVALO_PRODUCAO_MS);
        console.log("Jogo iniciado pelo botão!");
      }
    }
  } else if (estadoDoJogo === 'GAME_OVER') { // Reinicia jogo
    resetarJogo();
  }
}

// --- Lida com Teclas Pressionadas ---
function keyPressed() {
  if (estadoDoJogo === 'JOGANDO') {
    if (key === 'a' || key === 'A') { // Envia ferramentas
      if (ferramentasNaCidade >= QUANTIDADE_TRANSFERENCIA) {
        ferramentasNaCidade -= QUANTIDADE_TRANSFERENCIA;
        ferramentasNaRoca += QUANTIDADE_TRANSFERENCIA;
        console.log("Ferramentas enviadas da Cidade para Roça!");
      } else { console.log("Cidade: Ferramentas insuficientes para enviar!"); }
    } else if (key === 'd' || key === 'D') { // Envia comida
      if (comidaNaRoca >= QUANTIDADE_TRANSFERENCIA) {
        comidaNaRoca -= QUANTIDADE_TRANSFERENCIA;
        comidaNaCidade += QUANTIDADE_TRANSFERENCIA;
        console.log("Comida enviada da Roça para Cidade!");
      } else { console.log("Roça: Comida insuficiente para enviar!"); }
    }
  } else if (estadoDoJogo === 'GAME_OVER') { // Reinicia jogo
    resetarJogo();
  }
}

// --- Reinicia o Jogo ---
function resetarJogo() {
  // Redefine recursos e eventos
  comidaNaRoca = 50; comidaNaCidade = 10;
  ferramentasNaCidade = 25; ferramentasNaRoca = 5;
  eventoAtivo = null; tempoFimEvento = 0;
  mensagemEvento = ""; tempoFimMensagem = 0;

  estadoDoJogo = 'JOGANDO'; // Retorna ao estado de jogo
  if (intervaloAtualizacao) clearInterval(intervaloAtualizacao); // Limpa intervalo anterior
  intervaloAtualizacao = setInterval(atualizarRecursos, INTERVALO_PRODUCAO_MS); // Reinicia intervalo
  console.log("Jogo Reiniciado!");
}