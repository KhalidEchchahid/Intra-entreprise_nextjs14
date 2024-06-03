"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProject } from "@/database/project.model";
import { getAllProjects } from "@/lib/actions/project.action";
import { useEffect, useState } from "react";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const { projects: projectList } = await getAllProjects();

      projectList && setProjects(projectList as IProject[]);
    };

    getProjects();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="no-focus paragraph-ragular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
        <SelectValue placeholder="project" />
      </SelectTrigger>
      <SelectContent>
        {projects.length > 0 &&
          projects.map((project) => (
            <SelectItem
              key={project._id}
              value={project._id}
              className="select-item p-regular-14"
            >
              {project.title}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
