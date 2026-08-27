import { useState } from "react";

const TYPE_LABEL = {
  certification: "Certification",
  course: "Course",
  resource: "Resource",
};

export default function ResourceList({ resources, onReorder, onToggle, onHoursChange }) {
  const [dragId, setDragId] = useState(null);

  function handleDrop(targetId) {
    if (dragId === null || dragId === targetId) return;
    const items = [...resources];
    const fromIndex = items.findIndex((r) => r.id === dragId);
    const toIndex = items.findIndex((r) => r.id === targetId);
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    onReorder(items);
    setDragId(null);
  }

  return (
    <ul className="resource-list">
      {resources.map((r) => (
        <li
          key={r.id}
          className={`resource-item ${r.selected === false ? "is-excluded" : ""}`}
          draggable
          onDragStart={() => setDragId(r.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(r.id)}
          title="Drag to reorder"
        >
          <span className="drag-handle" aria-hidden="true">
            ⠿
          </span>

          <input
            type="checkbox"
            checked={r.selected !== false}
            onChange={() => onToggle(r.id)}
          />

          <div className="resource-body">
            <a href={r.link} target="_blank" rel="noreferrer" className="resource-title">
              {r.title}
            </a>
            <div className="resource-meta">
              <span className={`badge badge-${r.type}`}>{TYPE_LABEL[r.type]}</span>
              <span className="resource-source">{r.source}</span>
            </div>
            {r.snippet && <p className="resource-snippet">{r.snippet}</p>}
          </div>

          <label className="hours-input">
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={r.estimatedHours}
              onChange={(e) => onHoursChange(r.id, parseFloat(e.target.value) || 0)}
            />
            hrs
          </label>
        </li>
      ))}
    </ul>
  );
}
