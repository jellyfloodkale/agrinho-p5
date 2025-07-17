//Os códigos foram criados originalmente por mim, entretanto certos "erros" foram corrigidos pela Inteligência Artificial, ChatGPT.
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;
let mensagemExplicativa = "";

let explicacoes = {
  "Leite↔Padaria": "Leite vem do campo e é usado em pães e bolos nas padarias urbanas.",
  "Milho↔Cinema": "O milho do campo vira pipoca nos cinemas da cidade.",
  "Algodão↔Roupas": "Algodão é colhido no campo e vira tecido para roupas nas lojas urbanas.",
  "Cana-de-açúcar↔Refrigerante": "A cana vira açúcar, essencial em refrigerantes.",
  "Soja↔Hambúrguer": "Soja é usada como proteína em muitos hambúrgueres e alimentos industrializados.",
  "Trigo↔Pizzaria": "O trigo do campo vira farinha para as pizzas da cidade.",
  "Café↔Escritório": "Café é colhido no campo e consumido diariamente em escritórios urbanos."
};

let pares = [
  ["Leite", "Padaria"],
  ["Milho", "Cinema"],
  ["Algodão", "Roupas"],
  ["Cana-de-açúcar", "Refrigerante"],
  ["Soja", "Hambúrguer"],
  ["Trigo", "Pizzaria"],
  ["Café", "Escritório"]
];

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(14);
  embaralharCartas();
}

function embaralharCartas() {
  let todas = [];
  pares.forEach(([campo, cidade]) => {
    todas.push({ texto: campo, tipo: "campo", par: cidade });
    todas.push({ texto: cidade, tipo: "cidade", par: campo });
  });

  todas = shuffle(todas);

  cartas = todas.map((c, i) => {
    let colunas = 4;
    let espacamentoX = 130;
    let espacamentoY = 140;
    let margemX = 60;
    let margemY = 80;

    let x = margemX + (i % colunas) * espacamentoX;
    let y = margemY + floor(i / colunas) * espacamentoY;

    return { ...c, x, y, virada: false, resolvida: false };
  });
}

function draw() {
  background(154,205,50);

  cartas.forEach(c => {
    stroke(0);
    fill(c.resolvida ? "#f7da7c" : c.virada ? "#ffffff" : "#ccc");
    rect(c.x, c.y, 100, 130, 10);

    if (c.virada || c.resolvida) {
      fill(0);
      textSize(12);
      let cx = c.x + 50;
      let cy = c.y + 65;
      text(c.texto, cx, cy);
    }
  });

  if (mensagemExplicativa) {
    textSize(14);
    let mensagem = mensagemExplicativa;
    let textoLargura = textWidth(mensagem);
    let padding = 20;

    // Faixa branca de fundo
    rectMode(CENTER);
    fill(255);
    rect(width / 2, height - 30, textoLargura + padding, 30);
    rectMode(CORNER); // Corrige interferência no resto do canvas

    // Texto da explicação
    fill(34, 139, 34); // verde escuro
    text(mensagem, width / 2, height - 30);
  }

  if (paresEncontrados === pares.length) {
    fill(0);
    textSize(20);
    text("🎉 Você encontrou todos os pares!", width / 2, 40);
  }
}

function mousePressed() {
  if (bloqueado) return;

  for (let c of cartas) {
    if (
      !c.virada &&
      !c.resolvida &&
      mouseX > c.x &&
      mouseX < c.x + 100 &&
      mouseY > c.y &&
      mouseY < c.y + 130
    ) {
      c.virada = true;
      if (!primeiraCarta) {
        primeiraCarta = c;
      } else {
        segundaCarta = c;
        verificarPar();
      }
      break;
    }
  }
}

function verificarPar() {
  bloqueado = true;
  setTimeout(() => {
    if (
      primeiraCarta &&
      segundaCarta &&
      primeiraCarta.par === segundaCarta.texto
    ) {
      primeiraCarta.resolvida = true;
      segundaCarta.resolvida = true;
      paresEncontrados++;

      const chave =
        primeiraCarta.tipo === "campo"
          ? `${primeiraCarta.texto}↔${segundaCarta.texto}`
          : `${segundaCarta.texto}↔${primeiraCarta.texto}`;

      mensagemExplicativa = explicacoes[chave];
    } else {
      primeiraCarta.virada = false;
      segundaCarta.virada = false;
      mensagemExplicativa = "";
    }

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
  }, 1000);
}