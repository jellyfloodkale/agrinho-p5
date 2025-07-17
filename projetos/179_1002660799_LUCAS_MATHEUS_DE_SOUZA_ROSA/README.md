# agrinho
Agrinho é o maior programa de responsabilidade social do Sistema FAEP, resultado da parceria entre o SENAR-PR, FAEP, o governo do Estado do Paraná, mediante as Secretarias de Estado da Educação e do Esporte, da Agricultura e do Abastecimento, da Justiça, Família e Trabalho e do Desenvolvimento Sustentável e do Turismo, bem como com a colaboração das Prefeituras municipais e diversas empresas e instituições públicas e privadas.

O Programa completa 26 anos de trabalhos no Paraná. Concebido em 1995, foi à campo em 1996, levando às escolas da rede pública de ensino uma proposta pedagógica baseada em visão complexa, na inter e transdisciplinaridade e na pedagogia da pesquisa. Anualmente, o programa envolve a participação de aproximadamente 800 mil crianças e mais de 50 mil professores da educação infantil, do ensino fundamental e da educação especial, estando presente em todos os municípios do Estado.

Conceito e Narrativa
O jogo conta a história de Morgana, uma jovem do campo que viaja para a cidade. O tema central, evidente nos diálogos e objetivos, é a conexão entre o mundo rural e o urbano. Morgana não está apenas explorando, mas também aprendendo, superando desafios e provando que esses dois mundos podem coexistir e se complementar. A narrativa progride através de missões, diálogos com personagens e cutscenes que marcam os momentos-chave da jornada.

Arquitetura Principal: A Máquina de Estados
O coração do seu jogo é uma máquina de estados, controlada pela variável global estadoJogo. Essa abordagem é excelente para organizar um projeto com múltiplas telas e funcionalidades. O loop principal (draw()) usa uma estrutura switch para determinar o que deve ser desenhado e atualizado a cada momento, seja o menu, a cena rural, a cidade, um minigame ou uma tela de créditos.

Estados principais:
menu, creditos, guia: Telas estáticas com botões para navegação.
jogando: A cena inicial no campo, onde a aventura começa.
cidade e cidade_2: As cenas urbanas, com novos NPCs e desafios.
missoes: Uma sobreposição que exibe o quadro de missões.
cutscene_final, cutscene_retorno_campo: Cenas cinematográficas não interativas que movem a história.
fim_de_jogo: A tela final que conclui a jornada de Morgana.

Sistemas de Jogo e Funcionalidades
Seu código implementa vários sistemas complexos que trabalham em conjunto:
a) Ciclo de Dia e Noite e Atmosfera:
O sistema de tempo (tempoDoDia) cria um ciclo dinâmico que transita suavemente entre manhã, dia, tarde e noite.
A função desenharCeuDinamico é um destaque: ela interpola cores (lerpColor) para criar um céu gradiente que muda com a hora do dia.
Sol, lua e estrelas piscando aparecem e desaparecem com base no ciclo, adicionando uma camada visual impressionante e imersiva.
As nuvens (gerenciadas pela classe Nuvem) se movem pelo céu e até mudam de cor para um tom mais "poluído" na cidade, reforçando o tema do jogo.

b) Entidades e Movimento:
Morgana: A personagem principal é um objeto com propriedades de posição (x, y) e velocidade (vel). Seu movimento é gerenciado em funções como atualizarMovimento e atualizarMovimentoUrbano, que respondem às teclas de seta e WASD.
NPCs (Personagens Não-Jogáveis): Os NPCs (João, Mário, Pedro) são inicializados em posições aleatórias e possuem uma IA simples que os faz andar pela cena, criando um ambiente mais vivo. Eles são a principal fonte de missões e diálogos.
Gato (Side Quest): O gato é uma entidade especial, com estados como seguindo ou fugindo, que mudam após a conclusão do seu minigame de resgate.

c) Sistema de Missões e Diálogos:
Missões: O array missoes define os objetivos do jogador. Cada missão é um objeto com id, titulo e um estado completa. Isso permite que o jogo rastreie o progresso.
Quadro de Missões: O jogador interage com uma placa para abrir a tela de missoes, onde pode visualizar, ativar ou concluir tarefas. A interface visual é clara, mostrando o status de cada missão.
Diálogos: O sistema de diálogo (dialogos) é robusto. Ele mapeia cada NPC a diferentes conjuntos de conversas, incluindo diálogos de missão, pós-missão e desafios. A função desenharDialogo exibe o texto, o nome e o retrato do personagem que está falando, criando uma experiência de RPG clássica.

d) Sistema de Interação:
O jogo verifica constantemente a proximidade de Morgana com objetos e NPCs (buscarInteracoes).
Quando uma interação é possível, um prompt visual ([E] ou [R]) aparece na tela (gerenciarPromptsDeInteracao), guiando o jogador.
Pressionar a tecla de interação (executarInteracao) aciona a ação correspondente: iniciar um diálogo, abrir o quadro de missões, começar um minigame ou viajar para a cidade.

e) Múltiplos Minigames:
Seu jogo se destaca por oferecer três tipos diferentes de minigames, cada um com sua própria lógica:
Minigame de Reflexo (Barra de Precisão):
Como funciona: Uma linha se move horizontalmente, e o jogador deve pressionar a barra de espaço quando ela estiver sobre uma zona de sucesso verde.
Código: Gerenciado por variáveis como minigameLinhaX e minigamePosicaoSucesso. Usado para as primeiras missões e para o resgate do gato.
Minigame de Ritmo (Estilo Osu!):
Como funciona: Círculos (OsuAlvo) aparecem na tela, e o jogador deve clicar neles no momento exato em que um anel de aproximação se alinha com o círculo. A pontuação depende da precisão.
Código: Utiliza a classe OsuAlvo para gerenciar cada alvo de forma independente. É um sistema mais complexo, com pontuação, tempo e mensagens de feedback ("Perfeito", "Médio").
Minigame de Ritmo (Estilo Guitar Hero):
Como funciona: Setas coloridas caem em "trilhas", e o jogador deve pressionar a tecla de seta correspondente quando a seta cruza uma linha de acerto.
Código: Usa a classe Seta para cada nota. Possui um sistema de pontuação, feedback de acerto/erro e um estado de resultado. É usado para o desafio final com o NPC Pedro.

f) Componentes Reutilizáveis (Classes):
O uso de classes (class) demonstra uma ótima prática de programação orientada a objetos:
class Button: Cria botões interativos com estados de hover e clique, tornando a criação de interfaces de usuário muito mais limpa e modular.
class OsuAlvo, class Seta, class Nuvem, class Passaro: Cada uma encapsula a lógica e a aparência de um elemento específico do jogo, mantendo o código principal mais organizado.

#Agrinho2025
