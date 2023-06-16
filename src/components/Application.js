import { useEffect, useReducer, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import Table from "react-bootstrap/Table";

// const API_URL = "";

function taskReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    default: {
      throw Error("Action Not Found " + action.type);
    }
  }
}

let nextId = 200;
// const initialTasks = [
//   { id: 0, text: "Baca Mushaf", done: true },
//   { id: 1, text: "Baca Buku", done: false },
//   { id: 2, text: "Mandi", done: true },
// ];

const Application = () => {
  // fetch("https://api.npoint.io/3c26ff950ba8288fc00d").then((response) => {
  //   response.json();
  //   setDataapi(response);
  // });

  const API = async (datax) => {
    let response = await fetch("https://api.npoint.io/3c26ff950ba8288fc00d");
    let data = await response.json();
    setDataapi(data);
  };

  const [dataapi, setDataapi] = useState([API]);
  const [tasks, dispatch] = useReducer(taskReducer, dataapi);

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <div className="d-flex flex-column justify-content-center text-center">
      <h1 className="font-bold text-xl mt-5 mb-3">Jadwal Kegiatan Harian</h1>
      <AddTask onAddTask={handleAddTask} />
      <div className="d-flex justify-center flex-col px-5 mt-5">
        <Table striped bordered hover>
          <thead>
            <th className="border border-slate-600">
              <h6>Check</h6>
            </th>
            <th className="border border-slate-600">
              <h6>Kegiatan</h6>
            </th>
            <th className="border border-slate-600">
              <h6>Action</h6>
            </th>
          </thead>
          <tbody>
            <TaskList
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onChangeTask={handleChangeTask}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Application;
