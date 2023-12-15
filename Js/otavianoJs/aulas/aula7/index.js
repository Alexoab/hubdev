/* Não podemos criar const com palavras reservadas ex : let .
 * Crie const ter nomes significativos  
 * não pode começar uma const com Numero 
 * * Não podem conter espaços ou traços
 * * Utilizamos camelCase
 * * case-sensitive
 * * não podemos redeclarar const com let
 * *Não utilize var ,utilize const*/
/* const nome; SyntaxError: Missing initializer in const declaration preciso declarar a constante  */
/* nome = 'ola'   não posso modificar o valor da constante  Assignment to constant variable. */
/* const nname1; */
const nome = 'oi';
const primeiroNun = 2;
const segundoNum = 3;
const resultado = primeiroNun + segundoNum;
const resultadoDuplicado = resultado * 2;/* + - * / */
let resultadoTriplo = resultado * 3;

console.log(resultado);
console.log(typeof primeiroNun);

