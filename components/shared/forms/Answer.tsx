"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,

  FormField,
  FormItem,

  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  question:string;
  questionId : string ;
  authorId : string
}

const answer = ({question , questionId , authorId}:Props) => {
  const pathname = usePathname();
  const [isSubmitting , setIsSumitting] = useState(false);
  const {mode} = useTheme();
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handelCreateAnswer =async (values: z.infer<typeof AnswerSchema>) => {
    setIsSumitting(true);
    try {
      await createAnswer({
        content: values.answer ,
        author: JSON.parse(authorId) , 
        question: JSON.parse(questionId),
        path: pathname,
      })

      form.reset();

      if(editorRef.current){
        const editor = editorRef.current as any ;

        editor.setContent('');
      }
    } catch (error) {
      
    }finally{
      setIsSumitting(false);
    }
  };

  return (
    <div>
      <div className="flex fles-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
        <Button 
        className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
        onClick={()=>{}}
        >
          <Image
          src='/assets/icons/stars.svg'
          alt="star"
          width={12}
          height={12}
          className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>
    <Form {...form}>
      <form
        className="mt-6 flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handelCreateAnswer)}
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(_evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      " codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist ",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: mode === 'dark' ? "oxide-dark" : "oxide",
                    content_css: mode === 'dark' ? 'dark' : 'light' , 
                  }}
                />
              </FormControl>
             
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="primary-gradient w-fit text-white" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
    </div>
  );
};

export default answer;
