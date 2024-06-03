"use server";

import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
  UpdateUserProjectsParams,
  UpdateUserSkillsParams,
} from "./shared.types";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Skill from "@/database/skill.model";
import Level from "@/database/level.model";
import Project from "@/database/project.model";
import Role from "@/database/role.model";

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

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const { filter, searchQuery, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { userName: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOprions = {};

    switch (filter) {
      case "new_users":
        sortOprions = { joinedAt: -1 };

        break;
      case "old_users":
        sortOprions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOprions = { reputation: -1 };
        break;

      default:
        break;
    }
    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOprions);

    const totaleUsers = await User.countDocuments(query);
    const isNext = totaleUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { userId, updateData, path } = params;

    await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestions(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { userId, searchQuery, filter, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOprions = {};

    switch (filter) {
      case "most_recent":
        sortOprions = { createdAt: -1 };
        break;
      case "oldest":
        sortOprions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOprions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOprions = { views: -1 };
        break;
      case "most_answered":
        sortOprions = { answers: -1 };
        break;

      default:
        break;
    }

    const user = await User.findById(userId).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOprions,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, Select: "_id name" },
        { path: "author", model: User, select: "_id name picture" },
      ],
    });

    const isNext = user.saved.length > pageSize;
    if (!user) {
      throw new Error("user not found");
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserSkills(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId)
      .populate("skills.skill")
      .populate("skills.level")
      .exec();

    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    return { skills: user.skills };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUserSkills(params: UpdateUserSkillsParams) {
  try {
    connectToDatabase();
    const { userId, skill, level, path } = params;

    const userskill = await Skill.findById(skill);
    console.log({ userskill });

    const userlevel = await Level.findById(level);
    console.log({ userlevel });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          skills: {
            skill: userskill,
            level: userlevel,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("Updated user:", updatedUser);

    revalidatePath(path);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsersAdmin() {
  try {
    connectToDatabase();

    

    const users = await User.find()
      .sort({joinedAt : -1 });

    

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function updateUserProjects(params: UpdateUserProjectsParams) {
  try {
    connectToDatabase();
    const { userId, project, role, path } = params;

    const userProject = await Project.findById(project);


    const userRole = await Role.findById(role);


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          projects: {
            project: userProject,
            role: userRole,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("Updated user:", updatedUser);

    revalidatePath(path);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserProjects(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId)
      .populate("projects.project")
      .populate("projects.role")
      .exec();

    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    return { projects: user.projects };
  } catch (error) {
    console.log(error);
    throw error;
  }
}