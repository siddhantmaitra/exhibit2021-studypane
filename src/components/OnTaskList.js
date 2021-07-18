import "../styles/css/tasks.css";
const OnTaskList = ({
  tasks,
  handleComplete,
  handleDelete,
  roomId,
  currentUser,
}) => {
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
          <div className="eachtask">
            <div className="writtentask">
              {task.title}
            </div>
            <div className="taskbttns">
              <button
                className="bttn"
                onClick={() => {
                  handleComplete(task);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </button>
              <button
                className="bttn"
                onClick={() => {
                  handleDelete(task.id);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </div>
        </li>
      ) : null;
    })}
  </ul>
  );
};

export default OnTaskList;
