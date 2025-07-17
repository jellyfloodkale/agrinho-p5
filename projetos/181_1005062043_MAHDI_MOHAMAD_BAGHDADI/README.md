# agrinhoCicloDaAgua
Projeto Ciclo Da Agua 
Ciclo da Água Interativo
Este é um projeto interativo que simula o ciclo da água de forma visual e educativa, utilizando a biblioteca p5.js. O ciclo da água é apresentado em três fases principais: evaporação, condensação e precipitação. O usuário pode interagir com o ciclo clicando na tela para alternar entre as diferentes fases, observando o processo de mudança na animação.

Funcionalidades
Evaporação: O sol aquece a água e a transforma em vapor, representado por linhas ascendentes.

Condensação: O vapor se transforma em gotas de água que começam a cair pela tela.

Precipitação: As gotas de água caem pela tela, representando a chuva.

Interatividade: O ciclo pode ser controlado pelo usuário com um clique, alternando entre as fases de evaporação, condensação e precipitação.

Tecnologias Usadas
p5.js: Biblioteca JavaScript para criar gráficos interativos e animações no navegador.

JavaScript: Linguagem de programação usada para implementar a lógica do ciclo da água.

Como Rodar
Clone este repositório para o seu computador:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/ciclo-da-agua.git
Abra o arquivo index.html em seu navegador. O projeto irá carregar e você poderá interagir com a simulação do ciclo da água.

Estrutura do Código
Funções principais:
setup(): Inicializa o ambiente gráfico, configura o tamanho da tela e o alinhamento do texto.

draw(): Função principal que desenha o cenário, o sol, a nuvem, o campo, a cidade e a animação do ciclo da água.

desenhaSol(): Desenha o sol no céu.

desenhaNuvem(): Desenha uma nuvem que se move horizontalmente.

desenhaTerreno(): Desenha o terreno dividindo entre campo e cidade.

desenhaCampo(): Desenha o campo, incluindo árvores e casas.

desenhaCidade(): Desenha prédios da cidade.

evaporarAgua(): Simula o processo de evaporação, com linhas representando vapor de água subindo.

condensarAgua(): Simula a condensação, onde o vapor de água se transforma em gotas.

precipitarAgua(): Simula a precipitação, onde as gotas de água caem pela tela.

desenhaInfo(): Exibe informações sobre o ciclo da água e incentiva a conscientização ambiental.

Gota: Classe que representa uma gota de água, com métodos para atualizar sua posição e desenhá-la na tela.

mousePressed(): Permite ao usuário interagir com o ciclo da água, alternando entre as fases com um clique.

Imagens e Animações
Cenário: O cenário é composto por um céu, nuvem, campo e cidade, representando diferentes ambientes naturais e urbanos.

Animação: A animação mostra o ciclo da água em três fases: evaporação, condensação e precipitação, com gotas de água sendo desenhadas na tela.

Créditos
p5.js: A biblioteca utilizada para gráficos e animações interativas.

Website oficial: https://p5js.org


