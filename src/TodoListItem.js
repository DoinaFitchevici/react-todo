const TodoListItem = ({ todo, onRemoveTodo }) => {
  const { title } = todo;

  return (
    <>
      <li>
        <span>{title}</span>
        <span>
          <button type="button" onClick={() => onRemoveTodo(todo.id)}>
            Remove
          </button>
        </span>
      </li>
    </>
  );
};

export default TodoListItem;
