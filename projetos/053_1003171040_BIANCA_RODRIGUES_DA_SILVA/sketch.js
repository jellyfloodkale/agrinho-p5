let nivel = 0;
let botaoNivel3feito = false;
let botaoStart, botaoNivel2, botaoNivel3;
let imagemDeFundo, imagemDeFundo2;
let musica;
let sementes = [];
let sementesCultivadas = 0;
let soja = [];
let colidas = 0;
let caixas = 0;
let imagemDaMao;
let jogoConcluido = false;
let plantas = [];
let colheita = 0;
let botaoNivel2feito = false;
let imagemPlantaSoja;
let imagemSemente;
let sementeLargura = 80;
let sementeAltura = 80;
let maoX = 0;
let maoY = 0;
let imagemDeIndustria;
let imagemOleo;
let imagemParaAVenda;
let imagemCaixa;
let imagemNuvem;
let imagemParaAVendaX;
let imagemParaAVendaY = 240;
let pontoDeParada;
let nivel3Esta = 0;
let OleoPronto = false;
let nuvens = [];
let imagemConseguiu;

function preload() {
  imagemDeFundo = loadImage('Introducao.png');
  imagemDeFundo2 = loadImage ('Fazenda.png');
  imagemDaMao = loadImage ('mao.png');
  musica = loadSound ('musica.mp3');
  imagemSemente = loadImage('semente.png');
  imagemPlantaSoja = loadImage('ImagemPlantaSoja.png');
  imagemDeIndustria = loadImage('ImagemDeIndustria.png');
  imagemOleo = loadImage('Oleo.png');
  imagemParaAVenda = loadImage('imagemParaAVenda.png');
  imagemCaixa = loadImage('caixa.png');
  imagemNuvem = loadImage('nuvem.png');
  imagemConseguiu = loadImage('Conseguiu.png');
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER);
  textSize(30);
  musica.loop();
  
  sementes = [];
  plantas = [];
  
  botaoStart = createButton("Start");
  botaoStart.position(width / 2 - 20, height / 2 + 100);
  botaoStart.mousePressed(() => {
    nivel = 1;
    botaoStart.hide();
  });
}

function draw() {
  image(imagemDeFundo, 0, 0, width, height);
  
  if (nivel === 0) {
    text("🌱 Vamos descobrir a conexão entre o campo e a cidade\n òleo de soja \nClique em 'Start' para iniciar", width / 2, height / 2);
  }
  
  if (nivel === 1) {
    image(imagemDeFundo2, 0, 0, width, height);
    textAlign(CENTER);
    textSize(20);
    text("Clique para plantar", width / 2, 20);
    fill(0, 200, 0);
    rect(50, 50, (sementesCultivadas / 30) * 150, 20);
    fill(0);
    textAlign(LEFT);
    textSize(15);
    text(`Sementes plantadas: ${int((sementesCultivadas / 30) * 100)}%`, 50, 40);
    
    for (let s of sementes) {
      image(imagemSemente, s.x - sementeLargura / 2, s.y - sementeAltura / 2, sementeLargura, sementeAltura);
    }
    
    if (sementesCultivadas >= 30 && plantas.length === 0 && !botaoNivel2feito){
      criarBotaoNivel2();
    }
    
}

if (nivel === 2) {
  desenharNivel2();
}


  if (nivel === 3) {
    desenharNivel3();
  }

if  (colidas >= 30 && !botaoNivel3feito) {
  criarBotaoNivel3();
  console.log('Deu certo!');
}
  
  if (nivel === 4) {
    image(imagemConseguiu, 0, 0, width, height);
    fill(250);
    textSize(30);
    textAlign(CENTER);
    text("✨ Parabéns! Você é um ótimo agricultor! ✨\n Você plantou, colheu e levou para industria,\n e assim temos o óleo de soja!", width / 2 - 50, height / 2);

}
}

function mousePressed() {
  if (nivel === 1 && sementesCultivadas < 30) {
    sementes.push({ x: mouseX, y: mouseY});
    sementesCultivadas++;
  }
  
  if (nivel === 2) {
    for (let p of plantas) {
      if (!p.colhida && dist(mouseX, mouseY, p.x, p.y) < 20) {
        p.colhida = true;
        colidas++;
      }
    }
  }
}
  function criarBotaoNivel2() {
    botaoNivel2 = createButton("Vamos Colher!");
    botaoNivel2.position(width / 2 - 50, height - 80);
    botaoNivel2.mousePressed(() => {
      for (let s of sementes) {
        plantas.push(new Planta(s.x, s.y));
      }
      nivel = 2;
      botaoNivel2.hide();
      console.log("Deu certo!");
    });
    botaoNivel2feito = true;
  }
  
  function desenharNivel2() {
    image(imagemDeFundo2, 0, 0, width, height);
    maoX = mouseX;
    maoY = mouseY;
    
    let TocandoEmSoja = plantas.some(p => !p.colhida && dist(maoX, maoY, p.x, p.y) < 50);
    let MaoTamanho = TocandoEmSoja ? 60 : 40;
    image(imagemDaMao, maoX, maoY, MaoTamanho, MaoTamanho);
    
    for (let p of plantas) {
      if (!p.colheita); {
        let JaColida = p.contabilizar(maoX, maoY);
        if(JaColida) {
          colidas += 1;
        }
        p.mostrar();
      }
    }
    fill(0, 200, 0);
    rect(50, 50, (colidas / plantas.length) * 150, 20);
    fill(0);
    textSize(15);
    textAlign(LEFT);
    text(`Colheita: ${int((colidas / 30) * 100)}%`, 50, 40);
  }
  
  class Planta {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.tamanho = 1.0;
      this.colidas = false;
    }
    
    mostrar() {
      if (!this.colidas && imagemPlantaSoja) {
        push();
        translate(this.x, this.y);
        scale(this.tamanho);
        image(imagemPlantaSoja, -30, -100, 60, 100);
        pop();
      }
    }
    contabilizar(maoX, maoY) {
      let d = dist(maoX, maoY, this.x, this.y);
      if (d < 50 && !this.colida) {
        this.tamanho -= 0.01;
        if (this.tamanho <= 0.2) {
          this.colida = true;
          return true;
        }
      }
      return false;
    }
  }
  

  
  if (nivel === 3 && caixas < 5) {
    caixas++;
}

function criarBotaoNivel3() {
  botaoNivel3 = createButton("Vamos industrializar!");
  botaoNivel3.position(width / 2 - 50, height -50);
  botaoNivel3.mousePressed(() => {
    nivel = 3;
    botaoNivel3.hide();
    iniciarNivel3();
  });
  botaoNivel3feito = true;
}

function iniciarNivel3() {
  nivel3Esta = 0;
  imagemParaAVendaX = -200;
  imagemParaAVendaY = height - 150;
  pontoDeParada = width / 2 - 100;
  Oleo = false;
  
  nuvens = [
    { x: 0, y: 50, v: 0.7},
    { x: 300, y: 100, v: 0.5}
  ];
}

function desenharNivel3() {
  image(imagemDeIndustria, 0, 0, width, height);
  for (let nuvem of nuvens) {
    image(imagemNuvem, nuvem.x, nuvem.v, 120, 80);
    nuvem.x += nuvem.v;
    if (nuvem.x > width) nuvem.x = -200;
  }
  
  if (nivel3Esta === 0) {
    imagemParaAVendaX += 2;
    image(imagemParaAVenda, imagemParaAVendaX, imagemParaAVendaY);
    if (imagemParaAVendaX >= pontoDeParada) {
      nievl3Esta = 1;
      setTimeout(() => nivel3Esta = 2, 1000);
    }
  }
  
  else if (nivel3Esta === 1) {
    image(imagemParaAVenda, imagemParaAVendaX, imagemParaAVendaY);
  }
  else if (nivel3Esta === 2) {
    image(imagemParaAVenda, imagemParaAVendaX, imagemParaAVendaY);
    for (let i = 0; i < 5; i++) {
      image(imagemCaixa, pontoDeParada + i * 30, imagemParaAVendaY + 40, 40, 40);
    }
    setTimeout(() => nivel3Esta = 3, 1500);
  }
  
  else if (nivel3Esta === 3) {
    imagemParaAVendaX += 3;
    image(imagemParaAVenda, imagemParaAVendaX, imagemParaAVendaY);
    if (imagemParaAVendaX > width) {
      Oleo = true;
      nivel3Esta = 4;
    }
  }
  
  else if (nivel3Esta === 4 && Oleo) {
    for (let i = 0; i < 5; i++) {
         image(imagemOleo, pontoDeParada + i * 30, imagemParaAVendaY + 40, 100, 100);
         }
    setTimeout(() => {
      nivel = 4;
    }, 9000);
  }
}