import "./App.scss";
import ProgressBar from "./components/progress-bar";
import TasksList from "./components/tasks-list";
import { TodosProvider } from "./context/TodosContext";

function App() {
  return (
    <div className="app">
      <TodosProvider>
        <div className="todos-container">
          <ProgressBar />
          <TasksList />
        </div>
      </TodosProvider>
    </div>
  );
}

export default App;
