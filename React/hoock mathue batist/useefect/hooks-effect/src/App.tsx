import { useEffect, useState } from 'react';
import './App.css';

function App() {
  /* Inicialmente  */
  const [count, setCount] = useState(0)
  const [countB, setCountB] = useState(2)
/* Ele vai algo , ser usado , a partir de algum efeito que estivermos .usar um effeito */
   const [user ,setUser] = useState();

//1-usando ele a cada renderização 
useEffect(() => {
  console.log("Roda A cada renderização");

 })
 
 //2: usando com um array dependências -
useEffect(()=>{
  console.log('Só roda ao incrementar valor!');
},[countB])  /* Ou seja, ele so é acionado quando apos alterado mapeando as ações    */
/* 3-Usando com um array vazio . apenas quando iniciar  reload geralmente para carregamento de dados externos. Get de uma api. */
useEffect(()=>{
console.log('So roda quando da o relode da página ')
},[]);
/* 4- limpeza de memoria do front end clean uo function  */
useEffect(()=>{
  const timer = setTimeout(() => { 
  console.log(`O incrementador Foi alterado ${count} vezes. limpando `);
},2000);
/* Esta , para resolver os problemas de memorias   */
return()=>{
  clearTimeout(timer)
};
},[count]);
/* 5- fetch com useefffect consumir api  */
useEffect(()=>{
  /* Colocando, sem useEfect aqui ele fica loop eternamente pedindo requisição  */
  fetch("https://api.github.com/users/alexoab")
    .then((res)=> res.json())
    .then((JSON)=> setUser(JSON)) ;
},[]);/* Passando vazio para executar uma vez */

    return (
  
      <div>
        <div>
  <p> Aprendendo hook useeffect </p>

  <button onClick={()=>setCount(prevCont=> prevCont+1)}>Renderização</button>
  {/* ( é interessante  quando algo e modificado na tela) */}
  <p>{count}</p>
      </div>
           <div>
           <p> Aprendendo hook useeffect B </p>
         
           <button onClick={()=>setCountB(prevCont=> prevCont+1)}>Renderização B</button>
           {/* ( é interessante  quando algo e modificado na tela) */}
           <p>{countB}</p>
               </div>
               {user &&(
               <div>
               <p>Dados do usuário Git:</p>
               <h1>Nome: {user.name}</h1>
                <p>
                <p>Bio: {user.bio}</p>
                <p>Localização: {user.location}</p>
                <p>Data de criação da conta: {user.created_at}</p>

                <p>Repositórios públicos: {user.public_repos}</p>
                <p>Gists públicos: {user.public_gists}</p>

      
                 site: <a href={user.blog}>{user.blog}</a>                
                 </p>

                 <img src={user.avatar_url}/>  
                 <p>Seguidores: {user.followers}</p>
                 <p>Seguindo: {user.following}</p>


              </div>  
               )}
               
        </div> 
  );
}

export default App;
