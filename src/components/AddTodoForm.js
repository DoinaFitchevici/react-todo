import { useState } from "react";
import InputWithLabel from "./InputWithLabel.js";
import style from "./AddTodoForm.module.css";
import { ReactComponent as AddButton } from "./icons/AddIcon.svg";
import PropTypes from "prop-types";

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
        placeholder="Type todo"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button className={style.button} type="submit">
        <div className={style.buttonIcon}>
          <AddButton className={style.AddIcon} />
        </div>
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
