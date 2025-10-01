import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProjectNote extends Document {
  _id: Types.ObjectId;
  project: Types.ObjectId;
  createdBy: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectNoteSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);


export const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema);