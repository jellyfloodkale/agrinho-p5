function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let trees = []; // Array para armazenar as informações de cada árvore
let allFireOut = false; // Variável para controlar se todo o fogo foi apagado
const NUMBER_OF_TREES = 15; // Número de árvores
const MIN_DISTANCE_BETWEEN_TREES = 50; // Distância mínima (pixels) entre os centros das árvores

function setup() {
  createCanvas(1000, 400); // Tela maior para acomodar mais árvores

  // Tentar criar as árvores até atingir o número desejado
  let attempts = 0;
  while (trees.length < NUMBER_OF_TREES && attempts < 1000) { // Limitar tentativas para evitar loop infinito
    let newTreeX = random(30, width - 30); // Posição X aleatória, com margem
    let newTreeY = height - 50; // Todas na mesma linha na base do chão
    let newTreeWidth = 30; // Árvores um pouco mais finas
    let newTreeHeight = 80; // Árvores um pouco mais baixas
    let newFireOn = random(1) > 0.4; // 60% de chance de começar com fogo

    let overlapping = false;
    // Verificar se a nova árvore se sobrepõe a alguma árvore já existente
    for (let i = 0; i < trees.length; i++) {
      let existingTree = trees[i];
      // Calcula a distância entre os centros das árvores
      let distance = dist(newTreeX + newTreeWidth / 2, newTreeY,
                          existingTree.x + existingTree.width / 2, existingTree.y);

      if (distance < MIN_DISTANCE_BETWEEN_TREES) {
        overlapping = true;
        break; // Há sobreposição, não adicione esta árvore
      }
    }

    // Se não houver sobreposição, adicione a nova árvore
    if (!overlapping) {
      trees.push({
        x: newTreeX,
        y: newTreeY,
        width: newTreeWidth,
        height: newTreeHeight,
        fireOn: newFireOn
      });
    }
    attempts++;
  }
}

function draw() {
  background(100, 150, 255); // Céu azul
  drawGround(); // Desenha o chão

  // Desenha cada árvore e seu fogo, se houver
  for (let i = 0; i < trees.length; i++) {
    let tree = trees[i];
    drawTree(tree.x, tree.y, tree.width, tree.height);

    if (tree.fireOn) {
      drawFire(tree.x + tree.width / 2, tree.y - tree.height);
    }
  }

  // Verifica se todo o fogo foi apagado
  checkAllFireOut();

  // Se todo o fogo foi apagado, exibe a mensagem
  if (allFireOut) {
    displaySuccessMessage();
  }
}

// --- Funções de Desenho ---

function drawGround() {
  noStroke();
  fill(50, 160, 50); // Cor de grama
  rect(0, height - 50, width, 50); // Chão
}

function drawTree(x, y, w, h) {
  // Tronco
  fill(139, 69, 19); // Marrom
  rect(x, y - h, w, h);

  // Copa da árvore (simplificada com triângulo)
  fill(34, 139, 34); // Verde
  triangle(x - w / 2, y - h, x + w + w / 2, y - h, x + w / 2, y - h * 2);
}

function drawFire(x, y) {
  for (let i = 0; i < 40; i++) { // Diminui um pouco as partículas de fogo para otimizar
    let fireColor;
    let randSize = random(8, 25); // Tamanho das partículas
    let randX = x + random(-12, 12);
    let randY = y + random(0, 30);

    if (random(1) < 0.3) {
      fireColor = color(255, 0, 0, 200);
    } else if (random(1) < 0.6) {
      fireColor = color(255, 165, 0, 200);
    } else {
      fireColor = color(255, 255, 0, 200);
    }

    noStroke();
    fill(fireColor);
    ellipse(randX, randY, randSize, randSize * random(0.5, 1.5));
  }
}

// --- Lógica do Jogo ---

function checkAllFireOut() {
  let firesBurning = 0;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i].fireOn) {
      firesBurning++;
    }
  }

  if (firesBurning === 0) {
    allFireOut = true; // Se nenhuma árvore estiver pegando fogo, define como true
  } else {
    allFireOut = false; // Caso contrário, garante que seja false
  }
}

function displaySuccessMessage() {
  fill(0, 0, 0, 180); // Fundo escuro semitransparente para a mensagem
  rect(0, height / 2 - 40, width, 80); // Retângulo no centro da tela

  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255); // Texto branco
  text("VOCÊ CONSEGUIU CONTER O FOGO!", width / 2, height / 2);
}

// --- Interação do Usuário ---

function mousePressed() {
  // Só permite apagar o fogo se a mensagem de sucesso não estiver aparecendo
  if (!allFireOut) {
    for (let i = 0; i < trees.length; i++) {
      let tree = trees[i];

      // Calcula a área de clique para cada árvore (a copa)
      let fireAreaX = tree.x - tree.width / 2;
      let fireAreaY = tree.y - tree.height * 2;
      let fireAreaWidth = tree.width * 2;
      let fireAreaHeight = tree.height * 1.5;

      if (mouseX > fireAreaX && mouseX < fireAreaX + fireAreaWidth &&
          mouseY > fireAreaY && mouseY < fireAreaY + fireAreaHeight) {
        tree.fireOn = !tree.fireOn; // Inverte o estado do fogo apenas para a árvore clicada
        break; // Sai do loop assim que uma árvore é clicada para evitar múltiplos toggles
      }
    }
  }
}
