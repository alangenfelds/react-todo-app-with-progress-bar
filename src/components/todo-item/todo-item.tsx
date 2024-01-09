import { Todo } from "../../types";
import CustomCheckbox from "../ui/custom-checkbox";
import DotsMenu from "./dots";

import "./todo-item.scss";

type Props = { data: Todo };

const TodoItem = ({ data }: Props) => {
  const { id, title, completed } = data;
  return (
    <div className="todo-item">
      <div className="left-side">
        <CustomCheckbox todoId={id} completed={completed} />
        <div className={`${completed ? "completed" : ""}`}>{title}</div>
      </div>
      <DotsMenu />
    </div>
  );
};

export default TodoItem;
