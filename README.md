# Task Manager — React Mini Project

A small, fully working task manager built with **React 19** and **Vite**. It's a beginner-friendly project that covers the core React concepts in one app.

## Features

- ➕ Add tasks with a **category** (Personal, Work, Study, Health, Shopping), a **priority** (low / medium / high) and an optional **due date**
- ✅ Mark tasks as done, ✏️ edit them (double-click or the pencil icon), 🗑️ delete them
- ↩️ **Undo** a delete or "Clear completed" from the pop-up message
- 🔍 Search tasks by title
- 🗂️ Filter by **All / Active / Completed** and by category
- ↕️ Sort by your own order, newest, oldest, priority or due date
- ✋ **Drag and drop** tasks to reorder them (in "My order" sort, with a mouse)
- ⏰ Overdue tasks are highlighted in red, with an "overdue" / "due today" summary
- 📊 Progress bar showing how many tasks are done, plus "Clear completed"
- ⬇️⬆️ **Export** your tasks to a JSON file and **import** them back (for example on another browser)
- 🌙 Light / dark theme toggle
- 💾 Tasks, theme and sort choice are saved in `localStorage`, so they survive a page reload
- 📱 Responsive layout that works on phones

## React concepts used

| Concept | Where |
| --- | --- |
| Components & props | `src/components/*` |
| `useState` | Form inputs, filter/search/sort, edit mode |
| `useEffect` | Applying the theme, saving to localStorage, auto-hiding the toast (with cleanup) |
| `useMemo` | Filtering and sorting the visible tasks |
| `useCallback` | Stable `onDismiss` handler for the toast timer |
| `useRef` | Opening the hidden file picker in `DataActions.jsx` |
| Custom hook | `src/hooks/useLocalStorage.js` |
| Immutable updates | Undo, drag-and-drop reordering in `utils/tasks.js` |
| Browser APIs | HTML5 drag and drop, `Blob` download, `FileReader` import |
| Lifting state up | All task data lives in `App.jsx` and is passed down |
| Controlled forms | `TaskForm.jsx` |
| Lists & keys | `TaskList.jsx` |
| Conditional rendering | Empty states, edit mode, overdue labels |

## Project structure

```
src/
├── App.jsx                 # App state and task actions (add, toggle, edit, delete, undo, import)
├── App.css                 # Component styles
├── index.css               # Theme colors (light/dark) and base styles
├── main.jsx                # Entry point
├── constants.js            # Categories and priority order
├── hooks/
│   └── useLocalStorage.js  # useState that persists to localStorage
├── utils/
│   ├── date.js             # Today / overdue helpers
│   └── tasks.js            # Task validation and reordering helpers
└── components/
    ├── Header.jsx          # Title and theme toggle
    ├── TaskForm.jsx        # Form to add a new task
    ├── Stats.jsx           # Progress bar, overdue / due-today summary, "Clear completed"
    ├── FilterBar.jsx       # Search, status tabs, category filter and sort
    ├── TaskList.jsx        # Renders the list (with drag and drop) or an empty message
    ├── TaskItem.jsx        # A single task with edit/delete
    ├── Toast.jsx           # Pop-up message with an Undo button
    └── DataActions.jsx     # Export / import buttons
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

- Subtasks or notes on each task
- Touch-friendly drag and drop (e.g. with `@dnd-kit`)
- Add a backend (e.g. Firebase or a small Express API) to sync tasks across devices
- Write tests with Vitest and React Testing Library
