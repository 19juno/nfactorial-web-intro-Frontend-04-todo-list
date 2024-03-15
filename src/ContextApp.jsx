import { createContext, useContext, useState } from "react";
const MyContext = createContext();

export const useStatesFunctions = () => useContext(MyContext);

export const MyProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // for Modal window
  const [isModalBtnOpen, setModalBtnOpen] = useState({}); // for Modal Button
  const [filteredStatus, setFilteredStatus] = useState("todo"); // для фильтрации страниц
  const [pageTitle, setPageTitle] = useState("To Do"); // изменение темы title
  const [isOpenForTrash, setOpenForTrash] = useState({}); // для кнопки из контента Trash
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
      setModalBtnOpen((prevState) => ({
        ...prevState,
        [newTodoItem.id]: false,
      }));
      setOpenForTrash((prevState) => ({
        ...prevState,
        [newTodoItem.id]: false,
      }));
    } else {
      alert("Заполните текст");
    }
  };

  // для смены контента на странице
  function changePage(newStatus, newTitle) {
    setFilteredStatus(newStatus);
    setPageTitle(newTitle);
  }

  // для открытия модальной кнопки
  function openModalBtn(todos, idx) {
    const item = todos.find((item) => item.id === idx);
    if (item) {
      setModalBtnOpen((prevState) => ({
        ...prevState,
        [item.id]: !prevState[item.id],
      }));
    }
    if (item.status === "trash") {
      setOpenForTrash((prevState) => ({
        ...prevState,
        [item.id]: !prevState[item.id],
      }));
    }
  }

  // для смены стилей в todo
  const handleCheckboxChange = () => {
    if (false) {
      isChecked;
    }
  };

  // для перекидывания todo на другие страницы
  function moveToTrash(idx) {
    const newTodos = todos.map((item) =>
      item.id === idx ? { ...item, status: "trash" } : item
    );
    setTodos(newTodos);
  }

  function makeTodoDone(idx, newStatus) {
    if (newStatus) {
      const newTodos = todos.map((item) =>
        item.id === idx ? { ...item, status: "done" } : item
      );
      setIsChecked(!isChecked);
      setTodos(newTodos);
    } else {
      const newTodos = todos.map((item) =>
        item.id === idx ? { ...item, status: "todo" } : item
      );
      setIsChecked(!isChecked);
      setTodos(newTodos);
    }
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

  // Функция для сохранения данных в localStorage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const loadedTodos = JSON.parse(storedTodos);
      setTodos(loadedTodos);
    }
  }

  return (
    <MyContext.Provider
      value={{
        todos,
        setTodos,
        isModalOpen,
        setModalOpen,
        isModalBtnOpen,
        setModalBtnOpen,
        filteredStatus,
        setFilteredStatus,
        pageTitle,
        setPageTitle,
        isOpenForTrash,
        setOpenForTrash,
        isChecked,
        setIsChecked,
        openModal,
        closeModal,
        addNewTodo,
        changePage,
        openModalBtn,
        handleCheckboxChange,
        moveToTrash,
        makeTodoDone,
        deleteForever,
        moveBackToTodo,
        saveTodos,
        loadTodos,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
