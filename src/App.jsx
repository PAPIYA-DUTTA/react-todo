import React from 'react'
import Todo from './components/Todo'
import "./App.css";
import TodoItems from './components/TodoItems';
const App = () => {
  return (
    <div className='bg- grid py-4 min-h-screen'>
      <Todo/>
     
    </div>
  )
}

export default App