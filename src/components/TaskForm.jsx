import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a task title.");
      return;
    }
    onAdd({ title: trimmed, priority, dueDate });
    setTitle("");
    setPriority("medium");
    setDueDate("");
    setError("");
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        aria-label="Task title"
        maxLength={120}
      />
      <div className="form-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority"
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Due date"
        />
        <button type="submit" className="btn-primary">
          Add task
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;
