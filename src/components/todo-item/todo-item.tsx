import { useState } from "react";
import { Todo } from "../../types";
import CustomCheckbox from "../ui/custom-checkbox";
import ItemMenu from "./item-menu";

import "./todo-item.scss";

type Props = { todo: Todo };

const TodoItem = ({ todo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const { id, title, completed } = todo;

  return (
    <div className="todo-item">
      <div className="left-side">
        <CustomCheckbox todoId={id} completed={completed} />
        <div className={`${completed ? "completed" : ""}`}>{title}</div>
      </div>
      <ItemMenu todo={todo} />
    </div>
  );
};

export default TodoItem;
