import { useTodos } from "../context/TodosContext";
import "./progress-bar.scss";

const ProgressBar = () => {
  const { todos } = useTodos();

  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  const calculateCompletionPercentage = (): number => {
    if (todos.length === 0) {
      return 0;
    }

    const percentage = (completedTodosCount / todos.length) * 100;
    return Math.round(percentage);
  };

  const completionPercentage = calculateCompletionPercentage();

  const getProgressBarStyle = (): React.CSSProperties => {
    return {
      width: `${completionPercentage}%`,
      height: "100%",
      backgroundColor: "#fff",
      borderRadius: "4px",
      transition: "width 0.5s ease-in-out",
    };
  };

  return (
    <div className="progress-bar-container">
      <div className="title">Progress</div>
      <div className="bar">
        <div style={getProgressBarStyle()} />
      </div>
      <div className="counter">{completedTodosCount} Completed</div>
    </div>
  );
};

export default ProgressBar;
