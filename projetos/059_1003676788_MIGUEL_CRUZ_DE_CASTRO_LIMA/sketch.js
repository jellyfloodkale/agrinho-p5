// --- Variáveis Globais do Jogo ---
let dinheiro = 100;
let toras = 5;
let laminas = 0;
let chapasCruas = 0;
let chapasLixadas = 0;

// Capacidade máxima de estoque
const CAPACIDADE_TORA_MAX = 20;
const CAPACIDADE_LAMINA_MAX = 50;
const CAPACIDADE_CHAPA_CRUA_MAX = 15;
const CAPACIDADE_CHAPA_LIXADA_MAX = 10;

// Custos e preços
const CUSTO_TORA = 10;
const PRECO_CHAPA_LIXADA = 50; // Preço base

// Máquinas
let serra;
let prensadora;
let lixadeira;

// Tempos de produção base (em frames, 60 frames = 1 segundo)
const TEMPO_CORTE_BASE = 180; // 3 segundos (Serra: Tora -> Lâminas)
const TEMPO_PRENSAGEM_BASE = 240; // 4 segundos (Prensadora: Lâminas -> Chapa Crua)
const TEMPO_LIXAMENTO_BASE = 120; // 2 segundos (Lixadeira: Chapa Crua -> Chapa Lixada)

// Quantidade de produção por ciclo
const LAMINAS_POR_TORA = 5; // Uma tora produz 5 lâminas
const LAMINAS_NECESSARIAS_POR_CHAPA = 3; // 3 lâminas para 1 chapa crua

// Upgrades
const CUSTO_UPGRADE_NIVEL1 = 150;
const CUSTO_UPGRADE_NIVEL2 = 300;
const CUSTO_UPGRADE_NIVEL3 = 500;
const REDUCAO_TEMPO_UPGRADE = 0.2; // 20% de redução no tempo por nível

// Interface
const LARGURA_BOTAO = 160;
const ALTURA_BOTAO = 60;
const ALTURA_BOTAO_MAQUINA = 40;

let gamePaused = false;
let message = ""; // Para exibir mensagens ao jogador
let messageTimer = 0; // Tempo que a mensagem fica na tela

// --- Variáveis de Estado do Jogo ---
// 0: Tela Inicial
// 1: Tutorial
// 2: Fase 1 (Serra)
// 3: Fase 2 (Prensadora)
// 4: Fase 3 (Lixadeira/Venda)
// 5: Créditos
let gameState = 0;

// --- Setup: Inicialização do Jogo ---
function setup() {
    createCanvas(1000, 700);
    textAlign(CENTER, CENTER);
    textSize(20);
    textFont('Arial');

    // Inicializa as máquinas com suas posições e custos de upgrade
    serra = new Maquina("Serra", TEMPO_CORTE_BASE, width / 2, 280, [CUSTO_UPGRADE_NIVEL1, CUSTO_UPGRADE_NIVEL2, CUSTO_UPGRADE_NIVEL3]);
    prensadora = new Maquina("Prensadora", TEMPO_PRENSAGEM_BASE, width / 2, 280, [CUSTO_UPGRADE_NIVEL1, CUSTO_UPGRADE_NIVEL2, CUSTO_UPGRADE_NIVEL3]);
    lixadeira = new Maquina("Lixadeira", TEMPO_LIXAMENTO_BASE, width / 2, 280, [CUSTO_UPGRADE_NIVEL1, CUSTO_UPGRADE_NIVEL2, CUSTO_UPGRADE_NIVEL3]);
}

// --- Draw: Loop Principal do Jogo ---
function draw() {
    background(220);

    // Seleciona a tela com base no gameState
    switch (gameState) {
        case 0:
            drawTelaInicial();
            break;
        case 1:
            drawTutorial();
            break;
        case 2:
            drawFaseSerra();
            break;
        case 3:
            drawFasePrensadora();
            break;
        case 4:
            drawFaseLixadeira();
            break;
        case 5:
            drawCreditos();
            break;
    }

    // Exibir mensagens (presente em todas as telas de jogo)
    if (messageTimer > 0) {
        fill(255, 150, 0);
        textSize(22);
        text(message, width / 2, height - 50);
        messageTimer--;
    }
}

// --- Funções de Desenho das Telas ---

function drawTelaInicial() {
    background(50, 150, 200); // Azul mais escuro
    fill(255);
    textSize(60);
    text("Fábrica de Compensado", width / 2, height / 2 - 50);
    textSize(25);
    text("Simulador Industrial", width / 2, height / 2 + 20);

    drawButton("Iniciar Jogo", width / 2, height / 2 + 150, "", () => gameState = 2); // Inicia na Fase da Serra
    drawButton("Tutorial", width / 2, height / 2 + 220, "", () => gameState = 1);
    drawButton("Créditos", width / 2, height / 2 + 290, "", () => gameState = 5);
}

function drawTutorial() {
    background(200, 220, 250); // Azul claro
    fill(0);
    textSize(40);
    text("Tutorial - Fábrica de Compensado", width / 2, 70);

    textSize(18);
    textAlign(LEFT, TOP);
    let tutorialText = `
    Bem-vindo à sua Fábrica de Compensado! Seu objetivo é produzir chapas e vendê-las para ganhar dinheiro.

    Processo de Produção:
    1. Toras: São sua matéria-prima. Compre-as para começar!
    2. Serra: Corta as toras em Lâminas. Cada tora produz 5 Lâminas.
    3. Prensadora: Usa 3 Lâminas para criar 1 Chapa Crua.
    4. Lixadeira: Lixa 1 Chapa Crua para criar 1 Chapa Lixada.
    5. Venda: Venda suas Chapas Lixadas para ganhar dinheiro.

    Gerenciamento:
    - O jogo inicia com R$100, para cada jogador.
    - Fique de olho no seu Dinheiro para comprar Toras e Upgrades.
    - Cada recurso (Toras, Lâminas, Chapas) tem uma capacidade máxima de estoque.
      Produza e venda para liberar espaço!
    - Upgrades: Invista em suas máquinas para acelerar a produção.
      Cada nível de upgrade reduz o tempo de produção da máquina.

    Divirta-se gerenciando sua fábrica!
    `;
    text(tutorialText, 50, 120, width - 100, height - 200);

    textAlign(CENTER, CENTER); // Volta ao padrão
    drawButton("Voltar ao Início", width / 2, height - 80, "", () => gameState = 0);
    drawButton("Começar Jogo", width / 2, height - 150, "", () => gameState = 2);
}

function drawFaseSerra() {
    // Desenha o "chão" da fábrica
    fill(180);
    rect(0, 450, width, height - 450);

    // Exibir informações gerais
    fill(0);
    textSize(30);
    text(`Dinheiro: $${dinheiro}`, width / 2, 40);

    // Exibir estoque e capacidade (todos os estoques)
    textSize(20);
    fill(50, 50, 150);
    text(`Toras: ${toras}/${CAPACIDADE_TORA_MAX}`, 100, 100);
    text(`Lâminas: ${laminas}/${CAPACIDADE_LAMINA_MAX}`, 350, 100);
    text(`Chapas Cruas: ${chapasCruas}/${CAPACIDADE_CHAPA_CRUA_MAX}`, 650, 100);
    text(`Chapas Lixadas: ${chapasLixadas}/${CAPACIDADE_CHAPA_LIXADA_MAX}`, 900, 100);

    // Desenhar e atualizar a Serra
    serra.display();
    if (!gamePaused) {
        serra.update();
        if (serra.producaoConcluida()) {
            laminas = min(laminas + LAMINAS_POR_TORA, CAPACIDADE_LAMINA_MAX);
            showMessage(`Serra: Produção concluída! +${LAMINAS_POR_TORA} Lâminas.`);
        }
    }

    // Botões de ação principais
    drawButton("Comprar Tora", width / 2, 500, `$${CUSTO_TORA}`, comprarTora);

    // Botões de Navegação
    drawButton(">> Prensadora", width - 150, 600, "Próxima Etapa", () => gameState = 3);
    drawButton("Voltar ao Início", 150, 600, "", () => gameState = 0);

    // Botões de controle de jogo
    drawButton(gamePaused ? "Continuar" : "Pausar", width / 2, 600, "", togglePause);
}

function drawFasePrensadora() {
    // Desenha o "chão" da fábrica
    fill(180);
    rect(0, 450, width, height - 450);

    // Exibir informações gerais
    fill(0);
    textSize(30);
    text(`Dinheiro: $${dinheiro}`, width / 2, 40);

    // Exibir estoque e capacidade (todos os estoques)
    textSize(20);
    fill(50, 50, 150);
    text(`Toras: ${toras}/${CAPACIDADE_TORA_MAX}`, 100, 100);
    text(`Lâminas: ${laminas}/${CAPACIDADE_LAMINA_MAX}`, 350, 100);
    text(`Chapas Cruas: ${chapasCruas}/${CAPACIDADE_CHAPA_CRUA_MAX}`, 650, 100);
    text(`Chapas Lixadas: ${chapasLixadas}/${CAPACIDADE_CHAPA_LIXADA_MAX}`, 900, 100);

    // Desenhar e atualizar a Prensadora
    prensadora.display();
    if (!gamePaused) {
        prensadora.update();
        if (prensadora.producaoConcluida()) {
            chapasCruas = min(chapasCruas + 1, CAPACIDADE_CHAPA_CRUA_MAX);
            showMessage("Prensadora: Produção concluída! +1 Chapa Crua.");
        }
    }

    // Botões de Navegação
    drawButton("<< Serra", 150, 600, "Etapa Anterior", () => gameState = 2);
    drawButton(">> Lixadeira", width - 150, 600, "Próxima Etapa", () => gameState = 4);

    // Botões de controle de jogo
    drawButton(gamePaused ? "Continuar" : "Pausar", width / 2, 600, "", togglePause);
}

function drawFaseLixadeira() {
    // Desenha o "chão" da fábrica
    fill(180);
    rect(0, 450, width, height - 450);

    // Exibir informações gerais
    fill(0);
    textSize(30);
    text(`Dinheiro: $${dinheiro}`, width / 2, 40);

    // Exibir estoque e capacidade (todos os estoques)
    textSize(20);
    fill(50, 50, 150);
    text(`Toras: ${toras}/${CAPACIDADE_TORA_MAX}`, 100, 100);
    text(`Lâminas: ${laminas}/${CAPACIDADE_LAMINA_MAX}`, 350, 100);
    text(`Chapas Cruas: ${chapasCruas}/${CAPACIDADE_CHAPA_CRUA_MAX}`, 650, 100);
    text(`Chapas Lixadas: ${chapasLixadas}/${CAPACIDADE_CHAPA_LIXADA_MAX}`, 900, 100);

    // Desenhar e atualizar a Lixadeira
    lixadeira.display();
    if (!gamePaused) {
        lixadeira.update();
        if (lixadeira.producaoConcluida()) {
            chapasLixadas = min(chapasLixadas + 1, CAPACIDADE_CHAPA_LIXADA_MAX);
            showMessage("Lixadeira: Produção concluída! +1 Chapa Lixada.");
        }
    }

    // Botões de ação principais
    drawButton("Vender Chapas", width / 2, 500, `Vende todas por $${chapasLixadas * PRECO_CHAPA_LIXADA}`, venderChapas);

    // Botões de Navegação
    drawButton("<< Prensadora", 150, 600, "Etapa Anterior", () => gameState = 3);
    drawButton("Reiniciar Jogo", width - 150, 600, "", resetGame); // Reiniciar da fase de lixadeira

    // Botões de controle de jogo
    drawButton(gamePaused ? "Continuar" : "Pausar", width / 2, 600, "", togglePause);
}


function drawCreditos() {
    background(100, 100, 150); // Um tom de roxo/azul escuro
    fill(255);
    textSize(50);
    text("Créditos", width / 2, 100);

    textSize(25);
    textAlign(CENTER, TOP);
    let creditosText = `
    Agrinho 2025

    Projeto desenvolvido por:
    Miguel Cruz de Castro Lima
    Aluno do Colégio Cívico Militar Presidente Castelo Branco

    Componente Curricular:
    Pensamento Computacional

    Série: 1 A
    `;
    text(creditosText, width / 2, 200);

    textAlign(CENTER, CENTER); // Volta ao padrão
    drawButton("Voltar ao Início", width / 2, height - 80, "", () => gameState = 0);
}

// --- Classe para Representar uma Máquina ---
class Maquina {
    constructor(nome, tempoProducaoBase, x, y, custosUpgrade) {
        this.nome = nome;
        this.tempoProducaoBase = tempoProducaoBase;
        this.tempoProducaoAtual = tempoProducaoBase;
        this.x = x;
        this.y = y;
        this.progresso = 0;
        this.isProduzindo = false;
        this.nivel = 0;
        this.custosUpgrade = custosUpgrade; // Array de custos para cada nível
    }

    display() {
        // Corpo da máquina
        fill(100, 100, 100);
        rect(this.x - 75, this.y - 75, 150, 150, 15); // Máquina maior e arredondada

        // Detalhes da máquina (exemplo visual)
        fill(150);
        rect(this.x - 60, this.y - 60, 120, 30);
        fill(200, 50, 50);
        ellipse(this.x, this.y + 20, 50, 50); // Roda ou botão de operação

        // Nome da máquina
        fill(255);
        textSize(25);
        text(this.nome, this.x, this.y - 90);

        // Nível
        textSize(18);
        fill(255, 255, 0);
        text(`Nível: ${this.nivel}`, this.x, this.y - 50);

        // Barra de progresso
        if (this.isProduzindo) {
            let barraLargura = map(this.progresso, 0, this.tempoProducaoAtual, 0, 140);
            fill(50, 200, 50);
            rect(this.x - 70, this.y + 40, barraLargura, 15);
            fill(0);
            textSize(16);
            text(`${floor(this.progresso / 60)}s / ${floor(this.tempoProducaoAtual / 60)}s`, this.x, this.y + 70);
        } else {
            fill(0);
            textSize(18);
            text("Ociosa", this.x, this.y + 55);
        }

        // Botão de ação da máquina
        let actionText = "";
        let actionCost = "";
        let hasMaterials = false;
        let atCapacity = false;

        switch (this.nome) {
            case "Serra":
                actionText = "Cortar Tora";
                actionCost = "1 Tora";
                hasMaterials = (toras >= 1);
                atCapacity = (laminas + LAMINAS_POR_TORA > CAPACIDADE_LAMINA_MAX); // Verifica se tem espaço para as lâminas
                break;
            case "Prensadora":
                actionText = "Prensagem";
                actionCost = `${LAMINAS_NECESSARIAS_POR_CHAPA} Lâminas`; // Agora usa lâminas
                hasMaterials = (laminas >= LAMINAS_NECESSARIAS_POR_CHAPA); // Verifica lâminas
                atCapacity = (chapasCruas + 1 > CAPACIDADE_CHAPA_CRUA_MAX);
                break;
            case "Lixadeira":
                actionText = "Lixar Chapa";
                actionCost = "1 Chapa Crua";
                hasMaterials = (chapasCruas >= 1);
                atCapacity = (chapasLixadas + 1 > CAPACIDADE_CHAPA_LIXADA_MAX);
                break;
        }

        // Se o estoque de destino estiver cheio ou sem materiais, o botão fica desabilitado
        let isDisabled = atCapacity || !hasMaterials || this.isProduzindo || gamePaused;
        drawButton(actionText, this.x, this.y + 160, actionCost, () => this.iniciarProducao(), ALTURA_BOTAO_MAQUINA, isDisabled);

        // Botão de Upgrade
        let custoUpgrade = this.custosUpgrade[this.nivel];
        let upgradeText = `Upgrade ${this.nivel + 1}`;
        let upgradeInfo = custoUpgrade ? `$${custoUpgrade}` : "MAX";
        let isUpgradeDisabled = (this.nivel >= this.custosUpgrade.length) || (dinheiro < custoUpgrade) || gamePaused;
        drawButton(upgradeText, this.x, this.y + 220, upgradeInfo, () => this.upgrade(custoUpgrade), ALTURA_BOTAO_MAQUINA, isUpgradeDisabled);
    }

    update() {
        if (this.isProduzindo) {
            this.progresso++;
        }
    }

    producaoConcluida() {
        if (this.isProduzindo && this.progresso >= this.tempoProducaoAtual) {
            this.isProduzindo = false;
            this.progresso = 0;
            return true;
        }
        return false;
    }

    iniciarProducao() {
        // As verificações de `gamePaused`, `isProduzindo`, `hasMaterials` e `atCapacity`
        // são agora feitas *antes* de chamar `iniciarProducao` no `mouseReleased`.
        // A função em si só realiza a ação se tudo estiver certo.
        switch (this.nome) {
            case "Serra":
                toras--;
                break;
            case "Prensadora":
                laminas -= LAMINAS_NECESSARIAS_POR_CHAPA;
                break;
            case "Lixadeira":
                chapasCruas--;
                break;
        }
        this.isProduzindo = true;
        this.progresso = 0;
        showMessage(`${this.nome}: Produção iniciada!`);
        return true;
    }


    upgrade(custo) {
        if (gamePaused) {
            showMessage("O jogo está pausado!");
            return;
        }
        if (this.nivel < this.custosUpgrade.length) {
            if (dinheiro >= custo) {
                dinheiro -= custo;
                this.nivel++;
                // Garante que o tempo de produção não zere ou seja negativo
                this.tempoProducaoAtual = max(this.tempoProducaoBase * (1 - this.nivel * REDUCAO_TEMPO_UPGRADE), 30); // Mínimo de 0.5s
                showMessage(`${this.nome} atualizada para o Nível ${this.nivel}!`);
            } else {
                showMessage(`Dinheiro insuficiente para o upgrade da ${this.nome}!`);
            }
        } else {
            showMessage(`${this.nome} já está no nível máximo!`);
        }
    }
}

// --- Funções de Ação Principal ---
function comprarTora() {
    if (gamePaused) {
        showMessage("O jogo está pausado!");
        return;
    }
    if (toras < CAPACIDADE_TORA_MAX) {
        if (dinheiro >= CUSTO_TORA) {
            dinheiro -= CUSTO_TORA;
            toras++;
            showMessage(`Tora comprada! Dinheiro: $${dinheiro}`);
        } else {
            showMessage("Dinheiro insuficiente para comprar toras!");
        }
    } else {
        showMessage("Estoque de Toras cheio!");
    }
}

function venderChapas() {
    if (gamePaused) {
        showMessage("O jogo está pausado!");
        return;
    }
    if (chapasLixadas > 0) {
        let valorVenda = chapasLixadas * PRECO_CHAPA_LIXADA;
        dinheiro += valorVenda;
        chapasLixadas = 0;
        showMessage(`Chapas vendidas! Ganhos: $${valorVenda}`);
    } else {
        showMessage("Não há chapas lixadas para vender!");
    }
}

function togglePause() {
    gamePaused = !gamePaused;
    showMessage(gamePaused ? "Jogo Pausado" : "Jogo Continuado");
}

function resetGame() {
    dinheiro = 100;
    toras = 5;
    laminas = 0;
    chapasCruas = 0;
    chapasLixadas = 0;
    serra = new Maquina("Serra", TEMPO_CORTE_BASE, width / 2, 280, [CUSTO_UPGRADE_NIVEL1, CUSTO_UPGRADE_NIVEL2, CUSTO_UPGRADE_NIVEL3]);
    prensadora = new Maquina("Prensadora", TEMPO_PRENSAGEM_BASE, width / 2, 280, [CUSTO_UPGRADE_NIVEL1, CUSTO_UPGRADE_NIVEL2, CUSTO_UPGRADE_NIVEL3]);
    lixadeira = new Maquina("Lixadeira", TEMPO_LIXAMENTO_BASE, width / 2, 280, [CUSTO_UPGRADE_NIVEL1, CUSTO_UPGRADE_NIVEL2, CUSTO_UPGRADE_NIVEL3]);
    gamePaused = false;
    message = "";
    messageTimer = 0;
    gameState = 0; // Volta para a tela inicial
}

// --- Funções de Interface ---
// Função para desenhar botões genéricos
function drawButton(textLabel, x, y, costOrInfo, callback, buttonHeight = ALTURA_BOTAO, disabled = false) {
    let mouseOver = mouseX > x - LARGURA_BOTAO / 2 && mouseX < x + LARGURA_BOTAO / 2 &&
                    mouseY > y - buttonHeight / 2 && mouseY < y + buttonHeight / 2;

    if (disabled) {
        fill(180); // Cor mais clara para desabilitado
    } else if (mouseOver) {
        fill(150, 200, 255); // Cor ao passar o mouse
    } else {
        fill(100, 150, 200); // Cor normal
    }

    rect(x - LARGURA_BOTAO / 2, y - buttonHeight / 2, LARGURA_BOTAO, buttonHeight, 10);
    fill(255);
    textSize(18);
    text(textLabel, x, y - 10);

    if (costOrInfo) {
        textSize(14);
        text(costOrInfo, x, y + 10);
    }

    // Armazenar a callback para uso no mouseReleased
    if (!disabled && mouseOver) {
        currentClickableButtons.push({ x: x, y: y, w: LARGURA_BOTAO, h: buttonHeight, callback: callback });
    }
}

// Função para exibir mensagens na tela
function showMessage(msg) {
    message = msg;
    messageTimer = 180; // Mensagem visível por 3 segundos (180 frames)
}

// --- Interação do Usuário ---
let mouseButtonWasPressed = false; // Controla se o botão do mouse foi pressionado na frame anterior
let currentClickableButtons = []; // Lista de botões clicáveis na frame atual

function mousePressed() {
    mouseButtonWasPressed = true;
}

function mouseReleased() {
    if (mouseButtonWasPressed) {
        // Itera sobre os botões que foram desenhados e eram clicáveis na última frame
        for (let btn of currentClickableButtons) {
            if (checkButton(btn.x, btn.y, btn.w, btn.h)) {
                btn.callback();
                break; // Clicou em um botão, sai do loop
            }
        }
    }
    mouseButtonWasPressed = false; // Resetar
    currentClickableButtons = []; // Limpar a lista para a próxima frame
}

function checkButton(x, y, w, h) {
    return mouseX > x - w / 2 && mouseX < x + w / 2 &&
           mouseY > y - h / 2 && mouseY < y + h / 2;
}

function checkMachineButtons(machine) {
    // Lógica de clique para o botão de ação da máquina
    if (checkButton(machine.x, machine.y + 160, LARGURA_BOTAO, ALTURA_BOTAO_MAQUINA)) {
        let hasMaterials = false;
        let atCapacity = false;
        let canProduce = true;

        switch (machine.nome) {
            case "Serra":
                hasMaterials = (toras >= 1);
                atCapacity = (laminas + LAMINAS_POR_TORA > CAPACIDADE_LAMINA_MAX);
                break;
            case "Prensadora":
                hasMaterials = (laminas >= LAMINAS_NECESSARIAS_POR_CHAPA);
                atCapacity = (chapasCruas + 1 > CAPACIDADE_CHAPA_CRUA_MAX);
                break;
            case "Lixadeira":
                hasMaterials = (chapasCruas >= 1);
                atCapacity = (chapasLixadas + 1 > CAPACIDADE_CHAPA_LIXADA_MAX);
                break;
        }

        if (gamePaused) {
            showMessage("O jogo está pausado!");
            canProduce = false;
        } else if (machine.isProduzindo) {
            showMessage(`${machine.nome} já está produzindo!`);
            canProduce = false;
        } else if (!hasMaterials) {
            showMessage("Materiais insuficientes para iniciar!");
            canProduce = false;
        } else if (atCapacity) {
            showMessage("Estoque de destino cheio!");
            canProduce = false;
        }

        if (canProduce) {
            machine.iniciarProducao();
        }
    }

    // Lógica de clique para o botão de upgrade da máquina
    if (checkButton(machine.x, machine.y + 220, LARGURA_BOTAO, ALTURA_BOTAO_MAQUINA)) {
        let custoUpgrade = machine.custosUpgrade[machine.nivel];
        let isUpgradeDisabled = (machine.nivel >= machine.custosUpgrade.length) || (dinheiro < custoUpgrade) || gamePaused;
        if (!isUpgradeDisabled) {
            machine.upgrade(custoUpgrade);
        } else if (gamePaused) {
            showMessage("O jogo está pausado!");
        } else if (machine.nivel >= machine.custosUpgrade.length) {
            showMessage(`${machine.nome} já está no nível máximo!`);
        } else if (dinheiro < custoUpgrade) {
            showMessage(`Dinheiro insuficiente para o upgrade da ${machine.nome}!`);
        }
    }
}