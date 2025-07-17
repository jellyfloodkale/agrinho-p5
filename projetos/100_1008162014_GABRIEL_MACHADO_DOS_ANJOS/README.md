# Jogo da Memória: Festejando a Conexão Campo-Cidade

## Sobre o Projeto (Objetivos)

Este projeto foi desenvolvido como parte do **Programa Agrinho** e tem como objetivo principal explorar o tema **"Festejando a conexão campo cidade"**. O jogo da memória foi criado para transmitir, de forma lúdica e interativa, a profunda interdependência entre as zonas rural e urbana.

O objetivo central é evidenciar a conexão que campo e cidade têm um para o outro. Cada par de cartas encontrado revela uma mensagem informativa, transformando cada acerto em um momento de aprendizado e reflexão sobre como o campo e a cidade se complementam e fortalecem mutuamente. O projeto busca celebrar essa conexão, demonstrando que a qualidade de vida em um ambiente está diretamente ligada à produtividade e ao bem-estar do outro.

## Como Jogar (Funcionamento)

A interface do jogo foi projetada para ser intuitiva e acessível.  As instruções de interação são as seguintes:

1.  **Início:** O jogo começa com 20 cartas viradas para baixo.
2.  **Interação:**
    * Passe o mouse sobre as cartas para ver um efeito de destaque, indicando que são interativas.
    * Clique em uma carta para virá-la e revelar seu ícone.
    * Clique em uma segunda carta para tentar encontrar o seu par.
3.  **Feedback:**
    * **Par Correto:** Se as cartas formarem um par, elas permanecerão viradas para cima, sua pontuação aumentará e uma caixa de mensagem aparecerá por 5 segundos, exibindo uma curiosidade sobre a conexão campo-cidade relacionada àquele ícone.
    * **Par Incorreto:** Se as cartas não forem iguais, elas permanecerão visíveis por 1 segundo antes de virarem para baixo novamente, permitindo que o jogador memorize suas posições.
4.  **Fim de Jogo:** Ao encontrar todos os 10 pares, uma tela de "Parabéns!" é exibida com a pontuação final. O fundo da tela também muda de cor suavemente para celebrar a vitória.
5.  **Reiniciar:** Na tela de vitória, basta clicar em qualquer lugar para recarregar a página e iniciar uma nova partida.

## Funcionalidades e Detalhes Técnicos

O projeto foi desenvolvido inteiramente em **JavaScript**, utilizando a biblioteca **p5.js** para a renderização e interatividade.  

* **Estrutura de Código:** Foram utilizadas as funções essenciais `setup()` e `draw()`, além de variáveis (`let`), condicionais (`if/else`) e laços de repetição (`for`) para a lógica principal. 
* **Interatividade com o Mouse:** O jogo é controlado primariamente pela função de evento `mousePressed()`, que gerencia toda a lógica de virar e verificar as cartas. 
* **Animações e Efeitos Visuais:**
    * **Hover:** Um efeito visual de destaque na borda das cartas é aplicado quando o mouse passa sobre elas, melhorando a responsividade da interface.
    * **Transição de Cor:** Ao finalizar o jogo, a função `lerpColor()` é utilizada para criar uma transição suave na cor de fundo, adicionando um polimento visual à tela de vitória. 
* **Programação Orientada a Objetos:** O código utiliza uma `class Carta` para modularizar e organizar o comportamento e as propriedades de cada carta (posição, valor, estado), tornando o código mais limpo e escalável.
* **Funções Auxiliares:** Para manter a função `draw()` organizada, a lógica de desenho foi dividida em funções menores e reutilizáveis, como `desenharCartas()`, `desenharHUD()`, `desenharCaixaDeMensagem()` e `desenharTelaFinal()`. 

## Créditos
* Os emojis utilizados nas cartas foram retirados do site: [Getemoji](https://getemoji.com/)
* **Desenvolvimento:** Gabriel Machado dos Anjos
* **Programa:** Programa Agrinho 2025
* **Hashtag Oficial:** #agrinho