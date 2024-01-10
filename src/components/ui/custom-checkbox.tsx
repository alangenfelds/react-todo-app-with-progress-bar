import CheckIcon from "./checkIcon.svg";

import "./custom-checkbox.scss";

type Props = {
  completed: boolean;
  onToggle: () => void;
};

const CustomCheckbox = ({ completed, onToggle }: Props) => {
  return (
    <div
      className={` custom-checkbox ${completed ? "task-completed" : ""}`}
      onClick={onToggle}
    >
      {completed && <img src={CheckIcon} alt="check icon" />}
    </div>
  );
};

export default CustomCheckbox;
