import { useState, useEffect, useContext } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { TodoCounterContext } from "../context/TodoCounterContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const sortByLastModifiedTime =
  "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";
//"?sort%5B0%5D%5Bfield%5D=lastModifiedTime&sort%5B0%5D%5Bdirection%5D=asc";
const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`;

const TodoContainer = ({ tableName }) => {
  console.log(tableName);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { count, setCount } = useContext(TodoCounterContext);

  const fetchApi = async ({ method, url, headers, body }) => {
    try {
      setIsLoading(true);
      const options = {
        method: method,
        headers: {
          ...headers,
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      const url = `${baseUrl}${tableName}${sortByLastModifiedTime}&view=Grid%20view`;
      const data = await fetchApi({ method: "GET", url });
      const todos = data.records.map((todo) => ({
        title: todo.fields.title,
        id: todo.id,
        completed: todo.fields.completed || false,
      }));

      setTodoList(todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [tableName]);

  useEffect(() => {
    setCount(todoList.length);
  }, [todoList]);

  const addTodo = async (newTodo) => {
    try {
      const url = `${baseUrl}${tableName}`;
      const data = await fetchApi({
        method: "POST",
        url,
        headers: { "Content-Type": "application/json" },
        body: { fields: { title: newTodo.title } },
      });

      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (newTodo) => {
    try {
      const url = `${baseUrl}${tableName}/${newTodo.id}`;
      const data = await fetchApi({
        method: "PATCH",
        url,
        headers: { "Content-Type": "application/json" },
        body: {
          fields: { completed: newTodo.completed, title: newTodo.title },
        },
      });
      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const url = `${baseUrl}${tableName}/${id}`;
      const data = await fetchApi({
        method: "DELETE",
        url,
        headers: { "Content-Type": "application/json" },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = (id) => {
    deleteTodo(id);
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

  const updateNewTitle = (id, newTitle) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodoList(updatedTodoList);
    updateTodo(updatedTodoList.find((itemTodo) => itemTodo.id === id));
  };

  const reorderTodo = (newTodoList) => {
    setTodoList(newTodoList);
  };

  return (
    <section style={{ position: "relative" }}>
      <button>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          Back
        </Link>
      </button>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Todo List
      </h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading && <p>Loading...</p>}
      <>
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 100,
            fontVariant: "small-caps",
          }}
        >
          Item Counts: {count}
        </span>
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onToggleCompletion={toggleTodoCompletion}
          onReorderTodo={reorderTodo}
          onUpdateNewTitle={updateNewTitle}
        />
      </>
    </section>
  );
};
export default TodoContainer;