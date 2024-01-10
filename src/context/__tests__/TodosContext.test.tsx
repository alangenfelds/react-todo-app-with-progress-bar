import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TodosProvider, useTodos } from "../TodosContext";
import { Todo } from "../../types";

describe("TodosContext", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      title: "Write a react blog post",
      completed: false,
    },
  ];

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch todos and render them", async () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: () => Promise.resolve(mockTodos),
            });
          }, 1000);
        })
    ) as unknown as jest.MockedFunction<typeof global.fetch>;

    render(
      <TodosProvider>
        <TodosConsumerComponent />
      </TodosProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Write a react blog post")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should show error message if fetch failed", async () => {
    const mockError = new Error("Failed to fetch todos");

    global.fetch = jest.fn(() =>
      Promise.reject(mockError)
    ) as unknown as jest.MockedFunction<typeof global.fetch>;

    render(
      <TodosProvider>
        <TodosConsumerComponent />
      </TodosProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch todos")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});

const TodosConsumerComponent: React.FC = () => {
  const { todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch todos</div>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
