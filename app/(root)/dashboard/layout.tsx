

import DashboardNavbar from "@/components/shared/DashboardNavbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background-light850_dark100 relative">
       <DashboardNavbar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-14 max-md:pb-14 sm:px14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
    </div>
  );
};

export default Layout;
