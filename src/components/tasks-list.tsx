import { TTodoItem } from "../types";
import TodoItem from "./todo-item";
import "./tasks-list.scss";
import AddTodo from "./add-todo";
import Select, { SelectOption } from "./select";
import { useState } from "react";

const TODOS: TTodoItem[] = [
  {
    id: 1,
    title: "Publish a new blog",
    completed: true,
  },
  {
    id: 2,
    title: "Buy food for dinner",
    completed: false,
  },
  {
    id: 3,
    title: "Call Marie at 10.00 PM",
    completed: false,
  },
  {
    id: 4,
    title: "Write a react blog post",
    completed: false,
  },
];

type Props = {};

const TasksList = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption>("All");

  const handleSelect = (selected: SelectOption) => {
    setSelectedOption(selected);
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-header">
        <div className="tasks-label">Tasks</div>
        <Select selectedOption={selectedOption} onSelectChange={handleSelect} />
      </div>
      <div className="tasks-list">
        {TODOS.map((todo) => (
          <TodoItem key={todo.id} data={todo} />
        ))}
        <AddTodo />
      </div>
    </div>
  );
};

export default TasksList;
