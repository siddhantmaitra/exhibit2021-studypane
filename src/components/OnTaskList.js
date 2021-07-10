const OnTaskList = ({ tasks, handleComplete, handleDelete, roomId }) => {
  return (
    <ul
      className="tasklist"
      style={{ listStyleType: "none", maxHeight: "70%", overflow: "auto" }}
    >
      {tasks.map((task) => {
        return roomId === task.room ? (
          <li
            key={task.id}
            style={{ textDecoration: task.status ? "line-through" : "none" }}
          >
            {task.title}
            <button
              onClick={() => {
                handleComplete(task);
              }}
            >
              done
            </button>
            <button
              onClick={() => {
                handleDelete(task.id);
              }}
            >
              Delete
            </button>
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default OnTaskList;
