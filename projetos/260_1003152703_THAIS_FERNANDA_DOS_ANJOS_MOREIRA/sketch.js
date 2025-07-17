


let campocidade;

let xjogador = [170, 40, 130, 135];
let yjogador = [95, 100, 235, 150];
let jogador = ["🌽", "🌽", "🫔", "🌽"];
let quantidade = jogador.length;


function preload(){
   campocidade = loadImage ('milho.png');
  
}

function setup() {
  createCanvas(600, 400);
 
  
}

function draw() {
  background(220);
  image (campocidade, 0,0,600,400)
  
  
  desenhaJogadores();
  desenhaLinhaChegada();
  verificaVencedor();
  
  textSize(30);
  fill("red");
  text(
    "aperte as teclas a, s, d, f para mover as frutas até o mercado",
    20,
    0,
    600
  );
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
  rect(285,0, 10, 400);
  fill("rgb(79,218,34)");
  for (let yAtual = 0; yAtual < 400; yAtual += 20) {
    rect(285, yAtual, 10, 10);
  }
  }    
    
function verificaVencedor() {
  for (let i = 0; i < quantidade; i++) {
    if (xjogador[i] > 350) {
      fill ("rgb(255,255,255)");
      text(jogador[i] + "Assim é feito a conexão do campo cidade!", 90, 200, 350);
      noLoop();
    }
  }
}
let teclas = ["a", "s", "d", "f"];
function keyReleased() {
  for (let i = 0; i < quantidade; i++) {
    if (key === teclas[i]) {
      xjogador[i] += random(20);
    }
  }
}



