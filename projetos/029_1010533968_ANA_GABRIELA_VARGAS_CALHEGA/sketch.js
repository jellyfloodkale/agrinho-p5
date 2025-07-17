let perguntas = [
  ["1. Qual é a principal característica do campo?", ["a) Grande concentração de prédios", "b) Muitas atividades industriais", "c) Áreas de cultivo e contato com a natureza", "d) Transporte público eficiente"], 3],
  ["2. Qual dessas opções é mais comum em uma cidade?", ["a) Fazendas", "b) Trânsito intenso", "c) Produção agrícola em larga escala", "d) Pecuária"], 2],
  ["3. O que caracteriza a vida no campo, em comparação com a cidade?", ["a) Mais barulho e poluição", "b) Menor número de pessoas e atividades mais tranquilas", "c) Maior presença de serviços de saúde", "d) Menos natureza e áreas verdes"], 2],
  ["4. Em qual tipo de ambiente é mais fácil encontrar indústrias e comércios de grande porte?", ["a) No campo", "b) Na cidade", "c) Na zona rural", "d) Em vilarejos pequenos"], 2],
  ["5. Qual é a vantagem de se viver no campo?", ["a) Acessibilidade a serviços de saúde de alta qualidade", "b) Contato constante com a natureza e um ar mais puro", "c) Facilidade para se deslocar a pé", "d) Diversidade de opções de lazer como shopping centers"], 2]
];

let atual = 0; // Índice da pergunta atual
let pontos = 0; // Pontuação do jogador
let fim = false; // Indica se o quiz terminou

function setup() {
  createCanvas(800, 400); // Cria a tela do jogo
  textSize(18); // Define o tamanho do texto
  textAlign(LEFT, CENTER); // Alinha o texto à esquerda e centralizado verticalmente
}

function draw() {
  background(240); // Cor de fundo cinza claro
  fill(0); // Cor do texto preta

  if (!fim) {
    // Exibe a pergunta atual
    text(perguntas[atual][0], 50, 40);

    // Exibe as opções de resposta
    for (let i = 0; i < 4; i++) {
      let yPos = 100 + i * 60; // Posição Y para cada opção
      fill(200); // Cor dos retângulos das opções
      // Desenha o retângulo da opção
      rect(50, yPos, 700, 40, 10);
      fill(0); // Cor do texto das opções
      // Exibe o texto da opção
      text(perguntas[atual][1][i], 60, yPos + 20);
    }
  } else {
    // Tela final do quiz
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Quiz Finalizado!", width / 2, height / 2 - 50);
    text("Sua pontuação: " + pontos + " de " + perguntas.length, width / 2, height / 2 + 10);
  }
}

function mousePressed() {
  if (!fim) {
    // Verifica qual opção foi clicada
    for (let i = 0; i < 4; i++) {
      let yPos = 100 + i * 60;
      // Verifica se o clique está dentro do retângulo da opção
      if (mouseX > 50 && mouseX < 750 && mouseY > yPos && mouseY < yPos + 40) {
        // Se a opção clicada for a resposta correta
        if (i + 1 === perguntas[atual][2]) {
          pontos++; // Incrementa a pontuação
        }
        atual++; // Passa para a próxima pergunta

        // Verifica se todas as perguntas foram respondidas
        if (atual >= perguntas.length) {
          fim = true; // Define o fim do quiz
        }
        break; // Sai do loop para evitar múltiplas verificações
      }
    }
  } else {
    // Se o quiz terminou, um clique reinicia o quiz
    atual = 0;
    pontos = 0;
    fim = false;
  }
}