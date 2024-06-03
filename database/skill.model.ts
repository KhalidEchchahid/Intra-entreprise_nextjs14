import { Schema , model , models , Document  } from "mongoose";

export interface ISkill extends Document {
  name: string;
  createdOn: Date;
}

const SkillSchema = new Schema({
  name: { type: String, required: true , unique: true },
  createdOn: { type: Date, default: Date.now },
});

const Skill = models.Skill || model('Skill', SkillSchema);

export default Skill;
