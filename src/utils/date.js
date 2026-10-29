// Today's date as local YYYY-MM-DD (toISOString would use UTC and can be off by a day).
export function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function isOverdue(task) {
  return Boolean(task.dueDate) && !task.completed && task.dueDate < todayString();
}

export function isDueToday(task) {
  return !task.completed && task.dueDate === todayString();
}
