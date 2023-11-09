const TodoListItem = ({ todo }) => {
  const { title } = todo;
  return <li>{title}</li>;
};

export default TodoListItem;
