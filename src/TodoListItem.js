import style from "./TodoListItem.module.css";
import { ReactComponent as RemoveButton } from "./icons/RemoveIcon.svg";

const TodoListItem = ({ todo, onRemoveTodo, onToggleCompletion }) => {
  const { title, id, completed } = todo;

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
        <span className={completed ? style.completedTodo : style.ListItem}>
          {title}
        </span>
      </div>
      <div className={style.column}>
        &nbsp;
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
