# Agrinho-2025-P5JS

---
# 🌽 Ciclo Alimentar Interativo: Do Campo à Sua Mesa  শহ
---

Este projeto p5.js, "Ciclo Alimentar Interativo", é uma simulação educacional e divertida que visualiza a jornada dos alimentos **do campo até a cidade**, destacando a interdependência entre o meio rural e urbano. Através de fases interativas, o jogador compreende a importância de cada etapa, desde o plantio até o consumo final.

---

## 🎯 Objetivos do Projeto

Nosso principal objetivo com o "Ciclo Alimentar Interativo" é:

* **Educar:** Mostrar de forma clara e visual o processo pelo qual os alimentos chegam à nossa mesa, conectando o produtor ao consumidor.
* **Conscientizar:** Ilustrar a **interdependência entre campo e cidade**, enfatizando como um alimenta e depende do outro.
* **Engajar:** Oferecer uma experiência interativa e divertida, incentivando a participação ativa do usuário em cada etapa do ciclo.
* **Promover a Empatia:** Através da simulação, gerar uma maior apreciação pelo trabalho árduo no campo e pela complexidade da logística alimentar.

---

## 🎮 Como Jogar

O jogo é dividido em fases intuitivas, onde sua interação guia o ciclo alimentar:

1.  ### 🏡 Tela Inicial
    Ao iniciar o jogo, você verá uma tela de boas-vindas com um cenário que mescla elementos rurais e urbanos.
    * Clique no botão **"INICIAR O CICLO ALIMENTAR"** para começar sua jornada.

2.  ### 🌱 Fase 1: O Plantio
    Nesta fase, você está no campo, responsável por iniciar a produção de alimentos.
    * Na parte inferior da tela, você encontrará uma **bandeja de mudas** (cenouras, alfaces, tomates e beterrabas).
    * **Arraste cada muda** da bandeja para o campo (a área verde acima da bandeja).
    * Após o plantio, as mudas **crescerão automaticamente** ao longo do tempo, transformando-se em colheitas maduras (indicadas por um brilho verde).
    * Um contador no canto superior direito mostra quantas colheitas você já tem prontas e quantas faltam para a próxima fase.
    * Quando você tiver colheitas suficientes (5 por padrão) prontas, uma mensagem indicará que a camionete está a caminho. Após um breve atraso, você avançará automaticamente para a fase de transporte.

3.  ### 🚚 Fase 2: Transporte Automático
    A camionete entra em cena, pronta para levar as colheitas do campo para a cidade.
    * A camionete aparecerá na esquerda da tela, **já carregada** com os produtos que você cultivou.
    * Ela se moverá **automaticamente** pela estrada, simulando o transporte dos alimentos.
    * Observe a camionete em sua jornada. Não há interação direta nesta fase.
    * Assim que a camionete sair da tela pela direita, você será levado para a fase final: a feira na cidade.

4.  ### 🏙️ Fase 3: A Feira e o Consumo
    As colheitas chegaram à cidade e estão prontas para serem consumidas!
    * A barraca **"FEIRA LIVRE"** exibirá os produtos que a camionete trouxe.
    * **Pessoas coloridas** começarão a chegar à feira, balançando e se movimentando pela rua. Elas não têm pedidos específicos para você arrastar.
    * Para simular o consumo, você deve **clicar e arrastar um produto** da barraca da feira e **soltá-lo em qualquer lugar na área da rua** (a parte cinza mais escura). Ao fazer isso, o produto será "consumido" e desaparecerá.
    * Um tooltip (caixa de informação ao passar o mouse) sobre a barraca mostra quantos produtos ainda restam.
    * Quando todos os produtos da feira forem consumidos e as pessoas tiverem saído da tela, o ciclo estará completo.

5.  ### ✅ Jornada Concluída!
    Parabéns! Você completou um ciclo alimentar.
    * Uma tela final aparecerá com uma mensagem de congratulações.
    * Clique no botão **"INICIAR NOVO CICLO"** para voltar à fase de plantio e começar uma nova jornada do campo à mesa.

---

## 🛠️ Tecnologias Utilizadas

* **p5.js:** Uma biblioteca JavaScript para programação criativa, usada para desenhar todos os elementos gráficos e gerenciar as interações.
* **p5.sound.js:** Um add-on do p5.js, necessário para manipulação de áudio (embora sons não estejam implementados nesta versão, a biblioteca está carregada para futuras expansões).
* **HTML5:** Estrutura básica da página web.
* **CSS3:** Para alguns estilos básicos da página e do botão (embora a maioria dos estilos do botão seja controlada via p5.js).
