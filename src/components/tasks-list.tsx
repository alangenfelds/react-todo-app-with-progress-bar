import { useCallback, useEffect, useState } from "react";

import TodoItem from "./todo-item/todo-item";
import AddTodo from "./add-todo";
import CustomSelect, { SelectOption } from "./ui/custom-select";

import "./tasks-list.scss";
import { useTodos } from "../context/TodosContext";
import { Todo } from "../types";
import Loader from "./ui/loader";
import { DATA_TEST_IDS } from "../constants";

const TasksList = () => {
  const [selectedOption, setSelectedOption] = useState<SelectOption>("All");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const { todos, isLoading, error } = useTodos();

  const filterTodos = useCallback(
    (selected: SelectOption) => {
      if (selected === "All") {
        setFilteredTodos(todos);
      } else if (selected === "Done") {
        const doneTodos = todos.filter((todo) => todo.completed);
        setFilteredTodos(doneTodos);
      } else if (selected === "Undone") {
        const undoneTodos = todos.filter((todo) => !todo.completed);
        setFilteredTodos(undoneTodos);
      }
    },
    [todos]
  );

  useEffect(() => {
    filterTodos(selectedOption);
  }, [selectedOption, todos, filterTodos]);

  const handleSelect = (selected: SelectOption) => {
    setSelectedOption(selected);
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-header">
        <div className="tasks-label" data-testid={DATA_TEST_IDS.TASKS_LABEL}>
          Tasks
        </div>
        {isLoading && <Loader />}
        {error && <div className="error">Error fetching data!</div>}
        <CustomSelect
          selectedOption={selectedOption}
          onSelectChange={handleSelect}
        />
      </div>
      <div className="tasks-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <AddTodo />
      </div>
    </div>
  );
};

export default TasksList;
