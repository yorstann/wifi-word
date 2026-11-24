import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry for make.fun bounty u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72:
// exactly one word describing your Wi-Fi — the funniest, truest one.
// Pass 2 routes the word through a small picker helper. It wins
// because everyone knows the feeling it names: full bars, a confident
// "connected", and nothing loading — the connection insists the
// problem is you. One familiar word, zero explanation needed.
// buildEntryLine() is the single source of truth for the exact text.

const ENTRY = "gaslighting" as const;

function pickWord(): string {
  return ENTRY;
}

export function buildEntryLine(): string {
  return pickWord();
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 20;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return (
    length >= 1 &&
    length <= MAX_CHARS &&
    text.trim().length > 0 &&
    !text.includes(" ")
  );
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry must be a single word of 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
