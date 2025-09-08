/*
 Take Some Data
 Validate thr Data
 Check in DB if user already exists
 Saved the new user (AT,RT,GT,sendmail)
 user verification => email
 send response back to the request
*/

import User from "./auth-user.model";
import {ApiResponse} from "../../utils/api-response";
import {AsyncHandler} from "../../utils/async-handler";
import {ApiError} from "../../utils/api-error";
import { emailVerificationMailgenContent, sendEmail } from "../../utils/mail";




const generateAccessAndRefreshTokens = async (userId:string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token",
    );
  }
};


//register user
export const registerUser = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = new Date(tokenExpiry);

  await user.save({ validateBeforeSave: false });

 await sendEmail({
  email: user.email,
  subject: "Please verify your email",
  mailgenContent: emailVerificationMailgenContent(
    user.username,
    `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
  ),
});

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered successfully and verification email has been sent on your email",
      ),
    );
});