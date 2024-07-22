"use client";
import React, { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import Post from "../interfaces/post";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import Authors from "./authors";
import { Tab, TabGroup, TabList } from "@headlessui/react";

const options = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "content", weight: 0.3 },
  ],
};

const Search = ({ posts }: { posts: Post[] }) => {
  /* todo: filter by tags */
  /* todo: search titles then content */
  /* todo: sort by date */
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "LFT" | "POST">("ALL");
  const [results, setResults] = useState<{ item: Post; refIndex: number }[]>(
    posts.map((item, refIndex) => ({ item, refIndex })),
  );
  const { current: fuse } = useRef(new Fuse(posts, options));

  useEffect(() => {
    const results = fuse.search(query);
    setResults(
      results.filter(({ item }) => {
        if (filterType === "ALL") {
          return true;
        }
        if (filterType === "LFT") {
          return item.tags.includes("lft");
        }
        if (filterType === "POST") {
          return !item.tags.includes("lft");
        }
      }),
    );
  }, [query, filterType]);

  return (
    <>
      <p>Number of results : {results.length}</p>
      <input
        className={"w-full h-10 px-3 border rounded-md"}
        type="text"
        placeholder="Enter keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <TabGroup
        onChange={(index) => {
          setFilterType(index === 0 ? "ALL" : index === 1 ? "LFT" : "POST");
        }}
      >
        <TabList>
          <Tab
            className={
              "rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
            }
          >
            All
          </Tab>
          <Tab
            className={
              "rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
            }
          >
            LFTs
          </Tab>
          <Tab
            className={
              "rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
            }
          >
            Posts
          </Tab>
        </TabList>
      </TabGroup>
      <ul className={"flex flex-col gap-5"}>
        {results.map(({ item: { title, slug, author, date }, refIndex }) => {
          return (
            <li className={"px-5"} key={refIndex}>
              <h2 className="mb-2 text-xl font-bold tracking-tight">
                <Link href={`/posts/${slug}`} className="hover:text-orange-500">
                  {title}
                </Link>
              </h2>
              <div className="inline-flex flex-wrap items-center gap-1 text-lg text-neutral-500">
                <Authors authors={author} />
                <span>-</span>
                <DateFormatter dateString={date} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Search;
