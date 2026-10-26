// Commit gate for the neufin-push skill.
//   node tools/checks/commit-gate.mjs --stamp   records the current changes as checked (last step of the skill)
//   node tools/checks/commit-gate.mjs           PreToolUse hook: blocks `git commit` unless every changed
//                                               file is exactly as it was when the skill stamped it
// The stamp maps each changed file to a hash of its content, so split commits ("Design system: …",
// then "Website: …") pass, and any edit after the check needs the skill to run again.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const stampFile = join(root, "tools/checks/.push-check.json");
const git = (args) => execSync(`git ${args}`, { cwd: root, encoding: "utf8" });

// Every file that differs from HEAD (staged or not), plus untracked files, with a content hash.
function changes() {
  const files = new Set(
    [...git("diff HEAD --name-only").split("\n"), ...git("ls-files --others --exclude-standard").split("\n")].filter(Boolean),
  );
  files.delete("tools/checks/.push-check.json");
  return Object.fromEntries(
    [...files].sort().map((f) => {
      const p = join(root, f);
      return [f, existsSync(p) ? createHash("sha1").update(readFileSync(p)).digest("hex") : "deleted"];
    }),
  );
}

if (process.argv.includes("--stamp")) {
  const files = changes();
  writeFileSync(stampFile, JSON.stringify({ at: new Date().toISOString(), files }, null, 2));
  console.log(`Stamped ${Object.keys(files).length} changed file(s) as checked by neufin-push.`);
  process.exit(0);
}

// Hook mode: read the tool call from stdin; only `git commit` is gated.
let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  let command = "";
  try {
    command = JSON.parse(input).tool_input?.command ?? "";
  } catch {
    process.exit(0);
  }
  // A real `git commit` call: git at the start of a command (or after && ; | or a newline),
  // optional global flags like -C <dir>, then the commit subcommand. Text that merely mentions
  // both words (a heredoc, a doc edit) passes.
  if (!/(?:^|[;&|\n(]\s*)git(?:\s+-[cC]\s+\S+|\s+--[\w-]+(?:=\S+)?)*\s+commit\b/.test(command)) process.exit(0);

  const stamp = existsSync(stampFile) ? JSON.parse(readFileSync(stampFile, "utf8")) : { files: {} };
  const now = changes();
  const unchecked = Object.entries(now)
    .filter(([f, h]) => stamp.files[f] !== h)
    .map(([f]) => f);
  if (!unchecked.length) process.exit(0);

  process.stderr.write(
    `Commit blocked: run the neufin-push skill first (/neufin-push). ` +
      `${unchecked.length} changed file(s) haven't been through it since their last edit, e.g. ${unchecked.slice(0, 5).join(", ")}. ` +
      `Its last step is \`node tools/checks/commit-gate.mjs --stamp\`.`,
  );
  process.exit(2);
});
