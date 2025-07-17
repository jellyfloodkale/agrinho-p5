#agrinho

Este projeto é um jogo de simulação e estratégia agrícola denominado "Festival da Colheita", que foi criado utilizando P5.js. O jogador tem como meta administrar uma cooperativa de agricultura para aumentar os lucros em um período de 40 dias. 
Para atingir esse objetivo, é necessário selecionar as culturas a serem plantadas considerando fatores como custo, tempo de crescimento e preço de venda, gerenciar o capital para reinvestir em novas safras e determinar o momento de avançar os dias. 
O jogo introduz complexidade adicional com eventos aleatórios, incluindo alterações climáticas e variações de mercado, além de obstáculos logísticos que requerem decisões rápidas, tornando cada partida singular.

Do ponto de vista técnico, o jogo se baseia em uma arquitetura com estado centralizado, onde a variável gameState contém todas as informações que mudam dinamicamente, como o dia atual, o saldo em dinheiro e a condição de cada terreno. 
A função draw() é encarregada de representar visualmente esse estado na tela, enquanto a função mousePressed() registra as ações do jogador, como cliques para plantar, colher ou avançar o tempo. 
Funções lógicas, como passarDia() e plantar(), alteram o gameState, completando o ciclo de interações que define a jogabilidade. Essa organização clara distingue os dados, a apresentação e as ações, resultando em um código bem estruturado e eficiente.

Este projeto foi desenvolvido com auxilio da IA Gemini do Google 
https://gemini.google.com/app?hl=pt-BR
