let trees = [];
let buildings = [];

function setup() {
  createCanvas(600, 400);
  textSize(16);
}

function draw() {
  // Desenhar o lado esquerdo (campo) com fundo verde
  fill(144, 238, 144); // verde claro
  rect(width/2, 0, width/2, height);
  
  // Desenhar o lado direito (cidade) com fundo azul
  fill(173, 216, 230); // azul claro
  rect(0, 0, width/2, height);
  
  // Desenhar a linha que divide o campo e a cidade
  stroke(0);
  line(width/2, 0, width/2, height);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("Campo", width/4, 20);
  text("Cidade", 3*width/4, 20);
  
  // Desenhar árvores no lado esquerdo (campo)
  for (let tree of trees) {
    fill(34, 139, 34);
    ellipse(tree.x, tree.y, 20, 20);
    fill(139, 69, 19);
    rect(tree.x - 3, tree.y, 6, 10);
  }
  
  // Desenhar prédios no lado direito (cidade)
  for (let b of buildings) {
    fill(100);
    rect(b.x, b.y - b.h, b.w, b.h);
  }
}

function mousePressed() {
  if (mouseX < width/2) {
    // No lado esquerdo, criar uma árvore
    trees.push({x: mouseX, y: mouseY});
  } else {
    // No lado direito, criar um prédio
    let bWidth = random(20, 50);
    let bHeight = random(50, 150);
    buildings.push({x: mouseX - bWidth/2, y: height, w: bWidth, h: bHeight});
  }
}
