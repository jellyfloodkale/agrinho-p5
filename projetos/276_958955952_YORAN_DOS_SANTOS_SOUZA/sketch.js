//=======================================================================================
// DECLARAÇÃO DE VARIÁVEIS GLOBAIS E RECURSOS DO JOGO
// Estas variáveis são acessíveis em todas as funções e controlam o estado geral do jogo,
// imagens, personagens e itens. A organização aqui facilita a localização e modificação
// de recursos e configurações principais.
// =======================================================================================

let mapa, mapaColisao; // Imagens do cenário e mapa de colisão para detecção de limites.
let imgPersonagem, imgPersonagemEsquerda; // Imagens do personagem principal para diferentes direções.
let imgNPC, imgInventario, imgSementeMorango, imgSementeTrigo; // Imagens para NPCs, inventário e sementes.
let imgGraosMorango, imgGraosTrigo, imgMorango, imgTrigo; // Imagens para grãos (animação) e produtos colhidos.
let imgMenu, imgBotao, imgLoading; // Imagens para as telas de menu, botão de iniciar e carregamento.
let imgCidade; // Imagem do cenário da cidade.

// Variáveis para os NPCs do mercado e indústria
let imgMercadoNPC, imgIndustriaNPC; // Imagens dos NPCs específicos da cidade.
// Variáveis para as imagens dos interiores dos edifícios
let imgMercadoInterior, imgIndustriaInterior; // Imagens dos cenários internos do mercado e indústria.
let imgPacoteTrigo; // Imagem para o pacote de trigo (produto processado).
let imgSucoMorango; // Imagem para o suco de morango (produto processado).
let imgDinheiro; // Imagem para o dinheiro (moeda do jogo).

let personagem, npcFazendeiro1, npcFazendeiro2; // Objetos que representam o jogador e os NPCs fazendeiros.
let npcMercado, npcIndustria; // Objetos que representam os NPCs/portais da cidade.
let escala = 6; // Fator de escala para o mapa do campo, ajustando o zoom visual.
let direcao = "direita"; // Controla a direção atual do personagem para renderização da imagem correta.

let inventarioAberto = false; // Estado do inventário (aberto ou fechado).
let tipoSementeSelecionada = null; // Armazena o tipo de semente que o jogador tem para plantar.
let plantaCrescendoMorango = false; // Indica se uma planta de morango está crescendo.
let plantaCrescendoTrigo = false; // Indica se uma planta de trigo está crescendo.
let tempoPlantioMorango = 0; // Timestamp do plantio de morango para calcular o tempo de crescimento.
let tempoPlantioTrigo = 0; // Timestamp do plantio de trigo.
let mostrarMensagem = false; // Controla a exibição de mensagens temporárias na tela.
let textoMensagem = ""; // Conteúdo da mensagem temporária.
let tempoMensagem = 0; // Timestamp para controlar a duração da mensagem.

// Objeto para armazenar a quantidade de cada item no inventário do jogador.
// A centralização dos itens em um único objeto facilita a gestão e acesso.
let itensInventario = {
  morango: 0,
  trigo: 0,
  pacote_trigo: 0, // Corrigido de 'pacote_trago' para 'pacote_trigo' para consistência.
  suco_morango: 0,
};

let dinheiro = 0; // Variável para o dinheiro do jogador, crucial para a condição de vitória.

let grãosAnimando = false; // Controla a animação de "plantar sementes".
let graosX = 0; // Posição X da animação de grãos.
let graosY = 0; // Posição Y da animação de grãos.
let graosImagem = null; // Imagem a ser usada na animação de grãos.
let graosTempo = 0; // Timestamp para a animação de grãos.

let estado = "menu"; // Variável de controle do estado do jogo ("menu", "loading", "introducao", "jogo", "cidade", "mercadoInterior", "industriaInterior", "ganhou").
let botaoX,
  botaoY,
  botaoLargura = 300,
  botaoAltura = 300; // Posições e dimensões do botão no menu.
let tempoLoading = 0; // Timestamp para a tela de carregamento.

// Variáveis para o controle da tela de introdução e agradecimento.
// Definir tamanhos de tela específicos para a introdução permite layouts diferenciados.
let larguraTelaNormal = 500;
let alturaTelaNormal = 500;
let larguraTelaIntroducao = 900; // Nova largura para a introdução.
let alturaTelaIntroducao = 900; // Altura ajustada para a introdução.

let musicaPrincipal; // Música de fundo do jogo.

let mostrarIntroducaoNovamente = false; // Controla se o texto da introdução será reexibido quando o jogador apertar "i".



let textoIntroducao = "Olá, caro jogador!\n\nEntão está com dúvidas nos comandos? Tudo bem, aqui vai uma lista dos comandos do Vila Agrinho: \n\nWASD - Mover personagem \n\nE - Abrir inventário \n\nQ - Conversar com o npc indútria e mercado \n\nC - Leva o personagem a cidade \n\n2 - Transforma trigo em pacote de trigo \n\n3 - transforma morango em suco \n\nT - vende pacote de trigo \n\nM vende suco de morango";


let textoIntro ="Olá, caro jogador.\n\nSeja muito bem-vindo ao Vila Agrinho!\n\nNesta jornada, você descobrirá a importante conexão entre o campo e a cidade, colaborando com os moradores locais.\n\nSua missão é clara: procure os fazendeiros nas hortas, receba as sementes e plante-as (pressionando ENTER) para acompanhar o crescimento e a colheita dos frutos.\n\nPara acessar sua mochila e verificar seus itens, pressione a tecla E.\n\nPara viajar para a cidade e voltar, pressione a tecla C. Ao ir para a cidade, suas sementes desaparecerão do inventário, abrindo espaço para novos itens!\n\n**Atenção:** Ao retornar para o campo, o pacote de trigo e o suco de morango também serão deixados para trás, pois são produtos para a cidade.\n\nNa cidade, procure os NPCs do Mercado e da Indústria e aperte Q para entrar nesses locais.\n\nNa Indústria, use a tecla 2 para transformar o trigo em pacotes de trigo.\n\nNa Indústria, use a tecla 3 para transformar morangos em suco de morango.\n\nNo Mercado, pressione **T** para vender Pacotes de Trigo e **M** para vender Suco de Morango, e acumule dinheiro! \n\nSeu objetivo é alcançar até 30 de dinheiro. \n\nPara acessar controles, pressione i. \n\nBoa sorte — e aproveite sua aventura no mundo de Agrinho!";

let textoAtual = ""; // Texto que está sendo animado na introdução (digitando).
let indiceTexto = 0; // Índice do caractere atual na animação de digitação da introdução.
let tempoUltimaLetra = 0; // Timestamp da última letra digitada na introdução.

// Variáveis para a tela de agradecimento (tela de vitória)
let textoAgradecimento =
  "Muito obrigado ao professor Willian Schön Lopes\npor todo apoio, incentivo e orientação durante a criação deste projeto.\n\nAgradeço também ao Concurso Agrinho,\npela oportunidade de aprender e crescer com essa experiência incrível. 🌱\n\nGratidão ao Colégio Estadual Professor Pedro Carli,\npor todo suporte e incentivo à educação e criatividade. 🏫💚\n\nE um agradecimento especial a você, jogador,\npor jogar e fazer parte da história da Vila Agrinho! 🌾🎮";
let textoAtualAgradecimento = ""; // Texto animado na tela de agradecimento.
let indiceTextoAgradecimento = 0; // Índice do caractere atual na animação de agradecimento.
let tempoUltimaLetraAgradecimento = 0; // Timestamp da última letra digitada no agradecimento.
let mensagemAgradecimentoCompleta = false; // Indica se a mensagem de agradecimento já foi totalmente digitada.

// =======================================================================================
// FUNÇÕES DE PRÉ-CARREGAMENTO (PRELOAD)
// A função `preload` é executada uma vez antes do `setup` e é ideal para carregar todas
// as imagens e outros arquivos do jogo. Isso garante que todos os recursos estejam
// disponíveis antes que o jogo comece a ser renderizado, evitando erros e atrasos.
// =======================================================================================
function preload() {
  
  musicaPrincipal = loadSound ("som_vila_agrinho.mp3")
  mapa = loadImage("Cenario.agrinho.png"); // Carrega a imagem do cenário do campo.
  mapaColisao = loadImage("colisao.png"); // Carrega o mapa de colisão (geralmente uma imagem em preto e branco).
  imgCidade = loadImage("cidade.png"); // Carrega a imagem do cenário da cidade.
  imgPersonagem = loadImage("personagem.png"); // Imagem do personagem virado para a direita.
  imgPersonagemEsquerda = loadImage("personagem_esquerda.png"); // Imagem do personagem virado para a esquerda.
  imgNPC = loadImage("npc1.png"); // Imagem padrão para os NPCs fazendeiros.

  imgMercadoNPC = loadImage("npc_mercado.png"); // Imagem do NPC do mercado.
  imgIndustriaNPC = loadImage("npc_industria.png"); // Imagem do NPC da indústria.

  imgMercadoInterior = loadImage("mercado_interior.png"); // Imagem do interior do mercado.
  imgIndustriaInterior = loadImage("industria_interior.png"); // Imagem do interior da indústria.
  imgPacoteTrigo = loadImage("pacote_trigo.png"); // Imagem do pacote de trigo.
  imgSucoMorango = loadImage("suco_morango.png"); // Imagem do suco de morango.
  imgDinheiro = loadImage("dinheiro.png"); // Carrega a imagem do dinheiro.

  imgInventario = loadImage("inventario.png"); // Imagem do layout do inventário.
  imgSementeMorango = loadImage("sementes_morango.png"); // Imagem da semente de morango.
  imgSementeTrigo = loadImage("sementes_trigo.png"); // Imagem da semente de trigo.
  imgGraosMorango = loadImage("graos_morango.png"); // Imagem dos grãos de morango (para animação de plantio).
  imgGraosTrigo = loadImage("graos_trigo.png"); // Imagem dos grãos de trigo (para animação de plantio).
  imgMorango = loadImage("morango.png"); // Imagem do morango colhido.
  imgTrigo = loadImage("trigo.png"); // Imagem do trigo colhido.

  imgMenu = loadImage("menu.png"); // Imagem da tela de menu.
  imgBotao = loadImage("botao.png"); // Imagem do botão de iniciar no menu.
  imgLoading = loadImage("loading.png"); // Imagem da tela de carregamento.
}

// =======================================================================================
// FUNÇÃO DE CONFIGURAÇÃO INICIAL (SETUP)
// A função `setup` é executada uma vez após o `preload`. É utilizada para inicializar
// o canvas, configurar o jogo, e definir as propriedades iniciais dos objetos.
// =======================================================================================
function setup() {
  createCanvas(larguraTelaNormal, alturaTelaNormal); // Cria o canvas com as dimensões iniciais.
  noSmooth(); // Desabilita o anti-aliasing para um estilo pixelado, comum em jogos retrô.

  // Inicia a música principal e coloca em loop
  userStartAudio(); // Garante que o som seja liberado nos navegadores
  if (!musicaPrincipal.isPlaying()) {
    musicaPrincipal.setVolume(0.5); // volume opcional
    musicaPrincipal.setLoop(true);  // toca pra sempre
    musicaPrincipal.play();         // toca a música
  }

  // Inicialização das propriedades do personagem principal.
  personagem = { x: 250, y: 250, largura: 15, altura: 15, velocidade: 0.7 };
  // Inicialização das propriedades dos NPCs fazendeiros.
  npcFazendeiro1 = { x: 5, y: 5, largura: 15, altura: 15 };
  npcFazendeiro2 = { x: 7, y: 75, largura: 15, altura: 15 };

  // Inicialização das propriedades dos NPCs/portais da cidade.
  npcMercado = { x: 150, y: 395, largura: 60, altura: 60 };
  npcIndustria = { x: 350, y: 395, largura: 60, altura: 60 };

  mapaColisao.loadPixels(); // Carrega os pixels do mapa de colisão para detecção precisa.
  
  // Calcula a posição do botão de iniciar para centralizá-lo na tela.
  botaoX = width / 2 - botaoLargura / 2;
  botaoY = height / 2 + botaoAltura / 40;
}


// =======================================================================================
// LOOP PRINCIPAL DO JOGO (DRAW)
// A função `draw` é executada continuamente (60 vezes por segundo por padrão).
// Ela é responsável por renderizar todos os elementos do jogo e atualizar seu estado
// com base no `estado` atual do jogo, tornando-o um sistema modular e fácil de gerenciar.
// =======================================================================================
function draw() {
  // Lógica para a tela de Menu.
  // Condicional para redimensionar o canvas apenas se necessário, otimizando o desempenho.
  
  if (mostrarIntroducaoNovamente) {
  // Fundo preto cobrindo a tela
  fill(0);
  rect(0, 0, width, height);

  // Texto branco por cima
  fill(255);
  textSize(14); // diminui um pouco a fonte se estiver cortando
  textAlign(LEFT, TOP); // começa do canto superior esquerdo

  // Margens maiores pros lados
  let margem = 10;

  // Mostra o texto centralizado dentro da área com margens
  text(textoIntroducao, margem, margem, width - 2 * margem, height - 2 * margem);
  return;
}


  if (estado === "menu") {
    if (width !== larguraTelaNormal || height !== alturaTelaNormal) {
      resizeCanvas(larguraTelaNormal, alturaTelaNormal);
      botaoX = width / 2 - botaoLargura / 2; // Recalcula a posição do botão.
      botaoY = height / 2 + botaoAltura / 40;
    }
    image(imgMenu, 0, 0, width, height); // Desenha a imagem de fundo do menu.
    image(imgBotao, botaoX, botaoY, botaoLargura, botaoAltura); // Desenha o botão de iniciar.
    
    let tempo = millis() / 500;
let escalaBotao = 1 + 0.05 * sin(tempo); // variação suave de escala
push();
translate(botaoX + botaoLargura / 2, botaoY + botaoAltura / 2);
scale(escalaBotao);
image(
  imgBotao,
  -botaoLargura / 2,
  -botaoAltura / 2,
  botaoLargura,
  botaoAltura
);
pop();

    return; // Sai da função draw, pois o jogo não deve progredir.
  }

  // Lógica para a tela de Carregamento.
  if (estado === "loading") {
    if (width !== larguraTelaNormal || height !== alturaTelaNormal) {
      resizeCanvas(larguraTelaNormal, alturaTelaNormal);
    }
    image(imgLoading, 0, 0, width, height); // Desenha a imagem de carregamento.
    if (millis() - tempoLoading > 3000) {
      // Espera 15 segundos antes de ir para a introdução.
      estado = "introducao";
    }
    return; // Sai da função draw.
  }

  // Lógica para a tela de Introdução.
  if (estado === "introducao") {
    // Redimensiona o canvas para a tela de introdução.
    if (width !== larguraTelaIntroducao || height !== alturaTelaIntroducao) {
      resizeCanvas(larguraTelaIntroducao, alturaTelaIntroducao);
    }
    background(0); // Fundo preto.
    drawIntro(); // Chama a função que desenha a introdução.
    return; // Sai da função draw.
  }

  // Lógica para a tela de Vitória ("Ganhou").
  if (estado === "ganhou") {
    // Garante que o canvas está na largura da introdução para a mensagem de agradecimento.
    if (width !== larguraTelaIntroducao || height !== alturaTelaIntroducao) {
      resizeCanvas(larguraTelaIntroducao, alturaTelaIntroducao);
    }
    background(0); // Fundo preto.
    drawGanhou(); // Chama a função que desenha a tela de vitória/agradecimento.
    return; // Sai da função draw se o jogo foi ganho.
  }

  // Bloco condicional para os estados normais de jogo.
  // O uso de `if/else if` garante que apenas um estado seja processado por vez,
  // otimizando o desempenho e evitando conflitos visuais/lógicos.
  if (estado === "jogo") {
    scale(escala); // Aplica a escala para o zoom no mapa do campo.
    translate(-cameraX(), -cameraY()); // Movimento da câmera para seguir o personagem.
    drawJogo(); // Chama a função que desenha o cenário do campo e seus elementos.
  } else if (estado === "cidade") {
    resetMatrix(); // Reseta a matriz de transformação (escala e translação) para a cidade.
    drawCidade(); // Chama a função que desenha o cenário da cidade.
  } else if (estado === "mercadoInterior") {
    resetMatrix();
    drawMercadoInterior(); // Chama a função que desenha o interior do mercado.
  } else if (estado === "industriaInterior") {
    resetMatrix();
    drawIndustriaInterior(); // Chama a função que desenha o interior da indústria.
  }
}

// =======================================================================================
// FUNÇÕES DE CÂMERA
// Funções dedicadas para controlar a posição da câmera, mantendo o personagem centralizado
// na tela, mas dentro dos limites do mapa. Isso é um padrão de design para jogos de mundo
// aberto ou mapas maiores que a tela.
// =======================================================================================
function cameraX() {
  // Retorna a posição X da câmera, limitada pelos bordos do mapa.
  return constrain(
    personagem.x - width / (2 * escala) + personagem.largura / 2,
    0,
    mapa.width - width / escala
  );
}

function cameraY() {
  // Retorna a posição Y da câmera, limitada pelos bordos do mapa.
  return constrain(
    personagem.y - height / (2 * escala) + personagem.altura / 2,
    0,
    mapa.height - height / escala
  );
}

// =======================================================================================
// FUNÇÕES DE TELA DE INTRODUÇÃO E VITÓRIA
// Funções separadas para desenhar as telas de introdução e agradecimento, encapsulando
// a lógica de animação de texto e layout, o que facilita a manutenção e adição de novas telas.
// =======================================================================================
function drawIntro() {
  
  // Cores para transição de fundo
let corInicio = color(70, 130, 180);
let corFim = color(90, 130, 180);
let tFundo = (millis() % 5000) / 5000; // ciclo de 5 segundos
let corAtual = lerpColor (corInicio, corFim, tFundo);
background(corAtual); // substitui o antigo background(0)


  fill(255); // Cor branca para a caixa de texto.
  stroke(0); // Borda preta.
  strokeWeight(4); // Espessura da borda.
  rect(width * 0.1, height * 0.1, width * 0.8, height * 0.8, 20); // Desenha a caixa arredondada.
  noStroke(); // Remove a borda para o texto.
  fill(0); // Cor preta para o texto.
  textSize(13); // Tamanho da fonte.
  textAlign(LEFT, TOP); // Alinhamento do texto.
  textLeading(18); // Espaçamento entre linhas.

  // Animação de digitação do texto da introdução.
  if (indiceTexto < textoIntro.length && millis() - tempoUltimaLetra > 9) {
    textoAtual += textoIntro[indiceTexto]; // Adiciona a próxima letra ao texto atual.
    indiceTexto++; // Incrementa o índice.
    tempoUltimaLetra = millis(); // Atualiza o timestamp.
  }

  // Exibe o texto já "digitado" na tela.
  text(
    textoAtual,
    width * 0.1 + 20,
    height * 0.1 + 20,
    width * 0.8 - 40,
    height * 0.8 - 40
  );

  // Mensagem para o jogador continuar, exibida após o texto completo.
  if (indiceTexto >= textoIntro.length) {
    fill(100);
    textAlign(CENTER);
    textSize(14);
    text("Pressione qualquer tecla para continuar...", width / 2, height * 0.9);
  }
}

// Função: Desenha a tela de vitória com a nova mensagem e animação de digitação
function drawGanhou() {
  // Desenha a caixa de texto como na introdução.
  fill(255);
  stroke(0);
  strokeWeight(4);
  rect(width * 0.1, height * 0.1, width * 0.8, height * 0.8, 20);
  noStroke();
  fill(0); // Cor do texto dentro da caixa.

  textSize(18); // Tamanho do texto para a mensagem de agradecimento.
  textAlign(LEFT, TOP);
  textLeading(26); // Espaçamento entre as linhas.

  // Lógica de digitação letra por letra para a mensagem de agradecimento.
  if (
    indiceTextoAgradecimento < textoAgradecimento.length &&
    millis() - tempoUltimaLetraAgradecimento > 30
  ) {
    textoAtualAgradecimento += textoAgradecimento[indiceTextoAgradecimento];
    indiceTextoAgradecimento++;
    tempoUltimaLetraAgradecimento = millis();
  } else if (indiceTextoAgradecimento >= textoAgradecimento.length) {
    mensagemAgradecimentoCompleta = true; // Marca a mensagem como completa.
  }

  // Exibe o texto que já foi "digitado".
  text(
    textoAtualAgradecimento,
    width * 0.1 + 20,
    height * 0.1 + 20,
    width * 0.8 - 40,
    height * 0.8 - 40
  );

  // Mensagem para o jogador continuar (opcional).
  if (mensagemAgradecimentoCompleta) {
    fill(100);
    textAlign(CENTER);
    textSize(16);
    text("Pressione qualquer tecla para finalizar...", width / 2, height * 0.9);
  }
}

// =======================================================================================
// FUNÇÕES DE INTERAÇÃO DO USUÁRIO
// Funções dedicadas para lidar com eventos de teclado e mouse, separando a lógica
// de entrada do usuário da lógica principal do jogo. Isso melhora a legibilidade
// e a capacidade de depuração.
// =======================================================================================
function keyPressed() {
  
  
  // Se estiver mostrando a introdução novamente, qualquer tecla fecha
if (mostrarIntroducaoNovamente) {
  mostrarIntroducaoNovamente = false;
  return;
}

// Atalho para abrir a introdução a qualquer momento
if (key === 'i' || key === 'I') {
  mostrarIntroducaoNovamente = true;
  return;
}

  // Se o jogo já foi ganho, nenhuma tecla deve fazer algo (exceto continuar da tela de agradecimento).
  if (estado === "ganhou") {
    if (mensagemAgradecimentoCompleta) {
      // Opcional: Aqui você pode adicionar lógica para reiniciar o jogo ou ir para uma tela de créditos.
      console.log("Jogo finalizado. Obrigado por jogar!");
      // No futuro, você pode mudar para estado = "menu" para reiniciar.
    }
    return;
  }

  // Transição da introdução para o jogo.
  if (estado === "introducao" && indiceTexto >= textoIntro.length) {
    estado = "jogo"; // Altera o estado do jogo.
    personagem.x = 80; // Reposiciona o personagem no campo.
    personagem.y = 45;
    resizeCanvas(larguraTelaNormal, alturaTelaNormal); // Redimensiona o canvas de volta.
    return;
  }

  // Lógica para abrir/fechar inventário (tecla 'E').
  if (
    key === "e" &&
    (estado === "jogo" ||
      estado === "cidade" ||
      estado === "mercadoInterior" ||
      estado === "industriaInterior")
  ) {
    inventarioAberto = !inventarioAberto; // Inverte o estado do inventário.
  }

  // Lógica para viajar entre campo e cidade (tecla 'C').
  if (key === "c") {
    if (estado === "jogo") {
      // Mensagem e remoção de sementes ao sair do campo.
      if (tipoSementeSelecionada !== null) {
        tipoSementeSelecionada = null;
        mostrarMensagem = true;
        textoMensagem = "As sementes foram deixadas no campo!";
        tempoMensagem = millis();
      }
      estado = "cidade"; // Muda para o estado da cidade.
      // Reposiciona o personagem na cidade........
      personagem.x = 35
      personagem.y = 380
    } else if (estado === "cidade") {
      // Mensagem e remoção de produtos processados ao sair da cidade.
      if (
        itensInventario.pacote_trigo > 0 ||
        itensInventario.suco_morango > 0
      ) {
        itensInventario.pacote_trigo = 0;
        itensInventario.suco_morango = 0;
        mostrarMensagem = true;
        textoMensagem = "Produtos processados foram deixados na cidade!";
        tempoMensagem = millis();
      }
      estado = "jogo"; // Muda para o estado do jogo (campo).
      // Reposiciona o personagem no campo.
      personagem.x = 80;
      personagem.y = 45;
    } else if (estado === "mercadoInterior" || estado === "industriaInterior") {
      estado = "cidade"; // Retorna à cidade dos interiores.
      // Reposiciona o personagem na cidade......
      personagem.x = 35
      personagem.y = 380
    }
    return;
  }

  // Lógica para entrar e sair de interiores na cidade (tecla 'Q').
  if (
    estado === "cidade" ||
    estado === "mercadoInterior" ||
    estado === "industriaInterior"
  ) {
    if (key === "q" || key === "Q") {
      if (estado === "cidade") {
        // Verifica proximidade com o NPC do Mercado.
        if (
          dist(
            personagem.x + (personagem.largura * escala) / 2,
            personagem.y + (personagem.altura * escala) / 2,
            npcMercado.x + npcMercado.largura / 2,
            npcMercado.y + npcMercado.altura / 2
          ) < 70
        ) {
          estado = "mercadoInterior"; // Entra no mercado.
          personagem.x = width / 2 - (personagem.largura * escala) / 2;
          personagem.y = height / 2 - (personagem.altura * escala) / 2;
          mostrarMensagem = true;
          textoMensagem = "Bem-vindo ao Mercado!";
          tempoMensagem = millis();
          return;
        }
        // Verifica proximidade com o NPC da Indústria.
        if (
          dist(
            personagem.x + (personagem.largura * escala) / 2,
            personagem.y + (personagem.altura * escala) / 2,
            npcIndustria.x + npcIndustria.largura / 2,
            npcIndustria.y + npcIndustria.altura / 2
          ) < 70
        ) {
          estado = "industriaInterior"; // Entra na indústria.
          personagem.x = width / 2 - (personagem.largura * escala) / 2;
          personagem.y = height / 2 - (personagem.altura * escala) / 2;
          mostrarMensagem = true;
          textoMensagem = "Bem-vindo à Indústria!";
          tempoMensagem = millis();
          return;
        }
      }
      // Lógica para sair do Mercado Interior.
      if (estado === "mercadoInterior") {
        // Verifica se o personagem está perto da saída.
        if (
          dist(
            personagem.x + (personagem.largura * escala) / 2,
            personagem.y + (personagem.altura * escala) / 2,
            width / 2,
            height - 50
          ) < 50
        ) {
          estado = "cidade"; // Retorna à cidade.
          personagem.x = npcMercado.x; // Reposiciona perto do NPC do mercado.
          personagem.y = npcMercado.y + npcMercado.altura / 2 + 10;
          mostrarMensagem = true;
          textoMensagem = "De volta à cidade!";
          tempoMensagem = millis();
          return;
        }
      }
      // Lógica para sair da Indústria Interior.
      if (estado === "industriaInterior") {
        // Verifica se o personagem está perto da saída.
        if (
          dist(
            personagem.x + (personagem.largura * escala) / 2,
            personagem.y + (personagem.altura * escala) / 2,
            width / 2,
            height - 50
          ) < 50
        ) {
          estado = "cidade"; // Retorna à cidade.....
          personagem.x = 35
          personagem.y = 380
          mostrarMensagem = true;
          textoMensagem = "De volta à cidade!";
          tempoMensagem = millis();
          return;
        }
      }
    }

    // Lógica para transformar trigo em pacote de trigo (tecla '2') na Indústria.
    if (estado === "industriaInterior" && key === "2") {
      const custoTrigo = 5;
      if (itensInventario.trigo >= custoTrigo) {
        itensInventario.trigo -= custoTrigo;
        itensInventario.pacote_trigo += 1;
        mostrarMensagem = true;
        textoMensagem = "Trigo transformado em pacote de trigo!";
        tempoMensagem = millis();
      } else {
        mostrarMensagem = true;
        textoMensagem =
          "Você precisa de " + custoTrigo + " trigos para fazer um pacote!";
        tempoMensagem = millis();
      }
      return;
    }
    // Lógica para transformar morango em suco (tecla '3') na Indústria.
    if (estado === "industriaInterior" && key === "3") {
      const custoMorango = 3;
      if (itensInventario.morango >= custoMorango) {
        itensInventario.morango -= custoMorango;
        itensInventario.suco_morango += 1;
        mostrarMensagem = true;
        textoMensagem = "Morangos transformados em suco!";
        tempoMensagem = millis();
      } else {
        mostrarMensagem = true;
        textoMensagem =
          "Você precisa de " + custoMorango + " morangos para fazer um suco!";
        tempoMensagem = millis();
      }
      return;
    }

    // Lógica de venda no Mercado.
    if (estado === "mercadoInterior") {
      // Venda de Pacotes de Trigo (tecla 'T').
      if (key === "t" || key === "T") {
        const precoTrigo = 10;
        if (itensInventario.pacote_trigo > 0) {
          itensInventario.pacote_trigo -= 1;
          dinheiro += precoTrigo;
          mostrarMensagem = true;
          textoMensagem =
            "Pacote de trigo vendido! +" + precoTrigo + " dinheiro.";
          tempoMensagem = millis();
          checkWinCondition(); // Verifica a condição de vitória após a venda.
        } else {
          mostrarMensagem = true;
          textoMensagem = "Você não tem pacote de trigo para vender!";
          tempoMensagem = millis();
        }
        return;
      }
      // Venda de Suco de Morango (tecla 'M').
      if (key === "m" || key === "M") {
        const precoMorango = 15;
        if (itensInventario.suco_morango > 0) {
          itensInventario.suco_morango -= 1;
          dinheiro += precoMorango;
          mostrarMensagem = true;
          textoMensagem =
            "Suco de morango vendido! +" + precoMorango + " dinheiro.";
          tempoMensagem = millis();
          checkWinCondition(); // Verifica a condição de vitória após a venda.
        } else {
          mostrarMensagem = true;
          textoMensagem = "Você não tem suco de morango para vender!";
          tempoMensagem = millis();
        }
        return;
      }
    }
  }

  // Sai da função se não estiver no estado "jogo" para evitar processamento desnecessário.
  if (estado !== "jogo") return;

  // Lógica para plantar sementes (tecla ENTER).
  if (keyCode === ENTER && tipoSementeSelecionada) {
    // Define as áreas de horta para morango e trigo.
    let dentroHortaCima = personagem.y < 45;
    let dentroHortaBaixo = personagem.y > 55;

    // Validação da área de plantio.
    if (
      (tipoSementeSelecionada === "morango" && !dentroHortaCima) ||
      (tipoSementeSelecionada === "trigo" && !dentroHortaBaixo)
    ) {
      mostrarMensagem = true;
      textoMensagem = "Você não pode plantar aqui, apenas na horta!";
      tempoMensagem = millis();
      return;
    }
    // Previne plantio se a planta já estiver crescendo.
    if (
      (tipoSementeSelecionada === "morango" && plantaCrescendoMorango) ||
      (tipoSementeSelecionada === "trigo" && plantaCrescendoTrigo)
    ) {
      mostrarMensagem = true;
      textoMensagem = "As plantas estão crescendo, espere!!";
      tempoMensagem = millis();
      return;
    }

    // Inicia a animação de plantio e o timer de crescimento.
    graosX = personagem.x;
    graosY = personagem.y;
    graosImagem =
      tipoSementeSelecionada === "morango" ? imgGraosMorango : imgGraosTrigo;
    grãosAnimando = true;
    graosTempo = millis();
    if (tipoSementeSelecionada === "morango") {
      plantaCrescendoMorango = true;
      tempoPlantioMorango = millis();
    } else {
      plantaCrescendoTrigo = true;
      tempoPlantioTrigo = millis();
    }
    tipoSementeSelecionada = null; // Limpa a semente selecionada após o plantio.
  }
}

function mousePressed() {
  if (!musicaPrincipal.isPlaying()) {
    musicaPrincipal.setLoop(true);
    musicaPrincipal.play();
  }


  // Lógica para o botão de iniciar no menu.
  if (estado === "menu") {
    if (
      mouseX >= botaoX &&
      mouseX <= botaoX + botaoLargura &&
      mouseY >= botaoY &&
      mouseY <= botaoY + botaoAltura
    ) {
      estado = "loading"; // Muda para o estado de carregamento.
      tempoLoading = millis(); // Inicia o timer de carregamento.
    }
  }
}

// =======================================================================================
// FUNÇÕES DE DESENHO DE CENA (FIELD, CITY, INTERIORS)
// Funções separadas para desenhar cada ambiente do jogo. Isso centraliza a lógica
// de renderização de cada estado, tornando o código mais limpo e fácil de depurar.
// =======================================================================================
function drawJogo() {
  let novaX = personagem.x;
  let novaY = personagem.y;
  let velocidade = personagem.velocidade;

  // Lógica de movimento do personagem baseada nas teclas W, S, A, D.
  if (keyIsDown(87)) novaY -= velocidade; // W
  if (keyIsDown(83)) novaY += velocidade; // S
  if (keyIsDown(65)) {
    // A
    novaX -= velocidade;
    direcao = "esquerda";
  }
  if (keyIsDown(68)) {
    // D
    novaX += velocidade;
    direcao = "direita";
  }

  // Atualiza a posição do personagem se a movimentação for válida (sem colisão).
  if (podeAndar(novaX, novaY)) {
    personagem.x = novaX;
    personagem.y = novaY;
  }

  image(mapa, 0, 0); // Desenha o mapa do campo.
  // Desenha o personagem com base na direção.
  image(
    direcao === "esquerda" ? imgPersonagemEsquerda : imgPersonagem,
    personagem.x,
    personagem.y,
    personagem.largura,
    personagem.altura
  );
  // Desenha os NPCs fazendeiros.
  image(
    imgNPC,
    npcFazendeiro1.x,
    npcFazendeiro1.y,
    npcFazendeiro1.largura,
    npcFazendeiro1.altura
  );
  image(
    imgNPC,
    npcFazendeiro2.x,
    npcFazendeiro2.y,
    npcFazendeiro2.largura,
    npcFazendeiro2.altura
  );

  // Lógica para receber sementes dos fazendeiros.
  // Apenas recebe se não houver uma planta crescendo para aquele tipo de semente.
  if (
    dist(personagem.x, personagem.y, npcFazendeiro1.x, npcFazendeiro1.y) < 10 &&
    !plantaCrescendoMorango
  ) {
    tipoSementeSelecionada = "morango";
    mostrarMensagem = true;
    textoMensagem = "Você recebeu sementes de morango!";
    tempoMensagem = millis();
  }
  if (
    dist(personagem.x, personagem.y, npcFazendeiro2.x, npcFazendeiro2.y) < 10 &&
    !plantaCrescendoTrigo
  ) {
    tipoSementeSelecionada = "trigo";
    mostrarMensagem = true;
    textoMensagem = "Você recebeu sementes de trigo!";
    tempoMensagem = millis();
  }

  // Animação de plantio (grãos caindo).
  if (grãosAnimando) {
    let tempoPassado = millis() - graosTempo;
    if (tempoPassado < 3000) {
      // Dura 3 segundos.
      push();
      translate(-cameraX(), -cameraY()); // Garante que a animação acompanhe a câmera.
      image(graosImagem, graosX, graosY, 8, 8);
      pop();
    } else {
      grãosAnimando = false;
    }
  }

  // Lógica de crescimento e colheita de plantas.
  // Morango: pronto após 4 segundos.
  if (plantaCrescendoMorango && millis() - tempoPlantioMorango >= 4000) {
    plantaCrescendoMorango = false;
    itensInventario.morango += 10; // Adiciona 10 morangos ao inventário.
    mostrarMensagem = true;
    textoMensagem = "Morango está pronto para a colheita!";
    tempoMensagem = millis();
  }
  // Trigo: pronto após 4 segundos.
  if (plantaCrescendoTrigo && millis() - tempoPlantioTrigo >= 4000) {
    plantaCrescendoTrigo = false;
    itensInventario.trigo += 10; // Adiciona 10 trigos ao inventário.
    mostrarMensagem = true;
    textoMensagem = "Trigo está pronto para a colheita!";
    tempoMensagem = millis();
  }

  resetMatrix(); // Reseta as transformações para elementos da interface.
  // Exibe mensagens temporárias.
  if (mostrarMensagem && millis() - tempoMensagem < 3000) {
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(textoMensagem, width / 2, 40);
  }

  // Desenha o inventário se estiver aberto.
  if (inventarioAberto) {
    drawInventario();
  }

  drawDinheiroDisplay(); // Exibe a quantidade de dinheiro.
}

function drawCidade() {
  background(0);
  image(imgCidade, 0, 0, width, height); // Desenha o mapa da cidade.

  let novaX = personagem.x;
  let novaY = personagem.y;
  let velocidadeVisual = personagem.velocidade * escala; // Ajusta a velocidade para a escala da cidade.

  // Lógica de movimento do personagem.
  if (keyIsDown(0)) novaY -= velocidadeVisual;
  if (keyIsDown(0)) novaY += velocidadeVisual;
  if (keyIsDown(65)) {
    novaX -= velocidadeVisual;
    direcao = "esquerda";
  }
  if (keyIsDown(68)) {
    novaX += velocidadeVisual;
    direcao = "direita";
  }

  // Limita a posição do personagem dentro da tela da cidade.
  personagem.x = constrain(novaX, 0, width - personagem.largura * escala);
  personagem.y = constrain(novaY, 0, height - personagem.altura * escala);

  // Desenha o personagem e os NPCs da cidade.
  image(
    direcao === "esquerda" ? imgPersonagemEsquerda : imgPersonagem,
    personagem.x,
    personagem.y,
    personagem.largura * escala,
    personagem.altura * escala
  );
  image(
    imgMercadoNPC,
    npcMercado.x,
    npcMercado.y,
    npcMercado.largura,
    npcMercado.altura
  );
  image(
    imgIndustriaNPC,
    npcIndustria.x,
    npcIndustria.y,
    npcIndustria.largura,
    npcIndustria.altura
  );

  // Exibe mensagens temporárias.
  if (mostrarMensagem && millis() - tempoMensagem < 3000) {
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(textoMensagem, width / 2, 40);
  }

  // Desenha o inventário se estiver aberto.
  if (inventarioAberto) {
    drawInventario();
  }

  drawDinheiroDisplay(); // Exibe a quantidade de dinheiro.
}

function drawMercadoInterior() {
  background(0);
  image(imgMercadoInterior, 0, 0, width, height); // Desenha o interior do mercado.

  let novaX = personagem.x;
  let novaY = personagem.y;
  let velocidadeVisual = personagem.velocidade * escala;

  // Lógica de movimento do personagem.
  if (keyIsDown(87)) novaY -= velocidadeVisual;
  if (keyIsDown(83)) novaY += velocidadeVisual;
  if (keyIsDown(65)) {
    novaX -= velocidadeVisual;
    direcao = "esquerda";
  }
  if (keyIsDown(68)) {
    novaX += velocidadeVisual;
    direcao = "direita";
  }

  // Limita a posição do personagem dentro da tela.
  personagem.x = constrain(novaX, 0, width - personagem.largura * escala);
  personagem.y = constrain(novaY, 0, height - personagem.altura * escala);

  // Desenha o personagem.
  image(
    direcao === "esquerda" ? imgPersonagemEsquerda : imgPersonagem,
    personagem.x,
    personagem.y,
    personagem.largura * escala,
    personagem.altura * escala
  );

  // Lógica para sair do mercado (duplicado no keyPressed, mas pode ser útil para clareza visual).
  // Nota: Ter a lógica de transição em `keyPressed` e também dentro do `draw` pode gerar redundância
  // ou comportamento inesperado se não for bem gerenciado. Neste caso, `keyPressed` é a fonte primária.
  if (
    keyIsDown(81) &&
    dist(
      personagem.x + (personagem.largura * escala) / 2,
      personagem.y + (personagem.altura * escala) / 2,
      width / 2,
      height - 50
    ) < 50
  ) {
    estado = "cidade";
    personagem.x = npcMercado.x;
    personagem.y = npcMercado.y + npcMercado.altura / 2 + 10;
    mostrarMensagem = true;
    textoMensagem = "De volta à cidade!";
    tempoMensagem = millis();
    return;
  }

  // Exibe mensagens temporárias.
  if (mostrarMensagem && millis() - tempoMensagem < 3000) {
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(textoMensagem, width / 2, 40);
  }
  // Desenha o inventário se estiver aberto.
  if (inventarioAberto) {
    drawInventario();
  }

  drawDinheiroDisplay(); // Exibe a quantidade de dinheiro.
}

function drawIndustriaInterior() {
  background(0);
  image(imgIndustriaInterior, 0, 0, width, height); // Desenha o interior da indústria.

  let novaX = personagem.x;
  let novaY = personagem.y;
  let velocidadeVisual = personagem.velocidade * escala;

  // Lógica de movimento do personagem.
  if (keyIsDown(87)) novaY -= velocidadeVisual;
  if (keyIsDown(83)) novaY += velocidadeVisual;
  if (keyIsDown(65)) {
    novaX -= velocidadeVisual;
    direcao = "esquerda";
  }
  if (keyIsDown(68)) {
    novaX += velocidadeVisual;
    direcao = "direita";
  }

  // Limita a posição do personagem dentro da tela.
  personagem.x = constrain(novaX, 0, width - personagem.largura * escala);
  personagem.y = constrain(novaY, 0, height - personagem.altura * escala);

  // Desenha o personagem.
  image(
    direcao === "esquerda" ? imgPersonagemEsquerda : imgPersonagem,
    personagem.x,
    personagem.y,
    personagem.largura * escala,
    personagem.altura * escala
  );

  // Lógica para sair da indústria (duplicado no keyPressed).
  if (
    keyIsDown(81) &&
    dist(
      personagem.x + (personagem.largura * escala) / 2,
      personagem.y + (personagem.altura * escala) / 2,
      width / 2,
      height - 50
    ) < 50
  ) {
    estado = "cidade";
    personagem.x = npcIndustria.x;
    personagem.y = npcIndustria.y + npcIndustria.altura / 2 + 10;
    mostrarMensagem = true;
    textoMensagem = "De volta à cidade!";
    tempoMensagem = millis();
    return;
  }

  // Exibe mensagens temporárias.
  if (mostrarMensagem && millis() - tempoMensagem < 3000) {
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(textoMensagem, width / 2, 40);
  }
  // Desenha o inventário se estiver aberto.
  if (inventarioAberto) {
    drawInventario();
  }

  drawDinheiroDisplay(); // Exibe a quantidade de dinheiro.
}

// =======================================================================================
// FUNÇÕES DE INTERFACE DO USUÁRIO (UI)
// Funções dedicadas para desenhar elementos da UI como o inventário e o display de dinheiro.
// Isso melhora a modularidade e permite que essas funções sejam chamadas de diferentes
// estados do jogo, garantindo consistência na interface.
// =======================================================================================
function drawInventario() {
  push(); // Salva o estado atual das transformações (escala, translação).
  scale(4.0); // Aplica uma escala maior para o inventário para que ele não seja muito pequeno.
  let invX = 20,
    invY = 20; // Posição inicial do inventário na tela (já escalada).

  image(imgInventario, invX, invY); // Imagem de fundo do inventário.

  // Slot para sementes (sempre no topo do inventário).
  // Renderiza a imagem da semente selecionada.
  if (tipoSementeSelecionada === "morango")
    image(imgSementeMorango, invX + 0, invY + -2, 40, 40);
  else if (tipoSementeSelecionada === "trigo")
    image(imgSementeTrigo, invX + 34, invY + -2, 40, 40);

  // Slots para itens colhidos (primeira linha de baixo do inventário).
  if (itensInventario.morango > 0) {
    image(imgMorango, invX + 0, invY + 36, 40, 40);
    fill(255);
    textSize(3); // Tamanho pequeno para a quantidade.
    text(itensInventario.morango, invX + 24, invY + 45); // Exibe a quantidade.
  }
  if (itensInventario.trigo > 0) {
    image(imgTrigo, invX + 39, invY + 39, 20, 20);
    fill(255);
    textSize(3);
    text(itensInventario.trigo, invX + 57, invY + 45);
  }

  // Slots para produtos transformados.
  if (itensInventario.pacote_trigo > 0) {
    image(imgPacoteTrigo, invX + 9, invY + 5, 20, 20);
    fill(255);
    textSize(3);
    text(itensInventario.pacote_trigo, invX + 8, invY + 6);
  }

  if (itensInventario.suco_morango > 0) {
    image(imgSucoMorango, invX + 40, invY + 4, 20, 20);
    fill(255);
    textSize(3);
    text(itensInventario.suco_morango, invX + 57, invY + 7);
  }
  pop(); // Restaura o estado das transformações, garantindo que o inventário não afete o resto do desenho.
}

// Função para exibir o dinheiro no canto superior direito.
function drawDinheiroDisplay() {
  push(); // Salva o estado atual das transformações.
  let imgSize = 30; // Tamanho da imagem do dinheiro.
  let padding = 10; // Espaçamento da borda.

  image(imgDinheiro, width - imgSize - padding, padding, imgSize, imgSize); // Desenha a imagem do dinheiro.

  fill(255); // Cor branca para o texto.
  textSize(18); // Tamanho do texto.
  textAlign(RIGHT, TOP); // Alinha o texto à direita e ao topo.
  text(dinheiro, width - imgSize - padding - 5, padding + 5); // Exibe a quantidade de dinheiro.
  pop(); // Restaura o estado das transformações.
}

// =======================================================================================
// FUNÇÕES DE LÓGICA DO JOGO
// Funções que encapsulam regras específicas do jogo, como a condição de vitória e
// a detecção de colisão. Isso torna o código mais "orientado a funcionalidades" e
// fácil de entender.
// =======================================================================================
// Função: Verifica a condição de vitória.
function checkWinCondition() {
  if (dinheiro >= 80) {
    estado = "ganhou"; // Altera o estado do jogo para "ganhou".
    // Reinicia as variáveis de texto para a animação da mensagem de agradecimento.
    textoAtualAgradecimento = "";
    indiceTextoAgradecimento = 0;
    tempoUltimaLetraAgradecimento = millis();
    mensagemAgradecimentoCompleta = false;
  }
}

function podeAndar(x, y) {
  if (estado === "jogo") {
    // Calcula o ponto central do personagem para verificar a colisão.
    let px = int(x + personagem.largura / 2);
    let py = int(y + personagem.altura / 2);

    // Verifica se o ponto está fora dos limites do mapa de colisão.
    if (px < 0 || py < 0 || px >= mapaColisao.width || py >= mapaColisao.height)
      return false;

    // Calcula o índice do pixel no array `pixels` da imagem de colisão.
    // Cada pixel tem 4 componentes (R, G, B, A).
    let i = 4 * (py * mapaColisao.width + px);
    let r = mapaColisao.pixels[i]; // Componente Vermelho (Red).
    let g = mapaColisao.pixels[i + 1]; // Componente Verde (Green).
    let b = mapaColisao.pixels[i + 2]; // Componente Azul (Blue).

    // Retorna true se o pixel for branco (R=255, G=255, B=255), indicando que pode andar.
    return r === 255 && g === 255 && b === 255;
  }
  return true; // Se não estiver no estado "jogo", presume-se que pode andar.
}
