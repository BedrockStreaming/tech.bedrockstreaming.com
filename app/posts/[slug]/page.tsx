import PostBody from "../../../components/post-body";
import PostHeader from "../../../components/post-header";
import Layout from "../../../components/layout";
import { getPostBySlug, getPostSlugs } from "../../../lib/api";
import Head from "next/head";
import React from "react";

export function generateStaticParams() {
  const pathnames = getPostSlugs();

  return pathnames.map((pathname) => ({
    slug: pathname.replace(/\.md$/, ""),
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "youtubeId",
  ]);

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        {/*<meta property="og:image" content={post.ogImage.url} />*/}
      </Head>
      <article className="mb-32">
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
        {post.youtubeId && (
          <div className="max-w-screen-lg mx-auto pt-10">
            <iframe
              width="100%"
              height="auto"
              className={"aspect-video"}
              src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </article>
    </Layout>
  );
}
