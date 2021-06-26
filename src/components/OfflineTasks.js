import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const OfflineTasks = ({ setDone, setTbd }) => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: !task.status,
          };
        }
        return task;
      })
    );
  };

  useEffect(() => {
    var dcnt = 0;
    var tcnt = 0;
    tasks.forEach((task) => {
      if (task.status) {
        dcnt++;
      } else {
        tcnt++;
      }
    });
    setDone(dcnt);
    setTbd(tcnt);
  }, [tasks]);

  return (
    <>
      <h6>Your Tasks:</h6>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Add task
      </button>
      <div className="modal" style={{ display: open ? "block" : "none" }}>
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </button>
        <TaskForm tasks={tasks} setTasks={setTasks} setOpen={setOpen} />
      </div>
      <TaskList tasks={tasks} handleComplete={handleComplete} />
    </>
  );
};

export default OfflineTasks;
