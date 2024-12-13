import { ReactEventHandler, useState } from "react";
import { DisplayTypes, MutationObject, Todo } from "../types";

const AddItem = ({ mutate, addItemDisplay }: { mutate: MutationObject, addItemDisplay: DisplayTypes }) => {
  const blankNewItem: Omit<Todo, "id" | "completed"> = {title: "", day: "", month: "", year: "", description: ""};
  const [input, setInput] = useState(blankNewItem);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
    setInput({...input, [event.target.name]: event.target.value});
  };

  const clearAndHide = () => {
    setInput(blankNewItem);
    mutate.hideAddItem();
  }

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    const itemAdded = await mutate.addItem({...input, completed: false}); 
    if (itemAdded) {
      clearAndHide()
    } else {
      alert("Item couldn't be added!")
    }
  }

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
                    <option>Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>  /
                  <select id="due_month" name="month" value={input.month} onChange={handleChange}>
                    <option>Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select> /
                  <select id="due_year" name="year" value={input.year} onChange={handleChange}>
                    <option>Year</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea cols={50} name="description" rows={7} value={input.description} onChange={handleChange} placeholder="Description"></textarea>
              </li>
              <li>
                <input type="submit" value="Save" onClick={(event) => {void handleSave(event)}} />
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default AddItem