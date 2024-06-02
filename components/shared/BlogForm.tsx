"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { blogFormSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import * as z from 'zod';
import { createBlog, updateBlog } from "@/lib/actions/blog.action";
import { IBlog } from "@/database/blog.model";

type BlogFormProps = {
  type: "Create" | "Update";
  blog?: IBlog;
  blogId?: string;
}

const BlogForm = ({ type, blog, blogId }: BlogFormProps) => {
  const initialValues = blog && type === 'Update' ? 
  { 
    title: blog.title, 
    description: blog.description, 
    tags: blog.tags.map(tag => tag.toString()) // Ensure all tags are strings 
  } : 
  { 
    title: "", 
    description: "", 
    tags: [] 
  };  const router = useRouter();

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialValues
  });

  async function onSubmit(values: z.infer<typeof blogFormSchema>) {
    try {
      if (type === 'Create') {
        const newBlog = await createBlog({ blog: values, path: '/blogs' });
        if (newBlog) {
          form.reset();
          router.push(`/blog/${newBlog._id}`);
        }
      } 
      else if (type === 'Update' && blogId) {
        const updatedBlog = await updateBlog({ blog: { ...values, _id: blogId }, path: `/blog/${blogId}` });
        if (updatedBlog) {
          form.reset();
          router.push(`/blogs/${updatedBlog._id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Tags (comma separated)" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Blog`}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
