import AddTask from "../../components/AddTask/AddTask";
import TaskList from "../../components/TasksList/TasksList";
import TasksProvider from "../../context/TasksContext";

export default function TasksApp() {
  return (
    <>
      <TasksProvider>
        <h1>Tasks</h1>
        <AddTask />
        <TaskList />
      </TasksProvider>
    </>
  );
}
