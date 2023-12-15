/* No exercício a seguir, você verá uma constante chamada de "altura" e depois modificada para "alturaEmCm", mais precisamente no seguinte trecho de código:

const nome = 'Luiz Otávio';
const sobrenome = 'Miranda';
const idade = 30;
const peso = 84;
const alturaEmCm = 1.80; // <-- NESTE LOCAL
Na verdade, este valor (1.80) está em metros, portando, o nome da variável deveria ser "alturaEmM". */
const nome ='Alex oliveira';
const sobrenome='Abreu batista';
const idade=1981;
const peso= 92;
const alturaEmM=1.88;
const anoAtual= 2023;
let IMC=peso/alturaEmM * alturaEmM;
let anoNascimento=anoAtual - idade;
console.log(nome);
console.log(sobrenome);
console.log('Sua idade :',idade);
console.log('Seu peso:',peso);
console.log('Sua Altura em metros:',alturaEmM);
console.log('********************************');
/* Usando template string $ */
console.log( `O seu nome ${nome} seu sobrenome ${sobrenome} sua idade ${idade}`);
console.log( `O seu peso ${peso} seu Índice de massa corporal  ${IMC} sua Altura em metros  ${alturaEmM} sua idade no ao de 2023 vai ser : ${anoNascimento}`);