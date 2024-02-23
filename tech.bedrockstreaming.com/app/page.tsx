import AllPosts from "../components/all-posts";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import markdownToHtml from "../lib/markdownToHtml";
import { cache, Suspense } from "react";

function getFirstParagraph(html: string) {
  const regex = /<p>(.*?)<\/p>/;
  const result = regex.exec(html);
  return result ? result[1] : "";
}

const rawPosts = getAllPosts([
  "title",
  "date",
  "slug",
  "author",
  "coverImage",
  "excerpt",
]);

const fetchPosts = async () =>
  await Promise.all(
    rawPosts.map(async (post) => ({
      ...post,
      excerpt: getFirstParagraph(await markdownToHtml(post.excerpt || "")),
    })),
  );

const getPosts = cache(fetchPosts);

export default async function Index({}) {
  const allPosts = await getPosts();

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
        <main className={"container mx-auto"}>
          <Suspense>
            <AllPosts posts={allPosts} />
          </Suspense>
        </main>
      </Layout>
    </>
  );
}
