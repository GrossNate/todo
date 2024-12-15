import { Todo, ItemProps } from "../types"
import Item from "./Item"

interface ItemsProps {
  todos: Todo[];
  itemProps: Omit<ItemProps, "todo">;
  showAddItem: () => void;
}

const Items: React.FC<ItemsProps> = ({ todos, itemProps, showAddItem }: ItemsProps) => {
  return (
    <div id="items">
      <header>
        <label htmlFor="sidebar_toggle">
          <img src="images/hamburger.png" alt="Toggle Sidebar" />
        </label>
        <dl>
          <dt><time>current_section.title</time></dt>
          <dd>{todos.length}</dd>
        </dl>
      </header>
      <main>
        <label htmlFor="new_item" onClick={showAddItem}>
          <img src="images/plus.png" alt="Add Todo Item" />
          <h2>Add new to do</h2>
        </label>
        <table cellSpacing="0">
          <tbody>
            {
              todos.map(todo =>
                (<Item
                  todo={todo}
                  key={todo.id}
                  setCompletion={itemProps.setCompletion}
                  deleteItem={itemProps.deleteItem}
                  showEditItem={itemProps.showEditItem}
                  setItemToEdit={itemProps.setItemToEdit}
                />))
            }
          </tbody>
        </table>

      </main>
    </div>
  )
}

export default Items