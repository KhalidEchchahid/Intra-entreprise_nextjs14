import { Button } from "@/components/ui/button";
import { getAllAnnouncements } from "@/lib/actions/announcement.action";
import { AnnoucementFormSchema } from "@/lib/validations";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { data, totalPages } = await getAllAnnouncements({});
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Announcements</h1>
        <Link
          href="/publish-announcement"
          className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Publish Announcement
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 " >
      {data.map((announc: any) => (
        
          <div key={announc._id}  className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full  flex-row">
            {announc.imageUrl && (
              <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <img
                  src={announc.imageUrl}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="p-6">
              <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                {announc?.project?.title}
              </h6>
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {announc.title}
              </h4>
              <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {announc.content}
              </p>
              {announc.link && (
                <a href={announc.link} className="inline-block">
                  <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                    type="button"
                  >
                    Link
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </a>
              )}
            </div>
          </div>
        
      ))}
      </div>
    </>
  );
};

export default page;
