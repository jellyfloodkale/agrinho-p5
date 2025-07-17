//Variaveis principais
let TelaN = 0; let tela = [];
let botoes = [];
let prev = [];
let ms = false;
let bq = 0;

//Variaveis do nível 1
let subT = 0;
let solo = [];
let estN = 0;
let col = 7;
let lin = 7;
let maq = [];
let m = 0;
let score2 = 0;

//Variaveis do nível 2
let cont = 0;
let gado = [];
let aniG = 0;
let gen;
let rngF = 0;
let rngM = 0;
let port = [];
let score3 = 0;

//Variaveis das imagens
let imagemAvancar;
let imagemBoi;
let imagemColheitadeira;
let imagemComecar;
let imagemDesc1;
let imagemDesc2;
let imagemDesc3;
let imagemDesc4;
let imagemDesc5;
let imagemDesc6;
let imagemGafanhoto;
let imagemInfo;
let imagemMenu;
let imagemNivel1;
let imagemNivel2;
let imagemNivel3;
let imagemSair;
let imagemTelaconf;
let imagemTelafim;
let imagemTelainicial;
let imagemTelanivel1;
let imagemTelanivel2;
let imagemTelatitulo;
let imagemTerra1;
let imagemTerra2;
let imagemTerra3;
let imagemTerra4;
let imagemTrator;
let imagemVaca;
let imagemVoltar;

function preload() {
imagemAvancar = loadImage("imagens/avancar.png");
imagemBoi = loadImage("imagens/boi.png");
imagemColheitadeira = loadImage("imagens/colheitadeira.png");
imagemComecar = loadImage("imagens/comecar.png");
imagemDesc1 = loadImage("imagens/desc1.png");
imagemDesc2 = loadImage("imagens/desc2.png");
imagemDesc3 = loadImage("imagens/desc3.png");
imagemDesc4 = loadImage("imagens/desc4.png");
imagemDesc5 = loadImage("imagens/desc5.png");
imagemDesc6 = loadImage("imagens/desc6.png");
imagemGafanhoto = loadImage("imagens/gafanhoto.png");
imagemInfo = loadImage("imagens/info.png");
imagemMenu = loadImage("imagens/menu.png");
imagemNivel1 = loadImage("imagens/nivel1.png");
imagemNivel2 = loadImage("imagens/nivel2.png");
imagemNivel3 = loadImage("imagens/nivel3.png");
imagemSair = loadImage("imagens/sair.png");
imagemTelaconf = loadImage("imagens/telaConf.png");
imagemTelafim = loadImage("imagens/telaFim.png");
imagemTelainicial = loadImage("imagens/telainicial1.png");
imagemTelanivel1 = loadImage("imagens/telanivel1.png");
imagemTelanivel2 = loadImage("imagens/telanivel2.png");
imagemTelatitulo = loadImage("imagens/telatitulo.png");
imagemTerra1 = loadImage("imagens/terra1.png");
imagemTerra2 = loadImage("imagens/terra2.png");
imagemTerra3 = loadImage("imagens/terra3.png");
imagemTerra4 = loadImage("imagens/terra4.png");
imagemTrator = loadImage("imagens/trator.png");
imagemVaca = loadImage("imagens/vaca.png");
imagemVoltar = loadImage("imagens/voltar.png");
}
function setup() {
  createCanvas(841, 594);
    angleMode(DEGREES);
  
  tela[0] = new TelaInicial();
  tela[1] = new TelaConfiguracoes();
  tela[2] = new TelaNiveis();
  tela[3] = new TelaNivel_1();
  tela[4] = new TelaNivel_2();
  tela[5] = new TelaFim();
  
  for (let b = 0; b < botoes.length; b++) {
    botoes[b] = new Botao();
  }
}
function draw() {
  for (let i = 0; i < tela.length; i++) {
    if (TelaN == i) {
      if (tela[i].rp) {
        tela[i].setup();
        tela[i].rp = false;
      }
      tela[i].draw();
    }
  }
  
  if (TelaN != 1) {
    prev.push(TelaN);
  }
  if (prev.length > 1) {
    prev.splice(0,1);
  }
}

function mousePressed() {
  ms = true;
}
function mouseReleased() {
  ms = false;
}

function TelaInicial() {
  this.setup = function() {
    botoes[0] = new Botao(210, 254.5, 294, 72);
    botoes[1] = new Botao(520, 258.5, 64, 64);
  }
  this.draw = function() {
    imageMode(CORNER);
    image(imagemTelatitulo, 0, 0);
    BotaoProg(0, 0, 2);
    BotaoProg(1, 1, 1);
  }
  this.rp = true;
}

function TelaConfiguracoes() {
  this.setup = function() {
    botoes[2] = new Botao(10, 10, 65, 65);
  }
  this.draw = function() {
    imageMode(CORNER);
    image(imagemTelaconf, 0, 0);
    BotaoProg(2, 2, prev[0]);
  }
  this.rp = true;
}

function TelaNiveis() {
  this.setup = function() {
    botoes[1] = new Botao(10, 10, 65, 65);
    botoes[3] = new Botao(209.8, 254.5, 85, 85);
    botoes[4] = new Botao(378, 254.5, 85, 85);
    botoes[5] = new Botao(546.2, 254.5, 85, 85);
  }
  this.draw = function() {
    imageMode(CORNER);
    image(imagemTelainicial, 0, 0);
    if (bq >= 0) {
    BotaoProg(1, 1, 1);
    BotaoProg(3, 3, 3);
    }
    if (bq >= 1) {
    BotaoProg(4, 4, 4);
    }
    if (bq == 2) {
    BotaoProg(5, 7, 5);
    }
    
    for (let t = 3; t < 5; t++) {
      tela[t].rp = true;
    }
  }
  this.rp = true;
}

//Niveis
function TelaNivel_1() {
  this.setup = function() {
    maq[0] = new Maquina(50, 159, 25, 3);
    maq[1] = new Maquina(50, 297, 25, 3);
    maq[2] = new Maquina(50, 435, 25, 3);
    
    for (let c = 0; c < col; c++) {
      solo[c] = [];
      for (let l = 0; l < lin; l++) {
        solo[c][l] = new Solo_agricola(c*65 + 280, l*65 + 95, 30, 30);
      }
    }
    
    m = 0;
    
    subT = 0;
    estN = 0;
    score2 = 0;
    
    botoes[0] = new Botao(761, 10, 65, 65);
    botoes[8] = new Botao(761, 10, 65, 65);
  }
  this.draw = function() {
    imageMode(CORNER);
    image(imagemTelanivel1, 0, 0);
    
    for (let c = 0;c < col; c++) {
      for (let l = 0; l < lin; l++) {
        solo[c][l].des();
        if (solo[c][l].dtec(maq[m].posX, maq[m].posY, maq[m].diam/2)) {
          for (let i = 0; i < 3; i ++) {
            if (subT == i && solo[c][l].est == i*2) {
              solo[c][l].est++;
              score2++;
            } else if (subT == i && solo[c][l].est == i*2 + 1) {
              solo[c][l].est++;
            }
            if (solo[c][l].est == 6) {
              score2 += 2;
              solo[c][l].est = 0;
            } else if (subT == 2 && solo[c][l].est == 2) {
              score2++;
              solo[c][l].est = 0;
            }
          }
        }
        if (subT == 2 && solo[c][l].est == 4) {
          solo[c][l].est = 5;
        } else if (subT == 2 && solo[c][l].est == 2 && solo[c][l].rng >= 3) {
          solo[c][l].est = 5;
        }
        estN = solo[c][l].est;
      }
    }
    
    maq[m].des();
    maq[m].movi();
    
    BotaoProg(1, 1, 1);
    if (score2 >= 28 && subT == 2) {
    BotaoProg(0, 5, 2);
    bq = 1;
    } else if (score2 >= 14 && subT != 2) {
      BotaoProg(8, 6, 3);
    }
  }
  this.rp = true;
}
function TelaNivel_2() {
  this.setup = function() {
    for (let g = 0; g < 1; g++) {
      gado[g] = new Gado(400, 0, 25, 2);
    }
    
    cont = 0;
    rngF = floor(random(0, 3));
    rngM = floor(random(3, 6));
    score3 = 0;
    aniG = 0;
    
    inf = new Informacao(width/2, height/2);
    port[0] = new Portao(145, 450, 10, 100);
    port[1] = new Portao(685, 450, 10, 100);
    botoes[0] = new Botao(761, 10, 65, 65);
  }
  this.draw = function() {
    if (cont < 50) {
      imageMode(CORNER);
      image(imagemTelanivel2, 0, 0);
      inf.des();
      cont += 0.1;
    } else {
      imageMode(CORNER);
      image(imagemTelanivel2, 0, 0);
      for (let g = 0; g < gado.length; g++) {
        if (dist(gado[g].posX, gado[g].posY, gado[g].rngX, gado[g].rngY) < 20) {
          gado[g].rngX = int(random(160, 670));
          gado[g].rngY = int(random (30, 550));
        }
        gado[g].des();
        gado[g].movi();
        gado[g].gen();
        gado[g].dtec(mouseX, mouseY);
        for (let i = 0; i < 2; i++) {
          if (aniG < 10) {
            if (port[i].dtec(gado[g].posX, gado[g].posY, gado[g].diam)) {
              if (gen == i) {
                score3++;
              }
              aniG++;
              rngF = floor(random(0, 3));
              rngM = floor(random(3, 6));
              gado.push(new Gado(400, 0, 25, 2));
              gado.splice(0, 1);
            }
          }
        }
      }

      BotaoProg(1, 1, 1);
      if (aniG == 10) {
        bq = 2;
        BotaoProg(0, 5, 2);
      }
    }
  }
  this.rp = true;
}
function TelaFim() {
  this.setup = function() {
    
  }
  this.draw = function() {
    imageMode(CORNER);
    image(imagemTelafim, 0, 0);
    fill(255, 255, 255);
    textSize(80);
    textAlign(CENTER);
    text("Agrinho 30 anos", width/2, 150);
    textSize(40);
    text("Obrigado por jogar", width/2, 200);
    text("Pontuação: " + score2 + score3, width/2, 300);
    noLoop();
  }
  this.rp = true;
}

//Progamação dos botões
function BotaoProg(bt, tp, tn) {
  botoes[bt].des(tp);
  if (botoes[bt].detec(mouseX, mouseY) && ms) {
    ms = false;
    TelaN = tn;
    if (bt == 8 && tn == 3) {
      subT++;
      score2 = 0;
      m++;
    }
  }
}
function Botao(x, y, tx, ty) {
  this.posX = x;
  this.posY = y;
  this.tamX = tx;
  this.tamY = ty;
  
  this.des = function(tp) {
    if (tp == 0) {
    imageMode(CORNER);
    image (imagemComecar, this.posX, this.posY);
    } else if (tp == 1) {
    imageMode(CORNER);
    image (imagemMenu, this.posX, this.posY);
    } else if (tp == 2) {
    imageMode(CORNER);
    image (imagemVoltar, this.posX, this.posY);
    } else if (tp == 3) {
    imageMode(CORNER);
    image (imagemNivel1, this.posX, this.posY);
    } else if (tp == 4) {
    imageMode(CORNER);
    image (imagemNivel2, this.posX, this.posY);
    } else if (tp == 5) {
    imageMode(CORNER);
    image (imagemSair, this.posX, this.posY);
    } else if (tp == 6) {
    imageMode(CORNER);
    image (imagemAvancar, this.posX, this.posY);
    } else if (tp == 7) {
    imageMode(CORNER);
    image (imagemNivel3, this.posX, this.posY);
    }
  }
  this.detec = function(outX, outY) {
    if (outX > this.posX && outX < this.posX + this.tamX && outY > this.posY && outY < this.posY + this.tamY) {
      return true;
    } else {
      return false;
    }
  }
}

//Objetos do nível 1
function Solo_agricola(x, y, tx, ty) {
  this.posX = x;
  this.posY = y;
  this.tamX = tx;
  this.tamY = ty;
  
  this.des = function() {
    if (this.est == 0) {
    imageMode(CENTER);
    image(imagemTerra1, this.posX, this.posY);
    } else if (this.est == 1 || this.est == 2) {
    imageMode(CENTER);
    image(imagemTerra2, this.posX, this.posY);
    } else if (this.est == 3 || this.est == 4) {
    imageMode(CENTER);
    image(imagemTerra3, this.posX, this.posY);
    } else if (this.est == 5 || this.est == 6) {
    imageMode(CENTER);
    image(imagemTerra4, this.posX, this.posY);
    }
  }
  this.dtec = function(fx, fy, fd) {
    if (fx + fd >= this.posX - this.tamX && fx - fd <= this.posX + this.tamX && fy + fd >= this.posY - this.tamY && fy - fd <= this.posY + this.tamY) {
      return true;
    } else {
      return false;
    }
  }
  this.est = 0;
  this.rng = random (5);
}
function Maquina(x, y, r, v) {
  this.posX = x;
  this.posY = y;
  this.diam = r*2;
  this.vel = v;
  this.rt = 0;
  
  this.des = function() {
    push();
    if (this.posX <= mouseX - 30) {
      this.rt = 90;
    } else if (this.posY <= mouseY - 30) {
      this.rt = 180;
    } else if (this.posY >= mouseY + 30) {
      this.rt = 0;
    } else if (this.posX >= mouseX + 30) {
      this.rt = 270;
    }
    if (this.posY >= mouseY + 30 && this.posX <= mouseX - 30) {
      this.rt = 45;
    } else if (this.posX >= mouseX + 30 && this.posY <= mouseY - 30) {
      this.rt = 225;
    } else if (this.posY <= mouseY - 30 && this.posX <= mouseX - 30) {
      this.rt = 135;
    } else if (this.posX >= mouseX + 30 && this.posY >= mouseY + 30) {
      this.rt = 315;
    }
    translate(this.posX, this.posY);
    rotate (this.rt);
    imageMode(CENTER);
    if (m == 0) {
    image(imagemTrator, 0, 0);
    } else if (m == 1) {
    imageMode(CENTER);
    image(imagemGafanhoto, 0, 0);
    } else if (m == 2) {
    imageMode(CENTER);
    image(imagemColheitadeira, 0, 0);
    }
    pop();
  }
  this.movi = function() {
    this.posX = constrain(this.posX, 0 + this.diam/2, width - this.diam/2);
    this.posY = constrain(this.posY, 0 + this.diam/2, height - this.diam/2);
    if (this.posX <= mouseX - this.vel && ms) {
      this.posX += this.vel;
    } else if (this.posX >= mouseX + this.vel && ms) {
      this.posX -= this.vel;
    }
    if (this.posY <= mouseY - this.vel && ms) {
      this.posY += this.vel;
    } else if (this.posY >= mouseY + this.vel && ms) {
      this.posY -= this.vel;
    }
  }
}

//Objetos do nível 2
function Gado(x, y, r, v) {
  this.posX = x;
  this.posY = y;
  this.diam = r*2;
  this.vel = v;
  this.rngX = 250;
  this.rngY = 100;
  this.rngG = random(3);
  
  this.des = function() {
    if (gen == 0) {
    imageMode(CENTER);
    image(imagemVaca, this.posX, this.posY);
    } else {
    imageMode(CENTER);
    image(imagemBoi, this.posX, this.posY);
    }
  }
  this.movi = function() {
    this.posX = constrain(this.posX, 143 + this.diam/2, 700 - this.diam/2);
    this.posY = constrain(this.posY, 20 + this.diam/2, 580 - this.diam/2);
    
    if (this.posX <= mouseX - this.vel && ms) {
      this.posX += this.vel;
    } else if (this.posX >= mouseX + this.vel && ms) {
      this.posX -= this.vel;
    }
    if (this.posY <= mouseY - this.vel && ms) {
      this.posY += this.vel;
    } else if (this.posY >= mouseY + this.vel && ms) {
      this.posY -= this.vel;
    } else if (ms == false) {
      if (this.posX <= this.rngX - this.vel) {
        this.posX += this.vel;
      } else if (this.posX >= this.rngX + this.vel) {
        this.posX -= this.vel;
      }
      if (this.posY <= this.rngY - this.vel) {
        this.posY += this.vel;
      } else if (this.posY >= this.rngY + this.vel) {
        this.posY -= this.vel;
      }
    }
  }
  this.dtec = function(fx, fy) {
    if (dist(this.posX, this.posY, fx, fy) < this.diam/2) {
      if (gen == 1) {
        if (rngF == 0) {
          imageMode(CENTER);
          image(imagemDesc1, width/2, 500);
        } else if (rngF == 1) {
          imageMode(CENTER);
          image(imagemDesc2, width/2, 500);
        } else if (rngF == 2) {
          imageMode(CENTER);
          image(imagemDesc3, width/2, 500);
        }
      }
      if (gen == 0) {
        if (rngM == 3) {
          imageMode(CENTER);
          image(imagemDesc4, width/2, 500);
        } else if (rngM == 4) {
          imageMode(CENTER);
          image(imagemDesc5, width/2, 500);
        } else if (rngM == 5) {
          imageMode(CENTER);
          image(imagemDesc6, width/2, 500);
        }
      }
    }
  }
  this.gen = function() {
    if (this.rngG < 2) {
      gen = 0;
    } else {
      gen = 1;
    }
  }
}
function Informacao(x, y) {
  this.posX = x;
  this.posY = y;
  
  this.des = function() {
    imageMode(CENTER);
    image (imagemInfo, this.posX, this.posY);
  }
}
function Portao(x, y, tx, ty) {
  this.posX = x;
  this.posY = y;
  this.tamX = tx;
  this.tamY = ty;
  
  this.dtec = function(outX, outY, outD) {
    if (outX + outD/2 > this.posX && outX - outD/2 < this.posX + this.tamX && outY + outD/2 > this.posY && outY - outD/2 < this.posY + this.tamY) {
      return true;
    } else {
    return false;
    }
  }
}