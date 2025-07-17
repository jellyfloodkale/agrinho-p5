
function setup() {
   createCanvas(380, 380);
 }
let xjardineiro1 = 0;
let xjardineiro2 = 0;

function draw() {
  background(220);
  textSize(50);
  text("🧑‍🌾",xjardineiro1,100);
  text("🧍",xjardineiro2,200);
  rect(400,0,15,400);
  xjardineiro1 += random(4);
  xjardineiro2 += random(3);
  
  if (xjardineiro1 >400){
    text("vamos mostrar que tem no campo e na cedade",20,150);
    noLoop();
  }
  }


