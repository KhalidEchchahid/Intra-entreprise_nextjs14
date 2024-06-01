"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  RoleSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCategorie } from "@/lib/actions/categorie.action";
import { createRole } from "@/lib/actions/role.action";

const Categorie = () => {
  const [isSubmitting, setIsSumitting] = useState(false);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    setIsSumitting(true);
    try {
      // make an async call to your API -> create a question
      // contain all form data
      await createRole({
        name: values.name,
        path: pathname,
      });

      form.reset();
    } catch (error) {
    } finally {
      setIsSumitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto px-4 py-2"
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl className="mt-3.5">
                  <Input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="Add a categorie"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900 mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? <>Adding...</> : <>Add</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Categorie;