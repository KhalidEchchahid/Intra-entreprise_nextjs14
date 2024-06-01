import { Schema , model , models , Document  } from "mongoose";

export interface ILevel extends Document {
  name: string;
  createdOn: Date;
}

const LevelSchema = new Schema({
  name: { type: String, required: true , unique: true },
  createdOn: { type: Date, default: Date.now },
});

const Level = models.Level || model('Level', LevelSchema);

export default Level;
