import React from "react";
import Layout from "../../components/layout";
import Search from "../../components/search";
import { getAllPosts } from "../../lib/api";

const Page = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]);
  return (
    <Layout>
      <section
        className={"bg-black text-white shadow-2xl p-[9%] font-bold text-4xl"}
        style={{ backgroundImage: "url(/images/common/banner_xl.jpg)" }}
      >
        <h1 className={"text-center my-5"}>Search</h1>
      </section>
      <main>
        <div className="max-w-2xl mx-auto container">
          <Search posts={posts} />
        </div>
      </main>
    </Layout>
  );
};

export default Page;
