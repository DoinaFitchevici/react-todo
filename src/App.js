import React from "react";

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

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todoItem) => (
          <li key={todoItem.id}>{todoItem.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
