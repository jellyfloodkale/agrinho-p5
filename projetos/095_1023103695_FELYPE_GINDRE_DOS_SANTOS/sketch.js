document.addEventListener('DOMContentLoaded', () => {

    const menuPrincipal = document.querySelector('.menu-container');
    const menuCreditos = document.querySelector('.menu-creditos');
    const tabuleiroJogo = document.getElementById('tabuleiro-jogo');
    const cenaCidade = document.getElementById('cena-cidade');
    const fazendeiro = document.getElementById('fazendeiro');
    const hudJogo = document.getElementById('hud-jogo');
    const valorDinheiroDisplay = document.getElementById('valor-dinheiro');
    const predioLoja = document.getElementById('predio-verde-loja');
    const painelLoja = document.getElementById('painel-loja');
    const botaoFecharLoja = document.getElementById('botao-fechar-loja');
    const painelControles = document.getElementById('painel-controles');
    const botaoFecharControles = document.getElementById('botao-fechar-controles');
    const npcGuia = document.getElementById('npc-guia');
    const musicaFundo = document.getElementById('musica-fundo');
    const npcMercado = document.getElementById('npc-mercado');
    const balaoFala = document.getElementById('balao-fala');
    const barraSementes = document.getElementById('barra-sementes');
    const botaoCreditos = document.getElementById('botaocreditos');
    const botaoJogar = document.getElementById('botaojogar');
    const botaoVoltar = document.getElementById('botaoVoltar');
    const limiteSuperiorJogo = window.innerHeight * 0.83;
    const npcInstrutor = document.getElementById('npc-instrutor');
    const painelInstrucoes = document.getElementById('painel-instrucoes');
    const botaoFecharInstrucoes = document.getElementById('botao-fechar-instrucoes');
    const npcPrefeito = document.getElementById('npc-prefeito');
    const balaoVitoria = document.getElementById('balao-vitoria');
    const animationDuration = 300;
    const velocidadeMaxima = 5;
    const aceleracao = 0.4;
    const atrito = 0.92;

    const somClick = new Audio('sons/cliquebtn.wav');
    const somStart = new Audio('sons/startbtn.wav');
    const somSeed = new Audio('sons/seed.mp3');
    const somDinheiro = new Audio('sons/dinheiro.mp3');
    const somVitoria = new Audio('sons/vitoria.mp3');


    let vitoriaAlcancada = false;  
    let dinheiro = 0;
    const catalogoSementes = [
        { id: 'alface', nome: 'Alface', precoCompra: 0, valorVenda: 1, tempoCrescimento: 3000, emoji: '🥬' },
        { id: 'tomate', nome: 'Tomate', precoCompra: 10, valorVenda: 4, tempoCrescimento: 5000, emoji: '🍅' },
        { id: 'milho', nome: 'Milho', precoCompra: 25, valorVenda: 8, tempoCrescimento: 7000, emoji: '🌽' }
    ];

    let sementesDesbloqueadas = ['alface'];
    let sementeSelecionada = catalogoSementes[0];

    let fazendeiroX = 0;
    let fazendeiroY = 0;
    let jogoRodando = false;
    let cenaAtual = 'menu';
    let direcaoFazendeiro = 'direita';

    let velocidadeX = 0;
    let velocidadeY = 0;
    
    const teclasPressionadas = {
        w: false, a: false, s: false, d: false,
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
    };

    function tocarSom(som) {
        som.currentTime = 0;
        som.play().catch(e => {});
    }

 function verificarCondicaoVitoria() {
    const lotesTrancados = document.querySelectorAll('.lote-terra.trancado');
    
    if (lotesTrancados.length === 0 && !vitoriaAlcancada) {
        
        vitoriaAlcancada = true; 
    }
}
  
    function atualizarDinheiroDisplay() {
        valorDinheiroDisplay.textContent = dinheiro;
    }

    function desenharFazendeiro() {
        if (!fazendeiro) return;
        fazendeiro.style.left = fazendeiroX + 'px';
        fazendeiro.style.top = fazendeiroY + 'px';
        if (direcaoFazendeiro === 'esquerda') {
            fazendeiro.style.transform = 'scaleX(-1)';
        } else {
            fazendeiro.style.transform = 'scaleX(1)';
        }
    }

   function mudarDeCena(novaCena) {
    cenaAtual = novaCena;

    if (cenaAtual === 'fazenda') {
        document.body.style.backgroundImage = "url('imagens/hortaatt1.jpg')";
        tabuleiroJogo.classList.remove('hidden');
        hudJogo.classList.remove('hidden');
        npcGuia.classList.remove('hidden');
        cenaCidade.classList.add('hidden');
        npcMercado.classList.add('hidden');
        npcPrefeito.classList.add('hidden'); 
    } else if (cenaAtual === 'cidade') {
        document.body.style.backgroundImage = "url('imagens/cambe.png')";
        cenaCidade.classList.remove('hidden');
        hudJogo.classList.remove('hidden');
        npcMercado.classList.remove('hidden');
        tabuleiroJogo.classList.add('hidden');
        npcGuia.classList.add('hidden');
        if (vitoriaAlcancada) {
            npcPrefeito.classList.remove('hidden');
        } else {
            npcPrefeito.classList.add('hidden');
        }
    }
}

function atualizarPosicaoFazendeiro() {
    if (teclasPressionadas.a || teclasPressionadas.ArrowLeft) { velocidadeX -= aceleracao; direcaoFazendeiro = 'esquerda'; } 
    else if (teclasPressionadas.d || teclasPressionadas.ArrowRight) { velocidadeX += aceleracao; direcaoFazendeiro = 'direita'; } 
    else { velocidadeX *= atrito; }
    if (teclasPressionadas.w || teclasPressionadas.ArrowUp) { velocidadeY -= aceleracao; } 
    else if (teclasPressionadas.s || teclasPressionadas.ArrowDown) { velocidadeY += aceleracao; } 
    else { velocidadeY *= atrito; }

    if (velocidadeX > velocidadeMaxima) { velocidadeX = velocidadeMaxima; }
    if (velocidadeX < -velocidadeMaxima) { velocidadeX = -velocidadeMaxima; }
    if (velocidadeY > velocidadeMaxima) { velocidadeY = velocidadeMaxima; }
    if (velocidadeY < -velocidadeMaxima) { velocidadeY = -velocidadeMaxima; }

    let proximoX = fazendeiroX + velocidadeX;
    let proximoY = fazendeiroY + velocidadeY;

    const fazendeiroRect = fazendeiro.getBoundingClientRect();
    const hortaRect = tabuleiroJogo.getBoundingClientRect();

    if (cenaAtual === 'fazenda' && (proximoX + fazendeiroRect.width) > window.innerWidth) {
        mudarDeCena('cidade');
        fazendeiroX = 10;
        return; 
    }
    if (cenaAtual === 'cidade' && proximoX < 0) {
        mudarDeCena('fazenda');
        fazendeiroX = window.innerWidth - fazendeiroRect.width - 10;
        return;
    }

    const estaDentroDaHorta = haColisao(fazendeiro, tabuleiroJogo);
    
    if (cenaAtual === 'fazenda' && estaDentroDaHorta) {
        if (proximoY < hortaRect.top) { proximoY = hortaRect.top; velocidadeY = 0; }
        if (proximoX < hortaRect.left) { proximoX = hortaRect.left; velocidadeX = 0; }
        if (proximoX + fazendeiroRect.width > hortaRect.right) { proximoX = hortaRect.right - fazendeiroRect.width; velocidadeX = 0; }
        if (proximoY + fazendeiroRect.height > window.innerHeight) { proximoY = window.innerHeight - fazendeiroRect.height; velocidadeY = 0; }
        
    } else {
        const limiteEsquerdo = 0;
        const limiteDireito = window.innerWidth - fazendeiroRect.width;
        const limiteSuperior = limiteSuperiorJogo; 
        const limiteInferior = window.innerHeight - fazendeiroRect.height;
        
        if (proximoX < limiteEsquerdo) { proximoX = limiteEsquerdo; velocidadeX = 0; }
        if (proximoX > limiteDireito) { proximoX = limiteDireito; velocidadeX = 0; }
        if (proximoY < limiteSuperior) { proximoY = limiteSuperior; velocidadeY = 0; }
        if (proximoY > limiteInferior) { proximoY = limiteInferior; velocidadeY = 0; }

        if (cenaAtual === 'fazenda') {
            const proximoFazendeiroRect = { top: proximoY, bottom: proximoY + fazendeiroRect.height, left: proximoX, right: proximoX + fazendeiroRect.width };
            if (haColisao(proximoFazendeiroRect, tabuleiroJogo)) {
                if (velocidadeY > 0 && fazendeiroRect.bottom <= hortaRect.top) { proximoY = hortaRect.top - fazendeiroRect.height; velocidadeY = 0; }
                if (velocidadeX > 0 && fazendeiroRect.right <= hortaRect.left) { proximoX = hortaRect.left - fazendeiroRect.width; velocidadeX = 0; }
                if (velocidadeX < 0 && fazendeiroRect.left >= hortaRect.right) { proximoX = hortaRect.right; velocidadeX = 0; }
            }
        }
    }
    
    fazendeiroX = proximoX;
    fazendeiroY = proximoY;
}
  
function haColisao(elem1, elem2) {
    if (!elem1 || !elem2) return false;
    const rect1 = elem1.getBoundingClientRect ? elem1.getBoundingClientRect() : elem1;
    const rect2 = elem2.getBoundingClientRect ? elem2.getBoundingClientRect() : elem2;
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}
   function acaoPrincipal() {
    if (!jogoRodando || !painelLoja.classList.contains('hidden') || !painelControles.classList.contains('hidden')) {
        return;
    }

    if (cenaAtual === 'cidade') {
        if (haColisao(fazendeiro, predioLoja)) {
            interagirComLoja();
        } else if (haColisao(fazendeiro, npcMercado)) {
            falarComNpcMercado();
        }
    } else if (cenaAtual === 'fazenda') {
        if (haColisao(fazendeiro, npcGuia)) {
            interagirComGuia();
        } else {
            acaoPlantar();
        }
    }
}
  
  function falarComPrefeito() {
    if (haColisao(fazendeiro, npcPrefeito)) {
        const npcRect = npcPrefeito.getBoundingClientRect();
        balaoVitoria.style.left = (npcRect.left + npcRect.width / 2) + 'px';
        balaoVitoria.style.top = (npcRect.top - 10) + 'px';
        balaoVitoria.style.transform = 'translateX(-50%) translateY(-100%)';
        balaoVitoria.classList.remove('hidden');
        tocarSom(somVitoria); 
    }
}

    function acaoPlantar() {
        for (const lote of document.querySelectorAll('.lote-terra')) {
            if (haColisao(fazendeiro, lote)) {
                if (lote.classList.contains('trancado')) {
                    const custoDoLote = parseInt(lote.dataset.custo);
                    if (dinheiro >= custoDoLote) {
                        tocarSom(somClick);
                        dinheiro -= custoDoLote;
                        atualizarDinheiroDisplay();
                        lote.classList.remove('trancado');
                        lote.removeAttribute('data-custo');
                        lote.innerHTML = '';
                        verificarCondicaoVitoria();
                    }
                } else if (lote.classList.contains('pronto-para-colher')) {
                    const sementeIdPlantada = lote.dataset.sementeId;
                    const sementeColhida = catalogoSementes.find(s => s.id === sementeIdPlantada);
                    if (sementeColhida) {
                        tocarSom(somDinheiro);
                        lote.classList.remove('pronto-para-colher');
                        lote.removeAttribute('data-semente-id');
                        lote.removeAttribute('data-emoji');
                        dinheiro += sementeColhida.valorVenda;
                        atualizarDinheiroDisplay();
                    }
                } else if (!lote.classList.contains('plantado')) {
                    const sementeParaPlantar = sementeSelecionada;
                    tocarSom(somSeed);
                    lote.classList.add('plantado');
                    lote.dataset.sementeId = sementeParaPlantar.id;
                    setTimeout(() => {
                        lote.classList.remove('plantado');
                        lote.classList.add('pronto-para-colher');
                        lote.dataset.emoji = sementeParaPlantar.emoji;
                    }, sementeParaPlantar.tempoCrescimento);
                }
                break;
            }
        }
    }

    function interagirComGuia() {
        if (haColisao(fazendeiro, npcGuia)) {
            painelControles.classList.remove('hidden');
            tocarSom(somClick);
        }
    }

    function falarComNpcMercado() {
    if (!balaoFala.classList.contains('hidden')) {
        return;
    }

    const npcRect = npcMercado.getBoundingClientRect();
    balaoFala.style.left = (npcRect.left + npcRect.width / 2) + 'px';
    balaoFala.style.top = (npcRect.top - 10) + 'px';
    balaoFala.style.transform = 'translateX(-50%) translateY(-100%)';

    balaoFala.classList.remove('hidden');
    tocarSom(somClick);

    setTimeout(() => {
        balaoFala.classList.add('hidden');
    }, 4000); 
}

    function interagirComLoja() {
        desenharPainelLoja();
        painelLoja.classList.remove('hidden');
        tocarSom(somClick);
    }

    function desenharPainelLoja() {
        const itensContainer = document.getElementById('itens-loja');
        itensContainer.innerHTML = '';
        for (const semente of catalogoSementes) {
            const jaPossui = sementesDesbloqueadas.includes(semente.id);
            const podeComprar = dinheiro >= semente.precoCompra;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-da-loja';
            let botaoHTML;
            if (jaPossui) {
                botaoHTML = `<button class="botao-equipar" data-id="${semente.id}" ${sementeSelecionada.id === semente.id ? 'disabled' : ''}>${sementeSelecionada.id === semente.id ? 'Equipado' : 'Equipar'}</button>`;
            } else {
                botaoHTML = `<button class="botao-comprar" data-id="${semente.id}" ${!podeComprar ? 'disabled' : ''}>Comprar</button>`;
            }
            itemDiv.innerHTML = `<span>${semente.emoji} ${semente.nome}</span><span>R$ ${semente.precoCompra}</span>${botaoHTML}`;
            itensContainer.appendChild(itemDiv);
        }
        document.querySelectorAll('.botao-comprar').forEach(botao => {
            botao.addEventListener('click', (e) => comprarSemente(e.target.dataset.id));
        });
        document.querySelectorAll('.botao-equipar').forEach(botao => {
            botao.addEventListener('click', (e) => equiparSemente(e.target.dataset.id));
        });
    }

    function comprarSemente(idDaSemente) {
        const sementeParaComprar = catalogoSementes.find(s => s.id === idDaSemente);
        if (sementesDesbloqueadas.includes(idDaSemente) || dinheiro < sementeParaComprar.precoCompra) return;
        dinheiro -= sementeParaComprar.precoCompra;
        atualizarDinheiroDisplay();
        sementesDesbloqueadas.push(idDaSemente);
        tocarSom(somDinheiro);
        desenharPainelLoja();
        desenharBarraDeSementes();
    }

    function equiparSemente(idDaSemente) {
        sementeSelecionada = catalogoSementes.find(s => s.id === idDaSemente);
        tocarSom(somClick);
        desenharPainelLoja();
        desenharBarraDeSementes();
    }

    function desenharBarraDeSementes() {
        if (!barraSementes) return;
        barraSementes.innerHTML = '';
        for (const idSemente of sementesDesbloqueadas) {
            const semente = catalogoSementes.find(s => s.id === idSemente);
            const slot = document.createElement('div');
            slot.className = 'slot-semente';
            slot.textContent = semente.emoji;
            slot.dataset.id = semente.id;
            if (semente.id === sementeSelecionada.id) {
                slot.classList.add('selecionada');
            }
            slot.addEventListener('click', () => equiparSemente(semente.id));
            barraSementes.appendChild(slot);
        }
    }

    function cicloDeJogo() {
        if (!jogoRodando) return;
        atualizarPosicaoFazendeiro();
        desenharFazendeiro();
        requestAnimationFrame(cicloDeJogo);
    }
    
  function interagirComInstrutor() {
    if (haColisao(fazendeiro, npcInstrutor)) {
        painelInstrucoes.classList.remove('hidden');
        tocarSom(somClick);
    }
}
  
 document.addEventListener('keydown', (evento) => {
    if (evento.key in teclasPressionadas) { teclasPressionadas[evento.key] = true; }

    if (evento.key === ' ') {
        evento.preventDefault();
        if (!jogoRodando || !painelLoja.classList.contains('hidden') || !painelControles.classList.contains('hidden') || !painelInstrucoes.classList.contains('hidden')) {
            return;
        }

       if (cenaAtual === 'cidade') {
    if (!npcPrefeito.classList.contains('hidden') && haColisao(fazendeiro, npcPrefeito)) {
        falarComPrefeito();
    } 
    else if (haColisao(fazendeiro, predioLoja)) {
        interagirComLoja();
    } 
    else if (haColisao(fazendeiro, npcMercado)) {
        falarComNpcMercado();
    
}
        } else if (cenaAtual === 'fazenda') {
            if (haColisao(fazendeiro, npcGuia)) { interagirComGuia(); }
            else if (haColisao(fazendeiro, npcInstrutor)) { interagirComInstrutor(); }
            else { acaoPlantar(); }
        }
    }
});
    document.addEventListener('keyup', (evento) => {
        if (evento.key in teclasPressionadas) { teclasPressionadas[evento.key] = false; }
    });

    botaoJogar.addEventListener('click', () => {
        tocarSom(somStart);
        menuPrincipal.classList.add('fade-out');
        setTimeout(() => {
            menuPrincipal.classList.add('hidden');
            menuPrincipal.classList.remove('fade-out');
            if (musicaFundo.paused) { 
            musicaFundo.volume = 0.2; 
            musicaFundo.play();
            fazendeiroX = 50;
            fazendeiroY = window.innerHeight / 2;
            desenharFazendeiro();
            fazendeiro.classList.remove('hidden');
            npcInstrutor.classList.remove('hidden');
            mudarDeCena('fazenda');
            atualizarDinheiroDisplay();
            desenharBarraDeSementes();
            jogoRodando = true;
            cicloDeJogo();
        }}, animationDuration);
    });
    
    botaoFecharLoja.addEventListener('click', () => { tocarSom(somClick); painelLoja.classList.add('hidden'); });
    botaoFecharControles.addEventListener('click', () => { tocarSom(somClick); painelControles.classList.add('hidden'); });
    
    botaoCreditos.addEventListener('click', () => {
        tocarSom(somClick);
        menuPrincipal.classList.add('fade-out');
        setTimeout(() => {
            menuPrincipal.classList.add('hidden');
            menuPrincipal.classList.remove('fade-out');
            menuCreditos.classList.remove('hidden');
            menuCreditos.classList.add('fade-in');
        }, animationDuration);
    });

    botaoVoltar.addEventListener('click', () => {
        tocarSom(somClick);
        document.body.style.backgroundImage = "url('imagens/campo.jpg')";
        menuCreditos.classList.add('fade-out');
        setTimeout(() => {
            menuCreditos.classList.add('hidden');
            menuCreditos.classList.remove('fade-in');
            menuCreditos.classList.remove('fade-out');
            menuPrincipal.classList.remove('hidden');
            menuPrincipal.classList.remove('fade-out');
            menuPrincipal.classList.add('fade-in');
        }, animationDuration);
    });

});