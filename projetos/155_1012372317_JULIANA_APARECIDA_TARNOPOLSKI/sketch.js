// Funções de Desenho para Elementos do Cenário (Reutilizáveis)
function drawTree(x, y) {
  stroke(0); // Cor do contorno: preto
  strokeWeight(2); // Espessura do contorno

  // Tronco
  fill(101, 67, 33); // Marrom
  rect(x, y, 20, 80);

  // Copa
  fill(0, 128, 0); // Verde
  ellipse(x + 10, y - 40, 80, 80);

  // Maçãs (sem contorno) - para árvores no cenário de jogo
  noStroke();
  fill(255, 0, 0); // Vermelho
  ellipse(x + 5, y - 30, 10, 10);
  ellipse(x + 25, y - 45, 10, 10);
  ellipse(x + 15, y - 20, 10, 10);

  strokeWeight(1); // Resetando a espessura do contorno para outros elementos
}

function drawTractor(x, y) {
  stroke(0); // Cor do contorno: preto
  strokeWeight(2); // Espessura do contorno

  // Corpo do trator
  fill(255, 204, 0); // Amarelo
  rect(x, y, 60, 30);

  // Rodas
  fill(0); // Preto
  ellipse(x + 15, y + 30, 20, 20);
  ellipse(x + 45, y + 30, 20, 20);

  // Cabine
  fill(100); // Cinza
  rect(x + 30, y - 20, 30, 20);

  strokeWeight(1); // Resetando a espessura do contorno para outros elementos
}

// FUNÇÃO PARA DESENHAR UM MOSQUITINHO
function drawMosquito(x, y, size) {
  fill(0); // Cor preta para o mosquitinho
  ellipse(x, y, size, size / 2); // Corpo do mosquitinho (formato oval)

  // Pequenas "asas" ou antenas para dar a ideia
  stroke(0); // Contorno preto
  strokeWeight(1); // Espessura fina
  line(x - size / 4, y - size / 4, x - size / 2, y - size / 2); // Asa/Antena 1
  line(x + size / 4, y - size / 4, x + size / 2, y - size / 2); // Asa/Antena 2
  noStroke(); // Remove o contorno para os próximos desenhos
}

// Função para desenhar o Chef de Cozinha (simplificado)
function drawChef(x, y) {
  // Corpo
  stroke(0);
  strokeWeight(2);
  fill(255); // Branco
  rect(x, y, 50, 70); // Corpo do chef

  // Cabeça
  fill(255, 220, 180); // Cor de pele
  ellipse(x + 25, y - 10, 40, 40); // Cabeça

  // Chapéu de chef
  fill(255); // Branco
  ellipse(x + 25, y - 35, 60, 30); // Base do chapéu
  rect(x, y - 50, 50, 20); // Topo do chapéu (ajustado para ser mais visível)

  // Rosto simples
  noStroke(); // Olhos e boca sem contorno
  fill(0); // Olhos pretos
  ellipse(x + 18, y - 12, 5, 5);
  ellipse(x + 32, y - 12, 5, 5);
  line(x + 20, y - 5, x + 30, y - 5); // Boca

  // Gravata borboleta
  fill(0); // Preto
  rect(x + 15, y + 20, 20, 10);
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno
}

// Função para desenhar a torta de banana
function drawBananaPie(x, y, size) {
  stroke(0);
  strokeWeight(2);
  // Base da torta
  fill(139, 69, 19); // Marrom (cor da massa)
  ellipse(x, y, size, size * 0.7); // Base oval

  // Recheio de banana (amarelo claro)
  fill(255, 255, 150);
  ellipse(x, y, size * 0.8, size * 0.6); // Recheio um pouco menor

  // Detalhes da casquinha (opcional)
  line(x - size / 2, y, x + size / 2, y);
  line(x, y - size * 0.35, x, y + size * 0.35);
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno
}

// Função para desenhar a Barraca do Mercadinho
function drawMarketStall(x, y, width, height) {
  stroke(0);
  strokeWeight(2);
  // Teto da barraca (triângulo ou retangulo inclinado)
  fill(200, 50, 50); // Vermelho
  triangle(x - 20, y, x + width + 20, y, x + width / 2, y - height * 0.8);
  rect(x - 20, y, width + 40, 10); // Base do teto

  // Postes de sustentação
  fill(139, 69, 19); // Marrom
  rect(x, y, 10, height);
  rect(x + width - 10, y, 10, height);

  // Balcão
  fill(160, 82, 45); // Marrom claro
  rect(x, y + height - 30, width, 30);

  // Placa "Mercadinho"
  fill(255); // Branco
  rect(x + width / 2 - 50, y - height * 0.8 - 40, 100, 30);
  fill(0);
  noStroke(); // Texto sem contorno
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Mercadinho", x + width / 2, y - height * 0.8 - 25);
  strokeWeight(1); // Resetando a espessura do contorno
}

// Função para desenhar o Cenário da Mercearia (para Melancia)
function drawMerceariaScenario() {
  background(180, 200, 220); // Um tom de azul/cinza para um ambiente interno
  fill(100); // Chão cinza
  rect(0, height * 0.7, width, height * 0.3);

  stroke(0);
  strokeWeight(2);
  // Balcão da Mercearia
  fill(130, 90, 60); // Marrom mais escuro para o balcão
  rect(width / 2 - 200, height * 0.5, 400, 100); // Balcão principal
  fill(90, 60, 30); // Base do balcão
  rect(width / 2 - 200, height * 0.6, 400, 20);

  // Prateleiras simples (opcional)
  fill(160, 120, 90);
  rect(50, height * 0.3, 100, 150); // Prateleira esquerda
  rect(width - 150, height * 0.3, 100, 150); // Prateleira direita
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Melancias entregues no balcão
  let watermelonStartX = width / 2 - 150;
  let watermelonStartY = height * 0.5 - 40;
  let melonSize = 60;

  for (let i = 0; i < pedidoAtual.quantidade; i++) {
    // Desenho da melancia com duas cores (verde e vermelho/rosa)
    stroke(0);
    strokeWeight(1); // Contorno mais fino para a melancia
    fill(0, 128, 0); // Verde para a casca
    ellipse(watermelonStartX + (i * (melonSize + 10)), watermelonStartY, melonSize, melonSize);
    fill(255, 100, 100); // Miolo vermelho/rosa
    ellipse(watermelonStartX + (i * (melonSize + 10)), watermelonStartY, melonSize * 0.8, melonSize * 0.8);
    noStroke();
  }

  // Mensagem no cenário
  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text(`As ${pedidoAtual.quantidade} melancias foram entregues\nna Mercearia da Esquina!`, width / 2, 30);
  textSize(20);
  text("As prateleiras agora estão cheias de melancias frescas!", width/2, height * 0.2);

  // Adiciona um atraso para a transição automática
  if (frameCount > initialFrameCount + 300) { // Tempo: 5 segundos
    console.log("DEBUG: Cenário da Mercearia terminado. Reiniciando jogo."); // DEBUG
    restartGameForNextOrder();
  }
}

// Cenário do Restaurante Saboroso (para Bananas)
function drawRestaurantScenario() {
  background(150, 200, 255); // Azul claro para o fundo
  fill(100); // Chão cinza
  rect(0, height * 0.7, width, height * 0.3);

  stroke(0);
  strokeWeight(2);
  // Prédio do restaurante
  fill(255); // Branco
  rect(width / 2 - 150, height * 0.3, 300, 250); // Corpo do prédio
  fill(200); // Telhado cinza
  triangle(width / 2 - 150, height * 0.3, width / 2 + 150, height * 0.3, width / 2, height * 0.1);

  // Porta
  fill(139, 69, 19); // Marrom
  rect(width / 2 - 30, height * 0.55, 60, 100);

  // Janelas
  fill(173, 216, 230); // Azul claro
  rect(width / 2 - 100, height * 0.4, 40, 40);
  rect(width / 2 + 60, height * 0.4, 40, 40);
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Placa "Restaurante Saboroso"
  fill(255, 255, 0); // Amarelo
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 100, height * 0.25, 200, 40);
  fill(0);
  noStroke(); // Texto sem contorno
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Restaurante Saboroso", width / 2, height * 0.27);
  strokeWeight(1); // Resetando a espessura do contorno

  // Desenha o Chef de Cozinha recebendo as bananas
  drawChef(width / 2 - 25, height * 0.6);

  // Mensagem de entrega
  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text(`As ${pedidoAtual.quantidade} bananas foram entregues\nno Restaurante Saboroso!`, width / 2, 30);
  textSize(20);
  text("O Chef fará tortas deliciosas com elas!", width/2, height * 0.2);

  // Torta de banana na frente do chef (simboliza a entrega)
  drawBananaPie(width / 2 + 80, height * 0.7, 80);

  // Adiciona um atraso para a transição automática
  if (frameCount > initialFrameCount + 300) { // Tempo: 5 segundos
    console.log("DEBUG: Cenário do Restaurante terminado. Reiniciando jogo."); // DEBUG
    restartGameForNextOrder();
  }
}

// Cenário do Mercadinho Vila Feliz (para Maçãs)
function drawMercadinhoScenario() {
  background(135, 206, 235); // Céu
  fill(34, 139, 34); // Gramado
  rect(0, height * 0.7, width, height * 0.3);

  // Desenha a barraca do mercadinho
  drawMarketStall(width / 2 - 100, height * 0.3, 200, 200);

  // Maçãs na bancada do mercadinho (simbolizam a entrega)
  stroke(0);
  strokeWeight(1); // Contorno mais fino para as maçãs
  fill(255, 0, 0); // Vermelho
  let appleSize = 30;
  let startX = width / 2 - 80;
  let startY = height * 0.7 - 20;

  for (let i = 0; i < pedidoAtual.quantidade; i++) {
    ellipse(startX + (i % 5) * (appleSize + 5), startY - floor(i / 5) * (appleSize / 2), appleSize, appleSize);
  }
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Mensagem de entrega
  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text(`As ${pedidoAtual.quantidade} maçãs foram entregues\nno Mercadinho Vila Feliz!`, width / 2, 30);
  textSize(20);
  text("As prateleiras agora estão cheias de frutas frescas!", width/2, height * 0.2);

  // Adiciona um atraso para a transição automática
  if (frameCount > initialFrameCount + 300) { // Tempo: 5 segundos
    console.log("DEBUG: Cenário do Mercadinho terminado. Reiniciando jogo."); // DEBUG
    restartGameForNextOrder();
  }
}

// Cenário do Hospital Saúde Certa (para Uvas)
function drawHospitalScenario() {
  background(173, 216, 230); // Azul claro para o céu/fundo do hospital
  fill(200); // Chão cinza claro
  rect(0, height * 0.7, width, height * 0.3);

  stroke(0);
  strokeWeight(2);
  // Prédio do Hospital
  fill(255); // Branco
  rect(width / 2 - 180, height * 0.25, 360, 280); // Corpo do prédio
  fill(180); // Telhado/parte superior
  rect(width / 2 - 180, height * 0.25, 360, 30);

  // Cruz Vermelha (símbolo de hospital)
  noStroke(); // Cruz sem contorno para se destacar
  fill(255, 0, 0); // Vermelho
  rect(width / 2 - 20, height * 0.3, 40, 100);
  rect(width / 2 - 50, height * 0.35, 100, 40);
  stroke(0);
  strokeWeight(2);

  // Janelas
  fill(173, 216, 230); // Azul claro para janelas
  rect(width / 2 - 150, height * 0.35, 40, 40);
  rect(width / 2 + 110, height * 0.35, 40, 40);
  rect(width / 2 - 150, height * 0.45, 40, 40);
  rect(width / 2 + 110, height * 0.45, 40, 40);

  // Porta
  fill(139, 69, 19); // Marrom para a porta
  rect(width / 2 - 40, height * 0.5, 80, 100);
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Mensagem de entrega
  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text(`As ${pedidoAtual.quantidade} uvas foram entregues\nno Hospital Saúde Certa!`, width / 2, 30);
  textSize(20);
  text("Os pacientes vão adorar essa fruta nutritiva!", width/2, height * 0.2);

  // Desenha as uvas entregues na frente do hospital
  stroke(0);
  strokeWeight(1); // Contorno mais fino para as uvas
  fill(coresFrutas.grape[0], coresFrutas.grape[1], coresFrutas.grape[2]); // Cor da uva (roxo)
  let grapeSize = 25;
  let grapeStartX = width / 2 - 60;
  let grapeStartY = height * 0.7 - 50;

  // Desenha um cacho de uvas simbolizando a entrega
  ellipse(grapeStartX, grapeStartY, grapeSize, grapeSize);
  ellipse(grapeStartX + grapeSize * 0.7, grapeStartY, grapeSize, grapeSize);
  ellipse(grapeStartX - grapeSize * 0.7, grapeStartY, grapeSize, grapeSize);
  ellipse(grapeStartX + grapeSize * 0.35, grapeStartY + grapeSize * 0.6, grapeSize, grapeSize);
  ellipse(grapeStartX - grapeSize * 0.35, grapeStartY + grapeSize * 0.6, grapeSize, grapeSize);
  ellipse(grapeStartX, grapeStartY + grapeSize * 1.2, grapeSize, grapeSize);

  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Adiciona um atraso para a transição automática
  if (frameCount > initialFrameCount + 300) { // Tempo: 5 segundos
    console.log("DEBUG: Cenário do Hospital terminado. Reiniciando jogo."); // DEBUG
    restartGameForNextOrder();
  }
}

// Cenário da Escola Aprender Feliz (para Morangos)
function drawEscolaScenario() {
  background(135, 206, 235); // Céu
  fill(34, 139, 34); // Gramado
  rect(0, height * 0.7, width, height * 0.3);

  stroke(0);
  strokeWeight(2);
  // Prédio da Escola
  fill(255, 255, 150); // Amarelo claro para a escola
  rect(width / 2 - 200, height * 0.3, 400, 250); // Corpo do prédio
  fill(160, 82, 45); // Marrom para o telhado
  triangle(width / 2 - 200, height * 0.3, width / 2 + 200, height * 0.3, width / 2, height * 0.15);

  // Porta da escola
  fill(139, 69, 19); // Marrom
  rect(width / 2 - 30, height * 0.5, 60, 80);

  // Janelas (quadradas e grandes)
  fill(173, 216, 230); // Azul claro
  rect(width / 2 - 150, height * 0.4, 60, 60);
  rect(width / 2 + 90, height * 0.4, 60, 60);
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Placa "Escola Aprender Feliz"
  fill(255); // Branco
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 100, height * 0.15 - 40, 200, 40); // Posiciona a placa um pouco mais para cima
  fill(0);
  noStroke(); // Texto sem contorno
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Escola Aprender Feliz", width / 2, height * 0.15 - 20); // Posiciona o texto da placa
  strokeWeight(1); // Resetando a espessura do contorno
  
  // Desenha os morangos na frente da escola (como se estivessem sendo entregues)
  let strawberrySize = 40;
  let strawberryStartX = width / 2 - 100;
  let strawberryStartY = height * 0.7 - 30;

  for (let i = 0; i < pedidoAtual.quantidade; i++) {
    let xOffset = (i % 4) * (strawberrySize + 10);
    let yOffset = floor(i / 4) * (strawberrySize / 2);
    
    stroke(0);
    strokeWeight(1); // Contorno mais fino para os morangos
    // Corpo do morango (vermelho)
    fill(coresFrutas.strawberry[0][0], coresFrutas.strawberry[0][1], coresFrutas.strawberry[0][2]);
    beginShape();
    vertex(strawberryStartX + xOffset, strawberryStartY + yOffset - strawberrySize * 0.5); // Topo
    bezierVertex(strawberryStartX + xOffset + strawberrySize * 0.4, strawberryStartY + yOffset - strawberrySize * 0.7, 
                 strawberryStartX + xOffset + strawberrySize * 0.5, strawberryStartY + yOffset + strawberrySize * 0.2, 
                 strawberryStartX + xOffset, strawberryStartY + yOffset + strawberrySize * 0.5); // Lado direito e ponta
    bezierVertex(strawberryStartX + xOffset - strawberrySize * 0.5, strawberryStartY + yOffset + strawberrySize * 0.2, 
                 strawberryStartX + xOffset - strawberrySize * 0.4, strawberryStartY + yOffset - strawberrySize * 0.7, 
                 strawberryStartX + xOffset, strawberryStartY + yOffset - strawberrySize * 0.5); // Lado esquerdo e topo
    endShape(CLOSE);

    // Folhas (verde)
    fill(coresFrutas.strawberry[1][0], coresFrutas.strawberry[1][1], coresFrutas.strawberry[1][2]);
    triangle(strawberryStartX + xOffset - strawberrySize * 0.2, strawberryStartY + yOffset - strawberrySize * 0.55,
             strawberryStartX + xOffset - strawberrySize * 0.05, strawberryStartY + yOffset - strawberrySize * 0.8,
             strawberryStartX + xOffset, strawberryStartY + yOffset - strawberrySize * 0.6);
    triangle(strawberryStartX + xOffset + strawberrySize * 0.2, strawberryStartY + yOffset - strawberrySize * 0.55,
             strawberryStartX + xOffset + strawberrySize * 0.05, strawberryStartY + yOffset - strawberrySize * 0.8,
             strawberryStartX + xOffset, strawberryStartY + yOffset - strawberrySize * 0.6);
    triangle(strawberryStartX + xOffset - strawberrySize * 0.05, strawberryStartY + yOffset - strawberrySize * 0.5,
             strawberryStartX + xOffset + strawberrySize * 0.05, strawberryStartY + yOffset - strawberrySize * 0.5,
             strawberryStartX + xOffset, strawberryStartY + yOffset - strawberrySize * 0.75);
    
    // Sementinhas (pretas)
    fill(0);
    let seedSize = strawberrySize * 0.05;
    ellipse(strawberryStartX + xOffset - strawberrySize * 0.15, strawberryStartY + yOffset + strawberrySize * 0.1, seedSize, seedSize);
    ellipse(strawberryStartX + xOffset + strawberrySize * 0.15, strawberryStartY + yOffset + strawberrySize * 0.1, seedSize, seedSize);
    ellipse(strawberryStartX + xOffset, strawberryStartY + yOffset - strawberrySize * 0.1, seedSize, seedSize);
    ellipse(strawberryStartX + xOffset - strawberrySize * 0.2, strawberryStartY + yOffset + strawberrySize * 0.2, seedSize, seedSize);
    ellipse(strawberryStartX + xOffset + strawberrySize * 0.2, strawberryStartY + yOffset + strawberrySize * 0.2, seedSize, seedSize);
  }
  noStroke();
  strokeWeight(1); // Resetando a espessura do contorno

  // Mensagem de entrega
  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text(`Os ${pedidoAtual.quantidade} morangos foram entregues\nna Escola Aprender Feliz!`, width / 2, 30);
  textSize(20);
  text("As crianças terão um lanche delicioso e saudável!", width/2, height * 0.2);

  // Adiciona um atraso para a transição automática
  if (frameCount > initialFrameCount + 300) { // Tempo: 5 segundos
    console.log("DEBUG: Cenário da Escola terminado. Reiniciando jogo."); // DEBUG
    restartGameForNextOrder();
  }
}

// Variável para controle de tempo nas telas de transição
let initialFrameCount;
// Variável para evitar chamadas múltiplas de noLoop()
let gameEnded = false;


// --- Variáveis Globais do Jogo ---
let cat;
let basket;
let fruits = [];
let mosquitos = []; // Array para armazenar os mosquitinhos

let score = 0;
let pedidoAtual;
let jogoIniciado = false; // Mantém a variável para compatibilidade com o mouseMoved original
let gameState = 'title_screen'; // NOVO: Controla o estado do jogo
let finalScore = 0; // Armazena a pontuação final para exibir no cenário, se necessário

let pedidos = [
  { local: "Mercadinho Vila Feliz", fruta: "apple", quantidade: 5, mensagem: "Olá! Aqui do Mercadinho Vila Feliz, estamos precisando de 5 maçãs. Você pode trazê-las para nós?", scenario: "mercadinho" },
  { local: "Restaurante Saboroso", fruta: "banana", quantidade: 8, mensagem: "Bom dia! Do Restaurante Saboroso, gostaríamos de 8 bananas frescas. Pode nos ajudar?", scenario: "restaurant" },
  { local: "Hospital Saúde Certa", fruta: "grape", quantidade: 12, mensagem: "Olá! Aqui do Hospital Saúde Certa, precisamos de 12 uvas para nossos pacientes. Você consegue nos ajudar?", scenario: "hospital" },
  { local: "Escola Aprender Feliz", fruta: "strawberry", quantidade: 7, mensagem: "Atenção! Da Escola Aprender Feliz, as crianças adorariam 7 morangos. Você pode trazer?", scenario: "escola" },
  { local: "Mercearia da Esquina", fruta: "watermelon", quantidade: 3, mensagem: "Oi! Da Mercearia da Esquina, estamos sem 3 melancias. Você pode nos fornecer algumas?", scenario: "mercearia" },
  { local: "Hotel Aconchego", fruta: "apple", quantidade: 6, mensagem: "Saudações! Do Hotel Aconchego, nossos hóspedes pediram 6 maçãs. Você pode nos ajudar a consegui-las?", scenario: "mercadinho" },
  { local: "Creche Mundo Encantado", fruta: "banana", quantidade: 9, mensagem: "Olá! Da Creche Mundo Encantado, as crianças querem muito 9 bananas. Você pode trazer algumas?", scenario: "restaurant" }
];

// Mapeamento de cores para as frutas.
// Para frutas de uma cor, usa um array de 3 elementos [R, G, B].
// Para frutas com múltiplas cores (como melancia), usa um array de arrays de cores.
let coresFrutas = {
  apple: [255, 0, 0],         // Vermelho
  banana: [255, 255, 0],      // Amarelo
  grape: [128, 0, 128],       // Roxo
  watermelon: [[0, 128, 0], [255, 100, 100]], // Verde (casca) e Vermelho/Rosa (miolo)
  strawberry: [[255, 0, 0], [0, 255, 0]], // Vermelho (fruta) e Verde (folhas)
  pear: [144, 238, 144]        // Verde claro
};

// Informações nutricionais e curiosidades sobre as frutas
let infoFrutas = {
  apple: {
    nome: "Maçã",
    vitaminas: "Vitamina C, fibras",
    beneficios: "boa para o coração, ajuda na digestão",
    paraQueServe: "fortalecer o sistema imunológico, regula o intestino"
  },
  banana: {
    nome: "Banana",
    vitaminas: "Potássio, Vitamina B6",
    beneficios: "fornece energia, boa para os músculos e nervos",
    paraQueServe: "previnir cãibras, melhora o humor"
  },
  grape: {
    nome: "Uva",
    vitaminas: "Antioxidantes, Vitamina K",
    beneficios: "protege contra radicais livres, boa para os ossos",
    paraQueServe: "previnir envelhecimento, ajuda na coagulação sanguínea"
  },
  strawberry: {
    nome: "Morango",
    vitaminas: "Vitamina C, Manganês",
    beneficios: "antioxidante, bom para a pele",
    paraQueServe: "fortalecer a imunidade, contribui para a saúde dos ossos"
  },
  watermelon: {
    nome: "Melancia",
    vitaminas: "Vitamina A, Licopeno",
    beneficios: "hidratante, antioxidante",
    paraQueServe: "ajudar na hidratação, protege contra danos celulares"
  },
  pear: {
    nome: "Pera",
    vitaminas: "Fibras, Vitamina K",
    beneficios: "boa para a digestão, saúde dos ossos",
    paraQueServe: "ajudar a regular o trânsito intestinal, importante para a coagulação"
  }
};


// --- Funções Essenciais do P5.js ---

function preload() {
  // Aqui você pode carregar imagens se desejar usar no futuro. Ex:
  // catImg = loadImage('assets/cat.png');
  // basketImg = loadImage('assets/basket.png');
}

function setup() {
  createCanvas(800, 600);
  initializeGameObjects();
  // Escolhe um pedido inicial aleatoriamente
  pedidoAtual = random(pedidos);

  // Divide a mensagem inicial do pedido em duas linhas se for muito longa
  let palavras = pedidoAtual.mensagem.split(" ");
  if (palavras.length > 10) {
    let primeiraLinha = palavras.slice(0, palavras.length / 2).join(" ");
    let segundaLinha = palavras.slice(palavras.length / 2).join(" ");
    pedidoAtual.mensagem = primeiraLinha + "\n" + segundaLinha;
  }
  initialFrameCount = frameCount; // Inicializa para o controle de tempo
  console.log("DEBUG: Game initialized. Current gameState:", gameState); // DEBUG
  // Garante que o loop está rodando no setup para a tela de título
  loop(); 
}

function initializeGameObjects() {
  cat = {
    x: width / 2,
    y: height - 100,
    size: 80,
    speed: 5,
    nome: "Mimi" // Nome do gatinho
  };
  basket = {
    x: cat.x - cat.size / 2,
    y: cat.y + cat.size / 4,
    width: 100,
    height: 30
  };
  fruits = [];
  mosquitos = []; // Garante que o array de mosquitos é resetado em novo jogo
  score = 0;
  gameEnded = false; // Resetar o flag gameEnded ao iniciar/reiniciar o jogo
  console.log("DEBUG: Game objects initialized/reset. Score set to 0. gameEnded set to false."); // DEBUG
}

function draw() {
  // Lógica principal de controle de estado do jogo

  if (gameState === 'title_screen') {
    drawTitleScreen();
  } else if (gameState === 'intro') {
    drawIntroScreen();
  } else if (gameState === 'playing') {
    drawGameScreen();
  } else if (gameState === 'win_explanation') {
    drawWinExplanationScreen();
  } else if (gameState === 'scenario_restaurant') {
    drawRestaurantScenario();
  } else if (gameState === 'scenario_mercadinho') {
    drawMercadinhoScenario();
  } else if (gameState === 'scenario_mercearia') {
    drawMerceariaScenario();
  }
  else if (gameState === 'scenario_hospital') { 
    drawHospitalScenario();
  } else if (gameState === 'scenario_escola') { 
    drawEscolaScenario();
  }
  else if (gameState === 'lose') {
    drawLoseScreen();
  }
}

// --- Funções para Desenhar Telas Específicas (Intro, Jogo, Vitória, Derrota) ---

// NOVA FUNÇÃO: TELA DE TÍTULO (CAPA DO JOGO)
function drawTitleScreen() {
  background("white"); // Fundo neutro. Aqui poderíamos ter a imagem do gatinho com as frutas.

  // Título do Jogo
  textSize(48); // Tamanho maior para o título
  fill("rgb(252,111,135)"); // Uma cor rosa/salmão para o título
  textAlign(CENTER, CENTER);
  text("Mimi:", width / 2, height / 2 - 100); // Parte 1 do título
  text("Aventura Frutífera", width / 2, height / 2 - 50); // Parte 2 do título
  text("no Campo", width / 2, height / 2); // Parte 3 do título

  // Seu Nome
  textSize(20);
  fill(100); // Cor cinza para o seu nome
  text("Por: Juliana Aparecida Tarnopolski", width / 2, height / 2 + 60); // Seu nome completo

  // Instrução para continuar
  textSize(18);
  fill(0);
  text("Clique com o mouse, depois com a seta direita para continuar!", width / 2, height * 0.8);
}

// FUNÇÃO ORIGINAL 'drawIntroScreen', AGORA COMO TELA DO PEDIDO
function drawIntroScreen() {
  background(220);
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);
  text(pedidoAtual.mensagem, width / 2, height / 2 - 30); // Mensagem do pedido
  textSize(18);
  text("Mova o mouse para começar!", width / 2, height * 0.7); // Mensagem atualizada
}

function drawGameScreen() {
  background(135, 206, 235); // Céu
  fill(34, 139, 34); // Gramado
  rect(0, height * 0.7, width, height * 0.3);

  // Linhas na grama (efeito de campo)
  stroke(0);
  strokeWeight(2);
  fill(46, 139, 87);
  let stripeHeight = 15;
  let startY = height * 0.7 + 10;
  let endY = height * 0.9 - 20;

  for (let y = startY; y < endY; y += stripeHeight * 2) {
    rect(20, y, width - 40, stripeHeight);
  }
  noStroke();

  // Nuvens
  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(100, 100, 80, 60);
  ellipse(150, 90, 70, 50);
  ellipse(200, 110, 90, 70);
  ellipse(400, 150, 100, 80);
  ellipse(450, 140, 80, 60);
  noStroke();

  // Sol
  stroke(0);
  strokeWeight(2);
  fill(255, 255, 0);
  ellipse(width * 0.9, height * 0.1, 100, 100);
  noStroke();

  // Árvores
  drawTree(50, height * 0.7 - 50);
  drawTree(width / 2, height * 0.7 - 50);
  drawTree(width - 100, height * 0.7 - 50);

  // Trator
  drawTractor(100, height * 0.7 - 30);

  // Elementos do jogo (frutas, mosquitos, pontuação)
  drawGameElements(); // Esta função desenha os elementos
  updateGameLogic();  // ESTA É A LINHA CRÍTICA QUE FAZ AS FRUTAS E MOSQUITOS CAÍREM E MOVEREM!

  // Movimento do gato/cesta com o mouse
  cat.x = mouseX;
  basket.x = cat.x - basket.width / 2;
  // Limita o movimento do gato e da cesta para dentro da tela
  cat.x = constrain(cat.x, cat.size / 2, width - cat.size / 2);
  basket.x = constrain(basket.x, 0, width - basket.width);

  // Desenha o gato e a cesta (com contorno)
  stroke(0); // Define a cor do contorno para preto
  strokeWeight(2); // Define a espessura do contorno

  fill(200); // Cor do gato (cinza claro)
  ellipse(cat.x, cat.y, cat.size, cat.size); // Corpo do gato
  fill(101, 67, 33); // Cor da cesta (marrom)
  rect(basket.x, basket.y, basket.width, basket.height); // Cesta
  noStroke(); // Remove o contorno para os próximos elementos, como a pontuação

  // Verifica condição de vitória/derrota ENQUANTO JOGA
  if (!gameEnded && score >= pedidoAtual.quantidade) {
    console.log("DEBUG: CONDICAO DE VITORIA ATINGIDA! Score:", score, "Pedido:", pedidoAtual.quantidade); // DEBUG
    finalScore = score; // Guarda a pontuação final
    gameState = 'win_explanation'; // Muda o estado para a tela de explicação
    initialFrameCount = frameCount; // Reseta o contador para a próxima tela
    gameEnded = true; // Define a flag para true
    console.log("DEBUG: gameState mudado para 'win_explanation'. gameEnded = true."); // DEBUG
  } else if (!gameEnded && score < 0) {
    console.log("DEBUG: CONDICAO DE DERROTA ATINGIDA! Pontuação:", score, "Transicionando para 'lose'."); // DEBUG
    gameState = 'lose';
    gameEnded = true; // Define a flag para true
    console.log("DEBUG: gameState mudado para 'lose'. gameEnded = true."); // DEBUG
  }
}

function drawWinExplanationScreen() {
  background(220); // Fundo neutro para a explicação
  textSize(22);
  textAlign(CENTER, CENTER);
  fill(0);
  let info = infoFrutas[pedidoAtual.fruta];

  // MENSAGEM DE VITÓRIA COM QUEBRAS DE LINHA AJUSTADAS
  let mensagemVitoria;
  if (pedidoAtual.fruta === "grape") { 
    mensagemVitoria = `Eba! Conseguimos coletar\nas ${pedidoAtual.quantidade} ${info.nome}s!\n` +
                      `\n${cat.nome} explica:\n` + 
                      `A ${info.nome} é rica em ${info.vitaminas},\n` + 
                      `o que é ${info.beneficios.toLowerCase()}!\n` +
                      `Serve para ${info.paraQueServe.toLowerCase()}.`;
  } else { // Padrão para as outras frutas
    mensagemVitoria = `Eba! Conseguimos coletar\nas ${pedidoAtual.quantidade} ${info.nome}s!\n` +
                      `\n${cat.nome} explica: A ${info.nome}\n` + 
                      `é rica em ${info.vitaminas}, o que é\n` + 
                      `${info.beneficios.toLowerCase()}!\n` +
                      `Serve para ${info.paraQueServe.toLowerCase()}.`;
  }

  text(mensagemVitoria, width / 2, height / 2 - 20);
  
  // Imprimindo o tempo de exibição para depuração
  console.log("DEBUG WIN SCREEN: Exibindo tela de vitória/explicação. Tempo atual:", frameCount - initialFrameCount, "frames.");

  // Transição automática após um tempo
  if (frameCount > initialFrameCount + 480) { // Tempo: 8 segundos
    console.log("DEBUG WIN SCREEN: Tempo de explicação terminado. Transicionando para cenário de entrega ou próximo pedido."); // DEBUG
    if (pedidoAtual.scenario === 'restaurant') {
      gameState = 'scenario_restaurant';
    } else if (pedidoAtual.scenario === 'mercadinho') {
      gameState = 'scenario_mercadinho';
    } else if (pedidoAtual.scenario === 'mercearia') {
      gameState = 'scenario_mercearia';
    }
    else if (pedidoAtual.scenario === 'hospital') { 
      gameState = 'scenario_hospital';
    } else if (pedidoAtual.scenario === 'escola') { 
      gameState = 'scenario_escola';
    }
    else {
      // Caso não haja cenário específico, vai direto para o próximo pedido
      console.log("DEBUG WIN SCREEN: Nenhum cenário específico para este pedido. Reiniciando para o próximo pedido."); // DEBUG
      restartGameForNextOrder();
    }
    initialFrameCount = frameCount; // Reseta o contador para a nova tela (seja cenário ou intro)
  }
}

function drawLoseScreen() {
  background(220);
  textSize(56);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0); // Vermelho para a mensagem de derrota
  text("Você Perdeu!", width / 2, height / 2);
  textSize(18);
  fill(0);
  text("Pressione qualquer tecla para tentar novamente.", width / 2, height * 0.7);
  console.log("DEBUG: Exibindo tela de derrota. Aguardando input do teclado para reiniciar."); // DEBUG
  if (isLooping()) {
      noLoop();
      console.log("DEBUG: noLoop() chamado em drawLoseScreen.");
  }
}


// --- Funções Auxiliares de Lógica do Jogo ---

function drawGameElements() {
  // Desenha as frutas
  for (let fruit of fruits) {
    let fruitColor = coresFrutas[fruit.type];
    // Se for um array de arrays (como melancia ou morango com múltiplas cores)
    if (Array.isArray(fruitColor) && Array.isArray(fruitColor[0])) {
      // Lógica para desenhar melancia (casca e miolo)
      if (fruit.type === 'watermelon') {
        stroke(0); strokeWeight(1);
        fill(fruitColor[0][0], fruitColor[0][1], fruitColor[0][2]); // Casca verde
        ellipse(fruit.x, fruit.y, fruit.size, fruit.size);
        fill(fruitColor[1][0], fruitColor[1][1], fruitColor[1][2]); // Miolo vermelho/rosa
        ellipse(fruit.x, fruit.y, fruit.size * 0.8, fruit.size * 0.8);
        noStroke();
      }
      // Lógica para desenhar morango (fruta e folha) - AJUSTADO AQUI PARA MAIS SEMENTINHAS
      else if (fruit.type === 'strawberry') {
        stroke(0); strokeWeight(1);
        fill(fruitColor[0][0], fruitColor[0][1], fruitColor[0][2]); // Vermelho da fruta
        
        // Corpo do morango (formato de coração invertido com 2 arcos)
        beginShape();
        vertex(fruit.x, fruit.y - fruit.size * 0.5); // Topo
        bezierVertex(fruit.x + fruit.size * 0.4, fruit.y - fruit.size * 0.7, 
                     fruit.x + fruit.size * 0.5, fruit.y + fruit.size * 0.2, 
                     fruit.x, fruit.y + fruit.size * 0.5); // Lado direito e ponta
        bezierVertex(fruit.x - fruit.size * 0.5, fruit.y + fruit.size * 0.2, 
                     fruit.x - fruit.size * 0.4, fruit.y - fruit.size * 0.7, 
                     fruit.x, fruit.y - fruit.size * 0.5); // Lado esquerdo e topo
        endShape(CLOSE);
        
        // Sementinhas (pequenos pontos pretos) - Mais sementinhas e mais espalhadas
        fill(0); // Preto para as sementes
        let seedSize = fruit.size * 0.05; // Tamanho proporcional
        ellipse(fruit.x - fruit.size * 0.15, fruit.y + fruit.size * 0.1, seedSize, seedSize);
        ellipse(fruit.x + fruit.size * 0.15, fruit.y + fruit.size * 0.1, seedSize, seedSize);
        ellipse(fruit.x, fruit.y - fruit.size * 0.1, seedSize, seedSize);
        ellipse(fruit.x - fruit.size * 0.2, fruit.y + fruit.size * 0.2, seedSize, seedSize);
        ellipse(fruit.x + fruit.size * 0.2, fruit.y + fruit.size * 0.2, seedSize, seedSize);


        fill(fruitColor[1][0], fruitColor[1][1], fruitColor[1][2]); // Verde das folhas (cálice)
        // Folhas simples no topo
        // Usando triângulos para as folhas para dar um formato mais orgânico
        triangle(fruit.x - fruit.size * 0.2, fruit.y - fruit.size * 0.55,
                 fruit.x - fruit.size * 0.05, fruit.y - fruit.size * 0.8,
                 fruit.x, fruit.y - fruit.size * 0.6);

        triangle(fruit.x + fruit.size * 0.2, fruit.y - fruit.size * 0.55,
                 fruit.x + fruit.size * 0.05, fruit.y - fruit.size * 0.8,
                 fruit.x, fruit.y - fruit.size * 0.6);

        triangle(fruit.x - fruit.size * 0.05, fruit.y - fruit.size * 0.5,
                 fruit.x + fruit.size * 0.05, fruit.y - fruit.size * 0.5,
                 fruit.x, fruit.y - fruit.size * 0.75); // Folha central mais para cima
        
        noStroke();
      }
    } else if (Array.isArray(fruitColor)) { // Se for um array de 3 elementos [R, G, B]
      fill(fruitColor[0], fruitColor[1], fruitColor[2]);
      ellipse(fruit.x, fruit.y, fruit.size, fruit.size);
    } else { // Fallback, caso não encontre ou seja um tipo diferente
      fill(255, 0, 0); // Cor padrão se não encontrar ou tipo inesperado
      ellipse(fruit.x, fruit.y, fruit.size, fruit.size);
    }
  }

  // Desenha todos os mosquitinhos
  for (let mosquito of mosquitos) {
    drawMosquito(mosquito.x, mosquito.y, mosquito.size);
  }

  // Desenha a pontuação 
  textSize(24); // Define o tamanho do texto
  fill(0);      // Define a cor do texto para preto
  textAlign(RIGHT, TOP); // Alinha o texto à direita e ao topo
  text(`Pontuação: ${score}`, width - 20, 20); // Exibe a pontuação no canto superior direito
  textAlign(CENTER, CENTER); // Volta ao alinhamento padrão para outros textos que dependam dele
}

function updateGameLogic() {
  // Lógica para criar frutas (a cada 60 frames = 1 segundo)
  if (gameState === 'playing' && frameCount % 60 === 0) {
    let fruit = {
      x: random(width),
      y: -40,
      size: random(25, 50),
      speed: random(3, 7),
      // Atribui um tipo de fruta aleatório se não houver um pedido específico,
      // ou o tipo de fruta do pedido atual.
      type: pedidoAtual ? pedidoAtual.fruta : random(['apple', 'banana', 'grape', 'strawberry', 'watermelon', 'pear'])
    };
    fruits.push(fruit);
    console.log("DEBUG: Fruta '" + fruit.type + "' gerada. Total de frutas: " + fruits.length); // DEBUG
    console.log("DEBUG: Pedido atual: " + pedidoAtual.fruta + ", Quantidade: " + pedidoAtual.quantidade); // DEBUG
  }

  // LÓGICA PARA CRIAR MOSQUITINHOS (a cada 180 frames = 3 segundos)
  if (gameState === 'playing' && frameCount % 180 === 0) {
    let mosquito = {
      x: random(width),
      y: random(height * 0.1, height * 0.5),
      size: random(10, 20),
      speed: random(1, 3)
    };
    mosquitos.push(mosquito);
    console.log("DEBUG: Mosquito gerado. Total de mosquitos: " + mosquitos.length); // DEBUG
  }

  // Mover as frutas e verificar colisões com a cesta e o chão
  for (let i = fruits.length - 1; i >= 0; i--) {
    let fruit = fruits[i];
    fruit.y += fruit.speed;

    // Colisão da fruta com a cesta
    if (fruit.y + fruit.size / 2 > basket.y &&
      fruit.x > basket.x &&
      fruit.x < basket.x + basket.width &&
      fruit.y < basket.y + basket.height // Garante que não "coleta" depois de passar pela cesta
    ) {
      console.log(`DEBUG: Colisão detectada com fruta ${fruit.type}.`); // DEBUG
      if (fruit.type === pedidoAtual.fruta) {
        score++; // Incrementa pontuação apenas para a fruta correta
        console.log(`DEBUG: Fruta CORRETA (${fruit.type}) coletada! Score: ${score}. Pedido: ${pedidoAtual.quantidade}`); // DEBUG
      } else {
        score--; // Decrementa pontuação se coletar fruta errada (opcional, mas bom para o jogo)
        console.log(`DEBUG: Fruta ERRADA (${fruit.type}) coletada! Score: ${score}.`); // DEBUG
      }
      fruits.splice(i, 1); // Remove a fruta, correta ou errada, da tela
    }
    // Fruta atinge o chão (perde pontuação)
    else if (fruit.y > height + fruit.size / 2) {
      score--; // Decrementa a pontuação
      fruits.splice(i, 1); // Remove a fruta
      console.log("DEBUG: Fruta caiu no chão! Score: " + score); // DEBUG
    }
  }

  // Mover mosquitinhos e verificar colisões com frutas
  for (let i = mosquitos.length - 1; i >= 0; i--) {
    let mosquito = mosquitos[i];

    // Movimento para baixo
    mosquito.y += mosquito.speed;
    // Movimento horizontal sutil para parecer que "voa"
    mosquito.x += sin(frameCount * 0.1 + i) * 1;

    // Remover mosquitinhos que saem da tela
    if (mosquito.y > height + mosquito.size) {
      mosquitos.splice(i, 1);
      continue;
    }

    // Verificar colisão do mosquitinho com as frutas
    for (let j = fruits.length - 1; j >= 0; j--) {
      let fruit = fruits[j];

      let d = dist(mosquito.x, mosquito.y, fruit.x, fruit.y);

      // Se mosquitinho e fruta colidirem
      if (d < (mosquito.size / 2 + fruit.size / 2)) {
        fruits.splice(j, 1); // Remove a fruta (mosquitinho "comeu")
        score--; // Mosquitos fazem perder pontos (ou a fruta "perdida")
        console.log("DEBUG: Mosquito pegou fruta! Score: " + score); // DEBUG
        break; // Sai do loop interno, pois o mosquitinho já interagiu com uma fruta
      }
    }
  }
}

// --- Funções de Evento (Mouse e Teclado) ---

// Lógica de mouseMoved agora apenas inicia o jogo SE estiver na tela do pedido
function mouseMoved() {
  if (gameState === 'intro') {
    console.log("DEBUG: Mouse movido na tela 'intro'. Transicionando para 'playing'."); // DEBUG
    gameState = 'playing';
    jogoIniciado = true; // Mantido para a lógica de spawn de frutas/mosquitos
    loop(); // Garante que o loop de draw reinicie, caso estivesse parado
  }
}

// Lógica para keyPressed agora para avançar da tela de título e reiniciar em caso de derrota
function keyPressed() {
  console.log("DEBUG: Tecla pressionada! keyCode:", keyCode, "key:", key, "gameState:", gameState); // DEBUG

  // Só permite interação do teclado na tela de título ou de derrota
  if (gameState === 'title_screen') {
    if (keyCode === RIGHT_ARROW) {
      console.log("DEBUG: Seta direita detectada na tela de título. Transicionando para 'intro'.");
      gameState = 'intro';
      initialFrameCount = frameCount; // Reseta o contador para a intro
      loop(); // Garante que o loop de draw reinicie
    }
  } else if (gameState === 'lose') {
    console.log("DEBUG: Tecla pressionada na tela 'lose'. Reiniciando o jogo."); // DEBUG
    restartGameForNextOrder();
    loop(); // Garante que o loop de draw reinicie após a derrota
  }
  return false; // IMPEDIR ROLAGEM DA PÁGINA
}

function restartGameForNextOrder() {
  console.log("DEBUG: Função restartGameForNextOrder chamada."); // DEBUG
  initializeGameObjects(); // Reseta score, frutas, mosquitos, etc.
  pedidoAtual = random(pedidos); // Escolhe um novo pedido
  // Reinicia a mensagem do pedido (para quebra de linha)
  let palavras = pedidoAtual.mensagem.split(" ");
  if (palavras.length > 10) {
    let primeiraLinha = palavras.slice(0, palavras.length / 2).join(" ");
    let segundaLinha = palavras.slice(palavras.length / 2).join(" ");
    pedidoAtual.mensagem = primeiraLinha + "\n" + segundaLinha;
  }
  gameState = 'intro'; // Volta para a tela de pedido para o novo pedido
  initialFrameCount = frameCount; // Reseta o contador para a nova intro
  jogoIniciado = false; // Permite que a intro espere por movimento do mouse
  loop(); // Garante que o loop do draw reinicie para a nova intro
  console.log("DEBUG: Jogo reiniciado para o próximo pedido. Novo gameState: 'intro'."); // DEBUG
}