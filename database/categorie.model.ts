import { Schema , model , models , Document  } from "mongoose";

export interface ICategorie extends Document {
  name: string;
  createdOn: Date;
}

const CategorieSchema = new Schema({
  name: { type: String, required: true , unique: true },
  createdOn: { type: Date, default: Date.now },
});

const Categorie = models.Categorie || model('Categorie', CategorieSchema);

export default Categorie;
