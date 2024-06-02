import { Schema, model, Document } from "mongoose";

// Define the interface for the blog document
export interface IBlog extends Document {
  title: string;
  description: string;
  tags: String[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

// Define the schema for the blog
const BlogSchema = new Schema({
  title: { type: String, required: true }, // Corrected "require" to "required"
  description: { type: String, required: true }, // Corrected "require" to "required"
  tags: [{ type: String }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

// Define and export the Blog model
const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;