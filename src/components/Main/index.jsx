import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePlus from "../../assets/PlusMath.png";
import { useEffect } from "react";
import ModalWindow from "./ModalWindow";
import Actions from "./Actions";
import Todo from "./Todo";
import { useStatesFunctions } from "../../ContextApp";

export default function Main() {
  const {
    todos,
    isModalOpen,
    filteredStatus,
    pageTitle,
    openModal,
    saveTodos,
    loadTodos,
  } = useStatesFunctions();

  const filteredTodos = todos.filter((item) => {
    if (filteredStatus == "todo" && item.status == "todo") return item;
    if (filteredStatus == "done" && item.status == "done") return item;
    if (filteredStatus == "trash" && item.status == "trash") return item;
  });

  useEffect(() => {
    window.addEventListener("beforeunload", saveTodos);
    return () => {
      window.removeEventListener("beforeunload", saveTodos);
    };
  }, [todos]);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="main">
      <div className="d-flex justify-content-between align-baseline plusBtnContainer">
        <Actions />

        {isModalOpen && <ModalWindow />}
        <button id="btnModalWindow" onClick={openModal}>
          <img src={ImagePlus} alt="Plus" />
        </button>
      </div>

      <div>
        <p id="sectionTitle">{pageTitle}</p>
        <hr id="hr" />
      </div>

      {todos &&
        filteredTodos.map((item, index) => <Todo item={item} index={index} />)}
    </div>
  );
}
