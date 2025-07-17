let x = 400, y = 550, pts = 0, arvs = [];
function setup() {createCanvas(800, 600);
 textSize(20);
}

function draw() {
background(135, 206, 235);// céu
  fill(0, 130, 0);
  rect(0, height / 2, width, height / 2);//gramado
  fill(255, 204, 0);
  circle(750,100,80);//sol
  fill(255);
  ellipse(100, 100, 60, 60);
  ellipse(130, 90, 70, 70);
  ellipse(160, 100, 60, 60);
  ellipse(127, 115, 70, 70);
  ellipse(400, 100, 60, 60);
  ellipse(430, 90, 70, 70);
  ellipse(460, 100, 60, 60);
  ellipse(427, 115, 70, 70);
  
  fill(0);
 text("Pontos: " + pts, 10, 25);
 fill(135, 206, 200);
  rect(x-10, y-20, 20, 40);
  fill(0);
  ellipse(x, y-30, 15);
 for (let a of arvs) {
 fill(34, 139, 34);
 ellipse(a.x, a.y-10, 40);
 fill(139, 69, 19);
 rect(a.x-10, a.y, 20, 40);
 }
}

function keyPressed() {
 if (keyCode === LEFT_ARROW) x -= 10;
 if (keyCode === RIGHT_ARROW) x += 10;
 if (keyCode === UP_ARROW) y -= 10;
  if (keyCode === DOWN_ARROW) y += 10;
}

function mousePressed() {
  if(mouseY > height / 2) { // verifica se o clique foi na área verde
arvs.push({x: mouseX, y: mouseY});
 pts += 1;
  }
}