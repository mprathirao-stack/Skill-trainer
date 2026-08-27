import "dotenv/config";
import express from "express";
import cors from "cors";
import { webSearch } from "./src/webSearch.js";
import { buildResources } from "./src/buildResources.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/plan", async (req, res) => {
  const skill = (req.body?.skill || "").trim();
  if (!skill) {
    return res.status(400).json({ error: "skill is required" });
  }

  try {
    const currentYear = new Date().getFullYear();
    const [certResults, courseResults] = await Promise.all([
      webSearch(`${skill} certification ${currentYear}`, { num: 6 }),
      webSearch(`${skill} learning roadmap course tutorial`, { num: 6 }),
    ]);

    const resources = buildResources([certResults, courseResults]);

    if (resources.length === 0) {
      return res.status(404).json({ error: `No results found for "${skill}".` });
    }

    res.json({ skill, resources });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: err.message || "Search failed" });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Skill scheduler API listening on http://localhost:${port}`);
});
