let campocidade;
let xjogador = [150, 60, 120, 135];
let yjogador = [85, 150, 225, 150];
let jogador = ["🍊", "🍋", "🍊", "🍊"];
let quantidade = jogador.length;


function preload(){
   campocidade = loadImage ('campocidade.png');
 
}

function setup() {
  createCanvas(600, 800);
 
  
}

function draw() {
  background(220);
  image (campocidade, 0,0,600,800)
  
  textSize(30);
  fill("#FFFFFF");
  text(
    "aperte as teclas a, s, d, f para mover as frutas até o mercado",
    20,
    0,
    600
  );
  
  desenhaJogadores();
  desenhaLinhaChegada();
  verificaVencedor();
}
function desenhaJogadores() {
  textSize(40);
  for (let i = 0; i < quantidade; i++) {
    text(jogador[i], xjogador[i], yjogador[i]);
  }

  //text(jogador[1], xjogador[1], yjogador[1]);
  // text(jogador[2], xjogador[2], yjogador[2]);
}

  function desenhaLinhaChegada() {
  fill("white");
  rect(0,340, 600, 10);
  fill("rgb(61,248,0)");
  for (let xAtual = 0; xAtual < 600; xAtual += 20) {
    rect(xAtual,340, 10, 10);
  }

}
function verificaVencedor() {
  for (let i = 0; i < quantidade; i++) {
    if (yjogador[i] > 350) {
      fill ("#F0DA12");
      text(jogador[i] + "viva a conexão campo cidade!!", 50, 200, 300);
      noLoop();
    }
  }
}

let teclas = ["a", "s", "d", "f"];
function keyReleased() {
  for (let i = 0; i < quantidade; i++) {
    if (key === teclas[i]) {
      yjogador[i] += random(20);
    }
  }
}
