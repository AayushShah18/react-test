import { CATEGORIES } from "../constants";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function FilterBar({
  filter,
  onFilterChange,
  category,
  onCategoryChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
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
        <div className="select-group">
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort tasks">
            <option value="manual">My order</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority">By priority</option>
            <option value="due">By due date</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
