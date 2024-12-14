import { ReactEventHandler } from "react";
import { DisplayTypes, MutationObject, SelectOption, Todo } from "../types";

const Options = ({ options }: { options: SelectOption[] }) => {
  return (
    <>
      {
        options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          )
        })
      }
    </>
  )
}

const EditItem = ({ mutate, editItemDisplay, itemToEdit }: { mutate: MutationObject, editItemDisplay: DisplayTypes, itemToEdit: Todo }) => {
  const blankTodo: Todo = { id: 0, title: "", day: "", month: "", year: "", description: "", completed: false};

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
    mutate.setItemToEdit({ ...itemToEdit, [event.target.name]: event.target.value });
  };

  const clearAndHide = () => {
    mutate.setItemToEdit(blankTodo);
    mutate.hideEditItem();
  }

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    const itemEdited = await mutate.editItem();
    if (itemEdited) {
      clearAndHide()
    } else {
      alert("Item couldn't be edited! (You can't have a blank title.)")
    }
  }
  
  const handleToggleCompletion: ReactEventHandler = (event) => {
    event.preventDefault();
    void mutate.setCompletion(itemToEdit.id, !itemToEdit.completed);
    clearAndHide();
  }

  const dayOptions: SelectOption[] = [{ value: "  ", display: "Day" }]
    .concat(
      Array(31)
        .fill(null)
        .map((_, i) => ({ 
          value: (i + 1).toString().padStart(2, "0"),
          display: (i + 1).toString() })));

  const monthOptions: SelectOption[] = [{ value: "  ", display: "Month" }]
    .concat(
      Array(12)
        .fill(null)
        .map((_, i) => ({ 
          value: (i + 1).toString().padStart(2, "0"),
          display: new Date(2000, i, 1).toLocaleString("en-us", {month: "long"})})));
          
  const yearOptions: SelectOption[] = [{ value: "    ", display: "Year" }]
    .concat(
      Array(10)
        .fill(null)
        .map((_, i) => {
          const earliestYear = 2024;
          return { 
            value: (i + earliestYear).toString(),
            display: (i + earliestYear).toString()
          }}));
          
  return (
    <>
      <div className="modal" id="modal_layer" style={{ display: editItemDisplay }} onClick={clearAndHide}></div>
      <div className="modal" id="form_modal" style={{ display: editItemDisplay }}>
        <form action="" method="post" >
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Item 1" value={itemToEdit.title} onChange={handleChange} />
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select id="due_day" name="day" value={itemToEdit.day} onChange={handleChange}>
                    <Options options={dayOptions} />
                  </select>  /
                  <select id="due_month" name="month" value={itemToEdit.month} onChange={handleChange}>
                    <Options options={monthOptions} />
                  </select> /
                  <select id="due_year" name="year" value={itemToEdit.year} onChange={handleChange}>
                    <Options options={yearOptions} />
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea cols={50} name="description" rows={7} value={itemToEdit.description} onChange={handleChange} placeholder="Description"></textarea>
              </li>
              <li>
                <input type="submit" value="Save" onClick={(event) => { void handleSave(event) }} />
                <button name="complete" onClick={handleToggleCompletion}>Mark As {itemToEdit.completed ? "Uncomplete" :"Complete"}</button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default EditItem