"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { ProjectRoleSchema } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { updateUserProjects, updateUserSkills } from "@/lib/actions/user.action";

interface Props {
  userId: string;
  userInfoId: string;
  projects: string;
  roles: string;
}
const AddProject = ({ userId, userInfoId, projects, roles }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSumitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectRoleSchema>>({
    resolver: zodResolver(ProjectRoleSchema),
    defaultValues: {
      project: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProjectRoleSchema>) {
    setIsSumitting(true);
    try {
      // make an async call to your API -> create a question

      await updateUserProjects({
        userId,
        project: values.project,
        role: values.role,
        path: pathname,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
    } finally {
      setIsSumitting(false);
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        {userId == JSON.parse(userInfoId) && (
          <Button
            className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3"
            onClick={() => setOpen(true)}
          >
            Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] background-light900_dark200 border-none">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-10"
          >
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Project <span className="text-primary-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    
                  >
                    <FormControl className="mt-3.5">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="background-light900_dark200">
                      {JSON.parse(projects).map((project: any) => (
                        <SelectItem value={project._id} key={project._id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Mastry Level <span className="text-primary-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    
                  >
                    <FormControl className="mt-3.5">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="background-light900_dark200">
                      {JSON.parse(roles).map((skill: any) => (
                        <SelectItem value={skill._id} key={skill._id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="primary-gradient w-fit !text-light-900"
                disabled={isSubmitting}
              >
                {isSubmitting ? <>Adding...</> : <>Add</>}
              </Button>

              <Button type="button" variant="secondary" onClick={()=> setOpen(false)}>
              Close
            </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
