
import { useState } from 'react';
import './App.css';



function App() {
  /* Variável de estado */
  const [count,setCount] = useState(0)
  //let count = 0
  /* Aqui eu demostro uma alteração ,porem não está sendo alterado na tela  */
  const[valueImput,setValueImput]= useState('Alex dev')
  /* Mudando o nome . com uma constante e eventos  */
  const onChangeInput =(event)=>{
    setValueImput(event.target.value);
  }
  const add = () => {
    //count = count + 1
    /* Ele é uma função , setando o novo valor em setCount*/
    setCount (count+1)
    console.log(count)
  }

  return (
    <>
      <div className='App'>
        <h1>Aprendendo uma Usestate</h1>
        <h3>{count}</h3>
        {/* Coloque o console.log para demostrar.Lembando que o react trabalha com estados  */}
        <button onClick={add}>adicionar </button>
      </div>
      <div>
        <input onChange={onChangeInput }></input>
      </div>
      <h3>{valueImput}</h3>
    </>
  )
}

export default App
