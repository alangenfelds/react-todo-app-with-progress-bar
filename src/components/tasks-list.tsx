import { useEffect, useState } from "react";

import { Todo } from "../types";
import TodoItem from "./todo-item";
import AddTodo from "./add-todo";
import Select, { SelectOption } from "./select";
import "./tasks-list.scss";
import { fetchTodos } from "../services/todosService";

type Props = {};

const TasksList = (props: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);
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
        {todos.map((todo) => (
          <TodoItem key={todo.id} data={todo} />
        ))}
        <AddTodo />
      </div>
    </div>
  );
};

export default TasksList;
