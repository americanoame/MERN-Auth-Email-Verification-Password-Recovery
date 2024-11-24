import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // get the name, email, and password from the request body

  try {
    if (!email || !password || !name) {
      // check if the email, password, and name are provided
      throw new Error({ message: "Please fill in all fields" }); // throw an error if any of the fields are missing
    }
    const userExists = await User.findOne({ email }); // check if the user already exists in the database
    if (userExists) {
      // if the user already exists
      return res // return an error message
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfull",
      user: {
        ...user._doc, // this will return all the fields in the user object
        password: undefined, // we don't want to return the password
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const verifyEmail = asyncHandler(async (req, res) => {
  // create a new controller function called verifyEmail
  const { code } = req.body; // get the verification code from the request body
  try {
    const user = await User.findOne({
      // find the user with the verification token
      verificationToken: code, // find the user with the verification token
      verificationTokenExpiresAt: { $gt: Date.now() }, // check if the verification token has not expired yet
    });

    if (!user) {
      // if the user is not found
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code",
        }); // return an error message
    }

    user.isVerified = true; // set the user to verified
    user.verificationToken = undefined; // remove the verification token from the user object so that it can't be used again
    user.verificationTokenExpiresAt = undefined; // remove the verification token expiry date from the user object
    await user.save(); // save the user object to the database

    await sendWelcomeEmail(user.email, user.name); // send a welcome email to the user

    res.status(200).json({
      // return a success message
      success: true, // set the success to true
      message: "Email verified successfully",
      user: {
        ...user._doc, // return all the fields in the user object
        password: undefined, // remove the password from the user object before returning it to the client
      },
    });
  } catch (error) {
    // catch any errors that occur during the verification process
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});











export const login = asyncHandler(async (req, res) => {});

export const logout = asyncHandler(async (req, res) => {});

export const forgotPassword = asyncHandler(async (req, res) => {});

export const resetPassowrd = asyncHandler(async (req, res) => {});
