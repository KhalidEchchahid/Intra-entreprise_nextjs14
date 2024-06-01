import { Schema , model , models , Document  } from "mongoose";

export interface IRole extends Document {
  name: string;
  createdOn: Date;
}

const RoleSchema = new Schema({
  name: { type: String, required: true , unique: true },
  createdOn: { type: Date, default: Date.now },
});

const Role = models.Role || model('Role', RoleSchema);

export default Role;
