# Task Manager — React Mini Project

A small, fully working task manager built with **React 19** and **Vite**. It's a beginner-friendly project that covers the core React concepts in one app.

## Features

- ➕ Add tasks with a **priority** (low / medium / high) and an optional **due date**
- ✅ Mark tasks as done, ✏️ edit them (double-click or the pencil icon), 🗑️ delete them
- 🔍 Search tasks by title
- 🗂️ Filter by **All / Active / Completed**
- ↕️ Sort by newest, oldest, priority or due date
- ⏰ Overdue tasks are highlighted in red
- 📊 Progress bar showing how many tasks are done, plus "Clear completed"
- 🌙 Light / dark theme toggle
- 💾 Tasks and theme are saved in `localStorage`, so they survive a page reload
- 📱 Responsive layout that works on phones

## React concepts used

| Concept | Where |
| --- | --- |
| Components & props | `src/components/*` |
| `useState` | Form inputs, filter/search/sort, edit mode |
| `useEffect` | Applying the theme, saving to localStorage |
| `useMemo` | Filtering and sorting the visible tasks |
| Custom hook | `src/hooks/useLocalStorage.js` |
| Lifting state up | All task data lives in `App.jsx` and is passed down |
| Controlled forms | `TaskForm.jsx` |
| Lists & keys | `TaskList.jsx` |
| Conditional rendering | Empty states, edit mode, overdue labels |

## Project structure

```
src/
├── App.jsx                 # App state and task actions (add, toggle, edit, delete)
├── App.css                 # Component styles
├── index.css               # Theme colors (light/dark) and base styles
├── main.jsx                # Entry point
├── hooks/
│   └── useLocalStorage.js  # useState that persists to localStorage
└── components/
    ├── Header.jsx          # Title and theme toggle
    ├── TaskForm.jsx        # Form to add a new task
    ├── Stats.jsx           # Progress bar and "Clear completed"
    ├── FilterBar.jsx       # Search, filter tabs and sort
    ├── TaskList.jsx        # Renders the list or an empty message
    └── TaskItem.jsx        # A single task with edit/delete
```

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

Other scripts:

- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Ideas to extend it

- Add categories or tags
- Drag and drop to reorder tasks
- Add a backend (e.g. Firebase or a small Express API) to sync tasks across devices
- Write tests with Vitest and React Testing Library
