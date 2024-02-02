import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
  return (
    <header
      className={
        "sticky top-0 z-10 flex justify-between items-center min-h-16 bg-white p-[2%]"
      }
    >
      <div
        className={
          "flex flex-wrap justify-between items-center w-full mx-auto px-4 md:px-8"
        }
      >
        <Link href={"/"} className={"inline-flex items-center gap-3"}>
          <Image
            src={"/images/common/br-site-logo.jpg"}
            alt={"bedrock streaming logo"}
            width={50}
            height={50}
          />
          <h1 className={"text-2xl font-bold accent-slate-50"}>
            Bedrock Tech Blog
          </h1>
        </Link>
        <MobileNavbar />
        <nav className={"ml-2 hidden md:block"}>
          <ul className={"list-none gap-5"}>
            <Link href={"/lft"}>Last Friday Talks</Link>
            <Link href={"/meetups"}>Meetups & Conferences</Link>
            <Link href={"/oss"}>OSS</Link>
            <Link href={"/search"}>🔍</Link>
            <Link href={"/tags"}>🏷️</Link>
            <span>🌗</span>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
