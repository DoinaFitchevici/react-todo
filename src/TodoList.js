import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todo={todoItem} />
      ))}
    </ul>
  );
};

export default TodoList;
