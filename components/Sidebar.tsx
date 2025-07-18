import SidebarNav from "./SidebarNav";
import UserInfoCard from "./UserInfoCard";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex w-80 flex-col overflow-x-auto px-2 py-4">
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
