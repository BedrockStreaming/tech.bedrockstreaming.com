import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";
import { getLfts } from "../../lib/api";
import Image from "next/image";
import Authors from "../../components/authors";
import DateFormatter from "../../components/date-formatter";

const getYouTubeThumbnail = (youtubeId: string) => {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
};

const Page = async ({ searchParams }) => {
  const lfts = getLfts();
  const query = searchParams.page;
  const page = !!query ? parseInt(query) : 1;
  const lftsPerPage = 10;
  const start = (page - 1) * lftsPerPage;
  const end = start + lftsPerPage;
  const filteredPosts = lfts.slice(start, end);

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
          <h1 className={"text-center my-5"}>Last Friday Talks</h1>
        </section>
        <main className={"px-[15%] mt-4"}>
          <section className={"flex flex-col gap-5"}>
            <p>
              Last friday talks were at first internal technical conferences at
              the end of each month given by Bedrock employees about various
              subjects.{" "}
              <Link
                href={
                  "/posts/2012-12-05-organiser-des-conferences-technique-en-interne"
                }
                className={"text-orange-600"}
              >
                The concept of LFT has been introduced in this article 🇫🇷.
              </Link>
            </p>
            <p>
              Since this article, the event has evolved to include non-technical
              talks. Everyone can share their passion.{" "}
            </p>
            <p>Here are some replays of LFT available on Youtube:</p>
          </section>
          <section className="mb-16 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {lfts.map((lft) => (
              <article key={lft.slug} className={"p-3"}>
                <Link href={`/posts/${lft.slug}`}>
                  <div className="relative w-full aspect-video">
                    <Image
                      src={getYouTubeThumbnail(lft.youtubeId)}
                      alt={lft.title}
                      fill={true}
                      className={
                        "object-cover hover:filter hover:brightness-75"
                      }
                    />
                  </div>
                  <h4 className={"font-bold mt-2"}>{lft.title}</h4>
                </Link>
                <div className={"flex w-full justify-between gap-2 flex-wrap"}>
                  <DateFormatter dateString={lft.date} />
                  <Authors authors={lft.author} uppercase={false} />
                </div>
              </article>
            ))}
          </section>
          <div className={"flex items-center justify-between gap-4 mb-4"}>
            <Link
              className={
                "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
              }
              href={"/?page=" + (page - 1)}
            >
              ← Prev
            </Link>
            <p>
              {page} / {Math.ceil(lfts.length / lftsPerPage)}
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
                href={"/?page=" + Math.ceil(lfts.length / lftsPerPage)}
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
};

export default Page;
