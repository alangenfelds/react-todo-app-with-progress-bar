import { Todo } from "../../types";
import DotsMenu from "./dots";

import "./todo-item.scss";

type Props = { data: Todo };

const TodoItem = ({ data }: Props) => {
  const { title, completed } = data;
  return (
    <div className="todo-item">
      <div className="flex gap-10">
        <div>check</div>
        <div className={`${completed ? "completed" : ""}`}>{title}</div>
      </div>
      <DotsMenu />
    </div>
  );
};

export default TodoItem;
