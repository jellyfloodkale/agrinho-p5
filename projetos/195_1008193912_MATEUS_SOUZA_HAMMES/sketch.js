let dadosClima = {}

function setup(){
createCanvas(400,300)
textFont("Arial")

botao = createButton("Simular Clima") // botão pra randomizar o clima
botao.position(20, height + 10)
botao.mousePressed(gerarClima)

gerarClima()
}

function gerarClima(){ // gerador
dadosClima.temperatura = random(10,38)
dadosClima.umidade = random(20,100)
dadosClima.chuva = random() < 0.4
redraw()
}

function draw(){
background(200)
textSize(20)
textAlign(CENTER)
fill(0)
text("Clima da Fazenda", width/2, 30)

if(!dadosClima.temperatura){
  return
}

textSize(16)
textAlign(LEFT)
fill(0)
text("Temperatura: " + dadosClima.temperatura.toFixed(1) + "°C", 20, 80)
text("Umidade: " + dadosClima.umidade.toFixed(1) + "%", 20, 110)
text("Vai chover? " + (dadosClima.chuva ? "Sim" : "Não"), 20, 140)

if(dadosClima.chuva){
  desenharChuva(320, 100)
}else{
  desenharSol(320, 100)
}

fill(0, 102, 0)
textSize(14)
text("Dica de hoje:", 20, 190)

if(dadosClima.chuva){ // dicas
  text("Evite irrigar, vai chover", 20, 210)
}else if(dadosClima.umidade < 40){
  text("Solo seco, irrigue as plantas", 20, 210)
}else{
  text("Clima está bom, continue os cuidados", 20, 210)
}

noLoop()
}

  // desenho do sol ou lua
  
function desenharSol(x,y){
fill(255, 204, 0)
ellipse(x,y,50,50)

for(let i=0; i<8; i++){
let ang = TWO_PI / 8 * i
let x2 = x + cos(ang) * 40
let y2 = y + sin(ang) * 40
line(x, y, x2, y2)
}
}

function desenharChuva(x,y){
fill(150)
ellipse(x,y,60,40)
for(let i=0; i<3; i++){
line(x - 15 + i*15, y + 20, x - 10 + i*15, y + 40)
}
}
