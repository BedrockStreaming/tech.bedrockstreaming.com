import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
// @ts-expect-error module resolution can't find yml
import authors from "./authors.yml";
// @ts-expect-error module resolution can't find yaml
import conferences from "../_data/conferences.yaml";
import Post from "../interfaces/post";
import Author from "../interfaces/author";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getAuthor(id: string): Author {
  const author = authors[id];
  return {
    name: author?.name || null,
    picture: author?.avatar || null,
    url: author?.url || null,
  };
}

export function getPostBySlug(slug: string, fields: Array<keyof Post> = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {} as any;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (field === "date") {
      if (!items[field]) {
        items[field] = realSlug.slice(0, 10);
      }
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }

    if (field === "coverImage") {
      let image = data["thumbnail"];
      if (image && !image.startsWith("/")) {
        image = "/" + image;
      }
      items[field] = image ?? null;
    }

    if (field === "author" && typeof data[field] !== "undefined") {
      if (Array.isArray(data[field])) {
        items[field] = data[field].map((id) => getAuthor(id));
      } else if (typeof data[field] === "string") {
        items[field] = [getAuthor(data[field])];
      } else {
        items[field] = [data[field]];
      }
    }

    if (field === "excerpt") {
      items[field] = content;
    }

    if (field === "tags") {
      items[field] = data[field] || [];
    }

    if (field === "youtubeId") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: Array<keyof Post> = []) {
  const slugs = getPostSlugs();
  return (
    slugs
      .map((slug) => getPostBySlug(slug, fields))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
}

export function getLfts() {
  return getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
    "youtubeId",
  ]).filter((post) => post.tags.includes("lft"));
}

export interface Conference {
  title: string;
  date: Date;
  description: string;
  eventName: string;
  eventUrl: string;
  sponsored: boolean;
  hosted: boolean;
  author_id: string;
}
export function getConferences() /*: Array<Partial<Conference>>*/ {
  return conferences;
}
