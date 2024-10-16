import {defineCollection, reference, z} from "astro:content";

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.union([reference('authors'), reference('authors').array()]),
        tags: z.array(z.string()).optional(),
        color: z.string(),
        language: z.string(),
        thumbnail: z.string().optional(),
    })
});

const authorsCollection = defineCollection({
    type: 'data',
    schema: ({image}) => z.object({
        name: z.string(),
        avatar: image().optional(),
        url: z.string().url().optional(),
    })
});

export const collections = {
    'posts': postsCollection,
    'authors': authorsCollection,
};
