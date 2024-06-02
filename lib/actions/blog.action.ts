import Blog from "@/database/blog.model";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export async function getPost(slug: string) {
  try {
    await connectToDatabase();
    const data = await Blog.findOne({ slug: slug }).lean();
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function getPosts() {
  try {
    await connectToDatabase();
    const data = await Blog.find().sort({ createdAt: -1 }).lean();
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function createBlog({ blog, path }: { blog: any, path: string }) {
  try {
    await connectToDatabase();
    const newBlog = await Blog.create({ ...blog });
    revalidatePath(path);
    return newBlog;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating blog');
  }
}

export async function updateBlog({ blog, path }: { blog: any, path: string }) {
  try {
    await connectToDatabase();
    const existingBlog = await Blog.findByIdAndUpdate(blog._id, blog, { new: true });
    if (!existingBlog) throw new Error('Blog not found');
    revalidatePath(path);
    return existingBlog;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating blog');
  }
}
