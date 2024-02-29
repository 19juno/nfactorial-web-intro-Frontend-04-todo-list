import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePlus from "../../assets/PlusMath.png";
import Vector from "../../assets/Vector.png";
import { useState } from "react";
import ModalWindow from "./ModalWindow";

export default function Main() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [todos, setTodos] = useState([]);

  const addNewTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const [pageTitle, setPageTitle] = useState("To Do");

  const changePageTitle = (newTitle) => {
    setPageTitle(newTitle);
  };

  return (
    <div className="main">
      <div className="d-flex justify-content-between align-baseline">
        <div id="actionButtons">
          <button id="buttons" onClick={() => changePageTitle("To Do")}>
            To Do
          </button>
          <button id="buttons" onClick={() => changePageTitle("Done")}>
            Done
          </button>
          <button id="buttons" onClick={() => changePageTitle("Trash")}>
            Trash
          </button>
        </div>

        {isModalOpen && (
          <ModalWindow addNewTodo={addNewTodo} closeModal={closeModal} />
        )}
        <button id="btnModalWindow" onClick={openModal}>
          <img src={ImagePlus} alt="Plus" />
        </button>
        <div id="modalWindow" className=""></div>
      </div>
      <p id="sectionTitle">{pageTitle}</p>
      <hr className="mx-5" />
      {todos &&
        todos.map((item, index) => (
          <div key={index} className="d-flex" id="itemsTodo">
            <button id="btnMenu">
              <img
                src={Vector}
                alt=""
                style={{ width: "2.5px", height: "10px" }}
              />
            </button>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheckbox"
              />
              <label className="form-check-label" for="exampleCheckbox">
                {item}
              </label>
            </div>
            <button id="">Move to Trash</button>
          </div>
        ))}
    </div>
  );
}
