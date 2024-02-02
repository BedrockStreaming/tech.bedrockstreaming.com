"use client";

import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  posts: Post[];
};

const AllPosts = ({ posts }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const query = searchParams.get("page");
  const page = query ? parseInt(query) : 1;
  const postsPerPage = 10;
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const filteredPosts = posts.slice(start, end);

  return (
    <main>
      <section className="mb-16 flex flex-col gap-2">
        {filteredPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </section>
      <div className={"flex gap-4"}>
        <button
          className={"bg-black text-white p-3 rounded"}
          onClick={() => replace(page !== 0 ? "/?page=" + (page - 1) : "/")}
        >
          Previous page
        </button>
        <button
          onClick={() => replace("/?page=" + (page + 1))}
          className={"bg-black text-white p-3 rounded"}
        >
          Next page
        </button>
      </div>
    </main>
  );
};

export default AllPosts;
