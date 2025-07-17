// Variáveis do jogo
let tempoRestante = 60;
let arvoresPlantadas = 0;
let objetivo = 20;
let arvores = [];
let jogoIniciado = false;
let carroX = -100;
let velocidadeCarro = 3;
let nuvens = [];
let velocidadeNuvens = 0.5;
let estado = 0; // 0: diálogo inicial, 1: jogo, 2: fim de jogo

// Cores das casas
let coresCasas = [
  { base: [255, 200, 200], janelas: [[255, 220, 220], [255, 200, 200]] },
  { base: [200, 255, 200], janelas: [[220, 255, 210], [200, 255, 190]] },
  { base: [200, 200, 255], janelas: [[230, 230, 255], [210, 210, 255]] },
  { base: [255, 255, 200], janelas: [[255, 255, 220], [255, 255, 180]] }
];

// Dados das casas (aumentadas e melhor posicionadas)
let casas = [
  { x: 100, y: 300, largura: 120, altura: 150, corIndex: 0 },
  { x: 300, y: 280, largura: 150, altura: 170, corIndex: 1 },
  { x: 550, y: 300, largura: 130, altura: 160, corIndex: 2 }
];

// Cores das árvores
let corArvoreCopa = [34, 139, 34];
let corArvoreTronco = [101, 67, 33];
let corGrama = [50, 205, 50];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  frameRate(60);

  // Inicializar nuvens
  for (let i = 0; i < 5; i++) {
    nuvens.push({
      x: random(width),
      y: random(50, 150),
      tamanho: random(30, 80),
      velocidade: random(0.3, 0.7)
    });
  }
}

function draw() {
  background(135, 206, 235);

  if (estado === 0) {
    mostrarDialogoInicial();
  } else if (estado === 1) {
    if (!jogoIniciado) {
      mostrarTelaInicial();
    } else {
      desenharCenario();
      atualizarJogo();
    }
  } else if (estado === 2) {
    mostrarTelaFinal();
  }
}

function mostrarDialogoInicial() {
  fill(0);
  textSize(24);
  text("Olá! Eu sou o Fábricio!", width/2, height/2 - 100);
  textSize(20);
  text("As árvores são essenciais para o nosso planeta!", width/2, height/2 - 50);
  text("Elas produzem oxigênio, absorvem CO2 e ajudam a combater o aquecimento global.", width/2, height/2);
  text("Além disso, trazem beleza para as cidades e abrigam muitos animais.", width/2, height/2 + 50);
  textSize(18);
  text("Clique para começar a plantar árvores e ajudar o meio ambiente!", width/2, height/2 + 100);
}

function mostrarTelaInicial() {
  fill(0);
  textSize(24);
  text("Plante árvores para melhorar o oxigênio!", width/2, height/2 - 50);
  textSize(20);
  text("Clique para começar a plantar!", width/2, height/2 + 50);
}

function mostrarTelaFinal() {
  fill(0);
  textSize(32);
  if (arvoresPlantadas >= objetivo) {
    text("PARABÉNS!", width/2, height/2 - 50);
    textSize(24);
    text("Você plantou todas as árvores!", width/2, height/2);
  } else {
    text("TEMPO ESGOTADO!", width/2, height/2 - 50);
    textSize(24);
    text(`Você plantou ${arvoresPlantadas} de ${objetivo} árvores`, width/2, height/2);
  }
  textSize(18);
  text("Clique para jogar novamente", width/2, height/2 + 100);
}

function desenharCenario() {
  // Céu com gradiente
  for (let i = 0; i < height/2; i++) {
    let r = map(i, 0, height/2, 135, 173);
    let g = map(i, 0, height/2, 206, 216);
    let b = map(i, 0, height/2, 235, 230);
    stroke(r, g, b);
    line(0, i, width, i);
  }
  noStroke();

  // Nuvens em movimento
  desenharNuvens();

  // Casas (aumentadas)
  desenharCasas();

  // Rua
  desenharRua();

  // Carro em movimento
  desenharCarro();

  // Campo
  fill(corGrama[0], corGrama[1], corGrama[2]);
  rect(0, 400, width, height-400);

  // Árvores
  desenharArvores();
}

function desenharNuvens() {
  for (let nuvem of nuvens) {
    fill(255, 255, 255, 200);
    ellipse(nuvem.x, nuvem.y, nuvem.tamanho, nuvem.tamanho/2);

    // Atualizar posição das nuvens
    nuvem.x += nuvem.velocidade;
    if (nuvem.x > width + 50) {
      nuvem.x = -50;
      nuvem.y = random(50, 150);
    }
  }
}

function desenharCasas() {
  for (let casa of casas) {
    let cor = coresCasas[casa.corIndex];

    // Base da casa (aumentada)
    fill(cor.base[0], cor.base[1], cor.base[2]);
    rect(casa.x, casa.y, casa.largura, casa.altura);

    // Telhado (aumentado)
    fill(cor.base[0]-50, cor.base[1]-50, cor.base[2]-50);
    triangle(casa.x - 20, casa.y,
            casa.x + casa.largura + 20, casa.y,
            casa.x + casa.largura/2, casa.y - 50);

    // Janelas (aumentadas)
    let numJanelas = floor(casa.largura / 40);
    for (let i = 0; i < numJanelas; i++) {
      let janelaX = casa.x + i * (casa.largura / numJanelas) + 15;
      let janelaY = casa.y + 30;
      let janelaCor = random(cor.janelas);
      fill(janelaCor[0], janelaCor[1], janelaCor[2]);
      rect(janelaX, janelaY, 30, 30, 5);
    }

    // Porta (aumentada)
    fill(150, 100, 50);
    rect(casa.x + casa.largura/2 - 15, casa.y + casa.altura - 40, 30, 40);
  }
}

function desenharRua() {
  fill(100);
  rect(0, 350, width, 50);

  fill(255);
  for (let i = 0; i < width; i += 60) {
    rect(i, 370, 40, 5);
  }
}

function desenharCarro() {
  // Corpo do carro
  fill(255, 0, 0);
  rect(carroX, 330, 70, 40, 5);

  // Detalhes
  fill(200);
  rect(carroX + 55, 335, 15, 10);

  fill(0);
  ellipse(carroX + 15, 370, 20, 20);
  ellipse(carroX + 55, 370, 20, 20);

  fill(80);
  ellipse(carroX + 15, 370, 10, 10);
  ellipse(carroX + 55, 370, 10, 10);

  fill(150);
  rect(carroX + 10, 335, 50, 15);

  // Movimento do carro
  carroX += velocidadeCarro;
  if (carroX > width) {
    carroX = -100;
  }
}

function desenharArvores() {
  for (let arvore of arvores) {
    // Tronco
    fill(corArvoreTronco);
    rect(arvore.x - 8, arvore.y, 16, 60);

    // Copa
    fill(corArvoreCopa);
    ellipse(arvore.x, arvore.y - 30, 70, 80);
    ellipse(arvore.x - 20, arvore.y - 40, 50, 60);
    ellipse(arvore.x + 20, arvore.y - 40, 50, 60);
  }
}

function atualizarJogo() {
  if (frameCount % 60 == 0 && tempoRestante > 0) {
    tempoRestante--;
  }

  fill(0);
  textSize(20);
  text(`Tempo: ${tempoRestante}s | Árvores: ${arvoresPlantadas}/${objetivo}`, width/2, 30);

  if (arvoresPlantadas >= objetivo) {
    estado = 2;
  } else if (tempoRestante <= 0) {
    estado = 2;
  }
}

function mousePressed() {
  if (estado === 0) {
    estado = 1;
  } else if (estado === 1 && !jogoIniciado) {
    jogoIniciado = true;
    arvores = [];
    arvoresPlantadas = 0;
    tempoRestante = 60;
  } else if (estado === 1 && jogoIniciado && mouseY > 400) {
    // Verificar se já existe uma árvore próxima
    let podePlantar = true;
    for (let arvore of arvores) {
      if (dist(mouseX, mouseY, arvore.x, arvore.y) < 50) {
        podePlantar = false;
        break;
      }
    }

    if (podePlantar && arvoresPlantadas < objetivo) {
      arvores.push({x: mouseX, y: mouseY});
      arvoresPlantadas++;
    }
  } else if (estado === 2) {
    // Reiniciar o jogo
    estado = 1;
    jogoIniciado = false;
  }
}

