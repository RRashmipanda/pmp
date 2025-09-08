import { Document, Model } from "mongoose";

export interface IUser {
  avatar: {
    url: string;
    localPath: string;
  };
  username: string;
  email: string;
  fullName?: string;
  password: string;
  isEmailVerified: boolean;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
}

// Methods
export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateTemporaryToken(): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: number;
  };
}

// Document type = Fields + Methods
export type UserDocument = Document & IUser & IUserMethods;

// Model type
export type UserModel = Model<IUser, {}, IUserMethods>;
