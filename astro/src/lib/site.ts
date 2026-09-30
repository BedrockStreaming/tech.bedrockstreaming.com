import { getCollection, type CollectionEntry } from 'astro:content';

export const site = {
  title: 'Bedrock Tech Blog',
  description: 'Blog technique de Bedrock',
  headerText: 'Creating Streaming Champions',
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

// Oldest first, like a Jekyll collection sorted by date.
export async function published<C extends 'articles' | 'talks'>(collection: C) {
  const now = new Date();
  const entries = await getCollection(collection, (entry) => isPreview || entry.data.date <= now);
  return entries.sort((a, b) => a.data.date.getTime() - b.data.date.getTime() || a.id.localeCompare(b.id));
}

export function url(permalink: string) {
  return `/${permalink.replace(/^\//, '')}`;
}

export function absoluteUrl(path: string) {
  return new URL(url(path), 'https://tech.bedrockstreaming.com').href;
}

// With build.format 'file', slug "a/b" is written to a/b.html: what Jekyll writes for both "a/b" and "a/b.html".
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
