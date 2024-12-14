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

  const handleEdit: ReactEventHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    mutate.showEditItem();
    mutate.setItemToEdit(todo);
  }

  const assertString = (val: unknown): val is string => {
    return typeof val === "string";
  }

  const displayDueDate: string = (todo.month?.trim() === "" || todo.year?.trim() === "") ?
    "No Due Date" :
    (assertString(todo.month) && assertString(todo.year)) ?
      `${todo.month.toString()}/${todo.year.toString().slice(2)}` :
      ""

  return (
    <tr>
      <td className="list_item" onClick={handleToggleCompletion}>
        <input type="checkbox" id={itemId} checked={todo.completed} onChange={handleToggleCompletion} />
        <span className="check"></span>
        <label htmlFor={itemId} onClick={handleEdit}>
          {todo.title} - {displayDueDate}
        </label>
      </td>
      <td className="delete" onClick={handleDelete}><img src="images/trash.png" alt="Delete" /></td>
    </tr>
  )
}

export default Item
