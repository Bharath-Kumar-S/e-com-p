import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { _id, name, isAdmin, email } = user;
    res.json({ _id, name, isAdmin, email });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc  Get user profile
// @route   Get /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc  Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc  Get users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc  Get user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc  Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc  Update user
// @route  PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});
