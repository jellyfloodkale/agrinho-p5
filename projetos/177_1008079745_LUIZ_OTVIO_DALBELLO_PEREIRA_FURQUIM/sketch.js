function setup() {
  createCanvas(800, 500);
}

function draw() {
  background("rgb(131,162,228)"); //céu
  fill("rgb(77,39,39)"); //cor chão
  quad(0, 350, 800, 350, 800, 500, 0, 500); //chão
  fill("rgb(53,141,53)"); //cor grama
  quad(0, 325, 800, 325, 800, 410, 0, 410); //grama
  fill("rgb(77,64,64)"); //cor pista
  quad(0, 380, 0, 445, 800, 445, 800, 380); //pista
  textSize(230); //tamanho árvore 1
  text("🌳", 1, 277); //árvore 1
  textSize(230); //tamanho ávore 2
  text("🌳", 350, 277); //árvora 2
  fill("#277EC4") //cor centro trator
  quad(125, 295, 325, 303, 325, 385, 125, 385); //centro trator
  fill("#277EC4"); //cor gabine
  quad(100, 335, 100, 225, 210, 225, 210, 335); //gabine
  fill("#B0B5B6"); //cor vidro gabine
  quad(110, 325, 110, 235, 210, 235, 210, 325); //vidro gabine
  fill("#277EC4"); //cor teto da gabine
  quad(90, 225, 90, 210, 220, 210, 220, 225); //teto da gabine
  fill("rgb(17,17,17)"); //cor estrivo e escapamento
  quad(160, 375, 220, 375, 220, 390, 160, 390); //estrivo
  quad(240, 315, 250, 315, 250, 200, 240, 200); //escapamento
  fill("rgb(58,58,58)"); //cor dos pneus
  circle(100, 375, 125); //pneu trazeiro
  circle(305, 405, 65); //pneu dianteiro 
  fill("rgb(204,203,203)"); //cor da roda
  circle(100, 375, 65); //roda trazeira
  circle(305, 405, 35); // roda dianteira
  fill("#fcea4e"); //cor faról do trator
  quad(300, 307, 329, 308, 329, 318, 310, 317); // faról do trator
  textSize(90); //tamanho nuvem 1
  text("☁️", 175, 60); //nuvem 1
  textSize(90); //tamanho nuvem 3
  text("☁️", 600, 70); //nuvem 3
  textSize(90); //tamanho nuvem 2 
  text("☁️", 400, 85); //nuvem 2
  fill("rgb(102,102,102)"); // cor suporte do prédio
  quad(800, 320, 800, 380, 525, 380, 525, 320); //suporte do prédio
  fill("#59A2DB"); //cor prédio
  quad(775, 30, 625, 30, 625, 320, 775, 320); //prédio
  fill("#FCEA4E"); //cor janelas
  square(640, 50, 45); //janela
  square(715,50, 45); //janela
  square(640, 125, 45); //janela
  square(715,125, 45); //janela
  square(640, 200, 45); //janela
  square(715,200, 45); //janela
  
  if (mouseIsPressed){
    console.log(mouseX, mouseY)
  }
}