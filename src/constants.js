export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export const CATEGORIES = [
  { value: "personal", label: "Personal", emoji: "🏠" },
  { value: "work", label: "Work", emoji: "💼" },
  { value: "study", label: "Study", emoji: "📚" },
  { value: "health", label: "Health", emoji: "💪" },
  { value: "shopping", label: "Shopping", emoji: "🛒" },
];

export const DEFAULT_CATEGORY = "personal";

export function getCategory(value) {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[0];
}
