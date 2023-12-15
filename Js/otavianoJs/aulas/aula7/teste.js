/* Escreva o seu nome e sobrenome sua idade , peso corporal
a sua altura e seu IMc data de nascimento */
const nome = 'Alex oliveira';
const sobrenome = 'Abreu batista';
const idade = 30;
const pesoCorporal = 92;
const altura = 1.89;
let imc = pesoCorporal / (altura * altura);
let anoNascimento = new Date().getFullYear() - idade

console.log(`Meu nome é ${nome} ${sobrenome} tenho ${idade} com o peso de ${pesoCorporal} meu IMC ${imc} .Minha altura ${altura} meu ano de nascimento ${anoNascimento}`)