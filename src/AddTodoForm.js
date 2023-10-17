import React from "react";

function AddTodoForm(props) {
  function handleAddTodo(event) {
    event.preventDefault();
    console.log(event.target);
    const todoTitle = event.target.title.value;
    console.log("value is", todoTitle);
    props.onAddTodo(todoTitle);
    event.target.reset();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input name="title" type="text" id="todoTitle" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
