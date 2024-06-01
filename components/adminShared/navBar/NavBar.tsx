import Link from "next/link";
import Image from "next/image";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";


const NaveBar = () => {
  const user = true;
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          ADMIN <span className="text-primary-500">INNOVTECH</span>{" "}
        </p>
      </Link>
      <div className="flex-between gap-5">
        <Theme />
        {user && (
          <Image
            className="rounded-full w-10"
            src="/assets/images/profile.jpeg"
            width={24}
            height={24}
            alt="KhalidFlow"
          />
        )}
        <MobileNav />
      </div>
    </nav>
  );
};

export default NaveBar;
