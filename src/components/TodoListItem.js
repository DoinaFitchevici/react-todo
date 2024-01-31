import style from "./TodoListItem.module.css";
import { ReactComponent as RemoveButton } from "./icons/RemoveIcon.svg";
import { ReactComponent as EditButton } from "./icons/EditIcon.svg";
import { useState } from "react";
import PropTypes from "prop-types";

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
          <button
            className={style.button}
            type="button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <button
            className={style.button}
            type="button"
            onClick={handleEditClick}
          >
            <div className={style.buttonIcon}>
              <EditButton className={style.EditIcon} />
            </div>
          </button>
        )}
      </div>
      <div className={style.column}>
        <button
          className={style.button}
          type="button"
          onClick={() => {
            onRemoveTodo(id);
          }}
        >
          <div className={style.buttonIcon}>
            <RemoveButton className={style.RemoveIcon} />
          </div>
        </button>
      </div>
    </div>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onUpdateNewTitle: PropTypes.func.isRequired,
};

export default TodoListItem;
