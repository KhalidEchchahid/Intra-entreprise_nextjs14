"use client"

import React, { useState } from 'react'
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


interface Props {
    picture: string ;
}
const ProfilePicture = ({picture}:Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handelInputFile = async(e : any)=>{
        const file = e.target.files[0];
        console.log(file);
         
    }
  return (
    <Dialog >
            <DialogTrigger asChild>
              {picture ? (
                <Image
                  src={picture}
                  width={140}
                  height={140}
                  alt="profile picture"
                  className="rounded-full object-cover cursor-pointer"
                />
              ) : (
                <Image
                  src={"/assets/images/profile-avatar.png"}
                  width={140}
                  height={140}
                  alt="profile picture"
                  className="rounded-full object-cover cursor-pointer"
                />
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] background-light900_dark200 border-none">
              <DialogHeader>
                <DialogTitle>Edit Profile Picture</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input type='file' accept='image' className="col-span-3"
                  onChange={handelInputFile}
                   />
                </div>
              </div>
              <DialogFooter>
              <Button
            type="submit"
            disabled={isSubmitting}
            className="primary-gradient w-fit"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
  )
}

export default ProfilePicture