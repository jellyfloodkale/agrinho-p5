// Desativa mensagens de erro detalhadas para melhor performance
p5.disableFriendlyErrors = true;

// VARIÁVEIS GLOBAIS
let tela = "inicio";
let generoSelecionado = null;
let personagemSelecionado = null;
let nomeSelecionado = "";
let emojiSize;
let dispositivo = null; // 'celular' ou 'computador'
let mostrarInstrucoes = true;

// Variáveis da história
let cena = 0, fade = 0;
let nuvens = [], estrelas = [];
let tempo = 0;
let carros = [];
let fadeInText = 0;
let horarioDia = "manha"; // manha, tarde, noite
let clicksDia = 0; // Contador de clicks para avançar o dia

// Variáveis para telas adicionais
let celular = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

// VARIÁVEIS GLOBAIS - JOGO
let dinheiro = 5;
let arvoresCompradas = [];
let arvoresPlantadas = [];
let mostrarAnalise = null;
let dia = 1;
let fadeAlpha = 0;
let fadeState = 0;
let lucroDia = 0;
let mensagemLucro = "";
let arvoreSelecionada = null;
let vitalidadeTerreno = 0; // 0 a 100
let mostrarInfoArvore = null;
let mostrarInfoTecnologia = null;
let tecnologiasDesbloqueadas = [];
let bolsa = []; // Array para armazenar frutos colhidos
let missoes = []; // Missões disponíveis
let missaoAtiva = null; // Missão atual do jogador
let progressoMissao = 0; // Progresso na missão atual
let animais = []; // Animais que aparecem no sítio
let animalRaroVisivel = null; // Animal raro atualmente visível
let fimDeJogo = false; // Indica se o jogador comprou o Pau-rosa
let terrenoExpandido = false; // Controla a expansão visual do terreno
let plantio2Desbloqueado = false; // Controla se o Plantio 2 está desbloqueado
let evaApareceu = false; // Controla se a missão da Eva já apareceu
let mostrarBolsa = false; // Controla se a bolsa está visível
let mostrarBotaoPlantio2 = false; // Controla se o botão de plantio 2 aparece
let mostrarMissaoEva = false; // Controla se a mensagem da missão da Eva está visível
let plantioAtivo = 1; // 1 para plantio normal, 2 para plantio de frutas

// Configurações
const TEMPO_ANALISE = 2000;
const TEMPO_CRESCIMENTO = 5000;
let ESPACAMENTO_MINIMO = 100; // Será ajustado no setup

// Área plantável com sistema de expansão
let areaPlantavel = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  nivel: 1
};

// TECNOLOGIAS DISPONÍVEIS
const tecnologias = [
  {
    nome: "Agrofloresta Básica",
    custo: 50,
    descricao: "Permite plantar 30% mais árvores no mesmo espaço",
    efeito: "Reduz espaçamento necessário entre árvores em 30%",
    desbloqueada: false
  },
  {
    nome: "Sistema Agroflorestal",
    custo: 150,
    descricao: "Árvores podem ser plantadas mais próximas (50% redução de espaço)",
    efeito: "Reduz espaçamento necessário entre árvores em 50%",
    desbloqueada: false,
    requisito: "Agrofloresta Básica"
  },
  {
    nome: "Expansão de Terreno",
    custo: 200,
    descricao: "Libera nova área para plantio no terreno",
    efeito: "Aumenta a área disponível para plantio em 100%",
    desbloqueada: false
  },
  {
    nome: "Floresta Sustentável",
    custo: 500,
    descricao: "Desbloqueia mais tipos de frutos e aumenta colheitas",
    efeito: "Permite colher o dobro de frutos por dia e desbloqueia novas missões",
    desbloqueada: false,
    requisito: "Sistema Agroflorestal"
  }
];

// PERSONAGENS
const personagens = {
  feminino: {
    emojis: ["👩", "👩‍🌾", "👩‍⚕️", "👸", "👩‍🍳"],
    nomes: ["Ana", "Milena", "Joana", "Antonella", "Liz"]
  },
  masculino: {
    emojis: ["👨", "👨‍🌾", "👨‍⚕️", "🤴", "👨‍🍳"],
    nomes: ["Everton", "Michael", "Antony", "Ronaldo", "Luan"]
  }
};

// HISTÓRIA
const historia = [
  { msg: "", tema: "chegada", emoji: "🧑‍🌾" },
  { msg: "Eles contaram que viviam em harmonia com sua fazenda...", tema: "amanhecer", emoji: "👨‍🌾" },
  { msg: "Seu milho dourado e suas macieiras floresciam...", tema: "dia", emoji: "🍎🌽" },
  { msg: "Até que no horizonte, nuvens escuras surgiram...", tema: "tempestade", emoji: "🌪️" },
  { msg: "A tempestade varreu tudo em minutos...", tema: "destruicao", emoji: "💔" },
  { msg: "Mas onde há terra, há esperança...", tema: "recuperacao", emoji: "👨‍🌾🌱" },
  { msg: "Vamos resolver isso juntos?", tema: "porDoSol", emoji: "👨‍🌾🌅" }
];

// ÁRVORES DISPONÍVEIS - PLANTIO 1 (ÁRVORES NATIVAS)
const arvores = [
  {
    nome: "Pau-Brasil",
    preco: 1,
    retorno: 2,
    emojiMuda: "🌱",
    emojiAdulto: "🌳",
    descricao: "Explorada desde 1500 para extração de corante vermelho.",
    historia: "Leva 30 anos para crescer completamente. Foi intensamente explorada durante o período colonial, levando à sua quase extinção.",
    vitalidade: 5,
    risco: "Criticamente em perigo"
  },
  {
    nome: "Araucária",
    preco: 5,
    retorno: 15,
    emojiMuda: "🌱",
    emojiAdulto: "🌲",
    frutos: "🍐",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 3,
    valorColheita: 5,
    descricao: "Perdeu 97% de sua área original. Produz pinhões.",
    historia: "Leva 20 anos para produzir frutos. A expansão agrícola e urbana reduziu drasticamente suas florestas no sul do Brasil.",
    vitalidade: 15,
    risco: "Em perigo"
  },
  {
    nome: "Jequitibá",
    preco: 1000,
    retorno: 3000,
    emojiMuda: "🪴",
    emojiAdulto: "🪵",
    frutos: "🍊",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 5,
    valorColheita: 10,
    descricao: "Árvores milenares valiosas que produzem frutos cítricos.",
    historia: "Podem viver mais de 1000 anos. A exploração madeireira e o desmatamento ameaçam essas gigantes da floresta.",
    vitalidade: 25,
    risco: "Vulnerável"
  },
  {
    nome: "Mogno",
    preco: 9000,
    retorno: 15000,
    emojiMuda: "🌿",
    emojiAdulto: "🌴",
    frutos: "🍒",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 7,
    valorColheita: 20,
    descricao: "Madeira de lei valiosa que produz frutos vermelhos.",
    historia: "Leva 80 anos para crescer. O corte ilegal na Amazônia colocou esta espécie em risco.",
    vitalidade: 20,
    risco: "Em perigo"
  },
  {
    nome: "Pau-rosa",
    preco: 1000000,
    retorno: 0,
    emojiMuda: "🌱",
    emojiAdulto: "🌸",
    frutos: "🌺",
    podeColher: false,
    descricao: "Usada em perfumaria, produz flores raras.",
    historia: "Produz 1kg de óleo/ano. A extração predatória do óleo essencial quase a extinguiu.",
    vitalidade: 30,
    risco: "Em perigo"
  },
  {
    nome: "Ipê Amarelo",
    preco: 5000,
    retorno: 10000,
    emojiMuda: "🌱",
    emojiAdulto: "🌳",
    frutos: "🍋",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 5,
    valorColheita: 15,
    descricao: "Árvore nativa do Brasil, conhecida por suas flores amarelas.",
    historia: "O Ipê Amarelo é uma árvore icônica do Brasil, frequentemente encontrada em florestas tropicais.",
    vitalidade: 20,
    risco: "Vulnerável"
  }
];

// ÁRVORES DISPONÍVEIS - PLANTIO 2 (FRUTAS)
const arvoresFrutas = [
  {
    nome: "Macieira",
    preco: 50,
    retorno: 100,
    emojiMuda: "🌱",
    emojiAdulto: "🌳",
    frutos: "🍎",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 5,
    valorColheita: 10,
    descricao: "Árvore frutífera que produz maçãs deliciosas.",
    historia: "Originária da Ásia Central, adaptou-se bem ao clima temperado.",
    vitalidade: 10,
    risco: "Não ameaçada"
  },
  {
    nome: "Pereira",
    preco: 60,
    retorno: 120,
    emojiMuda: "🌱",
    emojiAdulto: "🌳",
    frutos: "🍐",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 5,
    valorColheita: 12,
    descricao: "Produz peras suculentas e nutritivas.",
    historia: "Cultivada desde a antiguidade em várias partes do mundo.",
    vitalidade: 12,
    risco: "Não ameaçada"
  },
  {
    nome: "Laranjeira",
    preco: 40,
    retorno: 80,
    emojiMuda: "🌱",
    emojiAdulto: "🌳",
    frutos: "🍊",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 7,
    valorColheita: 8,
    descricao: "Árvore cítrica que produz laranjas ricas em vitamina C.",
    historia: "Originária da Ásia, foi trazida para o Brasil pelos portugueses.",
    vitalidade: 15,
    risco: "Não ameaçada"
  },
  {
    nome: "Limoeiro",
    preco: 45,
    retorno: 90,
    emojiMuda: "🌱",
    emojiAdulto: "🌳",
    frutos: "🍋",
    podeColher: true,
    colheitas: 0,
    maxColheitas: 7,
    valorColheita: 9,
    descricao: "Produz limões azedinhos e versáteis na culinária.",
    historia: "Originário do sudeste da Ásia, adaptou-se bem ao clima brasileiro.",
    vitalidade: 12,
    risco: "Não ameaçada"
  }
];

// MISSÕES DA DONA MARIA E EVA
const missoesDonaMaria = [
  {
    id: 1,
    titulo: "Colher Frutas",
    descricao: "Dona Maria precisa de 5 frutos para fazer uma torta",
    objetivo: 5,
    recompensa: 20,
    itemRequerido: "🍐",
    emoji: "🧓🏽"
  },
  {
    id: 2,
    titulo: "Salada de Frutas",
    descricao: "Dona Maria quer fazer uma salada, precisa de 10 frutos",
    objetivo: 10,
    recompensa: 40,
    itemRequerido: "🍐",
    emoji: "🧓🏽"
  },
  {
    id: 3,
    titulo: "Compota Especial",
    descricao: "Dona Maria está preparando sua famosa compota, precisa de 15 frutos",
    objetivo: 15,
    recompensa: 60,
    itemRequerido: "🍐",
    emoji: "🧓🏽"
  },
  {
    id: 4,
    titulo: "Suco de Laranja",
    descricao: "Dona Maria quer fazer suco natural, precisa de 8 laranjas",
    objetivo: 8,
    recompensa: 80,
    itemRequerido: "🍊",
    emoji: "🧓🏽",
    requisito: "Floresta Sustentável"
  },
  {
    id: 5,
    titulo: "Geleia de Cereja",
    descricao: "Dona Maria vai fazer geleia artesanal, precisa de 12 cerejas",
    objetivo: 12,
    recompensa: 150,
    itemRequerido: "🍒",
    emoji: "🧓🏽",
    requisito: "Floresta Sustentável"
  },
  {
    id: 6,
    titulo: "Arranjo de Flores",
    descricao: "Dona Maria quer decorar a casa, precisa de 5 flores raras",
    objetivo: 5,
    recompensa: 200,
    itemRequerido: "🌺",
    emoji: "🧓🏽",
    requisito: "Pau-rosa"
  },
  {
    id: 7,
    titulo: "Plantar Árvores",
    descricao: "Eva quer te ajudar! Plante 10 árvores para ganhar R$100",
    objetivo: 10,
    recompensa: 100,
    emoji: "🧕🏽"
  }
];

// ANIMAIS RAROS
const animaisRaros = [
  { emoji: "🦜", nome: "Arara Azul", raridade: "Raro", descricao: "Espécie ameaçada que depende de árvores altas para nidificação." },
  { emoji: "🐆", nome: "Onça-pintada", raridade: "Muito Raro", descricao: "Topo da cadeia alimentar, indicador de ecossistema saudável." },
  { emoji: "🦥", nome: "Bicho-preguiça", raridade: "Raro", descricao: "Depende da floresta para sobreviver, se move lentamente." },
  { emoji: "🦉", nome: "Coruja-das-torres", raridade: "Raro", descricao: "Controladora natural de roedores." },
  { emoji: "🐺", nome: "Lobo-guará", raridade: "Muito Raro", descricao: "Espécie ameaçada que precisa de grandes áreas preservadas." },
  { emoji: "🦚", nome: "Pavão", raridade: "Raro", descricao: "Ave exótica que indica equilíbrio ecológico." },
  { emoji: "🦩", nome: "Flamingo", raridade: "Muito Raro", descricao: "Vive em áreas alagadas e é sensível a mudanças ambientais." },
  { emoji: "🦨", nome: "Gambá", raridade: "Raro", descricao: "Controlador natural de pragas e importante dispersor de sementes." },
  { emoji: "🦝", nome: "Guaxinim", raridade: "Raro", descricao: "Indicador de áreas preservadas com recursos hídricos." },
  { emoji: "🦫", nome: "Castor", raridade: "Muito Raro", descricao: "Engenheiro do ecossistema, cria habitats para outras espécies." }
];

// FRUTOS DA CIDADE
const frutosCidade = {
  "🍎": { nome: "Maçã", valor: 10, meta: 20 },
  "🍇": { nome: "Uva", valor: 15, meta: 15 },
  "🍓": { nome: "Morango", valor: 20, meta: 10 },
  "🍉": { nome: "Melancia", valor: 30, meta: 5 }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(min(18, windowWidth/40));
  ajustarTamanhos();

  // Ajusta espaçamento mínimo baseado no dispositivo
  ESPACAMENTO_MINIMO = dispositivo === 'computador' ? 100 : 70;

  // Inicializa elementos
  for (let i = 0; i < 10; i++) {
    nuvens.push({ 
      x: Math.random() * width, 
      y: Math.random() * height/3, 
      size: Math.random() * 70 + 50, 
      speed: Math.random() * 0.3 + 0.2 
    });
    estrelas.push({ 
      x: Math.random() * width, 
      y: Math.random() * height/2, 
      size: Math.random() * 2 + 1, 
      twinkle: Math.random() * 0.2 + 0.1 
    });
  }

  // Inicializa carros para a cena da cidade
  for (let i = 0; i < 5; i++) {
    carros.push({
      x: Math.random() * width,
      y: height * 0.8 + Math.random() * 10 - 5,
      speed: Math.random() * 2 + 1,
      color: color(Math.random() * 105 + 150, Math.random() * 105 + 150, Math.random() * 105 + 150)
    });
  }

  // Configura dimensões do celular
  celular.width = Math.min(width * 0.8, 400);
  celular.height = celular.width * 1.8;
  celular.x = width/2 - celular.width/2;
  celular.y = height/2 - celular.height/2;

  // Inicializa área plantável
  atualizarAreaPlantavel();

  // Inicializa missões e animais
  gerarMissoes();
  gerarAnimais();
}

function gerarAnimais() {
  animais = [];
  animalRaroVisivel = null;

  // Chance de aparecer um animal raro baseada na vitalidade do terreno
  if (arvoresPlantadas.length > 0) {
    let chanceAnimal = vitalidadeTerreno / 20; // 5% a 100% de chance
    if (Math.random() * 100 < chanceAnimal) {
      let animalRaro = animaisRaros[Math.floor(Math.random() * animaisRaros.length)];
      animalRaroVisivel = {
        ...animalRaro,
        x: Math.random() * width * 0.6 + width * 0.2,
        y: Math.random() * height * 0.4 + height * 0.4
      };
    }
  }
}

function gerarMissoes() {
  // Limpa missões antigas
  missoes = [];

  // Filtra missões disponíveis com base nos requisitos
  let missoesDisponiveis = missoesDonaMaria.filter(missao => {
    if (!missao.requisito) return true;
    if (missao.requisito === "Pau-rosa") return fimDeJogo;
    return tecnologiasDesbloqueadas.includes(missao.requisito);
  });

  // Adiciona 3 missões aleatórias
  for (let i = 0; i < 3 && missoesDisponiveis.length > 0; i++) {
    let randomIndex = Math.floor(Math.random() * missoesDisponiveis.length);
    missoes.push(missoesDisponiveis[randomIndex]);
    missoesDisponiveis.splice(randomIndex, 1);
  }
}

function atualizarAreaPlantavel() {
  areaPlantavel.x = 0;
  areaPlantavel.width = width;

  // Define a área plantável baseada no nível
  if (areaPlantavel.nivel === 1) {
    areaPlantavel.y = height * 0.4;
    areaPlantavel.height = height * 0.6 - 150;
  } else if (areaPlantavel.nivel === 2) {
    areaPlantavel.y = height * 0.3;
    areaPlantavel.height = height * 0.7 - 150;
  } else if (areaPlantavel.nivel === 3) {
    areaPlantavel.y = height * 0.2;
    areaPlantavel.height = height * 0.8 - 150;
  }
}

function expandirTerreno() {
  if (areaPlantavel.nivel < 3) {
    areaPlantavel.nivel++;
    atualizarAreaPlantavel();
    terrenoExpandido = true;
  }
}

function reorganizarArvores() {
  let espacamento = ESPACAMENTO_MINIMO;
  
  // Aplica redução de espaçamento das tecnologias
  if (tecnologiasDesbloqueadas.includes("Agrofloresta Básica")) {
    espacamento *= 0.7;
  }
  if (tecnologiasDesbloqueadas.includes("Sistema Agroflorestal")) {
    espacamento *= 0.5;
  }
  
  // Organiza as árvores em fileiras
  let colunas = Math.floor(areaPlantavel.width / espacamento);
  let linhas = Math.ceil(arvoresPlantadas.length / colunas);
  
  for (let i = 0; i < arvoresPlantadas.length; i++) {
    let col = i % colunas;
    let lin = Math.floor(i / colunas);
    
    arvoresPlantadas[i].x = areaPlantavel.x + espacamento/2 + col * espacamento;
    arvoresPlantadas[i].y = areaPlantavel.y + espacamento/2 + lin * espacamento;
  }
}

function ajustarTamanhos() {
  emojiSize = dispositivo === 'computador' ? Math.min(width * 0.08, 80) : Math.min(width * 0.12, 60);
  if (windowWidth < 500) emojiSize = Math.min(width * 0.15, 50);
}

function draw() {
  // Animação de fade
  if (fadeState === 1) {
    fadeAlpha += 5;
    if (fadeAlpha >= 255) {
      fadeState = 2;
      setTimeout(() => { fadeState = 3; }, TEMPO_ANALISE);
    }
  } else if (fadeState === 3) {
    fadeAlpha -= 5;
    if (fadeAlpha <= 0) {
      fadeState = 0;
      if (tela === "historia") tela = "receberDinheiro";
      else if (tela === "receberDinheiro") tela = "feira";
      else if (tela === "analise") tela = "sitio";
    }
  }

  background(255);

  if (fimDeJogo) {
    desenharTelaFimDeJogo();
  } else if (mostrarInstrucoes) {
    desenharInstrucoes();
  } else if (mostrarMissaoEva) {
    desenharMissaoEva();
  } else if (tela === "inicio") desenharTelaInicio();
  else if (tela === "dispositivo") desenharTelaDispositivo();
  else if (tela === "genero") desenharTelaGenero();
  else if (tela === "personagem") desenharTelaPersonagem();
  else if (tela === "nome") desenharTelaNome();
  else if (tela === "cidade") desenharTelaCidade();
  else if (tela === "mensagemCelular") desenharMensagemCelular();
  else if (tela === "viagem") desenharCenaViagem();
  else if (tela === "historia") desenharHistoria();
  else if (tela === "receberDinheiro") desenharCenaInicial();
  else if (tela === "feira") desenharFeira();
  else if (tela === "plantio") desenharPlantio();
  else if (tela === "analise") desenharAnalise();
  else if (tela === "sitio") desenharSitio();
  else if (tela === "tecnologias") desenharTelaTecnologias();
  else if (tela === "missoes") desenharTelaMissoes();
  else if (tela === "vendaFeira") desenharVendaFeira();

  // Desenha árvore sendo arrastada
  if (arvoreSelecionada) {
    desenharArvore(mouseX, mouseY, {
      ...arvoreSelecionada,
      growthStage: 0.5,
      adulta: false
    });

    // Feedback de posição
    if (!posicaoValida(mouseX, mouseY)) {
      fill(255, 0, 0, 100);
      rect(mouseX - 35, mouseY - 35, 70, 70);
    }
  }

  // Mostra informações da árvore se necessário
  if (mostrarInfoArvore !== null) {
    desenharInfoArvore(mostrarInfoArvore);
  }

  // Mostra informações de tecnologia se necessário
  if (mostrarInfoTecnologia !== null) {
    desenharInfoTecnologia(mostrarInfoTecnologia);
  }

  // Mostra bolsa com frutos colhidos se aberta
  if (mostrarBolsa) {
    desenharBolsa();
  }

  // Mostra mensagem de análise temporária
  if (mostrarAnalise !== null) {
    mostrarAnalise.timer--;
    if (mostrarAnalise.timer > 0) {
      fill(0, 0, 0, 150);
      rect(width/2 - 150, height/2 - 50, 300, 60, 10);
      fill(255);
      textSize(14);
      text(mostrarAnalise.msg, width/2, height/2 - 30);
    } else {
      mostrarAnalise = null;
    }
  }

  // Mostra informações do animal raro se clicado
  if (animalRaroVisivel && mostrarInfoArvore === null && mostrarInfoTecnologia === null) {
    desenharAnimalRaro();
  }

  // Efeito de fade
  if (fadeState > 0) {
    fill(0, 0, 0, fadeAlpha);
    rect(0, 0, width, height);

    if (fadeState === 2) {
      fill(255);
      textSize(24);
      text(mensagemLucro, width/2, height/2);
      textSize(18);
      text(`Lucro: R$${lucroDia}`, width/2, height/2 + 40);
    }
  }

  tempo += 0.01;
  atualizarCrescimento();
  atualizarVitalidade();

  // Atualiza fade-in do texto na cena inicial
  if (tela === "receberDinheiro" && fadeInText < 255) {
    fadeInText += 3;
  }
}

function desenharMissaoEva() {
  fill(255, 230);
  rect(width/2 - 250, height/2 - 150, 500, 300, 20);
  fill(0);
  textSize(24);
  text("Missão da Eva", width/2, height/2 - 120);
  
  textSize(18);
  text("🧕🏽 Eva quer te ajudar!", width/2, height/2 - 80);
  text("Plante 10 árvores para ganhar R$100", width/2, height/2 - 50);
  text("Você pode completar essa missão", width/2, height/2 - 20);
  text("plantando árvores no sítio.", width/2, height/2 + 10);
  
  fill(100, 200, 100);
  rect(width/2 - 80, height/2 + 80, 160, 50, 15);
  fill(255);
  textSize(18);
  text("OK", width/2, height/2 + 105);
}

function desenharTelaFimDeJogo() {
  background(50, 100, 50);

  fill(255);
  textSize(dispositivo === 'computador' ? 36 : 24);
  text("FIM DE JOGO", width/2, height/2 - 100);

  textSize(dispositivo === 'computador' ? 18 : 14);
  text("Parabéns por completar o desafio!", width/2, height/2 - 40);
  text("Você ajudou a restaurar o sítio e preservar", width/2, height/2);
  text("espécies ameaçadas de extinção.", width/2, height/2 + 40);

  textSize(dispositivo === 'computador' ? 16 : 12);
  text("A preservação da biodiversidade é essencial", width/2, height/2 + 100);
  text("para o equilíbrio do nosso planeta.", width/2, height/2 + 130);
  text("Cada árvore plantada faz diferença!", width/2, height/2 + 160);

  // Mensagem motivacional sobre extinção
  textSize(dispositivo === 'computador' ? 14 : 12);
  text("Muitas espécies estão desaparecendo devido", width/2, height/2 + 200);
  text("à ação humana. Preservar a natureza não é", width/2, height/2 + 230);
  text("apenas um ato de amor, mas uma necessidade", width/2, height/2 + 260);
  text("para a sobrevivência de todos nós.", width/2, height/2 + 290);

  // Botão para reiniciar
  fill(100, 200, 100);
  rect(width/2 - 100, height - 100, 200, 60, 15);
  fill(255);
  textSize(16);
  text("Jogar Novamente", width/2, height - 70);
}

function desenharInstrucoes() {
  fill(255, 230);
  rect(width/2 - 200, height/2 - 150, 400, 300, 20);
  fill(0);
  textSize(20);
  text("INSTRUÇÕES DO JOGO", width/2, height/2 - 120);

  textSize(14);
  textAlign(LEFT);
  text("1. Compre árvores na feira usando seu dinheiro.", width/2 - 180, height/2 - 80);
  text("2. Plante as árvores no sítio arrastando-as.", width/2 - 180, height/2 - 50);
  text("3. Espere as árvores crescerem e colha os frutos.", width/2 - 180, height/2 - 20);
  text("4. Complete missões para ganhar recompensas.", width/2 - 180, height/2 + 10);
  text("5. Use tecnologias para melhorar seu sítio.", width/2 - 180, height/2 + 40);

  // Botão de fechar
  fill(200, 50, 50);
  rect(width/2 - 40, height/2 + 120, 80, 40, 10);
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("OK", width/2, height/2 + 140);

  textAlign(CENTER);
}

function desenharTelaInicio() {
  fill(0);
  textSize(Math.min(width * 0.06, 22));
  text("BEM-VINDO AO SÍTIO DO SEU ZÉ", width/2, height * 0.4);

  fill(100, 200, 100);
  rect(width/2 - 150, height * 0.6, 300, 60, 20);
  fill(255);
  textSize(Math.min(width * 0.05, 18));
  text("COMEÇAR", width/2, height * 0.6 + 30);
}

function desenharTelaDispositivo() {
  fill(0);
  textSize(Math.min(width * 0.06, 22));
  text("ESCOLHA SEU DISPOSITIVO", width/2, height * 0.2);

  fill(150, 200, 255);
  rect(width/2 - 150, height * 0.4, 140, 60, 15);
  fill(0);
  textSize(Math.min(width * 0.05, 18));
  text("CELULAR", width/2 - 80, height * 0.4 + 30);

  fill(200, 150, 255);
  rect(width/2 + 10, height * 0.4, 140, 60, 15);
  fill(0);
  text("COMPUTADOR", width/2 + 80, height * 0.4 + 30);
}

function desenharTelaGenero() {
  fill(0);
  textSize(Math.min(width * 0.06, 22));
  text("ESCOLHA SEU GÊNERO", width/2, height * 0.2);

  fill(255, 150, 200);
  rect(width/2 - 150, height * 0.4, 140, 60, 15);
  fill(0);
  textSize(Math.min(width * 0.05, 18));
  text("FEMININO", width/2 - 80, height * 0.4 + 30);

  fill(150, 200, 255);
  rect(width/2 + 10, height * 0.4, 140, 60, 15);
  fill(0);
  text("MASCULINO", width/2 + 80, height * 0.4 + 30);
}

function desenharTelaPersonagem() {
  fill(0);
  textSize(Math.min(width * 0.05, 20));
  text("ESCOLHA SEU PERSONAGEM", width/2, 50);

  let lista = personagens[generoSelecionado].emojis;
  let espacamento = width * 0.2;
  let startX = width * 0.1;

  // Fundo para melhorar a visibilidade do texto
  fill(255, 200);
  rect(0, 0, width, 80);
  fill(0);
  textSize(Math.min(width * 0.05, 20));
  text("ESCOLHA SEU PERSONAGEM", width/2, 40);

  for (let i = 0; i < lista.length; i++) {
    let x = startX + (i * espacamento);
    let y = height * 0.4;

    if (lista[i] === personagemSelecionado) {
      fill(generoSelecionado === "feminino" ? color(255, 200, 230) : color(200, 230, 255));
      circle(x, y - 10, emojiSize + 20);
    }

    textSize(emojiSize);
    fill(0);
    text(lista[i], x, y);
  }
}

function desenharTelaNome() {
  fill(0);
  textSize(Math.min(width * 0.05, 20));
  text("ESCOLHA SEU NOME", width/2, 50);

  textSize(emojiSize * 1.5);
  text(personagemSelecionado, width/2, height * 0.2);

  let nomes = personagens[generoSelecionado].nomes;
  let espacamento = height * 0.12;
  let startY = height * 0.4;

  for (let i = 0; i < nomes.length; i++) {
    let y = startY + (i * espacamento);
    let nomeAtual = nomes[i];

    if (nomeAtual === nomeSelecionado) {
      fill(200, 230, 255);
      rect(width/2 - 150, y - 25, 300, 40, 10);
    }

    fill(0);
    textSize(Math.min(width * 0.04, 16));
    text(nomeAtual, width/2, y);
  }

  if (nomeSelecionado) {
    fill(100, 200, 100);
    rect(width/2 - 80, height * 0.9, 160, 50, 15);
    fill(255);
    text("CONFIRMAR", width/2, height * 0.925);
  }
}

function desenharTelaCidade() {
  // Fundo da cidade moderno
  background(30, 30, 50);
  
  // Prédios no fundo
  fill(50, 50, 70);
  rect(0, height * 0.3, width * 0.2, height * 0.5);
  rect(width * 0.25, height * 0.2, width * 0.15, height * 0.6);
  rect(width * 0.45, height * 0.4, width * 0.2, height * 0.4);
  rect(width * 0.7, height * 0.25, width * 0.3, height * 0.55);
  
  // Janelas iluminadas
  for (let i = 0; i < 50; i++) {
    fill(Math.random() * 155 + 100, Math.random() * 155 + 100, Math.random() * 100 + 150);
    let x, y, w = 5, h = 8;
    
    if (i < 15) {
      x = width * 0.05 + Math.random() * width * 0.1;
      y = height * 0.35 + Math.random() * height * 0.4;
    } else if (i < 30) {
      x = width * 0.325 + Math.random() * width * 0.1;
      y = height * 0.25 + Math.random() * height * 0.5;
    } else if (i < 40) {
      x = width * 0.55 + Math.random() * width * 0.1;
      y = height * 0.45 + Math.random() * height * 0.3;
    } else {
      x = width * 0.85 + Math.random() * width * 0.2;
      y = height * 0.3 + Math.random() * height * 0.45;
    }
    
    rect(x, y, w, h);
  }
  
  // Rua
  fill(40, 40, 50);
  rect(0, height * 0.8, width, height * 0.2);
  
  // Faixas da rua
  fill(255, 255, 0);
  for (let i = 0; i < 5; i++) {
    rect(width * 0.2 * i, height * 0.9, 50, 10);
  }
  
  // Carros se movendo na rua
  for (let carro of carros) {
    carro.x += carro.speed;
    if (carro.x > width + 50) carro.x = -50;

    fill(carro.color);
    rect(carro.x, carro.y, 60, 30, 5);
    fill(0);
    rect(carro.x + 5, carro.y - 15, 50, 15, 3);
    circle(carro.x + 10, carro.y + 30, 20);
    circle(carro.x + 50, carro.y + 30, 20);
  }

  // Personagem
  textSize(emojiSize * 1.5);
  text(personagemSelecionado, width * 0.8, height * 0.8);

  // Botão de continuar
  fill(100, 200, 100);
  rect(width/2 - 100, height - 100, 200, 60, 10);
  fill(255);
  textSize(14);
  text("Ver mensagem", width/2, height - 70);
}

function desenharMensagemCelular() {
  // Celular
  fill(20);
  rect(celular.x, celular.y, celular.width, celular.height, 20);

  // Tela do celular
  fill(230);
  rect(celular.x + 10, celular.y + 10, celular.width - 20, celular.height - 20);

  // Cabeçalho
  fill(50, 100, 200);
  rect(celular.x + 10, celular.y + 10, celular.width - 20, 50);
  fill(255);
  textSize(14);
  text("Nova Mensagem", celular.x + celular.width/2, celular.y + 35);

  // Corpo da mensagem
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  text("Olá " + nomeSelecionado + "!\n\nSeu tio Zé e Dona Maria precisam de ajuda urgente!\nA tempestade destruiu quase tudo no sítio.\nVocê pode ir lá ajudá-los?",
       celular.x + 30, celular.y + 80);
  textAlign(CENTER, CENTER);

  // Botões
  fill(200, 50, 50);
  rect(celular.x + celular.width/2 - 120, celular.y + 400, 100, 50, 5);
  fill(255);
  text("Não", celular.x + celular.width/2 - 70, celular.y + 425);

  fill(50, 200, 50);
  rect(celular.x + celular.width/2 + 20, celular.y + 400, 100, 50, 5);
  fill(255);
  text("Sim", celular.x + celular.width/2 + 70, celular.y + 425);
}

function desenharCenaViagem() {
  background(100, 150, 255);

  // Estrada
  fill(80, 80, 80);
  rect(0, height * 0.7, width, height * 0.3);
  fill(255, 255, 0);
  for (let i = 0; i < 5; i++) {
    rect(width * 0.2 * i, height * 0.85, 50, 10);
  }

  // Personagem viajando
  let posX = (frameCount * 2) % (width + 100) - 50;
  textSize(emojiSize * 1.5);
  text(personagemSelecionado, posX, height * 0.7);

  if (posX > width) {
    tela = "historia";
    cena = 0;
    fade = 0;
  }
}

function desenharHistoria() {
  historia[0].msg = nomeSelecionado + ", você chegou ao sítio e encontra Seu Zé e Dona Maria...";

  switch(historia[cena].tema) {
    case "chegada": drawChegada(); break;
    case "amanhecer": drawAmanhecer(); break;
    case "dia": drawDiaEnsolarado(); break;
    case "tempestade": drawTempestade(); break;
    case "destruicao": drawNoiteTriste(); break;
    case "recuperacao": drawTardeTranquila(); break;
    case "porDoSol": drawPorDoSol(); break;
  }

  if (fade < 255) fade += 3;

  // Fundo escuro para o texto
  fill(0, 0, 0, fade * 0.7);
  rectMode(CENTER);
  rect(width/2, height/4, Math.min(width * 0.9, 600), 100, 20);

  fill(255, 255, 255, fade);
  textSize(Math.min(16, width/30));
  text(historia[cena].msg, width/2, height/4);
  rectMode(CORNER);

  // Emoji centralizado
  textSize(60);
  text(historia[cena].emoji, width/2, height/2);

  if (fade >= 255) {
    fill(255, 255, 255, fade);
    textSize(14);
    text("Toque para continuar...", width/2, height-40);
  }
}

// CENÁRIOS DA HISTÓRIA
function drawChegada() {
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(150, 150, 150), color(100, 70, 40), map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }

  // Casa simples
  fill(120, 80, 40);
  rect(width * 0.3, height * 0.5, 200, 150);
  fill(80, 40, 10);
  triangle(width * 0.3, height * 0.5, width * 0.5, height * 0.4, width * 0.7, height * 0.5);
}

function drawAmanhecer() {
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(5, 5, 30), color(250, 150, 50), map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }

  fill(255, 200, 0);
  circle(width/2, constrain(height - (tempo % 500), 0, height/3), 80);
}

function drawDiaEnsolarado() {
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(100, 200, 255), color(200, 230, 255), map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }

  drawNuvens();

  fill(50, 150, 50);
  rect(0, height * 0.7, width, height * 0.3); // Terra reta
}

function drawTempestade() {
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(30, 30, 50), color(70, 70, 90), map(y, 0, height*0.7, 0, 1)));
    line(0, y, width, y);
  }

  stroke(150, 150, 255, 120);
  for (let i = 0; i < 200; i++) {
    let x = (frameCount * 2 + i * 10) % (width + 200) - 100;
    let y = (frameCount * 5 + i * 5) % (height + 100);
    line(x, y, x-20, y+30);
  }
}

function drawNoiteTriste() {
  background(5, 5, 30);

  for (let estrela of estrelas) {
    let brilho = 255 * Math.abs(Math.sin(frameCount * estrela.twinkle));
    fill(255, 255, 255, brilho);
    circle(estrela.x, estrela.y, estrela.size);
  }
}

function drawTardeTranquila() {
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(150, 200, 255), color(250, 150, 50), map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }

  fill(255, 200, 0);
  circle(width/2, height * 0.8, 80);

  drawNuvens();
}

function drawPorDoSol() {
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(250, 50, 0), color(10, 0, 50), map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }

  fill(255, 100, 0);
  circle(width/2, height*0.8, 100);
}

function drawNuvens() {
  fill(255, 255, 255, 180);
  noStroke();
  for (let nuvem of nuvens) {
    nuvem.x += nuvem.speed;
    if (nuvem.x > width + 100) nuvem.x = -100;

    for (let i = 0; i < 5; i++) {
      ellipse(nuvem.x + Math.random() * 40 - 20, nuvem.y + Math.random() * 20 - 10, nuvem.size * 0.8, nuvem.size * 0.5);
    }
  }
}

function desenharCenaInicial() {
  desenharTerrenoArido();

  textSize(80);
  text("🏚️", width/2, height/2 - 50);
  textSize(40);
  text("👨‍🌾", width/2 - 50, height/2 + 80);
  text("🧓🏽", width/2 + 50, height/2 + 80);

  // Texto com fade-in
  fill(255, fadeInText);
  rect(width/2 - 200, height/2 + 120, 400, 100, 20);
  fill(0, fadeInText);
  textSize(14);
  text("Tome esses R$5 para comprar", width/2, height/2 + 140);
  text("sementes e recuperar a terra!", width/2, height/2 + 170);

  fill(100, 200, 100, fadeInText);
  rect(width/2 - 100, height * 0.8, 200, 60, 15);
  fill(255, fadeInText);
  textSize(16);
  text("Ir à feira", width/2, height * 0.8 + 30);
}

function desenharFeira() {
  drawGradienteVertical(color(135, 206, 235), color(160, 190, 120));

  fill(0);
  textSize(22);
  text("FEIRA DE SEMENTES RARAS", width/2, 60);

  // Mostra árvores do plantio ativo
  let arvoresParaMostrar = plantioAtivo === 1 ? arvores : arvoresFrutas;
  
  let startY = 100;
  for (let i = 0; i < arvoresParaMostrar.length; i++) {
    let y = startY + i * 120;
    if (y < height - 100) {
      fill(240);
      rect(width/2 - 180, y - 20, 360, 100, 15);

      fill(0);
      textSize(16);
      text(`${arvoresParaMostrar[i].emojiMuda} ${arvoresParaMostrar[i].nome}`, width/2, y);
      textSize(14);
      text(`R$${arvoresParaMostrar[i].preco} → R$${arvoresParaMostrar[i].retorno}`, width/2, y + 30);

      // Botão de compra
      if (dinheiro >= arvoresParaMostrar[i].preco) fill(50, 200, 50);
      else fill(200, 50, 50);
      rect(width/2 - 50, y + 50, 100, 40, 5);
      fill(255);
      textSize(12);
      text("Comprar", width/2, y + 70);

      // Botão de informações
      fill(100, 150, 255);
      rect(width/2 - 150, y + 50, 40, 40, 5);
      fill(255);
      textSize(16);
      text("ℹ️", width/2 - 130, y + 70);
    }
  }

  // Botões de navegação inferiores
  fill(100, 150, 255);
  rect(30, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Sítio", 105, height - 50);

  if (arvoresCompradas.length > 0) {
    fill(100, 200, 100);
    rect(width - 180, height - 80, 150, 60, 15);
    fill(255);
    textSize(14);
    text(`Plantar (${arvoresCompradas.length})`, width - 105, height - 50);
  }

  // Botões superiores (direita)
  fill(100, 100, 200);
  rect(width - 280, 30, 100, 40, 10);
  fill(255);
  textSize(12);
  text("Tecnologias", width - 230, 50);

  // Botões superiores (esquerda) - Ajustado para não sobrepor
  fill(200, 150, 100);
  rect(30, 60, 100, 40, 10); // Movido para baixo
  fill(255);
  textSize(12);
  text("Missões", 80, 80);

  fill(150, 100, 200);
  rect(140, 60, 100, 40, 10); // Movido para baixo
  fill(255);
  textSize(12);
  text("Ir à Cidade", 190, 80);

  // Dinheiro no canto superior direito
  textSize(20);
  text("💵", width - 50, 40);
  fill(0);
  textSize(14);
  text(`R$${dinheiro}`, width - 50, 70);

  // Bolsa no canto superior direito
  textSize(30);
  text("🎒", width - 100, 50);
}

function desenharPlantio() {
  // Fundo de terra para o plantio
  fill(150, 100, 50);
  rect(0, 0, width, height);

  // Desenha área plantável com borda
  noFill();
  stroke(0, 100);
  strokeWeight(2);
  rect(areaPlantavel.x, areaPlantavel.y, areaPlantavel.width, areaPlantavel.height);

  // Texto da área plantável
  fill(255);
  textSize(14);
  text(`Área plantável (Nível ${areaPlantavel.nivel}) - Plantio ${plantioAtivo}`, width/2, areaPlantavel.y + 20);

  // Desenha casa
  textSize(80);
  text("🏚️", width/2, height - 100);

  // Desenha árvores plantadas
  for (let arv of arvoresPlantadas) {
    desenharArvore(arv.x, arv.y, arv);
  }

  // Painel de informações
  fill(255, 230);
  rect(width/2 - 200, 50, 400, 80, 20);
  fill(0);
  textSize(14);

  if (arvoresCompradas.length > 0) {
    let infoText = arvoresCompradas
      .reduce((acc, arv) => {
        acc[arv.nome] = (acc[arv.nome] || 0) + 1;
        return acc;
      }, {});

    text(Object.entries(infoText).map(([nome, qtd]) => `${qtd}x ${nome}`).join('\n'),
         width/2, 70);
  }

  // Mostra instrução apenas se não tiver árvores plantadas
  if (arvoresPlantadas.length === 0) {
    text("Arraste para plantar", width/2, 100);
  }

  // Botões de navegação inferiores
  fill(100, 150, 255);
  rect(30, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Feira", 105, height - 50);

  fill(200, 100, 100);
  rect(width - 180, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Finalizar", width - 105, height - 50);

  // Botão reorganizar
  fill(150, 100, 200);
  rect(width/2 - 75, height - 150, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Reorganizar", width/2, height - 120);

  // Botão Plantio 2 se desbloqueado
  if (mostrarBotaoPlantio2) {
    fill(plantioAtivo === 1 ? color(100, 200, 100) : color(200, 200, 100));
    rect(width/2 - 75, height - 220, 150, 60, 15);
    fill(0);
    textSize(14);
    text(plantioAtivo === 1 ? "Ir para Plantio 2" : "Voltar para Plantio 1", width/2, height - 190);
  }
}

function desenharSitio() {
  // Desenha o terreno com base no horário do dia
  switch(horarioDia) {
    case "manha":
      drawGradienteVertical(color(150, 200, 255), color(200, 230, 200));
      break;
    case "tarde":
      drawGradienteVertical(color(250, 150, 50), color(200, 150, 100));
      break;
    case "noite":
      drawGradienteVertical(color(10, 10, 40), color(30, 30, 70));
      break;
  }

  // Desenha terra com vitalidade
  let corTerra = lerpColor(color(150, 100, 50), color(100, 150, 50), vitalidadeTerreno/100);
  fill(corTerra);
  rect(0, height * 0.7, width, height * 0.3);

  // Desenha casa
  textSize(80);
  text("🏚️", width/2, height - 100);

  // Desenha árvores
  for (let arv of arvoresPlantadas) {
    desenharArvore(arv.x, arv.y, arv);

    // Mostra botão de colheita se a árvore pode ser colhida
    if (arv.podeColher && arv.adulta && arv.colheitas < arv.maxColheitas) {
      fill(255, 200, 50);
      circle(arv.x, arv.y - 50, 30);
      fill(0);
      textSize(14);
      text("⬇️", arv.x, arv.y - 50);
    }
  }

  // Desenha animal raro se existir
  if (animalRaroVisivel) {
    textSize(30);
    text(animalRaroVisivel.emoji, animalRaroVisivel.x, animalRaroVisivel.y);

    // Efeito de brilho para animal raro
    let brilho = 255 * Math.abs(Math.sin(frameCount * 0.1));
    fill(255, 255, 0, brilho);
    circle(animalRaroVisivel.x, animalRaroVisivel.y - 30, 50);
  }

  // Painel de informações
  fill(255, 230);
  rect(width/2 - 200, 50, 400, 120, 20);
  fill(0);
  textSize(14);
  text(`Sítio do Seu Zé - Dia ${dia} (${horarioDia})`, width/2, 70);
  text(`Árvores plantadas: ${arvoresPlantadas.length}`, width/2, 100);
  text(`Dinheiro disponível: R$${dinheiro}`, width/2, 130);

  // Botões de navegação inferiores
  fill(100, 150, 255);
  rect(30, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Feira", 105, height - 50);

  fill(100, 200, 100);
  rect(width - 180, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Avançar", width - 105, height - 50);

  // Botões superiores (direita)
  fill(100, 100, 200);
  rect(width - 280, 30, 100, 40, 10);
  fill(255);
  textSize(12);
  text("Tecnologias", width - 230, 50);

  // Botões superiores (esquerda) - Ajustado para não sobrepor
  fill(200, 150, 100);
  rect(30, 60, 100, 40, 10); // Movido para baixo
  fill(255);
  textSize(12);
  text("Missões", 80, 80);

  fill(150, 100, 200);
  rect(140, 60, 100, 40, 10); // Movido para baixo
  fill(255);
  textSize(12);
  text("Ir à Cidade", 190, 80);

  // Dinheiro no canto superior direito
  textSize(20);
  text("💵", width - 50, 40);
  fill(0);
  textSize(14);
  text(`R$${dinheiro}`, width - 50, 70);

  // Bolsa no canto superior direito
  textSize(30);
  text("🎒", width - 100, 50);
}

function desenharBolsa() {
  // Desenha a bolsa no canto superior direito
  textSize(30);
  text("🎒", width - 100, 50);
  
  // Dinheiro ao lado da bolsa
  textSize(20);
  text("💵", width - 50, 40);
  fill(0);
  textSize(14);
  text(`R$${dinheiro}`, width - 50, 70);

  // Conta os diferentes tipos de frutos
  let contagemFrutos = {};
  for (let fruto of bolsa) {
    contagemFrutos[fruto] = (contagemFrutos[fruto] || 0) + 1;
  }

  // Mostra quantidade de frutos na bolsa
  fill(255, 230);
  rect(width - 170, 80, 160, 30 + Object.keys(contagemFrutos).length * 20, 5);
  fill(0);
  textSize(12);
  let yPos = 90;
  text("Bolsa:", width - 90, yPos);
  yPos += 20;
  
  for (let fruto in contagemFrutos) {
    text(`${contagemFrutos[fruto]}x ${fruto}`, width - 90, yPos);
    yPos += 20;
  }
}

function desenharTelaTecnologias() {
  drawGradienteVertical(color(100, 150, 200), color(200, 230, 255));

  fill(0);
  textSize(22);
  text("TECNOLOGIAS DISPONÍVEIS", width/2, 60);

  let startY = 100;
  for (let i = 0; i < tecnologias.length; i++) {
    let y = startY + i * 120;
    if (y < height - 100) {
      fill(240);
      rect(width/2 - 180, y - 20, 360, 100, 15);

      fill(0);
      textSize(14);
      text(tecnologias[i].nome, width/2, y - 5);
      textSize(12);
      text(tecnologias[i].descricao, width/2, y + 15);
      text(`Custo: R$${tecnologias[i].custo}`, width/2, y + 35);

      // Verifica requisitos
      let podeComprar = dinheiro >= tecnologias[i].custo &&
                       (!tecnologias[i].requisito || tecnologiasDesbloqueadas.includes(tecnologias[i].requisito));

      // Botão de compra
      if (podeComprar && !tecnologias[i].desbloqueada) fill(50, 200, 50);
      else if (tecnologias[i].desbloqueada) fill(150, 150, 150);
      else fill(200, 50, 50);
      rect(width/2 - 50, y + 50, 100, 40, 5);
      fill(255);
      textSize(12);
      text(tecnologias[i].desbloqueada ? "Desbloqueada" : "Comprar", width/2, y + 70);

      // Botão de informações
      fill(100, 150, 255);
      rect(width/2 - 150, y + 50, 40, 40, 5);
      fill(255);
      textSize(16);
      text("ℹ️", width/2 - 130, y + 70);
    }
  }

  // Botão voltar
  fill(200, 100, 100);
  rect(30, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Voltar", 105, height - 50);
}

function desenharTelaMissoes() {
  drawGradienteVertical(color(200, 230, 200), color(150, 200, 150));

  fill(0);
  textSize(22);
  text("MISSÕES", width/2, 60);

  // Missão ativa
  if (missaoAtiva) {
    fill(240);
    rect(width/2 - 180, 100, 360, 150, 15);

    fill(0);
    textSize(16);
    text(missaoAtiva.titulo, width/2, 120);
    textSize(12);
    text(missaoAtiva.descricao, width/2, 140);
    text(`Progresso: ${progressoMissao}/${missaoAtiva.objetivo}`, width/2, 160);
    text(`Recompensa: R$${missaoAtiva.recompensa}`, width/2, 180);

    // Botão entregar
    if (progressoMissao >= missaoAtiva.objetivo) {
      fill(50, 200, 50);
      rect(width/2 - 80, 200, 160, 40, 10);
      fill(255);
      text("Entregar", width/2, 220);
    } else {
      fill(150, 150, 150);
      rect(width/2 - 80, 200, 160, 40, 10);
      fill(255);
      text("Em progresso", width/2, 220);
    }

    // Botão cancelar
    fill(200, 50, 50);
    rect(width/2 - 80, 250, 160, 40, 10);
    fill(255);
    text("Cancelar", width/2, 270);
  }
  // Lista de missões disponíveis
  else {
    let startY = 100;
    for (let i = 0; i < missoes.length; i++) {
      let y = startY + i * 120;
      if (y < height - 100) {
        fill(240);
        rect(width/2 - 180, y - 20, 360, 100, 15);

        fill(0);
        textSize(14);
        text(missoes[i].titulo, width/2, y - 5);
        textSize(12);
        text(missoes[i].descricao, width/2, y + 15);
        if (missoes[i].objetivo) {
          text(`Objetivo: ${missoes[i].objetivo} ${missoes[i].itemRequerido || ""}`, width/2, y + 35);
        }
        text(`Recompensa: R$${missoes[i].recompensa}`, width/2, y + 55);

        // Botão aceitar
        fill(50, 200, 50);
        rect(width/2 - 50, y + 70, 100, 30, 5);
        fill(255);
        textSize(12);
        text("Aceitar", width/2, y + 85);
      }
    }
  }

  // Botão voltar
  fill(200, 100, 100);
  rect(30, height - 80, 150, 60, 15);
  fill(255);
  textSize(14);
  text("Voltar", 105, height - 50);
}

function desenharVendaFeira() {
  // Fundo da cidade moderno
  background(30, 30, 50);
  
  // Prédios no fundo
  fill(50, 50, 70);
  rect(0, height * 0.3, width * 0.2, height * 0.5);
  rect(width * 0.25, height * 0.2, width * 0.15, height * 0.6);
  rect(width * 0.45, height * 0.4, width * 0.2, height * 0.4);
  rect(width * 0.7, height * 0.25, width * 0.3, height * 0.55);
  
  // Janelas iluminadas
  for (let i = 0; i < 50; i++) {
    fill(Math.random() * 155 + 100, Math.random() * 155 + 100, Math.random() * 100 + 150);
    let x, y, w = 5, h = 8;
    
    if (i < 15) {
      x = width * 0.05 + Math.random() * width * 0.1;
      y = height * 0.35 + Math.random() * height * 0.4;
    } else if (i < 30) {
      x = width * 0.325 + Math.random() * width * 0.1;
      y = height * 0.25 + Math.random() * height * 0.5;
    } else if (i < 40) {
      x = width * 0.55 + Math.random() * width * 0.1;
      y = height * 0.45 + Math.random() * height * 0.3;
    } else {
      x = width * 0.85 + Math.random() * width * 0.2;
      y = height * 0.3 + Math.random() * height * 0.45;
    }
    
    rect(x, y, w, h);
  }

  // Painel de venda
  fill(255, 230);
  rect(width/2 - 200, height/2 - 150, 400, 300, 20);
  fill(0);
  textSize(20);
  text("Feira da Cidade", width/2, height/2 - 120);

  // Lista de frutos disponíveis para venda
  let contagemFrutos = {};
  for (let fruto of bolsa) {
    contagemFrutos[fruto] = (contagemFrutos[fruto] || 0) + 1;
  }

  let startY = height/2 - 80;
  let i = 0;
  for (let fruto in contagemFrutos) {
    let y = startY + i * 60;
    
    // Nome do fruto e quantidade
    textSize(16);
    text(`${fruto} ${contagemFrutos[fruto]}x`, width/2 - 100, y);
    
    // Valor do fruto
    let valor = 0;
    if (fruto === "🍐") valor = 5;
    else if (fruto === "🍊") valor = 10;
    else if (fruto === "🍒") valor = 20;
    else if (fruto === "🍋") valor = 15;
    else if (fruto === "🌺") valor = 50;
    
    text(`R$${valor} cada`, width/2 + 50, y);
    
    // Botão vender
    fill(50, 200, 50);
    rect(width/2 - 40, y + 20, 80, 30, 5);
    fill(255);
    textSize(12);
    text("Vender", width/2, y + 35);
    
    i++;
  }

  // Seção de frutos da cidade (centralizada)
  textSize(16);
  text("Frutos da Cidade:", width/2, height/2 + 100);
  
  let frutosDisponiveis = Object.keys(frutosCidade);
  let espacamento = 60; // Aumentado para melhor espaçamento
  let startX = width/2 - ((frutosDisponiveis.length * espacamento)/2) + (espacamento/2);
  
  for (let j = 0; j < frutosDisponiveis.length; j++) {
    let fruto = frutosDisponiveis[j];
    let x = startX + j * espacamento;
    
    textSize(30);
    text(fruto, x, height/2 + 130);
    
    textSize(12);
    text(`${frutosCidade[fruto].meta}x`, x, height/2 + 160);
    
    // Botão comprar
    fill(100, 150, 255);
    rect(x - 15, height/2 + 180, 30, 30, 5);
    fill(255);
    textSize(12);
    text("+", x, height/2 + 195);
  }

  // Botão voltar
  fill(200, 100, 100);
  rect(width/2 - 80, height/2 + 210, 160, 40, 10);
  fill(255);
  textSize(14);
  text("Voltar", width/2, height/2 + 230);
}

function desenharInfoArvore(arvore) {
  // Fundo do popup
  fill(255, 240);
  rect(width/2 - 200, height/2 - 150, 400, 300, 20);
  stroke(0);
  fill(255);

  // Título
  fill(255); // Texto branco para melhor legibilidade
  textSize(20);
  text(arvore.nome, width/2, height/2 - 120);

  // Emoji da árvore
  textSize(40);
  text(arvore.emojiAdulto, width/2, height/2 - 70);

  // Informações
  textSize(14);
  textAlign(LEFT);
  fill(255); // Texto branco
  text(`Status: ${arvore.risko}`, width/2 - 180, height/2 - 20);
  text(`Vitalidade: +${arvore.vitalidade}%`, width/2 - 180, height/2 + 0);
  text(`Retorno: R$${arvore.retorno}`, width/2 - 180, height/2 + 20);

  // História da árvore (motivo da extinção)
  textSize(12);
  text(arvore.historia, width/2 - 180, height/2 + 50, 360, 150);

  // Botão de fechar
  fill(200, 50, 50);
  rect(width/2 - 40, height/2 + 120, 80, 40, 10);
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Fechar", width/2, height/2 + 140);

  textAlign(CENTER);
}

function desenharAnimalRaro() {
  // Fundo do popup
  fill(255, 240);
  rect(width/2 - 200, height/2 - 150, 400, 300, 20);
  stroke(0);
  fill(255);

  // Título
  fill(255); // Texto branco
  textSize(20);
  text(animalRaroVisivel.nome, width/2, height/2 - 120);

  // Emoji do animal
  textSize(40);
  text(animalRaroVisivel.emoji, width/2, height/2 - 70);

  // Informações
  textSize(14);
  textAlign(LEFT);
  fill(255); // Texto branco
  text(`Raridade: ${animalRaroVisivel.raridade}`, width/2 - 180, height/2 - 20);

  // Descrição do animal
  textSize(12);
  text(animalRaroVisivel.descricao, width/2 - 180, height/2 + 10, 360, 150);

  // Botão de fechar
  fill(200, 50, 50);
  rect(width/2 - 40, height/2 + 120, 80, 40, 10);
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Fechar", width/2, height/2 + 140);

  textAlign(CENTER);
}

function desenharInfoTecnologia(tec) {
  // Fundo do popup
  fill(255, 240);
  rect(width/2 - 200, height/2 - 150, 400, 300, 20);
  stroke(0);
  fill(255);

  // Título
  fill(255); // Texto branco
  textSize(20);
  text(tec.nome, width/2, height/2 - 120);

  // Status
  textSize(14);
  text(tec.desbloqueada ? "✅ Tecnologia desbloqueada" : "🔒 Tecnologia bloqueada",
       width/2, height/2 - 90);

  // Descrição
  textAlign(LEFT);
  textSize(12);
  fill(255); // Texto branco
  text(tec.descricao, width/2 - 180, height/2 - 60, 360, 100);

  // Requisitos
  if (tec.requisito) {
    text(`Requisito: ${tec.requisito}`, width/2 - 180, height/2 + 20);
  }

  // Efeitos
  text(`Efeito: ${tec.efeito}`, width/2 - 180, height/2 + 40);

  // Botão de fechar
  fill(200, 50, 50);
  rect(width/2 - 40, height/2 + 120, 80, 40, 10);
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Fechar", width/2, height/2 + 140);

  textAlign(CENTER);
}

function desenharAnalise() {
  desenharTerrenoComVitalidade();

  fill(255, 230);
  rect(width/2 - 200, height/2 - 100, 400, 200, 20);
  fill(0);
  textSize(16);
  text("Análise do Terreno", width/2, height/2 - 70);

  // Barra de vitalidade
  let corVitalidade = lerpColor(color(200, 50, 50), color(50, 200, 50), vitalidadeTerreno/100);
  fill(230);
  rect(width/2 - 150, height/2 - 30, 300, 30);
  fill(corVitalidade);
  rect(width/2 - 150, height/2 - 30, 300 * (vitalidadeTerreno/100), 30);
  fill(255); // Texto branco
  textSize(14);
  text(`Vitalidade: ${Math.round(vitalidadeTerreno)}%`, width/2, height/2 - 15);

  // Lista de árvores
  textSize(12);
  text("Árvores plantadas:", width/2, height/2 + 20);

  let contagem = {};
  for (let arv of arvoresPlantadas) {
    contagem[arv.nome] = (contagem[arv.nome] || 0) + 1;
  }

  let y = height/2 + 50;
  for (let nome in contagem) {
    text(`${contagem[nome]}x ${nome}`, width/2, y);
    y += 20;
  }

  // Botão de continuar
  fill(100, 200, 100);
  rect(width/2 - 80, height/2 + 120, 160, 40, 10);
  fill(255);
  text("Continuar", width/2, height/2 + 140);
}

function desenharTerrenoArido() {
  // Gradiente do céu
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color(150, 200, 255), color(250, 200, 100), map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }

  // Terra árida (reta)
  fill(150, 100, 50);
  rect(0, height * 0.7, width, height * 0.3);
}

function desenharTerrenoComVitalidade() {
  // Gradiente do céu baseado no horário
  switch(horarioDia) {
    case "manha":
      drawGradienteVertical(color(150, 200, 255), color(200, 230, 200));
      break;
    case "tarde":
      drawGradienteVertical(color(250, 150, 50), color(200, 150, 100));
      break;
    case "noite":
      drawGradienteVertical(color(10, 10, 40), color(30, 30, 70));
      break;
  }

  // Terra com vitalidade (com relevo)
  let corTerra = lerpColor(color(150, 100, 50), color(100, 150, 50), vitalidadeTerreno/100);
  fill(corTerra);
  rect(0, height * 0.7, width, height * 0.3);

  // Área adicional de terra quando tecnologias são compradas
  if (terrenoExpandido) {
    fill(corTerra);
    beginShape();
    // Cria um terreno com relevo irregular
    vertex(0, height * 0.5);
    for (let x = 0; x < width; x += 20) {
      let y = height * 0.5 + Math.sin(x * 0.02 + frameCount * 0.02) * 20;
      vertex(x, y);
    }
    vertex(width, height * 0.5);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    // Reseta o flag para não redesenhar continuamente
    terrenoExpandido = false;
  }
}

function desenharArvore(x, y, arvore) {
  let tamanho = 30 + arvore.growthStage * 40;

  // Verifica se a árvore está dentro da área plantável
  let dentroDaArea = y >= areaPlantavel.y && y <= areaPlantavel.y + areaPlantavel.height;
  
  // Desenha sombra apenas se estiver dentro da área
  if (dentroDaArea) {
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(x, y + tamanho * 0.3, tamanho * 0.8, tamanho * 0.2);
  }

  if (arvore.adulta) {
    textSize(tamanho);
    text(arvore.emojiAdulto, x, y);

    // Mostra frutos se existirem e ainda não foram colhidos
    if (arvore.frutos && arvore.colheitas < arvore.maxColheitas) {
      textSize(tamanho * 0.7);
      text(arvore.frutos, x, y - tamanho * 0.5);
    }
  } else {
    textSize(tamanho * 0.7);
    text(arvore.emojiMuda, x, y);
  }
}

function posicaoValida(x, y) {
  // Verifica se está dentro da área plantável
  if (y < areaPlantavel.y || y > areaPlantavel.y + areaPlantavel.height) return false;

  // Calcula espaçamento considerando tecnologias desbloqueadas
  let espacamento = ESPACAMENTO_MINIMO;

  // Aplica redução de espaçamento das tecnologias
  if (tecnologiasDesbloqueadas.includes("Agrofloresta Básica")) {
    espacamento *= 0.7;
  }
  if (tecnologiasDesbloqueadas.includes("Sistema Agroflorestal")) {
    espacamento *= 0.5;
  }

  // Verifica distância mínima entre árvores
  for (let arv of arvoresPlantadas) {
    let d = dist(x, y, arv.x, arv.y);
    if (d < espacamento) return false;
  }

  return true;
}

function atualizarCrescimento() {
  for (let arv of arvoresPlantadas) {
    if (!arv.adulta && millis() - arv.tempoPlantio > TEMPO_CRESCIMENTO) {
      arv.adulta = true;
      arv.growthStage = 1;
    } else if (!arv.adulta) {
      arv.growthStage = (millis() - arv.tempoPlantio) / TEMPO_CRESCIMENTO;
    }
  }
}

function atualizarVitalidade() {
  // Calcula vitalidade baseada nas árvores plantadas
  let totalVitalidade = arvoresPlantadas.reduce((sum, arv) => sum + arv.vitalidade, 0);
  vitalidadeTerreno = constrain(totalVitalidade / Math.max(arvoresPlantadas.length, 1) * 2, 0, 100);
}

function mousePressed() {
  if (fimDeJogo) {
    // Botão para reiniciar o jogo
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height - 100 && mouseY < height - 40) {
      reiniciarJogo();
    }
    return;
  }

  if (mostrarInstrucoes) {
    if (mouseX > width/2 - 40 && mouseX < width/2 + 40 &&
        mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      mostrarInstrucoes = false;
    }
    return;
  }

  if (mostrarMissaoEva) {
    if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
        mouseY > height/2 + 80 && mouseY < height/2 + 130) {
      mostrarMissaoEva = false;
    }
    return;
  }

  if (fadeState > 0) return;

  if (tela === "inicio") {
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150 &&
        mouseY > height * 0.6 && mouseY < height * 0.6 + 60) {
      tela = "dispositivo";
    }
  }
  else if (tela === "dispositivo") {
    if (mouseX > width/2 - 150 && mouseX < width/2 - 10 &&
        mouseY > height * 0.4 && mouseY < height * 0.4 + 60) {
      dispositivo = "celular";
      tela = "genero";
    }
    else if (mouseX > width/2 + 10 && mouseX < width/2 + 150 &&
             mouseY > height * 0.4 && mouseY < height * 0.4 + 60) {
      dispositivo = "computador";
      tela = "genero";
    }
  }
  else if (tela === "genero") {
    if (mouseX > width/2 - 150 && mouseX < width/2 - 10 &&
        mouseY > height * 0.4 && mouseY < height * 0.4 + 60) {
      generoSelecionado = "feminino";
      tela = "personagem";
    }
    else if (mouseX > width/2 + 10 && mouseX < width/2 + 150 &&
             mouseY > height * 0.4 && mouseY < height * 0.4 + 60) {
      generoSelecionado = "masculino";
      tela = "personagem";
    }
  }
  else if (tela === "personagem") {
    let lista = personagens[generoSelecionado].emojis;
    let espacamento = width * 0.2;
    let startX = width * 0.1;

    for (let i = 0; i < lista.length; i++) {
      let x = startX + (i * espacamento);
      let y = height * 0.4;

      if (dist(mouseX, mouseY, x, y) < emojiSize/2) {
        personagemSelecionado = lista[i];
        tela = "nome";
        break;
      }
    }
  }
  else if (tela === "nome") {
    let nomes = personagens[generoSelecionado].nomes;
    let espacamento = height * 0.12;
    let startY = height * 0.4;

    for (let i = 0; i < nomes.length; i++) {
      let y = startY + (i * espacamento);

      if (mouseY > y - 25 && mouseY < y + 15) {
        nomeSelecionado = nomes[i];
        break;
      }
    }

    // Botão confirmar
    if (nomeSelecionado && mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
        mouseY > height * 0.9 && mouseY < height * 0.9 + 50) {
      tela = "cidade";
    }
  }
  else if (tela === "cidade") {
    // Botão ver mensagem
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height - 100 && mouseY < height - 40) {
      tela = "mensagemCelular";
    }
  }
  else if (tela === "mensagemCelular") {
    // Botão Não - reinicia o jogo
    if (mouseX > celular.x + celular.width/2 - 120 &&
        mouseX < celular.x + celular.width/2 - 20 &&
        mouseY > celular.y + 400 &&
        mouseY < celular.y + 450) {
      reiniciarJogo();
    }
    
    // Botão Sim
    if (mouseX > celular.x + celular.width/2 + 20 &&
        mouseX < celular.x + celular.width/2 + 120 &&
        mouseY > celular.y + 400 &&
        mouseY < celular.y + 450) {
      tela = "viagem";
    }
  }
  else if (tela === "historia") {
    if (fade >= 255) {
      if (cena < historia.length - 1) {
        cena++;
        fade = 0;
      } else {
        fadeState = 1;
        mensagemLucro = "História concluída!";
      }
    }
  }
  else if (tela === "receberDinheiro") {
    // Botão ir à feira
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height * 0.8 && mouseY < height * 0.8 + 60) {
      tela = "feira";
      // Mostra a missão da Eva quando o jogador vai para a feira pela primeira vez
      if (!evaApareceu) {
        mostrarMissaoEva = true;
        evaApareceu = true;
      }
    }
  }
  else if (tela === "feira") {
    let arvoresParaMostrar = plantioAtivo === 1 ? arvores : arvoresFrutas;
    
    let startY = 100;
    for (let i = 0; i < arvoresParaMostrar.length; i++) {
      let y = startY + i * 120;
      if (y < height - 100) {
        // Botão comprar
        if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
            mouseY > y + 50 && mouseY < y + 90 &&
            dinheiro >= arvoresParaMostrar[i].preco) {
          dinheiro -= arvoresParaMostrar[i].preco;
          arvoresCompradas.push({...arvoresParaMostrar[i]});
          mostrarAnalise = {
            msg: `Comprou ${arvoresParaMostrar[i].nome} por R$${arvoresParaMostrar[i].preco}`,
            timer: 100
          };

          // Verifica se comprou o Pau-rosa (fim de jogo)
          if (arvoresParaMostrar[i].nome === "Pau-rosa") {
            fimDeJogo = true;
          }
        }

        // Botão informações
        if (mouseX > width/2 - 150 && mouseX < width/2 - 110 &&
            mouseY > y + 50 && mouseY < y + 90) {
          mostrarInfoArvore = arvoresParaMostrar[i];
        }
      }
    }

    // Botão sítio
    if (mouseX > 30 && mouseX < 180 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "sitio";
    }

    // Botão plantar
    if (arvoresCompradas.length > 0 &&
        mouseX > width - 180 && mouseX < width - 30 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "plantio";
    }

    // Botão missões
    if (mouseX > 30 && mouseX < 130 &&
        mouseY > 60 && mouseY < 100) {
      tela = "missoes";
    }

    // Botão ir à cidade
    if (mouseX > 140 && mouseX < 240 &&
        mouseY > 60 && mouseY < 100) {
      tela = "vendaFeira";
    }

    // Botão tecnologias
    if (mouseX > width - 280 && mouseX < width - 180 &&
        mouseY > 30 && mouseY < 70) {
      tela = "tecnologias";
    }

    // Botão bolsa
    if (mouseX > width - 120 && mouseX < width - 80 &&
        mouseY > 35 && mouseY < 65) {
      mostrarBolsa = !mostrarBolsa;
    }
  }
  else if (tela === "plantio") {
    // Seleciona árvore para plantar (se houver árvores compradas)
    if (arvoresCompradas.length > 0 && !arvoreSelecionada) {
      arvoreSelecionada = arvoresCompradas.pop();
    }

    // Botão feira
    if (mouseX > 30 && mouseX < 180 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "feira";
    }

    // Botão finalizar
    if (mouseX > width - 180 && mouseX < width - 30 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "sitio";
    }
    
    // Botão reorganizar
    if (mouseX > width/2 - 75 && mouseX < width/2 + 75 &&
        mouseY > height - 150 && mouseY < height - 90) {
      reorganizarArvores();
    }

    // Botão Plantio 2
    if (mostrarBotaoPlantio2 && mouseX > width/2 - 75 && mouseX < width/2 + 75 &&
        mouseY > height - 220 && mouseY < height - 160) {
      plantioAtivo = plantioAtivo === 1 ? 2 : 1;
      mostrarAnalise = {
        msg: plantioAtivo === 2 ? "Você entrou no Plantio 2 (Frutas)" : "Você voltou para o Plantio 1 (Árvores Nativas)",
        timer: 120
      };
    }
  }
  else if (tela === "sitio") {
    // Botão feira
    if (mouseX > 30 && mouseX < 180 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "feira";
    }

    // Botão avançar horário
    if (mouseX > width - 180 && mouseX < width - 30 &&
        mouseY > height - 80 && mouseY < height - 20) {
      clicksDia++;
      if (clicksDia === 1) {
        horarioDia = "tarde";
      } else if (clicksDia === 2) {
        horarioDia = "noite";
      } else if (clicksDia >= 3) {
        avancarDia();
        clicksDia = 0;
        horarioDia = "manha"; // Reseta para manhã no novo dia
      }
    }

    // Botão missões
    if (mouseX > 30 && mouseX < 130 &&
        mouseY > 60 && mouseY < 100) {
      tela = "missoes";
    }

    // Botão ir à cidade
    if (mouseX > 140 && mouseX < 240 &&
        mouseY > 60 && mouseY < 100) {
      tela = "vendaFeira";
    }

    // Botão tecnologias
    if (mouseX > width - 280 && mouseX < width - 180 &&
        mouseY > 30 && mouseY < 70) {
      tela = "tecnologias";
    }

    // Botão bolsa
    if (mouseX > width - 120 && mouseX < width - 80 &&
        mouseY > 35 && mouseY < 65) {
      mostrarBolsa = !mostrarBolsa;
    }

    // Verifica clique nas árvores para mostrar informações
    for (let arv of arvoresPlantadas) {
      if (dist(mouseX, mouseY, arv.x, arv.y) < 30) {
        mostrarInfoArvore = arv;
        break;
      }
    }

    // Verifica clique nos botões de colheita
    for (let arv of arvoresPlantadas) {
      if (arv.podeColher && arv.adulta && arv.colheitas < arv.maxColheitas &&
          dist(mouseX, mouseY, arv.x, arv.y - 50) < 15) {

        // Adiciona fruto à bolsa
        bolsa.push(arv.frutos);
        arv.colheitas++;

        // Atualiza progresso da missão
        if (missaoAtiva && missaoAtiva.itemRequerido === arv.frutos) {
          progressoMissao++;
        }

        // Feedback visual
        mostrarAnalise = {
          msg: `Colhido ${arv.frutos}!`,
          timer: 100
        };
        break;
      }
    }

    // Verifica clique no animal raro
    if (animalRaroVisivel && dist(mouseX, mouseY, animalRaroVisivel.x, animalRaroVisivel.y) < 20) {
      mostrarInfoArvore = null; // Fecha qualquer informação de árvore aberta
      mostrarInfoTecnologia = null; // Fecha qualquer informação de tecnologia aberta
    }
  }
  else if (tela === "tecnologias") {
    let startY = 100;
    for (let i = 0; i < tecnologias.length; i++) {
      let y = startY + i * 120;
      if (y < height - 100) {
        // Botão comprar tecnologia
        if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
            mouseY > y + 50 && mouseY < y + 90 &&
            dinheiro >= tecnologias[i].custo &&
            !tecnologias[i].desbloqueada &&
            (!tecnologias[i].requisito || tecnologiasDesbloqueadas.includes(tecnologias[i].requisito))) {

          dinheiro -= tecnologias[i].custo;
          tecnologias[i].desbloqueada = true;
          tecnologiasDesbloqueadas.push(tecnologias[i].nome);

          // Aplica efeito imediato se for expansão de terreno
          if (tecnologias[i].nome === "Expansão de Terreno") {
            expandirTerreno();
          }

          // Feedback visual
          mostrarAnalise = {
            msg: `Tecnologia "${tecnologias[i].nome}" desbloqueada!`,
            timer: 100
          };
        }

        // Botão informações tecnologia
        if (mouseX > width/2 - 150 && mouseX < width/2 - 110 &&
            mouseY > y + 50 && mouseY < y + 90) {
          mostrarInfoTecnologia = tecnologias[i];
        }
      }
    }

    // Botão voltar
    if (mouseX > 30 && mouseX < 180 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "sitio";
    }
  }
  else if (tela === "missoes") {
    // Missão ativa
    if (missaoAtiva) {
      // Botão entregar
      if (progressoMissao >= missaoAtiva.objetivo &&
          mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
          mouseY > 200 && mouseY < 240) {

        // Remove os frutos da bolsa se for uma missão de coleta
        if (missaoAtiva.itemRequerido) {
          let frutosRemovidos = 0;
          for (let i = bolsa.length - 1; i >= 0 && frutosRemovidos < missaoAtiva.objetivo; i--) {
            if (bolsa[i] === missaoAtiva.itemRequerido) {
              bolsa.splice(i, 1);
              frutosRemovidos++;
            }
          }
        }

        // Concede a recompensa
        dinheiro += missaoAtiva.recompensa;
        mostrarAnalise = {
          msg: `Missão concluída! +R$${missaoAtiva.recompensa}`,
          timer: 100
        };

        // Desbloqueia Plantio 2 se a missão for de plantar 10 árvores
        if (missaoAtiva.objetivo === 10 && !missaoAtiva.itemRequerido && !plantio2Desbloqueado) {
          plantio2Desbloqueado = true;
          mostrarBotaoPlantio2 = true;
        }

        // Reseta a missão
        missaoAtiva = null;
        progressoMissao = 0;
        gerarMissoes();
      }

      // Botão cancelar
      if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
          mouseY > 250 && mouseY < 290) {
        missaoAtiva = null;
        progressoMissao = 0;
      }
    }
    // Lista de missões disponíveis
    else {
      let startY = 100;
      for (let i = 0; i < missoes.length; i++) {
        let y = startY + i * 120;
        if (y < height - 100) {
          // Botão aceitar missão
          if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
              mouseY > y + 70 && mouseY < y + 100) {
            missaoAtiva = missoes[i];
            // Atualiza progresso baseado nos frutos já colhidos
            if (missaoAtiva.itemRequerido) {
              progressoMissao = bolsa.filter(item => item === missaoAtiva.itemRequerido).length;
            } else {
              progressoMissao = arvoresPlantadas.length;
            }
            break;
          }
        }
      }
    }

    // Botão voltar
    if (mouseX > 30 && mouseX < 180 &&
        mouseY > height - 80 && mouseY < height - 20) {
      tela = "sitio";
    }
  }
  else if (tela === "analise") {
    // Botão continuar
    if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
        mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      tela = "sitio";
    }
  }
  else if (tela === "vendaFeira") {
    // Conta os diferentes tipos de frutos
    let contagemFrutos = {};
    for (let fruto of bolsa) {
      contagemFrutos[fruto] = (contagemFrutos[fruto] || 0) + 1;
    }
    
    let frutosArray = Object.keys(contagemFrutos);
    let startY = height/2 - 80;
    
    for (let i = 0; i < frutosArray.length; i++) {
      let y = startY + i * 60;
      
      // Verifica clique no botão vender
      if (mouseX > width/2 - 40 && mouseX < width/2 + 40 &&
          mouseY > y + 20 && mouseY < y + 50) {
        
        let fruto = frutosArray[i];
        let valor = 0;
        if (fruto === "🍐") valor = 5;
        else if (fruto === "🍊") valor = 10;
        else if (fruto === "🍒") valor = 20;
        else if (fruto === "🍋") valor = 15;
        else if (fruto === "🌺") valor = 50;
        
        let quantidade = contagemFrutos[fruto];
        dinheiro += quantidade * valor;
        
        // Remove todos os frutos desse tipo
        bolsa = bolsa.filter(item => item !== fruto);
        
        // Feedback visual
        mostrarAnalise = {
          msg: `Vendeu ${quantidade}x ${fruto} por R$${quantidade * valor}!`,
          timer: 100
        };
        
        // Atualiza progresso da missão
        if (missaoAtiva && missaoAtiva.itemRequerido === fruto) {
          progressoMissao = 0;
        }
      }
    }
    
    // Verifica clique nos botões de compra de frutos da cidade
    let frutosDisponiveis = Object.keys(frutosCidade);
    let startX = width/2 - ((frutosDisponiveis.length * 60)/2) + (60/2);
    
    for (let j = 0; j < frutosDisponiveis.length; j++) {
      let fruto = frutosDisponiveis[j];
      let x = startX + j * 60;
      
      if (mouseX > x - 15 && mouseX < x + 15 &&
          mouseY > height/2 + 180 && mouseY < height/2 + 210) {
        let fruto = frutosDisponiveis[j];
        if (dinheiro >= frutosCidade[fruto].valor) {
          dinheiro -= frutosCidade[fruto].valor;
          bolsa.push(fruto);
          
          // Atualiza progresso da missão
          if (missaoAtiva && missaoAtiva.itemRequerido === fruto) {
            progressoMissao++;
          }
          
          mostrarAnalise = {
            msg: `Comprou ${fruto} por R$${frutosCidade[fruto].valor}`,
            timer: 100
          };
        } else {
          mostrarAnalise = {
            msg: "Dinheiro insuficiente!",
            timer: 100
          };
        }
      }
    }
    
    // Botão voltar
    if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
        mouseY > height/2 + 210 && mouseY < height/2 + 250) {
      tela = "sitio";
    }
  }

  // Verifica clique para fechar informações da árvore
  if (mostrarInfoArvore !== null) {
    if (mouseX > width/2 - 40 && mouseX < width/2 + 40 &&
        mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      mostrarInfoArvore = null;
    }
  }

  // Verifica clique para fechar informações da tecnologia
  if (mostrarInfoTecnologia !== null) {
    if (mouseX > width/2 - 40 && mouseX < width/2 + 40 &&
        mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      mostrarInfoTecnologia = null;
    }
  }

  // Verifica clique para fechar informações do animal raro
  if (animalRaroVisivel && mostrarInfoArvore === null && mostrarInfoTecnologia === null) {
    animalRaroVisivel = null;
  }
}

function mouseReleased() {
  if (tela === "plantio" && arvoreSelecionada) {
    if (posicaoValida(mouseX, mouseY)) {
      arvoresPlantadas.push({
        ...arvoreSelecionada,
        x: mouseX,
        y: mouseY,
        tempoPlantio: millis(),
        growthStage: 0,
        adulta: false
      });

      // Verifica se o jogador plantou 10 árvores (missão da Eva)
      if (arvoresPlantadas.length === 10 && !plantio2Desbloqueado) {
        mostrarAnalise = {
          msg: "Parabéns! Você completou a missão da Eva!",
          timer: 120
        };
        plantio2Desbloqueado = true;
        mostrarBotaoPlantio2 = true;
        
        // Concede a recompensa se a missão estiver ativa
        if (missaoAtiva && missaoAtiva.objetivo === 10) {
          dinheiro += missaoAtiva.recompensa;
          missaoAtiva = null;
          progressoMissao = 0;
        }
      }
    } else {
      // Devolve a árvore para a lista de compradas se não foi plantada
      arvoresCompradas.push(arvoreSelecionada);
    }
    arvoreSelecionada = null;
  }
}

function avancarDia() {
  dia++;

  // Calcula lucro das árvores adultas
  let lucro = arvoresPlantadas
    .filter(arv => arv.adulta)
    .reduce((sum, arv) => sum + arv.retorno, 0);

  dinheiro += lucro;
  lucroDia = lucro;
  mensagemLucro = lucro > 0 ? "Bom trabalho!" : "Plante mais árvores!";

  // Reseta colheitas para o novo dia
  arvoresPlantadas.forEach(arv => {
    if (arv.podeColher) arv.colheitas = 0;
  });

  // Expande terreno automaticamente com vitalidade alta
  if (vitalidadeTerreno > 50 && areaPlantavel.nivel === 1) {
    areaPlantavel.nivel = 2;
    atualizarAreaPlantavel();
    terrenoExpandido = true;
  } else if (vitalidadeTerreno > 80 && areaPlantavel.nivel === 2) {
    areaPlantavel.nivel = 3;
    atualizarAreaPlantavel();function setup() {
2
  createCanvas(400, 400);
3
}
4

5
function draw() {
6
  background(220);
7
}
    terrenoExpandido = true;
  }

  // Gera novos animais para o novo dia
  gerarAnimais();

  // Mostra análise a cada 3 dias
  if (dia % 3 === 0) {
    fadeState = 1;
    tela = "analise";
  }
}

function reiniciarJogo() {
  // Reseta todas as variáveis do jogo
  dinheiro = 5;
  arvoresCompradas = [];
  arvoresPlantadas = [];
  mostrarAnalise = null;
  dia = 1;
  fadeAlpha = 0;
  fadeState = 0;
  lucroDia = 0;
  mensagemLucro = "";
  arvoreSelecionada = null;
  vitalidadeTerreno = 0;
  mostrarInfoArvore = null;
  mostrarInfoTecnologia = null;
  tecnologiasDesbloqueadas = [];
  bolsa = [];
  missoes = [];
  missaoAtiva = null;
  progressoMissao = 0;
  animais = [];
  animalRaroVisivel = null;
  fimDeJogo = false;
  terrenoExpandido = false;
  plantio2Desbloqueado = false;
  evaApareceu = false;
  clicksDia = 0;
  horarioDia = "manha";
  mostrarBolsa = false;
  mostrarBotaoPlantio2 = false;
  mostrarMissaoEva = false;
  plantioAtivo = 1;

  // Reseta a área plantável
  areaPlantavel.nivel = 1;
  atualizarAreaPlantavel();

  // Gera novas missões e animais
  gerarMissoes();
  gerarAnimais();

  // Volta para a tela inicial
  tela = "inicio";
  mostrarInstrucoes = true;
}

function drawGradienteVertical(c1, c2) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ajustarTamanhos();

  // Atualiza posição do celular
  celular.width = Math.min(width * 0.8, 400);
  celular.height = celular.width * 1.8;
  celular.x = width/2 - celular.width/2;
  celular.y = height/2 - celular.height/2;

  // Atualiza área plantável
  atualizarAreaPlantavel();
}