import { createContext, useState } from "react";

const TodoCounterContext = createContext();

const TodoCounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <TodoCounterContext.Provider value={{ count, setCount }}>
      {children}
    </TodoCounterContext.Provider>
  );
};

export { TodoCounterProvider, TodoCounterContext };
