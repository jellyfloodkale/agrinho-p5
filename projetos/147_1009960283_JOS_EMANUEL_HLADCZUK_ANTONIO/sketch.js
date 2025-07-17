let currentScene = 'start';
let nextScene = '';
let fading = false;
let fadeAlpha = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textSize(18);
}

function draw() {
  if(fading) {
    fill(0, fadeAlpha);
    noStroke();
    rect(0, 0, width, height);
    fadeAlpha += 10;
    if(fadeAlpha >= 255) {
      fadeAlpha = 0;
      fading = false;
      currentScene = nextScene;
    }
    return;
  }
// inicio do jogo
  if(currentScene === 'start') {
    background(240);
  } else if(currentScene.startsWith('city')) {
    background(135, 206, 235);
    fill(80);
    noStroke();
    for(let i = 0; i < width; i += 100) {
      let h = 150 + (i % 3) * 50;
      rect(i, height - h, 80, h);
    }
  } else if(currentScene.startsWith('camp')) {
    background(200, 255, 200);
    fill(255, 204, 0);
    noStroke();
    ellipse(width - 100, 100, 80, 80);
    fill(100, 155, 100);
    rect(0, height - 100, width, 100);
    fill(34, 139, 34);
    rect(width/2 - 10, height - 140, 20, 40);
  }

  if (currentScene === 'start') {
    fill(0);
    text("Você mora em uma pequena cidade no interior do país.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Você percebe que a cidade e o campo dependem um do outro. Prepare-se para", width*0.1, height*0.10 + 30*1);
    fill(0);
    text("fazer escolhas importantes que podem mudar o destino de ambos.", width*0.1, height*0.10 + 30*2);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Morar na cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Morar no campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
  }
// escolha do cenario
  if (currentScene === 'city1') {
    fill(0);
    text("Você vive na cidade grande. Há problemas: a cidade precisa de alimentos do campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("As pessoas do campo precisam dos produtos da cidade. O que você faz?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Investir em fazendas urbanas", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Aumentar as compras de alimentos do campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Ignorar o problema e focar na cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }
// a partir daqui tem diversas escolhas que podem ser feitas
  if (currentScene === 'cityInvest1') {
    fill(0);
    text("Você investe em fazendas urbanas. Aos poucos, a produção agrícola cresce na cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ainda assim, você sente falta dos produtos típicos do campo. O que fazer agora?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Levar produtos rurais para a feira da cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Organizar eventos culturais rurais na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Continuar focando apenas no crescimento urbano", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityBuy1') {
    fill(0);
    text("Você decide apoiar diretamente os agricultores, comprando mais dos campos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Isso ajuda o campo, mas a cidade ainda sofre com poluição e falta de espaço. O próximo passo?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Investir em energia limpa e transporte", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Promover festivais culturais rurais na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Reduzir impostos para empresas urbanas", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityIgnore1') {
    fill(0);
    text("Você ignora os problemas do campo. Aos poucos, os mercados ficam vazios e a cidade sofre com falta de alimentos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O que você faz agora?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Perceber o erro e ajudar os agricultores", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Tentar cultivar alimentos em prédios abandonados", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Desistir da cidade e voltar ao campo", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityTrade2') {
    fill(0);
    text("Você leva produtos rurais para a feira da cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A comunidade celebra o intercâmbio e muitos aprendem sobre o valor do campo.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Expandir o mercado para outras cidades", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Criar programa educacional sobre agricultura", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Aumentar a produção urbana para exportação", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityCulture2') {
    fill(0);
    text("Você promove cultura rural na cidade. Festivais trazem música e comidas típicas do campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ambos veem valor um no outro.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Convidar fazendeiros para conselhos de planejamento", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Ensinar técnicas agrícolas nas escolas urbanas", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Planejar um projeto de agricultura comunitária", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityUrbanFocus2') {
    fill(0);
    text("Você continua focado no crescimento urbano. A cidade cresce, mas o campo empobrece cada vez mais.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Suprimentos ficam escassos.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Reconhecer o desequilíbrio e mudar de foco", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Construir mais arranha-céus mesmo sem alimentos suficientes", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Incentivar migração do campo para a cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityGreen2') {
    fill(0);
    text("Você investe em energia limpa e transporte. A poluição diminui e as estradas facilitam o escoamento da produção rural.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Ajudar fazendeiros a usar técnicas sustentáveis", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Diversificar as culturas para alimentar cidades maiores", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Criar cooperativas urbanas de agricultura", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityFestival2') {
    fill(0);
    text("Você promove festivais rurais na cidade. A população urbana conhece o campo através da cultura, e a relação se fortalece.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Abrir mercadinho de produtos do campo na cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Estudar formas de irrigação mistas (cidade-campo)", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Levar jovens urbanos para auxiliar na colheita", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityTaxCut2') {
    fill(0);
    text("Você reduz impostos urbanos. As empresas crescem, mas ainda há dependência do campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O campo sente falta de investimentos em tecnologia.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Investir parte do lucro urbano no campo", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Criar zonas verdes e parques agrícolas na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Enviar técnicos urbanos para ensinar no campo", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityHelpFarmers2') {
    fill(0);
    text("Você percebe o erro e volta a ajudar. Trabalhando com fazendeiros, reconstrói a ponte entre cidade e campo.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Estabelecer cooperativas rurais integradas", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Promover educação alimentar nas escolas", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Realizar feira anual de integração cidade-campo", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityHighriseFarm2') {
    fill(0);
    text("Você começa a cultivar em arranha-céus. A produção aumenta, mas o campo sente falta de mão de obra e apoio.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar parcerias com fazendas para pesquisa", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Oferecer cursos de agricultura para jovens urbanos", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Trazer experiências rurais para o prédio agrícola", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityBackCountry2') {
    fill(0);
    text("Você volta para o campo. Lá, conhece a dura realidade rural, mas também a importância do apoio da cidade.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Focar em exportar produtos especializados", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Pedir ajuda da cidade em infraestrutura", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Abrir escola sobre desenvolvimento sustentável", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityExpandMarket3') {
    fill(0);
    text("Você expandiu o mercado rural para outras cidades. A economia prospera e a interdependência", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("entre cidade e campo se fortalece. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityEduProgram3') {
    fill(0);
    text("Você criou um programa educacional sobre agricultura. As próximas gerações urbanas aprenderam", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("a valorizar o campo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityExport3') {
    fill(0);
    text("Você aumentou a produção urbana para exportar. Os lucros cresceram, mas percebeu que a cidade ainda", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("precisava do campo para equilíbrio. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityInvFarmers3') {
    fill(0);
    text("Você convidou fazendeiros para conselhos de planejamento. Eles trouxeram ideias valiosas.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo cresceram juntos. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySchools3') {
    fill(0);
    text("Você ensinou técnicas agrícolas nas escolas urbanas. Jovens urbanos passaram a ajudar no campo ocasionalmente.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A união ficou mais forte. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityCommAgr3') {
    fill(0);
    text("Você planejou projetos de agricultura comunitária. Espaços vazios viraram hortas comunitárias, beneficiando todos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityRealize3') {
    fill(0);
    text("Você reconheceu o desequilíbrio e mudou de foco. A partir de então trabalhou lado a lado com o campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Tudo melhorou. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySkyscraper3') {
    fill(0);
    text("Você construiu mais arranha-céus, mas a falta de alimentos causou crise. A cidade enfrentou escassez e aprendeu", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("a lição da dependência. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityEncourageMigration3') {
    fill(0);
    text("Você incentivou migração, esvaziando o campo. A longo prazo, isso gerou falta de alimento e valorizou a sabedoria rural.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade aprendeu o valor do campo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySustainFarm3') {
    fill(0);
    text("Você ajudou fazendeiros a adotarem técnicas sustentáveis. A produção cresceu de forma equilibrada.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo celebram o sucesso conjunto. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityDiversify3') {
    fill(0);
    text("Você diversificou as culturas no campo. A cidade teve mais variedade de alimentos e o campo se tornou mais forte.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityUrbanCoop3') {
    fill(0);
    text("Você criou cooperativas urbanas de agricultura. Jardins comunitários floriram.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A barreira entre cidade e campo ficou mais tênue. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityRuralMarket3') {
    fill(0);
    text("Você abriu um mercadinho de produtos rurais na cidade. Os agricultores ganharam renda justa e a cidade teve alimentos frescos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityIrrigation3') {
    fill(0);
    text("Você desenvolveu sistemas mistos de irrigação. O campo produziu mais e a cidade ajudou no financiamento.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O esforço conjunto trouxe abundância. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityCityToFarm3') {
    fill(0);
    text("Você levou jovens urbanos para ajudar na colheita. Eles entenderam a vida no campo e divulgaram seu valor.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ambos os lados aprenderam muito. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityInvestField3') {
    fill(0);
    text("Você investiu no campo com parte dos lucros urbanos. A economia rural floresceu e logo todos se beneficiaram.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo prosperaram juntos. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityParks3') {
    fill(0);
    text("Você criou parques agrícolas na cidade. O verde cresceu entre os prédios e as pessoas passaram a valorizar a agricultura.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityTechField3') {
    fill(0);
    text("Você enviou técnicos urbanos para o campo. Inovações aumentaram a produção rural.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A dependência foi substituída pela parceria. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityCoop3') {
    fill(0);
    text("Você estabeleceu cooperativas integradas. Cidade e campo trabalharam em conjunto em todos os níveis.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O resultado foi desenvolvimento equilibrado. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityEduFood3') {
    fill(0);
    text("Você promoveu educação alimentar nas escolas. Jovens aprenderam a importância de cada ambiente.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ambos celebram seus papéis complementares. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityIntegrationFair3') {
    fill(0);
    text("Você realizou uma feira de integração. As pessoas conheceram as práticas de ambos e entenderam sua interdependência.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityResearch3') {
    fill(0);
    text("Você criou parcerias para pesquisa agrícola. Urbanos trouxeram tecnologia e o campo trouxe conhecimento prático.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Assim todos aprenderam e cresceram. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityYouthAgri3') {
    fill(0);
    text("Você ofereceu cursos de agricultura. Jovens descobriram vocações no campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Um novo fluxo equilibrado de pessoas e ideias se estabeleceu. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityAgriBuilding3') {
    fill(0);
    text("Você integrou experiências rurais no arranha-céu agrícola. Os métodos do campo enriqueceram o cultivo urbano.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Produzir se tornou uma atividade compartilhada. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityExportField3') {
    fill(0);
    text("Você focou em exportar produtos rurais. O campo cresceu em renome internacional,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("mas aprendeu que sem a cidade não teria onde vender. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityAskCity3') {
    fill(0);
    text("Você pediu ajuda da cidade em infraestrutura. Parcerias de governo e empresas ligaram campo e cidade com estradas melhores.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Todos foram beneficiados. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySustainEdu3') {
    fill(0);
    text("Você abriu uma escola sobre desenvolvimento sustentável. Nova geração aprendeu a equilibrar cidade e campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Isso mudou o futuro para melhor. Fim.", width*0.1, height*0.10 + 30*1);
  }
// campo 
  if (currentScene === 'camp1') {
    fill(0);
    text("Você vive em uma comunidade rural. A vida no campo é bela, mas há dificuldades: muitos jovens", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("migram para a cidade em busca de trabalho. O que você faz?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Aumentar a produção e vender mais para a cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Investir em turismo rural e cultura local", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Incentivar empregos locais e infraestrutura", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }
// opções possiveis
  if (currentScene === 'campProduction2') {
    fill(0);
    text("Você foca em aumentar a produção rural. Os lucros crescem, mas percebe que precisa de ajuda tecnológica e de logística urbana.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Formar parceria com empresas da cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Criar cooperativa de produtores rurais", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Exportar diretamente para o exterior", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campTourism2') {
    fill(0);
    text("Você investe em turismo rural e mantém a cultura local viva. Isso atrai visitantes da cidade para", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("aprender sobre o campo. Próximo passo?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Organizar um festival anual no campo", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Vender artesanato e produtos pela internet", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Convidar chefs da cidade para trabalhar com você", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campLocalJobs2') {
    fill(0);
    text("Você tenta incentivar empregos locais, mas a infraestrutura é precária. A cidade oferece mais oportunidades.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O que fazer?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Lutar por melhorias na estrada e internet", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Enviar jovens para treinamento na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Fundar negócio de tecnologia agrícola local", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campPartnerCity3') {
    fill(0);
    text("Você faz parceria com empresas da cidade. Tecnologia urbana chega ao campo e aumenta a produtividade.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Divulgar parceria para outras comunidades", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Investir em pesquisa de sustentabilidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Focar em educação para jovens rurais", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campCoop3') {
    fill(0);
    text("Você cria uma cooperativa forte. Sem intermediários, o campo tem mais renda e influência.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Construir escola rural com os lucros", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Comprar equipamentos agrícolas em grupo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Praticar agricultura orgânica avançada", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campExport3') {
    fill(0);
    text("Você exporta internacionalmente. O campo se torna renomado, mas ainda precisa de infraestrutura urbana para o transporte.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Melhorar logística com a cidade próxima", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Realizar feira de exportação junto com a cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Investir em tecnologia da informação rural", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campFestival3') {
    fill(0);
    text("O festival anual no campo atrai muita gente. Emprego aumenta e a cidade fica mais consciente da vida rural.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar curso de agricultura urbana inspirado no festival", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Fazer do festival um evento regional", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Vincular escolas urbanas ao festival", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campEcommerce3') {
    fill(0);
    text("Você vende produtos do campo pela internet. Assim o mundo inteiro compra do seu quintal.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Treinar jovens em marketing digital", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Melhorar entrega urbana até o campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Combinar turismo e e-commerce (loja na fazenda)", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campInviteChefs3') {
    fill(0);
    text("Chefs urbanos trabalham com você. Novas receitas surgem e mantém jovens envolvidos na culinária rural.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar restaurante comunitário no campo", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Levar cozinheiros do campo para eventos na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Fazer documentário de receitas locais", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campInfra3') {
    fill(0);
    text("Você consegue melhorias na infraestrutura rural. Jovens começam a ver futuro no campo,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e a cidade se beneficia com produtos mais estáveis.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar projetos de energia solar na comunidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Ensinar tecnologia nas escolas rurais", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Fazer parcerias para maquinário agrícola com a cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campTrain3') {
    fill(0);
    text("Juventude treinada na cidade retorna com novas habilidades, mas precisa de oportunidades em casa para ficar.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Oferecer microcrédito para pequenos negócios", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Estabelecer internet de alta velocidade no campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Organizar eventos esportivos campo-cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campAgriTech3') {
    fill(0);
    text("Sua empresa de tecnologia agrícola transforma o campo. O campo se moderniza e o resto do país observa.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Expandir tecnologia para outras fazendas", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Vender tecnologia para cidades também", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Criar fundo de inovação campo-cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campShare4') {
    fill(0);
    text("Você divulgou a parceria pelo país. Várias comunidades do campo adotaram a ideia.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo cresceram juntos. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campSustain4') {
    fill(0);
    text("Você investiu em pesquisa sustentável. A produção aumentou sem degradar a natureza.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A interdependência se mantém saudável. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campEdu4') {
    fill(0);
    text("Você focou na educação rural. Jovens aprenderam novas técnicas e colaboram com a cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O futuro ficou mais promissor. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campSchool4') {
    fill(0);
    text("Você construiu uma escola rural. A comunidade estudou e inovou.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("As conexões com a cidade se fortaleceram. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campBuyEquip4') {
    fill(0);
    text("Vocês compraram equipamentos juntos. As máquinas facilitaram o trabalho no campo", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e a cidade forneceu apoio financeiro. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campOrganic4') {
    fill(0);
    text("Você praticou agricultura orgânica avançada. A qualidade dos alimentos melhorou", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e a cidade valorizou ainda mais os produtos rurais. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campLogistic4') {
    fill(0);
    text("Você melhorou a logística com a cidade. Os alimentos chegaram frescos aos mercados,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e o campo viu sua renda estabilizar. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campJointFair4') {
    fill(0);
    text("A feira de exportação conjunta foi um sucesso. Compradores do mundo todo conheceram", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("os produtos rurais, conectados pela infraestrutura da cidade. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campTech4') {
    fill(0);
    text("Você investiu em tecnologia da informação. Comunicação rápida aproximou o campo da cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O comércio ficou mais eficiente. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campUrbanCourse4') {
    fill(0);
    text("Você criou um curso de agricultura urbana. Visitantes do festival aprenderam noções de cultivo,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e trouxeram práticas para casa. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campRegional4') {
    fill(0);
    text("O festival virou evento regional. Pessoas de várias cidades vieram,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("fortalecendo o reconhecimento do campo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campSchoolLink4') {
    fill(0);
    text("Você vinculou escolas urbanas ao festival. Jovens da cidade aprenderam sobre o campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Essa troca trouxe respeito mútuo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campDigital4') {
    fill(0);
    text("Você treinou jovens em marketing digital. As vendas online dispararam e mostraram ao mundo a força do campo. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campUrbanLog4') {
    fill(0);
    text("Você melhorou a entrega urbana até o campo. Mercadorias agora circulam facilmente ambos os lados.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo ficaram interligados. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campAgriShop4') {
    fill(0);
    text("Você abriu uma loja na fazenda com e-commerce. Visitantes compram no local ou online,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("misturando turismo rural com comércio. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campCommunityRest4') {
    fill(0);
    text("O restaurante comunitário valorizou a culinária local. Chefs e visitantes tornaram o campo famoso pela comida. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campChefComp4') {
    fill(0);
    text("Você levou cozinheiros rurais para eventos na cidade. Isso elevou o orgulho rural e encantou os clientes urbanos. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campDoc4') {
    fill(0);
    text("O documentário de receitas locais viralizou. Agora muitos jovens urbanos querem aprender a cozinhar no campo. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campSolar4') {
    fill(0);
    text("Você criou projetos de energia solar. O campo ficou mais autossustentável e a cidade viu um exemplo verde. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campLocalTech4') {
    fill(0);
    text("Você ensinou tecnologia nas escolas rurais. Jovens aplicaram inovações à agricultura, impressionando a cidade. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campCityMachinery4') {
    fill(0);
    text("Você firmou parcerias para máquinas. A mecanização aumentou a produção rural, e a cidade se orgulhou da eficiência. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campMicroCredit4') {
    fill(0);
    text("Você ofereceu microcrédito. Pequenos negócios rurais nasceram e a juventude se animou a ficar. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campRuralInternet4') {
    fill(0);
    text("Você estabeleceu internet no campo. Com comunicação online, a comunidade inovou em conjunto com a cidade. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campSports4') {
    fill(0);
    text("Eventos esportivos uniram os jovens do campo e da cidade. A conexão social reforçou o laço entre ambos. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campExpandTech4') {
    fill(0);
    text("Você expandiu a tecnologia para mais fazendas. O conhecimento tecnológico espalhou-se no campo,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("puxando desenvolvimento junto com a cidade. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campMarketTech4') {
    fill(0);
    text("Você vendeu a tecnologia também para a cidade. Assim, ambos se beneficiaram das inovações. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campInnovationFund4') {
    fill(0);
    text("Você criou um fundo de inovação. Novos projetos campo-cidade surgiram, unindo esforços para o bem comum. Fim.", width*0.1, height*0.10 + 30*0);
  }
}
// para funcionar
function mousePressed() {
  if(!fading) {
    if(currentScene === 'start') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'city1';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'camp1';
        fading = true;
      }
    }
    if(currentScene === 'city1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityInvest1';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityBuy1';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityIgnore1';
        fading = true;
      }
    }
    if(currentScene === 'cityInvest1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityTrade2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityCulture2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityUrbanFocus2';
        fading = true;
      }
    }
    if(currentScene === 'cityBuy1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityGreen2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityFestival2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityTaxCut2';
        fading = true;
      }
    }
    if(currentScene === 'cityIgnore1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityHelpFarmers2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityHighriseFarm2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityBackCountry2';
        fading = true;
      }
    }
    if(currentScene === 'cityTrade2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityExpandMarket3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityEduProgram3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityExport3';
        fading = true;
      }
    }
    if(currentScene === 'cityCulture2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityInvFarmers3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'citySchools3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityCommAgr3';
        fading = true;
      }
    }
    if(currentScene === 'cityUrbanFocus2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityRealize3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'citySkyscraper3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityEncourageMigration3';
        fading = true;
      }
    }
    if(currentScene === 'cityGreen2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'citySustainFarm3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityDiversify3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityUrbanCoop3';
        fading = true;
      }
    }
    if(currentScene === 'cityFestival2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityRuralMarket3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityIrrigation3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityCityToFarm3';
        fading = true;
      }
    }
    if(currentScene === 'cityTaxCut2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityInvestField3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityParks3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityTechField3';
        fading = true;
      }
    }
    if(currentScene === 'cityHelpFarmers2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityCoop3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityEduFood3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityIntegrationFair3';
        fading = true;
      }
    }
    if(currentScene === 'cityHighriseFarm2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityResearch3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityYouthAgri3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityAgriBuilding3';
        fading = true;
      }
    }
    if(currentScene === 'cityBackCountry2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityExportField3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityAskCity3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'citySustainEdu3';
        fading = true;
      }
    }
    if(currentScene === 'camp1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campProduction2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campTourism2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campLocalJobs2';
        fading = true;
      }
    }
    if(currentScene === 'campProduction2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campPartnerCity3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campCoop3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campExport3';
        fading = true;
      }
    }
    if(currentScene === 'campTourism2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campFestival3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campEcommerce3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campInviteChefs3';
        fading = true;
      }
    }
    if(currentScene === 'campLocalJobs2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campInfra3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campTrain3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campAgriTech3';
        fading = true;
      }
    }
    if(currentScene === 'campPartnerCity3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campShare4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campSustain4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campEdu4';
        fading = true;
      }
    }
    if(currentScene === 'campCoop3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campSchool4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campBuyEquip4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campOrganic4';
        fading = true;
      }
    }
    if(currentScene === 'campExport3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campLogistic4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campJointFair4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campTech4';
        fading = true;
      }
    }
    if(currentScene === 'campFestival3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campUrbanCourse4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campRegional4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campSchoolLink4';
        fading = true;
      }
    }
    if(currentScene === 'campEcommerce3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campDigital4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campUrbanLog4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campAgriShop4';
        fading = true;
      }
    }
    if(currentScene === 'campInviteChefs3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campCommunityRest4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campChefComp4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campDoc4';
        fading = true;
      }
    }
    if(currentScene === 'campInfra3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campSolar4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campLocalTech4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campCityMachinery4';
        fading = true;
      }
    }
    if(currentScene === 'campTrain3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campMicroCredit4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campRuralInternet4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campSports4';
        fading = true;
      }
    }
    if(currentScene === 'campAgriTech3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campExpandTech4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campMarketTech4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campInnovationFund4';
        fading = true;
      }
    }
  }
}

function keyPressed() {
  if(!fading) {
    if(currentScene === 'start') {
      if(key === '1') { nextScene = 'city1'; fading = true; }
      if(key === '2') { nextScene = 'camp1'; fading = true; }
    }
    if(currentScene === 'city1') {
      if(key === '1') { nextScene = 'cityInvest1'; fading = true; }
      if(key === '2') { nextScene = 'cityBuy1'; fading = true; }
      if(key === '3') { nextScene = 'cityIgnore1'; fading = true; }
    }
    if(currentScene === 'cityInvest1') {
      if(key === '1') { nextScene = 'cityTrade2'; fading = true; }
      if(key === '2') { nextScene = 'cityCulture2'; fading = true; }
      if(key === '3') { nextScene = 'cityUrbanFocus2'; fading = true; }
    }
    if(currentScene === 'cityBuy1') {
      if(key === '1') { nextScene = 'cityGreen2'; fading = true; }
      if(key === '2') { nextScene = 'cityFestival2'; fading = true; }
      if(key === '3') { nextScene = 'cityTaxCut2'; fading = true; }
    }
    if(currentScene === 'cityIgnore1') {let currentScene = 'start';
let nextScene = '';
let fading = false;
let fadeAlpha = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textSize(18);
}

function draw() {
  if(fading) {
    fill(0, fadeAlpha);
    noStroke();
    rect(0, 0, width, height);
    fadeAlpha += 10;
    if(fadeAlpha >= 255) {
      fadeAlpha = 0;
      fading = false;
      currentScene = nextScene;
    }
    return;
  }

  if(currentScene === 'start') {
    background(240);
  } else if(currentScene.startsWith('city')) {
    background(135, 206, 235);
    fill(80);
    noStroke();
    for(let i = 0; i < width; i += 100) {
      let h = 150 + (i % 3) * 50;
      rect(i, height - h, 80, h);
    }
  } else if(currentScene.startsWith('camp')) {
    background(200, 255, 200);
    fill(255, 204, 0);
    noStroke();
    ellipse(width - 100, 100, 80, 80);
    fill(100, 155, 100);
    rect(0, height - 100, width, 100);
    fill(34, 139, 34);
    rect(width/2 - 10, height - 140, 20, 40);
  }

  if (currentScene === 'start') {
    fill(0);
    text("Você mora em uma pequena cidade no interior do país.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Você percebe que a cidade e o campo dependem um do outro. Prepare-se para", width*0.1, height*0.10 + 30*1);
    fill(0);
    text("fazer escolhas importantes que podem mudar o destino de ambos.", width*0.1, height*0.10 + 30*2);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Morar na cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Morar no campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
  }

  if (currentScene === 'city1') {
    fill(0);
    text("Você vive na cidade grande. Há problemas: a cidade precisa de alimentos do campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("As pessoas do campo precisam dos produtos da cidade. O que você faz?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Investir em fazendas urbanas", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Aumentar as compras de alimentos do campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Ignorar o problema e focar na cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityInvest1') {
    fill(0);
    text("Você investe em fazendas urbanas. Aos poucos, a produção agrícola cresce na cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ainda assim, você sente falta dos produtos típicos do campo. O que fazer agora?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Levar produtos rurais para a feira da cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Organizar eventos culturais rurais na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Continuar focando apenas no crescimento urbano", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityBuy1') {
    fill(0);
    text("Você decide apoiar diretamente os agricultores, comprando mais dos campos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Isso ajuda o campo, mas a cidade ainda sofre com poluição e falta de espaço. O próximo passo?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Investir em energia limpa e transporte", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Promover festivais culturais rurais na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Reduzir impostos para empresas urbanas", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityIgnore1') {
    fill(0);
    text("Você ignora os problemas do campo. Aos poucos, os mercados ficam vazios e a cidade sofre com falta de alimentos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O que você faz agora?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Perceber o erro e ajudar os agricultores", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Tentar cultivar alimentos em prédios abandonados", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Desistir da cidade e voltar ao campo", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityTrade2') {
    fill(0);
    text("Você leva produtos rurais para a feira da cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A comunidade celebra o intercâmbio e muitos aprendem sobre o valor do campo.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Expandir o mercado para outras cidades", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Criar programa educacional sobre agricultura", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Aumentar a produção urbana para exportação", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityCulture2') {
    fill(0);
    text("Você promove cultura rural na cidade. Festivais trazem música e comidas típicas do campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ambos veem valor um no outro.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Convidar fazendeiros para conselhos de planejamento", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Ensinar técnicas agrícolas nas escolas urbanas", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Planejar um projeto de agricultura comunitária", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityUrbanFocus2') {
    fill(0);
    text("Você continua focado no crescimento urbano. A cidade cresce, mas o campo empobrece cada vez mais.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Suprimentos ficam escassos.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Reconhecer o desequilíbrio e mudar de foco", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Construir mais arranha-céus mesmo sem alimentos suficientes", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Incentivar migração do campo para a cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityGreen2') {
    fill(0);
    text("Você investe em energia limpa e transporte. A poluição diminui e as estradas facilitam o escoamento da produção rural.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Ajudar fazendeiros a usar técnicas sustentáveis", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Diversificar as culturas para alimentar cidades maiores", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Criar cooperativas urbanas de agricultura", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityFestival2') {
    fill(0);
    text("Você promove festivais rurais na cidade. A população urbana conhece o campo através da cultura, e a relação se fortalece.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Abrir mercadinho de produtos do campo na cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Estudar formas de irrigação mistas (cidade-campo)", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Levar jovens urbanos para auxiliar na colheita", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityTaxCut2') {
    fill(0);
    text("Você reduz impostos urbanos. As empresas crescem, mas ainda há dependência do campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O campo sente falta de investimentos em tecnologia.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Investir parte do lucro urbano no campo", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Criar zonas verdes e parques agrícolas na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Enviar técnicos urbanos para ensinar no campo", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityHelpFarmers2') {
    fill(0);
    text("Você percebe o erro e volta a ajudar. Trabalhando com fazendeiros, reconstrói a ponte entre cidade e campo.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Estabelecer cooperativas rurais integradas", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Promover educação alimentar nas escolas", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Realizar feira anual de integração cidade-campo", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityHighriseFarm2') {
    fill(0);
    text("Você começa a cultivar em arranha-céus. A produção aumenta, mas o campo sente falta de mão de obra e apoio.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar parcerias com fazendas para pesquisa", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Oferecer cursos de agricultura para jovens urbanos", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Trazer experiências rurais para o prédio agrícola", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityBackCountry2') {
    fill(0);
    text("Você volta para o campo. Lá, conhece a dura realidade rural, mas também a importância do apoio da cidade.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Focar em exportar produtos especializados", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Pedir ajuda da cidade em infraestrutura", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Abrir escola sobre desenvolvimento sustentável", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'cityExpandMarket3') {
    fill(0);
    text("Você expandiu o mercado rural para outras cidades. A economia prospera e a interdependência", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("entre cidade e campo se fortalece. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityEduProgram3') {
    fill(0);
    text("Você criou um programa educacional sobre agricultura. As próximas gerações urbanas aprenderam", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("a valorizar o campo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityExport3') {
    fill(0);
    text("Você aumentou a produção urbana para exportar. Os lucros cresceram, mas percebeu que a cidade ainda", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("precisava do campo para equilíbrio. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityInvFarmers3') {
    fill(0);
    text("Você convidou fazendeiros para conselhos de planejamento. Eles trouxeram ideias valiosas.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo cresceram juntos. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySchools3') {
    fill(0);
    text("Você ensinou técnicas agrícolas nas escolas urbanas. Jovens urbanos passaram a ajudar no campo ocasionalmente.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A união ficou mais forte. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityCommAgr3') {
    fill(0);
    text("Você planejou projetos de agricultura comunitária. Espaços vazios viraram hortas comunitárias, beneficiando todos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityRealize3') {
    fill(0);
    text("Você reconheceu o desequilíbrio e mudou de foco. A partir de então trabalhou lado a lado com o campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Tudo melhorou. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySkyscraper3') {
    fill(0);
    text("Você construiu mais arranha-céus, mas a falta de alimentos causou crise. A cidade enfrentou escassez e aprendeu", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("a lição da dependência. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityEncourageMigration3') {
    fill(0);
    text("Você incentivou migração, esvaziando o campo. A longo prazo, isso gerou falta de alimento e valorizou a sabedoria rural.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade aprendeu o valor do campo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySustainFarm3') {
    fill(0);
    text("Você ajudou fazendeiros a adotarem técnicas sustentáveis. A produção cresceu de forma equilibrada.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo celebram o sucesso conjunto. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityDiversify3') {
    fill(0);
    text("Você diversificou as culturas no campo. A cidade teve mais variedade de alimentos e o campo se tornou mais forte.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityUrbanCoop3') {
    fill(0);
    text("Você criou cooperativas urbanas de agricultura. Jardins comunitários floriram.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A barreira entre cidade e campo ficou mais tênue. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityRuralMarket3') {
    fill(0);
    text("Você abriu um mercadinho de produtos rurais na cidade. Os agricultores ganharam renda justa e a cidade teve alimentos frescos.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityIrrigation3') {
    fill(0);
    text("Você desenvolveu sistemas mistos de irrigação. O campo produziu mais e a cidade ajudou no financiamento.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O esforço conjunto trouxe abundância. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityCityToFarm3') {
    fill(0);
    text("Você levou jovens urbanos para ajudar na colheita. Eles entenderam a vida no campo e divulgaram seu valor.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ambos os lados aprenderam muito. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityInvestField3') {
    fill(0);
    text("Você investiu no campo com parte dos lucros urbanos. A economia rural floresceu e logo todos se beneficiaram.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo prosperaram juntos. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityParks3') {
    fill(0);
    text("Você criou parques agrícolas na cidade. O verde cresceu entre os prédios e as pessoas passaram a valorizar a agricultura.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityTechField3') {
    fill(0);
    text("Você enviou técnicos urbanos para o campo. Inovações aumentaram a produção rural.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A dependência foi substituída pela parceria. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityCoop3') {
    fill(0);
    text("Você estabeleceu cooperativas integradas. Cidade e campo trabalharam em conjunto em todos os níveis.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O resultado foi desenvolvimento equilibrado. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityEduFood3') {
    fill(0);
    text("Você promoveu educação alimentar nas escolas. Jovens aprenderam a importância de cada ambiente.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Ambos celebram seus papéis complementares. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityIntegrationFair3') {
    fill(0);
    text("Você realizou uma feira de integração. As pessoas conheceram as práticas de ambos e entenderam sua interdependência.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityResearch3') {
    fill(0);
    text("Você criou parcerias para pesquisa agrícola. Urbanos trouxeram tecnologia e o campo trouxe conhecimento prático.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Assim todos aprenderam e cresceram. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityYouthAgri3') {
    fill(0);
    text("Você ofereceu cursos de agricultura. Jovens descobriram vocações no campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Um novo fluxo equilibrado de pessoas e ideias se estabeleceu. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityAgriBuilding3') {
    fill(0);
    text("Você integrou experiências rurais no arranha-céu agrícola. Os métodos do campo enriqueceram o cultivo urbano.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Produzir se tornou uma atividade compartilhada. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityExportField3') {
    fill(0);
    text("Você focou em exportar produtos rurais. O campo cresceu em renome internacional,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("mas aprendeu que sem a cidade não teria onde vender. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'cityAskCity3') {
    fill(0);
    text("Você pediu ajuda da cidade em infraestrutura. Parcerias de governo e empresas ligaram campo e cidade com estradas melhores.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Todos foram beneficiados. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'citySustainEdu3') {
    fill(0);
    text("Você abriu uma escola sobre desenvolvimento sustentável. Nova geração aprendeu a equilibrar cidade e campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Isso mudou o futuro para melhor. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'camp1') {
    fill(0);
    text("Você vive em uma comunidade rural. A vida no campo é bela, mas há dificuldades: muitos jovens", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("migram para a cidade em busca de trabalho. O que você faz?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Aumentar a produção e vender mais para a cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Investir em turismo rural e cultura local", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Incentivar empregos locais e infraestrutura", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campProduction2') {
    fill(0);
    text("Você foca em aumentar a produção rural. Os lucros crescem, mas percebe que precisa de ajuda tecnológica e de logística urbana.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Formar parceria com empresas da cidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Criar cooperativa de produtores rurais", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Exportar diretamente para o exterior", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campTourism2') {
    fill(0);
    text("Você investe em turismo rural e mantém a cultura local viva. Isso atrai visitantes da cidade para", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("aprender sobre o campo. Próximo passo?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Organizar um festival anual no campo", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Vender artesanato e produtos pela internet", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Convidar chefs da cidade para trabalhar com você", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campLocalJobs2') {
    fill(0);
    text("Você tenta incentivar empregos locais, mas a infraestrutura é precária. A cidade oferece mais oportunidades.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O que fazer?", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Lutar por melhorias na estrada e internet", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Enviar jovens para treinamento na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Fundar negócio de tecnologia agrícola local", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campPartnerCity3') {
    fill(0);
    text("Você faz parceria com empresas da cidade. Tecnologia urbana chega ao campo e aumenta a produtividade.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Divulgar parceria para outras comunidades", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Investir em pesquisa de sustentabilidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Focar em educação para jovens rurais", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campCoop3') {
    fill(0);
    text("Você cria uma cooperativa forte. Sem intermediários, o campo tem mais renda e influência.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Construir escola rural com os lucros", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Comprar equipamentos agrícolas em grupo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Praticar agricultura orgânica avançada", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campExport3') {
    fill(0);
    text("Você exporta internacionalmente. O campo se torna renomado, mas ainda precisa de infraestrutura urbana para o transporte.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Melhorar logística com a cidade próxima", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Realizar feira de exportação junto com a cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Investir em tecnologia da informação rural", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campFestival3') {
    fill(0);
    text("O festival anual no campo atrai muita gente. Emprego aumenta e a cidade fica mais consciente da vida rural.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar curso de agricultura urbana inspirado no festival", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Fazer do festival um evento regional", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Vincular escolas urbanas ao festival", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campEcommerce3') {
    fill(0);
    text("Você vende produtos do campo pela internet. Assim o mundo inteiro compra do seu quintal.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Treinar jovens em marketing digital", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Melhorar entrega urbana até o campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Combinar turismo e e-commerce (loja na fazenda)", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campInviteChefs3') {
    fill(0);
    text("Chefs urbanos trabalham com você. Novas receitas surgem e mantém jovens envolvidos na culinária rural.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar restaurante comunitário no campo", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Levar cozinheiros do campo para eventos na cidade", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Fazer documentário de receitas locais", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campInfra3') {
    fill(0);
    text("Você consegue melhorias na infraestrutura rural. Jovens começam a ver futuro no campo,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e a cidade se beneficia com produtos mais estáveis.", width*0.1, height*0.10 + 30*1);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Criar projetos de energia solar na comunidade", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Ensinar tecnologia nas escolas rurais", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Fazer parcerias para maquinário agrícola com a cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campTrain3') {
    fill(0);
    text("Juventude treinada na cidade retorna com novas habilidades, mas precisa de oportunidades em casa para ficar.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Oferecer microcrédito para pequenos negócios", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Estabelecer internet de alta velocidade no campo", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Organizar eventos esportivos campo-cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campAgriTech3') {
    fill(0);
    text("Sua empresa de tecnologia agrícola transforma o campo. O campo se moderniza e o resto do país observa.", width*0.1, height*0.10 + 30*0);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*0, width*0.8, 40);
    fill(0);
    text("1. Expandir tecnologia para outras fazendas", width*0.1 + 10, height*0.6 + 50*0 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*1, width*0.8, 40);
    fill(0);
    text("2. Vender tecnologia para cidades também", width*0.1 + 10, height*0.6 + 50*1 + 12);
    stroke(0);
    fill(255);
    rect(width*0.1, height*0.6 + 50*2, width*0.8, 40);
    fill(0);
    text("3. Criar fundo de inovação campo-cidade", width*0.1 + 10, height*0.6 + 50*2 + 12);
  }

  if (currentScene === 'campShare4') {
    fill(0);
    text("Você divulgou a parceria pelo país. Várias comunidades do campo adotaram a ideia.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo cresceram juntos. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campSustain4') {
    fill(0);
    text("Você investiu em pesquisa sustentável. A produção aumentou sem degradar a natureza.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("A interdependência se mantém saudável. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campEdu4') {
    fill(0);
    text("Você focou na educação rural. Jovens aprenderam novas técnicas e colaboram com a cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O futuro ficou mais promissor. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campSchool4') {
    fill(0);
    text("Você construiu uma escola rural. A comunidade estudou e inovou.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("As conexões com a cidade se fortaleceram. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campBuyEquip4') {
    fill(0);
    text("Vocês compraram equipamentos juntos. As máquinas facilitaram o trabalho no campo", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e a cidade forneceu apoio financeiro. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campOrganic4') {
    fill(0);
    text("Você praticou agricultura orgânica avançada. A qualidade dos alimentos melhorou", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e a cidade valorizou ainda mais os produtos rurais. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campLogistic4') {
    fill(0);
    text("Você melhorou a logística com a cidade. Os alimentos chegaram frescos aos mercados,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e o campo viu sua renda estabilizar. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campJointFair4') {
    fill(0);
    text("A feira de exportação conjunta foi um sucesso. Compradores do mundo todo conheceram", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("os produtos rurais, conectados pela infraestrutura da cidade. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campTech4') {
    fill(0);
    text("Você investiu em tecnologia da informação. Comunicação rápida aproximou o campo da cidade.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("O comércio ficou mais eficiente. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campUrbanCourse4') {
    fill(0);
    text("Você criou um curso de agricultura urbana. Visitantes do festival aprenderam noções de cultivo,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("e trouxeram práticas para casa. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campRegional4') {
    fill(0);
    text("O festival virou evento regional. Pessoas de várias cidades vieram,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("fortalecendo o reconhecimento do campo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campSchoolLink4') {
    fill(0);
    text("Você vinculou escolas urbanas ao festival. Jovens da cidade aprenderam sobre o campo.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Essa troca trouxe respeito mútuo. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campDigital4') {
    fill(0);
    text("Você treinou jovens em marketing digital. As vendas online dispararam e mostraram ao mundo a força do campo. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campUrbanLog4') {
    fill(0);
    text("Você melhorou a entrega urbana até o campo. Mercadorias agora circulam facilmente ambos os lados.", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("Cidade e campo ficaram interligados. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campAgriShop4') {
    fill(0);
    text("Você abriu uma loja na fazenda com e-commerce. Visitantes compram no local ou online,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("misturando turismo rural com comércio. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campCommunityRest4') {
    fill(0);
    text("O restaurante comunitário valorizou a culinária local. Chefs e visitantes tornaram o campo famoso pela comida. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campChefComp4') {
    fill(0);
    text("Você levou cozinheiros rurais para eventos na cidade. Isso elevou o orgulho rural e encantou os clientes urbanos. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campDoc4') {
    fill(0);
    text("O documentário de receitas locais viralizou. Agora muitos jovens urbanos querem aprender a cozinhar no campo. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campSolar4') {
    fill(0);
    text("Você criou projetos de energia solar. O campo ficou mais autossustentável e a cidade viu um exemplo verde. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campLocalTech4') {
    fill(0);
    text("Você ensinou tecnologia nas escolas rurais. Jovens aplicaram inovações à agricultura, impressionando a cidade. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campCityMachinery4') {
    fill(0);
    text("Você firmou parcerias para máquinas. A mecanização aumentou a produção rural, e a cidade se orgulhou da eficiência. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campMicroCredit4') {
    fill(0);
    text("Você ofereceu microcrédito. Pequenos negócios rurais nasceram e a juventude se animou a ficar. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campRuralInternet4') {
    fill(0);
    text("Você estabeleceu internet no campo. Com comunicação online, a comunidade inovou em conjunto com a cidade. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campSports4') {
    fill(0);
    text("Eventos esportivos uniram os jovens do campo e da cidade. A conexão social reforçou o laço entre ambos. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campExpandTech4') {
    fill(0);
    text("Você expandiu a tecnologia para mais fazendas. O conhecimento tecnológico espalhou-se no campo,", width*0.1, height*0.10 + 30*0);
    fill(0);
    text("puxando desenvolvimento junto com a cidade. Fim.", width*0.1, height*0.10 + 30*1);
  }

  if (currentScene === 'campMarketTech4') {
    fill(0);
    text("Você vendeu a tecnologia também para a cidade. Assim, ambos se beneficiaram das inovações. Fim.", width*0.1, height*0.10 + 30*0);
  }

  if (currentScene === 'campInnovationFund4') {
    fill(0);
    text("Você criou um fundo de inovação. Novos projetos campo-cidade surgiram, unindo esforços para o bem comum. Fim.", width*0.1, height*0.10 + 30*0);
  }
}

function mousePressed() {
  if(!fading) {
    if(currentScene === 'start') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'city1';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'camp1';
        fading = true;
      }
    }
    if(currentScene === 'city1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityInvest1';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityBuy1';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityIgnore1';
        fading = true;
      }
    }
    if(currentScene === 'cityInvest1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityTrade2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityCulture2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityUrbanFocus2';
        fading = true;
      }
    }
    if(currentScene === 'cityBuy1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityGreen2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityFestival2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityTaxCut2';
        fading = true;
      }
    }
    if(currentScene === 'cityIgnore1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityHelpFarmers2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityHighriseFarm2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityBackCountry2';
        fading = true;
      }
    }
    if(currentScene === 'cityTrade2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityExpandMarket3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityEduProgram3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityExport3';
        fading = true;
      }
    }
    if(currentScene === 'cityCulture2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityInvFarmers3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'citySchools3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityCommAgr3';
        fading = true;
      }
    }
    if(currentScene === 'cityUrbanFocus2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityRealize3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'citySkyscraper3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityEncourageMigration3';
        fading = true;
      }
    }
    if(currentScene === 'cityGreen2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'citySustainFarm3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityDiversify3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityUrbanCoop3';
        fading = true;
      }
    }
    if(currentScene === 'cityFestival2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityRuralMarket3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityIrrigation3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityCityToFarm3';
        fading = true;
      }
    }
    if(currentScene === 'cityTaxCut2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityInvestField3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityParks3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityTechField3';
        fading = true;
      }
    }
    if(currentScene === 'cityHelpFarmers2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityCoop3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityEduFood3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityIntegrationFair3';
        fading = true;
      }
    }
    if(currentScene === 'cityHighriseFarm2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityResearch3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityYouthAgri3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'cityAgriBuilding3';
        fading = true;
      }
    }
    if(currentScene === 'cityBackCountry2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'cityExportField3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'cityAskCity3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'citySustainEdu3';
        fading = true;
      }
    }
    if(currentScene === 'camp1') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campProduction2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campTourism2';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campLocalJobs2';
        fading = true;
      }
    }
    if(currentScene === 'campProduction2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campPartnerCity3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campCoop3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campExport3';
        fading = true;
      }
    }
    if(currentScene === 'campTourism2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campFestival3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campEcommerce3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campInviteChefs3';
        fading = true;
      }
    }
    if(currentScene === 'campLocalJobs2') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campInfra3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campTrain3';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campAgriTech3';
        fading = true;
      }
    }
    if(currentScene === 'campPartnerCity3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campShare4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campSustain4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campEdu4';
        fading = true;
      }
    }
    if(currentScene === 'campCoop3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campSchool4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campBuyEquip4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campOrganic4';
        fading = true;
      }
    }
    if(currentScene === 'campExport3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campLogistic4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campJointFair4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campTech4';
        fading = true;
      }
    }
    if(currentScene === 'campFestival3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campUrbanCourse4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campRegional4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campSchoolLink4';
        fading = true;
      }
    }
    if(currentScene === 'campEcommerce3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campDigital4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campUrbanLog4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campAgriShop4';
        fading = true;
      }
    }
    if(currentScene === 'campInviteChefs3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campCommunityRest4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campChefComp4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campDoc4';
        fading = true;
      }
    }
    if(currentScene === 'campInfra3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campSolar4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campLocalTech4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campCityMachinery4';
        fading = true;
      }
    }
    if(currentScene === 'campTrain3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campMicroCredit4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campRuralInternet4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campSports4';
        fading = true;
      }
    }
    if(currentScene === 'campAgriTech3') {
      let x0 = width*0.1;
      let x1 = width*0.9;
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*0 && mouseY < height*0.6 + 50*0 + 40) {
        nextScene = 'campExpandTech4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*1 && mouseY < height*0.6 + 50*1 + 40) {
        nextScene = 'campMarketTech4';
        fading = true;
      }
      if(mouseX > x0 && mouseX < x1 && mouseY > height*0.6 + 50*2 && mouseY < height*0.6 + 50*2 + 40) {
        nextScene = 'campInnovationFund4';
        fading = true;
      }
    }
  }
}

function keyPressed() {
  if(!fading) {
    if(currentScene === 'start') {
      if(key === '1') { nextScene = 'city1'; fading = true; }
      if(key === '2') { nextScene = 'camp1'; fading = true; }
    }
    if(currentScene === 'city1') {
      if(key === '1') { nextScene = 'cityInvest1'; fading = true; }
      if(key === '2') { nextScene = 'cityBuy1'; fading = true; }
      if(key === '3') { nextScene = 'cityIgnore1'; fading = true; }
    }
    if(currentScene === 'cityInvest1') {
      if(key === '1') { nextScene = 'cityTrade2'; fading = true; }
      if(key === '2') { nextScene = 'cityCulture2'; fading = true; }
      if(key === '3') { nextScene = 'cityUrbanFocus2'; fading = true; }
    }
    if(currentScene === 'cityBuy1') {
      if(key === '1') { nextScene = 'cityGreen2'; fading = true; }
      if(key === '2') { nextScene = 'cityFestival2'; fading = true; }
      if(key === '3') { nextScene = 'cityTaxCut2'; fading = true; }
    }
    if(currentScene === 'cityIgnore1') {
      if(key === '1') { nextScene = 'cityHelpFarmers2'; fading = true; }
      if(key === '2') { nextScene = 'cityHighriseFarm2'; fading = true; }
      if(key === '3') { nextScene = 'cityBackCountry2'; fading = true; }
    }
    if(currentScene === 'cityTrade2') {
      if(key === '1') { nextScene = 'cityExpandMarket3'; fading = true; }
      if(key === '2') { nextScene = 'cityEduProgram3'; fading = true; }
      if(key === '3') { nextScene = 'cityExport3'; fading = true; }
    }
    if(currentScene === 'cityCulture2') {
      if(key === '1') { nextScene = 'cityInvFarmers3'; fading = true; }
      if(key === '2') { nextScene = 'citySchools3'; fading = true; }
      if(key === '3') { nextScene = 'cityCommAgr3'; fading = true; }
    }
    if(currentScene === 'cityUrbanFocus2') {
      if(key === '1') { nextScene = 'cityRealize3'; fading = true; }
      if(key === '2') { nextScene = 'citySkyscraper3'; fading = true; }
      if(key === '3') { nextScene = 'cityEncourageMigration3'; fading = true; }
    }
    if(currentScene === 'cityGreen2') {
      if(key === '1') { nextScene = 'citySustainFarm3'; fading = true; }
      if(key === '2') { nextScene = 'cityDiversify3'; fading = true; }
      if(key === '3') { nextScene = 'cityUrbanCoop3'; fading = true; }
    }
    if(currentScene === 'cityFestival2') {
      if(key === '1') { nextScene = 'cityRuralMarket3'; fading = true; }
      if(key === '2') { nextScene = 'cityIrrigation3'; fading = true; }
      if(key === '3') { nextScene = 'cityCityToFarm3'; fading = true; }
    }
    if(currentScene === 'cityTaxCut2') {
      if(key === '1') { nextScene = 'cityInvestField3'; fading = true; }
      if(key === '2') { nextScene = 'cityParks3'; fading = true; }
      if(key === '3') { nextScene = 'cityTechField3'; fading = true; }
    }
    if(currentScene === 'cityHelpFarmers2') {
      if(key === '1') { nextScene = 'cityCoop3'; fading = true; }
      if(key === '2') { nextScene = 'cityEduFood3'; fading = true; }
      if(key === '3') { nextScene = 'cityIntegrationFair3'; fading = true; }
    }
    if(currentScene === 'cityHighriseFarm2') {
      if(key === '1') { nextScene = 'cityResearch3'; fading = true; }
      if(key === '2') { nextScene = 'cityYouthAgri3'; fading = true; }
      if(key === '3') { nextScene = 'cityAgriBuilding3'; fading = true; }
    }
    if(currentScene === 'cityBackCountry2') {
      if(key === '1') { nextScene = 'cityExportField3'; fading = true; }
      if(key === '2') { nextScene = 'cityAskCity3'; fading = true; }
      if(key === '3') { nextScene = 'citySustainEdu3'; fading = true; }
    }
    if(currentScene === 'camp1') {
      if(key === '1') { nextScene = 'campProduction2'; fading = true; }
      if(key === '2') { nextScene = 'campTourism2'; fading = true; }
      if(key === '3') { nextScene = 'campLocalJobs2'; fading = true; }
    }
    if(currentScene === 'campProduction2') {
      if(key === '1') { nextScene = 'campPartnerCity3'; fading = true; }
      if(key === '2') { nextScene = 'campCoop3'; fading = true; }
      if(key === '3') { nextScene = 'campExport3'; fading = true; }
    }
    if(currentScene === 'campTourism2') {
      if(key === '1') { nextScene = 'campFestival3'; fading = true; }
      if(key === '2') { nextScene = 'campEcommerce3'; fading = true; }
      if(key === '3') { nextScene = 'campInviteChefs3'; fading = true; }
    }
    if(currentScene === 'campLocalJobs2') {
      if(key === '1') { nextScene = 'campInfra3'; fading = true; }
      if(key === '2') { nextScene = 'campTrain3'; fading = true; }
      if(key === '3') { nextScene = 'campAgriTech3'; fading = true; }
    }
    if(currentScene === 'campPartnerCity3') {
      if(key === '1') { nextScene = 'campShare4'; fading = true; }
      if(key === '2') { nextScene = 'campSustain4'; fading = true; }
      if(key === '3') { nextScene = 'campEdu4'; fading = true; }
    }
    if(currentScene === 'campCoop3') {
      if(key === '1') { nextScene = 'campSchool4'; fading = true; }
      if(key === '2') { nextScene = 'campBuyEquip4'; fading = true; }
      if(key === '3') { nextScene = 'campOrganic4'; fading = true; }
    }
    if(currentScene === 'campExport3') {
      if(key === '1') { nextScene = 'campLogistic4'; fading = true; }
      if(key === '2') { nextScene = 'campJointFair4'; fading = true; }
      if(key === '3') { nextScene = 'campTech4'; fading = true; }
    }
    if(currentScene === 'campFestival3') {
      if(key === '1') { nextScene = 'campUrbanCourse4'; fading = true; }
      if(key === '2') { nextScene = 'campRegional4'; fading = true; }
      if(key === '3') { nextScene = 'campSchoolLink4'; fading = true; }
    }
    if(currentScene === 'campEcommerce3') {
      if(key === '1') { nextScene = 'campDigital4'; fading = true; }
      if(key === '2') { nextScene = 'campUrbanLog4'; fading = true; }
      if(key === '3') { nextScene = 'campAgriShop4'; fading = true; }
    }
    if(currentScene === 'campInviteChefs3') {
      if(key === '1') { nextScene = 'campCommunityRest4'; fading = true; }
      if(key === '2') { nextScene = 'campChefComp4'; fading = true; }
      if(key === '3') { nextScene = 'campDoc4'; fading = true; }
    }
    if(currentScene === 'campInfra3') {
      if(key === '1') { nextScene = 'campSolar4'; fading = true; }
      if(key === '2') { nextScene = 'campLocalTech4'; fading = true; }
      if(key === '3') { nextScene = 'campCityMachinery4'; fading = true; }
    }
    if(currentScene === 'campTrain3') {
      if(key === '1') { nextScene = 'campMicroCredit4'; fading = true; }
      if(key === '2') { nextScene = 'campRuralInternet4'; fading = true; }
      if(key === '3') { nextScene = 'campSports4'; fading = true; }
    }
    if(currentScene === 'campAgriTech3') {
      if(key === '1') { nextScene = 'campExpandTech4'; fading = true; }
      if(key === '2') { nextScene = 'campMarketTech4'; fading = true; }
      if(key === '3') { nextScene = 'campInnovationFund4'; fading = true; }
    }
  }
}

let dummyVar0 = 0;
let dummyVar1 = 0;
let dummyVar2 = 0;
let dummyVar3 = 0;
let dummyVar4 = 0;
let dummyVar5 = 0;
let dummyVar6 = 0;
let dummyVar7 = 0;
let dummyVar8 = 0;
let dummyVar9 = 0;
let dummyVar10 = 0;
let dummyVar11 = 0;
let dummyVar12 = 0;
let dummyVar13 = 0;
let dummyVar14 = 0;
let dummyVar15 = 0;
let dummyVar16 = 0;
let dummyVar17 = 0;
let filler0 = 0;
let filler1 = 0;
let filler2 = 0;
let filler3 = 0;
let filler4 = 0;
let filler5 = 0;
let filler6 = 0;
let filler7 = 0;
let filler8 = 0;
let filler9 = 0;
let filler10 = 0;
let filler11 = 0;
let filler12 = 0;
let filler13 = 0;
let filler14 = 0;
let filler15 = 0;
let filler16 = 0;
let filler17 = 0;

      if(key === '1') { nextScene = 'cityHelpFarmers2'; fading = true; }
      if(key === '2') { nextScene = 'cityHighriseFarm2'; fading = true; }
      if(key === '3') { nextScene = 'cityBackCountry2'; fading = true; }
    }
    if(currentScene === 'cityTrade2') {
      if(key === '1') { nextScene = 'cityExpandMarket3'; fading = true; }
      if(key === '2') { nextScene = 'cityEduProgram3'; fading = true; }
      if(key === '3') { nextScene = 'cityExport3'; fading = true; }
    }
    if(currentScene === 'cityCulture2') {
      if(key === '1') { nextScene = 'cityInvFarmers3'; fading = true; }
      if(key === '2') { nextScene = 'citySchools3'; fading = true; }
      if(key === '3') { nextScene = 'cityCommAgr3'; fading = true; }
    }
    if(currentScene === 'cityUrbanFocus2') {
      if(key === '1') { nextScene = 'cityRealize3'; fading = true; }
      if(key === '2') { nextScene = 'citySkyscraper3'; fading = true; }
      if(key === '3') { nextScene = 'cityEncourageMigration3'; fading = true; }
    }
    if(currentScene === 'cityGreen2') {
      if(key === '1') { nextScene = 'citySustainFarm3'; fading = true; }
      if(key === '2') { nextScene = 'cityDiversify3'; fading = true; }
      if(key === '3') { nextScene = 'cityUrbanCoop3'; fading = true; }
    }
    if(currentScene === 'cityFestival2') {
      if(key === '1') { nextScene = 'cityRuralMarket3'; fading = true; }
      if(key === '2') { nextScene = 'cityIrrigation3'; fading = true; }
      if(key === '3') { nextScene = 'cityCityToFarm3'; fading = true; }
    }
    if(currentScene === 'cityTaxCut2') {
      if(key === '1') { nextScene = 'cityInvestField3'; fading = true; }
      if(key === '2') { nextScene = 'cityParks3'; fading = true; }
      if(key === '3') { nextScene = 'cityTechField3'; fading = true; }
    }
    if(currentScene === 'cityHelpFarmers2') {
      if(key === '1') { nextScene = 'cityCoop3'; fading = true; }
      if(key === '2') { nextScene = 'cityEduFood3'; fading = true; }
      if(key === '3') { nextScene = 'cityIntegrationFair3'; fading = true; }
    }
    if(currentScene === 'cityHighriseFarm2') {
      if(key === '1') { nextScene = 'cityResearch3'; fading = true; }
      if(key === '2') { nextScene = 'cityYouthAgri3'; fading = true; }
      if(key === '3') { nextScene = 'cityAgriBuilding3'; fading = true; }
    }
    if(currentScene === 'cityBackCountry2') {
      if(key === '1') { nextScene = 'cityExportField3'; fading = true; }
      if(key === '2') { nextScene = 'cityAskCity3'; fading = true; }
      if(key === '3') { nextScene = 'citySustainEdu3'; fading = true; }
    }
    if(currentScene === 'camp1') {
      if(key === '1') { nextScene = 'campProduction2'; fading = true; }
      if(key === '2') { nextScene = 'campTourism2'; fading = true; }
      if(key === '3') { nextScene = 'campLocalJobs2'; fading = true; }
    }
    if(currentScene === 'campProduction2') {
      if(key === '1') { nextScene = 'campPartnerCity3'; fading = true; }
      if(key === '2') { nextScene = 'campCoop3'; fading = true; }
      if(key === '3') { nextScene = 'campExport3'; fading = true; }
    }
    if(currentScene === 'campTourism2') {
      if(key === '1') { nextScene = 'campFestival3'; fading = true; }
      if(key === '2') { nextScene = 'campEcommerce3'; fading = true; }
      if(key === '3') { nextScene = 'campInviteChefs3'; fading = true; }
    }
    if(currentScene === 'campLocalJobs2') {
      if(key === '1') { nextScene = 'campInfra3'; fading = true; }
      if(key === '2') { nextScene = 'campTrain3'; fading = true; }
      if(key === '3') { nextScene = 'campAgriTech3'; fading = true; }
    }
    if(currentScene === 'campPartnerCity3') {
      if(key === '1') { nextScene = 'campShare4'; fading = true; }
      if(key === '2') { nextScene = 'campSustain4'; fading = true; }
      if(key === '3') { nextScene = 'campEdu4'; fading = true; }
    }
    if(currentScene === 'campCoop3') {
      if(key === '1') { nextScene = 'campSchool4'; fading = true; }
      if(key === '2') { nextScene = 'campBuyEquip4'; fading = true; }
      if(key === '3') { nextScene = 'campOrganic4'; fading = true; }
    }
    if(currentScene === 'campExport3') {
      if(key === '1') { nextScene = 'campLogistic4'; fading = true; }
      if(key === '2') { nextScene = 'campJointFair4'; fading = true; }
      if(key === '3') { nextScene = 'campTech4'; fading = true; }
    }
    if(currentScene === 'campFestival3') {
      if(key === '1') { nextScene = 'campUrbanCourse4'; fading = true; }
      if(key === '2') { nextScene = 'campRegional4'; fading = true; }
      if(key === '3') { nextScene = 'campSchoolLink4'; fading = true; }
    }
    if(currentScene === 'campEcommerce3') {
      if(key === '1') { nextScene = 'campDigital4'; fading = true; }
      if(key === '2') { nextScene = 'campUrbanLog4'; fading = true; }
      if(key === '3') { nextScene = 'campAgriShop4'; fading = true; }
    }
    if(currentScene === 'campInviteChefs3') {
      if(key === '1') { nextScene = 'campCommunityRest4'; fading = true; }
      if(key === '2') { nextScene = 'campChefComp4'; fading = true; }
      if(key === '3') { nextScene = 'campDoc4'; fading = true; }
    }
    if(currentScene === 'campInfra3') {
      if(key === '1') { nextScene = 'campSolar4'; fading = true; }
      if(key === '2') { nextScene = 'campLocalTech4'; fading = true; }
      if(key === '3') { nextScene = 'campCityMachinery4'; fading = true; }
    }
    if(currentScene === 'campTrain3') {
      if(key === '1') { nextScene = 'campMicroCredit4'; fading = true; }
      if(key === '2') { nextScene = 'campRuralInternet4'; fading = true; }
      if(key === '3') { nextScene = 'campSports4'; fading = true; }
    }
    if(currentScene === 'campAgriTech3') {
      if(key === '1') { nextScene = 'campExpandTech4'; fading = true; }
      if(key === '2') { nextScene = 'campMarketTech4'; fading = true; }
      if(key === '3') { nextScene = 'campInnovationFund4'; fading = true; }
    }
  }
}

let dummyVar0 = 0;
let dummyVar1 = 0;
let dummyVar2 = 0;
let dummyVar3 = 0;
let dummyVar4 = 0;
let dummyVar5 = 0;
let dummyVar6 = 0;
let dummyVar7 = 0;
let dummyVar8 = 0;
let dummyVar9 = 0;
let dummyVar10 = 0;
let dummyVar11 = 0;
let dummyVar12 = 0;
let dummyVar13 = 0;
let dummyVar14 = 0;
let dummyVar15 = 0;
let dummyVar16 = 0;
let dummyVar17 = 0;
let filler0 = 0;
let filler1 = 0;
let filler2 = 0;
let filler3 = 0;
let filler4 = 0;
let filler5 = 0;
let filler6 = 0;
let filler7 = 0;
let filler8 = 0;
let filler9 = 0;
let filler10 = 0;
let filler11 = 0;
let filler12 = 0;
let filler13 = 0;
let filler14 = 0;
let filler15 = 0;
let filler16 = 0;
let filler17 = 0;
// nesse projeto eu tentei criar um jogo em que dependendo de suas escolhas o fim muda para mostrar a conexão que o campo e a cidade possuem.