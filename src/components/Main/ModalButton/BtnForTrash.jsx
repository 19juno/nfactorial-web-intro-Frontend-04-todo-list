import "./index.css";
import Trash from "../../../assets/Trash.png";
import MoveBackBtn from "../../../assets/MoveBackBtn.png";
import { useStatesFunctions } from "../../../ContextApp";

export default function ModalButtonForTrash({ item }) {
  const { deleteForever, moveBackToTodo } = useStatesFunctions();

  return (
    <div className="btn-group-vertical" id="btnForTrash">
      <button id="insideBtn" onClick={() => deleteForever(item.id)}>
        <img id="imgTrash" src={Trash} alt="Trash" />
        <p>Delete Forever</p>
      </button>
      <button id="insideBtn" onClick={() => moveBackToTodo(item.id)}>
        <img id="MoveBackBtn" src={MoveBackBtn} alt="Move Back To To Done" />
        <p>Move Back To To Do</p>
      </button>
    </div>
  );
}
