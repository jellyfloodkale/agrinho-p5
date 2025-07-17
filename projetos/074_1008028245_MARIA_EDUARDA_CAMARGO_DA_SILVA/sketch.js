// Variáveis globais para o jogo
let gridSize = 20; // Tamanho de cada "quadrado" na grade da cidade
let cityGrid = []; // Matriz para representar a cidade
let numCols, numRows; // Número de colunas e linhas da grade

// Tipos de edifícios e suas propriedades de energia
const BUILDING_TYPES = {
  EMPTY: { id: 0, color: '#f0f0f0', energyConsumption: 0, sustainabilityImpact: 0 },
  HOUSE: { id: 1, color: '#8B4513', energyConsumption: 10, sustainabilityImpact: -2 }, // Consome energia, pouco impacto negativo
  FACTORY: { id: 2, color: '#4F4F4F', energyConsumption: 50, sustainabilityImpact: -20 }, // Consome muito, alto impacto negativo
  SOLAR_PANEL: { id: 3, color: '#FFD700', energyConsumption: -15, sustainabilityImpact: 15 }, // Gera energia, alto impacto positivo
  WIND_TURBINE: { id: 4, color: '#ADD8E6', energyConsumption: -20, sustainabilityImpact: 20 } // Gera mais energia, maior impacto positivo
};

let totalEnergyConsumption = 0;
let sustainabilityScore = 0;

// Função setup: executada uma vez ao iniciar o programa
function setup() {
  createCanvas(800, 600); // Cria um canvas de 800x600 pixels
  background(220); // Cor de fundo cinza claro

  // Calcula o número de colunas e linhas da grade
  numCols = floor(width / gridSize);
  numRows = floor(height / gridSize);

  // Inicializa a grade da cidade com espaços vazios
  for (let i = 0; i < numRows; i++) {
    cityGrid[i] = [];
    for (let j = 0; j < numCols; j++) {
      cityGrid[i][j] = BUILDING_TYPES.EMPTY.id;
    }
  }

  // Define o modo de cor para HSB para melhor controle de matiz, saturação, brilho
  colorMode(HSB, 360, 100, 100);
}

// Função draw: executada continuamente (loop)
function draw() {
  background(220); // Limpa o canvas a cada frame

  drawGrid(); // Desenha a grade da cidade
  calculateMetrics(); // Calcula o consumo e a pontuação de sustentabilidade
  displayMetrics(); // Exibe as métricas na tela
  displayInstructions(); // Exibe instruções para o jogador
}

// Desenha a grade da cidade e os edifícios
function drawGrid() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let x = j * gridSize;
      let y = i * gridSize;

      let buildingType = getBuildingTypeById(cityGrid[i][j]);
      fill(buildingType.color);
      stroke(150); // Borda cinza para as células
      rect(x, y, gridSize, gridSize);

      // Opcional: Desenhar um ícone ou texto para cada tipo de edifício
      if (buildingType.id !== BUILDING_TYPES.EMPTY.id) {
        fill(0); // Cor do texto preta
        textSize(gridSize * 0.5);
        textAlign(CENTER, CENTER);
        text(buildingType.id, x + gridSize / 2, y + gridSize / 2); // Mostra o ID do edifício
      }
    }
  }
}

// Função para obter o objeto do tipo de edifício pelo ID
function getBuildingTypeById(id) {
  for (let key in BUILDING_TYPES) {
    if (BUILDING_TYPES[key].id === id) {
      return BUILDING_TYPES[key];
    }
  }
  return BUILDING_TYPES.EMPTY; // Retorna vazio se não encontrar
}

// Calcula o consumo de energia e a pontuação de sustentabilidade
function calculateMetrics() {
  totalEnergyConsumption = 0;
  sustainabilityScore = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let buildingType = getBuildingTypeById(cityGrid[i][j]);
      totalEnergyConsumption += buildingType.energyConsumption;
      sustainabilityScore += buildingType.sustainabilityImpact;
    }
  }
}

// Exibe as métricas na tela
function displayMetrics() {
  fill(0); // Cor do texto preta
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Consumo Total de Energia: ${totalEnergyConsumption} unidades`, 10, height - 80);

  // Calcula o consumo de energia não renovável (apenas os valores positivos)
  let nonRenewableConsumption = 0;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let buildingType = getBuildingTypeById(cityGrid[i][j]);
      if (buildingType.energyConsumption > 0) {
        nonRenewableConsumption += buildingType.energyConsumption;
      }
    }
  }
  text(`Consumo de Energia Não Renovável: ${nonRenewableConsumption} unidades`, 10, height - 60);

  // Calcula o que seria consumido se fosse mais sustentável (exemplo simplificado)
  // Se o score de sustentabilidade for positivo, significa que há geração/economia
  let potentialSavings = 0;
  if (sustainabilityScore > 0) {
    potentialSavings = sustainabilityScore * 2; // Exemplo: cada ponto de sustentabilidade economiza 2 unidades
  }
  text(`Potencial de Economia (se mais sustentável): ${potentialSavings} unidades`, 10, height - 40);


  // Cor da pontuação de sustentabilidade (verde para positivo, vermelho para negativo)
  if (sustainabilityScore >= 0) {
    fill(120, 100, 80); // Verde
  } else {
    fill(0, 100, 80); // Vermelho
  }
  text(`Pontuação de Sustentabilidade: ${sustainabilityScore}`, 10, height - 20);
}

// Exibe instruções para o jogador
function displayInstructions() {
  fill(0);
  textSize(14);
  textAlign(RIGHT, TOP);
  text('Pressione:', width - 10, 10);
  text('1: Casa (Consome)', width - 10, 30);
  text('2: Fábrica (Consome muito)', width - 10, 50);
  text('3: Painel Solar (Gera)', width - 10, 70);
  text('4: Turbina Eólica (Gera mais)', width - 10, 90);
  text('0: Remover', width - 10, 110);
  text('Clique para colocar/remover', width - 10, 130);
}

// Variável para armazenar o tipo de edifício selecionado
let selectedBuildingType = BUILDING_TYPES.EMPTY.id;

// Função mousePressed: executada quando o mouse é clicado
function mousePressed() {
  // Converte as coordenadas do mouse para as coordenadas da grade
  let col = floor(mouseX / gridSize);
  let row = floor(mouseY / gridSize);

  // Verifica se o clique está dentro dos limites da grade
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    // Coloca o edifício selecionado na grade
    cityGrid[row][col] = selectedBuildingType;
  }
}

// Função keyPressed: executada quando uma tecla é pressionada
function keyPressed() {
  if (key === '1') {
    selectedBuildingType = BUILDING_TYPES.HOUSE.id;
  } else if (key === '2') {
    selectedBuildingType = BUILDING_TYPES.FACTORY.id;
  } else if (key === '3') {
    selectedBuildingType = BUILDING_TYPES.SOLAR_PANEL.id;
  } else if (key === '4') {
    selectedBuildingType = BUILDING_TYPES.WIND_TURBINE.id;
  } else if (key === '0') {
    selectedBuildingType = BUILDING_TYPES.EMPTY.id;
  }
}