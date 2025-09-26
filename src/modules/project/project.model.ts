import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const projectSchema: Schema<IProject> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema);
