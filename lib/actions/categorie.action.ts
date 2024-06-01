"use server"

import Categorie from "@/database/categorie.model";
import { connectToDatabase } from "../mongoose";
import { CreateSkillParams } from "./shared.types";
import { revalidatePath } from "next/cache";




export async function createCategorie(params: CreateSkillParams) {
    try { 
      connectToDatabase();
      const { name , path } = params;
  
      console.log(name);
      
      const newsCategorie = await Categorie.create({name})
  
      console.log({ newsCategorie });

      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  export async function getAllCategories() {
    try {
      connectToDatabase();
      
      const categories = await Categorie.find({}).sort({ createdOn: -1 });
  
      return { categories };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }