import { defineCollection, reference, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: reference("authors").or(z.array(reference("authors"))),
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      thumbnail: image().optional(),
      tags: z.union([z.string(), z.number()]).array(),
      layout: z.string(),
    }),
});

const authorsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().optional().or(z.string().url()),
      url: z.string().url().optional(),
    }),
});

const lftsCollection = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      layout: z.string(),
      title: z.string(),
      description: z.string().optional(),
      tags: z.union([z.string(), z.number()]).array().optional(),
      youtubeId: z.string().optional(),
      eventName: z.string().optional(),
      eventUrl: z.string().url().optional(),
      sponsored: z.boolean().optional(),
      hosted: z.boolean().optional(),
      language: z.string().optional(),
      lang: z.string().optional(),
      author: reference("authors").or(z.array(reference("authors"))),
    }),
});

export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
  lfts: lftsCollection,
};
