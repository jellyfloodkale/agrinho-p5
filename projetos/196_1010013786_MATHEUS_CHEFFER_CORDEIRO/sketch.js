let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;

// Variáveis para controlar a rega
let regando = false;
let alcanceRega = 70; // Distância que o jardineiro pode regar
let aguaDisponivel = 250; // Recurso de água do jardineiro
let capacidadeMaximaAgua = 250;

// ===================================
// NOVAS VARIÁVEIS PARA DINHEIRO, CAMINHÃO E CARTA
// ===================================
let dinheiro = 0; // Dinheiro inicial do jogador

// Variáveis do Caminhão
let caminhaoX = -100; // Posição X inicial (fora da tela à esquerda)
let caminhaoY; // A posição Y será definida no setup
let caminhaoVelocidade = 4;
let caminhaoAtivo = false;
let caminhaoEmoji = '🚚'; // Emoji do caminhão

// Variáveis da Carta de Parabéns
let mostrarCarta = false;
let textoCarta = "";
let tempoInicioCarta = 0;
let duracaoCarta = 4000; // 4 segundos em milissegundos
// ===================================
// FIM NOVAS VARIÁVEIS
// ===================================

// ===================================
// NOVA VARIÁVEL PARA O POÇO DE ÁGUA
// ===================================
let pocoDeAgua;
// ===================================
// FIM NOVA VARIÁVEL
// ===================================


function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
  textAlign(CENTER, CENTER); // Centraliza o texto dos emojis

  // Define a posição Y do caminhão (na parte de baixo da tela, acima do chão)
  caminhaoY = height - 60;

  // Adicionando itens ao inventário inicial do jardineiro
  jardineiro.inventario.adicionarItem(new Semente('Semente de Árvore', '🌳'));
  jardineiro.inventario.adicionarItem(new Semente('Semente de Flor', '🌸'));
  jardineiro.inventario.adicionarItem(new Pazinha()); // Adiciona uma pá
  jardineiro.inventario.adicionarItem(new Fertilizante()); // Adiciona fertilizante

  // ===================================
  // INSTANCIA O POÇO DE ÁGUA NO SETUP
  // ===================================
  pocoDeAgua = new PocoDeAgua(width - 100, height - 70); // Posição do poço (exemplo: canto inferior direito)
  // ===================================
  // FIM INSTANCIAÇÃO
  // ===================================
}

function draw() {
  // Cores de fundo mais dinâmicas
  let corFundo = lerpColor(color(135, 206, 235), color(173, 216, 230), map(temperatura, 0, 40, 0, 1)); // Céu azul claro
  background(corFundo);

  // Desenha o chão
  fill(139, 69, 19); // Cor de terra
  rect(0, height - 80, width, 80);

  // ===================================
  // MOSTRA O POÇO DE ÁGUA NO DRAW
  // ===================================
  pocoDeAgua.mostrar();
  // ===================================
  // FIM MOSTRAR POÇO
  // ===================================

  mostrarInformacoes();

  // A temperatura varia um pouco mais realisticamente
  temperatura += random(-0.05, 0.05); // Pequenas flutuações
  temperatura = constrain(temperatura, 0, 40); // Limita a temperatura entre 0 e 40

  jardineiro.atualizar();
  jardineiro.mostrar();

  // Atualiza e mostra cada planta
  for (let i = plantas.length - 1; i >= 0; i--) {
    let planta = plantas[i];
    planta.atualizar();
    planta.mostrar();

    // Remove plantas que murcharam
    if (planta.murcha) {
      plantas.splice(i, 1);
      totalArvores--; // Decrementa ao remover
    }
  }

  // Mostra o alcance de rega se o jardineiro estiver regando
  if (regando) {
    noFill();
    stroke(0, 150, 255, 100); // Azul semi-transparente
    ellipse(jardineiro.x, jardineiro.y, alcanceRega * 2);
  }

  // Mostra o inventário na tela
  jardineiro.inventario.mostrar(10, 170); // Posição para mostrar o inventário

  // ===================================
  // LÓGICA DO CAMINHÃO
  // ===================================
  if (caminhaoAtivo) {
    caminhaoX += caminhaoVelocidade;
    textSize(48); // Tamanho maior para o emoji do caminhão
    text(caminhaoEmoji, caminhaoX, caminhaoY);

    // Se o caminhão saiu da tela pela direita, desativa ele
    if (caminhaoX > width + 50) {
      caminhaoAtivo = false;
      caminhaoX = -100; // Reseta a posição para a próxima vez
    }
  }
  // ===================================
  // FIM LÓGICA DO CAMINHÃO
  // ===================================

  // ===================================
  // LÓGICA DA CARTA DE PARABÉNS
  // ===================================
  if (mostrarCarta) {
    // Calcula o tempo que a carta está visível
    let tempoDecorrido = millis() - tempoInicioCarta;

    if (tempoDecorrido < duracaoCarta) {
      // Desenha o fundo da carta
      fill(255, 255, 200); // Amarelo claro para a carta
      stroke(0);
      rect(width - 220, 10, 200, 80, 10); // Posição no canto superior direito, com bordas arredondadas

      // Desenha o texto da carta
      fill(0); // Cor do texto
      textSize(16);
      text("Parabéns!", width - 120, 40);
      textSize(14);
      text(textoCarta, width - 120, 70);
    } else {
      mostrarCarta = false; // Esconde a carta após o tempo de duração
    }
  }
  // ===================================
  // FIM LÓGICA DA CARTA DE PARABÉNS
  // ===================================
}

function mostrarInformacoes() {
  textSize(18);
  fill(0);
  // Posições ajustadas para melhor visibilidade no céu
  text("Temperatura: " + temperatura.toFixed(1) + "°C", width - 120, 30);
  text("Árvores plantadas: " + totalArvores, width - 120, 55);
  text("Água: " + aguaDisponivel.toFixed(0) + "/" + capacidadeMaximaAgua, width - 120, 80);
  // ===================================
  // EXIBIR DINHEIRO
  // ===================================
  text("Dinheiro: R$ " + dinheiro.toFixed(2), width - 120, 105); // Exibe o dinheiro
  // ===================================
  // FIM EXIBIR DINHEIRO
  // ===================================

  textSize(14);
  text("Setas: Mover", 60, 30);
  text("Espaço: Plantar", 80, 50);
  text("R: Regar", 45, 70);
  text("1-9: Selecionar Item", 95, 90);
  text("E: Usar Item", 65, 110);
  text("E com Pá: Desenterrar/Colher", 130, 130);
  // ===================================
  // INSTRUÇÃO PARA O POÇO DE ÁGUA
  // ===================================
  text("P: Encher Água (Poço)", 105, 150);
  // ===================================
  // FIM INSTRUÇÃO
  // ===================================
}

// Classe que cria o jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = '👨‍🌾';
    this.velocidade = 3;
    this.inventario = new Inventario(5); // Inventário com 5 slots
    // É importante inicializar o dinheiro aqui se o jardineiro for responsável por ele
    // Ou garantir que a variável global 'dinheiro' seja acessível e manipulada.
    // Como 'dinheiro' já é global, não precisamos de 'this.dinheiro' aqui,
    // mas se fosse para ser uma propriedade do jardineiro, seria assim:
    // this.dinheiro = 0;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }

    // Limita o jardineiro à tela
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, height - 80, height); // Apenas na área da terra
  }

  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}

// Função para criar e plantar a árvore
function keyPressed() {
  // Pressionar 1-9 para selecionar slot do inventário
  if (key >= '1' && key <= '9') {
    let slotIndex = int(key) - 1;
    jardineiro.inventario.selecionarSlot(slotIndex);
  }

  if (key === ' ' || keyCode === 32) { // Espaço para plantar usando o item selecionado
    if (jardineiro.y > height - 80) { // Só planta se estiver na área da terra
      let itemSelecionado = jardineiro.inventario.getSlotSelecionado();
      if (itemSelecionado && itemSelecionado.tipo === 'semente') {
        let novaPlanta = new Arvore(jardineiro.x, jardineiro.y, itemSelecionado.emojiPlanta);
        plantas.push(novaPlanta);
        totalArvores++;
        temperatura -= 1; // Pequena queda na temperatura ao plantar
        jardineiro.inventario.removerItem(itemSelecionado); // Remove a semente usada
      } else {
        console.log("Nenhuma semente selecionada ou slot vazio!");
      }
    }
  }

  // Ativa/desativa a rega
  if (key === 'r' || key === 'R') {
    regando = !regando;
    if (regando && aguaDisponivel > 0) {
      // Se estiver regando e tiver água, rega as plantas no alcance
      for (let planta of plantas) {
        if (dist(planta.x, planta.y, jardineiro.x, jardineiro.y) < alcanceRega) {
          planta.saude += 10; // Aumenta a saúde ao regar
          planta.saude = constrain(planta.saude, 0, 100);
        }
      }
      aguaDisponivel -= 10; // Consome água por cada ação de rega
      aguaDisponivel = constrain(aguaDisponivel, 0, capacidadeMaximaAgua);
    } else {
      if (aguaDisponivel <= 0) {
        console.log("Água acabou! Recarregue sua água.");
      }
    }
  }

  // Usar item (ex: fertilizante, desenterrar/colher)
  if (key === 'e' || key === 'E') {
    let itemSelecionado = jardineiro.inventario.getSlotSelecionado();
    if (itemSelecionado) {
      // Lógica para usar a pá
      if (itemSelecionado.tipo === 'ferramenta' && itemSelecionado.nome === 'Pá') {
        // Encontra a planta mais próxima para interagir
        let plantaMaisProxima = null;
        let menorDistancia = Infinity;
        for (let planta of plantas) {
          let d = dist(planta.x, planta.y, jardineiro.x, jardineiro.y);
          if (d < alcanceRega && d < menorDistancia) {
            menorDistancia = d;
            plantaMaisProxima = planta;
          }
        }

        if (plantaMaisProxima) {
          if (plantaMaisProxima.temFruto) {
            plantaMaisProxima.colherFruto(); // Reseta o estado de ter fruto na árvore
            console.log("Fruto colhido da árvore!");

            // ===================================
            // NOVAS AÇÕES AO COLHER FRUTO
            // ===================================
            // Remove o fruto do inventário do jardineiro após a "venda"
            // Você precisa encontrar o fruto específico no inventário e removê-lo
            // Por simplicidade, vamos assumir que o jardineiro vende um fruto que ele "pegou"
            // Se o fruto foi direto para o caminhão sem ir para o inventário, esta linha seria diferente.
            // Para este cenário, vamos simular a "venda" ao colher.
            let frutoNoInventario = jardineiro.inventario.slots.find(item => item && item.tipo === 'fruto');
            if (frutoNoInventario) {
              jardineiro.inventario.removerItem(frutoNoInventario);
            }

            dinheiro += 2.00; // Adiciona R$ 2,00
            caminhaoAtivo = true; // Ativa o caminhão para passar
            caminhaoX = -100; // Garante que o caminhão comece fora da tela
            // Ativa a carta de parabéns
            mostrarCarta = true;
            textoCarta = "Você ganhou R$ 2,00!";
            tempoInicioCarta = millis();
            // ===================================
            // FIM NOVAS AÇÕES
            // ===================================

          } else {
            // Lógica existente: desenterrar a planta se não houver fruto
            let index = plantas.indexOf(plantaMaisProxima);
            if (index > -1) {
              plantas.splice(index, 1);
              totalArvores--;
              console.log("Planta desenterrada com a pá!");
            }
          }
        } else {
          console.log("Nenhuma planta por perto para interagir com a pá.");
        }
      } else if (itemSelecionado.tipo === 'fertilizante') {
        // Lógica para usar fertilizante
        let plantaMaisProxima = null;
        let menorDistancia = Infinity;
        for (let planta of plantas) {
          let d = dist(planta.x, planta.y, jardineiro.x, jardineiro.y);
          if (d < alcanceRega && d < menorDistancia) {
            menorDistancia = d;
            plantaMaisProxima = planta;
          }
        }
        if (plantaMaisProxima) {
          plantaMaisProxima.saude = constrain(plantaMaisProxima.saude + 30, 0, 100); // Aumenta a saúde
          plantaMaisProxima.tempoPlantada -= 5000; // Acelera o crescimento (reduz tempo restante para crescer)
          jardineiro.inventario.removerItem(itemSelecionado); // Consome o fertilizante
          console.log("Planta fertilizada!");
        } else {
          console.log("Nenhuma planta por perto para fertilizar.");
        }
      }
    } else {
      console.log("Nenhum item selecionado para usar.");
    }
  }

  // ===================================
  // LÓGICA DE INTERAÇÃO COM O POÇO DE ÁGUA
  // ===================================
  if (key === 'p' || key === 'P') {
    // Certifique-se de que a variável 'pocoDeAgua' está instanciada
    if (pocoDeAgua && pocoDeAgua.estaPerto(jardineiro)) {
      aguaDisponivel = capacidadeMaximaAgua; // Enche a água do jardineiro ao máximo
      console.log("Água do jardineiro recarregada!");
    } else {
      console.log("Você precisa estar mais perto do poço de água para recarregar!");
    }
  }
  // ===================================
  // FIM LÓGICA DO POÇO DE ÁGUA
  // ===================================
}


// Quando a tecla é solta, desativa a rega (se for o caso)
function keyReleased() {
  if (key === 'r' || key === 'R') {
    regando = false;
  }
}

// Classe que cria a árvore
class Arvore {
  constructor(x, y, emojiPlanta = '🌱') {
    this.x = x;
    this.y = y;
    this.estagio = 0; // 0: semente, 1: broto, 2: pequena, 3: média, 4: grande, 5: frutífera
    this.emojis = [emojiPlanta, '🌿', '🌳', '🌲', '🌴']; // Diferentes emojis para estágios
    this.tamanhos = [16, 24, 32, 40, 48]; // Tamanhos de texto correspondentes
    this.tempoPlantada = millis(); // Tempo em que a planta foi criada
    this.tempoParaCrescer = 5000; // Tempo em ms para ir para o próximo estágio

    this.saude = 100; // Saúde da planta (0-100)
    this.murcha = false; // Indica se a planta murchou

    this.temFruto = false;
    this.emojiFruto = '🍎'; // Emoji padrão de fruto
    this.tempoParaFrutificar = 15000; // Tempo em ms para a árvore dar frutos após o estágio final de crescimento
    this.ultimaColheita = millis(); // Tempo da última colheita ou quando a árvore frutificou
  }

  atualizar() {
    // Crescimento da planta
    if (this.estagio < this.emojis.length - 1 && millis() - this.tempoPlantada > this.tempoParaCrescer) {
      this.estagio++;
      this.tempoPlantada = millis(); // Reseta o tempo para o próximo estágio
    }

    // Influência da temperatura na saúde
    let tempIdealMin = 15;
    let tempIdealMax = 25;
    let danoTemp = 0.05; // Dano de temperatura por frame

    if (temperatura < tempIdealMin || temperatura > tempIdealMax) {
      this.saude -= danoTemp;
    } else {
      this.saude += 0.02; // Pequena recuperação de saúde em temperatura ideal
    }
    this.saude = constrain(this.saude, 0, 100); // Limita a saúde

    // Se a saúde chegar a 0, a planta murcha
    if (this.saude <= 0) {
      this.murcha = true;
    }

    // Frutificação da planta
    // A árvore dá frutos apenas no seu estágio final e se não tiver um fruto atualmente
    if (this.estagio === this.emojis.length - 1 && !this.temFruto) {
      if (millis() - this.ultimaColheita > this.tempoParaFrutificar) {
        this.temFruto = true;
        console.log("Uma árvore deu frutos!");
      }
    }
  }

  mostrar() {
    let emojiAtual = this.emojis[this.estagio];
    let tamanhoAtual = this.tamanhos[this.estagio];

    // Mudar cor ou emoji se a saúde estiver baixa
    if (this.saude < 30) {
      fill(255, 0, 0); // Vermelho para planta doente
      emojiAtual = '🥀'; // Emoji de planta murcha
    } else {
      fill(0); // Preto normal
    }

    textSize(tamanhoAtual);
    text(emojiAtual, this.x, this.y);

    // Mostra o fruto se a árvore tiver
    if (this.temFruto) {
      textSize(tamanhoAtual * 0.5); // Tamanho menor para o fruto
      text(this.emojiFruto, this.x + tamanhoAtual / 2, this.y - tamanhoAtual / 2); // Posição do fruto (ligeiramente acima e à direita da árvore)
    }

    // Opcional: mostrar barra de saúde da planta
    if (this.saude < 100) {
      let barraW = 30;
      let barraH = 5;
      let offsetX = 0;
      let offsetY = -tamanhoAtual / 2 - 10;
      fill(200);
      rect(this.x - barraW / 2 + offsetX, this.y + offsetY, barraW, barraH);
      fill(map(this.saude, 0, 100, 255, 0), map(this.saude, 0, 100, 0, 255), 0); // Verde para saudável, vermelho para doente
      rect(this.x - barraW / 2 + offsetX, this.y + offsetY, map(this.saude, 0, 100, 0, barraW), barraH);
    }
  }

  colherFruto() {
    this.temFruto = false;
    this.ultimaColheita = millis();
  }
}

// Classe base para todos os itens
class Item {
  constructor(nome, tipo, emoji = '❓') {
    this.nome = nome;
    this.tipo = tipo; // Ex: 'semente', 'ferramenta', 'consumivel', 'fruto'
    this.emoji = emoji;
  }
}

// Classe para Sementes (herda de Item)
class Semente extends Item {
  constructor(nome, emojiPlanta) {
    super(nome, 'semente', '🌰'); // Emoji padrão para semente
    this.emojiPlanta = emojiPlanta; // Emoji da planta que vai nascer
  }
}

// Classe para Ferramentas (herda de Item)
class Pazinha extends Item {
  constructor() {
    super('Pá', 'ferramenta', '⛏️'); // Emoji de pá
  }
}

// Classe para Fertilizante (herda de Item)
class Fertilizante extends Item {
  constructor() {
    super('Fertilizante', 'fertilizante', '💩'); // Emoji de fertilizante
  }
}

// Representa um fruto
class Fruto extends Item {
  constructor(nome, emoji) {
    super(nome, 'fruto', emoji);
  }
}

// Classe do Inventário
class Inventario {
  constructor(capacidade) {
    this.slots = Array(capacidade).fill(null); // Array de slots
    this.slotSelecionado = 0; // Índice do slot atualmente selecionado
    this.capacidade = capacidade;
  }

  adicionarItem(item) {
    for (let i = 0; i < this.capacidade; i++) {
      if (this.slots[i] === null) {
        this.slots[i] = item;
        console.log(`Item "${item.nome}" adicionado ao inventário.`);
        return true;
      }
    }
    console.log("Inventário cheio!");
    return false;
  }

  removerItem(item) {
    for (let i = 0; i < this.capacidade; i++) {
      if (this.slots[i] === item) {
        this.slots[i] = null;
        console.log(`Item "${item.nome}" removido do inventário.`);
        return true;
      }
    }
    return false;
  }

  // Novo método para remover o primeiro fruto encontrado
  removerPrimeiroFruto() {
    for (let i = 0; i < this.capacidade; i++) {
      if (this.slots[i] && this.slots[i].tipo === 'fruto') {
        this.slots[i] = null;
        console.log("Um fruto foi removido do inventário.");
        return true;
      }
    }
    return false;
  }

  getSlotSelecionado() {
    return this.slots[this.slotSelecionado];
  }

  selecionarSlot(index) {
    if (index >= 0 && index < this.capacidade) {
      this.slotSelecionado = index;
      console.log(`Slot ${index + 1} selecionado.`);
    }
  }

  mostrar(x, y) {
    let slotSize = 40;
    let spacing = 5;
    textSize(24);
    fill(0); // Cor do texto

    for (let i = 0; i < this.capacidade; i++) {
      let slotX = x + (slotSize + spacing) * i;
      let slotY = y;

      // Desenha o fundo do slot
      noFill();
      stroke(0);
      if (i === this.slotSelecionado) {
        stroke(255, 200, 0); // Borda amarela para slot selecionado
        strokeWeight(3);
      } else {
        stroke(100);
        strokeWeight(1);
      }
      rect(slotX, slotY, slotSize, slotSize);

      // Desenha o item dentro do slot
      let item = this.slots[i];
      if (item) {
        text(item.emoji, slotX + slotSize / 2, slotY + slotSize / 2);
      }
      // Desenha o número do slot
      textSize(12);
      fill(0);
      text(i + 1, slotX + slotSize - 10, slotY + slotSize - 5);
    }
  }
}

// ===================================
// NOVA CLASSE PARA A LOJA (MANTIDA DO SEU CÓDIGO)
// ===================================
class Loja {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = '🏪'; // Emoji da loja
    this.itensAVenda = []; // Array de itens que a loja vende
    this.aberta = false; // Estado da loja (aberta/fechada)
    this.itemSelecionadoLoja = null; // Item selecionado na loja
    this.xOffset = 100; // Offset para o texto da loja
    this.yOffset = 100; // Offset para o texto da loja
  }

  // Adiciona itens que a loja vai vender
  adicionarItem(item, preco) {
    this.itensAVenda.push({
      item: item,
      preco: preco
    });
  }

  // Mostra a loja e seus itens
  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);

    if (this.aberta) {
      fill(255, 255, 220); // Fundo da janela da loja
      stroke(0);
      rect(this.x - this.xOffset, this.y - this.yOffset, 200, 200, 10);

      fill(0);
      textSize(18);
      text("Loja de Sementes", this.x, this.y - this.yOffset + 20);

      let startY = this.y - this.yOffset + 60;
      let lineHeight = 25;

      textSize(16);
      for (let i = 0; i < this.itensAVenda.length; i++) {
        let produto = this.itensAVenda[i];
        let display = `${i + 1}. ${produto.item.emoji} ${produto.item.nome} - R$ ${produto.preco.toFixed(2)}`;

        // Destaca o item selecionado na loja
        if (this.itemSelecionadoLoja === produto.item) {
          fill(0, 100, 200); // Azul para o item selecionado
        } else {
          fill(0);
        }
        text(display, this.x, startY + i * lineHeight);
      }
      fill(0);
      textSize(14);
      text("Pressione 'C' para comprar", this.x, startY + this.itensAVenda.length * lineHeight + 20);
      text("Pressione 'X' para sair", this.x, startY + this.itensAVenda.length * lineHeight + 40);
      text("Use as setas UP/DOWN para navegar", this.x, startY + this.itensAVenda.length * lineHeight + 60);

    }
  }

  // Abre/fecha a loja
  toggleLoja() {
    this.aberta = !this.aberta;
    if (this.aberta) {
      this.itemSelecionadoLoja = this.itensAVenda.length > 0 ? this.itensAVenda[0].item : null; // Seleciona o primeiro item ao abrir
    }
  }

  // Seleciona o próximo item na loja
  selecionarProximoItem() {
    if (!this.aberta || this.itensAVenda.length === 0) return;
    let currentIndex = this.itensAVenda.findIndex(p => p.item === this.itemSelecionadoLoja);
    currentIndex = (currentIndex + 1) % this.itensAVenda.length;
    this.itemSelecionadoLoja = this.itensAVenda[currentIndex].item;
  }

  // Seleciona o item anterior na loja
  selecionarItemAnterior() {
    if (!this.aberta || this.itensAVenda.length === 0) return;
    let currentIndex = this.itensAVenda.findIndex(p => p.item === this.itemSelecionadoLoja);
    currentIndex = (currentIndex - 1 + this.itensAVenda.length) % this.itensAVenda.length;
    this.itemSelecionadoLoja = this.itensAVenda[currentIndex].item;
  }

  // Lógica de compra
  comprarItem(jardineiro) {
    if (!this.aberta || !this.itemSelecionadoLoja) return;

    let produtoParaComprar = this.itensAVenda.find(p => p.item === this.itemSelecionadoLoja);

    if (produtoParaComprar) {
      // Nota: 'jardineiro.dinheiro' não existe na classe Jardineiro que você forneceu.
      // Você está usando a variável global 'dinheiro'.
      // Para o código funcionar, você precisará ajustar para 'dinheiro' ou adicionar 'this.dinheiro' ao Jardineiro.
      // Assumindo que 'dinheiro' é global como no restante do seu código:
      if (dinheiro >= produtoParaComprar.preco) {
        if (jardineiro.inventario.adicionarItem(produtoParaComprar.item)) {
          dinheiro -= produtoParaComprar.preco; // Usa a variável global 'dinheiro'
          console.log(`Você comprou ${produtoParaComprar.item.nome} por R$ ${produtoParaComprar.preco.toFixed(2)}.`);
        } else {
          console.log("Inventário cheio! Não é possível comprar.");
        }
      } else {
        console.log("Dinheiro insuficiente!");
      }
    }
  }
}
// ===================================
// FIM NOVA CLASSE PARA A LOJA
// ===================================


// --- NOVO CÓDIGO: CLASSE POÇO DE ÁGUA ---
// ===================================
// NOVA CLASSE PARA O POÇO DE ÁGUA
// ===================================
class PocoDeAgua {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = '💧'; // Emoji de uma gota ou poço
    this.alcanceInteracao = 80; // Distância para o jardineiro interagir com o poço
  }

  // Método para mostrar o poço na tela
  mostrar() {
    textSize(40); // Tamanho maior para o emoji do poço
    text(this.emoji, this.x, this.y);
    // Opcional: Desenhar um círculo ou outra forma para o poço
    noFill();
    stroke(0, 100, 200, 150); // Azul semi-transparente
    strokeWeight(2);
    ellipse(this.x, this.y, 60); // Desenha um círculo ao redor do poço
  }

  // Método para verificar se o jardineiro está perto do poço
  estaPerto(jardineiro) {
    let distancia = dist(jardineiro.x, jardineiro.y, this.x, this.y);
    return distancia < this.alcanceInteracao;
  }
}
// ===================================
// FIM NOVA CLASSE POÇO DE ÁGUA
// ===================================
