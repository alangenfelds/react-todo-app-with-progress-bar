import { useTodos } from "../context/TodosContext";
import { postTodo } from "../services/todosService";
import "./add-todo.scss";
import { useRef } from "react";

const AddTodo = () => {
  const { refetchTodos } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnterClicked = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputRef.current && inputRef.current.value) {
      await postTodo(inputRef.current.value);
      inputRef.current.value = "";
      refetchTodos();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className="add-todo-input"
      placeholder="Add your todo..."
      onKeyDown={handleEnterClicked}
    />
  );
};

export default AddTodo;
