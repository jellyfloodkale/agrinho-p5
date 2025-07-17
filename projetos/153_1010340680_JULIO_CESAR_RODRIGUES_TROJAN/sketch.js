let birds = [];
let balloons = [];
let silo;
let windmill;

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 5; i++) {
    birds.push(new Bird(random(width), random(height / 2)));
  }
  for (let i = 0; i < 3; i++) {
    balloons.push(new Balloon(random(width), height));
  }
  silo = new Silo(550, height - 100);
  windmill = new Windmill(200, height - 132);
}

function draw() {
  background(28, 32, 93);
  fill(26, 138, 28);
  rect(0, height / 1.5, width, height / 2);
  
  for (let bird of birds) {
    bird.update();
    bird.show();
  }
  
  for (let balloon of balloons) {
    balloon.update();
    balloon.show();
  }
  
  silo.show();
  windmill.show();
}

class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(7, 15);
    this.speed = random(1, 3);
    this.direction = random(TWO_PI);
  }

  update() {
    this.x += cos(this.direction) * this.speed;
    this.y += sin(this.direction) * this.speed;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height /2) this.y = random(height /2);
    if (this.y < 0) this.y = random(height /2);
    
    if (random() < 0.02) {
      this.direction += random(-PI/4, PI/4);
    }
    
    this.speed = constrain(this.speed + random(-0.1,0.1),1,3);
   }

   show() {
     fill(237,237,9);
     ellipse(this.x, this.y, this.size);
   }
}

class Balloon {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.size = random(30,50);
     this.speed = random(-1,-3);
     this.color = color(random(255), random(255), random(255));
   }

   update() {
     this.y += this.speed;
     if (this.y < -this.size) {
       this.y = height + this.size;
       this.x = random(width);
     }
   }

   show() {
     fill(this.color);
     ellipse(this.x, this.y, this.size);

     // Desenha o fio do balão
     stroke(170); // Cor do fio
     strokeWeight(2); // Espessura do fio
     line(this.x, this.y + this.size / 2, this.x, this.y + this.size); // Fio do balão
     noStroke(); // Reseta o estilo de contorno
   }
}

class Silo {
   constructor(x, y) {
     this.x = x;
     this.y = y;
   }

   show() {
     fill(204,38,25);
     rect(this.x - 25, this.y - 60, 50,60);
     fill(130);
     triangle(this.x -30 ,this.y -60 ,this.x +30 ,this.y -60 ,this.x ,this.y -100 );
   }
}

class Windmill {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.angle = PI /4; 
   }

   show() {
      fill(220,50,35);
      rect(this.x -10,this.y -70 ,19 ,70);

      push();
      translate(this.x ,this.y -70); 
      rotate(this.angle); 

      fill(200); 
      for(let i=0; i<4; i++){
          rect(-39 ,-10 ,40 ,10); 
          rotate(PI/2); 
      }
      pop();

      this.angle += radians(1); 
   }
}