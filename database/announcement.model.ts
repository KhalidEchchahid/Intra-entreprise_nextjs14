
import { Schema, models, model, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  link?: string;
  imageUrl?: string;
  project?: Schema.Types.ObjectId;
  createdAt: Date;
}


const AnnouncementSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: {type: Schema.Types.ObjectId , ref: 'User'},
  link: { type: String},
  imageUrl : { type: String},
  project : {type: Schema.Types.ObjectId , ref: 'Project'},
  createdAt: {type: Date , default: Date.now},
});

const Announcement = models.Announcement || model('Announcement' , AnnouncementSchema);

export default Announcement ;