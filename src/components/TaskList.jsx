import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, emptyMessage, canReorder, onToggle, onDelete, onEdit, onMove }) {
  const [draggedId, setDraggedId] = useState(null);
  const [overId, setOverId] = useState(null);

  if (tasks.length === 0) {
    return <p className="empty">{emptyMessage}</p>;
  }

  function endDrag() {
    setDraggedId(null);
    setOverId(null);
  }

  function handlersFor(id) {
    return {
      onDragStart: (e) => {
        e.dataTransfer.effectAllowed = "move";
        setDraggedId(id);
      },
      onDragOver: (e) => {
        if (draggedId === null) return;
        e.preventDefault(); // Allows dropping here.
        if (overId !== id) setOverId(id);
      },
      onDrop: (e) => {
        e.preventDefault();
        if (draggedId !== null) onMove(draggedId, id);
        endDrag();
      },
      onDragEnd: endDrag,
    };
  }

  return (
    <>
      {canReorder && tasks.length > 1 && <p className="hint">Drag tasks by the ⋮⋮ handle to reorder them.</p>}
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            draggable={canReorder}
            isDragging={draggedId === task.id}
            isDropTarget={overId === task.id && draggedId !== task.id}
            dragHandlers={handlersFor(task.id)}
          />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
