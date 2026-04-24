/**
 * Remove the entire `.next` directory (Windows-friendly).
 * Use when `next dev` / `next build` fails with EPERM on `.next/trace` and
 * stopping other dev servers is not enough.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const nextDir = path.join(process.cwd(), ".next");

if (!fs.existsSync(nextDir)) {
  process.exit(0);
}

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next (fresh cache on next start).");
} catch (err) {
  const code = err && typeof err === "object" && "code" in err ? err.code : "";
  console.error(`
Could not remove .next/ (often EPERM / EBUSY on Windows).

Try:
  1) Task Manager → end all "Node.js" processes.
  2) Close other terminals / IDEs using this folder.
  3) If the project is under Desktop/Documents synced by OneDrive, move it to e.g. C:\\dev\\Notify or exclude the folder from sync.
  4) Add an antivirus exclusion for this project path.
  5) Run the terminal as Administrator once, then:  npm run dev:clean

Error: ${code || err}
`);
  process.exit(1);
}
