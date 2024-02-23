import PostBody from "../../../components/post-body";
import PostHeader from "../../../components/post-header";
import Layout from "../../../components/layout";
import { getPostBySlug } from "../../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return (
    <Layout>
      <>
        <article className="mb-32">
          <Head>
            <title>{title}</title>
            {/*<meta property="og:image" content={post.ogImage.url} />*/}
          </Head>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </>
    </Layout>
  );
}
