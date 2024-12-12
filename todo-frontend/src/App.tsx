import { useEffect, useState } from 'react'
import './App.css'
import Items from './components/Items'
import Sidebar from './components/Sidebar'
import { MutationObject, Todo } from './types'
import { deleteItem, getAll, setCompleted } from './services/todos'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const deleteLocal = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const updateItemLocal = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  }

  const mutate: MutationObject = {
    setCompletion: async (id: number, completed: boolean): Promise<void> => {
      const completedItem = await setCompleted(id, completed);
      updateItemLocal(completedItem);
    },
    delete: async (id: number): Promise<void> => {
      const itemDeleted = await deleteItem(id);
      if (itemDeleted) deleteLocal(id)
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const retrievedTodos: Todo[] = await getAll();
      setTodos(retrievedTodos);
    };
    void fetchTodos();
  },[]);

  return (
    <>
      <input type='checkbox' id='sidebar_toggle' />
      <Sidebar />
      <Items todos={todos} mutate={mutate} />
    </>
  )
}

export default App
