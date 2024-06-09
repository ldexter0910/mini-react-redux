import { useState } from "react";
import { useTasksDispatch } from "../../context/TasksContext";

export default function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useTasksDispatch();

  const onChange = (task) => {
    dispatch({
      type: "changed",
      task,
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "deleted",
      id,
    });
  };

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
