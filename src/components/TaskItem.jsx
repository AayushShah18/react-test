import { useState } from "react";
import { getCategory } from "../constants";
import { isOverdue, todayString } from "../utils/date";

function formatDue(task) {
  if (!task.dueDate) return null;
  const label = new Date(task.dueDate + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  if (isOverdue(task)) return { label: `Overdue · ${label}`, overdue: true };
  if (task.dueDate === todayString()) return { label: "Due today", overdue: false };
  return { label: `Due ${label}`, overdue: false };
}

function TaskItem({ task, onToggle, onDelete, onEdit, draggable, isDragging, isDropTarget, dragHandlers }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const due = formatDue(task);
  const category = getCategory(task.category);

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

  const classes = [
    "task-item",
    `priority-${task.priority}`,
    task.completed && "done",
    isDragging && "dragging",
    isDropTarget && "drop-target",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes} draggable={draggable && !isEditing} {...(draggable ? dragHandlers : {})}>
      {draggable && (
        <span className="drag-handle" aria-hidden="true" title="Drag to reorder">
          ⋮⋮
        </span>
      )}
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
          <span className="badge badge-category">
            {category.emoji} {category.label}
          </span>
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
          {due && <span className={due.overdue ? "due overdue" : "due"}>{due.label}</span>}
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
