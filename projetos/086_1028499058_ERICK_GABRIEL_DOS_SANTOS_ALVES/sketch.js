let campo = [];
let cidade;
const numProdutos = 15;

function setup() {
  createCanvas(600, 400);
  // Inicializa os "produtos" no lado esquerdo (campo)
  for (let i = 0; i < numProdutos; i++) {
    campo.push({
      x: random(50, 150),
      y: random(50, height - 50),
      size: random(10, 20),
      speedX: random(1, 3)
    });
  }
  // Define a posição da "cidade" no lado direito
  cidade = {
    x: width - 100,
    y: height / 2,
    size: 50
  };
}

function draw() {
  background(135, 206, 235); // Azul claro para o céu

  // Desenha o "campo" (lado esquerdo)
  fill(144, 238, 144); // Verde claro
  rect(0, 0, 200, height);
  fill(0);
  text("Campo", 50, 20);

  // Desenha a "cidade" (lado direito)
  fill(220); // Cinza claro
  ellipse(cidade.x, cidade.y, cidade.size * 1.5, cidade.size);
  fill(0);
  text("Cidade", cidade.x - 30, 20);

  // Move e desenha os produtos do campo para a cidade
  fill(255, 165, 0); // Laranja para os produtos
  for (let produto of campo) {
    ellipse(produto.x, produto.y, produto.size, produto.size);
    produto.x += produto.speedX;
  }

  // Remove os produtos que chegam à cidade (simplificado)
  campo = campo.filter(produto => produto.x < cidade.x + cidade.size);
}