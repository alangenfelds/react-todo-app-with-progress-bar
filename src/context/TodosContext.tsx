import React, { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../types";
import { fetchTodos } from "../services/todosService";

interface TodosContextProps {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  refetchTodos: () => void;
}

const initialTodosContext: TodosContextProps = {
  todos: [],
  isLoading: false,
  error: null,
  refetchTodos: () => {},
};

const TodosContext = createContext<TodosContextProps>(initialTodosContext);

export const useTodos = () => useContext(TodosContext);

export const TodosProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodosContext.todos);
  const [isLoading, setLoading] = useState<boolean>(
    initialTodosContext.isLoading
  );
  const [error, setError] = useState<Error | null>(initialTodosContext.error);

  const fetchTodosData = async () => {
    setLoading(true);
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (err: any) {
      setError(err || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  const refetchTodos = async () => {
    fetchTodosData();
  };

  return (
    <TodosContext.Provider value={{ todos, isLoading, error, refetchTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
