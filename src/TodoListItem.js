import style from "./TodoListItem.module.css";
import { ReactComponent as RemoveButton } from "./icons/RemoveIcon.svg";
import { useState } from "react";

const TodoListItem = ({
  todo,
  onRemoveTodo,
  onToggleCompletion,
  onUpdateNewTitle,
}) => {
  const { title, id, completed } = todo;

  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSaveClick = (event) => {
    onUpdateNewTitle(id, newTitle);
    setEdit(false);
  };

  return (
    <div className={style.container}>
      <div className={style.column}>
        <input
          className={style.checkbox}
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompletion(id)}
        />
      </div>
      <div className={style.column}>
        {edit ? (
          <input value={newTitle} onChange={handleTitleChange} />
        ) : (
          <span className={completed ? style.completedTodo : style.ListItem}>
            {title}
          </span>
        )}
      </div>
      <div className={style.column}>
        &nbsp;
        {edit ? (
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}
        <button
          className={style.button}
          type="button"
          onClick={() => {
            onRemoveTodo(id);
          }}
        >
          <div className={style.buttonIcon}>
            <RemoveButton />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
