import { CATEGORIES, DEFAULT_CATEGORY, PRIORITY_ORDER } from "../constants";

export function newId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Fills in fields that older saved tasks or imported files may be missing.
// Returns null for anything that isn't a usable task.
export function normalizeTask(raw) {
  if (!raw || typeof raw !== "object") return null;
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (!title) return null;

  return {
    id: raw.id ?? newId(),
    title: title.slice(0, 120),
    priority: raw.priority in PRIORITY_ORDER ? raw.priority : "medium",
    category: CATEGORIES.some((c) => c.value === raw.category) ? raw.category : DEFAULT_CATEGORY,
    dueDate: typeof raw.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate) ? raw.dueDate : "",
    completed: Boolean(raw.completed),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

// Moves the task with id `fromId` to the position currently held by `toId`.
export function moveTask(tasks, fromId, toId) {
  const from = tasks.findIndex((t) => t.id === fromId);
  const to = tasks.findIndex((t) => t.id === toId);
  if (from === -1 || to === -1 || from === to) return tasks;

  const next = [...tasks];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}
