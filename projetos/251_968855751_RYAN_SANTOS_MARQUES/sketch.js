let personagem, produtos = [];
let pontuacao = 0;
let cena = "inicio"; // cena pode ser: inicio, jogo
let botao;
let coletaSound, entregaSound, falaInicial, falaColeta, falaEntrega;
let mensagem = "", tempoMensagem = 0;
let textoY = 150;

function preload() {
  personagemImg = loadImage('personagem.png');
  produtoImg = loadImage('produto.png');
  campoImg = loadImage('campo.png');
  cidadeImg = loadImage('cidade.png');

  coletaSound = loadSound('coleta.mp3');
  entregaSound = loadSound('entrega.mp3');

  falaInicial = loadSound('fala_inicial.mp3');// "Bem-vindo ao jogo! Conecte o campo à cidade.Ajude o fazendiro a coletar o leita da vaga e depois vamos entregar na cidade"
  falaColeta = loadSound('fala_coleta.mp3'); // "Que bom que conseguiu coletar o produto, agora vou entregar aos meus clientes!"
  falaEntrega = loadSound('fala_entrega.mp3'); // Consegui entregar tudo! Muito obrigado meus amigos, você está ajudando o campo que é essencial para todos."
}

function setup() {
  createCanvas(800, 400);

  // Criar botão na tela inicial
  botao = createButton('Iniciar Jogo');
  botao.position(width / 2 - 50, 300);
  botao.mousePressed(() => {
    falaInicial.play();
    iniciarJogo();
  });
}

function draw() {
  background(220);

  if (cena === "inicio") {
    desenharTelaInicial();
  } else if (cena === "jogo") {
    image(campoImg, 0, 0, width / 2, height);
    image(cidadeImg, width / 2, 0, width / 2, height);

    personagem.mostrar();
    personagem.mover();

    for (let produto of produtos) {
      produto.mostrar();
      if (!produto.coletado && personagem.coletar(produto)) {
        produto.coletado = true;
        coletaSound.play();
        falaColeta.play();
        mensagem = "Você coletou um produto!";
        tempoMensagem = millis();
      }
    }

    if (personagem.entregar()) {
      pontuacao += 10;
      entregaSound.play();
      falaEntrega.play();
      mensagem = "A agricultura, o agronegócio e o desenvolvimento sustentável são pilares da relação entre campo e cidade. Juntos, podemos construir um futuro melhor.";
      tempoMensagem = millis();
    }

    fill(0);
    textSize(16);
    text('Pontuação: ' + pontuacao, 10, 20);

    if (millis() - tempoMensagem < 4000 && mensagem !== "") {
      fill(255, 255, 200);
      stroke(0);
      strokeWeight(1);
      rect(100, 30, 600, 40, 10);
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(16);
      text(mensagem, width / 2, 50);
    }
  }
}

function desenharTelaInicial() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(50);
  textoY += sin(frameCount * 0.05) * 0.5; // animação leve no texto
  text("Projeto: Do Campo à Cidade – Conexão entre o Homem e o Meio Rural", width / 2, textoY);
  
  textSize(16);
  text("Ajude o personagem a coletar alimentos no campo e entregá-los na cidade.", width / 2, textoY + 60);
  text("Utilize as setas para coletar os produtos e depois leve a cidade para entrega-los.", width / 2, textoY + 90);
   text("Esse jogo mostra como o trabalho rural é essencial para a vida nas cidades.", width / 2, textoY + 30);
}

function iniciarJogo() {
  cena = "jogo";
  botao.hide();
  personagem = new Personagem();
  produtos = [];
  for (let i = 0; i < 5; i++) {
    produtos.push(new Produto());
  }
}

// Classe Personagem
class Personagem {
  constructor() {
    this.x = width / 4;
    this.y = height / 2;
    this.vel = 5;
    this.carga = 0;
  }

  mostrar() {
    image(personagemImg, this.x, this.y, 50, 50);
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.vel;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.vel;
    if (keyIsDown(UP_ARROW)) this.y -= this.vel;
    if (keyIsDown(DOWN_ARROW)) this.y += this.vel;
  }

  coletar(produto) {
    let d = dist(this.x, this.y, produto.x, produto.y);
    if (d < 30) {
      this.carga++;
      return true;
    }
    return false;
  }

  entregar() {
    if (this.x > width / 2 && this.carga > 0) {
      this.carga = 0;
      return true;
    }
    return false;
  }
}

// Classe Produto
class Produto {
  constructor() {
    this.x = random(50, width / 2 - 50);
    this.y = random(50, height - 50);
    this.coletado = false;
  }

  mostrar() {
    if (!this.coletado) {
      image(produtoImg, this.x, this.y, 30, 30);
    }
  }
}