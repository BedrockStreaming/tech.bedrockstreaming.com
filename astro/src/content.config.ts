import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared base schema for all post types
const basePostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(), // derived from filename in migration script if missing
  author: z.union([z.string(), z.array(z.string())]).optional(), // 37 posts use array form
  tags: z.array(z.coerce.string()).default([]), // coerce handles numeric tags like `2018`, `2024`
  language: z.enum(['fr', 'en']).default('fr'),
  thumbnail: z.string().optional(),
  featureImg: z.string().optional(), // frontmatter key `feature-img` — 82 posts use this
  color: z.string().optional(), // 167 posts have this; used for inline CSS in ALL 3 layouts
  comments: z.boolean().default(false),
  category: z.string().optional(),
  redirectFrom: z.array(z.string()).default([]), // frontmatter key `redirect_from` — 18 posts
  permalinkOverride: z.string().optional(), // frontmatter key `permalink` — 119 posts
});

// Blog posts collection (~220 posts)
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: basePostSchema,
});

// Conference posts collection (~40 posts)
const conferences = defineCollection({
  loader: glob({ base: './src/content/conferences', pattern: '**/*.{md,mdx}' }),
  schema: basePostSchema.extend({
    eventName: z.string().optional(),
    eventUrl: z.string().optional(), // not .url() — some may be relative or missing protocol
    slideshareKey: z.string().optional(), // 3 posts
    sponsored: z.boolean().default(false),
    hosted: z.boolean().default(false),
  }),
});

// Video posts collection (~50 LFT posts)
const videos = defineCollection({
  loader: glob({ base: './src/content/videos', pattern: '**/*.{md,mdx}' }),
  schema: basePostSchema.extend({
    youtubeId: z.string(), // REQUIRED — the layout's entire purpose
  }),
});

export const collections = { blog, conferences, videos };
