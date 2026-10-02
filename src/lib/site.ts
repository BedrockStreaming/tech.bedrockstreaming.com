import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { getCollection, type CollectionEntry } from 'astro:content';
import { markdownOptions } from './remark-kramdown.mjs';

export const site = {
  title: 'Bedrock Tech Blog',
  description: 'Bedrock tech blog',
  headerText: 'The crazy happens in the backstage',
  headerImage: '/images/common/banner_xl.jpg',
  avatar: '/images/common/br-site-logo.jpg',
  favicon: '/assets/favicon.png',
};

// Amplify previews set SITE_PREVIEW: they skip Matomo and show future-dated entries, like JEKYLL_ENV=preview did.
export const isPreview = process.env.SITE_PREVIEW === 'true';

export type Entry = CollectionEntry<'articles'> | CollectionEntry<'talks'>;

export interface Author {
  name?: string;
  avatar?: string;
  url?: string;
}

// Oldest first, like a Jekyll collection sorted by date; same-day entries in byte order of their file name.
export async function published<C extends 'articles' | 'talks'>(collection: C) {
  const now = new Date();
  const entries = await getCollection(collection, (entry) => isPreview || entry.data.date <= now);
  return entries.sort((a, b) => a.data.date.getTime() - b.data.date.getTime() || ((a.filePath ?? '') < (b.filePath ?? '') ? -1 : 1));
}

export function url(permalink: string) {
  return `/${permalink.replace(/^\//, '')}`;
}

export function absoluteUrl(path: string) {
  return new URL(url(path), 'https://tech.bedrockstreaming.com').href;
}

// With build.format 'preserve', slug "a/b" is written to a/b.html: what Jekyll writes for both "a/b" and "a/b.html".
export function outputSlug(permalink: string) {
  return permalink.replace(/^\//, '').replace(/\.html$/, '');
}

export async function authorsOf(entry: Entry): Promise<Author[]> {
  const { author } = entry.data;
  if (!author) return [];
  if (typeof author === 'object' && !Array.isArray(author)) return [{ name: author.name ?? undefined }];
  const ids = Array.isArray(author) ? author : [author];
  const known = new Map((await getCollection('authors')).map((a) => [a.id, a.data]));
  return ids.map((id) => known.get(id) ?? {});
}

export function plainText(html: string, length: number) {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length - 3)}...` : text;
}

export function formatDate(date: Date) {
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  return `${month} ${String(date.getUTCDate()).padStart(2, '0')}, ${date.getUTCFullYear()}`;
}

const markdown = createMarkdownProcessor(markdownOptions);

// Jekyll's excerpt: the front matter `excerpt`, or the Markdown before the separator with the document's
// link and footnote definitions appended, rendered.
export async function excerpt(entry: CollectionEntry<'articles'>) {
  if (entry.data.excerpt) return entry.data.excerpt;
  const [head, ...rest] = (entry.body ?? '').trimStart().split(entry.data.excerpt_separator ?? '\n\n');
  const definitions = rest.join('\n\n').match(/^ {0,3}\[[^\]]+\]:.+$/gm) ?? [];
  return (await (await markdown).render([head, definitions.join('\n')].join('\n\n'))).code;
}

export async function inlineMarkdown(text: string) {
  return (await (await markdown).render(text)).code.replace(/^<p>|<\/p>$/g, '');
}

// The five gradient pairs the brand guide allows on photography.
export const coverGradients = [
  ['#000000', '#3402F0'],
  ['#000000', '#FD4D26'],
  ['#3402F0', '#E82577'],
  ['#3402F0', '#FD4D26'],
  ['#3402F0', '#50F1D7'],
] as const;

export function coverGradient(seed: string) {
  let hash = 0;
  for (const char of seed) hash = (hash + char.charCodeAt(0)) % coverGradients.length;
  return coverGradients[hash];
}

type MorphPart = 'title' | 'cover' | 'video';

function morphName(entry: Entry, part: MorphPart) {
  return `${part}-${entry.id.replace(/[^\w-]/g, '-')}`;
}

export function morph(entry: Entry, part: MorphPart) {
  return `view-transition-name:${morphName(entry, part)}`;
}

// A view-transition-name must be unique on the page, or the browser skips the whole transition.
// Links to an entry only get theirs while navigating to or back from it (see Base.astro).
export function morphFrom(entry: Entry, part: MorphPart) {
  return { 'data-morph': morphName(entry, part), 'data-morph-href': url(entry.data.permalink) };
}

export function readingMinutes(markdown: string | undefined) {
  const words = (markdown ?? '').replace(/```[\s\S]*?```/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (words.length < 40) return undefined;
  return Math.max(1, Math.round(words.length / 220));
}

export async function relatedArticles(entry: CollectionEntry<'articles'>, limit = 3) {
  const topics = new Set(entry.data.topics);
  const articles = (await published('articles')).reverse();
  return articles.filter((article) => article.id !== entry.id && article.data.topics.some((topic) => topics.has(topic))).slice(0, limit);
}

export const articlesPerPage = 10;

// Newest first, 10 per page: page 1 is the homepage, later pages are /blog/pageN/.
export async function articlePages() {
  const articles = (await published('articles')).reverse();
  const pages = [];
  for (let start = 0; start < articles.length; start += articlesPerPage) pages.push(articles.slice(start, start + articlesPerPage));
  return pages;
}
