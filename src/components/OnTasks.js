import { useEffect, useState, useContext } from "react";
import { projectFirestore, timestamp } from "../Firebase/config";
import TaskForm from "./TaskForm";
import OnTaskList from "./OnTaskList";
import { AuthContext } from "../contexts/AuthContext";
import useFirestoreRead from "../hooks/useFirestore";

const OnTasks = ({ setDoneTasks }) => {
  const { currentUser, roomId } = useContext(AuthContext);
  const { docs } = useFirestoreRead("tasks", currentUser.uid);
  const [tasks, setTasks] = useState([]);

  const [open, setOpen] = useState(false);

  const handleAddTask = (e, input) => {
    e.preventDefault();
    projectFirestore.collection("tasks").add({
      title: input,
      ownerId: currentUser.uid,
      room: roomId,
      status: false,
      createdAt: timestamp(),
      ownerName: currentUser.displayName,
    });
    e.target.reset();
    setOpen(false);
  };

  const handleComplete = (selectedTask) => {
    projectFirestore.collection("tasks").doc(selectedTask.id).update({
      status: !selectedTask.status,
    });
  };

  const handleDelete = (id) => {
    projectFirestore.collection("tasks").doc(id).delete();
  };

  useEffect(() => {
    var cnt = 0;
    docs.forEach((task) => {
      if (task.room === roomId && task.status) {
        cnt += 1;
      }
    });
    setDoneTasks(cnt);

    docs.forEach((task) => {
      if (task.room === roomId) {
        setTasks([...tasks, task]);
      }
    });
  }, [docs]);

  return (
    <>
      <h4>Your Tasks:</h4>
      <OnTaskList
        tasks={docs}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        roomId={roomId}
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

export default OnTasks;
