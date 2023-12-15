const gabriel = {
  nome: "Gabriel de Oliveira",
  idade: 2,
  estudante: true,
};

//Terá direito a bolsa uma pessoa que é estudante e menor de 18 anos

function direitoABolsa(cidadao) {
  let retornoFuncao;
  // faça sua função aqui,
if(cidadao.idade >=18 && cidadao.estudante ){
  retornoFuncao= console.log(`${cidadao.nome} Terá a bolsa`) 
}else{
  retornoFuncao= console.log(`${cidadao.nome} nao tem direito `) 
}
  // não altere nada fora deste espaço
  return retornoFuncao;
}

console.log(direitoABolsa(gabriel));
