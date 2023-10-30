import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  return (
    <ul>
      {props.todoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todo={todoItem} />
      ))}
    </ul>
  );
}

export default TodoList;
