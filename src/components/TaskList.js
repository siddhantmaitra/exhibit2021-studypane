const TaskList = ({ tasks, handleComplete }) => {
  return (
    <ul className="tasklist">
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{ textDecoration: task.status ? "line-through" : "none" }}
        >
          <button
            onClick={() => {
              handleComplete(task.id);
            }}
          >
            done
          </button>
          {task.title}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
