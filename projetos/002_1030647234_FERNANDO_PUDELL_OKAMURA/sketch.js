let frameIndex = 0; //frame atual
let frameTimer = 0; //temporizador do frame
let frameDelay = 12; // quando mudar de frame
let estaAndando //avisar que está em movimento

let playerImage; //imagem do jogador
let playerX = 300
let playerY = 300 //posição x e y do jogador
let hspd = 0 //velocidade horizontal
let vspd = 0 //velocidade vertical
let grv = 0.5 //gravidade
let playerSpeed = 5 //velocidade do player
let direita = 0 //verifica se o jogador está movendo para a direita
let esquerda = 0 //verifica se o jogador está movendo para a esquerda
let balanco = 0; //o quanto o player balança
let balancoTimer = 0; //temporizador do balanço
let balancando = false; //verifica se estã balançando
let balancoCD=0 //tempo de recarga para balançar
let ultimoLado = 1 //ultimo lado que o player estava olhando (direta é 1, esquerda é -1)
let dinheiro = 0 //dinheiro do jogador
let multiplicadorDinheiro = 1 //multiplicador de quanto dinheiro o player ganha

let milhos = []; //variável do milhos
let milhoContador; //imagem do milho para contar
let milhosContados=0 //quantidade de milhos
let milho; //número do milho a ser identificado

let bgImage; //imagem de fundo
let corvoImage; //imagem do corvo
let corvoVoaImage; //imagem do corvo voando


let botaoSpeed; //botao que aumenta velocidade
let botaoMoney; //botao que aumenta ganho de dinheiro
let botaoMoneyImage;
let botaoSpeedImage

function setup() {
  createCanvas(600, 400);
  
  for (let i = 0; i < 6; i++) {
    let x = 150 + 77*i;
    milhos.push(new Milho(x, 250));
  } //desenha os milhos pela tela
  
  venda = new Vendas(); //calcula o dinheiro das vendas
  
  corvo = new Corvo(300,50) //cria o corvo
  
  botaoDinheiro = new Botao(460,50,"lime") //cria o botao verde
  botaoSpeed = new Botao(540,50,"yellow") //cria o botao amarelo
}

let playerWalkImages = []; //define quantos frames tem a animação do player

function preload() {
  myImage = loadImage('Farmer.png'); //define a imagem normal do player
  for (let i = 1; i <= 4; i++) {
    playerWalkImages.push(loadImage(`FarmerWalk${i}.png`));
  } //define as 4 imagems do player em movimento
  
  milhoContador = loadImage('Milho.png') //carrega imagem do contador
  bgImage = loadImage('CenarioPudell.png') //carrega imagem do fundo
  corvoImage = loadImage('Corvo.png') //carrega imagem do corvo
  corvoVoaImage = loadImage('CorvoVoa.png'); //carrega imagem do corvo voando
 botaoMoneyImage = loadImage('$icon.png')
  botaoSpeedImage= loadImage('speed.png')
  
}


function draw() {
  background(bgImage);
  fill("rgb(197,136,99)")
  rect(15,340,40,50,5,5,15,15); //desenha a cesta de vendas
  
    if (dist(-30, 300, playerX, playerY) < 60 && balancando)//se o player balançar perto da cesta
    {
      if (milhosContados > 0) { //se tiver algum milgo
      venda.contar(); //calcula o valor dos milhos
      milhosContados = 0; //reinicia o contador
    }
  }

  venda.display(); //mostra as vendas
  corvo.update(); //atualiza o codigoo corvo todo frame
  corvo.display(); //desenha o corvo
  botaoDinheiro.display() //mostra o botao
  botaoDinheiro.buy(multiplicadorDinheiro) //envia qual variável aumentar caso apertado
  botaoSpeed.display() //mostra o botao
  image(botaoMoneyImage,435,25)
  botaoSpeed.buy(playerSpeed) //envia qual variável aumentar caso apertado
  image(botaoSpeedImage,515,25)

  
  for (let milho of milhos) {
    milho.grow();
    milho.display();
    milho.harvest();
  } //ativa as funções de cada milho
  
  stroke('white')
  strokeWeight(5)
  fill("black")
  rect(5,5,250,75)
  strokeWeight(1)
  stroke("black")
  milhoContador.resize(80,80)
  image(milhoContador,0,0)
  //desenha o contador
  
  
  textAlign(CENTER)
  textSize(40)
  fill("white")
  text(": "+milhosContados,90,50)
  textSize(25)
  fill("lime")
  textAlign(LEFT)
  text("$$: "+round(dinheiro),150,50)
  //texto das vendas
  
  
  let imgAtual = estaAndando ? playerWalkImages[frameIndex] : myImage;
imgAtual.resize(130, 130);
  //define qual frame da animação o player está

  
  
  if (keyIsDown(RIGHT_ARROW)) {direita=1; ultimoLado=-1} else {direita=0} //verifica se está clicando seta direita
  if (keyIsDown(LEFT_ARROW)) {esquerda=1; ultimoLado=1} else {esquerda=0} //verifica se está clicando seta esquerda
  if (keyIsDown(32)){if(canJump===true) {vspd=-10; canJump=false}} //verifica se o player pulou
  
  if (keyIsDown(UP_ARROW) && balancoCD===0) { //verifica se clicou seta para cima e nao está em recarga
  balancando = true; //define que está balançando
  balancoTimer = 0; //reinicia o temporizador
    balancoCD=50 //coloca o balanço em recarga
}

  hspd = (direita - esquerda)*playerSpeed //calcula a velocidade horizontal baseado em qual seta o player está clicando, multiplicando pela velocidade do jogador
  
  vspd +=grv //adiciona gravidade à velocidade vertical
  
  if(playerY+vspd>=300){ //se o player passar de 300 no eixo Y
    playerY=300 //encaixa ele na cordenada certa
    canJump=true //pode pular de novo
    vspd=0 //zera a velocidade vertical
  }
  
  if(playerX+hspd>=550){hspd=0; playerX=550} //impede o player de escapar da tela
  if(playerX+hspd<=-50){hspd=0; playerX=-50} 
  
  playerY+=vspd //adiciona a velocidade vertical a posicao Y do jogador
  playerX+=hspd //adiciona a velocidade horizontal a posicao X do jogador
  
  if (balancando) {
  balancoTimer++; //adiciona à duração do balanço
  
  if (balancoTimer < 5) {
    balanco = -0.2; //primeiro balanço
  } else if (balancoTimer < 10) {
    balanco = 0.2; //segundo balanço
  } else if (balancoTimer < 15) {
    balanco = 0; //reinicia a posicao
  } else {
    balancando = false; //desativa o balanço
    balanco = 0;
  }
  }
  if (balancoCD>0){balancoCD-=1} //calcula a recarga do balanço

  
  estaAndando = (direita || esquerda); //verifica se está andando

if (estaAndando) { //se está andando
  frameTimer++; //roda animação
  if (frameTimer >= round(frameDelay)) { //se passou do valor do delay
    frameTimer = 0; //reseta o temporizador
    frameIndex = (frameIndex + 1) % playerWalkImages.length; //passa para o próximo frame
  }
}

  
  push(); //começa a desenhar
  translate(playerX + 50, playerY + 25); //traduz o sistema de cordenada
  rotate(balanco); //rotaciona pelo valor de balanço
  scale(-ultimoLado,1) //vira o player pro ultimo lado que estáva olhando
  imageMode(CENTER); //coloca o ponto de origem no centro
  image(imgAtual, 0, 0); //desenha o player
  pop(); //termina de desenhar

}

class Milho { //classe do milho
  constructor(x, y) { //recebe informação da posição
    this.x = x; //define a posicao do milho independente
    this.y = y;
    this.altura = 10; //define altura do milho independente
    this.alturaMax = 40; //define altura máxima do milho independente
  }

  grow() {
    // cresce lentamente até atingir altura máxima
    if (this.altura < this.alturaMax) {
      this.altura += random(0,0.2);
    }
  }

  display() {
    //desenha o milho, com altura independente
    strokeWeight(2)
    fill("yellow")
    rect(this.x,this.y-this.altura,10,this.altura,10,10,10,10);
    fill("green")
    rect(this.x+4,390,2,-140)
  }
  
  harvest(){
    //colhe o milho caso player balance perto
    if (balancando && dist(this.x,this.y,playerX+50,playerY+50)<30 && this.altura>=this.alturaMax){this.altura=10; milhosContados+=1}
    
  }
  steal(){
    //reinicia caso o corvo roube o milho
    this.altura=10
  }
  
}

class Vendas { //classe das vendas
  constructor() {
    this.x = 30; //pos x
    this.y = 300; //pos y
    this.tempo = 0; //tempo que fica na tela
    this.valor = 0; //valor a ser ganho
  }

  contar() { //calcula o valor da venda
    this.valor = (milhosContados * 10)*multiplicadorDinheiro
    this.y = 300;
    this.tempo = 60; // duração da animação
    dinheiro+=this.valor //ganha o dinheiro
    
  }

  display() {
    //desenha o texto das vendas
    if (this.tempo > 0) {
      fill("lime");
      textSize(32);
      text(round(this.valor) + "$", this.x, this.y);
      this.y -= 1; //anima o movimento
      this.tempo--;
    }
  }
}

class Corvo { //classe do corvo (essa foi dificil)
    constructor(x, y) { //recebe a posicao 
    this.x = x; //pos x atual
    this.y = y; //pos y atual
    this.startX = x; //pos x inicial
    this.startY = y; //pos y inicial

    this.attacking = false; //define se está atacando
    this.returning = false; //define se está retornando
    this.attackCD = 150; //recarga do ataque
    this.speed = 4; //velocidade do corvo
    this.target = null; // milho alvo
    this.targetSteal = null; //qual milho roubou
  }

  update() { //atualiza os ataque do corvo
    if (this.attackCD > 0 && !this.attacking) { //diminui o tempo da recarga se nao estiver atacando
      this.attackCD--;
    }

    // Iniciar ataque quando cooldown acabar
    if (this.attackCD === 0 && !this.attacking && !this.returning) {
      this.chooseTarget();
      this.attacking = true;
    }

    // Se move até o alvo
    if (this.attacking && this.target) {
      this.moveTo(this.target.x, this.target.y);

      // Quando estiver perto do milho, iniciar retorno
      if (dist(this.x, this.y, this.target.x, this.target.y) < 5) {
        this.attacking = false;
        this.returning = true;
        this.targetSteal.steal() //rouba o milho atacado
      }
    }

      //se move até a posicao inicial
    if (this.returning) {
      this.moveTo(this.startX, this.startY);
      if (dist(this.x, this.y, this.startX, this.startY) < 5) {
        this.returning = false;
        this.attackCD = 150;
      }
    }
  }

  chooseTarget() {
    // Escolhe aleatóriamente qual milho roubar
    let i = floor(random(milhos.length));
    while(milhos[i].altura===40){i = floor(random(milhos.length));}
    this.targetSteal = milhos[i]
    this.target = {
      x: milhos[i].x,
      y: milhos[i].y - milhos[i].altura // ponto mais alto da espiga
    };
  }

moveTo(targetX, targetY) {
  // Se move até o milho escolhido (recebe o X e Y)
  
  // pega a distancia do X e Y
  let dx = targetX - this.x;
  let dy = targetY - this.y;
  let distance = dist(this.x, this.y, targetX, targetY);
  
  // Verifica se ainda não chegou no milho
  if (distance < this.speed) {
    this.x = targetX;
    this.y = targetY; //encaixa na posicao certa
  } else {
    // Se move até o alvo
    let angle = atan2(dy, dx);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }
}

display() { //desenha o corvo
  let img = this.attacking||this.returning ? corvoVoaImage : corvoImage;
  img.resize(80, 80);
  image(img, this.x - 40, this.y - 40);
}

}


class Botao{
  // Criação dos botões
  
  constructor(x,y,cor){
    //recebe a cor e posição dos botões
     this.x = x
     this.y = y
    this.cor = cor
    this.originalCor = cor
    this.hovered=false //define se o mouse está em cima
    this.tamanho = 50
  }
  
  display(){
    //desenha os botões
   fill(this.cor)
   strokeWeight(5)
   rect(this.x-(this.tamanho/2),this.y-(this.tamanho/2),this.tamanho,this.tamanho) 
    if(mouseY > this.y-(25) & mouseY < this.y-(25)+50 & mouseX > this.x-(25) & mouseX < this.x-(25)+50){
      //muda a cor e tamanho caso o mouse esteja em cima
      this.cor = "white"
      this.tamanho = 60
      this.hovered = true
    }else{this.cor=this.originalCor; this.tamanho = 50; this.hovered=false}
  }
  
  buy(atributo){ //verifica qual atributo comprar
    {
      if (dinheiro>=50 & this.hovered & mouseIsPressed){
      dinheiro-=50
      if (atributo===playerSpeed){
        playerSpeed+=0.5
        frameDelay*=0.95
    }
      if(atributo===multiplicadorDinheiro){
        multiplicadorDinheiro+=0.1
       }
     }
    }
  }
}


























