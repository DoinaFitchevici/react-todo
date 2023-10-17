import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: 0,
    title: "Read Road to React book",
  },
  {
    id: 1,
    title: "Complete first project assignment",
  },
  {
    id: 2,
    title: "Start working on second project",
  },
  {
    id: 3,
    title: "Practice coding",
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todo={todoItem} />
      ))}
    </ul>
  );
}

export default TodoList;
