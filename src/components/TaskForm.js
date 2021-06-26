import { useState } from "react";
import { v4 as uuid } from "uuid";

const TaskForm = ({ tasks, setTasks, setOpen }) => {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { id: uuid(), title: input, status: false }]);
    setInput("");
    e.target.reset();
    setOpen(false);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label>Task name:</label>
      <input
        type="text"
        required
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add the task</button>
    </form>
  );
};

export default TaskForm;
