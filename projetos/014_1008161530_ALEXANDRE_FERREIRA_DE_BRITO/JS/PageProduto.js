const inputQTD = document.querySelector("#QtdP")
const spanAviso = document.querySelector(".span-aviso")
const h1nome = document.querySelector("#NomeProd")
const h2preco = document.querySelector("#ValorProd")
const Img = document.querySelector("#ImgProd")
const BotaoAddCarrinho = document.querySelector("#BtnAdd")
const iconCarrinho = document.querySelector('#icon-carrinho')
let ProdutoNome = localStorage.getItem('NomeP')
let ProdutoPreco = localStorage.getItem("PrecoP")
let ProdutoImg = localStorage.getItem("ImgP")
let PrecoTotalProduto = 0
let quantidade = 0
let qtdOK = 0;

h1nome.innerHTML = `${ProdutoNome}`
h2preco.innerHTML = `R$ ${ProdutoPreco} KG`
Img.setAttribute("src", ProdutoImg)
spanAviso.innerHTML = ``

inputQTD.addEventListener("blur", function(){
    if(inputQTD.value <= 0){
        qtdOK = false
        spanAviso.innerHTML = `Insira uma quantidade válida!`
    }else{
        qtdOK = true
        PrecoTotalProduto = ProdutoPreco * inputQTD.value
        quantidade = inputQTD.value
        h2preco.innerHTML = `R$ ${(PrecoTotalProduto).toFixed(2)} KG`
        spanAviso.innerHTML = ``
    }
    console.log(qtdOK)
})

BotaoAddCarrinho.addEventListener("click", function(){
    if(qtdOK == true){
        const ProdutosNoCarrinho = [
        {
            nome: ProdutoNome, 
            preco: PrecoTotalProduto, 
            img: ProdutoImg, 
            qtd: quantidade
        }
        ]
        console.log( JSON.stringify(ProdutosNoCarrinho))
        if(localStorage.length == 3){
            localStorage.setItem(`Items3`, JSON.stringify(ProdutosNoCarrinho))
        }else{
            localStorage.setItem(`Items${localStorage.length}`, JSON.stringify(ProdutosNoCarrinho))
        }
        spanAviso.innerHTML = `Seus itens estão guardados no carrinho`
    }else{
        spanAviso.innerHTML = `Insira uma quantidade válida para adicionar ao carrinho!`
    }
})

iconCarrinho.addEventListener("click", function(){
    LimparLCStorage()
})

function LimparLCStorage(){
    localStorage.removeItem("NomeP")
    localStorage.removeItem("PrecoP")
    localStorage.removeItem("ImgP")
}