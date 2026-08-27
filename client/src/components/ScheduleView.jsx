const DATE_FMT = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export default function ScheduleView({ schedule, hoursPerDay }) {
  const { days, totalHours, completionDate } = schedule;

  if (days.length === 0) {
    return <p className="empty-state">Select at least one resource to build a schedule.</p>;
  }

  return (
    <div className="schedule-view">
      <div className="schedule-summary">
        <div>
          <span className="summary-number">{days.length}</span>
          <span className="summary-label">study days</span>
        </div>
        <div>
          <span className="summary-number">{totalHours}</span>
          <span className="summary-label">total hours</span>
        </div>
        <div>
          <span className="summary-number">{DATE_FMT.format(completionDate)}</span>
          <span className="summary-label">estimated completion</span>
        </div>
        <div>
          <span className="summary-number">{hoursPerDay}</span>
          <span className="summary-label">hrs/day</span>
        </div>
      </div>

      <ol className="day-list">
        {days.map((day, i) => (
          <li key={i} className="day-item">
            <div className="day-header">
              <span className="day-index">Day {i + 1}</span>
              <span className="day-date">{DATE_FMT.format(day.date)}</span>
              <span className="day-hours">{day.totalHours}h</span>
            </div>
            <ul className="day-allocations">
              {day.allocations.map((a, j) => (
                <li key={j}>
                  {a.title} <span className="alloc-hours">({a.hours}h)</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
