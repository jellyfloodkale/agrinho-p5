let g;
let imgFundoCampo;
let imgCenario1, imgCenario2, imgCenario3, imgCenario4, imgCenario5;
let imgCenario6, imgCenario7, imgCenario8, imgCenario9, imgCenario10;
let imgCenario11, imgCenario12, imgCenario13, imgCenario14, imgCenario15;
let imgAjuda;

// Novas imagens para os cenários do jogo de animais
let imgCenarioAnimal1, imgCenarioAnimal2, imgCenarioAnimal3, imgCenarioAnimal4, imgCenarioAnimal5;

// Novas variáveis para os animais
let imgCoelho, imgPassaro, imgBorboleta; // Exemplo de imagens de animais
let animaisPorCenaJogoAnimais = []; // Armazenará os animais em cada cena do JOGO DE ANIMAIS
let animaisEncontrados = 0;
let totalAnimaisParaEncontrar = 0;
let cenaAtualJogoAnimais = 0; // Nova variável para a cena atual do JOGO DE ANIMAIS
let totalCenasJogoAnimais = 5; // Teremos 5 cenários diferentes para o jogo de animais

let tela = "inicio";
let cenaAtualExplicacao = 0; // Renomeado para diferenciar das cenas do jogo de animais
let totalCenasExplicacao = 15; // As 15 cenas de explicação
let botoes = {};
let botoesJogo = {};
// New object for minigame selection buttons
let botoesMinigames = {};
let escolha = "";
let etapa = 0;
let mensagemFinal = "";

// Cor azul claro para os botões e azul escuro para o hover
const corBotaoNormal = "#64B5F6"; // Azul claro (Material Design Blue 300)

let fogos = [];

let plantaEscolhida = "";
let plantaPos = null;
let plantaArrastando = false;
let canteiro = { x: 250, y: 300, w: 100, h: 60 };

let vagalumes = [];
const NUM_VAGALUMES = 15;

// Variáveis para a nova interatividade do cidadão
let cestaPos = { x: 100, y: 200, w: 80, h: 60 };
let produtoArrastando = false;
let produtoEscolhido = "";
let produtoPos = null;
let feiraPos = { x: 400, y: 200, w: 150, h: 100 };

// --- Mini-game: Quebra-Cabeça ---
let imgQuebraCabeca;
let puzzlePieces = [];
let selectedPiece = null;
let puzzleComplete = false;
const PUZZLE_ROWS = 2;
const PUZZLE_COLS = 2;
const PUZZLE_SIZE = 200; // Size of the entire puzzle image display

// --- Mini-game: Quiz da Agricultura ---
let perguntasQuiz = [];
let perguntaAtual = 0;
let respostaSelecionada = -1; // -1 indicates no answer selected
let mostrarFeedback = false;
let quizCompleto = false;
let pontuacaoQuiz = 0;
let feedbackTexto = "";

// --- Mini-game: Identificar Plantas ---
let plantasParaIdentificar = [];
let imgMilho, imgAlface, imgTomate; // Example plant images
let plantaAtualIndex = 0;
let identificacaoCompleta = false;
let identificacaoFeedback = "";

function preload() {
    imgCenario1 = loadImage("cenario1.svg");
    imgFundoCampo = loadImage("cenario100.svg");
    imgCenario2 = loadImage("cenario2.svg");
    imgCenario3 = loadImage("cenario3.svg");
    imgCenario4 = loadImage("cenario4.svg");
    imgCenario5 = loadImage("cenario5.svg");
    imgCenario6 = loadImage("cenario6.svg");
    imgCenario7 = loadImage("cenario7.svg");
    imgCenario8 = loadImage("cenario8.svg");
    imgCenario9 = loadImage("cenario9.svg");
    imgCenario10 = loadImage("cenario10.svg");
    imgCenario11 = loadImage("cenario11.svg");
    imgCenario12 = loadImage("cenario12.svg");
    imgCenario13 = loadImage("cenario13.svg");
    imgCenario14 = loadImage("cenario14.svg");
    imgCenario15 = loadImage("cenario15.svg");
    imgAjuda = loadImage("cenarioajuda.svg");

    // Carregue as imagens dos animais aqui
    imgCoelho = loadImage("coelho.png"); // Certifique-se de ter essa imagem
    imgPassaro = loadImage("passaro.png"); // Certifique-se de ter essa imagem
    imgBorboleta = loadImage("borboleta.png"); // Certifique-se de ter essa imagem

    // CARREGUE AS NOVAS IMAGENS PARA OS CENÁRIOS DO JOGO DE ANIMAIS AQUI!
    // Certifique-se de que esses arquivos de imagem estejam na mesma pasta do seu projeto.
    imgCenarioAnimal1 = loadImage("floresta1.png"); // Uma floresta densa
    imgCenarioAnimal2 = loadImage("campoaberto.png"); // Um campo com algumas árvores e arbustos
    imgCenarioAnimal3 = loadImage("hortafazenda.png"); // Uma horta com vegetais e cercas
    imgCenarioAnimal4 = loadImage("margemrio.png"); // A margem de um rio com vegetação
    imgCenarioAnimal5 = loadImage("jardimflorido.png"); // Um jardim com muitas flores

    // --- Mini-game: Quebra-Cabeça (ensure you have this image) ---
    imgQuebraCabeca = loadImage("imagem_fazenda_puzzle.jpg"); // Replace with your puzzle image

    // --- Mini-game: Identificar Plantas (ensure you have these images) ---
    imgMilho = loadImage("milho.png");
    imgAlface = loadImage("alface.png");
    imgTomate = loadImage("tomate.png");
}

function setup() {
    createCanvas(600, 400);
    textAlign(CENTER, CENTER);

    // Botões do menu inicial
    botoes.jogar = new Botao("Jogar", width / 2 - 60, height - 130, 120, 40, corBotaoNormal);
    botoes.ajuda = new Botao("Ajuda", width / 2 - 60, height - 80, 120, 40, corBotaoNormal);

    // Botões de navegação geral
    botoes.continuar = new Botao("Continuar", width / 2 + 50, height - 60, 110, 35, corBotaoNormal);
    botoes.voltar = new Botao("Voltar", width / 2 - 180, height - 60, 110, 35, corBotaoNormal);
    botoes.proximaPergunta = new Botao("Próxima Pergunta", width / 2, height - 60, 160, 40, corBotaoNormal); // For quiz
    botoes.proximaPlanta = new Botao("Próxima Planta", width / 2, height - 60, 160, 40, corBotaoNormal); // For plant ID

    // Botões para o menu de mini-games
    // --- ALTERAÇÕES AQUI: BOTÕES MENORES E ALINHAMENTO ---
    let btnSize = 90; // Reduced button size
    let spacing = 15; // Adjusted spacing

    // Calculate startX for perfect centering for 3 buttons in a row
    // Total width of 3 buttons + 2 spacings = 3*btnSize + 2*spacing
    let totalRow1Width = (3 * btnSize) + (2 * spacing);
    let startXRow1 = (width - totalRow1Width) / 2;
    let startYRow1 = height / 2 - btnSize - spacing / 2; // Position Y of the first row

    // Calculate startX for perfect centering for 2 buttons in a row
    // Total width of 2 buttons + 1 spacing = 2*btnSize + 1*spacing
    let totalRow2Width = (2 * btnSize) + (1 * spacing);
    let startXRow2 = (width - totalRow2Width) / 2;
    let startYRow2 = height / 2 + spacing / 2; // Position Y of the second row

    botoesMinigames.animais = new Botao("Encontrar Animais", startXRow1, startYRow1, btnSize, btnSize, corBotaoNormal);
    botoesMinigames.quebraCabeca = new Botao("Quebra-Cabeça", startXRow1 + btnSize + spacing, startYRow1, btnSize, btnSize, corBotaoNormal);
    botoesMinigames.quiz = new Botao("Quiz da Agricultura", startXRow1 + 2 * (btnSize + spacing), startYRow1, btnSize, btnSize, corBotaoNormal);
    
    botoesMinigames.identificacao = new Botao("Identificar Plantas", startXRow2, startYRow2, btnSize, btnSize, corBotaoNormal);
    botoesMinigames.jogoPrincipal = new Botao("Jogo Escolhas", startXRow2 + btnSize + spacing, startYRow2, btnSize, btnSize, corBotaoNormal); // Changed label here
    // --- FIM DAS ALTERAÇÕES DE BOTÃO E ALINHAMENTO ---

    botoesJogo.cidadao = new Botao("Cidadão", width / 2 - 140, height / 2, 120, 45, corBotaoNormal);
    botoesJogo.agricultor = new Botao("Agricultor", width / 2 + 20, height / 2, 120, 45, corBotaoNormal);

    botoesJogo.milho = new Botao("Milho 🌽", width / 2 - 160, height / 2, 120, 45, corBotaoNormal);
    botoesJogo.hortalica = new Botao("Hortaliças 🥬", width / 2 - 20, height / 2, 140, 45, corBotaoNormal);
    botoesJogo.frutas = new Botao("Frutas 🍎", width / 2 + 150, height / 2, 120, 45, corBotaoNormal);

    botoesJogo.comprar = new Botao("Comprar do campo 🛒", width / 2 - 160, height / 2, 160, 45, corBotaoNormal);
    botoesJogo.compartilhar = new Botao("Compartilhar saberes 💬", width / 2 + 20, height / 2, 180, 45, corBotaoNormal);
    botoesJogo.participarComunidade = new Botao("Participar da comunidade", width / 2 - 90, height / 2 + 70, 180, 45, corBotaoNormal);

    // Alterado o rótulo do botão de reiniciar
    botoesJogo.reiniciar = new Botao("Reiniciar", width /2 - 180, height - 60, 40, 35, corBotaoNormal);

    for (let i = 0; i < NUM_VAGALUMES; i++) {
        vagalumes.push(new Vagalume());
    }

    // Configuração dos animais por CENA DO JOGO DE ANIMAIS (5 CENAS)
    animaisPorCenaJogoAnimais = [
        // Cena 0 (imgCenarioAnimal1: floresta1.png) - 3 animais
        [
            { img: imgCoelho, x: 150, y: 320, encontrado: false },
            { img: imgPassaro, x: 480, y: 100, encontrado: false },
            { img: imgBorboleta, x: 300, y: 200, encontrado: false }
        ],
        // Cena 1 (imgCenarioAnimal2: campoaberto.png) - 4 animais
        [
            { img: imgCoelho, x: 100, y: 250, encontrado: false },
            { img: imgBorboleta, x: 50, y: 120, encontrado: false },
            { img: imgPassaro, x: 550, y: 200, encontrado: false },
            { img: imgCoelho, x: 380, y: 330, encontrado: false }
        ],
        // Cena 2 (imgCenarioAnimal3: hortafazenda.png) - 3 animais
        [
            { img: imgBorboleta, x: 250, y: 150, encontrado: false },
            { img: imgPassaro, x: 80, y: 80, encontrado: false },
            { img: imgCoelho, x: 400, y: 300, encontrado: false }
        ],
        // Cena 3 (imgCenarioAnimal4: margemrio.png) - 2 animais
        [
            { img: imgBorboleta, x: 500, y: 50, encontrado: false },
            { img: imgPassaro, x: 120, y: 200, encontrado: false }
        ],
        // Cena 4 (imgCenarioAnimal5: jardimflorido.png) - 3 animais
        [
            { img: imgBorboleta, x: 200, y: 280, encontrado: false },
            { img: imgPassaro, x: 450, y: 300, encontrado: false },
            { img: imgBorboleta, x: 100, y: 50, encontrado: false }
        ]
    ];
    totalAnimaisParaEncontrar = animaisPorCenaJogoAnimais.flat().length;

    // --- Mini-game: Quebra-Cabeça Setup ---
    setupPuzzleGame();

    // --- Mini-game: Quiz da Agricultura ---
    setupQuizGame();

    // --- Mini-game: Identificar Plantas ---
    setupPlantIdentificationGame();
}

function draw() {
    if (tela === "inicio") {
        background("#C8E6C9");
        imageMode(CENTER);
        let imgWidth = width * 1.2;
        let imgHeight = (imgCenario1.height / imgCenario1.width) * imgWidth;
        image(imgCenario1, width / 2, height / 2, imgWidth, imgHeight);

        for (let vagalume of vagalumes) {
            vagalume.atualizar();
            vagalume.mostrar();
        }

        fill("#2E7D32");
        stroke(255);
        strokeWeight(3);
        textSize(36);
        text("Festejando Conexões", width / 2, 90);
        textSize(30);
        fill("#09520D");
        stroke(255);
        text("Agricultura Familiar", width / 2, 150);

        botoes.jogar.exibir();
        botoes.ajuda.exibir();

    } else if (tela === "ajuda") {
        background(15);
        imageMode(CENTER);
        let imgWidth = width * 0.99;
        let imgHeight = (imgAjuda.height / imgAjuda.width) * imgWidth;
        image(imgAjuda, width / 2, height / 2 + 10, imgWidth, imgHeight);
        botoes.voltar.exibir();

    } else if (tela === "explicacao") {
        background("#FFF3E0");
        imageMode(CENTER);
        let imagemCena = null;

        switch (cenaAtualExplicacao) {
            case 0: imagemCena = imgFundoCampo; break;
            case 1: imagemCena = imgCenario2; break;
            case 2: imagemCena = imgCenario3; break;
            case 3: imagemCena = imgCenario4; break;
            case 4: imagemCena = imgCenario5; break;
            case 5: imagemCena = imgCenario6; break;
            case 6: imagemCena = imgCenario7; break;
            case 7: imagemCena = imgCenario8; break;
            case 8: imagemCena = imgCenario9; break;
            case 9: imagemCena = imgCenario10; break;
            case 10: imagemCena = imgCenario11; break;
            case 11: imagemCena = imgCenario12; break;
            case 12: imagemCena = imgCenario13; break;
            case 13: imagemCena = imgCenario14; break;
            case 14: imagemCena = imgCenario15; break;
        }

        if (imagemCena) {
            let escala = 1.0;
            let imgWidth = width * escala;
            let imgHeight = (imagemCena.height / imagemCena.width) * imgWidth;
            image(imagemCena, width / 2, height / 2, imgWidth, imgHeight);
        }

        if (cenaAtualExplicacao === totalCenasExplicacao - 1) {
            if (frameCount % 20 === 0) {
                fogos.push(new FogoArtificio());
            }
            for (let i = fogos.length - 1; i >= 0; i--) {
                fogos[i].atualizar();
                fogos[i].mostrar();
                if (fogos[i].finalizado()) {
                    fogos.splice(i, 1);
                }
            }
        }

        mostrarCena(cenaAtualExplicacao);
        botoes.voltar.exibir();
        botoes.continuar.exibir();

    } else if (tela === "menuMinigames") {
        background("#CCE6FF");
        fill(0);
        textSize(28);
        text("Escolha um Mini-Jogo!", width / 2, height / 4 - 20); // Adjusted Y for new button

        // Exibir os botões quadrados
        botoesMinigames.animais.exibir();
        botoesMinigames.quebraCabeca.exibir();
        botoesMinigames.quiz.exibir();
        botoesMinigames.identificacao.exibir();
        botoesMinigames.jogoPrincipal.exibir(); // NEW: Display the Main Game button
        botoes.voltar.exibir();

    } else if (tela === "jogoAnimais") {
        // Display background based on current scene
        let currentAnimalCenario;
        switch (cenaAtualJogoAnimais) {
            case 0: currentAnimalCenario = imgCenarioAnimal1; break;
            case 1: currentAnimalCenario = imgCenarioAnimal2; break;
            case 2: currentAnimalCenario = imgCenarioAnimal3; break;
            case 3: currentAnimalCenario = imgCenarioAnimal4; break;
            case 4: currentAnimalCenario = imgCenarioAnimal5; break;
            default: currentAnimalCenario = imgFundoCampo; // Fallback
        }
        image(currentAnimalCenario, width / 2, height / 2, width, height);

        // Display current animals to find
        let animaisNestaCena = animaisPorCenaJogoAnimais[cenaAtualJogoAnimais];
        for (let animal of animaisNestaCena) {
            if (!animal.encontrado) {
                image(animal.img, animal.x, animal.y, 50, 50); // Adjust size as needed
            }
        }

        // Display instructions and progress
        fill(0);
        textSize(20);
        text(`Encontre os animais! Cena ${cenaAtualJogoAnimais + 1}/${totalCenasJogoAnimais}`, width / 2, 30);
        text(`Animais encontrados: ${animaisEncontrados}/${totalAnimaisParaEncontrar}`, width / 2, 60);

        // Display navigation buttons
        botoes.voltar.exibir();
        botoes.continuar.exibir();

    } else if (tela === "mostraResultadoAnimais") {
        background("#E0F2F7");
        fill("#2E7D32");
        textSize(30);
        text("Resultado do Jogo de Animais", width / 2, height / 4);
        textSize(24);
        text(`Você encontrou ${animaisEncontrados} de ${totalAnimaisParaEncontrar} animais!`, width / 2, height / 2 - 30);
        
        botoes.voltar.exibir(); // Use the existing voltar button to go back to minigame menu

    } else if (tela === "quebraCabeca") {
        drawPuzzleGame();

    } else if (tela === "quiz") {
        drawQuizGame();

    } else if (tela === "identificacao") {
        drawPlantIdentificationGame();

    } else if (tela === "jogo") {
        jogoEscolhas();
    }
}

function mousePressed() {
    if (tela === "inicio") {
        if (botoes.jogar.clicado(mouseX, mouseY)) {
            tela = "explicacao";
            cenaAtualExplicacao = 0;
        } else if (botoes.ajuda.clicado(mouseX, mouseY)) {
            tela = "ajuda";
        }

    } else if (tela === "ajuda") {
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "inicio";
        }

    } else if (tela === "explicacao") {
        if (botoes.continuar.clicado(mouseX, mouseY)) {
            if (cenaAtualExplicacao < totalCenasExplicacao - 1) {
                cenaAtualExplicacao++;
            } else {
                tela = "menuMinigames";
            }
        } else if (botoes.voltar.clicado(mouseX, mouseY)) {
            if (cenaAtualExplicacao > 0) {
                cenaAtualExplicacao--;
            } else {
                tela = "inicio";
            }
        }
    } else if (tela === "menuMinigames") {
        if (botoesMinigames.animais.clicado(mouseX, mouseY)) {
            tela = "jogoAnimais";
            animaisEncontrados = 0;
            cenaAtualJogoAnimais = 0;
            // Reset all animals to not found when starting the game
            for (let i = 0; i < animaisPorCenaJogoAnimais.length; i++) {
                for (let j = 0; j < animaisPorCenaJogoAnimais[i].length; j++) {
                    animaisPorCenaJogoAnimais[i][j].encontrado = false;
                }
            }
        } else if (botoesMinigames.quebraCabeca.clicado(mouseX, mouseY)) {
            tela = "quebraCabeca";
            resetPuzzleGame(); // Reset the puzzle game when entering
        } else if (botoesMinigames.quiz.clicado(mouseX, mouseY)) {
            tela = "quiz";
            resetQuizGame(); // Reset the quiz game when entering
        } else if (botoesMinigames.identificacao.clicado(mouseX, mouseY)) {
            tela = "identificacao";
            resetPlantIdentificationGame(); // Reset plant ID game when entering
        } else if (botoesMinigames.jogoPrincipal.clicado(mouseX, mouseY)) { // Handle click for Main Game button (now "Jogo Escolhas")
            tela = "jogo";
            etapa = 0; // Ensure the main game starts from the beginning
        }
        else if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "explicacao";
            cenaAtualExplicacao = totalCenasExplicacao - 1;
        }

    } else if (tela === "jogoAnimais") {
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            if (cenaAtualJogoAnimais > 0) {
                cenaAtualJogoAnimais--;
            } else {
                tela = "menuMinigames"; // Go back to minigame menu if on first scene
            }
        } else if (botoes.continuar.clicado(mouseX, mouseY)) {
            if (cenaAtualJogoAnimais < totalCenasJogoAnimais - 1) {
                cenaAtualJogoAnimais++;
            } else {
                tela = "mostraResultadoAnimais";
            }
        } else {
            // --- FIX FOR ANIMAL GAME BUG ---
            // Get animals for the current scene
            let animaisNestaCena = animaisPorCenaJogoAnimais[cenaAtualJogoAnimais];
            if (animaisNestaCena) { // Ensure the array exists
                for (let animal of animaisNestaCena) {
                    if (!animal.encontrado && dist(mouseX, mouseY, animal.x, animal.y) < 25) { // 25 is half of the animal image size (50x50)
                        animal.encontrado = true;
                        animaisEncontrados++;
                        break; // Stop after finding one animal
                    }
                }
            }
        }
    } else if (tela === "mostraResultadoAnimais") {
        // Changed to go back to the minigame menu
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "menuMinigames";
        }

    } else if (tela === "quebraCabeca") {
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "menuMinigames";
        }
        if (!puzzleComplete) {
            for (let i = 0; i < puzzlePieces.length; i++) {
                let p = puzzlePieces[i];
                // Check if mouse is over this piece and it's not already locked
                if (!p.locked && mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h) {
                    selectedPiece = i;
                    break; // Only select one piece at a time
                }
            }
        }

    } else if (tela === "quiz") {
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "menuMinigames";
        }
        if (!quizCompleto && !mostrarFeedback) {
            let currentQuestion = perguntasQuiz[perguntaAtual];
            for (let i = 0; i < currentQuestion.opcoes.length; i++) {
                let btnY = height / 2 - 40 + i * 50;
                let btn = new Botao(currentQuestion.opcoes[i], width / 2 - 100, btnY, 200, 40, corBotaoNormal);
                if (btn.clicado(mouseX, mouseY)) {
                    respostaSelecionada = i;
                    mostrarFeedback = true;
                    if (respostaSelecionada === currentQuestion.correta) {
                        feedbackTexto = "Correto!";
                        pontuacaoQuiz++;
                    } else {
                        feedbackTexto = "Incorreto. A resposta correta era: " + currentQuestion.opcoes[currentQuestion.correta];
                    }
                    break;
                }
            }
        } else if (mostrarFeedback) {
            if (botoes.proximaPergunta.clicado(mouseX, mouseY)) {
                mostrarFeedback = false;
                perguntaAtual++;
                respostaSelecionada = -1;
                if (perguntaAtual >= perguntasQuiz.length) {
                    quizCompleto = true;
                }
            }
        }
    
    } else if (tela === "identificacao") {
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "menuMinigames";
        }
        if (!identificacaoCompleta && identificacaoFeedback === "") {
            let currentPlant = plantasParaIdentificar[plantaAtualIndex];
            for (let i = 0; i < currentPlant.opcoes.length; i++) {
                let btnX = width / 2 - 150 + (i % 2) * 160;
                let btnY = height / 2 + 50 + floor(i / 2) * 50;
                let btn = new Botao(currentPlant.opcoes[i], btnX, btnY, 140, 40, corBotaoNormal);
                if (btn.clicado(mouseX, mouseY)) {
                    if (currentPlant.opcoes[i] === currentPlant.nomeCorreto) {
                        identificacaoFeedback = "Correto! É um(a) " + currentPlant.nomeCorreto + ".";
                    } else {
                        identificacaoFeedback = "Incorreto. Era um(a) " + currentPlant.nomeCorreto + ".";
                    }
                    break;
                }
            }
        } else if (identificacaoFeedback !== "") {
            if (botoes.proximaPlanta.clicado(mouseX, mouseY)) {
                identificacaoFeedback = "";
                plantaAtualIndex++;
                if (plantaAtualIndex >= plantasParaIdentificar.length) {
                    identificacaoCompleta = true;
                }
            }
        }
    } else if (tela === "jogo") {
        // Add a back button for the main game as well
        if (botoes.voltar.clicado(mouseX, mouseY)) {
            tela = "menuMinigames"; // Go back to minigame menu
            etapa = 0; // Reset main game state
            mensagemFinal = "";
            escolha = "";
            plantaPos = null;
            plantaArrastando = false;
            produtoPos = null;
            produtoArrastando = false;
        } else if (etapa === 0) {
            if (botoesJogo.cidadao.clicado(mouseX, mouseY)) {
                escolha = "cidadao";
                etapa = 1;
            } else if (botoesJogo.agricultor.clicado(mouseX, mouseY)) {
                escolha = "agricultor";
                etapa = 1;
            }

        } else if (etapa === 1) {
            if (escolha === "cidadao") {
                if (botoesJogo.comprar.clicado(mouseX, mouseY)) {
                    etapa = 2.1;
                    produtoEscolhido = "🥕";
                    produtoPos = { x: feiraPos.x + feiraPos.w / 2 - 40, y: feiraPos.y + feiraPos.h / 2 + 10 };
                } else if (botoesJogo.compartilhar.clicado(mouseX, mouseY)) {
                    mostrarResultado("Você escolheu compartilhar saberes. Conhecimento que fortalece a comunidade!");
                } else if (botoesJogo.participarComunidade.clicado(mouseX, mouseY)) {
                    mostrarResultado("Você se juntou à comunidade! O apoio mútuo fortalece a todos.");
                }

            } else if (escolha === "agricultor") {
                if (botoesJogo.milho.clicado(mouseX, mouseY)) {
                    iniciarPlantar("🌽");
                } else if (botoesJogo.hortalica.clicado(mouseX, mouseY)) {
                    iniciarPlantar("🥬");
                } else if (botoesJogo.frutas.clicado(mouseX, mouseY)) {
                    iniciarPlantar("🍎");
                }
            }

        } else if (etapa === 2) {
            if (plantaPos && dist(mouseX, mouseY, plantaPos.x, plantaPos.y) < 30) {
                plantaArrastando = true;
            }

        } else if (etapa === 2.1) {
            if (dist(mouseX, mouseY, feiraPos.x + feiraPos.w / 2 - 40, feiraPos.y + feiraPos.h / 2 + 10) < 20) {
                produtoEscolhido = "🥕";
                produtoPos = { x: mouseX, y: mouseY };
                produtoArrastando = true;
            } else if (dist(mouseX, mouseY, feiraPos.x + feiraPos.w / 2 + 40, feiraPos.y + feiraPos.h / 2 + 10) < 20) {
                produtoEscolhido = "🥔";
                produtoPos = { x: mouseX, y: mouseY };
                produtoArrastando = true;
            }

        } else if (etapa === 3) {
            if (botoesJogo.reiniciar.clicado(mouseX, mouseY)) {
                tela = "jogo";
                etapa = 0;
                mensagemFinal = "";
                escolha = "";
                plantaPos = null;
                plantaArrastando = false;
                produtoPos = null;
                produtoArrastando = false;
            }
        }
    }
}

function mouseDragged() {
    if (tela === "jogo") {
        if (etapa === 2 && plantaArrastando) {
            plantaPos.x = mouseX;
            plantaPos.y = mouseY;
        } else if (etapa === 2.1 && produtoArrastando) {
            produtoPos.x = mouseX;
            produtoPos.y = mouseY;
        }
    } else if (tela === "quebraCabeca") {
        if (selectedPiece !== null) {
            puzzlePieces[selectedPiece].x = mouseX - puzzlePieces[selectedPiece].w / 2;
            puzzlePieces[selectedPiece].y = mouseY - puzzlePieces[selectedPiece].h / 2;
        }
    }
}

function mouseReleased() {
    if (tela === "jogo") {
        if (etapa === 2 && plantaArrastando) {
            plantaArrastando = false;
            if (collideRectCircle(canteiro.x, canteiro.y, canteiro.w, canteiro.h, plantaPos.x, plantaPos.y, 30)) {
                mostrarResultado("Parabéns! Você plantou " + plantaEscolhida + " no canteiro!");
            } else {
                mensagemFinal = "A planta não foi colocada no canteiro. Tente novamente.";
                etapa = 3;
            }
        } else if (etapa === 2.1 && produtoArrastando) {
            produtoArrastando = false;
            if (collideRectCircle(cestaPos.x, cestaPos.y, cestaPos.w, cestaPos.h, produtoPos.x, produtoPos.y, 30)) {
                mostrarResultado("Ótimo! Você comprou " + produtoEscolhido + " do agricultor local. Apoie a agricultura familiar!");
            } else {
                mensagemFinal = "Você não colocou o produto na cesta. Tente novamente.";
                etapa = 3;
            }
        }
    } else if (tela === "quebraCabeca") {
        if (selectedPiece !== null) {
            let p = puzzlePieces[selectedPiece];
            // Check if piece is close enough to its target
            let tolerance = 20; // Pixels of tolerance for snapping
            if (dist(p.x, p.y, p.targetX, p.targetY) < tolerance) {
                p.x = p.targetX;
                p.y = p.targetY;
                p.locked = true;
            }
            selectedPiece = null; // Deselect the piece
            checkPuzzleCompletion();
        }
    }
}

function jogoEscolhas() {
    background("#C8E6C9");
    image(imgCenarioAnimal2, width / 2, height / 2, width, height); // Fundo do jogo principal alterado para campoaberto.png

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);

    if (etapa === 0) {
        text("Escolha seu papel:", width / 2, height / 4);
        botoesJogo.cidadao.exibir();
        botoesJogo.agricultor.exibir();
    } else if (etapa === 1) {
        if (escolha === "cidadao") {
            text("Como você quer interagir?", width / 2, height / 4);
            botoesJogo.comprar.exibir();
            botoesJogo.compartilhar.exibir();
            botoesJogo.participarComunidade.exibir();
        } else if (escolha === "agricultor") {
            text("O que você quer plantar?", width / 2, height / 4);
            botoesJogo.milho.exibir();
            botoesJogo.hortalica.exibir();
            botoesJogo.frutas.exibir();
        }
    } else if (etapa === 2) { // Plantar (agricultor)
        text("Arraste a " + plantaEscolhida + " para o canteiro!", width / 2, 50);

        // Desenhar canteiro
        fill("#8B4513"); // Marrom
        rect(canteiro.x, canteiro.y, canteiro.w, canteiro.h, 10);
        fill(0);
        textSize(16);
        text("Canteiro", canteiro.x + canteiro.w / 2, canteiro.y + canteiro.h + 20);

        if (plantaPos) {
            textSize(40);
            text(plantaEscolhida, plantaPos.x, plantaPos.y);
        }
    } else if (etapa === 2.1) { // Comprar (cidadão)
        text("Arraste o produto para a sua cesta!", width / 2, 50);

        // Desenhar feira/banca
        fill("#D4C4A6"); // Cor de madeira clara
        rect(feiraPos.x, feiraPos.y, feiraPos.w, feiraPos.h, 10);
        fill(0);
        textSize(16);
        text("Feira Local", feiraPos.x + feiraPos.w / 2, feiraPos.y - 20);

        // Produtos na feira
        textSize(30);
        text("🥕", feiraPos.x + feiraPos.w / 2 - 40, feiraPos.y + feiraPos.h / 2 + 10);
        text("🥔", feiraPos.x + feiraPos.w / 2 + 40, feiraPos.y + feiraPos.h / 2 + 10);


        // Desenhar cesta
        fill("#A0522D"); // Marrom cesta
        rect(cestaPos.x, cestaPos.y, cestaPos.w, cestaPos.h, 10);
        fill(0);
        textSize(16);
        text("Sua Cesta", cestaPos.x + cestaPos.w / 2, cestaPos.y + cestaPos.h + 20);

        if (produtoArrastando && produtoPos) {
            textSize(40);
            text(produtoEscolhido, produtoPos.x, produtoPos.y);
        } else if (produtoPos && !produtoArrastando && collideRectCircle(cestaPos.x, cestaPos.y, cestaPos.w, cestaPos.h, produtoPos.x, produtoPos.y, 30)) {
            // Se o produto foi solto na cesta, ele permanece na cesta
            textSize(40);
            text(produtoEscolhido, cestaPos.x + cestaPos.w / 2, cestaPos.y + cestaPos.h / 2);
        }

    } else if (etapa === 3) {
        fill("#2E7D32");
        textSize(28);
        text(mensagemFinal, width / 2, height / 2 - 50);
        botoesJogo.reiniciar.exibir();
    }
    // Always display the back button in the main game
    botoes.voltar.exibir();
}

function mostrarResultado(texto) {
    mensagemFinal = texto;
    etapa = 3;
}

function iniciarPlantar(emoji) {
    plantaEscolhida = emoji;
    plantaPos = { x: width / 2, y: height / 2 };
    etapa = 2;
}

function mostrarCena(cena) {
    fill(0);
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    let textos = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "" // retirada frases
    ];
    if (cena >= 0 && cena < textos.length) {
        text(textos[cena], width / 2, 20);
    }
}

class Botao {
    constructor(rotulo, x, y, w, h, corNormal) {
        this.rotulo = rotulo;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.corNormal = corNormal;
        this.corHover = "#2196F3"; // A darker shade of blue for hover
        this.clicadoAtualmente = false;
    }

    exibir() {
        let corParaDesenhar = this.corNormal;
        if (this.estaSobre(mouseX, mouseY)) {
            corParaDesenhar = this.corHover;
        }

        fill(corParaDesenhar);
        stroke(0);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h, 10);
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        
        // --- LÓGICA DE TAMANHO DE TEXTO ADAPTATIVA E QUEBRA DE LINHA ---
        let baseTextSize = 18; // Start with a reasonable default
        let currentTextSize = baseTextSize;
        
        // Temporarily set text size to calculate text dimensions
        textSize(currentTextSize);

        // Check if text is too wide for a single line within the button
        // A padding of 10px on each side (total 20px) is applied for text fitting.
        let targetTextWidth = this.w - 20; 
        let targetTextHeight = this.h - 10; // Slightly less padding on height for potential multi-line

        let lines = [];
        let words = this.rotulo.split(' ');
        let currentLine = words[0] || "";

        for (let i = 1; i < words.length; i++) {
            let testLine = currentLine + " " + words[i];
            if (textWidth(testLine) < targetTextWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine); // Add the last line

        // Calculate the height needed for all lines with current text size
        let lineHeight = currentTextSize * 1.2; // 1.2 is a common line spacing multiplier
        let totalTextHeight = lines.length * lineHeight;

        // If total text height is too much for the button or text is still too wide, reduce font size
        // Loop to reduce font size if needed
        while ((totalTextHeight > targetTextHeight || textWidth(currentLine) > targetTextWidth) && currentTextSize > 8) {
            currentTextSize--;
            textSize(currentTextSize); // Update textSize for measurement
            lineHeight = currentTextSize * 1.2;
            totalTextHeight = lines.length * lineHeight; // Recalculate total height
            
            // Re-split into lines for accurate width check with new size
            lines = [];
            currentLine = words[0] || "";
            for (let i = 1; i < words.length; i++) {
                let testLine = currentLine + " " + words[i];
                if (textWidth(testLine) < targetTextWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = words[i];
                }
            }
            lines.push(currentLine); // Add the last line
            totalTextHeight = lines.length * lineHeight; // Recalculate total height after re-splitting
        }
        
        textSize(currentTextSize); // Set the final determined text size

        // Calculate start Y to center the block of text vertically
        let startY = this.y + this.h / 2 - totalTextHeight / 2 + (lineHeight / 2); // Adjust for base line of first line

        for (let i = 0; i < lines.length; i++) {
            text(lines[i], this.x + this.w / 2, startY + i * lineHeight);
        }
        // --- FIM DAS ALTERAÇÕES DE TAMANHO DE TEXTO ADAPTATIVAS E QUEBRA DE LINHA ---
    }

    estaSobre(mx, my) {
        return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }

    clicado(mx, my) {
        if (this.estaSobre(mx, my)) {
            this.clicadoAtualmente = true;
            return true;
        } else {
            this.clicadoAtualmente = false;
            return false;
        }
    }
}

class FogoArtificio {
    constructor() {
        this.x = random(width);
        this.y = height;
        this.tamanho = random(10, 20);
        this.velocidade = random(3, 6);
        this.explodiu = false;
        this.particulas = [];
    }
    atualizar() {
        if (!this.explodiu) {
            this.y -= this.velocidade;
            if (this.y < height / 2) {
                this.explodiu = true; // Corrected typo here
                for (let i = 0; i < 20; i++) {
                    this.particulas.push(new ParticulaFogo(this.x, this.y));
                }
            }
        } else {
            for (let p of this.particulas) {
                p.atualizar();
            }
            this.particulas = this.particulas.filter(p => !p.terminou);
        }
    }
    mostrar() {
        noStroke();
        if (!this.explodiu) {
            fill(255, 255, 255);
            ellipse(this.x, this.y, this.tamanho);
        } else {
            for (let p of this.particulas) {
                p.mostrar();
            }
        }
    }
    finalizado() {
        return this.explodiu && this.particulas.length === 0;
    }
}

class ParticulaFogo {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(1, 3));
        this.tempoVida = 60;
        this.terminou = false;
    }
    atualizar() {
        this.pos.add(this.vel);
        this.tempoVida--;
        if (this.tempoVida <= 0) {
            this.terminou = true;
        }
    }
    mostrar() {
        noStroke();
        fill(255, 150, 0, map(this.tempoVida, 0, 60, 0, 255));
        ellipse(this.pos.x, this.pos.y, 5);
    }
}

class Vagalume {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.tamanho = random(3, 7);
        this.velocidadeX = random(-1, 1);
        this.velocidadeY = random(-1, 1);
        this.brilho = random(150, 255); // Valor inicial do brilho
        this.direcaoBrilho = 1;
        this.tempoBrilho = random(20, 60);
        this.contadorBrilho = 0;
        // Adicionamos uma variável para o brilho "base" que será mapeado
        this.brilhoBase = random(0, 1); // Um valor entre 0 e 1 para mapeamento
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        if (this.x < 0 || this.x > width) {
            this.velocidadeX *= -1;
        }
        if (this.y < 0 || this.y > height) {
            this.velocidadeY *= -1;
        }
        // Ajustar a direção da velocidade para simular movimento orgânico
        if (random(1) < 0.05) { // Pequena chance de mudar de direção
            this.velocidadeX = random(-1, 1);
            this.velocidadeY = random(-1, 1);
        }

        // Simular o brilho
        this.contadorBrilho++;
        if (this.contadorBrilho >= this.tempoBrilho) {
            this.direcaoBrilho *= -1;
            this.contadorBrilho = 0;
            this.tempoBrilho = random(20, 60); // Novo tempo para o próximo ciclo de brilho
        }
        // Atualiza o brilhoBase de forma mais orgânica
        this.brilhoBase += this.direcaoBrilho * random(0.01, 0.05); // Variações menores
        this.brilhoBase = constrain(this.brilhoBase, 0, 1); // Mantém entre 0 e 1

        // **APLICAÇÃO DA FUNÇÃO MAP()**
        // Mapeia o brilhoBase (0 a 1) para um valor de brilho final (100 a 255)
        this.brilho = map(this.brilhoBase, 0, 1, 100, 255);
    }

    mostrar() {
        noStroke();
        // Cor do vagalume: amarelo-esverdeado com opacidade variável
        fill(255, 255, 0, this.brilho); // Amarelo
        ellipse(this.x, this.y, this.tamanho);

        // Adicionar um brilho suave ao redor
        fill(255, 255, 0, this.brilho / 3); // Amarelo mais transparente
        ellipse(this.x, this.y, this.tamanho * 2);
    }
}

// Funções para os Mini-games

// --- Quebra-Cabeça ---
function setupPuzzleGame() {
    puzzlePieces = [];
    puzzleComplete = false;
    let pieceWidth = imgQuebraCabeca.width / PUZZLE_COLS;
    let pieceHeight = imgQuebraCabeca.height / PUZZLE_ROWS;

    // Calculate puzzle display position to center it on screen
    let displayX = width / 2 - PUZZLE_SIZE / 2;
    let displayY = height / 2 - PUZZLE_SIZE / 2 + 30; // Adjust for title/buttons

    let scaledPieceWidth = PUZZLE_SIZE / PUZZLE_COLS;
    let scaledPieceHeight = PUZZLE_SIZE / PUZZLE_ROWS;

    for (let r = 0; r < PUZZLE_ROWS; r++) {
        for (let c = 0; c < PUZZLE_COLS; c++) {
            let sx = c * pieceWidth;
            let sy = r * pieceHeight;
            let dx = displayX + c * scaledPieceWidth;
            let dy = displayY + r * scaledPieceHeight;

            puzzlePieces.push({
                img: imgQuebraCabeca,
                sx: sx, // Source X on the original image
                sy: sy, // Source Y on the original image
                sw: pieceWidth, // Source width
                sh: pieceHeight, // Source height
                x: random(width - scaledPieceWidth), // Initial random X position
                y: random(height - scaledPieceHeight), // Initial random Y position
                w: scaledPieceWidth, // Display width
                h: scaledPieceHeight, // Display height
                targetX: dx, // Target X position
                targetY: dy, // Target Y position
                locked: false
            });
        }
    }
    // Shuffle the pieces randomly initially to place them around the screen
    for (let i = puzzlePieces.length - 1; i > 0; i--) {
        const j = floor(random(i + 1));
        
        // Randomize initial positions more broadly for a scattered look
        puzzlePieces[i].x = random(width - puzzlePieces[i].w);
        puzzlePieces[i].y = random(height - puzzlePieces[i].h);
    }
}

function drawPuzzleGame() {
    background("#F0F8FF"); // Light blue background
    fill(0);
    textSize(28);
    text("Monte o Quebra-Cabeça!", width / 2, 40);

    for (let p of puzzlePieces) {
        if (!p.locked) {
            image(p.img, p.x, p.y, p.w, p.h, p.sx, p.sy, p.sw, p.sh);
        } else {
            // Draw locked pieces at their target positions
            image(p.img, p.targetX, p.targetY, p.w, p.h, p.sx, p.sy, p.sw, p.sh);
        }
    }

    if (puzzleComplete) {
        fill("#2E7D32");
        textSize(40);
        text("Quebra-Cabeça Completo!", width / 2, height / 2);
    }
    botoes.voltar.exibir();
}

function checkPuzzleCompletion() {
    puzzleComplete = true;
    for (let p of puzzlePieces) {
        if (!p.locked) {
            puzzleComplete = false;
            break;
        }
    }
}

function resetPuzzleGame() {
    setupPuzzleGame(); // Re-initialize the puzzle pieces
}


// --- Quiz da Agricultura ---
function setupQuizGame() {
    perguntasQuiz = [
        {
            pergunta: "Qual é a base da alimentação brasileira?",
            opcoes: ["Fast Food", "Comida Congelada", "Alimentos da Agricultura Familiar", "Doces Industrializados"],
            correta: 2 // Índice da resposta correta (0, 1, 2, ...)
        },
        {
            pergunta: "O que a agricultura familiar mais preserva?",
            opcoes: ["Fábricas", "Meio Ambiente", "Grandes Empresas", "Shopping Centers"],
            correta: 1
        },
        {
            pergunta: "Quais são alguns benefícios de comprar da agricultura familiar?",
            opcoes: ["Preços mais altos", "Alimentos menos frescos", "Apoio a famílias locais e alimentos frescos", "Nenhum benefício"],
            correta: 2
        }
    ];
    perguntaAtual = 0;
    respostaSelecionada = -1;
    mostrarFeedback = false;
    quizCompleto = false;
    pontuacaoQuiz = 0;
    feedbackTexto = "";
}

function drawQuizGame() {
    background("#E8F5E9"); // Light green background
    fill(0);
    textSize(28);
    text("Quiz da Agricultura Familiar", width / 2, 40);

    if (!quizCompleto) {
        let currentQuestion = perguntasQuiz[perguntaAtual];
        textSize(20);
        textAlign(CENTER, TOP);
        text(currentQuestion.pergunta, width / 2, height / 4);

        for (let i = 0; i < currentQuestion.opcoes.length; i++) {
            let btnY = height / 2 - 40 + i * 50;
            let btn = new Botao(currentQuestion.opcoes[i], width / 2 - 100, btnY, 200, 40, corBotaoNormal);
            btn.exibir();
        }

        if (mostrarFeedback) {
            fill(feedbackTexto.includes("Correto!") ? "#33691E" : "#B71C1C"); // Dark green for correct, dark red for incorrect
            textSize(22);
            text(feedbackTexto, width / 2, height - 100);
            botoes.proximaPergunta.exibir();
        }
    } else {
        fill("#2E7D32");
        textSize(30);
        text("Quiz Completo!", width / 2, height / 3);
        textSize(24);
        text(`Sua pontuação: ${pontuacaoQuiz} de ${perguntasQuiz.length}`, width / 2, height / 2);
    }
    botoes.voltar.exibir();
}

function resetQuizGame() {
    setupQuizGame(); // Re-initialize quiz
}


// --- Identificar Plantas ---
function setupPlantIdentificationGame() {
    plantasParaIdentificar = [
        {
            img: imgMilho,
            nomeCorreto: "Milho",
            opcoes: ["Milho", "Trigo", "Arroz", "Cana-de-açúcar"]
        },
        {
            img: imgAlface,
            nomeCorreto: "Alface",
            opcoes: ["Couve", "Alface", "Espinafre", "Rúcula"]
        },
        {
            img: imgTomate,
            nomeCorreto: "Tomate",
            opcoes: ["Cebola", "Batata", "Tomate", "Pimentão"]
        }
    ];
    plantaAtualIndex = 0;
    identificacaoCompleta = false;
    identificacaoFeedback = "";
}

function drawPlantIdentificationGame() {
    background("#F0F4C3"); // Light yellow-green background
    fill(0);
    textSize(28);
    text("Identifique a Planta!", width / 2, 40);

    if (!identificacaoCompleta) {
        let currentPlant = plantasParaIdentificar[plantaAtualIndex];
        
        // Display the plant image
        imageMode(CENTER);
        image(currentPlant.img, width / 2, height / 2 - 50, 150, 150); // Adjust size as needed

        // Display options as buttons
        for (let i = 0; i < currentPlant.opcoes.length; i++) {
            let btnX = width / 2 - 150 + (i % 2) * 160;
            let btnY = height / 2 + 50 + floor(i / 2) * 50;
            let btn = new Botao(currentPlant.opcoes[i], btnX, btnY, 140, 40, corBotaoNormal);
            btn.exibir();
        }

        if (identificacaoFeedback !== "") {
            fill(identificacaoFeedback.includes("Correto!") ? "#33691E" : "#B71C1C");
            textSize(22);
            text(identificacaoFeedback, width / 2, height - 100);
            botoes.proximaPlanta.exibir();
        }
    } else {
        fill("#2E7D32");
        textSize(30);
        text("Identificação de Plantas Completa!", width / 2, height / 3);
        textSize(24);
        text("Parabéns, você identificou todas as plantas!", width / 2, height / 2);
    }
    botoes.voltar.exibir();
}

function resetPlantIdentificationGame() {
    setupPlantIdentificationGame(); // Re-initialize the plant identification game
}

// Colisão de retângulo e círculo (função auxiliar)
function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
    let testX = cx;
    let testY = cy;

    if (cx < rx)        testX = rx;
    else if (cx > rx+rw) testX = rx+rw;
    if (cy < ry)        testY = ry;
    else if (cy > ry+rh) testY = ry+rh;

    let distX = cx-testX;
    let distY = cy-testY;
    let distance = sqrt( (distX*distX) + (distY*distY) );

    return distance <= diameter/2;
}