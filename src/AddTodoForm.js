import { useState } from "react";
import InputWithLabel from "./InputWithLabel.js";
import { ReactComponent as AddButton, RemoveButton } from "./icons.svg";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({
      title: todoTitle,
      //id: Date.now()
    });
    setTodoTitle("");
  };
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        name="title"
        type="text"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button type="submit">
        <AddButton />
      </button>
    </form>
  );
};

export default AddTodoForm;
