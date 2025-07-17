// variáveis
let feira = { x: 350, y: 30, largura: 200, altura: 300 }; // Área da feira
let campo = { x: 50, y: 30, largura: 200, altura: 300 }; // Área do campo
let produtosNoCampo = [];
let produtosComprados = [];
let saldo = 100.0;
let saldoInicial = 100.0;
let totalDaCompra = 0;
let tamanhoDoProduto = 50;
let mensagem = "";
let jogoComecou = false;
let compraAcabou = false;
let quantosItens = 0;
let tiposDeItens = new Set();
let notaFinal = "";
let estoqueInicial = 5;

// Preços dos produtos
let precos = {
  Chuchu: 2.0,
  Alface: 1.0,
  Laranja: 5.0,
  Banana: 4.0,
};

// Lista de produtos disponíveis
let listaDeProdutos = ["Chuchu", "Alface", "Laranja", "Banana"];

// Imagens e sons do jogo
let imgChuchu, imgAlface, imgLaranja, imgBanana;
let logoEsquerda, logoDireita;
let somCompra, somErro, somFinal;

// Carrega as imagens e sons antes de começar
function preload() {
  logoEsquerda = loadImage("agrinho.png");
  logoDireita = loadImage("general.jpeg");
  imgChuchu = loadImage("Chuchu.jpg");
  imgAlface = loadImage("alface.jpg");
  imgLaranja = loadImage("laranja.jpg");
  imgBanana = loadImage("banana.png");

  somCompra = loadSound("compra.mp3");
  somErro = loadSound("erro.mp3");
  somFinal = loadSound("final.mp3");
}

// Configura o tamanho da tela
function setup() {
  createCanvas(600, 400);
}

// Desenha tudo na tela a cada frame
function draw() {
  background(240); // Fundo clarinho
  if (compraAcabou) {
    telaFinal();
  } else if (!jogoComecou) {
    telaInicial();
  } else {
    telaDoJogo();
  }
}

// Mostra a tela de início
function telaInicial() {
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Bem-vindo ao Jogo da Feira!", width / 2, height / 4); // Título

  textSize(16);
  text("Um jogo pra ligar o campo à cidade.", width / 2, height / 3);
  text("Explore a feira e divirta-se!", width / 2, height / 3 + 20);
  text("Clique em 'Iniciar' pra começar.", width / 2, height / 1.6);

  fill(200);
  rect(width / 2 - 80, height / 1.5, 160, 30); // Botão de iniciar
  fill(0);
  text("Iniciar", width / 2, height / 1.5 + 15);

  image(logoEsquerda, 30, height / 2 - 180, 140, 70); // Logos nas laterais
  image(logoDireita, width - 150, height / 2 - 180, 140, 70);
}

// Mostra a tela principal do jogo
function telaDoJogo() {
  // Coloca produtos no campo se ainda não tiver
  if (produtosNoCampo.length === 0) {
    for (let i = 0; i < listaDeProdutos.length; i++) {
      let nome = listaDeProdutos[i];
      let x, y;
      let posicaoOk = false;
      while (!posicaoOk) {
        x = random(campo.x, campo.x + campo.largura - tamanhoDoProduto);
        y = random(campo.y, campo.y + campo.altura - tamanhoDoProduto);
        posicaoOk = true;
        for (let j = 0; j < produtosNoCampo.length; j++) {
          let distancia = dist(
            x,
            y,
            produtosNoCampo[j].x,
            produtosNoCampo[j].y
          );
          if (distancia < tamanhoDoProduto) {
            posicaoOk = false;
            break;
          }
        }
      }
      produtosNoCampo.push({
        nome: nome,
        x: x,
        y: y,
        imagem: pegaImagem(nome),
        estoque: estoqueInicial,
      });
    }
  }

  // Desenha o campo com gradiente e linhas de terra
  let corEscura = color(34, 139, 34); // Verde escuro
  let corClara = color(144, 238, 144); // Verde claro
  for (let y = campo.y; y <= campo.y + campo.altura; y++) {
    let inter = map(y, campo.y, campo.y + campo.altura, 0, 1);
    let cor = lerpColor(corEscura, corClara, inter);
    stroke(cor);
    line(campo.x, y, campo.x + campo.largura, y);
  }
  stroke(139, 69, 19, 150); // Linhas marrons de terra arada
  for (let i = -campo.largura; i < campo.largura + campo.altura; i += 20) {
    line(
      campo.x + i,
      campo.y,
      campo.x + i + campo.altura,
      campo.y + campo.altura
    );
  }
  noStroke();
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Campo", campo.x + campo.largura / 2, campo.y - 20);

  // Desenha os produtos no campo
  for (let i = 0; i < produtosNoCampo.length; i++) {
    if (produtosNoCampo[i].estoque > 0) {
      image(
        produtosNoCampo[i].imagem,
        produtosNoCampo[i].x,
        produtosNoCampo[i].y,
        tamanhoDoProduto,
        tamanhoDoProduto
      );
      // Mostra quantos itens tem
      fill(255, 255, 255, 200);
      rect(
        produtosNoCampo[i].x + tamanhoDoProduto - 20,
        produtosNoCampo[i].y - 10,
        20,
        20
      );
      fill(0);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(
        produtosNoCampo[i].estoque,
        produtosNoCampo[i].x + tamanhoDoProduto - 10,
        produtosNoCampo[i].y
      );
    }
  }

  // Desenha a feira com gradiente e bolinhas
  let azulEscuro = color(70, 130, 180);
  let azulClaro = color(135, 206, 250);
  for (let y = feira.y; y <= feira.y + feira.altura; y++) {
    let inter = map(y, feira.y, feira.y + feira.altura, 0, 1);
    let cor = lerpColor(azulEscuro, azulClaro, inter);
    stroke(cor);
    line(feira.x, y, feira.x + feira.largura, y);
  }
  noStroke();
  fill(255, 255, 255, 50); // Bolinhas brancas pra parecer barracas
  for (let x = feira.x + 20; x < feira.x + feira.largura; x += 40) {
    for (let y = feira.y + 20; y < feira.y + feira.altura; y += 40) {
      ellipse(x, y, 20, 20);
    }
  }
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Feira do Produtor", feira.x + feira.largura / 2, feira.y - 20);

  // Mostra os produtos comprados na feira
  let xAtual = feira.x + 20;
  let yAtual = feira.y + 20;
  let espaco = 10;
  for (let i = 0; i < produtosComprados.length; i++) {
    image(
      produtosComprados[i].imagem,
      xAtual,
      yAtual,
      tamanhoDoProduto,
      tamanhoDoProduto
    );
    xAtual += tamanhoDoProduto + espaco;
    if (xAtual + tamanhoDoProduto > feira.x + feira.largura) {
      xAtual = feira.x + 20;
      yAtual += tamanhoDoProduto + espaco;
    }
  }

  // Mostra as mensagens e infos da compra
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(0);
  text(mensagem, width / 2, height - 80);

  fill(70, 130, 180);
  text("Saldo: R$ " + saldo.toFixed(2), width / 2, height - 50);
  text("Total a pagar: R$ " + totalDaCompra.toFixed(2), width / 2, height - 30);

  // Botão de finalizar com efeito de hover
  let botaoX = width / 2 - 80;
  let botaoY = height - 20;
  let botaoLargura = 160;
  let botaoAltura = 30;
  if (
    mouseX > botaoX &&
    mouseX < botaoX + botaoLargura &&
    mouseY > botaoY &&
    mouseY < botaoY + botaoAltura
  ) {
    fill(150, 150, 255); // Fica azulzinho quando passa o mouse
  } else {
    fill(200);
  }
  rect(botaoX, botaoY, botaoLargura, botaoAltura);
  fill(0);
  text("Finalizar compra", width / 2, height - 5);

  // Barra que mostra o quanto de saldo sobrou
  let barraLargura = 200;
  let barraAltura = 10;
  let barraX = width / 2 - barraLargura / 2;
  let barraY = height - 110;
  fill(200);
  rect(barraX, barraY, barraLargura, barraAltura); // Fundo da barra
  fill(50, 200, 50);
  let progresso = (saldo / saldoInicial) * barraLargura;
  rect(barraX, barraY, progresso, barraAltura); // Barra verde
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Saldo Restante", barraX + barraLargura / 2, barraY - 10);
}

// Mostra a tela de fim de jogo
function telaFinal() {
  // Desenha a feira igual a tela do jogo
  let azulEscuro = color(70, 130, 180);
  let azulClaro = color(135, 206, 250);
  for (let y = feira.y; y <= feira.y + feira.altura; y++) {
    let inter = map(y, feira.y, feira.y + feira.altura, 0, 1);
    let cor = lerpColor(azulEscuro, azulClaro, inter);
    stroke(cor);
    line(feira.x, y, feira.x + feira.largura, y);
  }
  noStroke();
  fill(255, 255, 255, 50);
  for (let x = feira.x + 20; x < feira.x + feira.largura; x += 40) {
    for (let y = feira.y + 20; y < feira.y + feira.altura; y += 40) {
      ellipse(x, y, 20, 20);
    }
  }
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Feira do Produtor", feira.x + feira.largura / 2, feira.y - 20);

  let xAtual = feira.x + 20;
  let yAtual = feira.y + 20;
  let espaco = 10;
  for (let i = 0; i < produtosComprados.length; i++) {
    image(
      produtosComprados[i].imagem,
      xAtual,
      yAtual,
      tamanhoDoProduto,
      tamanhoDoProduto
    );
    xAtual += tamanhoDoProduto + espaco;
    if (xAtual + tamanhoDoProduto > feira.x + feira.largura) {
      xAtual = feira.x + 20;
      yAtual += tamanhoDoProduto + espaco;
    }
  }

  // Caixa com mensagem final
  let caixaX = 40;
  let caixaY = 60;
  let caixaLargura = 280;
  let caixaAltura = 140;
  fill(255, 255, 255, 230);
  rect(caixaX, caixaY, caixaLargura, caixaAltura, 12);

  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  let texto =
    "Trouxemos os melhores produtos pra cidade!\n\nSua nota: " + notaFinal;
  text(texto, caixaX + 10, caixaY + 10, caixaLargura - 20);

  fill(200);
  rect(caixaX + caixaLargura / 2 - 60, caixaY + caixaAltura + 10, 120, 30, 8); // Botão de voltar
  fill(0);
  textAlign(CENTER, CENTER);
  text("Voltar", caixaX + caixaLargura / 2, caixaY + caixaAltura + 25);

  desenhaBoneco();
}

// Desenha o bonequinho com chapéu
function desenhaBoneco() {
  let x = 50;
  let y = height - 80;

  fill(150, 100, 250); // Corpo roxo
  rect(x, y, 30, 40, 6);

  fill(255, 220, 180); // Rosto
  ellipse(x + 15, y - 15, 30, 30);

  fill(0); // Olhos
  ellipse(x + 10, y - 18, 5, 5);
  ellipse(x + 20, y - 18, 5, 5);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(x + 15, y - 10, 10, 5, 0, PI); // Boca
  noStroke();

  fill(218, 165, 32); // Chapéu
  arc(x + 15, y - 30, 35, 20, PI, 0);
  rect(x + 5, y - 30, 20, 5);
  fill(184, 134, 11);
  rect(x, y - 22, 30, 4);
}

// Lida com os cliques do mouse
function mousePressed() {
  // Começa o jogo
  if (
    !jogoComecou &&
    mouseX > width / 2 - 80 &&
    mouseX < width / 2 + 80 &&
    mouseY > height / 1.5 &&
    mouseY < height / 1.5 + 30
  ) {
    jogoComecou = true;
  }

  // Finaliza a compra
  if (
    jogoComecou &&
    mouseX > width / 2 - 80 &&
    mouseX < width / 2 + 80 &&
    mouseY > height - 20 &&
    mouseY < height + 10
  ) {
    mensagem = "Total: R$ " + totalDaCompra + ". Quanto vai pagar?";
    let valorPago = prompt("Digite o valor (em R$):");

    if (!valorPago || isNaN(valorPago) || parseFloat(valorPago) <= 0) {
      mensagem = "Valor inválido! Tente um número maior que 0.";
      somErro.play();
    } else if (parseFloat(valorPago) < totalDaCompra) {
      mensagem = "Faltou grana! O total é R$ " + totalDaCompra;
      somErro.play();
    } else if (parseFloat(valorPago) <= saldo) {
      saldo -= parseFloat(valorPago);
      mensagem = "Compra paga! Saldo: R$ " + saldo.toFixed(2);
      somCompra.play();

      if (quantosItens > 10 && tiposDeItens.size === listaDeProdutos.length) {
        notaFinal = "Mandou bem demais! Ligou o campo à cidade direitinho.";
      } else if (quantosItens > 5) {
        notaFinal = "Boa compra! Dá pra explorar mais.";
      } else {
        notaFinal = "Tenta comprar mais coisas na próxima!";
      }

      compraAcabou = true;
      somFinal.play();
    } else {
      mensagem = "Não tem saldo pra isso!";
      somErro.play();
    }
  }

  // Compra produtos no campo
  for (let i = 0; i < produtosNoCampo.length; i++) {
    if (
      mouseX > produtosNoCampo[i].x &&
      mouseX < produtosNoCampo[i].x + tamanhoDoProduto &&
      mouseY > produtosNoCampo[i].y &&
      mouseY < produtosNoCampo[i].y + tamanhoDoProduto &&
      produtosNoCampo[i].estoque > 0
    ) {
      let quantos = prompt(
        "Quantos " +
          produtosNoCampo[i].nome +
          " você quer? (Tem: " +
          produtosNoCampo[i].estoque +
          ")"
      );
      quantos = int(quantos);
      if (quantos <= produtosNoCampo[i].estoque && quantos > 0) {
        let custo = precos[produtosNoCampo[i].nome] * quantos;
        if (custo <= saldo) {
          totalDaCompra += custo;
          saldo -= custo;
          produtosNoCampo[i].estoque -= quantos;

          for (let j = 0; j < quantos; j++) {
            produtosComprados.push({
              nome: produtosNoCampo[i].nome,
              imagem: pegaImagem(produtosNoCampo[i].nome),
            });
          }
          quantosItens += quantos;
          tiposDeItens.add(produtosNoCampo[i].nome);

          mensagem =
            "Comprou " + quantos + " " + produtosNoCampo[i].nome + "(s)!";
          somCompra.play();

          if (produtosNoCampo[i].estoque === 0) {
            mensagem += " Acabou o " + produtosNoCampo[i].nome + "!";
          }
        } else {
          mensagem =
            "Sem grana pra comprar " +
            quantos +
            " " +
            produtosNoCampo[i].nome +
            "(s)!";
          somErro.play();
        }
      }
      break;
    }
  }

  // Botão de voltar na tela final
  let caixaX = 40;
  let caixaY = 60;
  let caixaLargura = 280;
  let caixaAltura = 140;
  if (
    mouseX > caixaX + caixaLargura / 2 - 60 &&
    mouseX < caixaX + caixaLargura / 2 + 60 &&
    mouseY > caixaY + caixaAltura + 10 &&
    mouseY < caixaY + caixaAltura + 40
  ) {
    recomecaJogo();
  }
}

// Reseta o jogo pra começar de novo
function recomecaJogo() {
  produtosNoCampo = [];
  produtosComprados = [];
  totalDaCompra = 0;
  quantosItens = 0;
  tiposDeItens.clear();
  saldo = 100.0;
  notaFinal = "";
  mensagem = "";
  compraAcabou = false;
}

// Pega a imagem certa pro produto
function pegaImagem(nome) {
  if (nome === "Chuchu") return imgChuchu;
  if (nome === "Alface") return imgAlface;
  if (nome === "Laranja") return imgLaranja;
  if (nome === "Banana") return imgBanana;
  return null;
}
