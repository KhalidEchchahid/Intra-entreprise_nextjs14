import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/components/shared/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";

const page = async({params}: ParamsProps) => {
    const session = getServerSession(authOptions);
    const userId = session?.user?._id ;
    if(!userId)return null ;

    const mongoUser = await getUserById({userId});
    
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile
        userId = {userId}
        user = {JSON.stringify(mongoUser)}
        />

      </div>
    </>
  );
};

export default page;
