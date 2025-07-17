let player, car, workers = [], farmPlots = [];
let seeds = 5, money = 100, crops = 0;
let day = 1, hour = 6, minute = 0, timeCounter = 0;
let isNight = false, camX = 0, camY = 0;
const PLOT_SIZE = 40;
const FARM_START_X = 50, FARM_START_Y_BASE = 1000;
const FARM_COLS_BASE = 10, FARM_ROWS_BASE = 5;

let house = {
  x:400, y:800, level:0,
  emoji:["🏚","🏠","🏡","🏘"],
  upgradeCost:[50,200,200],
  get cols(){return FARM_COLS_BASE + this.level * 5;},
  get rows(){return FARM_ROWS_BASE + this.level * 3;}
};
let npcs = [];
let tutorialSteps = [
  "Bem-vindo à fazenda! Use WASD para se mover.",
  "Clique para plantar/clicar seguro da colheita.",
  "Aperte 1,2,3 para contratar.",
  "Clique na casa para melhorar.",
  "Compre seeds/ferramentas/vendas.",
  "Use a loja de ferramentas para melhorar os trabalhadores.",
  "Boa sorte!"];
let tutorialIndex=0, tutorialTimer=0, tutorialDelay=600;
const WORKER_TYPES = [
  {emoji:"👨🏽‍🌾", role:"plant", speed:1},
  {emoji:"🧑🏽‍🌾", role:"harvest", speed:1},
  {emoji:"👷🏽‍♂️", role:"deliver", speed:2}
];

function setup(){
  createCanvas(windowWidth,windowHeight);
  player = createVector(600,800);
  car = {x:500,y:900,w:60,h:30,inside:false};
  initFarmPlots();
  npcs=[
    {x:1350,y:400,name:"🏪 Loja de Sementes",role:"shop"},
    {x:1350,y:300,name:"🛠 Loja de Ferramentas",role:"tools"},
    {x:1350,y:500,name:"💰 Loja de Venda",role:"sell"},
    {x:1600,y:500,name:"🏠 Casa Central",role:"house"}
  ];
}

function initFarmPlots(){
  farmPlots = [];
  let startY = FARM_START_Y_BASE;
  for(let x=0;x<house.cols;x++){
    for(let y=0;y<house.rows;y++){
      farmPlots.push({
        pos:createVector(FARM_START_X + x*PLOT_SIZE,startY + y*PLOT_SIZE),
        planted:false, growProgress:0, growthTime:15, readyToHarvest:false
      });
    }
  }
}

function draw(){
  background(isNight?10:120, isNight?10:180, isNight?30:220);
  updateTime();
  handleMovement();
  camX = constrain(player.x - width/2,0,3000);
  camY = constrain(player.y - height/2,0,2000);
  translate(-camX,-camY);
  drawGround(); drawRoad(); drawCity();
  farmPlots.forEach(p=>drawPlot(p));
  drawWorkers(); drawCar(); drawPlayer(); drawNPCs(); drawHouse();
  if(isNight){fill(0,0,0,150); rect(camX,camY,width,height);}
  resetMatrix(); drawHUD(); drawTutorial();
}

function drawGround(){
  for(let x=0;x<3200;x+=PLOT_SIZE){
    for(let y=0;y<2200;y+=PLOT_SIZE){
      fill((x+y)%(PLOT_SIZE*2)<PLOT_SIZE?color(130,200,130):color(120,190,120));
      rect(x,y,PLOT_SIZE,PLOT_SIZE);
    }
  }
}

function drawRoad(){
  fill(60); rect(1100,0,200,2200);
  for(let y=0;y<2200;y+=60){
    fill(255); rect(1195,y+20,10,20);
  }
  for(let y=0;y<2200;y+=200){
    fill(90); rect(1090,y,10,80);
    if(isNight){fill(255,255,100,180); ellipse(1095,y,40,40);}
  }
}

function drawCity(){
  fill(200); rect(1300,200,300,400); rect(1550,200,200,400);
  textAlign(CENTER); textSize(18); fill(100); text("Cidade",1400,250);
}

function drawPlot(p){
  fill(139,69,19); rect(p.pos.x,p.pos.y,PLOT_SIZE,PLOT_SIZE);
  if(p.planted){
    let ratio=constrain(p.growProgress/p.growthTime,0,1);
    let r=lerp(100,220,ratio*0.5),
        g=lerp(180,150,ratio),
        b=lerp(100,30,ratio);
    fill(r,g,b);
    ellipse(p.pos.x+PLOT_SIZE/2,p.pos.y+PLOT_SIZE/2,25*ratio);
    if(ratio>=1)p.readyToHarvest=true;
  }
}

function drawWorkers(){
  workers.forEach(w=>{
    fill(255); textSize(32); textAlign(CENTER, CENTER);
    text(w.emoji, w.pos.x, w.pos.y);
    workerDoJob(w);
  });
}

function workerDoJob(w){
  if(w.role==="plant"){
    let targets = farmPlots.filter(p=>!p.planted).slice(0,w.batchSize);
    if(targets.length){
      let t=targets[0];
      moveTo(w,t.pos.x+PLOT_SIZE/2,t.pos.y+PLOT_SIZE/2,w.speed);
      if(dist(w.pos.x,w.pos.y,t.pos.x+PLOT_SIZE/2,t.pos.y+PLOT_SIZE/2)<5){
        if(seeds>=w.batchSize){
          targets.forEach(tp=>{
            tp.planted=true; tp.growProgress=0; tp.readyToHarvest=false; seeds--;
          });
        }
      }
    }
  }
  if(w.role==="harvest"){
    let targets = farmPlots.filter(p=>p.planted && p.readyToHarvest).slice(0,w.batchSize);
    if(targets.length){
      let t=targets[0];
      moveTo(w,t.pos.x+PLOT_SIZE/2,t.pos.y+PLOT_SIZE/2,w.speed);
      if(dist(w.pos.x,w.pos.y,t.pos.x+PLOT_SIZE/2,t.pos.y+PLOT_SIZE/2)<5){
        targets.forEach(tp=>{
          tp.planted=false; tp.readyToHarvest=false; tp.growProgress=0; crops++;
        });
      }
    }
  }
  if(w.role==="deliver"){
    if(w.cropsCarried>0){
      let shop=npcs.find(n=>n.role==="sell");
      moveTo(w,shop.x+30,shop.y+30,w.speed);
      if(dist(w.pos.x,w.pos.y,shop.x+30,shop.y+30)<10){
        money+=w.cropsCarried*5; w.cropsCarried=0;
      }
    } else {
      if(crops>0){ crops--; w.cropsCarried=1; }
      else moveTo(w,house.x+PLOT_SIZE/2,house.y+PLOT_SIZE/1.3,w.speed);
    }
  }
}

function drawNPCs(){
  npcs.forEach(n=>{
    fill(255); rect(n.x,n.y,60,60);
    fill(0); textAlign(CENTER); textSize(16); text(n.name,n.x+30,n.y+35);
  });
}

function drawHouse(){
  textAlign(CENTER); textSize(50);
  text(house.emoji[house.level], house.x+PLOT_SIZE/2, house.y+PLOT_SIZE/1.3);
}

function updateTime(){
  timeCounter++;
  if(timeCounter>=10){
    timeCounter=0;
    minute++;
    if(minute>=60){minute=0; hour++; if(hour>=24){hour=0; day++;}}
    farmPlots.forEach(p=>{
      if(p.planted && !p.readyToHarvest){
        p.growProgress++;
        if(p.growProgress>=p.growthTime)p.readyToHarvest=true;
      }
    });
  }
  isNight = hour>=18 || hour<6;
}

function moveTo(w,tx,ty,s){
  let dx=tx-w.pos.x, dy=ty-w.pos.y, d=sqrt(dx*dx+dy*dy);
  if(d>s){w.pos.x+=dx/d*s; w.pos.y+=dy/d*s;}
  else{w.pos.x=tx; w.pos.y=ty;}
}

function drawPlayer(){
  fill(255,200,200);
  ellipse(player.x,player.y,40);
  textAlign(CENTER); textSize(24); text("🙂",player.x,player.y+8);
}

function drawCar(){
  fill(200); rect(car.x,car.y,car.w,car.h);
  fill(50); ellipse(car.x+10,car.y+car.h,10); ellipse(car.x+car.w-10,car.y+car.h,10);
}

function handleMovement(){
  let speed = car.inside?6:3;
  if(keyIsDown(87)) player.y-=speed;
  if(keyIsDown(83)) player.y+=speed;
  if(keyIsDown(65)) player.x-=speed;
  if(keyIsDown(68)) player.x+=speed;
  if(keyIsDown(69)&&dist(player.x,player.y,car.x+car.w/2,car.y+car.h/2)<50){
    car.inside=!car.inside;
  }
  if(car.inside){car.x=player.x-car.w/2; car.y=player.y-car.h/2;}
}

function mousePressed(){
  let wx = mouseX + camX, wy = mouseY + camY;
  // casa
  if(dist(wx,wy,house.x+PLOT_SIZE/2,house.y+PLOT_SIZE/1.3)<50){
    if(house.level<house.emoji.length-1 && money>=house.upgradeCost[house.level]){
      money-=house.upgradeCost[house.level]; house.level++; initFarmPlots();
    }
    return;
  }
  // lojas
  for(let n of npcs){
    if(dist(wx,wy,n.x+30,n.y+30)<40){
      if(n.role==="shop" && money>=20){ seeds+=5; money-=20; }
      if(n.role==="tools" && money>=100 && workers.length>0){
        money-=100;
        workers.forEach(w=>{
          w.speed += 0.5;
          w.batchSize = (w.batchSize||1)+1;
        });
      }
      if(n.role==="sell" && crops>0){ money+=crops*5; crops=0; }
      if(n.role==="house"){} // já trata em clique anterior
      return;
    }
  }
  // plant/colhe
  for(let p of farmPlots){
    if(wx>p.pos.x&&wx<p.pos.x+PLOT_SIZE&&wy>p.pos.y&&wy<p.pos.y+PLOT_SIZE){
      if(!p.planted && seeds>0){
        p.planted=true; p.growProgress=0; p.readyToHarvest=false; seeds--;
      }
      else if(p.planted && p.readyToHarvest){
        p.planted=false; p.readyToHarvest=false; p.growProgress=0; crops++;
      }
      return;
    }
  }
}

function drawHUD(){
  resetMatrix();
  fill(0); textSize(18); textAlign(LEFT);
  text(`📅 Dia ${day} 🕒 ${nf(hour,2)}:${nf(minute,2)}  💰 $${money}`,20,30);
  text(`🌾 Sementes: ${seeds}  🌽 Colheitas: ${crops}`,20,60);
  text(`Casa: ${house.emoji[house.level]}  Upg Casa: $${house.upgradeCost[house.level]||"MAX"}`,20,90);
  text(`Trabalhadores: ${workers.length}`,20,120);
}

function drawTutorial(){
  fill(0,200); rect(20,height-100,width-40,80,10);
  fill(255); textSize(20); textAlign(LEFT);
  text(tutorialSteps[tutorialIndex],40,height-50);
  tutorialTimer++;
  if(tutorialTimer>tutorialDelay && tutorialIndex<tutorialSteps.length-1){
    tutorialIndex++; tutorialTimer=0;
  }
}

function hireWorker(type){
  if(money>=100){
    money-=100;
    let w = {
      emoji: WORKER_TYPES[type].emoji,
      role: WORKER_TYPES[type].role,
      speed: WORKER_TYPES[type].speed,
      pos: createVector(house.x+PLOT_SIZE/2,house.y+PLOT_SIZE/1.3),
      batchSize: 1, cropsCarried: 0
    };
    workers.push(w);
  }
}

function keyPressed(){
  if(key==='1') hireWorker(0);
  if(key==='2') hireWorker(1);
  if(key==='3') hireWorker(2);
}