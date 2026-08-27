/**
 * Runs one search query against a locally self-hosted SearXNG instance
 * (open-source metasearch engine, no API key required) and returns
 * normalized result items shaped like { title, link, snippet }.
 */
export async function webSearch(query, { num = 8 } = {}) {
  const baseUrl = process.env.SEARXNG_URL || "http://127.0.0.1:8888";

  const url = new URL("/search", baseUrl);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");

  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error(
      `Could not reach SearXNG at ${baseUrl}. Make sure it's running (see searxng-instance/README or the project README).`
    );
  }

  if (!res.ok) {
    throw new Error(`SearXNG error (${res.status})`);
  }

  const body = await res.json();
  return (body.results || []).slice(0, num).map((r) => ({
    title: r.title,
    link: r.url,
    snippet: r.content || "",
  }));
}
