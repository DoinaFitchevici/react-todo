import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      const todos = data.records.map((todo) => ({
        title: todo.fields.title,
        id: todo.id,
        completed: todo.fields.completed || false,
      }));

      const sortedTodoList = todos.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      );

      setTodoList(sortedTodoList);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (newTodo) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has occured: ${response.status}`);
      }

      const dataResponse = await response.json();

      setTodoList((prevTodoList) => [
        ...prevTodoList,
        {
          id: dataResponse.id,
          title: dataResponse.fields.title,
          completed: dataResponse.fields.completed || false,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (newTodo) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          completed: newTodo.completed,
        },
      }),
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${newTodo.id}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has occured: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log(dataResponse);
      // setTodoList((prevTodoList) => [
      //   ...prevTodoList,
      //   {
      //     id: dataResponse.id,
      //     title: dataResponse.fields.title,
      //     completed: dataResponse.fields.completed || false,
      //   },
      // ]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const toggleTodoCompletion = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const sortedTodoList = updatedTodoList.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );

    setTodoList(sortedTodoList);
    updateTodo(sortedTodoList.find((itemTodo) => itemTodo.id === id));
  };

  const reorderTodo = (newTodoList) => {
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading && <p>Loading...</p>}
      <TodoList
        todoList={todoList}
        onRemoveTodo={removeTodo}
        onToggleCompletion={toggleTodoCompletion}
        onReorderTodo={reorderTodo}
      />
    </>
  );
};
export default App;
