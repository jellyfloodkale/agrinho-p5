let tela = 1;
let terminouDigitar = false;
let digitando = false;
let estacaoVazia, estacaoComTrem, tremFrente;
let tremY, tremFinalY;
let animandoTrem = true;

// PREFEITO E DIÁLOGO
let prefeitoImg;
let frasesPrefeito = [
  "Ah, então você é quem veio pelo projeto Conexão Viva?",
  "Claro! Precisamos da sua ajuda para que tudo esteja pronto: barracas, apresentações, transporte, segurança... é muita coisa!"
];
let frasePrefeitoAtual = 0;

// BALÃO DE FALA
let balaoImg;
let balaoX = 180;
let balaoY = 170;
let balaoLargura = 650;
let balaoAltura = 180;

// Diálogo com escolhas
let dialogoEtapa = 0;
let escolhas = [
  "Sim, estou animado para unir a cidade e o campo!",
  "Estou um pouco perdido… pode me contar mais sobre o festival?"
];
let escolhaSelecionada = -1;
let fundoImg, fundoX = 0, larguraFundo;
let logoImg, botaoImg;
let botaoX = 375;
let botaoY = 500;
let botaoLargura = 400;
let botaoAltura = 200;
let frases = [
  "Há muito tempo, o campo e a cidade eram próximos...",
  "Mas com o tempo, os passos desaceleraram de um lado, e aceleraram do outro.",
  "Agora, um novo festival promete reacender o que foi esquecido."
];
let linhasTexto = [];
let fraseAtual = 0;
let letraAtual = 0;
let textoEmConstrucao = "";
let tempoEntreLetras = 80;
let ultimoTempo = 0;

// --- Montar o festival ---
let etapa = "historia"; // historia, dialogoPrefeito, montarFestival, festivalFinal, final
let pecasFestival, locaisFestival, nomeBarracasFestival;
let barracasMontadasFestival, tempoFestival, tempoMaxFestival;
let pecaArrastandoFestival, offsetXFestival, offsetYFestival;
let dialogoFestival, dialogoMoradorFestival, dialogoEtapaFestival;
let minigameFinalizado = false;
let proximaEtapaAgendada = false;
let festivalAnimacaoTempo = 0;

// Imagem do festival pronto
let festivalProntoImg;

function preload() {
  fundoImg = loadImage("nascer_sol.png");
  logoImg = loadImage("nome_do_jogo (2).png");
  botaoImg = loadImage("botao_start.png");
  tremFrente = loadImage("trem.png");
  estacaoComTrem = loadImage("estacao_com_trem.png");
  estacaoVazia = loadImage("estacao.png");
  prefeitoImg = loadImage("prefeito.png");
  balaoImg = loadImage("balao_fala.png");
  festivalProntoImg = loadImage("festival_final.png");
}

function setup() {
  createCanvas(1100, 770);
  larguraFundo = fundoImg.width;
  textSize(24);
  textAlign(CENTER, TOP);
  fill(255);

  // Trem horizontal - começa fora da tela à direita e para no centro
  tremY = width + 50;      
  tremFinalY = width / 365;

  pecasFestival = [
    { tipo: "estaca", x: 120, y: 600, w: 60, h: 30, dragging: false },
    { tipo: "lona", x: 220, y: 650, w: 100, h: 30, dragging: false },
    { tipo: "corda", x: 350, y: 600, w: 80, h: 30, dragging: false }
  ];
  locaisFestival = [
    { tipo: "Doces", x: 700, y: 300, ocupada: false },
    { tipo: "Artesanato", x: 900, y: 300, ocupada: false },
    { tipo: "Música", x: 800, y: 500, ocupada: false }
  ];
  nomeBarracasFestival = ["Doces", "Artesanato", "Música"];
  barracasMontadasFestival = 0;
  tempoFestival = 0;
  tempoMaxFestival = 25 * 60;
  pecaArrastandoFestival = null;
  offsetXFestival = 0;
  offsetYFestival = 0;
  dialogoFestival = false;
  dialogoMoradorFestival = [
    "Oi! O que você gostaria de expor aqui?",
    "Escolha o tipo de barraca para este espaço."
  ];
  dialogoEtapaFestival = 0;
  minigameFinalizado = false;
  proximaEtapaAgendada = false;
  festivalAnimacaoTempo = 0;
}

function draw() {
  background(0);
  image(fundoImg, fundoX, 0, larguraFundo, height);
  image(fundoImg, fundoX + larguraFundo, 0, larguraFundo, height);
  fundoX -= 1;
  if (fundoX <= -larguraFundo) fundoX = 0;

  if (etapa === "historia") {
    desenharHistoriaEIntro();
  } else if (etapa === "dialogoPrefeito") {
    desenharDialogoPrefeito();
  } else if (etapa === "montarFestival") {
    drawMontarFestival();
  } else if (etapa === "festivalFinal") {
    drawFestivalFinal();
  } else if (etapa === "final") {
    drawFinal();
  }
}

function desenharHistoriaEIntro() {
  if (tela === 1) {
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, width, height);

    let logoAltura = 550;
    let logoLargura = 580;
    let logoX = width / 1.9 - logoLargura / 2;
    let logoY = height / 3 - logoAltura / 2 - 100;
    image(logoImg, logoX, logoY, logoLargura, logoAltura);

    image(botaoImg, botaoX, botaoY, botaoLargura, botaoAltura);
  }

  if (tela === 2) {
    background(0);

    let margemY = 120;
    let espacamento = 50;
    let linhasTotais = 0;
    textAlign(CENTER, TOP);
    fill(255);

    for (let i = 0; i < linhasTexto.length; i++) {
      linhasTotais += mostrarFraseQuebrada(linhasTexto[i], width / 2, margemY + linhasTotais * espacamento);
    }

    if (!terminouDigitar) {
      mostrarFraseQuebrada(textoEmConstrucao, width / 2, margemY + linhasTotais * espacamento);

      if (!digitando) {
        digitando = true;
      }
      if (fraseAtual < frases.length && millis() - ultimoTempo > tempoEntreLetras) {
        adicionarLetra();
        ultimoTempo = millis();
      }
      if (letraAtual >= frases[fraseAtual].length) {
        digitando = false;
      }
    }

    if (terminouDigitar) {
      digitando = false;
      fill(200, 200, 0);
      textSize(18);
      text("Clique para continuar...", width / 2, height - 80);
      textSize(24);
    }
  }

  if (tela === 3) {
    if (animandoTrem) {
      image(estacaoVazia, 0, 0, width, height);
      image(tremFrente, width / 2 - 120, tremY, 240, 240);
      if (tremY > tremFinalY) {
        tremY -= 5; 
      } else {
        animandoTrem = false;
      }
    } else {
      image(estacaoComTrem, 0, 0, width, height);
      fill(255, 220, 70);
      rect(width / 2 - 100, height - 100, 200, 60, 20);
      fill(80, 50, 10);
      textSize(28);
      textAlign(CENTER, CENTER);
      text("Avançar", width / 2, height - 70);
      textSize(24);
      textAlign(CENTER, TOP);
    }
  }

  if (tela === 4) {
    etapa = "dialogoPrefeito";
    tela = -1;
  }
}

function desenharDialogoPrefeito() {
  background(30, 100, 200);
  image(estacaoComTrem, 0, 0, width, height);

  let prefeitoLargura = 320;
  let prefeitoAltura = 420;
  let prefeitoX = 10;
  let prefeitoY = height - prefeitoAltura - 10;
  image(prefeitoImg, prefeitoX, prefeitoY, prefeitoLargura, prefeitoAltura);

  if (dialogoEtapa === 0) {
    mostrarBalaoFalaAlinhado(frasesPrefeito[0], balaoX, balaoY, balaoLargura, balaoAltura);
    mostrarEscolhasAbaixoDoBalao(escolhas);
  } else if (dialogoEtapa === 1) {
    mostrarBalaoFalaAlinhado("Jogador: " + escolhas[escolhaSelecionada], balaoX, balaoY, balaoLargura, balaoAltura);
    fill(200, 200, 0);
    textSize(18);
    text("Clique para continuar...", width / 2, height - 80);
    textSize(24);
  } else if (dialogoEtapa === 2) {
    mostrarBalaoFalaAlinhado(frasesPrefeito[1], balaoX, balaoY, balaoLargura, balaoAltura);
    fill(200, 200, 0);
    textSize(18);
    text("Clique para continuar...", width / 2, height - 80);
    textSize(24);
  }
}

function mostrarBalaoFalaAlinhado(texto, x, y, largura, altura) {
  image(balaoImg, x, y, largura, altura);

  fill(40);
  textSize(22);
  textAlign(CENTER, TOP);

  let margemX = 40; // margem lateral maior
  let margemY = 34; // margem superior/inferior maior
  let larguraMax = largura - 2 * margemX;
  let palavras = texto.split(" ");
  let linha = "";
  let linhas = [];
  for (let i = 0; i < palavras.length; i++) {
    let testeLinha = linha + palavras[i] + " ";
    if (textWidth(testeLinha) > larguraMax && linha !== "") {
      linhas.push(linha.trim());
      linha = palavras[i] + " ";
    } else {
      linha = testeLinha;
    }
  }
  linhas.push(linha.trim());
  let alturaLinha = 28;
  let totalAltura = linhas.length * alturaLinha;
  let startY = y + margemY + (altura - 2 * margemY - totalAltura) / 2;
  for (let i = 0; i < linhas.length; i++) {
    text(linhas[i], x + largura / 2, startY + i * alturaLinha);
  }
  textSize(24);
}

function mostrarEscolhasAbaixoDoBalao(opcoes) {
  let botLarg = balaoLargura - 40;
  let botAlt = 64;
  let espacamento = 20;
  let centroX = balaoX + balaoLargura / 2;
  let yBase = balaoY + balaoAltura + 40;

  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < opcoes.length; i++) {
    let x = centroX - botLarg / 2;
    let y = yBase + i * (botAlt + espacamento);

    fill(mouseX > x && mouseX < x + botLarg && mouseY > y && mouseY < y + botAlt ? "#ffe066" : "#fff");
    stroke(80, 50, 10);
    strokeWeight(2);
    rect(x, y, botLarg, botAlt, 16);

    fill(80, 50, 10);
    noStroke();

    let textoBotao = opcoes[i];
    let palavras = textoBotao.split(" ");
    let linha = "";
    let linhas = [];
    for (let j = 0; j < palavras.length; j++) {
      let testeLinha = linha + palavras[j] + " ";
      if (textWidth(testeLinha) > botLarg - 30 && linha !== "") {
        linhas.push(linha.trim());
        linha = palavras[j] + " ";
      } else {
        linha = testeLinha;
      }
    }
    linhas.push(linha.trim());
    let h = botAlt / (linhas.length + 1);
    for (let j = 0; j < linhas.length; j++) {
      text(linhas[j], centroX, y + (j + 1) * h);
    }
  }
  textAlign(CENTER, TOP);
  textSize(24);
}

function drawMontarFestival() {
  background(240, 220, 180);
  fill(80, 50, 10);
  textSize(30);
  text("Monte o Festival! Ajude a comunidade a organizar as barracas", width / 2, 40);

  for (let i = 0; i < locaisFestival.length; i++) {
    let local = locaisFestival[i];
    stroke(100);
    strokeWeight(2);
    fill(local.ocupada ? "#b7ddb7" : "#fff");
    rect(local.x, local.y, 120, 80, 18);
    fill(60);
    textSize(18);
    text(nomeBarracasFestival[i], local.x + 60, local.y + 90);
  }

  for (let i = 0; i < pecasFestival.length; i++) {
    let p = pecasFestival[i];
    fill(p.tipo == "estaca" ? "#b8860b" : (p.tipo == "lona" ? "#87ceeb" : "#deb887"));
    stroke(60);
    rect(p.x, p.y, p.w, p.h, 10);
    fill(40);
    textSize(16);
    text(p.tipo, p.x + p.w / 2, p.y + p.h / 2);
  }

  if (dialogoFestival) {
    fill(255, 255, 240, 230);
    rect(width / 2 - 220, 100, 440, 160, 24);
    fill(40);
    textSize(20);
    text(dialogoMoradorFestival[dialogoEtapaFestival], width / 2, 130);
    if (dialogoEtapaFestival == 1) {
      for (let i = 0; i < nomeBarracasFestival.length; i++) {
        fill("#f4e4c1");
        stroke(120);
        rect(width / 2 - 160 + i * 120, 180, 100, 40, 8);
        fill(60);
        textSize(16);
        text(nomeBarracasFestival[i], width / 2 - 110 + i * 120, 200);
      }
    }
  }

  fill(200);
  rect(180, 690, 800, 20, 12);
  fill(60, 180, 80);
  let barra = map(tempoFestival, 0, tempoMaxFestival, 800, 0);
  rect(180, 690, barra, 20, 12);
  fill(80);
  textSize(16);
  text("Tempo", 120, 690);

  fill(60);
  text("Barracas Montadas: " + barracasMontadasFestival + " / 3", 900, 690);

  if (barracasMontadasFestival >= 3 && !minigameFinalizado) {
    minigameFinalizado = true;
    fill(60, 180, 80);
    textSize(28);
    text("Parabéns! Todas as barracas foram montadas!", width / 2, 730);

    if (!proximaEtapaAgendada) {
      proximaEtapaAgendada = true;
      setTimeout(() => {
        etapa = "festivalFinal";
      }, 1800);
    }
  }

  tempoFestival++;
}

function drawFestivalFinal() {
  // Exibe a imagem do festival pronto no lugar da animação
  background(44, 90, 200);
  image(festivalProntoImg, 0, 0, width, height);

  // Parabéns e finalização
  fill(255,255,0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("O festival começou!\nCidade e campo juntos celebram!", width/2, 80);

  // Após alguns segundos, avança para o final
  festivalAnimacaoTempo++;
  if (festivalAnimacaoTempo > 360) { // 6 segundos a 60fps
    etapa = "final";
  }
}

function drawFinal() {
  background(0,0,0,230);
  fill(255,255,180);
  textSize(36);
  text("Cidade em Festa – Uma conexão que transforma.", width/2, 220);
  textSize(24);
  text("Obrigado por jogar!\nCréditos: Consegui concluir o projeto com a ajuda de:\n Imagens:criadas por Gemini;\n Ajuda com os códigos:GitHub, Tutoriais no YouTube e\n ajuda da professora Maria;", width/2, 400);
}

function mostrarFraseQuebrada(texto, x, y) {
  let margem = 60;
  let larguraMax = width - 2 * margem;
  let palavras = texto.split(" ");
  let linha = "";
  let linhas = [];
  for (let i = 0; i < palavras.length; i++) {
    let testeLinha = linha + palavras[i] + " ";
    if (textWidth(testeLinha) > larguraMax && linha !== "") {
      linhas.push(linha);
      linha = palavras[i] + " ";
    } else {
      linha = testeLinha;
    }
  }
  linhas.push(linha);
  for (let i = 0; i < linhas.length; i++) {
    text(linhas[i], x, y + i * 32);
  }
  return linhas.length;
}

function adicionarLetra() {
  let frase = frases[fraseAtual];
  if (letraAtual < frase.length) {
    textoEmConstrucao += frase.charAt(letraAtual);
    letraAtual++;
  }
}

function mousePressed() {
  if (etapa === "historia") {
    if (
      tela === 1 &&
      mouseX > botaoX && mouseX < botaoX + botaoLargura &&
      mouseY > botaoY && mouseY < botaoY + botaoAltura
    ) {
      tela = 2;
      linhasTexto = [];
      fraseAtual = 0;
      letraAtual = 0;
      textoEmConstrucao = "";
      ultimoTempo = millis();
      terminouDigitar = false;
      digitando = false;
      return;
    }

    if (tela === 2) {
      if (!terminouDigitar && fraseAtual < frases.length) {
        let frase = frases[fraseAtual];
        if (letraAtual < frase.length) {
          textoEmConstrucao = frase;
          letraAtual = frase.length;
          digitando = false;
          return;
        }
        linhasTexto.push(textoEmConstrucao);
        fraseAtual++;
        letraAtual = 0;
        textoEmConstrucao = "";
        ultimoTempo = millis();
        if (fraseAtual >= frases.length) {
          terminouDigitar = true;
          digitando = false;
        }
      } else if (terminouDigitar) {
        tela = 3;
        digitando = false;
        tremX = heigth + 50;
        animandoTrem = true;
      }
      return;
    }

    if (
      tela === 3 &&
      !animandoTrem &&
      mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
      mouseY > height - 100 && mouseY < height - 40
    ) {
      tela = 4;
      dialogoEtapa = 0;
      escolhaSelecionada = -1;
      return;
    }

    if (tela === 4) {
      etapa = "dialogoPrefeito";
      tela = -1;
      return;
    }
  }

  if (etapa === "dialogoPrefeito") {
    let botLarg = balaoLargura - 40;
    let botAlt = 64;
    let espacamento = 20;
    let centroX = balaoX + balaoLargura / 2;
    let yBase = balaoY + balaoAltura + 40;

    if (dialogoEtapa === 0) {
      for (let i = 0; i < escolhas.length; i++) {
        let x = centroX - botLarg / 2;
        let y = yBase + i * (botAlt + espacamento);

        if (mouseX > x && mouseX < x + botLarg && mouseY > y && mouseY < y + botAlt) {
          escolhaSelecionada = i;
          dialogoEtapa = 1;
        }
      }
      return;
    } else if (dialogoEtapa === 1) {
      dialogoEtapa = 2;
      return;
    } else if (dialogoEtapa === 2) {
      etapa = "montarFestival";
      return;
    }
  }

  if (etapa == "montarFestival" && !dialogoFestival) {
    for (let i = 0; i < pecasFestival.length; i++) {
      let p = pecasFestival[i];
      if (mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h) {
        pecaArrastandoFestival = i;
        offsetXFestival = mouseX - p.x;
        offsetYFestival = mouseY - p.y;
        pecasFestival[i].dragging = true;
        break;
      }
    }
  }

  if (etapa == "montarFestival" && dialogoFestival && dialogoEtapaFestival == 1) {
    for (let i = 0; i < nomeBarracasFestival.length; i++) {
      let bx = width / 2 - 160 + i * 120;
      let by = 180;
      if (mouseX > bx && mouseX < bx + 100 && mouseY > by && mouseY < by + 40) {
        locaisFestival[i].ocupada = true;
        barracasMontadasFestival++;
        dialogoFestival = false;
        dialogoEtapaFestival = 0;
      }
    }
  }
}

function mouseDragged() {
  if (etapa == "montarFestival" && pecaArrastandoFestival !== null && !dialogoFestival) {
    pecasFestival[pecaArrastandoFestival].x = mouseX - offsetXFestival;
    pecasFestival[pecaArrastandoFestival].y = mouseY - offsetYFestival;
  }
}

function mouseReleased() {
  if (etapa == "montarFestival" && pecaArrastandoFestival !== null && !dialogoFestival) {
    for (let i = 0; i < locaisFestival.length; i++) {
      let l = locaisFestival[i];
      if (
        !l.ocupada &&
        pecasFestival[pecaArrastandoFestival].x + pecasFestival[pecaArrastandoFestival].w / 2 > l.x &&
        pecasFestival[pecaArrastandoFestival].x + pecasFestival[pecaArrastandoFestival].w / 2 < l.x + 120 &&
        pecasFestival[pecaArrastandoFestival].y + pecasFestival[pecaArrastandoFestival].h / 2 > l.y &&
        pecasFestival[pecaArrastandoFestival].y + pecasFestival[pecaArrastandoFestival].h / 2 < l.y + 80
      ) {
        dialogoFestival = true;
        dialogoEtapaFestival = 1;
      }
    }
    pecasFestival[pecaArrastandoFestival].dragging = false;
    pecaArrastandoFestival = null;
  }
}