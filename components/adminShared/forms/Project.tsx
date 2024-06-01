"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSkill } from "@/lib/actions/skill.action";
import {  ProjectShema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createLevel } from "@/lib/actions/level.action";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/actions/project.action";

const Project = () => {
    const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSumitting] = useState(false);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof ProjectShema>>({
    resolver: zodResolver(ProjectShema),
    defaultValues: {
      title: "",
      description:""
    },
  });

  async function onSubmit(values: z.infer<typeof ProjectShema>) {
    setIsSumitting(true);
    try {
      // make an async call to your API -> create a question
      // contain all form data
      await createProject({
        title: values.title,
        description: values.description ,
        path: pathname,
      });

      setOpen(false);
    } catch (error) {
    } finally {
      setIsSumitting(false);
    }
  }
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" onClick={()=>setOpen(true)}>
          Create New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] background-light900_dark200 border-none">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-10"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Title <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-ragular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                  description <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Textarea
                      className="no-focus paragraph-ragular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[100px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
              
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? <>Creating...</> : <>Create Project</>}
            </Button>
            <Button type="button" variant="secondary" onClick={()=> setOpen(false)}>
              Close
            </Button>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
};

export default Project;
