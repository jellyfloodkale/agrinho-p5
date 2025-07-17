let snd;
var start;
var intro,garota,algoum, algodois, algotrês,algoquatro,algocinco,algoseis,algosete,algooito, parabens,tricotagem,cordoum,cordodois,cordotres,andarum,andardois,andartres,andarquatro,andarcinco,andarseis,andarsete,andaroito,andarnove,andardez,transporte,costura, loja,chegaum,chegadois, startover;

function preload(){
  soundFormats("mp3");
  snd = loadSound("Pajama Party - Jeremy Korpas.mp3");
  start = loadImage("sets/start game 2025.jpg");
  intro =loadImage ("sets/INTRODUÇÃO 2025.png");
  garota = loadImage ("sets/garota apresentação.png")
  algoum = loadImage ("sets/algodão 1.jpg")
  algodois = loadImage ("sets/algodão 2.jpg")
  algotrês= loadImage ("sets/algodão 3.jpg")
  algoquatro = loadImage ("sets/algodão 4.jpg")
  algocinco = loadImage ("sets/algodão 5.jpg")
  algoseis = loadImage ("sets/algodão 6.jpg")
  algosete = loadImage ("sets/algodão 7.jpg")
  algooito = loadImage ("sets/algodão 8.jpg")
  parabens = loadImage ("sets/PARABÉNS conseguimos colher!.png")
  tricotagem = loadImage ("sets/tricotagem.png")
  cordoum = loadImage ("sets/cor do tecido 1.jpg")
  cordodois = loadImage ("sets/cor do tecido 2.jpg")
  cordotrês = loadImage ("sets/cor do tecido 3.jpg")
  andarum = loadImage ("sets/andar 1.jpg")
  andardois = loadImage ("sets/andar 2.jpg")
  andartres =loadImage ("sets/andar 3.jpg")
  andarquatro = loadImage ("sets/andar 4.jpg")
  andarcinco =loadImage ("sets/andar 5.jpg")
  andarseis = loadImage ("sets/andar 6.jpg")
  andarsete = loadImage ("sets/andar 7.jpg")
  andaroito = loadImage ("sets/andar 8.jpg")
  andarnove = loadImage ("sets/andar 9.jpg")
  andardez = loadImage ("sets/andar 10.jpg")
  transporte = loadImage ("sets/tranporte confecção de roupas.png")
  costura = loadImage ("sets/costureira.png")
  loja= loadImage ("sets/loja de roupas.png")
  chegaum = loadImage ("sets/chegamos ao final.png")
  chegadois = loadImage ("sets/chegamos ao final 2.png")
  startover = loadImage ("sets/start over.jpg")
}
let totalCenas = 32;
let cenaAtual = 0;

function setup() {
  createCanvas(800, 500);
  snd.play();
}

function draw() {
  // Chama a função da cena atual
  switch (cenaAtual) {
    case 0: cena0(); break;
    case 1: cena1(); break;
    case 2: cena2(); break;
    case 3: cena3(); break;
    case 4: cena4(); break;
    case 5: cena5(); break;
    case 6: cena6(); break;
    case 7: cena7(); break;
    case 8: cena8(); break;
    case 9: cena9(); break;
    case 10: cena10(); break;
    case 11: cena11(); break;
    case 12: cena12(); break;
    case 13: cena13(); break;
    case 14: cena14(); break;
    case 15: cena15(); break;
    case 16: cena16(); break;
    case 17: cena17(); break;
    case 18: cena18(); break;
    case 19: cena19(); break;
    case 20: cena20(); break;
    case 21: cena21(); break;
    case 22: cena22(); break;
    case 23: cena23(); break;
    case 24: cena24(); break;
    case 25: cena25(); break;
    case 26: cena26(); break;
    case 27: cena27(); break;
    case 28: cena28(); break;
    case 29: cena29(); break;
    case 30: cena30(); break;
    case 31: cena31(); break;
  }
}

function mousePressed() {
  if (cenaAtual < totalCenas - 1) {
    cenaAtual++;
  }
}
function cena0()  { background(start); }
function cena1()  { background(intro);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400); 
}
function cena2()  { background(garota);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena3()  { background(algoum); }
function cena4()  { background(algodois); }
function cena5()  { background( algotrês); }
function cena6()  { background(algoquatro ); }
function cena7()  { background(algocinco); }
function cena8()  { background(algoseis); }
function cena9()  { background(algosete); }
function cena10() { background( algooito); }
function cena11() { background(parabens);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena12() { background(tricotagem);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena13() { background(cordoum); }
function cena14() { background(cordodois); }
function cena15() { background(cordotrês);
                  textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena16() { background(andarum); }
function cena17() { background(andardois); }
function cena18() { background(andartres); }
function cena19() { background(andarquatro); }
function cena20() { background(andarcinco); }
function cena21() { background(andarseis); }
function cena22() { background(andarsete); }
function cena23() { background(andaroito); }
function cena24() { background(andarnove); }
function cena25() { background(andardez); }
function cena26() { background(transporte);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena27() { background(costura );
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena28() { background(loja);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena29() { background(chegaum);
  textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena30() { background(chegadois);
textSize(80);         
  textAlign(700,900);   
  text("▶️", 600, 400);}
function cena31() { background(startover); }


