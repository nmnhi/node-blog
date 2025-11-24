import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Tạo token cho user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// Register
export const registerUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  return { user, token };
};

// Login
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user._id);
  return { user, token };
};

// Logout
export const logoutUser = async () => {
  return { message: "User logged out successfully" };
};

// Get all users
export const getAllUsers = async () => {
  const users = await User.find().select("-password");

  return users;
};
