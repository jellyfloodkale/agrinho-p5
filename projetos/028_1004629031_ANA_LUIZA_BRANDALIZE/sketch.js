//Aluna: Ana Luiza Brandalize
//Colégio Estadual Trajano Gracia
//Professor:Matheus Gonçalves Nascimento
//Clique WASD ou as ->setas<- para seu personagem andar,
// --- Variáveis Globais ---
let jogador;
let cenaAtual = "campo";

// Posições do jogador
let jogadorX = 100;
let jogadorY = 320;

// Estado de diálogo (para interações RPG)
let emDialogo = false;
let dialogoAtual = [];
let linhaDialogoAtual = 0;
let ultimaCenaAntesDoDialogo; // Variável para guardar a cena antes do diálogo
let notas;

// Variável para dinheiro do jogador
let dinheiroJogador = 0;
const CUSTO_FINAL_BOM = 300; // Custo para o final bom

// Variável para controlar a interação com a casa
let casaInteragida = false;

// --- Configuração Inicial ---
function setup() {
  console.log(" Função setup iniciada.");
  createCanvas(800, 600);
  jogador = new Jogador("Jornada", 5, 5, 5); // Nome, Força, Inteligência, Carisma
  jogador.mostrarStatus(); // Exibe os status iniciais no console
  console.log(" Função setup finalizada.");
}

// --- Loop Principal do Jogo ---
function draw() {
  // Desenha a cena com base na variável cenaAtual
  if (cenaAtual === "campo") {
    desenharCampo();
  } else if (cenaAtual === "cidade") {
    desenharCidade();
  } else if (cenaAtual === "dialogo") {
    // Mantém o fundo da cena onde o diálogo começou
    if (ultimaCenaAntesDoDialogo === "campo") {
      desenharCampo();
    } else if (ultimaCenaAntesDoDialogo === "cidade") {
      desenharCidade();
    }
    desenharDialogo();
  } else if (cenaAtual === "finalBom") {
    desenharFinalBom();
  }

  if (!emDialogo && cenaAtual !== "finalBom") {
    desenharJogador(jogadorX, jogadorY);
  }

  // --- Lógica de Movimento do Jogador ---

  // Só permite movimento se NÃO estiver em diálogo e NÃO for a cena final
  // SEU CÓDIGO NO draw() DEVE SER EXATAMENTE ASSIM NESTE BLOCO:
  if (!emDialogo && cenaAtual !== "finalBom") {
    let velocidade = 3;
    let proximoJogadorX = jogadorX;
    let proximoJogadorY = jogadorY;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      proximoJogadorX -= velocidade;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      proximoJogadorX += velocidade;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      proximoJogadorY -= velocidade;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      proximoJogadorY += velocidade;
    }

    let margemHorizontal = 20;
    let margemVerticalSuperior = 40;
    let margemVerticalInferior = 80;

    proximoJogadorX = constrain(
      proximoJogadorX,
      margemHorizontal,
      width - margemHorizontal
    );
    proximoJogadorY = constrain(
      proximoJogadorY,
      margemVerticalSuperior,
      height - margemVerticalInferior
    );

    jogadorX = proximoJogadorX;
    jogadorY = proximoJogadorY;
  } // SEU CÓDIGO NO draw() DEVE SER EXATAMENTE ASSIM NESTE BLOCO:
  // --- Lógica de Movimento do Jogador ---

  // Só permite movimento se NÃO estiver em diálogo e NÃO for a cena final
  if (!emDialogo && cenaAtual !== "finalBom") {
    let velocidade = 3;

    // Calcula a próxima posição POTENCIAL do jogador
    let proximoJogadorX = jogadorX;
    let proximoJogadorY = jogadorY;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      // Seta Esquerda ou 'A'
      proximoJogadorX -= velocidade;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      // Seta Direita ou 'D'
      proximoJogadorX += velocidade;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      // Seta Para Cima ou 'W'
      proximoJogadorY -= velocidade;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      // Seta Para Baixo ou 'S'
      proximoJogadorY += velocidade;
    }

    // --- Aplicar Limites usando constrain() na posição POTENCIAL ---
    // Vamos usar margens MAIORES para dar mais "folga" ao p5.js.
    // Se o erro ainda ocorrer com margens grandes, o problema não é o limite em si.
    let margemHorizontal = 30; // Aumentado de 20 para 30
    let margemVerticalSuperior = 50; // Aumentado de 40 para 50
    let margemVerticalInferior = 90; // Aumentado de 80 para 90 (jogadorY máximo será height - 90)

    proximoJogadorX = constrain(
      proximoJogadorX,
      margemHorizontal,
      width - margemHorizontal
    );
    proximoJogadorY = constrain(
      proximoJogadorY,
      margemVerticalSuperior,
      height - margemVerticalInferior
    );

    // Finalmente, atualizamos a posição real do jogador
    jogadorX = proximoJogadorX;
    jogadorY = proximoJogadorY;
  }
}
// --- Funções de Desenho de Cenas ---

function desenharCampo() {
  //---ceu---
  background("#85C3DF");
  //inicio da plantação
  fill("#5A3629");
  noStroke();
  rect(0, 400, 800, 300);

  // --- Plantação ---
  let plantSpacingX = 25;
  let plantSpacingY = 35;
  let startY = 420;
  for (let y = startY; y < height - 20; y += plantSpacingY) {
    for (let x = 15; x < width - 15; x += plantSpacingX) {
      fill("#8B4513");
      rect(x, y, 3, 15);
      fill("#32CD32");
      circle(x + 1.5, y, 10);
    }
  }
  //retangulo
  fill("rgb(208,194,194)");
  rect(30, 500, 320, 90);
  //---arvore---
  strokeWeight(3);
  fill("#612F1D");
  rect(100, 100, 50, 300);
  fill("green");
  circle(120, 100, 100);
  circle(170, 120, 100);
  circle(70, 160, 110);
  circle(120, 170, 100);

  // --- ESCOLA/CASA ORIGINAL DO CAMPO ---
  fill("white");
  rect(250, 200, 300, 200);
  fill("#C05735");
  triangle(600, 200, 200, 200, 400, 80);
  //porta
  fill("#6B370A");
  rect(300, 280, 90, 120);
  fill("yellow");
  circle(310, 350, 12);
  //---janela---
  strokeWeight(3);
  fill("#592E1E");
  rect(430, 250, 80, 80);
  line(470, 326, 470, 250);
  fill("yellow");
  circle(460, 290, 10);
  circle(480, 290, 10);
  noStroke(); // Garante que as próximas formas não tenham contorno

  //---área de treinamento---
  fill("rgb(75,66,66)");
  rect(750, 200, 40, 200);
  rect(650, 200, 40, 200);
  rect(630, 200, 200, 40);
  fill("white");
  text("AREA DE TREINAMENTO", 650, 215);

  // --- Texto da Plantação---
  if (casaInteragida) {
    fill(255);
    textSize(18);

    textAlign(CENTER, CENTER);
    text("Plantação de Grãos", width / 2, height - 170);
    textSize(16);
    text("Pressione 'C' para colher!", width / 2, height - 150);
    textAlign(LEFT, BASELINE);
  }

  fill(0);
  textSize(20);
  text("CENA: CAMPO", width / 2 - 80, 50);
  textSize(14);
  text("Use SETAS ou WASD para mover.", 50, 530);
  text("Pressione 'ENTER' para tentar ir para a cidade.", 50, 550);
  text("Interaja com a casa (pressione 'E' perto dela).", 50, 570);
}

function desenharCidade() {
  // --- Céu ---
  background("gray");

  // --- Prédios Iniciais ---
  fill("purple");
  rect(0, 100, 150, 300);
  fill("blue");
  rect(40, 280, 70, 300); // Prédio 2

  // --- Novos Prédios com Janelas ---

  // Prédio 3
  fill("#6B5B95");
  rect(180, 150, 120, 250);
  // Janelas Prédio 3
  fill("#ADD8E6");
  rect(190, 160, 30, 30);
  rect(230, 160, 30, 30);
  rect(270, 160, 30, 30);
  rect(190, 200, 30, 30);
  rect(230, 200, 30, 30);
  rect(270, 200, 30, 30);
  rect(190, 240, 30, 30);
  rect(230, 240, 30, 30);
  rect(270, 240, 30, 30);

  // Prédio 4 (mais alto, à direita)
  fill("#4A4A6A");
  rect(320, 50, 100, 350);
  // Janelas Prédio 4
  fill("#ADD8E6");
  for (let i = 0; i < 7; i++) {
    // Loop para janelas verticais
    rect(330, 60 + i * 45, 25, 30);
    rect(375, 60 + i * 45, 25, 30);
  }

  // --- Prefeitura (Centro de Investimentos) ---
  let prefX = 450;
  let prefY = 80; // Levanta um pouco o prédio
  let prefLargura = 250; // Aumenta a largura
  let prefAltura = 320; // Aumenta a altura

  // Base do Prédio Principal
  fill("#C0B0D8");
  rect(prefX, prefY, prefLargura, prefAltura);

  // Colunas
  fill("#A090C0");
  rect(prefX + 20, prefY, 20, prefAltura); // Coluna esquerda
  rect(prefX + prefLargura - 40, prefY, 20, prefAltura); // Coluna direita

  // Telhado
  fill("#8070A0");
  rect(prefX, prefY, prefLargura, 30); // Faixa superior

  // Janelas (mais elaboradas)
  fill("#ADD8E6"); // Azul claro para janelas
  // Linha superior de janelas
  rect(prefX + 50, prefY + 50, 40, 40);
  rect(prefX + 105, prefY + 50, 40, 40);
  rect(prefX + 160, prefY + 50, 40, 40);
  // Linha inferior de janelas
  rect(prefX + 50, prefY + 110, 40, 40);
  rect(prefX + 105, prefY + 110, 40, 40);
  rect(prefX + 160, prefY + 110, 40, 40);

  // Porta Principal
  fill("#5A4C70");
  rect(prefX + prefLargura / 2 - 40, prefY + prefAltura - 120, 80, 120);
  fill("yellow");
  circle(prefX + prefLargura / 2 - 30, prefY + prefAltura - 60, 8);
  circle(prefX + prefLargura / 2 + 30, prefY + prefAltura - 60, 8);

  // Letreiro
  fill(255);
  rect(prefX + prefLargura / 2 - 80, prefY + 200, 160, 30, 5); // Fundo do letreiro
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("CENTRO DE", prefX + prefLargura / 2, prefY + 210);
  text("INVESTIMENTOS", prefX + prefLargura / 2, prefY + 225);
  textAlign(LEFT, BASELINE); // Reseta alinhamento
  // FIM DO CÓDIGO DA PREFEFEITURA APRIMORADA

  // --- Lugar de Vendas (Feira/Mercado) ---
  fill("#E0BBE4");
  rect(700, 300, 90, 150);
  fill("#957DAD");
  triangle(700, 300, 745, 250, 790, 300);
  fill(0);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("MERCADO", 745, 310);
  text("Venda Grãos", 745, 330);
  textAlign(LEFT, BASELINE);

  //chão
  fill(50); // Cinza escuro
  rect(0, 350, width, height - 350);
  fill(255, 255, 0); // Amarelo
  rect(80, 400, 40, 10);
  rect(140, 400, 40, 10);
  rect(200, 400, 40, 10);
  rect(260, 400, 40, 10);
  rect(320, 400, 40, 10);
  rect(380, 400, 40, 10);
  rect(440, 400, 40, 10);
  rect(500, 400, 40, 10);
  rect(560, 400, 40, 10);
  rect(620, 400, 40, 10);
  rect(680, 400, 40, 10);
  rect(740, 400, 40, 10);

  // Estrada: uma faixa cinza escura logo abaixo da calçada
  fill(50); // Cinza escuro
  rect(0, 450, width, height - 450); // Começa em Y=450 (logo abaixo da calçada), vai até o fim da tela

  // FIM DO CÓDIGO DO CENÁRIO DA CIDADE

  // Exibir dinheiro na cidade
  fill(255, 255, 0);
  textSize(18);
  text(`Dinheiro: $${dinheiroJogador}`, width - 150, 50);

  fill(255);
  textSize(20);
  text("CENA: CIDADE", width / 2 - 80, 50);
  textSize(14);
  text("Você encontrou novas oportunidades!", 50, 510);
  text("pressione 'I' no centro de investimrntos para investir", 50, 530);
  text("Pressione 'V' no mercado para vender.", 50, 550);
  text("Pressione 'R' para voltar para o campo.", 50, 570);
}

// --- Função para Desenhar o Jogador ---
function desenharJogador(x, y) {
  // Cabeça
  fill("#774B3B");
  circle(x, y - 20, 40);
  // Corpo
  fill("#4682B4");
  rect(x - 15, y, 30, 50);
  // Braços
  fill("#774B3B");
  rect(x - 25, y + 5, 10, 30);
  rect(x + 15, y + 5, 10, 30);
  // Pernas
  fill("#2F4F4F");
  rect(x - 12, y + 50, 10, 30);
  rect(x + 2, y + 50, 10, 30);

  //Texto "J" para identificação
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("J", x, y + 10);
  textAlign(LEFT, BASELINE);
}

// --- Função para Desenhar a Caixa de Diálogo ---
function desenharDialogo() {
  fill(0, 0, 0, 180); // Preto semi-transparente
  rect(50, height - 150, width - 100, 100, 10);

  // Texto do diálogo
  fill(255);
  textSize(16);
  // Usando a função text com múltiplos argumentos para quebrar o texto
  text(dialogoAtual[linhaDialogoAtual], 60, height - 120, width - 120, 80);
  textSize(12);
  text("Pressione ESPAÇO para continuar...", width - 250, height - 70);
}

// --- Função para o Final Bom ---
function desenharFinalBom() {
  background(50, 150, 250);
  fill(255, 255, 0);
  ellipse(width - 100, 100, 150, 150);

  // Chão
  fill(80, 180, 50);
  rect(0, height - 200, width, 200);

  // --- ESCOLA DO SEU CÓDIGO ANTERIOR NO FINAL BOM ---
  // Adaptei as coordenadas para que fique centralizada e na área visível do final bom
  let escolaFinalX = width / 2 - 200; // Começa um pouco mais à esquerda para caber tudo
  let escolaFinalY = height - 400; // Posição vertical ajustada

  fill("rgb(6,109,44)"); // Cor da base
  rect(escolaFinalX, escolaFinalY + 200, 400, 100); // Base da escola (ajustada para as novas coordenadas)

  fill("rgb(168,0,0)"); // Cor da estrutura
  rect(escolaFinalX + 50, escolaFinalY, 300, 200); // Corpo principal
  rect(escolaFinalX + 150, escolaFinalY - 100, 100, 300); // Torre central

  fill("orange"); // Cor do telhado
  // Triângulo principal
  triangle(
    escolaFinalX + 50,
    escolaFinalY,
    escolaFinalX + 200,
    escolaFinalY - 120,
    escolaFinalX + 350,
    escolaFinalY
  );
  // Triângulo da torre
  triangle(
    escolaFinalX + 150,
    escolaFinalY - 100,
    escolaFinalX + 200,
    escolaFinalY - 180,
    escolaFinalX + 250,
    escolaFinalY - 100
  );

  fill("#583326"); // Marrom da porta
  rect(escolaFinalX + 175, escolaFinalY + 100, 50, 100); // Porta

  fill("#DAD4D4"); // Cinza das janelas/elementos
  rect(escolaFinalX + 150, escolaFinalY + 20, 100, 50); // Janela no corpo principal
  circle(escolaFinalX + 190, escolaFinalY + 150, 10); // Detalhe da porta
  circle(escolaFinalX + 210, escolaFinalY + 150, 10); // Detalhe da porta

  fill("#498CDD"); // Azul das outras janelas
  rect(escolaFinalX + 60, escolaFinalY + 120, 40, 30);
  rect(escolaFinalX + 60, escolaFinalY + 50, 40, 30);
  rect(escolaFinalX + 110, escolaFinalY + 120, 40, 30);
  rect(escolaFinalX + 110, escolaFinalY + 50, 40, 30);
  rect(escolaFinalX + 250, escolaFinalY + 120, 40, 30);
  rect(escolaFinalX + 250, escolaFinalY + 50, 40, 30);
  rect(escolaFinalX + 300, escolaFinalY + 120, 40, 30);
  rect(escolaFinalX + 300, escolaFinalY + 50, 40, 30);

  // Texto na escola
  textSize(20);
  fill("black");
  textAlign(CENTER);
  text("ESCOLA", escolaFinalX + 200, escolaFinalY + 30); // Posicionado no centro da torre
  textAlign(LEFT, BASELINE); // Reseta alinhamento

  // --- Desenho de Crianças Brincando (Versão Simplificada) ---
  // Você pode ajustar as posições e o número de crianças conforme desejar
  drawSimpleChild(escolaFinalX + 100, height - 120);
  drawSimpleChild(escolaFinalX + 200, height - 100);
  drawSimpleChild(escolaFinalX + 300, height - 130);

  // Textos do final
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("O FUTURO FOI SEMEADO!", width / 2, 50);

  textSize(24);
  text("Graças ao seu investimento, a comunidade prospera!", width / 2, 100);

  // Texto de "FIM DE JOGO" e instrução para reiniciar
  textSize(20);
  text("FIM DE JOGO!", width / 2, height - 100);

  textSize(16);
  text("Pressione 'R' para jogar novamente.", width / 2, height - 50);

  textAlign(LEFT, BASELINE);
}

// --- Função para Desenhar CRIANÇAS ---
function drawSimpleChild(x, y) {
  // Cabeça
  fill(255, 220, 180); // Cor de pele clara
  circle(x, y - 25, 25); // Cabeça

  // Corpo
  let r = random(100, 250); // Cor da roupa aleatória
  let g = random(100, 250);
  let b = random(100, 250);
  fill(r, g, b);
  rect(x - 15, y - 10, 30, 40); // Corpo (retângulo)

  // Pernas
  fill(255, 220, 180); // Cor de pele
  rect(x - 12, y + 30, 10, 20); // Perna esquerda
  rect(x + 2, y + 30, 10, 20); // Perna direita

  // Braços (simples, fixos)
  rect(x - 25, y - 5, 10, 25); // Braço esquerdo
  rect(x + 15, y - 5, 10, 25); // Braço direito
}

// --- Funções de Interação ---

function keyPressed() {
  console.log(
    `[DEBUG] Tecla pressionada: keyCode = ${keyCode}. emDialogo = ${emDialogo}`
  );

  // --- Lógica de Diálogo ---

  if (emDialogo) {
    if (keyCode === 32) {
      linhaDialogoAtual++;
      console.log(
        `[DEBUG] Diálogo: Linha ${linhaDialogoAtual}/${dialogoAtual.length}`
      );

      if (linhaDialogoAtual >= dialogoAtual.length) {
        // O diálogo terminou
        emDialogo = false;
        linhaDialogoAtual = 0; // Reseta para o próximo diálogo
        console.log(" Diálogo finalizado. 'emDialogo' setado para false.");
        // Se o diálogo era o de investimento bem-sucedido, muda para a cena final
        if (dialogoAtual === dialogoInvestimentoSucesso) {
          cenaAtual = "finalBom";
        } else {
          // Volta para a cena que estava antes do diálogo
          cenaAtual = ultimaCenaAntesDoDialogo;
        }
        console.log(`[DEBUG] Voltando para a cena: ${cenaAtual}`);
      }
    }
    return; // Muito importante: Sai da função para não processar outras teclas enquanto em diálogo
  }

  // --- Lógica de Ações do Jogo (Só funciona se NÃO estiver em diálogo ou no final) ---
  if (cenaAtual === "finalBom") {
    if (keyCode === 82) {
      // Tecla 'R'
      location.reload();
    }
    return;
  }

  // --- Transição de Cenas ---
  if (keyCode === ENTER) {
    console.log(" Tecla ENTER processada. Tentando ir para a cidade.");
    if (cenaAtual === "campo") {
      if (dist(jogadorX, jogadorY, 400, 300) < 150) {
        // Ajuste a distância para a nova casa
        if (jogador.forca >= 7) {
          // Condição para ir para a cidade
          cenaAtual = "cidade"; // Transição direta para a cidade
          jogador.experiencia += 50; // Ganha XP por chegar na cidade
          jogador.verificarNivel();
          jogadorX = width / 2; // Reposiciona o jogador na cidade
          jogadorY = height / 2;
          console.log(
            "CENA: CIDADE - Força suficiente! Transicionando diretamente."
          );
        } else {
          // Se a força não for suficiente, inicia um diálogo informativo
          console.log(
            " CENA: CAMPO - Força insuficiente. Iniciando diálogo informativo."
          );
          iniciarDialogo([
            "Fazendeiro: Você ainda não tem força suficiente para a jornada, jovem.",
            `Sua força atual é ${jogador.forca}. Precisa de 7.`,
            "Trabalhe mais no campo antes de partir!",
          ]);
        }
      } else {
        console.log(
          " CENA: CAMPO - Você precisa estar perto da casa para ir para a cidade."
        );
        iniciarDialogo([
          "Fazendeiro: Clique 'ENTER' perto da casa para ir para a cidade.",
        ]);
      }
    }
  }
  // Transição de Cena de Volta para o Campo ou Cidade
  else if (keyCode === 82) {
    // Tecla 'R'
    console.log(" Tecla R processada. Tentando voltar.");
    if (cenaAtual === "cidade") {
      cenaAtual = "campo";
      jogadorX = 400; // Reposiciona o jogador no centro do campo
      jogadorY = 300;
      console.log(" CENA: CAMPO - Você voltou para o campo.");
    }
  }
  // Removido: Nova Interação: Acessar Notas (keyCode === 78)

  // Interação com Objetos (Ex: Casa no Campo)
  else if (keyCode === 69) {
    // Tecla 'E'
    console.log(" Tecla E processada. Tentando interagir.");
    if (cenaAtual === "campo") {
      // Verifica se o jogador está perto da casa
      if (dist(jogadorX, jogadorY, 400, 300) < 150) {
        // Ajuste a distância para a nova casa
        console.log(
          " CENA: CAMPO - Perto da casa. Iniciando diálogo principal."
        );
        iniciarDialogo(dialogoCampo); // Chama o diálogo do fazendeiro
        casaInteragida = true; // Define que a casa foi interagida
        console.log(" 'casaInteragida' definida como true.");
      } else {
        console.log(
          " CENA: CAMPO - Você não está perto de nada para interagir."
        );
      }
    }
  }
  // --- Interação: Treinar no Campo ---
  else if (keyCode === 84) {
    // Tecla 'T'
    console.log(" Tecla T processada. Tentando treinar.");
    if (cenaAtual === "campo") {
      // Verifica se o jogador está perto da Área de Treinamento
      // Centro aproximado da sua área de treinamento
      if (dist(jogadorX, jogadorY, 730, 300) < 150) {
        // Distância ao centro da área de treinamento
        console.log(
          " CENA: CAMPO - Perto da área de treinamento. Iniciando treinamento."
        );
        // O jogador ganha XP e força diretamente
        jogador.ganharExperiencia(20); // Ganha 20 de XP
        jogador.forca += 1; // Aumenta a força em 1 a cada treino
        console.log(
          `Você trabalhou no campo e sentiu-se mais forte! Força atual: ${jogador.forca}`
        );
        iniciarDialogo([
          "Fazendeiro: Bom trabalho, jovem! Você está ficando mais forte.",
          "Continue assim para ter sucesso na cidade.",
        ]);
        jogador.mostrarStatus(); // Atualiza os status no console
      } else {
        console.log(
          " CENA: CAMPO - Você não está perto da área de treinamento."
        );
        iniciarDialogo([
          "Fazendeiro: Venha para a área de treinamento se quiser se fortalecer.",
        ]);
      }
    }
  }
  // --- Interação: Colher Grãos ---
  else if (keyCode === 67) {
    // Tecla 'C'
    console.log(" Tecla C processada. Tentando colher.");
    if (cenaAtual === "campo") {
      // Verifica se o jogador está sobre a Nova Plantação
      if (
        jogadorX > 0 &&
        jogadorX < width &&
        jogadorY > 400 &&
        jogadorY < height
      ) {
        console.log(" CENA: CAMPO - Perto da plantação. Iniciando colheita.");
        if (casaInteragida) {
          // SÓ PERMITE COLHER SE A CASA JÁ FOI INTERAGIDA
          jogador.adicionarItem("grãos", 5); // Ganha 5 grãos
          jogador.ganharExperiencia(10); // Ganha um pouco de XP por colher
          iniciarDialogo([
            "Fazendeiro: A colheita foi boa, jovem!",
            "Esses grãos podem valer um bom dinheiro na cidade.",
          ]);
        } else {
          iniciarDialogo([
            "Fazendeiro: Você deve falar comigo na casa primeiro.",
          ]);
          console.log(" Tentou colher sem interagir com a casa primeiro.");
        }
      } else {
        console.log(" CENA: CAMPO - Você não está perto da plantação.");
      }
    }
  }
  // --- Interação: Vender Grãos na Feira ---
  else if (keyCode === 86) {
    // Tecla 'V'
    console.log(" Tecla V processada. Tentando vender grãos.");
    if (cenaAtual === "cidade") {
      // Verifica se o jogador está perto da Feira
      if (dist(jogadorX, jogadorY, 745, 375) < 100) {
        // Ajustado para o centro da barraca de vendas
        console.log(" CENA: CIDADE - Perto da feira. Iniciando venda.");
        if (jogador.inventario["grãos"] > 0) {
          let quantidadeParaVender = jogador.inventario["grãos"]; // Vende todos os grãos
          let precoPorGrao = 2; // Preço de cada grão
          let dinheiroGanho = quantidadeParaVender * precoPorGrao;

          jogador.removerItem("grãos", quantidadeParaVender);
          dinheiroJogador += dinheiroGanho; // Adiciona dinheiro ao jogador
          console.log(
            `Você vendeu ${quantidadeParaVender} grãos por $${dinheiroGanho}. Dinheiro total: $${dinheiroJogador}`
          );
          iniciarDialogo([
            `Mercador: Ótima venda, jovem! Você ganhou $${dinheiroGanho}.`,
            `Seu dinheiro total agora é $${dinheiroJogador}.`,
            "Traga mais quando tiver!",
          ]);
          jogador.mostrarStatus(); // Atualiza os status no console
        } else {
          console.log(" CENA: CIDADE - Sem grãos para vender.");
          iniciarDialogo([
            "Mercador: Você não tem grãos para vender, jovem.",
            "Traga-me alguns para fazer um bom negócio!",
          ]);
        }
      } else {
        console.log(" CENA: CIDADE - Você não está perto da feira.");
        iniciarDialogo([
          "Mercador: Venha até a feira se quiser vender seus produtos.",
        ]);
      }
    }
  }
  // --- Interação para Investir na Cidade ---
  else if (keyCode === 73) {
    // Tecla 'I' para Investir
    console.log(" Tecla I processada. Tentando investir.");
    if (cenaAtual === "cidade") {
      // Verifica se o jogador está perto da Prefeitura
      if (dist(jogadorX, jogadorY, 575, 250) < 150) {
        // Ajustado para o centro da prefeitura aprimorada
        console.log(" CENA: CIDADE - Perto da Prefeitura. Tentando investir.");
        if (dinheiroJogador >= CUSTO_FINAL_BOM) {
          dinheiroJogador -= CUSTO_FINAL_BOM; // Gasta o dinheiro
          iniciarDialogo(dialogoInvestimentoSucesso); // Inicia diálogo de sucesso
          // A mudança para cena "finalBom" agora é feita no final do diálogo
        } else {
          iniciarDialogo([
            `Prefeito: Você precisa de $${CUSTO_FINAL_BOM} para`,
            `fazer este grande investimento.`,
            `Você tem apenas $${dinheiroJogador}.`,
            "Continue trabalhando e volte quando tiver mais.",
          ]);
          console.log(
            `[DEBUG] Não tem dinheiro suficiente para investir. Dinheiro atual: $${dinheiroJogador}`
          );
        }
      } else {
        console.log(
          " CENA: CIDADE - Você não está perto da Prefeitura para investir."
        );
        iniciarDialogo([
          "Prefeito: Venha até a Prefeitura se quiser discutir um futuro melhor para nossa comunidade.",
        ]);
      }
    }
  }
} // Fim da função keyPressed

// --- Função para Iniciar um Diálogo ---
function iniciarDialogo(linhas) {
  ultimaCenaAntesDoDialogo = cenaAtual; // Guarda a cena atual antes de entrar no diálogo
  dialogoAtual = linhas;
  linhaDialogoAtual = 0;
  emDialogo = true;
  cenaAtual = "dialogo"; // Muda a cena para "dialogo"
  console.log(" Diálogo iniciado. Cena alterada para 'dialogo'.");
}

// --- Diálogos Pré-definidos ---
const dialogoCampo = [
  "Um fazendeiro: Olá, jovem! Vejo que está pensando em novos horizontes.",
  "Para ter sucesso na cidade, você precisará de determinação e alguma experiência.",
  "Trabalhe na fazenda e aumente sua força antes de partir.",
];

// --- Diálogo para o Investimento Bem-sucedido (texto ajustado) ---
const dialogoInvestimentoSucesso = [
  "Prefeito: Parabéns, jovem!",
  "Seu investimento foi fundamental!",
  "Com este dinheiro, vamos construir uma nova escola para as crianças do campo",
  "e modernizar nossas plantações.",
  "Sua visão e esforço transformaram nossa comunidade para sempre!",
  "Você se tornou uma lenda... O futuro foi semeado!",
];

// --- Classe Jogador (com alguns atributos e métodos) ---
class Jogador {
  constructor(nome, forca, inteligencia, carisma) {
    this.nome = nome;
    this.forca = forca;
    this.inteligencia = inteligencia;
    this.carisma = carisma;
    this.nivel = 1;
    this.experiencia = 0;
    this.inventario = { grãos: 0 }; // Inventário agora é um objeto para contar itens
  }

  mostrarStatus() {
    console.log(`--- Status do Jogador ---`);
    console.log(`Nome: ${this.nome}`);
    console.log(`Nível: ${this.nivel}`);
    console.log(`XP: ${this.experiencia}`);
    console.log(`Força: ${this.forca}`);
    console.log(`Inteligência: ${this.inteligencia}`);
    console.log(`Carisma: ${this.carisma}`);
    console.log(`Inventário: Grãos - ${this.inventario["grãos"]}`); // Mostra a quantidade de grãos
    console.log(`Dinheiro: $${dinheiroJogador}`); // Mostra o dinheiro
    console.log(`-------------------------`);
  }

  ganharExperiencia(xp) {
    this.experiencia += xp;
    console.log(`Você ganhou ${xp} de XP!`);
    this.verificarNivel();
  }

  verificarNivel() {
    // Lógica simples de leveling
    const xpParaProximoNivel = this.nivel * 100;
    if (this.experiencia >= xpParaProximoNivel) {
      this.nivel++;
      this.forca++; // Atributos aumentam ao subir de nível
      this.inteligencia++;
      this.carisma++;
      this.experiencia -= xpParaProximoNivel; // Reseta o XP para o próximo nível
      console.log(`PARABÉNS! Você subiu para o Nível ${this.nivel}!`);
      this.mostrarStatus();
    }
  }

  // --- Método para adicionar itens ao inventário (com quantidade) ---
  adicionarItem(item, quantidade = 1) {
    if (this.inventario[item] !== undefined) {
      this.inventario[item] += quantidade;
    } else {
      this.inventario[item] = quantidade; // Adiciona novo item se não existir
    }
    console.log(`Você pegou ${quantidade} de ${item}!`);
    this.mostrarStatus();
  }

  // --- Método para remover itens do inventário (com quantidade) ---
  removerItem(item, quantidade = 1) {
    if (
      this.inventario[item] !== undefined &&
      this.inventario[item] >= quantidade
    ) {
      this.inventario[item] -= quantidade;
      console.log(`Você usou/vendeu ${quantidade} de ${item}!`);
      this.mostrarStatus();
      return true; // Sucesso na remoção
    } else {
      console.log(`Você não tem ${quantidade} de ${item} para remover.`);
      return false; // Falha na remoção
    }
  }
}
