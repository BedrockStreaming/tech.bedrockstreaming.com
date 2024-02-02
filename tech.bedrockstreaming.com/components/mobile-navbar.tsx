"use client";

import React, { useState } from "react";
import Link from "next/link";

const MobileNavbar = () => {
  const [displayed, setDisplayed] = useState(false);
  return (
    <>
      <div className={"block relative h-[30px] w-[40px] md:hidden"}>
        <input
          aria-label={"Toggle mobile navigation"}
          type="checkbox"
          onChange={() => setDisplayed(!displayed)}
          className={"relative w-full h-full opacity-0 z-20 peer"}
        />
        <span
          className={
            "bg-black block absolute h-[3px] w-full rounded transition-all z-10 top-0 peer-checked:top-1/2 peer-checked:rotate-45"
          }
        ></span>
        <span
          className={
            "bg-black block absolute h-[3px] w-full rounded transition-all z-10 top-1/2 translate-y-[-50%] peer-checked:opacity-0 peer-checked:rotate-[-45deg] "
          }
        ></span>
        <span
          className={
            "bg-black block absolute h-[3px] w-full rounded transition-all z-10 bottom-0 peer-checked:rotate-[-45deg] peer-checked:top-1/2 "
          }
        ></span>
      </div>
      <div
        className={
          "fixed top-0 left-0 w-full h-full bg-white transition-all " +
          (displayed ? "translate-y-0" : "translate-y-[-100%]")
        }
      >
        <ul
          className={
            "flex flex-col justify-center items-center h-full w-full list-none gap-32 text-2xl font-medium"
          }
        >
          <Link href={"/lft"}>Last Friday Talks</Link>
          <Link href={"/meetups"}>Meetups & Conferences</Link>
          <Link href={"/oss"}>OSS</Link>
          <Link href={"/search"}>🔍 Search</Link>
          <Link href={"/tags"}>🏷️ Tags</Link>
        </ul>
      </div>
    </>
  );
};

export default MobileNavbar;
