
import { useState } from 'react';
import './App.css';
// gerenciar o estado de algum valor
// getter: alterar  setter : consultar os valores OO 
function App() {
  const [name,setName] = useState("Alex Dev");/* O hooks vai setar o valor que eu colocar initial value .Como uma atribuição*/ 

  console.log(name);/*  Aqui podemos ver que ele vem em Array uma lista ['initial value', função (que muda este valor,do stated )] */
  
  const [number,setNumber] =useState(1); /* temos a função que nomeia  */

  /* agora para mudar o numero eu crio uma função =() => {
    
  } 
  */
 const changeNumber = ()=>{
 /*  setNumber(5); */
 /* setNumber(number +1); */  /* Alteração direta de estado  */
 
 //Previous value ou seja o valor anterior mais 1
 setNumber((prevNumber)=> prevNumber+1) ;
 setNumber((prevNumber)=> prevNumber+1) ;
 /* setNumber(number + 1); */
 }

  
  return (
 <div className='App'>
  <h1>Ola! , Meu nome é : {name} </h1>
  {/* Aqui e demostro como eu mudo no evento: (e)=> . o valor alterado setName(e.target.value) */}
  <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
  <div>
  <p>Seu Número: {number}</p>
  <button onClick={changeNumber}>Mudar número </button>
 </div>
 
 </div>
  );
}

export default App
