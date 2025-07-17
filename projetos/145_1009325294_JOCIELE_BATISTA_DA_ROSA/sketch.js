//variaveis
var n1, n2, n3;
var tri1, tri2, tri3;
var media;
var resultado;
var mostrarResultado = false;
var botao;


function setup() {
  //criando area de trabalho
  createCanvas(350, 500);
  
   //cor de fundo
  background('pink');
  
  //criando caixa de texto
  n1 = createInput();
  n2 = createInput();
  n3 = createInput();
  
  //posicionando as caixas de texto
  n1.position(50, 150);
  n1.size(50);
  n2.position(150, 150);
  n2.size(50);
  n3.position(250, 150);
  n3.size(50);
}

function draw(){
  //textos
  textAlign(CENTER);
  textSize(20)
  text('Calculadora\n Média Aritmética',175,50)
  textSize(15)
  text('tri 1',80,130);
  text('tri 2',180,130);
  text('tri 3',280,130);
  
  //quadro do resultado
  push();
    noFill();
    stroke('white')
    strokeWeight(3)
    rect(50,300,250,100);
  pop();
  
  //botão
  rect(125,230,100,30,5)
  text('Calcular',175,250)
  
}

function mouseClicked(){
  console.log("clicou")
  if(mouseX>=125 && mouseX<=225 && mouseY>=230 && mouseY<=260){
    clicou();
  }
}

function clicou(){
   //cor de fundo
  background('pink');
  
  console.log("entrou!")
  //atribuindo valores das notas informadas
  nota1 = int(n1.value());
  nota2 = int(n2.value());
  nota3 = int(n3.value());
  
  //calculando a media
  media = (nota1 + nota2 + nota3)/3;
  console.log(media)
  //verificando a media
  if(media>5){
    resultado = 'Aprovado!';
  }else if(media>=3 && media<5){
    resultado = 'Recuperação!';
  }else{
    resultado = 'Reprovado!';
  }
  
  console.log(resultado)
  
  //mostrando resultado
  text(resultado,175,340);
  text('Média: '+media.toFixed(2),175,365);
}

