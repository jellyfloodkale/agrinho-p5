var telaAtual = 1;
var imgTela1, imgTela2, imgTela3, imgTela5, imgLivro1, imgLivro2, imgNovaTela;
var botaoMundoAgro, botaoSegundo, botaoTerceiro, botaoNovo, botaoPagina5, botaoLivro;
var botaoVoltarInterno, botaoVoltarTelaInicial, botaoNovaTela, botaoQuiz;
var scaleFactor = 0.6;
var caixaTexto, botaoEnviar, mensagem;

var btn1X = 250, btn1Y = 270, btn1W = 290, btn1H = 200;
var btn2X = 900, btn2Y = 80, btn2W = 300, btn2H = 160;
var btn3X = 870, btn3Y = 430, btn3W = 330, btn3H = 180;
var btn4X = 870, btn4Y = 300, btn4W = 330, btn4H = 140;
var btn5X = 820, btn5Y = 30, btn5W = 440, btn5H = 680;
var btnLivroX = 200, btnLivroY = 15, btnLivroW = 890, btnLivroH = 700;
var btnNovaX = 870, btnNovaY = 480, btnNovaW = 330, btnNovaH = 160;
var btnQuizX = 256, btnQuizY = 120,btnQuizW = 791, btnQuizH = 530;

var perguntasQuiz = [
  { pergunta: "1. O que é uma feira agroecológica?", opcoes: ["Feira com produtos orgânicos", "Feira de carros", "Feira de tecnologia"], correta: 0 },
  { pergunta: "2. Como o campo ajuda a cidade?", opcoes: ["Fornecendo alimentos", "Vendendo carros", "Exportando eletrônicos"], correta: 0 },
  { pergunta: "3. O que é agroindústria?", opcoes: ["Produção rural com tecnologia", "Fábrica de roupas", "Indústria de brinquedos"], correta: 0 },
  { pergunta: "4. Qual transporte liga o campo à cidade?", opcoes: ["Caminhão", "Avião de guerra", "Navio de cruzeiro"], correta: 0 },
  { pergunta: "5. Qual desses é um produto do campo?", opcoes: ["Milho", "Computador", "Celular"], correta: 0 },
  { pergunta: "6. O que são produtos locais?", opcoes: ["Produtos da região", "Produtos importados", "Produtos eletrônicos"], correta: 0 },
  { pergunta: "7. O que o campo e cidade podem fazer juntos?", opcoes: ["Festejar tradições", "Construir aviões", "Abrir shoppings"], correta: 0 }
];

var perguntaAtual = 0;
var botoesQuiz = [];
var acertos = 0;
var erros = 0;
var feedbackMsg = '';
var tempoRestante = 10;
var cronometro;

function preload() {
  imgTela1 = loadImage('https://i.postimg.cc/Nj6PHJw1/C-pia-de-C-pia-de-Inserir-um-pouquinho-de-texto-20250606-124037-0000.png');
  imgTela2 = loadImage('https://i.postimg.cc/HjGBJ5ZZ/C-pia-de-C-pia-de-C-pia-de-Inserir-um-pouquinho-de-texto-20250606-131519-0000.png');
  imgTela3 = loadImage('https://i.postimg.cc/CM6K37XH/C-pia-de-C-pia-de-C-pia-de-C-pia-de-Inserir-um-pouquinho-de-texto-20250606-134001-0000.png');
  imgTela5 = loadImage('https://i.postimg.cc/CMNf2bsw/C-pia-de-C-pia-de-C-pia-de-C-pia-de-C-pia-de-Inserir-um-pouquinho-de-texto-20250608-204212-0000.png');
  imgLivro1 = loadImage('https://i.postimg.cc/zfZCN8bN/C-pia-de-C-pia-de-C-pia-de-C-pia-de-C-pia-de-Inserir-um-pouquinho-de-texto-20250605-224931-0000.png');
  imgLivro2 = loadImage('https://i.postimg.cc/J76jnbDP/C-pia-de-C-pia-de-C-pia-de-C-pia-de-C-pia-de-Inserir-um-pouquinho-de-texto-20250605-224853-0000.png');
  imgNovaTela = loadImage('https://i.postimg.cc/jCYfbh2X/C-pia-de-Inserir-um-pouquinho-de-texto-20250608-213216-0000.png');
}

function setup() {
  createCanvas(imgTela1.width * scaleFactor, imgTela1.height * scaleFactor);

  botaoMundoAgro = criarBotao(btn1X, btn1Y, btn1W, btn1H, '', 'none', () => telaAtual = 2);
  botaoSegundo = criarBotao(btn2X, btn2Y, btn2W, btn2H, '', 'none', () => telaAtual = 3);
  botaoTerceiro = criarBotao(btn3X, btn3Y, btn3W, btn3H, '', 'none', () => telaAtual = 4);
  botaoNovo = criarBotao(btn4X, btn4Y, btn4W, btn4H, '', 'none', () => telaAtual = 5);
  botaoPagina5 = criarBotao(btn5X, btn5Y, btn5W, btn5H, '', 'none', () => telaAtual = 6);
  botaoLivro = criarBotao(btnLivroX, btnLivroY, btnLivroW, btnLivroH, '', 'none', () => telaAtual = telaAtual === 6 ? 7 : 6);
  botaoNovaTela = criarBotao(btnNovaX, btnNovaY, btnNovaW, btnNovaH, '', 'none', () => telaAtual = 8);
  botaoQuiz = criarBotao(btnQuizX, btnQuizY, btnQuizW, btnQuizH, '', 'none', iniciarQuiz);

  botaoVoltarInterno = createButton('Voltar');
  botaoVoltarInterno.position(10, 10);
  botaoVoltarInterno.mousePressed(() => {
    telaAtual = (telaAtual === 6 || telaAtual === 7) ? 5 : 1;
    atualizarBotoes();
  });
  botaoVoltarInterno.hide();

  caixaTexto = createElement('textarea');
  caixaTexto.position(width / 2 - 300, height / 2 - 80);
  caixaTexto.size(600, 200);
  caixaTexto.style('font-size', '16px');
  caixaTexto.hide();

  botaoEnviar = createButton('Enviar história');
  botaoEnviar.position(width / 2 - 80, height / 2 + 130);
  botaoEnviar.mousePressed(enviarHistoria);
  botaoEnviar.hide();

  mensagem = createP('');
  mensagem.position(width / 2 - 160, height / 2 + 170);
  mensagem.style('font-weight', 'bold');
  mensagem.hide();

  atualizarBotoes();
}

function draw() {
  background(220);
  if (telaAtual === 1) image(imgTela1, 0, 0, width, height);
  else if (telaAtual === 2) image(imgTela2, 0, 0, width, height);
  else if (telaAtual === 3) image(imgTela3, 0, 0, width, height);
  else if (telaAtual === 4) {
    background('#c7e4b3');
    textAlign(CENTER);
    textSize(28);
    fill('#3e6b1a');
    text('Conte sua história no campo!', width / 2, 60);
    textSize(16);
    fill(0);
    text('Escreva abaixo algo especial que você viveu no campo:', width / 2, 100);
  } else if (telaAtual === 5) image(imgTela5, 0, 0, width, height);
  else if (telaAtual === 6) image(imgLivro1, 0, 0, width, height);
  else if (telaAtual === 7) image(imgLivro2, 0, 0, width, height);
  else if (telaAtual === 8) image(imgNovaTela, 0, 0, width, height);
  else if (telaAtual === 9) desenharQuiz();
  else if (telaAtual === 10) mostrarResultadoFinal();
}

function criarBotao(x, y, w, h, texto, borda, funcao) {
  let btn = createButton(texto);
  btn.position(x * scaleFactor, y * scaleFactor);
  btn.size(w * scaleFactor, h * scaleFactor);
  btn.style('background-color', 'transparent');
  btn.style('border', borda);
  btn.mousePressed(() => {
    funcao();
    atualizarBotoes();
  });
  return btn;
}

function atualizarBotoes() {
  [botaoMundoAgro, botaoSegundo, botaoTerceiro, botaoNovo, botaoPagina5, botaoLivro, botaoNovaTela, botaoQuiz].forEach(b => b.hide());
  botaoVoltarInterno.hide(); caixaTexto.hide(); botaoEnviar.hide(); mensagem.hide();

  if (telaAtual === 1) [botaoMundoAgro, botaoSegundo, botaoNovo, botaoNovaTela].forEach(b => b.show());
  else if ([2, 3, 4, 5, 6, 7, 8].includes(telaAtual)) botaoVoltarInterno.show();
  if (telaAtual === 5) botaoPagina5.show();
  if ([6, 7].includes(telaAtual)) botaoLivro.show();
  if (telaAtual === 3) botaoTerceiro.show();
  if (telaAtual === 4) { caixaTexto.show(); botaoEnviar.show(); mensagem.show(); }
  if (telaAtual === 8) botaoQuiz.show();
}

function enviarHistoria() {
  let texto = caixaTexto.value();
  mensagem.html(texto.trim() ? 'Obrigado por compartilhar sua história!' : 'Por favor, escreva algo antes de enviar.');
  if (texto.trim()) caixaTexto.value('');
}

function iniciarQuiz() {
  perguntaAtual = 0; acertos = 0; erros = 0; feedbackMsg = ''; telaAtual = 9;
  atualizarBotoes(); mostrarPergunta(); iniciarCronometro();
}

function mostrarPergunta() {
  botoesQuiz.forEach(b => b.remove());
  botoesQuiz = [];
  feedbackMsg = '';
  tempoRestante = 10;
  if (perguntaAtual >= perguntasQuiz.length) {
    clearInterval(cronometro);
    telaAtual = 10;
    return;
  }

  let p = perguntasQuiz[perguntaAtual];
  for (let i = 0; i < p.opcoes.length; i++) {
    let btn = createButton(p.opcoes[i]);
    btn.position(width / 2 - 100, 200 + i * 60);
    btn.size(200, 50);
    btn.mousePressed(() => {
      clearInterval(cronometro);
      if (i === p.correta) {
        acertos++; feedbackMsg = "Você acertou!";
      } else {
        erros++; feedbackMsg = "Você errou!";
      }
      botoesQuiz.forEach(b => b.hide());
      setTimeout(() => { perguntaAtual++; mostrarPergunta(); iniciarCronometro(); }, 1500);
    });
    botoesQuiz.push(btn);
  }
}

function iniciarCronometro() {
  clearInterval(cronometro);
  cronometro = setInterval(() => {
    tempoRestante--;
    if (tempoRestante <= 0) {
      erros++;
      clearInterval(cronometro);
      botoesQuiz.forEach(b => b.hide());
      feedbackMsg = "Tempo esgotado!";
      setTimeout(() => { perguntaAtual++; mostrarPergunta(); iniciarCronometro(); }, 1500);
    }
  }, 1000);
}

function desenharQuiz() {
  background('#fffde7');
  textAlign(CENTER);
  fill('#3e6b1a');
  textSize(24);
  text("Quiz: Conexões entre o Campo e a Cidade", width / 2, 60);
  textSize(20);
  fill(0);
  text("Tempo restante: " + tempoRestante + "s", width / 2, 100);
  if (perguntaAtual < perguntasQuiz.length) {
    textSize(18);
    text(perguntasQuiz[perguntaAtual].pergunta, width / 2, 150);
    if (feedbackMsg !== '') {
      fill(feedbackMsg.includes("acertou") ? "green" : "red");
      textSize(20);
      text(feedbackMsg, width / 2, 380);
    }
  }
}

function mostrarResultadoFinal() {
  background('#e3f2fd');
  textAlign(CENTER);
  fill('#1a237e');
  textSize(26);
  text("Parabéns! Você completou o quiz!", width / 2, height / 2 - 60);
  textSize(20);
  text("Acertos: " + acertos, width / 2, height / 2);
  text("Erros: " + erros, width / 2, height / 2 + 40);
}
