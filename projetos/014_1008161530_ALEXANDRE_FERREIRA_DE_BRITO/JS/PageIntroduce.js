const NomeAgricultor = document.querySelector("h1#nome-agricultor")
const NomeAgricultorA = document.querySelector("h1#nome-agricultora")
const ImgAgricultor = document.querySelectorAll("#img-agricultor")
console.log(ImgAgricultor)
const agricultores = [
  "João Silva",
  "Carlos Almeida",
  "Pedro Souza",
  "Ricardo Lima",
  "André Barbosa",
  "Mateus Costa",
  "Lucas Rocha",
  "Fernando Dias",
  "Bruno Martins",
  "Tiago Ferreira",
  "Rafael Ramos",
  "Eduardo Castro",
  "Marcelo Pinto",
  "Alex Mendes",
  "Daniel Teixeira"
]
const agricultoras = [
  "Maria Oliveira",
  "Ana Paula",
  "Juliana Mendes",
  "Camila Rocha",
  "Fernanda Lima",
  "Patrícia Souza",
  "Luciana Castro",
  "Vanessa Martins",
  "Renata Dias",
  "Carla Teixeira",
  "Tatiane Barbosa",
  "Mariana Ramos",
  "Débora Ferreira",
  "Bianca Almeida",
  "Simone Pinto"
];


function MudarNomes(array, h1){
    const randomIndex = Math.floor(Math.random() * array.length)
    console.log(randomIndex, array.length)
    h1.innerText = `${array[randomIndex]}`   
}

MudarNomes(agricultoras, NomeAgricultorA)
MudarNomes(agricultores, NomeAgricultor)