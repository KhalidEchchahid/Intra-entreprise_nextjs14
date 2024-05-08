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
