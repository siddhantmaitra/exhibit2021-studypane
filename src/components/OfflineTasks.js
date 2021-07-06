import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const OfflineTasks = ({ setDoneTasks, setTbd }) => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

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
    setDoneTasks(dcnt);
    setTbd(tcnt);
  }, [tasks]);

  return (
    <>
      <h6>Your Tasks:</h6>
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
      />
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add task
        </button>
      )}
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
    </>
  );
};

export default OfflineTasks;
