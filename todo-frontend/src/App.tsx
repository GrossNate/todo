import { useEffect, useState } from 'react'
import './App.css'
import Items from './components/Items'
import Sidebar from './components/Sidebar'
import { DisplayTypes, MutationObject, Todo } from './types'
import { deleteItem, editItem, getAll, newItem, setCompleted } from './services/todos'
import AddItem from './components/AddItem'
import EditItem from './components/EditItem'

const spaceDescription = <G extends Todo | Omit<Todo, "id">>(todo: G): G => {
  return {...todo, description: (todo.description) ? " " + todo.description : " "}
}

const unspaceDescription = (todo: Todo): Todo => {
  return {...todo, description: (todo.description) ? todo.description.slice(1): ""}
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addItemDisplay, setAddItemDisplay] = useState<DisplayTypes>("none");
  const [editItemDisplay, setEditItemDisplay] = useState<DisplayTypes>("none");
  const [itemToEdit, setItemToEdit] = useState<Todo>({id: 0, title: "", day: "", month: "", year: "", completed: false, description: ""});

  const deleteLocal = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const updateItemLocal = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  }

  const mutate: MutationObject = {
    setCompletion: async (id: number, completed: boolean): Promise<void> => {
      const completedItem = await setCompleted(id, completed);
      updateItemLocal(unspaceDescription(completedItem));
    },
    delete: async (id: number): Promise<void> => {
      const itemDeleted = await deleteItem(id);
      if (itemDeleted) deleteLocal(id)
    },
    addItem: async (newTodo: Omit<Todo, "id">): Promise<boolean> => {
      const itemAdded = await newItem(spaceDescription(newTodo));
      if (itemAdded) {
        setTodos(todos.concat(unspaceDescription(itemAdded)));
        return true;
      }
      return false;
    },
    editItem: async (): Promise<boolean> => {
      const itemEdited = await editItem(spaceDescription(itemToEdit));
      if (itemEdited) {
        setTodos(todos.map(todo => todo.id === itemEdited.id ? unspaceDescription(itemEdited) : todo));
        return true;
      }
      return false;
    },
    showAddItem: () => {
      setAddItemDisplay("block");
    },
    hideAddItem: () => {
      setAddItemDisplay("none");
    },
    showEditItem: () => {
      setEditItemDisplay("block");
    },
    hideEditItem: () => {
      setEditItemDisplay("none");
    },
    setItemToEdit
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
      <AddItem mutate={mutate} addItemDisplay={addItemDisplay} />
      <EditItem mutate={mutate} editItemDisplay={editItemDisplay} itemToEdit={itemToEdit} />
    </>
  )
}

export default App
