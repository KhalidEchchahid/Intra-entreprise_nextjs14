import { getUserSkills } from "@/lib/actions/user.action";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  userId: string;
}

const UserSkills = async ({ userId }: Props) => {
  const { skills } = await getUserSkills({ userId });

  console.log({ skills });

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4 ">
        {
          skills.length > 0 ? (
            skills.map((skill: any) => (
              <div className="flex justify-between space-x-24" key={skill._id}>
                <span className="body-medium rounded-lg px-6 py-3 capitalize shadow-none bg-light-800 text-light-500">
                  {skill.skill.name}
                </span>
                <span className="text-gray-500">{skill.level.name}</span>
                <Button>
                  <span className="text-red-500">delete</span>
                </Button>
              </div>
            ))
          ) : (
            <p>No skill set up yet !</p>
          )
        
        }
      </div>
    </div>
  );
};

export default UserSkills;
