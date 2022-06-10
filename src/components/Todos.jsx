import React , {useEffect , useState} from 'react';

const Todos = () => {

    const [todos, settodos] = useState([]);
    const [newtodo, setnewtodo] = useState("");

  const savinfo = () => {
    fetch(`http://localhost:8080/todos`,{
      method : "POST",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify({
        title : newtodo,
        completed : false,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
    settodos([...todos,data])
    setnewtodo("");
    });
  }

    useEffect(() => {
    fetch(`http://localhost:8080/todos?_page=1&_limit=5`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    settodos(data);
  });
  
    }, []);


  return (
    <div>Todos
      <div>
      <input value={newtodo} onChange={({target}) => setnewtodo(target.value)} type="text"  placeholder='Enter list'/>
      <button onClick={savinfo}>ADD</button>
      </div>
        {todos.map((todo) =>
        (
          <div key={todo.id}><h2>{todo.title}</h2></div>
        ))}
    </div>
  )
}

export default Todos;