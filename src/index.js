// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoCounterProvider } from "./context/TodoCounterContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <TodoCounterProvider>
    <App />
  </TodoCounterProvider>
);
