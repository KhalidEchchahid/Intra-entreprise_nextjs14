"use server"

import Skill from "@/database/skill.model";
import { connectToDatabase } from "../mongoose";
import { CreateSkillParams } from "./shared.types";
import { revalidatePath } from "next/cache";




export async function createSkill(params: CreateSkillParams) {
    try { 
      connectToDatabase();
      const { name , path } = params;
  
      console.log(name);
      
      const newskill = await Skill.create({name})
  
      console.log({ newskill });

      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  export async function getAllSkills() {
    try {
      connectToDatabase();
      
      const skills = await Skill.find({}).sort({ createdOn: -1 });
  
      return { skills };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }