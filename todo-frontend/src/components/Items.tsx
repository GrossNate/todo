import { MutationObject, Todo } from "../types"
import Item from "./Item"

const Items = ({ todos, mutate }: { todos: Todo[], mutate: MutationObject}) => {
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
        <label htmlFor="new_item">
          <img src="images/plus.png" alt="Add Todo Item" />
          <h2>Add new to do</h2>
        </label>
        <table cellSpacing="0">
          <tbody>
            {
              todos.map(todo =>
                (<Item todo={todo} key={todo.id} mutate={mutate} />))
            }
          </tbody>
        </table>

      </main>
    </div>
  )
}

export default Items