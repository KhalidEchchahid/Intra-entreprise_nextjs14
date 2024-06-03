import { getLatestAnnouncements } from "@/lib/actions/announcement.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const topEvents = [
  { _id: '1', theme: "De Finibus Bonorum et Malorum", registredUsers: 25 },
  { _id: '2', theme: "Le passage de Lorem Ipsum standard", registredUsers: 14 },
  { _id: '3', theme: "De Finibus Bonorum et Malorum", registredUsers: 7 },
  {
    _id: '4',
    theme: "we denounce with righteous indignation",
    registredUsers: 6,
  },
  { _id: '5', theme: "De Finibus Bonorum et Malorum", registredUsers: 4 },
];
const RightSidebar = async () => {
  const { announcements } = await getLatestAnnouncements();
  console.log(announcements);
  
  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Latest Announcements</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {announcements.map((item : any) => (
            <Link
              href={`/announcement`}
              key={item._id}
              className="flex cursor-pointer items-centre justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{item.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Top Trainning Events</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topEvents.map((event)=>(
             <Link
             href={`/trainning/${event._id}`}
             key={event._id}
             className="flex cursor-pointer items-centre justify-between gap-7"
           >
             <p className="body-medium text-dark500_light700">{event.theme}</p>
             <p className='small-medium text-dark500_ligght700'>{event.registredUsers}</p>
           </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
