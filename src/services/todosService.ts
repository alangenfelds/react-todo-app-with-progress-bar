import { Todo } from "../types";

const baseURL = "http://localhost:3001";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${baseURL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const todos: Todo[] = await response.json();
  return todos;
};

export const fetchTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${baseURL}/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch todo with ID: ${id}`);
  }
  const todo: Todo = await response.json();
  return todo;
};

export const postTodo = async (todoText: string): Promise<Todo> => {
  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    title: todoText,
  };
  const response = await fetch(`${baseURL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  const updated: Todo = await response.json();
  return updated;
};

export const updateTodo = async (
  id: number,
  updatedTodo: Todo
): Promise<Todo> => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) {
    throw new Error(`Failed to update todo with ID: ${id}`);
  }
  const updated: Todo = await response.json();
  return updated;
};

export const patchTodo = async (
  id: number,
  updatedData: Partial<Todo>
): Promise<Todo> => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error(`Failed to patch todo with ID: ${id}`);
  }
  const patched: Todo = await response.json();
  return patched;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete todo with ID: ${id}`);
  }
};
