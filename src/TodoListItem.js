import styles from "./TodoListItem.module.css";
import { ReactComponent as RemoveButton } from "./deleteicon.svg";

const TodoListItem = ({ todo, onRemoveTodo, onToggleCompletion }) => {
  const { title, id, completed } = todo;

  return (
    <li
      className={
        completed ? styles.ListItemCompleted : styles.ListItemNotCompleted
      }
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={completed}
        onChange={() => onToggleCompletion(id)}
      />
      {title}
      <span>
        &nbsp;
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            onRemoveTodo(id);
          }}
        >
          <RemoveButton />
        </button>
      </span>
    </li>
  );
};

export default TodoListItem;
