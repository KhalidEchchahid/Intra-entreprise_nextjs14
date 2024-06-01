"use client";
import { Button } from "@/components/ui/button";
import { adminSidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();

  //@ts-ignore
  const userId = session?.user?._id;
  console.log(userId);

  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-bwtween overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
      <div className="flex flex-1 flex-col gap-6">
        {adminSidebarLinks.map((item) => {
          const isActive = pathname === item.route;
          // (pathname.includes(item.route) && item.route.length > 1) ||

          return (
            <div key={item.route}>
              <Link
                href={item.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  className={`${isActive ? "" : "invert-colors"}`}
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {item.label}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/api/auth/signout">
          <Button
            className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none mt-8"
            onClick={(e) => {
              e.preventDefault();
              signOut(); 
            }}
          >
            <Image
              src="assets/icons/account.svg"
              alt="logout"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">Log out</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
