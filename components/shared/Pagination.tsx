"use client";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
}
const Pagination = ({ pageNumber, isNext }: Props) => {

    const router = useRouter();
    const pathname = usePathname();
    console.log(pageNumber);

  const handelNavigation = (direction: string) => {
    const nextPageNumber = direction === 'prev' ? pageNumber - 1 : pageNumber + 1 ;
   console.log(nextPageNumber);
   
    const newUrl = formUrlQuery({
        params : useSearchParams.toString(),
        key : 'page' ,
        value: nextPageNumber.toString(),
    })

    router.push(newUrl)

};

if(!isNext &&  pageNumber === 1 ) return null ;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled= { pageNumber == 1}
        onClick={() => handelNavigation('prev')}
        className="light-border-2 btn  flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-meduim text-dark200_light800">Prev</p>
      </Button>
      <div className="bg-primary-500 flex justify-center items-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handelNavigation('next')}
        className="light-border-2 btn  flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-meduim text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
