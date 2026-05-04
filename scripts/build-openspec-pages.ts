import { marked } from "marked";
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, relative, dirname, basename } from "path";

const ROOT = join(import.meta.dir, "..");
const OPENSPEC_DIR = join(ROOT, "openspec");
const CHANGES_DIR = join(OPENSPEC_DIR, "changes");
const SPECS_DIR = join(OPENSPEC_DIR, "specs");
const OUT_DIR = join(ROOT, "dist-openspec");

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function htmlPage(title: string, body: string, navDepth: number): string {
  const homeLink = navDepth === 0 ? null : "../".repeat(navDepth) + "index.html";
  const nav = homeLink
    ? `<nav><a href="${homeLink}">← インデックスに戻る</a></nav>`
    : "";
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 860px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #222; }
  nav { margin-bottom: 1.5rem; }
  nav a { color: #0066cc; text-decoration: none; }
  nav a:hover { text-decoration: underline; }
  h1, h2, h3 { border-bottom: 1px solid #e0e0e0; padding-bottom: 0.3rem; }
  code { background: #f4f4f4; padding: 0.1rem 0.4rem; border-radius: 3px; font-size: 0.9em; }
  pre { background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  a { color: #0066cc; }
  ul { padding-left: 1.5rem; }
</style>
</head>
<body>
${nav}
${body}
</body>
</html>`;
}

function collectSubdirs(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function collectMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function convertMarkdownFile(mdPath: string, relativeTo: string) {
  const relPath = relative(relativeTo, mdPath).replace(/\.md$/, ".html");
  const outPath = join(OUT_DIR, relPath);
  ensureDir(dirname(outPath));

  const md = readFileSync(mdPath, "utf-8");
  const html = marked(md) as string;
  const title = basename(mdPath, ".md");
  const depth = relPath.split("/").length - 1;
  writeFileSync(outPath, htmlPage(title, html, depth));
  return relPath;
}

function buildChangeListItems(dir: string, urlPrefix: string): string {
  if (!existsSync(dir)) return "<li>（なし）</li>";
  const entries = readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));
  if (entries.length === 0) return "<li>（なし）</li>";
  return entries
    .map((entry) => {
      const link = `${urlPrefix}/${entry.name}/proposal.html`;
      return `<li><a href="${link}">${entry.name}</a></li>`;
    })
    .join("\n");
}

function buildIndexPage(specs: string[]) {
  const ARCHIVE_DIR = join(CHANGES_DIR, "archive");

  const activeEntries = readdirSync(CHANGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "archive")
    .sort((a, b) => a.name.localeCompare(b.name));
  const changeItems =
    activeEntries.length === 0
      ? "<li>（なし）</li>"
      : activeEntries
          .map((e) => `<li><a href="changes/${e.name}/proposal.html">${e.name}</a></li>`)
          .join("\n");

  const archiveItems = buildChangeListItems(ARCHIVE_DIR, "changes/archive");

  const specItems =
    specs.length === 0
      ? "<li>（なし）</li>"
      : specs
          .map((name) => `<li><a href="specs/${name}/spec.html">${name}</a></li>`)
          .join("\n");

  const body = `
<h1>OpenSpec ドキュメント</h1>

<h2>Changes</h2>
<ul>
${changeItems}
</ul>

<h2>Archive</h2>
<ul>
${archiveItems}
</ul>

<h2>Specs</h2>
<ul>
${specItems}
</ul>
`;

  ensureDir(OUT_DIR);
  writeFileSync(join(OUT_DIR, "index.html"), htmlPage("OpenSpec", body, 0));
}

// --- Main ---

ensureDir(OUT_DIR);

const specs = collectSubdirs(SPECS_DIR);

buildIndexPage(specs);
console.log("✓ index.html を生成しました");

for (const mdPath of collectMarkdownFiles(OPENSPEC_DIR)) {
  const rel = convertMarkdownFile(mdPath, OPENSPEC_DIR);
  console.log(`  ${rel}`);
}

console.log("\n✓ ビルド完了 → dist-openspec/");
