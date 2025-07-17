let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  // Usando map() para ajustar a cor de fundo de forma mais controlada
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208), map(totalArvores, 0, 100, 0, 1));
  background(corFundo);
  
  mostrarInformacoes();
  temperatura += 0.1;
  
  jardineiro.atualizar();
  jardineiro.mostrar();
  
  // Verifica se o jogo acabou
  verificarFimDeJogo();
  
  // Usando map() para aplicar o comportamento de árvores plantadas
  plantas.forEach((arvore) => arvore.mostrar());
}

function mostrarInformacoes() {
  textSize(16);
  fill(0);
  text("Temperatura: " + nf(temperatura, 1, 1) + " °C", 10, 20);
  text("Árvores plantadas: " + totalArvores, 10, 40);
}

function verificarFimDeJogo() {
  if (totalArvores >= 100) {
    textSize(32);
    fill(0, 255, 0);
    text("Você plantou 100 árvores! Parabéns!", width / 4, height / 2);
    noLoop(); // Pausa o jogo
  }
}

// Classe Jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  atualizar() {
    // Adicione lógica de movimento ou ações do jardineiro
    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        this.x -= 5;
      } else if (keyCode === RIGHT_ARROW) {
        this.x += 5;
      }
    }
    
    // Verifique se o jardineiro pode plantar uma árvore
    if (mouseIsPressed) {
      this.plantarArvore();
    }
  }

  mostrar() {
    fill(255, 0, 0); // Cor do jardineiro
    ellipse(this.x, this.y, 20, 20);
  }

  plantarArvore() {
    if (mouseY > height - 50) {
      let arvore = new Arvore(mouseX, mouseY);
      plantas.push(arvore);
      totalArvores++;
    }
  }
}

// Classe Arvore
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 10;
  }
  
  mostrar() {
    fill(34, 139, 34); // Cor da árvore
    ellipse(this.x, this.y, this.tamanho, this.tamanho);
    this.tamanho += 0.05; // Crescimento da árvore
  }
}
