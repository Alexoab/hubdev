let umaString = "Um texto";
let umaString2 = "O rato roeu a roupa do rei de roma ";
let LastString = 'Usando lastIndexof Faz um pesquisa de trás para frente '
let Umaletra = umaString2.replace(/a/g, function (LetraA) {

    return LetraA.toUpperCase();
});
console.log(Umaletra)
console.log(LastString)
console.log(umaString.lastIndexOf('t', 9))
console.log(umaString.match(/[a-z] /));
console.log(umaString.search(/[a-z] /));
console.log(umaString.search(/x/));
console.log(umaString.replace('Um', 'Substituindo'));
console.log(umaString.replace(/Um/, 'Substituindo'));
console.log(umaString2.replace(/r/, 'S#b'));
console.log(umaString2.replace(/r/g, 'S#b'));
console.log(umaString2.length);
console.log(umaString2.slice(2, 5));
console.log(umaString2.slice(2, 6));
console.log(umaString2.length - 3)
console.log(umaString2.slice(-3));
console.log(umaString2.slice(32));
console.log(umaString2.slice(32));
console.log(umaString2.slice(-5, umaString2.length - 1));
console.log(umaString2.slice(-5, -1));
console.log(umaString2.substring(umaString2.length - 5, umaString2.length - 1));
console.log(umaString2.split(' '));
console.log(umaString2.split('a'));
console.log(umaString2.split('a', 3));
console.log(umaString2.toUpperCase());
console.log(umaString2.toUpperCase('a', 6));