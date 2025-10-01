import { Request, Response, NextFunction } from "express";
import  User from "../modules/auth-user/auth-user.model";
import { ProjectMember } from "../../src/modules/project/projectMember.model";
import { ApiError } from "../utils/api-error.js";
import { AsyncHandler } from "../utils/async-handler.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import  {ENV}  from "../config/env";
import mongoose from "mongoose";


export interface AuthPayload extends JwtPayload {
  _id: string;
}

export const verifyJWT = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as AuthPayload;;
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});

export const validateProjectPermission = (roles: string[] = []) => {
  return AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Project ID is missing");
    }

    const projectMember = await ProjectMember.findOne({
      project: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!projectMember) {
      throw new ApiError(404, "Project not found or you are not a member");
    }

    const givenRole = projectMember.role;

    // attach project role to the user object for downstream use
    (req.user as any).role = givenRole;

    if (!roles.includes(givenRole)) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action"
      );
    }

    next();
  });
};