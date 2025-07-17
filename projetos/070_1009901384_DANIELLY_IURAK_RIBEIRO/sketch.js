let campo;
let cidade;
let alimentos = [];

function setup() { // definimos o campo e a cidade como retângulos e criamos uma lista de alimentos com posições aleatórias no campo.
  createCanvas(800, 600);
  campo = {
    x: 0,
    y: 0,
    w: 400,
    h: height
  };
  cidade = {
    x: 400,
    y: 0,
    w: 400,
    h: height
  };
  for (let i = 0; i < 10; i++) {
    alimentos.push({
      x: random(campo.x, campo.x + campo.w),
      y: random(campo.y, campo.y + campo.h),
      w: 20,
      h: 20,
      tipo: random(['maçã', 'cenoura', 'tomate'])
    });
  }
}

function draw() { // desenhamos o campo e a cidade como retângulos e os alimentos como quadrados podemos se dizer,como coloridos.
  background(220);
  // Desenhar campo
  fill(139, 69, 19);
  rect(campo.x, campo.y, campo.w, campo.h);
  // Desenhar cidade
  fill(169, 169, 169);
  rect(cidade.x, cidade.y, cidade.w, cidade.h);
  // Desenhar alimentos
  for (let i = 0; i < alimentos.length; i++) {
    fill(255, 0, 0);
    if (alimentos[i].tipo === 'maçã') {
      fill(255, 0, 0);
    } else if (alimentos[i].tipo === 'cenoura') {
      fill(255, 165, 0);
    } else if (alimentos[i].tipo === 'tomate') {
      fill(255, 0, 0);
    }
    rect(alimentos[i].x, alimentos[i].y, alimentos[i].w, alimentos[i].h);
    // Transportar alimentos para a cidade
    if (alimentos[i].x < cidade.x) {
      alimentos[i].x += 1;
    }
  }
  // Desenhar texto
  fill(0);
  textSize(24);
  text('Campo', 150, 30);
  text('Cidade', 550, 30);
}

// os alimentos ao decorrer do jogo é direcionado do campo a cidade, assim como nos dias de hoje.