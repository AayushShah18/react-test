import { useState } from "react";

function formatDue(dueDate) {
  if (!dueDate) return null;
  const now = new Date();
  // Local YYYY-MM-DD (toISOString would use UTC and can be off by a day).
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const label = new Date(dueDate + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  if (dueDate < today) return { label: `Overdue · ${label}`, overdue: true };
  if (dueDate === today) return { label: "Due today", overdue: false };
  return { label: `Due ${label}`, overdue: false };
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const due = formatDue(task.dueDate);

  function saveEdit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== task.title) onEdit(task.id, trimmed);
    else setDraft(task.title);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") {
      setDraft(task.title);
      setIsEditing(false);
    }
  }

  return (
    <li className={`task-item priority-${task.priority} ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
      />
      <div className="task-body">
        {isEditing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={120}
            aria-label="Edit task title"
          />
        ) : (
          <span className="task-title" onDoubleClick={() => setIsEditing(true)}>
            {task.title}
          </span>
        )}
        <div className="task-meta">
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
          {due && <span className={due.overdue && !task.completed ? "due overdue" : "due"}>{due.label}</span>}
        </div>
      </div>
      <div className="task-actions">
        {!isEditing && (
          <button className="icon-btn" onClick={() => setIsEditing(true)} aria-label="Edit task" title="Edit">
            ✏️
          </button>
        )}
        <button className="icon-btn" onClick={() => onDelete(task.id)} aria-label="Delete task" title="Delete">
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
