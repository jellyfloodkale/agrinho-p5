let semente;
let terra;
let obstaculos = [];
let pontuacao = 0;
let jogoAtivo = true;
let arvoresPlantadas = 0;
let img; // Variável para armazenar a imagem
let musica;

function preload() {
  img = loadImage('fundo projeto agrinho.png'); // Carrega a imagem antes de começar a execução do sketch
  soundFormats('mp3'); // Define os formatos de áudio suportados
  musica = loadSound('Pou.mp3'); // coloque aqui o nome do seu arquivo mp3
}



function setup() {
 // Configuração inicial do jogo
  createCanvas(410, 600);
  semente = new Semente();
  terra = new Terra();
}




function draw() {
   // Atualiza a tela a cada quadro
  background(img); // fundo verde claro

  if (jogoAtivo) {
      // Se o jogo estiver ativo
    fill(0);
    textSize(20);
    text("Árvores plantadas: " + pontuacao, 10, 25);

    semente.mostrar();
    semente.mover();

    terra.mostrar();

    if (frameCount % 100 === 0) {
      obstaculos.push(new Obstaculo());
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
      obstaculos[i].mover();
      obstaculos[i].mostrar();

      if (obstaculos[i].colidiu(semente)) {
        arvoresPlantadas = pontuacao;
        jogoAtivo = false;
      }

      if (obstaculos[i].y > height) {
        obstaculos.splice(i, 1);
      }
    }

    // Verifica se a semente chegou na terra
    if (semente.y > height - 60) {
      if (semente.x > terra.x && semente.x < terra.x + terra.largura) {
        pontuacao++;
        semente = new Semente(); // nova semente
      } else {
        arvoresPlantadas = pontuacao;
        jogoAtivo = false; // caiu fora
      }
    }
  } else {
     // Fim de jogo
    background(img);
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(0);
    text("Fim de jogo!", width / 2, 60);
    textSize(20);
    text("Árvores plantadas: " + arvoresPlantadas, width / 2, 100);
    text("Clique para jogar novamente", width / 2, 140);

    // desenha árvores plantadas
    desenharArvores(arvoresPlantadas);
  }
}

function desenharArvores(qtd) {
  let espacamento = width / (qtd + 1);
  for (let i = 1; i <= qtd; i++) {
    let x = espacamento * i;
    let y = height - 100;

    // tronco
    fill(139, 69, 19);
    rect(x - 5, y, 10, 30);

    // copa da árvore
    fill(34, 139, 34);
    ellipse(x, y, 40);
  }
}

function mousePressed() {
   // Reinicia o jogo quando o mouse é clicado após o fim
  if (!jogoAtivo) {
    semente = new Semente();
    obstaculos = [];
    pontuacao = 0;
    arvoresPlantadas = 0;
    jogoAtivo = true;
  }
}

function keyPressed() {
  // Move a semente com as setas do teclado
  if (keyCode === LEFT_ARROW) {
    semente.x -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    semente.x += 20;
  }
}

class Semente {
  constructor() {
    this.x = width / 2;
    this.y = 0;
    this.raio = 15;
    this.vel = 4;
  }

  mostrar() {
    // corpo da semente
    fill(139, 69, 19); // marrom
    ellipse(this.x, this.y, this.raio * 1.2, this.raio * 2); // formato oval vertical

    // rachadura no meio
    stroke(100, 50, 20);
    strokeWeight(2);
    line(this.x, this.y - this.raio * 0.9, this.x, this.y + this.raio * 0.9);
    noStroke();
  }

  mover() {
    this.y += this.vel;
  }
}

class Terra {
  constructor() {
    this.largura = 80;
    this.altura = 40;
    this.x = width / 2 - this.largura / 2;
    this.y = height - 40;
  }

  mostrar() {
    fill(101, 67, 33); // marrom escuro
    rect(this.x, this.y, this.largura, this.altura);
  }
}

class Obstaculo {
  constructor() {
    this.x = random(50, width - 50);
    this.y = -20;
    this.largura = random(50, 100);
    this.altura = 20;
    this.vel = 3;
  }

  mover() {
    this.y += this.vel;
  }

  mostrar() {
    fill(120);
    rect(this.x, this.y, this.largura, this.altura);
  }

  colidiu(semente) {
     // Verifica colisão com a semente
    return (
      semente.x > this.x &&
      semente.x < this.x + this.largura &&
      semente.y + this.sementeAltura() > this.y &&
      semente.y - this.sementeAltura() < this.y + this.altura
    );
  }

  sementeAltura() {
    return 15 * 2; // altura visual da semente (ellipse vertical)
  }
}

function mousePressed() {
  // Inicia a reprodução quando o mouse é pressionado.
  musica.play();
}