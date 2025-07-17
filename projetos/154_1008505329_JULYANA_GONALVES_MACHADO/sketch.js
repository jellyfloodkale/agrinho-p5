function setup() {
  createCanvas(600, 400);
}

function draw() {
  background('#2A752D');// grama
  fill('rgb(173,221,231)')// céu
  rect(1, 1, 599, 300)
   fill('rgb(114,105,105)')// define as linhas 10 e 11 os prédios
  quad(2, 20, 80, 20, 80, 300, 2,300);
   quad(80, 100, 130, 100, 130, 300, 80,300);
fill('#795558')// define nas linhas 13, 14, 15 e 16 a cerca
  rect(400, 270, 599, 10);
  rect(400, 277, 10, 30);
   rect(450, 277, 10, 30);
    rect(500, 277, 10, 30);
  rect(550, 277, 10, 30);
  fill('#F3AB92')//define nas linhas 19 e 20 as cabeças dos homens
  circle(220, 220, 25);
  circle(270, 220, 25);

  fill('black') // define nas linhas 23 e 24 o homem da cidade
   ellipse(220, 270, 20, 80);
   ellipse(220, 210, 20, 5);
 
  fill('#B17D6A')// define nas linhas 27, 28 e 29 o homem do campo
     ellipse(270, 270, 20, 80);
   ellipse(270, 210, 25, 20);
    ellipse(270, 205, 16, 16);
  
  fill('#F3AB92')// define nas linhas 32, 33 e 34 os braços e as mãos dos homens
   line(270, 245, 245, 250);
   line(250, 250, 210, 240);
   circle(245, 250, 10);
 
  fill("black")
  textSize(20);
  textAlign(CENTER, CENTER);
 
  let maximo = width;
  let minimo = 0;
  // mouseX, 0, width ==> 0, palavra.length
  let palavra = "celebrando conexão entre campo e cidade!";
 let quantidade = map(mouseX, 0, width, 1, palavra.length)
 console.log(quantidade);
  let parcial = palavra.substring(0, quantidade);
  text(parcial, 350, 100);
  
  //  if(mouseX < 50) {
   // let palavra = "C";
//  text(palavra, 200, 200);
 //   }  else  if(mouseX < 100) {
 //   let palavra = "Ca";
 // text(palavra, 200, 200);
 // } else {
 // let palavra = "celebrando conexão entre campo e cidade!";
//  text(palavra, 200, 200);
  }
  
