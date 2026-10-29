import { useState } from "react";
import { CATEGORIES, DEFAULT_CATEGORY } from "../constants";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a task title.");
      return;
    }
    onAdd({ title: trimmed, priority, category, dueDate });
    // Keep the chosen category so adding several tasks of one kind is quick.
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
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
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
