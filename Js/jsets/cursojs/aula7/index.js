/* const (contantes) : Ela deve ser criada e inicializada ao mesmo tempo.
RULES: 
* Não podemos criar const com palavras reservadas;
*const precisam ter nomes significativos;
*Não pode começar o nome de uma constante com um número;
* Não podem conter espaços ou traços;
* Utilize camalCase;
*Case-sensitive
* Não podemos modificar o valor de uma constante;
* não utilize Var utilize const.


*/
// não inicialize sem declarar : const nome;
const nome = 'Joia';
/* nome= 'outro';  não devo mudar o nome da constante ,pois ela vai dar erro : TypeError: Assignment to constant variable.*/

console.log(nome);
// operadores temos + ,-, * /
const numeroUm =2;
const numeroDois=5;
const resultado= numeroUm * numeroDois;
const resultadoDuplo= resultado * 5;
let resultadoTriplo = resultado * 3;
const terceiroNumero= '3';
console.log(resultado); 
console.log(resultadoDuplo); 
console.log(resultadoTriplo);
console.log(numeroDois + terceiroNumero);
console.log(numeroDois + terceiroNumero);
/*  o Js é uma linguagem de tipagem dinâmica. ou seja
Quando você define o const e o let ela já sabe o tipo predefinido.
EX: String = Text | Number = Número */ 
console.log(typeof numeroDois);
console.log(typeof terceiroNumero);
console.log(typeof resultadoTriplo);



