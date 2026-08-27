const DURATION_PATTERNS = [
  { re: /(\d+(?:\.\d+)?)\s*hours?/i, toHours: (n) => n },
  { re: /(\d+(?:\.\d+)?)\s*weeks?/i, toHours: (n) => n * 10 }, // ~10 study hrs/week assumption
  { re: /(\d+(?:\.\d+)?)\s*months?/i, toHours: (n) => n * 40 }, // ~40 study hrs/month assumption
];

const DEFAULT_HOURS_BY_TYPE = {
  certification: 30,
  course: 15,
  resource: 10,
};

function classify(title, snippet) {
  const text = `${title} ${snippet}`.toLowerCase();
  if (/certif|exam|credential/.test(text)) return "certification";
  if (/course|tutorial|bootcamp|training|roadmap|guide/.test(text)) return "course";
  return "resource";
}

function estimateHours(title, snippet, type) {
  const text = `${title} ${snippet}`;
  for (const { re, toHours } of DURATION_PATTERNS) {
    const match = text.match(re);
    if (match) {
      const value = Math.round(toHours(parseFloat(match[1])));
      if (value > 0) return value;
    }
  }
  return DEFAULT_HOURS_BY_TYPE[type];
}

/**
 * Turns raw Google CSE items (from possibly multiple queries) into a deduplicated,
 * classified, hours-estimated list of learning resources.
 */
export function buildResources(itemGroups) {
  const seen = new Map();

  for (const items of itemGroups) {
    for (const item of items) {
      const link = item.link;
      if (!link || seen.has(link)) continue;

      const title = item.title || link;
      const snippet = item.snippet || "";
      const type = classify(title, snippet);
      const estimatedHours = estimateHours(title, snippet, type);

      seen.set(link, {
        id: link,
        title,
        link,
        snippet,
        source: (() => {
          try {
            return new URL(link).hostname.replace(/^www\./, "");
          } catch {
            return "";
          }
        })(),
        type,
        estimatedHours,
      });
    }
  }

  // Certifications first (the core "what to master"), then courses, then general resources.
  const order = { certification: 0, course: 1, resource: 2 };
  return [...seen.values()].sort((a, b) => order[a.type] - order[b.type]);
}
