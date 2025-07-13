"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarNavItem = ({
  url,
  name,
  icon,
}: {
  url: string;
  name: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link key={name} href={url}>
      <li
        className={`flex h-16 items-center gap-2 rounded-full pl-12 text-neutral-600 ${isActive && "bg-primary text-white"}`}
      >
        {icon}
        <p>{name}</p>
      </li>
    </Link>
  );
};

export default SidebarNavItem;
