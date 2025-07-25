let ss = [["s", "s", "s"], ["s", "s", "s"], ["s", "s", "s"]];
let turn = 0;

function setup() {
  createCanvas(400, 400);
  frameRate(1);
}

function preload(){
  fundo = loadImage('fundo.png')
}

function draw() {
  image(fundo,0,0)
  line(100, 0, 100, 300);
  line(200, 0, 200, 300);
  line(0, 100, 300, 100);
  line(0, 200, 300, 200);
  
  let x = 0;
  let y = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (ss[i][j] == 'x'){
        line(x + 10, y + 10, x + 80, y + 90);
        line(x + 80, y + 10, x + 10, y + 90);
      }
      else if (ss[i][j] == 'o'){
        circle(x + 50, y + 50, 90);
        fill(34,139,34);
      }
      x += 100;
    }
    y += 100;
    x = 0;
  }
}

function mousePressed() {
  if (mouseX < 100 && mouseY < 100){
    if(turn == 0){
      ss[0][0] = "x";
      turn = 1;
    }
    else {
      ss[0][0] = "o";
      turn = 0;
    }
  }
  else if (mouseX < 200 && mouseY < 100){
    if(turn == 0){
      ss[0][1] = "x";
      turn = 1;
    }
    else {
      ss[0][1] = "o";
      turn = 0;
    }
  }
  else if (mouseX < 300 && mouseY < 100){
    if(turn == 0){
      ss[0][2] = "x";
      turn = 1;
    }
    else {
      ss[0][2] = "o";
      turn = 0;
    }
  }
  else if (mouseX < 100 && mouseY < 200){
    if(turn == 0){
      ss[1][0] = "x";
      turn = 1;
    }
    else {
      ss[1][0] = "o";
      turn = 0;
    }
  }
  else if (mouseX < 200 && mouseY < 200){
    if(turn == 0){
      ss[1][1] = "x";
      turn = 1;
    }
    else {
      ss[1][1] = "o";
      turn = 0;
    }    
  }
  else if (mouseX < 300 && mouseY < 200){
    if(turn == 0){
      ss[1][2] = "x";
      turn = 1;
    }
    else {
      ss[1][2] = "o";
      turn = 0;
    }    
  }
  else if (mouseX < 100 && mouseY < 300){
    if(turn == 0){
      ss[2][0] = "x";
      turn = 1;
    }
    else {
      ss[2][0] = "o";
      turn = 0;
    }       
  }
  else if (mouseX < 200 && mouseY < 300){
    if(turn == 0){
      ss[2][1] = "x";
      turn = 1;
    }
    else {
      ss[2][1] = "o";
      turn = 0;
    }       
  }
  else if (mouseX < 300 && mouseY < 300){
    if(turn == 0){
      ss[2][2] = "x";
      turn = 1;
    }
    else {
      ss[2][2] = "o";
      turn = 0;
    }       
  }
}