import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
  skills: { skill: Schema.Types.ObjectId; level: Schema.Types.ObjectId }[];
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "CLIENT" },
  bio: { type: String },
  picture: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
  skills: [
    {
      skill: { type: Schema.Types.ObjectId, ref: "Skill", required: true },
      level: { type: Schema.Types.ObjectId, ref: "Level", required: true }
    }
  ],
  projects: [
    {
      project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
      role: { type: Schema.Types.ObjectId, ref: "Role" ,  required: true}
    }
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
