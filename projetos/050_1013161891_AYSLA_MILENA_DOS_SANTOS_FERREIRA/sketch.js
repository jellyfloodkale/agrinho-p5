// VARIÁVEIS GERAIS DO JOGO
let telaAtual = "pre_intro"
let xTitulo, yTitulo
let botoes = []
let riscosDoClique = []
let imagemFundo
let opacidadeTitulo = 0
const coresParticula = ['#000000', '#FFD700', '#003366', '#33691E', '#8A2BE2', '#FF1744', '#FFFFFF']

// VARIÁVEIS ESPECÍFICAS PARA O JOGO DA MEMÓRIA
let cartas = []
let cartaVirada1 = null
let cartaVirada2 = null
let paresEncontrados = 0
let bloqueado = false
let imagensCartas = {}
let imagemBotaoAgrinho
let imagemBotaoJogar

// VARIÁVEIS PARA REPRODUÇÃO DE VÍDEO LOCAL
let videoURL = "assets/video/aysla-agrinho-2025.mp4"
let localVideoElement

// TIPOS DE CARTAS: UMA LISTA QUE DEFINE OS "TIPOS" DE PARES DE CARTAS.
const tiposDeCartas = [
    { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }
]

// VARIÁVEIS PARA CONTROLAR A MUDANÇA DE TELAS (TRANSIÇÕES SUAVES)
let emTransicao = false
let tempoInicioTransicao = 0
const duracaoTransicao = 500
let proximaTela = ""

// VARIÁVEIS DE ÁUDIO (MÚSICAS E SONS)
let musicaIntroInstrucoes
let audioLigado = true
let somCartaCidade
let somCartaCampo
const duracaoSomCarta = 2

// PRELOAD: CARREGAR ARQUIVOS QUE VOU PRECISAR NO PROJETO
function preload() {
    imagemFundo = loadImage("assets/img/Gemini_Generated_Image_74ghx074ghx074gh.jpeg")
    imagemBotaoAgrinho = loadImage("assets/img/agrinho.png")
    imagemBotaoJogar = loadImage("assets/img/iniciar-jogo.png")

    // LOOP PARA CARREGAR TODAS AS IMAGENS DAS CARTAS DOS TEMAS "CAMPO" E "CIDADE".
    // USO TEMPLATE STRINGS PARA COMPOR DINAMICAMENTE OS NOMES DOS ARQUIVOS COM BASE NO ÍNDICE ATUAL.
    for (let i = 0; i < tiposDeCartas.length; i++) {
        imagensCartas[`campo-${i}`] = loadImage(`assets/img/campo-${i}.jpg`)
        imagensCartas[`cidade-${i}`] = loadImage(`assets/img/cidade-${i}.jpg`)
    }

    musicaIntroInstrucoes = loadSound('assets/sons/edm-loop-319038.mp3')
    musicaFinalizacao = loadSound('assets/sons/winning-loop-228639.mp3')
    somCartaCidade = loadSound('assets/sons/traffic-in-city-309236.mp3')
    somCartaCampo = loadSound('assets/sons/passarinho-325866.mp3')
    localVideoElement = createVideo(videoURL)
    localVideoElement.hide()
    localVideoElement.volume(0.8)
    localVideoElement.autoplay(false)
    localVideoElement.pause()
}

// AQUI FIZ A CONFIGURAÇÃO O AMBIENTE DO JOGO, COMO O TAMANHO DA TELA E ESTILOS DE TEXTO.
function setup() {
    createCanvas(windowWidth, windowHeight) // USEI TAMANHO DA JANELA PARA MELHORAR A EXPERIÊNCIA DO USUÁRIO
    textStyle(NORMAL)
    textFont("Georgia")
    textSize(60)
    xTitulo = width / 2
    yTitulo = height * 0.10
    configurarBotoes()
    prepararJogoMemoria()
}

// DRAW: TODA LÓGICA DO MEU JOGO ESTÁ AQUI
function draw() {
    gerenciarTelas()
    fogoArtificio()
    gerenciarMusicaDeFundo()
}


function mousePressed() {
    usuarioClicou() // FUNÇÃO RESPONSÁVEL PELA INTERAÇÃO DO CLICK
}

// Função touchStarted para lidar com toques em dispositivos móveis.
function touchStarted() {
    usuarioClicou()
    return false;
}

// --- FUNÇÕES AUXILIARES DE LÓGICA PARA O DRAW --- //

// 'CONFIGURARBOTOES' CRIA TODOS OS BOTÕES DO JOGO E OS ADICIONA À LISTA 'BOTOES'.
function configurarBotoes() {
    const btnSize = 80
    const btnSpacing = btnSize * 1.5
    botoes.push(new BotaoRedondo(width / 2 - btnSpacing, height * 0.7, "Jogar", imagemBotaoJogar))
    botoes.push(new BotaoRedondo(width / 2 + btnSpacing, height * 0.7, "Instruções", imagemBotaoAgrinho))
    botoes.push(new BotaoRedondo(width / 2 + btnSpacing, height * 0.85, "Voltar para Início", imagemBotaoAgrinho))
    botoes.push(new BotaoRedondo(width / 2 - btnSpacing, height * 0.85, "Jogar", imagemBotaoJogar))
    botoes.push(new BotaoRedondo(width - btnSize * 1.5, height - btnSize * 1.5, "Instruções (Jogo)", imagemBotaoAgrinho))
    botoes.push(new BotaoRedondo(width / 2, height * 0.8, "Continuar", imagemBotaoAgrinho))
    botoes.push(new BotaoRedondo(width - btnSize * 1.5, height / 2, "Voltar para Início (Video)", imagemBotaoAgrinho))
}

// 'PREPARARJOGOMEMORIA' DEIXA O JOGO DA MEMÓRIA PRONTO PARA COMEÇAR UMA NOVA PARTIDA.
function prepararJogoMemoria() {
    reiniciarJogo()
    criarCartasAleatorias()
}


function reiniciarJogo() {
    cartas = []
    paresEncontrados = 0
    cartaVirada1 = null
    cartaVirada2 = null
    bloqueado = false
}


function criarCartasAleatorias() {
    let dadosDasImagens = []
    // USEI A MESMA LÓGICA DE CARREGAMENTO DAS IMAGENS, PARA CADA TIPO DE CARTA (ID), UM PAR COM TEMPLATE STRING, UMA CARTA "CAMPO" E UMA "CIDADE".
    for (let i = 0; i < tiposDeCartas.length; i++) {
        dadosDasImagens.push({ id: tiposDeCartas[i].id, imagem: imagensCartas[`campo-${i}`], tipo: 'campo' })
        dadosDasImagens.push({ id: tiposDeCartas[i].id, imagem: imagensCartas[`cidade-${i}`], tipo: 'cidade' })
    }

    shuffle(dadosDasImagens, true) // EMBARALHA A ORDEM DAS IMAGENS PARA QUE AS CARTAS NÃO FIQUEM SEMPRE IGUAIS.

    // POSICIONAMENTO DAS CARTAS NA TELA
    const numColunas = 5
    const numLinhas = (tiposDeCartas.length * 2) / numColunas
    const cardMargin = 20
    const cardSize = 120
    const totalGridWidth = numColunas * cardSize + (numColunas - 1) * cardMargin
    const totalGridHeight = numLinhas * cardSize + (numLinhas - 1) * cardMargin
    const startX = (width - totalGridWidth) / 2
    const startY = (height - totalGridHeight) / 2

    // CRIA OS OBJETOS 'CARTA' COM SUAS POSIÇÕES, IDS, IMAGENS E TIPOS, E OS ADICIONA À LISTA 'CARTAS'.
    for (let i = 0; i < dadosDasImagens.length; i++) {
        let cartaData = dadosDasImagens[i]
        let x = startX + (i % numColunas) * (cardSize + cardMargin)
        let y = startY + floor(i / numColunas) * (cardSize + cardMargin)
        cartas.push(new Carta(x, y, cardSize, cardSize, cartaData.id, cartaData.imagem, cartaData.tipo))
    }
}

// FUNÇÕES RESPONSÁVEIS POR CRIAR E PELA MUDANÇA DAS TELAS.
function mudancaTela(telaDestino) {
    emTransicao = true
    tempoInicioTransicao = millis() // GUARDA O MOMENTO EM QUE A TRANSIÇÃO COMEÇOU.
    proximaTela = telaDestino
    opacidadeTitulo = 0
    // CONDIÇÃO SE ENTÃO PARA ESCONDER QUANDO JOGO COMEÇA.
    if (localVideoElement) {
        localVideoElement.hide()
    }
}

function gerenciarTelas() {
    if (emTransicao) {
        desenharTransicao()
    } else {
        desenharTelaAtual()
        if (telaAtual === "video" && localVideoElement) {
            localVideoElement.show()
        } else if (localVideoElement) {
            localVideoElement.hide()
        }
    }
}

function desenharTelaAtual() {
    switch (telaAtual) {
        case "pre_intro":
            desenharPreIntro()
            break
        case "intro":
            desenharIntroducao()
            break
        case "instrucoes":
            desenharInstrucoes()
            break
        case "jogo":
            desenharJogo()
            break
        case "finalizacao":
            desenharFinalizacao()
            break
        case "video":
            desenharVideo()
            break
    }
}

function desenharPreIntro() {
    background("#4F1787")
    fill(255)
    textSize(40)
    textAlign(CENTER, CENTER)
    textStyle(BOLD)
    text("CLIQUE OU TOQUE PARA COMEÇAR", width / 2, height / 2)
    textStyle(NORMAL)
}

function desenharTransicao() {
    let tempoDecorrido = millis() - tempoInicioTransicao
    let progresso = constrain(tempoDecorrido / duracaoTransicao, 0, 1)

    if (progresso < 0.5) {
        tint(255, map(progresso, 0, 0.5, 255, 0))
        desenharTelaAtual()
        noTint()
    } else {
        telaAtual = proximaTela
        tint(255, map(progresso, 0.5, 1, 0, 255))
        desenharTelaAtual()
        noTint()
        if (progresso >= 1) {
            emTransicao = false
            if (telaAtual === "jogo") prepararJogoMemoria()
        }
    }
}

function desenharIntroducao() {
    image(imagemFundo, 0, 0, width, height)
    desenharTitulo()
    botoes[0].mostrar()
    botoes[0].mostrarNome()
    botoes[1].mostrar()
    botoes[1].mostrarNome()
}

function desenharTitulo() {
    opacidadeTitulo = min(opacidadeTitulo + 2, 255)
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)'
    drawingContext.shadowBlur = 8
    fill(255, opacidadeTitulo)
    textSize(24)
    textAlign(CENTER, TOP)
    textStyle(BOLD)
    text("AGRINHO 2025", xTitulo, yTitulo - textAscent() * 1.5)
    textSize(60)
    text("FESTEJANDO A CONEXÃO\nCAMPO–CIDADE", xTitulo, yTitulo)
    drawingContext.shadowBlur = 0
    textStyle(NORMAL)
}

function desenharInstrucoes() {
    background("#7E30E1")
    fill(255)
    textSize(30)
    textAlign(CENTER, CENTER)
    // O TEXTO DAS INSTRUÇÕES, COM '\N' PARA QUEBRAR A LINHA.
    const textoInstrucoes = "BEM-VINDO AO JOGO DA MEMÓRIA!\n\n" +
        "SEU OBJETIVO É ENCONTRAR TODOS OS PARES DE CARTAS.\n" +
        "CADA PAR REPRESENTA UMA CONEXÃO ENTRE O CAMPO E A CIDADE.\n\n" +
        "CLIQUE EM DUAS CARTAS PARA VIRÁ-LAS.\n" +
        "SE ELAS FORMAREM UM PAR, ELAS PERMANECERÃO VISÍVEIS.\n" +
        "SE NÃO, ELAS VIRÃO DE VOLTA.\n\n" +
        "BOA SORTE E DIVIRTA-SE DESVENDANDO AS CONEXÕES!"
    text(textoInstrucoes, width / 2, height / 2 - 50)

    botoes[3].mostrar()
    botoes[3].mostrarNome()
    botoes[2].mostrar()
    botoes[2].mostrarNome()
}

function desenharJogo() {
    background("#B7B1F2")
    fill(0)
    textSize(40)
    textAlign(CENTER, TOP)
    textStyle(BOLD)
    text("JOGO DA MEMÓRIA - DESVENDANDO CONEXÕES CAMPO E CIDADE", width / 2, height * 0.03)
    textStyle(NORMAL)

    for (let carta of cartas) {
        carta.mostrar()
    }
    botoes[4].mostrar()
    botoes[4].mostrarNome()
}

function desenharFinalizacao() {
    background("#4F1787")
    fill(255)
    textSize(60)
    textAlign(CENTER, CENTER)
    textStyle(BOLD)
    const textoFinal = "PARABÉNS!\n\n" +
        "VOCÊ CONSEGUIU FINALIZAR 👏 \n\n" + "AGORA VAMOS REFLETIR SOBRE O TEMA ❤️"
    text(textoFinal, width / 2, height / 2 - 50)
    botoes[5].nome = "Continuar"
    botoes[5].mostrar()
    botoes[5].mostrarNome()
}


function desenharVideo() {
    background("#4F1787")
    // REDIMENSIONA E CENTRALIZA O VÍDEO PARA QUE ELE CAIBA BEM NA TELA.
    if (localVideoElement) {
        let maxVideoWidth = width * 0.9
        let maxVideoHeight = height * 0.7
        let videoWidth = localVideoElement.width
        let videoHeight = localVideoElement.height
        let aspectRatio = videoWidth / videoHeight
        if (videoWidth > maxVideoWidth) {
            videoWidth = maxVideoWidth
            videoHeight = videoWidth / aspectRatio
        }
        if (videoHeight > maxVideoHeight) {
            videoHeight = maxVideoHeight
            videoWidth = videoHeight * aspectRatio
        }

        let videoX = (width - videoWidth) / 2
        let videoY = (height - videoHeight) / 2

        localVideoElement.size(videoWidth, videoHeight)
        localVideoElement.position(videoX, videoY)
    }
    botoes[6].mostrar()
    botoes[6].mostrarNome()
}


function fogoArtificio() {
    for (let i = riscosDoClique.length - 1; i >= 0; i--) {
        riscosDoClique[i].mexer()
        riscosDoClique[i].mostrar()
        if (riscosDoClique[i].sumir()) {
            riscosDoClique.splice(i, 1)
        }
    }
}

// 'GERENCIARMUSICADEFUNDO' CONTROLA QUAL MÚSICA DEVE TOCAR, DEPENDENDO DA TELA ATUAL DO JOGO.
function gerenciarMusicaDeFundo() {
    if (!audioLigado) {
        if (musicaIntroInstrucoes && musicaIntroInstrucoes.isPlaying()) musicaIntroInstrucoes.pause()
        if (musicaFinalizacao && musicaFinalizacao.isPlaying()) musicaFinalizacao.pause()
        if (somCartaCidade) somCartaCidade.stop()
        if (somCartaCampo) somCartaCampo.stop()
        return
    }

    // VERIFICA EM QUAL TIPO DE TELA O JOGO ESTÁ PARA TOCAR A MÚSICA CERTA.
    const isIntroOrInstrucoes = telaAtual === "intro" || telaAtual === "instrucoes"
    const isFinalizacao = telaAtual === "finalizacao"
    const isVideo = telaAtual === "video"

    if (isIntroOrInstrucoes) {
        if (musicaIntroInstrucoes) {
            if (!musicaIntroInstrucoes.isPlaying()) musicaIntroInstrucoes.play()
        }
        if (musicaFinalizacao && musicaFinalizacao.isPlaying()) musicaFinalizacao.pause()
    } else if (isFinalizacao) {
        if (musicaFinalizacao) {
            if (!musicaFinalizacao.isPlaying()) musicaFinalizacao.play()
        }
        if (musicaIntroInstrucoes && musicaIntroInstrucoes.isPlaying()) musicaIntroInstrucoes.pause()
    } else if (isVideo) {

        if (musicaIntroInstrucoes && musicaIntroInstrucoes.isPlaying()) musicaIntroInstrucoes.pause()
        if (musicaFinalizacao && musicaFinalizacao.isPlaying()) musicaFinalizacao.pause()
    } else {
        if (musicaIntroInstrucoes && musicaIntroInstrucoes.isPlaying()) musicaIntroInstrucoes.pause()
        if (musicaFinalizacao && musicaFinalizacao.isPlaying()) musicaFinalizacao.pause()
    }
}

// INTERAÇÃO COM O CLIQUE DO MOUSE
function usuarioClicou() {
    if (telaAtual === "pre_intro") {
        // AO CLICAR NA TELA INICIAL, INICIA A MÚSICA
        if (getAudioContext().state !== 'running') {
            getAudioContext().resume();
        }
        if (audioLigado && musicaIntroInstrucoes) {
            musicaIntroInstrucoes.play()
        }
        telaAtual = "intro"
        opacidadeTitulo = 0
        criarFogosClique(mouseX, mouseY)
        return
    }
    if (emTransicao) return

    for (let i = 0; i < botoes.length; i++) {
        const botao = botoes[i]
        // LÓGICA DE ACESSO A CADA BOTÃO
        if (botao.passouOmouse(mouseX, mouseY) &&
            ((telaAtual === "intro" && (i === 0 || i === 1)) ||
                (telaAtual === "instrucoes" && (i === 2 || i === 3)) ||
                (telaAtual === "jogo" && i === 4) ||
                (telaAtual === "finalizacao" && i === 5 && botao.nome === "Continuar") ||
                (telaAtual === "video" && i === 6)
            )) {
            criarFogosClique(botao.x, botao.y)
            // LÓGICA PARA MUDAR DE TELA, DEPENDENDO DO BOTÃO CLICADO.
            if (botao.nome.includes("Jogar")) {
                mudancaTela("jogo")
            } else if (botao.nome.includes("Instruções")) {
                mudancaTela("instrucoes")
            } else if (botao.nome === "Voltar para Início" || botao.nome === "Voltar para Início (Video)") {
                mudancaTela("intro")
                if (localVideoElement) {
                    localVideoElement.stop()
                }
            } else if (botao.nome === "Continuar" && telaAtual === "finalizacao") {
                mudancaTela("video")
                if (localVideoElement) {
                    localVideoElement.play()
                }
            }
            break
        }
    }
    // LÓGICA PARA CLIQUES NAS CARTAS DO JOGO DA MEMÓRIA.
    if (telaAtual === "jogo" && !bloqueado) {
        for (let carta of cartas) {
            // VERIFICA SE O MOUSE CLICOU NA CARTA E SE ELA NÃO ESTÁ VIRADA NEM COMBINADA.
            if (carta.contem(mouseX, mouseY) && !carta.virada && !carta.combinada) {
                criarFogosClique(mouseX, mouseY)
                virarCarta(carta)
                // TOCA O SOM ESPECÍFICO DA CARTA VIRADA (CIDADE OU CAMPO).
                if (audioLigado) {
                    if (carta.tipo === 'cidade' && somCartaCidade) somCartaCidade.play(0, 1, somCartaCidade.getVolume(), 0, duracaoSomCarta)
                    else if (carta.tipo === 'campo' && somCartaCampo) somCartaCampo.play(0, 1, somCartaCampo.getVolume(), 0, duracaoSomCarta)
                }
                break
            }
        }
    }
}

function criarFogosClique(x, y) {
    const numRiscos = 20
    const anguloInicial = 0
    const anguloFinal = TWO_PI

    for (let i = 0; i < numRiscos; i++) {
        let corAleatoria = color(random(coresParticula))
        let angulo = map(i, 0, numRiscos, anguloInicial, anguloFinal)
        riscosDoClique.push(new Risco(x, y, angulo + random(-0.5, 0.5), corAleatoria))
    }
}

// 'VIRARCARTA' LIDA COM A LÓGICA DE VIRAR AS CARTAS E VERIFICAR SE FORMAM UM PAR.
function virarCarta(cartaClicada) {
    if (cartaVirada1 === null) {
        cartaVirada1 = cartaClicada
        cartaVirada1.virada = true
    } else if (cartaClicada !== cartaVirada1) {
        cartaVirada2 = cartaClicada
        cartaVirada2.virada = true
        bloqueado = true
        setTimeout(verificarPar, 1000)
    }
}

// 'VERIFICARPAR' CHECA SE AS DUAS CARTAS VIRADAS SÃO UM PAR.
function verificarPar() {
    if (cartaVirada1.id === cartaVirada2.id) {
        cartaVirada1.combinada = true
        cartaVirada2.combinada = true
        paresEncontrados++
        if (paresEncontrados === tiposDeCartas.length) {
            mudancaTela("finalizacao")
        }
    } else {
        cartaVirada1.virada = false
        cartaVirada2.virada = false
    }
    cartaVirada1 = null
    cartaVirada2 = null
    bloqueado = false
}


// --- CLASSES - TEMPLATES ---

// CLASSE CARTA: DEFINE COMO UMA CARTA DO JOGO DA MEMÓRIA É E O QUE ELA PODE FAZER.
class Carta {
    constructor(x, y, w, h, id, imagem, tipo) {
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.id = id
        this.virada = false
        this.combinada = false
        this.imagem = imagem
        this.tipo = tipo
    }

    // 'MOSTRAR' DESENHA A CARTA NA TELA.
    mostrar() {
        stroke(0)
        strokeWeight(2)
        fill(200)
        rect(this.x, this.y, this.width, this.height, 5)

        if (this.virada || this.combinada) {
            image(this.imagem, this.x + 5, this.y + 5, this.width - 10, this.height - 10)
        }
    }
    contem(px, py) {
        return px > this.x && px < this.x + this.width &&
            py > this.y && py < this.y + this.height
    }
}
// CLASSE BOTAOREDONDO: DEFINE COMO UM BOTÃO REDONDO SE PARECE E O QUE ELE FAZ.
class BotaoRedondo {
    constructor(x, y, textoDoBotao, imagemDoBotao) {
        this.x = x
        this.y = y
        this.tamanhoInicial = 80
        this.tamanhoAtual = this.tamanhoInicial
        this.nome = textoDoBotao
        this.imagem = imagemDoBotao
    }
    mostrar() {
        imageMode(CENTER)
        image(this.imagem, this.x, this.y, this.tamanhoAtual * 1.8, this.tamanhoAtual * 1.8)
        imageMode(CORNER)
        this.tamanhoAtual = lerp(this.tamanhoAtual, this.tamanhoInicial, 0.1)
    }
    // 'PASSOUOMOUSE' VERIFICA SE O MOUSE ESTÁ EM CIMA DO BOTÃO E FAZ ELE AUMENTAR DE TAMANHO.
    passouOmouse(mx, my) {
        const estaSobre = dist(mx, my, this.x, this.y) < this.tamanhoInicial * 0.9
        if (!emTransicao && estaSobre) {
            this.tamanhoAtual = this.tamanhoInicial * 1.2
        }
        return estaSobre
    }
    // 'MOSTRARNOME' DESENHA O NOME DO BOTÃO ABAIXO DA SUA IMAGEM.
    mostrarNome() {
        fill(255)
        noStroke()
        textSize(20)
        textAlign(CENTER, TOP)
        textStyle(BOLD)
        // LÓGICA PARA AJUSTAR O TEXTO QUE APARECE, REMOVENDO PARTES COMO "(INSTRUÇÕES)" OU "(VÍDEO)".
        let nomeExibido = this.nome.replace(" (Instruções)", "")
        nomeExibido = nomeExibido.replace(" (Jogo)", "")
        nomeExibido = nomeExibido.replace("Voltar para Início", "VOLTAR")
        nomeExibido = nomeExibido.replace(" (Video)", "")
        nomeExibido = nomeExibido.toUpperCase()
        text(nomeExibido, this.x, this.y + this.tamanhoInicial * 1.0)
        textStyle(NORMAL)
    }
}
// CLASSE RISCO: CRIA ANIMAÇÃO DE FOGOS.
class Risco {
    constructor(x, y, angulo, cor) {
        this.origem = createVector(x, y)
        this.angulo = angulo
        this.comprimentoMax = random(50, 150)
        this.comprimentoAtual = 0
        this.velocidade = random(5, 10)
        this.duracao = 150
        this.cor = color(red(cor), green(cor), blue(cor))
        this.espessura = random(1, 3)
    }
    mexer() {
        this.comprimentoAtual += this.velocidade
        this.duracao -= 3
        this.comprimentoAtual = constrain(this.comprimentoAtual, 0, this.comprimentoMax)
    }
    mostrar() {
        stroke(red(this.cor), green(this.cor), blue(this.cor), this.duracao)
        strokeWeight(this.espessura)
        let fimX = this.origem.x + cos(this.angulo) * this.comprimentoAtual
        let fimY = this.origem.y + sin(this.angulo) * this.comprimentoAtual
        line(this.origem.x, this.origem.y, fimX, fimY)
    }
    sumir() {
        return this.duracao <= 0
    }
}