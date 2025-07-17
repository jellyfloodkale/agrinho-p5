//Colégio Estadual José de Alencar - EM PROF
// Estudante Renato Steinheuser
//Projeto Agrinho - Memória do Campo


let cartas = [], embaralhadas = [], selecionadas = [], resolvidas = [];
const emojis = ["🐄","🥛","🐔","🥚","🐑","🧶","🐝","🍯"];
const pares  = {"🐄":"🥛","🥛":"🐄","🐔":"🥚","🥚":"🐔","🐑":"🧶","🧶":"🐑","🐝":"🍯","🍯":"🐝"};

let jogoIniciado = false, venceu = false, pontos = 0;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  fundoGradiente();
  if (!jogoIniciado && !venceu) telaInicial();
  else if (jogoIniciado && !venceu) jogar();
  else if (venceu) telaFinal();
}
// função mostrar a tela inicial
function telaInicial() {
  fill(255); textSize(48);
  text("🧠 Memória do Campo", width/2, 80);
  textSize(20); fill(30);
  text("Associe cada animal ao produto!", width/2, 150);
  text("🐄🥛  🐔🥚  🐑🧶  🐝🍯", width/2, 185);

  fill(50,180,100); rect(width/2-80, 300, 160, 50, 12);
  fill(255); textSize(24); text("COMEÇAR", width/2, 325);
}
//função mostrar a tela final
function telaFinal() {
  background(250,255,230);
  fill(0); textSize(40);
  text("🎉 Parabéns!", width/2, height/2-60);
  textSize(24);
  text("Você fez todos os pares!", width/2, height/2-20);
  text("Pontuação: "+pontos, width/2, height/2+20);
  text("Pressione 'R' para jogar novamente", width/2, height/2+60);
}
//função pressionar o mouse
function mousePressed() {
  if (!jogoIniciado && !venceu &&
      mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
      mouseY > 300 && mouseY < 350) {
    iniciarJogo();
    return;
  }

  if (!jogoIniciado) return;

  for (let i = 0; i < cartas.length; i++) {
    let c = cartas[i];
    if (!c.revelada && !resolvidas.includes(i) &&
        mouseX > c.x-30 && mouseX < c.x+30 &&
        mouseY > c.y-40 && mouseY < c.y+40) {

      c.revelada = true;
      selecionadas.push(i);

      if (selecionadas.length === 2) {
        let a = cartas[selecionadas[0]];
        let b = cartas[selecionadas[1]];
        if (pares[a.emoji] === b.emoji) {
          resolvidas.push(...selecionadas);
          pontos++;
        }
        setTimeout(() => {
          cartas.forEach((c, idx) => {
            if (!resolvidas.includes(idx)) c.revelada = false;
          });
          selecionadas = [];

          if (resolvidas.length === cartas.length) {
            venceu = true;
            jogoIniciado = false;
          }
        }, 700);
      }
    }
  }
}
//função iniciar o jogo
function iniciarJogo() {
  venceu = false; pontos = 0; cartas = []; selecionadas = []; resolvidas = [];
  embaralhadas = shuffle([...emojis]);

  const offsetX = 100, offsetY = 120, gap = 100;
  for (let i = 0; i < 8; i++) {
    cartas.push({
      emoji: embaralhadas[i],
      x: offsetX + (i%4)*gap,
      y: offsetY + floor(i/4)*gap,
      revelada: false
    });
  }
  jogoIniciado = true;
}
//Função Jogar
function jogar() {
  fill(255); textSize(18);
  text("Pontos: "+pontos, width - 70, 25);

  cartas.forEach((c, idx) => {
    fill(255); rect(c.x-30, c.y-40, 60, 80, 10);
    if (c.revelada || resolvidas.includes(idx)) {
      fill(0); textSize(40); text(c.emoji, c.x, c.y);
    } else {
      fill(120); text("❓", c.x, c.y);
    }
  });
}
//Cor do Fundo
function fundoGradiente() {
  for (let y = 0; y < height; y++) {
    let t = y / height;
    stroke(lerpColor(color(140,210,255), color(200,255,180), t));
    line(0, y, width, y);
  }
}
//Função Reiniciar o Jogo
function keyPressed() {
  if (venceu && key === 'r' || key === 'R') {
    iniciarJogo();
    venceu = false;
  }
}

