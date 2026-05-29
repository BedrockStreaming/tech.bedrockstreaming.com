#!/usr/bin/env node
/**
 * Jekyll → Astro migration script
 * Converts _posts/*.md to astro/src/content/{blog,conferences,videos}/
 *
 * Usage:
 *   npx tsx scripts/migrate-jekyll.ts --dry-run            # Preview (default)
 *   npx tsx scripts/migrate-jekyll.ts --write              # Actually write files
 *   npx tsx scripts/migrate-jekyll.ts --dry-run --limit 5  # Process first 5 only
 *   npx tsx scripts/migrate-jekyll.ts --dry-run --validate-all
 *   npx tsx scripts/migrate-jekyll.ts --dry-run --emit-permalinks
 *   npx tsx scripts/migrate-jekyll.ts --dry-run --emit-redirects
 *   npx tsx scripts/migrate-jekyll.ts --dry-run --validate-images
 */

import matter from 'gray-matter';
import { globby } from 'globby';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import kleur from 'kleur';

// --- Types ---

interface PostFrontmatter {
  title?: string;
  description?: string;
  date?: string | Date;
  author?:
    | string
    | string[]
    | { name?: string; avatar?: string; twitter?: string; [key: string]: unknown };
  tags?: string[];
  language?: string;
  thumbnail?: string;
  'feature-img'?: string;
  featureImg?: string;
  color?: string;
  comments?: boolean;
  category?: string;
  redirect_from?: string | string[];
  redirectFrom?: string | string[];
  permalink?: string;
  layout?: string;
  youtubeId?: string;
  eventName?: string;
  eventUrl?: string;
  slideshareKey?: string;
  sponsored?: boolean;
  hosted?: boolean;
  [key: string]: unknown;
}

type Collection = 'blog' | 'conferences' | 'videos';

interface ConvertedPost {
  sourceFile: string;
  targetFile: string;
  collection: Collection;
  frontmatter: Record<string, unknown>;
  body: string;
  slug: string;
  date: string;
  permalinkOverride?: string;
  redirectFrom: string[];
  errors: string[];
  warnings: string[];
  unknownFields: string[];
  nestedAuthorOriginal?: unknown;
  nestedAuthorFixed?: string | string[];
}

interface ImageScan {
  ok: string[];
  broken: string[];
  external: string[];
}

interface MigrationReport {
  total: number;
  byCollection: Record<Collection, number>;
  errors: {
    schemaFailures: Array<{ post: string; issues: string[] }>;
    imageBroken: Array<{ post: string; path: string }>;
    permalinkCollisions: Array<{ posts: string[]; permalink: string }>;
  };
  warnings: {
    unknownFields: Array<{ post: string; fields: string[] }>;
    nestedAuthorFixed: Array<{ post: string; original: unknown; fixed: string | string[] }>;
  };
  permalinks: Array<{ file: string; permalink: string }>;
  redirects: Array<{ from: string; to: string; sourcePosts: string }>;
  imageStats: {
    okCount: number;
    brokenCount: number;
    externalCount: number;
  };
}

// --- Constants ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..', '..');
const POSTS_DIR = join(REPO_ROOT, '_posts');
const CONTENT_DIR = join(REPO_ROOT, 'astro', 'src', 'content');
const DATA_DIR = join(REPO_ROOT, 'astro', 'src', 'data');

const KNOWN_FIELDS = new Set([
  'layout',
  'title',
  'description',
  'date',
  'author',
  'tags',
  'language',
  'thumbnail',
  'feature-img',
  'featureImg',
  'color',
  'comments',
  'category',
  'redirect_from',
  'redirectFrom',
  'permalink',
  // conference fields
  'eventName',
  'eventUrl',
  'slideshareKey',
  'sponsored',
  'hosted',
  // video fields
  'youtubeId',
  // jekyll image block (legacy, drop content)
  'image',
  // other known fields
  'excerpt',
  'published',
  'modified',
]);

// --- Helpers ---

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof Date);
}

// --- Field mapping ---

function mapFrontmatter(raw: PostFrontmatter): {
  mapped: Record<string, unknown>;
  unknownFields: string[];
} {
  const mapped: Record<string, unknown> = {};
  const unknownFields: string[] = [];

  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined || value === null) continue;
    // Skip empty strings for optional fields to avoid schema noise
    if (typeof value === 'string' && value.trim() === '') continue;

    if (key === 'feature-img') {
      mapped['featureImg'] = value;
      continue;
    }
    if (key === 'redirect_from' || key === 'redirectFrom') continue; // handled separately
    if (key === 'permalink') continue; // handled separately
    if (key === 'layout') continue; // collection routing only
    if (key === 'image') continue; // legacy Jekyll image block — drop
    if (key === 'date') continue; // we always set date from filename
    if (key === 'author') continue; // normalized separately

    if (!KNOWN_FIELDS.has(key)) {
      unknownFields.push(key);
    }
    mapped[key] = value;
  }

  return { mapped, unknownFields };
}

// --- Author normalization ---

function normalizeAuthor(author: PostFrontmatter['author']): {
  value: string | string[] | undefined;
  wasNested: boolean;
} {
  if (author === undefined || author === null) {
    return { value: undefined, wasNested: false };
  }
  if (typeof author === 'string') {
    const trimmed = author.trim();
    return { value: trimmed || undefined, wasNested: false };
  }
  if (Array.isArray(author)) {
    const cleaned = author.map((a) => String(a).trim()).filter(Boolean);
    return { value: cleaned.length > 0 ? cleaned : undefined, wasNested: false };
  }
  if (isPlainObject(author)) {
    const name = typeof author.name === 'string' ? author.name.trim() : '';
    if (!name) {
      return { value: 'bedrock', wasNested: true };
    }
    const lower = name.toLowerCase().replace(/\s+/g, '');
    if (lower === 'm6web' || lower === 'bedrock') {
      return { value: 'bedrock', wasNested: true };
    }
    return { value: name, wasNested: true };
  }
  return { value: String(author), wasNested: false };
}

// --- Collection routing ---

function getCollection(layout: string | undefined): Collection {
  if (layout === 'video') return 'videos';
  if (layout === 'conference') return 'conferences';
  return 'blog';
}

// --- Date + slug extraction from filename ---

function parseDateSlug(filename: string): { date: string; slug: string } {
  const base = basename(filename).replace(/\.mdx?$/, '');
  const match = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
  if (match) {
    return { date: match[1], slug: match[2] };
  }
  return { date: new Date().toISOString().slice(0, 10), slug: base };
}

// --- URL derivation ---

function ensureTrailingSlash(p: string): string {
  if (!p) return '/';
  const withLeading = p.startsWith('/') ? p : '/' + p;
  return withLeading.endsWith('/') ? withLeading : withLeading + '/';
}

function derivePostUrl(date: string, slug: string, permalinkOverride?: string): string {
  if (permalinkOverride) {
    return ensureTrailingSlash(permalinkOverride);
  }
  const [year, month, day] = date.split('-');
  return `/${year}/${month}/${day}/${slug}/`;
}

// --- Image scan ---

function scanImages(body: string, frontmatter: Record<string, unknown>): ImageScan {
  const result: ImageScan = { ok: [], broken: [], external: [] };
  const refs: string[] = [];

  const mdImages = body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g);
  for (const m of mdImages) refs.push(m[1]);

  const htmlImages = body.matchAll(/<img[^>]+src=["']([^"']+)["']/g);
  for (const m of htmlImages) refs.push(m[1]);

  for (const field of ['featureImg', 'thumbnail']) {
    const v = frontmatter[field];
    if (typeof v === 'string' && v.trim()) refs.push(v.trim());
  }

  for (const ref of refs) {
    if (/^https?:\/\//i.test(ref)) {
      result.external.push(ref);
      continue;
    }
    if (ref.startsWith('data:') || ref.startsWith('mailto:')) continue;
    const localPath = join(REPO_ROOT, ref.replace(/^\//, ''));
    if (existsSync(localPath)) {
      result.ok.push(ref);
    } else {
      result.broken.push(ref);
    }
  }

  return result;
}

// --- Convert single post ---

function convertPost(filePath: string): ConvertedPost {
  const content = readFileSync(filePath, 'utf-8');
  const { data: raw, content: body } = matter(content);
  const fm = raw as PostFrontmatter;

  const { date, slug } = parseDateSlug(basename(filePath));
  const collection = getCollection(typeof fm.layout === 'string' ? fm.layout : undefined);
  const targetFile = join(CONTENT_DIR, collection, basename(filePath));

  const { mapped, unknownFields } = mapFrontmatter(fm);

  // Author normalization
  const { value: normalizedAuthor, wasNested } = normalizeAuthor(fm.author);
  if (normalizedAuthor !== undefined) {
    mapped.author = normalizedAuthor;
  }

  // Date always from filename
  mapped.date = date;

  // Permalink override
  const permalinkOverride = typeof fm.permalink === 'string' && fm.permalink.trim()
    ? fm.permalink.trim()
    : undefined;
  if (permalinkOverride) {
    mapped.permalinkOverride = permalinkOverride;
  }

  // redirect_from
  const rawRedirectFrom = fm.redirect_from ?? fm.redirectFrom;
  const redirectFrom: string[] = rawRedirectFrom
    ? (Array.isArray(rawRedirectFrom) ? rawRedirectFrom : [rawRedirectFrom])
        .map((r) => String(r).trim())
        .filter(Boolean)
        .map(ensureTrailingSlash)
    : [];
  if (redirectFrom.length > 0) {
    mapped.redirectFrom = redirectFrom;
  }

  // Errors (basic schema sanity)
  const errors: string[] = [];
  const title = typeof fm.title === 'string' ? fm.title.trim() : '';
  if (!title) {
    errors.push('Missing title');
  }
  if (collection === 'videos') {
    const yt = typeof fm.youtubeId === 'string' ? fm.youtubeId.trim() : '';
    if (!yt) errors.push('Missing youtubeId for video collection');
  }
  if (mapped.language !== undefined) {
    const lang = String(mapped.language);
    if (lang !== 'fr' && lang !== 'en') {
      errors.push(`Invalid language: ${lang}`);
    }
  }

  const warnings: string[] = [];
  if (wasNested) {
    warnings.push(
      `Nested author normalized: ${JSON.stringify(fm.author)} → ${JSON.stringify(normalizedAuthor)}`,
    );
  }
  if (unknownFields.length > 0) {
    warnings.push(`Unknown fields: ${unknownFields.join(', ')}`);
  }

  return {
    sourceFile: filePath,
    targetFile,
    collection,
    frontmatter: mapped,
    body,
    slug,
    date,
    permalinkOverride,
    redirectFrom,
    errors,
    warnings,
    unknownFields,
    nestedAuthorOriginal: wasNested ? fm.author : undefined,
    nestedAuthorFixed: wasNested ? normalizedAuthor : undefined,
  };
}

// --- Serialize to Astro content file ---

function generateAstroContent(post: ConvertedPost): string {
  return matter.stringify(post.body, post.frontmatter);
}

// --- CLI ---

interface CliOptions {
  isDryRun: boolean;
  limit: number;
  singleFile: string | null;
  emitJson: boolean;
  emitPermalinks: boolean;
  emitRedirects: boolean;
  validateImages: boolean;
  validateAll: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  const has = (flag: string) => argv.includes(flag);
  const valueOf = (flag: string): string | null => {
    const idx = argv.indexOf(flag);
    return idx >= 0 && idx + 1 < argv.length ? argv[idx + 1] : null;
  };
  const limitRaw = valueOf('--limit');
  return {
    isDryRun: !has('--write'),
    limit: limitRaw ? parseInt(limitRaw, 10) : Infinity,
    singleFile: valueOf('--file'),
    emitJson: has('--emit-json'),
    emitPermalinks: has('--emit-permalinks'),
    emitRedirects: has('--emit-redirects'),
    validateImages: has('--validate-images'),
    validateAll: has('--validate-all'),
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  const sourceFiles: string[] = opts.singleFile
    ? [resolve(opts.singleFile)]
    : (await globby(['*.md'], { cwd: POSTS_DIR, absolute: true })).sort();
  const limited = sourceFiles.slice(0, Number.isFinite(opts.limit) ? opts.limit : sourceFiles.length);

  const report: MigrationReport = {
    total: 0,
    byCollection: { blog: 0, conferences: 0, videos: 0 },
    errors: { schemaFailures: [], imageBroken: [], permalinkCollisions: [] },
    warnings: { unknownFields: [], nestedAuthorFixed: [] },
    permalinks: [],
    redirects: [],
    imageStats: { okCount: 0, brokenCount: 0, externalCount: 0 },
  };

  const posts: ConvertedPost[] = [];

  for (const file of limited) {
    const post = convertPost(file);
    posts.push(post);
    report.total++;
    report.byCollection[post.collection]++;

    if (post.errors.length > 0) {
      report.errors.schemaFailures.push({
        post: basename(file),
        issues: post.errors,
      });
    }

    if (post.unknownFields.length > 0) {
      report.warnings.unknownFields.push({
        post: basename(file),
        fields: post.unknownFields,
      });
    }

    if (post.nestedAuthorOriginal !== undefined) {
      report.warnings.nestedAuthorFixed.push({
        post: basename(file),
        original: post.nestedAuthorOriginal,
        fixed: post.nestedAuthorFixed!,
      });
    }

    if (post.permalinkOverride) {
      report.permalinks.push({
        file: basename(file),
        permalink: post.permalinkOverride,
      });
    }

    const canonicalUrl = derivePostUrl(post.date, post.slug, post.permalinkOverride);
    for (const from of post.redirectFrom) {
      if (from !== canonicalUrl) {
        report.redirects.push({
          from,
          to: canonicalUrl,
          sourcePosts: basename(file),
        });
      }
    }

    if (opts.validateImages || opts.validateAll) {
      const scan = scanImages(post.body, post.frontmatter);
      report.imageStats.okCount += scan.ok.length;
      report.imageStats.externalCount += scan.external.length;
      for (const path of scan.broken) {
        report.imageStats.brokenCount++;
        report.errors.imageBroken.push({ post: basename(file), path });
      }
    }
  }

  // Permalink collision detection
  const permalinkMap = new Map<string, string[]>();
  for (const post of posts) {
    const url = derivePostUrl(post.date, post.slug, post.permalinkOverride);
    const existing = permalinkMap.get(url) ?? [];
    existing.push(post.sourceFile);
    permalinkMap.set(url, existing);
  }
  for (const [url, files] of permalinkMap) {
    if (files.length > 1) {
      report.errors.permalinkCollisions.push({
        posts: files.map((f) => basename(f)),
        permalink: url,
      });
    }
  }

  // --emit-permalinks: JSON array, then exit
  if (opts.emitPermalinks) {
    console.log(JSON.stringify(report.permalinks, null, 2));
    process.exit(0);
  }

  // --emit-redirects: write redirects.json
  if (opts.emitRedirects || opts.validateAll) {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    const redirectsPath = join(DATA_DIR, 'redirects.json');
    writeFileSync(redirectsPath, JSON.stringify(report.redirects, null, 2) + '\n');
    console.error(
      kleur.green(`✓ Wrote ${redirectsPath} (${report.redirects.length} redirects)`),
    );
  }

  // Write content files (only in --write)
  if (!opts.isDryRun) {
    for (const post of posts) {
      const dir = join(CONTENT_DIR, post.collection);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(post.targetFile, generateAstroContent(post));
    }
    console.error(kleur.green(`✓ Wrote ${posts.length} posts to ${CONTENT_DIR}`));
  }

  const hasErrors =
    report.errors.schemaFailures.length > 0 ||
    report.errors.permalinkCollisions.length > 0 ||
    (opts.validateAll && report.errors.imageBroken.length > 0);

  if (opts.emitJson || opts.validateAll) {
    const reportData = {
      total: report.total,
      byCollection: report.byCollection,
      errors: report.errors,
      warnings: {
        unknownFieldsCount: report.warnings.unknownFields.length,
        nestedAuthorFixedCount: report.warnings.nestedAuthorFixed.length,
        unknownFields: report.warnings.unknownFields,
        nestedAuthorFixed: report.warnings.nestedAuthorFixed,
      },
      permalinkCount: report.permalinks.length,
      redirectCount: report.redirects.length,
      imageStats: report.imageStats,
    };
    console.log(JSON.stringify(reportData, null, 2));
  } else {
    const mode = opts.isDryRun ? 'dry-run' : 'write';
    console.log(kleur.bold(`\nMigration ${mode}:`));
    console.log(`  Total posts:          ${report.total}`);
    console.log(
      `  By collection:        blog=${report.byCollection.blog}, conferences=${report.byCollection.conferences}, videos=${report.byCollection.videos}`,
    );
    console.log(`  Permalink overrides:  ${report.permalinks.length}`);
    console.log(`  Redirects:            ${report.redirects.length}`);
    console.log(
      `  Unknown-field warns:  ${report.warnings.unknownFields.length}`,
    );
    console.log(
      `  Nested author fixes:  ${report.warnings.nestedAuthorFixed.length}`,
    );
    if (opts.validateImages || opts.validateAll) {
      console.log(
        `  Images: ok=${report.imageStats.okCount} broken=${report.imageStats.brokenCount} external=${report.imageStats.externalCount}`,
      );
    }
    if (hasErrors) {
      console.log(
        kleur.red(
          `\n  ERRORS: schema=${report.errors.schemaFailures.length} permalinkCollisions=${report.errors.permalinkCollisions.length} imagesBroken=${report.errors.imageBroken.length}`,
        ),
      );
      for (const f of report.errors.schemaFailures) {
        console.log(kleur.red(`    [schema] ${f.post}: ${f.issues.join('; ')}`));
      }
      for (const c of report.errors.permalinkCollisions) {
        console.log(
          kleur.red(`    [collision] ${c.permalink} ← ${c.posts.join(', ')}`),
        );
      }
    } else {
      console.log(kleur.green(`\n  ✓ No errors`));
    }
  }

  process.exit(hasErrors && opts.validateAll ? 1 : 0);
}

main().catch((err) => {
  console.error(kleur.red('Fatal error:'), err);
  process.exit(1);
});
