import mongoose, { Document, Schema } from "mongoose";

export interface ISubtask extends Document {
  title: string;
  task: mongoose.Types.ObjectId;     
  isCompleted: boolean;
  createdBy: mongoose.Types.ObjectId;   
  createdAt?: Date;
  updatedAt?: Date;
}

const subTaskSchema = new Schema<ISubtask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subtask = mongoose.model<ISubtask>("Subtask", subTaskSchema);
