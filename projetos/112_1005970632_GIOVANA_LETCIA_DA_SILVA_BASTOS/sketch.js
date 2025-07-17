let estado = "inicio";

let botaoJogar, botaoInstrucoes, botaoVoltar, botaoAvancar, botaoEscolha1, botaoEscolha2, botaoReiniciar;

let fundoTipo = "campo";

let tempoTroca = 0, transicao = 0, emTransicao = false, direcaoTransicao = 1, nuvemX = 0, brilhoTitulo = 0, direcaoBrilho = 1;

let carros = [];

let faixasYBaixo = [340, 360, 380];

let capitulo = 0;

let aguardandoEscolha = false;

let aguardandoAvanco = false;

let finalDeJogo = false;

// HISTÓRIA LONGA E RAMIFICADA

let historia = [

  { // 0

    texto: "Você é Lia, uma jovem do campo cheia de curiosidade. O sol nasce e seus olhos brilham com o desejo de aventura.",

    opcoes: []

  },

  { // 1

    texto: "Sua avó está preparando o café. O cheiro de pão fresco invade a casa. Ela comenta sobre a ponte antiga que ligava o campo à cidade.",

    opcoes: []

  },

  { // 2

    texto: "Depois do café, Lia ajuda a cuidar das galinhas e regar a horta. Ela conversa com João, o vizinho, que sonha em ser músico na cidade.",

    opcoes: []

  },

  { // 3

    texto: "Lia sente vontade de explorar. No portão de casa, a avó entrega um lenço bordado: 'Se sentir saudade, lembre de mim.'",

    opcoes: []

  },

  { // 4

    texto: "No caminho de terra, Lia vê crianças brincando e Dona Benta contando histórias. Mas o velho caminho de pedras para a cidade a chama.",

    opcoes: [

      "Seguir pelo caminho de pedras até a cidade",

      "Ficar no campo para conversar e ajudar os moradores"

    ]

  },

  // RAMO: CIDADE

  { // 5

    texto: "Lia segue pelo caminho de pedras, o coração batendo forte. Borboletas voam, ela encontra uma ponte quebrada sobre o riacho.",

    opcoes: []

  },

  { // 6

    texto: "Para atravessar, ela pode pular pelas pedras ou dar a volta pela floresta.",

    opcoes: [

      "Pular pelas pedras (arriscado, mas rápido)",

      "Dar a volta pela floresta (seguro, mas demora)"

    ]

  },

  // Se pular

  { // 7

    texto: "Lia pula de pedra em pedra. Escorrega, mas consegue atravessar, com a roupa molhada e dando risada.",

    opcoes: []

  },

  // Se dar a volta

  { // 8

    texto: "Lia contorna o riacho pela floresta. Ouve pássaros diferentes e encontra uma raposa curiosa. Leva mais tempo, mas chega seca e encantada.",

    opcoes: []

  },

  { // 9

    texto: "Já do outro lado, Lia sente o cheiro da cidade. Vê casas coloridas, barracas na feira, pessoas apressadas e artistas de rua.",

    opcoes: []

  },

  { // 10

    texto: "Um grupo de jovens a chama para ouvir música na praça. Uma senhora lhe oferece pão e pergunta de onde ela veio.",

    opcoes: [

      "Ir ouvir música com os jovens",

      "Conversar com a senhora sobre o campo"

    ]

  },

  // Se música

  { // 11

    texto: "Lia se senta com os jovens. Eles falam sobre sonhos, futuro e misturam ritmos do campo e da cidade. Um deles pede para Lia contar sobre sua vila.",

    opcoes: []

  },

  { // 12

    texto: "Ela sente saudade, mas vê nos olhos dos novos amigos que suas raízes são preciosas. Todos se animam para visitar o campo.",

    opcoes: [

      "Convidar os jovens para um festival no campo",

      "Pedir conselhos sobre viver na cidade"

    ]

  },

  // Se conversa com senhora

  { // 13

    texto: "A senhora se chama Dona Elisa. Ela morou no campo quando era jovem. As duas trocam histórias e receitas.",

    opcoes: []

  },

  { // 14

    texto: "Dona Elisa entrega a Lia uma semente e diz: 'Plante entre o campo e a cidade. Ela unirá todos.'",

    opcoes: [

      "Levar a semente para a vila",

      "Plantá-la ali mesmo na cidade"

    ]

  },

  // RAMO: CAMPO

  { // 15

    texto: "Lia fica no campo. Ajuda Dona Benta a preparar bolo de milho para a festa da colheita. Ouve causos e aprende novas cantigas.",

    opcoes: []

  },

  { // 16

    texto: "Seu Zeca precisa de ajuda para consertar a cerca. Lia pode ajudá-lo ou brincar com as crianças.",

    opcoes: [

      "Ajudar Seu Zeca na cerca",

      "Brincar com as crianças"

    ]

  },

  // Se ajudar cerca

  { // 17

    texto: "Enquanto arruma a cerca, Seu Zeca conta como era viajar para a cidade vender produtos. Ele entrega a Lia um broche antigo, símbolo de amizade.",

    opcoes: []

  },

  // Se brincar

  { // 18

    texto: "Lia brinca de pega-pega e pula corda. As crianças sonham em conhecer a cidade. Lia promete levá-las um dia.",

    opcoes: []

  },

  { // 19

    texto: "No fim do dia, todos se reúnem na fogueira. Histórias e músicas unem novas e velhas gerações.",

    opcoes: [

      "Organizar uma excursão para a cidade com as crianças",

      "Fazer uma festa para convidar pessoas da cidade ao campo"

    ]

  },

  // RAMOS DE FINAIS (em cada escolha final, dois finais possíveis)

  // Festa no campo

  { // 20

    texto: "Lia organiza um festival com música, comidas típicas e exposição de artesanato. Jovens da cidade aceitam o convite e chegam curiosos.",

    opcoes: []

  },

  { // 21

    texto: "A festa é um sucesso. Pessoas do campo e da cidade dançam juntas, trocam receitas e histórias sob as estrelas.",

    opcoes: []

  },

  { // 22

    texto: "Lia sente que uniu dois mundos. Ela planta a semente dada por Dona Elisa no meio do caminho. Uma árvore começa a florescer.",

    opcoes: []

  },

  { // 23

    texto: "Fim: Uma nova ponte nasce, não de madeira, mas de amizade, cultura e respeito.",

    opcoes: []

  },

  // Excursão cidade

  { // 24

    texto: "Lia leva as crianças para visitar a cidade. Elas ficam maravilhadas com as luzes, os sons e os artistas de rua. Fazem novos amigos na praça.",

    opcoes: []

  },

  { // 25

    texto: "De volta ao campo, as crianças contam o que viram e Lia percebe que agora todos têm um pouco de cidade no coração.",

    opcoes: []

  },

  { // 26

    texto: "Fim: Lia entende que quem tem raízes pode viajar por qualquer caminho, sem medo de se perder.",

    opcoes: []

  },

  // Festival com jovens (cidade)

  { // 27

    texto: "Os jovens aceitam o convite. No festival do campo, eles tocam músicas novas, inspiradas pelas histórias de Lia.",

    opcoes: []

  },

  { // 28

    texto: "A vila nunca mais será a mesma: todo ano, mais pessoas da cidade vêm celebrar a união entre os dois mundos.",

    opcoes: []

  },

  { // 29

    texto: "Fim: Lia percebe que suas histórias e coragem abriram caminhos para todos.",

    opcoes: []

  },

  // Conselhos sobre cidade

  { // 30

    texto: "Os jovens aconselham Lia a nunca esquecer suas raízes. Ela decide ficar mais um tempo na cidade para estudar e depois voltar ao campo.",

    opcoes: []

  },

  { // 31

    texto: "Lia faz amigos, aprende e logo sente vontade de levar tudo que descobriu de volta para casa.",

    opcoes: []

  },

  { // 32

    texto: "Fim: O conhecimento e a amizade são as melhores pontes.",

    opcoes: []

  },

  // Plantar semente na cidade

  { // 33

    texto: "Lia planta a semente com Dona Elisa. Logo, uma árvore cresce no meio da praça. Moradores do campo e da cidade começam a se encontrar ali.",

    opcoes: []

  },

  { // 34

    texto: "A praça vira lugar de encontros, música e feira de trocas. Lia sente orgulho do que construiu.",

    opcoes: []

  },

  { // 35

    texto: "Fim: Uma nova tradição nasce. Lia prometeu voltar, e sabe que será recebida como filha dos dois mundos.",

    opcoes: []

  },

  // Levar semente para vila

  { // 36

    texto: "Lia leva a semente para a vila. Plante-a no centro da praça. Em pouco tempo, vira ponto de encontros e lendas.",

    opcoes: []

  },

  { // 37

    texto: "Gente da cidade começa a visitar o campo para conhecer a árvore e ouvir as histórias de Lia.",

    opcoes: []

  },

  { // 38

    texto: "Fim: O campo floresce e a cidade aprende a valorizar suas origens.",

    opcoes: []

  }

];

// Funções iguais ao modelo anterior, só mudou a história.

// ---------------------------------

// --- O RESTO DO CÓDIGO ABAIXO ---

// ---------------------------------

function setup() {

  createCanvas(600, 400);

  textFont("Georgia");

  for (let i = 0; i < faixasYBaixo.length; i++) {

    carros.push({

      x: random(-200, 0),

      y: faixasYBaixo[i],

      velocidade: random(1.5, 2.5),

      cor: color(random(255), random(255), random(255)),

      direcao: 1

    });

  }

  botaoJogar = createButton("▶ JOGAR");

  botaoJogar.position(width / 2 - 60, height / 2 + 50);

  botaoJogar.style("padding", "12px 28px; font-size: 18px; background-color: #43a047; color: white; border: none; border-radius: 15px; box-shadow: 3px 3px 8px rgba(0,0,0,0.3); cursor: pointer;");

  botaoJogar.mousePressed(() => {

    estado = "jogo";

    botaoJogar.hide();

    botaoInstrucoes.hide();

    iniciarAventura();

  });

  botaoInstrucoes = createButton("ℹ INSTRUÇÕES");

  botaoInstrucoes.position(width / 2 - 70, height / 2 + 110);

  botaoInstrucoes.style("padding", "8px 24px; font-size: 16px; background-color: #1976d2; color: white; border: none; border-radius: 15px; box-shadow: 3px 3px 8px rgba(0,0,0,0.3); cursor: pointer;");

  botaoInstrucoes.mousePressed(() => {

    estado = "instrucoes";

    botaoJogar.hide();

    botaoInstrucoes.hide();

    botaoVoltar.show();

  });

  botaoVoltar = createButton("← VOLTAR");

  botaoVoltar.position(20, 20);

  botaoVoltar.style("padding", "8px 20px; font-size: 16px; background-color: #555; color: white; border: none; border-radius: 12px; box-shadow: 2px 2px 6px rgba(0,0,0,0.3); cursor: pointer;");

  botaoVoltar.mousePressed(() => {

    estado = "inicio";

    botaoJogar.show();

    botaoInstrucoes.show();

    botaoVoltar.hide();

  });

  botaoVoltar.hide();

  botaoAvancar = createButton("AVANÇAR");

  botaoAvancar.size(200, 38);

  botaoAvancar.position(width / 2 - 100, height - 80);

  botaoAvancar.style("font-size: 20px; background-color: #ffb300; color: #333; border: none; border-radius: 16px; box-shadow: 2px 2px 8px rgba(0,0,0,0.2);");

  botaoAvancar.mousePressed(avancarHistoria);

  botaoAvancar.hide();

  botaoEscolha1 = createButton("");

  botaoEscolha1.size(320, 38);

  botaoEscolha1.position(width / 2 - 160, height - 120);

  botaoEscolha1.style("font-size: 18px; background-color: #1976d2; color: white; border: none; border-radius: 13px; box-shadow: 2px 2px 6px rgba(0,0,0,0.2);");

  botaoEscolha1.mousePressed(() => escolherOpcao(1));

  botaoEscolha1.hide();

  botaoEscolha2 = createButton("");

  botaoEscolha2.size(320, 38);

  botaoEscolha2.position(width / 2 - 160, height - 70);

  botaoEscolha2.style("font-size: 18px; background-color: #009688; color: white; border: none; border-radius: 13px; box-shadow: 2px 2px 6px rgba(0,0,0,0.2);");

  botaoEscolha2.mousePressed(() => escolherOpcao(2));

  botaoEscolha2.hide();

  botaoReiniciar = createButton("REINICIAR");

  botaoReiniciar.size(200, 38);

  botaoReiniciar.position(width / 2 - 100, height - 80);

  botaoReiniciar.style("font-size: 20px; background-color: #43a047; color: white; border: none; border-radius: 16px; box-shadow: 2px 2px 8px rgba(0,0,0,0.2);");

  botaoReiniciar.mousePressed(() => {

    iniciarAventura();

    finalDeJogo = false;

  });

  botaoReiniciar.hide();

}

function draw() {

  if (estado === "inicio") {

    telaInicio();

  } else if (estado === "jogo") {

    telaAventura();

  } else if (estado === "instrucoes") {

    telaInstrucoes();

  }

}

function telaInicio() {

  if (!emTransicao) {

    tempoTroca++;

    if (tempoTroca > 300) {

      emTransicao = true;

      direcaoTransicao = 1;

      tempoTroca = 0;

    }

  }

  if (fundoTipo === "campo") {

    desenharCampo();

  } else {

    desenharCidade();

  }

  brilhoTitulo += 0.8 * direcaoBrilho;

  if (brilhoTitulo > 100 || brilhoTitulo < 0) direcaoBrilho *= -1;

  textAlign(CENTER);

  textSize(42);

  stroke(0, 100);

  strokeWeight(6);

  fill(255, 255 - brilhoTitulo / 2, 255 - brilhoTitulo / 4);

  text("Raízes e Conexões", width / 2, height / 2 - 60);

  noStroke();

  if (emTransicao) {

    fill(0, transicao);

    rect(0, 0, width, height);

    transicao += 5 * direcaoTransicao;

    if (transicao >= 255) {

      fundoTipo = fundoTipo === "campo" ? "cidade" : "campo";

      direcaoTransicao = -1;

    }

    if (transicao <= 0 && direcaoTransicao === -1) {

      emTransicao = false;

      transicao = 0;

    }

  }

}

function telaInstrucoes() {

  if (fundoTipo === "campo") {

    desenharCampo();

  } else {

    desenharCidade();

  }

  fill(255, 250, 240, 220);

  stroke(180);

  strokeWeight(2);

  rect(40, 40, width - 80, height - 80, 20);

  let margemX = 60 + 20;

  let margemY = 60 + 20;

  let larguraTexto = width - 2 * margemX;

  let alturaTexto = height - 2 * margemY;

  noStroke();

  fill(40, 100, 60);

  textAlign(LEFT, TOP);

  textSize(32);

  text("INSTRUÇÕES", margemX, margemY, larguraTexto, 50);

  fill(30, 60, 90);

  textSize(20);

  text(

    "Você viverá uma aventura onde fará escolhas que aproximam o campo e a cidade.\n\nToque nos botões para avançar e escolher caminhos. No fim, pode reiniciar a aventura!",

    margemX, margemY + 60, larguraTexto, alturaTexto - 60

  );

}

function iniciarAventura() {

  capitulo = 0;

  finalDeJogo = false;

  mostrarBotoes();

}

function mostrarBotoes() {

  botaoAvancar.hide();

  botaoEscolha1.hide();

  botaoEscolha2.hide();

  botaoReiniciar.hide();

  let cap = historia[capitulo];

  if (cap.opcoes.length === 2) {

    botaoEscolha1.html(cap.opcoes[0]);

    botaoEscolha2.html(cap.opcoes[1]);

    let botaoY = height - 120;

    botaoEscolha1.position(width / 2 - 160, botaoY);

    botaoEscolha2.position(width / 2 - 160, botaoY + 50);

    botaoEscolha1.show();

    botaoEscolha2.show();

    aguardandoEscolha = true;

    aguardandoAvanco = false;

    finalDeJogo = false;

    return;

  }

  // Se chegou em um dos finais (sempre nos últimos capítulos)

  if (capitulo >= 23 && (

        capitulo === 23 || capitulo === 26 || capitulo === 29 ||

        capitulo === 32 || capitulo === 35 || capitulo === 38

      )) {

    botaoReiniciar.show();

    finalDeJogo = true;

    aguardandoEscolha = false;

    aguardandoAvanco = false;

    return;

  }

  botaoAvancar.show();

  aguardandoAvanco = true;

  aguardandoEscolha = false;

  finalDeJogo = false;

}

// Gerencia o fluxo da história longa, sempre avançando corretamente para os caminhos e finais

function avancarHistoria() {

  if (!aguardandoAvanco) return;

  // Caminho inicial e narração até primeira escolha

  if (capitulo >= 0 && capitulo < 4) {

    capitulo++;

  }

  // Cidade: ponte -> escolha caminho (pular ou floresta)

  else if (capitulo === 5) capitulo = 6;

  // Após pular pelas pedras

  else if (capitulo === 7) capitulo = 9;

  // Após dar a volta pela floresta

  else if (capitulo === 8) capitulo = 9;

  // Cidade: chegou na cidade, narração até escolha jovens/senhora

  else if (capitulo === 9) capitulo++;

  else if (capitulo === 10) ; // trava na escolha (música/senhora)

  // Música com jovens, depois escolha festival/conselhos

  else if (capitulo === 11) capitulo = 12;

  // Conselho com jovens: avança até fim

  else if (capitulo === 30) capitulo = 31;

  else if (capitulo === 31) capitulo = 32;

  // Senhora, recebe semente, escolha plantar ou levar para a vila

  else if (capitulo === 13) capitulo = 14;

  // Plantar semente na cidade, avança até fim

  else if (capitulo === 33) capitulo = 34;

  else if (capitulo === 34) capitulo = 35;

  // Levar semente para vila, avança até fim

  else if (capitulo === 36) capitulo = 37;

  else if (capitulo === 37) capitulo = 38;

  // Campo: fica, ajuda ou brinca, depois escolha excursão/festa

  else if (capitulo === 15) capitulo = 16;

  // Ajudar cerca

  else if (capitulo === 17) capitulo = 19;

  // Brincar com crianças

  else if (capitulo === 18) capitulo = 19;

  // Excursão: avança até fim

  else if (capitulo === 24) capitulo = 25;

  else if (capitulo === 25) capitulo = 26;

  // Festa no campo: avança até fim

  else if (capitulo === 20) capitulo = 21;

  else if (capitulo === 21) capitulo = 22;

  else if (capitulo === 22) capitulo = 23;

  // Festival com jovens: avança até fim

  else if (capitulo === 27) capitulo = 28;

  else if (capitulo === 28) capitulo = 29;

  // Plantar semente, árvore, escolha festa/histórias

  else if (capitulo === 33) capitulo = 34;

  else if (capitulo === 34) capitulo = 35;

  // Finais não avançam

  mostrarBotoes();

}

function escolherOpcao(opcao) {

  if (!aguardandoEscolha) return;

  // Primeira escolha: cidade ou campo

  if (capitulo === 4) {

    if (opcao === 1) capitulo = 5;

    else capitulo = 15;

    mostrarBotoes();

    return;

  }

  // Cidade: pular pedras ou floresta

  if (capitulo === 6) {

    if (opcao === 1) capitulo = 7;

    else capitulo = 8;

    mostrarBotoes();

    return;

  }

  // Cidade: ouvir jovens ou conversar com senhora

  if (capitulo === 10) {

    if (opcao === 1) capitulo = 11;

    else capitulo = 13;

    mostrarBotoes();

    return;

  }

  // Jovens: festival ou conselhos

  if (capitulo === 12) {

    if (opcao === 1) capitulo = 27;

    else capitulo = 30;

    mostrarBotoes();

    return;

  }

  // Senhora: plantar na cidade ou levar p/ vila

  if (capitulo === 14) {

    if (opcao === 1) capitulo = 36;

    else capitulo = 33;

    mostrarBotoes();

    return;

  }

  // Campo: ajudar cerca ou brincar

  if (capitulo === 16) {

    if (opcao === 1) capitulo = 17;

    else capitulo = 18;

    mostrarBotoes();

    return;

  }

  // Campo: excursão ou festa

  if (capitulo === 19) {

    if (opcao === 1) capitulo = 24;

    else capitulo = 20;

    mostrarBotoes();

    return;

  }

}

function telaAventura() {

  if (

    capitulo <= 4 ||

    (capitulo >= 15 && capitulo <= 19) ||

    (capitulo >= 36 && capitulo <= 38) ||

    (capitulo >= 20 && capitulo <= 23) ||

    (capitulo >= 24 && capitulo <= 26) ||

    (capitulo >= 27 && capitulo <= 29)

  ) {

    desenharCampo();

  } else {

    desenharCidade();

  }

  fill(255, 250, 240, 230);

  stroke(180);

  strokeWeight(2);

  rect(60, 60, width - 120, height - 120, 18);

  let margemX = 80;

  let margemY = 80;

  let larguraTexto = width - 2 * margemX;

  let alturaTexto = height - 2 * margemY;

  noStroke();

  fill(40, 100, 60);

  textAlign(LEFT, TOP);

  textSize(22);

  text(historia[capitulo].texto, margemX, margemY, larguraTexto, alturaTexto);

}

// CENÁRIOS E COMPONENTES (iguais ao modelo anterior, não precisam ser alterados)

function desenharCampo() {

  setGradient(0, 0, width, 300, color(135, 206, 235), color(180, 230, 200));

  noStroke();

  fill(255, 255, 255, 200);

  for (let i = 0; i < 3; i++) {

    ellipse((nuvemX + i * 200) % width, 80 + i * 10, 60, 40);

    ellipse((nuvemX + i * 200 + 20) % width, 80 + i * 10, 50, 30);

  }

  nuvemX += 0.3;

  fill(255, 255, 0, 150);

  ellipse(520, 60, 100);

  fill(255, 255, 150, 50);

  ellipse(520, 60, 160);

  fill(80, 200, 100);

  rect(0, 300, width, 100);

  desenharCerca();

  desenharArvore(45, 240);

  desenharArvore(135, 245);

  desenharArvore(225, 250);

  desenharCasinha(420, 270);

  desenharGalinhas();

}

function desenharCidade() {

  setGradient(0, 0, width, 300, color(30, 30, 70), color(120, 100, 140));

  fill(250, 250, 210, 200);

  ellipse(520, 80, 70, 70);

  fill(200, 200, 170, 100);

  ellipse(540, 75, 15, 15);

  desenharPredioDetalhado(40, 170, 50, 130, color(90, 90, 110));

  desenharPredioDetalhado(110, 160, 60, 140, color(80, 80, 100));

  desenharPredioDetalhado(190, 150, 70, 150, color(100, 100, 130));

  desenharPredioDetalhado(280, 165, 60, 135, color(85, 85, 105));

  desenharPredioDetalhado(360, 140, 50, 160, color(95, 95, 125));

  desenharPredioDetalhado(430, 160, 70, 140, color(70, 70, 95));

  desenharPredioDetalhado(510, 155, 60, 145, color(110, 110, 140));

  fill(50);

  rect(0, 300, width, 100);

  fill(255);

  for (let i = 0; i < width; i += 50) {

    rect(i, 345, 30, 10, 2);

  }

  for (let x = 60; x < width; x += 150) {

    fill(60);

    rect(x, 260, 6, 40, 2);

    fill(255, 255, 180, 180);

    ellipse(x + 3, 255, 20, 20);

  }

  for (let carro of carros) {

    carro.x += carro.velocidade;

    if (carro.x > width + 60) {

      carro.x = -random(100, 300);

    }

    desenharCarro(carro.x, carro.y, carro.cor, 1);

  }

}

function desenharCerca() {

  for (let x = 0; x < width; x += 30) {

    fill(139, 69, 19);

    rect(x, 290, 10, 40, 3);

    if (x < width - 30) {

      rect(x + 10, 305, 20, 5, 3);
      }
    }
  }

function desenharGalinhas() {

  for (let i = 0; i < 3; i++) {

    let x = 100 + i * 120 + sin(frameCount * 0.05 + i) * 2;

    let y = 345 + cos(frameCount * 0.1 + i) * 1;

    fill(255);

    ellipse(x, y, 22, 16); // corpo

    ellipse(x + 10, y - 10, 14, 14); // cabeça

    fill(230);

    ellipse(x - 5, y, 10, 10); // asa

    fill(255, 153, 0);

    triangle(x + 16, y - 10, x + 22, y - 8, x + 16, y - 4); // bico

    fill(0);

    ellipse(x + 6, y - 12, 2.5, 2.5); // olho

    stroke(255, 153, 0);

    strokeWeight(2);

    line(x - 4, y + 8, x - 4, y + 14); // perna esquerda

    line(x + 4, y + 8, x + 4, y + 14); // perna direita

    noStroke();

  }

}

function desenharArvore(x, y) {

  fill(101, 67, 33);

  rect(x + 18, y + 50, 14, 50, 4);

  fill(34, 139, 34);

  ellipse(x + 25, y + 25, 60, 60);

  fill(0, 100, 0, 100);

  ellipse(x + 15, y + 35, 50, 50);

}

function desenharPredioDetalhado(x, y, w, h, corBase) {

  fill(corBase);

  rect(x, y, w, h, 4);

  stroke(150);

  strokeWeight(2);

  line(x + w / 2, y, x + w / 2, y - 20);

  noStroke();

  fill(200);

  ellipse(x + w / 2, y - 20, 5, 5);

  for (let i = y + 10; i < y + h - 15; i += 20) {

    for (let j = x + 5; j < x + w - 5; j += 15) {

      fill(color(255, 255, 180));

      rect(j, i, 10, 15, 2);

    }

  }

  fill(0, 0, 0, 15);

  for (let i = y; i < y + h; i += 6) {

    line(x, i, x + w, i);

  }

}

function desenharCasinha(x, y) {

  fill(255, 230, 200);

  rect(x, y, 100, 70, 5);

  fill(150, 75, 0);

  triangle(x - 10, y, x + 50, y - 40, x + 110, y);

  fill(100, 50, 0);

  rect(x + 40, y + 30, 20, 40, 3);

  fill(200, 240, 255);

  rect(x + 10, y + 20, 20, 20, 3);

  rect(x + 70, y + 20, 20, 20, 3);

}

function desenharCarro(x, y, cor, direcao) {

  push();

  translate(x, y);

  scale(direcao, 1);

  fill(cor);

  rect(-25, -15, 50, 20, 5);

  fill(0);

  ellipse(-15, 5, 15, 15);

  ellipse(15, 5, 15, 15);

  fill(200);

  rect(-20, -10, 20, 10, 3);

  pop();

}

function setGradient(x, y, w, h, c1, c2) {

  noFill();

  for (let i = y; i <= y + h; i++) {

    let inter = map(i, y, y + h, 0, 1);

    let c = lerpColor(c1, c2, inter);

    stroke(c);

    line(x, i, x + w, i);

  }

}

      