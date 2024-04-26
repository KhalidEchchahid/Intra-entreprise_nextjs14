import NaveBar from "@/components/shared/navBar/NavBar";
import RightSidebar from "@/components/shared/rightSidebare/RightSidebar";
import Sidebar from "@/components/shared/sidebar/Sidebar";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <NaveBar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar/>
      </div>
      Tooster
    </main>
  );
};

export default Layout;
