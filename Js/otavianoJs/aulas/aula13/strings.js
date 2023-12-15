/* Strings  são indexadas */
let umaString = "'Um texto'";
let umaString2 = '"Um texto"';
let umaString3 = "Um \"texto\"";
//                012345678910     
let umaString4 = "Um \\texto0";
console.log(umaString);
console.log(umaString2);
console.log(umaString3);
console.log(umaString4);
console.log(umaString4[-1]);
console.log(umaString4[9])
console.log(umaString4.charAt(11))
/* qual o índice ,que  começa a palavra o texto  */
console.log(umaString4.indexOf('texto'))
/* Procure ,o índice, a partir do 4 .esquerdada para direita */
console.log(umaString4.indexOf('um', 4))
/* Procure ,o índice, a partir do 4 .Direita  para esquerda */
console.log(umaString4.lastIndexOf('o', 2))
console.log(umaString + 'Em um lindo dia.')
console.log(umaString4.concat(' ', 'em', ' ', 'um'))
console.log(`${umaString} em um dia lindo 2. `)
/* Expressões regulares . march ,search  */
console.log(umaString4.match(/[a-z]/O));