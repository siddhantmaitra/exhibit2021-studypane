import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { v4 as uuid } from "uuid";

const OfflineTasks = ({ setDoneTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleComplete = (selectedTask) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === selectedTask.id) {
          return {
            ...task,
            status: !task.status,
          };
        }
        return task;
      })
    );
  };

  const handleAddTask = (e, input) => {
    e.preventDefault();
    setTasks([...tasks, { id: uuid(), title: input, status: false }]);
    e.target.reset();
    setOpen(false);
  };

  useEffect(() => {
    var cnt = 0;
    tasks.forEach((task) => {
      if (task.status) {
        cnt++;
      }
    });
    setDoneTasks(cnt);
  }, [tasks]);

  return (
    <>
      <h4>Your Tasks:</h4>
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
        <TaskForm handleAddTask={handleAddTask} />
      </div>
    </>
  );
};

export default OfflineTasks;
