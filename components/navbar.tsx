import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNavbar from "./mobile-navbar";
import Navlink from "./navlink";

const Navbar = () => {
  return (
    <header
      className={
        "sticky top-0 z-10 flex justify-between h-full items-center min-h-16 bg-white px-4 md:px-8 shadow-md"
      }
    >
      <Link href={"/"} className={"inline-flex items-center gap-3"}>
        <Image
          src={"/images/common/br-site-logo.jpg"}
          alt={"bedrock streaming logo"}
          width={50}
          height={50}
        />
        <h1 className={"text-2xl font-bold accent-slate-50 mr-2"}>
          Bedrock Tech Blog
        </h1>
      </Link>
      <MobileNavbar />
      <nav className={"hidden h-[70px] md:block"}>
        <ul className={"flex items-center h-full gap-5"}>
          <Navlink href={"/lft"}>Last Friday Talks</Navlink>
          <Navlink href={"/meetups"}>Meetups & Conferences</Navlink>
          <Navlink href={"/oss"}>OSS</Navlink>
          <Navlink className={"px-2"} href={"/search"}>
            🔍
          </Navlink>
          <Navlink href={"/tags"}>🏷️</Navlink>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
