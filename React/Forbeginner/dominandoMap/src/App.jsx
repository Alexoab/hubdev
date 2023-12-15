
import './App.css'
const users = [
  {
    id: 0,
    name: 'Alex o dev',
    address: 'Rua x',
    age: 28,
    isAdmin: false,
  },
  {
    id: 1,
    name: 'Maria eng',
    address: 'Rua xx',
    age: 31,
    isAdmin: true,
  },
  {
    id: 2,
    name: 'MaTheus',
    address: 'Rua xI',
    age: 22,
    isAdmin: false,
  },
]
function App() {


  return (
    <>
      {/* Aqui sem o MAP: como seria a busca. */}
      <h3>Array normal</h3>
      <div> OI:{users[0].name},{users[1].address}</div>
      <div> OI:{users[1].name}</div>
      <div> OI:{users[2].name}</div>
      <div>
        <h3>Aqui usando o map</h3>
      </div>
      <div >
        {users.map((user, index) => (
          /*  <div key={user.id}>{user.name},{user.age}</div> */
          <div>{user.name},{user.age},index={index}</div>

        ))}
      </div >





    </>
  )
}

export default App
