// Slug for a heading anchor. Keeps letters from any script (Latin, Cyrillic)
// via unicode property escapes, so uz/ru headings get valid, stable ids.
export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type Heading = { level: 2 | 3; text: string; id: string };

// Pull h2/h3 headings out of a markdown string, skipping fenced code blocks.
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.*\S)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/\*\*/g, "").replace(/`/g, "").trim();
    headings.push({ level: m[1].length as 2 | 3, text, id: headingSlug(text) });
  }
  return headings;
}
