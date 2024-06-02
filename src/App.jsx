import React, { useEffect, useState } from 'react'
import {FaPlus,FaPencilAlt} from 'react-icons/fa';
import "./App.css";
import { db } from './firebase';
import {collection,onSnapshot,addDoc,doc,updateDoc, deleteDoc} from 'firebase/firestore';
import TodoList from './components/TodoList';

function App(){

const [todos, setTodos]=useState([]);
const [input, setInput]=useState('');
const [editIndex, setEditIndex]=useState(-1);

useEffect(()=>{
  const unsubscribe=onSnapshot(collection(db, 'todos'),(snapshot)=>{
  setTodos(snapshot.docs.map((doc)=>({id: doc.id, todo: doc.data().todo})));
 });
return () => unsubscribe();
}, []);


const setEdit=(index)=>{
  setInput(todos[index].todo);
  setEditIndex(index)
};

const addTodo=async()=>{
  try{
if(input.trim()!==''){
 //setTodos([...todos,{id: new Date(),todo:input}]);
   await addDoc(collection(db, 'todos'), {todo:input});
  setInput('')
}
  }
  catch(error){
    console.error(error.message);
  }
}
const updateTodo= async () =>{
  try{
    if(input.trim()!==''){
     const todoDocRef =doc(db, 'todos',todos[editIndex].id);
     await updateDoc(todoDocRef, {todo:input});
      setEditIndex(-1)
      setInput('')
    }
  }catch(error){
    console.error(error.message);
}
}
const removeTodo =async(id) =>{
  try{
    await deleteDoc(doc(db, 'todos',id));
  }catch(error){
console.error(error.message);
  }
}
  return (
    <div  className='min-h-screen flex  flex-col items-center justify-center gap-4 p-4'>
      <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
        <h1 className='text-3xl font-bold text-center mb-4'>Todo App</h1>
        <div className='flex'>
          <input 
          type="text"
          placeholder='Add a todo'
          className='py-2 px-4 border rounded w-full focus:outline-none mr-2'
          value={input}
          onChange={(e) =>setInput(e.target.value)}
          />
          <button onClick={editIndex === -1 ? addTodo : updateTodo} className='bg-gradient-to-r from-violet-400 to-pink-600 py-2 px-4'>
           {editIndex === -1 ? <FaPlus/>:<FaPencilAlt/>}
          </button>
        </div>
        </div>
 
      {
        todos.length > 0 && <TodoList todos={todos} setEdit={setEdit}  removeTodo={removeTodo}/>
         
        
        
      }
  
    </div>
  )
}

export default App
