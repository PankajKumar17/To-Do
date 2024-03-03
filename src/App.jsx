import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <div className="h-[100vh] w-[100vw] bg-purple-50 relative flex justify-around flex-col ">      
      <Navbar/>
      
      <div className="box w-full mx-3 bg-purple-100 md:w-[40vw] md:mx-auto rounded-lg flex flex-col px-10 py-10 items-center gap-4 min-h-[80vh]">
        <h1 className='font-bold text-2xl '>iTASK - Manage Your All Todos Here</h1>
        <h2 className='font-bold text-lg self-start'>Add A Todo</h2>
        <div className="inp w-[100%] flex gap-4">
          <input  onChange={handleChange} value={todo} className='w-[85%] rounded-2xl px-2 py-1' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=1} className='bg-purple-600 cursor-pointer px-3 py-1 text-white rounded-xl hover:bg-purple-800'>Add</button>
        </div>
        <h4 className='self-start'><input className='mx-2' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished</h4>
        <div className="line w-[96%] h-[1.2px] bg-gray-400"></div>
        <div className="todos self-start">
          <h2 className='font-bold text-lg self-start'>Your Todos</h2>
          <div className="todos min-w-[70vw] md:min-w-[30vw]">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5 justify-between'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
            </div> 
          </div>
          })}
         </div>
        </div>
      </div>
    </div>
  )
}

export default App
