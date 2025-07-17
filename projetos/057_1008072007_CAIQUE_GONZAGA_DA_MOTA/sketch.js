let colheitaTradicional = 0;
let colheitaTecnologica = 0;
let frutasCampoTradicional = [];
let frutasCampoTecnologico = [];
const numFrutas = 80; // Número de frutas para ambas as partes
let colheitadeira;
let agricultores = []; // Array para múltiplos agricultores
const numAgricultores = 5; // Quantidade de agricultores no campo tradicional
let jogoFinalizado = false; // Flag para controlar o estado do jogo
let vencedor = null; // 'tecnologia' ou 'tradicional'

function setup() {
  createCanvas(900, 500);
  frameRate(30);

  // Inicializa as frutas para o campo tradicional
  for (let i = 0; i < numFrutas; i++) {
    frutasCampoTradicional.push({
      x: random(50, width / 2 - 50),
      y: random(100, height - 100),
      colhida: false
    });
  }

  // Inicializa as frutas para o campo tecnológico
  for (let i = 0; i < numFrutas; i++) {
    frutasCampoTecnologico.push({
      x: random(width / 2 + 50, width - 50),
      y: random(100, height - 100),
      colhida: false
    });
  }

  // Inicializa a colheitadeira controlável
  colheitadeira = {
    x: width / 2 + 100,
    y: height - 150,
    largura: 100,
    altura: 50,
    velocidade: 5
  };

  // Inicializa múltiplos agricultores
  for (let i = 0; i < numAgricultores; i++) {
    agricultores.push({
      x: random(50, width / 2 - 50),
      y: random(height - 150, height - 80),
      velocidade: random(0.8, 1.2), // Velocidades ligeiramente diferentes
      targetFruta: null // A fruta que o agricultor está mirando
    });
  }
}

function draw() {
  background(220); // Fundo cinza claro

  // Desenha os campos
  desenharCampos();

  // Desenha e simula o campo tradicional
  desenharFrutas(frutasCampoTradicional);
  for (let agric of agricultores) {
    desenharAgricultor(agric);
    if (!jogoFinalizado) {
      moverAgricultor(agric); // Move o agricultor para a fruta
      simularColheitaTradicional(agric); // Agora o agricultor colhe
    }
  }

  // Desenha e simula o campo tecnológico (controlado pelo jogador)
  desenharFrutas(frutasCampoTecnologico);
  desenharColheitadeira();
  if (!jogoFinalizado) { // Só controla e colhe se o jogo não tiver finalizado
    controlarColheitadeira();
    simularColheitaColheitadeira();
  }

  // Exibe a produtividade
  exibirProdutividade();

  // Verifica condição de vitória/fim do jogo
  if (!jogoFinalizado) {
    if (colheitaTecnologica === numFrutas) {
      jogoFinalizado = true;
      vencedor = 'tecnologia';
    } else if (colheitaTradicional === numFrutas) {
      jogoFinalizado = true;
      vencedor = 'tradicional';
    }
  }

  if (jogoFinalizado) {
    exibirMensagemFinal();
  }
}

function desenharCampos() {
  // Campo Tradicional (esquerda)
  fill(100, 150, 50); // Verde escuro
  rect(0, 0, width / 2, height);
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Campo Tradicional", width / 4, 30);

  // Campo Tecnológico (direita)
  fill(120, 170, 70); // Verde um pouco mais claro
  rect(width / 2, 0, width / 2, height);
  fill(0);
  text("Campo Tecnológico", width * 3 / 4, 30);

  // Linha divisória
  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
  noStroke();
}

function desenharFrutas(frutasArray) {
  for (let fruta of frutasArray) {
    if (!fruta.colhida) {
      fill(255, 140, 0); // Laranja para as frutas
      ellipse(fruta.x, fruta.y, 15, 15);
    }
  }
}

function desenharAgricultor(agric) {
  // Corpo
  fill(80, 40, 0); // Marrom
  rect(agric.x, agric.y, 20, 40);

  // Cabeça
  fill(255, 200, 150); // Cor de pele
  ellipse(agric.x + 10, agric.y, 20, 20);

  // Chapéu
  fill(50, 50, 0); // Verde escuro
  rect(agric.x, agric.y - 15, 20, 10);
  rect(agric.x - 5, agric.y - 10, 30, 5);

  // Braços (simulando movimento)
  fill(80, 40, 0);
  push();
  translate(agric.x + 10, agric.y + 10);
  rotate(sin(frameCount * 0.1 * agric.velocidade) * 0.5); // Balançar os braços
  rect(-5, -5, 10, 20); // Braço 1
  pop();

  push();
  translate(agric.x + 10, agric.y + 10);
  rotate(sin(frameCount * 0.1 * agric.velocidade + PI) * 0.5); // Balançar o outro braço em oposição
  rect(-5, -5, 10, 20); // Braço 2
  pop();
}

function moverAgricultor(agric) {
  if (!agric.targetFruta || agric.targetFruta.colhida) {
    // Encontrar a próxima fruta não colhida mais próxima
    let menorDistancia = Infinity;
    let frutaMaisProxima = null;
    for (let fruta of frutasCampoTradicional) {
      if (!fruta.colhida) {
        let d = dist(agric.x, agric.y, fruta.x, fruta.y);
        if (d < menorDistancia) {
          menorDistancia = d;
          frutaMaisProxima = fruta;
        }
      }
    }
    agric.targetFruta = frutaMaisProxima;
  }

  if (agric.targetFruta) {
    // Mover agricultor em direção à fruta
    let dx = agric.targetFruta.x - (agric.x + 10); // Offset para o centro do agricultor
    let dy = agric.targetFruta.y - (agric.y + 20);
    let angle = atan2(dy, dx);

    agric.x += cos(angle) * agric.velocidade;
    agric.y += sin(angle) * agric.velocidade;

    // Limites para o agricultor permanecer no campo tradicional
    agric.x = constrain(agric.x, 20, width / 2 - 20);
    agric.y = constrain(agric.y, 80, height - 60);
  }
}

function desenharColheitadeira() {
  // Base principal
  fill(255, 140, 0); // Laranja vibrante
  rect(colheitadeira.x, colheitadeira.y, colheitadeira.largura, colheitadeira.altura, 5); // Borda arredondada

  // Cabine do operador
  fill(100, 100, 100); // Cinza escuro
  rect(colheitadeira.x + colheitadeira.largura * 0.6, colheitadeira.y - colheitadeira.altura * 0.4, colheitadeira.largura * 0.4, colheitadeira.altura * 0.5, 3);
  fill(150, 200, 255); // Vidro azul claro
  rect(colheitadeira.x + colheitadeira.largura * 0.65, colheitadeira.y - colheitadeira.altura * 0.3, colheitadeira.largura * 0.2, colheitadeira.altura * 0.3);

  // Cabeçalho de corte (frente)
  fill(200, 100, 0); // Laranja mais escuro
  rect(colheitadeira.x - colheitadeira.largura * 0.3, colheitadeira.y + colheitadeira.altura * 0.1, colheitadeira.largura * 0.3, colheitadeira.altura * 0.8, 3);
  // Dentes/lâminas do cabeçalho
  fill(180, 90, 0);
  for (let i = 0; i < 5; i++) {
    rect(colheitadeira.x - colheitadeira.largura * 0.25 + (i * 5), colheitadeira.y + colheitadeira.altura * 0.8, 2, 5);
  }

  // Rodas (maior atrás, menor na frente)
  fill(50, 50, 50); // Preto pneu
  ellipse(colheitadeira.x + colheitadeira.largura * 0.2, colheitadeira.y + colheitadeira.altura + 15, 30, 30); // Roda dianteira
  ellipse(colheitadeira.x + colheitadeira.largura * 0.8, colheitadeira.y + colheitadeira.altura + 15, 40, 40); // Roda traseira

  // Detalhes da roda
  fill(80); // Aro cinza
  ellipse(colheitadeira.x + colheitadeira.largura * 0.2, colheitadeira.y + colheitadeira.altura + 15, 15, 15);
  ellipse(colheitadeira.x + colheitadeira.largura * 0.8, colheitadeira.y + colheitadeira.altura + 15, 20, 20);
}

function controlarColheitadeira() {
  if (keyIsDown(LEFT_ARROW)) {
    colheitadeira.x -= colheitadeira.velocidade;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    colheitadeira.x += colheitadeira.velocidade;
  }
  if (keyIsDown(UP_ARROW)) {
    colheitadeira.y -= colheitadeira.velocidade;
  }
  if (keyIsDown(DOWN_ARROW)) {
    colheitadeira.y += colheitadeira.velocidade;
  }

  // Limites para a colheitadeira permanecer no campo tecnológico
  colheitadeira.x = constrain(colheitadeira.x, width / 2 + 20, width - colheitadeira.largura - 20);
  colheitadeira.y = constrain(colheitadeira.y, 80, height - colheitadeira.altura - 20);
}


function simularColheitaTradicional(agric) {
  if (agric.targetFruta && !agric.targetFruta.colhida) {
    // Se o agricultor está perto da fruta, colhe
    if (dist(agric.x + 10, agric.y + 20, agric.targetFruta.x, agric.targetFruta.y) < 15) {
      agric.targetFruta.colhida = true;
      colheitaTradicional++;
      agric.targetFruta = null; // Libera o agricultor para buscar outra fruta
    }
  }
}

function simularColheitaColheitadeira() {
  // A colheitadeira colhe tudo que passa por baixo do cabeçalho de corte
  for (let fruta of frutasCampoTecnologico) {
    if (!fruta.colhida) {
      // Verifica se a fruta está dentro da área de colheita da colheitadeira (cabeçalho)
      if (fruta.x > colheitadeira.x - colheitadeira.largura * 0.3 &&
          fruta.x < colheitadeira.x + colheitadeira.largura &&
          fruta.y > colheitadeira.y + colheitadeira.altura * 0.1 &&
          fruta.y < colheitadeira.y + colheitadeira.altura) {
        fruta.colhida = true;
        colheitaTecnologica++;
      }
    }
  }
}

function exibirProdutividade() {
  fill(0);
  textSize(24);
  textAlign(LEFT);
  text(`Colheita Tradicional: ${colheitaTradicional}`, 20, height - 30);
  text(`Colheita Tecnológica: ${colheitaTecnologica}`, width / 2 + 20, height - 30);
}

function exibirMensagemFinal() {
  // Fundo para o texto final
  fill(50, 50, 50, 220); // Fundo cinza escuro semi-transparente, mais opaco
  rect(0, 0, width, height); // Cobre toda a tela

  textAlign(CENTER);

  if (vencedor === 'tecnologia') {
    fill(255, 255, 0); // Amarelo vibrante para o título
    textSize(40);
    text("VITÓRIA DA TECNOLOGIA NO CAMPO!", width / 2, height / 2 - 60);
    textSize(28);
    fill(255); // Branco para o subtítulo
    text("A colheitadeira completou a colheita em tempo recorde!", width / 2, height / 2 - 10);

    // Texto final enfatizando a importância da tecnologia
    fill(200); // Cinza claro para o corpo do texto
    textSize(20);
    text("A tecnologia é essencial para a produtividade, eficiência", width / 2, height / 2 + 50);
    text("e sustentabilidade do agronegócio moderno.", width / 2, height / 2 + 75);
  } else if (vencedor === 'tradicional') {
    fill(100, 200, 100); // Verde claro para o título
    textSize(40);
    text("VITÓRIA DA MÃO DE OBRA TRADICIONAL!", width / 2, height / 2 - 60);
    textSize(28);
    fill(255); // Branco para o subtítulo
    text("Os agricultores colheram todas as frutas!", width / 2, height / 2 - 10);

    // Texto final enfatizando o esforço da mão de obra
    fill(200); // Cinza claro para o corpo do texto
    textSize(20);
    text("Para obter um resultado igual ao de uma máquina", width / 2, height / 2 + 50);
    text("foi preciso o esforço e a dedicação de muitos agricultores envolvidos.", width / 2, height / 2 + 75);
    text("Isso destaca como a tecnologia, embora não substitua a importância do ser humano,", width / 2, height / 2 + 110);
    text("multiplica a capacidade de produção de forma exponencial.", width / 2, height / 2 + 135);
  }

  noLoop(); // Para a simulação ao exibir a mensagem de vitória/derrota
}