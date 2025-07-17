
// inputs do formulário para entrada de dados pelo agricultor
let cropInput, areaInput, dateInput;
let seedPriceInput, fertPriceInput, salePriceInput;

// botões para salvar e exportar dados
let submitButton, exportButton;

// lista que armazena todos os registros de plantio feitos pelo usuário
let records = [];

// mensagem exibida para o usuário de erro ou sucesso
let message = "";

// variáveis para a animação das sementes chovendo na tela
let fallingSeeds = [];           // lista de objetos que representa as sementes na tela
let currentSeedType = null;      // tipo da semente que está caindo 
let seedStartTime = 0;           // momento em que a chuva de sementes começa
let seedDuration = 10000;        // tempo da chuva de sementes 10 segundo
let seedActive = false;          // flag que indica se a chuva de sementes está ativa

// dados de aumento percentual no mercado de trabalho no Paraná em 2025 por semente
const employmentGrowth = {
  milho: 8.2,
  soja: 10.5,
  trigo: 6.7,
  feijao: 7.3,
  outro: 5.0
};

// função setup que inicia o ambiente e os elementos
function setup() {
  createCanvas(800, 600);        // cria a área de desenho de 800x600 pixels
  textFont('Arial');             // define a fonte do texto para Arial
  textSize(14);                  // define tamanho padrão do texto para 14 pixels
  textAlign(LEFT, TOP);          // alinha o texto à esquerda e topo por padrão
  background(245);               // pinta o fundo de cinza

  createForm();                  // chama a função que cria o formulário com inputs e botões
}

// função draw, atualiza na tela
function draw() {
  background(245);               // limpa a tela pintando o fundo novamente

  // verifica se a chuva de sementes está ativa e se o tempo da chuva ainda não terminou
  if (seedActive && millis() - seedStartTime < seedDuration) {
    //  usa para cada semente na lista, atualiza sua posição e desenha na tela
    for (let seed of fallingSeeds) {
      seed.update();             // atualiza posição da semente que está caindo
      seed.display();            // desenha a semente na tela
    }

    displaySeedLabel();          // mostra o nome da semente + "DEB do Paraná em 2025"
    displayEmploymentImpact();   // mostra a caixinha com o impacto no mercado de trabalho no Paraná
  }

  drawFormTitle();               // exibe o título de registros
  displayMessage();              // exibe mensagens para o usuário de erro ou sucesso
  displayRecords();              // mostra a lista de registros que já estão salvos
  displayStats();                // mostra estatísticas gerais como área total, lucro total
}

//função para criar os imputs e botões
function createForm() {
  createElement('h2', 'Registro de Plantio - Agricultor Conectado');  // título do formulário

  // cria os campos de texto para os dados do plantio
  cropInput = createInput().attribute('placeholder', 'Nome da cultura (ex: Milho)');
  areaInput = createInput().attribute('placeholder', 'Área plantada (hectares)');
  dateInput = createInput().attribute('placeholder', 'Data de plantio (ex: 23/04/2025)');
  seedPriceInput = createInput().attribute('placeholder', 'Preço da semente por ha (R$)');
  fertPriceInput = createInput().attribute('placeholder', 'Preço do fertilizante por ha (R$)');
  salePriceInput = createInput().attribute('placeholder', 'Valor de venda por ha (R$)');

  // cria os botões de salvar registro e exportar dados
  submitButton = createButton('Salvar Registro');
  exportButton = createButton('Exportar Dados');

  // aplica estilos em CSS simples nos inputs e botões para melhorar a visualização
  let inputs = [cropInput, areaInput, dateInput, seedPriceInput, fertPriceInput, salePriceInput, submitButton, exportButton];
  for (let input of inputs) {
    input.style('margin', '5px');
    input.style('padding', '6px');
    input.style('font-size', '14px');
  }

  // define a ação dos botões como salvar os dados ou exportar
  submitButton.mousePressed(handleSubmit);
  exportButton.mousePressed(exportData);

  createElement('hr'); // linha horizontal que separa a seção
}

//função para desenhar o título da seção
function drawFormTitle() {
  fill(50);            // cor cinza escuro para o texto
  textSize(16);        // tamanho maior para o título
  text("Registros do Agricultor", 20, 200); // posição x=20, y=200
}

// função que utiliza para mostrar erro ou sucesso para o usuário
function displayMessage() {
  fill(message.includes("⚠️") ? 'red' : 'green'); // vermelho para erro e verde para sucesso
  textSize(14);
  text(message, 20, 230); // posição que fixa a mensagem
}

// função que trata o envio das mensagens no formulário
function handleSubmit() {
  // lê e limpa os dados digitados pelo usuário
  let crop = cropInput.value().trim();
  let area = parseFloat(areaInput.value());
  let dateStr = dateInput.value().trim();
  let dateObj = parseBrazilianDate(dateStr);   // converte string para objeto de Date
  let seedPrice = parseFloat(seedPriceInput.value());
  let fertPrice = parseFloat(fertPriceInput.value());
  let salePrice = parseFloat(salePriceInput.value());

  //  verifica se todos os campos estão preenchidos e corretos
  if (!crop || isNaN(area) || !dateObj || isNaN(seedPrice) || isNaN(fertPrice) || isNaN(salePrice)) {
    message = "⚠️ Preencha todos os campos corretamente!";
    return; // para usar se a execução tem erro
  }

  // calcula o custo total e o lucro total baseado nos valores digitados
  let custoPorHectare = seedPrice + fertPrice;
  let lucroPorHectare = salePrice - custoPorHectare;
  let lucroTotal = lucroPorHectare * area;

  // adiciona o registro criado na lista de registros
  records.push({
    crop,
    area,
    date: dateObj,
    dateStr,
    lucroTotal
  });

  sortRecordsByDate(); // ordena os registros pela data do mais recente ao primeiro

  // limpa os campos para começar novamente
  cropInput.value('');
  areaInput.value('');
  dateInput.value('');
  seedPriceInput.value('');
  fertPriceInput.value('');
  salePriceInput.value('');
  message = "✅ Registro salvo com sucesso!";  // mensagem positiva

  // inicia a animação da chuva de sementes com o tipo correto digitado
  let type = getSeedType(crop);
  startSeedRain(type);
}

// função que converte em data brasileira
function parseBrazilianDate(dateStr) {
  let parts = dateStr.split('/'); // separa dia, mês e ano
  if (parts.length === 3) {
    let day = parseInt(parts[0]);
    let month = parseInt(parts[1]) - 1; 
    let year = parseInt(parts[2]);
    let date = new Date(year, month, day);
    return isNaN(date.getTime()) ? null : date; // retorna null se é inválida
  }
  return null; // se o formato não esteja correto
}

// função que ordena do recente ao primeiro
function sortRecordsByDate() {
  records.sort((a, b) => b.date - a.date);
}

// identifica o tipo da semente
function getSeedType(crop) {
  let lower = crop.toLowerCase();
  if (lower.includes("milho")) return "milho";
  if (lower.includes("soja")) return "soja";
  if (lower.includes("trigo")) return "trigo";
  if (lower.includes("feijão") || lower.includes("feijao")) return "feijao";
  return "outro"; // usar para culturas não salvas
}

// função para mostrar os registros na tela
function displayRecords() {
  let y = 260; // posição vertical inicial para os registros
  for (let rec of records) {
    fill(0); 
    text(`• ${rec.crop} | ${rec.area} ha | Plantado em: ${rec.dateStr} | Lucro: R$ ${rec.lucroTotal.toFixed(2)}`, 20, y);
    y += 20; 
  }
}

//  função para exibir estatísticas gerais
function displayStats() {
  let totalArea = 0;
  let totalLucro = 0;

  for (let rec of records) {
    totalArea += rec.area;
    totalLucro += rec.lucroTotal;
  }

  fill(30, 100, 30); 
  textSize(14);
  text(`Área total plantada: ${totalArea.toFixed(2)} hectares`, 20, height - 60);
  text(`Lucro total estimado: R$ ${totalLucro.toFixed(2)}`, 20, height - 40);
}

// função para esxportar arquivo CSV para o computador
function exportData() {
  let data = ["Cultura,Área (ha),Data,Lucro (R$)"]; // cabeçalho CSV
  for (let rec of records) {
    data.push(`${rec.crop},${rec.area},${rec.dateStr},${rec.lucroTotal.toFixed(2)}`);
  }
  saveStrings(data, 'registros_agricolas.csv'); // salva o arquivo CSV no computador
}

// função para iniciar chuva das sementes
function startSeedRain(type) {
  currentSeedType = type;       // guarda o tipo da semente digitada 
  seedStartTime = millis();     // marca o tempo de início da chuva
  seedActive = true;            // ativa a animação
  fallingSeeds = [];            // limpa as sementes anteriores

  // cria 30 sementes com posições e velocidades aleatórias
  for (let i = 0; i < 30; i++) {
    fallingSeeds.push(new SeedDrop(random(width), random(-200, 0), type));
  }
}

// classe que repesenta cada semente animada
class SeedDrop {
  constructor(x, y, type) {
    this.x = x;               // posição horizontal inicial
    this.y = y;               // posição vertical inicial parte de cima da tela
    this.type = type;         // tipo da semente 
    this.size = random(10, 18);// tamanho aleatório da semente
    this.speed = random(1, 2.5);// velocidade de queda
  }

  // atualiza a posição da semente para simular queda
  update() {
    this.y += this.speed;
    if (this.y > height) {    // quando sair da tela, reinicia acima
      this.y = random(-100, -20);
      this.x = random(width);
    }
  }

  // desenha a semente com cor e forma específica para cada semente
  display() {
    noStroke();
    switch (this.type) {
      case 'milho':
        fill(255, 215, 0);  // amarelo
        ellipse(this.x, this.y, this.size, this.size * 1.5);
        break;
      case 'soja':
        fill(100, 200, 100); // verde claro
        ellipse(this.x, this.y, this.size);
        break;
      case 'trigo':
        fill(222, 184, 135); // bege
        beginShape();
        vertex(this.x, this.y);
        vertex(this.x + this.size / 2, this.y + this.size);
        vertex(this.x, this.y + this.size * 1.5);
        vertex(this.x - this.size / 2, this.y + this.size);
        endShape(CLOSE);
        break;
      case 'feijao':
        fill(139, 69, 19);   // marrom
        ellipse(this.x, this.y, this.size + 2, this.size);
        fill(80, 40, 0);     // detalhe mais escuro
        ellipse(this.x + 2, this.y, 3, 3);
        break;
      default:
        fill(120);           // cinza para semente não registrada
        ellipse(this.x, this.y, this.size);
    }
  }
}

// função que exibe o tipo de semente e o texto fixo na tela
function displaySeedLabel() {
  fill(0);                 // preto para o texto
  textSize(16);            
  textAlign(CENTER, CENTER); 
  text(`Semente: ${currentSeedType}`, width / 2, 100);      // nome da semente no centro horizontal, y=100
  text(`DEB do Paraná em 2025`, width / 2, 130);             // texto fixo abaixo
  textAlign(LEFT, TOP);    
}

// função que exibe caixa com o impacto no mercado de trabalho
function displayEmploymentImpact() {
  // Verifica se o tipo da semente é válido e existe no objeto employmentGrowth
  if (!currentSeedType || !employmentGrowth[currentSeedType]) return;

  let percentual = employmentGrowth[currentSeedType];  // pega o valor percentual para a semente

  // define tamanho e posição da caixinha no canto inferior direito
  let boxWidth = 440;
  let boxHeight = 30;
  let boxX = width - boxWidth - 20; // 20 px de margem da borda direita
  let boxY = height - boxHeight - 15; // 15 px de margem da borda inferior

  // desenha a caixinha branca com borda preta 
  fill(265);                // branco para o fundo da caixa
  stroke(0);                // borda preta
  strokeWeight(1);          // espessura da borda
  rect(boxX, boxY, boxWidth, boxHeight, 8); // caixa com cantos arredondados

  // desenha o texto dentro da caixinha alinhado ao centro 
  noStroke();               
  fill(50);                 // cinza mais escuro para o texto
  textSize(14);
  textAlign(LEFT, CENTER);
  text(`Aumento de ${percentual}% no mercado de trabalho no Paraná - em 2025`, boxX + 8, boxY + boxHeight / 2);

  textAlign(LEFT, TOP);     // retorna ao alinhamento padrão
}