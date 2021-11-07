import React,{ useState } from 'react';
import './App.css';

import Form from './components/Form';
import List from './components/List';

import TODOI from './interfaces/TodoInterface';

const App=()=> {
  const [todos,setTodos] = useState<TODOI[]>([
    {

      id:1,
      text:'Todo 1',
      completed:false,
    },
    {

      id:2,
      text:'Todo 2 (completed)',
      completed:true,
    },
  ]);
  
  const addTodo = (todo: string): void => {
    const data: TODOI = {
      id:todos.length < 1 ? 1 : todos[todos.length -1].id +1,
      text: todo,
      completed: false,
  };
    setTodos((prevTodos : TODOI[]) : TODOI[] => [...prevTodos,data]);
    window.alert('Thêm thành công!');
  };
  const completeTodo = (id: number): void=>{
    const currentTodo : any = todos.find((todo: TODOI) => todo.id === id );
    currentTodo.completed = true;
    const updatedTodos : TODOI[] =  todos.map((todo:TODOI): TODOI=>
    todo.id ===id ? currentTodo : todo
  );
    setTodos(updatedTodos);
    window.alert('Hoàn thành!');
  }
  const deleteTodo = (id: number): void=>{
    
    const updatedTodos : TODOI[] =  todos.filter(
      (todo:TODOI): any=> todo.id !== id
  );
    setTodos(updatedTodos);
    window.alert('Xoá thành công!');
  }
  return (
    <div className="container">
      <div>
        <h1 className='text-center my-2' >To-Do List</h1>
        <p className='h6 text-center my-2'>Enter text into the input field to add items to your list</p>
        <p className='h6  text-center my-2'>Click "X" to remove the item from your list</p>
        <p className='h6  text-center my-2'>Click the item to mark it as complete</p>
      </div>
      <div className="row flex-column">
        <Form addTodo={addTodo}  />
        <List todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
