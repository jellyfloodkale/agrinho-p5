let personagem;
let sementes = [];
let alturaChao;

function setup() {
  createCanvas(800, 600); // Cria uma tela de 800x600 pixels
  alturaChao = height - 150; // Define a altura do chão
  personagem = new Personagem(); // Cria uma instância do personagem
}

function draw() {
  background(135, 206, 235); // Céu azul
  fill(34, 139, 34); // Chão verde
  rect(0, alturaChao, width, 150); // Desenha o chão

  personagem.mostrar(); // Mostra o personagem
  personagem.mover(); // Atualiza a posição do personagem

  for (let i = 0; i < sementes.length; i++) {
    sementes[i].mostrar(); // Mostra cada semente
    sementes[i].crescer(); // Atualiza o crescimento da semente
  }
}

function keyPressed() {
  if (key === ' ') { // Tecla espaço
    sementes.push(new Semente(personagem.x, alturaChao - 20)); // Cria uma nova semente na posição do personagem
  }
}

class Personagem {
  constructor() {
    this.x = width / 2; // Posição inicial do personagem
    this.y = alturaChao - 16; // Posiciona o personagem no chão
    this.tamanho = 30; // Tamanho do personagem
  }

  mostrar() {
    fill(0, 0, 255); // Cor azul para o personagem
    ellipse(this.x, this.y, this.tamanho); // Desenha o personagem
  }

  mover() {
    if (keyIsDown(LEFT_ARROW) && this.x > 15) { // Limita o movimento para a esquerda
      this.x -= 5; 
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - 15) { // Limita o movimento para a direita
      this.x += 5; 
    }
    // O personagem não se move verticalmente
  }
}

class Semente {
  constructor(x, y) {
    this.x = x; // Posição x da semente
    this.y = y; // Posição y da semente
    this.tamanho = 5; // Tamanho da semente
    this.crescendo = true; // Indica se a semente está crescendo

    // Após 5 segundos, a semente se transforma em árvore
    setTimeout(() => {
      this.crescendo = false; // A semente para de crescer
    }, 3000); // 3 segundos
  }

  mostrar() {
    if (this.crescendo) {
      fill(139, 69, 19); // Cor marrom para a semente
      ellipse(this.x, this.y, this.tamanho); // Desenha a semente
    } else {
      this.desenharArvore(); // Desenha a árvore
    }
  }

  desenharArvore() {
    fill(139, 69, 19); // Cor marrom para o tronco
    rect(this.x - 5, this.y, 10, 20); // Desenha o tronco da árvore
    fill(0, 255, 0); // Cor verde para a copa da árvore
    ellipse(this.x, this.y - 15, 50); // Desenha a copa da árvore

    // Desenha maçãs na árvore
    fill(255, 0, 0); // Cor vermelha para as maçãs
    ellipse(this.x - 15, this.y - 25, 10); // Maçã à esquerda
    ellipse(this.x + 15, this.y - 25, 10); // Maçã à direita
    ellipse(this.x, this.y - 30, 10); // Maçã no centro
  }

  crescer() {
    // Esta função pode ser usada para adicionar lógica de crescimento se necessário
  }
}