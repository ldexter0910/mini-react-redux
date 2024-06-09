import { useState } from "react";
import { useTasks, useTasksDispatch } from "../../context/TasksContext";

export default function AddTask() {
  const [text, setText] = useState("");

  const dispatch = useTasksDispatch();
  const tasks = useTasks();

  const onAddTask = (text) => {
    dispatch({
      type: "added",
      id: tasks.length,
      text,
    });
  };

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
}
