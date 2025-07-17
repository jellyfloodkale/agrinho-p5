 var CartasValor = ['🐓','🐴','🐷','🐄','🌽','🐓','🥚','🥚','🐷','🐴','🌽','🐄']
 var CartasX = [];
 var CartasY = [];
 var QuantidadeCartas = 12;
 var CartaAltura = 70;
 var CartaLargura = 65;
 var Viradas = [];
 var Eliminadas = [];
 var CartasViradas = [];
 var Pontos = 0;
   
 var ContagemTempo = false;
 var ContTempo = 0;

 var AcertouPar = false;
 var ParParaEliminar = [];
   
   function setup(){
   createCanvas(650,450);
   frameRate(30);
   //incremento = (350-50) / QuantidadeCartas;
   incY = 120;
   incX = 80;
     
   xi = 50;
   yi = 100;
   
   
   for ( let i = 0; i < QuantidadeCartas; i++ ){
     CartasX[i] = xi;
     CartasY[i] = yi;
     xi = xi + incX;
     if ( xi > 300){
       yi = yi + incY;
       xi = 50;
       
     }
     
     Viradas[i] = false;
     Eliminadas[i]=false;
     
   }
 }
 
function DesviraCartas(){
  for (let i = 0; i < QuantidadeCartas; i++ ){
    if(!Eliminadas[i]){
      Viradas[i] = false;
      
    }
  }
  CartasViradas=[];
}

function draw() {
  background("rgb(253,190,58)");
  
  textSize(64);
  text('👨‍🌾',450,130);
  
  textSize(30);
  text("O que o campo pode oferecer à cidade?",70,50);
  
  textSize(16);
  fill(0);
  text("Esse é o jogo da mémoria da fazenda", 380, 200,);
  text("Você precisa ajudar o fazendeiro",380, 230,);
  text("Ache os pares iguais",380, 260,);
  text("Clique em duas cartas",380, 290,);
  text("E descubra o que é importante",380, 320,);
  text("para quem mora na cidade",380, 350,);
  
  
  //tamanho dos emojis
  textSize(35);
  fill(255);
  
  //desenhar cartas
  for (let i=0; i < QuantidadeCartas; i++){
    if(!Eliminadas[i]){
      if (Viradas[i]){
        textSize(32);
        fill("rgb(81,202,53)"); //cor frente
        rect( CartasX[i], CartasY[i],CartaLargura, CartaAltura )
        fill(255);
        text(CartasValor[i], CartasX[i] + 10, CartasY[i] + 45);
      } else {
        
        fill("rgb(255,108,0)"); //cor traz
        rect( CartasX[i], CartasY[i],CartaLargura, CartaAltura );
        
      
      textSize(50);
      fill(50);
      textSize(30);
      text("🌾", CartasX[i] + 5, CartasY[i] + CartaAltura / 2+5);
      
      
    }
   }  
  }
  
  if (Pontos===6){
    fill("rgb(2,80,38)");
    textSize(24);
    
    text("Obrigada por jogar!",100,250);
    text("Você ajudou o fazendeiro",70,280)
    
  }
  
  //mostrar pontuação
  fill(0);
  textSize(20);
  text("Pares coletados: "+Pontos,125,92);
  
  
  // Contagem para virar ou eliminar
  if (ContagemTempo) {
    ContTempo++;

    if (ContTempo > 30) { // 1 segundo
      ContagemTempo = false;
      ContTempo = 0;

      if (AcertouPar) {
        Eliminadas[ParParaEliminar[0]] = true;
        Eliminadas[ParParaEliminar[1]] = true;
        Pontos++;
        AcertouPar = false;
        ParParaEliminar = [];
        CartasViradas = [];
      } else {
        DesviraCartas();
      }
    }
  }
}


function mouseReleased() {
  if(ContagemTempo|| CartasViradas.length >= 2) {
    return; // Não deixa virar mais cartas durante espera
  }

  
  for (let i=0; i < QuantidadeCartas; i++ ){
     if (!Eliminadas[i] && !Viradas[i] &&
    
    mouseX > CartasX[i] && mouseX < CartasX[i] + CartaLargura && 
    mouseY > CartasY[i] && mouseY < CartasY[i] + CartaAltura ) {
       
      Viradas[i] = true;
      CartasViradas.push(i);
       
       
        if (CartasViradas.length == 2) {
        let idx1 = CartasViradas[0];
        let idx2 = CartasViradas[1];

        if (CartasValor[idx1] === CartasValor[idx2]) {
          AcertouPar = true;
          ContagemTempo = true;
          ParParaEliminar = [idx1, idx2];
        } else {
          ContagemTempo = true;
      
  }
}

       break;
       
       }
    }
  }
