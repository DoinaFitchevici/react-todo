const TodoListItem = ({ todo, onRemoveTodo, onToggleCompletion }) => {
  const { title, id, completed } = todo;

  return (
    <li style={{ textDecoration: completed ? "line-through" : "none" }}>
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
