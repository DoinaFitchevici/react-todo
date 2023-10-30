import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log("value is", todoTitle);
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        name="title"
        type="text"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
