"use client"
import { dashboardNavbarLinks } from '@/constants';
import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';

const DashboardNavbar = () => {
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border sticky left-0 top-0 border-r p-6  shadow-light-300 dark:shadow-none">
      <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
      {dashboardNavbarLinks.map((item) =>{
         const isActive =
         (pathname.includes(item.route) && item.route.length > 1) ||
         pathname === item.route;

       return (
        <li key={item.route}>
          <Link href={item.route}>
          <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
          </Link>
        </li>
      )})
    }
      </ul>
    </section>
  )
}

export default DashboardNavbar
