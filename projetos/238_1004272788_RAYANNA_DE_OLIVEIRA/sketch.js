let cards = [];
let cols = 4;
let rows = 3;
let cardWidth = 100;
let cardHeight = 130;

let flippedCards = [];
let matchedPairs = 0;

function setup() {
  createCanvas(cols * cardWidth + 40, rows * cardHeight + 60);
  initCards();
}

function draw() {
  background(220);
  drawGrid();

  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text('Jogo da Memória - Rural & Urbano', width / 2, 10);

  if (matchedPairs === (cols * rows) / 2) {
    fill(0, 150, 0);
    textSize(32);
    text('Parabéns! Você venceu!', width / 2, height - 40);
    noLoop();
  }
}

function mousePressed() {
  for (let card of cards) {
    if (!card.matched && !card.flipped && card.isInside(mouseX, mouseY)) {
      if (flippedCards.length < 2) {
        card.flipped = true;
        flippedCards.push(card);
      }
      break;
    }
  }

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  if (flippedCards[0].type === flippedCards[1].type) {
    flippedCards[0].matched = true;
    flippedCards[1].matched = true;
    matchedPairs++;
  } else {
    flippedCards[0].flipped = false;
    flippedCards[1].flipped = false;
  }
  flippedCards = [];
}

function drawGrid() {
  for (let card of cards) {
    card.display();
  }
}

function initCards() {
  // Tipos de cartas (pares) - ícones simples rurais e urbanos
  let types = ['tree', 'car', 'house', 'tractor', 'building', 'fruit'];
  let cardTypes = types.concat(types); // pares

  shuffleArray(cardTypes);

  for (let i = 0; i < cols * rows; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    cards.push(new Card(20 + col * cardWidth, 50 + row * cardHeight, cardWidth, cardHeight, cardTypes[i]));
  }
}

// Classe Carta
class Card {
  constructor(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.flipped = false;
    this.matched = false;
  }

  display() {
    stroke(0);
    strokeWeight(2);
    if (this.flipped || this.matched) {
      fill(255);
      rect(this.x, this.y, this.w, this.h, 12);
      this.drawIcon();
    } else {
      fill(100, 150, 240);
      rect(this.x, this.y, this.w, this.h, 12);
    }
  }

  isInside(px, py) {
    return px > this.x && px < this.x + this.w &&
           py > this.y && py < this.y + this.h;
  }

  drawIcon() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    noStroke();
    fill(60, 130, 60);
    if (this.type === 'tree') {
      // Árvore
      fill(115, 60, 20);
      rect(-10, 20, 20, 40, 5);
      fill(30, 140, 30);
      ellipse(0, 0, 60, 70);
    } else if (this.type === 'car') {
      // Carro
      fill(220, 50, 50);
      rect(-30, 10, 60, 30, 8);
      ellipse(-20, 40, 25);
      ellipse(20, 40, 25);
      fill(255);
      rect(-10, 0, 40, 20, 5);
    } else if (this.type === 'house') {
      // Casa
      fill(200, 100, 50);
      rect(-30, 10, 60, 40);
      fill(150, 50, 30);
      triangle(-35, 10, 35, 10, 0, -30);
      fill(255, 220, 200);
      rect(-15, 30, 15, 20);
    } else if (this.type === 'tractor') {
      // Trator
      fill(70, 50, 20);
      rect(-35, 15, 50, 20, 6);
      fill(200, 150, 60);
      rect(-25, -10, 30, 30, 8);
      fill(0);
      ellipse(-25, 40, 25);
      ellipse(20, 40, 35);
    } else if (this.type === 'building') {
      // Prédio
      fill(100, 100, 160);
      rect(-25, -20, 50, 80, 6);
      fill(255, 255, 190);
      for(let i = -15; i < 25; i += 20){
        for(let j = -10; j < 60; j += 20){
          rect(i, j, 12, 15, 3);
        }
      }
    } else if (this.type === 'fruit') {
      // Fruta (maçã)
      fill(220, 50, 50);
      ellipse(0, 0, 50, 50);
      fill(30, 150, 30);
      rect(-3, -25, 6, 15, 3);
    }
    pop();
  }
}

// Função para embaralhar o array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
