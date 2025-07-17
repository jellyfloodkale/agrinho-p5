// --- Variáveis Globais ---
const groundHeight = 60;
let totalCollectedCount = 0;
let gameState = "start"; // "start", "story", "instructions", "playing", "gameover", "ending"
let currentLevel = 1;
const totalLevels = 25;
let lives = 3;
let spikes = [];
let platforms = [];
let collectibles = [];
let collectedItems = {}; // Armazena os índices dos itens coletados por fase
let clouds = [];
let trees = [];
let bushs = [];
let wheatField = [];

// Imagens
let imgChao;
let imgPeixe;
let imgChaoCidade;
let imgNuvem, imgNuvem2;
let imgMilho;
let imgArvore;
let imgArbusto;
let imgMaca;
let imgTelaInicial;
let imgTrigo;
let heartRed, heartGray;

// Imagens das Telas do Jogo
let imgHistoria;
let imgInstrucoes;
let imgGameOver;
let imgEndingVitoria;

// Jogador e Mecânicas do Jogo
let player;
let lastPlayerX = null;
let lastPlayerY = null;
let skyImages = []; // Armazena as imagens de céu para cada fase
let currentSkyImage; // Imagem de céu da fase atual
let coins = 0;
const COLLECTIBLE_VALUE = 5;
let heartSize = 90;

// Sons
let bgMusic, collectSound;
let deathSound;
let playerWalkSound;

// Variáveis para a mensagem de venda
let showSellMessage = false;
let sellMessageText = "";
let sellMessageTimer = 0;
const SELL_MESSAGE_DURATION = 120; // Duração da mensagem em frames (aprox. 2 segundos a 60 FPS)


// --- Funções Essenciais do p5.js ---
function preload() {
    // Carrega as imagens de céu para cada nível
    skyImages[1] = loadImage("img/FASE1.png");
    skyImages[2] = loadImage("img/FASE2.png");
    skyImages[3] = loadImage("img/FASE3.png");
    skyImages[4] = loadImage("img/FASE4.png");
    skyImages[5] = loadImage("img/FASE8.png");
    skyImages[6] = loadImage("img/FASE6DIA14.png");
    skyImages[7] = loadImage("img/plantaçao milho.png");
    skyImages[8] = loadImage("img/VARIAÇAOCAMPO.png");
    skyImages[9] = loadImage("img/cenafenos.png");
    skyImages[10] = loadImage("img/fase10.png");
    skyImages[11] = loadImage("img/divisaoatualizado.png");
    skyImages[12] = loadImage("img/primeirafasecidade.png");
    skyImages[13] = loadImage("img/FASE13NEW.png");
    skyImages[14] = loadImage("img/casalaranja.png");
    skyImages[15] = loadImage("img/FONTE D'AGUA.png");
    skyImages[16] = loadImage("img/feira.png");
    skyImages[17] = loadImage("img/FASE17.png");
    skyImages[18] = loadImage("img/MERCADO.png");
    skyImages[19] = loadImage("img/segundapartemercado.png");
    skyImages[20] = loadImage("img/FASE20.png");
    skyImages[21] = loadImage("img/FESTADOCAMPO.png");
    skyImages[22] = loadImage("img/FASE20.png");

    imgTrigo = loadImage("img/TRIGOcreenshot_1-removebg-preview.png");
    imgChao = loadImage("img/chao_bom-removebg-preview.png");
    imgPeixe = loadImage("img/PEIXEE-removebg-preview.png");
    imgChaoCidade = loadImage("img/groundcidade-removebg-preview.png");
    imgNuvem = loadImage("img/nuvem-removebg-preview (1).png");
    imgNuvem2 = loadImage("img/nuvem_2-removebg-preview.png");
    imgMilho = loadImage("img/MILHO-removebg-preview.png");
    imgArvore = loadImage("img/arvore.png");
    imgArbusto = loadImage("img/arbustomato-removebg-preview.png");
    imgMaca = loadImage("img/maça-removebg-preview (1).png");
    imgTelaInicial = loadImage("img/terraescrito.png");
    heartRed = loadImage('img/RedHeart.png');
    heartGray = loadImage('img/GrayHeart.png');

    // Carrega os sons
    bgMusic = loadSound('music/Casino Night Fever.mp3');
    collectSound = loadSound('music/collect.mp3');
    deathSound = loadSound('music/morte.mp3');
    playerWalkSound = loadSound('music/andando rolando.mp3');

    // Carrega as imagens das telas
    imgHistoria = loadImage("img/historiaescrito.png");
    imgInstrucoes = loadImage("img/instruçoes atualizado.png");
    imgGameOver = loadImage("img/gameoverescrito.png");
    imgEndingVitoria = loadImage("img/completouobjetivo.png");
}

function setup() {
    createCanvas(800, 400);
    player = new Player(50, height - 50);
    setupLevel(currentLevel, false);
    generateClouds(); // Geração inicial das nuvens

    playerWalkSound.setLoop(true);
    playerWalkSound.setVolume(0.20);
}

function draw() {
    // Desenha a imagem de céu da fase atual
    if (currentSkyImage) {
        image(currentSkyImage, 0, 0, width, height);
    } else {
        background(100, 200, 255); // Cor de fallback
    }

    // Desenha as nuvens apenas se não for a fase 11 ou 18
    drawClouds();
    updateClouds();

    drawScenery(); // Desenha elementos de cenário específicos da fase

    // Gerenciamento dos estados do jogo
    if (gameState === "start") {
        drawStartScreen();
    } else if (gameState === "story") {
        drawStoryScreen();
    } else if (gameState === "instructions") {
        drawInstructionsScreen();
    } else if (gameState === "playing") {
        playGame();
    } else if (gameState === "gameover") {
        drawGameOverScreen();
    } else if (gameState === "ending") {
        drawEndingScreen();
    }

    // Desenha a mensagem de venda se estiver ativa
    if (showSellMessage) {
        drawSellMessage();
    }
}

// --- Classes ---
class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.radius = 19.5;
        this.onGround = true;
        this.nickname = "Larry";
        this.angle = 0;
        this.angularSpeed = 0;
    }

    jump() {
        if (this.onGround) {
            this.vel.y = -10;
            this.onGround = false;
        }
    }

    move(dir) {
        this.pos.x += dir * 5;
        this.angularSpeed = dir * 0.1;
    }

    update() {
        this.vel.y += 0.5;
        this.pos.add(this.vel);
        this.onGround = false;

        if (abs(this.vel.x) > 0.1 || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
            this.angle += this.angularSpeed;
        } else {
            this.angularSpeed = 0;
        }

        // Colisão com o chão
        if (this.pos.y + this.radius >= height - 40) {
            this.pos.y = height - 40 - this.radius;
            this.vel.y = 0;
            this.onGround = true;
        }
        // Colisão com plataformas
        for (let platform of platforms) {
            if (platform.type === "fundo-visual") continue;

            let playerBottom = this.pos.y + this.radius;
            let playerTop = this.pos.y - this.radius;
            let playerLeft = this.pos.x - this.radius;
            let playerRight = this.pos.x + this.radius;

            let platTop = platform.y;
            let platBottom = platform.y + platform.h;
            let platLeft = platform.x;
            let platRight = platform.x + platform.w;

            let isColliding = playerRight > platLeft &&
                playerLeft < platRight &&
                playerBottom > platTop &&
                playerTop < platBottom;

            if (isColliding) {
                let overlapBottom = playerBottom - platTop;
                let overlapTop = platBottom - playerTop;
                let overlapLeft = playerRight - platLeft;
                let overlapRight = platRight - playerLeft;

                let minOverlap = Math.min(overlapBottom, overlapTop, overlapLeft, overlapRight);

                if (minOverlap === overlapBottom) {
                    this.pos.y = platTop - this.radius;
                    this.vel.y = 0;
                    this.onGround = true;
                } else if (minOverlap === overlapTop) {
                    this.pos.y = platBottom + this.radius;
                    this.vel.y = 0;
                } else if (minOverlap === overlapLeft) {
                    this.pos.x = platLeft - this.radius;
                } else if (minOverlap === overlapRight) {
                    this.pos.x = platRight - this.radius;
                }
            }
        }
    }

    hitsSpike(spike) {
        let playerBottom = this.pos.y + this.radius;
        let playerTop = this.pos.y - this.radius;
        let playerLeft = this.pos.x - this.radius;
        let playerRight = this.pos.x + this.radius;

        let spikeBottom = spike.y + spike.h;
        let spikeTop = spike.y;
        let spikeLeft = spike.x;
        let spikeRight = spike.x + spike.w;

        return playerRight > spikeLeft &&
            playerLeft < spikeRight &&
            playerBottom > spikeTop &&
            playerTop < spikeBottom;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);

        fill(255, 204, 0); // Corpo do jogador
        ellipse(0, 0, this.radius * 2);

        fill(0); // Olhos
        ellipse(-this.radius * 0.3, -this.radius * 0.3, this.radius * 0.2);
        ellipse(this.radius * 0.3, -this.radius * 0.3, this.radius * 0.2);

        noFill(); // Boca
        stroke(0);
        strokeWeight(2);
        arc(0, this.radius * 0.2, this.radius * 0.6, this.radius * 0.4, 0, PI);

        pop();

        fill(0);
        textAlign(CENTER);
        textSize(16);
        text(this.nickname, this.pos.x, this.pos.y - this.radius - 20);
    }

    collects(item) {
        let d = dist(this.pos.x, this.pos.y, item.x, item.y);
        return d < this.radius + 10;
    }
}

class Collectible {
    constructor(x, y, emoji, collected = false) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
        this.collected = collected;
    }

    show() {
        if (!this.collected) {
            if (this.emoji === "🌽") {
                image(imgMilho, this.x, this.y, 45, 45);
            } else if (currentLevel === 3 && this.emoji === "🌾") {
                image(imgTrigo, this.x, this.y, 35, 35);
            } else if (currentLevel === 4 && this.emoji === "🐟") {
                image(imgPeixe, this.x, this.y, 30, 30);
            } else if (this.emoji === "🍎") {
                image(imgMaca, this.x, this.y, 30, 30);
            } else {
                textSize(50);
                text(this.emoji, this.x, this.y);
            }
        }
    }
}

class Platform {
    constructor(x, y, w, h, type = "terra") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }

    show() {
        drawPlatformVisual(this);
    }
}

class Spike {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
    }

    show() {
        fill(255, 0, 0);
        triangle(this.x, this.y + this.h,
            this.x + this.w / 2, this.y,
            this.x + this.w, this.y + this.h);
    }
}

// --- Funções de Gerenciamento do Estado do Jogo ---
function playGame() {
    drawLevelInfo();
    drawGround();

    for (let spike of spikes) spike.show();
    for (let platform of platforms) platform.show();

    drawHearts(lives, width - (heartSize + heartSize * 0.1) * 3 - 10, 20);

    // Verifica colisão com espinhos
    for (let spike of spikes) {
        if (player.hitsSpike(spike)) {
            lives--;
            if (deathSound) deathSound.play();

            if (lives <= 0) {
                gameState = "gameover";
                bgMusic.stop();
                playerWalkSound.stop();
            } else {
                gameState = "waitingRespawn";
                playerWalkSound.stop();
                setTimeout(() => {
                    // Ao morrer, retorna ao nível 1, mas mantém os itens coletados
                    currentLevel = 1;
                    setupLevel(currentLevel, true);
                    player.pos.x = 50;
                    player.pos.y = height - 50;
                    gameState = "playing";
                }, 1000);
            }
            return;
        }
    }

    // Movimentação do jogador e controle do som de passos
    let isMoving = false;
    if (keyIsDown(LEFT_ARROW)) {
        player.move(-1);
        isMoving = true;
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.move(1);
        isMoving = true;
    }

    if (isMoving && !playerWalkSound.isPlaying()) {
        playerWalkSound.play();
    } else if (!isMoving && playerWalkSound.isPlaying()) {
        playerWalkSound.stop();
    }

    player.update();
    player.show();

    // Mostrar e checar coleta dos itens
    for (let i = 0; i < collectibles.length; i++) {
        let item = collectibles[i];
        item.show();

        if (!item.collected && player.collects(item)) {
            item.collected = true;
            collectSound.play();
            // Adiciona o índice do item à lista de coletados para a fase atual
            collectedItems[currentLevel] = collectedItems[currentLevel] || [];
            if (!collectedItems[currentLevel].includes(i)) {
                collectedItems[currentLevel].push(i);
                totalCollectedCount++;
            }
        }
    }

    // Avança para o próximo nível
    if (player.pos.x + player.radius >= width) nextLevel();

    // Volta ou limita o movimento no lado esquerdo
    if (currentLevel === 1 && player.pos.x - player.radius <= 0) {
        player.pos.x = player.radius;
    } else if (player.pos.x - player.radius <= 0) {
        previousLevel();
    }

    // Exibe a mensagem "Pressione 'P' para vender" no nível 18
    if (currentLevel === 18) {
        fill(0);
        textSize(24);
        textAlign(CENTER);
        text("Pressione 'P' para vender", width / 2, 70);
    }
}

function drawStartScreen() {
    if (imgTelaInicial) {
        image(imgTelaInicial, 0, 0, width, height);
    } else {
        background(100, 200, 255);
    }
}

function drawStoryScreen() {
    if (imgHistoria) {
        image(imgHistoria, 0, 0, width, height);
    }
}

function drawInstructionsScreen() {
    if (imgInstrucoes) {
        image(imgInstrucoes, 0, 0, width, height);
    }
}

function drawGameOverScreen() {
    if (imgGameOver) {
        image(imgGameOver, 0, 0, width, height);
    }
}

function drawEndingScreen() {
    if (imgEndingVitoria) {
        image(imgEndingVitoria, 0, 0, width, height);
    } else {
        background(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(40);
        text("VITÓRIA!!", width / 2, height / 2);
    }
}

// --- Funções de Gerenciamento de Nível ---
function setupLevel(level, keepCollected = false) {
    spikes = [];
    platforms = [];
    collectibles = [];
    // collectedItems[level] = collectedItems[level] || []; // Esta linha é redundante se usamos o parametro keepCollected

    currentSkyImage = skyImages[level];

    // Remove as nuvens para os níveis 11 e 18, caso contrário, as gera
    if (level === 11 || level === 18) {
        clouds = [];
    } else {
        generateClouds();
    }

    // Configuração específica de cada nível
    switch (level) {
        case 1:
            spikes.push(new Spike(200, height - groundHeight - 10));
            spikes.push(new Spike(350, height - groundHeight - 10));
            collectibles.push(new Collectible(263, height - groundHeight - 20, "🍎"));
            collectibles.push(new Collectible(560, height - groundHeight - 20, "🍎"));
            trees = [{
                x: 150,
                y: height - groundHeight - 100
            }];
            bushs = [{
                x: 100,
                y: height - groundHeight - 40
            }, {
                x: 300,
                y: height - groundHeight - 40
            }, {
                x: 500,
                y: height - groundHeight - 40
            }];
            break;

        case 2:
            spikes.push(new Spike(340, height - groundHeight - 10));
            spikes.push(new Spike(490, height - groundHeight - 10));
            collectibles.push(new Collectible(410, height - groundHeight - 20, "🍎"));
            collectibles.push(new Collectible(188, 260 - groundHeight - 20, "🍎"));
            platforms.push(new Platform(280, height - groundHeight - 30, 50, 50, "tronco"));
            platforms.push(new Platform(520, height - groundHeight - 10, 200, 30, "tronco"));
            break;

        case 3:
            trees = [{
                x: 150,
                y: height - groundHeight - 100
            }];
            spikes.push(new Spike(478, height - groundHeight - 10));
            collectibles.push(new Collectible(350, height - groundHeight - 20, "🌾"));
            collectibles.push(new Collectible(600, height - groundHeight - 20, "🌾"));
            collectibles.push(new Collectible(700, height - groundHeight - 20, "🌾"));
            wheatField = [];
            for (let x = 100; x < width - 50; x += 40) {
                wheatField.push({
                    x: x,
                    y: height - groundHeight - 20
                });
            }
            platforms.push(new Platform(250, height - groundHeight - 60, 80, 30, "céu"));
            platforms.push(new Platform(400, height - groundHeight - 120, 100, 30, "céu"));
            platforms.push(new Platform(640, height - 150, 50, 10, "tronco"));
            break;

        case 4:
            platforms.push(new Platform(0, height - 150, width, 30, "terra"));
            spikes.push(new Spike(200, height - 170));
            spikes.push(new Spike(500, height - 170));
            collectibles.push(new Collectible(250, height - 85, "🐟"));
            collectibles.push(new Collectible(320, height - 85, "🐟"));
            collectibles.push(new Collectible(490, height - 85, "🐟"));
            collectibles.push(new Collectible(600, height - 180, "🐟"));
            collectibles.push(new Collectible(450, height - 180, "🐟"));
            break;

        case 5:
            collectibles.push(new Collectible(742, height - groundHeight - 20, "🌽"));
            platforms.push(new Platform(168, height - 150, 50, 10, "tronco"));
            platforms.push(new Platform(300, height - 200, 50, 30, "céu"));
            platforms.push(new Platform(450, height - 150, 50, 10, "tronco"));
            platforms.push(new Platform(600, height - 200, 50, 30, "céu"));
            spikes.push(new Spike(250, height - groundHeight - 10));
            spikes.push(new Spike(350, height - groundHeight - 10));
            spikes.push(new Spike(450, height - groundHeight - 10));
            spikes.push(new Spike(550, height - groundHeight - 10));
            spikes.push(new Spike(650, height - groundHeight - 10));
            spikes.push(new Spike(300, height - groundHeight - 10));
            spikes.push(new Spike(400, height - groundHeight - 10));
            spikes.push(new Spike(500, height - groundHeight - 10));
            spikes.push(new Spike(600, height - groundHeight - 10));
            break;

        case 6:
            spikes.push(new Spike(250, height - groundHeight - 10));
            spikes.push(new Spike(388, height - groundHeight - 10));
            spikes.push(new Spike(544, height - groundHeight - 10));
            collectibles.push(new Collectible(332, height - groundHeight - 20, "🍎"));
            collectibles.push(new Collectible(700, height - groundHeight - 20, "🍎"));
            break;

        case 7:
            spikes.push(new Spike(145, height - groundHeight - 10));
            spikes.push(new Spike(304, height - groundHeight - 10));
            spikes.push(new Spike(516, height - groundHeight - 10));
            spikes.push(new Spike(736, height - groundHeight - 10)); // Aqui era um coletável, voltei para Spike. Se era coletável, ajuste conforme os outros níveis.
            collectibles.push(new Collectible(200, height - groundHeight - 20, "🌽"));
            collectibles.push(new Collectible(400, height - groundHeight - 20, "🌽"));
            collectibles.push(new Collectible(600, height - groundHeight - 20, "🌽"));
            break;

        case 8:
            collectibles.push(new Collectible(560, 240 - groundHeight - 20, "🍎"));
            platforms.push(new Platform(370, height - 140, 50, 30, "céu"));
            spikes.push(new Spike(392, height - groundHeight - 10));
            spikes.push(new Spike(503, height - groundHeight - 10));
            platforms.push(new Platform(250, height - 200, 50, 30, "céu"));
            collectibles.push(new Collectible(180, 260 - groundHeight - 20, "🍎"));
            break;

        case 9:
            spikes.push(new Spike(320, height - groundHeight - 10));
            spikes.push(new Spike(491, height - groundHeight - 10));
            break;

        case 10:
            break;

        case 11:
            break;

        case 12:
            spikes.push(new Spike(476, height - groundHeight - 10));
            spikes.push(new Spike(678, height - groundHeight - 10));
            break;
        case 13:
            spikes.push(new Spike(364, height - groundHeight - 10));
            spikes.push(new Spike(385, height - groundHeight - 10));
            break;
        case 14:
            spikes.push(new Spike(642, height - groundHeight - 10));
            spikes.push(new Spike(679, height - groundHeight - 10));
            spikes.push(new Spike(140, height - groundHeight - 10));
            spikes.push(new Spike(163, height - groundHeight - 10));
            break;
        case 15:
            break;
        case 16:
            spikes.push(new Spike(396, height - groundHeight - 10));
            break;
        case 19:
            spikes.push(new Spike(669, height - groundHeight - 10));
            break;

        default:
            break;
    }

    // Aplica o estado de coleta para os itens da fase atual
    // Verifica se há itens coletados registrados para o nível atual
    if (collectedItems[level]) {
        for (let i = 0; i < collectibles.length; i++) {
            // Se o índice do item atual estiver na lista de itens coletados, marca-o como coletado
            if (collectedItems[level].includes(i)) {
                collectibles[i].collected = true;
            }
        }
    }
}

function nextLevel() {
    lastPlayerX = player.pos.x;
    lastPlayerY = player.pos.y;

    currentLevel++;
    if (currentLevel === 22) { // Última fase antes da tela de vitória
        gameState = "ending";
        bgMusic.stop();
        playerWalkSound.stop();
        return;
    }

    if (currentLevel > totalLevels) currentLevel = 1; // Volta ao nível 1 se passar do limite de fases

    setupLevel(currentLevel, true); // Ao avançar de nível, mantém os itens já coletados
    player.pos.x = 0 + player.radius + 1; // Posiciona o jogador no início do novo nível
    player.pos.y = lastPlayerY;
}

function previousLevel() {
    lastPlayerX = player.pos.x;
    lastPlayerY = player.pos.y;

    currentLevel--;
    if (currentLevel < 1) currentLevel = 1; // Impede que o nível seja menor que 1

    setupLevel(currentLevel, true); // Ao voltar de nível, mantém os itens já coletados
    player.pos.x = width - player.radius - 1; // Posiciona o jogador no final do nível anterior
    player.pos.y = lastPlayerY;
}

// --- Funções de Desenho e Utilitários ---
function drawLevelInfo() {
    let boxX = 10;
    let boxY = 10;
    let boxWidth = 180;
    let boxHeight = 80;

    fill(0, 0, 0, 150);
    rect(boxX, boxY, boxWidth, boxHeight, 10);

    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);

    text(`Coletados: ${totalCollectedCount}`, boxX + 10, boxY + 10);
    text(`Moedas: ${coins}`, boxX + 10, boxY + 40);
}

function drawGround() {
    let imgToUse = (currentLevel >= 12 && currentLevel <= 21) ? imgChaoCidade : imgChao;

    if (imgToUse) {
        for (let x = 0; x < width; x += imgToUse.width) {
            image(imgToUse, x, height - imgToUse.height);
        }
    } else {
        fill(100, 255, 100);
        rect(0, height - 20, width, 20);
    }
}

function drawPlatformVisual(platform) {
    if (platform.type === "fundo-visual") {
        for (let x = platform.x; x < platform.x + platform.w; x += imgChao.width) {
            image(imgChao, x, platform.y, imgChao.width, imgChao.height);
        }
        return;
    }

    if (platform.type === "terra") {
        fill(139, 69, 19);
        rect(platform.x, platform.y, platform.w, platform.h);
    }
    else if (platform.type === "tronco") {
        fill(67, 37, 18);
        rect(platform.x, platform.y, platform.w, platform.h);
    }
    if (platform.type === "céu") {
        fill("white");
        rect(platform.x, platform.y, platform.w, platform.h);

    
    }
}

function drawClouds() {
    // Desenha as nuvens apenas se não for a fase 11 ou 18
    if (currentLevel !== 11 && currentLevel !== 18) {
        for (let i = 0; i < clouds.length; i++) {
            let cloud = clouds[i];
            let imgToUse = (cloud.type === 1) ? imgNuvem : imgNuvem2;

            let cloudSize = cloud.size;
            if (i === 0) {
                cloudSize = cloud.size * 1.5;
            }

            let scaleFactor = cloudSize / imgToUse.height;
            let imgWidth = imgToUse.width * scaleFactor;
            let imgHeight = cloudSize;

            image(imgToUse, cloud.x, cloud.y, imgWidth, imgHeight);
        }
    }
}

function generateClouds() {
    clouds = [];
    clouds.push({
        x: 50,
        y: 60,
        size: 80,
        speed: 0.3,
        type: 1
    });

    for (let i = 0; i < 6; i++) {
        clouds.push({
            x: random(width),
            y: random(30, 100),
            size: random(50, 70),
            speed: 0.15,
            type: 2
        });
    }
}

function updateClouds() {
    // Atualiza a posição das nuvens apenas se não for a fase 11 ou 18
    if (currentLevel !== 11 && currentLevel !== 18) {
        for (let cloud of clouds) {
            cloud.x += cloud.speed;

            if (cloud.x > width + 100) {
                cloud.x = -100;
                cloud.y = random(30, 100);
            }
        }
    }
}

function drawWheatField() {
    for (let wheat of wheatField) {
        image(imgTrigo, wheat.x, wheat.y, 30, 30);
    }
}

function drawRiverScene() {
    noStroke();
    fill(30, 144, 255, 220);
    rect(0, height - 120, width, 120);

    fill(100);
    ellipse(100, height - 80, 60, 40);
    ellipse(250, height - 90, 70, 50);
    ellipse(550, height - 85, 65, 45);

    fill(120);
    ellipse(150, height - 40, 80, 50);
    ellipse(600, height - 60, 60, 40);

    fill(150);
    ellipse(170, height - 60, 30, 20);
    ellipse(400, height - 70, 25, 15);
    ellipse(700, height - 65, 35, 25);
    ellipse(250, height - 30, 30, 20);
    ellipse(350, height - 35, 25, 15);
    ellipse(480, height - 30, 20, 15);
}

function drawScenery() {
    if (currentLevel === 3) {
        drawWheatField();
        for (let arvore of trees) {
            image(imgArvore, 500, 20, 300, height - groundHeight);
        }
    }
    if (currentLevel === 4) {
        drawRiverScene();
    }
}

function drawHearts(hearts, xStart, y) {
    for (let i = 0; i < 3; i++) {
        if (i < hearts) {
            image(heartRed, xStart + i * (heartSize + heartSize * 0.1), y, heartSize, heartSize);
        } else {
            image(heartGray, xStart + i * (heartSize + heartSize * 0.1), y, heartSize, heartSize);
        }
    }
}

// Função para exibir a mensagem de venda
function drawSellMessage() {
    if (showSellMessage) {
        fill(0, 0, 0, 180); // Fundo semi-transparente para a mensagem
        rect(width - 300, 10, 290, 60, 10); // Posição e tamanho da caixa de mensagem

        fill(255); // Cor do texto
        textSize(18);
        textAlign(RIGHT, TOP);
        text(sellMessageText, width - 20, 25); // Posição do texto dentro da caixa

        sellMessageTimer--;
        if (sellMessageTimer <= 0) {
            showSellMessage = false; // Desativa a mensagem após o tempo
        }
    }
}

function keyPressed() {
    if (gameState === "start" && keyCode === ENTER) {
        gameState = "story";
        if (!bgMusic.isPlaying()) {
            bgMusic.setLoop(true);
            bgMusic.setVolume(0.5);
            bgMusic.play();
        }
    } else if (gameState === "story" && keyCode === ENTER) {
        gameState = "instructions";
    } else if (gameState === "instructions" && keyCode === ENTER) {
        gameState = "playing";
    } else if (gameState === "gameover" && keyCode === ENTER) {
        lives = 3;
        currentLevel = 1;
        totalCollectedCount = 0;
        coins = 0;
        collectedItems = {}; // Limpa TODOS os itens coletados quando o jogo recomeça
        gameState = "start";
        setupLevel(currentLevel, false);
        player.pos.x = 50;
        player.pos.y = height - 50;
    } else if (gameState === "playing") {
        if (keyCode === UP_ARROW) {
            player.jump();
        } else if (keyCode === 80 && currentLevel === 18) { // Tecla 'P'
            sellCollectibles();
        }
    } else if (gameState === "ending" && keyCode === 32) { // Tecla ESPAÇO
        noLoop(); // Para o jogo quando a tela final é exibida
    }
}

function keyReleased() {
    if (gameState === "playing") {
        if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
            playerWalkSound.stop();
        }
    }
}

function sellCollectibles() {
    if (totalCollectedCount > 0) {
        coins += totalCollectedCount * COLLECTIBLE_VALUE;
        sellMessageText = `Você vendeu ${totalCollectedCount} coletáveis!`; // Define a mensagem
        totalCollectedCount = 0; // Zera a contagem para a próxima coleta

        // Não limpamos 'collectedItems' aqui!
        // Ele deve manter o registro dos itens que já foram coletados (e vendidos) em cada nível.
        // A função setupLevel usará essa informação para não desenhá-los novamente.

        setupLevel(currentLevel, false); // Recarrega o nível para que os itens vendidos não apareçam

        showSellMessage = true; // Ativa a exibição da mensagem
        sellMessageTimer = SELL_MESSAGE_DURATION; // Inicia o timer
    }
}