import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export const useTasks = () => {
  return useContext(TasksContext);
};

export const useTasksDispatch = () => {
  return useContext(TasksDispatchContext);
};

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

export default function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          {children}
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  );
}
