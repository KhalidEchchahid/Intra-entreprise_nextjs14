"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { CreateUserParams, GetUserByIdParams } from "./shared.types";
import Question from "@/database/question.model";

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findById(userId);

    const totalQuestions = await Question.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllUsers() {
  try {
    connectToDatabase();

    const users = await User.find().sort({ joinedAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    await connectToDatabase();

    const { userName, name, email, password, path } = params;

    const userFound = await User.findOne({ $or: [{ email }, { userName }] });

    if (userFound) {
      return NextResponse.json(
        { message: "Email or Username  already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      userName,
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    console.log(savedUser);

    revalidatePath(path);
  } catch (error) {
    console.log("Error during creating user:", error);
    throw error;
  }
}
