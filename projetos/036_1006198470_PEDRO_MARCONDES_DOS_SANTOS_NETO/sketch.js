// ♻️ AgriCity - Jogo Educativo
// Tema: Festejando a conexão campo cidade

let dinheiro = 1000;
let agua = 500;
let alimentos = 0;
let energia = 300;
let nutrientes = 200;
let poluicao = 0;
let pontosSustentabilidade = 0;
let jogoEncerrado = false;
const maxAgua = 1000; // Limite máximo de água

// Controle de tempo e fases
let tempoDeCultivo = 0; // Variável não utilizada atualmente, pode ser para futuras expansões
let fase = 0; // 0: Tela inicial, -1: Tela de dificuldade, 1: Jogo principal
let tempoUltimaColeta = 0; // Variável para controlar tempo entre coletas (não utilizada nas funções atuais)
let dificuldadeSelecionada = null; // Armazena a dificuldade escolhida
let pontosNecessarios = 0; // Pontos de sustentabilidade para vencer a fase atual

// Personagens
let personagens = [
    {
        nome: "Carlos",
        tipo: "Compostagem",
        custo: 5000,
        beneficio: 2, // Benefício em nutrientes por produção
        contratado: false,
        tempoProduzir: 30000, // Tempo em milissegundos para produzir (30 segundos)
        ultimaProducao: 0,
        historia: "Carlos é um agricultor apaixonado por técnicas sustentáveis.\nSua missão é transformar resíduos em vida através da compostagem."
    },
    {
        nome: "Ana",
        tipo: "Coleta Água",
        custo: 8000,
        beneficio: 1.5, // Benefício em água por produção
        contratado: false,
        tempoProduzir: 30000, // Tempo em milissegundos para produzir (30 segundos)
        ultimaProducao: 0,
        historia: "Ana é engenheira ambiental e especialista em reaproveitamento de água.\nSeu sonho é garantir água limpa para todas as comunidades."
    }
];

// Função de configuração inicial do p5.js
function setup() {
    let canvas = createCanvas(800, 600); // define o tamanho da tela
    canvas.parent('game-container'); // Anexa o canvas ao elemento HTML com id 'game-container'
    textSize(18); // Define o tamanho padrão da fonte
    textAlign(CENTER, CENTER); // Alinha o texto ao centro (horizontal e vertical)
}

function draw() {
    if (fase === 0) {
        desenharTelaInicial(); // Desenha a tela de boas-vindas
    } else if (fase === 1) {
        if (jogoEncerrado) { // Verifica se o jogo terminou
            if (pontosSustentabilidade >= pontosNecessarios) {
                desenharTelaVitoria(); // Tela de vitória
            } else {
                desenharTelaDerrota(); // Tela de derrota (por poluição)
            }
        } else {
            desenharInterface(); // Desenha a interface do jogo principal
            verificarProducoes(); // Verifica se os personagens produziram recursos
            verificarDerrota(); // Verifica condições de derrota
            verificarVitoria(); // Verifica condições de vitória
        }
    } else if (fase === -1) {
        desenharTelaDificuldade(); // Desenha a tela de seleção de dificuldade
    }
}

// Função de detecção de cliques do mouse
function mousePressed() {
    // Lógica de clique para a tela inicial (botão "Escolher Dificuldade")
    if (fase === 0 && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 50 && mouseY < height / 2 + 100) {
        fase = -1; // Muda para a tela de dificuldade
    }

    // Lógica de clique para a tela de dificuldade
    if (fase === -1) {
        // Botão "Fácil - Fortaleza"
        if (mouseX > width / 2 - 320 && mouseX < width / 2 - 120 && mouseY > 200 && mouseY < 250) {
            dificuldadeSelecionada = "Fácil";
            pontosNecessarios = 100; // Define pontos para vitória na dificuldade Fácil
            iniciarJogo(); // Inicia o jogo
        }
        // Botão "Médio - Curitiba"
        else if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > 200 && mouseY < 250) {
            dificuldadeSelecionada = "Médio";
            pontosNecessarios = 250; // Define pontos para vitória na dificuldade Média
            iniciarJogo();
        }
        // Botão "Difícil - Osasco"
        else if (mouseX > width / 2 + 120 && mouseX < width / 2 + 320 && mouseY > 200 && mouseY < 250) {
            dificuldadeSelecionada = "Difícil";
            pontosNecessarios = 500; // Define pontos para vitória na dificuldade Difícil
            iniciarJogo();
        }
    }

    // Lógica de clique para os botões da interface do jogo (fase 1)
    if (fase === 1 && !jogoEncerrado) {
        // Primeira linha de botões
        if (mouseX > 50 && mouseX < 250 && mouseY > height - 170 && mouseY < height - 130) construirTorre();
        if (mouseX > 300 && mouseX < 500 && mouseY > height - 170 && mouseY < height - 130) converterAguaEmDinheiro();
        if (mouseX > 550 && mouseX < 750 && mouseY > height - 170 && mouseY < height - 130) coletarAgua();

        // Segunda linha de botões
        if (mouseX > 50 && mouseX < 250 && mouseY > height - 110 && mouseY < height - 70) contratarPersonagem(personagens[0]);
        if (mouseX > 300 && mouseX < 500 && mouseY > height - 110 && mouseY < height - 70) contratarPersonagem(personagens[1]);
        if (mouseX > 550 && mouseX < 750 && mouseY > height - 110 && mouseY < height - 70) usinaPoluente();

        // Terceira linha de botões (ou continuação da segunda, dependendo do layout)
        if (mouseX > 50 && mouseX < 250 && mouseY > height - 50 && mouseY < height - 10) fecharUsina();
        if (mouseX > 300 && mouseX < 500 && mouseY > height - 50 && mouseY < height - 10) construirPainelSolar();
    }
}

// Desenha a tela inicial do jogo
function desenharTelaInicial() {
    // Fundo dinâmico simulando uma cidade sustentável
    // Gradiente do céu
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(135, 206, 235), color(60, 179, 113), inter); // Do azul claro para o verde médio
        stroke(c);
        line(0, i, width, i);
    }

    // Sol / brilho
    noStroke();
    fill(255, 255, 100, 150); // Amarelo claro e semi-transparente
    ellipse(width - 100, 100, 150, 150);

    // Montanhas / paisagem ao fundo
    fill(100, 150, 100); // Verde escuro
    triangle(0, height, width / 3, height / 2 + 50, width / 2, height);
    triangle(width / 2, height, width * 2 / 3, height / 2 + 80, width, height);

    // Prédios estilizados (formas simples)
    fill(120, 120, 120); // Cinza
    rect(width / 4, height - 200, 80, 150);
    rect(width / 2 + 50, height - 250, 70, 200);
    fill(80, 80, 80); // Cinza mais escuro
    rect(width / 3 - 30, height - 150, 60, 100);
    rect(width * 3 / 4, height - 180, 90, 130);

    // Overlay escuro com opacidade para destacar o texto
    fill(0, 0, 0, 150); // Preto com 150 de opacidade (0 a 255)
    rect(0, 0, width, height); // Desenha o overlay sobre o fundo

    // Título do jogo com cor de alto contraste
    fill(255, 255, 0); // Amarelo vibrante para o título
    textSize(32); // Tamanho maior para o título
    text("🌱 BEM-VINDO A AGRICITY ♻️!", width / 2, height / 4 - 20);

    // Texto de introdução e regras com cor de alto contraste
    fill(255); // Branco para o texto principal
    textSize(20);
    text("Agora você terá que administrá-la com sabedoria.", width / 2, height / 4 + 30);
    text("Cuidado com a poluição: se ela chegar a 100%, o jogo termina!", width / 2, height / 4 + 70);

    // Botão "Escolher Dificuldade"
    fill(100, 200, 100); // Cor de fundo do botão (verde claro)
    rect(width / 2 - 100, height / 2 + 50, 200, 50, 10); // Posição e tamanho do botão com bordas arredondadas
    fill(0); // Cor do texto do botão (preto)
    textSize(18);
    text("Escolher Dificuldade", width / 2, height / 2 + 75);
}


// Desenha a tela para seleção do nível de dificuldade
function desenharTelaDificuldade() {
    background(220); // Fundo cinza claro
    textSize(22);
    fill(0);
    text("Escolha o nível de dificuldade", width / 2, 100);

    // Botões de dificuldade com cores distintas
    // Fácil - Fortaleza
    fill(70, 200, 70); // Verde
    rect(width / 2 - 320, 200, 200, 50, 10); // Bordas arredondadas
    fill(255); // Texto branco
    textSize(16);
    text("Fácil - Fortaleza", width / 2 - 220, 225);

    // Médio - Curitiba
    fill(240, 180, 60); // Laranja/Amarelo
    rect(width / 2 - 100, 200, 200, 50, 10); // Bordas arredondadas
    fill(255); // Texto branco
    text("Médio - Curitiba", width / 2, 225);

    // Difícil - Osasco
    fill(200, 60, 60); // Vermelho
    rect(width / 2 + 120, 200, 200, 50, 10); // Bordas arredondadas
    fill(255); // Texto branco
    text("Difícil - Osasco", width / 2 + 220, 225);
}

// Desenha a tela de derrota (quando a poluição atinge o máximo)
function desenharTelaDerrota() {
    background(100); // Fundo escuro
    fill(255); // Texto branco
    textSize(24);
    text("🌫️ Jogo Encerrado! Poluição atingiu níveis críticos!", width / 2, height / 2);
    textSize(18);
    text("Recarregue a página para recomeçar.", width / 2, height / 2 + 40);
}

// Desenha a tela de vitória (quando os pontos de sustentabilidade são alcançados)
function desenharTelaVitoria() {
    background(50, 200, 100); // Fundo verde vibrante
    fill(255); // Texto branco
    textSize(24);
    text("🎉 Parabéns! Você venceu com sustentabilidade!", width / 2, height / 2);
    textSize(18);
    text("Você atingiu os pontos necessários para sua cidade!", width / 2, height / 2 + 40);
}

// Desenha a interface principal do jogo, com status e botões
function desenharInterface() {
    background(240); // Fundo claro para a interface principal

    // Exibição dos status dos recursos
    fill(0); // Cor padrão para a maioria dos textos de status (preto)
    textSize(16);
    text("Dinheiro: " + dinheiro + " R$", width / 2, 40);
    text("Água: " + agua + " L", width / 2, 70);
    text("Alimentos: " + alimentos, width / 2, 100);
    text("Energia: " + energia, width / 2, 130);
    text("Nutrientes: " + nutrientes, width / 2, 160);

    // Define as cores: verde para pouca poluição, vermelho para muita poluição
    let corVerde = color(0, 150, 0); // Verde para 0% poluição
    let corVermelha = color(200, 0, 0); // Vermelho para 100% poluição

    // Mapeia o valor da poluição (de 0 a 100) para um fator entre 0 e 1
    // Este fator é usado para interpolar a cor.
    let fatorCor = map(poluicao, 0, 100, 0, 1);

    // Interpola a cor entre verde e vermelho com base no fator de poluição
    let corAtualPoluicao = lerpColor(corVerde, corVermelha, fatorCor);

    fill(corAtualPoluicao); // Aplica a cor calculada dinamicamente ao texto da poluição
    text("Poluição: " + poluicao + "%", width / 2, 190);
    // --- Fim da implementação de map() e lerpColor() ---


    // Exibição dos Pontos de Sustentabilidade com Tooltip
    let pontosX = width / 2;
    let pontosY = 220;
    let textoPontos = "Pontos de Sustentabilidade: " + pontosSustentabilidade;

    fill(0); // Volta à cor preta para o texto de pontos
    text(textoPontos, pontosX, pontosY);

    let textoLargura = textWidth(textoPontos);
    let textoAltura = 20;

    // Lógica para exibir tooltip ao passar o mouse sobre os pontos de sustentabilidade
    if (mouseX > pontosX - textoLargura / 2 && mouseX < pontosX + textoLargura / 2 &&
        mouseY > pontosY - textoAltura / 2 && mouseY < pontosY + textoAltura / 2) {

        fill(0, 200, 0, 220); // Fundo do tooltip semi-transparente
        rect(mouseX, mouseY - 40, 260, 40, 5); // Retângulo do tooltip com bordas arredondadas
        fill(255); // Texto do tooltip branco
        textAlign(LEFT, TOP); // Alinhamento para o texto do tooltip
        textSize(14); // Tamanho da fonte para o tooltip
        text("Você precisa alcançar " + pontosNecessarios + " pontos para vencer este nível.", mouseX + 10, mouseY - 38, 240, 40);
        textAlign(CENTER, CENTER); // Volta o alinhamento de texto para o padrão
        textSize(16); // Volta o tamanho de texto para o padrão
    }

    // Área dos botões no rodapé da interface
    fill(200); // Fundo cinza para a área dos botões
    rect(0, height - 180, width, 180);

    // Desenho dos botões de interação do jogo
    // Linha 1 de botões
    desenharBotao(50, height - 170, "Construir Torre", "+ Alimentos / - Energia e Nutrientes");
    desenharBotao(300, height - 170, "Converter Água", "+ Dinheiro / + Poluição");
    desenharBotao(550, height - 170, "Coletar Água", "+ Água / - Poluição / - Energia / Risco de contaminação");

    // Linha 2 de botões
    desenharBotao(50, height - 110, "Contratar Carlos", personagens[0].historia);
    desenharBotao(300, height - 110, "Contratar Ana", personagens[1].historia);
    desenharBotao(550, height - 110, "Usina Poluente", "+ Dinheiro / + Poluição Alta");

    // Linha 3 de botões
    desenharBotao(50, height - 50, "Fechar Usina", "- Poluição / - Energia / - Dinheiro");
    desenharBotao(300, height - 50, "Painel Solar", "+ Energia / + Sustentabilidade / - Poluição / Custo financeiro");
}

// Função auxiliar para desenhar botões com tooltips
function desenharBotao(x, y, label, tooltip = "") {
    fill(50, 150, 50); // Cor de fundo do botão (verde)
    rect(x, y, 200, 40, 8); // Desenha o retângulo do botão com bordas arredondadas
    fill(255); // Cor do texto do botão (branco)
    text(label, x + 100, y + 20); // Desenha o texto do botão

    // Lógica para exibir tooltip ao passar o mouse sobre o botão
    if (mouseX > x && mouseX < x + 200 && mouseY > y && mouseY < y + 40 && tooltip) {
        fill(0, 200); // Fundo do tooltip semi-transparente
        rect(mouseX, mouseY - 40, 260, 50, 5); // Retângulo do tooltip com bordas arredondadas
        fill(255); // Texto do tooltip branco
        textAlign(LEFT, TOP); // Alinha o texto do tooltip à esquerda/topo
        textSize(12); // Tamanho da fonte do tooltip
        text(tooltip, mouseX + 5, mouseY - 38, 250, 50); // Desenha o texto do tooltip
        textAlign(CENTER, CENTER); // Volta o alinhamento de texto ao padrão do p5.js
        textSize(18); // Volta o tamanho de texto ao padrão do p5.js
    }
}

// Reinicia as variáveis do jogo para uma nova partida
function iniciarJogo() {
    fase = 1;
    dinheiro = 1000;
    agua = 500;
    alimentos = 0;
    energia = 300;
    nutrientes = 200;
    poluicao = 0;
    pontosSustentabilidade = 0;
    jogoEncerrado = false;
    // Reinicia o status de contratação dos personagens
    personagens.forEach(p => p.contratado = false);
}

// Ações de construção e recursos
function construirTorre() {
    if (energia >= 50 && nutrientes >= 30) {
        energia -= 50;
        nutrientes -= 30;
        alimentos += 20;
    } else {
         // Mensagem de feedback no console
         console.log("Não há energia ou nutrientes suficientes para construir a torre!");
    }
}

function converterAguaEmDinheiro() {
    if (agua >= 100) {
        agua -= 100;
        dinheiro += 300;
        poluicao += 5;
    } else {
         console.log("Não há água suficiente para converter em dinheiro!");
    }
}

function coletarAgua() {
    if (agua < maxAgua) {
        agua = min(maxAgua, agua + 100); // Garante que a água não ultrapasse maxAgua
        energia = max(0, energia - 10); // Garante que a energia não fique negativa
        poluicao = max(0, poluicao - 2); // Reduz poluição, mas não abaixo de zero

        // Risco de contaminação ao coletar água
        if (random() < 0.3) { // 30% de chance de aumentar a poluição
            poluicao += 2;
        }

        // Penalidade de poluição se a água estiver muito alta
        if (agua > 800) {
            poluicao += 3;
        }
    } else {
        console.log("Limite máximo de água atingido!");
    }
}

// Função para contratar personagens
function contratarPersonagem(personagem) {
    if (!personagem.contratado && dinheiro >= personagem.custo) {
        dinheiro -= personagem.custo;
        personagem.contratado = true;
        personagem.ultimaProducao = millis(); // Registra o tempo da contratação
    } else if (personagem.contratado) {
        console.log(personagem.nome + " já está contratado(a)!");
    } else {
        console.log("Não há dinheiro suficiente para contratar " + personagem.nome + "!");
    }
}

// Ações de usina poluente
function usinaPoluente() {
    dinheiro += 1000;
    poluicao += 15;
    console.log("Usina poluente ativada! Dinheiro aumentado, mas poluição também!");
}

function fecharUsina() {
    if (dinheiro >= 600 && energia >= 30 && poluicao >= 5) {
        dinheiro -= 600;
        energia -= 30;
        poluicao = max(0, poluicao - 10); // Reduz a poluição
        console.log("Usina fechada! Poluição reduzida.");
    } else {
        console.log("Não é possível fechar a usina. Verifique dinheiro, energia e níveis de poluição.");
    }
}

function construirPainelSolar() {
    if (dinheiro >= 500) {
        dinheiro -= 500;
        energia += 50;
        pontosSustentabilidade += 1;
        poluicao = max(0, poluicao - 5); // Painel solar reduz poluição
        console.log("Painel solar construído! Energia e sustentabilidade aumentadas, poluição reduzida.");
    } else {
        console.log("Não há dinheiro suficiente para construir um painel solar!");
    }
}

// Verifica e executa as produções dos personagens contratados
function verificarProducoes() {
    let agora = millis(); // Tempo atual em milissegundos
    personagens.forEach(p => {
        if (p.contratado && agora - p.ultimaProducao >= p.tempoProduzir) {
            // Se o tempo de produção passou, o personagem produz
            if (p.tipo === "Compostagem") {
                nutrientes += 20 * p.beneficio;
                console.log("Carlos produziu " + (20 * p.beneficio) + " nutrientes!");
            }
            if (p.tipo === "Coleta Água") {
                let aguaProduzida = 50 * p.beneficio;
                let aguaAntes = agua;
                agua = min(maxAgua, agua + aguaProduzida); // Garante limite de água
                console.log("Ana coletou " + (agua - aguaAntes) + " litros de água!");
            }
            p.ultimaProducao = agora; // Reinicia o contador de tempo de produção
        }
    });
}

// Verifica a condição de derrota
function verificarDerrota() {
    if (poluicao >= 100) {
        jogoEncerrado = true;
        console.log("Derrota: Poluição atingiu 100%!");
    }
}
// Verifica a condição de vitória
function verificarVitoria() {
    if (pontosSustentabilidade >= pontosNecessarios) {
        jogoEncerrado = true;
        console.log("Vitória: Pontos de sustentabilidade alcançados!");
    }
}
