"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) throw Error("User not found ");

    // find interactions for the user and group by tags ...

    // Interaction .....

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter , page = 1 , pageSize = 6 } = params;

    const skipAmount = (page - 1 )* pageSize ;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOprions = {};

    switch (filter) {
      case "popular":
        sortOprions = { questions: -1 };

        break;
      case "recent":
        sortOprions = { createdAt: -1 };
        break;
      case "name":
        sortOprions = { name: 1 };
        break;
      case "old":
        sortOprions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.find(query)
    .skip(skipAmount)
    .limit(pageSize)
    .sort(sortOprions);

    const totalTags =await  Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length ;
    return { tags , isNext};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 1, searchQuery } = params;

    const skipAmount = (page - 1) * pageSize;

    const TagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(TagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, Select: "_id name" },
        { path: "author", model: User, select: "_id name picture" },
      ],
    });


    if (!tag) {
      throw new Error("tag not found");
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;

    return { tagTitle: tag.name, questions  , isNext};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getAllUsers(params : GetAllTagsParams){
//     try {
//         connectToDatabase();

//     } catch (error) {
//         console.log(error);
//         throw error ;
//     }
// }
