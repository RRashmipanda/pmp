import mongoose, { Document, Schema } from "mongoose";
import { AvailableTaskStatues, TaskStatusEnum } from "../../utils/constants";

export interface IAttachment {
  url: string;
  mimetype: string;
  size: number;
}

export interface ITask extends Document {
  title: string;
  description?: string;
  project: mongoose.Types.ObjectId;   // or IProject["_id"] if you have a Project interface
  assignedTo?: mongoose.Types.ObjectId; // or IUser["_id"]
  assignedBy?: mongoose.Types.ObjectId; // or IUser["_id"]
  status: typeof AvailableTaskStatues[number]; // ensures it matches enum values
  attachments: IAttachment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: AvailableTaskStatues,
      default: TaskStatusEnum.TODO,
    },
    attachments: {
      type: [
        {
          url: String,
          mimetype: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
