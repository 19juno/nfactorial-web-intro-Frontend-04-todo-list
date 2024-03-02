import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePlus from "../../assets/PlusMath.png";
import Vector from "../../assets/Vector.png";
import { useState } from "react";
import ModalWindow from "./ModalWindow";
import Actions from "./Actions";
import ModalButton from "./ModalButton";

export default function Main() {
  // for Modal window
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // for Modal Button

  const [isModalBtnOpen, setModalBtnOpen] = useState(false);

  const openModalBtn = () => {
    setModalBtnOpen(!isModalBtnOpen);
  };

  const closeModalBtn = () => {
    setModalBtnOpen(false);
  };

  // ФИЛЬТРАЦИЯ

  const [todos, setTodos] = useState([]);

  const [filteredStatus, setFilteredStatus] = useState("todo"); // для фильтрации страниц

  const addNewTodo = (newTodo) => {
    // добавление новой todo-shki
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      status: "todo",
    };
    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
  };

  const [pageTitle, setPageTitle] = useState("To Do"); // изменение темы title

  // кнопки для перекидывания todo на другие страницы

  function moveToTrash(idx) {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "trash" } : item
    );
    setTodos(newTodos);
    closeModalBtn();
  }

  function makeTodoDone(idx) {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "done" } : item
    );
    setTodos(newTodos);
  }

  // для смены контента на странице
  function changePage(newStatus, newTitle) {
    setFilteredStatus(newStatus);
    setPageTitle(newTitle);
  }

  const filteredTodos = todos.filter((item) => {
    if (filteredStatus == "todo" && item.status == "todo") return item;
    if (filteredStatus == "done" && item.status == "done") return item;
    if (filteredStatus == "trash" && item.status == "trash") return item;
  });

  return (
    <div className="main">
      <div className="d-flex justify-content-between align-baseline">
        <Actions changePage={changePage} />

        {isModalOpen && (
          <ModalWindow addNewTodo={addNewTodo} closeModal={closeModal} />
        )}
        <button id="btnModalWindow" onClick={openModal}>
          <img src={ImagePlus} alt="Plus" />
        </button>
      </div>

      <p id="sectionTitle">{pageTitle}</p>
      <hr className="mx-5" />
      {todos &&
        filteredTodos.map((item, index) => (
          <div key={index} className="d-flex" id="itemsTodo">
            {isModalBtnOpen && (
              <ModalButton moveToTrash={moveToTrash} item={item} />
            )}
            <button id="btnMenu" onClick={openModalBtn}>
              <img
                id="imgVector"
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
                onClick={() => makeTodoDone(item.id)}
              />
              <label className="form-check-label" for="exampleCheckbox">
                {item.title}
              </label>
            </div>
          </div>
        ))}
    </div>
  );
}
