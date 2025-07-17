const produtos = [
  {
    nome: "Maçã",
    precoPorQuilo: 6.50,
    imagem: "./imagens/Maça.jpg"
  },
  {
    nome: "Banana",
    precoPorQuilo: 4.20,
    imagem: "./imagens/BANANA.jpg"
  },
  {
    nome: "Laranja",
    precoPorQuilo: 3.80,
    imagem: "./imagens/Laranja.jpg"
  },
  {
    nome: "Tomate",
    precoPorQuilo: 5.30,
    imagem: "./imagens/Tomate.webp"
  },
  {
    nome: "Cenoura",
    precoPorQuilo: 3.90,
    imagem: "./imagens/Cenoura.jpg"
  },
  {
    nome: "Batata",
    precoPorQuilo: 2.60,
    imagem: "./imagens/Batata.jpg"
  },
  {
    nome: "Alface",
    precoPorQuilo: 2.80,
    imagem: "./imagens/Alface.jpg"
  },
  {
    nome: "Cebola",
    precoPorQuilo: 3.20,
    imagem: "./imagens/Cebola.jpg"
  },
  {
    nome: "Pimentão Verde",
    precoPorQuilo: 6.00,
    imagem: "./imagens/Pimentão-verde.jpg"
  },
  {
    nome: "Uva",
    precoPorQuilo: 9.80,
    imagem: "./imagens/Uva.jpg"
  },
  {
    nome: "Morango",
    precoPorQuilo: 12.00,
    imagem: "./imagens/Morango.jpg"
  },
  {
    nome: "Melancia",
    precoPorQuilo: 2.90,
    imagem: "./imagens/Melancia.jpg"
  },
  {
    nome: "Abacaxi",
    precoPorQuilo: 4.90,
    imagem: "./imagens/Abacaxi.jpeg"
  },
  {
    nome: "Beterraba",
    precoPorQuilo: 3.70,
    imagem: "./imagens/Beterraba.jpg"
  },
  {
    nome: "Couve",
    precoPorQuilo: 2.50,
    imagem: "./imagens/Couve.jpg"
  }
];

const produtosNovos = [
  {
    nome: "Manga",
    precoPorQuilo: 5.70,
    imagem: "./imagens/Manga.png"
  },
  {
    nome: "Chuchu",
    precoPorQuilo: 2.90,
    imagem: "./imagens/Chuchu.webp"
  },
  {
    nome: "Rúcula",
    precoPorQuilo: 3.40,
    imagem: "./imagens/Rúcula.jpg"
  },
  {
    nome: "Maracujá",
    precoPorQuilo: 6.80,
    imagem: "./imagens/Maracuja.webp"
  },
  {
    nome: "Repolho",
    precoPorQuilo: 3.10,
    imagem: "./imagens/Repolho.jpeg"
  }
];

const slides = document.querySelectorAll(".slider-content").forEach(e => {
    let filhos = e.children
    let slideAtual = 0

    function mostrarSlide(index) {

          filhos[index].classList.add("ativo");
          filhos[index].classList.remove("off")
          let anterior = (index - 1 + filhos.length) % filhos.length
          filhos[anterior].classList.remove("ativo")
          filhos[anterior].classList.add("off")
    }
    setInterval(() => {
    slideAtual = (slideAtual + 1) % filhos.length 
      mostrarSlide(slideAtual)
    }, 4000); // troca a cada 4 segundos
})


const sectionProduct = document.querySelector("#section-produtos-normal")


function CriarProdutos(array){
const ulProduct = document.querySelector(".Lista-Produtos")

  array.forEach(prod => {
    const item = document.createElement('li')
    item.classList.add("li-produto")
    item.innerHTML = `
      <div class="Produto-div">
        <img class="FotoProduto" src="${prod.imagem}" alt="foto do produto">
        <div class="Informacoes-produto">
          <h2 class="NomeProduto">${prod.nome}</h2>
          <h2 class="Preco">R$ ${prod.precoPorQuilo.toFixed(2)} Kg</h2>
        </div>
      </div>
    `
    ulProduct.appendChild(item) 
    item.addEventListener("click", function(){
      window.location.href = "PaginaProduto.html"
      localStorage.setItem('NomeP', `${prod.nome}`)
      localStorage.setItem('PrecoP', `${prod.precoPorQuilo}`)
      localStorage.setItem('ImgP', `${prod.imagem}`)
    })
  })
}

//FUNÇÃO DE CRIAR PRODUTOS NOVOS!!!

function CriarProdutosNovos(arrayProd){
const ulProduct = document.querySelector("#Div-Produtos-novos")

  arrayProd.forEach(prodP => {
    const item = document.createElement('li')
    item.classList.add("li-produto")
    item.innerHTML = `
      <div class="Produto-div">
        <img class="FotoProduto" src="${prodP.imagem}" alt="foto do produto">
        <div class="Informacoes-produto">
          <h2 class="NomeProduto">${prodP.nome}</h2>
          <h2 class="Preco">R$ ${prodP.precoPorQuilo.toFixed(2)} Kg</h2>
        </div>
      </div>
    `
    ulProduct.appendChild(item) 
    item.addEventListener("click", function(){
      window.location.href = "PaginaProduto.html"
      localStorage.setItem('NomeP', `${prodP.nome}`)
      localStorage.setItem('PrecoP', `${prodP.precoPorQuilo}`)
      localStorage.setItem('ImgP', `${prodP.imagem}`)
    })
  })
}

window.addEventListener("load", function(){
  CriarProdutos(produtos)
  CriarProdutosNovos(produtosNovos)
})
