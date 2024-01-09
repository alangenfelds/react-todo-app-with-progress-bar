import "./App.scss";
import ProgressBar from "./components/progress-bar";
import TasksList from "./components/tasks-list";

function App() {
  return (
    <div className="app">
      <div className="todos-container">
        <ProgressBar />
        <TasksList />
      </div>
    </div>
  );
}

export default App;
