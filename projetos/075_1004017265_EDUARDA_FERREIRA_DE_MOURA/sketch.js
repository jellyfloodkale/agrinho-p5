let trees = []; // Array para armazenar objetos de árvores no cenário de campo.
let clouds = []; // Array para armazenar objetos de nuvens, presentes em ambos os cenários.
let sun; // Objeto para representar o sol no cenário de campo.
let moon; // Objeto para representar a lua no cenário da cidade.
let infoBox = null; // Variável para controlar a exibição da caixa de informações. Se for null, a caixa não é exibida.
let infoTimeout = 0; // Armazena o tempo em milissegundos até que a caixa de informações desapareça.

let isCityTheme = false; // Variável booleana que define o tema atual: false para campo, true para cidade.
let buildings = []; // Array para armazenar objetos de edifícios no cenário da cidade.
let streetCars = []; // Array para armazenar objetos de carros no cenário da cidade.
let smokeParticles = []; // Array para armazenar objetos de partículas de fumaça, geradas pelos carros.

// --- Variáveis para os arquivos de áudio ---
let countrysideSound; // Variável para armazenar o som ambiente do campo.
let citySound; // Variável para armazenar o som ambiente da cidade.

// --- Função preload para carregar os arquivos de áudio antes do setup ---
// Esta função é executada antes da função setup e é ideal para carregar recursos como imagens, fontes e áudios.
function preload() {
  // Certifique-se de que esses caminhos de arquivo estejam corretos!
  // Coloque seus arquivos de áudio (por exemplo, "campo.mp3" e "cidade.mp3")
  // na mesma pasta do seu arquivo sketch.js, ou forneça o caminho completo.
  countrysideSound = loadSound('campo.mp3'); // Carrega o arquivo de som 'campo.mp3'.
  citySound = loadSound('cidade.mp3');      // Carrega o arquivo de som 'cidade.mp3'.
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Cria um canvas que ocupa toda a largura e altura da janela do navegador.
  sun = new Sun(width * 0.85, height * 0.2, 80); // Inicializa o objeto sol.
  moon = new Moon(width * 0.85, height * 0.2, 70); // Inicializa o objeto lua.

  setupCountryside(); // Chama a função para configurar os elementos do cenário de campo.
  setupCity(); // Chama a função para configurar os elementos do cenário da cidade.

  textAlign(LEFT, CENTER); // Define o alinhamento do texto para a esquerda e centralizado verticalmente.
  textSize(16); // Define o tamanho da fonte padrão.
  rectMode(CORNER); // Define que os retângulos são desenhados a partir do canto superior esquerdo.
  noStroke(); // Desabilita o contorno para formas desenhadas.

  // --- Configurações iniciais do áudio ---
  // Faz os áudios entrarem em loop (repetir)
  countrysideSound.setLoop(true); // Faz o som do campo repetir em loop.
  citySound.setLoop(true); // Faz o som da cidade repetir em loop.
  // Define um volume para que não fiquem muito altos
  countrysideSound.setVolume(0.5); // Define o volume do som do campo.
  citySound.setVolume(0.5); // Define o volume do som da cidade.

  // Começa com o som do campo (se for o tema inicial)
  if (!isCityTheme) { // Se o tema inicial não for a cidade (ou seja, for campo)
    countrysideSound.play(); // Inicia a reprodução do som do campo.
  } else { // Caso contrário (se for o tema da cidade)
    citySound.play(); // Inicia a reprodução do som da cidade.
  }
}

// Configura os elementos específicos do cenário de campo.
function setupCountryside() {
  trees = []; // Limpa o array de árvores.
  for (let i = 0; i < 7; i++) { // Cria 7 novas árvores.
    let x = random(40, width - 200); // Posição X aleatória para a árvore.
    let y = height - random(80, 140); // Posição Y aleatória para a árvore (mais baixo na tela).
    trees.push(new Tree(x, y)); // Adiciona uma nova árvore ao array.
  }

  clouds = []; // Limpa o array de nuvens (elas serão recriadas para este cenário).
  for (let i = 0; i < 4; i++) { // Cria 4 novas nuvens.
    clouds.push(new Cloud(random(width), random(height * 0.05, height * 0.3))); // Adiciona uma nova nuvem ao array.
  }

  smokeParticles = []; // Limpa as partículas de fumaça quando no cenário de campo.
}

// Configura os elementos específicos do cenário da cidade.
function setupCity() {
  buildings = []; // Limpa o array de edifícios.
  let bCount = 8; // Define o número de edifícios.
  let bWidth = width / bCount; // Calcula a largura de cada edifício para que ocupem a tela.
  for (let i = 0; i < bCount; i++) { // Cria o número de edifícios definido.
    // baseY moved closer to street (height * 0.85)
    let baseYPos = height * 0.85; // Posição Y da base do edifício, mais próxima da rua.
    // building height adjusted to fit near street
    let bHeight = random(height * 0.2, height * 0.5); // Altura aleatória para o edifício.
    buildings.push(new Building(i * bWidth + 10, baseYPos, bWidth - 20, bHeight, true)); // Adiciona um novo edifício, forçando as janelas acesas (true).
  }

  streetCars = []; // Limpa o array de carros.
  for (let i = 0; i < 4; i++) { // Cria 4 novos carros.
    streetCars.push(new StreetCar(random(width), height * 0.85)); // Adiciona um novo carro ao array.
  }

  // Clouds remain the same in city theme
  if (clouds.length === 0) { // Se não houver nuvens (para evitar duplicidade ao redimensionar a janela)
    for (let i = 0; i < 4; i++) { // Cria 4 nuvens.
      clouds.push(new Cloud(random(width), random(height * 0.05, height * 0.3))); // Adiciona uma nova nuvem.
    }
  }

  // Initialize smoke particles for city, linked to cars now
  smokeParticles = []; // Inicializa o array de partículas de fumaça.
  // Increase smoke particles to 15 per car for a denser effect
  for (let car of streetCars) { // Para cada carro criado
    for (let i = 0; i < 15; i++) { // Cria 15 partículas de fumaça por carro para um efeito mais denso.
      smokeParticles.push(new Smoke(car)); // Adiciona uma nova partícula de fumaça associada ao carro.
    }
  }
}

// Função chamada automaticamente quando a janela do navegador é redimensionada.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Redimensiona o canvas para o novo tamanho da janela.
  sun.x = width * 0.85; // Ajusta a posição X do sol.
  sun.y = height * 0.2; // Ajusta a posição Y do sol.
  moon.x = width * 0.85; // Ajusta a posição X da lua.
  moon.y = height * 0.2; // Ajusta a posição Y da lua.

  setupCountryside(); // Reconfigura os elementos do campo.
  setupCity(); // Reconfigura os elementos da cidade.
}

// Função principal de desenho, executada repetidamente a cada frame.
function draw() {
  // --- Lógica para reproduzir o áudio correto ---
  if (isCityTheme) { // Se o tema atual for a cidade
    drawCityTheme(); // Desenha o cenário da cidade.
    // Se o som do campo estiver tocando, pare-o e inicie o da cidade
    if (countrysideSound.isPlaying()) { // Verifica se o som do campo está tocando.
      countrysideSound.stop(); // Para o som do campo.
      citySound.play(); // Inicia o som da cidade.
    }
  } else { // Se o tema atual for o campo
    drawCountrysideTheme(); // Desenha o cenário de campo.
    // Se o som da cidade estiver tocando, pare-o e inicie o do campo
    if (citySound.isPlaying()) { // Verifica se o som da cidade está tocando.
      citySound.stop(); // Para o som da cidade.
      countrysideSound.play(); // Inicia o som do campo.
    }
  }

  // Show info box if active
  if (infoBox && millis() < infoTimeout) { // Se infoBox não for nulo e o tempo limite não foi atingido.
    drawInfoBox(infoBox); // Desenha a caixa de informações.
  } else {
    infoBox = null; // Caso contrário, define infoBox como nulo para ocultá-lo.
  }

  // Show instructions depending on theme
  drawInstructions(); // Desenha as instruções na tela.
}

// Desenha a caixa de instruções na tela.
function drawInstructions() {
  fill(255, 255, 255, 200); // Define a cor de preenchimento do retângulo da caixa de instruções (branco semi-transparente).
  rect(30, 30, 440, 150, 25); // Desenha o retângulo da caixa de instruções (posição, largura, altura, arredondamento dos cantos).
  fill(20, 90, 25); // Define a cor do texto (verde escuro).
  textSize(18); // Define o tamanho da fonte para o título.
  text("Educação Ambiental Interativa", 40, 45); // Desenha o título.
  textSize(14); // Define o tamanho da fonte para o conteúdo.
  if (isCityTheme) { // Se for o tema da cidade
    text("- Pressione SPACE para mudar para o campo", 40, 70); // Instruções específicas da cidade.
    text("- Clique nos prédios para práticas sustentáveis urbanas", 40, 90);
    text("- Clique na lua para energia solar e lunar", 40, 110);
    text("- Clique nas nuvens para entender ciclo da água", 40, 130);
    text("- Clique na fumaça para desvantagens urbanas", 40, 150);
  } else { // Se for o tema do campo
    text("- Pressione SPACE para mudar para a cidade", 40, 70); // Instruções específicas do campo.
    text("- Clique nas árvores para informações sobre reflorestamento", 40, 90);
    text("- Clique no sol para saber sobre energia solar", 40, 110);
    text("- Clique nas nuvens para saber do ciclo da água", 40, 130);
  }
}

// --- Countryside Drawing and Interaction --- //

// Desenha os elementos do cenário de campo.
function drawCountrysideTheme() {
  background(135, 206, 235); // Cor de fundo: azul celeste.
  sun.update(); // Atualiza o estado do sol (ex: movimento dos raios).
  sun.display(); // Desenha o sol.

  for (let cloud of clouds) { // Para cada nuvem no array
    cloud.move(); // Move a nuvem.
    cloud.display(); // Desenha a nuvem.
  }

  drawGround(); // Desenha o chão do campo.

  for (let tree of trees) { // Para cada árvore no array
    tree.display(); // Desenha a árvore.
  }
}

// Desenha o chão do cenário de campo.
function drawGround() {
  noStroke(); // Desabilita o contorno.
  fill(70, 120, 40); // Cor de preenchimento: verde escuro.
  rect(0, height * 0.7, width, height * 0.3); // Desenha o retângulo que representa o chão.
}

// --- City Drawing and Interaction --- //

// Desenha os elementos do cenário da cidade.
function drawCityTheme() {
  background(15, 24, 45); // Cor de fundo: azul escuro para o céu noturno da cidade.

  moon.update(); // Atualiza o estado da lua.
  moon.display(); // Desenha a lua.

  for (let cloud of clouds) { // Para cada nuvem no array
    cloud.move(); // Move a nuvem.
    cloud.display(); // Desenha a nuvem.
  }

  drawStreet(); // Desenha a rua.

  // Draw smoke behind cars first for layering
  for (let i = smokeParticles.length - 1; i >= 0; i--) { // Percorre as partículas de fumaça de trás para frente.
    let sp = smokeParticles[i]; // Pega a partícula atual.
    sp.update(); // Atualiza o estado da partícula (posição, transparência).
    sp.display(); // Desenha a partícula.
    if (sp.isFinished()) { // Se a partícula terminou seu ciclo de vida
      sp.reset(); // Reinicia a partícula para que apareça novamente.
    }
  }

  for (let building of buildings) { // Para cada edifício no array
    building.display(true); // Desenha o edifício, passando true para indicar modo noturno (janelas acesas).
  }

  for (let car of streetCars) { // Para cada carro no array
    car.move(); // Move o carro.
    car.display(); // Desenha o carro.
  }
}

// Desenha a rua do cenário da cidade.
function drawStreet() {
  noStroke(); // Desabilita o contorno.
  fill(50); // Cor de preenchimento: cinza escuro.
  rect(0, height * 0.85, width, height * 0.15); // Desenha o retângulo da rua.

  // street lane markings
  stroke(255, 255, 0); // Cor do contorno: amarelo (para as faixas).
  strokeWeight(4); // Espessura do contorno.
  for (let i = 0; i < width; i += 60) { // Desenha as faixas da rua.
    line(i + 10, height * 0.925, i + 40, height * 0.925); // Desenha uma linha pontilhada.
  }
  noStroke(); // Desabilita o contorno novamente.
}

// --- Classes --- //

// Definição da classe Tree (Árvore).
class Tree {
  constructor(x, y) {
    this.x = x; // Posição X da árvore.
    this.y = y; // Posição Y da base da árvore.
    this.trunkHeight = random(60, 100); // Altura aleatória do tronco.
    this.trunkWidth = this.trunkHeight * 0.15; // Largura do tronco baseada na altura.
    this.leafRadius = this.trunkHeight * 0.6; // Raio das folhas baseado na altura do tronco.
    this.leafColor = color(34, 139, 34, 200); // Cor das folhas: verde floresta com transparência.
  }

  display() {
    // Trunk (Tronco)
    fill(149, 79, 29); // Cor de preenchimento: marrom sela.
    rect(this.x, this.y - this.trunkHeight, this.trunkWidth, this.trunkHeight, 5); // Desenha o tronco (retângulo com cantos arredondados).

    // Leaves (circle cluster) (Folhas - aglomerado de círculos)
    fill(this.leafColor); // Cor de preenchimento das folhas.
    ellipse(this.x + this.trunkWidth * 0.5, this.y - this.trunkHeight - this.leafRadius * 0.4, this.leafRadius, this.leafRadius * 1.2); // Desenha uma elipse para as folhas.

    // Slight sway animation (Pequena animação de balanço)
    let sway = sin(frameCount * 0.03 + this.x) * 2; // Calcula um balanço suave baseado no frameCount e na posição X.
    push(); // Salva o estado atual da matriz de transformação.
    translate(this.x + this.trunkWidth * 0.5, this.y - this.trunkHeight - this.leafRadius * 0.4); // Move a origem para o centro das folhas.
    rotate(radians(sway)); // Rotaciona as folhas para simular o balanço.
    ellipse(0, 0, this.leafRadius, this.leafRadius * 1.2); // Desenha a elipse das folhas novamente para o efeito de balanço.
    pop(); // Restaura o estado anterior da matriz de transformação.
  }

  isMouseInside(mx, my) {
    // Check trunk rectangle or leaf ellipse (Verifica se o mouse está dentro do retângulo do tronco ou da elipse das folhas)
    let trunkRect = (mx > this.x && mx < this.x + this.trunkWidth &&
      my > this.y - this.trunkHeight &&
      my < this.y); // Verifica se o mouse está dentro do retângulo do tronco.
    let leafDist = dist(mx, my, this.x + this.trunkWidth * 0.5, this.y - this.trunkHeight - this.leafRadius * 0.4); // Calcula a distância do mouse ao centro das folhas.
    let leafCheck = leafDist < this.leafRadius * 0.6; // Verifica se o mouse está dentro da área das folhas.
    return trunkRect || leafCheck; // Retorna true se o mouse estiver dentro do tronco OU das folhas.
  }
}

// Definição da classe Cloud (Nuvem).
class Cloud {
  constructor(x, y) {
    this.x = x; // Posição X inicial da nuvem.
    this.y = y; // Posição Y inicial da nuvem.
    this.size = random(50, 80); // Tamanho aleatório da nuvem.
    this.speed = random(0.2, 0.5); // Velocidade de movimento aleatória da nuvem.
  }

  move() {
    this.x += this.speed; // Move a nuvem horizontalmente.
    if (this.x - this.size > width) { // Se a nuvem saiu completamente da tela para a direita
      this.x = -this.size; // Reinicia a nuvem do lado esquerdo da tela.
      this.y = random(height * 0.05, height * 0.3); // Define uma nova posição Y aleatória.
    }
  }

  display() {
    noStroke(); // Desabilita o contorno.
    fill(255, 250); // Cor de preenchimento: branco semi-transparente.
    ellipse(this.x, this.y, this.size * 0.7, this.size * 0.6); // Desenha a primeira elipse da nuvem.
    ellipse(this.x + this.size * 0.3, this.y + 5, this.size * 0.75, this.size * 0.65); // Desenha a segunda elipse.
    ellipse(this.x - this.size * 0.3, this.y + 5, this.size * 0.75, this.size * 0.65); // Desenha a terceira elipse para formar a nuvem.
  }

  isMouseInside(mx, my) {
    let d = dist(mx, my, this.x, this.y); // Calcula a distância do mouse ao centro da nuvem.
    return d < this.size * 0.5; // Retorna true se o mouse estiver dentro de um raio da nuvem.
  }
}

// Definição da classe Sun (Sol).
class Sun {
  constructor(x, y, radius) {
    this.x = x; // Posição X do sol.
    this.y = y; // Posição Y do sol.
    this.radius = radius; // Raio do sol.
    this.angle = 0; // Ângulo para animação dos raios.
  }

  update() {
    this.angle += 0.05; // Incrementa o ângulo para animar os raios.
  }

  display() {
    push(); // Salva o estado atual da matriz de transformação.
    translate(this.x, this.y); // Move a origem para a posição do sol.
    // Sun core (Núcleo do sol)
    noStroke(); // Desabilita o contorno.
    fill(255, 204, 0); // Cor de preenchimento: amarelo.
    ellipse(0, 0, this.radius); // Desenha o círculo principal do sol.

    // Rays with pulsing effect (Raios com efeito pulsante)
    stroke(255, 204, 0, 180); // Cor do contorno dos raios (amarelo semi-transparente).
    strokeWeight(3); // Espessura dos raios.
    for (let i = 0; i < 12; i++) { // Desenha 12 raios.
      let angle = TWO_PI / 12 * i + this.angle; // Calcula o ângulo para cada raio, adicionando o ângulo de animação.
      let r1 = this.radius * 0.6; // Raio interno do raio.
      let r2 = r1 + sin(this.angle * 3 + i) * 10 + 20; // Raio externo com efeito pulsante.
      let x1 = cos(angle) * r1; // Coordenada X do ponto inicial do raio.
      let y1 = sin(angle) * r1; // Coordenada Y do ponto inicial do raio.
      let x2 = cos(angle) * r2; // Coordenada X do ponto final do raio.
      let y2 = sin(angle) * r2; // Coordenada Y do ponto final do raio.
      line(x1, y1, x2, y2); // Desenha a linha do raio.
    }
    pop(); // Restaura o estado anterior da matriz de transformação.
  }

  isMouseInside(mx, my) {
    let d = dist(mx, my, this.x, this.y); // Calcula a distância do mouse ao centro do sol.
    return d < this.radius * 0.6; // Retorna true se o mouse estiver dentro de uma área clicável do sol.
  }
}

// Definição da classe Moon (Lua).
class Moon {
  constructor(x, y, radius) {
    this.x = x; // Posição X da lua.
    this.y = y; // Posição Y da lua.
    this.radius = radius; // Raio da lua.
    this.angle = 0; // Ângulo (não usado para movimento, mas pode ser para efeitos).
  }

  update() {
    this.angle += 0.03; // Incrementa o ângulo (pode ser usado para futuras animações).
  }

  display() {
    push(); // Salva o estado atual da matriz de transformação.
    translate(this.x, this.y); // Move a origem para a posição da lua.
    noStroke(); // Desabilita o contorno.

    // Main moon body (Corpo principal da lua)
    fill(230, 230, 240); // Cor de preenchimento: cinza claro.
    ellipse(0, 0, this.radius); // Desenha o círculo principal da lua.

    // Crescent shape by overlaying ellipse (Formato de crescente sobrepondo uma elipse)
    fill(15, 24, 45); // Cor de preenchimento: azul escuro (cor do céu noturno para criar o recorte).
    ellipse(this.radius * 0.3, 0, this.radius, this.radius); // Desenha uma elipse sobreposta para criar o efeito de crescente.

    // Subtle craters using small ellipses (Crateras sutis usando pequenas elipses)
    fill(200, 200, 210, 150); // Cor de preenchimento das crateras (cinza claro semi-transparente).
    ellipse(-this.radius * 0.15, -this.radius * 0.2, this.radius * 0.15, this.radius * 0.15); // Desenha uma cratera.
    ellipse(this.radius * 0.1, this.radius * 0.15, this.radius * 0.12, this.radius * 0.12); // Desenha outra cratera.
    ellipse(-this.radius * 0.25, this.radius * 0.2, this.radius * 0.1, this.radius * 0.1); // Desenha a terceira cratera.

    pop(); // Restaura o estado anterior da matriz de transformação.
  }

  isMouseInside(mx, my) {
    let d = dist(mx, my, this.x, this.y); // Calcula a distância do mouse ao centro da lua.
    return d < this.radius * 0.6; // Retorna true se o mouse estiver dentro de uma área clicável da lua.
  }
}

// Definição da classe Building (Edifício).
class Building {
  constructor(x, baseY, w, h, forceLit = false) {
    this.x = x; // Posição X do edifício.
    this.baseY = baseY; // Posição Y da base do edifício.
    this.width = w; // Largura do edifício.
    this.height = h; // Altura do edifício.
    this.windowCols = floor(this.width / 20); // Número de colunas de janelas.
    this.windowRows = floor(this.height / 25); // Número de linhas de janelas.
    this.windowLights = []; // Array para armazenar o estado de cada janela (ligada/desligada).
    this.forceLit = forceLit; // Se true, todas as janelas estarão acesas.
    this.initWindows(); // Inicializa o estado das janelas.
  }

  initWindows() {
    // If forceLit is true (night mode city), all windows lit (Se forceLit for true, todas as janelas acendem)
    for (let row = 0; row < this.windowRows; row++) {
      this.windowLights[row] = []; // Inicializa a linha de janelas.
      for (let col = 0; col < this.windowCols; col++) {
        if (this.forceLit) { // Se forceLit for true
          this.windowLights[row][col] = true; // A janela está acesa.
        } else {
          this.windowLights[row][col] = random() < 0.5; // Aleatoriamente, a janela está acesa ou apagada.
        }
      }
    }
  }

  display(isNight = false) {
    // Building structure with gradient for depth (Estrutura do edifício com gradiente para profundidade)
    push(); // Salva o estado atual da matriz de transformação.
    // Create gradient fill for building body (Cria preenchimento gradiente para o corpo do edifício)
    for (let i = 0; i < this.height; i++) { // Desenha linhas para criar um gradiente vertical.
      let inter = map(i, 0, this.height, 0, 1); // Interpolação para o gradiente.
      let r = lerp(100, 150, inter); // Componente R da cor.
      let g = lerp(100, 150, inter); // Componente G da cor.
      let b = lerp(130, 170, inter); // Componente B da cor.
      stroke(r * 0.7, g * 0.7, b * 0.9); // Cor do traço com ajuste para um tom mais escuro/azulado.
      line(this.x, this.baseY - this.height + i, this.x + this.width, this.baseY - this.height + i); // Desenha a linha.
    }
    noStroke(); // Desabilita o contorno após desenhar o gradiente.

    // Draw windows with structure: frames and division lines (Desenha janelas com estrutura: molduras e linhas de divisão)
    let winW = 14; // Largura da janela.
    let winH = 22; // Altura da janela.
    let gapX = (this.width - this.windowCols * winW) / (this.windowCols + 1); // Espaçamento horizontal entre janelas.
    let gapY = (this.height - this.windowRows * winH) / (this.windowRows + 1); // Espaçamento vertical entre janelas.

    for (let row = 0; row < this.windowRows; row++) { // Para cada linha de janelas
      for (let col = 0; col < this.windowCols; col++) { // Para cada coluna de janelas
        let wx = this.x + gapX + col * (winW + gapX); // Posição X da janela.
        let wy = this.baseY - this.height + gapY + row * (winH + gapY); // Posição Y da janela.

        if (isNight || this.windowLights[row][col]) { // Se for noite OU a janela estiver acesa
          // Windows lit with warm glow and a grid to show panes (Janelas acesas com brilho quente e uma grade para mostrar painéis)
          fill(255, 244, 170, 230); // Cor de preenchimento: amarelo claro com transparência (janela acesa).
          rect(wx, wy, winW, winH, 3); // Desenha o retângulo da janela com cantos arredondados.
          stroke(255, 220, 140, 180); // Cor do contorno para as divisões da janela.
          strokeWeight(1); // Espessura do contorno.
          line(wx + winW / 2, wy, wx + winW / 2, wy + winH); // Linha vertical da divisão.
          line(wx, wy + winH / 2, wx + winW, wy + winH / 2); // Linha horizontal da divisão.
          noStroke(); // Desabilita o contorno.
        } else {
          // Windows off - dark glass with faint frame lines (Janelas apagadas - vidro escuro com linhas de moldura fracas)
          fill(30, 30, 45, 180); // Cor de preenchimento: cinza escuro azulado com transparência (janela apagada).
          rect(wx, wy, winW, winH, 3); // Desenha o retângulo da janela.
          stroke(60, 60, 80, 100); // Cor do contorno para as divisões (mais sutil).
          strokeWeight(0.7); // Espessura do contorno.
          line(wx + winW / 2, wy, wx + winW / 2, wy + winH); // Linha vertical.
          line(wx, wy + winH / 2, wx + winW, wy + winH / 2); // Linha horizontal.
          noStroke(); // Desabilita o contorno.
        }
      }
    }
    pop(); // Restaura o estado anterior da matriz de transformação.
  }

  isMouseInside(mx, my) {
    return (mx > this.x && mx < this.x + this.width &&
      my > this.baseY - this.height &&
      my < this.baseY); // Verifica se o mouse está dentro do retângulo do edifício.
  }
}

// Definição da classe StreetCar (Carro de rua).
class StreetCar {
  constructor(x, y) {
    this.x = x; // Posição X inicial do carro.
    this.y = y; // Posição Y do carro (na altura da rua).
    this.speed = random(1, 3); // Velocidade aleatória do carro.
    this.width = 60; // Largura do carro.
    this.height = 25; // Altura do carro.
    this.color = color(random(50, 255), random(50, 255), random(50, 255)); // Cor aleatória para o carro.
  }

  move() {
    this.x += this.speed; // Move o carro horizontalmente.
    if (this.x > width + this.width) { // Se o carro saiu completamente da tela para a direita
      this.x = -this.width - random(50, 200); // Reinicia o carro do lado esquerdo, com um pequeno offset.
      this.speed = random(1, 3); // Define uma nova velocidade aleatória.
      this.color = color(random(50, 255), random(50, 255), random(50, 255)); // Define uma nova cor aleatória.
    }
  }

  display() {
    fill(this.color); // Cor de preenchimento do carro.
    noStroke(); // Desabilita o contorno.
    rect(this.x, this.y - this.height, this.width, this.height, 8); // Desenha o corpo do carro com cantos arredondados.

    // Wheels (Rodas)
    fill(30); // Cor de preenchimento das rodas (cinza escuro).
    ellipse(this.x + 15, this.y, 20, 20); // Desenha a roda dianteira.
    ellipse(this.x + this.width - 15, this.y, 20, 20); // Desenha a roda traseira.

    // Windows (Janelas)
    fill(180, 220, 250, 200); // Cor de preenchimento das janelas (azul claro semi-transparente).
    rect(this.x + 10, this.y - this.height + 5, this.width - 30, this.height - 12, 3); // Desenha a janela do carro.
  }
}

// New class Smoke for smoke particles behind cars (Nova classe Smoke para partículas de fumaça atrás dos carros)
class Smoke {
  constructor(car) {
    this.car = car; // Referência ao carro que gera a fumaça.
    this.reset(); // Inicializa as propriedades da partícula.
  }

  reset() {
    // Start near the back of the car (rear left side) (Começa perto da parte traseira do carro)
    this.x = this.car.x - random(5, 15); // Posição X inicial, ligeiramente atrás do carro.
    this.y = this.car.y - this.car.height - random(10, 20); // Posição Y inicial, acima do carro.
    this.alpha = 180; // Transparência inicial da partícula.
    this.speedX = random(-0.3, 0.3); // Velocidade horizontal aleatória (para dispersão).
    this.speedY = random(-1.3, -0.8); // Velocidade vertical aleatória (para subir).
    this.life = 200; // Tempo de vida da partícula.
    this.size = random(15, 30); // Tamanho aleatório da partícula.
    this.angle = random(TWO_PI); // Ângulo para rotação da partícula.
    this.angleSpeed = random(-0.03, 0.03); // Velocidade de rotação da partícula.
  }

  update() {
    this.x += this.speedX; // Atualiza a posição X da partícula.
    this.y += this.speedY; // Atualiza a posição Y da partícula.
    this.alpha -= 1.2; // Diminui a transparência da partícula ao longo do tempo.
    this.life -= 1; // Diminui o tempo de vida da partícula.
    this.angle += this.angleSpeed; // Atualiza o ângulo da partícula.
    if (this.alpha < 0) { // Garante que a transparência não fique negativa.
      this.alpha = 0;
    }
  }

  display() {
    push(); // Salva o estado atual da matriz de transformação.
    translate(this.x, this.y); // Move a origem para a posição da partícula.
    rotate(sin(this.angle) * 0.2); // Rotaciona a partícula suavemente.
    noStroke(); // Desabilita o contorno.
    // Ellipses form layered clouds with small variation for structure (Elipses formam nuvens em camadas com pequena variação para estrutura)
    fill(140, 140, 140, this.alpha); // Cor de preenchimento da fumaça (cinza com transparência).
    ellipse(0, 0, this.size * 1.2, this.size * 0.7); // Desenha a primeira elipse da fumaça.
    ellipse(this.size * 0.3, -this.size * 0.15, this.size * 0.8, this.size * 0.5); // Desenha a segunda elipse.
    ellipse(-this.size * 0.4, -this.size * 0.1, this.size, this.size * 0.55); // Desenha a terceira elipse para formar a fumaça.
    pop(); // Restaura o estado anterior da matriz de transformação.
  }

  isFinished() {
    return this.life <= 0 || this.alpha <= 0; // Retorna true se a partícula terminou seu tempo de vida ou ficou completamente transparente.
  }

  isMouseInside(mx, my) {
    let d = dist(mx, my, this.x, this.y); // Calcula a distância do mouse ao centro da partícula.
    return d < this.size * 0.5; // Retorna true se o mouse estiver dentro da área da partícula.
  }
}

// --- Interaction --- //

// Função chamada quando o botão do mouse é pressionado.
function mousePressed() {
  // Para que o áudio possa ser iniciado pelo usuário em navegadores que exigem interação
  // Se nenhum áudio estiver tocando, tente iniciar o áudio do tema atual.
  // Isso é importante porque muitos navegadores bloqueiam a reprodução automática.
  if (!countrysideSound.isPlaying() && !citySound.isPlaying()) { // Se nenhum dos sons estiver tocando
    if (isCityTheme) { // Se for o tema da cidade
      citySound.play(); // Tenta iniciar o som da cidade.
    } else { // Se for o tema do campo
      countrysideSound.play(); // Tenta iniciar o som do campo.
    }
  }

  if (isCityTheme) { // Se o tema atual for a cidade
    // Check buildings (Verifica os edifícios)
    for (let building of buildings) { // Para cada edifício
      if (building.isMouseInside(mouseX, mouseY)) { // Se o mouse estiver dentro de um edifício
        infoBox = { // Define o conteúdo da caixa de informações.
          title: "Sustentabilidade Urbana",
          content: "Edifícios verdes economizam energia e água, promovendo qualidade de vida na cidade."
        };
        infoTimeout = millis() + 8000; // Define o tempo que a caixa ficará visível (8 segundos).
        return; // Sai da função para evitar múltiplas exibições.
      }
    }
    // Check smoke particles (from cars) (Verifica as partículas de fumaça dos carros)
    for (let sp of smokeParticles) { // Para cada partícula de fumaça
      if (sp.isMouseInside(mouseX, mouseY)) { // Se o mouse estiver dentro de uma partícula de fumaça
        infoBox = { // Define o conteúdo da caixa de informações.
          title: "Desvantagens da Fumaça Urbana",
          content: "A fumaça dos carros polui o ar, prejudica a saúde, contribui para as mudanças climáticas e afeta a qualidade de vida na cidade."
        };
        infoTimeout = millis() + 8000; // Define o tempo que a caixa ficará visível.
        return; // Sai da função.
      }
    }
  } else { // Se o tema atual for o campo
    // Check trees (Verifica as árvores)
    for (let tree of trees) { // Para cada árvore
      if (tree.isMouseInside(mouseX, mouseY)) { // Se o mouse estiver dentro de uma árvore
        infoBox = { // Define o conteúdo da caixa de informações.
          title: "Reflorestamento",
          content: "Plantar árvores ajuda a recuperar áreas degradadas, melhora a qualidade do ar e conserva a biodiversidade."
        };
        infoTimeout = millis() + 8000; // 8 seconds display (8 segundos de exibição).
        return; // Sai da função.
      }
    }
  }

  // Sun or Moon click interaction (shared) (Interação de clique no Sol ou Lua - compartilhada)
  if ((!isCityTheme && sun.isMouseInside(mouseX, mouseY)) || (isCityTheme && moon.isMouseInside(mouseX, mouseY))) { // Se for campo e clicar no sol OU se for cidade e clicar na lua
    infoBox = { // Define o conteúdo da caixa de informações.
      title: "Energia Solar",
      content: "A energia solar é renovável, limpa e ajuda a reduzir a emissão de gases do efeito estufa."
    };
    infoTimeout = millis() + 8000; // Define o tempo que a caixa ficará visível.
    return; // Sai da função.
  }

  // Clouds click interaction (shared) (Interação de clique nas Nuvens - compartilhada)
  for (let cloud of clouds) { // Para cada nuvem
    if (cloud.isMouseInside(mouseX, mouseY)) { // Se o mouse estiver dentro de uma nuvem
      infoBox = { // Define o conteúdo da caixa de informações.
        title: "Ciclo da Água",
        content: "A água evapora, forma nuvens e depois precipita, garantindo o ciclo vital dos ecossistemas."
      };
      infoTimeout = millis() + 8000; // Define o tempo que a caixa ficará visível.
      return; // Sai da função.
    }
  }
}

// Key pressed to toggle theme (Tecla pressionada para alternar o tema)
function keyPressed() {
  if (key === ' ' || key === 'Spacebar') { // Se a tecla pressionada for a barra de espaço
    isCityTheme = !isCityTheme; // Inverte o valor de isCityTheme (troca de tema).
    infoBox = null; // Limpa a caixa de informações.
    if (isCityTheme) { // Se o novo tema for a cidade
      setupCity(); // Configura o cenário da cidade.
    } else { // Se o novo tema for o campo
      setupCountryside(); // Configura o cenário do campo.
    }
  }
}

// --- Info Box Drawing --- //

// Desenha a caixa de informações na tela.
function drawInfoBox(info) {
  let boxWidth = width * 0.4; // Largura da caixa de informações.
  let boxHeight = height * 0.18; // Altura da caixa de informações.
  let x = width * 0.05; // Posição X da caixa.
  let y = height * 0.75; // Posição Y da caixa.
  fill(255, 255, 255, 230); // Cor de preenchimento: branco semi-transparente.
  stroke(20, 90, 25); // Cor do contorno: verde escuro.
  strokeWeight(3); // Espessura do contorno.
  rect(x, y, boxWidth, boxHeight, 15); // Desenha o retângulo da caixa com cantos arredondados.

  noStroke(); // Desabilita o contorno.
  fill(20, 90, 25); // Cor de preenchimento do texto.
  textSize(20); // Tamanho da fonte para o título.
  textStyle(BOLD); // Estilo do texto: negrito.
  text(info.title, x + 15, y + 35); // Desenha o título da informação.
  textSize(16); // Tamanho da fonte para o conteúdo.
  textStyle(NORMAL); // Estilo do texto: normal.
  textLeading(22); // Espaçamento entre as linhas do texto.
  text(info.content, x + 15, y + 65, boxWidth - 30, boxHeight - 50); // Desenha o conteúdo da informação, com quebra de linha automática.
}