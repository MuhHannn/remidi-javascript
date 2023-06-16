import { useState } from "react";
import Button from "react-bootstrap/Button";

const Task = ({ task, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;

  if (isEditing) {
    taskContent = (
      <div className="tasklist d-flex justify-content-between align-items-center">
        <input
          value={task.text}
          onChange={(e) => {
            onChange({ ...task, text: e.target.value });
          }}
        />
        <Button variant="primary" onClick={() => setIsEditing(false)}>
          Save
        </Button>
      </div>
    );
  } else {
    taskContent = (
      <div className="d-flex justify-content-between align-items-center">
        {task.text}
        <Button
          variant="warning"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
      </div>
    );
  }

  return (
    <>
      {" "}
      <td className="border-slate-500 d-flex align-items-center justify-content-center py-3">
        {" "}
        <td>
          <input
            type="checkbox"
            checked={task.done}
            onChange={(e) => {
              onChange({ ...task, done: e.target.checked });
            }}
          />
        </td>
      </td>
      <td className="border border-slate-500">{taskContent}</td>
      <td className="border border-slate-500">
        {" "}
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </td>
    </>
  );
};

export default Task;
