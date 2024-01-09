import { TTodoItem } from "../types";

import "./todo-item.scss";

type Props = { data: TTodoItem };

const TodoItem = ({ data }: Props) => {
  const { title } = data;
  return <div className="todo-item">{title}</div>;
};

export default TodoItem;
