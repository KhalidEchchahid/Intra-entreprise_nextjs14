import { Schema, model, models, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  createdOn: Date;
}

const ProjectSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
