import { useState } from "react";
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

const AddItem = ({ mutate, addItemDisplay }: { mutate: MutationObject, addItemDisplay: DisplayTypes }) => {
  const blankNewItem: Omit<Todo, "id" | "completed"> = { title: "", day: "", month: "", year: "", description: "" };
  const [input, setInput] = useState(blankNewItem);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const clearAndHide = () => {
    setInput(blankNewItem);
    mutate.hideAddItem();
  }

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    const itemAdded = await mutate.addItem({ ...input, completed: false });
    if (itemAdded) {
      clearAndHide()
    } else {
      alert("Item couldn't be added! (You can't have a blank title.)")
    }
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
      <div className="modal" id="modal_layer" style={{ display: addItemDisplay }} onClick={clearAndHide}></div>
      <div className="modal" id="form_modal" style={{ display: addItemDisplay }}>
        <form action="" method="post" >
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Item 1" value={input.title} onChange={handleChange} />
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select id="due_day" name="day" value={input.day} onChange={handleChange}>
                    <Options options={dayOptions} />
                  </select>  /
                  <select id="due_month" name="month" value={input.month} onChange={handleChange}>
                    <Options options={monthOptions} />
                  </select> /
                  <select id="due_year" name="year" value={input.year} onChange={handleChange}>
                    <Options options={yearOptions} />
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea cols={50} name="description" rows={7} value={input.description} onChange={handleChange} placeholder="Description"></textarea>
              </li>
              <li>
                <input type="submit" value="Save" onClick={(event) => { void handleSave(event) }} />
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default AddItem