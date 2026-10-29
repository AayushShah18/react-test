import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import Toast from "./components/Toast";
import DataActions from "./components/DataActions";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { PRIORITY_ORDER } from "./constants";
import { isDueToday, isOverdue } from "./utils/date";
import { moveTask, newId, normalizeTask } from "./utils/tasks";

const SAMPLE_TASKS = [
  { id: 1, title: "Learn React components and props", priority: "high", category: "study", dueDate: "", completed: true, createdAt: 1 },
  { id: 2, title: "Practice useState and useEffect", priority: "medium", category: "study", dueDate: "", completed: false, createdAt: 2 },
  { id: 3, title: "Build a mini project", priority: "low", category: "work", dueDate: "", completed: false, createdAt: 3 },
];

function App() {
  const [storedTasks, setTasks] = useLocalStorage("tasks", SAMPLE_TASKS);
  const [theme, setTheme] = useLocalStorage(
    "theme",
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useLocalStorage("sortBy", "manual");
  const [toast, setToast] = useState(null);

  // Tasks saved by an older version of the app may be missing newer fields (like category).
  const tasks = useMemo(() => storedTasks.map(normalizeTask).filter(Boolean), [storedTasks]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const dismissToast = useCallback(() => setToast(null), []);

  function addTask({ title, priority, category, dueDate }) {
    const newTask = { id: newId(), title, priority, category, dueDate, completed: false, createdAt: Date.now() };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function editTask(id, title) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  // Removes the matching tasks and offers an "Undo" that puts them back where they were.
  function removeTasks(shouldRemove, message) {
    const removed = [];
    tasks.forEach((task, index) => {
      if (shouldRemove(task)) removed.push({ task, index });
    });
    if (removed.length === 0) return;

    const removedIds = new Set(removed.map((r) => r.task.id));
    setTasks((prev) => prev.filter((t) => !removedIds.has(t.id)));
    setToast({ message, undo: removed });
  }

  function undoRemove() {
    const removed = toast?.undo;
    if (!removed) return;
    setTasks((prev) => {
      const next = [...prev];
      // Re-insert in original order so each saved index lines up again.
      for (const { task, index } of removed) {
        if (!next.some((t) => t.id === task.id)) next.splice(Math.min(index, next.length), 0, task);
      }
      return next;
    });
    setToast(null);
  }

  function deleteTask(id) {
    const task = tasks.find((t) => t.id === id);
    removeTasks((t) => t.id === id, `Deleted "${task?.title}"`);
  }

  function clearCompleted() {
    const count = tasks.filter((t) => t.completed).length;
    removeTasks((t) => t.completed, `Cleared ${count} completed task${count === 1 ? "" : "s"}`);
  }

  function handleMove(fromId, toId) {
    setTasks((prev) => moveTask(prev, fromId, toId));
  }

  function importTasks(data) {
    const list = Array.isArray(data) ? data.map(normalizeTask).filter(Boolean) : [];
    if (list.length === 0) {
      setToast({ message: "That file doesn't contain any valid tasks." });
      return;
    }
    // Skip tasks that are already in the list so importing the same file twice is harmless.
    const existingIds = new Set(tasks.map((t) => t.id));
    const fresh = list.filter((t) => !existingIds.has(t.id));
    setTasks((prev) => [...prev, ...fresh]);
    setToast({
      message: fresh.length
        ? `Imported ${fresh.length} task${fresh.length === 1 ? "" : "s"}`
        : "All tasks in that file are already in your list.",
    });
  }

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = tasks.filter((t) => {
      if (filter === "active" && t.completed) return false;
      if (filter === "completed" && !t.completed) return false;
      if (category !== "all" && t.category !== category) return false;
      return t.title.toLowerCase().includes(query);
    });

    if (sortBy === "manual") return filtered;
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return a.createdAt - b.createdAt;
        case "priority":
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case "due":
          // Tasks without a due date go to the bottom.
          if (!a.dueDate) return b.dueDate ? 1 : 0;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [tasks, filter, category, search, sortBy]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const overdueCount = tasks.filter(isOverdue).length;
  const dueTodayCount = tasks.filter(isDueToday).length;

  let emptyMessage = "No tasks yet — add one above!";
  if (tasks.length > 0) {
    emptyMessage = search ? `No tasks match "${search}".` : "Nothing here. 🎉";
  }

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        <TaskForm onAdd={addTask} />
        <Stats
          total={tasks.length}
          completed={completedCount}
          overdue={overdueCount}
          dueToday={dueTodayCount}
          onClearCompleted={clearCompleted}
        />
        <section className="card">
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            category={category}
            onCategoryChange={setCategory}
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <TaskList
            tasks={visibleTasks}
            emptyMessage={emptyMessage}
            canReorder={sortBy === "manual"}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
            onMove={handleMove}
          />
        </section>
        <DataActions tasks={tasks} onImport={importTasks} />
      </main>
      <footer className="footer">Tip: double-click a task to edit it. Your tasks are saved in this browser.</footer>
      {toast && (
        <Toast
          message={toast.message}
          actionLabel={toast.undo ? "Undo" : null}
          onAction={undoRemove}
          onDismiss={dismissToast}
        />
      )}
    </div>
  );
}

export default App;
