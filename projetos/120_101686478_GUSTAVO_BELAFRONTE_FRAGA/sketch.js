let larguraTela = 800;
let alturaTela = 400;
let estadoJogo = 'instrucoes'; // Estados: 'instrucoes', 'jogando', 'fimdejogo'
let pontuacao = 0;

let plantacao = [];
let cidade = [];
let caminhao;

let tempoCrescimentoMax = 1800; // 30 segundos * 60 frames/segundo
let numTomatesInicial = 16;
let numPredios = 5;

class Tomate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diametro = 20;
    this.estagio = 0; // 0: plantado (verde), 1: quase maduro (amarelo), 2: maduro (vermelho)
    this.tempoCrescendo = 0;
    this.tempoCrescimentoMax = floor(random(tempoCrescimentoMax * 0.6, tempoCrescimentoMax));
  }

  crescer() {
    if (this.estagio < 2) {
      this.tempoCrescendo++;
      if (this.tempoCrescendo >= this.tempoCrescimentoMax) {
        this.estagio = 2;
      } else if (this.tempoCrescendo > this.tempoCrescimentoMax / 2) {
        this.estagio = 1;
      }
    }
  }

  mostrar() {
    noStroke();
    if (this.estagio === 2) {
      fill(255, 0, 0); // Vermelho para maduro
      textSize(12);
      textAlign(CENTER);
      text("Colha!", this.x, this.y - 15);
      ellipse(this.x, this.y, this.diametro, this.diametro);
    } else if (this.estagio === 1) {
      fill(255, 255, 0); // Amarelo quase maduro
      ellipse(this.x, this.y, this.diametro * 0.85, this.diametro * 0.85);
    } else {
      fill(0, 255, 0); // Verde plantado
      ellipse(this.x, this.y, this.diametro * 0.6, this.diametro * 0.6);
    }
  }
}

class Caminhao {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.largura = 60;
    this.altura = 30;
    this.velocidade = 3;
    this.carga = 0;
    this.capacidade = 8;
    this.cheio = false;
  }

  mover() {
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
    this.x = constrain(this.x, 0, larguraTela - this.largura);
    this.y = constrain(this.y, 0, alturaTela - this.altura);

    if (this.carga >= this.capacidade && !this.cheio) {
      this.cheio = true;
    } else if (this.carga < this.capacidade && this.cheio) {
      this.cheio = false;
    }
  }

  mostrar() {
    fill(100);
    rect(this.x, this.y, this.largura, this.altura);
    fill(50);
    ellipse(this.x + 15, this.y + this.altura, 20, 20);
    ellipse(this.x + this.largura - 15, this.y + this.altura, 20, 20);
    fill(200);
    rect(this.x + 10, this.y - 10, this.largura - 20, 10); // Cabine

    if (this.cheio) {
      fill(255, 0, 0);
      textSize(12);
      textAlign(CENTER);
      text("Descarregue!", this.x + this.largura / 2, this.y - 20);
    }
  }

  carregar(tomate) {
    if (this.carga < this.capacidade) {
      this.carga++;
      return true;
    }
    return false;
  }

  descarregarTudo() {
    if (this.carga > 0) {
      let tomatesDescarregados = this.carga;
      this.carga = 0;
      this.cheio = false;
      return tomatesDescarregados;
    }
    return 0;
  }
}

class Predio {
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.cor = color(random(150, 200));
  }

  mostrar() {
    fill(this.cor);
    rect(this.x, this.y, this.largura, this.altura);
  }
}

function setup() {
  createCanvas(larguraTela, alturaTela);
  caminhao = new Caminhao(50, alturaTela / 2 - 15);

  // Inicializar plantação
  for (let i = 0; i < numTomatesInicial; i++) {
    plantacao.push(new Tomate(random(100, 300), random(50, alturaTela - 50)));
  }

  // Inicializar cidade
  for (let i = 0; i < numPredios; i++) {
    let larguraPredio = random(50, 80);
    let alturaPredio = random(50, 150);
    let xPredio = larguraTela - 150 + i * (larguraPredio + 20);
    let yPredio = alturaTela - alturaPredio - 179;
    cidade.push(new Predio(xPredio, yPredio, larguraPredio, alturaPredio));
  }
}

function draw() {
  background(0, 150, 0); // Fundo verde

  if (estadoJogo === 'instrucoes') {
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("INSTRUÇÕES:", larguraTela / 2, alturaTela / 2 - 90);
    textSize(16);
    text("Aperte o play, clique na tela e espere o tomate madurar.\nColha os tomates com o caminhão utilizando as setas para se mover,\ne clicando com o mouse em cima do caminhão quando ele estiver\nem cima dos tomates para conseguir colher.\nQuando o caminhão estiver cheio, leve-o até a cidade e clique em cima do caminhão.\nPara descarregar, e volte a colher.", larguraTela / 2, alturaTela / 2);
    textSize(18);
    text("Pressione qualquer tecla para começar!", larguraTela / 2, alturaTela - 50);
  } else if (estadoJogo === 'jogando') {
    // Desenhar a estrada
    fill(100); // Cor da estrada (cinza)
    rect(300, alturaTela / 2 - 20, larguraTela - 400, 40);
    fill(255, 255, 0); // Faixas amarelas
    for (let i = 0; i < larguraTela - 400; i += 50) {
      rect(320 + i, alturaTela / 2 - 5, 30, 10);
    }

    // Desenhar plantação
    fill(101, 67, 33); // Marrom para o solo
    rect(50, 50, 250, alturaTela - 100);
    for (let tomate of plantacao) {
      tomate.crescer();
      tomate.mostrar();
    }

    // Desenhar cidade
    for (let predio of cidade) {
      predio.mostrar();
    }

    // Desenhar caminhão
    caminhao.mover();
    caminhao.mostrar();

    // Interface
    fill(0);
    textSize(16);
    text(`Carga: ${caminhao.carga}/${caminhao.capacidade}`, 80, 20);
   


    // Lógica de carregamento (enquanto o mouse está pressionado)
    if (mouseIsPressed && mouseX > 50 && mouseX < 300 && mouseY > 50 && mouseY < alturaTela - 50) {
      for (let i = plantacao.length - 1; i >= 0; i--) {
        let tomate = plantacao[i];
        if (tomate.estagio === 2 && dist(caminhao.x + caminhao.largura / 2, caminhao.y + caminhao.altura / 2, tomate.x, tomate.y) < tomate.diametro / 2 + caminhao.largura / 2 && caminhao.carregar(tomate)) {
          plantacao.splice(i, 1);
          break;
        }
      }
    }

    // Verifica a condição de "Fim de Jogo"
    if (plantacao.length === 0 && caminhao.carga === 0) {
      estadoJogo = 'fimdejogo';
    }

  } else if (estadoJogo === 'fimdejogo') {
    fill(0, 0, 0, 150); // Overlay escuro para destacar a mensagem
    rect(0, 0, larguraTela, alturaTela);

    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("FIM DE JOGO!", larguraTela / 2, alturaTela / 2 - 50);
    textSize(18);
    text("Parabéns! Você conseguiu colher todos os tomates do campo\ne levá-los para a cidade.\nEste jogo serve para destacar a conexão entre o campo e a cidade!", larguraTela / 2, alturaTela / 2 + 20);
    textSize(16);
    text("Você completou a missão. A cidade precisa dos alimentos produzidos no campo.", larguraTela / 2, alturaTela / 2 + 100);
  }
}

function mousePressed() {
  if (estadoJogo === 'jogando') {
    // Lógica de descarregamento: um clique descarrega todos os tomates e adiciona 1 ponto
    // Verifica se o clique está dentro da área da cidade
    let inCityArea = false;
    for (let predio of cidade) {
      if (mouseX > predio.x && mouseX < predio.x + predio.largura && mouseY > predio.y && mouseY < predio.y + predio.altura) {
        inCityArea = true;
        break;
      }
    }

    // Verifica se o caminhão está na área da cidade
    let truckInCityArea = (caminhao.x + caminhao.largura / 2 > larguraTela - 150 && caminhao.x + caminhao.largura / 2 < larguraTela &&
      caminhao.y + caminhao.altura / 2 > 0 && caminhao.y + caminhao.altura / 2 < alturaTela);


    if (inCityArea && truckInCityArea && caminhao.cheio) {
      if (caminhao.descarregarTudo() > 0) { // Verifica se algum tomate foi descarregado
        pontuacao++;
      }
    }
  }
}

function keyPressed() {
  if (estadoJogo === 'instrucoes') {
    estadoJogo = 'jogando'; // Inicia o jogo quando qualquer tecla é pressionada
  }
}