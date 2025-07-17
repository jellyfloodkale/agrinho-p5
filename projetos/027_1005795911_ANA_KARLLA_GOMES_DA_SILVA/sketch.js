// === Onde o jogo está agora ===
let estadoDoJogo = 'introducao'; // Pode ser: 'introducao' | 'plantio' | 'transporte_auto' | 'feira' | 'final_do_jogo'

// === Coisas que o jogo usa sempre ===
let botaoIniciarCiclo; // O botão de "Começar o jogo"
let dicaAtual = null; // Um balãozinho de texto que aparece com o mouse

// === Coisas da fase de Plantio ===
let mudasDisponiveis = []; // As mudinhas que a gente pega pra plantar
let produtosPlantados = []; // As plantas que já estão no campo crescendo
let mudaArrastando = null; // A mudinha que a gente tá segurando com o mouse

const TAMANHO_MUDINHA = 30; // O tamanho inicial das mudas
const VELOCIDADE_CRESCIMENTO = 0.5; // A rapidez que as plantas crescem sozinhas
const TAMANHO_MAX_PRODUTO = 50; // O tamanho que a planta fica quando tá grandona
const MIN_PRODUTOS_CAMINHAO = 10; // Quantos produtos prontos pra colher o caminhão precisa pra aparecer

let transicaoIniciada = false; // Uma bandeirinha pra saber se a fase já tá mudando

// === Coisas da fase de Transporte Automático ===
let caminhonete; // O veículo que leva as coisas pra feira
let totalProdutosCarregadosFeira = 0; // Quantos produtos a caminhonete levou

// === Coisas da fase da Feira ===
let barracaFeira; // A barraca onde vende os produtos
let pessoasNaFeira = []; // As pessoas que vêm comprar
const NUM_MAX_PESSOAS = 6; // Quantas pessoas podem estar na feira ao mesmo tempo
const INTERVALO_PESSOAS = 30; // Tempo (em 'frames') pra uma nova pessoa aparecer
let ultimoTempoPessoaApareceu = 0; // Quando a última pessoa apareceu
const DURACAO_COMPRA = 180; // Quanto tempo a pessoa fica comprando (ou esperando)

let produtosConsumidosNaFeira = 0; // Quantos produtos já foram comprados na feira

// === Coisas da tela de Fim de Jogo ===
let fogosDeArtificio = []; // Os fogos pra festa no final!

// === Variáveis para os sons do jogo ===
let somIntro;
let somPlantio;
let somCaminhao;
let somFeira;
let somFinal;

// Antes do jogo começar a desenhar, aqui a gente carrega as imagens, sons, etc.
// No nosso caso, não tem nada, mas é bom deixar aqui!
function preload() {
  somIntro = loadSound('musica_intro.mp3');
  somPlantio = loadSound('musica_plantio.mp3');
    somCaminhao = loadSound('musica_caminhao.mp3');
    somFeira = loadSound('musica_feira.mp3');
    somFinal = loadSound('musica_final.mp3');

}

// Onde a mágica começa! Configura o que vai aparecer na tela.
function setup() {
    createCanvas(windowWidth, windowHeight); 
    angleMode(DEGREES); 
  
  
    // --- Botão gigante pra começar o jogo! ---
    botaoIniciarCiclo = createButton('INICIAR O CICLO ALIMENTAR');
    botaoIniciarCiclo.position(width / 2 - 140, height - 90); // Posição do botão
    botaoIniciarCiclo.size(280, 60); // Tamanho do botão
    botaoIniciarCiclo.style('padding', '10px 20px'); // Espaçamento interno
    botaoIniciarCiclo.style('font-size', '20px'); // Tamanho do texto
    botaoIniciarCiclo.style('background-color', '#A0C49D'); // Cor de fundo (verde clarinho)
    botaoIniciarCiclo.style('color', 'white'); // Cor do texto
    botaoIniciarCiclo.style('border', '2px solid #6A9C89'); // Borda
    botaoIniciarCiclo.style('border-radius', '12px'); // Bordinhas arredondadas
    botaoIniciarCiclo.style('cursor', 'pointer'); // Mouse vira uma mãozinha
    botaoIniciarCiclo.style('box-shadow', '5px 5px 10px rgba(0,0,0,0.4)'); // Sombrinha
    botaoIniciarCiclo.style('transition', 'background-color 0.3s ease, transform 0.1s ease'); // Animação quando passa o mouse
    botaoIniciarCiclo.style('font-family', 'Arial, sans-serif'); // Tipo de letra

    // Animações do botão quando o mouse passa por cima ou clica
    botaoIniciarCiclo.mouseOver(() => botaoIniciarCiclo.style('background-color', '#6A9C89'));
    botaoIniciarCiclo.mouseOut(() => botaoIniciarCiclo.style('background-color', '#A0C49D'));
    botaoIniciarCiclo.mousePressed(() => botaoIniciarCiclo.style('transform', 'scale(0.98)'));
    botaoIniciarCiclo.mouseReleased(() => botaoIniciarCiclo.style('transform', 'scale(1)'));

    botaoIniciarCiclo.hide(); // Esconde o botão no começo
    botaoIniciarCiclo.mousePressed(iniciarJogoCicloAlimentar); // O que acontece quando clica no botão
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Essa função desenha a caixinha de texto que aparece quando a gente passa o mouse em algo.
function desenharDica(texto, x, y) {
    fill(255, 255, 200, 220); // Fundo da dica (amarelo bem clarinho)
    stroke(100); // Borda cinza
    rect(x + 10, y + 10, textWidth(texto) + 20, 30, 5); // O retângulo da dica
    fill(0); // Cor do texto (preto)
    textSize(14); // Tamanho do texto
    textAlign(LEFT, CENTER); // Alinhamento do texto
    text(texto, x + 20, y + 25); // O texto da dica
}

// A função principal que faz o jogo acontecer, repetindo sem parar.
function draw() {
    // A gente verifica em que fase do jogo estamos e desenha a tela certa.
    if (estadoDoJogo === 'introducao') {
        desenharTelaIntroducao();
    } else if (estadoDoJogo === 'plantio') {
        desenharFasePlantio();
    } else if (estadoDoJogo === 'transporte_auto') {
        desenharFaseTransporteAutomatico();
    } else if (estadoDoJogo === 'feira') {
        desenharFaseFeira();
    } else if (estadoDoJogo === 'final_do_jogo') {
        desenharTelaFimDeJogo();
    }

    // Desenha a dica de texto sempre por cima de tudo.
    if (dicaAtual) {
        desenharDica(dicaAtual.texto, dicaAtual.x, dicaAtual.y);
    }

    // Se estiver arrastando uma muda ou produto, ele aparece junto com o mouse.
    if (mudaArrastando && (estadoDoJogo === 'plantio' || estadoDoJogo === 'feira')) {
        push(); // Salva as configurações atuais de desenho
        translate(mudaArrastando.x, mudaArrastando.y); // Move pra onde o mouse está
        noStroke(); // Sem borda
        rectMode(CENTER); // Desenha do centro

        // Se for na fase de plantio, desenha a mudinha
        if (estadoDoJogo === 'plantio') {
            fill(139, 69, 19); // Vaso marrom
            rect(0, mudaArrastando.tamanho / 4, mudaArrastando.tamanho, mudaArrastando.tamanho / 2, 5); // Base do vaso

            if (mudaArrastando.tipo === 'cenoura') {
                fill(255, 140, 0);
                triangle(0, mudaArrastando.tamanho/4, -mudaArrastando.tamanho * 0.4, -mudaArrastando.tamanho * 0.5, mudaArrastando.tamanho * 0.4, -mudaArrastando.tamanho * 0.5);
                fill(50, 150, 50);
                rect(0, -mudaArrastando.tamanho * 0.6, mudaArrastando.tamanho * 0.2, mudaArrastando.tamanho * 0.3);
            } else if (mudaArrastando.tipo === 'alface') {
                fill(100, 200, 100);
                ellipse(0, -mudaArrastando.tamanho * 0.3, mudaArrastando.tamanho * 0.8, mudaArrastando.tamanho * 0.8);
                ellipse(0, -mudaArrastando.tamanho * 0.1, mudaArrastando.tamanho * 0.7, mudaArrastando.tamanho * 0.7);
            } else if (mudaArrastando.tipo === 'tomate') {
                fill(255, 99, 71);
                ellipse(0, -mudaArrastando.tamanho * 0.4, mudaArrastando.tamanho * 0.7, mudaArrastando.tamanho * 0.7);
                fill(50, 150, 50);
                rect(0, -mudaArrastando.tamanho * 0.6, mudaArrastando.tamanho * 0.1, mudaArrastando.tamanho * 0.2);
            } else if (mudaArrastando.tipo === 'beterraba') {
                fill(139, 0, 0);
                ellipse(0, -mudaArrastando.tamanho * 0.2, mudaArrastando.tamanho * 0.8, mudaArrastando.tamanho * 0.8);
                fill(50, 150, 50);
                rect(0, -mudaArrastando.tamanho * 0.5, mudaArrastando.tamanho * 0.2, mudaArrastando.tamanho * 0.3);
                rect(mudaArrastando.tamanho * 0.2, -mudaArrastando.tamanho * 0.7, mudaArrastando.tamanho * 0.1, mudaArrastando.tamanho * 0.3);
                rect(mudaArrastando.tamanho * 0.2, -mudaArrastando.tamanho * 0.7, mudaArrastando.tamanho * 0.1, mudaArrastando.tamanho * 0.3);
            }
        } else if (estadoDoJogo === 'feira') { // Se for na fase da feira, desenha o ícone do produto
            desenharIconeProdutoGenerico(mudaArrastando.tipo, 30); // Desenha o ícone um pouco maior
        }
        pop(); // Volta pra as configurações de desenho anteriores
    }
}


// Desenha a tela de entrada do jogo, com campo, cidade e o botão "INICIAR".
function desenharTelaIntroducao() {
    // Desenha o céu e a terra em degradê
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(173, 216, 230), color(135, 206, 235), inter); // Cores do céu
        stroke(c);
        line(0, i, width, i);
    }

    // ==== Lado do CAMPO (Esquerda da tela) ====
    noStroke();
    fill(255, 223, 0, 150); // Desenha o sol
    ellipse(width * 0.2, height * 0.2, 100, 100);

    fill(100, 150, 100); // Montanha 1
    beginShape();
    vertex(0, height);
    vertex(width * 0.1, height * 0.6);
    vertex(width * 0.3, height * 0.75);
    vertex(width * 0.45, height * 0.55);
    vertex(width / 2, height);
    endShape(CLOSE);

    fill(80, 130, 80); // Montanha 2
    beginShape();
    vertex(0, height);
    vertex(width * 0.05, height * 0.7);
    vertex(width * 0.25, height * 0.85);
    vertex(width * 0.4, height * 0.7);
    vertex(width / 2, height);
    endShape(CLOSE);

    fill(100, 150, 200, 100); // Rio ou estrada
    beginShape();
    vertex(width * 0.4, height);
    vertex(width * 0.45, height * 0.8);
    vertex(width * 0.5, height);
    endShape(CLOSE);

    // ==== Lado da CIDADE (Direita da tela) ====
    fill(120); // Prédios
    rect(width * 0.55, height - 200, 70, 200);
    rect(width * 0.65, height - 150, 60, 150);
    rect(width * 0.75, height - 250, 90, 250);
    rect(width * 0.88, height - 180, 50, 180);

    fill(255, 255, 0, 200); // Janelas (amarelas)
    rect(width * 0.55 + 10, height - 180, 15, 20);
    rect(width * 0.55 + 45, height - 160, 15, 20);
    rect(width * 0.55 + 10, height - 140, 15, 20);
    rect(width * 0.55 + 45, height - 120, 15, 20);
    rect(width * 0.65 + 10, height - 130, 10, 15);
    rect(width * 0.65 + 40, height - 100, 10, 15);
    rect(width * 0.75 + 15, height - 230, 20, 30);
    rect(width * 0.75 + 55, height - 200, 20, 30);
    rect(width * 0.75 + 15, height - 170, 20, 30);
    rect(width * 0.75 + 55, height - 140, 20, 30);
    rect(width * 0.88 + 10, height - 160, 10, 15);
    rect(width * 0.88 + 30, height - 140, 10, 15);

    fill(80); // Chão da cidade
    rect(width / 2, height - 50, width / 2, 50);

    fill(255, 255, 150, 80); // Iluminação no meio
    ellipse(width / 2, height * 0.7, 300, 150);

    // ==== Títulos e Textos da Introdução ====
    fill(25);
    textSize(55);
    textAlign(CENTER, CENTER);
    text("FESTEJANDO A CONEXÃO", width / 2, height / 2 - 80);

    textSize(28);
    text("CAMPO & CIDADE", width / 2, height / 2 - 30);

    textSize(18);
    fill(60);
    text("Uma jornada do campo à sua mesa", width / 2, height / 2 + 30);
    fill("red");
    text("Aumente o tamanho da tela para melhor visualização!", width / 2, height / 2 + 60);


    // Mostra o botão "INICIAR O CICLO ALIMENTAR"
    botaoIniciarCiclo.show();
  
   if (!somIntro.isPlaying()) { // Só toca se já não estiver tocando
     somFinal.stop();   
     somIntro.loop();
    }
}

// Essa função prepara o jogo pra começar um novo ciclo.
function iniciarJogoCicloAlimentar() {
    estadoDoJogo = 'plantio'; // Muda pro primeiro estágio: o plantio
    botaoIniciarCiclo.hide(); // Esconde o botão de iniciar
    botaoIniciarCiclo.html('INICIAR O CICLO ALIMENTAR'); // Garante o texto original do botão
    botaoIniciarCiclo.style('background-color', '#A0C49D'); // Garante a cor original
    botaoIniciarCiclo.style('border', '2px solid #6A9C89'); // Garante a borda original

    // Zera todas as listas e variáveis para um jogo novinho em folha!
    produtosPlantados = [];
    mudasDisponiveis = [];
    mudaArrastando = null;
    
    // Tipos de vegetais que a gente pode plantar
    const tiposVegetais = ['cenoura', 'alface', 'tomate', 'beterraba'];

    // Coloca 12 mudinhas na "bandeja" pra gente começar a plantar
    for (let i = 0; i < MIN_PRODUTOS_CAMINHAO + 2; i++) { // 2 mudas extras pra garantir
        let tipo = random(tiposVegetais); // Escolhe um tipo qualquer
        // Posiciona as mudas lá embaixo da tela
        mudasDisponiveis.push(new Muda(width * 0.1 + (i * 70), height - 50, tipo));
    }

    // Prepara a caminhonete (ela vai aparecer na hora certa)
    caminhonete = new Veiculo(0, 0);
    caminhonete.x = caminhonete.origemX; // Começa fora da tela, à esquerda

    transicaoIniciada = false; // Reinicia a bandeirinha de transição

    // Prepara a barraca da feira e as pessoas
    barracaFeira = new BarracaFeira(width * 0.75, height * 0.8 - 50);
    pessoasNaFeira = [];
    ultimoTempoPessoaApareceu = 0;
    produtosConsumidosNaFeira = 0; // Zera o contador de produtos consumidos
    totalProdutosCarregadosFeira = 0; // Zera o total de produtos que o caminhão vai levar
    fogosDeArtificio = []; // Limpa os fogos
}

// --- FASE 1: O PLANTIO ---
// Aqui a gente arrasta as mudas e vê as plantas crescendo.
function desenharFasePlantio() {
    background(173, 216, 230); // Céu azul clarinho
    fill(124, 252, 0); // Gramado verdão do campo
    rect(0, height * 0.5, width, height * 0.5); // Desenha o chão

    // Desenha o sol e as nuvens
    fill(255, 200, 0);
    ellipse(width * 0.15, height * 0.15, 80, 80);
    fill(255, 255, 255, 200);
    ellipse(width * 0.2, height * 0.1, 100, 50);
    ellipse(width * 0.3, height * 0.2, 120, 60);

    // A área onde ficam as mudas pra pegar
    fill(180, 180, 180);
    rect(0, height - 80, width, 80);
    fill(50);
    textSize(16);
    textAlign(LEFT, CENTER);
    text("Mudas:", 10, height - 40);

    // Desenha as mudas que estão esperando pra serem plantadas
    for (let i = 0; i < mudasDisponiveis.length; i++) {
        mudasDisponiveis[i].mostrar();
    }

    // Desenha e atualiza as plantas que já estão no campo (elas crescem sozinhas!)
    for (let i = produtosPlantados.length - 1; i >= 0; i--) {
        produtosPlantados[i].crescerAutomaticamente();
        produtosPlantados[i].mostrar();
    }

    // Título e instruções da fase de plantio
    fill(50);
    textSize(28);
    textAlign(CENTER, TOP);
    text("FASE 1: O PLANTIO", width / 2, 15);
    textSize(16);
    text("Arraste as mudas da parte de baixo para o campo para plantá-las!", width / 2, 50);

    // Mostra quantos produtos já estão prontos pra colher
    let produtosProntosContador = produtosPlantados.filter(p => p.estaProntoParaPegar).length;
    fill(0, 50, 0);
    textSize(18);
    textAlign(RIGHT, TOP);
    text(`Colheitas Prontas: ${produtosProntosContador} / ${MIN_PRODUTOS_CAMINHAO}`, width - 20, 20);

    // Mostra as dicas de texto quando o mouse passa por cima
    dicaAtual = null;
    if (mudaArrastando) { // Dica pra mudinha que tá sendo arrastada
        dicaAtual = { texto: "Solte para plantar no campo!", x: mouseX, y: mouseY };
    } else { // Dicas pras mudas na bandeja
        for (let muda of mudasDisponiveis) {
            if (dist(mouseX, mouseY, muda.x, muda.y) < TAMANHO_MUDINHA / 2 + 5) {
                dicaAtual = { texto: `Muda de ${muda.tipo.charAt(0).toUpperCase() + muda.tipo.slice(1)}`, x: mouseX, y: mouseY };
                break;
            }
        }
        // Dicas pros produtos já plantados e crescendo
        if (dicaAtual === null) {
            for (let produto of produtosPlantados) {
                if (dist(mouseX, mouseY, produto.x, produto.y) < produto.tamanho / 2 + 10) {
                    dicaAtual = {
                        texto: `Colheita de ${produto.tipo.charAt(0).toUpperCase() + produto.tipo.slice(1)}: ${produto.estaProntoParaPegar ? 'Pronta para o transporte!' : 'Crescendo: ' + floor(map(produto.tamanho, TAMANHO_MUDINHA, TAMANHO_MAX_PRODUTO, 0, 100)) + '%'}`,
                        x: mouseX,
                        y: mouseY
                    };
                    break;
                }
            }
        }
    }

    // --- A hora de mudar de fase (tudo automático agora!) ---
    // A fase muda quando tiver produtos o suficiente E ainda não começou a mudar.
    if (produtosProntosContador >= MIN_PRODUTOS_CAMINHAO && !transicaoIniciada) {
        fill(0, 100, 0, 200);
        textSize(20);
        textAlign(CENTER, BOTTOM);
        text("Colheitas prontas! A caminhonete está a caminho...", width / 2, height - 20);

        transicaoIniciada = true; // Liga a bandeirinha pra não mudar de novo

        let produtosParaCarregar = [];
        // Pega todos os produtos prontos e coloca na caminhonete
        for (let i = produtosPlantados.length - 1; i >= 0; i--) {
            if (produtosPlantados[i].estaProntoParaPegar) {
                produtosParaCarregar.push(produtosPlantados[i]);
                produtosPlantados.splice(i, 1); // Tira da lista de produtos do campo
            }
        }
        caminhonete.produtosCarregados = produtosParaCarregar; // Coloca a carga na caminhonete
        totalProdutosCarregadosFeira = produtosParaCarregar.length; // Guarda quantos produtos vão pra feira

        // Espera 2 segundos pra mudar de fase (pra gente ler a mensagem)
        setTimeout(() => {
            caminhonete.x = caminhonete.origemX; // Faz a caminhonete aparecer do lado esquerdo
            caminhonete.estaMovendo = true; // A caminhonete começa a andar na hora
            
            estadoDoJogo = 'transporte_auto'; // Muda pro estágio do transporte
            transicaoIniciada = false; // Reinicia a bandeirinha pra próxima fase
        }, 2000);
    }
  
  
   if (!somPlantio.isPlaying()) { // Só toca se já não estiver tocando
      somIntro.stop();
        somPlantio.loop();
    }
}

// --- FASE 2: TRANSPORTE AUTOMÁTICO ---
// A caminhonete já carregada vai sozinha pra cidade.
function desenharFaseTransporteAutomatico() {
    background(173, 216, 230); // Céu azul

    // === Cenário: Chão Verde Infinito ===
    fill(124, 252, 0); // Verde vibrante do campo
    rect(0, height * 0.7, width, height * 0.3); // Chão verde embaixo da estrada

    // ==== Cenário: Estrada (meio da tela) ====
    fill(80); // Asfalto cinza escuro
    rect(0, height * 0.5, width, height * 0.2); // Estrada que vai de ponta a ponta
    fill(255, 255, 0); // Linhas amarelas da estrada (se movem pra dar a sensação de que a gente tá andando)
    for (let i = 0; i < width + 40; i += 80) {
        rect(i - (frameCount * caminhonete.velocidade % 80), height * 0.6 - 2, 40, 4);
    }

    // Título e instruções da fase de transporte
    fill(50);
    textSize(28);
    textAlign(CENTER, TOP);
    text("FASE 2: TRANSPORTE", width / 2, 15);
    textSize(16);
    text("A caminhonete está levando as colheitas para a cidade!", width / 2, 50);

    // Desenha a caminhonete e faz ela andar
    caminhonete.mostrar();
    caminhonete.atualizar();

    // A caminhonete já vem carregada e começa a andar sozinha.
    caminhonete.moverAutomaticamente();

    // Dica de texto pra caminhonete
    dicaAtual = null;
    if (dist(mouseX, mouseY, caminhonete.x, caminhonete.y) < caminhonete.largura / 2 + 10) {
        dicaAtual = {
            texto: `Caminhonete: ${caminhonete.produtosCarregados.length} produtos a bordo.`,
            x: mouseX,
            y: mouseY
        };
    }

    // Quando a caminhonete sai da tela, muda pra fase da feira
    if (caminhonete.x >= width + caminhonete.largura / 2) {
        estadoDoJogo = 'feira'; // Vai pra fase da feira
        
        // Pega os produtos da caminhonete e coloca na barraca da feira
        barracaFeira.receberProdutos(caminhonete.produtosCarregados);
        
        // Reinicia a caminhonete pra ela estar pronta pro próximo ciclo
        caminhonete.resetarPosicao();
        
        // Zera as coisas da feira pra começar de novo
        pessoasNaFeira = [];
        ultimoTempoPessoaApareceu = 0;
        produtosConsumidosNaFeira = 0;
        transicaoIniciada = false;
    }
  
  
   if (!somCaminhao.isPlaying()) { // Só toca se já não estiver tocando
      somPlantio.stop();
        somCaminhao.loop();
    }
}

// --- FASE 3: A FEIRA E O CONSUMO ---
// As pessoas aparecem pra comprar os produtos!
function desenharFaseFeira() {
    background(173, 216, 230); // Céu

    // --- Fundo da Cidade (mais detalhes) ---
    fill(150); // Prédios mais distantes
    rect(0, height * 0.35, width, height * 0.65);
    fill(130); // Prédios um pouco mais perto
    rect(width * 0.05, height * 0.3, 60, height * 0.7);
    rect(width * 0.25, height * 0.4, 80, height * 0.6);
    rect(width * 0.55, height * 0.25, 70, height * 0.75);
    rect(width * 0.75, height * 0.3, 90, height * 0.7);
    rect(width * 0.9, height * 0.45, 50, height * 0.55);

    fill(100); // Prédios mais próximos
    rect(width * 0.15, height * 0.2, 50, height * 0.8);
    rect(width * 0.4, height * 0.3, 75, height * 0.7);
    rect(width * 0.65, height * 0.15, 85, height * 0.85);
    rect(width * 0.85, height * 0.35, 60, height * 0.65);

    fill(80); // Chão da feira/rua
    rect(0, height * 0.8, width, height * 0.2);

    // --- Árvores de enfeite ---
    fill(101, 67, 33); // Tronco marrom
    rect(width * 0.02, height * 0.75, 10, 30);
    fill(34, 139, 34); // Folhas verdes
    ellipse(width * 0.02 + 5, height * 0.7, 25, 20);

    fill(101, 67, 33);
    rect(width * 0.98, height * 0.7, 10, 40);
    fill(34, 139, 34);
    ellipse(width * 0.98 + 5, height * 0.65, 30, 25);

    // Faixa de pedestres (parada)
    fill(255);
    for (let i = 0; i < width; i += 80) {
        rect(i, height * 0.8 + 20, 40, 10);
    }

    // Título e instruções da fase da feira
    fill(50);
    textSize(28);
    textAlign(CENTER, TOP);
    text("FASE 3: A FEIRA", width / 2, 15);

    textSize(16);
    text("Pessoas vêm à feira em busca dos produtos! Arraste da barraca para elas na rua.", width / 2, 50);
    text("A feira só fecha quando todos os produtos trazidos pelo caminhão forem consumidos!", width / 2, 70);

    // Mostra quantos produtos já foram consumidos
    fill(0, 50, 0);
    textSize(18);
    textAlign(RIGHT, TOP);
    text(`Produtos Consumidos: ${produtosConsumidosNaFeira} / ${totalProdutosCarregadosFeira}`, width - 20, 20);

    // Desenha a barraca da feira e os produtos nela
    barracaFeira.mostrar();

    // Lógica pra fazer as pessoas aparecerem na feira
    // Novas pessoas só aparecem se ainda tiver produto pra vender e não tiver gente demais.
    if (produtosConsumidosNaFeira < totalProdutosCarregadosFeira && frameCount - ultimoTempoPessoaApareceu > INTERVALO_PESSOAS && pessoasNaFeira.length < NUM_MAX_PESSOAS) {
        pessoasNaFeira.push(new PessoaFeira(random(width * 0.1, width * 0.9), height + 50)); // Começam aparecendo de baixo
        ultimoTempoPessoaApareceu = frameCount;    
    }

    // Atualiza e desenha todas as pessoas da feira
    for (let i = pessoasNaFeira.length - 1; i >= 0; i--) {
        pessoasNaFeira[i].atualizar(barracaFeira); // As pessoas interagem com a barraca
        pessoasNaFeira[i].mostrar();
        if (pessoasNaFeira[i].acabou()) { // Se a pessoa já comprou e saiu da tela
            pessoasNaFeira.splice(i, 1); // Tira ela da lista
        }
    }

    // Dicas de texto pra barraca da feira
    dicaAtual = null;
    if (dist(mouseX, mouseY, barracaFeira.x, barracaFeira.y) < barracaFeira.largura / 2 + 20) {
        dicaAtual = {
            texto: `Feira Livre: ${barracaFeira.produtosExibidos.length} produtos disponíveis.`,
            x: mouseX,
            y: mouseY
        };
    }

    // === A hora de acabar a fase da Feira ===
    // A fase acaba quando todos os produtos foram consumidos E todas as pessoas foram embora.
    if (produtosConsumidosNaFeira >= totalProdutosCarregadosFeira && !transicaoIniciada) {    
        transicaoIniciada = true; // Liga a bandeirinha de transição
        
        // Faz as pessoas que ainda estão por ali irem embora mais rápido
        for (let pessoa of pessoasNaFeira) {
            pessoa.velocidade = 4; // Aumenta a velocidade
            if (pessoa.estado === 'comprando' || pessoa.estado === 'indo_para_barraca') {
                pessoa.estado = 'indo_embora';
                pessoa.alvoX = random(width + 50, width + 100); // Manda ela pra fora da tela
            }
        }

        // Mensagem de "fim de ciclo" na tela da feira
        fill(0, 0, 150, 200);
        textSize(20);
        textAlign(CENTER, BOTTOM);
        text("O ciclo alimentar se completou!", width / 2, height - 50);

        // Espera um pouco pra todo mundo sair antes de mudar de tela
        setTimeout(() => {
            const verificarPessoasFora = setInterval(() => {
                if (pessoasNaFeira.length === 0) { // Só muda quando não tiver mais ninguém
                    clearInterval(verificarPessoasFora);
                    estadoDoJogo = 'final_do_jogo'; // Muda pro final do jogo
                }
            }, 100); // Verifica a cada 0.1 segundo
        }, 1500); // Espera 1.5 segundos antes de começar a verificar
    }
    // O botão de reiniciar só aparece na tela de introdução e no final do jogo.
    botaoIniciarCiclo.hide();
  
  if (!somFeira.isPlaying()) { // Só toca se já não estiver tocando
      somCaminhao.stop();
        somFeira.loop();
    }
}

// --- FASE FINAL: TELA DE FIM DE JOGO ---
// Hora dos fogos de artifício e da mensagem de parabéns!
function desenharTelaFimDeJogo() {
    background(20, 20, 40); // Fundo escuro pra combinar com os fogos

    // Desenha os fogos de artifício
    if (frameCount % 40 === 0 && fogosDeArtificio.length < 10) { // Faz um fogo novo a cada 40 "frames"
        fogosDeArtificio.push(new FogoDeArtificio());
    }
    for (let i = fogosDeArtificio.length - 1; i >= 0; i--) {
        fogosDeArtificio[i].atualizar();
        fogosDeArtificio[i].mostrar();
        if (fogosDeArtificio[i].acabou()) {
            fogosDeArtificio.splice(i, 1); // Tira o fogo da lista quando ele termina
        }
    }

    // Mensagem de conclusão do jogo
    fill(255); // Texto branco
    textSize(40);
    textAlign(CENTER, CENTER);
    text("JORNADA CONCLUÍDA!", width / 2, height / 2 - 80);

    textSize(20);
    text("O campo alimentou a cidade e o ciclo se completou.", width / 2, height / 2);
    text("Sua colheita chegou às mesas e trouxe vida à feira!", width / 2, height / 2 + 30);

    // Botão pra voltar ao início e jogar de novo
    if (botaoIniciarCiclo.elt.innerHTML !== "INICIAR NOVO CICLO") {
        botaoIniciarCiclo.html("INICIAR NOVO CICLO"); // Muda o texto do botão
        botaoIniciarCiclo.position(width / 2 - 140, height - 90); // Posiciona o botão
        botaoIniciarCiclo.style('background-color', '#4CAF50'); // Muda a cor (verde)
        botaoIniciarCiclo.style('border', '2px solid #388E3C'); // Muda a borda
        botaoIniciarCiclo.show(); // Mostra o botão
        // Quando clica, volta pra tela de introdução
        botaoIniciarCiclo.mousePressed(() => {
            estadoDoJogo = 'introducao';
            botaoIniciarCiclo.hide(); // Esconde o botão (a tela de intro vai mostrá-lo de novo)
        });
    }
    botaoIniciarCiclo.show(); // Força o botão a aparecer na tela final
  
  if (!somFinal.isPlaying()) { // Só toca se já não estiver tocando
      somFeira.stop();
        somFinal.loop();
    }
}

// === CLASSE MUDA ===
// Representa uma mudinha que a gente pega pra plantar.
class Muda {
    constructor(x, y, tipo) {
        this.x = x;
        this.y = y;
        this.tipo = tipo; // Tipo de vegetal (cenoura, alface, etc.)
        this.tamanho = TAMANHO_MUDINHA;
        this.estaSendoArrastada = false; // Vê se a gente tá segurando a muda
        this.deslocamentoX = 0; // Ajuda a muda a seguir o mouse certinho
        this.deslocamentoY = 0;
        this.xInicial = x; // Onde a muda começou (na bandeja)
        this.yInicial = y;
    }

    mostrar() {
        // Se a muda estiver sendo arrastada, ela é desenhada na função 'draw()' principal,
        // então a gente não desenha ela aqui pra não ficar duplicado.
        if (this.estaSendoArrastada) return;

        push();
        translate(this.x, this.y); // Move pra onde a muda está
        noStroke(); // Sem borda
        rectMode(CENTER); // Desenha do centro

        fill(139, 69, 19); // Vaso marrom
        rect(0, this.tamanho / 4, this.tamanho, this.tamanho / 2, 5); // O vasinho da muda

        // Desenha a parte de cima da muda dependendo do tipo
        if (this.tipo === 'cenoura') {
            fill(255, 140, 0);
            triangle(0, this.tamanho/4, -this.tamanho * 0.4, -this.tamanho * 0.5, this.tamanho * 0.4, -this.tamanho * 0.5);
            fill(50, 150, 50);
            rect(0, -this.tamanho * 0.6, this.tamanho * 0.2, this.tamanho * 0.3);
        } else if (this.tipo === 'alface') {
            fill(100, 200, 100);
            ellipse(0, -this.tamanho * 0.3, this.tamanho * 0.8, this.tamanho * 0.8);
            ellipse(0, -this.tamanho * 0.1, this.tamanho * 0.7, this.tamanho * 0.7);
        } else if (this.tipo === 'tomate') {
            fill(255, 99, 71);
            ellipse(0, -this.tamanho * 0.4, this.tamanho * 0.7, this.tamanho * 0.7);
            fill(50, 150, 50);
            rect(0, -this.tamanho * 0.6, this.tamanho * 0.1, this.tamanho * 0.2);
        } else if (this.tipo === 'beterraba') {
            fill(139, 0, 0);
            ellipse(0, -this.tamanho * 0.2, this.tamanho * 0.8, this.tamanho * 0.8);
            fill(50, 150, 50);
            rect(0, -this.tamanho * 0.5, this.tamanho * 0.2, this.tamanho * 0.3);
            rect(this.tamanho * 0.2, -this.tamanho * 0.7, this.tamanho * 0.1, this.tamanho * 0.3);
            rect(this.tamanho * 0.2, -this.tamanho * 0.7, this.tamanho * 0.1, this.tamanho * 0.3);
        }
        pop();
    }

    // Vê se o mouse está em cima da muda
    contem(px, py) {
        return dist(px, py, this.x, this.y) < this.tamanho / 2;
    }
}


// === CLASSE PRODUTO FAZENDA ===
// Representa um produto que foi plantado e está crescendo.
class ProdutoFazenda {
    constructor(x, y, tipo) {
        this.x = x;
        this.y = y;
        this.tipo = tipo;
        this.tamanho = TAMANHO_MUDINHA; // Começa pequeno, como a muda
        this.estaProntoParaPegar = false; // Vê se já cresceu o suficiente
        this.xInicial = x;
        this.yInicial = y;
    }

    // Faz a planta crescer sozinha!
    crescerAutomaticamente() {
        if (this.tamanho < TAMANHO_MAX_PRODUTO) {
            this.tamanho += VELOCIDADE_CRESCIMENTO * 0.1; // Vai crescendo aos pouquinhos
            if (this.tamanho >= TAMANHO_MAX_PRODUTO) {
                this.estaProntoParaPegar = true; // A planta tá pronta!
                this.tamanho = TAMANHO_MAX_PRODUTO; // Não cresce mais que o máximo
            }
        }
    }

    mostrar() {
        push();
        translate(this.x, this.y); // Move pra onde a planta está
        noStroke(); // Sem borda
        rectMode(CENTER);

        // Desenha a planta de acordo com o tipo e tamanho
        if (this.tipo === 'cenoura') {
            fill(255, 140, 0);
            triangle(0, this.tamanho/2, -this.tamanho * 0.6, -this.tamanho, this.tamanho * 0.6, -this.tamanho);
            fill(50, 150, 50);
            rect(0, -this.tamanho * 1.2, this.tamanho * 0.2, this.tamanho * 0.5);
            rect(-this.tamanho * 0.2, -this.tamanho * 1.1, this.tamanho * 0.1, this.tamanho * 0.3);
            rect(this.tamanho * 0.2, -this.tamanho * 1.1, this.tamanho * 0.1, this.tamanho * 0.3);
        } else if (this.tipo === 'alface') {
            fill(100, 200, 100);
            ellipse(0, 0, this.tamanho * 1.2, this.tamanho * 1.2);
            fill(120, 220, 120);
            ellipse(0, -this.tamanho * 0.2, this.tamanho, this.tamanho);
            fill(140, 240, 140);
            ellipse(0, -this.tamanho * 0.4, this.tamanho * 0.8, this.tamanho * 0.8);
        } else if (this.tipo === 'tomate') {
            fill(255, 69, 0);
            ellipse(0, 0, this.tamanho * 1.2, this.tamanho * 1.2);
            fill(50, 150, 50);
            rect(0, -this.tamanho * 0.6, this.tamanho * 0.2, this.tamanho * 0.3);
        } else if (this.tipo === 'beterraba') {
            fill(139, 0, 0);
            ellipse(0, 0, this.tamanho * 1.2, this.tamanho * 1.2);
            fill(50, 150, 50);
            rect(0, -this.tamanho * 0.8, this.tamanho * 0.2, this.tamanho * 0.5);
            rect(-this.tamanho * 0.2, -this.tamanho * 0.7, this.tamanho * 0.1, this.tamanho * 0.3);
            rect(this.tamanho * 0.2, -this.tamanho * 0.7, this.tamanho * 0.1, this.tamanho * 0.3);
        }

        // Se a planta tá pronta, ela brilha!
        if (this.estaProntoParaPegar) {
            fill(0, 200, 0, 100 + sin(frameCount * 0.1) * 50);
            ellipse(0, 0, this.tamanho + 10, this.tamanho + 10);
        }
        pop();
    }
}

// === CLASSE VEICULO (A CAMINHONETE) ===
// A caminhonete que leva as coisas da fazenda pra cidade.
class Veiculo {
    constructor(x, y) {
        this.largura = 100;
        this.altura = 40;
        this.x = x;
        this.y = height * 0.5 + this.altura / 2; // Coloca a caminhonete na estrada
        this.velocidade = 3; // A rapidez que a caminhonete anda
        
        this.alvoX = width + this.largura / 2; // Onde ela deve sair da tela
        this.origemX = -this.largura / 2; // Onde ela entra na tela

        this.produtosCarregados = []; // O que tem dentro da caminhonete
        this.estaMovendo = false; // Vê se a caminhonete tá andando
    }

    // Faz a caminhonete voltar pro começo pra um novo ciclo
    resetarPosicao() {
        this.x = this.origemX;
        this.produtosCarregados = []; // Esvazia a carga
        this.estaMovendo = false;
    }

    // Faz a caminhonete andar sozinha
    moverAutomaticamente() {
        this.estaMovendo = true;
    }

    // Atualiza a posição da caminhonete
    atualizar() {
        if (this.estaMovendo) {
            this.x += this.velocidade; // Move pra direita
        }
    }

    mostrar() {
        push();
        translate(this.x, this.y); // Move pra onde a caminhonete está
        rectMode(CENTER);

        // --- Desenha a caminhonete ---
        // A caçamba
        fill(150, 75, 0); // Cor de madeira
        rect(-10, 0, this.largura - 20, this.altura, 5);

        // A cabine
        fill(0, 100, 150); // Azul escuro
        rect(this.largura / 2 - 25, -this.altura / 2 + 5, 40, this.altura - 10, 5);
        fill(173, 216, 230); // Janela
        rect(this.largura / 2 - 20, -this.altura / 2 + 5, 15, this.altura / 2 - 5);

        // As rodas
        fill(50); // Cinza escuro
        ellipse(-this.largura / 2 + 15, this.altura / 2 - 5, 20, 20);
        ellipse(this.largura / 2 - 35, this.altura / 2 - 5, 20, 20);

        // --- Desenha os produtos na caçamba ---
        let espacoProduto = 15;
        let inicioX = -this.largura / 2 + 30; // Começa da parte de trás da caçamba
        for (let i = 0; i < this.produtosCarregados.length; i++) {
            let p = this.produtosCarregados[i];
            push();
            translate(inicioX + (i * espacoProduto), -this.altura / 2 + 10); // Posiciona o produto na caçamba
            
            noStroke();
            desenharIconeProdutoGenerico(p.tipo, 15); // Desenha um ícone pequeno do produto
            pop();
        }
        pop();
    }
}

// === CLASSE BARRACA FEIRA ===
// A barraca onde os produtos são vendidos na cidade.
class BarracaFeira {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.largura = 200;
        this.altura = 100;
        this.produtosExibidos = []; // Os produtos que estão na banca
    }

    mostrar() {
        push();
        translate(this.x, this.y);
        rectMode(CENTER);

        fill(139, 69, 19); // Madeira da barraca
        rect(0, 0, this.largura, this.altura, 5); // Base da barraca
        
        // Toldo (parte de cima) com listras
        fill(200, 50, 50); // Vermelho
        triangle(-this.largura / 2, -this.altura / 2, this.largura / 2, -this.altura / 2, 0, -this.altura - 10);
        
        fill(255); // Listra branca
        triangle(-this.largura / 2 + 10, -this.altura / 2, 0, -this.altura - 2, this.largura / 2 - 10, -this.altura / 2);
        
        fill(255);
        textSize(18);
        textAlign(CENTER, CENTER);
        text("FEIRA LIVRE", 0, -this.altura / 2 + 10);

        // Desenha os produtos na barraca de forma organizada
        const TAMANHO_ICONE_FEIRA = 25;
        let espacoProduto = TAMANHO_ICONE_FEIRA * 1.5;
        let larguraTotalProdutos = this.produtosExibidos.length * espacoProduto;
        let inicioX = -(larguraTotalProdutos - espacoProduto) / 2; // Centraliza os produtos

        let yProduto = 0; // Posição Y do produto na barraca
        for (let i = 0; i < this.produtosExibidos.length; i++) {
            let p = this.produtosExibidos[i];
            // Se o produto está sendo arrastado, não desenha ele na barraca.
            if (mudaArrastando && mudaArrastando === p) continue;

            push();
            translate(inicioX + (i * espacoProduto), yProduto);
            
            noStroke();
            desenharIconeProdutoGenerico(p.tipo, TAMANHO_ICONE_FEIRA);
            pop();
        }
        pop();
    }

    // Recebe os produtos que vieram do caminhão
    receberProdutos(arrayDeProdutos) {
        this.produtosExibidos = [...this.produtosExibidos, ...arrayDeProdutos]; // Adiciona na lista da barraca

        // Reorganiza a posição de todos os produtos na barraca
        const TAMANHO_ICONE_FEIRA = 25;    
        let espacoProduto = TAMANHO_ICONE_FEIRA * 1.5;    
        let larguraTotalProdutos = this.produtosExibidos.length * espacoProduto;
        let inicioXOffset = this.x - (larguraTotalProdutos - espacoProduto) / 2;    

        for (let i = 0; i < this.produtosExibidos.length; i++) {
            let p = this.produtosExibidos[i];
            p.x = inicioXOffset + (i * espacoProduto);
            p.y = this.y; // Fica no centro da barraca
            p.estaSendoArrastada = false; // Garante que não está sendo arrastado
        }
    }
}

// === CLASSE PESSOA FEIRA ===
// As pessoas que vêm comprar os produtos na feira.
class PessoaFeira {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alvoX = barracaFeira.x + random(-barracaFeira.largura / 2 + 20, barracaFeira.largura / 2 - 20); // Onde ela vai parar na barraca
        this.alvoY = height * 0.9; // A altura na rua
        this.velocidade = random(2, 4); // A rapidez que ela anda
        this.estado = 'indo_para_barraca'; // Pode ser: 'indo_para_barraca' | 'comprando' | 'indo_embora'
        this.produtoSegurando = null; // O produto que a pessoa está levando
        this.tempoInicioCompra = 0; // Quanto tempo ela está esperando pra comprar
        this.tamanho = random(30, 40); // Tamanho da pessoa

        // Cores de roupa aleatórias
        const coresCorpo = [
            color(255, 99, 71), // Vermelho coral
            color(60, 179, 113), // Verde mar
            color(123, 104, 238), // Roxo suave
            color(255, 215, 0), // Amarelo ouro
            color(70, 130, 180) // Azul aço
        ];
        this.corCorpo = random(coresCorpo);

        // O tipo de produto que essa pessoa quer comprar
        const tiposVegetais = ['cenoura', 'alface', 'tomate', 'beterraba'];
        this.tipoProdutoDesejado = random(tiposVegetais);
    }

    atualizar(barraca) {
        if (this.estado === 'indo_para_barraca') {
            // Primeiro, ela sobe pra rua, depois anda até a barraca
            if (this.y > this.alvoY) {
                this.y = lerp(this.y, this.alvoY, 0.08 * this.velocidade); // Sobe mais rápido
            } else if (dist(this.x, this.y, this.alvoX, this.y) > this.velocidade) {
                this.x = lerp(this.x, this.alvoX, 0.08 * this.velocidade); // Anda mais rápido
            } else { // Chegou na barraca
                this.x = this.alvoX;
                this.y = this.alvoY;
                this.estado = 'comprando'; // Começa a "comprar" (esperar)
                this.tempoInicioCompra = frameCount; // Marca a hora que começou a esperar
            }
        } else if (this.estado === 'comprando') {
            // A pessoa espera pelo produto. Se demorar muito ou não tiver mais, ela vai embora.
            if (this.produtoSegurando) { // Se já pegou o produto, vai embora feliz
                this.estado = 'indo_embora';
                this.alvoX = random(width + 50, width + 100);
            } else if (frameCount - this.tempoInicioCompra > DURACAO_COMPRA || barraca.produtosExibidos.length === 0) {
                this.estado = 'indo_embora'; // Vai embora sem produto
                this.alvoX = random(width + 50, width + 100);
            }
        } else if (this.estado === 'indo_embora') {
            this.x += this.velocidade; // Anda pra fora da tela
        }
    }

    mostrar() {
        push();
        translate(this.x, this.y);

        // A pessoa balança um pouco quando anda!
        let valorBalanço = sin(frameCount * 0.15 + this.x * 0.01) * 3; // Balanço pros lados
        rotate(sin(frameCount * 0.08 + this.y * 0.01) * 0.5); // Leve rotação
        translate(valorBalanço, 0); // Aplica o balanço

        fill(this.corCorpo); // Corpo da pessoa
        ellipse(0, -this.tamanho * 0.7, this.tamanho * 0.7, this.tamanho * 1.2);
        fill(255, 200, 150); // Cabeça
        ellipse(0, -this.tamanho * 1.5, this.tamanho * 0.6, this.tamanho * 0.6);
        fill(50); // Olhos
        ellipse(-this.tamanho * 0.1, -this.tamanho * 1.5, 3, 3);
        ellipse(this.tamanho * 0.1, -this.tamanho * 1.5, 3, 3);

        if (this.produtoSegurando) {
            // Desenha o produto que a pessoa está segurando na mão
            push();
            translate(this.tamanho / 2, -this.tamanho);
            noStroke();
            desenharIconeProdutoGenerico(this.produtoSegurando.tipo, 20);
            pop();
        } else if (this.estado === 'comprando') {
            // Balãozinho de fala com o produto que ela quer
            push();
            translate(0, -this.tamanho * 2);
            fill(255, 255, 200);
            stroke(0);
            rectMode(CENTER);
            rect(0, 0, this.tamanho * 1.5, this.tamanho * 1.5, 5);

            desenharIconeProdutoGenerico(this.tipoProdutoDesejado, 25);
            pop();
        }

        pop();
    }

    // Vê se o mouse está em cima da pessoa
    contem(px, py) {
        return dist(px, py, this.x, this.y - this.tamanho * 0.7) < this.tamanho * 0.4;
    }

    // Vê se a pessoa já saiu da tela e acabou seu ciclo
    acabou() {
        return this.estado === 'indo_embora' && this.x > width + 20;
    }
}

// === FUNÇÃO GLOBAL: DESENHAR ÍCONE DO PRODUTO ===
// Desenha um ícone pequeno de qualquer produto.
function desenharIconeProdutoGenerico(tipo, tamanhoIcone) {
    if (tipo === 'cenoura') {
        fill(255, 140, 0);
        triangle(0, tamanhoIcone / 2, -tamanhoIcone * 0.4, -tamanhoIcone * 0.5, tamanhoIcone * 0.4, -tamanhoIcone * 0.5);
    } else if (tipo === 'alface') {
        fill(100, 200, 100);
        ellipse(0, 0, tamanhoIcone, tamanhoIcone);
    } else if (tipo === 'tomate') {
        fill(255, 69, 0);
        ellipse(0, 0, tamanhoIcone, tamanhoIcone);
    } else if (tipo === 'beterraba') {
        fill(139, 0, 0);
        ellipse(0, 0, tamanhoIcone, tamanhoIcone);
    }
}

// --- CLASSE FOGO DE ARTIFICIO ---
// Faz os fogos de artifício no final do jogo.
class FogoDeArtificio {
    constructor() {
        // Começa com uma partícula que sobe (o foguete)
        this.foguete = new Particula(random(width), height, true);
        this.explodiu = false;
        this.particulas = []; // Os pedacinhos que explodem
    }

    atualizar() {
        if (!this.explodiu) {
            this.foguete.aplicarForca(createVector(0, -0.2)); // Foguete sobe
            this.foguete.atualizar();
            // Se o foguete começar a descer ou atingir a altura máxima
            if (this.foguete.velocidade.y >= 0 && this.foguete.posicao.y < height * 0.7) {
                this.explodiu = true;
                this.explodir(); // Faz a explosão
            }
        }
        // Atualiza os pedacinhos da explosão
        for (let i = this.particulas.length - 1; i >= 0; i--) {
            this.particulas[i].aplicarForca(createVector(0, 0.05)); // Gravidade puxa pra baixo
            this.particulas[i].atualizar();
            if (this.particulas[i].acabou()) {
                this.particulas.splice(i, 1); // Tira os pedacinhos que sumiram
            }
        }
    }

    mostrar() {
        if (!this.explodiu) {
            this.foguete.mostrar(); // Mostra o foguete subindo
        }
        for (let i = this.particulas.length - 1; i >= 0; i--) {
            this.particulas[i].mostrar(); // Mostra os pedacinhos da explosão
        }
    }

    // Cria os pedacinhos coloridos da explosão
    explodir() {
        let cores = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(255, 0, 255), color(0, 255, 255)];
        let corEscolhida = random(cores); // Escolhe uma cor qualquer
        for (let i = 0; i < 100; i++) {
            this.particulas.push(new Particula(this.foguete.posicao.x, this.foguete.posicao.y, false, corEscolhida));
        }
    }

    // Vê se o fogo de artifício acabou de vez
    acabou() {
        return this.explodiu && this.particulas.length === 0;
    }
}

// --- CLASSE PARTICULA (Para os fogos de artifício) ---
class Particula {
    constructor(x, y, ehFoguete, corDaParticula = null) {
        this.posicao = createVector(x, y);
        this.ehFoguete = ehFoguete;
        this.vidaUtil = 255; // Quanto tempo a partícula fica na tela
        this.corDaParticula = corDaParticula || color(random(255), random(255), random(255)); // Cor da partícula

        if (this.ehFoguete) { // Se for o foguete que sobe
            this.velocidade = createVector(0, random(-10, -8));
        } else { // Se for um pedacinho da explosão
            this.velocidade = p5.Vector.random2D(); // Vai pra qualquer direção
            this.velocidade.mult(random(1, 5)); // Com uma velocidade aleatória
        }
        this.aceleracao = createVector(0, 0);
    }

    // Aplica uma força na partícula (tipo a gravidade)
    aplicarForca(forca) {
        this.aceleracao.add(forca);
    }

    // Atualiza a posição e a vida da partícula
    atualizar() {
        this.velocidade.add(this.aceleracao);
        this.posicao.add(this.velocidade);
        this.aceleracao.mult(0); // Zera a aceleração pra não acumular
        this.vidaUtil -= (this.ehFoguete ? 2 : 5); // Faz a partícula sumir mais rápido se for da explosão
    }

    mostrar() {
        push();
        noStroke();
        fill(this.corDaParticula, this.vidaUtil); // Desenha a partícula com a cor e vida dela
        if (this.ehFoguete) {
            ellipse(this.posicao.x, this.posicao.y, 5, 5); // Foguete maior
        } else {
            ellipse(this.posicao.x, this.posicao.y, 3, 3); // Pedacinho menor
        }
        pop();
    }

    // Vê se a partícula sumiu
    acabou() {
        return this.vidaUtil < 0;
    }
}


// ==========================================================
// FUNÇÕES DO MOUSE (O que acontece quando a gente clica, arrasta, etc.)
// ==========================================================

// Quando a gente aperta o botão do mouse
function mousePressed() {
    if (estadoDoJogo === 'plantio') {
        // Tenta pegar uma mudinha pra arrastar
        for (let i = 0; i < mudasDisponiveis.length; i++) {
            if (mudasDisponiveis[i].contem(mouseX, mouseY)) {
                // Pega a muda da lista e guarda ela como a muda que tá sendo arrastada
                mudaArrastando = mudasDisponiveis.splice(i, 1)[0];
                mudaArrastando.estaSendoArrastada = true;
                // Calcula a diferença entre o mouse e o centro da muda pra ela seguir certinho
                mudaArrastando.deslocamentoX = mudaArrastando.x - mouseX;
                mudaArrastando.deslocamentoY = mudaArrastando.y - mouseY;
                break; // Só pode arrastar uma muda por vez
            }
        }
    } else if (estadoDoJogo === 'feira') { // Só na feira pra arrastar produtos
        // Tenta pegar um produto da barraca
        for (let i = barracaFeira.produtosExibidos.length - 1; i >= 0; i--) {
            let produto = barracaFeira.produtosExibidos[i];
            
            // Calcula onde o produto está na tela pra ver se o mouse clicou nele
            const TAMANHO_ICONE_FEIRA = 25;    
            let espacoProduto = TAMANHO_ICONE_FEIRA * 1.5;    
            let larguraTotalProdutos = barracaFeira.produtosExibidos.length * espacoProduto;
            let inicioXProdutos = barracaFeira.x - (larguraTotalProdutos - espacoProduto) / 2;
            let produtoXAbsoluto = inicioXProdutos + (i * espacoProduto);
            let produtoYAbsoluto = barracaFeira.y; // Y do centro da barraca

            // Se o mouse clicou no produto
            if (dist(mouseX, mouseY, produtoXAbsoluto, produtoYAbsoluto) < TAMANHO_ICONE_FEIRA * 0.75) {
                mudaArrastando = barracaFeira.produtosExibidos.splice(i, 1)[0]; // "Pega" o produto da barraca
                mudaArrastando.estaSendoArrastada = true;
                // De novo, calcula o deslocamento pra ele seguir o mouse
                mudaArrastando.deslocamentoX = mudaArrastando.x - mouseX;    
                mudaArrastando.deslocamentoY = mudaArrastando.y - mouseY;
                // Guarda a posição original caso a gente solte ele no lugar errado
                mudaArrastando.xInicial = produtoXAbsoluto;    
                mudaArrastando.yInicial = produtoYAbsoluto;
                break;
            }
        }
    }
    // Não precisa de lógica para 'final_do_jogo' aqui, o botão já cuida disso.
}

// Quando a gente solta o botão do mouse
function mouseReleased() {
    if (estadoDoJogo === 'plantio' && mudaArrastando) {
        mudaArrastando.estaSendoArrastada = false; // Parou de arrastar
        // Se soltou a muda na área do campo
        if (mouseY > height * 0.5 && mouseY < height - 80) {
            // Cria um produto novo no lugar onde a gente soltou a muda
            produtosPlantados.push(new ProdutoFazenda(mouseX, mouseY, mudaArrastando.tipo));    
        } else {
            // Se soltou fora do campo, a muda volta pra bandeja
            mudasDisponiveis.push(mudaArrastando);
        }
        mudaArrastando = null; // Não tem mais nada sendo arrastado
    } else if (estadoDoJogo === 'feira' && mudaArrastando) {
        mudaArrastando.estaSendoArrastada = false;
        let produtoEntregueAPessoa = false; // Pra saber se a gente deu o produto pra alguém

        // --- Lógica de "soltar na rua" pra vender pra uma pessoa ---
        // Vê se o produto foi solto em cima de uma pessoa na rua
        for (let i = pessoasNaFeira.length - 1; i >= 0; i--) {
            let pessoa = pessoasNaFeira[i];
            // Se a pessoa está esperando, o produto é o que ela quer e a gente soltou em cima dela
            if (pessoa.estado === 'comprando' && mudaArrastando.tipo === pessoa.tipoProdutoDesejado && pessoa.contem(mouseX, mouseY)) {
                pessoa.produtoSegurando = mudaArrastando; // A pessoa pega o produto!
                pessoa.estado = 'indo_embora'; // Ela vai embora feliz
                pessoa.velocidade = 4; // E vai embora mais rápido!
                produtosConsumidosNaFeira++; // Conta mais um produto vendido!
                produtoEntregueAPessoa = true;
                console.log(`Produto ${mudaArrastando.tipo} entregue a uma pessoa! Total consumido: ${produtosConsumidosNaFeira}`);
                break; // Um produto pra uma pessoa
            }
        }
        
        if (!produtoEntregueAPessoa) {    
            // Se o produto foi solto na rua, mas não foi pego por ninguém
            const topoDaRuaY = height * 0.8;
            if (mouseY > topoDaRuaY) {
                 produtosConsumidosNaFeira++; // Conta como "consumido" (mesmo que jogado fora)
                 console.log(`Produto ${mudaArrastando.tipo} descartado na rua! Total consumido: ${produtosConsumidosNaFeira}`);
            } else {
                 // Se soltou em outro lugar, o produto volta pra barraca
                 barracaFeira.receberProdutos([mudaArrastando]);
                 console.log(`Produto ${mudaArrastando.tipo} devolvido à banca.`);
            }
        }
        mudaArrastando = null; // Nada mais sendo arrastado
    }
}

// Quando a gente está arrastando o mouse
function mouseDragged() {
    if ((estadoDoJogo === 'plantio' || estadoDoJogo === 'feira') && mudaArrastando) {
        // A muda/produto segue o mouse
        mudaArrastando.x = mouseX + mudaArrastando.deslocamentoX;
        mudaArrastando.y = mouseY + mudaArrastando.deslocamentoY;
    }
}

// Quando o mouse se mexe (sem clicar)
function mouseMoved() {
    dicaAtual = null; // Zera a dica, ela vai ser calculada de novo em 'draw()'
}