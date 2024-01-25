import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
// @ts-ignore
import authors from "./authors.yml";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getAuthor(id: string): { name: string; picture: string } {
  const author = authors[id];
  return {
    name: author?.name || null,
    picture: author?.avatar || null,
  };
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

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

    if (field === "author" && typeof data[field] !== "undefined") {
      if (Array.isArray(data[field])) {
        items[field] = data[field].map((id) => getAuthor(id));
        /*items[field] = { name: data[field].toString().replace(",", " ") };*/
      } else if (typeof data[field] === "string") {
        items[field] = [getAuthor(data[field])];
      } else {
        items[field] = [data[field]];
      }
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
