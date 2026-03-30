import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
    category: {
      type: String,
      enum: [
        "technology",
        "science",
        "games",
        "it",
        "food",
        "travel",
        "fashion",
      ],
    },
    likes: [
      {
        userId: { type: Schema.Types.ObjectId, required: true },
      },
    ],
    coverImage: {
      imageURL: { type: String },
      publicId: { type: String },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const BlogModel = model("Blog", blogSchema);

export default BlogModel;
