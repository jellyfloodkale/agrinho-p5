const spanAviso = document.querySelector(".aviso")
const ulProd = document.querySelector("#ul-lista-produtos")
const spanPreco = document.querySelector("#p-preco")
const spanFrete = document.querySelector("#p-frete")
const spanValorFinal = document.querySelector("#h1-precofinal")
const btnPEGADINHA = document.querySelector("#BtnPegadinha")
let precoISSOAE = 0
let frete = (Math.random() * Math.random()).toFixed(2)*100
console.log(frete)

spanAviso.innerHTML = ``
console.log(localStorage)
if(localStorage.length == 0){
    spanAviso.innerHTML = `Você não tem nenhum item adicionado ao carrinho!`
}else{
  Object.keys(localStorage).forEach(chave => {
  const item = JSON.parse(localStorage.getItem(chave));
  precoISSOAE = precoISSOAE + item[0].preco
  
  let elemProduto = document.createElement('li')
  
  elemProduto.innerHTML = `<h1 id="h1-nomeProd">${item[0].nome}</h1> <p id="p-precoProd">R$ ${(item[0].preco).toFixed(2)}</p> <p id="p-QtdProd">QTD:${item[0].qtd}</p><img id="Excluir" name="${chave}" src="./imagens/excluir.png" alt="Excluir" srcset="">`
  ulProd.appendChild(elemProduto)
  spanPreco.innerHTML = `R$ ${precoISSOAE.toFixed(2)}`
  spanFrete.innerHTML = `R$ ${frete.toFixed(2)}`
  spanValorFinal.innerHTML = `R$ ${(precoISSOAE + frete).toFixed(2)}`
});
const BtnRemover = document.querySelectorAll("#Excluir")
  BtnRemover.forEach(e =>{
    e.addEventListener( "click", function(){
        localStorage.removeItem(e.getAttribute("name"))
        location.reload()
    }
  )}
)

}



btnPEGADINHA.addEventListener("click", function(){
    window.location.href = "PagePagamento.html"
})