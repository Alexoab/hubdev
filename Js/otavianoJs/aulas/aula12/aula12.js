/* ATIVIDADES : */
let varA = 'A'; // B
let varB = 'B'; // C
let varC = 'C'; // A
/* a = varB;
b = varC;
c = varA;
varA = c;
varB = a;
varC = b; */
/* Aqui vou perder um VALOR  */
/* varA = varB;//B
varB = varC;//C
varC = varA;//B */

/* const varAtemp = varA;
varA = varB;
varB = varC;
varC = varAtemp; */

/*  Mai moderno de resolver seria : */
[varA, varB, varC] = [varB, varC, varA]
console.log(varA, varB, varC);
/* console.log(a, b, c); */
console.log(typeof varA, varB, varC)