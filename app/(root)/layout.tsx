import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        <div className="mr-4 mb-4 flex-1 overflow-auto rounded-2xl bg-neutral-100 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
