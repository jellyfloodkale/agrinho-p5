// Variáveis globais
let tela = "inicio";
let aviso = "aviso";
let idioma = "pt";
let nomeJogador = "";
let inputNome;
let botaoConfirmar;
let vidas = 3;
let cellSize = 40;
let cols, rows;
let maze;
let player;
let dots = [];
let macas = [];
let fantasmas = [];
let labirintoIniciado = false;
let faseAtual = 1;
let pontuacao = 0;
let tempoUltimaMudanca = 0;
let perguntasFase = [];
let perguntaAtual = 0;
let mostrandoPerguntas = false;
let todasMacasColetadas = macas.every(m => m.coletada);
let todasPerguntasRespondidas = dots.every(d => d.coletado);

// Imagens
let BartNormal 
let Fazenda

    
function preload() {
  BartNormal = loadImage('BartNormal.png');
  Fazenda = loadImage('Fazenda.jpg');
}
// Layouts do labirinto
const layouts = [
  [
    "###############",
    "#             #",
    "# ### ##### ###",
    "# #   #   #   #",
    "# # ### # ### #",
    "#     #       #",
    "###############"
  ],
  [
    "###############",
    "#.....#.......#",
    "#.###.#.#####.#",
    "#.#.....#.....#",
    "#.#.###.#.###.#",
    "#.#.#...#...#.#",
    "#.#.#.#####.#.#",
    "#...#.......#.#",
    "###.#######.#.#",
    "#.............#",
    "###############"
  ]
];

// Perguntas por fase
const perguntasPorFase = [
  [
    { posX: 3, posY: 1, pergunta: "Qual a importância da agricultura sustentável para o meio ambiente?", opcoes: ["Preserva os recursos naturais e mantém o solo saudável", "Aumenta a poluição do ar e da água", "Destrói os habitats naturais"], correta: 0 },
    { posX: 7, posY: 3, pergunta: "Qual destes alimentos é cultivado em uma fazenda típica?", opcoes: ["Arroz", "Sorvete", "Pizza"], correta: 0 },
    { posX: 11, posY: 5, pergunta: "O que significa “agricultura familiar”?", opcoes: ["Produção feita por grandes empresas agrícolas", "Produção agrícola realizada por famílias em pequenas propriedades", "Agricultura feita só para alimentar animais"], correta: 1 }
  ],
  [
    { posX: 1, posY: 1, pergunta: "Qual prática ajuda a conservar o solo e evitar a erosão?", opcoes: ["Desmatar as árvores para plantar mais rápido", "Plantar árvores e usar técnicas de plantio direto", "Jogar lixo nas plantações"], correta: 1 },
    { posX: 3, posY: 3, pergunta: "Por que é importante valorizar o produtor rural?", opcoes: ["Porque eles produzem alimentos que chegam até nossas casas", "Porque eles só trabalham com máquinas", "Porque não precisamos dos alimentos que eles produzem"], correta: 0 }
  ]
];

// ---------- SETUP E DRAW -----------
function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
  textSize(20);
  criarInputNome();
}

function mudarTela(novaTela) {
  tela = novaTela;
  tempoUltimaMudanca = millis();
}

function criarInputNome() {
  inputNome = createInput();
  inputNome.position(width / 2 - 100, 200);
  inputNome.size(200);
  inputNome.hide();

  botaoConfirmar = createButton("Confirmar");
  botaoConfirmar.position(width / 2 - 50, 250);
  botaoConfirmar.mousePressed(() => {
    nomeJogador = inputNome.value();
    if (nomeJogador.trim() !== "") {
      tela = "mapa";
      inputNome.hide();
      botaoConfirmar.hide();
      tempoUltimaMudanca = millis();
    } else {
      alert("Por favor, digite seu nome antes de continuar!");
    }
  });
  botaoConfirmar.hide();
}

function draw() {
  background(255, 240, 245);

  switch (tela) {
    case "inicio":
      desenharTelaInicial();
      // Esconder input e botão na tela inicial
      if(inputNome) inputNome.hide();
      if(botaoConfirmar) botaoConfirmar.hide();
      break;

    case "nome":
      desenharTelaNome();
      // Mostrar input e botão só aqui
      if(inputNome) inputNome.show();
      if(botaoConfirmar) botaoConfirmar.show();
      break;

    case "mapa":
      desenharMapaFases();
      // Input e botão escondidos aqui
      if(inputNome) inputNome.hide();
      if(botaoConfirmar) botaoConfirmar.hide();
      break;

    case "aviso":
      desenharAviso();
      if(inputNome) inputNome.hide();
      if(botaoConfirmar) botaoConfirmar.hide();
      break;

    case "jogo":
    if (!labirintoIniciado) {
        inicializarLabirinto(faseAtual);
      }
      desenharLabirinto();
      desenharJogo();
      if(inputNome) inputNome.hide();
      if(botaoConfirmar) botaoConfirmar.hide();
      break;

    case "fim":
      desenharTelaFinal();
      if(inputNome) inputNome.hide();
      if(botaoConfirmar) botaoConfirmar.hide();
      break;
  }
}

// Função desenharLabirinto separada do switch

function desenharLabirinto() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === '#') {
        fill(0); // Preto para parede
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      } else {
        fill(255); // Espaço livre branco
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// ----------- TELAS ------------

function desenharTelaInicial() {
  let tamanhoQuadro = 40;
  for (let y = 0; y < height; y += tamanhoQuadro) {
    for (let x = 0; x < width; x += tamanhoQuadro) {
      if ((x / tamanhoQuadro + y / tamanhoQuadro) % 2 === 0) {
        fill(255, 200, 210);
      } else {
        fill(240, 180, 190);
      }
      noStroke();
      rect(x, y, tamanhoQuadro, tamanhoQuadro);
    }
  }
  fill(255, 100, 100);
  textSize(40);
  text("🍎 O Enigma da Fazenda de Pomar 🍎", width / 2, 70);

  fill(237, 59, 59);
  rect(320, 200, 200, 40, 10);
 

  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Começar", 420, 220);
}

function desenharTelaNome() {
  background(102, 16, 16);

  // Só cria o input e o botão se ainda não existem
  if (!inputNome) {
    inputNome = createInput();
    inputNome.position(width / 2 - 100, 200);
    inputNome.size(200);
  }
  
  if (!botaoConfirmar) {
    botaoConfirmar = createButton("Confirmar");
    botaoConfirmar.position(width / 2 - 50, 250);
    botaoConfirmar.mousePressed(() => {
      nomeJogador = inputNome.value();
      tela = "mapa";
      inputNome.hide();
      botaoConfirmar.hide();
    });
  }

  inputNome.show();
  botaoConfirmar.show();

  textSize(40);
  fill(255, 100);
  textAlign(LEFT, TOP);

  let spacing = 60;
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      text('🍎', x, y);
    }
  }

  fill(255);
  textSize(45);
  textAlign(CENTER, CENTER);
  text("Digite seu nome:", width / 2, 130);
}

function desenharMapaFases() {
    fill('#d1242c');
  textSize(32);
  text(`Bem-vinda, ${nomeJogador}!`, width / 2, 80);
  text("Escolha uma fase:", width / 2, 130);
  for (let i = 0; i < layouts.length; i++) {
    let x = 150 + i * 180;
    let y = 250;
    fill(i + 1 === faseAtual ? '#2ad124' : '#d12424');
    rect(x, y, 140, 140, 20);
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Fase " + (i + 1), x + 70, y + 75);
  }
}

function desenharTelaFinal() {
  background(40, 179, 9);
  
  // Fundo de maçãs espalhadas
  textSize(40);
  fill(9, 36, 2);
  
  textAlign(LEFT, TOP);

  let spacing = 60;
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      text('🍏', x, y);
    }
  }
  
  textAlign(CENTER, CENTER);
  textSize(24);
  text(
   `Você finalizou este jogo, ${nomeJogador}!\n\n` +
  `Com a pontuação de ${pontuacao}.\n\n` +
  "Espero que, durante a experiência de jogo, vocês tenham refletido um pouco mais\n" +
  "sobre a importante conexão entre o campo e a cidade.\n\n",
    width / 2, height / 2 - 20
  );
}

function desenharAviso() {
 background(255, 240, 245); // Fundo rosinha claro

  // Bolinhas vermelhas espalhadas no fundo
  noStroke();
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let tamanho = random(10, 30);
    fill(255, 0, 0, 150); // Vermelho com transparência
    ellipse(x, y, tamanho, tamanho);
  }
  
  fill(115, 17, 28);
  textAlign(CENTER, TOP);
  textSize(22);
  text("Missão:", width / 2, 50);

  textSize(18);
  text("Bartelomena está faminta e deseja saborear muitas maçãs fresquinhas!\n" +
  "Sua missão é ajudar nossa amiga a colher o \n máximo de maçãs possível, mas cuidado:\n o fazendeiro está de olho e não pode pegá-la!\n" +
  "⚠️ Atenção: os pontos de interrogação \"?\" escondem surpresas!\n" +
  "Se você responder às perguntas corretamente,\n ganhará maçãs extras para a sua pontuação!\n" +
  "Boa sorte e divirta-se nessa aventura deliciosa! 🍎✨", width / 2, 90);

  textSize(24);
  fill(252, 139, 159);
  text("Bom Jogo!!!", width / 2, height - 100);

  fill(255, 192, 203);
  rect(width / 2 - 100, height - 60, 200, 40, 10);
  fill(115, 17, 28);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Começar", width / 2, height - 40);
}


// -------- LABIRINTO ----------

function inicializarLabirinto(fase) {
  maze = layouts[fase - 1];
  perguntasFase = perguntasPorFase[fase - 1];
  cols = maze[0].length;
  rows = maze.length;
  player = { x: 1, y: 1 };
  dots = perguntasFase.map(p => ({ x: p.posX, y: p.posY, coletado: false }));

  macas = [];
  let quantidadeMacas = 100;
  let tentativas = 0;

  while (macas.length < quantidadeMacas && tentativas < 1000) {
    tentativas++;
    let x = floor(random(cols));
    let y = floor(random(rows));
    let livre = maze[y][x] !== "#" &&
                !dots.some(d => d.x === x && d.y === y) &&
                !(x === player.x && y === player.y) &&
                !macas.some(m => m.x === x && m.y === y);
    if (livre) macas.push({ x: x, y: y, coletada: false });
  }

  fantasmas = [];
  if (fase === 2) {
    fantasmas.push(new Fantasma(3, 3));
    fantasmas.push(new Fantasma(6, 6));
  }

  perguntaAtual = 0;
  mostrandoPerguntas = false;
  labirintoIniciado = true;
  vidas = 3;
  pontuacao = 0;
}

function verificarAvancoDeFase() {
  let todasMacasColetadas = macas.every(m => m.coletada);
  let todasPerguntasRespondidas = dots.every(d => d.coletado);

  if (todasMacasColetadas && todasPerguntasRespondidas) {
    if (faseAtual >= layouts.length) {
      mudarTela("fim");
    } else {
      alert(`Parabéns, ${nomeJogador}! Fase ${faseAtual} completa!\nPontuação: ${pontuacao}`);
      faseAtual++;
    mudarTela("mapa");
      labirintoIniciado = false;
    }
  }
}

function desenharJogo() {
    imageMode(CORNER);
    image(Fazenda, 0, 0, width, height);
    
   for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === "#") {
        fill(72, 207, 75); 
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      } else {
        fill(200, 240, 200);  // cor do chão (mesma do background)
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
  

  fill(255, 0, 0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("❤️".repeat(vidas), 20, 10);

  for (let d of dots) {
    if (!d.coletado) {
      fill(189, 53, 53);
      ellipse(d.x * cellSize + cellSize / 2, d.y * cellSize + cellSize / 2, 20);
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text("?", d.x * cellSize + cellSize / 2, d.y * cellSize + cellSize / 2);
    }
  }

  textSize(24);
  textAlign(CENTER, CENTER);
  for (let m of macas) {
    if (!m.coletada) {
      fill(255, 0, 0);
      text("🍎", m.x * cellSize + cellSize / 2, m.y * cellSize + cellSize / 2 + 2);
      verificarAvancoDeFase();
    }
  }
   verificarAvancoDeFase();
imageMode(CENTER);
  image(
    BartNormal,
    player.x * cellSize + cellSize / 2,
    player.y * cellSize + cellSize / 2,
    cellSize,
    cellSize
  );

  for (let f of fantasmas) {
    f.mover();
    f.desenhar();
    if (f.x === player.x && f.y === player.y) {
      vidas--;
      if (vidas <= 0) {
        tela = "fim";
        return;
      } else {
        alert(`👩‍ Você foi pego pelo fazeideiro! Vidas restantes: ${vidas}`);
        player.x = 1;
        player.y = 1;
      }
    }
  }

  fill(27, 99, 27);
  textSize(22);
  textAlign(RIGHT, TOP);
  text(`🍎 ${pontuacao}`, width - 300, 10);

  if (mostrandoPerguntas) {
    fill(0, 150);
    rect(0, 0, width, height);

    let cx = width / 2;
    let cy = height / 2;

    fill(255, 105, 105, 245);
    rect(cx - 200, cy - 120, 420, 240, 12);

    fill(64, 7, 7);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(perguntasFase[perguntaAtual].pergunta, cx, cy - 40);

    let opW = 200, opH = 35, baseX = cx - opW / 2, baseY = cy - 10;
    for (let j = 0; j < perguntasFase[perguntaAtual].opcoes.length; j++) {
      fill(255, 105, 105, 245); 
      rect(baseX, baseY + j * (opH + 10), opW, opH, 8);
      fill(64, 7, 7);
      text(perguntasFase[perguntaAtual].opcoes[j], baseX + opW / 2, baseY + j * (opH + 10) + opH / 2);
    }
  }
}

function ehParede(x, y) {
 if (x < 0 || y < 0 || y >= rows || x >= cols) return true;
  return maze[y][x] === "#";{

console.log(ehParede(-1, 0)); // true, fora do labirinto
console.log(ehParede(0, 0));  // true, se for parede
console.log(ehParede(1, 1));  // false, se for espaço aberto
console.log(ehParede(cols, rows)); // true, fora do labirinto
}
function moverJogador(direcaoX, direcaoY) {
  let novoX = player.x + direcaoX;
  let novoY = player.y + direcaoY;

  if (!ehParede(novoX, novoY)) {
    player.x = novoX;
    player.y = novoY;

    for (let m of macas) {
      if (!m.coletada && m.x === player.x && m.y === player.y) {
        m.coletada = true;
        pontuacao++;
      }
    }

    for (let d of dots) {
      if (!d.coletado && d.x === player.x && d.y === player.y) {
        d.coletado = true;
        mostrandoPerguntas = true;
        perguntaAtual = 0;
      }
    }
  }
}
}

function moverJogador(direcaoX, direcaoY) {
  let novoX = player.x + direcaoX;
  let novoY = player.y + direcaoY;

  if (!ehParede(novoX, novoY)) {
    player.x = novoX;
    player.y = novoY;

    for (let m of macas) {
      if (!m.coletada && m.x === player.x && m.y === player.y) {
        m.coletada = true;
        pontuacao++;
      }
    }

    for (let d of dots) {
      if (!d.coletado && d.x === player.x && d.y === player.y) {
        d.coletado = true;
        mostrandoPerguntas = true;
        perguntaAtual = 0;
      }
    }
  }
}

// ------- FANTASMA -------

class Fantasma {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = random([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    this.timer = 0;
    this.velocidade = 15;
  }

  mover() {
    this.timer++;
    if (this.timer % this.velocidade !== 0) return;

    if (this.timer > 30) {
      this.dir = random([[1, 0], [-1, 0], [0, 1], [0, -1]]);
      this.timer = 0;
    }

    let nx = this.x + this.dir[0];
    let ny = this.y + this.dir[1];
    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] !== "#") {
      this.x = nx;
      this.y = ny;
    }
  }
desenhar() {
  textSize(cellSize * 0.9);
  textAlign(CENTER, CENTER);
  text("👩‍🌾", this.x * cellSize + cellSize / 2, this.y * cellSize + cellSize / 2);
}
}

// ------- CONTROLES -------

function keyPressed() {
  if (tela === "inicio" && key === 'Enter') {
    tela = "nome";
  } else if (tela === "mapa" && key === 'c') {
    mostrarConfig = !mostrarConfig;
  } else if (tela === "jogo" && !mostrandoPerguntas) {
    let nx = player.x;
    let ny = player.y;

    if (keyCode === UP_ARROW) ny--;
    else if (keyCode === DOWN_ARROW) ny++;
    else if (keyCode === LEFT_ARROW) nx--;
    else if (keyCode === RIGHT_ARROW) nx++;

    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] !== "#") {
      moverJogador(nx - player.x, ny - player.y);
    }
  }
}
 
function mousePressed() {
  if (millis() - tempoUltimaMudanca < 300) {
  return;  // Bloqueia clique se for muito rápido após mudar de tela
}
  // Proteção só para a tela do mapa
  if (tela === "mapa" && millis() - tempoUltimaMudanca < 300) {
    return;  // Bloqueia clique se for muito rápido após mudar de tela
  }

  if (tela === "inicio") {
    if (mouseX > 320 && mouseX < 520 && mouseY > 200 && mouseY < 240) {
      mudarTela("nome");
      return;
    }
  }
  
  if (tela === "nome") {
  if (mouseX > 150 && mouseX < 150 + 140 &&
    mouseY > 250 && mouseY < 250 + 140) {
    mudarTela("mapa");
    return;
  }
}


  if (tela === "mapa") {
    for (let i = 0; i < layouts.length; i++) {
      let x = 150 + i * 180;
      let y = 250;
      if (mouseX > x && mouseX < x + 140 && mouseY > y && mouseY < y + 140) {
       faseAtual = i + 1;
       tela = "aviso";
       labirintoIniciado = false;
       tempoUltimaMudanca = millis();
       return;
      }
    }
  }

  if (tela === "aviso") {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height - 60 && mouseY < height - 20) {
     mudarTela("jogo");
      if (!labirintoIniciado) {
        inicializarLabirinto(faseAtual);
      }
      return;
    }
  }

  if (tela === "jogo" && mostrandoPerguntas) {
    let cx = width / 2, cy = height / 2;
    let opW = 200, opH = 35, baseX = cx - opW / 2, baseY = cy - 10;

    for (let i = 0; i < perguntasFase[perguntaAtual].opcoes.length; i++) {
      if (mouseX > baseX && mouseX < baseX + opW &&
          mouseY > baseY + i * (opH + 10) && mouseY < baseY + i * (opH + 10) + opH) {

        if (i === perguntasFase[perguntaAtual].correta) {
          pontuacao += 10;
          dots[perguntaAtual].coletado = true;
           mostrandoPerguntas = false;
          verificarAvancoDeFase();

          let todasMacasColetadas = macas.every(m => m.coletada);
          let todasPerguntasRespondidas = dots.every(d => d.coletado);

          if (todasMacasColetadas && todasPerguntasRespondidas) {
            if (faseAtual >= layouts.length) {
              mudarTela("fim");
            } else {
             alert(`Parabéns, ${nomeJogador}! Fase ${faseAtual} completa!\nPontuação: ${pontuacao}`);
              faseAtual++;
              mudarTela("mapa");
              labirintoIniciado = false;
            }
          }
        } else {
          alert("Resposta errada! Tente novamente.");
        }
      }
    }
  }
}
