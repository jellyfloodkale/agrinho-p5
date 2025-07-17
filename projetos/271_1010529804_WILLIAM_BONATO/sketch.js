// Variáveis de estado do jogo
let tela = 0; // 0: Tela inicial, 1: Fazenda, 2: Cidade

// Variáveis para elementos da interface
let botaoPlay;

// Variáveis para as imagens
let imgFazenda;
let imgCidade;
let imgCenouraEmoji;
let imgSemente;
let imgCasa;
let imgAreaPlantio;
let imgArvore;
let imgLoja;       // Imagem da loja (estrutura)
let imgVendedor; // Imagem do vendedor (personagem)

// --- VARIÁVEL ÚNICA PARA A IMAGEM DO BONECO ---
let imgBonecoPadrao; // A imagem padrão do boneco

// Variáveis do boneco
let bonecoX, bonecoY;
let velocidadeBoneco = 3;
let tamanhoBoneco = 40; // Tamanho do boneco

// Variáveis da área de plantio
let areaPlantioX = 50;
let areaPlantioY = 120;
let areaPlantioLargura = 300;
let areaPlantioAltura = 200;

// Variáveis das cenouras
let cenouras = [];
let tamanhoCenoura = 30; // Este é o tamanho da cenoura crescida

// Variáveis da cidade
let cidadeX = 0;
let velocidadeCidade = 2;

// Variáveis do vendedor na cidade
let vendedorX, vendedorY;
let tamanhoVendedor = 50;

// Variáveis da loja de sementes na cidade
let tamanhoLojaSementes = 70;

// Variáveis de recursos
let score = 0; // Cenouras coletadas
let moedas = 0;
let sementes = 0;

// Variável para controle de pressionamento de tecla
let keyIsPressed = false;

// Array para armazenar as árvores
let arvores = [];
const TAMANHO_ARVORE_BASE = 100;

// Preços e Tempos do jogo
const QUANTIDADE_SEMENTES_POR_COMPRA = 5;
const PRECO_PACOTE_SEMENTE = 1 * QUANTIDADE_SEMENTES_POR_COMPRA;
const MOEDAS_POR_CENOURA = 5;
const TEMPO_CRESCIMENTO_CENOURA = 5000;

// --- Variável para o som de crescimento da cenoura ---
let somCrescimentoCenoura; // Som para quando a cenoura cresce


// --- FUNÇÕES DE PRÉ-CARREGAMENTO E CONFIGURAÇÃO ---

function preload() {
    imgFazenda = loadImage("gramado.png");
    imgCidade = loadImage("cidade.png");
    imgCenouraEmoji = loadImage("cenoura2.png");
    imgSemente = loadImage("semente.png");
    imgCasa = loadImage("casa.png");
    imgAreaPlantio = loadImage("plantio.png");
    imgArvore = loadImage("arvore.png");
    imgVendedor = loadImage("vendedor.png");
    imgLoja = loadImage("loja.png");

    // --- IMAGEM PARA O BONECO ---
    imgBonecoPadrao = loadImage("men.png");

    // --- Carregamento do Som de Crescimento da Cenoura ---
    somCrescimentoCenoura = loadSound("plim_cenoura.mp3");
}

function setup() {
    createCanvas(600, 400);
    botaoPlay = createButton("Jogar");
    botaoPlay.position(width / 2 - 50, height / 2);
    botaoPlay.mousePressed(mudarParaFazenda);

    // --- PERSONAGEM COMEÇA NO CENTRO DO CENÁRIO ---
    bonecoX = width / 2;
    bonecoY = height / 2;

    inicializarCenouras();

    sementes = 5;

    vendedorX = 70;
    vendedorY = height - 80;

    // --- POSICIONAMENTO DAS ÁRVORES: APENAS ACIMA DA ÁREA DE PLANTIO ---
    arvores = [];
    arvores.push({ x: areaPlantioX + 20, y: areaPlantioY - 80, largura: TAMANHO_ARVORE_BASE, altura: TAMANHO_ARVORE_BASE });
    arvores.push({ x: areaPlantioX + 80, y: areaPlantioY - 70, largura: TAMANHO_ARVORE_BASE * 0.9, altura: TAMANHO_ARVORE_BASE * 0.9 });
    arvores.push({ x: areaPlantioX + 160, y: areaPlantioY - 90, largura: TAMANHO_ARVORE_BASE * 1.1, altura: TAMANHO_ARVORE_BASE * 1.1 });
    arvores.push({ x: areaPlantioX + 240, y: areaPlantioY - 60, largura: TAMANHO_ARVORE_BASE * 0.95, altura: TAMANHO_ARVORE_BASE * 0.95 });
    arvores.push({ x: areaPlantioX + 290, y: areaPlantioY - 80, largura: TAMANHO_ARVORE_BASE * 1.05, altura: TAMANHO_ARVORE_BASE * 1.05 });
}

function inicializarCenouras() {
    cenouras = [];
}


// --- LOOP PRINCIPAL DO JOGO ---

function draw() {
    if (tela === 0) {
        background(220);
        textSize(40);
        textAlign(CENTER);
        text("🥕𝒂𝒗𝒆𝒏𝒕𝒖𝒓𝒂 𝒅𝒂 𝒄𝒆𝒏𝒐𝒖𝒓𝒂🥕", width / 2, height / 3);
    } else if (tela === 1) { // Fazenda
        desenharFazenda();
        moverBoneco();
        verificarColheita();
        verificarPlantio();
        atualizarCrescimentoCenouras();
        verificarTransicaoCidade();
    } else if (tela === 2) { // Cidade
        desenharCidade();
        moverBonecoCidade();
        venderCenouras();
        comprarSementes();
        verificarTransicaoFazenda();
    }
}


// --- FUNÇÕES DE TRANSIÇÃO DE TELA ---

function mudarParaFazenda() {
    tela = 1;
    botaoPlay.remove();
}

function verificarTransicaoCidade() {
    let limiteInferiorTransicao = height - 50 + tamanhoBoneco / 2;
    if (bonecoY > limiteInferiorTransicao) {
        tela = 2;
        bonecoX = width / 2;
        bonecoY = height - 60;
    }
}

function verificarTransicaoFazenda() {
    let limiteSuperiorTransicao = 50 - tamanhoBoneco / 2;
    if (bonecoY < limiteSuperiorTransicao) {
        tela = 1;
        bonecoX = width / 2;
        bonecoY = height - 60;
    }
}


// --- FUNÇÕES DA FAZENDA (TELA 1) ---

function desenharFazenda() {
    background(imgFazenda);

    image(imgCasa, width - 200, 120, 180, 180); 
    
    image(imgAreaPlantio, areaPlantioX, areaPlantioY, areaPlantioLargura, areaPlantioAltura);

    // Desenha todas as árvores no array 'arvores'
    for (let i = 0; i < arvores.length; i++) {
        let arvore = arvores[i];
        image(imgArvore, arvore.x, arvore.y, arvore.largura, arvore.altura);
    }

    // --- DESENHA O BONECO USANDO APENAS A IMAGEM PADRÃO ---
    image(imgBonecoPadrao, bonecoX - tamanhoBoneco / 2, bonecoY - tamanhoBoneco / 2, tamanhoBoneco, tamanhoBoneco);

    for (let i = 0; i < cenouras.length; i++) {
        if (!cenouras[i].coletada) {
            if (cenouras[i].crescida) {
                image(
                    imgCenouraEmoji,
                    cenouras[i].x - tamanhoCenoura / 2,
                    cenouras[i].y - tamanhoCenoura / 2,
                    tamanhoCenoura,
                    tamanhoCenoura
                );
            } else {
                // --- AQUI É ONDE MUDAMOS O TAMANHO DA SEMENTE ---
                image(
                    imgSemente,
                    cenouras[i].x - 20 / 2, // Metade do novo tamanho para centralizar
                    cenouras[i].y - 20 / 2, // Metade do novo tamanho para centralizar
                    20, // Novo tamanho da largura da semente
                    20  // Novo tamanho da altura da semente
                );
            }
        }
    }

    fill(200);
    rect(0, height - 50, width, 50);
    fill(245);
    textAlign(CENTER, CENTER);
    fill("black")
    text("Ir para a Cidade", width / 2, height - 25);

    fill(0);
    textSize(16);
    textAlign(RIGHT);
    fill("white");
    text("Cenouras Coletadas: " + score, width - 20, 30);
    text("Sementes: " + sementes, width - 20, 50);

    fill(0);
    textSize(16);
    textAlign(CENTER);
    fill("white")
    text("Pressione Q para Plantar Semente na área de plantio", width / 2, height - 80);
}

function moverBoneco() {
    if (keyIsDown(LEFT_ARROW)) {
        bonecoX -= velocidadeBoneco;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        bonecoX += velocidadeBoneco;
    }
    if (keyIsDown(UP_ARROW)) {
        bonecoY -= velocidadeBoneco;
    }
    if (keyIsDown(DOWN_ARROW)) {
        bonecoY += velocidadeBoneco;
    }

    bonecoX = constrain(bonecoX, tamanhoBoneco / 2, width - tamanhoBoneco / 2);
    bonecoY = constrain(bonecoY, tamanhoBoneco / 2, height - tamanhoBoneco / 2);
}

function verificarColheita() {
    for (let i = 0; i < cenouras.length; i++) {
        if (
            !cenouras[i].coletada &&
            cenouras[i].crescida &&
            dist(bonecoX, bonecoY, cenouras[i].x, cenouras[i].y) <
            tamanhoBoneco / 2 + tamanhoCenoura / 2
        ) {
            cenouras[i].coletada = true;
            score++;
        }
    }
}

function verificarPlantio() {
    if (
        keyIsDown(81) &&
        !keyIsPressed &&
        sementes > 0 &&
        bonecoX > areaPlantioX &&
        bonecoX < areaPlantioX + areaPlantioLargura &&
        bonecoY > areaPlantioY &&
        bonecoY < areaPlantioY + areaPlantioAltura
    ) {
        keyIsPressed = true;
        cenouras.push({
            x: bonecoX,
            y: bonecoY,
            coletada: false,
            crescida: false,
            tempoPlantio: millis(),
        });
        sementes--;
        console.log("Semente plantada! Sementes restantes: " + sementes);
    }
}

function atualizarCrescimentoCenouras() {
    for (let i = 0; i < cenouras.length; i++) {
        if (!cenouras[i].crescida && !cenouras[i].coletada) {
            if (millis() - cenouras[i].tempoPlantio >= TEMPO_CRESCIMENTO_CENOURA) {
                cenouras[i].crescida = true;
                if (somCrescimentoCenoura.isLoaded()) {
                    somCrescimentoCenoura.play();
                }
                console.log("Uma cenoura cresceu!");
            }
        }
    }
}


// --- FUNÇÕES DA CIDADE (TELA 2) ---

function desenharCidade() {
    background(imgCidade);

    // --- DESENHA O BONECO USANDO APENAS A IMAGEM PADRÃO ---
    image(imgBonecoPadrao, bonecoX - tamanhoBoneco / 2, bonecoY - tamanhoBoneco / 2, tamanhoBoneco, tamanhoBoneco);

    let tamanhoVendedorAumentado = 75;
    image(
        imgVendedor,
        vendedorX - tamanhoVendedorAumentado / 2,
        vendedorY - tamanhoVendedorAumentado,
        tamanhoVendedorAumentado,
        tamanhoVendedorAumentado
    );
    fill(250);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text("Vendedor", vendedorX, vendedorY - tamanhoVendedorAumentado - 5);

    let compradorX = width - 100;
    let compradorY = height - 80 + (tamanhoLojaSementes - tamanhoVendedor);
    image(
        imgLoja,
        compradorX - tamanhoLojaSementes / 2,
        compradorY - tamanhoLojaSementes,
        tamanhoLojaSementes,
        tamanhoLojaSementes
    );
    fill(255);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text("Loja de Sementes", compradorX, compradorY - tamanhoLojaSementes - 5);

    fill(150);
    rect(0, 0, width, 50);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Voltar para a Fazenda", width / 2, 25);

    fill(0);
    textSize(16);
    textAlign(RIGHT);
    fill("white");
    text("Cenouras para Vender: " + score, width - 20, 70);
    text("Moedas: " + moedas, width - 20, 90);
    text("Sementes: " + sementes, width - 20, 110);

    if (
        dist(bonecoX, bonecoY, vendedorX, vendedorY - tamanhoVendedorAumentado / 2) <
        tamanhoBoneco / 2 + tamanhoVendedorAumentado / 2
    ) {
        fill(0);
        textAlign(CENTER);
        textSize(20);
        fill("white");
        text("Pressione ESPAÇO para Vender Cenouras!", width / 2, height / 2 - 30);
    }

    if (
        dist(bonecoX, bonecoY, compradorX, compradorY - tamanhoLojaSementes / 2) <
        tamanhoBoneco / 2 + tamanhoLojaSementes / 2
    ) {
        fill(0);
        textAlign(CENTER);
        textSize(20);
        fill("white");
        text(
            `Pressione S para Comprar ${QUANTIDADE_SEMENTES_POR_COMPRA} Sementes (${PRECO_PACOTE_SEMENTE} moedas)`,
            width / 2,
            height / 2 + 10
        );
    }
}

function moverBonecoCidade() {
    if (keyIsDown(LEFT_ARROW)) {
        bonecoX -= velocidadeBoneco;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        bonecoX += velocidadeBoneco;
    }
    if (keyIsDown(UP_ARROW)) {
        bonecoY -= velocidadeBoneco;
    }
    if (keyIsDown(DOWN_ARROW)) {
        bonecoY += velocidadeBoneco;
    }

    bonecoX = constrain(bonecoX, tamanhoBoneco / 2, width - tamanhoBoneco / 2);
    bonecoY = constrain(bonecoY, tamanhoBoneco / 2, height - tamanhoBoneco / 2);
}

function venderCenouras() {
    if (keyIsDown(32) && !keyIsPressed) {
        keyIsPressed = true;
        if (
            dist(bonecoX, bonecoY, vendedorX, vendedorY - tamanhoVendedor / 2) <
            tamanhoBoneco / 2 + tamanhoVendedor / 2 &&
            score > 0
        ) {
            moedas += score * MOEDAS_POR_CENOURA;
            console.log(
                `Você vendeu ${score} cenouras e ganhou ${
                    score * MOEDAS_POR_CENOURA
                } moedas! Total de moedas: ${moedas}`
            );
            score = 0;
        }
    }
}

function comprarSementes() {
    let compradorX = width - 100;
    let compradorY = height - 80 + (tamanhoLojaSementes - tamanhoVendedor);

    if (keyIsDown(83) && !keyIsPressed) {
        keyIsPressed = true;
        if (
            dist(bonecoX, bonecoY, compradorX, compradorY - tamanhoLojaSementes / 2) <
            tamanhoBoneco / 2 + tamanhoLojaSementes / 2 &&
            moedas >= PRECO_PACOTE_SEMENTE
        ) {
            moedas -= PRECO_PACOTE_SEMENTE;
            sementes += QUANTIDADE_SEMENTES_POR_COMPRA;
            console.log(
                `Você comprou ${QUANTIDADE_SEMENTES_POR_COMPRA} sementes! Sementes: ${sementes}, Moedas: ${moedas}`
            );
        } else if (
            dist(bonecoX, bonecoY, compradorX, compradorY - tamanhoLojaSementes / 2) <
            tamanhoBoneco / 2 + tamanhoLojaSementes / 2 &&
            moedas < PRECO_PACOTE_SEMENTE
        ) {
            console.log(
                "Você não tem moedas suficientes para comprar o pacote de sementes!"
            );
        }
    }
}


// --- FUNÇÕES DE TECLADO ---

function keyPressed() {
    // Esta função pode ser usada para lógica de "um único toque" de tecla.
}

function keyReleased() {
    keyIsPressed = false; // Reseta a flag quando a tecla é solta
}