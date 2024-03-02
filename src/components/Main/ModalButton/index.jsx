import "./index.css";
import Trash from "../../../assets/Trash.png";

export default function ModalButton({ moveToTrash, item }) {
  return (
    <div className="">
      <button id="btnMoveToTrash" onClick={() => moveToTrash(item.id)}>
        <img id="imgTrash" src={Trash} alt="Trash" />
        <p>Move to Trash</p>
      </button>
    </div>
  );
}
