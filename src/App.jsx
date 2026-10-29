import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import { useLocalStorage } from "./hooks/useLocalStorage";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

const SAMPLE_TASKS = [
  { id: 1, title: "Learn React components and props", priority: "high", dueDate: "", completed: true, createdAt: 1 },
  { id: 2, title: "Practice useState and useEffect", priority: "medium", dueDate: "", completed: false, createdAt: 2 },
  { id: 3, title: "Build a mini project", priority: "low", dueDate: "", completed: false, createdAt: 3 },
];

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", SAMPLE_TASKS);
  const [theme, setTheme] = useLocalStorage(
    "theme",
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function addTask({ title, priority, dueDate }) {
    const newTask = {
      id: crypto.randomUUID?.() ?? Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, title) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = tasks.filter((t) => {
      if (filter === "active" && t.completed) return false;
      if (filter === "completed" && !t.completed) return false;
      return t.title.toLowerCase().includes(query);
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return a.createdAt - b.createdAt;
        case "priority":
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case "due":
          // Tasks without a due date go to the bottom.
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [tasks, filter, search, sortBy]);

  const completedCount = tasks.filter((t) => t.completed).length;

  let emptyMessage = "No tasks yet — add one above!";
  if (tasks.length > 0) {
    emptyMessage = search ? `No tasks match "${search}".` : "Nothing here. 🎉";
  }

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        <TaskForm onAdd={addTask} />
        <Stats total={tasks.length} completed={completedCount} onClearCompleted={clearCompleted} />
        <section className="card">
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <TaskList
            tasks={visibleTasks}
            emptyMessage={emptyMessage}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </section>
      </main>
      <footer className="footer">Tip: double-click a task to edit it. Your tasks are saved in this browser.</footer>
    </div>
  );
}

export default App;
