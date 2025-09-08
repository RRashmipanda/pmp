import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ENV } from "../../config/env";
import { IUser, IUserMethods, UserModel } from "./auth-type";


const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    avatar: {
      type: {
        url: { type: String },
        localPath: { type: String },
      },
      default: {
        url: "https://placehold.co/200x200",
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    emailVerificationToken: String,
    emailVerificationExpiry: Date,
  },
  { timestamps: true }
);


// Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Methods
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: ENV.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign
   (
    { _id: this._id },
     ENV.REFRESH_TOKEN_SECRET,
      { expiresIn: ENV.REFRESH_TOKEN_EXPIRY,}
);
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 mins
  return { unHashedToken, hashedToken, tokenExpiry };
};




export default  mongoose.model<IUser, UserModel>("AuthUser", userSchema);


