import { useRef } from "react";

function DataActions({ tasks, onImport }) {
  const fileInput = useRef(null);

  function handleExport() {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleFile(e) {
    const file = e.target.files[0];
    e.target.value = ""; // Lets the same file be picked again later.
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        onImport(JSON.parse(reader.result));
      } catch {
        onImport(null);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="data-actions">
      <button className="btn-secondary" onClick={handleExport} disabled={tasks.length === 0}>
        ⬇️ Export
      </button>
      <button className="btn-secondary" onClick={() => fileInput.current.click()}>
        ⬆️ Import
      </button>
      <input ref={fileInput} type="file" accept="application/json,.json" onChange={handleFile} hidden />
    </div>
  );
}

export default DataActions;
