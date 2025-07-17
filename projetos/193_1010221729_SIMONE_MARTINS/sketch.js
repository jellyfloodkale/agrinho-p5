let inputSugestao, botaoEnviar;
let sugestoes = [];

function setup() {
  noCanvas(); // Sem canvas, só elementos HTML

  // Título principal
  let titulo = createElement('h1', '🌄🏢 Agrinho  Fortalecendo a Conexão entre o Campo e a Cidade');
  titulo.style('color', '#2E8B57');
  titulo.style('text-align', 'center');
  titulo.style('font-family', 'Georgia');

  // Seção sobre a produção no campo
  let tituloCampo = createElement('h2', '🌱 Produção no Campo');
  tituloCampo.style('color', '#228B22');
  createP('O campo é fundamental para a vida nas cidades. Ele fornece alimentos frescos, como frutas, verduras, carnes e grãos, além de matérias-primas como madeira, algodão e leite. Sem o trabalho dos agricultores, seria impossível manter o abastecimento das cidades.');

  createP('Entretanto, quem vive no campo também enfrenta muitos desafios, como a falta de acesso à tecnologia, estradas ruins, dificuldades para escoar a produção e poucos investimentos em saúde e educação na zona rural.');

  // Seção sobre consumo na cidade
  let tituloCidade = createElement('h2', '🌆 Consumo na Cidade');
  tituloCidade.style('color', '#8B4513');
  createP('As cidades, por outro lado, são responsáveis por consumir a maior parte dos produtos do campo. Além disso, oferecem tecnologia, serviços, escolas, hospitais e mercados que ajudam no desenvolvimento do meio rural.');

  createP('Quando há equilíbrio e parceria, tanto o campo quanto a cidade se beneficiam: o campo oferece alimentos e recursos, e a cidade oferece oportunidades, inovação e desenvolvimento econômico.');

  // Seção de entrevista
  let tituloEntrevista = createElement('h2', '🎤 Entrevista');
  tituloEntrevista.style('color', '#DAA520');
  createP('Entrevista com o agricultor Onovelto Martins sobre a vida no campo e os desafios da produção agrícola:');

  // Embed do vídeo do YouTube
  let videoAgricultor = createDiv();
  videoAgricultor.html(`
    <iframe width="400" height="240"
      src="https://www.youtube.com/embed/uqkuHuW6ow4"
      title="Entrevista com Agricultor"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  `);
  videoAgricultor.style('text-align', 'center');

  // Pergunta para interação
  let pergunta = createElement('h2', '📍 Na sua opinião, por que o campo é importante para a cidade?');
  pergunta.style('color', '#800080');
  pergunta.style('text-align', 'center');

  // Campo de resposta
  inputSugestao = createInput();
  inputSugestao.attribute('placeholder', '✍️ Escreva aqui sua opinião...');
  inputSugestao.style('width', '300px');
  inputSugestao.style('display', 'block');
  inputSugestao.style('margin', '10px auto');
  inputSugestao.style('padding', '8px');
  inputSugestao.style('border-radius', '8px');

  // Botão enviar
  botaoEnviar = createButton('Enviar ❤️');
  botaoEnviar.style('display', 'block');
  botaoEnviar.style('margin', '0 auto');
  botaoEnviar.style('background-color', '#FF69B4');
  botaoEnviar.style('color', 'white');
  botaoEnviar.style('padding', '10px 20px');
  botaoEnviar.style('border', 'none');
  botaoEnviar.style('border-radius', '8px');
  botaoEnviar.mousePressed(enviarSugestao);

  // Lista de opiniões
  let opiniao = createElement('h3', '💬 Opiniões da Comunidade:');
  opiniao.style('text-align', 'center');
  opiniao.style('color', '#00008B');
}

function enviarSugestao() {
  const texto = inputSugestao.value();
  if (texto.trim() !== '') {
    sugestoes.push(texto);
    let resposta = createP(`• ${texto}`);
    resposta.style('color', '#00008B');
    resposta.style('font-family', 'Verdana');
    resposta.style('margin-left', '20px');
    inputSugestao.value('');
  }
}


