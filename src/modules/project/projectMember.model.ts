import mongoose, { Document, Schema } from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../../utils/constants";

// Interface for ProjectMember
export interface IProjectMember extends Document {
  user: mongoose.Types.ObjectId;   
  project: mongoose.Types.ObjectId;
  role: typeof AvailableUserRole[number]; 
  createdAt?: Date;
  updatedAt?: Date;
}

const projectMemberSchema = new Schema<IProjectMember>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRole,
      default: UserRolesEnum.MEMBER,
    },
  },
  { timestamps: true },
);

export const ProjectMember = mongoose.model<IProjectMember>(
  "ProjectMember",
  projectMemberSchema,
);
