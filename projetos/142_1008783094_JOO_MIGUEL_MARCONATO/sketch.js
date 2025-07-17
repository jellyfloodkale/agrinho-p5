let esteiraX = 0;
let velocidadeEsteira = 2;
let materiais = []; // Matéria-prima indo para a cidade
let tecnologias = []; // Máquinas voltando para o campo

function setup() {
  createCanvas(800, 400);
  
  // Inicializa alguns materiais (grãos, sacas, etc.)
  for (let i = 0; i < 5; i++) {
    materiais.push({
      x: random( 150, 200),
      y: 250,
      tipo: floor(random(3)) // 0: grãos, 1: madeira, 2: vegetais
    });
  }
  
  // Inicializa algumas tecnologias (tratores, máquinas)
  for (let i = 0; i < 3; i++) {
    tecnologias.push({
      x: random(600, 750),
      y: 250,
      tipo: floor(random(2)) // 0: trator, 1: colheitadeira
    });
  }
}

function draw() {
  background(220);
  
  // Desenha o campo (lado esquerdo)
  fill(100, 250, 190);
  rect(0, 100, width / 2, height);
  
  // Desenha a cidade (lado direito)
  fill(100, 150, 150);
  rect(width / 2, 100, width / 2, height);
  
  // Desenha a esteira (linha central)
  stroke(100);
  line(0, 300, width, 300);
  
  // Anima a esteira (faixas em movimento)
  for (let x = esteiraX % 20; x < width; x += 20) {
    line(x, 290, x + 10, 290);
  }
  esteiraX -= velocidadeEsteira;
  
  // Move e desenha materiais (campo -> cidade)
  for (let i = materiais.length - 1; i >= 0; i--) {
    let m = materiais[i];
    m.x += velocidadeEsteira;
    
    // Desenha de acordo com o tipo
    if (m.tipo === 0) {
      fill(255, 255, 0); // Grãos (amarelo)
      ellipse(m.x, m.y, 30, 20);
    } else if (m.tipo === 1) {
      fill(139, 69, 19); // Madeira (marrom)
      rect(m.x, m.y, 50, 15);
    } else {
      fill(0, 200, 0); // Vegetais (verde)
      ellipse(m.x, m.y, 35, 25);
    }
    
    // Se sair da tela, reinicia no campo
    if (m.x > width + 50) {
      m.x = -50;
    }
  }
  
  // Move e desenha tecnologias (cidade -> campo)
  for (let i = tecnologias.length - 1; i >= 0; i--) {
    let t = tecnologias[i];
    t.x -= velocidadeEsteira;
    
    // Desenha de acordo com o tipo
    if (t.tipo === 0) {
      fill(200, 0, 0); // Trator (vermelho)
      rect(t.x, t.y, 50, 30);
      fill(100);
      ellipse(t.x + 10, t.y + 30, 20, 20);
      ellipse(t.x + 40, t.y + 30, 20, 20);
    } else {
      fill(0, 0, 200); // Colheitadeira (azul)
      rect(t.x, t.y, 60, 35);
      fill(100);
      ellipse(t.x + 15, t.y + 35, 25, 25);
      ellipse(t.x + 45, t.y + 35, 25, 25);
    }
    
    // Se sair da tela, reinicia na cidade
    if (t.x < -100) {
      t.x = width + 50;
    }
  }
  
  // Legenda
  fill(0);
  textSize(16);
  text("Campo (Matéria-Prima)", 50, 50);
  text("Cidade (Tecnologia)", 550, 50);
}