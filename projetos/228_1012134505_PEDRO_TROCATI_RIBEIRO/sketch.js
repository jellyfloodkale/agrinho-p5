let fase = "introducao";
let alimentos = [];
let coletor = { x: 125, y: 480, alvo: null, indo: false, carregando: null };
let coletados = 0;

let fazendeiroImg, caminhaoImg, estradaImg, cidadeImg, mercadoImg;
let caminhao = { x: 0, y: 430, bloqueado: false };
let mercado = { x: 650, y: 380 };
let obstaculos = [];

let introText = [
  "Oi, sou o Fazendeiro Zé!",
  "Preciso colher meus alimentos e levá-los até o mercadão.",
  "Vamos nessa? Clique no botão para me ajudar!"
];
let introIndex = 0;
let introCharIndex = 0;
let introComplete = false;
let lastCharTime = 0;

function preload() {
  fazendeiroImg = loadImage("img/fazendeiro.png");
  caminhaoImg = loadImage("img/caminhao.png");
  estradaImg = loadImage("img/fazenda.png");
  cidadeImg = loadImage("img/cidade.png");
  mercadoImg = loadImage("img/mercado.png");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  frameRate(60);
  iniciarColheita();
  gerarObstaculos();
}

function draw() {
  background(220);

  if (fase === "introducao") {
    desenharCenarioFazenda();
    mostrarIntroducaoAnimada();
    desenharBotao(width / 2 - 70, height / 2 + 60, 140, 40);

  } else if (fase === "colheita") {
    desenharCenarioFazenda();
    mostrarAlimentos();
    moverColetor();
    mostrarColetor();

    if (coletados === alimentos.length) {
      let pulseSize = 28 + 4 * sin(frameCount * 0.2);
      fill(0);
      textSize(pulseSize);
      text("🎉 Todos os alimentos foram colhidos! 🎉", width / 2, height - 50);
    }

  } else if (fase === "transporte") {
    image(estradaImg, 0, 0, width, height);
    for (let obst of obstaculos) {
      fill(80);
      ellipse(obst.x, obst.y, 40, 40);
    }
    image(caminhaoImg, caminhao.x, caminhao.y, 160, 160);
    if (caminhao.x + 160 >= width) {
      fase = "cidade";
      caminhao.x = 0;
      caminhao.y = 430;
    }

  } else if (fase === "cidade") {
    image(cidadeImg, 0, 0, width, height);
    image(caminhaoImg, caminhao.x, caminhao.y, 160, 160);
    fill(0, 255, 0, 100);
    rect(mercado.x, mercado.y, 120, 120);
    fill(0);
    textSize(20);
    text("Mercado", mercado.x + 60, mercado.y - 10);
    if (
      caminhao.x + 80 > mercado.x &&
      caminhao.x + 80 < mercado.x + 120 &&
      caminhao.y + 80 > mercado.y &&
      caminhao.y + 80 < mercado.y + 120
    ) {
      fase = "mercado";
    }

  } else if (fase === "mercado") {
    image(mercadoImg, 0, 0, width, height);
    fill(0);
    textSize(28);
    text("🛒 Verificando os alimentos entregues...", width / 2, 80);
    let yBase = 150;
    for (let i = 0; i < alimentos.length; i++) {
      let alimento = alimentos[i];
      if (alimento.entregue) {
        let emoji = alimento.nome === "Arroz" ? "🍚" :
                    alimento.nome === "Feijão" ? "🌾" :
                    alimento.nome === "Tomate" ? "🍅" :
                    alimento.nome === "Batata" ? "🥔" : "❓";
        textSize(26);
        text(`${emoji} ${alimento.nome} entregue com sucesso!`, width / 2, yBase + i * 60);
      }
    }
    if (frameCount % 60 < 30) {
      textSize(20);
      fill(50, 150, 50);
      text("Obrigado por ajudar o Fazendeiro Zé!", width / 2, height - 50);
    }
  }
}

function desenharCenarioFazenda() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(34, 139, 34), inter);
    stroke(c);
    line(0, y, width, y);
  }
  fill(255, 255, 0, 200);
  noStroke();
  ellipse(700, 100, 100, 100);
  fill(34, 139, 34);
  rect(0, height - 100, width, 100);
  image(caminhaoImg, caminhao.x, caminhao.y, 160, 160);
  animarZe(100, height - 390 + 30, 200, 320);
  fill(0);
  textSize(18);
  text("Zé", 200, height - 60);
}

function mostrarAlimentos() {
  textAlign(CENTER, CENTER);
  for (let alimento of alimentos) {
    if (!alimento.entregue) {
      let emoji = alimento.nome === "Arroz" ? "🍚" :
                  alimento.nome === "Feijão" ? "🌾" :
                  alimento.nome === "Tomate" ? "🍅" :
                  alimento.nome === "Batata" ? "🥔" : alimento.nome;
      if (alimento.coletado && coletor.carregando === alimento) {
        textSize(60);
        fill(0);
        text(emoji, coletor.x, coletor.y - 40);
      } else if (!alimento.coletado) {
        textSize(60);
        fill(0);
        text(emoji, alimento.x, alimento.y);
      }
    }
  }
}

function mostrarColetor() {
  textSize(30);
  text("🚜", coletor.x, coletor.y);
}

function moverColetor() {
  if (!coletor.indo && !coletor.carregando) {
    for (let alimento of alimentos) {
      if (!alimento.coletado) {
        coletor.alvo = alimento;
        coletor.indo = true;
        break;
      }
    }
  }
  if (coletor.indo && coletor.alvo) {
    let dx = coletor.alvo.x - coletor.x;
    let dy = coletor.alvo.y - coletor.y;
    let distTotal = dist(coletor.x, coletor.y, coletor.alvo.x, coletor.alvo.y);
    if (distTotal > 2) {
      coletor.x += dx * 0.05;
      coletor.y += dy * 0.05;
    } else {
      coletor.alvo.coletado = true;
      coletor.carregando = coletor.alvo;
      coletor.indo = false;
      coletor.alvo = null;
    }
  }
  if (coletor.carregando) {
    let destinoX = caminhao.x + 80;
    let destinoY = 480;
    let dx = destinoX - coletor.x;
    let dy = destinoY - coletor.y;
    let distTotal = dist(coletor.x, coletor.y, destinoX, destinoY);
    if (distTotal > 2) {
      coletor.x += dx * 0.05;
      coletor.y += dy * 0.05;
    } else {
      coletor.carregando.entregue = true;
      coletor.carregando = null;
      coletados++;
      if (coletados === alimentos.length) {
        setTimeout(() => {
          fase = "transporte";
        }, 2000);
      }
    }
  }
}

function animarZe(x, y, w, h) {
  let pulse = 1 + 0.05 * sin(frameCount * 0.1);
  let angle = 0.05 * sin(frameCount * 0.15);
  push();
  translate(x + w / 2, y + h / 2);
  scale(pulse);
  rotate(angle);
  imageMode(CENTER);
  image(fazendeiroImg, 0, 0, w, h);
  pop();
}

function desenharBotao(x, y, w, h) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  fill(hover ? color(0, 180, 0) : color(0, 150, 0));
  stroke(hover ? color(0, 255, 0) : color(0, 100, 0));
  strokeWeight(2);
  rect(x, y, w, h, 10);
  fill(255);
  noStroke();
  textSize(22);
  text("Começar", x + w / 2, y + h / 2);
}

function mousePressed() {
  if (fase === "introducao") {
    let x = width / 2 - 70;
    let y = height / 2 + 60;
    let w = 140;
    let h = 40;
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && introComplete) {
      fase = "colheita";
    }
  }
}

function keyPressed() {
  if ((fase === "transporte" || fase === "cidade") && !caminhao.bloqueado) {
    if (keyCode === RIGHT_ARROW) caminhao.x += 10;
    else if (keyCode === LEFT_ARROW) caminhao.x -= 10;
    else if (keyCode === UP_ARROW) caminhao.y -= 10;
    else if (keyCode === DOWN_ARROW) caminhao.y += 10;
  }
}

function iniciarColheita() {
  coletados = 0;
  alimentos = [
    { nome: "Arroz", x: 150, y: 300, coletado: false, entregue: false },
    { nome: "Feijão", x: 300, y: 400, coletado: false, entregue: false },
    { nome: "Tomate", x: 500, y: 350, coletado: false, entregue: false },
    { nome: "Batata", x: 650, y: 300, coletado: false, entregue: false }
  ];
  coletor = { x: 125, y: 480, alvo: null, indo: false, carregando: null };
  caminhao = { x: 0, y: 430, bloqueado: false };
}

function gerarObstaculos() {
  for (let i = 0; i < 5; i++) {
    obstaculos.push({ x: random(100, 700), y: random(250, 500) });
  }
}

function mostrarIntroducaoAnimada() {
  fill(0);
  textSize(28);
  textAlign(CENTER, CENTER);
  let displayText = "";
  if (!introComplete) {
    if (millis() - lastCharTime > 40) {
      if (introCharIndex < introText[introIndex].length) {
        introCharIndex++;
      } else {
        introIndex++;
        introCharIndex = 0;
      }
      if (introIndex >= introText.length) {
        introComplete = true;
      }
      lastCharTime = millis();
    }
  }
  if (!introComplete) {
    displayText = introText[introIndex].substring(0, introCharIndex);
  } else {
    displayText = introText.join("\n");
  }
  text(displayText, width / 2, height / 2 - 60);
}
