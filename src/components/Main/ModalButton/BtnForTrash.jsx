import "./index.css";
import Trash from "../../../assets/Trash.png";
import MoveBackBtn from "../../../assets/MoveBackBtn.png";

export default function ModalButtonForTrash({ deleteForever, item }) {
  return (
    <div className="btn-group-vertical" id="btnForTrash">
      <button id="insideBtn" onClick={() => deleteForever(item.id)}>
        <img id="imgTrash" src={Trash} alt="Trash" />
        <p>Delete Forever</p>
      </button>
      <button id="insideBtn">
        <img id="MoveBackBtn" src={MoveBackBtn} alt="Move Back To To Done" />
        <p>Move Back To To Do</p>
      </button>
    </div>
  );
}
