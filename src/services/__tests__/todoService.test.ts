import {
  fetchTodos,
  postTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  baseURL,
} from "../todosService";
import { Todo } from "../../types";

describe("API functions", () => {
  const mockTodo: Todo = {
    id: 1,
    title: "Write a react blog post",
    completed: false,
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodo),
      })
    ) as unknown as jest.MockedFunction<typeof global.fetch>;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches todos", async () => {
    const mockFetchResponse = {
      ok: true,
      json: () => Promise.resolve([mockTodo]),
    };

    const fetchSpy = jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(
        Promise.resolve(mockFetchResponse as unknown as Response)
      );

    const todos = await fetchTodos();
    expect(todos).toEqual([mockTodo]);

    fetchSpy.mockRestore();
  });

  it("posts a new todo", async () => {
    const newTodo = await postTodo("New Todo");
    expect(newTodo).toEqual(mockTodo);
  });

  it("updates a todo", async () => {
    const updatedTodo = await updateTodo(1, mockTodo);
    expect(updatedTodo).toEqual(mockTodo);
  });

  it("patches a todo", async () => {
    const patchedTodo = await patchTodo(1, { title: "Patched Todo" });
    expect(patchedTodo).toEqual(mockTodo);
  });

  it("deletes a todo", async () => {
    await deleteTodo(1);
    expect(global.fetch).toHaveBeenCalledWith(`${baseURL}/todos/1`, {
      method: "DELETE",
    });
  });

  // Additional test cases can be added for error scenarios, edge cases, etc.
});
