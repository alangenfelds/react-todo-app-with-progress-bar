import { render, screen } from "@testing-library/react";
import App from "./App";
import { DATA_TEST_IDS } from "./constants";

describe("Application", () => {
  test("initially renders all necessary components", () => {
    render(<App />);

    const progressBar = screen.getByTestId(DATA_TEST_IDS.PROGRESS_BAR);
    const tasksLabel = screen.getByTestId(DATA_TEST_IDS.TASKS_LABEL);
    const tasksSelector = screen.getByTestId(DATA_TEST_IDS.TASKS_SELECTOR);
    const addTodoInput = screen.getByTestId(DATA_TEST_IDS.ADD_TODO_INPUT);

    expect(progressBar).toBeInTheDocument();
    expect(tasksLabel).toBeInTheDocument();
    expect(tasksSelector).toBeInTheDocument();
    expect(tasksSelector.textContent).toContain("All");
    expect(addTodoInput).toBeInTheDocument();
  });
});
