import { useState } from "react";
import Button from "react-bootstrap/Button";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");

  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      <input
        className="col-8 w-75 px-2 py-1"
        value={text}
        placeholder="Tambahkan Kegiatan Anda"
        onChange={(e) => setText(e.target.value)}
      ></input>
      <Button
        variant="primary"
        onClick={() => {
          setText("");
          onAddTask(text);
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default AddTask;
