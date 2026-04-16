/**
 * Windows: `next build` appends to `.next/trace`. If another process (e.g. `next dev`)
 * holds that file, the build throws EPERM. This script removes a stale `trace` file
 * before `next build` and exits with a clear message if the file is locked.
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
Cannot remove .next/trace (file is in use).

Fix:
  1) Stop every "npm run dev" / "next dev" — press Ctrl+C in each terminal.
  2) Optionally delete the cache:  Remove-Item -Recurse -Force .next
  3) Run:  npm run build

On Netlify/CI there is no dev server, so this error should not occur.
`);
    process.exit(1);
  }
  throw err;
}
