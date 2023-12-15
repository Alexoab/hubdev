let stringRegular = 'O meu Lord i learning JavaScrip';
let flagG = 'Este é o uso da flag g : '
let flagI = 'Este é o uso da flag i:  '
let flagM = 'Este é o uso da flag m:  '
let texto = "Linha 1\nLinha 2\nLinha 3"
let string = "Hoje o dia vai estar\n muito bom \n vaja como eu desenvolvi em javaScript"

/* Expressões regulares : flag g: é utilizada para fazer uma busca global na string, ou seja, encontrar todas as correspondências em vez de apenas a primeira. */
console.log(flagG)
console.log(stringRegular.match(/[a-z]/g));
/* código irá retornar um array com todas as letras minúsculas encontradas na string  */
/* flag i: faz uma busca que ignora maiúsculas e minúsculas. */
console.log(flagI)
console.log(stringRegular.match(/[a-z]/i))
/* m: faz uma busca que considera múltiplas linhas. essa flag é usada, os caracteres de início de linha (^) e fim de linha ($) também podem corresponder a caracteres de quebra de linha (\n, \r, \u2028 ou \u2029).
Queremos fazer uma busca usando a expressão regular /^linha \d+/ para encontrar todas as linhas que comecem com a palavra "linha" seguida de um número.
*  */
console.log(flagM)
console.log(stringRegular.match(/ord/m))
console.log(flagM)
console.log(texto.match(/^Linha \d+/gm));
console.log(texto.match(/nh /m));
console.log(flagM)
console.log(string.match(/^h/mi));
console.log(string.match(/a$/mi));
