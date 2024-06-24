import asyncHandler from 'express-async-handler';
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Apierror } from "../utils/apierror.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessTokens = user.generateAccessToken();
    const refreshTokens = user.generateRefreshTokens();
   
    user.refreshToken = refreshTokens;
    await user.save({ validateBeforeSave: false });
    return { accessTokens, refreshTokens };
  } catch (error) {
    throw new Apierror(500, "Something went wrong while generating access and refresh token");
  }
}
const createToken = (_id, email) => {
  return jwt.sign({ _id, email}, process.env.SECRET, {
    expiresIn: "365d",
  });
};


const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, rollNumber, email, mobileNumber, hostelNumber, roomNumber, password } = req.body;

    // Log request body for debugging purposes
    console.log("Request Body:", req.body);

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    console.log("Existing User Check:", existingUser);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password Hashed",hashedPassword);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      rollNumber,
      mobileNumber,
      hostelNumber,
      roomNumber,
      password,
    });

    // Save the new user to the database
    const registeredUser = await newUser.save();
    console.log("Registered User ID:", registeredUser._id);

    if (!registeredUser) {
      return res.status(500).json({ message: "Something went wrong while registering the user" });
    }

    // Generate a token
    const token = createToken(registeredUser._id, email);
    console.log("Generated Token:", token);

    // Return success response
    return res.status(201).json({ user: registeredUser, token, message: "User registered successfully" });
  } catch (error) {
    // Log the error and return a 400 status code with error message
    console.error("Registration Error:", error.message);
    return res.status(400).json({ message: "Register failed", error: error.message });
  }
});

//login
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log incoming request data
    console.log("Login Request:", req.body);

    // Fetch user from the database
    const userr = await User.findOne({  });
    const user = await User.findOne({ email });
    console.log("User Check:", user,"all user",userr);

    // If user not found, return 401 status
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }
    console.log("Password check::", user.password);
    // Compare provided password with stored hashed password
    // const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:",user.password,password);



    if (user.password===password) {
      // Generate token if password matches
      const token = createToken(user._id, user.email);
      console.log("Generated Token:", token);

      

      // Respond with user details and token on successful login
      return res.status(200).json({
        user,
        token,
        message: "Login success",
        success: true,
      });
    } else {
      // If password doesn't match, return 401 status
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
});


// const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(req.user._id, {
//     $unset: { refreshToken: 1 }  // Unset refreshToken
//   });

//   const options = {
//     httpOnly: true,
//     secure: true  // Make sure to set this only if using HTTPS
//   };

//   res.status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged out successfully"));
// });

export {
  registerUser,
  loginUser,
  // logoutUser
};
