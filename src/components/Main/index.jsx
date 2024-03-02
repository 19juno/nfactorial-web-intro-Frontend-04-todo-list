import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePlus from "../../assets/PlusMath.png";
import Vector from "../../assets/Vector.png";
import { useState } from "react";
import ModalWindow from "./ModalWindow";
import Actions from "./Actions";
import ModalButton from "./ModalButton";
import ModalButtonForTrash from "./ModalButton/BtnForTrash";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // for Modal window
  const [isModalBtnOpen, setModalBtnOpen] = useState(false); // for Modal Button
  const [filteredStatus, setFilteredStatus] = useState("todo"); // для фильтрации страниц
  const [pageTitle, setPageTitle] = useState("To Do"); // изменение темы title
  const [isOpenForTrash, setOpenForTrash] = useState(false); // для кнопки из контента Trash

  const openModal = () => {
    // for ModalWindow
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addNewTodo = (newTodo) => {
    // добавление новой todo-shki

    if (newTodo !== "") {
      const newTodoItem = {
        id: Date.now(),
        title: newTodo,
        status: "todo",
      };
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    } else {
      alert("Заполните текст");
    }
  };

  function changePage(newStatus, newTitle) {
    // для смены контента на странице
    setFilteredStatus(newStatus);
    setPageTitle(newTitle);
  }

  const filteredTodos = todos.filter((item) => {
    if (filteredStatus == "todo" && item.status == "todo") return item;
    if (filteredStatus == "done" && item.status == "done") return item;
    if (filteredStatus == "trash" && item.status == "trash") return item;
  });

  function openModalBtn(idx) {
    // для открытия модальной кнопки
    const item = todos.find((item) => item.id === idx);
    if (item) {
      setModalBtnOpen((prevState) => !prevState);
    }
    if (item.status === "trash") {
      setOpenForTrash((prevState) => !prevState);
    }
  }

  function moveToTrash(idx) {
    // для перекидывания todo на другие страницы
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "trash" } : item
    );
    setTodos(newTodos);
  }

  function makeTodoDone(idx) {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "done" } : item
    );

    setTodos(newTodos);
  }

  // Modal button for Trash

  const deleteForever = (idx) => {
    const newTodos = todos.filter((item) => item.id !== idx);
    setTodos(newTodos);
    setOpenForTrash((prevState) => !prevState);
  };

  return (
    <div className="main">
      <div className="d-flex justify-content-between align-baseline plusBtnContainer">
        <Actions changePage={changePage} />

        {isModalOpen && (
          <ModalWindow addNewTodo={addNewTodo} closeModal={closeModal} />
        )}
        <button id="btnModalWindow" onClick={openModal}>
          <img src={ImagePlus} alt="Plus" />
        </button>
      </div>
      <div className="">
        <p id="sectionTitle">{pageTitle}</p>
        <hr id="hr" />
      </div>

      {todos &&
        filteredTodos.map((item, index) => (
          <div key={index} className="d-flex" id="itemsTodo">
            {item.status === "trash"
              ? isOpenForTrash && (
                  <ModalButtonForTrash
                    deleteForever={deleteForever}
                    item={item}
                  />
                )
              : isModalBtnOpen && (
                  <ModalButton moveToTrash={moveToTrash} item={item} />
                )}
            <button id="btnMenu" onClick={() => openModalBtn(item.id)}>
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
