import Container from "../components/container";
import AllPosts from "../components/all-posts";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import markdownToHtml from "../lib/markdownToHtml";

function getFirstParagraph(html: string) {
  const regex = /<p>(.*?)<\/p>/;
  const result = regex.exec(html);
  return result ? result[1] : "";
}

export default async function Index() {
  const rawPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  const allPosts = await Promise.all(
    rawPosts.map(async (post) => ({
      ...post,
      excerpt: getFirstParagraph(await markdownToHtml(post.excerpt || "")),
    })),
  );

  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <AllPosts posts={allPosts} />
        </Container>
      </Layout>
    </>
  );
}
