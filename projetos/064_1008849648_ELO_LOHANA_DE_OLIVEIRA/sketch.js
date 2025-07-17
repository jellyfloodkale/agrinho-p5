//CRIAR VARIÁVEIS PARA SEREM ALEATÓRIAS
var n1
var n2
var n3
var n4
var n5
var n6

// Carregar a imagem

var imagem

function preload() {
  imagem = loadImage("como.png")
}

function setup() {
  createCanvas(425, 1700) 
  
  //ADICIONAR ALEATORIEDADE
  n1 = random(1, 1.2)
  n2 = random(1, 1.2)
  n3 = random(1, 1.2)
  n4 = random(1, 1.2)
  n5 = random(1, 1.2)
  n6 = random(1, 1.2)
}

function draw() {

  background(0)
  
  //carro 1
  //MUDAR SUA COR PARA AMARELO
  fill("yellow")
  //ADICIONAR ALEATORIEDADE À VELOCIDADE
  var velo = frameCount * n1
  //DESENHAR O CARRO NA TELA
  var honda = rect(velo, 10, 30, 15)
  
  //carro 2
  fill("red")
  var velo2 = frameCount * n2
  var fiat = rect(velo2, 50, 30, 15)
  
  //carro 3
  fill("purple")
  var velo3 = frameCount * n3
  var toyota = rect(velo3, 90, 30, 15)
  
  //carro 4
  fill("green")
  var velo4 = frameCount * n4
  var vw = rect(velo4, 130, 30, 15)
  
  //carro 5
  fill("blue")
  var velo5 = frameCount * n5
  var mclaren = rect(velo5, 160, 30, 15)
  
  //carro 6
  fill("gray")
  var velo6 = frameCount * n6
  var chevrolet = rect(velo6, 190, 30, 15)
  
  //VERIFICAR O VENCEDOR SE SUA POSICAO X FOR SUPERIOR A 380
  if(velo > 380){
    //MOSTRAR MENSAGEM DO VENCEDOR NA TELA COM A COR DO CARRO
    fill("yellow")
    
    stroke(30)
    textSize(30)
    text("HONDA VENCEU. APERTE F5 OU PLAY PARA SIMULAR NOVAMENTE.", 20, 300, 350)
    
    //PARAR O PROGRAMA
    noLoop()
  }
  
  else if(velo2 > 380){
    fill("red")
    stroke(30)
    textSize(30)
    text("FIAT VENCEU. APERTE F5 OU PLAY PARA SIMULAR NOVAMENTE.", 20, 300, 350)
    noLoop()
  }
  
  else if(velo3 > 380){
    fill("purple")
    stroke(30)
    textSize(30)
    text("TOYOTA VENCEU. APERTE F5 OU PLAY PARA SIMULAR NOVAMENTE.", 20, 300, 350)
    
    noLoop()
  }
  
  else if(velo4 > 380){
    fill("green")
    stroke(30)
    textSize(30)
    text("VW VENCEU. APERTE F5 OU PLAY PARA SIMULAR NOVAMENTE.", 20, 300, 350)
    noLoop()
  }
  
  else if(velo5 > 380){
    fill("blue")
    stroke(30)
    textSize(30)
    text("MCLAREN VENCEU. APERTE F5 OU PLAY PARA SIMULAR NOVAMENTE.", 20, 300, 350)
    noLoop()
  }
  
  else if(velo6 > 380){
    fill("gray")
    stroke(30)
    textSize(30)
    text("CHEVROLET VENCEU. APERTE F5 OU PLAY PARA SIMULAR NOVAMENTE.", 20, 300, 350)
    noLoop()
  }
  
  //LINHA DE CHEGADA VISUAL
  strokeWeight(2)
  stroke("white")
  line(405, 0, 405, 400)
  
  //adicionar a imagem
  image(imagem, 0, 420, 800)
}
