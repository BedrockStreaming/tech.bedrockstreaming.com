import { readFileSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

const language = z.enum(['fr', 'en']);
// Front matter topics must be keys of the closed list in _data/topics.yml.
const topicIds = Object.keys(parse(readFileSync('../_data/topics.yml', 'utf-8')));
const topics = z.array(z.enum(topicIds as [string, ...string[]]));

// A string id from _data/authors.yml, a list of ids, or an inline author object.
const author = z.union([
  z.string(),
  z.array(z.string()),
  z.record(z.string(), z.string().nullable()),
]);

const image = z.record(z.string(), z.string().nullable());

const shared = {
  language,
  topics,
  title: z.string(),
  date: z.coerce.date(),
  permalink: z.string(),
  redirect_from: z.array(z.string()).optional(),
  description: z.string().nullable().optional(),
  author: author.optional(),
  image: image.nullable().optional(),
  'feature-img': z.string().nullable().optional(),
  thumbnail: z.string().optional(),
};

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: '../_articles' }),
  schema: z.strictObject({
    ...shared,
    layout: z.literal('post'),
    canonical: z.string().optional(),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
    excerpt_separator: z.string().optional(),
    twitter: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '*.md', base: '../_talks' }),
  schema: z.strictObject({
    ...shared,
    layout: z.enum(['video', 'conference']),
    eventName: z.string(),
    eventUrl: z.string().optional(),
    conferenceUrl: z.string().optional(),
    hosted: z.boolean().optional(),
    slideshareKey: z.string().optional(),
    sponsored: z.boolean().optional(),
    youtubeId: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: file('../_data/authors.yml'),
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    url: z.string().optional(),
  }),
});

const topicList = defineCollection({
  loader: file('../_data/topics.yml', {
    parser: (text) => Object.entries(parse(text)).map(([id, label]) => ({ id, label })),
  }),
  schema: z.object({ label: z.string() }),
});

export const collections = { articles, talks, authors, topics: topicList };
