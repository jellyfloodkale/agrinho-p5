let inputSugestao, botaoEnviar;
let sugestoes = [];

function setup() {
  noCanvas(); // Usaremos apenas elementos HTML

  // Título principal
  let titulo = createElement('h1', '🌾🏙️ Agrinho Fortalecendo a Conexão entre Campo e Cidade');
  titulo.style('color', '#2E8B57');
  titulo.style('text-align', 'center');
  titulo.style('font-family', 'Georgia');

  // Seção sobre o campo
  let tituloCampo = createElement('h2', '🚜 A Importância do Campo');
  tituloCampo.style('color', '#228B22');
  createP('O campo é fundamental para a vida nas cidades. É do campo que vem a maior parte dos alimentos que consumimos, como frutas, verduras, grãos, leite e carnes. Além disso, o campo fornece matérias-primas, como madeira, algodão e energia. A produção rural também contribui para a preservação do meio ambiente e para a manutenção dos recursos naturais.');

  createP('Mas quem vive no campo enfrenta desafios diários: estradas ruins, dificuldade de acesso a hospitais e escolas, falta de tecnologia, e muitas vezes, pouca valorização do trabalho rural.');

  // Seção sobre a cidade
  let tituloCidade = createElement('h2', '🌆 A Função da Cidade');
  tituloCidade.style('color', '#8B4513');
  createP('A cidade é o centro do comércio, dos serviços, da indústria e da tecnologia. É na cidade que estão os mercados que consomem os produtos do campo, além dos hospitais, universidades, empresas e centros de pesquisa.');

  createP('Por outro lado, o crescimento desordenado das cidades traz desafios como poluição, trânsito, desemprego, desigualdade social e degradação ambiental. Isso gera uma dependência ainda maior do campo para garantir alimentos saudáveis e qualidade de vida.');

  // Seção sobre interdependência
  let interdependencia = createElement('h2', '🔄 Interdependência Campo-Cidade');
  interdependencia.style('color', '#DAA520');
  createP('Campo e cidade são como partes de um mesmo sistema. O campo precisa da cidade para ter acesso à tecnologia, educação, saúde e mercados. E a cidade depende do campo para garantir alimentos, água, ar puro e equilíbrio ambiental.');

  createP('Por isso, é fundamental que essa conexão seja valorizada, fortalecendo tanto quem vive no meio rural quanto quem vive nas áreas urbanas.');

  // Seção de entrevista
  let tituloEntrevista = createElement('h2', '🎥 Entrevista Real');
  tituloEntrevista.style('color', '#DA70D6');
  createP('Assista à entrevista com o agricultor José Carlos Rodrigues, que fala sobre os desafios e as alegrias da vida no campo:');

  let videoAgricultor = createDiv();
  videoAgricultor.html(`
    <iframe width="400" height="240"
      src="https://www.youtube.com/embed/4cfpXKK5c_I"
      title="Entrevista com Agricultor"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  `);
  videoAgricultor.style('text-align', 'center');

  // Pergunta para interação
  let pergunta = createElement('h2', '💡 Que hábitos sustentáveis você sugere para melhorar a conexão entre campo e cidade?');
  pergunta.style('color', '#800080');
  pergunta.style('text-align', 'center');

  // Campo de entrada
  inputSugestao = createInput();
  inputSugestao.attribute('placeholder', '✍️ Escreva aqui sua sugestão...');
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
  let opiniao = createElement('h3', '📋 Sugestões da Comunidade:');
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

