import { ReactEventHandler } from "react";
import { MutationObject, Todo } from "../types"

const Item = ({ todo, mutate }: { todo: Todo, mutate: MutationObject }) => {
  const itemId: string = "item" + todo.id.toString()

  const handleToggleCompletion: ReactEventHandler = () => {
    void mutate.setCompletion(todo.id, !todo.completed);
  }
  
  const handleDelete: ReactEventHandler = () => {
    void mutate.delete(todo.id);
  }

  return (
    <tr>
      <td className="list_item" onClick={handleToggleCompletion}>
        <input type="checkbox" id={itemId} checked={todo.completed} onChange={handleToggleCompletion}/>
        <span className="check"></span>
        <label htmlFor={itemId}>{todo.title} - {todo.month}</label></td>
      <td className="delete" onClick={handleDelete}><img src="images/trash.png" alt="Delete" /></td>
    </tr>
  )
}

export default Item
