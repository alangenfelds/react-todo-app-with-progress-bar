import "./edit-todo.scss";
import { useState } from "react";

type Props = {
  title: string;
  onSave: (val: string) => void;
};

const EditTodo = ({ title, onSave }: Props) => {
  const [value, setValue] = useState(title);

  const handleSaveClicked = () => {
    if (value) {
      onSave(value);
    }
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const saveDisabled = value.length === 0;

  return (
    <div className="edit-todo-container">
      <input
        value={value}
        type="text"
        className="edit-todo-input"
        placeholder="Add your todo..."
        onChange={handleChange}
      />
      <button
        className={`save-button ${saveDisabled ? "disabled" : ""}`}
        onClick={handleSaveClicked}
        disabled={saveDisabled}
      >
        Save
      </button>
    </div>
  );
};

export default EditTodo;
