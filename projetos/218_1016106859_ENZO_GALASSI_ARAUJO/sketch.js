// Função para celebrar a conexão entre campo e cidade
function celebrarConexaoCampoCidade() {
    // Elementos da natureza (campo)
    const elementosCampo = ["🌾", "🚜", "🌻", "🐄", "🍎", "🌽", "🐓", "🚜", "🌳"];
    
    // Elementos urbanos (cidade)
    const elementosCidade = ["🏙️", "🚗", "🏢", "🚌", "💻", "🏭", "🚦", "🏘️", "🛒"];
    
    // Mensagens sobre a conexão
    const mensagens = [
        "Campo e cidade, juntos somos mais fortes!",
        "Do campo vem o alimento, da cidade a tecnologia!",
        "Uma conexão que alimenta e desenvolve!",
        "Respeito mútuo entre rural e urbano!",
        "A harmonia entre campo e cidade constrói o futuro!",
        "Do campo à mesa, da cidade ao campo: ciclo perfeito!",
        "Alimento do campo, progresso da cidade!",
        "Unidos pelo desenvolvimento sustentável!"
    ];
    
    // Seleciona elementos aleatórios
    const elementoCampo = elementosCampo[Math.floor(Math.random() * elementosCampo.length)];
    const elementoCidade = elementosCidade[Math.floor(Math.random() * elementosCidade.length)];
    const mensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
    
    // Cria o efeito de celebração
    console.log(`%c${elementoCampo} ${elementoCidade} ${elementoCampo} ${elementoCidade}`, 
                "font-size: 24px; color: #2e8b57;");
    console.log(`%c${mensagem}`, 
                "font-size: 18px; font-weight: bold; color: #4169e1;");
    console.log("%cCelebrando a conexão que nos une!", 
                "font-size: 16px; color: #ff8c00;");
    
    // Efeito visual adicional (se executado no navegador)
    if (typeof document !== 'undefined') {
        const body = document.body;
        body.style.textAlign = 'center';
        body.style.padding = '20px';
        body.style.fontFamily = 'Arial, sans-serif';
        
        const titulo = document.createElement('h1');
        titulo.textContent = 'Celebrando a Conexão Campo-Cidade';
        titulo.style.color = '#2e8b57';
        
        const emojis = document.createElement('div');
        emojis.textContent = `${elementoCampo} ${elementoCidade} ${elementoCampo} ${elementoCidade}`;
        emojis.style.fontSize = '40px';
        emojis.style.margin = '20px 0';
        
        const msg = document.createElement('p');
        msg.textContent = mensagem;
        msg.style.fontSize = '20px';
        msg.style.color = '#4169e1';
        msg.style.fontWeight = 'bold';
        
        const footer = document.createElement('p');
        footer.textContent = 'Juntos somos mais fortes!';
        footer.style.marginTop = '30px';
        footer.style.fontStyle = 'italic';
        footer.style.color = '#ff8c00';
        
        body.innerHTML = '';
        body.append(titulo, emojis, msg, footer);
    }
}

// Executa a celebração
celebrarConexaoCampoCidade();