import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import PostPreview from "../components/post-preview";
import Link from "next/link";

export default async function Index({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  const query = searchParams.page;
  const page = !!query ? parseInt(query) : 1;
  const postsPerPage = 10;
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const filteredPosts = posts.slice(start, end);

  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <section
          className={"bg-black text-white shadow-2xl p-[9%] font-bold text-4xl"}
          style={{ backgroundImage: "url(/images/common/banner_xl.jpg)" }}
        >
          <h1 className={"text-center my-5"}>Creating Streaming Champions</h1>
        </section>
        <main className={"px-[15%]"}>
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
          <div className={"flex items-center justify-between gap-4"}>
            <Link
              className={
                "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
              }
              href={"/?page=" + (page - 1)}
            >
              ← Prev
            </Link>
            <p>
              {page} / {Math.ceil(posts.length / postsPerPage)}
            </p>
            <div className={"flex gap-3"}>
              <Link
                href={"/?page=" + (page + 1)}
                className={
                  "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
                }
              >
                Next →
              </Link>
              <Link
                href={"/?page=" + Math.ceil(posts.length / postsPerPage)}
                className={
                  "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
                }
              >
                {">>"}
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
