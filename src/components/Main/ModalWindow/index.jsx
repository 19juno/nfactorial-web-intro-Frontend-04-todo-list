import { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalWindow({ addNewTodo, closeModal }) {
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    addNewTodo(input);
    closeModal();
  };
  console.log(input);
  return (
    <div id="modalWindowContainer" className="">
      <div className="">
        <p id="textModalWindow">Add New To Do</p>
      </div>

      <input
        value={input}
        onChange={handleChange}
        placeholder="Your text"
        type="text"
        name=""
        id="inputModalWindow"
      />
      <button onClick={handleClick} className="btn btn-dark" id="addBtn">
        Add
      </button>
    </div>
  );
}
