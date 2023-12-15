alert('calculadora de soma ok ?');
let num1 = prompt('Digite um número: ')// a função pronpt retorna string  
let num2 = prompt('Digite outro número: ')
let resultato = Number(num1) + Number(num2)
alert(`O resultado da soma  entre : ${num1}  e ${num2} foi : ${resultato}`)

/*  usando o console : window.alert('') 
console.log('método log está no objeto console');
VM177:1 método log está no objeto console
undefined
alert('minha mensagens' );
window

alert ('oi')
undefined
window.alert('atenção')
undefined
window.confirm('então vamos ? ')
true
window.confirm('então vamos ? ')
false
window.prompt('aqui abriu um input para escrever ')
'escrevendo'
window.prompt('o propt e um metodo dentro do objeto window')
'fala'
const confirma = confirm('Realmente deseja apagar ?')
undefined
confirma
true
let confirma = confirm ('confirma ? ')
VM4039:1 Uncaught SyntaxError: Identifier 'confirma' has already been declared
let confirma = confirm ('confirmaa ? ')
VM4074:1 Uncaught SyntaxError: Identifier 'confirma' has already been declared
let confirmar = confirm ('confirmaa ? ')
undefined
confirma
true

*/