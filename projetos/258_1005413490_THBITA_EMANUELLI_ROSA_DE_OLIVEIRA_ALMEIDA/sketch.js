//projeto: uma fazendeira vai levar seus legumes a uma feira na cidade. vai venr para comprar uma tecnologia para plantio
let jogador;
let elivro = false;
let cena = 1; // variavel para organizer os eventos do jogo, sendo que assim que uma parte termina, cena ganha 1, e o próximo evento pode começar.
let cena2 = 1;

let Yj = 0; //variaveis global. esse é do movimento do jogador na vertical
let Xj = 0; //e esse na horiontal
let moveuJogador = false;
let página = 0;
let livroaberto = false;

function preload() {
  livrofechado = loadImage("LIVRO/livrofechado.png");
  livroinicial = loadImage("LIVRO/livroaberto.png");
  e = loadImage("LIVRO/tecla e.png");
  q = loadImage("LIVRO/teclaq.png");
  anotação = loadImage("LIVRO/pixil-frame-0.png");

  gramado = loadImage("CENARIO/grama.png");
  localFala = loadImage("CENARIO/telafala.png");

  frente = loadImage("Fazendeira/frente.png");
  atras = loadImage("Fazendeira/atras.png");
  direita = loadImage("Fazendeira/direita.png");
  esquerda = loadImage("Fazendeira/esquerda.png");

 texte = loadImage("LIVRO/carta.png");
  araucária = loadImage("arvores/araucáriag.png");
}

function setup() {
  createCanvas(800, 600); //c uma "tela" e 600 por 600
  jogador = frente;
}

function draw() {
  background(" rgb(46,19,5)"); //colore o fundo de azul
  texteadm();

  if (cena >= 5) {
    cenario();
  }
  if (cena >= 2) {
    if (elivro=== true) {
      livro();
    }
  }
  introdução1();
}

//funções

function introdução1() {
  if (cena === 1) {
    fill("black");
    rect(1, 1, 800, 600);
    fill("white");
    textSize(70);
    text("Você conhece", 180, 270); //conversa com o jogador
    text(" Ernst Gösth?", 180, 330);
    textSize(20);
    text("aperte     para continuar e     para voltar", 230, 370);
    fill("red");
    text("E", 293, 370);
    text("Q", 465, 370);
  }
  if (cena === 2) {
    página = 0;
  }
  if (cena === 3) {
    página = 1;
  }
  if (cena === 4) {
    página = 2;
  }
  if (cena === 2 || cena === 3 || cena === 4) {
    livro();
  }
}
function protaeetc() {
  if (keyIsDown(65)) {
    //se tecla "a" esta precionada, tiro cinco da variavel Xj, movo a fazendeira para a esquerda e mostro a imagem da fazendeira para a esquerda
    jogador = esquerda;
    Xj -= 5;
    moveuJogador = true;
  }
  if (keyIsDown(68)) {
    //se tecla "d" está precionada, fazendeira vai para a direita(+5)
    jogador = direita;
    Xj += 5;
    moveuJogador = true;
  }
  if (keyIsDown(83)) {
    //se tecla "s" está precionada, fazendeira vai para baixo(+5)
    jogador = frente;
    Yj += 5;
    moveuJogador = true;
  }
  if (keyIsDown(87)) {
    //se tecla "w" está precionada, fazendeira vai para a cima(-5)
    jogador = atras;
    Yj -= 5;
    moveuJogador = true;
  }
  //a variavel jogador ´pode virar uma direção que será transformada na
  if (jogador === atras) {
    image(atras, Xj, Yj);
  }
  if (jogador === frente) {
    image(frente, Xj, Yj);
  }
  if (jogador === direita) {
    image(direita, Xj, Yj);
  }
  if (jogador === esquerda) {
    image(esquerda, Xj, Yj);
  }

  if (Xj < -30) {
    //impede a fazendeira de sair da fazenda
    Xj = -30; //se ela está no X menos que zero, sua variavel muda para zero
  }
  if (Xj > 720) {
    //já aqui, é se ela estiver maior que 580, a variavel muda para 580
    Xj = 720;
  }
  if (Yj < -5) {
    //aqui é a mesma coisa, porem na vertical
    Yj = -5;
  }
  if (Yj > 500) {
    Yj = 500;
  }
  //  if(moveuJogador==false){
}

function keyPressed() {
  if (key === "p") {
    elivro = true;
  }
  if (cena <= 5) {
    if (key === "e") {
      cena += 1;
    }

    if (key === "q") {
      cena -= 1;
    }
  } else {
    if (key === "e") {
      cena2 += 1;
    }

    if (key === "q") {
      cena2 -= 1;
    }
  }
}
function cenario() {
  image(gramado, 0, 0);
  arvores();
  protaeetc();
  cartas();

  if (cena2 === 1) {
    // quando a segunda introdução começa...  image(livroaberto, 180, 80);

    if (moveuJogador === false) {
      jogador = frente;

      textSize(50);
      fill("white"); //pinta a pintura de branco
      text(
        "aperte A para ir para a esquerda, D para a direita,W para cima e S para baixo. Para continuar, aperte E",
        100,
        100,
        590
      );
    }
  }

  if (cena2 === 2) {
    //rect(690,40,60,30);
    fill("white");
    text(
      "clique no desenho de livro para ver as anotações da fazendeira",
      100,
      100,
      590
    );
  }
 
  
}
function mousePressed() {
  if (mouseX > 690 && mouseX < 690 + 40 && mouseY > 40 && mouseY < 40 + 30) {
    elivro = true;
       
  }

  if (mouseX > 60 && mouseX < 60 + 20 && mouseY > 10 && mouseY < 10 + 30) {
    elivro = false;
  }
 
}
function livro() {
  if (página === 0) {
    image(livrofechado, 210, 80);
    image(e, 635, 80);
  } else {
    image(livroinicial, 180, 80);
    image(e, 635, 80);
    image(q, 100, 80);
  }
  
  if (página === 1) {
    fill("rgb(45,23,8)");
    textSize(15);
    text(
      "Nascido na Suiça, Ernest Gösth trabalhava em melhoramento genetico até que pensou. ",
      210,
      160,
      250
    );
    fill("black");
    text(
      "Por que tentamos fazer as plantas se adaptarem ao nosso ambiente ao inves de adaptar o noss ambiente para elas?  ",
      210,
      220,
      245
    );
    fill("rgb(45,23,8)");
    text(
      "Após isso e de outros ocorridos, ele se mudou para a Bahia comprou uma fazenda e aplicou um sistema criado pelo próprio, chamado de agricultura sintrópica",
      210,
      300,
      250
    );

    text(
      "A agricultura sintrópica busca replicar o ambiente florestal no campo de forma que plantas nativas de diversas espécies convivam como numa mata virgem juntas de insetos e outros animais, sem pesticidas ou adubos. Diferente da monocultura que com o tempo degrada à terra e tira nutrientes, água e mata insetos, a agricultura sintrópica acrescenta adubo natural à terra, reestabelece nascentes e convive harmoniosamente com",
      450,
      150,
      220
    );
  }
  if (página === 2) {
    fill("rgb(45,23,8)");
    textSize(15);

    text(
      "animais, fungos e 'pestes'. O princípio é simples e pode ser aplicado tanto em extensos campos, quanto em cidades de concreto ou num pequeno quintal.",
      210,
      150,
      220
    );
  }
  if (página === 3) {
    text(
      "Para implementar na minha fazenda a agricultura sintrópica, pesquisei sobre plantas do Brasil, porém nem todas podem viver aqui no paraná de forma saudável. Clique numa das opções para plantarmos",
      210,
      150,
      220
    );
       if (elivro === true) {
     fill(0, 0, 0, 100);
  fill("white");
  textSize(30);
  text("X", 60, 40);
image(anotação,690,40);
   rect(690, 40, 40, 30);
     rect(0, 0, 800, 600);
    //araucaria, erva-mate, talvez café.
  }
 if(página===4){
    if (cena2 >= 2) {
 
}

  }
}
}
function cartas() {
  if (cartas !== 0) {
    image(texte, -110, 80);
    image(texte, 170, 80);
    image(texte, 420, 80);
    fill(0,10,250,100);
  }
}

function arvores() {
  image(araucária, 300, 100);

  image(anotação, 690, 40);

}
function texteadm() {
  fill("white");
  text(cena, 20, 20);
  text(cena2, 40, 20);
 

 // rect(190, 160, 490, 315); //(são as cordenadas do livro, caso eu precise).

 }


