/* Veja a diferença de let e var  */
/* let e mais moderna  */
let nome ='João 1';
let nome1;// ela foi Declarada mas não tem valor.
nome1='oi'//iniciou a variável 
console.log(nome1)

console.log(nome,' nasceu em 1984');
console.log('Em 2000 João conheceu Maria');
console.log('João casou-se com Maria.');
console.log('Maria teve' ,1, 'filho com João');
console.log('O filho de João chama Eduardo');

/* 
*Lembre-se : crie variáveis com sentido no seu código , para facilitar que todos possam entender.
* Não crie , com palavras reservadas. EX : if , do 
*Não comece variável com numero ex: let 1nome.
* não podem conter espaços ou traços.
ex: let nome Cliente-vip
*Use camelCase  ou seja comece minusculo e a composta com maiúsculo . let nome clienteVip
* Case-sensitive as variáveis 
* Não podemos redeclarar variáveis com let ;
let nomeCliente ='veja aqui'
nomeCliente = 'agora não declarou novamente'
*/
//let 1nome;
let nomeCompletoDoCliente = 'oi Cliente';
console.log (nomeCompletoDoCliente);
// não declare o let duas vezes 
let nomeVeja = 'veja aui';
nomeVeja = 'Otávio';
console.log(nomeVeja);