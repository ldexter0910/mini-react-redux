import { useReducer } from "react";
import AddTask from "../../components/AddTask/AddTask";
import TaskList from "../../components/TasksList/TasksList";

let nextId = 3;

const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

function tasksReducer(state, action) {
  switch (action.type) {
    case "added": {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return [
        ...state.map((task) => {
          if (task.id === action.task.id) {
            return action.task;
          } else {
            return task;
          }
        }),
      ];
    }
    case "deleted": {
      return [...state.filter((task) => task.id !== action.id)];
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function TasksApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Tasks</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
