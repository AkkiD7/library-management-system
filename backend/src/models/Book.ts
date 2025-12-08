// src/models/Book.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  status: "available" | "borrowed";
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
      required: true,
    },
    publishedYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
