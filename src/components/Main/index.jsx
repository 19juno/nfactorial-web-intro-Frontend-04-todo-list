import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePlus from "../../assets/PlusMath.png";
import Vector from "../../assets/Vector.png";
import { useState } from "react";
import ModalWindow from "./ModalWindow";
import Actions from "./Actions";
import ModalButton from "./ModalButton";
import ModalButtonForTrash from "./ModalButton/BtnForTrash";
import { useEffect } from "react";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // for Modal window
  const [isModalBtnOpen, setModalBtnOpen] = useState(false); // for Modal Button
  const [filteredStatus, setFilteredStatus] = useState("todo"); // для фильтрации страниц
  const [pageTitle, setPageTitle] = useState("To Do"); // изменение темы title
  const [isOpenForTrash, setOpenForTrash] = useState(false); // для кнопки из контента Trash
  const [isChecked, setIsChecked] = useState(false); // для прослеживаний checkbox

  // for ModalWindow
  const openModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // добавление новой todo-shki
  const addNewTodo = (newTodo) => {
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

  // для открытия модальной кнопки
  function openModalBtn(idx) {
    const item = todos.find((item) => item.id === idx);
    if (item) {
      setModalBtnOpen((prevState) => !prevState);
    }
    if (item.status === "trash") {
      setOpenForTrash((prevState) => !prevState);
    }
  }

  // для смены стилей в todo
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // для перекидывания todo на другие страницы
  function moveToTrash(idx) {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "trash" } : item
    );
    setTodos(newTodos);
  }

  function makeTodoDone(idx) {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "done" } : item
    );
    handleCheckboxChange();
    setTodos(newTodos);
  }

  // Modal button for Trash

  const deleteForever = (idx) => {
    const newTodos = todos.filter((item) => item.id !== idx);
    setTodos(newTodos);
    setOpenForTrash((prevState) => !prevState);
  };

  // move back to To do

  const moveBackToTodo = (idx) => {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "todo" } : item
    );
    setTodos(newTodos);
  };

  // для хранения в localStorage
  // function saveTodos() {
  //   localStorage.setItem("todos", JSON.stringify(filteredTodos));
  //   const saveTodos = localStorage.getItem("todos");
  //   console.log(saveTodos);
  // }
  // saveTodos();

  // Функция для сохранения данных в localStorage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // Эффект для добавления и удаления слушателя события beforeunload
  useEffect(() => {
    window.addEventListener("beforeunload", saveTodos);
    return () => {
      window.removeEventListener("beforeunload", saveTodos);
    };
  }, [todos]);

  function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const loadedTodos = JSON.parse(storedTodos);
      setTodos(loadedTodos);
    }
  }
  // loadTodos();
  useEffect(() => {
    loadTodos();
  }, []);

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
                    moveBackToTodo={moveBackToTodo}
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
                checked={isChecked}
                id="exampleCheckbox"
                onChange={() => makeTodoDone(item.id)}
              />
              <label
                className="form-check-label"
                for="exampleCheckbox"
                style={{ textDecoration: isChecked ? "line-through" : "none" }}
              >
                {item.title}
              </label>
            </div>
          </div>
        ))}
    </div>
  );
}
