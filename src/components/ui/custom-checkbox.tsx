import { useTodos } from "../../context/TodosContext";
import { patchTodo } from "../../services/todosService";
import CheckIcon from "./checkIcon.svg";

import "./custom-checkbox.scss";

type Props = {
  todoId: number;
  completed: boolean;
};

const CustomCheckbox = ({ todoId, completed }: Props) => {
  const { refetchTodos } = useTodos();

  const handleClick = async () => {
    await patchTodo(todoId, { completed: !completed });
    refetchTodos();
  };
  return (
    <div
      className={` custom-checkbox ${completed ? "task-completed" : ""}`}
      onClick={handleClick}
    >
      {completed && <img src={CheckIcon} alt="check icon" />}
    </div>
  );
};

export default CustomCheckbox;
