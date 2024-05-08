import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Question from "@/components/shared/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {

   // I should get the userId from my session 
   const  session  = await getServerSession(authOptions);
   const userId = session?.user?._id;

  if(!userId) redirect('/sign-in');

  const mongoUser = await getUserById({userId});

  console.log(mongoUser);

  return (
    <div>
        <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
  );
};

export default Page;
