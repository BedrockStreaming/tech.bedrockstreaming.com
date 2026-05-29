#!/usr/bin/env node
/**
 * verify-urls.mjs
 *
 * Filesystem-based URL preservation check.
 * Derives expected URLs from Jekyll source (_posts/, pages/, redirects.json)
 * and verifies each one exists in astro/dist/.
 *
 * Exit 0 if all URLs found, 1 if any missing.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const DIST_DIR = join(REPO_ROOT, 'astro', 'dist');
const POSTS_DIR = join(REPO_ROOT, '_posts');
const PAGES_DIR = join(REPO_ROOT, 'pages');
const REDIRECTS_JSON = join(REPO_ROOT, 'astro', 'src', 'data', 'redirects.json');

const PAGE_SIZE = 10;

// --- Helpers ---

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return {};
  const result = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^\s*([\w-]+):\s*(.+?)\s*$/);
    if (m) {
      let value = m[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      result[m[1]] = value;
    }
  }
  return result;
}

function normalizeTrailingSlash(p) {
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p = p + '/';
  return p;
}

function getPostUrl(filename, frontmatter) {
  if (frontmatter.permalink) {
    return normalizeTrailingSlash(frontmatter.permalink);
  }
  const m = basename(filename, '.md').match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!m) return null;
  const [, year, month, day, slug] = m;
  return `/${year}/${month}/${day}/${slug}/`;
}

function slugifyAstro(s) {
  // Mirror Astro/GitHub Pages-ish slug: lowercase, drop apostrophes, replace
  // non-alphanumeric runs with hyphen, collapse repeats, trim.
  return s
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function tryVariants(path) {
  const variants = new Set([path]);
  try {
    variants.add(decodeURIComponent(path));
  } catch {}
  // Per-segment slugified fallback (handles parens, apostrophes, spaces, case)
  const segs = path.split('/').filter(Boolean);
  variants.add(segs.map(slugifyAstro).join('/'));
  // Aggressive: strip non-alphanumerics entirely (parens-without-hyphen case)
  variants.add(
    segs
      .map((s) =>
        s
          .toLowerCase()
          .replace(/['’`()]/g, '')
          .replace(/[^a-z0-9_-]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, ''),
      )
      .join('/'),
  );
  try {
    variants.add(
      decodeURIComponent(path)
        .split('/')
        .filter(Boolean)
        .map(slugifyAstro)
        .join('/'),
    );
  } catch {}
  return [...variants].filter(Boolean);
}

function checkUrl(url) {
  const rawPath = url.replace(/^\//, '').replace(/\/$/, '');
  if (!rawPath) return existsSync(join(DIST_DIR, 'index.html'));

  for (const path of tryVariants(rawPath)) {
    if (existsSync(join(DIST_DIR, path, 'index.html'))) return true;
    const filePath = join(DIST_DIR, path);
    if (existsSync(filePath) && statSync(filePath).isFile()) return true;
    for (const ext of ['.html', '.xml', '.txt']) {
      if (existsSync(join(DIST_DIR, path + ext))) return true;
    }
  }
  return false;
}

function extractTags(content) {
  // Handle both inline [a, b, c] and YAML list form
  const inline = content.match(/^\s*tags:\s*\[(.*)\]\s*$/m);
  if (inline) {
    return inline[1]
      .split(',')
      .map((t) => t.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
  const block = content.match(/^\s*tags:\s*\n((?:\s*-\s*.+\n?)+)/m);
  if (block) {
    return block[1]
      .split('\n')
      .map((l) => l.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
  return [];
}

// --- Main ---

console.log('=== URL Preservation Check ===\n');

if (!existsSync(DIST_DIR)) {
  console.error(`ERROR: dist directory not found: ${DIST_DIR}`);
  console.error('Run `npm run build` in astro/ first.');
  process.exit(2);
}

const expected = [];

// 1. Root
expected.push({ url: '/', source: 'home' });

// 2. Static pages
if (existsSync(PAGES_DIR)) {
  for (const file of readdirSync(PAGES_DIR)) {
    if (!file.endsWith('.md')) continue;
    const content = readFileSync(join(PAGES_DIR, file), 'utf-8');
    const fm = parseFrontmatter(content);
    const slug = basename(file, '.md');

    if (slug === '404') {
      // Jekyll renders 404.md -> /404.html
      expected.push({ url: '/404.html', source: 'page:404' });
      continue;
    }

    // Accept either the permalink or the filename-slug URL (Astro may use either)
    const urls = [];
    if (fm.permalink) urls.push(normalizeTrailingSlash(fm.permalink));
    urls.push(`/${slug}/`);
    expected.push({ urls, source: `page:${file}` });
  }
}

// 3. Posts
const postFiles = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
const allTags = new Set();
for (const file of postFiles) {
  const content = readFileSync(join(POSTS_DIR, file), 'utf-8');
  const fm = parseFrontmatter(content);
  const url = getPostUrl(file, fm);
  if (url) expected.push({ url, source: `post:${file}` });
  for (const t of extractTags(content)) allTags.add(t);
}

// 4. Pagination /blog/page/N/
const totalPages = Math.ceil(postFiles.length / PAGE_SIZE);
for (let i = 1; i <= totalPages; i++) {
  expected.push({ url: `/blog/page/${i}/`, source: 'pagination' });
}

// 5. Legacy pagination /blog/pageN/
for (let i = 2; i <= totalPages; i++) {
  expected.push({ url: `/blog/page${i}/`, source: 'legacy-pagination' });
}

// 6. Tags index
expected.push({ url: '/tags/', source: 'tags-index' });

// 7. Per-tag pages
for (const tag of allTags) {
  expected.push({ url: `/tags/${encodeURIComponent(tag)}/`, source: `tag:${tag}` });
}

// 8. Feeds + sitemap + robots
expected.push({ url: '/feed.xml', source: 'rss' });
expected.push({ url: '/sitemap-index.xml', source: 'sitemap' });
expected.push({ url: '/robots.txt', source: 'robots' });

// 9. redirect_from URLs
if (existsSync(REDIRECTS_JSON)) {
  const redirects = JSON.parse(readFileSync(REDIRECTS_JSON, 'utf-8'));
  for (const r of redirects) {
    expected.push({
      url: normalizeTrailingSlash(r.from),
      source: `redirect-from:${r.sourcePosts || 'unknown'}`,
    });
  }
}

// --- Check ---
const missing = [];
let found = 0;
for (const item of expected) {
  const candidates = item.urls || [item.url];
  if (candidates.some((u) => checkUrl(u))) found++;
  else missing.push({ ...item, url: candidates[0] });
}

console.log(`URLs expected: ${expected.length}`);
console.log(`Found: ${found}`);
console.log(`Missing: ${missing.length}\n`);

if (missing.length > 0) {
  console.log('=== Missing URLs ===');
  const bySource = {};
  for (const m of missing) {
    const type = m.source.split(':')[0];
    (bySource[type] ||= []).push(m);
  }
  for (const [type, items] of Object.entries(bySource)) {
    console.log(`\n${type} (${items.length}):`);
    for (const item of items.slice(0, 10)) {
      console.log(`  ${item.url}  (from ${item.source})`);
    }
    if (items.length > 10) console.log(`  ... and ${items.length - 10} more`);
  }
  process.exit(1);
}

console.log('✓ All expected URLs present in dist/');
process.exit(0);
