//VARIÁVEIS PÚBLICAS: LISTA, CONTAR PLANTAS E CONTAR SEMENTES
let plantas = []
let contar = 0
let sementes = 5

//CARREGANDO A IMAGEM DO TUTORIAL
let tutorial 

function preload() {
  tutorial = loadImage("tuto.png");
}

//CRIANDO AS PLANTAS
class Planta{
    
  //DEFINIR POSIÇÃO, COR E TAMANHO DAS PLANTAS
  constructor(x, y,tamanho, cor)
  {
    this.x = x
    this.y = y
    this.tamanho = tamanho
    this.cor = cor
  }
  
  //MOSTRAR A PLANTA NA TELA SÓ NA FUNÇÃO
  mostrar()
  {
   
    fill(this.cor)
    circle(this.x, this.y, this.tamanho)
  }
  
}

function setup() {
  createCanvas(700, 1550);
  
  //CRIANDO O BOTÃO PARA COMPRAR SEMENTES
  let botao = createButton("CLIQUE AQUI PARA COMPRAR SEMENTES. VENDA 1 PLANTA POR 2 SEMENTES")
    botao.style("background-color", "rgb(217,251,145)")
  botao.size(100, 140)
  botao.position(500, 100)
  //SE PRESSIONAR BOTÃO, COMPRAR A SEMENTE COM A FUNÇÃO
  botao.mousePressed(comprar)

}

function draw() {
  //COR DO FUNDO PARA SIMULAR A TERRA
  background("rgb(90,72,38)")
  
  //REPETIÇÃO PARA MOSTRAR AS PLANTAS QUE FORAM CRIADAS
  let i = 0
  for(i; i < plantas.length; i++){
    plantas[i].mostrar()
    
    //AUMENTAR O TAMANHO EM 0.2 ATÉ CRESCER PARA 0
    if(plantas[i].tamanho < 40){
    plantas[i].tamanho+= 0.2
    
    //SE O TAMANHO FOR DE 40, MUDAE A COR PARA AMARELO
    } else{
      plantas[i].cor = "rgb(233,211,77)"
    }
  }
  
  //MOSTRAR AS INFORMACOES PARA O JOGADOR
  textSize(30)
  fill("white")
  text("PLANTAS: " + contar + "     SEMENTES: " + sementes, 20, 40)
  
  //MOSTRAR O TUTORIAL NA TELA
  image(tutorial, 0, 450, 670, 1100)
  
  //SISTEMA DE RECOMPENSAS E CONQUISTAS
  
  fill("gray")
  rect(480, 310, 100, 140)
  rect(590, 310, 100, 140)
  
  fill("green")
  textSize(13)
  text("CHEGAR A \n30 PLANTAS \nNA FAZENDA", 490, 340, 340)
  text("CHEGAR A \n60 PLANTAS \nNA FAZENDA", 600, 340, 340)

  textSize(30)
  fill("gold")
  text("CONQUISTAS:", 480, 300)
  
  if(contar >= 30){
   let botaovitoria = createButton("PARABÉNS! VOCÊ CONSEGUIU 30 PLANTAS EM SUA FAZENDA!!")
    botaovitoria.style("background-color", "green")
  botaovitoria.size(100, 140)
  botaovitoria.position(480, 310)
   
  }
  
  if(contar >= 60){
   let botaovitoria = createButton("PARABÉNS! VOCÊ CONSEGUIU 60 PLANTAS EM SUA FAZENDA!!")
    botaovitoria.style("background-color", "gold")
  botaovitoria.size(100, 140)
  botaovitoria.position(590, 310)
   
  }

}

function mousePressed(){
  
  //SE MOUSE PRESSIONADO E A POSIÇÃO DO PONTEIRO FOR INFERIOR A 400 NO EIXO Y E 500 NO EIXO X - PARA FICAR RESTRIO A TERRA
  
  if(sementes > 0 && mouseY < 400 && mouseX < 500){
    
  //CRIE UMA NOVA PLANTA, CASO VERDADEIRO
  let planta = new Planta(mouseX, mouseY, 2, "green")
  //CONTE A PLANTA PLANTADA
  contar++
  //ADICIONE PLANTA NA LISTA
  plantas.push(planta)
  
    //REDUZA EM 1 O TOTAL DE SEMNTES POR CLIQUE
  sementes--
  console.log(sementes)
  }
  
  //NÃO DEIXAR SEMENTE SER MENOR QUE 0
  if(sementes <= 0){
    sementes = 0
  }
  
  
}

function comprar(){
  
  //SE O NÚMERO DE PLANTAS FOR SUPERIOR A 1
  if(contar > 0){
    
    //RETIRE A PRIMEIRA PLANTA DA LISTA
    plantas.shift()
    //APÓS RETIRADA, REDUZA O NÚMERO DE PLANTAS EM 1
    contar--
    //ADICIONE DUAS SEMENTES NOVAS
    sementes = sementes + 2
  } 
}
