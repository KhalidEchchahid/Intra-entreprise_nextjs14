import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  instructor?: string;
  createdAt: Date;
  imageUrl?: string;
  startDateTime: Date;
  endDateTime: Date;
  hourVolume: Number;
  url?: string;
  organizer: { _id: string, name: string }
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  hourVolume: { type: Number, default: 0},
  url: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;