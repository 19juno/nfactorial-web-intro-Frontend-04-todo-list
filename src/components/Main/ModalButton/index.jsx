import "./index.css";
import Trash from "../../../assets/Trash.png";
import { useStatesFunctions } from "../../../ContextApp";

export default function ModalButton({ item }) {
  const { moveToTrash } = useStatesFunctions();

  return (
    <div className="">
      <button id="btnMoveToTrash" onClick={() => moveToTrash(item.id)}>
        <img id="imgTrash" src={Trash} alt="Trash" />
        <p>Move to Trash</p>
      </button>
    </div>
  );
}
