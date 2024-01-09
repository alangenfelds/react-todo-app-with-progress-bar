import { useState } from "react";

import TodoItem from "./todo-item/todo-item";
import AddTodo from "./add-todo";
import CustomSelect, { SelectOption } from "./ui/custom-select";

import "./tasks-list.scss";
import { useTodos } from "../context/TodosContext";

const TasksList = () => {
  const [selectedOption, setSelectedOption] = useState<SelectOption>("All");

  const { todos, isLoading, error } = useTodos();

  const handleSelect = (selected: SelectOption) => {
    setSelectedOption(selected);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-header">
        <div className="tasks-label">Tasks</div>
        <CustomSelect
          selectedOption={selectedOption}
          onSelectChange={handleSelect}
        />
      </div>
      <div className="tasks-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} data={todo} />
        ))}
        <AddTodo />
      </div>
    </div>
  );
};

export default TasksList;
