/**
 * Windows: Next.js opens `.next/trace` for writes. If the file is locked (another
 * `next dev`, Defender, OneDrive on Desktop, etc.), `next dev` / `next build` can
 * throw EPERM. This script deletes a stale `trace` file before dev or build.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const tracePath = path.join(process.cwd(), ".next", "trace");

if (!fs.existsSync(tracePath)) {
  process.exit(0);
}

try {
  fs.unlinkSync(tracePath);
} catch (err) {
  const code = err && typeof err === "object" && "code" in err ? err.code : "";
  if (code === "EPERM" || code === "EBUSY" || code === "EACCES") {
    console.error(`
Cannot remove .next/trace (file is in use or blocked).

Fix (try in order):
  1) Task Manager → end all "Node.js" processes; close every terminal running Next.js.
  2) Full cache reset:  npm run dev:clean   (or:  npm run clear-next)
  3) If the repo is on Desktop and OneDrive syncs it, move the project or exclude the folder.
  4) Temporarily exclude this folder from real-time antivirus scanning.

Then run:  npm run dev   or   npm run build
`);
    process.exit(1);
  }
  throw err;
}
