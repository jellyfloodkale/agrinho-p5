// Festival Rural - Feira na Cidade - p5.js
let produtos = []; // Array para armazenar os produtos disponíveis na feira (usado para referência, caixasDeProduto é o principal)
let clientes = [];
let colhendo = false;
let colhido = null;
let dinheiro = 0;
let tempoJogo = 120; // segundos (2 minutos)
let tempoRestante;
let fase = "intro1"; // Começa na primeira tela de introdução

let aberturaAlpha = 0; // Para animação de fade-in
let animandoAbertura = true;
let introSlide = 0; // Controla qual slide da introdução está ativo (0, 1, 2...)

// Variáveis para feedback visual
let feedbackCliente = {
  ativo: false,
  x: 0,
  y: 0,
  cor: 'green',
  duracao: 30 // frames
};
let mensagemErro = {
  ativo: false,
  texto: "",
  x: 0,
  y: 0,
  alpha: 255,
  duracao: 60 // frames
};
let mensagemSucesso = { // Novo para "Vendido!"
  ativo: false,
  texto: "",
  x: 0,
  y: 0,
  alpha: 255,
  duracao: 60 // frames
};

// Variáveis para Dicas Educacionais
let dicasEducacionais = [
  "A agricultura familiar é a base da nossa alimentação, valorize!",
  "Comprar do produtor local fortalece a economia da sua região.",
  "Feiras urbanas reduzem a distância entre o campo e a cidade.",
  "Alimentos frescos, cultivados com carinho, são mais saudáveis!",
  "A sustentabilidade começa na escolha dos nossos alimentos.",
  "Cada alimento tem seu tempo certo de colheita. Respeite as estações!",
  "Sabia que o Brasil é um grande produtor de frutas e legumes?",
  "O trabalho no campo é essencial para a vida na cidade e a nossa mesa.",
  "Valorize quem planta: cada produto traz consigo uma história de dedicação.",
  "Sustentabilidade é colher hoje pensando no amanhã!",
  "Feiras são pontos de encontro e cultura. Participe e aprenda!",
  "O consumo consciente apoia o pequeno agricultor e o meio ambiente."
];
let dicaAtual = "";
let tempoDica = 0;
const DURACAO_DICA = 200; // Frames para a dica ficar na tela (aprox. 3.3 segundos a 60fps)

const PRODUTOS_INICIAIS = [
  { nome: "Tomate", cor: 'red', forma: 'circulo', emoji: "🍅" },
  { nome: "Milho", cor: 'yellow', forma: 'retangulo', emoji: "🌽" }, // Espiga
  { nome: "Alface", cor: 'green', forma: 'aleatorio', emoji: "🥬" }, // Folhas
  { nome: "Cenoura", cor: 'orange', forma: 'triangulo', emoji: "🥕" },
  { nome: "Morango", cor: 'crimson', forma: 'circulo', emoji: "🍓" },
  { nome: "Batata", cor: 'sienna', forma: 'eliptico', emoji: "🥔" },
  { nome: "Abóbora", cor: 'darkorange', forma: 'circulo', emoji: "🎃" },
  { nome: "Pepino", cor: 'limegreen', forma: 'retangulo', emoji: "🥒" },
  { nome: "Cebola", cor: 'lightyellow', forma: 'eliptico', emoji: "🧅" },
  { nome: "Berinjela", cor: 'purple', forma: 'eliptico', emoji: "🍆" }
];

// Variáveis para estatísticas do jogo
let totalProdutosVendidos = 0;
let totalClientesAtendidos = 0;

// NOVAS VARIÁVEIS PARA AS CAIXAS DE PRODUTOS
let caixasDeProduto = []; // Array para armazenar as posições e tipos de cada caixa

function setup() {
  const canvas = createCanvas(700, 400);
  canvas.parent('game-container');
  // Usar uma fonte que suporte emojis é crucial. 'Segoe UI Emoji' é uma boa opção no Windows.
  // Em outros sistemas, 'Apple Color Emoji' (macOS/iOS) ou 'Noto Color Emoji' (Android/Linux) são comuns.
  textFont('Segoe UI Emoji'); // Apenas um argumento para o nome da fonte principal.

  tempoRestante = tempoJogo;

  gerarProdutosIniciais(); // Esta função agora também define e preenche as caixas

  // Ajustado o intervalo para os clientes para variar a frequência
  setInterval(novoCliente, 4000 + random(0, 3000)); // Clientes a cada 4 a 7 segundos
  setInterval(() => {
    if (fase === "jogando") tempoRestante--;
  }, 1000);

  novaDica();
  setInterval(novaDica, 12000); // Troca a dica a cada 12 segundos
}

function draw() {
  background(173, 216, 230); // Fundo azul claro para o céu

  if (fase === "intro1") {
    desenharIntroducaoSlide(0);
  } else if (fase === "intro2") {
    desenharIntroducaoSlide(1);
  } else if (fase === "intro3") {
    desenharIntroducaoSlide(2);
  } else if (fase === "jogando") {
    desenharCenario();
    mostrarProdutos(); // Agora desenha os produtos nas caixas
    mostrarClientes();
    mostrarInformacoes();
    checarFeedbackMouseCliente();
    atualizarClientes();
    verificarFim();
    gerarMaisProdutosSeNecessario(); // Reabastece as caixas
    atualizarFeedbackVisual();
    mostrarDicaEducacional(); // Chama a função para mostrar a dica
  } else if (fase === "fim") {
    mostrarTelaFim();
  }
}

// Nova função para desenhar os slides de introdução
function desenharIntroducaoSlide(slideIndex) {
  background(173, 216, 230); // Fundo azul claro para o céu

  // Elementos visuais que aparecem em todos os slides de introdução
  fill(255, 204, 0);
  ellipse(width - 100, 100, 80, 80); // Sol
  fill(100, 150, 80);
  triangle(0, height, width * 0.3, height - 100, width * 0.6, height); // Montanha
  fill(150);
  rect(width - 200, height - 150, 80, 100); // Prédio
  fill(100);
  rect(width - 185, height - 120, 10, 20);
  rect(width - 165, height - 120, 10, 20); // Janelas

  fill(20, 70, 20); // Cor do texto principal
  textAlign(CENTER, CENTER);

  if (slideIndex === 0) {
    textSize(36);
    text("Bem-vindo ao Festival Rural!", width / 2, height * 0.3);
    textSize(20);
    text("Descubra a conexão vital entre o campo e a cidade.", width / 2, height * 0.45);
    text("Um convite à celebração dos sabores e saberes da área rural.", width / 2, height * 0.52);

  } else if (slideIndex === 1) {
    textSize(32);
    text("A Importância da Feira Urbana na Área Rural", width / 2, height * 0.3);
    textSize(18);
    text("As feiras são pontes que unem produtores locais e consumidores urbanos.", width / 2, height * 0.45);
    text("Elas promovem a economia, valorizam o trabalho do campo e levam", width / 2, height * 0.52);
    text("alimentos frescos e saudáveis direto para sua mesa!", width / 2, height * 0.59);
    text("Além disso, fortalecem a comunidade e a sustentabilidade.", width / 2, height * 0.66);

  } else if (slideIndex === 2) {
    textSize(36);
    text("Como Jogar e Contribuir!", width / 2, height * 0.3);
    textSize(18);
    text("• Clique nos produtos para colher", width / 2, height * 0.45);
    text("• Arraste o produto para o cliente que deseja", width / 2, height * 0.52);
    text("• Ganhe dinheiro vendendo produtos frescos", width / 2, height * 0.59);
    text("• O jogo dura 2 minutos", width / 2, height * 0.66);
  }

  // Indicador de slide (opcional, mas ajuda)
  fill(50, 150, 50);
  textSize(14);
  text(`Slide ${slideIndex + 1} de 3`, width / 2, height * 0.95);


  // Instrução para Próximo/Começar
  fill(0, 0, 139);
  textSize(28);
  if (slideIndex < 2) {
    text("Clique para Continuar >", width / 2, height * 0.85);
  } else {
    text("Clique para Iniciar o Jogo!", width / 2, height * 0.85);
  }
}


function mousePressed() {
  if (fase.startsWith("intro")) { // Se a fase atual começa com "intro"
    introSlide++; // Avança para o próximo slide
    if (introSlide === 1) {
      fase = "intro2";
    } else if (introSlide === 2) {
      fase = "intro3";
    } else { // Se passou do último slide de introdução
      fase = "jogando"; // Inicia o jogo
    }
    // Reinicia a animação de abertura para o próximo slide, se houver
    aberturaAlpha = 0;
    animandoAbertura = true;
  } else if (fase === "jogando") {
    if (!colhendo) {
      // PROCURAR NAS CAIXAS AGORA
      for (let caixa of caixasDeProduto) {
        // Verifica se o mouse está sobre a área da caixa (ajuste os valores conforme o tamanho real da sua caixa)
        // Considera uma área clicável ao redor de cada "caixa" de produtos
        if (mouseX > caixa.x - 25 && mouseX < caixa.x + 25 && // Ajuste a largura da área clicável
          mouseY > caixa.y - 25 && mouseY < caixa.y + 25) { // Ajuste a altura da área clicável
          if (caixa.produtosNaCaixa.length > 0) {
            colhendo = true;
            colhido = caixa.produtosNaCaixa.pop(); // Pega o último produto da caixa (o de "cima")
            break;
          }
        }
      }
    }
  } else if (fase === "fim") {
    resetarJogo();
  }
}

function mouseReleased() {
  if (fase === "jogando" && colhendo && colhido) {
    let entregue = false;
    for (let c of clientes) {
      if (!c.atendido && dist(mouseX, mouseY, c.x, c.y) < 30) {
        if (colhido && c.deseja === colhido.nome) {
          dinheiro += c.preco;
          totalProdutosVendidos++; // Incrementa estatística
          totalClientesAtendidos++; // Incrementa estatística
          c.atendido = true;
          c.animaAtendido = 30; // Cliente desaparece
          entregue = true;

          // Feedback de sucesso
          mensagemSucesso.ativo = true;
          mensagemSucesso.texto = "Vendido!";
          mensagemSucesso.x = c.x;
          mensagemSucesso.y = c.y - 40;
          mensagemSucesso.alpha = 255;
          mensagemSucesso.duracao = 60;
          break;
        } else {
          // Feedback de erro
          feedbackCliente.ativo = true;
          feedbackCliente.x = c.x;
          feedbackCliente.y = c.y;
          feedbackCliente.cor = 'red';
          feedbackCliente.duracao = 30;

          mensagemErro.ativo = true;
          mensagemErro.texto = "Produto Errado!";
          mensagemErro.x = mouseX;
          mensagemErro.y = mouseY - 40;
          mensagemErro.alpha = 255;
          mensagemErro.duracao = 60;
          break;
        }
      }
    }
    if (!entregue) {
      // Se não entregou, o produto volta para a caixa correta
      let caixaDestino = caixasDeProduto.find(c => c.tipo === colhido.nome);
      if (caixaDestino) {
        // Redefine a posição para que o produto "volte" visualmente para a caixa
        colhido.x = caixaDestino.x + random(-10, 10);
        colhido.y = caixaDestino.y + random(-5, 5);
        caixaDestino.produtosNaCaixa.push(colhido); // Coloca de volta na caixa
      }
      // Se não encontrou a caixa de destino, o produto simplesmente desaparece (pode ser ajustado)
    }
    colhido = null;
    colhendo = false;
  }
}

function mostrarTelaFim() {
  background('#a0dca0'); // Um verde mais suave
  fill(40, 100, 40); // Cor de texto mais escura e vibrante
  textAlign(CENTER, CENTER);

  textSize(42);
  text("🎉 Festival Encerrado! 🎉", width / 2, height / 2 - 100); // Título maior e com ícone

  textSize(32);
  text("Dinheiro arrecadado: R$ " + dinheiro.toFixed(2), width / 2, height / 2 - 30);
  textSize(24); // Tamanho menor para estatísticas adicionais
  text("Produtos vendidos: " + totalProdutosVendidos, width / 2, height / 2 + 10);
  text("Clientes atendidos: " + totalClientesAtendidos, width / 2, height / 2 + 40);

  textSize(22);
  text("Agradecemos por sua participação e apoio à agricultura familiar!", width / 2, height / 2 + 80);
  text("Sua dedicação ajuda a levar alimentos frescos para a cidade.", width / 2, height / 2 + 110);

  fill(0, 100, 0); // Cor para o botão/instrução de reinício
  textSize(24);
  text("Clique para jogar novamente!", width / 2, height / 2 + 160);

  // Opcional: Adicionar um pequeno ícone ou ilustração no canto
  fill(255, 200, 0);
  ellipse(width * 0.85, height * 0.85, 50, 50); // Um sol pequeno
  fill(139, 69, 19);
  rect(width * 0.1, height * 0.8, 60, 40, 5); // Uma "cesta"

  // Desenhar um emoji de produto aleatório dentro da cesta
  let randomProductEmoji = random(PRODUTOS_INICIAIS).emoji;
  textSize(20);
  text(randomProductEmoji, width * 0.1 + 30, height * 0.8 + 20);
}


function desenharCenario() {
  // Gramado
  fill('#85bb65'); // Verde mais vibrante
  rect(0, 300, width, 100);

  // Caminho de terra
  fill(150, 100, 50); // Cor de terra
  beginShape();
  vertex(0, 300);
  bezierVertex(width * 0.2, 305, width * 0.4, 295, width * 0.6, 300);
  bezierVertex(width * 0.7, 305, width * 0.8, 290, width, 295);
  vertex(width, 310);
  bezierVertex(width * 0.8, 300, width * 0.7, 315, width * 0.6, 310);
  bezierVertex(width * 0.4, 305, width * 0.2, 320, 0, 310);
  endShape(CLOSE);


  // BARRACA DA FEIRA (AGORA MAIS CENTRALIZADA E BONITA)
  let feiraX = width / 2 - 150; // Ajusta a posição X para o meio
  let feiraY = 200; // Ajusta a posição Y para a feira começar mais acima

  // Postes da barraca
  fill(102, 51, 0); // Marrom escuro para madeira
  rect(feiraX - 10, feiraY, 20, 120); // Poste esquerdo
  rect(feiraX + 280, feiraY, 20, 120); // Poste direito

  // Telhado da barraca (toldo)
  fill('#CD5C5C'); // Um tom de vermelho/terra para o toldo
  beginShape();
  vertex(feiraX - 20, feiraY);
  vertex(feiraX + 310, feiraY);
  vertex(feiraX + 320, feiraY + 40);
  vertex(feiraX - 30, feiraY + 40);
  endShape(CLOSE);

  // Letreiro no telhado
  fill(200, 50, 50); // Cor mais escura para o letreiro
  textSize(24);
  textAlign(CENTER, CENTER);
  text("FEIRA DO PRODUTOR", feiraX + 140, feiraY + 20);

  // Balcão da feira
  fill(139, 69, 19); // Marrom para o balcão
  rect(feiraX - 10, feiraY + 120, 310, 80, 10); // Balcão principal

  // Prateleiras no balcão (Ajustadas para ter 5 caixas cada)
  fill(160, 82, 45); // Marrom mais claro para prateleiras
  rect(feiraX + 5, feiraY + 130, 290, 10, 5); // Prateleira de baixo
  rect(feiraX + 5, feiraY + 100, 290, 10, 5); // Prateleira de cima


  // Nuvens (com mais variedade e movimento)
  fill(255, 255, 255, 200); // Nuvens semi-transparentes
  noStroke();
  ellipse(width * 0.2 + (frameCount * 0.08) % (width + 100), 50, 80, 40);
  ellipse(width * 0.35 + (frameCount * 0.06) % (width + 100), 70, 90, 45);
  ellipse(width * 0.6 + (frameCount * 0.07) % (width + 100), 60, 70, 35);
  ellipse(width * 0.85 + (frameCount * 0.05) % (width + 100), 80, 100, 50);

  // Pássaros (mais e com movimento individual)
  stroke(50);
  strokeWeight(2);
  // Pássaro 1
  let bird1X = (width * 0.1 + frameCount * 0.2) % (width + 30) - 15;
  line(bird1X, 100, bird1X + 10, 95);
  line(bird1X + 10, 95, bird1X + 20, 100);
  // Pássaro 2
  let bird2X = (width * 0.5 + frameCount * 0.15) % (width + 30) - 15;
  line(bird2X, 120, bird2X + 10, 115);
  line(bird2X + 10, 115, bird2X + 20, 120);
  // Pássaro 3
  let bird3X = (width * 0.75 + frameCount * 0.18) % (width + 30) - 15;
  line(bird3X, 90, bird3X + 10, 85);
  line(bird3X + 10, 85, bird3X + 20, 90);

  noStroke(); // Reset stroke for other elements

  // Árvore (área de campo)
  fill(139, 69, 19); // Tronco marrom
  rect(50, 180, 30, 120); // Tronco
  fill(34, 139, 34); // Folhas verde escuro
  ellipse(65, 170, 90, 100); // Copa da árvore
  ellipse(45, 190, 70, 80);
  ellipse(85, 190, 70, 80);

  // Flores/Arbustos no chão (mais espalhados)
  fill(255, 100, 150); // Rosa
  ellipse(random(10, width / 2 - 50), random(310, 320), 8, 8);
  ellipse(random(10, width / 2 - 50), random(310, 320), 8, 8);
  fill(100, 200, 100); // Verde claro
  rect(random(10, width / 2 - 50), random(305, 315), 15, 10, 2);
  rect(random(10, width / 2 - 50), random(305, 315), 15, 10, 2);

}

// NOVA FUNÇÃO para desenhar EMOJIS
function desenharEmojiProduto(emoji, x, y, tamanho) {
  textSize(tamanho);
  // Ajusta o alinhamento para que o emoji seja desenhado no centro da posição (x,y)
  textAlign(CENTER, CENTER);
  text(emoji, x, y);
}

// FUNÇÃO MODIFICADA: Agora desenha os produtos nas caixas
function mostrarProdutos() {
  for (let caixa of caixasDeProduto) {
    // Desenha uma "caixa" visualmente (opcional, pode ser um retângulo)
    fill(139, 69, 19, 150); // Marrom semi-transparente para a caixa
    noStroke();
    rectMode(CENTER);
    rect(caixa.x, caixa.y, 60, 40, 5); // Tamanho da caixa de madeira
    rectMode(CORNER); // Volta para o modo padrão

    // Desenha os produtos dentro da caixa
    for (let p of caixa.produtosNaCaixa) {
      // Destaque ao passar o mouse
      if (dist(mouseX, mouseY, p.x, p.y) < 20 && !colhendo) {
        fill(255, 255, 0, 100); // Um brilho amarelo suave por trás do emoji
        ellipse(p.x, p.y + 5, 40, 40); // Círculo de brilho

        fill(0); // A cor do texto para o emoji em si (geralmente não importa)
        desenharEmojiProduto(p.emoji, p.x, p.y + 5, 30); // Tamanho maior para destaque
      } else {
        fill(0); // A cor do texto para o emoji em si
        desenharEmojiProduto(p.emoji, p.x, p.y + 5, 25);
      }
      fill(255); // Cor do texto do nome
      textAlign(CENTER, CENTER); // Garante que o nome esteja centralizado
      textSize(11);
      text(p.nome, p.x, p.y + 25); // Ajuste o Y para o nome ficar abaixo do emoji
    }
  }

  // Desenha o produto sendo arrastado
  if (colhendo && colhido) {
    fill(0); // Cor do texto do emoji (não afeta o emoji em si)
    desenharEmojiProduto(colhido.emoji, mouseX, mouseY + 5, 30);
    fill(255); // Cor do texto do nome
    textAlign(CENTER, CENTER);
    textSize(12);
    text(colhido.nome, mouseX, mouseY - 20);
  }
}

function mostrarClientes() {
  for (let i = clientes.length - 1; i >= 0; i--) {
    let c = clientes[i];
    if (c.atendido && c.animaAtendido > 0) {
      let alphaFade = map(c.animaAtendido, 0, 30, 0, 255);
      fill(c.cor.levels[0], c.cor.levels[1], c.cor.levels[2], alphaFade);
      ellipse(c.x, c.y, 30, 30); // Corpo do cliente desvanecendo
      textSize(12);
      fill(255, alphaFade); // Texto "Obrigado!" desvanecendo
      text("Obrigado!", c.x, c.y - 22);
      c.animaAtendido--;
    } else if (!c.atendido) {
      c.mostrar();
    }
  }
}

function mostrarInformacoes() {
  fill(34, 139, 34);
  textSize(14);
  textAlign(LEFT, TOP);
  text("Dinheiro: R$ " + dinheiro.toFixed(2), 10, 10);
  text("Tempo restante: " + max(0, tempoRestante) + "s", 10, 30);
}

function checarFeedbackMouseCliente() {
  if (colhendo && colhido) {
    for (let c of clientes) {
      if (!c.atendido && dist(mouseX, mouseY, c.x, c.y) < 30) {
        fill(0, 255, 0, 100);
        ellipse(c.x, c.y, 60);
      }
    }
  }
}

function atualizarFeedbackVisual() {
  if (feedbackCliente.ativo) {
    let currentAlpha = map(feedbackCliente.duracao, 0, 30, 0, 200);
    fill(red(feedbackCliente.cor), green(feedbackCliente.cor), blue(feedbackCliente.cor), currentAlpha);
    noStroke();
    ellipse(feedbackCliente.x, feedbackCliente.y, 60);
    feedbackCliente.duracao--;
    if (feedbackCliente.duracao <= 0) {
      feedbackCliente.ativo = false;
    }
  }

  // Animação da mensagem de erro
  if (mensagemErro.ativo) {
    fill(255, 0, 0, mensagemErro.alpha);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(mensagemErro.texto, mensagemErro.x, mensagemErro.y);
    mensagemErro.alpha -= 5;
    mensagemErro.y -= 0.5;
    mensagemErro.duracao--;
    if (mensagemErro.duracao <= 0) {
      mensagemErro.ativo = false;
    }
  }

  // Animação da mensagem de sucesso "Vendido!"
  if (mensagemSucesso.ativo) {
    fill(0, 150, 0, mensagemSucesso.alpha); // Verde para "Vendido!"
    textSize(18);
    textAlign(CENTER, CENTER);
    text(mensagemSucesso.texto, mensagemSucesso.x, mensagemSucesso.y);
    mensagemSucesso.alpha -= 5;
    mensagemSucesso.y -= 0.5; // Sobe suavemente
    mensagemSucesso.duracao--;
    if (mensagemSucesso.duracao <= 0) {
      mensagemSucesso.ativo = false;
    }
  }
}

function atualizarClientes() {
  for (let i = clientes.length - 1; i >= 0; i--) {
    let c = clientes[i];
    if (!c.atendido) {
      c.tempo--;
    }
    if (c.tempo <= 0 || (c.atendido && c.animaAtendido <= 0)) {
      clientes.splice(i, 1);
    }
  }
}

function verificarFim() {
  if (tempoRestante <= 0) {
    fase = "fim";
  }
}

function resetarJogo() {
  // Limpa a lista de produtos (mas eles serão recriados nas caixas)
  produtos = [];
  clientes = [];
  colhendo = false;
  colhido = null;
  dinheiro = 0;
  tempoRestante = tempoJogo;
  fase = "intro1"; // Reinicia para a primeira tela de introdução
  introSlide = 0; // Reseta o contador de slides
  aberturaAlpha = 0;
  animandoAbertura = true;
  totalProdutosVendidos = 0; // Reseta estatística
  totalClientesAtendidos = 0; // Reseta estatística

  gerarProdutosIniciais(); // Redefine e preenche as caixas
  novaDica(); // Reseta a dica ao reiniciar
}

// Funções para definir as posições e tipos de cada caixa de produto
function definirPosicoesCaixas() {
  caixasDeProduto = []; // Limpa as caixas existentes

  // Posições base para as caixas dentro da feira
  let feiraX = width / 2 - 150;
  let feiraY = 200;

  // Ajuste de posições X e Y para as caixas ficarem nas prateleiras
  // Distribuição de 5 caixas por prateleira (60px de largura da caixa + 10px de espaçamento = 70px por caixa)
  // feiraX + 15 (início) + (índice * 60)
  // Posições x_inicial para centralizar 5 caixas em 300px: 300 - (5 * 60) / 2 = 0
  // Então, os centros das caixas estariam em feiraX + 30, 90, 150, 210, 270

  // Prateleira Inferior (5 caixas)
  caixasDeProduto.push({ x: feiraX + 30, y: feiraY + 145, tipo: "Tomate", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 90, y: feiraY + 145, tipo: "Milho", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 150, y: feiraY + 145, tipo: "Cenoura", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 210, y: feiraY + 145, tipo: "Morango", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 270, y: feiraY + 145, tipo: "Batata", produtosNaCaixa: [] }); // Adicionado Batata aqui

  // Prateleira Superior (5 caixas)
  caixasDeProduto.push({ x: feiraX + 30, y: feiraY + 115, tipo: "Alface", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 90, y: feiraY + 115, tipo: "Abóbora", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 150, y: feiraY + 115, tipo: "Pepino", produtosNaCaixa: [] });
  caixasDeProduto.push({ x: feiraX + 210, y: feiraY + 115, tipo: "Cebola", produtosNaCaixa: [] }); // Adicionado Cebola aqui
  caixasDeProduto.push({ x: feiraX + 270, y: feiraY + 115, tipo: "Berinjela", produtosNaCaixa: [] }); // Adicionado Berinjela aqui
}


// Função para preencher uma caixa com produtos
function preencherCaixa(caixa, quantidade) {
  let produtoInfo = PRODUTOS_INICIAIS.find(p => p.nome === caixa.tipo);
  if (!produtoInfo) {
    console.warn(`Produto "${caixa.tipo}" não encontrado para preencher a caixa.`);
    return;
  }

  for (let i = 0; i < quantidade; i++) {
    // Posições aleatórias dentro da caixa para dar um visual de "empilhado"
    let prodX = caixa.x + random(-10, 10);
    let prodY = caixa.y + random(-5, 5);
    caixa.produtosNaCaixa.push(new Produto(produtoInfo.nome, prodX, prodY, produtoInfo.cor, produtoInfo.forma, produtoInfo.emoji));
  }
}

// Inicializa e preenche as caixas
function gerarProdutosIniciais() {
  definirPosicoesCaixas(); // Define onde as caixas estarão
  for (let caixa of caixasDeProduto) {
    preencherCaixa(caixa, 5); // Cada caixa começa com 5 produtos
  }
}

// Reabastece as caixas
function gerarMaisProdutosSeNecessario() {
  // Itera sobre as caixas para ver quais precisam de mais produtos
  for (let caixa of caixasDeProduto) {
    if (caixa.produtosNaCaixa.length < 3) { // Se a caixa tiver menos de 3 produtos
      preencherCaixa(caixa, 1); // Adiciona apenas 1 produto por vez para reabastecer gradualmente
    }
  }
}

class Produto {
  constructor(nome, x, y, cor, forma, emoji) {
    this.nome = nome;
    this.x = x;
    this.y = y;
    this.cor = cor;
    this.forma = forma;
    this.emoji = emoji;
  }

  static getProdutoPorNome(nomeProduto) {
    return PRODUTOS_INICIAIS.find(p => p.nome === nomeProduto);
  }
}

class Cliente {
  constructor() {
    this.x = random(width - 150, width - 50); // Clientes mais perto da feira
    this.y = random(290, 380);
    this.deseja = "";
    this.preco = random(5, 15);
    this.tempo = 20 * 60; // 20 segundos
    this.atendido = false;
    this.cor = color(random(100, 200), random(100, 200), random(100, 200));
    this.animaAtendido = 0;

    this.balloonOffsetX = 0;
    this.balloonOffsetY = -45;
  }

  mostrar() {
    fill(this.cor.levels[0], this.cor.levels[1], this.cor.levels[2]);
    ellipse(this.x, this.y, 30, 30); // Corpo do cliente

    fill(255, 223, 196);
    ellipse(this.x, this.y - 25, 20, 20); // Cabeça do cliente

    fill(255);
    stroke(0);
    strokeWeight(1);
    // Balão de fala
    // Ajustado o tamanho do balão para caber o emoji e o texto se necessário
    rect(this.x + this.balloonOffsetX + 20, this.y + this.balloonOffsetY, 70, 40, 5);
    triangle(this.x + this.balloonOffsetX + 15, this.y + this.balloonOffsetY + 35,
      this.x + this.balloonOffsetX + 25, this.y + this.balloonOffsetY + 30,
      this.x + this.balloonOffsetX + 20, this.y + this.balloonOffsetY + 20);

    // Desenha o emoji do produto dentro do balão de fala
    let produtoDesejado = Produto.getProdutoPorNome(this.deseja);
    if (produtoDesejado) {
      push(); // Salva o estado atual das transformações
      // Posição ajustada para o emoji dentro do balão
      desenharEmojiProduto(produtoDesejado.emoji, this.x + this.balloonOffsetX + 55, this.y + this.balloonOffsetY + 20, 20); // Tamanho menor para o ícone
      textSize(10); // Tamanho menor para o nome do produto
      textAlign(CENTER, CENTER);
      fill(0);
      text(this.deseja, this.x + this.balloonOffsetX + 55, this.y + this.balloonOffsetY + 35); // Nome do produto abaixo do emoji
      pop(); // Restaura o estado anterior das transformações
    }

    // Timer do cliente
    fill(255, 0, 0);
    textSize(10);
    text(ceil(this.tempo / 60) + "s", this.x, this.y + 25);
  }
}

function novoCliente() {
  if (fase === "jogando" && clientes.length < 5) {
    let novoClienteObj = new Cliente();

    let produtosDisponiveis = PRODUTOS_INICIAIS.map(p => p.nome);
    let produtosJaPedidos = clientes.map(c => c.deseja);

    let produtosNaoRepetidos = produtosDisponiveis.filter(p => !produtosJaPedidos.includes(p));

    if (produtosNaoRepetidos.length > 0) {
      novoClienteObj.deseja = random(produtosNaoRepetidos);
    } else {
      // Se todos os produtos já foram pedidos por clientes na tela, escolhe um aleatoriamente.
      novoClienteObj.deseja = random(PRODUTOS_INICIAIS.map(p => p.nome));
    }

    // Ajusta a posição Y para evitar sobreposição dos balões
    let tentativas = 0;
    const maxTentativas = 10;
    let yBase = random(290, 380); // Y inicial aleatório
    let foundPosition = false;

    while (!foundPosition && tentativas < maxTentativas) {
      foundPosition = true;
      let tempY = yBase;
      if (tentativas > 0) {
        tempY += (random() > 0.5 ? 1 : -1) * (15 + (tentativas * 5));
      }

      if (tempY < 290) tempY = 290;
      if (tempY > 380) tempY = 380;

      novoClienteObj.y = tempY;

      for (let c of clientes) {
        if (!c.atendido) {
          let clienteDistX = abs(novoClienteObj.x - c.x);
          let clienteDistY = abs(novoClienteObj.y - c.y);

          if (clienteDistX < 40 && clienteDistY < 55) {
            foundPosition = false;
            break;
          }
        }
      }
      tentativas++;
    }

    if (novoClienteObj.x > width * 0.75) {
      novoClienteObj.balloonOffsetX = -100;
    } else if (novoClienteObj.x < width * 0.25) {
      novoClienteObj.balloonOffsetX = 0;
    } else if (!foundPosition) {
      novoClienteObj.balloonOffsetX = -100;
    }

    clientes.push(novoClienteObj);
  }
}

// Funções para as Dicas Educacionais
function novaDica() {
  if (fase === "jogando") {
    dicaAtual = random(dicasEducacionais);
    tempoDica = DURACAO_DICA; // Reseta o tempo da dica
  }
}

function mostrarDicaEducacional() {
  if (tempoDica > 0) {
    let alpha = map(tempoDica, DURACAO_DICA, DURACAO_DICA - 30, 0, 255); // Fade in
    if (tempoDica < 30) { // Fade out no final
      alpha = map(tempoDica, 0, 30, 0, 255);
    }

    textSize(16); // Define o tamanho do texto ANTES de calcular a largura
    let larguraDaDica = textWidth(dicaAtual); // Agora sim, calcula a largura do texto

    // Fundo para a dica
    noStroke();
    fill(50, 150, 50, alpha * 0.7); // Cor de fundo verde com transparência
    rectMode(CENTER);
    rect(width / 2, 25, larguraDaDica + 40, 40, 10); // Fundo arredondado, usando a largura calculada
    rectMode(CORNER); // Volta para o modo padrão

    fill(255, 255, 255, alpha); // Cor do texto branco com transparência
    textAlign(CENTER, CENTER); // Centraliza vertical e horizontalmente para o texto dentro do rect
    text(dicaAtual, width / 2, 25); // Posição no topo central

    tempoDica--;
  }
}