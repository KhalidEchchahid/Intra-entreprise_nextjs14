"use server"

import Level from "@/database/level.model";
import { connectToDatabase } from "../mongoose";
import { CreateSkillParams } from "./shared.types";
import { revalidatePath } from "next/cache";




export async function createLevel(params: CreateSkillParams) {
    try { 
      connectToDatabase();
      const { name , path } = params;
  
      console.log(name);
      
      const newsLevel = await Level.create({name})
  
      console.log({ newsLevel });

      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  export async function getAllLevels() {
    try {
      connectToDatabase();
      
      const levels = await Level.find({}).sort({ createdOn: -1 });
  
      return { levels };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }