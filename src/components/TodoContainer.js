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
  const [currentSortField, setCurrentSortField] = useState("title");

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
      debugger;
      const url = `${baseUrl}${tableName}?view=Grid%20view`;
      const data = await fetchApi({ method: "GET", url });
      debugger;
      const todos = data.records.map((todo) => ({
        title: todo.fields.title,
        id: todo.id,
        completeDateTime: todo.fields.completeDateTime,
        createDateTime: todo.fields.createDateTime,
      }));

      updateSorts(todos, currentSortField);
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
          fields: {
            completeDateTime: newTodo.completeDateTime,
            title: newTodo.title,
          },
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
    let todo = todoList.find((itemTodo) => itemTodo.id === id);
    todo.completeDateTime = todo.completeDateTime
      ? null
      : new Date().toISOString();

    updateTodo(todo);
  };

  const updateNewTitle = (id, newTitle) => {
    let todo = todoList.find((itemTodo) => itemTodo.id === id);
    todo.title = newTitle;
    updateTodo(todo);
  };

  const reorderTodo = (newTodoList) => {
    setTodoList(newTodoList);
  };

  const updateSorts = (todos, sortBy) => {
    let sortedTodos = [];
    if (sortBy === "title") {
      sortedTodos = [...todos].sort((objectA, objectB) => {
        const titleA = objectA.title.toUpperCase();
        const titleB = objectB.title.toUpperCase();

        return titleA < titleB ? -1 : titleA === titleB ? 0 : 1;
      });
    } else if (sortBy === "completeDateTime") {
      sortedTodos = [...todoList].sort((objectA, objectB) => {
        const dateA = new Date(objectA.completeDateTime);
        const dateB = new Date(objectB.completeDateTime);

        if (isNaN(dateA)) return -1;
        if (isNaN(dateB)) return 1;

        return dateA - dateB;
      });
    }
    console.log(sortedTodos);
    setTodoList(sortedTodos);
  };
  return (
    <section style={{ position: "relative" }}>
      <span className="containerTop">
        <button>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            Back
          </Link>
        </button>
        &nbsp;
        <select
          className="right-select"
          onChange={(e) => {
            setCurrentSortField(e.target.value);
            updateSorts(todoList, e.target.value);
          }}
        >
          <option value="title">title</option>
          <option value="completeDateTime">completeDateTime</option>
        </select>
      </span>
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
