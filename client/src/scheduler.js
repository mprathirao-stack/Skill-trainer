function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/**
 * Pure function: turns an ordered list of resources into a day-by-day schedule.
 * Only resources with `selected !== false` are scheduled, in their given order.
 * A resource's hours can spill across multiple days.
 */
export function buildSchedule(resources, { hoursPerDay, startDate, includeWeekends }) {
  const queue = resources
    .filter((r) => r.selected !== false)
    .map((r) => ({ id: r.id, title: r.title, remaining: Math.max(r.estimatedHours, 0.5) }));

  const days = [];
  let cursor = new Date(startDate);
  let guard = 0; // safety valve against infinite loops on pathological input

  while (queue.some((r) => r.remaining > 0) && guard < 3650) {
    guard += 1;

    if (!includeWeekends && isWeekend(cursor)) {
      cursor = addDays(cursor, 1);
      continue;
    }

    let budget = hoursPerDay;
    const allocations = [];

    for (const item of queue) {
      if (budget <= 0) break;
      if (item.remaining <= 0) continue;

      const hours = Math.min(item.remaining, budget);
      allocations.push({ id: item.id, title: item.title, hours: Math.round(hours * 10) / 10 });
      item.remaining -= hours;
      budget -= hours;
    }

    if (allocations.length > 0) {
      days.push({
        date: new Date(cursor),
        allocations,
        totalHours: Math.round((hoursPerDay - budget) * 10) / 10,
      });
    }

    cursor = addDays(cursor, 1);
  }

  const totalHours = resources
    .filter((r) => r.selected !== false)
    .reduce((sum, r) => sum + r.estimatedHours, 0);

  return {
    days,
    totalHours: Math.round(totalHours * 10) / 10,
    completionDate: days.length ? days[days.length - 1].date : null,
  };
}
