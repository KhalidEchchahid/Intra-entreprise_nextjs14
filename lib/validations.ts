import Level from "@/database/level.model";
import { z } from "zod";

export const QuestionsShema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
export const UserShema = z.object({
  userName: z.string().min(5).max(20),
  name: z.string().min(5).max(20),
  email: z.string().min(5).max(40),
  password: z.string().min(8).max(20),
  repeatedPassword: z.string().min(8).max(20),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100)
})

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  userName: z.string().min(5).max(50),
  bio: z.string().min(10).max(300),
  portfolioWebsite: z.string().url().min(0),
  location: z.string().min(0).max(50),
});

export const SkillSchema = z.object({
  name: z.string().min(1).max(20),
})

export const LevelSchema = z.object({
  name: z.string().min(1).max(20),
})

export const ProjectShema = z.object({
  title: z.string().min(5).max(40),
  description: z.string().min(10).max(300),
});

export const CategorieSchema = z.object({
  name: z.string().min(1).max(30),
})


export const RoleSchema = z.object({
  name: z.string().min(1).max(30),
})

export const SkillLevelSchema = z.object({
  skill: z.string(),
  level: z.string(),
})


<<<<<<< event-branch
export const eventFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  instructor: z.string().min(3),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  url: z.string().url()
})
=======
export const ProjectRoleSchema = z.object({
  project: z.string(),
  role: z.string(),
})

export const AnnoucementFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  imageUrl: z.string(),
  url: z.string().url(),
  project: z.string(),
})
>>>>>>> main
