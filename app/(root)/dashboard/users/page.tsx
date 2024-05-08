
import UserTable from "@/components/shared/UserTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {

  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>

        <Link href="/dashboard/users/create-user" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Create User
          </Button>
        </Link>
      </div>
      <div className="mt-11">
        <UserTable  />
      </div>
    </div>
  );
};

export default page;
