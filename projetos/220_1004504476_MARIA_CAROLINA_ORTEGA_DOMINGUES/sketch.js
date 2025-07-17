//OIEEE SÒ VIM AQUI PRA LEMBRAR QUE TODOS OS COMENTARIOS MENOS ESSE EU PEDI PARA A IA GEMINI POIS EU JA AVIA TERMINADO O CODIGO E VI QUE PRECISAVA DE COMENTARIOS ENTÃO PEDI AJUDA PARA O GEMINI❤️

// Variáveis globais essenciais para o estado e elementos visuais do jogo
let terrenoX, terrenoY, terrenoLargura, terrenoAltura;
let corTerreno;
let plantas = []; // Armazena todas as plantas da horta
let asiloX, asiloY, asiloLargura, asiloAltura;
let corAsilo;
let idosos = []; // Armazena os idosos interagindo no jogo
const MAX_IDOSOS = 8; // Limite de idosos
const TAMANHO_IDOSO_VISUAL = 40;

// Variáveis de controle de estado e tempo
let estadoAtual = -2; // Controla o fluxo do jogo (introdução, limpeza, plantio, etc.)
let tempoInicioEstado; // Para gerenciar a duração de cada estado
const DURACAO_INTRO_PERSONALIZADA = 15000; // Duração da primeira introdução
const DURACAO_HISTORIA = 9000; // Duração da cena de história

// Variáveis para a fase de limpeza do terreno
let lixo = []; // Armazena os itens de lixo
const NUM_LIXO_INICIAL = 10; // Quantidade de lixo no início
let lixoRestante; // Contador de lixo a ser removido

// Variáveis para interação com o asilo
let mostrarPerguntaAsilo = false; // Flag para exibir a caixa de diálogo da porta do asilo
let portaX, portaY, portaLargura, portaAltura;

function setup() {
  createCanvas(900, 650);

  // Define as dimensões e posições iniciais dos elementos
  terrenoLargura = width * 0.6;
  terrenoAltura = height * 0.4;
  terrenoX = (width - terrenoLargura) / 2 + 100;
  terrenoY = (height - terrenoAltura) / 2 + 100;
  corTerreno = color(100, 70, 30);

  asiloLargura = width * 0.3;
  asiloAltura = height * 0.4;
  asiloX = width * 0.1;
  asiloY = height * 0.3;
  corAsilo = color(200, 200, 200);

  portaX = asiloX + asiloLargura / 2 - 20;
  portaY = asiloY + asiloAltura - 80;
  portaLargura = 40;
  portaAltura = 80;

  // Inicializa o lixo e o contador
  for (let i = 0; i < NUM_LIXO_INICIAL; i++) {
    lixo.push(new Lixo());
  }
  lixoRestante = NUM_LIXO_INICIAL;

  tempoInicioEstado = millis(); // Registra o tempo de início do estado atual

  // Adiciona idosos iniciais no terreno
  for (let i = 0; i < Math.min(5, MAX_IDOSOS); i++) {
    adicionarIdoso();
  }
}

function draw() {
  background(173, 216, 230);

  // Lógica principal de controle de estados do jogo
  if (estadoAtual === -2) { // Estado de introdução personalizada
    background(0);
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text("Imagine um terreno sujo e largado...", width / 2, height / 2 - 60);
    text("Talvez o dono não o use mais.", width / 2, height / 2 - 20);
    text("Então, ele conversa com o prefeito e cede o local", width / 2, height / 2 + 40);
    text("para se transformar em uma bela horta.", width / 2, height / 2 + 80);
    text("Um lugar onde pessoas em um asilo podem se reunir", width / 2, height / 2 + 120);
    text("e plantarem flores e verduras, enchendo de vida e alegria! hehe:D", width / 2, height / 2 + 160);
    // Transição para o próximo estado após a duração definida
    if (millis() - tempoInicioEstado > DURACAO_INTRO_PERSONALIZADA) {
      estadoAtual = -1;
      tempoInicioEstado = millis();
    }
  } else if (estadoAtual === -1) { // Estado de história
    fill(50, 50, 50);
    rect(0, 0, width, height);
    fill(255);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Em um mundo cheio de desafios...", width / 2, height / 2 - 80);
    textSize(24);
    text("Muitas vezes, esquecemos de quem mais precisa. 👴", width / 2, height / 2 - 20);
    text("Mas uma pequena ideia pode mostrar grandes realidades! ", width / 2, height / 2 + 40);
    // Transição para a fase de limpeza após a duração definida
    if (millis() - tempoInicioEstado > DURACAO_HISTORIA) {
      estadoAtual = 0;
      tempoInicioEstado = millis();
    }
  } else if (estadoAtual === 0) { // Estado de limpar o terreno
    fill(144, 238, 144);
    rect(0, asiloY + asiloAltura / 2, width, height - (asiloY + asiloAltura / 2));
    desenharAsilo();
    desenharTerrenoSujo(); // Desenha o terreno com os itens de lixo
    fill(0);
    textSize(28);
    textAlign(CENTER, TOP);
    text("Limpe o Terreno! Lixo Restante: " + lixoRestante + " 🗑️", width / 2, 20); // Exibe o lixo restante
    textSize(18);
    text("Clique no lixo para removê-lo e preparar a horta!", width / 2, 60);
    // Transição para a fase de plantio quando todo o lixo é removido
    if (lixoRestante <= 0) {
      estadoAtual = 1;
    }
  } else if (estadoAtual === 1) { // Estado de plantar
    fill(144, 238, 144);
    rect(0, asiloY + asiloAltura / 2, width, height - (asiloY + asiloAltura / 2));
    desenharAsilo();
    fill(corTerreno);
    rect(terrenoX, terrenoY, terrenoLargura, terrenoAltura);
    // Desenha todas as plantas e idosos no terreno
    for (let i = 0; i < plantas.length; i++) {
      plantas[i].desenhar();
    }
    for (let i = 0; i < idosos.length; i++) {
      idosos[i].desenhar();
    }
    desenharPersonagens(); // Desenha os personagens informativos
    fill(0);
    textSize(28);
    textAlign(CENTER, TOP);
    text("A Horta da Felicidade: Um Sonho que Virou Realidade! :D", width / 2, 20);
    textSize(18);
    text("Clique no terreno para plantar! Plantas: " + plantas.length + "/25 🌷", width / 2, 60); // Exibe o progresso do plantio
    // Exibe o popup de pergunta do asilo se a flag estiver ativa
    if (mostrarPerguntaAsilo) {
      fill(255, 255, 200, 220);
      rect(width / 2 - 150, height / 2 - 50, 300, 150, 10);
      fill(0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("Aqui é o asilo. Deseja entrar?", width / 2, height / 2 - 10);
      fill(100, 200, 100);
      rect(width / 2 - 100, height / 2 + 30, 80, 40, 5);
      fill(255);
      textSize(18);
      text("Sim", width / 2 - 60, height / 2 + 50);
      fill(200, 100, 100);
      rect(width / 2 + 20, height / 2 + 30, 80, 40, 5);
      textSize(18);
      text("Não", width / 2 + 60, height / 2 + 50);
    }
    // Transição para o estado final de parabéns quando 25 plantas são atingidas
    if (plantas.length >= 25) {
      estadoAtual = 2;
      tempoInicioEstado = millis();
    }
  } else if (estadoAtual === 2) { // Estado de parabéns/final do jogo
    background(255, 255, 200);
    fill(50, 150, 50);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("PARABÉNS POR AJUDAR!", width / 2, height / 2 - 50);
    textSize(28);
    fill(0);
    text("Você plantou 25 sementes de alegria parabéns;D", width / 2, height / 2 + 20);
    text("Sua bondade ilumina o caminho daqueles que mais precisam", width / 2, height / 2 + 70);
    text("transformando o asilo em um lar aquecido pelo seu coração.", width / 2, height / 2 + 95);
    // Efeito visual de "partículas de alegria"
    for (let i = 0; i < 15; i++) {
      fill(random(255), random(255), random(255), 150);
      ellipse(random(width), random(height), 10, 10);
    }
  } else if (estadoAtual === 3) { // Estado dentro do asilo
    background(100, 100, 150);
    fill(50, 50, 50);
    rect(width * 0.1, height * 0.1, width * 0.8, height * 0.7);
    fill(150, 200, 255);
    ellipse(width / 2, height / 2 + 50, 100, 60);
    fill(100, 150, 200);
    rect(width / 2 - 10, height / 2 - 10, 20, 60);
    fill(150, 200, 255);
    ellipse(width / 2, height / 2 - 10, 40, 40);
    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text("Bem-vindo ao Asilo da Felicidade!", width / 2, 50);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Aqui eles ficam descansando depois", width / 2, height / 2 - 120);
    text("de um longo dia, essa é a uma fonte de água ", width / 2, height / 2 - 80);
    fill(200, 100, 100);
    rect(width / 2 - 70, height * 0.9 - 30, 140, 50, 10);
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text("Sair do Asilo", width / 2, height * 0.9 - 5);
  }
}

class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = random(10, 25);
    this.corFolha = color(random(50, 150), random(100, 200), random(50, 100));
    this.corFlor = color(random(200, 255), random(50, 150), random(50, 200));
  }

  desenhar() {
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.tamanho / 2); // Tronco
    noStroke();
    fill(this.corFolha);
    ellipse(this.x - this.tamanho / 4, this.y + this.tamanho / 4, this.tamanho / 2, this.tamanho / 3); // Folhas
    ellipse(this.x + this.tamanho / 4, this.y + this.tamanho / 4, this.tamanho / 2, this.tamanho / 3);
    fill(this.corFlor);
    ellipse(this.x, this.y, this.tamanho / 2, this.tamanho / 2); // Flor
  }
}

function adicionarPlanta() {
  let x = random(terrenoX + 10, terrenoX + terrenoLargura - 10);
  let y = random(terrenoY + 10, terrenoY + terrenoAltura - 10);
  plantas.push(new Planta(x, y)); // Adiciona uma nova planta à lista
}

class Idoso {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanhoCorpo = TAMANHO_IDOSO_VISUAL;
    this.tamanhoCabeca = 20;
    this.corPele = color(255, 220, 180);
    this.corCabelo = color(180, 180, 180);
    this.corRoupa = color(random(100, 200), random(100, 200), random(100, 200));
  }

  desenhar() {
    fill(this.corRoupa);
    rect(this.x - this.tamanhoCorpo / 4, this.y - this.tamanhoCorpo, this.tamanhoCorpo / 2, this.tamanhoCorpo);
    fill(this.corPele);
    ellipse(this.x, this.y - this.tamanhoCorpo - this.tamanhoCabeca / 2, this.tamanhoCabeca);
    fill(this.corCabelo);
    ellipse(this.x, this.y - this.tamanhoCorpo - this.tamanhoCabeca / 2, this.tamanhoCabeca * 1.1, this.tamanhoCabeca * 0.8);
    fill(0);
    ellipse(this.x - 4, this.y - this.tamanhoCorpo - this.tamanhoCabeca / 2 - 2, 3);
    ellipse(this.x + 4, this.y - this.tamanhoCorpo - this.tamanhoCabeca / 2 - 2, 3);
    noFill();
    stroke(0);
    arc(this.x, this.y - this.tamanhoCorpo - this.tamanhoCabeca / 2 + 5, 8, 5, 0, PI);
    stroke(this.corRoupa);
    strokeWeight(4);
    line(this.x - this.tamanhoCorpo / 4, this.y - this.tamanhoCorpo * 0.7, this.x - this.tamanhoCorpo / 2, this.y - this.tamanhoCorpo * 0.5);
    line(this.x + this.tamanhoCorpo / 4, this.y - this.tamanhoCorpo * 0.7, this.x + this.tamanhoCorpo / 2, this.y - this.tamanhoCorpo * 0.5);
    line(this.x - this.tamanhoCorpo / 8, this.y, this.x - this.tamanhoCorpo / 8, this.y + this.tamanhoCorpo / 4);
    line(this.x + this.tamanhoCorpo / 8, this.y, this.x + this.tamanhoCorpo / 8, this.y + this.tamanhoCorpo / 4);
  }
}

function adicionarIdoso() {
  // Adiciona um idoso apenas se o limite MAX_IDOSOS não foi atingido
  if (idosos.length < MAX_IDOSOS) {
    let novoIdosoX, novoIdosoY;
    let sobreposto;
    let tentativas = 0;
    const MARGEM_SEGURANCA = 20;

    // Tenta encontrar uma posição que não se sobreponha a outros idosos
    do {
      sobreposto = false;
      novoIdosoX = random(terrenoX + 30, terrenoX + terrenoLargura - 30);
      novoIdosoY = random(terrenoY + terrenoAltura - 50, terrenoY + terrenoAltura - 20);

      for (let i = 0; i < idosos.length; i++) {
        let d = dist(novoIdosoX, novoIdosoY, idosos[i].x, idosos[i].y);
        if (d < TAMANHO_IDOSO_VISUAL + MARGEM_SEGURANCA) {
          sobreposto = true;
          break;
        }
      }
      tentativas++;
    } while (sobreposto && tentativas < 100); // Limita as tentativas para evitar loop infinito

    if (!sobreposto) {
      idosos.push(new Idoso(novoIdosoX, novoIdosoY)); // Adiciona se não houver sobreposição
    } else {
      console.log("você só pode adicionar essa quantidade de idosos.");
    }
  }
}

function desenharAsilo() {
  fill(corAsilo);
  rect(asiloX, asiloY, asiloLargura, asiloAltura); // Corpo do asilo

  fill(150, 50, 50);
  triangle(asiloX, asiloY, asiloX + asiloLargura, asiloY, asiloX + asiloLargura / 2, asiloY - asiloAltura * 0.3); // Telhado

  fill(150, 200, 255);
  rect(asiloX + 20, asiloY + 30, 40, 40); // Janelas
  rect(asiloX + asiloLargura - 60, asiloY + 30, 40, 40);
  rect(asiloX + 20, asiloY + asiloAltura - 70, 40, 40);
  rect(asiloX + asiloLargura - 60, asiloY + asiloAltura - 70, 40, 40);

  fill(100, 50, 0);
  rect(portaX, portaY, portaLargura, portaAltura); // Porta
}

function desenharTerrenoSujo() {
  fill(50, 30, 10);
  rect(terrenoX, terrenoY, terrenoLargura, terrenoAltura);

  // Desenha cada item de lixo ativo
  for (let i = 0; i < lixo.length; i++) {
    lixo[i].desenhar();
  }
}

class Lixo {
  constructor() {
    this.x = random(terrenoX + 5, terrenoX + terrenoLargura - 5);
    this.y = random(terrenoY + 5, terrenoY + terrenoAltura - 5);
    this.tamanho = random(5, 15);
    this.cor = color(random(50, 150));
    this.forma = floor(random(3)); // 0: quadrado, 1: círculo, 2: triângulo
    this.ativo = true; // Indica se o lixo ainda está visível e pode ser removido
  }

  desenhar() {
    if (this.ativo) {
      fill(this.cor);
      if (this.forma === 0) {
        rect(this.x, this.y, this.tamanho, this.tamanho);
      } else if (this.forma === 1) {
        ellipse(this.x, this.y, this.tamanho);
      } else {
        triangle(this.x, this.y, this.x + this.tamanho, this.y, this.x + this.tamanho / 2, this.y + this.tamanho);
      }
    }
  }

  estaSobre(mx, my) {
    if (!this.ativo) return false;
    // Lógica para verificar se o clique está sobre o item de lixo, baseada em sua forma
    if (this.forma === 0) {
      return mx > this.x && mx < this.x + this.tamanho && my > this.y && my < this.y + this.tamanho;
    } else if (this.forma === 1) {
      let d = dist(mx, my, this.x, this.y);
      return d < this.tamanho / 2;
    } else {
      return mx > this.x && mx < this.x + this.tamanho && my > this.y && my < this.y + this.tamanho;
    }
  }
}

function desenharPersonagens() {
  fill(0, 0, 150);
  rect(width * 0.1, height * 0.85, 80, 80);
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Prefeitura", width * 0.1 + 40, height * 0.85 + 40);

  fill(150, 0, 0);
  rect(width * 0.8, height * 0.85, 80, 80);
  fill(255);
  textSize(14);
  text("O Parceiro / Asilo", width * 0.8 + 40, height * 0.85 + 40);

  stroke(0);
  strokeWeight(3);
  line(width * 0.1 + 80, height * 0.85 + 40, width * 0.8, height * 0.85 + 40);
  triangle(width * 0.8 - 10, height * 0.85 + 30, width * 0.8, height * 0.85 + 40, width * 0.8 - 10, height * 0.85 + 50);
}

// Esta função não é utilizada no fluxo principal do jogo, mas faz parte do código original
function desenharPersonagensEstadoInicial() {
  fill(0, 0, 150);
  rect(width * 0.1, height * 0.85, 80, 80);
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("O Governo", width * 0.1 + 40, height * 0.85 + 40);

  fill(150, 0, 0);
  rect(width * 0.8, height * 0.85, 80, 80);
  fill(255);
  textSize(14);
  text("O Parceiro", width * 0.8 + 40, height * 0.85 + 40);
}

function mousePressed() {
  if (estadoAtual === 0) { // Lógica de clique para a fase de "Limpar o Terreno"
    // Itera sobre o lixo de trás para frente para garantir que cliques em itens sobrepostos funcionem corretamente
    for (let i = lixo.length - 1; i >= 0; i--) {
      if (lixo[i].ativo && lixo[i].estaSobre(mouseX, mouseY)) {
        lixo[i].ativo = false; // "Remove" o item de lixo clicado
        lixoRestante--; // Atualiza o contador de lixo
        break; // Sai do loop para processar apenas um clique por vez
      }
    }
  } else if (estadoAtual === 1) { // Lógica de clique para a fase de "Plantar"
    if (mostrarPerguntaAsilo) { // Se a pergunta "Deseja entrar no asilo?" estiver visível
      // Verifica clique no botão "Sim"
      if (mouseX > width / 2 - 100 && mouseX < width / 2 - 20 &&
        mouseY > height / 2 + 30 && mouseY < height / 2 + 70) {
        estadoAtual = 3; // Muda para o estado "Dentro do Asilo"
        mostrarPerguntaAsilo = false;
      }
      // Verifica clique no botão "Não"
      else if (mouseX > width / 2 + 20 && mouseX < width / 2 + 100 &&
        mouseY > height / 2 + 30 && mouseY < height / 2 + 70) {
        mostrarPerguntaAsilo = false; // Fecha a pergunta
      }
    } else { // Se a pergunta do asilo não estiver visível
      // Verifica clique no terreno para adicionar uma planta
      if (mouseX > terrenoX && mouseX < terrenoX + terrenoLargura &&
        mouseY > terrenoY && mouseY < terrenoY + terrenoAltura) {
        adicionarPlanta(); // Adiciona uma planta
      }
      // Verifica clique na porta do asilo para exibir a pergunta
      else if (mouseX > portaX && mouseX < portaX + portaLargura &&
        mouseY > portaY && mouseY < portaY + portaAltura) {
        mostrarPerguntaAsilo = true;
      }
    }
  } else if (estadoAtual === 3) { // Lógica de clique para o estado "Dentro do Asilo"
    // Verifica clique no botão "Sair do Asilo"
    if (mouseX > width / 2 - 70 && mouseX < width / 2 + 70 &&
      mouseY > height * 0.9 - 30 && mouseY < height * 0.9 + 20) {
      estadoAtual = 1; // Retorna para a fase de plantio
    }
  }
}