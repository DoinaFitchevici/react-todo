import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo, onToggleCompletion }) => {
  const { title, id, completed } = todo;

  return (
    <li
      className={
        completed ? styles.ListItemCompleted : styles.ListItemNotCompleted
      }
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleCompletion(id)}
      />
      {title}
      <span>
        &nbsp;
        <button
          type="button"
          onClick={() => {
            onRemoveTodo(id);
          }}
        >
          Remove
        </button>
      </span>
    </li>
  );
};

export default TodoListItem;
