import "./index.css";

export default function Actions({ changePage }) {
  return (
    <div id="actionButtons">
      <button id="buttons" onClick={() => changePage("todo", "To Do")}>
        To Do
      </button>
      <button id="buttons" onClick={() => changePage("done", "Done")}>
        Done
      </button>
      <button id="buttons" onClick={() => changePage("trash", "Trash")}>
        Trash
      </button>
    </div>
  );
}
