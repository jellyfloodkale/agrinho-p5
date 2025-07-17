// * ====================================================================================
// * CONEXÃO AGROURBANA - EDIÇÃO COMPLETA
// * ===================================================================================

let gameManager;

const tiposDeProduto = [
  { emoji: '🌽', nome: 'Milho', valorBase: 10, xpBase: 5, processado: false },
  { emoji: '🍅', nome: 'Tomate', valorBase: 12, xpBase: 6, processado: false },
  { emoji: '🥛', nome: 'Leite', valorBase: 15, xpBase: 7, processado: false },
  { emoji: '🧀', nome: 'Queijo', valorBase: 35, xpBase: 15, processado: true },
  { emoji: '🍓', nome: 'Morango', valorBase: 18, xpBase: 8, processado: false },
  { emoji: '🥦', nome: 'Brócolis', valorBase: 14, xpBase: 6, processado: false },
  { emoji: '🍇', nome: 'Uva', valorBase: 20, xpBase: 9, processado: false },
  { emoji: '🧃', nome: 'Suco', valorBase: 50, xpBase: 25, processado: true },
];
const paletaCores = {
  fundoDia: null, fundoNoite: null,
  estrada: '#DCDCDC', campo: '#A4D4A5', cidade: '#B4B4B4',
  caminhao: '#E65C5C', obstaculo: '#646464', texto: '#2C3E50', textoNoite: '#EAEAEA',
  uiFundo: 'rgba(255, 255, 255, 0.9)', uiBorda: '#BDC3C7',
  botao: '#3498DB', botaoHover: '#2980B9', botaoTexto: '#FFFFFF',
  ouro: '#F1C40F', prata: '#C0C0C0', verdeSucesso: '#2ECC71', vermelhoErro: '#E74C3C',
  powerUpVelocidade: '#3498DB', powerUpEscudo: '#9B59B6', powerUpCombustivel: '#F39C12',
  missao: '#8A2BE2', fabrica: '#95A5A6',
};


function setup() {
  createCanvas(1024, 768);
  textFont('sans-serif');
  
  paletaCores.fundoDia = color(235, 245, 238);
  paletaCores.fundoNoite = color(25, 35, 60);

  gameManager = new GameManager();
}

function draw() {
  gameManager.update();
  gameManager.draw();
}

function keyPressed() {
  gameManager.handleKeyPress(keyCode, key);
}

function mousePressed() {
  gameManager.handleMousePress();
}


class GameManager {
  constructor() {
    this.ui = new UI();
    this.efeitos = new Efeitos();
    this.ambiente = new Ambiente();
    this.highScore = localStorage.getItem('agroUrbanaHighScoreMax') || 0;
    this.dificuldade = 1.0;
    this.setState('MENU');
  }

  setState(newState) {
    this.currentState = newState;
    switch (this.currentState) {
      case 'MENU':
        this.ui.setupMenu();
        break;
      case 'TUTORIAL':
      case 'JOGANDO':
        if (newState === 'TUTORIAL' || !this.caminhao) {
          this.resetGame();
        }
        break;
      case 'LOJA':
         this.ui.setupLoja(this);
         break;
      case 'FIM_DE_JOGO':
        if (this.pontuacao > this.highScore) {
          this.highScore = this.pontuacao;
          localStorage.setItem('agroUrbanaHighScoreMax', this.highScore);
        }
        this.ui.setupGameOver(this.pontuacao, this.nivel, this.dinheiro, this.highScore);
        break;
    }
  }

  resetGame() {
    this.pontuacao = 0;
    this.dinheiro = 50;
    this.nivel = 1;
    this.experiencia = 0;
    this.proxNivelXP = 100;
    this.produtos = [];
    this.obstaculos = [];
    this.powerUps = [];
    this.evento = null;
    
    this.zonaCampo = new Zona(0, width / 3.5, paletaCores.campo, 'CAMPO', '🌱');
    this.zonaCidade = new ZonaCidade(width - width / 3.5, width / 3.5, paletaCores.cidade, 'CIDADE', '🏙️');
    this.caminhao = new Caminhao(this.zonaCampo.w + 75, height / 2);
    
    this.ambiente.iniciarVeiculos();

    this.dificuldade = 1.0;
    this.numObstaculos = 5;
    this.chancePowerUp = 0.0015;
    
    this.gerarObstaculos();
    this.iniciarNivel();
    this.gerarMissao();
  }

  update() {
    this.ambiente.update();
    if (this.currentState === 'JOGANDO') {
      this.caminhao.update(this.evento);
      this.caminhao.verificarColisaoObstaculos(this.obstaculos);
      // CORREÇÃO: A chamada do método não precisa mais da largura da zona do campo.
      this.caminhao.verificarColeta(this.produtos);
      this.caminhao.verificarEntrega(this.zonaCidade, this);
      this.caminhao.verificarColetaPowerUp(this.powerUps);

      this.produtos.forEach(p => p.atualizar());
      this.obstaculos.forEach(o => o.atualizar(this.dificuldade));
      this.powerUps.forEach((p,i) => {p.update(); if(p.vidaUtil <= 0) this.powerUps.splice(i,1);});

      if (frameCount % Math.max(30, 120 - Math.floor(this.dificuldade * 5)) === 0 && this.produtos.length < 10 + this.nivel) {
        this.produtos.push(new Produto(this.zonaCampo.x, this.zonaCampo.w));
      }
      
      if (random() < this.chancePowerUp) this.gerarPowerUp();
      
      this.atualizarMissao();
      this.atualizarEvento();
      this.ajustarDificuldade();
      
      if(this.caminhao.combustivel <= 0) this.setState('FIM_DE_JOGO');
    }
    this.efeitos.update();
  }

  draw() {
    this.ambiente.draw();
    if (['JOGANDO', 'PAUSADO', 'TUTORIAL', 'FIM_DE_JOGO', 'LOJA'].includes(this.currentState)) {
      this.zonaCampo.desenhar();
      this.ambiente.desenharEstrada(this.zonaCampo.w, this.zonaCidade.x);
      this.zonaCidade.desenhar();
      this.ambiente.desenharVeiculos();
      this.obstaculos.forEach(o => o.mostrar());
      this.produtos.forEach(p => p.mostrar());
      this.powerUps.forEach(pu => pu.mostrar());
      this.caminhao.mostrar();
    }
    this.efeitos.draw();
    this.ui.draw(this);
  }

  handleKeyPress(keyCode, key) {
    const k = key.toLowerCase();
    if (this.currentState === 'JOGANDO' && k === 'p') {
        this.setState('PAUSADO');
    } else if (this.currentState === 'PAUSADO' && k === 'p') {
        this.setState('JOGANDO');
    } else if (this.currentState === 'TUTORIAL' && key) {
        this.setState('JOGANDO');
    } else if (this.currentState === 'JOGANDO' && k === 'e') {
        this.caminhao.soltarCarga();
    }
  }

  handleMousePress() {
    this.ui.handleMouseClick(this);
  }

  ganharXP(qtd, dinheiro) {
    this.experiencia += qtd;
    this.dinheiro += dinheiro;
    this.pontuacao += dinheiro; 
    if (this.experiencia >= this.proxNivelXP) {
      this.nivel++;
      this.experiencia -= this.proxNivelXP;
      this.proxNivelXP = Math.floor(this.proxNivelXP * 1.5);
      this.efeitos.adicionar(width / 2, height / 2, `NÍVEL ${this.nivel}!`, paletaCores.ouro, 60);
      this.setState('LOJA');
    }
  }

  iniciarNivel() {
    this.produtos = [];
    this.zonaCidade.gerarNovasDemandas(this.nivel, this);
    this.zonaCidade.destinos.forEach(destino => {
      if (destino.demanda) {
        for (let i = 0; i < destino.quantidade; i++) {
          this.produtos.push(new Produto(this.zonaCampo.x, this.zonaCampo.w, destino.demanda));
        }
      }
    });
    if (this.nivel > 1 && random() < 0.4) this.gerarEvento();
  }
  
  gerarEvento() {
      const tipoEvento = random(['feira', 'safra', 'combustivel']);
      this.evento = { tipo: tipoEvento, duracao: 1200 }; 
      if(tipoEvento === 'feira') {
          let destinoFeira = random(this.zonaCidade.destinos.filter(d => d.tipo === 'entrega'));
          if(destinoFeira) {
              this.evento.alvo = destinoFeira;
              destinoFeira.transformarEmFeira();
              this.ui.mostrarMensagem("FEIRA NA CIDADE! 🎉", paletaCores.ouro, 180);
          }
      } else if (tipoEvento === 'safra') {
          this.evento.alvo = random(tiposDeProduto.filter(p => !p.processado));
          for(let i = 0; i < 10; i++) {
              this.produtos.push(new Produto(this.zonaCampo.x, this.zonaCampo.w, this.evento.alvo));
          }
          this.ui.mostrarMensagem(`SUPER-SAFRA DE ${this.evento.alvo.emoji}!`, paletaCores.verdeSucesso, 180);
      } else if (tipoEvento === 'combustivel') {
          this.ui.mostrarMensagem("PROMOÇÃO NO COMBUSTÍVEL! 💸", paletaCores.powerUpCombustivel, 180);
      }
  }

  atualizarEvento() {
      if(this.evento) {
          this.evento.duracao--;
          if(this.evento.duracao <= 0) {
              if(this.evento.tipo === 'feira' && this.evento.alvo) {
                  this.evento.alvo.reverterFeira();
              }
              this.evento = null;
              this.ui.mostrarMensagem("EVENTO FINALIZADO!", paletaCores.texto, 120);
          }
      }
  }

  gerarObstaculos() {this.obstaculos = []; for (let i = 0; i < this.numObstaculos; i++) this.gerarNovoObstaculo();}

  gerarNovoObstaculo() {
    if (this.obstaculos.length >= this.numObstaculos + Math.floor(this.dificuldade)) return;
    let x = random(this.zonaCampo.w + 80, this.zonaCidade.x - 80);
    let y = random(50, height - 50);
    let tipo = random() < 0.6 ? 'estatico' : random(['horizontal', 'vertical']);
    this.obstaculos.push(new Obstaculo(x, y, tipo));
  }
  
  gerarPowerUp() {
    if (this.powerUps.length > 3) return;
    let x = random(this.zonaCampo.w + 80, this.zonaCidade.x - 80);
    let y = random(50, height - 50);
    this.powerUps.push(new PowerUp(x, y, random(['velocidade', 'escudo', 'combustivel', 'combustivel'])));
  }

  ajustarDificuldade() {
    this.dificuldade += 0.0005;
    if (this.obstaculos.length < this.numObstaculos + Math.floor(this.dificuldade * 2)) this.gerarNovoObstaculo();
  }
  
  gerarMissao() {
    this.missao = null;
    if (random() < 0.3) {
      this.missao = {
        produto: random(tiposDeProduto), tempoLimite: frameCount + 900,
        bonus: 100 + 25 * this.nivel, ativa: true
      };
    }
  }

  atualizarMissao() {
    if (this.missao && this.missao.ativa && frameCount > this.missao.tempoLimite) {
      this.missao.ativa = false;
      this.efeitos.adicionar(width / 2, height - 100, "MISSÃO FALHOU!", paletaCores.vermelhoErro, 40);
    }
  }

  verificarMissaoConcluida(produtoEntregue, gm) {
    if (gm.missao && gm.missao.ativa && produtoEntregue.tipo.emoji === gm.missao.produto.emoji) {
      gm.dinheiro += gm.missao.bonus;
      gm.efeitos.adicionar(gm.caminhao.x, gm.caminhao.y, `+$${gm.missao.bonus} MISSÃO!`, paletaCores.missao, 40);
      gm.missao.ativa = false;
    }
  }
}


class Caminhao {
  constructor(x, y) {
    this.x = x; this.y = y; this.tamanhoBase = 50; this.velocidadeBase = 4;
    this.capacidade = 1; this.carga = [];
    this.efeitos = { lento: 0, velocidade: 0, escudo: 0 };
    this.maxCombustivel = 100; this.combustivel = this.maxCombustivel;
    this.consumo = 0.01;
    this.coletaCooldown = 0;
  }

  update(evento) {
    if (this.coletaCooldown > 0) this.coletaCooldown--;

    if(this.combustivel > 0) {
        let consumoAtual = this.consumo;
        if(evento && evento.tipo === 'combustivel') consumoAtual /= 2;
        
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65) || keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.combustivel -= consumoAtual;
        }
    }

    Object.keys(this.efeitos).forEach(e => { if (this.efeitos[e] > 0) this.efeitos[e]--; });
    
    let vel = this.combustivel > 0 ? this.velocidadeBase : this.velocidadeBase * 0.25;
    if (this.efeitos.velocidade > 0) vel *= 1.5;
    if (this.efeitos.lento > 0) vel *= 0.5;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= vel;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += vel;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= vel;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += vel;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
  soltarCarga() {
    if (this.carga.length > 0) {
        const produtoSolto = this.carga.pop();
        const novoProdutoNoChao = new Produto(null, null, produtoSolto.tipo);
        novoProdutoNoChao.x = this.x;
        novoProdutoNoChao.y = this.y;
        novoProdutoNoChao.frescor = produtoSolto.frescor * 0.8;
        gameManager.produtos.push(novoProdutoNoChao);
        gameManager.efeitos.adicionar(this.x, this.y, `Soltou ${produtoSolto.tipo.emoji}`, paletaCores.texto, 25);
    }
  }

  mostrar() {
    push();
    translate(this.x, this.y);
    if (this.efeitos.escudo > 0) {
      let alpha = map(this.efeitos.escudo, 0, 300, 0, 150);
      fill(red(paletaCores.powerUpEscudo), green(paletaCores.powerUpEscudo), blue(paletaCores.powerUpEscudo), alpha);
      noStroke(); ellipse(0, 0, this.tamanhoBase * 1.5, this.tamanhoBase * 1.5);
    }
    
    fill(paletaCores.caminhao); stroke(40); strokeWeight(3); rectMode(CENTER);
    rect(0, 0, this.tamanhoBase, this.tamanhoBase * 0.7, 5);
    rect(-this.tamanhoBase * 0.35, -this.tamanhoBase * 0.2, this.tamanhoBase * 0.4, this.tamanhoBase * 0.6, 5);
    fill(50); noStroke();
    ellipse(-this.tamanhoBase * 0.3, this.tamanhoBase * 0.35, this.tamanhoBase * 0.3, this.tamanhoBase * 0.3);
    ellipse(this.tamanhoBase * 0.3, this.tamanhoBase * 0.35, this.tamanhoBase * 0.3, this.tamanhoBase * 0.3);
    fill('#FFFF00'); ellipse(this.tamanhoBase * 0.5, -this.tamanhoBase * 0.2, 8, 8);

    if (this.carga.length > 0) {
      textAlign(CENTER, CENTER); textSize(this.tamanhoBase / 2);
      for (let i = 0; i < this.carga.length; i++) {
        text(this.carga[i].tipo.emoji, (i - (this.carga.length - 1) / 2) * (this.tamanhoBase * 0.4), -this.tamanhoBase * 0.4);
      }
    }
    pop();
  }
  
  verificarColisaoObstaculos(obstaculos) {
    if (this.efeitos.escudo > 0) return;
    for (let obs of obstaculos) {
      if (dist(this.x, this.y, obs.x, obs.y) < this.tamanhoBase / 2 + obs.tamanho / 2) {
        if (this.efeitos.lento <= 0) {
          this.efeitos.lento = 120;
          this.combustivel -= 5;
          gameManager.efeitos.adicionar(this.x, this.y, "💥-5⛽️", paletaCores.vermelhoErro, 30);
        }
      }
    }
  }
  
  // CORREÇÃO: Removida a restrição de coletar apenas na zona do campo.
  verificarColeta(produtos) {
    if (this.coletaCooldown > 0) return;

    if (this.carga.length < this.capacidade) {
      for (let i = produtos.length - 1; i >= 0; i--) {
        if (dist(this.x, this.y, produtos[i].x, produtos[i].y) < this.tamanhoBase / 2 + produtos[i].tamanho / 2) {
          this.carga.push(produtos.splice(i, 1)[0]);
          gameManager.efeitos.adicionar(this.x, this.y, "+1", paletaCores.verdeSucesso, 25);
          this.coletaCooldown = 60;
          break;
        }
      }
    }
  }
  
  verificarEntrega(zonaCidade, gm) {
    if (this.carga.length > 0 && this.x > zonaCidade.x) {
      let destino = zonaCidade.getDestinoProximo(this.y, this.carga[0].tipo);
      if (destino && dist(this.x, this.y, zonaCidade.x + zonaCidade.w / 2, destino.y) < destino.h / 2) {
        let produtoEntregue = this.carga.pop();
        let resultado = destino.receberProduto(produtoEntregue, gm);
        if(resultado){
            gm.ganharXP(resultado.xp, resultado.dinheiro);
            gm.efeitos.adicionar(this.x, this.y, resultado.simbolo, resultado.cor, 30 + Math.sqrt(abs(resultado.dinheiro)) * 2);
            gm.verificarMissaoConcluida(produtoEntregue, gm);
        }
      }
    } else if (this.carga.length === 0 && this.x > zonaCidade.x) { 
        let destino = zonaCidade.getDestinoProximo(this.y, null);
        if (destino && destino.tipo === 'fabrica' && dist(this.x, this.y, zonaCidade.x + zonaCidade.w / 2, destino.y) < destino.h / 2) {
           destino.receberProduto(null, gm); 
        }
    }
  }

  verificarColetaPowerUp(powerUps) {
    for (let i = powerUps.length - 1; i >= 0; i--) {
      if (dist(this.x, this.y, powerUps[i].x, powerUps[i].y) < this.tamanhoBase / 2 + 15) {
        this.aplicarPowerUp(powerUps[i].tipo);
        powerUps.splice(i, 1);
      }
    }
  }
  
  aplicarPowerUp(tipo) {
    gameManager.efeitos.adicionar(this.x, this.y, `POWER-UP!`, paletaCores.ouro, 35);
    if (tipo === 'velocidade') this.efeitos.velocidade = 300;
    if (tipo === 'escudo') this.efeitos.escudo = 300;
    if (tipo === 'combustivel') {
        this.combustivel = min(this.maxCombustivel, this.combustivel + 40);
        gameManager.efeitos.adicionar(this.x, this.y, `+40⛽️`, paletaCores.powerUpCombustivel, 30);
    }
  }
}

class Produto {
  constructor(zonaX, zonaW, tipoEspecifico = null) {
    if (zonaX !== null) {
        this.x = random(zonaX + 30, zonaW - 30);
        this.y = random(80, height - 30);
    } else {
        this.x = 0; this.y = 0;
    }
    this.tipo = tipoEspecifico ? tipoEspecifico : random(tiposDeProduto.filter(p => !p.processado));
    this.tamanho = 35;
    this.frescorMaximo = 1800; this.frescor = this.frescorMaximo;
  }
  atualizar() { if (this.frescor > 0) this.frescor--; }
  mostrar() {
    let progresso = this.frescor / this.frescorMaximo;
    let pulsacao = sin(frameCount * 0.1) * 2;
    noStroke(); fill(100, 50); rectMode(CORNER);
    rect(this.x - this.tamanho / 2, this.y + this.tamanho / 2, this.tamanho, 5, 2);
    if (progresso > 0.6) fill(paletaCores.verdeSucesso);
    else if (progresso > 0.3) fill(paletaCores.ouro);
    else fill(paletaCores.vermelhoErro);
    rect(this.x - this.tamanho / 2, this.y + this.tamanho / 2, this.tamanho * progresso, 5, 2);
    textAlign(CENTER, CENTER); textSize(this.tamanho + pulsacao);
    text(this.tipo.emoji, this.x, this.y);
  }
  getProgressoFrescor() { return this.frescor / this.frescorMaximo; }
}

class Obstaculo {
  constructor(x, y, tipo) {
    this.x = x; this.y = y; this.tipo = tipo; this.tamanho = random(30, 50);
    this.velocidade = random(0.5, 1.5); this.direcao = random() > 0.5 ? 1 : -1;
  }
  atualizar(dificuldade) {
    if (this.tipo === 'horizontal') {
      this.x += this.velocidade * this.direcao * (0.5 + dificuldade * 0.1);
      if (gameManager && gameManager.zonaCidade) {
         if (this.x > gameManager.zonaCidade.x - 40 || this.x < gameManager.zonaCampo.w + 40) this.direcao *= -1;
      }
    }
    if (this.tipo === 'vertical') {
      this.y += this.velocidade * this.direcao * (0.5 + dificuldade * 0.1);
      if (this.y > height - 40 || this.y < 40) this.direcao *= -1;
    }
  }
  mostrar() { fill(paletaCores.obstaculo); noStroke(); ellipse(this.x, this.y, this.tamanho, this.tamanho); }
}

class PowerUp {
  constructor(x, y, tipo) {
    this.x = x; this.y = y; this.tipo = tipo; this.vidaUtil = 600;
  }
  update() { this.vidaUtil--; }
  mostrar() {
    push();
    translate(this.x, this.y); rotate(frameCount * 0.02);
    let cor, emoji;
    if (this.tipo === 'velocidade') { cor = paletaCores.powerUpVelocidade; emoji = '⚡'; }
    else if (this.tipo === 'escudo') { cor = paletaCores.powerUpEscudo; emoji = '🛡️'; }
    else if (this.tipo === 'combustivel') { cor = paletaCores.powerUpCombustivel; emoji = '⛽️'; }
    fill(cor); stroke(255); strokeWeight(2); textSize(30); text(emoji, 0, 0);
    pop();
  }
}

class Zona {
  constructor(x, w, cor, nome, emoji) {
    this.x = x; this.y = 0; this.w = w; this.h = height;
    this.cor = cor; this.nome = nome; this.emoji = emoji; this.tipo = 'zona';
  }
  desenhar() {
    fill(this.cor); noStroke(); rect(this.x, this.y, this.w, this.h);
    if(gameManager && gameManager.ambiente) {
        let corTexto = gameManager.ambiente.isNoite() ? paletaCores.textoNoite : paletaCores.texto;
        fill(corTexto);
    } else {
        fill(paletaCores.texto);
    }
    textSize(32); textAlign(CENTER, CENTER);
    textFont('Impact'); text(`${this.nome} ${this.emoji}`, this.x + this.w / 2, 50);
    textFont('sans-serif');
  }
}

class ZonaCidade extends Zona {
  constructor(x, w, cor, nome, emoji) {
    super(x, w, cor, nome, emoji); this.destinos = [];
  }
  desenhar() { super.desenhar(); this.destinos.forEach(d => d.desenhar(this.x, this.w)); }
  gerarNovasDemandas(nivel, gm) {
    this.destinos = [];
    let numDestinos = Math.min(2 + Math.floor(nivel / 2), 4);
    let espacamento = height / (numDestinos + 1);
    let temFabrica = this.destinos.some(d => d.tipo === 'fabrica');

    for (let i = 0; i < numDestinos; i++) {
        if (!temFabrica && nivel > 1 && random() < 0.3) {
            this.destinos.push(new DestinoFabrica(espacamento * (i + 1), nivel, {raw: '🍇', processed: '🧃'}));
            temFabrica = true;
        } else {
            this.destinos.push(new DestinoEntrega(espacamento * (i + 1), nivel));
        }
    }
  }
  
  gerarNovaDemandaPara(destino, nivel) {
    let index = this.destinos.indexOf(destino);
    if (index !== -1) {
      const novaDemanda = new DestinoEntrega(this.destinos[index].y, nivel);
      this.destinos[index] = novaDemanda;
      return novaDemanda.demanda;
    }
    return null;
  }

  getDestinoProximo(caminhaoY, produtoCarga) {
    let destinosCompativeis = this.destinos.filter(d => d.aceitaProduto(produtoCarga));
    if (destinosCompativeis.length === 0) return null;
    return destinosCompativeis.reduce((prev, curr) => (abs(curr.y - caminhaoY) < abs(prev.y - caminhaoY) ? curr : prev));
  }
}

class DestinoEntrega {
  constructor(y, nivel) {
    this.y = y; this.h = 80; this.tipo = 'entrega';
    this.demanda = random(tiposDeProduto.filter(p => p.processado || random() < 0.8));
    this.quantidade = 1 + floor(random(nivel));
    this.isBonus = random() < 0.2; this.isFeira = false;
    if (this.isBonus) this.quantidade = 1;
  }
  aceitaProduto(produto) { return produto && this.demanda.emoji === produto.emoji; }
  desenhar(zonaX, zonaW) {
    push();
    translate(zonaX + zonaW / 2, this.y);
    let corFundo = this.isFeira ? paletaCores.missao : (this.isBonus ? paletaCores.ouro : color(200));
    fill(corFundo); stroke(80); strokeWeight(2); rectMode(CENTER);
    rect(0, 0, zonaW * 0.8, this.h, 10);
    if(this.isFeira) {
        let pulsacao = sin(frameCount * 0.2) * 3;
        strokeWeight(4 + pulsacao); stroke(255, 255, 0);
    }
    noStroke(); fill(paletaCores.texto);
    textSize(18); text(this.isFeira ? 'FEIRA! 🎉' : 'ENTREGA AQUI', 0, -this.h / 4);
    textSize(30); text(`${this.demanda.emoji} x${this.quantidade}`, 0, this.h / 4);
    pop();
  }
  receberProduto(produto, gm) {
    let dinheiro = 0, xp = 0, simbolo = '❌', cor = paletaCores.vermelhoErro;
    if (produto && this.aceitaProduto(produto.tipo)) {
      this.quantidade--;
      let progressoFrescor = produto.getProgressoFrescor();
      let bonusFrescor = 1 + progressoFrescor;
      let bonusFeira = this.isFeira ? 2.5 : 1;
      dinheiro = floor((this.isBonus ? produto.tipo.valorBase * 2 : produto.tipo.valorBase) * bonusFrescor * bonusFeira);
      xp = floor((this.isBonus ? produto.tipo.xpBase * 2 : produto.tipo.xpBase) * bonusFrescor);
      cor = paletaCores.verdeSucesso;
      simbolo = `+$${dinheiro}`;
      if (this.quantidade <= 0) {
        const tipoProdutoNecessario = gm.zonaCidade.gerarNovaDemandaPara(this, gm.nivel);
        if (tipoProdutoNecessario) gm.produtos.push(new Produto(gm.zonaCampo.x, gm.zonaCampo.w, tipoProdutoNecessario));
        gm.gerarNovoObstaculo();
      }
    } else { dinheiro = -10; xp = 0; }
    return { dinheiro, xp, simbolo, cor };
  }
  transformarEmFeira() { this.isFeira = true; this.quantidade += 3; }
  reverterFeira() { this.isFeira = false; }
}

class DestinoFabrica {
    constructor(y, nivel, tipoFabrica) {
        this.y = y; this.h = 100; this.tipo = 'fabrica';
        this.rawMaterial = tiposDeProduto.find(p => p.emoji === tipoFabrica.raw);
        this.processedGood = tiposDeProduto.find(p => p.emoji === tipoFabrica.processed);
        this.demanda = this.rawMaterial;
        this.estoqueRaw = 0; this.estoqueProcessed = 0;
        this.processando = 0; this.tempoProcessamento = 300;
    }
    aceitaProduto(produto) {
        if (produto === null) return this.estoqueProcessed > 0;
        if(produto.emoji === this.rawMaterial.emoji && this.estoqueProcessed === 0) return true;
        return false;
    }
    desenhar(zonaX, zonaW) {
        push();
        translate(zonaX + zonaW / 2, this.y);
        fill(paletaCores.fabrica); stroke(80); strokeWeight(2); rectMode(CENTER);
        rect(0, 0, zonaW * 0.8, this.h, 10);
        noStroke(); fill(paletaCores.texto); textSize(18);
        
        if(this.processando > 0) {
            text(`PROCESSANDO...`, 0, -this.h / 4);
            let prog = this.processando / this.tempoProcessamento;
            fill(100); rect(-zonaW*0.3, this.h/4, zonaW*0.6, 20, 5);
            fill(paletaCores.ouro); rect(-zonaW*0.3, this.h/4, zonaW*0.6 * prog, 20, 5);
            this.processando++;
            if(this.processando >= this.tempoProcessamento) {
                this.estoqueProcessed += this.estoqueRaw;
                this.estoqueRaw = 0; this.processando = 0;
            }
        } else if (this.estoqueProcessed > 0) {
            text(`COLETE AQUI`, 0, -this.h / 4);
            textSize(30); text(`${this.processedGood.emoji} x${this.estoqueProcessed}`, 0, this.h / 4);
        } else {
            text(`ENTREGUE AQUI`, 0, -this.h / 4);
            textSize(30); text(`${this.rawMaterial.emoji}`, 0, this.h / 4);
        }
        pop();
    }
    receberProduto(produto, gm) {
        if(produto === null && this.estoqueProcessed > 0 && gm.caminhao.carga.length < gm.caminhao.capacidade) {
            const produtoProcessado = {tipo: this.processedGood, frescor: 1800, getProgressoFrescor: () => 1};
            gm.caminhao.carga.push(produtoProcessado);
            this.estoqueProcessed--;
            return null;
        } else if (produto && this.aceitaProduto(produto.tipo)) {
            this.estoqueRaw++;
            if(this.processando === 0) this.processando = 1;
            gm.efeitos.adicionar(gm.caminhao.x, gm.caminhao.y, `+1 ${produto.tipo.emoji}`, paletaCores.verdeSucesso, 25);
            return null;
        }
    }
}

class Ambiente {
    constructor() {
        this.ciclo = 0; this.velocidadeCiclo = 0.0005;
        this.veiculos = [];
        for(let i = 0; i < 3; i++) this.veiculos.push(new VeiculoAmbiente('trator'));
        for(let i = 0; i < 5; i++) this.veiculos.push(new VeiculoAmbiente('carro'));
    }
    iniciarVeiculos() { this.veiculos.forEach(v => v.reset()); }
    update() { this.veiculos.forEach(v => v.update()); this.ciclo = (this.ciclo + this.velocidadeCiclo) % TWO_PI; }
    isNoite() { return this.ciclo > PI; }
    draw() {
        let corFundo = lerpColor(paletaCores.fundoDia, paletaCores.fundoNoite, (sin(this.ciclo - HALF_PI) + 1) / 2);
        background(corFundo);
    }
    desenharEstrada(x1, x2) {
        fill(paletaCores.estrada); noStroke(); rect(x1, 0, x2 - x1, height);
        let numFaixas = 20;
        for(let i=0; i < numFaixas; i++) {
            let y = map(i, 0, numFaixas, 0, height);
            fill(255, 200, 0, 150);
            rect(width/2 - 5, y, 10, 30);
        }
    }
    desenharVeiculos() { this.veiculos.forEach(v => v.draw());}
}

class VeiculoAmbiente {
    constructor(tipo) {
        this.tipo = tipo;
        this.x = -1000; this.y = -1000; this.vel = 0;
    }
    reset() {
        if (!gameManager || !gameManager.zonaCampo) return; 

        if(this.tipo === 'trator') {
            this.x = random(20, gameManager.zonaCampo.w - 20);
            this.y = random(height, height + 200);
            this.vel = random(0.5, 1.5);
        } else {
            this.x = random(gameManager.zonaCampo.w, gameManager.zonaCidade.x);
            this.y = random(0, height);
            this.vel = random(2, 4) * (random() > 0.5 ? 1 : -1);
        }
    }
    update() {
        if (!gameManager || !gameManager.zonaCampo || !gameManager.zonaCidade) return;

        if(this.tipo === 'trator') {
            this.y -= this.vel;
            if(this.y < -50) this.y = height + 50;
        } else {
            this.x += this.vel;
            if(this.x < gameManager.zonaCampo.w || this.x > gameManager.zonaCidade.x) this.vel *= -1;
        }
    }
    draw() {
        push();
        fill(this.tipo === 'trator' ? '#27AE60' : '#E74C3C'); noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.tipo === 'trator' ? 40: 30, this.tipo === 'trator' ? 60: 20, 5);
        pop();
    }
}

class Efeitos {
  constructor() { this.particulas = []; }
  adicionar(x, y, texto, cor, tamanho) { this.particulas.push(new ParticulaTexto(x, y, texto, cor, tamanho)); }
  update() {
    for (let i = this.particulas.length - 1; i >= 0; i--) {
      this.particulas[i].update();
      if (this.particulas[i].vida <= 0) this.particulas.splice(i, 1);
    }
  }
  draw() { this.particulas.forEach(p => p.draw()); }
}

class ParticulaTexto {
  constructor(x, y, texto, cor, tamanho) {
    this.x = x; this.y = y; this.texto = texto; this.cor = cor;
    this.tamanho = tamanho; this.vidaMax = 80; this.vida = this.vidaMax; this.vy = -2;
  }
  update() { this.vida--; this.y += this.vy; this.vy *= 0.98; }
  draw() {
    let alpha = map(this.vida, 0, this.vidaMax, 0, 255);
    fill(red(this.cor), green(this.cor), blue(this.cor), alpha);
    noStroke(); textAlign(CENTER, CENTER); textSize(this.tamanho);
    textFont('Impact'); text(this.texto, this.x, this.y); textFont('sans-serif');
  }
}

class UI {
  constructor() { this.currentScreen = 'MENU'; this.mensagem = { texto: '', cor: '', duracao: 0 }; }
  
  draw(gm) {
    switch (gm.currentState) {
      case 'MENU': this.drawMenu(); break;
      case 'TUTORIAL': this.drawHUD(gm); this.drawTutorial(); break;
      case 'JOGANDO': this.drawHUD(gm); this.drawEvento(gm); break;
      case 'PAUSADO': this.drawHUD(gm); this.drawPauseScreen(); break;
      case 'LOJA': this.drawLoja(gm); break;
      case 'FIM_DE_JOGO': this.drawGameOver(); break;
    }
    this.drawMensagem();
  }

  handleMouseClick(gm) {
    if (gm.currentState === 'MENU') this.checkMenuButtons(gm);
    else if (gm.currentState === 'FIM_DE_JOGO') this.checkGameOverButtons(gm);
    else if (gm.currentState === 'LOJA') this.checkLojaButtons(gm);
  }

  drawButton(txt, x, y, w, h, corBtn = paletaCores.botao, corHover = paletaCores.botaoHover) {
    let isHovering = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    fill(isHovering ? corHover : corBtn);
    noStroke(); rect(x, y, w, h, 8);
    fill(paletaCores.botaoTexto); textSize(24); textAlign(CENTER, CENTER);
    text(txt, x + w / 2, y + h / 2);
    return isHovering;
  }
  
  setupMenu() { this.currentScreen = 'MENU'; this.screenContent = null; }
  
  setupGameOver(score, level, dinheiro, highScore) {
    this.currentScreen = 'FIM_DE_JOGO';
    this.finalScore = score; this.finalLevel = level; this.finalDinheiro = dinheiro; this.highScore = highScore;
    this.fatoCurioso = random([
        "O Brasil é um dos maiores produtores de alimentos do mundo.",
        "A agricultura familiar produz cerca de 70% dos alimentos que chegam à mesa dos brasileiros.",
        "Produtos processados, como sucos e queijos, agregam valor à produção do campo.",
        "Feiras locais são uma forma festiva e direta de conectar produtores e consumidores.",
    ]);
  }
  
  drawMenu() {
    background(paletaCores.campo);
    textAlign(CENTER, CENTER); textFont('Impact');
    fill(paletaCores.texto); textSize(64);
    text("CONEXÃO CAMPO CIDADE", width / 2, height * 0.2);
    textFont('sans-serif');
    this.buttons = {
      play: { x: width / 2 - 150, y: height * 0.4, w: 300, h: 60, text: 'Jogar' },
      howTo: { x: width / 2 - 150, y: height * 0.4 + 80, w: 300, h: 60, text: 'Como Jogar' },
      about: { x: width / 2 - 150, y: height * 0.4 + 160, w: 300, h: 60, text: 'Sobre' },
    };
    if (this.screenContent === 'howTo') { this.drawInfoBox("COMO JOGAR", "Use as SETAS ou WASD para mover seu caminhão.\n\n" + "Vá para a zona do CAMPO para coletar produtos.\n" + "Leve-os para a CIDADE para vender ou processar.\n\n" + "Pressione 'E' para soltar um item da carga.\n" + "Cuidado com os obstáculos e fique de olho no combustível!\n\nPressione 'P' para pausar.");
    } else if (this.screenContent === 'about') { this.drawInfoBox("SOBRE O JOGO", "Este jogo celebra a conexão vital entre o campo e a cidade,\n" + "um tema central do programa Agrinho.\n\n" + "Ele simula os desafios da logística para levar alimentos frescos\n" + "do produtor rural até a sua mesa, destacando a importância\n" + "da eficiência, rapidez e cuidado nesse processo.\n\n" + "Divirta-se fortalecendo essa conexão!");
    } else { Object.values(this.buttons).forEach(b => this.drawButton(b.text, b.x, b.y, b.w, b.h)); }
  }

  drawInfoBox(title, content) {
    fill(paletaCores.uiFundo); stroke(paletaCores.uiBorda);
    rect(width/2 - 250, height/2 - 150, 500, 300, 10);
    fill(paletaCores.texto); noStroke();
    
    textFont('Impact'); textSize(32);
    textAlign(CENTER, CENTER);
    text(title, width/2, height/2 - 110);
    
    textFont('sans-serif'); textSize(18);
    textAlign(CENTER, TOP);
    text(content, width/2, height/2 - 60, 480, 280);
    
    if(this.drawButton("Voltar", width/2 - 75, height/2 + 100, 150, 40)) {
        if(mouseIsPressed) this.screenContent = null;
    }
  }

  checkMenuButtons(gm) {
    if (this.screenContent) {
        if (this.drawButton("Voltar", width/2 - 75, height/2 + 100, 150, 40)) this.screenContent = null;
    } else {
        if (this.drawButton(this.buttons.play.text, this.buttons.play.x, this.buttons.play.y, this.buttons.play.w, this.buttons.play.h)) gm.setState('TUTORIAL');
        if (this.drawButton(this.buttons.howTo.text, this.buttons.howTo.x, this.buttons.howTo.y, this.buttons.howTo.w, this.buttons.howTo.h)) this.screenContent = 'howTo';
        if (this.drawButton(this.buttons.about.text, this.buttons.about.x, this.buttons.about.y, this.buttons.about.w, this.buttons.about.h)) this.screenContent = 'about';
    }
  }
  
  drawHUD(gm) {
    let corTexto = gm.ambiente.isNoite() ? paletaCores.textoNoite : paletaCores.texto;
    fill(corTexto); textSize(32); textAlign(LEFT, TOP); textFont('Impact');
    text(`$ ${gm.dinheiro}`, 20, 20);
    textAlign(LEFT, TOP); textSize(20);
    text(`Carga: ${gm.caminhao.carga.length} / ${gm.caminhao.capacidade} 🚛`, 20, 60);
    let combW = 150, combH = 25;
    textAlign(RIGHT, TOP);
    text(`⛽️`, width-20, 20);
    rectMode(CORNER); fill(50, 150); rect(width - 20 - combW, 25, combW, combH, 5);
    let percComb = gm.caminhao.combustivel / gm.caminhao.maxCombustivel;
    fill(percComb > 0.5 ? paletaCores.verdeSucesso : (percComb > 0.2 ? paletaCores.ouro : paletaCores.vermelhoErro));
    rect(width - 20 - combW, 25, combW * percComb, combH, 5);
    let xpBarraW = 250, xpBarraH = 20;
    let progressoXP = gm.experiencia / gm.proxNivelXP;
    fill(50, 150); rectMode(CORNER); noStroke(); rect(width / 2 - xpBarraW / 2, 20, xpBarraW, xpBarraH, 10);
    fill(paletaCores.ouro); rect(width / 2 - xpBarraW / 2, 20, xpBarraW * progressoXP, xpBarraH, 10);
    fill(255); textSize(16); textAlign(CENTER, CENTER); text(`NÍVEL ${gm.nivel}`, width / 2, 30);
    textFont('sans-serif');
  }

  drawEvento(gm) {
      if(gm.evento) {
          push();
          let tempoRestante = ceil(gm.evento.duracao / 60);
          let textoEvento = `${gm.evento.tipo.toUpperCase()}! Tempo: ${tempoRestante}s`;
          if(gm.evento.tipo === 'safra') textoEvento = `SUPER-SAFRA DE ${gm.evento.alvo.emoji}!`;
          fill(paletaCores.missao);
          textAlign(CENTER, TOP); textFont('Impact'); textSize(28);
          text(textoEvento, width/2, 60);
          pop();
      }
  }

  drawTutorial() { this.drawOverlay("TUTORIAL", "Mova com SETAS/WASD, colete no campo e entregue na cidade.\n\nPressione 'E' para soltar um item.\n\nFique de olho no seu COMBUSTÍVEL ⛽️ e no DINHEIRO $!\n\nPressione qualquer tecla para começar!"); }
  drawPauseScreen() { this.drawOverlay("PAUSADO", "O frete aguarda! Pressione 'P' para continuar."); }
  drawGameOver() { this.drawOverlay("FIM DE JOGO", `Sua pontuação final: ${this.finalScore}\nNível alcançado: ${this.finalLevel}\n\nRECORDE: ${this.highScore}`, true); if (this.drawButton("Jogar Novamente", width / 2 - 125, height / 2 + 30, 250, 50)) { if (mouseIsPressed) gameManager.setState('TUTORIAL'); } fill(paletaCores.texto); textAlign(CENTER, TOP); textSize(16); text(`Você sabia?\n${this.fatoCurioso}`, width / 2, height / 2 + 100, width * 0.8, 100); }
  checkGameOverButtons(gm) { if (this.drawButton("Jogar Novamente", width / 2 - 125, height / 2 + 30, 250, 50)) gm.setState('TUTORIAL');}

  setupLoja(gm) {
      this.lojaOpcoes = [
          {id: 'tanque', texto: `Tanque Maior (+20L)`, custo: 50 + 50 * gm.nivel, emoji: '⛽️'},
          {id: 'motor', texto: `Motor Eficiente (-10%)`, custo: 75 + 50 * gm.nivel, emoji: '⚙️'},
          {id: 'carga', texto: `+1 Espaço de Carga`, custo: 100 + 75 * gm.nivel, emoji: '📦'},
      ];
  }

  drawLoja(gm) {
      this.drawOverlay(`LOJA DE MELHORIAS - Nível ${gm.nivel}`, `Gaste seu dinheiro sabiamente! Você tem $${gm.dinheiro}`);
      this.lojaOpcoes.forEach((opt, i) => {
          let y = height/2 + (i-1)*70;
          let podeComprar = gm.dinheiro >= opt.custo;
          let cor = podeComprar ? paletaCores.botao : '#999';
          let corHover = podeComprar ? paletaCores.botaoHover : '#777';
          if(this.drawButton(`${opt.emoji} ${opt.texto} - $${opt.custo}`, width/2 - 200, y, 400, 60, cor, corHover)) {
              if(mouseIsPressed && podeComprar) {
                  gm.dinheiro -= opt.custo;
                  if(opt.id === 'tanque') gm.caminhao.maxCombustivel += 20;
                  if(opt.id === 'motor') gm.caminhao.consumo *= 0.9;
                  if(opt.id === 'carga') gm.caminhao.capacidade++;
                  gm.setState('JOGANDO');
                  gm.iniciarNivel();
              }
          }
      });

      if(this.drawButton("Continuar sem comprar", width/2 - 150, height/2 + 150, 300, 50)) {
          if(mouseIsPressed) {
              gm.setState('JOGANDO');
              gm.iniciarNivel();
          }
      }
  }

  checkLojaButtons(gm) { this.drawLoja(gm); }
  
  drawOverlay(title, message, isGameOver = false) {
    fill('rgba(0, 0, 0, 0.7)'); rect(0, 0, width, height);
    fill(paletaCores.uiFundo);
    let boxW = isGameOver ? 500 : 600;
    let boxH = isGameOver ? 320 : 400;
    rect(width/2 - boxW/2, height/2 - boxH/2, boxW, boxH, 10);
    fill(paletaCores.texto); noStroke();
    
    textFont('Impact'); textSize(40);
    textAlign(CENTER, CENTER);
    let titleY = height / 2 - boxH / 2 + 50;
    text(title, width / 2, titleY);

    textFont('sans-serif'); textSize(20);
    textAlign(CENTER, TOP);
    let messageY = titleY + 40;
    let messageBoxHeight = boxH - (messageY - (height/2 - boxH/2)) - 20;
    text(message, width/2, messageY, boxW * 0.9, messageBoxHeight);
  }

  mostrarMensagem(texto, cor, duracao) { this.mensagem = { texto, cor, duracao }; }

  drawMensagem() {
    if (this.mensagem.duracao > 0) {
      let alpha = map(this.mensagem.duracao, 0, 60, 0, 255);
      fill(red(this.mensagem.cor), green(this.mensagem.cor), blue(this.mensagem.cor), alpha);
      textAlign(CENTER, TOP); textFont('Impact'); textSize(40);
      text(this.mensagem.texto, width / 2, height - 100);
      textFont('sans-serif'); this.mensagem.duracao--;
    }
  }
}

// Resumo Geral do Jogo
// O jogador controla um caminhão (Caminhao) e seu objetivo é:

// Coletar produtos agrícolas na zona do Campo.
// Transportá-los pela estrada, desviando de Obstáculos.
// Entregar os produtos na Cidade em locais específicos (DestinoEntrega) ou processá-los em // fábricas (DestinoFabrica) para aumentar seu valor.
// Gerenciar recursos como Dinheiro ($) e Combustível (⛽️).
// Usar o dinheiro ganho para comprar melhorias na Loja.
// 1. Funções Principais do p5.js (O Ponto de Partida)
// Estas são as funções que o p5.js chama automaticamente. Elas são o coração do ciclo de vida do programa.

// function setup()

// O que faz: É executada uma única vez no início. Prepara o ambiente do jogo.
// Comandos principais:
// createCanvas(1024, 768);: Cria a tela do jogo com 1024x768 pixels.
// paletaCores.fundoDia = color(...);: Define as cores que serão usadas no jogo.
// gameManager = new GameManager();: O comando mais importante aqui. Cria o objeto principal que vai gerenciar todo o jogo.
// function draw()

// O que faz: É executada em loop, continuamente (por padrão, 60 vezes por segundo). É responsável por atualizar e desenhar tudo na tela a cada quadro.
// Comandos principais:
// gameManager.update();: Chama a lógica de atualização do jogo (movimento, colisões, consumo de combustível, etc.).
// gameManager.draw();: Chama a lógica de desenho de todos os elementos na tela.
// function keyPressed() e function mousePressed()

// O que faz: São funções de evento. São chamadas automaticamente sempre que o usuário pressiona uma tecla ou clica com o mouse, respectivamente.
// Comandos principais:
// gameManager.handleKeyPress(keyCode, key);: Repassa a informação da tecla pressionada para o GameManager decidir o que fazer com ela (ex: pausar o jogo com 'P').
// gameManager.handleMousePress();: Repassa o clique do mouse para o GameManager, que geralmente passa para a UI (Interface do Usuário) para verificar se algum botão foi clicado.
// 2. Estrutura do Script (Classes Principais)
// O script é muito bem organizado usando Classes, que são como "fábricas" de objetos. Cada classe tem uma responsabilidade específica.

// GameManager (O Cérebro do Jogo)
// Esta é a classe mais importante. Ela controla o estado do jogo e coordena todas as outras classes.

// Responsabilidades:

// Manter o estado atual do jogo (currentState), como 'MENU', 'JOGANDO', 'LOJA', 'FIM_DE_JOGO'.
// Iniciar, reiniciar (resetGame) e pausar o jogo.
// Manter os dados do jogador: pontuacao, dinheiro, nivel, experiencia.
// Criar e gerenciar todos os objetos do jogo: o caminhão, os produtos, os obstáculos e os power-ups.
// Controlar a dificuldade (ajustarDificuldade), que aumenta com o tempo.
// Gerar eventos aleatórios (gerarEvento) como "Super-Safra" ou "Feira na Cidade".
// Comandos Chave:

// setState(newState): Método central para mudar a tela e o comportamento do jogo (ex: ir do Menu para o Jogo).
// update(): Atualiza a lógica de todos os elementos ativos na tela.
// draw(): Desenha todos os elementos na tela, de acordo com o estado atual.
// ganharXP(qtd, dinheiro): Atualiza a experiência e o dinheiro do jogador, verificando se ele passou de nível. Ao passar de nível, leva o jogador para a LOJA.
// Caminhao (O Jogador)
// Representa o veículo controlado pelo usuário.

// Responsabilidades:
// Movimentação pela tela com base nas teclas pressionadas (keyIsDown).
// Gerenciar sua carga (os produtos que está transportando) e sua capacidade.
// Consumir e gerenciar o combustivel.
// Detectar colisões (verificarColisaoObstaculos).
// Coletar produtos (verificarColeta) e Power-Ups.
// Entregar produtos na cidade (verificarEntrega).
// Soltar um item da carga com a tecla 'E' (soltarCarga).
// Produto, Obstaculo, PowerUp (Objetos do Mundo)
// São os objetos com os quais o caminhão interage na estrada e no campo.
// 
// Produto: Os itens a serem coletados. Têm um tipo (emoji, nome, valorBase) e um frescor que diminui com o tempo, afetando seu valor.
// Obstaculo: Pedras ou outros itens que devem ser evitados. Podem ser estáticos ou se mover (horizontal, vertical).
// PowerUp: Itens especiais que dão bônus temporários, como velocidade (⚡), escudo (🛡️) ou combustível (⛽️).
// Zona, ZonaCidade, DestinoEntrega e DestinoFabrica (O Mapa)
// Essas classes definem as áreas do jogo e os locais de interação.

// Zona: Uma área retangular simples, como a do "CAMPO".
// ZonaCidade: Uma zona especial que contém múltiplos destinos.
// gerarNovasDemandas(): Cria aleatoriamente os locais de entrega e fábricas na cidade a cada nível.
// DestinoEntrega: Um local na cidade que demanda um tipo específico de produto. Entregar o produto correto gera dinheiro e XP.
// DestinoFabrica: Um local especial. O jogador entrega matéria-prima (ex: Uva 🍇), espera um tempo para o processamento, e depois pode coletar o produto de maior valor (ex: Suco 🧃).
// Ambiente e Efeitos (Cenário e Feedback Visual)
// Classes responsáveis por dar vida e polimento ao jogo.

// Ambiente:
// Controla o ciclo de dia e noite (isNoite).
// Desenha o fundo, a estrada e os veículos de ambiente (tratores e carros que se movem sozinhos).
// Efeitos:
// Gerencia as ParticulaTexto, que são os textos flutuantes que aparecem na tela para dar feedback ao jogador (ex: +$50, NÍVEL 2!, 💥-5⛽️).
// UI (Interface do Usuário)
// Gerencia tudo que é relacionado a menus, informações na tela (HUD) e interação com o usuário fora do jogo principal.

// Responsabilidades:
// Desenhar as diferentes telas do jogo: drawMenu, drawTutorial, drawLoja, drawGameOver.
// Desenhar o HUD (Head-Up Display) com informações de dinheiro, combustível, nível, etc. // (drawHUD).
// Criar e verificar cliques em botões (drawButton, handleMouseClick).
// Exibir mensagens temporárias na tela (mostrarMensagem).
// Em resumo, o script utiliza uma arquitetura orientada a objetos muito clara, onde o GameManager atua como um maestro, orquestrando as ações de classes especializadas para criar uma experiência de jogo completa e dinâmica.