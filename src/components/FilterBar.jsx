const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function FilterBar({ filter, onFilterChange, search, onSearchChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks"
      />
      <div className="filter-controls">
        <div className="tabs" role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={filter === f.value ? "tab active" : "tab"}
              onClick={() => onFilterChange(f.value)}
              aria-pressed={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort tasks">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="priority">By priority</option>
          <option value="due">By due date</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
