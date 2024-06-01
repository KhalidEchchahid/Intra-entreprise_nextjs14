"use server"

import Role from "@/database/role.model";
import { connectToDatabase } from "../mongoose";
import { CreateSkillParams } from "./shared.types";
import { revalidatePath } from "next/cache";




export async function createRole(params: CreateSkillParams) {
    try { 
      connectToDatabase();
      const { name , path } = params;
  
      console.log(name);
      
      const newRole = await Role.create({name})
  
      console.log({ newRole });

      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  export async function getAllRols() {
    try {
      connectToDatabase();
      
      const roles = await Role.find({}).sort({ createdOn: -1 });
  
      return { roles };
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }