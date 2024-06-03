import { getUserProjects, getUserSkills } from "@/lib/actions/user.action";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  userId: string;
}

const UserProjects = async ({ userId }: Props) => {
  const { projects } = await getUserProjects({ userId });


  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4 ">
        {
          projects.length > 0 ? (
            projects.map((project: any) => (
              <div className="flex justify-between space-x-24" key={project._id}>
                <span className="body-medium rounded-lg px-6 py-3 capitalize shadow-none bg-light-800 text-light-500">
                  {project.project.title}
                </span>
                <span className="text-gray-500">{project.role.name}</span>
                <Button>
                  <span className="text-red-500">delete</span>
                </Button>
              </div>
            ))
          ) : (
            <p>No project set up yet !</p>
          )
        
        }
      </div>
    </div>
  );
};

export default UserProjects;