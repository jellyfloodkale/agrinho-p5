// Variáveis globais
let fase = 0;
let nomeJogador = "";
let inputNome;
let botaoComecar;
let textoInicialX;
let tempoPiscar = 0;
let falaAtual = 0;
let recursosCarregados = false;
let erroCarregamento = null;
let videoCarregado = false;

// Variáveis para imagens, música e vídeo
let imgColegio, imgAgrinho, imgCity, imgFeira, imgMaria, imgJoaquim, imgGarrafa, imgCasca, imgCesto, imgMariaCaminhao, imgCampo1, imgCampoPost, imgPapel, imgCaminho, imgVas, imgVerd;
let musicaCampoliga, somCaminhao, somFestejando;
let musicaMutada = false;
let videoCampo;
let caminhaoPassando = false;

// Falas da Fase 1
const falasFase1 = [
  "Olá! Sou Maria e seja bem-vindo(a) ao Campoliga, qual é o seu nome?",
  (nome) => `Que alegria ter você aqui, ${nome}! Hoje você vai conhecer como as cidades e o campo podem trabalhar juntos.`,
  "Você já ouviu falar em cooperativas? São grupos de pessoas que se unem para alcançar objetivos em comum e nós somos a Campoliga, cooperativa",
  "Com o intuito de melhorar a vida das pessoas, gerar renda, proteger o meio ambiente e fortalecer a comunidade.",
  "Cooperar é mais do que ajudar: é construir juntos! E nesse jogo, você vai viver essa experiência com a gente, conectando o campo e a cidade de forma divertida e consciente!",
  "Nossa cidade produz muito lixo… Mas nem tudo precisa ir pro lixo! Vamos juntos separar garrafas PET?",
  "Essas garrafas podem ganhar uma nova vida. Com criatividade e cooperação, vamos transformá-las em ferramentas para a horta.",
  "Use o mouse para mover o cesto para os lados e coletar apenas as garrafas PET. Ganhe 2 pontos para cada garrafa PET e perca 1 ponto se pegar outro material.",
  "Quando conseguir 10 pontos pegando garrafas PET, passamos para a próxima etapa, clique em vamos começar!"
];

// Variáveis da Fase 2
let pontos = 0;
let objetosCaindo = [];
let cestoX;
const cestoY = 550;
const cestoWidth = 80;
const cestoHeight = 50;
const velocidadeQueda = 3;
const objetoTipos = [
  {img: null, tipo: 'garrafa', pontos: 2},
  {img: null, tipo: 'casca', pontos: -1},
  {img: null, tipo: 'papel', pontos: -1},
];

// Variáveis para Fase 3
let fase3Iniciada = false;
let caminhaoX;
let caminhaoY;
let falaMostrada = false;
let falasFase3 = [
  "Excelente trabalho! Podemos reciclar e reutilizar diversos tipos de lixo. O lixo orgânico, por exemplo, pode virar compostagem para o campo.",
  "Mas, nesta aventura, recolhemos garrafas PET. Agora, é hora de levar essas garrafas recicláveis para o campo, para dar uma nova vida para elas!",
  "O que parece lixo para uns, pode-se transformar e dar uma nova vida para ele. A cidade ajuda o campo, e o campo ajuda a cidade. Juntos ajudamos o mundo. Isso é cooperação!"
];
let falaAtual3 = 0;
let mostrandoFala3 = true;
let caminhaoVel = 3;
let fala3Terminou = false;

// Variáveis para Fase 3.5
let tempoCaminhando = 0;
let cenarioMudou = false;
let falasFase3_5 = [
  "Oi, [NOME]! Que bom que você veio, Maria me falou de você!",
  "Essas garrafas vão virar vasos e sistemas de irrigação para nossa horta! Aqui no campo, a gente faz muito com pouco, graças à união das pessoas e à força das cooperativas.",
  "Você pode me ajudar? Precisamos colher verduras fresquinhas!",
  "Arraste as verduras até o cesto. Precisamos de 10 verduras para levar até a feira da cooperativa, vamos lá."
];
let falaAtual3_5 = 0;

// Variáveis para Fase 4
let verduras = [];
let verdurasColhidas = 0;
let cestoVerduras = { x: 400, y: 500, width: 80, height: 60 }; // Cesto mais para baixo (y: 500)
let arrastandoVerdura = null;

// Variáveis para Fase Final
let fogos = [];
let tempoFinal = 0;
let tempoFalaFinal = 0;
let falasFaseFinal = [
  "Chegamos à feira! Aqui, os alimentos que colhemos são vendidos com apoio da cooperativa.",
  "Com a união entre o campo e a cidade, todos saem ganhando: o agricultor comercializa seus produtos, a cidade se alimenta com qualidade, e o planeta agradece pela harmonia sustentável.",
  "Isso é celebrar a cooperação! Isso é fazer parte de uma comunidade que cresce unida!"
];
let falaAtualFinal = 0;
let mostrarFim = false;

function preload() {
  try {
    imgColegio = loadImage('Colégio.jpg');
    imgAgrinho = loadImage('AGRINHO.jpg');
    imgCity = loadImage('CITY.jpg');
    imgFeira = loadImage('FEIRA.jpg');
    imgMaria = loadImage('maria.png');
    imgJoaquim = loadImage('joaquim.png');
    imgGarrafa = loadImage('garrafa.png');
    imgCasca = loadImage('casca.png');
    imgCesto = loadImage('cesto.png');
    imgMariaCaminhao = loadImage('marianocaminhão.png');
    imgCampo1 = loadImage('campo1.png');
    imgCampoPost = loadImage('campo1(PostparaInstagram).png');
    imgPapel = loadImage('papel.png');
    imgCaminho = loadImage('caminho.png');
    imgVas = loadImage('vas.png');
    imgVerd = loadImage('verdura.png');
    
    // Carrega os sons
    musicaCampoliga = loadSound('campoliga.mp3');
    somCaminhao = loadSound('car.mp3');
    somFestejando = loadSound('Cone.mp3');

    videoCampo = createVideo(['campo2.mp4', 'campo2.webm'], () => {
      videoCarregado = true;
    });

    objetoTipos[0].img = imgGarrafa;
    objetoTipos[1].img = imgCasca;
    objetoTipos[2].img = imgPapel;

    recursosCarregados = true;
  } catch (e) {
    console.error('Erro no preload:', e);
    erroCarregamento = 'Erro ao carregar recursos do jogo';
  }
}

function setup() {
  createCanvas(800, 600);
  textFont('Arial');

  if (erroCarregamento) {
    mostrarErroCarregamento();
    return;
  }

  try {
    videoCampo.hide();
    videoCampo.loop();
    videoCampo.volume(0);
    videoCampo.size(width, height);
  } catch (e) {
    console.error('Erro ao configurar vídeo:', e);
  }

  musicaCampoliga.setVolume(0.7);
  somCaminhao.setVolume(0.5);
  somFestejando.setVolume(0.7);

  textoInicialX = width;

  inputNome = createInput();
  inputNome.position(width/2 - 100, height/2 + 50);
  inputNome.size(200, 30);
  inputNome.hide();

  botaoComecar = createButton("Vamos começar");
  botaoComecar.position(width/2 - 60, height/2 + 50);
  botaoComecar.size(120, 40);
  botaoComecar.mousePressed(() => {
    fase = 2;
    inputNome.hide();
    botaoComecar.hide();
    iniciarFase2();
  });
  botaoComecar.hide();

  cestoX = width / 2;
  caminhaoX = -400;
  caminhaoY = height - 120;

  musicaCampoliga.loop();
}

function draw() {
  if (erroCarregamento) {
    mostrarErroCarregamento();
    return;
  }

  if (fase === 0) {
    fase0();
  } else if (fase === 1) {
    fase1();
  } else if (fase === 2) {
    fase2();
  } else if (fase === 3) {
    fase3();
  } else if (fase === 3.5) {
    fase3_5();
  } else if (fase === 4) {
    fase4();
  } else if (fase === 5) {
    faseFinal();
  }
}

function mostrarErroCarregamento() {
  background(0);
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Erro ao carregar o jogo:', width/2, height/2 - 40);
  text(erroCarregamento, width/2, height/2);
  textSize(16);
  text('Verifique o console para mais detalhes', width/2, height/2 + 40);
  text('Recarregue a página para tentar novamente', width/2, height/2 + 70);
}

function fase0() {
  if (videoCarregado) {
    image(videoCampo, 0, 0, width, height);
  } else {
    background(0, 0, 128);
  }
  
  imageMode(CORNER);
  image(imgColegio, 10, 10, 160, 150);
  image(imgAgrinho, width - 240, 10, 200, 150);
  
  fill(0);
  textSize(40);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);

  text("Agrinho: Campoliga Cresce com Você", textoInicialX, height / 3);
  textoInicialX -= 3;
  if (textoInicialX < -500) {
    textoInicialX = width;
  }

  tempoPiscar++;
  if (tempoPiscar % 60 < 30) {
    fill(255);
    rect(width/2 - 100, height/2 + 100, 200, 60, 10);
    fill(0, 0, 128);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("COMEÇAR", width/2, height/2 + 130);
  }

  desenharBotaoMusica();

  if (mouseIsPressed) {
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height/2 + 100 && mouseY < height/2 + 160) {
      fase = 1;
      textoInicialX = width;
      delayInputShow();
    }
  }
}

function desenharBotaoMusica() {
  fill(255, 150);
  ellipse(width - 40, height - 40, 50, 50);
  
  textSize(30);
  textAlign(CENTER, CENTER);
  if (musicaMutada) {
    text('🔇', width - 40, height - 40);
  } else {
    text('🎵', width - 40, height - 40);
  }
}

function delayInputShow() {
  setTimeout(() => {
    inputNome.show();
    inputNome.value('');
    inputNome.elt.focus();
  }, 200);
}

function fase1() {
  imageMode(CORNER);
  image(imgCity, 0, 0, width, height);

  fill(150);
  rect(0, height - 100, width, 100);

  imageMode(CENTER);
  let mariaLargura = 130;
  let mariaAltura = 200;
  image(imgMaria, 50, height - 150, mariaLargura, mariaAltura);

  fill(255);
  rect(100, 400, 600, 150, 20);
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);

  let fala = falasFase1[falaAtual];
  if (typeof fala === "function") {
    fala = fala(nomeJogador);
  }
  text(fala, 120, 420, 560, 120);

  if (falaAtual === 0) {
    inputNome.show();
  } else {
    inputNome.hide();
  }

  if (falaAtual > 0 && falaAtual < falasFase1.length) {
    fill(0);
    textAlign(CENTER);
    textSize(18);
    text("Clique na seta para passar a conversa", width / 2, 60);
  } else if (falaAtual === 0) {
    fill(0);
    textAlign(CENTER);
    textSize(18);
    text("Digite seu nome e pressione Enter para continuar", width / 2, 60);
  }

  if (falaAtual > 0) {
    desenharSetaAvancar(width - 100, 500);
  }

  if (falaAtual === falasFase1.length - 1) {
    botaoComecar.show();
  } else {
    botaoComecar.hide();
  }

  desenharBotaoMusica();
}

function desenharSetaAvancar(x, y) {
  fill(0);
  noStroke();
  triangle(x, y - 20, x, y + 20, x + 30, y);
}

function desenharPredios() {
  fill(70);
  for (let i = 0; i < width; i += 100) {
    rect(i, height - 300, 80, 300);
    fill(200, 200, 220);
    for (let j = height - 280; j < height; j += 40) {
      rect(i + 10, j, 20, 30);
      rect(i + 50, j, 20, 30);
    }
    fill(70);
  }
  
  fill(200);
  rect(0, height - 50, width, 20);
  
  fill(139, 69, 19);
  rect(650, height - 150, 30, 100);
  fill(0, 100, 0);
  ellipse(665, height - 180, 100, 80);
}

function iniciarFase2() {
  pontos = 0;
  objetosCaindo = [];
  for (let i = 0; i < 5; i++) {
    criarObjetoCaindo();
  }
  cestoX = width / 2;
}

function criarObjetoCaindo() {
  let objTipo = random(objetoTipos);
  objetosCaindo.push({
    x: random(50, width - 50),
    y: random(-200, -50),
    tipo: objTipo.tipo,
    img: objTipo.img,
    pontos: objTipo.pontos,
    velocidade: velocidadeQueda + random(0, 2)
  });
}

function fase2() {
  background(100, 149, 237);
  desenharPredios();

  fill(150);
  rect(0, height - 100, width, 100);

  cestoX = constrain(mouseX, cestoWidth, width - cestoWidth);

  imageMode(CENTER);
  image(imgCesto, cestoX, cestoY, cestoWidth*2, cestoHeight*2);

  for (let i = objetosCaindo.length -1; i >= 0; i--) {
    let obj = objetosCaindo[i];
    
    if (obj.img) {
      imageMode(CENTER);
      image(obj.img, obj.x, obj.y, 80, 80);
    }
    
    obj.y += obj.velocidade;

    if (obj.y > cestoY - cestoHeight && obj.y < cestoY + cestoHeight) {
      if (obj.x > cestoX - cestoWidth && obj.x < cestoX + cestoWidth) {
        pontos += obj.pontos;
        if (pontos < 0) pontos = 0;

        objetosCaindo.splice(i, 1);
        criarObjetoCaindo();
      }
    } else if (obj.y > height) {
      objetosCaindo.splice(i, 1);
      criarObjetoCaindo();
    }
  }

  fill(0);
  rect(10, 10, 150, 50, 10);
  fill(255);
  textSize(24);
  textAlign(LEFT, CENTER);
  text("Pontos: " + pontos, 20, 35);

  desenharBotaoMusica();

  if (pontos >= 10) {
    fase = 3;
    iniciarFase3();
  }
}

function iniciarFase3() {
  falaAtual3 = 0;
  mostrandoFala3 = true;
  caminhaoX = -400;
  caminhaoVel = 3;
  fala3Terminou = false;
  caminhaoPassando = false;
}

function fase3() {
  imageMode(CORNER);
  image(imgCity, 0, 0, width, height);

  imageMode(CORNER);
  if (!mostrandoFala3) {
    image(imgMariaCaminhao, caminhaoX, caminhaoY - 100, 400, 300);
  }

  if (mostrandoFala3) {
    imageMode(CENTER);
    image(imgMaria, 100, height - 150, 130, 195);
    
    fill(255);
    rect(50, 50, 700, 100, 20);
    fill(0);
    textSize(22);
    textAlign(LEFT, TOP);
    text(falasFase3[falaAtual3], 70, 70, 660, 80);

    desenharSetaAvancar(750, 130);
  }

  desenharBotaoMusica();

  if (!mostrandoFala3 && !fala3Terminou) {
    caminhaoX += caminhaoVel;
  }

  if (caminhaoX > width) {
    fala3Terminou = true;
    fill(255);
    rect(width/2 - 150, height/2 - 40, 300, 80, 20);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(26);
    text("Clique para ir ao campo", width/2, height/2);
  }
}

function fase3_5() {
  // Desenha o cenário do caminho
  imageMode(CORNER);
  image(imgCaminho, 0, 0, width, height);
  
  // Desenha o caminhão com Maria
  imageMode(CORNER);
  image(imgMariaCaminhao, caminhaoX, caminhaoY - 100, 400, 300);
  
  // Toca o som do caminhão quando ele aparece
  if (!caminhaoPassando && caminhaoX > -100) {
    musicaCampoliga.stop();
    somCaminhao.play();
    caminhaoPassando = true;
  }
  
  // Move o caminhão
  caminhaoX += 3;
  tempoCaminhando++;
  
  // Quando o caminhão sai da tela, muda para o cenário do campo
  if (caminhaoX > width) {
    somCaminhao.stop();
    if (!somFestejando.isPlaying()) {
      somFestejando.play();
    }
    
    // Desenha o cenário do campo com os personagens
    imageMode(CORNER);
    image(imgCampo1, 0, 0, width, height);
    
    imageMode(CENTER);
    let tamanhoPersonagem = 300;
    image(imgMaria, 200, height - 150, tamanhoPersonagem, tamanhoPersonagem*1.5);
    image(imgJoaquim, 400, height - 150, tamanhoPersonagem, tamanhoPersonagem*1.5);
    
    // Mostra as falas
    fill(255);
    rect(150, 100, 500, 120, 20);
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    
    let falaAtual = falasFase3_5[falaAtual3_5];
    if (typeof falaAtual === "string") {
      falaAtual = falaAtual.replace("[NOME]", nomeJogador);
    }
    text(falaAtual, 170, 120, 460, 100);
    
    // Mostra seta para avançar ou botão para começar
    if (falaAtual3_5 < falasFase3_5.length - 1) {
      desenharSetaAvancar(650, 190);
    } else {
      fill(100, 200, 100);
      rect(width/2 - 100, 250, 200, 50, 10);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Começar", width/2, 275);
    }
  }

  desenharBotaoMusica();
}

function iniciarFase4() {
  verduras = [];
  verdurasColhidas = 0;
  
  for (let i = 0; i < 15; i++) {
    let x = random(100, 700);
    let y = random(280, 430); // Ajustado para combinar com vasos alongados
    verduras.push({
      x: x,
      y: y,
      vasX: x,
      vasY: y,
      colhida: false,
      arrastando: false
    });
  }
}

function fase4() {
  imageMode(CORNER);
  image(imgCampoPost, 0, 0, width, height);
  
  imageMode(CENTER);
  image(imgCesto, cestoVerduras.x, cestoVerduras.y, cestoVerduras.width*2, cestoVerduras.height*2);

  // Desenha vasos e verduras
  for (let verdura of verduras) {
    if (!verdura.colhida) {
      // Desenha o vaso na posição original - alongado (100x140)
      image(imgVas, verdura.vasX, verdura.vasY, 120, 140);
      
      // Desenha a verdura (se não estiver sendo arrastada)
      if (!verdura.arrastando) {
        image(imgVerd, verdura.x, verdura.y, 40, 60);
      } else {
        image(imgVerd, mouseX, mouseY, 40, 60);
      }
    }
  }
  
  // Mostra contador
  fill(255);
  rect(10, 10, 200, 50, 5);
  fill(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(`Colhidas: ${verdurasColhidas}/10`, 20, 35);
  
  desenharBotaoMusica();

  if (verdurasColhidas >= 10) {
    fase = 5;
    tempoFinal = millis();
  }
}

function faseFinal() {
  imageMode(CORNER);
  image(imgFeira, 0, 0, width, height);
  
  imageMode(CENTER);
  let tamanhoPersonagem = 300;
  image(imgMaria, 250, height - 150, tamanhoPersonagem, tamanhoPersonagem*1.5);
  image(imgJoaquim, 450, height - 150, tamanhoPersonagem, tamanhoPersonagem*1.5);
  
  if (falaAtualFinal < falasFaseFinal.length) {
    mostrarBalaoFalaFinal(falasFaseFinal[falaAtualFinal], 80);
    
    desenharSetaAvancar(width - 100, 150);
  } else {
    if (frameCount % 60 < 30) {
      fill(255);
      textSize(40);
      textAlign(CENTER, CENTER);
      text("Fim de jogo!", width/2, height/2 - 50);
    }
    
    fill(100, 200, 100);
    rect(width/2 - 100, height/2 + 50, 200, 60, 10);
    fill(255);
    textSize(26);
    textAlign(CENTER, CENTER);
    text("Reiniciar", width/2, height/2 + 80);
    
    if (random() < 0.2) {
      fogos.push({
        x: random(width),
        y: random(height/2),
        cor: color(random(255), random(255), random(255)),
        tamanho: random(30, 80),
        tempo: 0
      });
    }
    
    for (let i = fogos.length - 1; i >= 0; i--) {
      let fogo = fogos[i];
      fill(fogo.cor);
      noStroke();
      ellipse(fogo.x, fogo.y, fogo.tamanho - fogo.tempo);
      fogo.tempo += 0.8;
      
      if (fogo.tempo > fogo.tamanho) {
        fogos.splice(i, 1);
      }
    }
  }

  desenharBotaoMusica();
}

function mostrarBalaoFalaFinal(texto, y) {
  fill(255);
  rect(100, y, 600, 120, 20);
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);
  text(texto, 120, y + 20, 560, 100);
}

function keyPressed() {
  if (fase === 1 && falaAtual === 0) {
    if (keyCode === ENTER) {
      nomeJogador = inputNome.value().trim();
      if (nomeJogador.length > 0) {
        falaAtual++;
      }
    }
  }
}

function mouseClicked() {
  // Verifica clique no botão de música
  if (dist(mouseX, mouseY, width - 40, height - 40) < 25) {
    musicaMutada = !musicaMutada;
    if (musicaMutada) {
      pararTodosSons();
    } else {
      if (fase === 0 || fase === 1 || fase === 2) {
        musicaCampoliga.loop();
      } else if (fase === 3.5 && caminhaoX > width) {
        somFestejando.loop();
      }
    }
    return;
  }

  if (fase === 1 && falaAtual > 0 && falaAtual < falasFase1.length - 1) {
    if (mouseX > width - 130 && mouseX < width - 70 && mouseY > 480 && mouseY < 520) {
      falaAtual++;
      if (falaAtual === 1) {
        nomeJogador = inputNome.value().trim();
        if (!nomeJogador) {
          falaAtual = 0;
          alert("Por favor, digite seu nome para continuar.");
        }
      }
    }
  } 
  else if (fase === 3) {
    if (mostrandoFala3) {
      if (mouseX > 750 && mouseX < 780 && mouseY > 110 && mouseY < 150) {
        falaAtual3++;
        if (falaAtual3 === falasFase3.length) {
          mostrandoFala3 = false;
          musicaCampoliga.stop();
          somCaminhao.play();
        }
      }
    } else if (fala3Terminou && mouseX > width/2 - 150 && mouseX < width/2 + 150 && 
               mouseY > height/2 - 40 && mouseY < height/2 + 40) {
      fase = 3.5;
      caminhaoX = -400;
      caminhaoY = height - 120;
      tempoCaminhando = 0;
      cenarioMudou = false;
    }
  }
  else if (fase === 3.5 && caminhaoX > width) {
    if (falaAtual3_5 < falasFase3_5.length - 1 && 
        mouseX > 650 && mouseX < 680 && mouseY > 170 && mouseY < 210) {
      falaAtual3_5++;
    } else if (falaAtual3_5 === falasFase3_5.length - 1 &&
               mouseX > width/2 - 100 && mouseX < width/2 + 100 && 
               mouseY > 250 && mouseY < 300) {
      fase = 4;
      iniciarFase4();
    }
  }
  else if (fase === 5) {
    if (falaAtualFinal < falasFaseFinal.length) {
      if (mouseX > width - 130 && mouseX < width - 70 && mouseY > 130 && mouseY < 170) {
        falaAtualFinal++;
      }
    } else if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
               mouseY > height/2 + 50 && mouseY < height/2 + 110) {
      reiniciarJogo();
    }
  }
}

function reiniciarJogo() {
  fase = 0;
  falaAtual = 0;
  falaAtualFinal = 0;
  mostrarFim = false;
  fogos = [];
  textoInicialX = width;
  inputNome.hide();
  botaoComecar.hide();
  videoCampo.loop();
  musicaCampoliga.loop();
  somFestejando.stop();
  somCaminhao.stop();
  caminhaoX = -400;
  caminhaoY = height - 120;
  tempoCaminhando = 0;
  cenarioMudou = false;
  falaAtual3_5 = 0;
}

function mousePressed() {
  if (fase === 4) {
    for (let verdura of verduras) {
      if (!verdura.colhida && !verdura.arrastando &&
          mouseX > verdura.x - 20 && mouseX < verdura.x + 20 &&
          mouseY > verdura.y - 20 && mouseY < verdura.y + 20) {
        verdura.arrastando = true;
        arrastandoVerdura = verdura;
        break;
      }
    }
  }
}

function mouseReleased() {
  if (fase === 4 && arrastandoVerdura) {
    if (mouseX > cestoVerduras.x - cestoVerduras.width && 
        mouseX < cestoVerduras.x + cestoVerduras.width &&
        mouseY > cestoVerduras.y - cestoVerduras.height && 
        mouseY < cestoVerduras.y + cestoVerduras.height) {
      arrastandoVerdura.colhida = true;
      verdurasColhidas++;
    }
    arrastandoVerdura.arrastando = false;
    arrastandoVerdura = null;
  }
}

function mouseDragged() {
  if (fase === 4 && arrastandoVerdura) {
    arrastandoVerdura.x = mouseX;
    arrastandoVerdura.y = mouseY;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  videoCampo.size(width, height);
}

function pararTodosSons() {
  musicaCampoliga.stop();
  somCaminhao.stop();
  somFestejando.stop();
}