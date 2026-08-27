import { useMemo, useState } from "react";
import { fetchPlan } from "./api.js";
import { buildSchedule } from "./scheduler.js";
import ResourceList from "./components/ResourceList.jsx";
import ScheduleView from "./components/ScheduleView.jsx";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const [skill, setSkill] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [startDate, setStartDate] = useState(todayISO());
  const [includeWeekends, setIncludeWeekends] = useState(true);

  const [resources, setResources] = useState([]);
  const [loadedSkill, setLoadedSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const schedule = useMemo(
    () =>
      buildSchedule(resources, {
        hoursPerDay: Math.max(hoursPerDay, 0.25),
        startDate: new Date(`${startDate}T00:00:00`),
        includeWeekends,
      }),
    [resources, hoursPerDay, startDate, includeWeekends]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!skill.trim()) return;

    setLoading(true);
    setError("");
    try {
      const plan = await fetchPlan(skill.trim());
      setResources(plan.resources.map((r) => ({ ...r, selected: true })));
      setLoadedSkill(plan.skill);
    } catch (err) {
      setError(err.message);
      setResources([]);
    } finally {
      setLoading(false);
    }
  }

  function toggleResource(id) {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: r.selected === false } : r))
    );
  }

  function changeHours(id, hours) {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, estimatedHours: hours } : r)));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Skill Mastery Scheduler</h1>
        <p>
          Enter a skill, find the current certifications and learning resources for it, and turn
          them into a day-by-day study plan built around the time you actually have.
        </p>
      </header>

      <form className="skill-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Kubernetes, Product Management, Spanish fluency"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching…" : "Find & Schedule"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {resources.length > 0 && (
        <>
          <section className="controls">
            <label>
              Hours per day
              <input
                type="number"
                min="0.25"
                step="0.25"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
              />
            </label>

            <label>
              Start date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeWeekends}
                onChange={(e) => setIncludeWeekends(e.target.checked)}
              />
              Study on weekends
            </label>
          </section>

          <section className="results">
            <div className="column">
              <h2>Certifications &amp; resources for "{loadedSkill}"</h2>
              <p className="hint">
                Drag to reorder, uncheck to exclude, or edit the hours estimate — the schedule
                updates instantly.
              </p>
              <ResourceList
                resources={resources}
                onReorder={setResources}
                onToggle={toggleResource}
                onHoursChange={changeHours}
              />
            </div>

            <div className="column">
              <h2>Your schedule</h2>
              <ScheduleView schedule={schedule} hoursPerDay={hoursPerDay} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
