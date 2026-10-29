function Stats({ total, completed, overdue, dueToday, onClearCompleted }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="card stats">
      <div className="stats-row">
        <span>
          <strong>{completed}</strong> of <strong>{total}</strong> tasks done
        </span>
        {completed > 0 && (
          <button className="link-btn" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </div>
      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      {(overdue > 0 || dueToday > 0) && (
        <div className="stats-chips">
          {overdue > 0 && <span className="chip chip-danger">⏰ {overdue} overdue</span>}
          {dueToday > 0 && <span className="chip chip-warning">📅 {dueToday} due today</span>}
        </div>
      )}
    </div>
  );
}

export default Stats;
