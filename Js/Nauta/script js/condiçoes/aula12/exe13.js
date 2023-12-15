var agora = new Date();
var diaSem = agora.getDay();
/* 
0 Domingo
1 Segunda
2 Terça
3 Quarta
4 Quinta
5 sexta
6 Sábado
7 Domingo


*/
console.log(diaSem);
/* Utilize sempre com valores específicos */
switch (diaSem) {
    case 0:
        console.log("Domingo")
        break
    case 1:
        console.log("segunda")
        break
    case 2:
        console.log("terça")
        break
    case 3:
        console.log("quarta")
        break
    case 4:
        console.log("quinta")
        break
    case 5:
        console.log("sexta")
        break
    case 6:
        console.log("sábado")
        break
    case 7:
        console.log("domingo")
        break
    default:/* é tipo o else */
        console.log("outro dia")
        break




}
