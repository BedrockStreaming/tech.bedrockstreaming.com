"use client";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Navlink = ({
  children,
  className,
  href,
}: PropsWithChildren<{ href: string; className?: string }>) => {
  const route = usePathname();
  return (
    <Link
      href={href}
      className={clsx(className, "flex flex-col justify-center relative", {
        "text-orange-500 h-full": route === href,
      })}
    >
      {children}
      <span
        className={clsx(
          "absolute bottom-0 right-1/2 translate-x-1/2 block w-full h-1 self-end bg-orange-500 rounded-t-sm",
          {
            hidden: route !== href,
          },
        )}
      ></span>
    </Link>
  );
};

export default Navlink;
