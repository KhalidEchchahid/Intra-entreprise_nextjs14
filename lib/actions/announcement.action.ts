"use server";

import { revalidatePath } from "next/cache";

import Announcement from "@/database/announcement.model";
import User from "@/database/user.model";

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  CreateAnnouncementParams,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import Project from "@/database/project.model";

const populateEvent = (query: any) => {
  return query
    .populate({ path: "author", model: User, select: "_id  name  picture" })
    .populate({ path: "project", model: Project, select: "_id title" });
};

// CREATE
export async function createAnnouncement(params: CreateAnnouncementParams) {
  try {
    await connectToDatabase();

    const { userId, title, content, imageUrl, link, project, path } = params;

    if (project === "") {
      const newAnnouncement = await Announcement.create({
        title,
        content,
        imageUrl,
        link,
        author: userId,
      });
      console.log(newAnnouncement);

      return JSON.parse(JSON.stringify(newAnnouncement));
    } else {
      const newAnnouncement = await Announcement.create({
        title,
        content,
        imageUrl,
        link,
        author: userId,
        project,
      });
      return JSON.parse(JSON.stringify(newAnnouncement));
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// // GET ONE EVENT BY ID
// export async function getEventById(eventId: string) {
//   try {
//     await connectToDatabase();

//     const event = await populateEvent(Event.findById(eventId));

//     if (!event) throw new Error("Event not found");

//     return JSON.parse(JSON.stringify(event));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // UPDATE
// export async function updateEvent({ userId, event, path }: UpdateEventParams) {
//   try {
//     await connectToDatabase();

//     const eventToUpdate = await Event.findById(event._id);
//     if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
//       throw new Error("Unauthorized or event not found");
//     }

//     const updatedEvent = await Event.findByIdAndUpdate(
//       event._id,
//       { ...event, category: event.categoryId },
//       { new: true }
//     );
//     revalidatePath(path);

//     return JSON.parse(JSON.stringify(updatedEvent));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // DELETE
// export async function deleteEvent({ eventId, path }: DeleteEventParams) {
//   try {
//     await connectToDatabase();

//     const deletedEvent = await Event.findByIdAndDelete(eventId);
//     if (deletedEvent) revalidatePath(path);
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET ALL EVENTS
export async function getAllAnnouncements({
  query,
  limit = 6,
  page,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Announcement.find({})
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const announcements = await populateEvent(eventsQuery);
    const announcementsCount = await Announcement.countDocuments();

    console.log(announcements);

    return {
      data: JSON.parse(JSON.stringify(announcements)),
      totalPages: Math.ceil(announcementsCount / limit),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLatestAnnouncements() {
  try {
    await connectToDatabase();

    const announcements = await Announcement.find({})
      .sort({ createdAt: -1 })
      .limit(4);

    return { announcements };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// // GET EVENTS BY ORGANIZER
// export async function getEventsByUser({
//   userId,
//   limit = 6,
//   page,
// }: GetEventsByUserParams) {
//   try {
//     await connectToDatabase();

//     const conditions = { organizer: userId };
//     const skipAmount = (page - 1) * limit;

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const events = await populateEvent(eventsQuery);
//     const eventsCount = await Event.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(events)),
//       totalPages: Math.ceil(eventsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

// // GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   eventId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = {
//       $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
//     };

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const events = await populateEvent(eventsQuery);
//     const eventsCount = await Event.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(events)),
//       totalPages: Math.ceil(eventsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
