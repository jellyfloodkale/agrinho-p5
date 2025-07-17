// === JOGO DA MEMÓRIA: FESTEJANDO A CONEXÃO CAMPO-CIDADE - Agrinho 2025 ===

// --- CONFIGURAÇÕES GLOBAIS E VARIÁVEIS DE ESTADO ---

// Variáveis de Layout: Definidas globalmente para serem acessíveis em todo o código.
const larguraCarta = 100;
const alturaCarta = 120;
const margemX = 20;
const margemY = 20;
const posicaoInicialX = 50;
const posicaoInicialY = 50;
const cartasPorLinha = 5;

// Arrays para controlar a lógica do jogo
let cartas = [];
let cartasViradas = [];
let paresEncontrados = [];

// Dados de cada carta (emoji e informação)
const dadosDasCartas = [
    { emojiResposta: "🐑", info: "As ovelhas do campo fornecem a lã para as roupas e o queijo que chegam às cidades." },
    { emojiResposta: "🏢", info: "Os escritórios nas cidades são centros de negócios que gerenciam a logística e venda dos produtos que vêm do campo." },
    { emojiResposta: "🚜", info: "O trator é uma tecnologia essencial no campo para produzir alimentos em grande escala para toda a população da cidade." },
    { emojiResposta: "🚆", info: "O trem é vital para transportar tanto os produtos do campo para a cidade quanto as pessoas entre esses dois lugares." },
    { emojiResposta: "🐔", info: "As galinhas criadas no campo garantem uma fonte rica de proteína, com ovos e carne, para os moradores das cidades." },
    { emojiResposta: "📚", info: "As bibliotecas e centros de pesquisa da cidade desenvolvem conhecimentos que melhoram as técnicas agrícolas no campo." },
    { emojiResposta: "🏘️", info: "O celeiro armazena os grãos e a produção do campo, garantindo que os alimentos cheguem conservados aos mercados da cidade." },
    { emojiResposta: "🏞️", info: "Os pastos do campo são fundamentais para a criação de gado, que fornece o leite e a carne consumidos diariamente nas cidades." },
    { emojiResposta: "🛣️", info: "As ruas e estradas conectam o campo à cidade, permitindo que os alimentos cheguem frescos e os serviços possam transitar." },
    { emojiResposta: "🛍️", info: "O shopping na cidade oferece produtos e tecnologias que também são essenciais para a vida e o trabalho das pessoas no campo." }
];

// Variáveis de estado do jogo
let pontuacao = 0;
let exibindoMensagemPar = false;
let mensagemAtual = '';
let jogoFinalizado = false;

// Variáveis para a animação de fundo
let corFundo;
const corVitoria = '#ADD8E6'; // Azul claro

// --- FUNÇÃO DE CONFIGURAÇÃO INICIAL (SETUP) ---
// Executada uma única vez no início para configurar o ambiente do jogo.
function setup() {
    // Cria a tela e a centraliza na página
    let tela = createCanvas(800, 600);
    tela.style('display', 'block');
    tela.style('margin', 'auto');

    // Prepara os valores das cartas, duplicando e embaralhando
    let valores = dadosDasCartas.map(dado => dado.emojiResposta);
    valores = valores.concat(valores);
    valores = embaralhar(valores);

    // Cria e posiciona cada objeto 'Carta' no tabuleiro
    for (let i = 0; i < 20; i++) {
        let coluna = i % cartasPorLinha;
        let linha = floor(i / cartasPorLinha);
        let x = posicaoInicialX + coluna * (larguraCarta + margemX);
        let y = posicaoInicialY + linha * (alturaCarta + margemY);
        let valor = valores[i];
        cartas.push(new Carta(x, y, valor));
    }

    // Configurações padrão de texto e cor
    textFont('Arial');
    corFundo = color('#F0F0F0'); // Cor de fundo padrão (cinza claro)
}

// --- FUNÇÃO DE DESENHO PRINCIPAL (DRAW) ---
// Executada continuamente em loop para renderizar cada quadro do jogo.

function draw() {
    // Anima a cor de fundo suavemente se o jogo terminou
    if (jogoFinalizado) {
        corFundo = lerpColor(corFundo, color(corVitoria), 0.02);
    }
    background(corFundo);

    // Funções auxiliares para desenhar cada parte do jogo
    desenharCartas();
    desenharHUD();
    
    // Desenha as caixas de mensagem ou a tela final, se necessário
    if (exibindoMensagemPar) {
        desenharCaixaDeMensagem();
    }
    if (jogoFinalizado) {
        desenharTelaFinal();
    }
}

// --- FUNÇÕES AUXILIARES DE DESENHO ---

function desenharCartas() {
    for (let carta of cartas) {
        carta.mostrar();
    }
}

function desenharHUD() {
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text(`Pontos: ${pontuacao}`, 10, 30);
}

function desenharCaixaDeMensagem() {
    const larguraGrid = (cartasPorLinha * larguraCarta) + ((cartasPorLinha - 1) * margemX);
    const alturaCaixa = 240;
    const xCaixa = posicaoInicialX;
    const yCaixa = height / 2 - alturaCaixa / 2;

    fill(0, 0, 0, 220);
    rect(xCaixa, yCaixa, larguraGrid, alturaCaixa, 15);
    
    fill(255);
    textSize(18);
    textAlign(LEFT, CENTER); 
    text(mensagemAtual, xCaixa + 20, yCaixa + alturaCaixa / 2, larguraGrid - 40);
}

function desenharTelaFinal() {
    const larguraGrid = (cartasPorLinha * larguraCarta) + ((cartasPorLinha - 1) * margemX);
    const alturaCaixa = 240;
    const xCaixa = posicaoInicialX;
    const yCaixa = height / 2 - alturaCaixa / 2;
    
    fill(0, 0, 0, 230);
    rect(xCaixa, yCaixa, larguraGrid, alturaCaixa, 15);
    
    textAlign(CENTER, CENTER);
    
    fill('#FFD700');
    textSize(48);
    text("Parabéns!", xCaixa + larguraGrid / 2, yCaixa + 70);
    
    fill(255);
    textSize(20);
    text(`Pontuação Final: ${pontuacao}`, xCaixa + larguraGrid / 2, yCaixa + 140);
    
    textSize(16);
    text("Clique para jogar novamente", xCaixa + larguraGrid / 2, yCaixa + 190);
}

// --- FUNÇÃO DE EVENTO DO MOUSE ---
// Executada sempre que o mouse é pressionado.
function mousePressed() {
    // Se o jogo terminou, qualquer clique reinicia a página.
    if (jogoFinalizado) {
        location.reload();
        return;
    }

    // Impede cliques enquanto uma mensagem está sendo exibida ou se duas cartas já estão viradas.
    if (exibindoMensagemPar || cartasViradas.length >= 2) return;

    // Verifica se o clique foi em uma carta válida.
    for (let carta of cartas) {
        if (carta.contem(mouseX, mouseY) && !carta.estaVirada && !carta.foiEncontrada) {
            carta.virar();
            cartasViradas.push(carta);
            
            // Lógica executada quando a segunda carta é virada.
            if (cartasViradas.length === 2) {
                if (cartasViradas[0].valor === cartasViradas[1].valor) {
                    processarParCorreto();
                } else {
                    processarParIncorreto();
                }
            }
            break; // Sai do loop após encontrar a carta clicada.
        }
    }
}

// --- FUNÇÕES DE LÓGICA DO JOGO ---

function processarParCorreto() {
    pontuacao += 10;
    cartasViradas[0].foiEncontrada = true;
    cartasViradas[1].foiEncontrada = true;
    paresEncontrados.push(cartasViradas[0].valor);
    
    const parEncontradoInfo = dadosDasCartas.find(d => d.emojiResposta === cartasViradas[0].valor);
    cartasViradas = [];

    // Verifica se o jogo acabou.
    if (paresEncontrados.length === dadosDasCartas.length) {
        setTimeout(() => { jogoFinalizado = true; }, 1200); // Delay para mostrar a tela final.
    } else {
        // Mostra a mensagem informativa do par.
        mensagemAtual = parEncontradoInfo.info;
        exibindoMensagemPar = true;
        setTimeout(() => {
            exibindoMensagemPar = false;
            mensagemAtual = '';
        }, 5000); // Mensagem dura 5 segundos.
    }
}

function processarParIncorreto() {
    // Usa um delay para que o jogador possa ver a segunda carta antes de virar.
    setTimeout(() => {
        cartasViradas[0].virar();
        cartasViradas[1].virar();
        cartasViradas = [];
    }, 1000);
}

// --- CLASSE CARTA ---
// Define a estrutura e o comportamento de cada carta do jogo.
class Carta {
    constructor(x, y, valor) {
        this.x = x;
        this.y = y;
        this.l = larguraCarta; // Usa a constante global
        this.a = alturaCarta;  // Usa a constante global
        this.valor = valor;
        this.estaVirada = false;
        this.foiEncontrada = false;
    }

    // Desenha a carta na tela, mostrando a frente ou o verso.
    mostrar() {
        // EFEITO HOVER: Muda a borda se o mouse estiver sobre a carta.
        if (this.contem(mouseX, mouseY) && !this.estaVirada && !this.foiEncontrada) {
            strokeWeight(3);
            stroke(255, 204, 0); // Borda dourada
        } else {
            strokeWeight(1);
            stroke(0);
        }
        
        // Desenha a face da carta
        if (this.estaVirada || this.foiEncontrada) {
            fill(230, 245, 233); // Verde claro para a frente
            rect(this.x, this.y, this.l, this.a, 10);
            
            textAlign(CENTER, CENTER);
            textSize(this.a * 0.6);
            text(this.valor, this.x + this.l / 2, this.y + this.a / 2);
        } else {
            // Desenha o verso da carta
            fill(60, 70, 90); // Azul escuro para o verso
            rect(this.x, this.y, this.l, this.a, 10);
            
            fill('#FFD700');
            textAlign(CENTER, CENTER);
            textSize(30);
            text('?', this.x + this.l / 2, this.y + this.a / 2);
        }
    }

    // Verifica se as coordenadas (px, py) estão dentro dos limites da carta.
    contem(px, py) {
        return px > this.x && px < this.x + this.l && py > this.y && py < this.y + this.a;
    }

    // Inverte o estado da carta (virada/não virada).
    virar() {
        this.estaVirada = !this.estaVirada;
    }
}

// --- FUNÇÃO UTILITÁRIA ---
// Embaralha os elementos de um array usando o algoritmo.
function embaralhar(array) {
    let indiceAtual = array.length, indiceAleatorio;
    while (indiceAtual !== 0) {
        indiceAleatorio = floor(random(indiceAtual));
        indiceAtual--;
        [array[indiceAtual], array[indiceAleatorio]] = [array[indiceAleatorio], array[indiceAtual]];
    }
    return array;
}