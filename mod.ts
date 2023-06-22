import records from "./emojis.json" assert { type: "json" };
import { basename } from "https://deno.land/std@0.192.0/path/mod.ts";

const reHex = /^[0-9a-f-]+$/i;
const emojiCache = new Map<EmojiName, string | undefined>();

/**
 * Name of emoji
 */
export type EmojiName = keyof typeof records;

/**
 * Get emoji string of the name
 */
export function emojiOf(name: EmojiName): string | undefined {
  if (emojiCache.has(name)) {
    return emojiCache.get(name)!;
  }
  const url = records[name];
  const filename = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf("?"));
  const base = basename(filename, ".png");
  if (!reHex.test(base)) {
    return undefined;
  }
  const emoji = String.fromCodePoint(
    ...base.split("-").map((s) => parseInt(s, 16)),
  );
  emojiCache.set(name, emoji);
  return emoji;
}

/**
 * Get names of emojis.
 */
export function names(): EmojiName[] {
  return Object.keys(records) as EmojiName[];
}

/**
 * Get emoji strings.
 */
export function emojis(): string[] {
  return names().map(emojiOf).filter((v) => v) as string[];
}

let regexCache: RegExp | undefined;

/**
 * Replace `:{name}:` expressions to emojis.
 */
export function emojify(text: string): string {
  if (!regexCache) {
    regexCache = new RegExp(
      names().map((n) => `:${escapeRegExp(n)}:`).join("|"),
      "g",
    );
  }
  return text.replace(
    regexCache,
    (m) => emojiOf(m.slice(1, -1) as EmojiName) || m,
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
