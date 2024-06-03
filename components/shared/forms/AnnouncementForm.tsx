"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnnoucementFormSchema } from "@/lib/validations";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "../FileUploader";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";

// import "react-datepicker/dist/react-datepicker.css";
import { usePathname, useRouter } from "next/navigation";
import { IAnnouncement } from "@/database/announcement.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnnouncement } from "@/lib/actions/announcement.action";
import Dropdown from "../DropDown";

const eventDefaultValues = {
  title: "",
  content: "",
  imageUrl: "",
  url: "",
  project: "",
};

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IAnnouncement;
  eventId?: string;
};

const AnnouncementForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = event && type === "Update" ? event : eventDefaultValues;
  const pathname = usePathname();

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof AnnoucementFormSchema>>({
    resolver: zodResolver(AnnoucementFormSchema),
    defaultValues: eventDefaultValues,
  });
  
  async function onSubmit(values: z.infer<typeof AnnoucementFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newAnnouncement = await createAnnouncement({
          title: values.title,
          content: values.content,
          imageUrl: uploadedImageUrl,
          link: values.url,
          project: values.project,
          userId,
          path: pathname
        })
        if(newAnnouncement) {
          form.reset();
          router.push(`/announcement`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        // const updatedEvent = await updateEvent({
        //   userId,
        //   event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
        //   path: `/events/${eventId}`
        // })
        // if(updatedEvent) {
        //   form.reset();
        //   router.push(`/events/${updatedEvent._id}`)
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="no-focus paragraph-ragular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="no-focus paragraph-ragular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center ">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder="URL"
                      {...field}
                      className="no-focus paragraph-ragular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    />
                  </div>
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
          className=" primary-gradient min-h-[46px] px-4 py-3 !text-light-900 max-w-40 "
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Announcment `}
        </Button>
      </form>
    </Form>
  );
};

export default AnnouncementForm;

