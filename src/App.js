import { useState, useEffect, useContext } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoCounterContext } from "./context/TodoCounterContext";
import PropTypes from "prop-types";
import LandingPage from "./LandingPage";
import { Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

const TableChooser = () => {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  return (
    <div>
      <select
        id="selectField"
        value={tableName}
        onChange={(event) => setTableName(event.target.value)}
      >
        <option value={process.env.REACT_APP_TABLE_NAME}>Todo List</option>
        <option value="List2">List 2</option>
      </select>
      <TodoContainer tableName={tableName} />
    </div>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/TodoList" element={<TableChooser />} />
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
