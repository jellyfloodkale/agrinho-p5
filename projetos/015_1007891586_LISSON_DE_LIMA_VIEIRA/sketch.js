/*
Para iniciar o jogo clique no play, coloque seu nome e clique na tela

Para movimentar o personagem clique nas setas

Para plantar: se aproxime da área de plantio e clique "P"

Para voltar para a fazenda após entrar em alguma área clique "C"

Para ir à cidade vender clique "V" (para vender clique nos respectivos números das plantas)

Para comprar sementes clique "L"(para comprar a semente que você que clique o número respectivo da semente)

Para ir pescar se aproxime do rio no canto esquerdo da tela a clique "X" (clique "E"para lançar a linha quando um peixe morder clique espaço para o pegar. Seja rápido se não o peixe escapa)

Para fazer a expanção da área de plantio, e comprar uma casa na cidade clique "F" (compre os com o dinheiro das vendas)

Para entrar em sua casa após compra-la clique "ENTER"

SEU OBJETIVO É COMPRAR UMA CASA NA CIDADE.

Espero que goste obrigado por ler as intruções no código!!!

*/
// --- Variáveis do Jogo ---

// Personagem
let nomeJogador = "";
let personagemX;
let personagemY;
let personagemLargura = 40;
let personagemAltura = 60;
let velocidadePersonagem = 5;
let corPele = [255, 220, 180];
let corCabelo = [139, 69, 19]; // Marrom para o cabelo
let corRoupa = [70, 130, 180]; // Azul aço para a roupa

// Legumes (Cenoura, Alface, Tomate, Batata, Milho)
let legumesInfo = { // Objeto para armazenar as informações dos legumes
  cenoura: {
    nome: "Cenoura",
    quantidadePlantada: 0,
    quantidadeParaPlantar: 5, // Meta inicial para levar à cidade
    precoVenda: 2.50,
    cor: [255, 165, 0], // Laranja
    precoSemente: 1.00, // Preço da semente
    sementesDisponiveis: 5 // Sementes iniciais
  },
  alface: {
    nome: "Alface",
    quantidadePlantada: 0,
    quantidadeParaPlantar: 3, // Meta inicial
    precoVenda: 1.80,
    cor: [34, 139, 34], // Verde Floresta
    precoSemente: 0.80,
    sementesDisponiveis: 3 // Sementes iniciais
  },
  tomate: {
    nome: "Tomate",
    quantidadePlantada: 0,
    quantidadeParaPlantar: 4, // Nova meta
    precoVenda: 3.00,
    cor: [255, 0, 0], // Vermelho
    precoSemente: 1.20,
    sementesDisponiveis: 0 // Começa sem sementes de tomate
  },
  batata: { // Novo legume!
    nome: "Batata",
    quantidadePlantada: 0,
    quantidadeParaPlantar: 6,
    precoVenda: 2.00,
    cor: [205, 133, 63], // Marrom claro
    precoSemente: 0.90,
    sementesDisponiveis: 0
  },
  milho: { // Novo legume!
    nome: "Milho",
    quantidadePlantada: 0,
    quantidadeParaPlantar: 3,
    precoVenda: 3.50,
    cor: [255, 255, 0], // Amarelo
    precoSemente: 1.50,
    sementesDisponiveis: 0
  }
};

// Área de plantio
let areasPlantio = [];
let maxLegumesPorArea = 25; // Quantos legumes cabem em cada área
let custoNovaArea = 50.00; // Custo para comprar uma nova área

// Modos de Jogo
let modoVenda = false; // Indica se estamos no modo de vendas
let modoLojaSementes = false; // Indica se estamos na loja de sementes
let modoLojaFazenda = false; // Indica se estamos na loja de expansão da fazenda
let modoPesca = false; // Indica se estamos no modo de pesca

let dinheiro = 0.00;

// Cores para os ambientes e elementos
let corTerrenoBase = [139, 69, 19]; // Marrom
let corTerrenoClaro = [160, 82, 45]; // Marrom mais claro para detalhes
let corTenda = [165, 42, 42]; // Marrom avermelhado
let corTendaSombra = [130, 30, 30]; // Sombra da tenda
let corLoja = [200, 200, 200]; // Cinza claro para a loja
let corSol = [255, 223, 0]; // Amarelo para o sol
let corNuvem = [240, 240, 240]; // Branco acinzentado para as nuvens

// Mensagens de feedback
let mensagem = "";
let tempoMensagem = 0;
const DURACAO_MENSAGEM = 120; // Duração da mensagem em frames (aprox. 2 segundos a 60fps)

// NOVO: Variáveis para o Local de Pesca
let localPescaX = 600; // Posição X do local de pesca
let localPescaY = 400; // Posição Y do local de pesca
let localPescaLargura = 180;
let localPescaAltura = 100;

// NOVO: Peixe
let peixeInfo = {
  nome: "Peixe Fresco",
  quantidadePescada: 0,
  precoVenda: 5.00, // Preço por peixe
};

// NOVO: Cores para o ambiente de pesca
let corAgua = [60, 150, 200]; // Azul da água
let corBarco = [150, 75, 0]; // Marrom para o barco
let corBordaBarco = [100, 50, 0]; // Marrom escuro para a borda do barco
let corLinhaPesca = [50, 50, 50]; // Cinza escuro
let corBoia = [255, 0, 0]; // Vermelho para a boia

// NOVO: Variáveis de estado da pesca
let estaPescando = false;
let tempoParaPescar = 0;
const DURACAO_PESCA = 180; // Tempo em frames para a pesca (aprox. 3 segundos)
let isFishOnHook = false; // Indica se um peixe mordeu a isca
let peixeMordeuTempo = 0; // Tempo que o peixe está na isca
const TEMPO_REACAO_PESCA = 60; // Tempo em frames para o jogador reagir

// NOVO: Pedaço do Rio na Fazenda
let rioFazendaX = 0;
let rioFazendaY = 300;
let rioFazendaLargura = 120; // Largura do rio
let rioFazendaAltura = 300; // Altura do rio (até a parte de baixo da tela)

// NOVO: Variáveis para a Casa e Objetivo
let casaComprada = false;
const CUSTO_CASA = 500.00; // Custo para comprar a casa

// Posição e dimensões da casa na fazenda (ajuste conforme o layout da sua fazenda)
let casaX = 650;
let casaY = 250;
let casaLargura = 120;
let casaAltura = 150;
let portaLargura = 30;
let portaAltura = 50;
let portaX; // Calculado no setup
let portaY; // Calculado no setup

// NOVO: Modo de Comemoração
let modoComemoracao = false;
let tempoComemoracao = 0;
const DURACAO_COMEMORACAO = 300; // Duração da tela de comemoração em frames

// NOVO: Modo Casa (para o interior da casa)
let modoCasa = false;


// --- Configuração Inicial ---
function setup() {
  createCanvas(800, 600);
  personagemX = width / 2;
  personagemY = height - personagemAltura - 10;
  textAlign(CENTER, CENTER);
  textSize(16);
  noStroke();

  // NOVO: Pergunta o nome do jogador ao iniciar o jogo
  nomeJogador = prompt("Bem-vindo à Fazenda! Qual é o seu nome?");

  // NOVO: Bônus de dinheiro se o nome for "Alisson"
  if (nomeJogador && nomeJogador.toLowerCase() === 'alisson') {
    dinheiro += 500.00;
    exibirMensagem("Bem-vindo, Alisson! Você ganhou um bônus de R$ 500,00!");
  } else {
    exibirMensagem("Bem-vindo(a), " + nomeJogador + "! Comece sua jornada na fazenda.");
  }

  // Inicia com uma área de plantio
  areasPlantio.push({ x: 150, y: 200, largura: 400, altura: 150 });

  // Calcula a posição da porta
  portaX = casaX + casaLargura / 2 - portaLargura / 2;
  portaY = casaY + casaAltura - portaAltura;
}

// --- Desenho Principal ---
function draw() {
  if (modoComemoracao) {
    desenharComemoracao();
  } else if (modoCasa) { // NOVO: Desenha o interior da casa
    desenharInteriorCasa();
  } else {
    background(135, 206, 235); // Céu azul

    // Elementos do céu
    desenharSol(width - 100, 100);
    desenharNuvens();

    if (modoLojaSementes) {
      desenharLojaSementes();
    } else if (modoLojaFazenda) {
      desenharLojaFazenda();
    } else if (modoVenda) {
      desenharTenda();
      desenharInterfaceVenda();
    } else if (modoPesca) {
      desenharLocalPesca();
      desenharInterfacePesca();
      logicaPesca();
    } else {
      // --- Modo de Jogo: Fazenda (Plantio) ---
      desenharGrama(); // NOVO: Desenha a grama de fundo
      desenharRioFazenda(); // NOVO: Desenha o pedaço do rio
      desenharCasa(); // NOVO: Desenha a casa na fazenda
      desenharTerrenos(); // Desenha todas as áreas de plantio
      desenharLegumesPlantados(); // Desenha antes do personagem para profundidade
      desenharPersonagem();
      moverPersonagem();
      desenharStatusPlantio();
      verificarProntoParaVender();
      desenharAvisosFazenda();
      verificarEntradaCasa(); // NOVO: Chama a verificação para entrar na casa
    }

    // Desenhar dinheiro e mensagens de feedback
    fill(0);
    noStroke();
    text(`Dinheiro: R$ ${nf(dinheiro, 0, 2)}`, 100, 20); // Posição fixa do dinheiro
    desenharMensagem();
  }
}

// --- Funções de Desenho Aprimoradas ---

function desenharSol(x, y) {
  fill(corSol);
  ellipse(x, y, 80, 80); // Corpo do sol
  // Raios do sol
  for (let i = 0; i < 12; i++) {
    push();
    translate(x, y);
    rotate(TWO_PI / 12 * i);
    rect(30, -5, 20, 10); // Raios
    pop();
  }
}

function desenharNuvens() {
  fill(corNuvem);
  // Nuvem 1
  ellipse(150, 80, 80, 60);
  ellipse(190, 90, 70, 50);
  ellipse(120, 90, 60, 40);
  // Nuvem 2
  ellipse(600, 120, 90, 70);
  ellipse(640, 110, 80, 60);
  ellipse(570, 130, 70, 50);
}

function desenharPersonagem() {
  push();
  translate(personagemX, personagemY);

  // Corpo (principal: elipse maior)
  fill(corRoupa);
  ellipse(personagemLargura / 2, personagemAltura * 0.5, personagemLargura * 0.8, personagemAltura * 0.6); // Corpo
  fill(corRoupa[0] - 20, corRoupa[1] - 20, corRoupa[2] - 20); // Sombra do corpo
  ellipse(personagemLargura / 2 + 3, personagemAltura * 0.5 + 3, personagemLargura * 0.8, personagemAltura * 0.6);

  // Pernas (elipses menores para simular pernas arredondadas)
  fill(corRoupa);
  ellipse(personagemLargura * 0.3, personagemAltura * 0.9, personagemLargura * 0.4, personagemAltura * 0.2); // Perna esquerda
  ellipse(personagemLargura * 0.7, personagemAltura * 0.9, personagemLargura * 0.4, personagemAltura * 0.2); // Perna direita

  // Braços (elipses ou formas personalizadas para serem mais arredondadas)
  fill(corRoupa);
  ellipse(personagemLargura * 0.05, personagemAltura * 0.45, 15, 30); // Braço esquerdo
  ellipse(personagemLargura * 0.95, personagemAltura * 0.45, 15, 30); // Braço direito

  // Mãos (pequenos círculos)
  fill(corPele);
  ellipse(personagemLargura * 0.05, personagemAltura * 0.6, 10, 10); // Mão esquerda
  ellipse(personagemLargura * 0.95, personagemAltura * 0.6, 10, 10); // Mão direita

  // Cabeça
  fill(corPele);
  ellipse(personagemLargura / 2, personagemAltura * 0.2, personagemLargura * 0.7, personagemLargura * 0.7);

  // Cabelo
  fill(corCabelo);
  arc(personagemLargura / 2, personagemAltura * 0.15, personagemLargura * 0.8, personagemLargura * 0.5, PI, TWO_PI);
  ellipse(personagemLargura * 0.25, personagemAltura * 0.2, 8, 8); // Orelha esquerda
  ellipse(personagemLargura * 0.75, personagemAltura * 0.2, 8, 8); // Orelha direita

  // Olhos
  fill(0);
  ellipse(personagemLargura * 0.35, personagemAltura * 0.18, 5, 5);
  ellipse(personagemLargura * 0.65, personagemAltura * 0.18, 5, 5);

  // Boca (simples)
  fill(150, 0, 0);
  arc(personagemLargura / 2, personagemAltura * 0.25, 10, 5, 0, PI);

  pop();
}

// NOVO: Desenha a grama de fundo na fazenda
function desenharGrama() {
  fill(124, 252, 0); // Verde grama
  rect(0, height * 0.3, width, height * 0.7); // Ajusta a área da grama
}

// NOVO: Desenha o pedaço do rio na fazenda
function desenharRioFazenda() {
  fill(corAgua);
  rect(rioFazendaX, rioFazendaY, rioFazendaLargura, rioFazendaAltura);
  // Desenha algumas ondulações simples
  stroke(corAgua[0] + 20, corAgua[1] + 20, corAgua[2] + 20);
  line(rioFazendaX + 10, rioFazendaY + 20, rioFazendaX + 50, rioFazendaY + 25);
  line(rioFazendaX + 70, rioFazendaY + 40, rioFazendaX + 110, rioFazendaY + 35);
  noStroke();
}

// NOVO: Função para desenhar a casa
function desenharCasa() {
  if (casaComprada) {
    // Corpo da casa
    fill(180, 150, 100); // Cor da parede
    rect(casaX, casaY, casaLargura, casaAltura);

    // Telhado
    fill(100, 50, 0); // Cor do telhado
    triangle(casaX, casaY,
      casaX + casaLargura, casaY,
      casaX + casaLargura / 2, casaY - 50);

    // Porta
    fill(80, 40, 0); // Cor da porta
    rect(portaX, portaY, portaLargura, portaAltura);

    // Maçaneta
    fill(200, 200, 0);
    ellipse(portaX + portaLargura - 8, portaY + portaAltura / 2, 5, 5);

    // Janelas
    fill(150, 200, 255); // Azul claro para janelas
    rect(casaX + 15, casaY + 20, 30, 30);
    rect(casaX + casaLargura - 45, casaY + 20, 30, 30);
  } else {
    // Desenha um "terreno" para a casa não comprada
    fill(100, 80, 50); // Cor de terreno baldio
    rect(casaX, casaY + casaAltura - 50, casaLargura, 50);
    fill(0);
    textSize(14);
    text("Terreno para Casa", casaX + casaLargura / 2, casaY + casaAltura - 20);
    textSize(16);
  }
}

// NOVO: Função para desenhar o interior da casa
function desenharInteriorCasa() {
  background(130, 100, 70); // Cor das paredes (ex: bege)

  // Chão de madeira
  fill(80, 60, 40); // Cor do chão (madeira escura)
  rect(0, height * 0.7, width, height * 0.3); // Ocupa a parte inferior da tela para o chão
  for (let i = 0; i < width; i += 40) { // Linhas para simular tábuas
    stroke(70, 50, 30);
    line(i, height * 0.7, i, height);
  }
  noStroke();

  // Tapete fofinho
  fill(150, 50, 50, 200); // Vermelho queimado com transparência
  rect(width / 2 - 100, height * 0.75, 200, 80, 20); // Borda arredondada

  // Cama (cantinho para descansar)
  fill(120, 80, 40); // Base da cama (madeira)
  rect(50, height * 0.7 - 80, 80, 60);
  fill(200, 220, 255); // Lençóis claros
  rect(50, height * 0.7 - 75, 80, 50, 5);
  fill(180, 150, 100); // Travesseiro
  rect(60, height * 0.7 - 70, 20, 15);

  // Mesa com uma planta (para um toque verde)
  fill(120, 80, 40);
  ellipse(width - 100, height * 0.7 - 40, 60, 40); // Mesa redonda
  fill(50, 100, 50); // Planta na mesa
  ellipse(width - 100, height * 0.7 - 65, 20, 25);
  fill(0);
  rect(width - 105, height * 0.7 - 55, 10, 10); // Vaso

  // Estante de livros (simples)
  fill(90, 60, 30);
  rect(width - 200, height * 0.7 - 100, 30, 80); // Lateral 1
  rect(width - 160, height * 0.7 - 100, 30, 80); // Lateral 2
  fill(150, 100, 50);
  rect(width - 195, height * 0.7 - 90, 25, 5); // Prateleira 1
  rect(width - 195, height * 0.7 - 50, 25, 5); // Prateleira 2
  fill(100, 0, 0); // Livros
  rect(width - 190, height * 0.7 - 85, 15, 10);
  fill(0, 0, 100);
  rect(width - 170, height * 0.7 - 45, 15, 10);

  // Janela com vista para o "exterior" (um céu simplificado)
  fill(150, 200, 255); // Azul claro para a janela
  rect(width / 2 - 50, 150, 100, 80);
  fill(0, 0, 0, 50); // Moldura da janela
  rect(width / 2 - 55, 145, 110, 90, 5);
  fill(255);
  textSize(24);
  text("Seu Doce Lar!", width / 2, height / 2);
  textSize(16);
  text("Pressione 'C' para sair da casa e voltar para a fazenda.", width / 2, height - 50);
}

function desenharTerrenos() {
  fill(corTerrenoBase);
  for (let area of areasPlantio) {
    rect(area.x, area.y, area.largura, area.altura);
    // Detalhes do terreno (montinhos de terra)
    fill(corTerrenoClaro);
    for (let i = 0; i < floor(area.largura / 80); i++) {
      ellipse(area.x + 50 + i * 80, area.y + 20, 40, 20);
      ellipse(area.x + 30 + i * 80, area.y + area.altura - 20, 50, 25);
    }
  }
}

function desenharLegumesPlantados() {
  // Para cada área de plantio, desenha os legumes
  for (let area of areasPlantio) {
    let startX = area.x + 30;
    let startY = area.y + 40;
    let espacamentoX = 60;
    let espacamentoY = 50;
    let colunas = floor(area.largura / espacamentoX);

    let legumesNaAreaContador = 0; // Contador de legumes para o posicionamento dentro da área

    // Iterar sobre todos os legumes para desenhar os que foram plantados
    for (let key in legumesInfo) {
      let legume = legumesInfo[key];
      for (let i = 0; i < legume.quantidadePlantada; i++) {
        // Calcula a posição do legume dentro da área atual
        let x = startX + (legumesNaAreaContador % colunas) * espacamentoX;
        let y = startY + floor(legumesNaAreaContador / colunas) * espacamentoY;

        // Verifica se a posição está dentro da área atual antes de desenhar
        if (x < area.x + area.largura - espacamentoX / 2 && y < area.y + area.altura - espacamentoY / 2) {
          push();
          translate(x, y);

          // Sombra base (pequeno círculo escuro embaixo)
          fill(0, 0, 0, 50); // Preto com transparência
          ellipse(0, 15, 20, 10);

          fill(legume.cor);
          if (legume.nome === "Cenoura") {
            // Cenoura
            triangle(-10, 15, 10, 15, 0, -15);
            // Detalhes da cenoura (linhas)
            stroke(legume.cor[0] - 30, legume.cor[1] - 30, legume.cor[2] - 30);
            line(-5, 0, 5, 0);
            line(-7, 5, 7, 5);
            line(-3, -5, 3, -5);
            noStroke();
            // Folhas
            fill(50, 205, 50); // Verde para as folhas
            ellipse(0, -18, 10, 8);
            ellipse(-5, -15, 8, 6);
            ellipse(5, -15, 8, 6);
          } else if (legume.nome === "Alface") {
            // Alface (camadas)
            let c = legume.cor;
            fill(c[0] + 20, c[1] + 20, c[2] + 20); // Camada externa clara
            ellipse(0, 0, 30, 25);
            fill(c); // Camada intermediária
            ellipse(0, 0, 24, 20);
            fill(c[0] - 20, c[1] - 20, c[2] - 20); // Camada interna escura
            ellipse(0, 0, 18, 15);
          } else if (legume.nome === "Tomate") {
            // Tomate
            ellipse(0, 0, 25, 25);
            fill(legume.cor[0] - 30, legume.cor[1] - 30, legume.cor[2] - 30, 100); // Sombra para o tomate
            ellipse(5, 5, 20, 20);
            // Caule e folhas
            fill(0, 100, 0); // Verde escuro para o caule
            rect(-2, -15, 4, 10);
            triangle(-8, -12, 0, -10, -5, -20); // Folha 1
            triangle(8, -12, 0, -10, 5, -20); // Folha 2
          } else if (legume.nome === "Batata") { // Desenho da Batata
            fill(legume.cor);
            ellipse(0, 0, 30, 20); // Corpo oval
            fill(legume.cor[0] - 20, legume.cor[1] - 20, legume.cor[2] - 20, 150);
            ellipse(-5, -5, 5, 3); // "Olhos"
            ellipse(10, 3, 4, 2);
            ellipse(-10, 8, 6, 4);
          } else if (legume.nome === "Milho") { // Desenho do Milho
            fill(legume.cor);
            rect(-10, -15, 20, 30, 5); // Corpo
            fill(100, 150, 50); // Palha verde
            beginShape();
            vertex(10, -15);
            vertex(20, -5);
            vertex(15, 10);
            endShape(CLOSE);
            beginShape();
            vertex(-10, -15);
            vertex(-20, -5);
            vertex(-15, 10);
            endShape(CLOSE);
          }
          pop();
        }
        legumesNaAreaContador++; // Incrementa o contador de legumes desenhados na área atual
      }
    }
  }
}


function desenharStatusPlantio() {
  fill(0);
  noStroke();
  text("Legumes Plantados:", 100, 50);
  let yOffset = 0;
  for (let key in legumesInfo) {
    let legume = legumesInfo[key];
    text(`${legume.nome}: ${legume.quantidadePlantada} / ${legume.quantidadeParaPlantar} (Sementes: ${legume.sementesDisponiveis})`, 100, 70 + yOffset);
    yOffset += 20;
  }
  text(`Áreas de Plantio: ${areasPlantio.length}`, 100, 70 + yOffset + 20);
  text(`Peixes Pescados: ${peixeInfo.quantidadePescada}`, 100, 70 + yOffset + 40); // Exibe peixes na fazenda
}

function desenharTenda() {
  // Fundo da tenda
  background(200, 220, 255); // Um céu mais claro para a cidade

  // Prédios ao fundo
  desenharPredios(width, height);

  // Chão da cidade
  fill(150, 150, 150);
  rect(0, height * 0.7, width, height * 0.3);

  // Base da tenda
  fill(corTenda);
  rect(width / 2 - 100, height / 2 - 70, 200, 140);
  // Telhado
  fill(corTendaSombra); // Parte mais escura do telhado
  triangle(width / 2 - 100, height / 2 - 70,
    width / 2 + 100, height / 2 - 70,
    width / 2, height / 2 - 150);
  fill(corTenda); // Parte mais clara do telhado
  triangle(width / 2 - 90, height / 2 - 70,
    width / 2 + 90, height / 2 - 70,
    width / 2, height / 2 - 140);

  // Balcão de vendas
  fill(180, 100, 50); // Marrom claro
  rect(width / 2 - 80, height / 2 + 40, 160, 30);
  fill(150, 70, 20); // Sombra do balcão
  rect(width / 2 - 80, height / 2 + 65, 160, 5);

  // Placa de "Vendas"
  fill(255, 255, 0, 200); // Amarelo translúcido
  rect(width / 2 - 60, height / 2 - 100, 120, 30, 5); // Borda arredondada
  fill(0);
  text("VENDAS", width / 2, height / 2 - 85);

  fill(0);
  noStroke();
  textSize(20);
  text("Bem-vindo à Tenda de Vendas!", width / 2, height / 2 + 80);
  textSize(16);
  text("Pressione os números para vender:", width / 2, height / 2 + 110);
  text("Pressione 'C' para voltar para a fazenda.", width / 2, height - 50);
}

function desenharInterfaceVenda() {
  fill(0);
  noStroke();

  let yOffset = 0;
  let i = 0;
  // Obtém as chaves do objeto legumesInfo para manter a ordem
  const chavesLegumes = Object.keys(legumesInfo);
  textSize(18); // Aumenta o tamanho do texto para as opções de venda
  for (let key of chavesLegumes) {
    let legume = legumesInfo[key];
    // Só mostra para vender se tiver algo plantado
    if (legume.quantidadePlantada > 0) {
      text(`${i + 1} - Vender ${legume.nome} (${legume.quantidadePlantada} unidades) - R$ ${nf(legume.precoVenda, 0, 2)} cada`, width / 2, height / 2 + 150 + yOffset);
      yOffset += 30;
    }
    i++;
  }

  // NOVO: Adiciona a opção de vender peixe
  if (peixeInfo.quantidadePescada > 0) {
    text(`${i + 1} - Vender ${peixeInfo.nome} (${peixeInfo.quantidadePescada} unidades) - R$ ${nf(peixeInfo.precoVenda, 0, 2)} cada`, width / 2, height / 2 + 150 + yOffset);
    yOffset += 30;
  }
  textSize(16); // Volta ao tamanho normal
}

function desenharLojaSementes() {
  background(corLoja); // Fundo da loja

  // Prateleiras de sementes (ainda retangulares, para funcionalidade de prateleira)
  fill(190, 190, 190);
  rect(width / 2 - 120, height / 2 - 100, 80, 50);
  rect(width / 2 + 40, height / 2 - 100, 80, 50);
  fill(150, 150, 150); // Sombra das prateleiras
  rect(width / 2 - 120, height / 2 - 55, 80, 5);
  rect(width / 2 + 40, height / 2 - 55, 80, 5);

  // Placa da loja
  fill(255, 240, 100); // Amarelo claro
  rect(width / 2 - 100, 50, 200, 50, 10);
  fill(50, 50, 50); // Cor do texto da placa
  textSize(24);
  text("LOJA DE SEMENTES", width / 2, 80);
  textSize(16); // Volta ao tamanho normal

  fill(0);
  noStroke();
  text("Bem-vindo à Loja de Sementes!", width / 2, 130);
  text("Compre sementes para plantar mais!", width / 2, 160);
  text("Pressione o número da semente para comprar:", width / 2, 190);

  let yOffset = 0;
  let i = 0;
  // Obtém as chaves do objeto legumesInfo para manter a ordem
  const chavesLegumes = Object.keys(legumesInfo);
  textSize(18); // Aumenta o tamanho do texto para as opções de compra
  for (let key of chavesLegumes) {
    let legume = legumesInfo[key];
    text(`${i + 1} - Semente de ${legume.nome} - R$ ${nf(legume.precoSemente, 0, 2)} (Você tem: ${legume.sementesDisponiveis})`, width / 2, 230 + yOffset);
    yOffset += 30;
    i++;
  }
  textSize(16); // Volta ao tamanho normal
  text("Pressione 'C' para voltar para a fazenda.", width / 2, height - 50);
}

function desenharLojaFazenda() {
  background(180, 200, 180); // Fundo mais verde para a loja da fazenda
  // Placa da loja
  fill(100, 50, 0);
  rect(width / 2 - 120, 50, 240, 60, 10);
  fill(255);
  textSize(28);
  text("EXPANSÃO DA FAZENDA", width / 2, 85);
  textSize(16);

  fill(0);
  noStroke();
  text("Compre mais terras para expandir sua fazenda!", width / 2, 150);
  text("Cada área pode plantar até " + maxLegumesPorArea + " legumes.", width / 2, 180);

  fill(50, 150, 50); // Botão de compra
  rect(width / 2 - 100, 250, 200, 50, 10);
  fill(255);
  textSize(20);
  text(`1 - Comprar Nova Área (R$ ${nf(custoNovaArea, 0, 2)})`, width / 2, 280);
  textSize(16);

  fill(0);
  text(`Áreas Atuais: ${areasPlantio.length}`, width / 2, 350);

  // NOVO: Opção de comprar a casa na loja da fazenda
  if (!casaComprada) {
    fill(50, 100, 150); // Cor para o botão da casa
    rect(width / 2 - 100, 400, 200, 50, 10);
    fill(255);
    textSize(20);
    text(`2 - Comprar Casa (R$ ${nf(CUSTO_CASA, 0, 2)})`, width / 2, 430);
  } else {
    fill(0, 150, 0);
    textSize(20);
    text("Você já comprou sua casa!", width / 2, 430);
  }
  textSize(16);

  text("Pressione 'C' para voltar para a fazenda.", width / 2, height - 50);
}

// NOVO: Função para desenhar o local de pesca
function desenharLocalPesca() {
  background(135, 206, 235); // Céu azul claro
  desenharSol(width - 100, 100);
  desenharNuvens();

  // Água
  fill(corAgua);
  rect(0, height * 0.5, width, height * 0.5);

  // Barco
  fill(corBarco);
  beginShape();
  vertex(personagemX - 30, personagemY + personagemAltura + 10); // Ponta esquerda
  vertex(personagemX + personagemLargura + 30, personagemY + personagemAltura + 10); // Ponta direita
  vertex(personagemX + personagemLargura + 20, personagemY + personagemAltura + 40); // Canto inferior direito
  vertex(personagemX - 20, personagemY + personagemAltura + 40); // Canto inferior esquerdo
  endShape(CLOSE);
  fill(corBordaBarco); // Borda do barco
  rect(personagemX - 30, personagemY + personagemAltura + 5, personagemLargura + 60, 5); // Borda superior

  // Personagem dentro do barco
  desenharPersonagem();

  // Linha de pesca (se estiver pescando)
  if (estaPescando) {
    stroke(corLinhaPesca);
    strokeWeight(2);
    // Linha da mão do personagem até a boia
    line(personagemX + personagemLargura / 2, personagemY + personagemAltura / 2,
      personagemX + personagemLargura / 2 + 10, height * 0.7 + 20); // Ponto da boia
    noStroke();

    // Boia
    fill(corBoia);
    ellipse(personagemX + personagemLargura / 2 + 10, height * 0.7 + 20, 15, 15);
    fill(255); // Brilho na boia
    ellipse(personagemX + personagemLargura / 2 + 12, height * 0.7 + 18, 5, 5);
  }
}

// Função para desenhar a interface de pesca
function desenharInterfacePesca() {
  fill(0);
  noStroke();
  textSize(20);
  text("Bem-vindo ao Local de Pesca!", width / 2, height - 120);
  textSize(16);

  if (!estaPescando) {
    text("Pressione 'E' para lançar a linha.", width / 2, height - 90);
  } else {
    text("Pescando...", width / 2, height - 90);
    if (isFishOnHook) {
      fill(255, 0, 0);
      textSize(24);
      text("PEIXE NA LINHA! Pressione 'ESPAÇO' para puxar!", width / 2, height - 50);
      fill(0);
      textSize(16);
    }
  }
  text("Pressione 'C' para voltar para a fazenda.", width / 2, height - 20);

  // Mostra a quantidade de peixes pescados
  text(`Peixes Pescados: ${peixeInfo.quantidadePescada}`, 100, 90);
}

// Nova função para desenhar prédios no fundo
function desenharPredios(canvasWidth, canvasHeight) {
  let corPredioBase = [120, 120, 120]; // Cinza escuro
  let corJanela = [255, 255, 0]; // Amarelo para janelas acesas

  // Prédio 1
  fill(corPredioBase);
  rect(50, canvasHeight * 0.7 - 150, 80, 150); // Base do prédio
  fill(corPredioBase[0] - 20, corPredioBase[1] - 20, corPredioBase[2] - 20); // Sombra
  rect(50 + 5, canvasHeight * 0.7 - 150 + 5, 80, 150);
  // Janelas
  fill(corJanela);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 2; x++) {
      rect(60 + x * 35, canvasHeight * 0.7 - 140 + y * 35, 15, 20);
    }
  }

  // Prédio 2
  fill(corPredioBase);
  rect(180, canvasHeight * 0.7 - 100, 60, 100);
  fill(corPredioBase[0] - 20, corPredioBase[1] - 20, corPredioBase[2] - 20); // Sombra
  rect(180 + 5, canvasHeight * 0.7 - 100 + 5, 60, 100);
  // Janelas
  fill(corJanela);
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 1; x++) {
      rect(190 + x * 25, canvasHeight * 0.7 - 90 + y * 30, 15, 20);
    }
  }

  // Prédio 3 (maior)
  fill(corPredioBase);
  rect(canvasWidth - 150, canvasHeight * 0.7 - 200, 100, 200);
  fill(corPredioBase[0] - 20, corPredioBase[1] - 20, corPredioBase[2] - 20); // Sombra
  rect(canvasWidth - 150 + 7, canvasHeight * 0.7 - 200 + 7, 100, 200);
  // Janelas
  fill(corJanela);
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 2; x++) {
      rect(canvasWidth - 140 + x * 40, canvasHeight * 0.7 - 190 + y * 35, 20, 25);
    }
  }

  // Prédio 4 (menor, à direita)
  fill(corPredioBase);
  rect(canvasWidth - 280, canvasHeight * 0.7 - 120, 70, 120);
  fill(corPredioBase[0] - 20, corPredioBase[1] - 20, corPredioBase[2] - 20); // Sombra
  rect(canvasWidth - 280 + 5, canvasHeight * 0.7 - 120 + 5, 70, 120);
  // Janelas
  fill(corJanela);
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 2; x++) {
      rect(canvasWidth - 270 + x * 28, canvasHeight * 0.7 - 110 + y * 30, 15, 20);
    }
  }
}

function desenharMensagem() {
  if (mensagem !== "") {
    fill(255, 0, 0); // Vermelho para mensagens de erro/feedback
    text(mensagem, width / 2, 120);
    tempoMensagem--;
    if (tempoMensagem <= 0) {
      mensagem = "";
    }
  }
}

// NOVO: Função para avisos gerais da fazenda (separei para organizar)
function desenharAvisosFazenda() {
  fill(0);
  noStroke();
  text("Aproxime-se do terreno e pressione 'P' para plantar.", width / 2, height - 100);
  text("Pressione 'V' para ir para a cidade vender.", width / 2, height - 70);
  text("Pressione 'L' para ir para a Loja de Sementes.", width / 2, height - 40);
  text("Pressione 'F' para ir para a Loja da Fazenda (expansão).", width / 2, height - 10);
  text("Pressione 'X' para ir para o Local de Pesca.", width / 2, height - 130);

  // Mensagens para a casa
  if (casaComprada) {
    text("Aproxime-se da porta da sua casa e pressione 'Enter' para entrar.", casaX + casaLargura / 2, casaY + casaAltura + 30);
  } else {
    text("Compre sua casa na Loja da Fazenda (F) para ter seu próprio lar!", casaX + casaLargura / 2, casaY + casaAltura + 30);
  }
}

// NOVO: Tela de comemoração
function desenharComemoracao() {
  background(255, 255, 0); // Fundo amarelo brilhante
  fill(0);
  textSize(48);
  text("PARABÉNS!", width / 2, height / 2 - 80);
  textSize(32);
  text("VOCÊ CONQUISTOU SEU OBJETIVO!", width / 2, height / 2 - 20);
  textSize(24);
  text("VOCÊ COMPROU SUA CASA NA CIDADE!", width / 2, height / 2 + 30);

  // Confetes (simples)
  for (let i = 0; i < 50; i++) {
    fill(random(255), random(255), random(255), 150);
    ellipse(random(width), random(height), 10, 10);
  }

  tempoComemoracao--;
  if (tempoComemoracao <= 0) {
    // Ao final da comemoração, você pode decidir o que acontece.
    // Por exemplo, voltar para a fazenda, ou reiniciar o jogo.
    // Por enquanto, vamos voltar para a fazenda.
    modoComemoracao = false;
    modoVenda = false;
    modoLojaSementes = false;
    modoLojaFazenda = false;
    modoPesca = false;
    modoCasa = false; // Garante que a casa não esteja ativa após a comemoração
    exibirMensagem("De volta à fazenda, para novas aventuras!");
    // Opcional: Reiniciar algumas variáveis se quiser que o jogo continue de forma diferente
    // ou apenas manter o estado atual.
  }
}

// --- Funções de Lógica do Jogo ---

function moverPersonagem() {
  if (keyIsDown(LEFT_ARROW)) {
    personagemX -= velocidadePersonagem;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    personagemX += velocidadePersonagem;
  }
  if (keyIsDown(UP_ARROW)) {
    personagemY -= velocidadePersonagem;
  }
  if (keyIsDown(DOWN_ARROW)) {
    personagemY += velocidadePersonagem;
  }

  // Limites da tela para o personagem
  personagemX = constrain(personagemX, 0, width - personagemLargura);
  personagemY = constrain(personagemY, 0, height - personagemAltura);

  // NOVO: Ajustar a posição do personagem ao entrar no barco
  if (modoPesca) {
    personagemX = localPescaX + localPescaLargura / 2 - personagemLargura / 2;
    personagemY = localPescaY + localPescaAltura / 2 - personagemAltura / 2;
  }
}

function verificarProntoParaVender() {
  let todosPlantados = true;
  for (let key in legumesInfo) {
    let legume = legumesInfo[key];
    if (legume.quantidadePlantada < legume.quantidadeParaPlantar) {
      todosPlantados = false;
      break;
    }
  }

  if (todosPlantados) {
    fill(0, 150, 0);
    text("Você plantou o suficiente para a meta! Vá para a cidade vender!", width / 2, height - 70);
  }
}

// NOVO: Função para verificar se o personagem pode entrar na casa
function verificarEntradaCasa() {
  if (casaComprada) {
    // Verifica colisão com a porta
    let colidiuComPorta = collideRectRect(personagemX, personagemY, personagemLargura, personagemAltura,
      portaX, portaY, portaLargura, portaAltura);

    if (colidiuComPorta) {
      // Se colidiu, o aviso para entrar já é mostrado em desenharAvisosFazenda()
      // Ação de entrar na casa será no keyPressed()
    }
  }
}

// NOVO: Lógica de pesca
function logicaPesca() {
  if (estaPescando) {
    tempoParaPescar--;
    if (tempoParaPescar <= 0 && !isFishOnHook) {
      // Chance de peixe morder
      if (random(1) < 0.7) { // 70% de chance de um peixe morder
        isFishOnHook = true;
        peixeMordeuTempo = TEMPO_REACAO_PESCA;
        exibirMensagem("Um peixe mordeu a isca!");
      } else {
        exibirMensagem("Nada por enquanto... Tente novamente!");
        estaPescando = false; // Reinicia a pesca
      }
    }
    if (isFishOnHook && peixeMordeuTempo > 0) {
      peixeMordeuTempo--;
      if (peixeMordeuTempo <= 0) {
        exibirMensagem("O peixe escapou! Você foi muito lento.");
        estaPescando = false;
        isFishOnHook = false;
      }
    }
  }
}

function keyPressed() {
  // Impede ações se estiver no modo de comemoração ou dentro da casa
  if (modoComemoracao) {
    return;
  }

  // Lógica de plantio (apenas se não estiver em outro modo)
  if (!modoVenda && !modoLojaSementes && !modoLojaFazenda && !modoPesca && !modoCasa && key.toLowerCase() === 'p') {
    let podePlantar = false;

    // Verifica se o personagem está perto de qualquer área de plantio
    for (let area of areasPlantio) {
      if (dist(personagemX + personagemLargura / 2, personagemY + personagemAltura / 2, area.x + area.largura / 2, area.y + area.altura / 2) < 150) {
        podePlantar = true;
        break;
      }
    }

    if (podePlantar) {
      let legumesPlantadosNoTotal = 0;
      for (let key in legumesInfo) {
        legumesPlantadosNoTotal += legumesInfo[key].quantidadePlantada;
      }

      if (legumesPlantadosNoTotal >= areasPlantio.length * maxLegumesPorArea) {
        exibirMensagem("Todas as suas áreas de plantio estão cheias! Compre mais áreas na Loja da Fazenda.");
        return;
      }

      // Lógica para plantar automaticamente um legume se houver sementes
      let legumeParaPlantar = null;
      const chavesLegumes = Object.keys(legumesInfo);
      for(let key of chavesLegumes) {
        if (legumesInfo[key].sementesDisponiveis > 0) {
          legumeParaPlantar = legumesInfo[key];
          break; // Pega a primeira semente disponível
        }
      }
      
      if (legumeParaPlantar) {
        legumeParaPlantar.quantidadePlantada++;
        legumeParaPlantar.sementesDisponiveis--;
        // LINHA REMOVIDA: dinheiro -= 0.50; // Custo de energia para plantar
        exibirMensagem(`Você plantou 1 ${legumeParaPlantar.nome}!`); // Mensagem ajustada
      } else {
        exibirMensagem("Você não tem sementes para plantar! Vá à loja de sementes.");
      }
    } else {
      exibirMensagem("Aproxime-se de uma área de plantio para plantar.");
    }
  }

  // Trocar para o modo de Venda
  if (!modoLojaSementes && !modoLojaFazenda && !modoPesca && !modoCasa && key.toLowerCase() === 'v') {
    modoVenda = !modoVenda;
    if (modoVenda) {
      exibirMensagem("Bem-vindo à Tenda de Vendas!");
    } else {
      exibirMensagem("Você voltou para a fazenda.");
    }
  }

  // Trocar para o modo Loja de Sementes
  if (!modoVenda && !modoLojaFazenda && !modoPesca && !modoCasa && key.toLowerCase() === 'l') {
    modoLojaSementes = !modoLojaSementes;
    if (modoLojaSementes) {
      exibirMensagem("Bem-vindo à Loja de Sementes!");
    } else {
      exibirMensagem("Você voltou para a fazenda.");
    }
  }

  // Trocar para o modo Loja da Fazenda
  if (!modoVenda && !modoLojaSementes && !modoPesca && !modoCasa && key.toLowerCase() === 'f') {
    modoLojaFazenda = !modoLojaFazenda;
    if (modoLojaFazenda) {
      exibirMensagem("Bem-vindo à Loja da Fazenda!");
    } else {
      exibirMensagem("Você voltou para a fazenda.");
    }
  }

  // Trocar para o modo Local de Pesca
  if (!modoVenda && !modoLojaSementes && !modoLojaFazenda && !modoCasa && key.toLowerCase() === 'x') {
    modoPesca = !modoPesca;
    if (modoPesca) {
      exibirMensagem("Bem-vindo ao Local de Pesca! Prepare sua linha.");
      // Reposiciona o personagem para o local de pesca
      personagemX = localPescaX + localPescaLargura / 2 - personagemLargura / 2;
      personagemY = localPescaY + localPescaAltura / 2 - personagemAltura / 2;
    } else {
      exibirMensagem("Você voltou para a fazenda.");
      estaPescando = false;
      isFishOnHook = false;
    }
  }

  // Voltar para a fazenda de qualquer modo
  if ((modoVenda || modoLojaSementes || modoLojaFazenda || modoPesca || modoCasa) && key.toLowerCase() === 'c') {
    modoVenda = false;
    modoLojaSementes = false;
    modoLojaFazenda = false;
    modoPesca = false;
    modoCasa = false; // Sai da casa também
    estaPescando = false; // Garante que a pesca pare ao sair
    isFishOnHook = false; // Zera o estado da isca
    exibirMensagem("Você voltou para a fazenda.");
  }


  // Ações dentro do modo de Venda
  if (modoVenda) {
    let chavesLegumes = Object.keys(legumesInfo);
    let totalOpcoesVenda = chavesLegumes.length;
    if (peixeInfo.quantidadePescada > 0) {
      totalOpcoesVenda++; // Adiciona a opção do peixe
    }

    if (key >= '1' && key <= String(totalOpcoesVenda)) {
      let indiceEscolha = parseInt(key) - 1;

      if (indiceEscolha < chavesLegumes.length) {
        // Venda de legumes
        let legumeEscolhido = legumesInfo[chavesLegumes[indiceEscolha]];
        if (legumeEscolhido.quantidadePlantada > 0) {
          dinheiro += legumeEscolhido.precoVenda;
          legumeEscolhido.quantidadePlantada--;
          exibirMensagem(`Você vendeu 1 ${legumeEscolhido.nome} por R$ ${nf(legumeEscolhido.precoVenda, 0, 2)}!`);
        } else {
          exibirMensagem(`Você não tem ${legumeEscolhido.nome} para vender.`);
        }
      } else if (indiceEscolha === chavesLegumes.length && peixeInfo.quantidadePescada > 0) {
        // Venda de peixe
        dinheiro += peixeInfo.precoVenda;
        peixeInfo.quantidadePescada--;
        exibirMensagem(`Você vendeu 1 ${peixeInfo.nome} por R$ ${nf(peixeInfo.precoVenda, 0, 2)}!`);
      } else {
        exibirMensagem("Opção inválida para venda.");
      }
    }
  }

  // Ações dentro do modo Loja de Sementes
  if (modoLojaSementes) {
    let chavesLegumes = Object.keys(legumesInfo);
    if (key >= '1' && key <= String(chavesLegumes.length)) {
      let legumeEscolhido = legumesInfo[chavesLegumes[parseInt(key) - 1]];
      if (dinheiro >= legumeEscolhido.precoSemente) {
        dinheiro -= legumeEscolhido.precoSemente;
        legumeEscolhido.sementesDisponiveis++;
        exibirMensagem(`Você comprou 1 semente de ${legumeEscolhido.nome}! (- R$${nf(legumeEscolhido.precoSemente, 0, 2)})`);
      } else {
        exibirMensagem("Dinheiro insuficiente para comprar esta semente.");
      }
    }
  }

  // Ações dentro do modo Loja da Fazenda
  if (modoLojaFazenda) {
    if (key === '1') {
      if (dinheiro >= custoNovaArea) {
        dinheiro -= custoNovaArea;
        areasPlantio.push({ x: random(50, width - 200), y: random(250, height - 200), largura: 400, altura: 150 }); // Nova área em posição aleatória
        custoNovaArea *= 1.5; // Aumenta o custo para a próxima área
        exibirMensagem(`Você comprou uma nova área de plantio! Próxima área: R$ ${nf(custoNovaArea, 0, 2)}`);
      } else {
        exibirMensagem("Dinheiro insuficiente para comprar uma nova área.");
      }
    }
    // NOVO: Comprar a casa
    if (key === '2' && !casaComprada) {
      if (dinheiro >= CUSTO_CASA) {
        dinheiro -= CUSTO_CASA;
        casaComprada = true;
        exibirMensagem("Parabéns! Você comprou sua casa na fazenda!");
        modoComemoracao = true; // Ativa a tela de comemoração
        tempoComemoracao = DURACAO_COMEMORACAO;
      } else {
        exibirMensagem("Dinheiro insuficiente para comprar a casa. Continue trabalhando!");
      }
    }
  }

  // Ações dentro do modo de Pesca
  if (modoPesca) {
    if (key.toLowerCase() === 'e' && !estaPescando) {
      estaPescando = true;
      tempoParaPescar = DURACAO_PESCA;
      exibirMensagem("Você lançou a linha... esperando por um peixe.");
    } else if (key === ' ' && isFishOnHook) {
      peixeInfo.quantidadePescada++;
      estaPescando = false;
      isFishOnHook = false;
      exibirMensagem(`Você pescou 1 ${peixeInfo.nome}!`);
    } else if (key === ' ' && !isFishOnHook && estaPescando) {
      exibirMensagem("Ainda não há peixe na linha!");
    }
  }

  // Ações dentro do modo Casa
  if (modoCasa && key === 'c') {
    modoCasa = false;
    exibirMensagem("Você saiu da casa e voltou para a fazenda.");
  } else if (!modoCasa && key === 'Enter' && casaComprada) {
    // Verifica se o personagem está perto da porta da casa para entrar
    let colidiuComPorta = collideRectRect(personagemX, personagemY, personagemLargura, personagemAltura,
      portaX, portaY, portaLargura, portaAltura);
    if (colidiuComPorta) {
      modoCasa = true;
      exibirMensagem("Bem-vindo(a) ao seu doce lar!");
    } else {
      exibirMensagem("Aproxime-se da porta para entrar na casa.");
    }
  }
}

// Função para exibir mensagens
function exibirMensagem(msg) {
  mensagem = msg;
  tempoMensagem = DURACAO_MENSAGEM;
}

// Função auxiliar para verificação de colisão de retângulos
function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 + w1 >= x2 &&    // r1 right edge past r2 left
    x1 <= x2 + w2 &&    // r1 left edge past r2 right
    y1 + h1 >= y2 &&    // r1 bottom edge past r2 top
    y1 <= y2 + h2;      // r1 top edge past r2 bottom
}