 // Quiz: Festejando a conexão campo-cidade - Versão colorida e detalhada
// Desenvolvido por Aryel Phelipe de Oliveira Ramos
// Com melhorias visuais, animações e cores vibrantes

let fases = [];
let perguntasAtuais = [];
let perguntaIndex = 0;
let pontos = 0;
let respostaSelecionada = -1;
let mostrarResposta = false;
let tela = "explicacao"; // telas: explicacao, start, quiz, tenteNovamente, fim
let fase = 1;
let confetes = [];
let mostrarConfete = false;
let animErro = false;
let animErroTimer = 0;
let shakeOffset = 0;
let shakeDir = 1;
let fadeTransition = 0;
let fadingOut = false;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  frameRate(60);

  fases = [
    [
      { pergunta: "Qual produto do campo usamos na cidade?", alternativas: ["Tomate", "Carro", "Computador"], correta: 0 },
      { pergunta: "Como a cidade ajuda o campo?", alternativas: ["Comprando produtos", "Desmatando", "Poluindo"], correta: 0 },
      { pergunta: "Transporte que leva comida do campo?", alternativas: ["Caminhão", "Avião", "Trem"], correta: 0 },
      { pergunta: "De onde vem o leite?", alternativas: ["Fazenda", "Supermercado", "Fábrica"], correta: 0 },
      { pergunta: "O que planta o agricultor?", alternativas: ["Milho", "Carro", "Computador"], correta: 0 }
    ],
    [
      { pergunta: "O que o campo precisa da cidade?", alternativas: ["Tecnologia", "Fumaça", "Concreto"], correta: 0 },
      { pergunta: "Agroecologia é?", alternativas: ["Plantio sustentável", "Desmatamento", "Poluição"], correta: 0 },
      { pergunta: "Apoiar produtores rurais?", alternativas: ["Comprar local", "Ignorar feiras", "Desvalorizar"], correta: 0 },
      { pergunta: "Qual transporte ajuda o campo?", alternativas: ["Caminhão", "Barco a vela", "Moto aquática"], correta: 0 },
      { pergunta: "O que o campo produz para a cidade?", alternativas: ["Alimentos", "Carros", "Roupas"], correta: 0 }
    ],
    [
      { pergunta: "O que prejudica a conexão campo-cidade?", alternativas: ["Cooperação", "Falta de transporte", "Infraestrutura"], correta: 1 },
      { pergunta: "Quem produz nossa comida?", alternativas: ["Indústria", "Produtores rurais", "Prefeitura"], correta: 1 },
      { pergunta: "Como apoiar o campo?", alternativas: ["Divulgar feiras", "Esvaziar mercados", "Jogar comida fora"], correta: 0 },
      { pergunta: "O que o campo precisa preservar?", alternativas: ["Natureza", "Poluição", "Desmatamento"], correta: 0 },
      { pergunta: "Cidade depende do campo para?", alternativas: ["Comida", "Água suja", "Lixo"], correta: 0 }
    ]
  ];

  iniciarFase(fase);
}

function draw() {
  if (animErro) {
    // Shake a tela para indicar erro
    shakeOffset += shakeDir * 2;
    if (abs(shakeOffset) > 10) shakeDir *= -1;
    if (animErroTimer <= 0) {
      animErro = false;
      shakeOffset = 0;
    }
  } else {
    shakeOffset = 0;
  }

  push();
  translate(shakeOffset, 0);

  // Fundo com gradiente animado
  desenharFundoAnimado();

  switch (tela) {
    case "explicacao":
      drawExplicacao();
      break;
    case "start":
      drawStart();
      break;
    case "quiz":
      if (perguntaIndex < perguntasAtuais.length) {
        drawPergunta();
      } else {
        if (fase < fases.length) {
          if (pontos >= 3) {
            fase++;
            iniciarFase(fase);
            tela = "start";
          } else {
            tela = "tenteNovamente";
          }
        } else {
          tela = "fim";
        }
      }
      break;
    case "tenteNovamente":
      drawTenteNovamente();
      break;
    case "fim":
      drawFim();
      break;
  }

  if (mostrarConfete) {
    for (let c of confetes) {
      c.update();
      c.show();
    }
  }
  pop();

  if (animErro) {
    animErroTimer--;
  }
}

// Fundo animado com gradiente de cores vibrantes
function desenharFundoAnimado() {
  noFill();
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c1 = color(255, 140, 0);
    let c2 = color(255, 215, 0);
    let c = lerpColor(c1, c2, sin(frameCount * 0.02 + inter * PI) * 0.5 + 0.5);
    stroke(c);
    line(0, i, width, i);
  }
}

// Tela de explicação com sombra e botão estilizado
function drawExplicacao() {
  fill(0, 140, 200);
  textSize(36);
  sombraTexto("Concurso Agrinho 2025", width / 2, 60);

  fill(50, 220, 100);
  textSize(32);
  sombraTexto("🎉 Sobre o jogo 🎉", width / 2, 120);

  fill(255);
  textSize(20);
  text(
    "Responda perguntas sobre a conexão entre campo e cidade.\n\n" +
    "• Acertos somam +1 ponto\n" +
    "• Erros descontam -1 ponto (mínimo 0)\n" +
    "• Acertar 3 de 5 para passar de fase\n\n" +
    "Clique no botão abaixo para ir para o menu.",
    width / 2, 220
  );

  desenharBotao(width / 2 - 110, 400, 220, 60, "Ir para o menu", color(50, 200, 50), () => {
    iniciarFase(1);
    tela = "start";
  });
}

// Tela inicial da fase, botão start com efeito hover
function drawStart() {
  fill(0, 180, 140);
  textSize(36);
  sombraTexto(`Fase ${fase} - Festejando a Conexão`, width / 2, height / 2 - 60);

  desenharBotao(width / 2 - 110, height / 2, 220, 60, "Começar", color(30, 144, 255), () => {
    tela = "quiz";
  });
}

// Desenha pergunta, alternativas, personagem com balão e animações
function drawPergunta() {
  let p = perguntasAtuais[perguntaIndex];

  desenharPersonagemComAnimacao(p.pergunta);

  for (let i = 0; i < p.alternativas.length; i++) {
    let x = 120;
    let y = 300 + i * 70;
    let largura = 480;
    let altura = 55;

    // Cor de fundo alternativa
    if (respostaSelecionada === i) {
      if (mostrarResposta) {
        fill(i === p.correta ? color(0, 200, 50, 180) : color(255, 0, 0, 180));
      } else {
        fill(200);
      }
    } else {
      fill(255, 255, 255, 230);
    }

    stroke(0);
    strokeWeight(2);
    rect(x, y, largura, altura, 20);

    // Borda verde ou vermelha para resposta após mostrar resultado
    if (mostrarResposta) {
      if (i === p.correta) {
        stroke(0, 180, 0);
        strokeWeight(5);
        noFill();
        rect(x - 3, y - 3, largura + 6, altura + 6, 25);
      } else if (i === respostaSelecionada && respostaSelecionada !== p.correta) {
        stroke(180, 0, 0);
        strokeWeight(5);
        noFill();
        rect(x - 3, y - 3, largura + 6, altura + 6, 25);
      }
    }

    noStroke();
    fill(0);
    textSize(20);
    textAlign(LEFT, CENTER);
    text(p.alternativas[i], x + 25, y + altura / 2);
  }

  fill(0, 50);
  rect(10, 10, 150, 40, 15);
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(`Pontos: ${pontos}`, 20, 30);

  fill(0, 50);
  rect(width - 180, 10, 170, 40, 15);
  fill(255);
  textAlign(LEFT, CENTER);
  text(`Pergunta ${perguntaIndex + 1} de ${perguntasAtuais.length}`, width - 170, 30);

  if (mostrarResposta) {
    fill(255, 255, 255, 220);
    rect(width / 2 - 110, height - 70, 220, 50, 25);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Clique para continuar...", width / 2, height - 45);
  }
}

// Personagem com detalhes (olhos piscando) e balão com sombra animada
let piscarTempo = 0;
let piscarDuracao = 10;
let piscando = false;

function desenharPersonagemComAnimacao(fala) {
  push();
  translate(100, 130);

  // Corpo
  fill(255, 224, 189);
  ellipse(0, 0, 80, 80);

  // Olhos
  fill(0);
  if (piscarTempo > 0) {
    rect(-20, -10, 15, 6, 5); // olho esquerdo fechado
    rect(20, -10, 15, 6, 5);  // olho direito fechado
    piscarTempo--;
  } else {
    ellipse(-13, -10, 15, 15);
    ellipse(13, -10, 15, 15);

    if (frameCount % 200 === 0) {
      piscarTempo = piscarDuracao;
    }
  }

  // Boca
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(0, 15, 40, 20, 0, PI);
  noStroke();

  pop();

  // Balão fala com sombra e seta animada (pequeno movimento)
  push();
  let balX = 170;
  let balY = 40;
  let balW = 580;
  let balH = 90;
  let setSize = 20;
  let setAnim = sin(frameCount * 0.1) * 5;

  // Sombra do balão
  fill(0, 0, 0, 50);
  rect(balX + 5, balY + 5, balW, balH, 20);

  // Balão branco
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(balX, balY, balW, balH, 20);

  // Seta balão (triângulo)
  fill(255);
  stroke(0);
  triangle(balX - 10 + setAnim, balY + 40, balX + 10 + setAnim, balY + 45, balX + 5 + setAnim, balY + 60);

  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(18);
  textLeading(24);
  text(fala, balX + 20, balY + 15, balW - 40, balH - 30);
  pop();
}

// Detecta clique e ação dos botões/alternativas
function mousePressed() {
  if (tela === "explicacao") {
    if (mouseSobreBotao(width / 2 - 110, 400, 220, 60)) {
      iniciarFase(1);
      tela = "start";
    }
    return;
  }

  if (tela === "start") {
    if (mouseSobreBotao(width / 2 - 110, height / 2, 220, 60)) {
      tela = "quiz";
    }
    return;
  }

  if (tela === "quiz") {
    if (mostrarResposta) {
      perguntaIndex++;
      respostaSelecionada = -1;
      mostrarResposta = false;
      mostrarConfete = false;
      return;
    }

    let p = perguntasAtuais[perguntaIndex];
    for (let i = 0; i < p.alternativas.length; i++) {
      let x = 120;
      let y = 300 + i * 70;
      let largura = 480;
      let altura = 55;

      if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {
        if (!mostrarResposta) {
          respostaSelecionada = i;
          mostrarResposta = true;
          if (i === p.correta) {
            pontos++;
            iniciarConfete();
          } else {
            pontos = max(0, pontos - 1);
            iniciarAnimErro();
          }
        }
      }
    }
    return;
  }

  if (tela === "tenteNovamente") {
    iniciarFase(fase);
    tela = "start";
    return;
  }

  if (tela === "fim") {
    iniciarFase(1);
    fase = 1;
    tela = "explicacao";
    return;
  }
}

// Verifica se o mouse está sobre um botão
function mouseSobreBotao(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

// Desenha botão com efeito hover e clique, executa ação passada
function desenharBotao(x, y, w, h, texto, cor, acao) {
  let corBase = cor;
  let corHover = lerpColor(corBase, color(255), 0.3);
  let corBotao = mouseSobreBotao(x, y, w, h) ? corHover : corBase;

  fill(corBotao);
  stroke(0);
  strokeWeight(2);
  rect(x, y, w, h, 25);

  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  sombraTexto(texto, x + w / 2, y + h / 2);

  // Detecta clique do mouse no botão (se já estiver clicado, acao já chamada em mousePressed)
  if (mouseIsPressed && mouseSobreBotao(x, y, w, h)) {
    acao();
  }
}

// Texto com sombra para melhor leitura
function sombraTexto(txt, x, y) {
  push();
  fill(0, 150);
  textAlign(CENTER, CENTER);
  text(txt, x + 2, y + 2);
  fill(255);
  text(txt, x, y);
  pop();
}

// Confete colorido com formatos variados
class Confete {
  constructor() {
    this.x = random(width);
    this.y = random(-50, 0);
    this.size = random(6, 12);
    this.color = color(random(255), random(255), random(255));
    this.speed = random(3, 6);
    this.type = floor(random(3)); // 0=ellipse,1=rect,2=triangle
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1);
  }
  update() {
    this.y += this.speed;
    this.angle += this.rotationSpeed;
    if (this.y > height) this.y = random(-50, 0);
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(this.color);
    switch (this.type) {
      case 0:
        ellipse(0, 0, this.size * 1.2, this.size);
        break;
      case 1:
        rectMode(CENTER);
        rect(0, 0, this.size, this.size * 0.6, 3);
        break;
      case 2:
        triangle(
          -this.size / 2, this.size / 2,
          0, -this.size / 2,
          this.size / 2, this.size / 2
        );
        break;
    }
    pop();
  }
}

function iniciarConfete() {
  confetes = [];
  for (let i = 0; i < 100; i++) {
    confetes.push(new Confete());
  }
  mostrarConfete = true;
}

function iniciarAnimErro() {
  animErro = true;
  animErroTimer = 40;
}

// Tela de tentativa novamente com texto vibrante
function drawTenteNovamente() {
  background(255, 60, 60);
  fill(255, 240, 240);
  textSize(48);
  sombraTexto("Ops! Você não passou.", width / 2, height / 2 - 60);

  fill(255);
  textSize(24);
  text("Tente novamente para seguir para a próxima fase.", width / 2, height / 2);

  desenharBotao(width / 2 - 110, height / 2 + 80, 220, 60, "Tentar de novo", color(220, 20, 60), () => {
    iniciarFase(fase);
    tela = "start";
  });
}

// Tela final com agradecimento e créditos
function drawFim() {
  background(0, 150, 80);
  fill(255, 255, 180);
  textSize(48);
  sombraTexto("Parabéns! Você concluiu o jogo!", width / 2, height / 2 - 80);

  fill(255, 255, 255, 220);
  textSize(24);
  text(
    "Obrigado por participar!\n\n" +
    "Desenvolvido por Aryel Phelipe de Oliveira Ramos\n" +
    "Concurso Agrinho 2025",
    width / 2, height / 2 + 10
  );

  desenharBotao(width / 2 - 110, height / 2 + 120, 220, 60, "Reiniciar", color(50, 200, 50), () => {
    iniciarFase(1);
    fase = 1;
    pontos = 0;
    perguntaIndex = 0;
    respostaSelecionada = -1;
    mostrarResposta = false;
    tela = "explicacao";
  });
}

function iniciarFase(nFase) {
  fase = nFase;
  perguntasAtuais = fases[fase - 1];
  perguntaIndex = 0;
  pontos = 0;
  respostaSelecionada = -1;
  mostrarResposta = false;
  mostrarConfete = false;
  animErro = false;
  animErroTimer = 0;
  shakeOffset = 0;
  shakeDir = 1;
  fadeTransition = 0;
  fadingOut = false;
}
