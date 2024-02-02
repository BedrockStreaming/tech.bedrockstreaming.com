import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

type Props = {
  posts: Post[];
};

const AllPosts = ({ posts }: Props) => {
  return (
    <main>
      <section className="mb-32 flex flex-col gap-2">
        {posts.map((post) => (
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
    </main>
  );
};

export default AllPosts;
