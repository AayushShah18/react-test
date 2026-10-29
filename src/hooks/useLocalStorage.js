import { useEffect, useState } from "react";

// Works like useState, but keeps the value in localStorage so it survives a page reload.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private mode, quota full); the app still works in memory.
    }
  }, [key, value]);

  return [value, setValue];
}
