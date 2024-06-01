"use server"

import Project from "@/database/project.model";
import { connectToDatabase } from "../mongoose";
import { CreateProjectParams, CreateSkillParams } from "./shared.types";
import { revalidatePath } from "next/cache";




export async function createProject(params: CreateProjectParams) {
    try { 
      connectToDatabase();
      const { title , description ,path } = params;
  
      const newProject = await Project.create({title , description })
  
      console.log({ newProject });

      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  export async function getAllProjects() {
    try {
      connectToDatabase();
      
      const projects = await Project.find({}).sort({ createdOn: -1 });
  
      return { projects };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }