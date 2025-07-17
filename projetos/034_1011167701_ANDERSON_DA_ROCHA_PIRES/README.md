Ligue o Produtor ao Produto 

Este jogo interativo foi desenvolvido como parte do Concurso Agrinho de Programação com o objetivo de aproximar os estudantes da realidade do campo de forma acessível, inclusiva e divertida. Criado especialmente para crianças e jovens, incluindo pessoas com Transtorno do Espectro Autista (TEA), o jogo utiliza recursos visuais simples e diretos (como emojis) e mecânicas intuitivas de arrastar e soltar, favorecendo a compreensão e o engajamento.

O projeto foi feito utilizando a biblioteca p5.js, que permite criar experiências visuais e interativas no navegador, com animações e sons simples.

Por que o jogo foi criado?

Incentivar o aprendizado lúdico sobre o campo, promovendo o tema "Festejando a Conexão entre Campo e Cidade" do Agrinho.
Valorizar o trabalho do produtor rural e sua relação com os produtos do dia a dia.
Oferecer um recurso digital acessível e estimulante para pessoas autistas, com:
  - Padrões visuais claros.
  - Regras simples e reforço positivo ao final.
  - Sem tempo limite, respeitando o ritmo do jogador.

Como Jogar

1. Ao abrir o jogo, uma tela de boas-vindas exibe as instruções.
2. Clique em "Começar" para iniciar a partida.
3. No lado esquerdo da tela estão os produtores (vaca, galinha, ovelha, abelha).
4. No lado direito estão os produtos (leite, ovo, lã, mel).
5. Clique e arraste uma linha do produtor até o produto correspondente.
6. Quando todos os pares forem conectados corretamente, uma mensagem de parabéns aparece!

Como Funciona o Código

O jogo foi programado com JavaScript + p5.js, e utiliza as seguintes funcionalidades:

- `map()` – para ajustar posições e transições.
- `random()` – para colorir dinamicamente o fundo.
- `lerpColor()` – para animar transições suaves de cores.
- `mousePressed()` / `mouseReleased()` – para lidar com os cliques e arrastes do jogador.
- Objetos simples (como `Pair`) armazenam as ligações entre produtores e produtos.
- O fundo animado dá vida à tela sem poluir visualmente.
