"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    console.log({ newAnswer });

    // add the answer to the question's Answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO : add interaction...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId , sortBy } = params;

    console.log(questionId);

    let sortOprions ={};


    switch (sortBy) {
      case "highestUpcotes":
        sortOprions = {upvotes: -1}
        
        break;
      case "lowestUpvotes":
        sortOprions = {upvotes: 1}
        break;
      case "recent":
        sortOprions = {createdAt: -1}
        break;
    
      case "old":
        sortOprions = {createdAt: 1}
        break;
    
      default:
        break;
    }
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name picture")
      .sort(sortOprions);

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    // if the user already upVoted
    if (hasupVoted) {
      // remove the upvode of the user
      updateQuery = { $pull: { upvotes: userId } };

      // if the user already downVoted
    } else if (hasdownVoted) {
      // remove the downVote and add the upVote of the user
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    // if the user already upVoted
    if (hasdownVoted) {
      // remove the upvode of the user
      updateQuery = { $pull: { downvotes: userId } };

      // if the user already downVoted
    } else if (hasupVoted) {
      // remove the downVote and add the upVote of the user
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}