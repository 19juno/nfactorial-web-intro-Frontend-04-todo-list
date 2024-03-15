import Vector from "../../../assets/Vector.png";
import { useState } from "react";
import "./index.css";
import { useStatesFunctions } from "../../../ContextApp";
import ModalButton from "../ModalButton";
import ModalButtonForTrash from "../ModalButton/BtnForTrash";

export default function ToDo({ item, index }) {
  const {
    todos,
    isModalBtnOpen,
    isOpenForTrash,
    isChecked,
    openModalBtn,
    makeTodoDone,
  } = useStatesFunctions();

  return (
    <div key={index} className="d-flex" id="itemsTodo">
      <button id="btnMenu" onClick={() => openModalBtn(todos, item.id)}>
        <img
          id="imgVector"
          src={Vector}
          alt="Vector"
          style={{ width: "2.5px", height: "10px" }}
        />
      </button>
      {item.status === "trash"
        ? isOpenForTrash[item.id] && <ModalButtonForTrash item={item} />
        : isModalBtnOpen[item.id] && <ModalButton item={item} />}
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isChecked}
            id="exampleCheckbox"
            onChange={() => makeTodoDone(item.id, !isChecked)}
          />
          <label
            className="form-check-label"
            htmlFor="exampleCheckbox"
            style={{
              textDecoration:
                isChecked && item.status === "done" ? "line-through" : "none",
            }}
          >
            {item.title}
          </label>
        </div>
      </div>
    </div>
  );
}
