const TodoListItem = ({ todo, onRemoveTodo }) => {
  const { title, id } = todo;
  return (
    <li>
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
