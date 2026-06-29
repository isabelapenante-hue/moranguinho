// Importa a classe responsável por criar objetos de país
import {
CountryItem
}
from './CountryItem.js';

// Seleciona o formulário da página
const form =
document.querySelector('form');

// Recupera os países já vistos do localStorage
// Caso não exista nada salvo, inicia um array vazio
let paises =

JSON.parse(

localStorage.getItem(
'paises'
)

)

||

[];

// Variável que armazenará o país correto
let pais_secreto='';

// Carrega um país aleatório ao abrir a página
prepararPais();

// Mostra a tabela com histórico
renderizar();

// Evento disparado quando usuário envia o formulário
form.addEventListener(

'submit',

function(event){

// Impede recarregar a página
event.preventDefault();

// Captura o texto digitado
const tentativa =

new FormData(form)

.get(
'pais_nome'
)

.toLowerCase();

// Revela o nome do país
document
.getElementById(
'country-name'
)

.textContent=

pais_secreto;

// Elemento onde será exibido
// Acertou ou Errou
const hit =

document
.getElementById(
'country-hit'
);

// Salva tentativa na lista
paises.push(

new CountryItem(

Date.now(),

pais_secreto,

tentativa

)

);

// Verifica se usuário acertou
if(

tentativa===

pais_secreto
.toLowerCase()

){

hit.textContent=
'Acertou!';

hit.style.color=
'green';

}

else{

hit.textContent=
'Errou!';

hit.style.color=
'red';

}

// Atualiza tabela
renderizar();

}

);

// Função responsável por buscar
// um país aleatório na API
function prepararPais(){

fetch(

'https://countriesnow.space/api/v0.1/countries/flag/images'

)

.then(

// Converte resposta em JSON
response=>

response.json()

)

.then(

data=>{

// Obtém lista de países
const lista =

data.data;

// Escolhe um país aleatório
const pais =

lista[

Math.floor(

Math.random()

*

lista.length

)

];

// Atualiza imagem da bandeira
document
.getElementById(
'country-img'
)

.src=

pais.flag;

// Esconde nome inicialmente
document
.getElementById(
'country-name'
)

.textContent=
'????';

// Texto auxiliar
document
.getElementById(
'country-region'
)

.textContent=
'Descubra';

// Guarda resposta correta
pais_secreto=

pais.name;

// Exibe card
document
.getElementById(
'card'
)

.style.display=
'block';

}

)

.catch(

// Trata erro caso API falhe
console.log

);

}

// Responsável por desenhar
// tabela na tela
function renderizar(){

const tbody =

document
.getElementById(
'tbody'
);

// Limpa tabela antes
tbody.innerHTML='';

// Percorre países registrados
paises.forEach(

pais=>{

tbody.innerHTML+=`

<tr>

<td>

${pais.nome}

</td>

<td>

${pais.tentado}

</td>

<td>

<button
onclick=
"apagar(${pais.id})">

Apagar

</button>

</td>

</tr>

`;

}

);

// Salva alterações
localStorage.setItem(

'paises',

JSON.stringify(
paises
)

);

}

// Remove país da tabela
function apagar(id){

paises=

paises.filter(

p=>

p.id!==id

);

// Atualiza tela
renderizar();

}

// Torna função acessível
// ao botão HTML
window.apagar=
apagar;
