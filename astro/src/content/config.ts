import { defineCollection, reference, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z
        .string()
        .or(reference("authors"))
        .or(z.array(z.string().or(reference("authors")))),
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      thumbnail: image().optional(),
      tags: z.union([z.string(), z.number()]).array(),
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

export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
};
