import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AnnouncementForm from "@/components/shared/forms/AnnouncementForm";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  // I should get the userId from my session
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?._id;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h1 className="h1-bold text-dark100_light900">Create Announcement</h1>
      </section>

      <div className="wrapper">
        <AnnouncementForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default page;
