"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import Post from "../interfaces/post";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import Authors from "./authors";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Tab,
  TabGroup,
  TabList,
} from "@headlessui/react";
import clsx from "clsx";

const options = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "content", weight: 0.3 },
  ],
};

const Search = ({
  posts,
  tags,
}: {
  posts: Post[];
  tags: Array<string | number>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "LFT" | "POST">("ALL");
  const [results, setResults] = useState<{ item: Post; refIndex: number }[]>(
    posts.map((item, refIndex) => ({ item, refIndex })),
  );
  const [tagsQuery, setTagsQuery] = useState("");
  const [selected, setSelected] = useState("");
  const { current: fuse } = useRef(new Fuse(posts, options));

  useEffect(() => {
    const results = fuse.search(searchQuery);
    setResults(
      results
        .filter(({ item }) => {
          if (filterType === "ALL") {
            return true;
          }
          if (filterType === "LFT") {
            return item.tags.includes("lft");
          }
          if (filterType === "POST") {
            return !item.tags.includes("lft");
          }
        })
        .filter(({ item }) => {
          if (selected === "") {
            return true;
          }
          return item.tags.includes(selected);
        }),
    );
  }, [searchQuery, filterType, selected]);

  const filteredTags = useMemo(
    () =>
      tagsQuery === ""
        ? tags
        : tags.filter((tag) => {
            if (typeof tag === "number") {
              return true;
            }
            return tag.toLowerCase().includes(tagsQuery.toLowerCase());
          }),
    [tagsQuery],
  );

  return (
    <>
      <div className={"flex flex-col items-end mt-7"}>
        <input
          className={"w-full h-10 px-3 border rounded-md"}
          type="text"
          placeholder="Enter keywords..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <p className={"inline"}>Results : {results.length}</p>
      </div>

      <div className={"flex justify-between my-2"}>
        <TabGroup
          onChange={(index) => {
            setFilterType(index === 0 ? "ALL" : index === 1 ? "LFT" : "POST");
          }}
          className={"flex items-center"}
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
        <Combobox
          value={selected}
          onChange={(value) => setSelected(value)}
          onClose={() => setTagsQuery("")}
        >
          <div className="relative">
            <ComboboxInput
              className={clsx("w-full h-10 px-3 border rounded-md")}
              onChange={(event) => setTagsQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              ⬇️
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "rounded-xl border border-white bg-white p-1 empty:invisible",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
            )}
          >
            {filteredTags.map((tag) => (
              <ComboboxOption
                key={tag}
                value={tag}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <span className="invisible size-4 fill-white group-data-[selected]:visible">
                  ✅
                </span>
                <div className="text-black">{tag}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>
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
