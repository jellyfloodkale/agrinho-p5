let estadoJogo = "menu";

// Posição de Miles
let milesX = 100;
let milesY = 320;
let noCarro = false;
let mostrarCarro = true;

// Estados do progresso do trigo e do jogo
let armazenadoNoSilo = false;
let colocadoNaPrateleira = false;
let processado = false;
let embalado = false;
let plantado = false;
let crescendo = false;
let prontoParaColher = false;

// Tempos para o crescimento do trigo
let tempoPlantio = 0;
const TEMPO_PARA_CRESCER = 5000; // Tempo em milissegundos para o trigo crescer

// Variáveis para mensagens
let mensagem = "";
let temporizadorMensagem = 0;
const DURACAO_MENSAGEM = 3000; // Duração da mensagem na tela

// Posição e estado do trigo na fase 1
let trigo = { x: 200, y: 340, estado: "terra" };

// Variáveis para funcionalidades de jogo
let pontuacao = 0;
let livroConhecimentoAberto = false;
let topicoConhecimentoAtual = "";
let missaoAtual = ""; // Variável para a missão atual

// Itens coletáveis na Fase 1 (água e sol)
let coletaveis = [];
const MAX_COLETAVEIS = 3;
const INTERVALO_GERACAO_COLETAVEL = 3000;
let ultimoTempoGeracaoColetavel = 0;
const VALOR_PONTO_COLETAVEL = 10;
let particulasColheita = []; // Para o efeito de colheita

// Cores base para o jogo
const CORES = {
    ceu: [173, 216, 230], // Azul claro
    grama: [124, 180, 70], // Verde
    terra: [139, 69, 19], // Marrom
    troncoArvore: [139, 69, 19], // Marrom
    folhasArvore: [60, 179, 113], // Verde
    cerca: [188, 143, 143], // Marrom rosado
    peleMiles: [255, 200, 180],
    camisetaMiles: [70, 130, 180], // Azul aço
    corpoCarro: [0, 100, 200], // Azul
    roda: [50], // Cinza
    paredePredio: [200, 180, 160], // Bege
    silo: [169, 169, 169], // Cinza
    madeiraPrateleira: [160, 120, 80], // Marrom
    maquina: [105, 105, 105], // Cinza escuro
    madeiraMesa: [150, 100, 50], // Marrom
    fundoMensagem: [255, 255, 200],
    textoMensagem: [50],
    textoUI: [0], // Preto
    sucesso: [0, 120, 0], // Verde
    fundoLivro: [250, 240, 210], // Cor para o livro de conhecimento
    fundoMissao: [255, 255, 255, 200], // Fundo da missão (transparente)
    fundoTelaVitoria: [150, 200, 150] // Fundo tela de vitória
};

// --- Configuração e Loop Principal ---

// Função para carregar assets (imagens, sons, fontes) antes do jogo iniciar
function preload() {
    // Adicione aqui o carregamento de sons, se desejar.
    // Ex: somPlantio = loadSound('assets/plantio.mp3');
}

// Configuração inicial do canvas e outras propriedades
function setup() {
    createCanvas(700, 400);
    textFont("Arial");
    // Configura um intervalo para o temporizador da mensagem desaparecer
    setInterval(() => {
        if (temporizadorMensagem > 0) {
            temporizadorMensagem -= 100;
            if (temporizadorMensagem <= 0) {
                mensagem = "";
            }
        }
    }, 100);
}

// Loop principal do jogo, chamado repetidamente
function draw() {
    background(200); // Limpa o fundo

    // Desenha a tela de acordo com o estado atual do jogo
    if (estadoJogo === "menu") drawMenu();
    else if (estadoJogo === "fase1") drawFase1();
    else if (estadoJogo === "fase2") drawFase2();
    else if (estadoJogo === "fase3") drawFase3();
    else if (estadoJogo === "victory") drawVictoryScreen();

    // Desenha o livro de conhecimento se estiver aberto
    if (livroConhecimentoAberto) {
        drawKnowledgeBook(topicoConhecimentoAtual);
    }
}

// --- Funções de UI e Interação ---

// Desenha a tela de menu inicial
function drawMenu() {
    // Gradiente de fundo verde
    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(100, 180, 100), color(50, 120, 50), inter);
        stroke(c);
        line(0, i, width, i);
    }
    noStroke();

    // Título e subtítulo do jogo
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("O Ciclo do Trigo", width / 2, 80);
    textSize(18);
    text("Um Jogo Educativo", width / 2, 120);

    // Dica para o livro de conhecimento
    textSize(16);
    fill(255);
    text("Clique no livro 📖 no canto superior esquerdo para curiosidades!", width / 2, 155);

    // Botão "Iniciar"
    let botaoX = width / 2;
    let botaoY = height - 100;
    let botaoW = 150;
    let botaoH = 50;
    let raioBotao = 10;

    // Efeito de hover no botão
    if (mouseX > botaoX - botaoW / 2 && mouseX < botaoX + botaoW / 2 &&
        mouseY > botaoY - botaoH / 2 && mouseY < botaoY + botaoH / 2) {
        fill(255, 200, 100); // Cor mais clara ao passar o mouse
    } else {
        fill(255, 180, 50); // Cor normal
    }
    rectMode(CENTER);
    rect(botaoX, botaoY, botaoW, botaoH, raioBotao);
    fill(0);
    textSize(22);
    text("Iniciar", botaoX, botaoY + 7);
    rectMode(CORNER);
}

// Lida com os eventos de clique do mouse
function mousePressed() {
    // Se o livro de conhecimento estiver aberto, a única interação possível é fechá-lo
    if (livroConhecimentoAberto) {
        let botaoFecharX = width / 2 + 230;
        let botaoFecharY = height / 2 - 130;
        if (dist(mouseX, mouseY, botaoFecharX, botaoFecharY) < 15) {
            livroConhecimentoAberto = false;
        }
        return; // Retorna para não processar outros cliques
    }

    // Lógica do menu principal
    if (estadoJogo === "menu") {
        let botaoX = width / 2;
        let botaoY = height - 100;
        let botaoW = 150;
        let botaoH = 50;
        // Verifica clique no botão "Iniciar"
        if (mouseX > botaoX - botaoW / 2 && mouseX < botaoX + botaoW / 2 &&
            mouseY > botaoY - botaoH / 2 && mouseY < botaoY + botaoH / 2) {
            estadoJogo = "fase1"; // Muda para a primeira fase
            milesX = 100; milesY = 320; // Reseta posição de Miles
            noCarro = false; mostrarCarro = true;
            resetarEstadosJogo(); // Reseta todos os estados do jogo
            definirMensagemJogo("Miles: Bem-vindo à fazenda! Hora de plantar.");
            topicoConhecimentoAtual = "plantio";
            missaoAtual = "Plante as sementes de trigo no campo verde!"; // Define a primeira missão
        }
    } else if (estadoJogo === "victory") {
        // Lógica dos botões na tela de vitória
        let botaoX = width / 2;
        let botaoY = height - 100;
        let botaoW = 180;
        let botaoH = 60;
        // Verifica clique no botão "Jogar Novamente"
        if (mouseX > botaoX - botaoW / 2 && mouseX < botaoX + botaoW / 2 &&
            mouseY > botaoY - botaoH / 2 && mouseY < botaoY + botaoH / 2) {
            estadoJogo = "menu"; // Volta para o menu
            resetarEstadosJogo(); // Reseta todos os estados do jogo
        }
    }

    // Botão do Livro do Conhecimento (visível em todas as fases de jogo, exceto menu e telas finais)
    let botaoLivroX = 30;
    let botaoLivroY = 30;
    if (estadoJogo !== "menu" && estadoJogo !== "victory" && dist(mouseX, mouseY, botaoLivroX, botaoLivroY) < 20) {
        livroConhecimentoAberto = true;
        return;
    }

    // Lógicas de interação específicas para a Fase 1
    if (estadoJogo === "fase1") {
        // Interação para plantar o trigo (se Miles estiver próximo e não plantado)
        if (!plantado && dist(mouseX, mouseY, trigo.x + 150, trigo.y + 25) < 100) {
            plantado = true;
            trigo.estado = "semente";
            tempoPlantio = millis();
            pontuacao += 50;
            definirMensagemJogo("Miles: Sementes plantadas! Agora é esperar a natureza agir.");
            topicoConhecimentoAtual = "crescimento";
            missaoAtual = "Espere o trigo crescer e amadurecer!";
        }
        // Interação para colher o trigo (se Miles estiver próximo e trigo maduro)
        if (plantado && trigo.estado === "maduro" && prontoParaColher) {
            if (dist(mouseX, mouseY, trigo.x + 150, trigo.y + 25) < 100) {
                trigo.estado = "colhido";
                prontoParaColher = false;
                pontuacao += 100;
                definirMensagemJogo("Miles: Trigo colhido! Vamos para a venda do seu Zé!");
                createHarvestParticles(trigo.x + 150, trigo.y - 40); // Efeito de partículas
                missaoAtual = "Leve o trigo colhido para a cooperativa!";
                setTimeout(() => {
                    estadoJogo = "fase2";
                    milesX = 100;
                    milesY = height - 70;
                    definirMensagemJogo("Miles: Chegamos à cooperativa! Hora de armazenar o trigo.");
                    topicoConhecimentoAtual = "armazenamento";
                    missaoAtual = "Clique no SILO para armazenar o trigo!";
                }, 2000);
            }
        }
    }

    // Lógicas de interação específicas para a Fase 2
    if (estadoJogo === "fase2") {
        if (!armazenadoNoSilo && dist(mouseX, mouseY, 230, 150) < 50) {
            armazenadoNoSilo = true;
            pontuacao += 75;
            definirMensagemJogo("Miles: Trigo armazenado! Agora, na prateleira para venda.");
            topicoConhecimentoAtual = "venda";
            missaoAtual = "Clique na PRATELEIRA para colocar o trigo à venda!";
        }
        if (armazenadoNoSilo && !colocadoNaPrateleira && dist(mouseX, mouseY, 560, 290) < 60) {
            colocadoNaPrateleira = true;
            pontuacao += 75;
            definirMensagemJogo("Miles: Ótimo! Trigo à venda! Próxima parada: a fábrica!");
            missaoAtual = "Vá para a fábrica e transforme o trigo!";
            setTimeout(() => {
                estadoJogo = "fase3";
                milesX = 100;
                milesY = height - 70;
                definirMensagemJogo("Miles: Chegamos à fábrica! Vamos transformar o trigo em farinha.");
                topicoConhecimentoAtual = "processamento";
                missaoAtual = "Clique na MÁQUINA para transformar trigo em farinha!";
            }, 2000);
        }
    }

    if (estadoJogo === "fase3") {
        if (!processado && dist(mouseX, mouseY, 340, 220) < 60) {
            processado = true;
            pontuacao += 100;
            definirMensagemJogo("Miles: Virou farinha! Agora é embalar para o supermercado.");
            topicoConhecimentoAtual = "embalagem";
            missaoAtual = "Clique na MESA para embalar os produtos!";
        }
        if (processado && !embalado && dist(mouseX, mouseY, 600, 260) < 60) {
            embalado = true;
            pontuacao += 150;
            definirMensagemJogo("Miles: Tudo embalado! Missão cumprida! O pão está garantido!");
            topicoConhecimentoAtual = "conclusao";
            missaoAtual = "Parabéns! Você completou o ciclo do trigo!";
            setTimeout(() => {
                estadoJogo = "victory"; // vai para a tela de vitória
            }, 2000);
        }
    }
}

// Define uma mensagem e inicia seu timer
function definirMensagemJogo(msg) {
    mensagem = msg;
    temporizadorMensagem = DURACAO_MENSAGEM;
}

// Reseta todos os estados do jogo (para quando o jogador reinicia)
function resetarEstadosJogo() {
    noCarro = false;
    mostrarCarro = true;
    armazenadoNoSilo = false;
    colocadoNaPrateleira = false;
    processado = false;
    embalado = false;
    plantado = false;
    crescendo = false;
    prontoParaColher = false;
    tempoPlantio = 0;
    trigo = { x: 200, y: 340, estado: "terra" };
    pontuacao = 0;
    coletaveis = [];
    livroConhecimentoAberto = false;
    topicoConhecimentoAtual = "";
    missaoAtual = "";
    particulasColheita = [];
    // A foice não existe mais, então não precisa ser resetada
}

// --- Funções de Desenho das Fases ---

function drawFase1() {
    for (let i = 0; i < height * 0.7; i++) {
        let inter = map(i, 0, height * 0.7, 0, 1);
        let c = lerpColor(color(CORES.ceu), color(100, 150, 200), inter);
        stroke(c);
        line(0, i, width, i);
    }
    noStroke();

    drawNuvens();
    drawCampo();
    drawArvore(600, 220);
    drawCerca();
    drawFlores();

    if (!noCarro) {
        drawMiles(milesX, milesY);
        if (keyIsDown(65)) milesX -= 2;
        if (keyIsDown(68)) milesX += 2;
        if (keyIsDown(69) && abs(milesX - 350) < 50) {
            noCarro = true;
            mostrarCarro = false;
            definirMensagemJogo("Miles: Pronto para acelerar! Aperte 'D' para ir.");
        }
    } else {
        drawCarro(milesX, 300);
        if (!plantado && keyIsDown(68)) {
            milesX += 3;
        }
    }
    milesX = constrain(milesX, 0, width - 30);

    if (plantado) {
        if (trigo.estado === "semente") {
            drawPlantacao(trigo.x, trigo.y, color(CORES.terra));
        } else if (trigo.estado === "muda") {
            drawPlantacao(trigo.x, trigo.y, color(150, 200, 80));
        } else if (trigo.estado === "maduro") {
            drawPlantacao(trigo.x, trigo.y, color(230, 200, 60));
        } else if (trigo.estado === "colhido") {
            drawPlantacao(trigo.x, trigo.y, color(CORES.terra));
        }
    }

    if (plantado && !crescendo && millis() - tempoPlantio > TEMPO_PARA_CRESCER) {
        trigo.estado = "muda";
        crescendo = true;
        definirMensagemJogo("Miles: A muda de trigo está crescendo bem!");
    }
    if (crescendo && trigo.estado === "muda" && millis() - tempoPlantio > TEMPO_PARA_CRESCER * 2) {
        trigo.estado = "maduro";
        prontoParaColher = true;
        definirMensagemJogo("Miles: O trigo está maduro! Hora de colher!");
    }

    if (prontoParaColher && trigo.estado === "maduro") {
        fill(255, 0, 0, 100);
        rect(trigo.x, trigo.y - 40, 300, 80);
        fill(255);
        textSize(18);
        textAlign(CENTER);
        text("Clique para colher o trigo!", trigo.x + 150, trigo.y - 10);
    }

    handleCollectables();
    updateAndDrawHarvestParticles();

    drawMessage();
    drawScore();
    drawKnowledgeBookButton();
    drawMissionPanel();
}

function drawFase2() {
    background(CORES.paredePredio);
    drawChao(160);
    drawJanela();
    drawMiles(milesX, milesY);
    drawSilo(200, 100);
    drawShelf(500, 260);

    if (keyIsDown(65)) milesX -= 2.5;
    if (keyIsDown(68)) milesX += 2.5;
    if (keyIsDown(87)) milesY -= 2.5;
    if (keyIsDown(83)) milesY += 2.5;

    milesX = constrain(milesX, 0, width - 30);
    milesY = constrain(milesY, 120, height - 50);

    textSize(22);
    fill(CORES.textoUI);
    textAlign(LEFT);
    text("Fase 2: Armazenamento e Venda", 10, 30);
    textAlign(CENTER);
    textSize(16);

    if (!armazenadoNoSilo) {
        text("Clique no SILO para armazenar o trigo", width / 2, 60);
    } else if (!colocadoNaPrateleira) {
        text("Clique na PRATELEIRA para colocar o trigo à venda", width / 2, 60);
    }

    drawMessage();
    drawScore();
    drawKnowledgeBookButton();
    drawMissionPanel();
}

function drawFase3() {
    background(220, 220, 230);
    drawChao(180);
    drawEsteira();
    drawMiles(milesX, milesY);
    drawMachine(300, 180);
    drawTable(550, 250);

    if (keyIsDown(65)) milesX -= 2.5;
    if (keyIsDown(68)) milesX += 2.5;
    if (keyIsDown(87)) milesY -= 2.5;
    if (keyIsDown(83)) milesY += 2.5;

    milesX = constrain(milesX, 0, width - 30);
    milesY = constrain(milesY, 120, height - 50);

    textSize(22);
    fill(CORES.textoUI);
    textAlign(LEFT);
    text("Fase 3: Processamento Industrial", 10, 30);
    textAlign(CENTER);
    textSize(16);

    if (!processado) {
        text("Clique na MÁQUINA para transformar trigo em farinha", width / 2, 60);
    } else if (!embalado) {
        text("Clique na MESA para embalar os produtos", width / 2, 60);
    } else {
        textSize(28);
        fill(CORES.sucesso);
        text("🌾 Ciclo completo! Parabéns pelo aprendizado! 🎉", width / 2, height / 5);
        textSize(20);
        fill(CORES.textoUI);
        text("Sua Pontuação Final: " + pontuacao, width / 2, height / 5 + 40);
    }

    drawMessage();
    drawScore();
    drawKnowledgeBookButton();
    drawMissionPanel();
}

function drawVictoryScreen() {
    background(CORES.fundoTelaVitoria);
    textAlign(CENTER);
    fill(CORES.sucesso);
    textSize(40);
    text("VITÓRIA!", width / 2, height / 3);

    fill(CORES.textoUI);
    textSize(25);
    text("Você completou o ciclo do trigo!", width / 2, height / 2 - 30);
    text("Sua Pontuação Final: " + pontuacao, width / 2, height / 2 + 10);

    // Botão de Reiniciar
    let botaoX = width / 2;
    let botaoY = height - 100;
    let botaoW = 180;
    let botaoH = 60;
    let raioBotao = 10;

    if (mouseX > botaoX - botaoW / 2 && mouseX < botaoX + botaoW / 2 &&
        mouseY > botaoY - botaoH / 2 && mouseY < botaoY + botaoH / 2) {
        fill(255, 200, 100); // Cor mais clara no hover
    } else {
        fill(255, 180, 50); // Cor normal
    }
    rectMode(CENTER);
    rect(botaoX, botaoY, botaoW, botaoH, raioBotao);
    fill(0);
    textSize(24);
    text("Jogar Novamente", botaoX, botaoY + 8);
    rectMode(CORNER);
}


// Desenha a caixa de mensagem
function drawMessage() {
    if (mensagem !== "" && temporizadorMensagem > 0) {
        fill(CORES.fundoMensagem);
        stroke(CORES.textoMensagem);
        rect(width / 2 - 200, 10, 400, 40, 10);
        noStroke();
        fill(CORES.textoMensagem);
        textSize(16);
        textAlign(CENTER);
        text(mensagem, width / 2, 35);
    }
}

// --- Funções de Desenho de Elementos (sem alterações substanciais desde a última versão) ---

function drawMiles(x, y) {
    fill(CORES.peleMiles);
    ellipse(x + 10, y - 20 + sin(frameCount * 0.05) * 2, 20);
    fill(0);
    ellipse(x + 7, y - 22, 3);
    ellipse(x + 13, y - 22, 3);
    noFill();
    stroke(0);
    arc(x + 10, y - 18, 8, 4, 0, PI);
    noStroke();

    fill(CORES.camisetaMiles);
    rect(x, y - 10, 20, 30, 5);
    rect(x - 5, y, 5, 20);
    rect(x + 20, y, 5, 20);
    fill(100);
    rect(x, y + 20, 10, 20);
    rect(x + 10, y + 20, 10, 20);
}

function drawCarro(x, y) {
    fill(CORES.corpoCarro);
    rect(x, y, 80, 30, 5);
    fill(CORES.roda);
    ellipse(x + 15, y + 30, 20);
    ellipse(x + 65, y + 30, 20);
    fill(200);
    rect(x + 20, y - 20, 30, 20);
    fill(255, 255, 100);
    ellipse(x + 75, y + 10, 5);
    fill(50);
    rect(x + 5, y + 10, 5, 10);
}

function drawCampo() {
    fill(CORES.terra);
    rect(0, 350, width, 50);
    fill(CORES.grama);
    rect(0, 300, width, 50);
}

function drawPlantacao(x, y, cor) {
    for (let i = 0; i < 6; i++) {
        let currentX = x + i * 50;
        fill(cor);
        rect(currentX, y, 20, -10);

        if (trigo.estado === "semente") {
            fill(80, 40, 10);
            ellipse(currentX + 10, y + 5, 8, 8);
        } else if (trigo.estado === "muda") {
            fill(100, 150, 50);
            rect(currentX + 8, y - 10, 4, -20);
            rect(currentX + 6, y - 25, 8, 10);
        } else if (trigo.estado === "maduro") {
            fill(230, 200, 60);
            rect(currentX + 8, y - 10, 4, -40);
            triangle(currentX + 5, y - 50, currentX + 15, y - 50, currentX + 10, y - 60);
            rect(currentX + 8, y - 50, 4, 10);
        }
    }
}

function drawArvore(x, y) {
    fill(CORES.troncoArvore);
    rect(x, y, 20, 50);
    fill(CORES.folhasArvore);
    ellipse(x + 10, y - 10, 60, 60);
    ellipse(x - 5, y - 20, 40, 40);
    ellipse(x + 25, y - 20, 40, 40);
}

function drawCerca() {
    fill(CORES.cerca);
    for (let i = 0; i < width; i += 40) {
        rect(i, 330, 10, 30);
    }
    rect(0, 340, width, 5);
    rect(0, 350, width, 5);
}

function drawFlores() {
    for (let i = 0; i < width; i += 80) {
        fill(255, 150, 150);
        ellipse(i + 10, 370, 10);
        ellipse(i + 15, 365, 10);
        ellipse(i + 5, 365, 10);
        fill(255, 255, 0);
        ellipse(i + 10, 370, 5);
    }
}

function drawNuvens() {
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(100 + sin(frameCount * 0.005) * 50, 80, 70, 40);
    ellipse(120 + sin(frameCount * 0.005) * 50, 70, 60, 50);
    ellipse(80 + sin(frameCount * 0.005) * 50, 70, 60, 50);
    ellipse(400 + cos(frameCount * 0.003) * 60, 120, 80, 50);
    ellipse(420 + cos(frameCount * 0.003) * 60, 110, 70, 60);
    ellipse(380 + cos(frameCount * 0.003) * 60, 110, 70, 60);
}

function drawSilo(x, y) {
    fill(CORES.silo);
    rect(x, y, 60, 100);
    fill(CORES.silo);
    triangle(x, y, x + 30, y - 30, x + 60, y);
    fill(100);
    rect(x + 20, y + 60, 20, 40);
    fill(CORES.silo);
    ellipse(x + 30, y, 65, 10);

    fill(CORES.textoUI);
    textSize(14);
    textAlign(CENTER);
    text("SILO", x + 30, y + 120);
}

function drawShelf(x, y) {
    fill(CORES.madeiraPrateleira);
    rect(x, y, 120, 10);
    rect(x, y + 30, 120, 10);
    rect(x, y + 60, 120, 10);
    for (let i = 0; i < 4; i++) {
        rect(x + i * 40, y, 5, 70);
    }
    if (armazenadoNoSilo) {
        fill(200, 180, 100);
        rect(x + 10, y - 15, 30, 20, 5);
        rect(x + 50, y + 15, 30, 20, 5);
        rect(x + 80, y + 45, 30, 20, 5);
    }

    fill(CORES.textoUI);
    textSize(14);
    textAlign(CENTER);
    text("PRATELEIRA", x + 60, y + 90);
}

function drawMachine(x, y) {
    fill(CORES.maquina);
    rect(x, y, 80, 80, 10);
    fill(120);
    ellipse(x + 40, y + 40, 30 + sin(frameCount * 0.2) * 5, 30);
    rect(x + 10, y + 10, 60, 10);
    rect(x + 10, y + 60, 60, 10);
    fill(50);
    ellipse(x + 40, y + 70, 10);

    fill(CORES.textoUI);
    textSize(12);
    textAlign(CENTER);
    text("MÁQUINA", x + 40, y + 100);
}

function drawTable(x, y) {
    fill(CORES.madeiraMesa);
    rect(x, y, 100, 20);
    rect(x + 10, y + 20, 10, 30);
    rect(x + 80, y + 20, 10, 30);

    if (processado) {
        fill(240, 240, 200);
        rect(x + 20, y - 15, 20, 25, 3);
        rect(x + 60, y - 10, 20, 25, 3);
    }

    fill(CORES.textoUI);
    textSize(12);
    text("MESA", x + 50, y + 40);
}

function drawChao(altura) {
    fill(180, 140, 100);
    rect(0, height - altura, width, altura);
    stroke(150, 110, 70);
    for (let i = 0; i < width; i += 20) {
        line(i, height - altura, i, height);
    }
    noStroke();
}

function drawJanela() {
    fill(255);
    rect(50, 80, 60, 60);
    stroke(0);
    line(50, 110, 110, 110);
    line(80, 80, 80, 140);
    noStroke();
    fill(100, 150, 200);
    rect(52, 82, 56, 56);
    fill(60, 120, 60);
    rect(52, 110, 56, 28);
}

function drawEsteira() {
    fill(100);
    rect(200, 330, 300, 10);
    fill(180);
    let offset = (frameCount * 1.5) % 30;
    for (let i = 0; i < 300; i += 30) {
        rect(200 + i + offset, 325, 10, 20);
    }
}

// --- Funções de Novas Funcionalidades ---

function drawScore() {
    fill(CORES.textoUI);
    textSize(18);
    textAlign(LEFT);
    text("Pontos: " + pontuacao, width - 120, 30);
}

function handleCollectables() {
    if (millis() - ultimoTempoGeracaoColetavel > INTERVALO_GERACAO_COLETAVEL && coletaveis.length < MAX_COLETAVEIS && plantado && trigo.estado !== "colhido") {
        let tipo = random(["agua", "sol"]);
        let x = random(100, width - 100);
        let y = random(200, 300);
        coletaveis.push({ tipo: tipo, x: x, y: y, coletado: false, alfa: 255 });
        ultimoTempoGeracaoColetavel = millis();
    }

    for (let i = coletaveis.length - 1; i >= 0; i--) {
        let item = coletaveis[i];
        if (!item.coletado) {
            drawCollectable(item.x, item.y, item.tipo);
            if (dist(milesX + 10, milesY, item.x, item.y) < 25) {
                item.coletado = true;
                pontuacao += VALOR_PONTO_COLETAVEL;
                definirMensagemJogo("Miles: Boa! Mais pontos e ajudando o trigo a crescer!");
            }
        } else {
            item.alfa -= 10;
            if (item.alfa > 0) {
                push();
                tint(255, item.alfa);
                drawCollectable(item.x, item.y, item.tipo);
                pop();
            } else {
                coletaveis.splice(i, 1);
            }
        }
    }
}

function drawCollectable(x, y, tipo) {
    push();
    translate(x, y);
    let floatOffset = sin(frameCount * 0.1) * 3;
    translate(0, floatOffset);

    if (tipo === "agua") {
        fill(50, 150, 255);
        ellipse(0, 0, 15, 20);
        triangle(-7, 0, 7, 0, 0, 15);
    } else if (tipo === "sol") {
        fill(255, 200, 0);
        ellipse(0, 0, 25, 25);
        for (let i = 0; i < 8; i++) {
            rotate(PI / 4);
            rect(0, -15, 2, 5);
        }
    }
    pop();
}

// Efeito de partículas de colheita
function createHarvestParticles(x, y) {
    for (let i = 0; i < 20; i++) {
        let angulo = random(TWO_PI);
        let velocidade = random(1, 3);
        particulasColheita.push({
            x: x,
            y: y,
            vx: cos(angulo) * velocidade,
            vy: sin(angulo) * velocidade,
            vida: 255
        });
    }
}

function updateAndDrawHarvestParticles() {
    for (let i = particulasColheita.length - 1; i >= 0; i--) {
        let p = particulasColheita[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.vida -= 5;

        if (p.vida > 0) {
            fill(255, 200, 60, p.vida);
            ellipse(p.x, p.y, 5, 5);
        } else {
            particulasColheita.splice(i, 1);
        }
    }
}

function drawKnowledgeBookButton() {
    fill(CORES.fundoLivro);
    stroke(CORES.textoUI);
    ellipse(30, 30, 40, 40);
    fill(CORES.textoUI);
    textSize(20);
    textAlign(CENTER);
    text("📖", 30, 38);
    noStroke();
}

function drawKnowledgeBook(topico) {
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);

    fill(CORES.fundoLivro);
    stroke(CORES.textoUI);
    rect(width / 2 - 250, height / 2 - 150, 500, 300, 20);

    fill(255, 0, 0);
    ellipse(width / 2 + 230, height / 2 - 130, 30, 30);
    fill(255);
    textSize(20);
    text("X", width / 2 + 230, height / 2 - 122);

    fill(CORES.textoUI);
    textSize(24);
    textAlign(CENTER);
    text("Livro do Conhecimento", width / 2, height / 2 - 100);

    textSize(16);
    textAlign(LEFT);
    let conteudo = getKnowledgeContent(topico);
    text(conteudo, width / 2 - 230, height / 2 - 60, 460, 250);
}

function getKnowledgeContent(topico) {
    switch (topico) {
        case "plantio":
            return `
            Etapa 1: O Plantio
            
            O trigo começa sua jornada como uma pequena semente. Ele é plantado no solo, que deve ser bem preparado para receber os nutrientes e a água necessárias. Os fazendeiros usam máquinas especiais para garantir que as sementes sejam distribuídas uniformemente, otimizando o crescimento e a colheita futura.`;
        case "crescimento":
            return `
            Etapa 2: O Crescimento
            
            Com a ajuda da luz do sol e da água, a semente de trigo brota e começa a crescer. Primeiro, ela se torna uma muda verde, e depois, uma planta adulta com uma espiga. Este processo leva tempo e é essencial para o desenvolvimento do grão dentro da espiga.`;
        case "armazenamento":
            return `
            Etapa 3: Armazenamento
            
            Após ser colhido, o trigo precisa ser armazenado em locais seguros, como silos. Os silos são grandes estruturas que protegem o trigo da umidade, pragas e outras ameaças, garantindo que ele permaneça seco e próprio para consumo.`;
        case "venda":
            return `
            Etapa 4: Venda e Distribuição
            
            Do silo, o trigo é transportado para cooperativas ou mercados onde será vendido. É um passo importante para que o produto chegue à próxima fase da cadeia, sendo comercializado para fábricas que o transformarão em outros produtos.`;
        case "processamento":
            return `
            Etapa 5: Processamento Industrial
            
            Na fábrica, o trigo passa por um processo de moagem. Grandes máquinas trituram os grãos de trigo, transformando-os em farinha. Essa farinha é a base para muitos alimentos que consumimos diariamente, como pães e bolos.`;
        case "embalagem":
            return `
            Etapa 6: Embalagem
            
            Depois de virar farinha, o produto é cuidadosamente embalado. A embalagem protege a farinha e a prepara para ser transportada para supermercados, padarias e outros comércios. É a fase final antes de chegar à sua mesa!`;
        case "conclusao":
            return `
            Ciclo Completo!
            
            Parabéns! Você completou o ciclo do trigo. Desde a semente plantada na fazenda até a farinha embalada pronta para o consumo, você aprendeu sobre todas as etapas importantes.`;
        default:
            return "Selecione uma fase do jogo para aprender mais sobre ela!";
    }
}

function drawMissionPanel() {
    if (missaoAtual) {
        fill(CORES.fundoMissao);
        stroke(CORES.textoUI);
        rect(width / 2 - 150, 55, 300, 40, 10);
        noStroke();
        fill(CORES.textoUI);
        textSize(15);
        textAlign(CENTER);
        text("Missão: " + missaoAtual, width / 2, 80);
    }
}
