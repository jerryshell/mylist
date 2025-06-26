import Image from "next/image";
import React from "react";
import UserInfoCard from "./UserInfoCard";
import SidebarNav from "./SidebarNav";

const Sidebar = () => {
  return (
    <div className="flex w-sm flex-col px-2 py-4">
      <SidebarNav />
      <Image
        src="/images/files-2.png"
        alt="logo"
        width={500}
        height={400}
        className="w-full"
      />
      <UserInfoCard />
    </div>
  );
};

export default Sidebar;
