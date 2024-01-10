import { useState } from "react";
import { Todo } from "../../types";
import CustomCheckbox from "../ui/custom-checkbox";
import ItemMenu, { ItemAction } from "./item-menu";

import "./todo-item.scss";
import { deleteTodo, patchTodo } from "../../services/todosService";
import { useTodos } from "../../context/TodosContext";
import EditTodo from "../edit-todo";

type Props = { todo: Todo };

const TodoItem = ({ todo }: Props) => {
  const { refetchTodos } = useTodos();
  const [isEdit, setIsEdit] = useState(false);

  const { id, title, completed } = todo;

  const handleActionSelcted = async (value: ItemAction) => {
    if (value === "Edit") {
      setIsEdit(true);
    }

    if (value === "Delete") {
      await deleteTodo(todo.id);
      refetchTodos();
    }
  };

  const handleUpdateTodo = async (title: string) => {
    await patchTodo(id, { title });
    refetchTodos();
    setIsEdit(false);
  };

  if (isEdit) {
    return <EditTodo title={todo.title} onSave={handleUpdateTodo} />;
  }

  const handleToggle = async () => {
    await patchTodo(id, { completed: !completed });
    refetchTodos();
  };

  return (
    <div className="todo-item">
      <div className="left-side">
        <CustomCheckbox completed={completed} onToggle={handleToggle} />
        <div className={`todo-title ${completed ? "completed" : ""}`}>
          {title}
        </div>
      </div>
      <ItemMenu todo={todo} onActionSelect={handleActionSelcted} />
    </div>
  );
};

export default TodoItem;
