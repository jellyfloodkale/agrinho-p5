let trigo = "🌾";
let grama = "🌱";
let trator = "🚜";
let numTrigos = 40; // Número de emojis de trigo
let numGrama = 27; // Número de emojis de grama
let trigos = []; // posições dos trigos (fase 1)
let gramas = []; // posições da grama
let trigosColetados = 0; // Contador de trigos coletados (fase 1)
let tamanhoTrigo = 25;
let tamanhoGrama = 30;
let tamanhoTrator = 35;
let estado = 'coletando'; // Estado inicial
let tempoTelaCinza = 0;

// Variáveis para a segunda parte (Caminhão)
let moca = "👩‍🌾"; // Emoji para a moça
let caminhao = "🚚"; // Emoji para o caminhão
let posXMoça;
let posYMoça;
let tamanhoMoca = 35;
let tamanhoCaminhao = 60;
let trigosExportados = 0; // Contador de trigos exportados na segunda fase
let trigosParaExportar = []; // Array para os trigos que aparecerão na segunda fase

// Variáveis para a terceira parte (Padaria e Pães)
let padaria = "🍞"; // Emoji para a padaria
let pao = "🥖"; // Emoji para o pão
let cliente = "👤"; // Emoji para o cliente
let numClientes = 35;
let clientes = []; // Posições dos clientes
let paes = []; // Array para os pães que estão sendo criados
let tamanhoPadaria = 70;
let tamanhoPao = 25;
let tamanhoCliente = 30;
let trigosNaPadaria = 0; // Contador de trigos que "chegaram" na padaria
let paesEntregues = 0; // Contador de pães entregues

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);

  // Inicializar as posições dos trigos da primeira fase
  for (let i = 0; i < numTrigos; i++) {
    trigos.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      coletado: false
    });
  }

  // Inicializar as posições da grama
  for (let i = 0; i < numGrama; i++) {
    gramas.push({
      x: random(50, width - 50),
      y: random(50, height - 50)
    });
  }

  // Definir posições iniciais para a moça (para o estado 'colocando')
  posXMoça = width - 50;
  posYMoça = height - 50;

  // Inicializar posições dos clientes (para o estado 'fabricacao')
  for (let i = 0; i < numClientes; i++) {
    clientes.push({
      x: random(50, width - 50),
      y: random(height / 2 + 50, height - 50),
      servido: false
    });
  }
}

function draw() {
  if (estado === 'coletando') {
    // === FASE 1: TRATOR COLETANDO TRIGOS ===
    background('rgb(51,121,51)'); // Fundo verde

    textSize(tamanhoGrama);
    for (let i = 0; i < numGrama; i++) {
      text(grama, gramas[i].x, gramas[i].y);
    }

    textSize(tamanhoTrigo);
    for (let i = 0; i < numTrigos; i++) {
      if (!trigos[i].coletado) {
        text(trigo, trigos[i].x, trigos[i].y);
      }
    }

    textSize(tamanhoTrator);
    text(trator, mouseX, mouseY);

    for (let i = 0; i < numTrigos; i++) {
      if (!trigos[i].coletado) {
        let distancia = dist(mouseX, mouseY, trigos[i].x, trigos[i].y);
        if (distancia < tamanhoTrigo / 2 + tamanhoTrator / 2) {
          trigos[i].coletado = true;
          trigosColetados++;
        }
      }
    }

    textSize(20);
    fill(255);
    textAlign(LEFT, TOP);
    text("Trigos Coletados: " + trigosColetados, 10, 10);

    if (trigosColetados === numTrigos) {
      estado = 'telaCinzaTransicao1';
      tempoTelaCinza = millis();
    }

  } else if (estado === 'telaCinzaTransicao1') {
    // === TELA CINZA DE TRANSIÇÃO 1 ===
    background(150);
    textSize(48);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Segunda Parte!', width / 2, height / 2);

    if (millis() - tempoTelaCinza > 3000) {
      estado = 'colocando';
      trigosParaExportar = [];
      trigosExportados = 0;
      for (let i = 0; i < numTrigos; i++) {
        trigosParaExportar.push({
          x: random(50, width - 100),
          y: random(50, height - 50),
          coletado: false
        });
      }
    }

  } else if (estado === 'colocando') {
    // === FASE 2: CAMINHÃO EXPORTANDO TRIGOS ===
    background('rgb(51,121,51)'); // Fundo verde

    textSize(tamanhoMoca);
    textAlign(CENTER, CENTER);
    text(moca, posXMoça, posYMoça);

    textSize(tamanhoTrigo);
    for (let i = 0; i < numTrigos; i++) {
      if (!trigosParaExportar[i].coletado) {
        text(trigo, trigosParaExportar[i].x, trigosParaExportar[i].y);
      }
    }

    textSize(tamanhoCaminhao);
    text(caminhao, mouseX, mouseY);

    for (let i = 0; i < numTrigos; i++) {
      if (!trigosParaExportar[i].coletado) {
        let distancia = dist(mouseX, mouseY, trigosParaExportar[i].x, trigosParaExportar[i].y);
        if (distancia < tamanhoTrigo / 2 + tamanhoCaminhao / 2) {
          trigosParaExportar[i].coletado = true;
          trigosExportados++;
        }
      }
    }

    textSize(20);
    fill(255);
    textAlign(LEFT, TOP);
    text("Trigos Exportados: " + trigosExportados, 10, 10);

    if (trigosExportados === numTrigos) {
      estado = 'telaCinzaTransicao2';
      tempoTelaCinza = millis();
    }

  } else if (estado === 'telaCinzaTransicao2') {
    // === TELA CINZA DE TRANSIÇÃO 2 ===
    background(150);
    textSize(48);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Agora a Fabricação!', width / 2, height / 2);

    if (millis() - tempoTelaCinza > 3000) {
      estado = 'fabricacao';
      trigosNaPadaria = 0;
      paesEntregues = 0;
      paes = [];
      for(let i = 0; i < numClientes; i++) {
        clientes[i].servido = false; // Reseta clientes para serem servidos novamente
      }
    }

  } else if (estado === 'fabricacao') {
    // === FASE 3: PADARIA E PRODUÇÃO DE PÃES ===
    background(255, 230, 180); // Fundo bege/creme para a padaria

    textSize(tamanhoPadaria);
    textAlign(CENTER, CENTER);
    text(padaria, width / 2, height / 4);

    textSize(tamanhoCliente);
    for (let i = 0; i < numClientes; i++) {
      if (!clientes[i].servido) {
        text(cliente, clientes[i].x, clientes[i].y);
      }
    }

    // Simular trigos chegando na padaria e virando pão
    // Produção de pães mais rápida: a cada 200 milissegundos
    if (millis() % 200 < 20 && trigosNaPadaria < numTrigos) { // <--- AQUI MUDOU: 1000 para 200
      paes.push({
        x: width / 2,
        y: height / 4 + tamanhoPadaria / 2,
        targetX: clientes[trigosNaPadaria % numClientes].x, // Garante que o pão vai para um cliente válido
        targetY: clientes[trigosNaPadaria % numClientes].y,
        entregue: false,
        clienteIndex: trigosNaPadaria % numClientes // Guarda qual cliente este pão se destina
      });
      trigosNaPadaria++;
    }

    // Mover e desenhar os pães
    textSize(tamanhoPao);
    for (let i = paes.length - 1; i >= 0; i--) {
      let p = paes[i];

      if (!p.entregue) {
        // Mover o pão em direção ao cliente alvo
        let velocidadePao = 5; // <--- AQUI MUDOU: 3 para 5 (velocidade do pão)
        let angle = atan2(p.targetY - p.y, p.targetX - p.x);
        p.x += cos(angle) * velocidadePao;
        p.y += sin(angle) * velocidadePao;

        text(pao, p.x, p.y);

        // Verificar colisão do pão com o cliente
        let distancia = dist(p.x, p.y, p.targetX, p.targetY);
        if (distancia < tamanhoPao / 2 + tamanhoCliente / 2) {
          p.entregue = true;
          paesEntregues++;
          // Marca o cliente como servido
          clientes[p.clienteIndex].servido = true;
        }
      }
    }

    textSize(20);
    fill(0);
    textAlign(LEFT, TOP);
    text("Pães Entregues: " + paesEntregues, 10, 10);

    // Condição para finalizar a fase da padaria
    if (paesEntregues === numClientes) {
        estado = 'finalFofo'; // Muda para o novo estado final
        tempoTelaCinza = millis(); // Reutiliza para o tempo da tela final
    }
  } else if (estado === 'finalFofo') {
    // === CENA FINAL FOFA ===
    background(255, 200, 220); // Um fundo rosa claro, bem fofo!
    textSize(40);
    fill(100, 0, 50); // Cor mais escura para o texto
    textAlign(CENTER, CENTER);
    text('Obrigado por jogar!', width / 2, height / 2 - 30);
    textSize(25);
    text('Esperamos que tenha gostado da jornada do trigo!', width / 2, height / 2 + 20);

    // Você pode adicionar mais emojis fofos ou animações aqui, se quiser!
    textSize(60);
    text('💖', width / 2, height / 2 + 80); // Um coração fofo!
  }
}