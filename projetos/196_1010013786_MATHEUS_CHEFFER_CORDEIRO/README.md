# 👨‍🌾 Jardineiro Feliz 🌳

Um jogo simples e divertido onde você se torna um jardineiro, planta árvores, as rega, fertiliza e colhe frutos! Venda seus produtos para o caminhão e ganhe dinheiro para expandir seu jardim.

---

## 🎮 Como Jogar

O objetivo principal é gerenciar seu jardim, cuidar das suas plantas e ganhar dinheiro com a colheita.

### Controles:

* **Setas do Teclado (⬆️⬇️⬅️➡️):** Mover o jardineiro.
* **Espaço:** Plantar a semente selecionada no inventário (você deve estar na área da terra).
* **R:** Ativa/desativa o modo de rega. Enquanto ativo, o jardineiro regará as plantas próximas, consumindo água.
* **1-9:** Selecionar um slot do inventário.
* **E:** Usar o item selecionado:
    * Com a **Pá (⛏️):** Se perto de uma planta com fruto, colhe o fruto (que é automaticamente vendido). Se perto de uma planta sem fruto, desenterra-a.
    * Com o **Fertilizante (💩):** Fertiliza a planta mais próxima, aumentando sua saúde e acelerando seu crescimento.
* **P:** Encher o regador do jardineiro no Poço de Água. Você precisa estar próximo ao poço.

### Elementos do Jogo:

* **Jardineiro (👨‍🌾):** Seu personagem, capaz de se mover, plantar, regar e usar itens.
* **Plantas (🌱🌿🌳🌲🌴):** Começam como sementes e crescem por estágios. Precisam de água e boa temperatura.
    * **Murchar (🥀):** Plantas podem murchar se a saúde cair a zero devido à falta de cuidado ou temperatura inadequada.
    * **Frutificação (🍎):** Árvores maduras podem dar frutos, que podem ser colhidos para ganhar dinheiro.
* **Inventário:** Onde você armazena sementes e ferramentas. Fique de olho na capacidade!
* **Poço de Água (💧):** Recarregue sua água aqui para regar suas plantas.
* **Caminhão (🚚):** Aparece brevemente na tela toda vez que você colhe e vende um fruto.
* **Carta de Parabéns:** Uma pequena mensagem que aparece no canto superior direito quando você realiza uma ação recompensadora (ex: vender um fruto).

---

## ✨ Funcionalidades Atuais

* Movimentação do jardineiro.
* Sistema de plantio e crescimento de árvores com múltiplos estágios.
* Mecanismo de saúde das plantas, influenciado pela temperatura e rega.
* Inventário funcional com seleção de slots.
* Uso de ferramentas (Pá) para colher frutos e desenterrar plantas.
* Uso de consumíveis (Fertilizante) para acelerar o crescimento e recuperar a saúde das plantas.
* Sistema de dinheiro, ganho ao colher e vender frutos.
* Animação de caminhão ao realizar vendas.
* Poço de Água para reabastecer a água do jardineiro.
* Sistema de mensagens de parabéns.

---

## 🚀 Próximos Passos (Ideias para o Futuro)

* **Loja:** Implementar uma loja onde o jardineiro possa comprar novas sementes, ferramentas e upgrades com o dinheiro que ganha. (Você já tem a classe `Loja`, é um ótimo ponto de partida!)
* **Novos Tipos de Plantas:** Adicionar diferentes tipos de plantas com tempos de crescimento e frutos variados.
* **Ciclo Dia/Noite:** Implementar um ciclo de tempo que afete as condições do jardim.
* **Eventos Aleatórios:** Chuva, pragas, eventos climáticos que afetem as plantas.
* **Gráficos Aprimorados:** Substituir emojis por gráficos desenhados em p5.js para uma experiência visual mais rica.
* **Sistema de Missões/Objetivos:** Adicionar metas para o jogador alcançar.

---

## 🛠️ Tecnologias Utilizadas

* **p5.js:** Biblioteca JavaScript para criação artística e de prototipagem visual.

---

## 💻 Como Rodar o Projeto

1.  **Clone o Repositório:** Se este projeto estiver em um repositório Git, clone-o para o seu computador. Caso contrário, baixe os arquivos do projeto (`.html`, `.js`).
2.  **Abra o `index.html`:** Simplesmente abra o arquivo `index.html` em seu navegador web (Chrome, Firefox, Edge, etc.).
3.  **Servidor Local (Recomendado para desenvolvimento):** Para evitar problemas de CORS e ter uma experiência de desenvolvimento mais fluida, é recomendado usar um servidor local. Você pode usar:
    * **Live Server (Extensão do VS Code):** Se você usa VS Code, instale a extensão "Live Server" e clique em "Go Live" na barra inferior.
    * **Python:** Navegue até a pasta do projeto no terminal e execute `python -m http.server` (para Python 3) ou `python -m SimpleHTTPServer` (para Python 2). Em seguida, abra `http://localhost:8000` no seu navegador.

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tiver ideias, encontrar bugs ou quiser implementar novas funcionalidades, sinta-se à vontade para:

1.  Fazer um "fork" (cópia) do projeto.
2.  Criar uma nova "branch" (`git checkout -b feature/sua-feature`).
3.  Fazer suas alterações e "commitá-las" (`git commit -m 'Adiciona nova feature'`).
4.  Enviar suas alterações para o seu fork (`git push origin feature/sua-feature`).
5.  Abrir um "Pull Request" (PR) para o projeto original.

---

## 📄 Licença

Este projeto está licenciado sob a licença [Nome da Licença, ex: MIT License]. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.
*(Se você não tem um arquivo LICENSE.md, pode remover esta seção ou criar um. A licença MIT é comum para projetos de código aberto e permite bastante flexibilidade.)*

---

## 📧 Contato

Se tiver alguma dúvida ou sugestão, pode me encontrar em [matheus matheus.cheffer.cordeiro@escola.pr.gov.br].
