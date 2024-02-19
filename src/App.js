import { useState, useEffect, useContext } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { TodoCounterContext } from "./context/TodoCounterContext";
import PropTypes from "prop-types";
import LandingPage from "./LandingPage";
import { Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

const TableChooser = () => {
  const { tableName } = useParams();
  const headerTitle =
    tableName === "Shopping List" ? "Shopping List" : "Todo List";
  return (
    <div>
      <a href="/Todo List">
        <button>Todo List</button>
      </a>
      <a href="/Shopping List">
        <button>Shopping List</button>
      </a>
      <TodoContainer tableName={tableName} headerTitle={headerTitle} />
    </div>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:tableName" element={<TableChooser />} />
        <Route
          path="/NewTodoList"
          element={
            <>
              <button>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  Back
                </Link>
              </button>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
