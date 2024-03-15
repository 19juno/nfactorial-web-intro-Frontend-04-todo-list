import { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStatesFunctions } from "../../../ContextApp";

export default function ModalWindow() {
  const { closeModal, addNewTodo } = useStatesFunctions();

  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    addNewTodo(input);
    closeModal();
  };

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
