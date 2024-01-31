import { useState } from "react";
import TodoListItem from "./TodoListItem";
import style from "./AddTodoForm.module.css";
import PropTypes from "prop-types";

const TodoList = ({
  todoList,
  onRemoveTodo,
  onToggleCompletion,
  onReorderTodo,
  onUpdateNewTitle,
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
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todoList.map((todoItem) => (
        <li
          className={`${style.ListItem} ${style.draggableItem}`}
          key={todoItem.id}
          draggable
          onDragStart={(event) => {
            handleDragStart(event, todoItem.id);
            event.currentTarget.classList.add(style.dragging);
          }}
          onDragEnd={(event) => {
            event.currentTarget.classList.remove(style.dragging);
          }}
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, todoItem.id)}
        >
          <TodoListItem
            todo={todoItem}
            onRemoveTodo={onRemoveTodo}
            onToggleCompletion={onToggleCompletion}
            onUpdateNewTitle={onUpdateNewTitle}
          />
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      completed: PropTypes.bool,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onReorderTodo: PropTypes.func.isRequired,
  onUpdateNewTitle: PropTypes.func.isRequired,
};

export default TodoList;
