import { useState } from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({
  todoList,
  onRemoveTodo,
  onToggleCompletion,
  onReorderTodo,
}) => {
  const [draggedTodoId, setDraggedTodoId] = useState(null);

  const handleDragStart = (event, id) => {
    setDraggedTodoId(id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetId) => {
    event.preventDefault();

    if (draggedTodoId === targetId) {
      return;
    }

    const updatedTodoList = [...todoList];
    const draggedIndex = updatedTodoList.findIndex(
      (todo) => todo.id === draggedTodoId
    );
    const targetIndex = updatedTodoList.findIndex(
      (todo) => todo.id === targetId
    );

    const draggedItem = updatedTodoList[draggedIndex];
    updatedTodoList.splice(draggedIndex, 1);
    updatedTodoList.splice(targetIndex, 0, draggedItem);

    onReorderTodo(updatedTodoList);
    setDraggedTodoId(null);
  };

  return (
    <ul>
      {todoList.map((todoItem) => (
        <div
          key={todoItem.id}
          draggable
          onDragStart={(event) => handleDragStart(event, todoItem.id)}
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, todoItem.id)}
        >
          <TodoListItem
            todo={todoItem}
            onRemoveTodo={onRemoveTodo}
            onToggleCompletion={onToggleCompletion}
          />
        </div>
      ))}
    </ul>
  );
};

export default TodoList;
