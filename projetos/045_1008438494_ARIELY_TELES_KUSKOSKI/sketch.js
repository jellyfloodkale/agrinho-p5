let items = []; // Array para armazenar os itens da planilha

let inputNome, inputCusto, inputQuantidade; // Elementos de entrada de texto

let botaoAdicionar; // Botão para adicionar itens

function setup() {

  createCanvas(800, 600); // Cria um canvas de 800x600 pixels

  background(240); // Define o fundo do canvas

  // Título da planilha

  textSize(32);

  textAlign(CENTER);

  textStyle(BOLD);

  fill(50);

  text("Planilha de Precificação", width / 2, 50);

  // --- Entradas de dados ---

  // Rótulos

  textSize(16);

  textAlign(LEFT);

  textStyle(NORMAL);

  fill(80);

  text("Nome do Item:", 50, 100);

  text("Custo por kg:", 250, 100);

  text("Quantidade:", 450, 100);

  // Campo Nome do Item

  inputNome = createInput('');

  inputNome.position(50, 120);

  inputNome.size(180);

  // Campo Custo por Unidade

  inputCusto = createInput('');

  inputCusto.attribute('type', 'number'); // Define o tipo como número

  inputCusto.attribute('step', '0.01');   // Permite casas decimais

  inputCusto.position(250, 120);

  inputCusto.size(150);

  // Campo Quantidade

  inputQuantidade = createInput('');

  inputQuantidade.attribute('type', 'number'); // Define o tipo como número

  inputQuantidade.attribute('step', '1');      // Apenas números inteiros

  inputQuantidade.position(450, 120);

  inputQuantidade.size(100);

  // Botão Adicionar Item

  botaoAdicionar = createButton('Adicionar Item');

  botaoAdicionar.position(600, 120);

  botaoAdicionar.mousePressed(adicionarItem); // Chama a função adicionarItem quando clicado

  // --- Cabeçalhos da Tabela ---

  textSize(18);

  textStyle(BOLD);

  fill(0);

  text("Item", 50, 200);

  text("Custo kg.", 250, 200);

  text("Qtd.", 450, 200);

  text("Custo Total", 600, 200);

  // Linha divisória

  stroke(180);

  line(40, 210, 750, 210);

}

function draw() {

  // Limpa a área da tabela para redesenhar

  fill(240);

  noStroke();

  rect(40, 220, 710, height - 260); // Limpa a área onde os itens são exibidos

  let yPos = 240; // Posição Y inicial para desenhar os itens

  let custoTotalGeral = 0; // Variável para o custo total de todos os itens

  // Desenha cada item na planilha

  for (let i = 0; i < items.length; i++) {

    let item = items[i];

    let custoTotalItem = item.custo * item.quantidade;

    custoTotalGeral += custoTotalItem;

    fill(0);

    textSize(16);

    textStyle(NORMAL);

    text(item.nome, 50, yPos);

    text('R$ ' + item.custo.toFixed(2), 250, yPos); // Formata para 2 casas decimais

    text(item.quantidade, 450, yPos);

    text('R$ ' + custoTotalItem.toFixed(2), 600, yPos);

    yPos += 30; // Incrementa a posição Y para o próximo item

  }

  // --- Total Geral ---

  stroke(180);

  line(40, yPos + 10, 750, yPos + 10); // Linha divisória antes do total geral

  textSize(20);

  textStyle(BOLD);

  fill(50);

  text("Total Geral:", 450, yPos + 40);

  text('R$ ' + custoTotalGeral.toFixed(2), 600, yPos + 40);

}

function adicionarItem() {

  let nome = inputNome.value();

  let custo = parseFloat(inputCusto.value());

  let quantidade = parseInt(inputQuantidade.value());

  // Validação básica dos inputs

  if (nome && !isNaN(custo) && !isNaN(quantidade) && custo >= 0 && quantidade >= 0) {

    let novoItem = {

      nome: nome,

      custo: custo,

      quantidade: quantidade

    };

    items.push(novoItem); // Adiciona o novo item ao array

    // Limpa os campos de entrada após adicionar

    inputNome.value('');

    inputCusto.value('');

    inputQuantidade.value('');

  } else {

    alert("Por favor, preencha todos os campos corretamente (custo e quantidade devem ser números positivos).");

  }

}