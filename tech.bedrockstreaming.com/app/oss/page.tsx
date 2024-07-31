import React from "react";

// @ts-ignore
import Oss from "./oss.md";
import { components } from "../../components/mdx-components";
import Layout from "../../components/layout";

const Page = () => {
  return (
    <Layout>
      <section
        className={"bg-black text-white shadow-2xl p-[9%] font-bold text-4xl"}
        style={{ backgroundImage: "url(/images/common/banner_xl.jpg)" }}
      >
        <h1 className={"text-center my-5"}>OSS</h1>
      </section>
      <main className="max-w-2xl mx-auto container">
        <Oss components={components} />
      </main>
    </Layout>
  );
};

export default Page;
